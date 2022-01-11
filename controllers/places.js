const { response } = require("express");
const { Place } = require("../models");

const getPlaces = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, places] = await Promise.all([
    Place.countDocuments(),
    Place.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("category", "name"),
  ]);

  res.json({
    total,
    places,
  });
};

const getPlaceById = async (req, res = response) => {
  const { id } = req.params;
  const place = await Place.findById(id)
    .populate("category", "name")
    .populate("user", "name");

  res.json(place);
};

const postPlace = async (req, res = response) => {
  const { name } = req.body;
  const getPlace = await Place.findOne({ name });
  if (getPlace) {
    return res.status(400).json({
      msg: `ya se ha registrado ${getPlace.name}`,
    });
  }
  const data = {
    ...req.body,
    user: req.user._id,
  };
  const place = new Place(data);
  await place.save();
  res.status(201).json(place);
};

const putPlace = async (req, res = response) => {
  const { id } = req.params;
  const updated_at = Date.now();
  const place = await Place.findByIdAndUpdate(
    id,
    { ...req.body, updated_at },
    { new: true }
  );
  res.status(204).json(place);
};

const deletePlace = async (req, res = response) => {
  const { id } = req.params;
  const place = await Place.findByIdAndUpdate(id, { status: false });

  res.status(204).json({ msg: `${place.name} ha sido borrada correctamente` });
};

module.exports = {
  postPlace,
  getPlaces,
  getPlaceById,
  putPlace,
  deletePlace,
};
