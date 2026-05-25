

const express = require("express");
const router = express.Router();
const db = require("./db");


// ✅ GET ADDRESSES BY USER
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID required" });
  }

  db.query(
    "SELECT * FROM addresses WHERE user_id=? ORDER BY id DESC",
    [userId],
    (err, result) => {
      if (err) {
        console.log("GET ERROR:", err);
        return res.status(500).json({ error: "DB Error" });
      }

      res.json(result);
    }
  );
});


// ✅ ADD ADDRESS
router.post("/", (req, res) => {
  const { user_id, name, phone, address, city, state, pincode } = req.body;

  // 🔥 VALIDATION
  if (!user_id || !name || !phone || !address || !city || !state || !pincode) {
    return res.status(400).json({ error: "All fields required" });
  }

  db.query(
    "INSERT INTO addresses (user_id, name, phone, address, city, state, pincode) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [user_id, name, phone, address, city, state, pincode],
    (err, result) => {
      if (err) {
        console.log("INSERT ERROR:", err);
        return res.status(500).json({ error: "Insert failed" });
      }

      res.json({
        id: result.insertId,
        user_id,
        name,
        phone,
        address,
        city,
        state,
        pincode,
      });
    }
  );
});


// ✅ UPDATE ADDRESS (SAFE)
router.put("/:id", (req, res) => {
  const { user_id, name, phone, address, city, state, pincode } = req.body;
  const id = req.params.id;

  if (!user_id) {
    return res.status(400).json({ error: "User ID required" });
  }

  db.query(
    "UPDATE addresses SET name=?, phone=?, address=?, city=?, state=?, pincode=? WHERE id=? AND user_id=?",
    [name, phone, address, city, state, pincode, id, user_id],
    (err, result) => {
      if (err) {
        console.log("UPDATE ERROR:", err);
        return res.status(500).json({ error: "Update failed" });
      }

      res.json({ success: true });
    }
  );
});


// ✅ DELETE ADDRESS (SAFE)
router.delete("/:id/:userId", (req, res) => {
  const { id, userId } = req.params;

  db.query(
    "DELETE FROM addresses WHERE id=? AND user_id=?",
    [id, userId],
    (err) => {
      if (err) {
        console.log("DELETE ERROR:", err);
        return res.status(500).json({ error: "Delete failed" });
      }

      res.json({ success: true });
    }
  );
});

module.exports = router;