const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/forumPostController");

router.get("/", ctrl.getAllPosts);
router.get("/:id", ctrl.getPostById);
router.post("/", ctrl.createPost);
router.put("/:id", ctrl.updatePost);
router.delete("/:id", ctrl.deletePost);

module.exports = router;
