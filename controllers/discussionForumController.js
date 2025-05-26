const db = require("../config/database");

exports.createForum = (req, res) => {
  const { book_id, judul, konten, tanggal_post } = req.body;
  db.run(
    `INSERT INTO DISCUSSION_FORUM (book_id, judul, konten, tanggal_post) VALUES (?, ?, ?, ?)`,
    [book_id, judul, konten, tanggal_post],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getAllForums = (req, res) => {
  db.all(`SELECT * FROM DISCUSSION_FORUM`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getForumById = (req, res) => {
  db.get(
    `SELECT * FROM DISCUSSION_FORUM WHERE forum_id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Not found" });
      res.json(row);
    }
  );
};

exports.updateForum = (req, res) => {
  const { judul, konten, tanggal_post } = req.body;
  db.run(
    `UPDATE DISCUSSION_FORUM SET judul = ?, konten = ?, tanggal_post = ? WHERE forum_id = ?`,
    [judul, konten, tanggal_post, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.deleteForum = (req, res) => {
  db.run(
    `DELETE FROM DISCUSSION_FORUM WHERE forum_id = ?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
};
