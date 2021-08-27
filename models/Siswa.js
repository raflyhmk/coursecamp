const mongoose = require("mongoose");

const siswaSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  JenisKelamin: {
    type: String,
    required: true,
  },
  nameKursus: {
    type: String,
    required: true,
  },
  TanggalLahir: {
    type: Date,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Siswa", siswaSchema);
