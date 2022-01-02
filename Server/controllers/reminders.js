const mongoose = require("mongoose");
const reminder = require("./../models/reminder");

const getPosts = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await reminder.find({ id: id });
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  const newReminder = new reminder(post);
  try {
    await newReminder.save();

    res.status(201).json(newReminder);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error });
  }
};
module.exports = { getPosts, createPost };
