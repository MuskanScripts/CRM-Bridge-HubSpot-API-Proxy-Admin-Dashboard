import React, { useEffect, useState, useCallback } from "react";
import {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} from "../api";
import Navbar from "./Navbar";

export default function Companies({ token }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔄 Load companies
  const load = useCallback(async () => {
    try {
      const res = await getCompanies(token);
      setData(res.data.results || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Token not valid");
    }
  }, [token]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  // ➕ Add or ✏️ Update company
  const handleAddOrUpdate = async () => {
    if (!name) {
      alert("⚠️ Enter company name");
      return;
    }

    const body = {
      properties: {
        name,
      },
    };

    try {
      if (editingId) {
        // update
        await updateCompany(token, editingId, body);
        setEditingId(null);
      } else {
        // create
        await addCompany(token, body);
      }

      setName(""); // reset input
      load();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to save company");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddOrUpdate();
    }
  };

  // ❌ Delete company
  const handleDelete = async (id) => {
    try {
      await deleteCompany(token, id);
      load();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to delete company");
    }
  };

  // ✏️ Edit company
  const handleEdit = (company) => {
    setName(company.properties?.name || "");
    setEditingId(company.id);
  };

  // 🔍 Search filter
  const filtered = data.filter((c) => {
    const companyName = c.properties?.name || "";
    return companyName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Navbar />
      <div className="app-container" style={{paddingTop: '2rem', justifyContent: 'flex-start'}}>
        <div className="card-container" style={{maxWidth: '900px'}}>
          <h2 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)'}}>
            🏢 Companies
          </h2>
          <p style={{marginBottom: '1.5rem', color: 'var(--text-secondary)'}}>Add, view, and manage your companies.</p>

          <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem'}}>
            <input
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                }}
                className="btn-danger"
                style={{background: '#6c757d'}}
              >
                Cancel
              </button>
            )}
          </div>

          <input
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td>{c.properties?.name}</td>
                    <td>
                      <button
                        className="btn-primary"
                        style={{padding: '0.4rem 0.8rem', fontSize: '0.9rem', marginRight: '0.5rem'}}
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        style={{padding: '0.4rem 0.8rem', fontSize: '0.9rem'}}
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
