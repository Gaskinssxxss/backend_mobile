const db = require("../config/database");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email dan password diperlukan" });
  }

  db.get(`SELECT * FROM USER WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: "Email tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Password salah" });

    db.get(
      `SELECT * FROM ADMIN WHERE userId = ?`,
      [user.userId],
      (err2, adminRow) => {
        if (err2) return res.status(500).json({ error: err2.message });

        req.session.userId = user.userId;
        req.session.isAdmin = !!adminRow;

        res.json({
          message: "Login berhasil",
          user: {
            id: user.userId,
            nama: user.nama,
            email: user.email,
            isAdmin: !!adminRow,
          },
        });
      }
    );
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Gagal logout" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logout berhasil" });
  });
};

exports.requireAuth = (req, res, next) => {
  if (req.session.userId) next();
  else res.status(401).json({ error: "Unauthorized" });
};

exports.requireAdmin = (req, res, next) => {
  if (req.session.userId && req.session.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden: Admin only" });
  }
};
