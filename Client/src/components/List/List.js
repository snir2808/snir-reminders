import React, { useEffect, useState } from "react";
import * as api from "./../../api/index";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const List = (props) => {
  const [reminders, setReminders] = useState([]);

  useEffect(async () => {
    const remindres = await api.fetchReminders(props.id);
    setReminders(remindres.data);
  }, []);

  return (
    <div className="container">
      <h1>all your reminders</h1>
      <ul>
        {reminders.length >= 1 ? (
          <>
            {reminders.map((reminder) => {
              console.log(reminder);
              if (reminder.active) {
                return (
                  <li className="active" key={reminder._id}>
                    <p>{reminder.message}</p>
                    <p>
                      <Moment fromNow>{reminder.time}</Moment>
                    </p>
                  </li>
                );
              } else {
                return (
                  <li className="pass" key={reminder._id}>
                    <p>{reminder.message}</p>
                    <p>Done!</p>
                    <Moment fromNow>{reminder.time}</Moment>
                  </li>
                );
              }
            })}
          </>
        ) : (
          <>
            <h2> There is no reminder yet create one.</h2>
            <button>
              <Link to={"/timer"}>Create reminder</Link>
            </button>
          </>
        )}
      </ul>
      <button className="center">
        <Link to={"/"}>Back to home</Link>
      </button>
    </div>
  );
};

export default List;
