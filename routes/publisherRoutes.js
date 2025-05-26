const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/publisherController");

router.get("/", ctrl.getAllPublishers);
router.get("/:id", ctrl.getPublisherById);
router.post("/", ctrl.createPublisher);
router.put("/:id", ctrl.updatePublisher);
router.delete("/:id", ctrl.deletePublisher);

module.exports = router;
