require("dotenv").config();
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const path = require("path");
const expenseRouter = require("./router/expenseRoute.js");
const userRouter = require("./router/userRouter.js");
const connect_db = require("./config/db.js");
const errorHandler = require("./middleware/errorHandler.js");



const app = express();
app.set("trust proxy", 1);
// Connect Database
connect_db();

// Parse JSON
app.use(express.json());


// Security Middleware
app.use(helmet());

app.use(cors());

app.use(mongoSanitize());

// Rate Limiter (Only for Authentication Routes)
const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    message: "Too many requests. Try again later."

});

app.use("/uploads",express.static(path.join(__dirname, "uploads"))
);
// whenever the request comes for user route put limiter on it as its for login and sign up
app.use("/user", limiter);

// Routes
app.use("/expense", expenseRouter);
app.use("/user", userRouter);

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server has started on port ${PORT}`);

});