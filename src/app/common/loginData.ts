export class LoginData {
  // Getter and setter for username property
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  // Getter and setter for password property
  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  // Constructor initializes username and password
  constructor(
    public _username: string,
    public _password: string,
  ) {}
}
