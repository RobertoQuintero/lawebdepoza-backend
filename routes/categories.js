const { Router } = require("express");
const { check } = require("express-validator");
const { getCategories, postCategory } = require("../controllers");
const {
  isSuperAdminRole,
  validateJWT,
  fieldsValidate,
} = require("../middlewares");

const router = Router();

router.get("/", getCategories);

router.post(
  "/",
  [
    validateJWT,
    // isSuperAdminRole,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    fieldsValidate,
  ],
  postCategory
);

module.exports = router;
