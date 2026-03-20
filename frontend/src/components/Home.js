import React, { useState } from "react";
import { Link } from "react-router-dom";
import Toggle from "./Toggle";

export default function Home({ setToken, token }) {
  const [input, setInput] = useState("");

  const connect = () => {
    if (!input.trim()) {
      alert("⚠️ Please enter token");
      return;
    }
    setToken(input.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      connect();
    }
  };

  return (
    <div className="app-container">
      <div style={{position: 'absolute', top: '1rem', right: '1rem'}}>
        <Toggle />
      </div>
      <div className="card-container">
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)'}}>
          🚀 HubSpot CRM Dashboard
        </h1>
        <p style={{marginBottom: '1.5rem', color: 'var(--text-secondary)'}}>Connect to your HubSpot account</p>
        
        <div className="input-container">
          <input
            placeholder="Paste HubSpot Access Token"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-field"
          />
        </div>
        
        <button onClick={connect} className="btn-primary">
          Connect
        </button>
      </div>

      {token && (
        <div style={{marginTop: '2.5rem'}}>
          <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-secondary)'}}>
            Navigate:
          </h3>

          <div style={{display: 'flex', gap: '1rem', fontSize: '1.125rem', justifyContent: 'center'}}>
            <Link className="nav-link" to="/contacts">📇 Contacts</Link>
            <Link className="nav-link" to="/companies">🏢 Companies</Link>
            <Link className="nav-link" to="/deals">💰 Deals</Link>
            <Link className="nav-link" to="/tickets">🎫 Tickets</Link>
          </div>
        </div>
      )}
    </div>
  );
}
