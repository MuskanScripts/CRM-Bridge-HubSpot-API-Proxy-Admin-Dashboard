import React, { useEffect, useState, useCallback } from "react";
import {
  getDeals,
  addDeal,
  deleteDeal,
  updateDeal,
} from "../api";
import Navbar from "./Navbar";

export default function Deals({ token }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔄 Load deals
  const load = useCallback(async () => {
    try {
      const res = await getDeals(token);
      setData(res.data.results || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Token not valid");
    }
  }, [token]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

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
        dealstage: "appointmentscheduled",
      },
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddOrUpdate();
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
      <div className="app-container" style={{paddingTop: '2rem', justifyContent: 'flex-start'}}>
        <div className="card-container" style={{maxWidth: '900px'}}>
          <h2 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)'}}>
            💰 Deals
          </h2>
          <p style={{marginBottom: '1.5rem', color: 'var(--text-secondary)'}}>Add, view, and manage your deals.</p>

          <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem'}}>
            <input
              placeholder="Deal Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
              style={{marginBottom: 0}}
            />
            <input
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
                  setName("");
                  setAmount("");
                }}
                className="btn-danger"
                style={{background: '#6c757d'}}
              >
                Cancel
              </button>
            )}
          </div>

          <input
            placeholder="Search deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />

          <div className="table-container">
            <table>
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
                      <button
                        className="btn-primary"
                        style={{padding: '0.4rem 0.8rem', fontSize: '0.9rem', marginRight: '0.5rem'}}
                        onClick={() => handleEdit(d)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        style={{padding: '0.4rem 0.8rem', fontSize: '0.9rem'}}
                        onClick={() => handleDelete(d.id)}
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
