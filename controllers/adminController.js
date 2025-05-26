const db = require("../config/database");

exports.createAdmin = (req, res) => {
  const { user_id, role } = req.body;
  db.run(
    `INSERT INTO ADMIN (userId, role) VALUES (?, ?)`,
    [user_id, role],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getAllAdmins = (req, res) => {
  db.all(`SELECT * FROM ADMIN`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getAdminById = (req, res) => {
  db.get(
    `SELECT * FROM ADMIN WHERE adminId = ?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Not found" });
      res.json(row);
    }
  );
};

exports.updateAdmin = (req, res) => {
  const { role } = req.body;
  db.run(
    `UPDATE ADMIN SET role = ? WHERE adminId = ?`,
    [role, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.deleteAdmin = (req, res) => {
  db.run(
    `DELETE FROM ADMIN WHERE adminId = ?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
};
