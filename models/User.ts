export default class User {
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
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
}
