const Repair = require('../models/repair.model');

exports.existRepair = async (req, res, next) => {
  try {
    // la idea es validar si existe un usuario y usarlo en las rutas de usuario
    const { id } = req.params;
    console.log('id:', id);

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `repair with id ${id} not found`,
      });
    }
    req.repair = repair;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
