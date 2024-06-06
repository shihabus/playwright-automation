import { test, expect } from "@playwright/test";

test("should be able to add a new todo", async ({ page }) => {
  await page.goto("/signup");

  await page.getByTestId("first-name").fill("Shihab");
  await page.getByTestId("last-name").fill("Shana");
  await page.getByTestId("email").fill("test-shihabshana@test.com");
  await page.getByTestId("password").fill("testUser@1");
  await page.getByTestId("confirm-password").fill("testUser@1");

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

  await page.getByTestId("first-name").fill("Shihab");
  await page.getByTestId("last-name").fill("Shana Furhath");
  await page.getByTestId("email").fill("test-shihabshanaFur@test.com");
  await page.getByTestId("password").fill("testUser@1");
  await page.getByTestId("confirm-password").fill("testUser@1");

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
