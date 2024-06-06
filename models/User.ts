import { faker } from "@faker-js/faker/locale/en";

export default class User {
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private access_token: string;
  private userID: string;

  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.email();
    this.password = faker.internet.password();
  }

  public getFirstName() {
    return this.firstName;
  }
  public getLastName() {
    return this.lastName;
  }
  public getEmail() {
    return this.email;
  }
  public getPassword() {
    return this.password;
  }

  getAccessToken() {
    return this.access_token;
  }

  getUserID() {
    return this.userID;
  }

  setAccessToken(accessToken: string) {
    this.access_token = accessToken;
  }

  setUserID(useId: string) {
    this.userID = useId;
  }
}
