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
  req.checkParams("id", "Id should be mongo Id").notEmpty().isMongoId();
  let validationErrors = req.validationErrors();
  if (validationErrors) {
    res.status(400).json(validationErrors);
    return false;
  }
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
  req.checkBody("name", "name should not be empty").notEmpty();
  req.checkBody("age", "age should not be empty").notEmpty();
  req.checkBody("email", "email should not be empty").notEmpty();
  let validationErrors = req.validationErrors();
  if (validationErrors) {
    res.status(400).json(validationErrors);
    return false;
  }
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
  req.checkBody("name", "name should not be empty").notEmpty();
  req.checkBody("age", "age should not be empty").notEmpty();
  req.checkBody("email", "email should not be empty").notEmpty();
  req.checkParams("id","id should not be empty").notEmpty() .isMongoId();
  let validationErrors = req.validationErrors();
  if (validationErrors) {
    res.status(400).json(validationErrors);
    return false;
  }
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
  req.checkParams("id" , "id should not be empty").notEmpty() .isMongoId();
  let validationErrors = req.validationErrors();
  if (validationErrors) {
    res.status(400).json(validationErrors);
    return false;
  }
  let deleteId = req.params.id;
  db.admin.remove({ _id: mongojs.ObjectId(deleteId) }, function (err, data) {
    if (err) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      res.status(200).json({ msg: "admin deleted" });
    }
  });
});
module.exports = router;
