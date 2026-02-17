import React, { useEffect, useState } from "react";
import {
  getDeals,
  addDeal,
  deleteDeal,
  updateDeal
} from "../api";
import Navbar from "./Navbar";

export default function Deals({ token }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔄 Load deals
  const load = async () => {
    try {
      const res = await getDeals(token);
      setData(res.data.results || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Token not valid");
    }
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  // ➕ Add or Update Deal
  const handleAddOrUpdate = async () => {
    if (!name || !amount) {
      alert("⚠️ Fill all fields");
      return;
    }

    const body = {
      properties: {
        dealname: name,
        amount,
        pipeline: "default",
        dealstage: "appointmentscheduled"
      }
    };

    try {
      if (editingId) {
        await updateDeal(token, editingId, body);
        setEditingId(null);
      } else {
        await addDeal(token, body);
      }

      // reset form
      setName("");
      setAmount("");

      load();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to save deal");
    }
  };

  // ❌ Delete deal
  const handleDelete = async (id) => {
    try {
      await deleteDeal(token, id);
      load();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to delete deal");
    }
  };

  // ✏️ Edit button click
  const handleEdit = (deal) => {
    setName(deal.properties.dealname || "");
    setAmount(deal.properties.amount || "");
    setEditingId(deal.id);
  };

  // 🔍 Client-side search
  const filtered = data.filter((d) => {
    const values = Object.values(d.properties || {})
      .map((v) => (v ? v.toString().toLowerCase() : ""))
      .join(" ");
    return values.includes(search.toLowerCase());
  });

  return (
    <div>
      <Navbar />
      <h2>💰 Deals</h2>

      {/* ➕ Add / Update Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Deal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleAddOrUpdate}>
          {editingId ? "Update Deal" : "Add Deal"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setName("");
              setAmount("");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* 🔍 Search */}
      <input
        placeholder="Search deals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", width: "300px" }}
      />

      {/* 📋 Table */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Stage</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((d) => (
            <tr key={d.id}>
              <td>{d.properties.dealname}</td>
              <td>{d.properties.amount}</td>
              <td>{d.properties.dealstage}</td>

              <td>
                <button onClick={() => handleEdit(d)}>Edit</button>
                <button onClick={() => handleDelete(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
