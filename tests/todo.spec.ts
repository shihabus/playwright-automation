import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/en";

test("should be able to add a new todo", async ({ page }) => {
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

  await page.getByTestId("add").click();
  await page.getByTestId("new-todo").fill("Learn playwright");
  await page.getByTestId("submit-newTask").click();

  const todoItem = await page.getByTestId("todo-item");
  expect(await todoItem.innerText()).toEqual("Learn playwright");
});

test("should be able to delete a todo", async ({ page }) => {
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

  await page.getByTestId("add").click();
  await page.getByTestId("new-todo").fill("Learn playwright");
  await page.getByTestId("submit-newTask").click();

  const todoItem = await page.getByTestId("todo-item");
  expect(await todoItem.innerText()).toEqual("Learn playwright");

  await page.getByTestId("delete").click();
  const noTodo = await page.getByTestId("no-todos");
  await expect(noTodo).toBeVisible();
});
