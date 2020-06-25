const express = require("express");

const router = express.Router();

const Item = require("../models/Item");

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

router.post("/", (req, res) => {
  const { name, quantity, unit } = req.body;
  const newItem = new Item({
    name,
    quantity,
    unit,
  });

  newItem.save().then((item) => res.json(item));
});

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
