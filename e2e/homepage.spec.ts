import { test, expect } from "@playwright/test";

test.describe("Homepage (root landing page)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle("tjrobinson.net");
  });

  test("displays welcome text", async ({ page }) => {
    await expect(page.locator("p.lead")).toHaveText("Welcome!");
  });

  test("has Content link pointing to /content/", async ({ page }) => {
    const gardenLink = page.locator('a:has-text("Content")');
    await expect(gardenLink).toBeVisible();
    await expect(gardenLink).toHaveAttribute("href", "/content/");
  });

  test("has GitHub link pointing to correct URL", async ({ page }) => {
    const githubLink = page.locator('a:has-text("GitHub")');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute(
      "href",
      "https://www.github.com/tjrobinson",
    );
  });

  test("displays footer with copyright", async ({ page }) => {
    await expect(page.locator("footer")).toContainText("Tom Robinson");
  });

  test("Content link navigates successfully", async ({ page }) => {
    await page.click('a:has-text("Content")');
    await expect(page).toHaveURL(/\/content\//);
  });
});
