const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (result.length > 0)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)",
        [fullName, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ message: "DB Error" });

          const token = jwt.sign(
            { id: result.insertId },
            process.env.JWT_SECRET
          );

          res.json({
            user: {
              id: result.insertId,
              fullName,
              email,
            },
            token,
          });
        }
      );
    }
  );
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, users) => {
      if (users.length === 0)
        return res.status(400).json({ message: "Invalid credentials" });

      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      res.json({
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email
        },
        token
      });
    }
  );
};

// FORGOT PASSWORD
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (result.length === 0)
        return res.status(400).json({ message: "Email not found" });

      res.json({ message: "Password reset link sent" });
    }
  );
};

// GET USER
exports.getMe = (req, res) => {
  db.query(
    "SELECT id, fullName, email FROM users WHERE id = ?",
    [req.user.id],
    (err, result) => {
      res.json(result[0]);
    }
  );
};
