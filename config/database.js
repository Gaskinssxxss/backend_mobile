const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) console.error("DB open err:", err.message);
  else console.log("✓ Connected to SQLite");
});

db.serialize(() => {
  db.run(`PRAGMA foreign_keys = ON;`);

  db.run(`CREATE TABLE IF NOT EXISTS USER (
    userId          INTEGER PRIMARY KEY AUTOINCREMENT,
    nama             TEXT,
    email            TEXT UNIQUE,
    password         TEXT,
    tanggal_daftar   TEXT,
    status_langganan TEXT
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS BOOK (
    bookId       INTEGER PRIMARY KEY AUTOINCREMENT,
    judul         TEXT,
    penulis       TEXT,
    deskripsi     TEXT,
    kategori      TEXT,
    harga         REAL,
    format        TEXT,
    cover_image_url TEXT,
    publisher_id  INTEGER,
    content_provider_id INTEGER,
    FOREIGN KEY(publisher_id)       REFERENCES PUBLISHER(publisher_id),
    FOREIGN KEY(content_provider_id)REFERENCES CONTENT_PROVIDER(content_provider_id)
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS REVIEW (
    review_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    userId        INTEGER,
    bookId        INTEGER,
    rating         INTEGER,
    komentar       TEXT,
    tanggal_review TEXT,
    FOREIGN KEY(userId) REFERENCES USER(userId),
    FOREIGN KEY(bookId) REFERENCES BOOK(bookId)
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS BOOKMARK (
    bookmark_id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId     INTEGER,
    bookId     INTEGER,
    halaman     INTEGER,
    tanggal     TEXT,
    FOREIGN KEY(userId) REFERENCES USER(userId),
    FOREIGN KEY(bookId) REFERENCES BOOK(bookId)
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS USER_BOOK (
    userId       INTEGER,
    bookId       INTEGER,
    status_baca   TEXT,
    tanggal_baca  TEXT,
    page_terakhir INTEGER,
    PRIMARY KEY(userId, bookId),
    FOREIGN KEY(userId) REFERENCES USER(userId),
    FOREIGN KEY(bookId) REFERENCES BOOK(bookId)
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS PUBLISHER (
    publisher_id  INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_penerbit TEXT,
    alamat        TEXT,
    kontak        TEXT
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS PUBLISHER_REGISTRATION (
    registration_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    userId             INTEGER,
    status              TEXT,
    tanggal_daftar      TEXT,
    nama_perusahaan     TEXT,
    alamat_perusahaan   TEXT,
    kontak_perusahaan   TEXT,
    FOREIGN KEY(userId) REFERENCES USER(userId)
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS CONTENT_PROVIDER (
    content_provider_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_platform       TEXT,
    url                 TEXT
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS DISCUSSION_FORUM (
    forum_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    bookId      INTEGER,
    judul        TEXT,
    konten       TEXT,
    tanggal_post TEXT,
    FOREIGN KEY(bookId) REFERENCES BOOK(bookId)
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS FORUM_POST (
    post_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    forum_id     INTEGER,
    userId      INTEGER,
    konten       TEXT,
    tanggal_post TEXT,
    FOREIGN KEY(forum_id) REFERENCES DISCUSSION_FORUM(forum_id),
    FOREIGN KEY(userId)  REFERENCES USER(userId)
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS ADMIN (
    adminId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId  INTEGER,
    role     TEXT,
    FOREIGN KEY(userId) REFERENCES USER(userId)
  );`);
});

module.exports = db;
