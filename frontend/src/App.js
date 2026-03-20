import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import Home from "./components/Home";
import Contacts from "./components/Contacts";
import Companies from "./components/Companies";
import Deals from "./components/Deals";
import Tickets from "./components/Tickets";

function AppContent() {
  const [token, setToken] = useState("");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setToken={setToken} token={token} />} />
        <Route path="/contacts" element={<Contacts token={token} />} />
        <Route path="/companies" element={<Companies token={token} />} />
        <Route path="/deals" element={<Deals token={token} />} />
        <Route path="/tickets" element={<Tickets token={token} />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
