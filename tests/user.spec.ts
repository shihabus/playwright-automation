import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/en";

test("should be able to register to our application", async ({ page }) => {
  await page.goto("/signup");

  const password = faker.internet.password();
  await page.getByTestId("first-name").fill(faker.person.firstName());
  await page.getByTestId("last-name").fill(faker.person.lastName());
  await page.getByTestId("email").fill(faker.internet.email());
  await page.getByTestId("password").fill(password);
  await page.getByTestId("confirm-password").fill(password);

  await page.getByTestId("submit").click();

  const welcomeMessage = page.locator("[data-testid=welcome]");
  await expect(welcomeMessage).toBeVisible();
});
