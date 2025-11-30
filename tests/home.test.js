import { strict as assert } from "assert";
import { readFileSync } from "fs";
import path from "path";
import { test } from "node:test";

const contentPath = path.join(process.cwd(), "lib", "content.ts");
const layoutPath = path.join(process.cwd(), "app", "layout.tsx");

const contentSource = readFileSync(contentPath, "utf-8");
const layoutSource = readFileSync(layoutPath, "utf-8");

test("hero includes key messaging", () => {
  assert.ok(
    contentSource.includes("Systems that turn strategy into repeatable outcomes"),
    "hero headline should be present",
  );
  assert.ok(contentSource.includes("Request a demo"), "primary CTA should be present");
});

test("layout exports metadata", () => {
  assert.ok(layoutSource.includes("export const metadata"), "metadata export is present");
  assert.ok(layoutSource.includes("metadataBase"), "metadata includes base URL");
});
