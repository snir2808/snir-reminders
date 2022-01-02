import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="container">
      <h1>
        Hi, welcome! <br /> This is a reminder app <br /> Let's do something..
      </h1>
      <div>
        <button>
          <Link to="/timer">Create reminder</Link>
        </button>
        <button>
          <Link to="/list-timers">See all your reminders</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
