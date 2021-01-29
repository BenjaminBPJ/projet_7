const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': '.jpg',
  'image/jpeg': '.jpg',
  'image/png': '.png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name.split(extension).join('') + Date.now() + extension);
  }
});

const filterImage = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(new Error(`Le format de ce fichier n'est pas supporté, veuillez choisir une image jpg, jpeg ou png.`), false);
  }
};

module.exports = multer({ storage: storage}).single('image');