# MERN Secure Auth 🔐

MERN Secure Auth is a robust, full-stack user authentication system built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a complete, production-ready solution for the entire user lifecycle, from registration and email verification to session management and secure password resets.

## Features ✨

-   **Secure Registration & Login**: New user accounts are protected with server-side validation and password hashing via `bcrypt`.
-   **JWT-Based Session Management**: Implements authentication strategy using JSON Web Tokens (JWT) for secure and scalable session control.
-   **Automated Email Verification**: Ensures user validity by sending a unique, secure verification link to the user's email inbox using `nodemailer`.
-   **Secure Password Reset Flow**: A complete, token-based system allows users to securely reset their password if forgotten.
-   **Protected Routes**: Both backend API endpoints and frontend UI routes are protected, ensuring that only authenticated users can access sensitive data and pages.
-   **Instant Feedback**: Utilizes `react-hot-toast` for non-blocking notifications for all user actions.

A primary goal of this project was to build a secure authentication flow typical of modern web applications. I achieved this with a JWT-based strategy:

1.  **Token Generation**: Upon successful login (after verifying credentials with `bcrypt.compare`), the Express server generates and signs a JSON Web Token (JWT) containing a user ID payload and an expiration date.
2.  **Client-Side Storage**: This JWT is sent to the React client, where it is stored in `localStorage` (or an HttpOnly cookie for enhanced security).
3.  **Authenticated API Requests**: To access private data, every request from the browser must include the user's secret token. A middleware on the server then checks this token to make sure it's valid before sending any data back.
4.  **Backend Middleware Verification**: A custom Express middleware intercepts these requests. It validates the JWT's signature using a secret key, checks for expiration, and extracts the user ID from the payload. If the token is valid, the user is authorized to access the resource; otherwise, a `401 Unauthorized` error is returned.

## Tech Stack 🛠️

#### Frontend
-   **React** (with Create React App or Vite)
-   **React Router** for client-side routing
-   **Axios** for API requests
-   **React Hot Toast** for notifications
-   **[Your Styling Choice, e.g., Tailwind CSS, Material-UI]** for styling

#### Backend
-   **Node.js**
-   **Express.js** for the server and REST API
-   **MongoDB** (with **Mongoose**) as the database
-   **JSON Web Token (`jsonwebtoken`)** for signing and verifying tokens
-   **Bcrypt.js** for password hashing
-   **Nodemailer** for sending transactional emails
-   **Dotenv** for managing environment variables



