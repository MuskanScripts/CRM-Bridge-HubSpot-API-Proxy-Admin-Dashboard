import React, { useEffect, useState } from "react";
import { getContacts, addContact, deleteContact } from "../api";
import Navbar from "./Navbar";

export default function Contacts({ token }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });

  // 🔄 Load contacts
  const load = async () => {
    try {
      const res = await getContacts(token);
      setData(res.data.results || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to load contacts / invalid token");
    }
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

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
      <h2>📇 Contacts</h2>

      {/* ➕ Add Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="First Name"
          value={form.firstname}
          onChange={(e) =>
            setForm({ ...form, firstname: e.target.value })
          }
        />
        <input
          placeholder="Last Name"
          value={form.lastname}
          onChange={(e) =>
            setForm({ ...form, lastname: e.target.value })
          }
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <button onClick={handleAdd}>Add Contact</button>
      </div>

      {/* 🔍 Search */}
      <input
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", width: "300px" }}
      />

      {/* 📋 Table */}
      <table border="1" width="100%">
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
                <button onClick={() => handleDelete(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
