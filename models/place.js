const { Schema, model } = require("mongoose");
const { ObjectId, Boolean, String } = Schema.Types;

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
  },
  address: { type: String, required: [true, "La dirección es obligatoria"] },
  coordinates: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
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
