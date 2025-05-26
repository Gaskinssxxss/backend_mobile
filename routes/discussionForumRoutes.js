const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/discussionForumController");

router.get("/", ctrl.getAllForums);
router.get("/:id", ctrl.getForumById);
router.post("/", ctrl.createForum);
router.put("/:id", ctrl.updateForum);
router.delete("/:id", ctrl.deleteForum);

module.exports = router;
