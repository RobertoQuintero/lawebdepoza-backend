const { Router } = require("express");
const { check } = require("express-validator");
const { postPlace, getPlaces, getPlaceById } = require("../controllers/places");
const { placeExists } = require("../helpers/db-validators");
const { validateJWT, fieldsValidate } = require("../middlewares");

const router = Router();

router.get("/", getPlaces);
router.get(
  "/:id",
  [
    check("id", "No es un ID de mongo").isMongoId(),
    check("id").custom(placeExists),
    fieldsValidate,
  ],
  getPlaceById
);
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("address", "La dirección es obligatoria").not().isEmpty(),
    fieldsValidate,
  ],
  postPlace
);

module.exports = router;
