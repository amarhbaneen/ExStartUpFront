export class User {
  // Constructor initializes user properties
  constructor(
    public username: string,  // User's username
    public password: string,  // User's password
    public id: number,        // User's unique identifier
    public firstName: string, // User's first name
    public surName: string,   // User's surname
    public role: string,      // User's role (e.g., admin, user)
  ) {}
}
