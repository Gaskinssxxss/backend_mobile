const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operasi pada data User
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Ambil daftar semua user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Daftar user berhasil diambil
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Ambil data user berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data user berhasil diambil
 */
router.get("/", ctrl.getAllUsers);
router.get("/:id", ctrl.getUserById);
router.post("/", ctrl.createUser);
router.put("/:id", ctrl.updateUser);
router.delete("/:id", ctrl.deleteUser);

module.exports = router;
