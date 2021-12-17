const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getUserById,
} = require("../controllers");

const {
  isValidRole,
  emailExists,
  userExistsById,
} = require("../helpers/db-validators");

const { fieldsValidate, validateJWT, isAdminRole } = require("../middlewares");

const router = Router();

router.get("/", getUsers);
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(userExistsById),
    fieldsValidate,
  ],
  getUserById
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExists),
    // check("role").custom(isValidRole),
    fieldsValidate,
  ],
  postUser
);

router.put(
  "/:id",
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(userExistsById),
  check("role").custom(isValidRole),
  fieldsValidate,
  putUser
);

router.delete(
  "/:id",
  validateJWT,
  isAdminRole,
  // tieneRole("ADMIN_ROLE", "USER_ROLE", "SUPER_ADMIN_ROLE"),
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(userExistsById),
  fieldsValidate,
  deleteUser
);

module.exports = router;
