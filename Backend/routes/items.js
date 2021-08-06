const express = require("express");
const router = express.Router();
const Item = require("../model/Item");

// find one and give back all the data
router.get("/", async (req, res) => {
  try {
    const data = await Item.find();
    res.json(data);
  } catch (err) {
    // error could not fetch because of us
    res.status(500).json({ msg: "Could not fetch data!" });
  }
});

// find specific one
router.get("/:id", async (req, res) => {
  try {
    const data = await Item.findById(req.params.id);
    res.json(data);
  } catch (err) {
    // could not get the id because wrong id
    res.status(404).json({ msg: "Error! could not find" });
  }
});

//add the sent data
router.post("/", async (req, res) => {
  const data = new Item({
    name: req.body.name,
    qty: req.body.qty,
    done: req.body.done,
  });
  try {
    const savedData = await data.save();
    res.status(201).json(savedData);
  } catch (err) {
    // could not post because data got was wrong
    res.status(400).json({ msg: err.message });
  }
});

// delete the data with id
router.delete("/:id", async (req, res) => {
  try {
    const data = await Item.deleteOne({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    res.status(404).json({ msg: `Data doesnt exist` });
  }
});

// update the data with id

router.patch("/:id", async (req, res) => {
  // these items should be updated always because Im getting all the updated part done in react
  const updateObj = {
    name: req.body.name,
    qty: req.body.qty,
    done: req.body.done
  };
  try {
    
    const data = await Item.findOneAndUpdate(
      { _id: req.params.id },
      updateObj,
      { new: true, useFindAndModify: false }
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
