const db = require("../config/database");

exports.createProvider = (req, res) => {
  const { nama_platform, url } = req.body;
  db.run(
    `INSERT INTO CONTENT_PROVIDER (nama_platform, url) VALUES (?, ?)`,
    [nama_platform, url],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getAllProviders = (req, res) => {
  db.all(`SELECT * FROM CONTENT_PROVIDER`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getProviderById = (req, res) => {
  db.get(
    `SELECT * FROM CONTENT_PROVIDER WHERE content_provider_id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Not found" });
      res.json(row);
    }
  );
};

exports.updateProvider = (req, res) => {
  const { nama_platform, url } = req.body;
  db.run(
    `UPDATE CONTENT_PROVIDER SET nama_platform = ?, url = ? WHERE content_provider_id = ?`,
    [nama_platform, url, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.deleteProvider = (req, res) => {
  db.run(
    `DELETE FROM CONTENT_PROVIDER WHERE content_provider_id = ?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
};
