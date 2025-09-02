import axios from "axios";

const API = axios.create({
  baseURL: "https://lms-lm11.onrender.com/api", // 👈 your machine's IP
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
