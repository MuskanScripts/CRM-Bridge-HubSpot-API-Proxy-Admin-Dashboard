import React, { useEffect, useState } from "react";
import {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany
} from "../api";
import Navbar from "./Navbar";

export default function Companies({ token }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  ////////////////////////////////////////////////////////////
  // 🔄 LOAD COMPANIES
  ////////////////////////////////////////////////////////////
  const load = async () => {
    try {
      const res = await getCompanies(token);
      setData(res.data.results || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Token not valid");
    }
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  ////////////////////////////////////////////////////////////
  // ➕ ADD or ✏️ UPDATE COMPANY
  ////////////////////////////////////////////////////////////
  const handleAddOrUpdate = async () => {
    if (!name) {
      alert("⚠️ Enter company name");
      return;
    }

    const body = {
      properties: {
        name
      }
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

  ////////////////////////////////////////////////////////////
  // ❌ DELETE COMPANY
  ////////////////////////////////////////////////////////////
  const handleDelete = async (id) => {
    try {
      await deleteCompany(token, id);
      load();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to delete company");
    }
  };

  ////////////////////////////////////////////////////////////
  // ✏️ EDIT COMPANY
  ////////////////////////////////////////////////////////////
  const handleEdit = (company) => {
    setName(company.properties?.name || "");
    setEditingId(company.id);
  };

  ////////////////////////////////////////////////////////////
  // 🔍 SEARCH FILTER
  ////////////////////////////////////////////////////////////
  const filtered = data.filter((c) => {
    const companyName = c.properties?.name || "";
    return companyName.toLowerCase().includes(search.toLowerCase());
  });

  ////////////////////////////////////////////////////////////
  // UI
  ////////////////////////////////////////////////////////////
  return (
    <div>
      <Navbar />
      <h2>🏢 Companies</h2>

      {/* ➕ Add / Update Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleAddOrUpdate}>
          {editingId ? "Update Company" : "Add Company"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setName("");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* 🔍 Search */}
      <input
        placeholder="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", width: "300px" }}
      />

      {/* 📋 Table */}
      <table border="1" width="100%">
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
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
