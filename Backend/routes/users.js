const express = require("express");
const router = express.Router();
const { User, Item } = require("../model/User");

// find one and give back all the data
router.get("/:uid", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.uid });
    if (!user) {
      user = await User.create({ _id: req.params.uid });
    }
    res.json(user.items);
  } catch (err) {
    // error could not fetch because of us
    res.status(500).json({ msg: "Error! could not fetch data " });
  }
});

// find specific one
router.get("/:uid/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    const data = user.items.filter((i) => {
      return i._id.toString() === req.params.id;
    });
    res.json(data[0]);
  } catch (err) {
    // could not get the id because wrong id
    res.status(404).json({ msg: "Error! could not find" });
  }
});

//add the sent data
router.post("/:uid", async (req, res) => {
  const data = new Item({
    name : req.body.name,
    qty : req.body.qty
  })
  try {
    let user = await User.findById(req.params.uid);
    user.items.push(data);
    await user.save()
    // send back data. first time insert is false
    res.status(201).json(data);
  } catch (err) {
    // could not post because data got was wrong
    res.status(400).json({ msg: err.message });
  }
});

// delete the data with id
router.delete("/:uid/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.uid);
    // remove the object with the ID we got
    const updatedItems = user.items.filter((item) => {
      return item._id.toString() !== req.params.id;
    });
    // update the user items array
    user.items = updatedItems;
    user = await user.save()
    res.json(user)
    
  } catch (err) {
    res.status(404).json({ msg: `Data doesnt exist` });
  }
});

// update the data with id

router.patch("/:uid/:id", async (req, res) => {
  let data;

  let user = await User.findById(req.params.uid);
  const updatedItems = user.items.map((item) => {
    if(item._id.toString() === req.params.id){
      return data = {
        _id : item._id,
        name : req.body.name,
        qty : req.body.qty,
        done : req.body.done
      }
    }
    else{
      return item
    }
  })
  user.items = updatedItems
  try{
    await user.save()
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
