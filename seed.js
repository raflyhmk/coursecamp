var seeder = require("mongoose-seed");
var mongoose = require("mongoose");

// Connect to MongoDB via Mongoose
seeder.connect(
  "mongodb+srv://rafly:kijolp90@cluster0.f6mu1.mongodb.net/db_coursecamp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  function () {
    // Load Mongoose models
    seeder.loadModels([
      "./models/Kursus",
      "./models/Pembayaran",
      "./models/Siswa",
      "./models/User",
    ]);

    // Clear specified collections
    seeder.clearModels(["Kursus", "Pembayaran", "Siswa", "User"], function () {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function () {
        seeder.disconnect();
      });
    });
  }
);

var data = [
  // kursus
  {
    model: "Kursus",
    documents: [
      {
        _id: mongoose.Types.ObjectId("611fd3810e643440183ba69a"),
        name: "ekonomi",
        TagihanPerBulan: "750000",
      },
      {
        _id: mongoose.Types.ObjectId("611fd3c40e643440183ba69d"),
        name: "bahasa asing",
        TagihanPerBulan: "550000",
      },
      {
        _id: mongoose.Types.ObjectId("611fd3ee0e643440183ba6a0"),
        name: "ilmu sihir",
        TagihanPerBulan: "1200000",
      },
    ],
  },
  // pembayaran
  {
    model: "Pembayaran",
    documents: [
      {
        _id: mongoose.Types.ObjectId("61213fbc6b3b372f103962d9"),
        name: "yatogami",
        TanggalPembayaran: "2012-01-12",
        PembayaranBulan: "januari",
        nameKursus: "ekonomi",
        jumlahPembayaran: "750000",
      },
    ],
  },
  // siswa
  {
    model: "Siswa",
    documents: [
      {
        _id: mongoose.Types.ObjectId("61212815874332277cc5650c"),
        image: "images/yatogami.png",
        name: "yato",
        JenisKelamin: "pria",
        nameKursus: "ekonomi",
        TanggalLahir: "2012-07-12",
        alamat: "tokyo",
      },
      {
        _id: mongoose.Types.ObjectId("6126829ad9995b3efc1920f4"),
        image: "images/rimuru.jpg",
        name: "rimuru tempest",
        JenisKelamin: "pria",
        nameKursus: "ilmu sihir",
        TanggalLahir: "2002-07-14",
        alamat: "jura tempest",
      },
      {
        _id: mongoose.Types.ObjectId("612683bbd9995b3efc1920fe"),
        image: "images/roxy.jpg",
        name: "roxy migurdia",
        JenisKelamin: "wanita",
        nameKursus: "ilmu sihir",
        TanggalLahir: "2002-02-06",
        alamat: "migurd",
      },
    ],
  },
  //   model user
  {
    model: "User",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903345"),
        username: "admin",
        password: "qwerty",
      },
    ],
  },
];
