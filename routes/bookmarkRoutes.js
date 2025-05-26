const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/bookmarkController");

router.get("/", ctrl.getAllBookmarks);
router.get("/:id", ctrl.getBookmarkById);
router.post("/", ctrl.createBookmark);
router.put("/:id", ctrl.updateBookmark);
router.delete("/:id", ctrl.deleteBookmark);

module.exports = router;
