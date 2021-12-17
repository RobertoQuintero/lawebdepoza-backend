const mongoose = require("mongoose");

const connection = {};

const mongoDBConnection = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connecion");
      return;
    }
    const db = await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Base de datos online");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicia la base de datos");
  }
};

module.exports = {
  mongoDBConnection,
};
