import { APIRequestContext, Page } from "@playwright/test";
import TodoApi from "../apis/TodoApi";
import User from "../models/User";

export default class NewTodoPage {
  private get newTodo() {
    return `new-todo`;
  }

  private get todoSubmit() {
    return `submit-newTask`;
  }

  async load(page: Page) {
    await page.goto("/todo/new");
  }

  async addTodo(page: Page, todo: string) {
    await page.getByTestId(this.newTodo).fill(todo);
    await page.getByTestId(this.todoSubmit).click();
  }

  async addTodoByApi(newTodo: string, request: APIRequestContext, user: User) {
    await new TodoApi().addTodo(newTodo, request, user);
  }
}
