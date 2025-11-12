import { promises as fs } from "fs";
import path from "path";

const projectRoot = process.cwd();
const sourceDir = path.join(
    projectRoot,
    "node_modules",
    "@designbasekorea",
    "icons-webfont",
    "dist",
    "webfont"
);
const targetDir = path.join(projectRoot, "dist", "css");

const filesToCopy = ["icons.woff", "icons.woff2"];

async function copyFiles() {
    await fs.mkdir(targetDir, { recursive: true });

    await Promise.all(
        filesToCopy.map(async (file) => {
            const src = path.join(sourceDir, file);
            const dest = path.join(targetDir, file);
            await fs.copyFile(src, dest);
        })
    );
}

copyFiles().catch((error) => {
    console.error("[copy-icons] Failed to copy icon font files:", error);
    process.exit(1);
});

