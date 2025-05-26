const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/adminController");

router.get("/", ctrl.getAllAdmins);
router.get("/:id", ctrl.getAdminById);
router.post("/", ctrl.createAdmin);
router.put("/:id", ctrl.updateAdmin);
router.delete("/:id", ctrl.deleteAdmin);

module.exports = router;
