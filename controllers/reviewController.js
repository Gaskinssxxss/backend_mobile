const db = require("../config/database");

exports.createReview = (req, res) => {
  const { user_id, book_id, rating, komentar, tanggal_review } = req.body;
  db.run(
    `INSERT INTO REVIEW (user_id,book_id,rating,komentar,tanggal_review) VALUES (?,?,?,?,?)`,
    [user_id, book_id, rating, komentar, tanggal_review],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getAllReviews = (req, res) => {
  const sql = req.query.bookId
    ? `SELECT * FROM REVIEW WHERE book_id = ?`
    : `SELECT * FROM REVIEW`;
  const params = req.query.bookId ? [req.query.bookId] : [];
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getReviewById = (req, res) => {
  db.get(
    `SELECT * FROM REVIEW WHERE review_id=?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Not found" });
      res.json(row);
    }
  );
};

exports.updateReview = (req, res) => {
  const { rating, komentar } = req.body;
  db.run(
    `UPDATE REVIEW SET rating=?, komentar=? WHERE review_id=?`,
    [rating, komentar, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.deleteReview = (req, res) => {
  db.run(
    `DELETE FROM REVIEW WHERE review_id=?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
};
