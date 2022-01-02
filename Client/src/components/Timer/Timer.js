import React, { useState } from "react";
import * as api from "./../../api/index";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Timer = (props) => {
  const [reminder, setRimainder] = useState({
    time: "",
    message: "",
    id: props.id,
    active: true,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.createReminder(reminder);
    toast.success("reminder saved! ⏰", {});
    setTimeout(() => {
      navigate(`/`);
    }, 1500);
  };

  return (
    <div className="container">
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
      <h1>pick a reminder</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          onChange={(e) => {
            setRimainder({ ...reminder, time: e.target.value });
          }}
          required
        />
        <br />
        <br />
        <textarea
          onChange={(e) => {
            setRimainder({ ...reminder, message: e.target.value });
          }}
          required
          placeholder="Message"
        />
        <br />

        <button type="submit">send</button>
      </form>
      <button>
        <Link to={"/"}>Back to home</Link>
      </button>
    </div>
  );
};

export default Timer;
