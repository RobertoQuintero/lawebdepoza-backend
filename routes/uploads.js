const { Router } = require("express");
const { check } = require("express-validator");
const { updateImageCloudinary } = require("../controllers/uploads");
const { supportedCollections } = require("../helpers");
const { fieldsValidate, fileValidate } = require("../middlewares");

const router = Router();

router.post("/:collection/:id", fileValidate);

router.put(
  "/:collection/:id",
  [
    fileValidate,
    check("id", "No es un ID válido").isMongoId(),
    check("collection").custom((c) =>
      supportedCollections(c, ["users", "places"])
    ),
    fieldsValidate,
  ],
  updateImageCloudinary
);

module.exports = router;
