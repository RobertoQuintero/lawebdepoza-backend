const { Router } = require("express");
const { check } = require("express-validator");

const {
  usersGet,
  usersDelete,
  usersPatch,
  usersPut,
  usersPost,
} = require("../controllers");

const {
  isValidRole,
  emailExists,
  userExistsById,
} = require("../helpers/db-validators");

const { fieldsValidate, validateJWT, isAdminRole } = require("../middlewares");

const router = Router();

router.get("/", usersGet);
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
  usersPost
);

router.put(
  "/:id",
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(userExistsById),
  check("role").custom(isValidRole),
  fieldsValidate,
  usersPut
);
router.patch("/:id", usersPatch);
router.delete(
  "/:id",
  validateJWT,
  isAdminRole,
  // tieneRole("ADMIN_ROLE", "USER_ROLE", "SUPER_ADMIN_ROLE"),
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(userExistsById),
  fieldsValidate,
  usersDelete
);

module.exports = router;
