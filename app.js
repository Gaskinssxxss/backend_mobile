const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const swaggerDoc = YAML.load("./swagger.yaml");
const { requireAuth, requireAdmin } = require("./controllers/authController");

const app = express();

const PORT = process.env.PORT || 3000;

require("./config/database");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    store: new SQLiteStore({ db: "sessions.sqlite", table: "sessions" }),
    secret: "hahah",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/api/users", requireAuth, require("./routes/userRoutes"));
app.use(
  "/api/books",
  requireAuth,
  requireAdmin,
  require("./routes/bookRoutes")
);
app.use("/api/reviews", requireAuth, require("./routes/reviewRoutes"));
app.use("/api/bookmarks", requireAuth, require("./routes/bookmarkRoutes"));
app.use("/api/user-books", requireAuth, require("./routes/userBookRoutes"));
app.use("/api/publishers", requireAuth, require("./routes/publisherRoutes"));
app.use(
  "/api/publisher-registrations",
  require("./routes/publisherRegistrationRoutes")
);
app.use(
  "/api/content-providers",
  requireAuth,
  require("./routes/contentProviderRoutes")
);
app.use(
  "/api/discussion-forums",
  requireAuth,
  require("./routes/discussionForumRoutes")
);
app.use("/api/forum-posts", requireAuth, require("./routes/forumPostRoutes"));
app.use(
  "/api/admins",
  requireAuth,
  requireAdmin,
  require("./routes/adminRoutes")
);
app.use("/api/auth", requireAuth, require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("API ERD-Mobile Backend is up and running!");
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint tidak ditemukan" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
