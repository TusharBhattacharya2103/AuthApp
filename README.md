# AuthN & AuthZ: Express.js Authentication System

A robust authentication and authorization system built with **Node.js**, **Express**, and **MongoDB**. This project implements secure user registration, login with JWT (JSON Web Tokens), and role-based access control (RBAC) using custom middlewares.



---

## 🚀 Features

* **Secure Signup**: Password hashing using `bcryptjs` before storage.
* **JWT Authentication**: Stateless authentication using JSON Web Tokens.
* **Role-Based Access Control (RBAC)**: Protected routes for `Students` and `Admins` using custom middleware.
* **Cookie Support**: Includes `cookie-parser` for handling secure token storage (ready for expansion).
* **Security Best Practices**: Automatically removes sensitive data (like passwords) from API responses.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB** | NoSQL Database |
| **Mongoose** | ODM for MongoDB Modeling |
| **JWT** | Secure Token-based Authentication |
| **Bcryptjs** | Password Hashing & Encryption |

---

## 📂 Project Structure

```bash
├── config/
│   └── database.js    # MongoDB connection setup
├── Controllers/
│   └── Auth.js        # Signup and Login logic
├── middlewares/
│   └── auth.js        # JWT & Role validation middlewares
├── models/
│   └── User.js        # Mongoose Schema for User
├── routes/
│   └── user.js        # API route definitions
├── .env               # Environment variables (PORT, MONGODB_URL, JWT_SECRET)
├── index.js           # Entry point & Server configuration
└── package.json       # Dependencies and scripts
