const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere verificar el role para validar el token primero",
    });
  }

  const { role, name } = req.user;
  if (role !== "ADMIN_ROLE" && role !== "SUPER_ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador - No puede hacer esto`,
    });
  }
  next();
};

const isSuperAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere verificar el role son validar el token primero",
    });
  }

  const { role, name } = req.user;
  if (role !== "SUPER_ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es super administrador - No puede hacer esto`,
    });
  }
  next();
};

const haveRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el role son validar el token primero",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }
    next();
  };
};

module.exports = { isAdminRole, haveRole, isSuperAdminRole };
