const express = require("express");
const router = express.Router();
const db = require("./db");


// ✅ CREATE ORDER
router.post("/", (req, res) => {
  const { user_id, items, address, total_amount, payment_method } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "User required" });
  }

  db.query(
    "INSERT INTO orders (user_id, total_amount, payment_method) VALUES (?, ?, ?)",
    [user_id, total_amount, payment_method],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Order failed" });
      }

      const orderId = result.insertId;

      const itemValues = items.map(item => [
        orderId,
        item.id,
        item.title,
        item.price,
        item.quantity,
      ]);

      db.query(
        "INSERT INTO order_items (order_id, product_id, title, price, quantity) VALUES ?",
        [itemValues],
        (err) => {
          if (err) return res.status(500).json({ error: "Items failed" });

          db.query(
            "INSERT INTO order_address (order_id, name, phone, address, city, state, pincode) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              orderId,
              address.name,
              address.phone,
              address.address,
              address.city,
              address.state,
              address.pincode,
            ],
            (err) => {
              if (err) return res.status(500).json({ error: "Address failed" });

              res.json({ success: true, orderId });
            }
          );
        }
      );
    }
  );
});


// ✅ GET ORDERS (🔥 THIS WAS MISSING)
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    "SELECT * FROM orders WHERE user_id=? ORDER BY id DESC",
    [userId],
    (err, orders) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Fetch failed" });
      }

      if (!orders.length) return res.json([]);

      const orderIds = orders.map(o => o.id);

      db.query(
        "SELECT * FROM order_items WHERE order_id IN (?)",
        [orderIds],
        (err, items) => {

          db.query(
            "SELECT * FROM order_address WHERE order_id IN (?)",
            [orderIds],
            (err, addresses) => {

              const finalOrders = orders.map(order => ({
                ...order,
                items: items.filter(i => i.order_id === order.id),
                address: addresses.find(a => a.order_id === order.id),
              }));

              res.json(finalOrders);
            }
          );
        }
      );
    }
  );
});


module.exports = router;