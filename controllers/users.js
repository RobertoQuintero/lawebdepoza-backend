const { response, request } = require("express");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  //Hash de la contraeña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  //guardar

  await user.save();

  res.status(201).json({
    msg: "post API - controlador",
    user,
  });
};

const usersPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, resto);

  res.json(user);
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "get API - controlador",
  });
};
const usersDelete = async (req, res = response) => {
  const { id } = req.params;
  // const User = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, { status: false });
  res.json({
    user,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
