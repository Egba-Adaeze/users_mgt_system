# User Management API

This repository contains a RESTful API for user management. It allows users to register, log in, and access protected dashboard route. The API serves as the backend for a user management system.

## Features

- User Registration: Users can register by providing a unique username and password.
- User Login: Registered users can log in using their credentials and obtain an authentication token.
- Authentication Middleware: The API uses JWT tokens for authentication of protected routes.
- Protected Route: There is a protected route "/dashboard" that can only be accessed by authenticated users.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt for password hashing


## API Endpoints

### User Registration

Endpoint: `POST /register`

### User Login
Endpoint: `POST /login`

### User Dashboard
Endpoint: `GET /Dashboard`
This route can only be accessed by authenticated users. It returns a simple message with the user's username.

### Authentication:
Include the token obtained from the login request in the request header:
Authorization: Bearer <your-token>


### Error Handling
The API returns informative error messages for invalid requests or authentication issues.
Database errors are handled and appropriate error messages are returned.

### Contribution
Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.


