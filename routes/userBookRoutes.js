const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userBookController");

router.get("/", ctrl.getAllUserBooks);

router.get("/user/:userId", ctrl.getUserBooksByUser);

router.post("/", ctrl.createUserBook);

router.put("/:userId/:bookId", ctrl.updateUserBook);

router.delete("/:userId/:bookId", ctrl.deleteUserBook);

module.exports = router;
