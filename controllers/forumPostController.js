const db = require("../config/database");

exports.createPost = (req, res) => {
  const { forum_id, user_id, konten, tanggal_post } = req.body;
  db.run(
    `INSERT INTO FORUM_POST (forum_id, user_id, konten, tanggal_post) VALUES (?, ?, ?, ?)`,
    [forum_id, user_id, konten, tanggal_post],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getAllPosts = (req, res) => {
  const sql = req.query.forumId
    ? `SELECT * FROM FORUM_POST WHERE forum_id = ?`
    : `SELECT * FROM FORUM_POST`;
  const params = req.query.forumId ? [req.query.forumId] : [];
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getPostById = (req, res) => {
  db.get(
    `SELECT * FROM FORUM_POST WHERE post_id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Not found" });
      res.json(row);
    }
  );
};

exports.updatePost = (req, res) => {
  const { konten, tanggal_post } = req.body;
  db.run(
    `UPDATE FORUM_POST SET konten = ?, tanggal_post = ? WHERE post_id = ?`,
    [konten, tanggal_post, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.deletePost = (req, res) => {
  db.run(
    `DELETE FROM FORUM_POST WHERE post_id = ?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
};
