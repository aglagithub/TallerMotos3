const express = require('express');

//controllers
const userController = require('../controllers/user.controller');

//middlewares
const validationMiddleware = require('../middlewares/validation.middleware');
const userMiddleware = require('./../middlewares/user.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

//ruta de login
router.post('/login', userMiddleware.existUserEmail,userController.login);

router
  .route('/')
  .get(authMiddleware.protect, userController.findAllUser)
  .post(validationMiddleware.CreateUserValidation, userController.createUser);

router.use(authMiddleware.protect); //Protege de aquí en adelante contra usuarios no logeados
//router.use(authMiddleware.protectAccountOwmer) //solo admite los id que coorrespondan al id del loggeado 

router
  .use('/:id', userMiddleware.existUser)
  .route('/:id')
  .get(userController.findOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);



module.exports = router;
