const Repair = require('../models/repair.model');
const User = require('../models/user.model');

//? Find all repairs (✓)
exports.findAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: ['pending'],
      },
      include: [
        {
          model: User,
          attributes:['name', 'email']
        },
      ],
    });
    return res.status(200).json({
      status: 'success',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Somethig went very wrong!',
      error,
    });
  }
};

//? Find One repair (✓)

exports.findOneRepair = async (req, res) => {
  try {
    const { repair } = req;
  

    return res.status(200).json({
      status: 'success',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Somethig went very wrong!',
      error,
    });
  }
};

//? Create repair (✓)
exports.createRepair = async (req, res) => {
  try {
    const { date, userId, description, motorsNumber } = req.body;

    repair = await Repair.create({ date, userId, description, motorsNumber });
    return res.status(201).json({
      status: 'success',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Somethig went very wrong!',
      error,
    });
  }
};

//? Update Repair (✓)

exports.updateRepair = async (req, res) => {
  try {
    const { repair } = req;
    console.log('update repair req:', req);
    await repair.update({ status: 'completed' });

    return res.status(200).json({
      status: 'success',
      message: 'Repair updated succesfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Somethig went very wrong!',
      error,
    });
  }
};

//? Delete repair ()

exports.deleteRepair = async (req, res) => {
  try {
    const { repair } = req;

    await repair.update({ status: 'cancelled' });

    return res.status(200).json({
      status: 'success',
      message: `Repair deleted succesfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Somethig went very wrong!',
      error,
    });
  }
};
