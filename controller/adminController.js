const Kursus = require("../models/Kursus");
const Siswa = require("../models/Siswa");
const Pembayaran = require("../models/Pembayaran");
const User = require("../models/User");
const fs = require("fs-extra");
const path = require("path");
const bcrypt = require("bcrypt");
module.exports = {
  viewSignIn: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render("index", {
          alert,
          title: "CourseCamp | login",
        });
      } else {
        res.redirect("/admin/dashboard");
      }
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },
  actionSignIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) {
        req.flash("alertMessage", "USERNAME TIDAK DITEMUKAN!!");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash("alertMessage", "uncorrect password");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      req.session.user = {
        id: user.id,
        username: user.username,
      };
      res.redirect("/admin/dashboard");
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },
  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect("/admin/signin");
  },
  viewDashoboard: async (req, res) => {
    try {
      const kursus = await Kursus.find();
      const siswa = await Siswa.find();
      res.render("admin/dashboard/view_dashboard", {
        title: "CourseCamp | dashboard",
        user: req.session.user,
        kursus,
        siswa,
      });
    } catch (error) {
      res.redirect("/admin/dashboard");
    }
  },
  // CRUD kursus
  viewKursus: async (req, res) => {
    const kursus = await Kursus.find();
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    res.render("admin/kursus/view_kursus", {
      kursus,
      alert,
      title: "coursecamp | kursus",
      user: req.session.user,
    });
  },
  addKursus: async (req, res) => {
    try {
      const { name, TagihanPerBulan } = req.body;
      await Kursus.create({ name, TagihanPerBulan });
      req.flash("alertMessage", "berhasil menambah kursus");
      req.flash("alertStatus", "success");
      res.redirect("/admin/kursus");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/kursus");
    }
  },
  editKursus: async (req, res) => {
    try {
      const { id, name, TagihanPerBulan } = req.body;
      const kursus = await Kursus.findOne({ _id: id });
      kursus.name = name;
      kursus.TagihanPerBulan = TagihanPerBulan;
      await kursus.save();
      req.flash("alertMessage", "berhasil mengedit kursus");
      req.flash("alertStatus", "success");
      res.redirect("/admin/kursus");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/kursus");
    }
  },
  deleteKursus: async (req, res) => {
    try {
      const { id } = req.params;
      const kursus = await Kursus.findOne({ _id: id });
      await kursus.remove();
      req.flash("alertMessage", "berhasil menghapus kursus");
      req.flash("alertStatus", "success");
      res.redirect("/admin/kursus");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/kursus");
    }
  },
  // CRUD siswa
  viewSiswa: async (req, res) => {
    try {
      const siswa = await Siswa.find();
      const kursus = await Kursus.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/siswa/view_siswa", {
        title: "coursecamp | siswa",
        user: req.session.user,
        alert,
        kursus,
        siswa,
        action: "view",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/siswa");
    }
  },

  addSiswa: async (req, res) => {
    try {
      const { name, JenisKelamin, nameKursus, TanggalLahir, alamat } = req.body;
      await Siswa.create({
        image: `images/${req.file.filename}`,
        name,
        JenisKelamin,
        nameKursus,
        TanggalLahir,
        alamat,
      });

      req.flash("alertMessage", "berhasil menambahkan siswa");
      req.flash("alertStatus", "success");
      res.redirect("/admin/siswa");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/siswa");
    }
  },
  showDetailSiswa: async (req, res) => {
    try {
      const { id } = req.params;
      const siswa = await Siswa.findOne({ _id: id });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/siswa/view_siswa", {
        title: "staycation | detail siswa",
        alert,
        siswa,
        action: "detail_siswa",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/siswa");
    }
  },
  showEditSiswa: async (req, res) => {
    try {
      const { id } = req.params;
      const siswa = await Siswa.findOne({ _id: id });
      const kursus = await Kursus.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/siswa/view_siswa", {
        title: "staycation | edit siswa",
        user: req.session.user,
        alert,
        siswa,
        kursus,
        action: "edit",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/siswa");
    }
  },
  editSiswa: async (req, res) => {
    try {
      const { id } = req.params;
      const { image, name, JenisKelamin, nameKursus, TanggalLahir, alamat } =
        req.body;
      const siswa = await Siswa.findOne({ _id: id });
      if (req.file == undefined) {
        siswa.name = name;
        siswa.JenisKelamin = JenisKelamin;
        siswa.nameKursus = nameKursus;
        siswa.TanggalLahir = TanggalLahir;
        siswa.alamat = alamat;
        await bank.save();
        req.flash("alertMessage", "berhasil edit siswa");
        req.flash("alertStatus", "success");
        res.redirect("/admin/siswa");
      } else {
        await fs.unlink(path.join(`public/${siswa.image}`));
        siswa.name = name;
        siswa.JenisKelamin = JenisKelamin;
        siswa.nameKursus = nameKursus;
        siswa.TanggalLahir = TanggalLahir;
        siswa.alamat = alamat;
        siswa.image = `images/${req.file.filename}`;
        await siswa.save();
        req.flash("alertMessage", "berhasil edit siswa");
        req.flash("alertStatus", "success");
        res.redirect("/admin/siswa");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/siswa");
    }
  },
  deleteSiswa: async (req, res) => {
    try {
      const { id } = req.params;
      const siswa = await Siswa.findOne({ _id: id });
      await fs.unlink(path.join(`public/${siswa.image}`));
      await siswa.remove();
      req.flash("alertMessage", "berhasil menghapus siswa");
      req.flash("alertStatus", "success");
      res.redirect("/admin/siswa");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/siswa");
    }
  },
  // pembayaran
  viewPembayaran: async (req, res) => {
    const pembayaran = await Pembayaran.find();
    const kursus = await Kursus.find();
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    res.render("admin/pembayaran/view_pembayaran", {
      pembayaran,
      alert,
      kursus,
      title: "coursecamp | pembayaran",
      user: req.session.user,
    });
  },
  addPembayaran: async (req, res) => {
    try {
      const {
        name,
        TanggalPembayaran,
        PembayaranBulan,
        nameKursus,
        jumlahPembayaran,
      } = req.body;
      await Pembayaran.create({
        name,
        TanggalPembayaran,
        PembayaranBulan,
        nameKursus,
        jumlahPembayaran,
      });
      req.flash("alertMessage", "pembayaran telah bershasil");
      req.flash("alertStatus", "success");
      res.redirect("/admin/pembayaran");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/pembayaran");
    }
  },
  editPembayaran: async (req, res) => {
    try {
      const {
        id,
        name,
        TanggalPembayaran,
        PembayaranBulan,
        nameKursus,
        jumlahPembayaran,
      } = req.body;
      const pembayaran = await Pembayaran.findOne({ _id: id });
      pembayaran.name = name;
      pembayaran.TanggalPembayaran = TanggalPembayaran;
      pembayaran.PembayaranBulan = PembayaranBulan;
      pembayaran.nameKursus = nameKursus;
      pembayaran.jumlahPembayaran = jumlahPembayaran;
      await pembayaran.save();
      req.flash("alertMessage", "berhasil mengedit pembayaran");
      req.flash("alertStatus", "success");
      res.redirect("/admin/pembayaran");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/pembayaran");
    }
  },
  deletePembayaran: async (req, res) => {
    try {
      const { id } = req.params;
      const pembayaran = await Pembayaran.findOne({ _id: id });
      await pembayaran.remove();
      req.flash("alertMessage", "berhasil menghapus pembayaran");
      req.flash("alertStatus", "success");
      res.redirect("/admin/pembayaran");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/pembayaran");
    }
  },
};
