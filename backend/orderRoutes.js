const express = require("express");
const router = express.Router();
const db = require("./db");


// ✅ AUTO CREATE ORDERS TABLE
db.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2),
    payment_method VARCHAR(50),

    status ENUM(
      'Processing',
      'Shipped',
      'Out for Delivery',
      'Delivered',
      'Cancelled'
    ) DEFAULT 'Processing',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
  )
`, (err) => {

  if (err) {
    console.log("Orders Table Error:", err);
  } else {
    console.log("Orders table ready ✅");
  }
});


// ✅ AUTO CREATE ORDER ITEMS TABLE
db.query(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT,
    title VARCHAR(255),
    price DECIMAL(10,2),
    quantity INT,

    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE
  )
`, (err) => {

  if (err) {
    console.log("Order Items Table Error:", err);
  } else {
    console.log("Order items table ready ✅");
  }
});


// ✅ AUTO CREATE ORDER ADDRESS TABLE
db.query(`
  CREATE TABLE IF NOT EXISTS order_address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),

    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE
  )
`, (err) => {

  if (err) {
    console.log("Order Address Table Error:", err);
  } else {
    console.log("Order address table ready ✅");
  }
});


// ✅ CREATE ORDER
router.post("/", (req, res) => {

  const {
    user_id,
    items,
    address,
    total_amount,
    payment_method
  } = req.body;

  if (!user_id) {
    return res.status(400).json({
      error: "User required"
    });
  }

  db.query(
    "INSERT INTO orders (user_id, total_amount, payment_method) VALUES (?, ?, ?)",
    [user_id, total_amount, payment_method],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          error: "Order failed"
        });
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

          if (err) {
            console.log(err);

            return res.status(500).json({
              error: "Items failed"
            });
          }

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

              if (err) {
                console.log(err);

                return res.status(500).json({
                  error: "Address failed"
                });
              }

              res.json({
                success: true,
                orderId
              });
            }
          );
        }
      );
    }
  );
});


// ✅ GET ORDERS
router.get("/:userId", (req, res) => {

  const userId = req.params.userId;

  db.query(
    "SELECT * FROM orders WHERE user_id=? ORDER BY id DESC",
    [userId],
    (err, orders) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          error: "Fetch failed"
        });
      }

      if (!orders.length) {
        return res.json([]);
      }

      const orderIds = orders.map(o => o.id);

      db.query(
        "SELECT * FROM order_items WHERE order_id IN (?)",
        [orderIds],
        (err, items) => {

          if (err) {
            console.log(err);

            return res.status(500).json({
              error: "Items fetch failed"
            });
          }

          db.query(
            "SELECT * FROM order_address WHERE order_id IN (?)",
            [orderIds],
            (err, addresses) => {

              if (err) {
                console.log(err);

                return res.status(500).json({
                  error: "Address fetch failed"
                });
              }

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