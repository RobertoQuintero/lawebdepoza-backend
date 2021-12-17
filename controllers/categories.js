const { response } = require("express");
const { Category } = require("../models");

const getCategories = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };
  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({ total, categories });
};

const getCategoryById = async (req, res = response) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate("user", "name");
  res.json(category);
};

const postCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const getCategory = await Category.findOne({ name });

  if (getCategory) {
    return res.status(400).json({
      msg: `La categoría ${getCategory.name} ya existe`,
    });
  }
  const data = {
    name,
    user: req.user._id,
  };
  const category = new Category(data);
  await category.save();
  res.status(201).json({ category });
};

const putCategory = async (req, res = response) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();

  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  res.status(204).json(category);
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.status(204).json({ msg: `Categoría ${category.name} borrada` });
};

module.exports = {
  getCategories,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
};
