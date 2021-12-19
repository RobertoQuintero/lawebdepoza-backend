const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
const { User, Category, Place } = require("../models");

const availableCollections = [
  "users",
  "categories",
  "products",
  "roles",
  "places",
];

const searchUsers = async (keyword = "", res = response) => {
  const isMongoId = isValidObjectId(keyword);
  if (isMongoId) {
    const user = await User.findById(keyword);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(keyword, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  res.json({
    results: users,
  });
};

const searchCategories = async (keyword = "", res = response) => {
  const isMongoId = isValidObjectId(keyword);
  if (isMongoId) {
    const category = await Category.findById(keyword);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(keyword, "i");
  const categories = await Category.find({ name: regex, status: true });

  res.json({
    results: categories,
  });
};

// const searchProducts = async (keyword = "", res = response) => {
//   const isMongoId = isValidObjectId(keyword);
//   if (isMongoId) {
//     const producto = await Producto.findById(keyword).populate(
//       "categoria",
//       "name"
//     );
//     return res.json({
//       results: producto ? [producto] : [],
//     });
//   }

//   const regex = new RegExp(keyword, "i");
//   const productos = await Producto.find({
//     name: regex,
//     status: true,
//   }).populate("categoria", "name");

//   res.json({
//     results: productos,
//   });
// };

const searchPlaces = async (keyword = "", res = response) => {
  const isMongoId = isValidObjectId(keyword);
  if (isMongoId) {
    const place = await Place.findById(keyword).populate("category", "name");
    return res.json({
      results: place ? [place] : [],
    });
  }

  const regex = new RegExp(keyword, "i");
  const places = await Place.find({
    name: regex,
    status: true,
  }).populate("category", "name");

  res.json({
    results: places,
  });
};

const search = (async = (req = request, res = response) => {
  const { collection, keyword } = req.params;

  if (!availableCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones son ${availableCollections} `,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(keyword, res);
      break;
    case "categories":
      searchCategories(keyword, res);
      break;
    case "products":
      // searchProducts(keyword, res);
      break;
    case "places":
      searchPlaces(keyword, res);
      break;
    default:
      res.status(500).json({
        msg: `Se me olvidó hacer  esta busqueda`,
      });
      break;
  }
});

module.exports = {
  search,
};
