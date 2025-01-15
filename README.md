# User Management Angular Application

## Features:
- **User Creation & Management**: Admins can create, edit, and delete users, with flexible role management (Admin, User).
- **Role-Based Access**: Admins can manage users; regular users can only edit their own profiles.
- **Password Management**: Admins can reset passwords, while users can change their own.
- **Responsive UI**: Angular and Angular Material ensure a responsive design.
- **JWT Authentication**: Secure authentication with role-based access using JWT.

## Technologies Used:
- Angular 14+
- Angular Material
- JWT Authentication
- RxJS (Reactive programming)

## Setup:

# Prerequisites:
- Node.js and npm
- Angular CLI globally installed (`npm install -g @angular/cli`)

# Installation:

# Clone the Repository:
git clone <repository-url>
cd <project-directory>

# Install Dependencies:
npm install

# Run the Application:
ng serve
# Access it via http://localhost:4200

## Configuration:
Update the backend API URL in `src/environments/environment.ts` for JWT authentication.

## Components:
- **LoginPageComponent**: Handles user authentication and stores JWT in `localStorage`.
- **UserListComponent**: Admins can manage users, and regular users can only edit their profiles.
- **CreateUserComponent**: Admins create new users and assign roles.
- **UserDetailsComponent**: Admins or users can edit and reset passwords securely.
- **UserPageComponent**: Users can view and update their profile details.

## Authentication Flow:
- Login with username and password.
- On success, JWT token is stored in localStorage.
- Admins and users access their respective features based on JWT roles.

## Example Users:
- **Admin**: Username: `admin`, Password: `admin123`
- **Regular User**: Username: `john_doe`, Password: `password123`

## Security Considerations:
- Passwords are securely hashed, never stored in plain text.
- Role-based access control using JWT tokens for secure access.

## Customization:
- Add more user roles (e.g., Manager, Supervisor).
- Extend with RESTful API support for backend integration.
- Add additional user fields like phone numbers or addresses.

## License:
MIT License
