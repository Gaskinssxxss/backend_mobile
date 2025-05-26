const db = require("../config/database");

exports.createUserBook = (req, res) => {
  const { user_id, book_id, status_baca, tanggal_baca, page_terakhir } =
    req.body;
  db.run(
    `INSERT INTO USER_BOOK (user_id,book_id,status_baca,tanggal_baca,page_terakhir)
     VALUES (?,?,?,?,?)`,
    [user_id, book_id, status_baca, tanggal_baca, page_terakhir],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getAllUserBooks = (req, res) => {
  db.all(`SELECT * FROM USER_BOOK`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getUserBooksByUser = (req, res) => {
  db.all(
    `SELECT * FROM USER_BOOK WHERE user_id = ?`,
    [req.params.userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

exports.updateUserBook = (req, res) => {
  const { status_baca, tanggal_baca, page_terakhir } = req.body;
  db.run(
    `UPDATE USER_BOOK
     SET status_baca = ?, tanggal_baca = ?, page_terakhir = ?
     WHERE user_id = ? AND book_id = ?`,
    [
      status_baca,
      tanggal_baca,
      page_terakhir,
      req.params.userId,
      req.params.bookId,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.deleteUserBook = (req, res) => {
  db.run(
    `DELETE FROM USER_BOOK WHERE user_id = ? AND book_id = ?`,
    [req.params.userId, req.params.bookId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
};
