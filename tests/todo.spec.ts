import { test, expect } from "@playwright/test";
import User from "../models/User";
import TodoApi from "../apis/TodoApi";
import SignUpPage from "../pages/SignUpPage";
import UserApi from "../apis/UserApi";
import TodoPage from "../pages/TodoPage";
import NewTodoPage from "../pages/NewTodoPage";

test("should be able to add a new todo", async ({ page, request, context }) => {
  const user = new User();

  const signUpPage = new SignUpPage();
  await signUpPage.signUpByApi(request, user, context);

  const newTodoPage = new NewTodoPage();
  await newTodoPage.load(page);

  await newTodoPage.addTodo(page, "Learn playwright");

  const todoPage = new TodoPage();
  const todoItem = await todoPage.getTodoItem(page);
  expect(await todoItem.innerText()).toEqual("Learn playwright");
});

test("should be able to delete a todo", async ({ page, request, context }) => {
  const user = new User();

  // TODO: resolve bug signing up via API
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

  const todoPage = new TodoPage();
  await todoPage.load(page);

  // const newTodoPage = new NewTodoPage();
  // await newTodoPage.addTodoByApi(learnPlaywright, request, user);

  // await new TodoApi().addTodo(learnPlaywright, request, user);

  // const todoItem = await page.getByTestId("todo-item");
  // expect(await todoItem.innerText()).toEqual(learnPlaywright);

  // await todoPage.deleteTodo(page);
  // const noTodo = await todoPage.getNoTodoMessage(page);
  // await expect(noTodo).toBeVisible();
});
