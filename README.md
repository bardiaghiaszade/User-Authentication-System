# User Authentication System

A web-based authentication application built with **Python, Flask, SQLite, HTML, CSS, and JavaScript**.

The project focuses on user account management, authentication, password security, email notifications, and password recovery. It also includes a dashboard interface with sample banking information.

> **Note:** This is an educational project. The dashboard currently displays static sample data. It does not perform real banking operations, process payments, or manage actual financial transactions.

---

## Table of Contents

- [Features](#features)
- [Authentication](#authentication)
- [Password Recovery](#password-recovery)
- [Email Service](#email-service)
- [Security](#security)
- [Session Management](#session-management)
- [Frontend](#frontend)
- [Application Logging](#application-logging)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Email Configuration](#email-configuration)
- [Running the Application](#running-the-application)
- [Routes and API Endpoints](#routes-and-api-endpoints)
- [Database](#database)
- [Current Limitations](#current-limitations)

---

## Features

- User registration with personal and account information
- Login using email and password
- Automatic login after successful registration
- Password hashing using Werkzeug
- Password recovery through email verification
- Six-digit verification codes with a 10-minute expiration period
- Welcome email after successful registration
- Email notifications using Gmail SMTP
- SQLite database for storing user information
- Flask session management
- Responsive frontend interface
- Light and dark theme support
- Password visibility and validation features
- Application logging

## Authentication

### Sign Up

Users can create an account by providing:

- First name
- Last name
- Phone number
- Email address
- Username
- Password

The registration process works as follows:

1. The frontend collects the user's information.
2. JavaScript sends the information to the Flask backend.
3. The backend processes the registration data.
4. The password is hashed before being stored.
5. The account is created in the SQLite database.
6. The user's ID is stored in the Flask session.
7. A welcome email is sent to the registered email address.

After successful registration, the user is automatically logged in.

If sending the welcome email fails, the account creation is not rolled back.

### Login

Users can log in using their registered email address and password.

The backend retrieves the account from the database and checks the entered password against the stored password hash.

If the credentials are correct, the user's ID is saved in the Flask session and the user can access the dashboard.

Incorrect credentials result in an authentication error.

### Password Hashing

Passwords are not stored as plain text.

The application uses Werkzeug's password hashing functions:

```python
generate_password_hash(password)
```

and:

```python
check_password_hash()
```

The original password is not stored directly in the database.

---

## Password Recovery

The application provides a multi-step password recovery process.

### Step 1 — Request a Password Reset

The user enters the email address associated with their account.

The backend checks whether an account with that email exists.

### Step 2 — Generate a Verification Code

A six-digit verification code is generated using Python's `secrets` module.

The code is sent to the user's email address.

Instead of storing the verification code directly, the application stores its password hash in the database.

The code expires after **10 minutes**.

### Step 3 — Verify the Code

The user enters the received verification code.

The backend:

1. Retrieves the stored verification information.
2. Checks whether the code has expired.
3. Compares the entered code with the stored hash.
4. Authorizes the password reset if the code is correct.
5. Clears the verification code so it cannot be reused.

### Step 4 — Set a New Password

After successful verification, the user can enter a new password.

The new password is hashed and replaces the previous password hash in the database.

The password recovery session information is then cleared.

The user must use the new password for subsequent logins.

---

## Email Service

The application uses Python's `smtplib` and `EmailMessage` modules to send emails through Gmail SMTP.

Two types of emails are implemented.

### 1. Welcome Email

After successful registration, the application attempts to send a welcome email containing:

- The user's first name
- A welcome message
- An animated GIF

### 2. Password Reset Email

During password recovery, the application sends an HTML email containing:

- A six-digit verification code
- A message explaining the 10-minute expiration period
- Instructions for users who did not request a password reset

### Email Configuration

Email credentials are loaded from environment variables using `python-dotenv`.

The application uses Gmail's SMTP server with SSL on port `465`.

See [Email Configuration](#email-configuration) for setup instructions.

---

## Security

The project implements several basic security measures.

### Password Hashing

Passwords and password recovery codes are stored as hashes rather than plain text.

### Parameterized SQL Queries

Database queries use parameter placeholders (`?`) instead of directly inserting user input into SQL statements.

This helps protect database operations against SQL injection.

### Unique Account Information

The database defines unique constraints for:

- Email addresses
- Usernames

This prevents duplicate values for these account identifiers.

### Verification Code Expiration

Password recovery codes expire after 10 minutes.

### One-Time Verification

After a successful verification, the stored verification code is cleared to prevent reuse.

### Environment Variables

Email credentials are loaded from a `.env` file instead of being written directly into the email service source code.

The `.env` file is excluded from Git using `.gitignore`.

> **Security note:** The Flask secret key in the current source code is a placeholder. It must be replaced with a securely generated secret stored in an environment variable before deployment. The application is intended for development and educational use, not production authentication.

---

## Session Management

Flask sessions are used to maintain authentication and password recovery state.

### Login Session

After successful login or registration, the application stores:

```python
session["user_id"] = user_id
```

The dashboard checks this value before displaying the page.

If no authenticated user ID exists, the user is redirected to the login page.

The backend also retrieves the corresponding user from the database before rendering the dashboard.

### Password Recovery Session

The password recovery process uses session values to keep track of the account being recovered and whether the verification code has been successfully verified.

These values are cleared after a successful password reset.

---

## Frontend

The frontend is built with HTML, CSS, and JavaScript.

### User Interface

The application contains separate pages for:

- Login
- Sign Up
- Forgot Password
- Verification Code
- Password Recovery
- Dashboard

The HTML templates are rendered by Flask using Jinja.

### Styling and Layout

The application uses a shared CSS file to define the visual appearance of its pages.

The interface includes:

- Structured page layouts
- Form styling
- Buttons and navigation elements
- Dashboard panels and cards
- Responsive layout rules
- Light and dark theme styling

### Password User Experience

JavaScript provides password-related interface functionality, including:

- Password visibility controls
- Password strength feedback
- Password confirmation checks
- Password input validation

### Theme Switching

Users can switch between light and dark themes.

The selected theme is stored in the browser's `localStorage`, allowing the preference to remain available after reloading the page.

### Dashboard Interface

The dashboard contains a banking-style interface with:

- A header and navigation area
- User greeting
- Account summary cards
- Recent transaction table
- Monthly overview chart
- Send Money interface elements

**Important:** The displayed balance, income, expenses, transaction records, and chart values are sample data. They are not retrieved from real financial records or calculated from actual transactions.

---

## Application Logging

The application uses Python's `logging` module with a `RotatingFileHandler`.

Log files are stored in:

```text
logs/app.log
```

Current logging configuration:

| Setting | Value |
|---|---|
| Logging level | INFO |
| Maximum file size | 5 MB |
| Backup files | 5 |
| Handler | RotatingFileHandler |

The log format includes:

- Timestamp
- Logging level
- Logger name
- Log message

Some application events are recorded, including successful login, failed login attempts, password reset activity, and email-related errors.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Python | Main programming language |
| Flask | Backend web framework |
| SQLite | Database |
| HTML | Page structure |
| CSS | Styling and responsive layouts |
| JavaScript | Frontend interactions |
| Werkzeug | Password hashing |
| python-dotenv | Environment variable loading |
| smtplib | Sending emails |
| Chart.js | Dashboard chart |
| Git | Version control |

---

## Project Structure

```text
User-Authentication-System/
│
├── app.py
├── run.py
├── auth.py
├── database.py
├── email_service.py
├── log.py
│
├── platform.db
├── requirements.txt
├── .env.example
├── .gitignore
├── TODO.md
│
├── logs/
│
├── static/
│   ├── style.css
│   │
│   └── js/
│       ├── script.js
│       ├── login.js
│       ├── signup.js
│       ├── forgotPass.js
│       ├── verifycode.js
│       ├── resetPassword.js
│       ├── password.js
│       └── theme.js
│
└── templates/
    ├── login.html
    ├── signup.html
    ├── dashboard.html
    ├── forgotPass.html
    ├── verifycode.html
    └── recoverPass.html
```

### Backend Files

| File | Description |
|---|---|
| `app.py` | Flask application, page routes, API endpoints, and session handling |
| `run.py` | Application entry point |
| `auth.py` | User creation, login verification, password hashing, and database authentication operations |
| `database.py` | SQLite connection and database table initialization |
| `email_service.py` | Welcome and password recovery emails |
| `log.py` | Application logging configuration |

### Frontend Files

| File | Description |
|---|---|
| `templates/` | HTML pages rendered by Flask |
| `static/style.css` | Main stylesheet |
| `static/js/script.js` | Frontend JavaScript initialization |
| `static/js/login.js` | Login form functionality |
| `static/js/signup.js` | Registration form functionality |
| `static/js/forgotPass.js` | Password recovery request |
| `static/js/verifycode.js` | Verification code handling |
| `static/js/resetPassword.js` | New password submission |
| `static/js/password.js` | Password-related interface functionality |
| `static/js/theme.js` | Theme switching |

---

## Installation

### Requirements

- Python 3
- pip
- Git
- A Gmail account if email functionality is required

### 1. Clone the Repository

```bash
git clone https://github.com/bardiaghiaszade/financial-platform.git
```

Navigate into the project directory:

```bash
cd financial-platform
```

### 2. Create a Virtual Environment

**Windows:**

```powershell
python -m venv venv
```

Activate it:

```powershell
venv\Scripts\activate
```

**Linux / macOS:**

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Email Configuration

Email functionality requires Gmail credentials and a properly configured `.env` file.

### 1. Create a `.env` File

Create a new file named exactly `.env` in the project's root directory (the same directory as `app.py` and `requirements.txt`).

The project already includes a file named `.env.example`, which serves as a template.

Open `.env.example`, copy its contents, and paste them into your newly created `.env` file.

**Important:** The file must be named `.env`, not `.env.txt`.

### 2. Add Your Gmail Credentials

Your `.env` file should contain the following variables:

```env
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

Replace the example values with your own Gmail address and App Password.

### 3. Generate a Gmail App Password

> 🚨 **IMPORTANT — READ THIS BEFORE ENTERING YOUR PASSWORD!**

> 🚨 **DO NOT enter your normal Gmail account password in `EMAIL_PASSWORD`. It will NOT work!**

You must generate a special password called a **Google App Password**. This is different from your regular Gmail login password.

Many users mistakenly enter their normal Gmail password here. This is incorrect and will cause email sending to fail.

To generate an App Password:

1. Sign in to your Google Account.
2. Open [Google Account Security](https://myaccount.google.com/security).
3. Enable **2-Step Verification** if it is not already enabled.
4. Open the [Google App Passwords page](https://myaccount.google.com/apppasswords).
5. Generate a new App Password.
6. Copy the generated password and use it as `EMAIL_PASSWORD` in your `.env` file.

> 🚨 **REMEMBER: Use the generated Google App Password, NOT the password you normally use to sign in to Gmail.**

### 4. Example of a Completed `.env` File

```env
EMAIL_ADDRESS=yourname@gmail.com
EMAIL_PASSWORD=your_generated_app_password
```

Replace both values with your own credentials. Do not include quotation marks unless specifically required.

### 5. Keep Your Credentials Private

> 🚨 **NEVER upload your `.env` file or share your Gmail credentials on GitHub.**

The repository's `.gitignore` excludes the `.env` file to help prevent accidental uploads.

**Note:** If you change your Google App Password, remember to update `EMAIL_PASSWORD` in your `.env` file as well.

---

## Running the Application

After installing the dependencies and configuring the environment, start the application:

```bash
python run.py
```

The Flask development server runs locally.

Open the following address in your browser:

```text
http://127.0.0.1:5000
```

The application currently runs with Flask debug mode enabled. Debug mode should not be enabled in production.

---

## Routes and API Endpoints

### Page Routes

| Route | Description |
|---|---|
| `/` | Login page |
| `/login` | Login page |
| `/signup` | Registration page |
| `/forgot-password` | Password recovery request page |
| `/verify-code` | Verification code page |
| `/recover-pass` | New password page |
| `/dashboard` | Authenticated dashboard |

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/signup` | Creates a new user account |
| POST | `/api/login` | Authenticates a user |
| POST | `/api/forgotPass` | Requests a password reset code |
| POST | `/api/verify-code` | Verifies the recovery code |
| POST | `/api/reset-password` | Updates the user's password |

The API endpoints exchange JSON data with the frontend JavaScript.

---

## Database

The application uses SQLite for persistent user account storage.

The database file is:

```text
platform.db
```

The database connection and table initialization are handled by `database.py`.

The `users` table contains the following columns:

| Column | Description |
|---|---|
| `id` | Unique user ID |
| `first_name` | User's first name |
| `last_name` | User's last name |
| `phone_number` | User's phone number |
| `email` | Unique email address |
| `user_name` | Unique username |
| `password` | Hashed password |
| `verification_code_hash` | Hashed password recovery code |
| `verification_expires_at` | Verification code expiration time |

The database table is created automatically when a database connection is opened if it does not already exist.

The initialization code also checks for the password recovery columns and adds them when they are missing from an existing database.

---

## Current Limitations

- The dashboard currently displays static sample banking information.
- Account balances and transaction records are not connected to actual financial operations.
- The Send Money interface does not implement real money transfers.
- The application does not currently provide a complete banking or transaction management backend.
- The Flask secret key is currently a placeholder and must be configured securely before deployment.
- The application runs in Flask debug mode.
- The current Log Out link redirects to the login page but does not explicitly clear the authenticated session.

This project demonstrates web application development concepts such as authentication, database operations, password hashing, email integration, session management, and frontend/backend communication.
