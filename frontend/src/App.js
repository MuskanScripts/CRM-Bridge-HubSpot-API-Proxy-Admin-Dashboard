import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Contacts from "./components/Contacts";
import Companies from "./components/Companies";
import Deals from "./components/Deals";
import Tickets from "./components/Tickets";

export default function App() {
  const [token, setToken] = useState("");

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
