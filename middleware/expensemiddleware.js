const Joi = require("joi");

const expenseSchema = Joi.object({

    name: Joi.string()
        .trim()
        .min(2)
        .max(30)
        .required()
        .messages({
            "string.empty": "Expense name is required",
            "string.min": "Expense name must be at least 2 characters long",
            "string.max": "Expense name cannot exceed 30 characters",
            "any.required": "Expense name is required"
        }),

    amount: Joi.number()
        .min(1)
        .max(10000000)
        .required()
        .messages({
            "number.base": "Amount should be a number",
            "number.min": "Amount must be greater than 0",
            "number.max": "Amount cannot exceed 10,000,000",
            "any.required": "Amount is required"
        }),

    category: Joi.string()
        .trim()
        .valid(
            "Food",
            "Drinks",
            "Transport",
            "Shopping",
            "Bills",
            "Entertainment",
            "Health",
            "Education",
            "Travel",
            "Other"
        )
        .required()
        .messages({
            "string.empty": "Category is required",
            "any.only":
                "Category must be one of Food, Transport, Shopping, Bills, Entertainment, Health, Education, Travel or Other",
            "any.required": "Category is required"
        })

});

function expenseMiddleware(req, res, next) {

    const { error } = expenseSchema.validate(req.body, {

        abortEarly: false,

        stripUnknown: true

    });

    if (error) {

        return res.status(400).json({

            success: false,

            message: "Validation failed.",

            errors: error.details.map(err => err.message)

        });

    }

    next();

}

module.exports = expenseMiddleware;