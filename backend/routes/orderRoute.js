const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

router.post("/", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Data is required." });
  }
  const order = await Order(req.body).save();
  res.send(order);
});
router.get("/", async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});
router.delete("/:id", async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});

module.exports = router;
