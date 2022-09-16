const express = require("express");
const router = require("express").Router();
const schema = require("../model/Schema");

let arr = [];

router.get("/", async (req, res) => {
  // res.json(arr);
  const data = await schema.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  // arr.push(req.body);
  const result = await schema.find();
  const duplicate = result.find(
    (element) => element.groceryItem === req.body.groceryItem
  );
  if (duplicate) {
    res.send({ message: "Item Already Exist" });
  } else {
    const data = await schema.create(req.body);
    res.send({ message: "data added successfully", ...req.body });
  }
});

router.put("/:item", async (req, res) => {
  const item = req.params.item;
  // const result = arr.map((element) => {
  //   if (element.groceryItem === item) {
  //     return { ...element, isPurchased: !element.isPurchased };
  //   } else {
  //     return element;
  //   }
  // });
  // arr = result;
  const result = await schema.find({ groceryItem: item });
  console.log(result[0]);
  const data = await schema.updateOne(
    { groceryItem: item },
    { isPurchased: !result[0].isPurchased }
  );
  res.send({ message: "Item updates successfully..." });
});
router.delete("/:item", async (req, res) => {
  const item = req.params.item;
  console.log(item);
  const result = await schema.deleteOne({ groceryItem: item });
  console.log(result);
  res.send({ message: "Successfully Deleted" });
});

module.exports = router;
