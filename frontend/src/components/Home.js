import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home({ setToken, token }) {
  const [input, setInput] = useState("");

  const connect = () => {
    if (!input.trim()) {
      alert("⚠️ Please enter token");
      return;
    }
    setToken(input.trim());
  };

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1>🚀 HubSpot CRM Dashboard</h1>

      <input
        placeholder="Paste HubSpot Access Token"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <br /><br />

      <button onClick={connect}>Connect</button>

      {token && (
        <div style={{ marginTop: "30px" }}>
          <h3>Navigate:</h3>
          <Link to="/contacts">📇 Contacts</Link> |{" "}
          <Link to="/companies">🏢 Companies</Link> |{" "}
          <Link to="/deals">💰 Deals</Link> |{" "}
          <Link to="/tickets">🎫 Tickets</Link>
        </div>
      )}
    </div>
  );
}
