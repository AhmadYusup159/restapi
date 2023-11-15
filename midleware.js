const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './foto_mahasiswa');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nama file disimpan sama dengan nama aslinya
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
