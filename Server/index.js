const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const schedule = require("node-schedule");
const getPosts = require("./controllers/reminders");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const connection = mongoose.connection;
const reminder = require("./routes/reminderRoute");
const PostMassage = require("./models/reminder");

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/", reminder);
app.get("/", (req, res) => {
  res.send("APP IS RUNNING!");
});

const CONNECTION_URL =
  "mongodb+srv://snir2808:snir2808@reminderdb.pkqyp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let users = [];

io.on("connection", (socket) => {
  console.log("user connection established");
  socket.on("adduser", (user) => {
    users.push(user);

    socket.on("disconnect", () => {
      console.log("Got disconnect!");
      let i = users.indexOf(user);
      users.splice(i, 1);
    });
  });
});

const scheduleReminders = (docs) => {
  docs.map((doc) => {
    let dateToReminder = new Date(doc.time).toUTCString();
    dateToReminder = dateToReminder + "+0200";
    console.log(dateToReminder);
    schedule.scheduleJob(dateToReminder, () => {
      users.map((user) => {
        if (doc.id === user.userId) {
          io.to(user.socketId).emit("message", doc.message);
        }
      });
      PostMassage.findByIdAndUpdate(doc._id, { active: false }, (err, doc) => {
        console.log("update to false");
      });
    });
  });
};

const handleReminders = () => {
  PostMassage.find({ active: true }, (err, docs) => {
    if (docs.length > 0) {
      scheduleReminders(docs);
    }
  })
    .sort({ time: 1 })
    .limit(5);
};

connection.once("open", () => {
  console.log("MongoDB database connected");

  console.log("Setting change streams");
  const changeStream = connection.collection("reminders").watch();

  changeStream.on("change", (change) => {
    console.log("changed");
    handleReminders();
  });
});

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    server.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port 5000`)
    )
  )
  .catch((err) => console.error(err.message));
