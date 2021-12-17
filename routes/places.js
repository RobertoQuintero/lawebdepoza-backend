const { Router } = require("express");
const { check } = require("express-validator");
const {
  postPlace,
  getPlaces,
  getPlaceById,
  putPlace,
  deletePlace,
} = require("../controllers/places");
const { placeExists } = require("../helpers/db-validators");
const {
  validateJWT,
  fieldsValidate,
  isAdminRole,
  isSuperAdminRole,
} = require("../middlewares");

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

router.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "Np es in ID válido").isMongoId(),
    check("id").custom(placeExists),
    fieldsValidate,
  ],
  putPlace
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(placeExists),
    fieldsValidate,
  ],
  deletePlace
);

module.exports = router;
