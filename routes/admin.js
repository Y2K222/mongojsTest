const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");
const db = mongojs("mongojs_testing");

router.get("/", function (req, res) {
  db.admin.find({}, function (err, data) {
    if (err) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      res.status(200).json(data);
    }
  });
});

router.get("/:id", function (req, res) {
  let adminId = req.params.id;
  db.admin.find({ _id: mongojs.ObjectId(adminId) }, function (err, data) {
    if (err) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      res.status(200).json(data);
    }
  });
});

router.post("/", function (req, res) {
  let postbody = req.body;
  db.admin.insert(postbody, function (err, data) {
    if (err) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      res.status(200).json({ msg: "data inserted" });
    }
  });
});
router.put("/:id", function (req, res) {
  let adminid = req.params.id;
  let body = req.body;
  db.admin.update(
    { _id: mongojs.ObjectId(adminid) },
    { $set: body },
    function (err, data) {
      if (err) {
        res.status(500).json({ msg: "Server Error" });
      } else {
        res.status(200).json({ msg: "successfully updated" });
      }
    }
  );
});
router.delete("/:id", function (req, res) {
  let deleteId = req.params.id;
  db.admin.remove({ _id: mongojs.ObjectId(deleteId) }, function (err, data) {
    if (err) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      res.status(200).json({ msg: "admin deleted" });
    }
  });
});
module.exports=router;