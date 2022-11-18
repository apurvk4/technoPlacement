const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const authenticateAdmin = require("../middleware/authenticateAdmin");
const Course = require("../model/courseSchema");
const handleError = require("../handleError");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

function verifyCodingCourse(req) {
  const ans = {};
  if (!("name" in req.body)) {
    return { status: false, message: "name is needed !!" };
  }
  if (!("courseType" in req.body)) {
    return { status: false, message: "courseType is needed !!" };
  } else if (req.body.courseType != "Coding") {
    return { status: false, message: "courseType value is incorrect !!" };
  }
  if (!("details" in req.body)) {
    return { status: false, message: "details are needed !!" };
  }
  if (!("codingLinks" in req.body)) {
    return { status: false, message: "codingLinks are needed !!" };
  } else if (
    !Array.isArray(req.body["codingLinks"]) &&
    req.body["codingLinks"].length > 0
  ) {
    return { status: false, message: "atleast one codingLinks are needed!!" };
  }
  if (!("tags" in req.body)) {
    return { status: false, message: "tags are needed !!" };
  } else if (!Array.isArray(req.body["tags"]) && req.body["tags"].length > 0) {
    return { status: false, message: "atleast one tags are needed!!" };
  }
  return {
    status: true,
  };
}
function verifyArticleCourse(req) {
  const ans = {};
  if (!("name" in req.body)) {
    return { status: false, message: "name is needed !!" };
  }
  if (!("courseType" in req.body)) {
    return { status: false, message: "courseType is needed !!" };
  } else if (req.body.courseType != "Article") {
    return { status: false, message: "courseType value is incorrect !!" };
  }

  if (!("articleBody" in req.body)) {
    return { status: false, message: "articleBody is needed !!" };
  }
  if (!("tags" in req.body)) {
    return { status: false, message: "tags are needed !!" };
  } else if (!Array.isArray(req.body["tags"]) && req.body["tags"].length > 0) {
    return { status: false, message: "atleast one tags are needed!!" };
  }
  return {
    status: true,
  };
}
function verifyMcqCourse(req) {
  const ans = {};
  if (!("name" in req.body)) {
    return { status: false, message: "name is defined !!" };
  }
  if (!("courseType" in req.body)) {
    return { status: false, message: "courseType is needed !!" };
  } else if (req.body.courseType != "Mcq") {
    return { status: false, message: "courseType value is incorrect !!" };
  }
  if (!("tags" in req.body)) {
    return { status: false, message: "tags are needed !!" };
  } else if (!Array.isArray(req.body["tags"])) {
    return { status: false, message: "invalid tags" };
  } else if (Array.isArray(req.body["tags"]) && req.body["tags"].length == 0) {
    return { status: false, message: "atleast one tags are needed!!" };
  }
  if (!("mcqs" in req.body)) {
    return { status: false, message: "mcqs are needed !!" };
  } else if (!Array.isArray(req.body["mcqs"]) && req.body["mcqs"].length > 0) {
    return { status: false, message: "atleast one mcqs are needed!!" };
  }
  return {
    status: true,
  };
}

router.get("/all/:type", async (req, res) => {
  try {
    let type = req.params.type;
    const filterQuery = {};
    switch (type) {
      case "coding":
        filterQuery["courseType"] = "Coding";
        break;
      case "article":
        filterQuery["courseType"] = "Article";
        break;
      case "mcq":
        filterQuery["courseType"] = "Mcq";
        break;
      default:
        res.status(400).send({ message: "invalid course type" });
        return;
    }
    let limit = 5;
    let skip = 0;
    if (req.query.limit) {
      let l = Number.parseInt(req.query.limit);
      if (Number.isInteger(l)) {
        limit = l;
      }
    }
    if (req.query.skip) {
      let s = Number.parseInt(req.query.skip);
      if (Number.isInteger(s)) {
        skip = s;
      }
    }
    let items = await Course.aggregate([
      { $sort: { date: -1 } },
      { $match: filterQuery },
      { $skip: skip },
      { $limit: limit },
    ]);
    res.status(200).send({ items });
  } catch (err) {
    res.status(400).send(handleError(err));
  }
});

router.delete("/:cid", authenticateAdmin, async (req, res) => {
  try {
    const course = await Course.deleteOne({ _id: ObjectId(req.params.cid) });
    if (course.deletedCount == 1) {
      res.status(201);
      res.end();
      return;
    }
    res.status(400).send({ message: "course not found" });
  } catch (err) {
    res.status(400).send(handleError(err));
  }
});

