const Joi = require("joi");

const tripSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Trip name is required",
      "string.min": "Trip name must be at least 2 characters long",
      "string.max": "Trip name cannot exceed 50 characters",
      "any.required": "Trip name is required",
    }),

  destination: Joi.string()
    .trim()
    .max(50)
    .allow("")
    .optional()
    .messages({
      "string.max": "Destination cannot exceed 50 characters",
    }),

  budget: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base": "Budget should be a number",
      "number.min": "Budget must be greater than 0",
      "any.required": "Budget is required",
    }),

  startDate: Joi.date()
    .required()
    .messages({
      "date.base": "Start date is invalid",
      "any.required": "Start date is required",
    }),

  endDate: Joi.date()
    .required()
    .min(Joi.ref("startDate"))
    .messages({
      "date.base": "End date is invalid",
      "date.min": "End date cannot be before start date",
      "any.required": "End date is required",
    }),

  description: Joi.string()
    .trim()
    .max(300)
    .allow("")
    .optional()
    .messages({
      "string.max": "Description cannot exceed 300 characters",
    }),
});

function tripMiddleware(req, res, next) {
  const { error } = tripSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
}

module.exports = tripMiddleware;