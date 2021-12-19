const auth = require("./auth");
const users = require("./users");
const categories = require("./categories");
const search = require("./search");

module.exports = {
  ...auth,
  ...users,
  ...categories,
  ...search,
};
