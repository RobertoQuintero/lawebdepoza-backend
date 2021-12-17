const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignin } = require("../controllers");
const { fieldsValidate } = require("../middlewares");

const router = Router();

router.post(
  "/login",
  check("email", "El correo es obligatorio").isEmail(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  fieldsValidate,
  login
);

router.post(
  "/google",
  check("id_token", "id_token de google es necesario").not().isEmpty(),
  fieldsValidate,
  googleSignin
);

module.exports = router;
