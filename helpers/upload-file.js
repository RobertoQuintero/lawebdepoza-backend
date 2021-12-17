const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  validExtensions = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { media } = files;

    const shortName = media.name.split(".");
    const extension = shortName[shortName.length - 1];

    if (!validExtensions.includes(extension)) {
      return reject(
        `La extensión ${extension} no es permitida - ${validExtensions}`
      );
    }

    const nameTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", folder, nameTemp);

    media.mv(uploadPath, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(nameTemp);
    });
  });
};

module.exports = {
  uploadFile,
};
