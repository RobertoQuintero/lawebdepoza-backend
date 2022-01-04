const { Schema, model, SchemaTypes } = require("mongoose");
const { ObjectId, Boolean, String, Number } = Schema.Types;

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
    lat: { type: SchemaTypes.Double, default: 0 },
    lng: { type: SchemaTypes.Double, default: 0 },
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
    type: SchemaTypes.Double,
    default: 0,
  },
  totalRating: {
    type: SchemaTypes.Double,
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
