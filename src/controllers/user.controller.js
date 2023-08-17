const User = require('../models/user.model');
const bycrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');

//? Find all users (✓)
exports.findAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: 'available',
      },
    });
    return res.status(200).json({
      status: 'success',
      usersNumber: users.length, 
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
      error,
    });
  }
};

//? Find One user (✓)

exports.findOneUser = async (req, res) => {
  try {
    const { user } = req;
    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
      error,
    });
  }
};

//? Create user (✓)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role = 'client' } = req.body;
    //Encriptación de contaseña
    generateJWT

    const salt = await bycrypt.genSalt(12);
    const hashPassword = await bycrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    //creación de token
    const token = await generateJWT(user.id);

    return res.status(201).json({
      status: 'success',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
      error,
    });
  }
};

//? Update user (✓) 
exports.updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;
    //console.log('user.id en update user:',user.id)
    //console.log('sessionUser en update user:', req.sessionUser.id)
    if (user.id !== req.sessionUser.id){
      return res.status(400).json({
        status: 'fail',
        message: 'You are trying to update another user',
      });
    }

    await user.update({ name, email });

    return res.status(200).json({
      status: 'success',
      message: 'User updated succesfully',
    });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      error,
    });
  }
};

//? Delete user (✓)

exports.deleteUser = async (req, res) => {
  try {
    const { user } = req;
    
    if (user.id !== req.sessionUser.id) {
      return res.status(400).json({
        status: 'fail',
        message: 'You are trying to delete another user',
      });
    }


    await user.update({ status: 'disabled' });

    return res.status(200).json({
      status: 'success',
      message: 'User deleted succesfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
      error,
    });
  }
};

//? POST login
exports.login = async (req, res,next) => {
  //console.log('Hello from login')
  const { user } = req;

  const { password } = req.body;

  if (!(await bycrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'Incorrect email or password',
    });
  }

  const token = await generateJWT(user.id)

  return res.status(200).json({
    status: 'success',
    token,
    name:user.name,
    email:user.email,

  });
};
