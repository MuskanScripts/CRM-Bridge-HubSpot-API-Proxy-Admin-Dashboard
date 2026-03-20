import React, { useEffect, useState, useCallback } from "react";
import {
  getTickets,
  addTicket,
  updateTicket,
  deleteTicket,
} from "../api";
import Navbar from "./Navbar";

export default function Tickets({ token }) {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔄 Load tickets
  const load = useCallback(async () => {
    try {
      const res = await getTickets(token);
      setData(res.data.results || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Tickets not enabled or invalid token");
    }
  }, [token]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  // ➕ Add or ✏️ Update ticket
  const handleAddOrUpdate = async () => {
    if (!subject) {
      alert("⚠️ Enter ticket subject");
      return;
    }

    const body = {
      properties: {
        subject,
        hs_pipeline: "0",
        hs_pipeline_stage: "1",
      },
    };

    try {
      if (editingId) {
        await updateTicket(token, editingId, body);
        setEditingId(null);
      } else {
        await addTicket(token, body);
      }

      setSubject("");
      load();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to save ticket");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddOrUpdate();
    }
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    try {
      await deleteTicket(token, id);
      load();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to delete ticket");
    }
  };

  // ✏️ Edit
  const handleEdit = (t) => {
    setSubject(t.properties?.subject || "");
    setEditingId(t.id);
  };

  // 🔍 Search
  const filtered = data.filter((t) => {
    const values = Object.values(t.properties || {})
      .map((v) => (v ? v.toString().toLowerCase() : ""))
      .join(" ");
    return values.includes(search.toLowerCase());
  });

  return (
    <div>
      <Navbar />
      <div className="app-container" style={{paddingTop: '2rem', justifyContent: 'flex-start'}}>
        <div className="card-container" style={{maxWidth: '900px'}}>
          <h2 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)'}}>
            🎫 Tickets
          </h2>
          <p style={{marginBottom: '1.5rem', color: 'var(--text-secondary)'}}>Add, view, and manage your tickets.</p>

          <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem'}}>
            <input
              placeholder="Ticket Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
              style={{marginBottom: 0}}
            />
            <button onClick={handleAddOrUpdate} className="btn-primary" style={{padding: '0.75rem 1rem'}}>
              {editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setSubject("");
                }}
                className="btn-danger"
                style={{background: '#6c757d'}}
              >
                Cancel
              </button>
            )}
          </div>

          <input
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id}>
                    <td>{t.properties.subject}</td>
                    <td>
                      <button
                        className="btn-primary"
                        style={{padding: '0.4rem 0.8rem', fontSize: '0.9rem', marginRight: '0.5rem'}}
                        onClick={() => handleEdit(t)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        style={{padding: '0.4rem 0.8rem', fontSize: '0.9rem'}}
                        onClick={() => handleDelete(t.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
