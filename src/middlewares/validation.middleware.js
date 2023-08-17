const { validationResult, body } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

//------------------------------------
//? Login Validation
exports.createLoginValidation = [
  body('email').notEmpty().withMessage('Email is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password can not be null'),
  body('password').custom((value) => {
    if (value.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    if (!/[A-Z]/.test(value)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(value)) {
      throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(value)) {
      throw new Error('Password must contain at least one number');
    }
    if (!/[!@#%^&\-_=+{}[\]|\\:;"'<>,.?/~`]/.test(value)) {
      throw new Error('Password must contain at least one special character');
    }

    return true;
  }),

  validateFields,
];

//? Create user validation
exports.CreateUserValidation = [
  body('name').notEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').custom((value) => {
    if (value.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    if (!/[A-Z]/.test(value)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(value)) {
      throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(value)) {
      throw new Error('Password must contain at least one number');
    }
    if (!/[!@#%^&\-_=+{}[\]|\\:;"'<>,.?/~`]/.test(value)) {
      throw new Error('Password must contain at least one special character');
    }

    return true;
  }),
  validateFields,
];

exports.createRepairValidation = [
  body('description').notEmpty().withMessage('description is required'),
  body('userId').notEmpty().withMessage('Email is required'),
  body('motorsNumber').notEmpty().withMessage('motorsNumber is required'),
  body('userId').notEmpty().withMessage('userId is required'),
  body('date').notEmpty().withMessage('date is required'),
  validateFields,
];

exports.patchUserValidation = [
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('Email is required'),
];

exports.patchRepairValidation = [
  body('motorsNumber').notEmpty().withMessage('motorsNumber is required'),
  body('description').notEmpty().withMessage('description is required'),
  body('userId').notEmpty().withMessage('Email is required'),
];
