const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const { Schema, model } = mongoose;
const { ObjectId, Boolean, String, Number, Double } = Schema.Types;

const Place = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  img: {
    type: String,
    default: "",
  },
  address: { type: String, required: [true, "La dirección es obligatoria"] },
  coordinates: {
    lat: { type: Double, default: 0 },
    lng: { type: Double, default: 0 },
  },
  facebook: { type: String, default: "" },
  web: { type: String, default: "" },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  rating: {
    type: Double,
    default: 0,
  },
  totalRating: {
    type: Double,
    default: 0,
  },
  quantityVoting: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

Place.methods.toJSON = function () {
  const { __v, status, ...place } = this.toObject();
  return place;
};

module.exports = model("Place", Place);
