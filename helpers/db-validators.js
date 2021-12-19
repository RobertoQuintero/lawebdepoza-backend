const { Role, User, Place, Category } = require("../models");

const isValidRole = async (role = "") => {
  const existeRol = await Role.findOne({ role });
  if (!existeRol) {
    throw new Error(`El role ${role} no está registrado en la BD`);
  }
  return true;
};

const emailExists = async (email = "") => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email ${email} ya existe`);
  }
  return true;
};

const userExistsById = async (id) => {
  const existeUsuario = await User.findById(id);
  if (!existeUsuario || !existeUsuario?.status) {
    throw new Error(`El id ${id} no existe`);
  }
  return true;
};
//valida que exista la categoria
const categoryExists = async (id) => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists || !categoryExists?.status) {
    throw new Error(`El id ${id} no existe en la DB`);
  }
  return true;
};

// const productExists = async (id) => {
//   const producto = await Producto.findById(id);
//   if (!producto) {
//     throw new Error(`El id ${id} no existe en la DB`);
//   }
//   return true;
// };

const placeExists = async (id) => {
  const place = await Place.findById(id);
  if (!place || !place?.status) {
    throw new Error(`El id ${id} no existe en la DB`);
  }
  return true;
};
const supportedCollections = (collection = "", collections = []) => {
  const available = collections.includes(collection);
  if (!available) {
    throw new Error(
      `La colección ${collection} no es permitida, ${collections}`
    );
  }
  return true;
};

module.exports = {
  supportedCollections,
  isValidRole,
  emailExists,
  placeExists,
  userExistsById,
  categoryExists,
  // productExists,
};
