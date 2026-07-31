
# 💰 Expense Manager REST API

![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Express.js](https://img.shields.io/badge/Express.js-4.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![JWT](https://img.shields.io/badge/JWT-Authentication-blue)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Storage-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)


A **production-ready Expense Manager REST API** built with **Node.js**, **Express.js**, and **MongoDB Atlas**.

This project demonstrates modern backend development practices including secure JWT authentication, OTP-based email verification, password recovery, receipt image uploads, centralized error handling, validation, and RESTful API design.

---

# 📑 Table of Contents

- Features
- Tech Stack
- Project Structure
- Installation
- Environment Variables
- API Endpoints
- Security
- Project Highlights
- Future Improvements
- Contributing
- License
- Author

---

# ✨ Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing (bcrypt)
- Email OTP Verification
- Resend OTP
- Forgot Password
- Reset Password


## Expense Management

- Create Expense
- Update Expense
- Delete Expense
- Get Expense by ID
- Get All Expenses
- Pagination
- Searching
- Category Filtering
- Sorting
- Receipt Upload
- Cloudinary Image Storage

## 👤 User Profile

- View User Profile
- Update User Profile
- Send OTP for Password Change
- Change Password
- Delete User Account
- JWT Protected Profile Routes

## ✈️ Expense Trips

- Create Trip
- Update Trip
- Delete Trip
- View Trips
- Associate Expenses with Trips

## 📊 Dashboard APIs

- Total Expenses
- Total Expense Amount
- Highest Expense
- Average Expense
- Monthly Expense Statistics
- Category-wise Statistics
- Recent Expenses


## Validation

- Joi Validation
- Meaningful Error Messages

## 📧 Email Services

- OTP Verification Emails
- Password Reset Emails
- Reusable Email Service


## Security

- JWT Authentication
- bcrypt Password Hashing
- Helmet
- CORS
- express-rate-limit
- express-mongo-sanitize
- Joi Validation
- Centralized Error Handling

## Other

- Multer File Upload
- Nodemailer
- Async Error Handler
- Centralized Error Handler
- MongoDB Atlas
- Mongoose ODM

---

# 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT, bcrypt |
| Validation | Joi |
| Uploads | Multer, Cloudinary |
| Email | Nodemailer |
| Security | Helmet, CORS, express-rate-limit, express-mongo-sanitize |

---

# 📁 Project Structure

```text
expense-manager-backend/
│
├── config/
│   ├── cloudinary.js
│   ├── db.js
│   └── mailer.js
│
├── controller/
│   ├── expenseController.js
│   ├── ExpenseTripController.js
│   └── userController.js
│
├── middleware/
│   ├── asyncHandler.js
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── expensemiddleware.js
│   ├── tripMiddleware.js
│   └── uploadmiddleware.js
│
├── model/
│   ├── Expense.js
│   ├── ExpenseTrip.js
│   └── User.js
│
├── router/
│   ├── expenseRoute.js
│   ├── expenseTripRouter.js
│   └── userRouter.js
│
├── services/
│   └── emailService.js
│
├── uploads/
│
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

```bash
git clone https://github.com/Dhruv05-hue/expense-manager-api.git
cd expense-manager-api
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

Run:

```bash
npm start
```

or

```bash
nodemon app.js
```

---

# 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server Port |
| MONGO_URI | MongoDB Atlas Connection String |
| JWT_SECRET | JWT Secret |
| EMAIL_USER | Gmail Address |
| EMAIL_PASS | Gmail App Password |
| CLOUDINARY_CLOUD_NAME | Cloudinary Cloud Name |
| CLOUDINARY_API_KEY | Cloudinary API Key |
| CLOUDINARY_API_SECRET | Cloudinary API Secret |

---

# 🚀 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /user/signup |
| POST | /user/login |
| POST | /user/verifyotp |
| POST | /user/resendotp |
| POST | /user/forgotpassword |
| POST | /user/resetpassword |

---

## User Profile

| Method | Endpoint |
|---------|----------|
| GET | /user/profile |
| PUT | /user/profile |
| POST | /user/change-password/send-otp |
| PUT | /user/change-password |
| DELETE | /user/delete |

---

## Expenses

| Method | Endpoint |
|---------|----------|
| GET | /expense/expenses |
| GET | /expense/expenses/:id |
| POST | /expense/expenses |
| PUT | /expense/expenses/:id |
| DELETE | /expense/expenses/:id |
| GET | /expense/dashboard |

---

## Expense Trips

| Method | Endpoint |
|---------|----------|
| GET | /trip |
| GET | /trip/:id |
| POST | /trip |
| PUT | /trip/:id |
| DELETE | /trip/:id |
| GET | /trip/dashboard/:id |
---

# 📨 Sample Request

```json
{
  "name": "Fuel",
  "amount": 3000,
  "category" : "Travel",
  "receipt" : "Image of the receipt ",
  "description" : "Fast petrol fuel for sports car"
}
```

---

# ✅ Sample Success Response

```json
{
    "success": true,
    "message": "Expense added successfully",
    "expense": {
        "name": "Fuel",
        "amount": 3000,
        "receipt": "https://res.cloudinary.com/f1pf6ynr/image/upload/v1785452612/expense_receipts/1785452609033-bank.png",
        "receiptPublicId": "expense_receipts/1785452609033-bank",
        "category": "Travel",
        "description": "Fast petrol fuel for sports car",
        "trip": null,
        "user": "6a6a9b37184e49e4acb41824",
        "_id": "6a6bd844ab83c2393ac91f20",
        "createdAt": "2026-07-30T23:03:32.056Z",
        "updatedAt": "2026-07-30T23:03:32.056Z",
        "__v": 0
    }
}

```

## Login

```json
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
      "id": "6a6be740df420097b08b1b16",
      "name": "Kalpana",
      "email": "kalpanapawar2711@gmail.com"
  }
}
```

---

# ❌ Sample Error Response

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "Name is required.",
    "Amount must be greater than zero."
  ]
}
```

```json
{
  "success": false,
  "message": "Invalid or expired token."
}
```

---

# 🔒 Security

- JWT Authentication
- bcrypt Password Hashing
- Helmet
- CORS
- Rate Limiting
- MongoDB Sanitization
- Joi Validation
- Centralized Error Handling

---

# 🌟 Project Highlights

- RESTful API Design
- Modular Folder Structure
- JWT Authentication
- OTP Email Verification
- Password Recovery
- Expense Management
- Expense Trip Management
- Cloudinary Image Upload
- Dashboard Aggregation APIs
- Secure Middleware
- Production-ready Error Handling

# 📈 Future Improvements

- Swagger / OpenAPI Documentation
- Docker Support
- Unit Testing
- Integration Testing
- CI/CD Pipeline

---

# 🤝 Contributing

Fork the repository, create a feature branch, commit your changes, push the branch, and open a Pull Request.

---

# 📄 License

MIT License.

---

# 👨‍💻 Author

**Dhruv**

AI & Backend Developer

⭐ If you found this project useful, consider giving it a star on GitHub.
