import axios from "axios";
const API = axios.create({
  baseURL: "https://reminders-snir.herokuapp.com/",
});

export const createReminder = (newReminder) => API.post("/posts", newReminder);

export const fetchReminders = (id) => API.get(`/${id}`);
