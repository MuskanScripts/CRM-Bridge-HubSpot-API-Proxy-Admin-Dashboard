import axios from "axios";

const BASE_URL = "http://localhost:3000";   // ❗ remove trailing slash

////////////////////////////////////////////////////////////
// 🔐 HEADER HELPER (Token Normalization)
////////////////////////////////////////////////////////////
export const getHeaders = (token) => {
  if (!token || typeof token !== "string") {
    return {
      headers: {
        "Content-Type": "application/json"
      }
    };
  }

  // Remove accidental "Bearer " if already present
  const cleanToken = token.replace(/^Bearer\s+/i, "").trim();

  return {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
      "Content-Type": "application/json"
    }
  };
};

////////////////////////////////////////////////////////////
// 📇 CONTACTS APIs
////////////////////////////////////////////////////////////

export const getContacts = (token) =>
  axios.get(`${BASE_URL}/contacts`, getHeaders(token));

export const addContact = (token, data) =>
  axios.post(`${BASE_URL}/contacts`, data, getHeaders(token));

export const updateContact = (token, id, data) =>
  axios.patch(`${BASE_URL}/contacts/${id}`, data, getHeaders(token));

export const deleteContact = (token, id) =>
  axios.delete(`${BASE_URL}/contacts/${id}`, getHeaders(token));

export const searchContacts = (token, body) =>
  axios.post(`${BASE_URL}/contacts/search`, body, getHeaders(token));

////////////////////////////////////////////////////////////
// 🏢 COMPANIES APIs
////////////////////////////////////////////////////////////

// Get all companies
export const getCompanies = (token) =>
  axios.get(`${BASE_URL}/companies`, getHeaders(token));

// Get single company by ID
export const getCompanyById = (token, id) =>
  axios.get(`${BASE_URL}/companies/${id}`, getHeaders(token));

// Create new company
export const addCompany = (token, body) =>
  axios.post(`${BASE_URL}/companies`, body, getHeaders(token));

// Update company
export const updateCompany = (token, id, body) =>
  axios.patch(`${BASE_URL}/companies/${id}`, body, getHeaders(token));

// Delete company
export const deleteCompany = (token, id) =>
  axios.delete(`${BASE_URL}/companies/${id}`, getHeaders(token));

// Search companies (generic search body)
export const searchCompanies = (token, body) =>
  axios.post(`${BASE_URL}/companies/search`, body, getHeaders(token));

////////////////////////////////////////////////////////////
// 💰 DEALS APIs
////////////////////////////////////////////////////////////

// Get all deals
export const getDeals = (token) =>
  axios.get(`${BASE_URL}/deals`, getHeaders(token));

// Get single deal by ID
export const getDealById = (token, id) =>
  axios.get(`${BASE_URL}/deals/${id}`, getHeaders(token));

// Create new deal
export const addDeal = (token, body) =>
  axios.post(`${BASE_URL}/deals`, body, getHeaders(token));

// Update deal
export const updateDeal = (token, id, body) =>
  axios.patch(`${BASE_URL}/deals/${id}`, body, getHeaders(token));

// Delete deal
export const deleteDeal = (token, id) =>
  axios.delete(`${BASE_URL}/deals/${id}`, getHeaders(token));

// Generic search
export const searchDeals = (token, body) =>
  axios.post(`${BASE_URL}/deals/search`, body, getHeaders(token));

// Search by exact deal name
export const searchDealsByNameExact = (token, name) =>
  axios.post(
    `${BASE_URL}/deals/search-by-name-exact`,
    { name },
    getHeaders(token)
  );

// Search by partial deal name
export const searchDealsByNameContains = (token, namePart) =>
  axios.post(
    `${BASE_URL}/deals/search-by-name-contains`,
    { namePart },
    getHeaders(token)
  );


////////////////////////////////////////////////////////////
// 🎫 TICKETS APIs
////////////////////////////////////////////////////////////

export const getTickets = (token) =>
  axios.get(`${BASE_URL}/tickets`, getHeaders(token));

export const getTicketById = (token, id) =>
  axios.get(`${BASE_URL}/tickets/${id}`, getHeaders(token));

export const addTicket = (token, body) =>
  axios.post(`${BASE_URL}/tickets`, body, getHeaders(token));

export const updateTicket = (token, id, body) =>
  axios.patch(`${BASE_URL}/tickets/${id}`, body, getHeaders(token));

export const deleteTicket = (token, id) =>
  axios.delete(`${BASE_URL}/tickets/${id}`, getHeaders(token));