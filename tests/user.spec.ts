import { expect, test } from "@playwright/test";
import User from "../models/User";

test("should be able to register to our application", async ({ page }) => {
  await page.goto("/signup");

  const user = new User();

  await page.getByTestId("first-name").fill(user.getFirstName());
  await page.getByTestId("last-name").fill(user.getLastName());
  await page.getByTestId("email").fill(user.getEmail());
  await page.getByTestId("password").fill(user.getPassword());
  await page.getByTestId("confirm-password").fill(user.getPassword());

  await page.getByTestId("submit").click();

  const welcomeMessage = page.locator("[data-testid=welcome]");
  await expect(welcomeMessage).toBeVisible();
});
