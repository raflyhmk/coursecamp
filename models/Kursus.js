const mongoose = require("mongoose");

const KursusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  TagihanPerBulan: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Kursus", KursusSchema);
