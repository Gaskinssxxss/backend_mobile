const db = require("../config/database");

exports.createPublisher = (req, res) => {
  const { nama_penerbit, alamat, kontak } = req.body;
  db.run(
    `INSERT INTO PUBLISHER (nama_penerbit,alamat,kontak) VALUES (?,?,?)`,
    [nama_penerbit, alamat, kontak],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getAllPublishers = (req, res) => {
  db.all(`SELECT * FROM PUBLISHER`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getPublisherById = (req, res) => {
  db.get(
    `SELECT * FROM PUBLISHER WHERE publisher_id=?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Not found" });
      res.json(row);
    }
  );
};

exports.updatePublisher = (req, res) => {
  const { nama_penerbit, alamat, kontak } = req.body;
  db.run(
    `UPDATE PUBLISHER SET nama_penerbit=?, alamat=?, kontak=? WHERE publisher_id=?`,
    [nama_penerbit, alamat, kontak, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.deletePublisher = (req, res) => {
  db.run(
    `DELETE FROM PUBLISHER WHERE publisher_id=?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
};
