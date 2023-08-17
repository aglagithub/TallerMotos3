const express = require('express');

//controllers
const repairController = require('../controllers/repair.controller');

//middleWares
const validationMiddleware = require('../middlewares/validation.middleware');
const repairMiddleware = require('./../middlewares/repair.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect); //Se protegen todas las rutas

//router.use(authMiddleware.restricTo('employee'));
router
  .route('/')
  .get(authMiddleware.restrictTo('employee'),repairController.findAllRepairs)
  .post(
    validationMiddleware.createRepairValidation,
    repairController.createRepair
  );

router
  .use('/:id', repairMiddleware.existRepair)
  .use(authMiddleware.restrictTo('employee'))
  .route('/:id')
  .get(repairController.findOneRepair)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = router;

//falta validador an patch