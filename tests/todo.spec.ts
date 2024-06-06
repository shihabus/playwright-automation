import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/en";
import User from "../models/User";

test("should be able to add a new todo", async ({ page, request, context }) => {
  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    faker.internet.password()
  );

  // signing up via API
  const response = await request.post("/api/v1/users/register", {
    data: {
      email: user.getEmail(),
      password: user.getPassword(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
    },
  });

  const responseBody = await response.json();
  const access_token = responseBody.access_token;
  const firstName = responseBody.firstName;
  const userID = responseBody.userID;

  // setting the cookie
  await context.addCookies([
    {
      name: "access_token",
      value: access_token,
      url: "https://todo.qacart.com",
    },
    {
      name: "firstName",
      value: firstName,
      url: "https://todo.qacart.com",
    },
    {
      name: "userID",
      value: userID,
      url: "https://todo.qacart.com",
    },
  ]);

  await page.goto("/todo/new");
  await page.getByTestId("new-todo").fill("Learn playwright");
  await page.getByTestId("submit-newTask").click();

  const todoItem = await page.getByTestId("todo-item");
  expect(await todoItem.innerText()).toEqual("Learn playwright");
});

test("should be able to delete a todo", async ({ page, request, context }) => {
  const user = new User(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    faker.internet.password()
  );

  // signing up via API
  const response = await request.post("/api/v1/users/register", {
    data: {
      email: user.getEmail(),
      password: user.getPassword(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
    },
  });

  const responseBody = await response.json();
  const access_token = responseBody.access_token;
  const firstName = responseBody.firstName;
  const userID = responseBody.userID;

  // setting the cookie
  await context.addCookies([
    {
      name: "access_token",
      value: access_token,
      url: "https://todo.qacart.com",
    },
    {
      name: "firstName",
      value: firstName,
      url: "https://todo.qacart.com",
    },
    {
      name: "userID",
      value: userID,
      url: "https://todo.qacart.com",
    },
  ]);

  const learnPlaywright = "Learn playwright";

  await request.post("/api/v1/tasks", {
    data: {
      isCompleted: false,
      item: learnPlaywright,
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  await page.goto("/todo");
  const todoItem = await page.getByTestId("todo-item");
  expect(await todoItem.innerText()).toEqual(learnPlaywright);

  await page.getByTestId("delete").click();
  const noTodo = await page.getByTestId("no-todos");
  await expect(noTodo).toBeVisible();
});
