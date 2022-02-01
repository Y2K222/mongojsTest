const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");

const db = mongojs("mongojs_testing");

router.get("/", function (req, res) {
  db.users.find({}, function (err, data) {
    if (err) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      res.status(200).json(data);
    }
  });
});

router.get("/:id", function (req, res) {
  let userId = req.params.id;
  db.users.find({ _id: mongojs.ObjectId(userId) }, function (err, data) {
    if (err) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      res.status(200).json(data);
    }
  });
});

router.post("/", function (req, res) {
  let data = req.body;
  db.users.insert(data, function (err, data) {
    if (err) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      res.status(200).json({ msg: "User inserted !" });
    }
  });
});

router.put("/:id", function (req, res) {
  let userId = req.params.id;
  let data = req.body;
  db.users.update(
    { _id: mongojs.ObjectId(userId) },
    { $set: data },
    function (err, data) {
      if (err) {
        res.status(500).json({ msg: "Server Error" });
      } else {
        res.status(200).json({ msg: "User updated !" });
      }
    }
  );
});

router.delete("/:id", function (req, res) {
  let userId = req.params.id;
  db.users.remove({ _id: mongojs.ObjectId(userId) }, function (err, data) {
    if (err) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      res.status(200).json({ msg: "User deleted !" });
    }
  });
});

module.exports = router;
