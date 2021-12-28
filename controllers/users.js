const { response, request } = require("express");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { createJWT } = require("../helpers");

const getUsers = async (req = request, res = response) => {
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

const getUserById = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findById(id);
  res.json(user);
};

const postUser = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  //Hash de la contraeña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  const newUser = await user.save();
  const token = await createJWT(newUser.id);
  res.status(201).json({
    user,
    token,
  });
};

const putUser = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, resto);

  res.status(204).json(user);
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { status: false });
  res.status(204).json({
    msg: `El usuario ${user.name} ha sido borrado`,
  });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
