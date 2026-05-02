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
baseURL: "https://nexus-ecommerce-production.up.railway.app",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  config.headers["x-session-id"] = getSessionId();
  return config;
});

export default api;
