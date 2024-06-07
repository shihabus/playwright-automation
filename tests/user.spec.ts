import { expect, test } from "@playwright/test";
import User from "../models/User";
import SignUpPage from "../pages/SignUpPage";
import TodoPage from "../pages/TodoPage";

test("should be able to register to our application", async ({ page }) => {
  const user = new User();

  const signUpPage = new SignUpPage();

  await signUpPage.load(page);
  await signUpPage.signUp(page, user);

  const todoPage = new TodoPage();
  const welcomeMessage = todoPage.getWelcomeMessageElem(page);
  await expect(welcomeMessage).toBeVisible();
});
