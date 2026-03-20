import React, { useEffect, useState, useCallback } from "react";
import { getContacts, addContact, deleteContact } from "../api";
import Navbar from "./Navbar";

export default function Contacts({ token }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  // 🔄 Load contacts
  const load = useCallback(async () => {
    try {
      const res = await getContacts(token);
      setData(res.data.results || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to load contacts / invalid token");
    }
  }, [token]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  // ➕ Add contact
  const handleAdd = async () => {
    if (!form.firstname || !form.lastname || !form.email) {
      alert("⚠️ Fill all fields");
      return;
    }

    try {
      await addContact(token, { properties: form });
      setForm({ firstname: "", lastname: "", email: "" });
      load();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to add contact");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  // ❌ Delete contact
  const handleDelete = async (id) => {
    try {
      await deleteContact(token, id);
      load();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to delete contact");
    }
  };

  // 🔍 Client-side search
  const filtered = data.filter((c) => {
    const values = Object.values(c.properties || {})
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
            📇 Contacts
          </h2>
          <p style={{marginBottom: '1.5rem', color: 'var(--text-secondary)'}}>Add, view, and manage your contacts.</p>

          <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem'}}>
            <input
              placeholder="First Name"
              value={form.firstname}
              onChange={(e) => setForm({ ...form, firstname: e.target.value })}
              onKeyPress={handleKeyPress}
              className="input-field"
              style={{marginBottom: 0}}
            />
            <input
              placeholder="Last Name"
              value={form.lastname}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })}
              onKeyPress={handleKeyPress}
              className="input-field"
              style={{marginBottom: 0}}
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyPress={handleKeyPress}
              className="input-field"
              style={{marginBottom: 0}}
            />
            <button onClick={handleAdd} className="btn-primary" style={{padding: '0.75rem 1rem'}}>
              Add
            </button>
          </div>

          <input
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>First</th>
                  <th>Last</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td>{c.properties.firstname}</td>
                    <td>{c.properties.lastname}</td>
                    <td>{c.properties.email}</td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(c.id)}
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
