import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Timer from "./components/Timer/Timer";
import List from "./components/List/List";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let userId = localStorage.getItem("userId");
  const socket = io.connect("https://reminders-snir.herokuapp.com/");
  socket.on("connect", () => {
    if (!userId) {
      localStorage.setItem("userId", socket.id);
      userId = socket.id;
    }
    let user = {
      userId,
      socketId: socket.id,
    };
    socket.emit("adduser", user);
  });
  socket.on("message", (msg) => {
    toast.success(msg, {});
  });

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<Timer id={userId} />} />
          <Route path="/list-timers" element={<List id={userId} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
