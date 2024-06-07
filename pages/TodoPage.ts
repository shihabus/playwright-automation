import { Page } from "@playwright/test";

export default class TodoPage {
  private get welcomeMessage() {
    return `[data-testid=welcome]`;
  }

  private get deleteIcon() {
    return `delete`;
  }

  private get noTodoMessage() {
    return `no-todos`;
  }

  async load(page: Page) {
    await page.goto("/todo");
  }

  getWelcomeMessageElem(page: Page) {
    return page.locator(this.welcomeMessage);
  }

  async deleteTodo(page: Page) {
    await page.getByTestId(this.deleteIcon).click();
  }

  async getNoTodoMessage(page: Page) {
    return await page.getByTestId(this.noTodoMessage);
  }
}
