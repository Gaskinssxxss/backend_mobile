const db = require("../config/database");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { nama, email, password, tanggalDaftar, statusLangganan } = req.body;
  console.log(req.body);
  const hash = await bcrypt.hash(password, 10);
  db.run(
    `INSERT INTO USER (nama,email,password,tanggal_daftar,status_langganan) VALUES (?,?,?,?,?)`,
    [nama, email, hash, tanggalDaftar, statusLangganan],
    function (err) {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getAllUsers = (req, res) => {
  db.all(`SELECT * FROM USER`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getUserById = (req, res) => {
  db.get(`SELECT * FROM USER WHERE userId = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });
};

exports.updateUser = (req, res) => {
  const { nama, email, password, tanggalDaftar, statusLangganan } = req.body;
  db.run(
    `UPDATE USER SET nama=?, email=?, password=?, tanggal_daftar=?, status_langganan=? WHERE userId=?`,
    [nama, email, password, tanggalDaftar, statusLangganan, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.deleteUser = (req, res) => {
  db.run(`DELETE FROM USER WHERE userId=?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};
