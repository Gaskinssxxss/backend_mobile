const db = require("../config/database");

exports.createBook = (req, res) => {
  const {
    judul,
    penulis,
    deskripsi,
    kategori,
    harga,
    format,
    cover_image_url,
    publisher_id,
    content_provider_id,
  } = req.body;
  db.run(
    `INSERT INTO BOOK (judul,penulis,deskripsi,kategori,harga,format,cover_image_url,publisher_id,content_provider_id) VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      judul,
      penulis,
      deskripsi,
      kategori,
      harga,
      format,
      cover_image_url,
      publisher_id,
      content_provider_id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getAllBooks = (req, res) => {
  db.all(`SELECT * FROM BOOK`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getBookById = (req, res) => {
  db.get(`SELECT * FROM BOOK WHERE bookId = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });
};

exports.updateBook = (req, res) => {
  const {
    judul,
    penulis,
    deskripsi,
    kategori,
    harga,
    format,
    cover_image_url,
    publisher_id,
    content_provider_id,
  } = req.body;
  db.run(
    `UPDATE BOOK SET judul=?,penulis=?,deskripsi=?,kategori=?,harga=?,format=?,cover_image_url=?,publisher_id=?,content_provider_id=? WHERE bookId=?`,
    [
      judul,
      penulis,
      deskripsi,
      kategori,
      harga,
      format,
      cover_image_url,
      publisher_id,
      content_provider_id,
      req.params.id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.deleteBook = (req, res) => {
  db.run(`DELETE FROM BOOK WHERE bookId=?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};
