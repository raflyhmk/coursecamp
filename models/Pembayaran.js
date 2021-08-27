const mongoose = require("mongoose");

const PembayaranSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  TanggalPembayaran: {
    type: Date,
    required: true,
  },
  PembayaranBulan: {
    type: String,
    required: true,
  },
  nameKursus: {
    type: String,
    required: true,
  },
  jumlahPembayaran: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pembayaran", PembayaranSchema);
