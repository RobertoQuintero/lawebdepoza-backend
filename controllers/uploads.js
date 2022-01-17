const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { User, Place } = require("../models");

const updateImageCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: `No existe un usario con el id ${id}` });
      }
      break;

    case "places":
      model = await Place.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: `No existe un lugar con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  if (model.img) {
    const nameArr = model.img.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");
    cloudinary.uploader.destroy(public_id);
  }
  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;
  await model.save();

  res.json({ model });
};

const postImage = async (req, res = response) => {
  try {
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    res.status(201).json({ url: secure_url });
  } catch (error) {
    res.status(500).json({ msg: "Error al subir imagen" });
  }
};

const updateImage = async (req, res = response) => {
  const { name } = req.params;
  const { tempFilePath } = req.files.file;
  try {
    const cloud = await cloudinary.uploader.destroy(name);
    if (cloud.result === "not found") {
      res.status(404).json({ msg: "Imagen no encontrada" });
    }
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    res.status(201).json({ url: secure_url });
  } catch (error) {
    res.status(500).json({ msg: "Error al subir imagen" });
  }
};

module.exports = {
  updateImageCloudinary,
  updateImage,
  postImage,
};
