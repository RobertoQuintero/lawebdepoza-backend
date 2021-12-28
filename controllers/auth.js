const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { createJWT } = require("../helpers/create-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User / Password no son correctos - email",
      });
    }
    //si el user está activo
    if (!user.status) {
      return res.status(400).json({
        msg: "User / Password no son correctos -status: false",
      });
    }
    //verificar
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User / Password no son correctos - password",
      });
    }

    const token = await createJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Comuniquese con el administrador",
    });
  }
};

const googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });
    if (!user) {
      const data = {
        name,
        email,
        password: ":P",
        img,
        google: true,
      };
      user = new User(data);
      await user.save();
    }
    if (!user.status) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    const token = await createJWT(user.id);

    res.json({
      ...user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "El token no se pudo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignin,
};
