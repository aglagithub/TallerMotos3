const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');

exports.existUser = async (req, res, next) => {
  try {
    // la idea es validar si existe un usuario y usarlo en las rutas de usuario
    const { id } = req.params;
    //console.log("id en middleware: ", id)
    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `user with id ${id} not found`,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.existUserEmail = async(req, res, next) =>{
  const {email} = req.body;

  const user = await User.findOne({
    where:{
      email:email.toLowerCase(),
      status:'available' 
    },
  });

  if(!user){
    return res.status(404).json({
      status: 'error',
      message: `user with id ${email} not found`,
    });
  }

  req.user = user;
  next();

}