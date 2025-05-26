const db = require("../config/database");

exports.createBookmark = (req, res) => {
  const { user_id, book_id, halaman, tanggal } = req.body;
  db.run(
    `INSERT INTO BOOKMARK (user_id,book_id,halaman,tanggal) VALUES (?,?,?,?)`,
    [user_id, book_id, halaman, tanggal],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getAllBookmarks = (req, res) => {
  const sql = req.query.userId
    ? `SELECT * FROM BOOKMARK WHERE user_id = ?`
    : `SELECT * FROM BOOKMARK`;
  const params = req.query.userId ? [req.query.userId] : [];
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getBookmarkById = (req, res) => {
  db.get(
    `SELECT * FROM BOOKMARK WHERE bookmark_id=?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Not found" });
      res.json(row);
    }
  );
};

exports.updateBookmark = (req, res) => {
  const { halaman, tanggal } = req.body;
  db.run(
    `UPDATE BOOKMARK SET halaman=?, tanggal=? WHERE bookmark_id=?`,
    [halaman, tanggal, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.deleteBookmark = (req, res) => {
  db.run(
    `DELETE FROM BOOKMARK WHERE bookmark_id=?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
};
