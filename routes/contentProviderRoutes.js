const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/contentProviderController");

router.get("/", ctrl.getAllProviders);
router.get("/:id", ctrl.getProviderById);
router.post("/", ctrl.createProvider);
router.put("/:id", ctrl.updateProvider);
router.delete("/:id", ctrl.deleteProvider);

module.exports = router;
