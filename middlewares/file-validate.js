const { response } = require("express");

const fileValidate = (req, res = response, next) => {
  // console.log(req.files);
  // res.json({ msg: "hello" });
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res
      .status(400)
      .json({ msg: "No hay archivos que subir - fileValidate" });
  }
  next();
};

module.exports = {
  fileValidate,
};
