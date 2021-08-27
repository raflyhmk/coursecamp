const router = require("express").Router();
const adminController = require("../controller/adminController");
const { upload } = require("../middleware/multer");
const auth = require("../middleware/auth");

router.get("/signin", adminController.viewSignIn);
router.post("/signin", adminController.actionSignIn);
router.use(auth);
router.get("/logout", adminController.actionLogout);
router.get("/dashboard", adminController.viewDashoboard);
// kursus
router.get("/kursus", adminController.viewKursus);
router.post("/kursus", adminController.addKursus);
router.put("/kursus", adminController.editKursus);
router.delete("/kursus/:id", adminController.deleteKursus);
// siswa
router.get("/siswa", adminController.viewSiswa);
router.get("/siswa/detail-siswa/:id", adminController.showDetailSiswa);
router.post("/siswa", upload, adminController.addSiswa);
router.get("/siswa/:id", adminController.showEditSiswa);
router.put("/siswa/:id", upload, adminController.editSiswa);
router.delete("/siswa/:id", adminController.deleteSiswa);
// pembayaran
router.get("/pembayaran", adminController.viewPembayaran);
router.post("/pembayaran", adminController.addPembayaran);
router.put("/pembayaran", adminController.editPembayaran);
router.delete("/pembayaran/:id", adminController.deletePembayaran);

module.exports = router;
