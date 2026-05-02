import axios from "axios";

const SESSION_KEY = "nexus_session_id";

function getSessionId() {
  let sid = localStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

const api = axios.create({
baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  config.headers["x-session-id"] = getSessionId();
  return config;
});

export default api;
