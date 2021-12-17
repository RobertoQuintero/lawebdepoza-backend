const { Schema, model } = require("mongoose");
const { ObjectId, Boolean, String } = Schema.Types;

const Category = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

Category.methods.toJSON = function () {
  const { __v, status, ...category } = this.toObject();
  return category;
};

module.exports = model("Category", Category);
