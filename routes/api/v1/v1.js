const express = require('express');
const router = express.Router();
const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoutes = require('./expedientes/expedientes');
const seguridadRoutes = require('./seguridad/seguridad');
const { verifyApiHeaderToken } = require('./headerVerifyMiddleware');
const {passport, jwtMiddleware} = require('./seguridad/jwtHelper');
//const {validateCreate} = require("./validacion/pacientes_validacion");

router.use('/pacientes',verifyApiHeaderToken,jwtMiddleware,/*validateCreate,*/ pacientesRoutes);
router.use('/expedientes',verifyApiHeaderToken, expedientesRoutes);
router.use(passport.initialize());
router.use('/seguridad', verifyApiHeaderToken, seguridadRoutes);


module.exports= router;