import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

describe("package install boundary", () => {
  it("does not install the upstream bot through lifecycle scripts", async () => {
    const pkg = JSON.parse(await fs.readFile("package.json", "utf8"));
    const lifecycleScripts = ["preinstall", "install", "postinstall", "prepare"];

    for (const script of lifecycleScripts) {
      assert.equal(pkg.scripts?.[script], undefined);
    }
    assert.equal(pkg.dependencies, undefined);
  });
});
