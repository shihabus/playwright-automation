import { test, expect } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import TodoApi from "../apis/TodoApi";

test("should be able to add a new todo", async ({ page, request, context }) => {
  const user = new User();

  // signing up via API
  const response = await new UserApi().signUp(request, user);

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
  const user = new User();

  // signing up via API
  const response = await new UserApi().signUp(request, user);

  const responseBody = await response.json();
  const access_token = responseBody.access_token;
  const firstName = responseBody.firstName;
  const userID = responseBody.userID;

  user.setAccessToken(access_token);
  user.setUserID(userID);

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

  await new TodoApi().addTodo(learnPlaywright, request, user);

  await page.goto("/todo");
  const todoItem = await page.getByTestId("todo-item");
  expect(await todoItem.innerText()).toEqual(learnPlaywright);

  await page.getByTestId("delete").click();
  const noTodo = await page.getByTestId("no-todos");
  await expect(noTodo).toBeVisible();
});
