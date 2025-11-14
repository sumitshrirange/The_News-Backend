const yup = require("yup");

const registerSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be atleast of 3 charactors long")
    .required(),
  email: yup.string().email("Email is not valid").required(),
  password: yup
    .string()
    .min(8, "Password must be atleast of 8 charactors long")
    .required(),
});

const loginSchema = yup.object({
  email: yup.string().email("Email is not valid").required(),
  password: yup
    .string()
    .min(8, "Password must be atleast of 8 charactors long")
    .required(),
});

const emailSchema = yup.object({
  email: yup.string().email("Email is not valid").required(),
});

const validateUser = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      error: err.errors,
    });
  }
};

module.exports = {
  registerSchema,
  loginSchema,
  emailSchema,
  validateUser,
};
