const Joi = require("joi");

const expenseSchema = Joi.object({

    name: Joi.string()
        .trim()
        .min(2)
        .max(30)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 2 characters long",
            "string.max": "Name cannot exceed 30 characters",
            "any.required": "Name is required"
        }),

    amount: Joi.number()
        .min(1)
        .max(10000000)
        .required()
        .messages({
            "number.base": "Amount should be a number",
            "number.min": "Amount should be greater than zero",
            "number.max": "Amount cannot exceed 10,000,000",
            "any.required": "Amount is required"
        })

});

function expenseMiddleware(req, res, next) {

    const { error } = expenseSchema.validate(req.body, {
        abortEarly: false
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