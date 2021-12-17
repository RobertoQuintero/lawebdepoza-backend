const { Router } = require("express");
const { check } = require("express-validator");
const {
  getCategories,
  postCategory,
  getCategoryById,
  putCategory,
  deleteCategory,
} = require("../controllers");
const { categoryExists } = require("../helpers/db-validators");
const {
  isSuperAdminRole,
  validateJWT,
  fieldsValidate,
  isAdminRole,
} = require("../middlewares");

const router = Router();

router.get("/", getCategories);
router.get(
  "/:id",
  [
    check("id", "No es un ID de válido").isMongoId(),
    check("id").custom(categoryExists),
    fieldsValidate,
  ],
  getCategoryById
);

router.post(
  "/",
  [
    validateJWT,
    isAdminRole,
    // isSuperAdminRole,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    fieldsValidate,
  ],
  postCategory
);

router.put(
  "/:id",
  [
    validateJWT,
    isSuperAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(categoryExists),
    fieldsValidate,
  ],
  putCategory
);

router.delete(
  "/:id",
  [
    validateJWT,
    isSuperAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(categoryExists),
    fieldsValidate,
  ],
  deleteCategory
);

module.exports = router;
