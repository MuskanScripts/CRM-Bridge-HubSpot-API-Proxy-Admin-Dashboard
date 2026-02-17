import React, { useEffect, useState } from "react";
import {
  getTickets,
  addTicket,
  updateTicket,
  deleteTicket
} from "../api";
import Navbar from "./Navbar";

export default function Tickets({ token }) {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  ////////////////////////////////////////////////////////
  // 🔄 LOAD TICKETS
  ////////////////////////////////////////////////////////
  const load = async () => {
    try {
      const res = await getTickets(token);
      setData(res.data.results || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Tickets not enabled or invalid token");
    }
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  ////////////////////////////////////////////////////////
  // ➕ ADD or ✏️ UPDATE TICKET
  ////////////////////////////////////////////////////////
  const handleAddOrUpdate = async () => {
    if (!subject) {
      alert("⚠️ Enter ticket subject");
      return;
    }

    const body = {
      properties: {
        subject,
        hs_pipeline: "0",
        hs_pipeline_stage: "1"
      }
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

  ////////////////////////////////////////////////////////
  // ❌ DELETE
  ////////////////////////////////////////////////////////
  const handleDelete = async (id) => {
    try {
      await deleteTicket(token, id);
      load();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to delete ticket");
    }
  };

  ////////////////////////////////////////////////////////
  // ✏️ EDIT
  ////////////////////////////////////////////////////////
  const handleEdit = (t) => {
    setSubject(t.properties?.subject || "");
    setEditingId(t.id);
  };

  ////////////////////////////////////////////////////////
  // 🔍 SEARCH
  ////////////////////////////////////////////////////////
  const filtered = data.filter((t) => {
    const values = Object.values(t.properties || {})
      .map((v) => (v ? v.toString().toLowerCase() : ""))
      .join(" ");
    return values.includes(search.toLowerCase());
  });

  ////////////////////////////////////////////////////////
  // UI
  ////////////////////////////////////////////////////////
  return (
    <div>
      <Navbar />
      <h2>🎫 Tickets</h2>

      {/* ➕ ADD / UPDATE */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Ticket Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <button onClick={handleAddOrUpdate}>
          {editingId ? "Update Ticket" : "Add Ticket"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setSubject("");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", width: "300px" }}
      />

      {/* 📋 TABLE */}
      <table border="1" width="100%">
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
                <button onClick={() => handleEdit(t)}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
