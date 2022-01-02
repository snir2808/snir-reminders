const express = require("express");
const reminderCon = require("./../controllers/reminders");

const router = express.Router();

router.get("/:id", reminderCon.getPosts);
router.post("/posts", reminderCon.createPost);

module.exports = router;
