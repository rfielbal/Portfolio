#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pages = ["index.html", "veille.html", "demos/aether-core/index.html"];
const expectedHashes = new Set();

for (const relativePath of pages) {
    const source = readFileSync(resolve(projectRoot, relativePath), "utf8");
    const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
    let match;

    while ((match = scriptPattern.exec(source))) {
        if (/\bsrc\s*=/.test(match[1])) continue;
        const typeMatch = match[1].match(/\btype\s*=\s*["']([^"']+)["']/i);
        const scriptType = typeMatch?.[1]?.toLowerCase() || "text/javascript";
        if (scriptType !== "application/ld+json") {
            throw new Error(`script exécutable inline interdit dans ${relativePath}`);
        }
        const digest = createHash("sha256").update(match[2], "utf8").digest("base64");
        expectedHashes.add(`sha256-${digest}`);
    }
}

const apacheConfig = readFileSync(resolve(projectRoot, ".htaccess"), "utf8");
const cspMatch = apacheConfig.match(/Content-Security-Policy\s+"([^"]+)"/);

if (!cspMatch) {
    throw new Error("En-tête Content-Security-Policy introuvable dans .htaccess");
}

const scriptDirective = cspMatch[1]
    .split(";")
    .map((directive) => directive.trim())
    .find((directive) => directive.startsWith("script-src "));

if (!scriptDirective) {
    throw new Error("Directive script-src introuvable dans la CSP");
}

if (scriptDirective.includes("'unsafe-inline'")) {
    throw new Error("script-src ne doit pas autoriser unsafe-inline");
}

const configuredHashes = new Set(
    [...scriptDirective.matchAll(/'((?:sha256)-[A-Za-z0-9+/=]+)'/g)].map((match) => match[1])
);
const missingHashes = [...expectedHashes].filter((hash) => !configuredHashes.has(hash));
const staleHashes = [...configuredHashes].filter((hash) => !expectedHashes.has(hash));

if (missingHashes.length || staleHashes.length) {
    const details = [
        missingHashes.length ? `hashes absents : ${missingHashes.join(", ")}` : "",
        staleHashes.length ? `hashes obsolètes : ${staleHashes.join(", ")}` : ""
    ].filter(Boolean).join(" ; ");
    throw new Error(`CSP désynchronisée (${details})`);
}

console.log(`CSP valide : ${expectedHashes.size} scripts inline couverts par SHA-256.`);
