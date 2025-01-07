export class LoginData {
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
  constructor(
    public _username: string,
    public _password: string,
  ){}

}
