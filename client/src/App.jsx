import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import EventList from "./components/EventList";
import TicketList from "./components/TicketList";
import Home from "./components/Home";
import Chat from "./components/Chat";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminPanel from "./components/AdminPanel";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const setAuthenticatedUser = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div>
        <Header user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login setToken={setAuthenticatedUser} />}
          />
          <Route path="/events" element={<EventList />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/dashboard" element={<UserDashboard user={user} />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
