const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/publisherRegistrationController");

router.get("/", ctrl.getAllRegistrations);
router.get("/:id", ctrl.getRegistrationById);
router.post("/", ctrl.createRegistration);
router.put("/:id", ctrl.updateRegistration);
router.delete("/:id", ctrl.deleteRegistration);

module.exports = router;
