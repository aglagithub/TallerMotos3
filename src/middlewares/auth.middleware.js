const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'You are not logged in! Please log in to get access',
      }); 
    }

    //console.log('token almacenado:', token)
    //console.log(' process.env.SECRET_JWT_SEED:', process.env.SECRET_JWT_SEED)

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_JWT_SEED
    );


    //console.log('decoded:', decoded);

    const user = await User.findOne({
      where: {
        id: decoded.id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'The owner of this token it not longer available',
      });
    }

    req.sessionUser = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error in auth.middleware:protect',
    });
  }
};

//verificación de rol.
exports.restrictTo = (...roles) => {
  
  return (req, res, next) => {
    //console.log("roles:",roles);
    //console.log("req.sessionUser.role:",req.sessionUser.role);
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError(`You do not have permission to perfom this action.! Yor role is ${req.sessionUser.role}`, 403)
      );
    }

    next();
  };
};


//Proteccion de la cuenta de usuario (pend implentation)
exports.protectAccountOwmer = (req, res, next) => {
  const { user, sessionUser } = req;
  //console.log("sessionUser", sessionUser)

  try {
    if (user.id !== sessionUser.id) {
      return res.status(401).json({
        status: 'fail',
        message: 'You do not own this account.',
        error,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Somethig went very wrong!:ProtectAccountOwner',
      error,
    });
  }

  next();
};

