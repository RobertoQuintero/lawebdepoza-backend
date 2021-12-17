const { Schema, model } = require("mongoose");
const { String } = Schema.Types;
const Role = Schema({
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", Role);
