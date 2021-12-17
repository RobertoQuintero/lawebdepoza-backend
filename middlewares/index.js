const fieldsValidate = require("../middlewares/fields-validate");
const validateJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");
const fileValidate = require("../middlewares/file-validate");

module.exports = {
  ...fieldsValidate,
  ...validateJWT,
  ...validateRoles,
  ...fileValidate,
};
