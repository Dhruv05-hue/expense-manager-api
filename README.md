
# 💰 Expense Manager REST API

![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Express](https://img.shields.io/badge/Express-4.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![JWT](https://img.shields.io/badge/JWT-Authentication-blue)
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
- Sample Request Bodies
- Sample Responses
- Security
- Future Improvements
- Contributing
- License
- Author

---

# ✨ Features

## Authentication

- User Registration
- Login
- JWT Authentication
- Password Hashing (bcrypt)
- Email OTP Verification
- Resend OTP
- Forgot Password
- Reset Password

## Expense Management

- Create Expense
- Get All Expenses
- Get Expense by ID
- Update Expense
- Delete Expense
- Receipt Image Upload
- Receipt URL Generation

## Validation

- Joi Validation
- Meaningful Error Messages

## Security

- JWT
- Helmet
- CORS
- express-rate-limit
- express-mongo-sanitize
- bcrypt Password Hashing

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
|-----------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT, bcrypt |
| Validation | Joi |
| Uploads | Multer |
| Email | Nodemailer |
| Security | Helmet, CORS, Rate Limiter, Mongo Sanitize |

---

# 📁 Project Structure

```text
expense-manager-api/
├── config/
├── controllers/
├── helpers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
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
| MONGO_URI | MongoDB Atlas Connection |
| JWT_SECRET | JWT Secret |
| EMAIL_USER | Gmail Address |
| EMAIL_PASS | Gmail App Password |

---

# 🚀 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /signup |
| POST | /login |
| POST | /verify-otp |
| POST | /resend-otp |
| POST | /forgot-password |
| POST | /reset-password |

## Expenses

| Method | Endpoint |
|---------|----------|
| GET | /expenses |
| GET | /expenses/:id |
| POST | /expenses |
| PUT | /expenses/:id |
| DELETE | /expenses/:id |

---

# 📨 Sample Request

```json
{
  "name": "Groceries",
  "amount": 2500
}
```

---

# ✅ Sample Success Response

```json
{
  "success": true,
  "message": "Expense added successfully.",
  "expense": {
    "_id": "68872dc4b3d5",
    "name": "Groceries",
    "amount": 2500,
    "receipt": "uploads/bill.png",
    "receiptUrl": "http://localhost:3000/uploads/bill.png"
  }
}
```

## Login

```json
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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

# 📈 Future Improvements

- [ ] Cloudinary Integration
- [ ] Docker Support
- [ ] Swagger Documentation
- [ ] Dashboard Analytics
- [ ] Unit Testing
- [ ] CI/CD Pipeline
- [ ] React Frontend

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