router.get("/join/:cid", authenticateUser, async (req, res) => {
  try {
    await req.rootuser.courses.push(ObjectId(req.params.cid));
    await req.rootuser.save();
    res.status(201);
    res.end();
  } catch (err) {
    res.status(400).send(handleError(err));
  }
});

router.post("/add", async (req, res) => {
  req.adminID = ObjectId("6353dd7f92ed75bc0e6f5a22");
  try {
    let ans = verifyArticleCourse(req);
    if (!ans.status) {
      if (
        typeof req.body.courseType == "undefined" ||
        req.body.courseType == "Article"
      ) {
        res.status(400).send(ans.message);
        return;
      }
    }
    ans = verifyCodingCourse(req);
    if (!ans.status) {
      if (
        typeof req.body.courseType == "undefined" ||
        req.body.courseType == "Coding"
      ) {
        res.status(400).send(ans.message);
        return;
      }
    }
    ans = verifyMcqCourse(req);
    if (!ans.status) {
      if (
        typeof req.body.courseType == "undefined" ||
        req.body.courseType == "Mcq"
      ) {
        res.status(400).send(ans.message);
        return;
      }
    }
    let doc = {};
    switch (req.body.courseType) {
      case "Article":
        doc = {
          name: req.body.name,
          courseType: req.body.courseType,
          articleBody: req.body.articleBody,
          tags: req.body.tags,
          author: req.adminID,
        };
        break;
      case "Mcq":
        doc = {
          name: req.body.name,
          courseType: req.body.courseType,
          tags: req.body.tags,
          author: req.adminID,
          mcqs: req.body.mcqs,
        };
        break;
      case "Coding":
        doc = {
          name: req.body.name,
          courseType: req.body.courseType,
          tags: req.body.tags,
          author: req.adminID,
          codingLinks: req.body.codingLinks,
          details: req.body.details,
        };
        break;
      default:
        res.status(400).send({ message: "courseType value is invalid" });
        return;
    }
    const course = new Course(doc);
    const result = await course.save();
    res.status(201).send(result.toObject());
  } catch (err) {
    res.status(400).send(handleError(err));
  }
});

router.patch("/update/:cid", authenticateAdmin, async (req, res) => {
  try {
    let ans = verifyArticleCourse(req);
    if (!ans.status) {
      if (
        typeof req.body.courseType == "undefined" ||
        req.body.courseType == "Article"
      ) {
        res.status(400).send(ans.message);
        return;
      }
    }
    ans = verifyCodingCourse(req);
    if (!ans.status) {
      if (
        typeof req.body.courseType == "undefined" ||
        req.body.courseType == "Coding"
      ) {
        res.status(400).send(ans.message);
        return;
      }
    }
    ans = verifyMcqCourse(req);
    if (!ans.status) {
      if (
        typeof req.body.courseType == "undefined" ||
        req.body.courseType == "Mcq"
      ) {
        res.status(400).send(ans.message);
        return;
      }
    }
    let doc = {};
    switch (req.body.courseType) {
      case "Article":
        doc = {
          name: req.body.name,
          courseType: req.body.courseType,
          articleBody: req.body.articleBody,
          tags: req.body.tags,
          author: req.adminID,
        };
        break;
      case "Mcq":
        doc = {
          name: req.body.name,
          courseType: req.body.courseType,
          tags: req.body.tags,
          author: req.adminID,
          mcqs: req.body.mcqs,
        };
        break;
      case "Coding":
        doc = {
          name: req.body.name,
          courseType: req.body.courseType,
          tags: req.body.tags,
          author: req.adminID,
          codingLinks: req.body.codingLinks,
          details: req.body.details,
        };
        break;
      default:
        res.status(400).send({ message: "courseType value is invalid" });
        return;
    }
    Course.findOneAndUpdate(
      { _id: ObjectId(req.params.cid) },
      { $set: doc }
    ).exec((err, course) => {
      if (err) {
        res.status(400).send(handleError(err));
      } else {
        res.status(201).send(course);
      }
    });
  } catch (err) {
    res.status(400).send(handleError(err));
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const course = await Course.findById(req.params.cid);
    if (course) {
      await course.toObject();
      res.status(200).send(course);
      return;
    }
    res.status(400).send({ message: "course not found" });
  } catch (err) {
    res.status(400).send(handleError(err));
  }
});
module.exports = router;