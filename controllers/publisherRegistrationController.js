const db = require("../config/database");

exports.createRegistration = (req, res) => {
  const {
    user_id,
    status,
    tanggal_daftar,
    nama_perusahaan,
    alamat_perusahaan,
    kontak_perusahaan,
  } = req.body;
  db.run(
    `INSERT INTO PUBLISHER_REGISTRATION (user_id,status,tanggal_daftar,nama_perusahaan,alamat_perusahaan,kontak_perusahaan) VALUES (?,?,?,?,?,?)`,
    [
      user_id,
      status,
      tanggal_daftar,
      nama_perusahaan,
      alamat_perusahaan,
      kontak_perusahaan,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getAllRegistrations = (req, res) => {
  db.all(`SELECT * FROM PUBLISHER_REGISTRATION`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getRegistrationById = (req, res) => {
  db.get(
    `SELECT * FROM PUBLISHER_REGISTRATION WHERE registration_id=?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Not found" });
      res.json(row);
    }
  );
};

exports.updateRegistration = (req, res) => {
  const { status, nama_perusahaan, alamat_perusahaan, kontak_perusahaan } =
    req.body;
  db.run(
    `UPDATE PUBLISHER_REGISTRATION SET status=?, nama_perusahaan=?, alamat_perusahaan=?, kontak_perusahaan=? WHERE registration_id=?`,
    [
      status,
      nama_perusahaan,
      alamat_perusahaan,
      kontak_perusahaan,
      req.params.id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.deleteRegistration = (req, res) => {
  db.run(
    `DELETE FROM PUBLISHER_REGISTRATION WHERE registration_id=?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
};
