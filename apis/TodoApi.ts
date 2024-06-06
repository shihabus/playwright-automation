import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class TodoApi {
  async addTodo(todoItem: string, request: APIRequestContext, user: User) {
    return await request.post("/api/v1/tasks", {
      data: {
        isCompleted: false,
        item: todoItem,
      },
      headers: {
        Authorization: `Bearer ${user.getAccessToken()}`,
      },
    });
  }
}
