const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/bookController");

router.get("/", ctrl.getAllBooks);
router.get("/:id", ctrl.getBookById);
router.post("/", ctrl.createBook);
router.put("/:id", ctrl.updateBook);
router.delete("/:id", ctrl.deleteBook);

module.exports = router;
