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
      .populate("category", "name")
      .populate("user", "name"),
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
  res.json({ place });
};

module.exports = {
  postPlace,
  getPlaces,
  getPlaceById,
};
