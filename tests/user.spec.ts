import { expect, test } from "@playwright/test";

test("should be able to register to our application", async ({ page }) => {
  await page.goto("https://todo.qacart.com/signup");

  await page.getByTestId("first-name").fill("Shihab");
  await page.getByTestId("last-name").fill("Subair");
  await page.getByTestId("email").fill("test-shihasubairb@test.com");
  await page.getByTestId("password").fill("testUser@1");
  await page.getByTestId("confirm-password").fill("testUser@1");

  await page.getByTestId("submit").click();

  const welcomeMessage = page.locator("[data-testid=welcome]");
  await expect(welcomeMessage).toBeVisible();
});
