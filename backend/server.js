const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const HUBSPOT_BASE_URL = 'https://api.hubapi.com/crm/v3/objects/contacts';

// 🔐 Helper: normalize Bearer token
function getAuthHeader(token) {
  if (!token) return {};

  const cleanToken = token.replace(/^Bearer\s+/i, "").trim();

  return {
    Authorization: `Bearer ${cleanToken}`
  };
}

//////////////////////////////////////////////////////
// 🔹 CREATE CONTACT
//////////////////////////////////////////////////////
app.post('/contacts', async (req, res) => {
  try {
    const token = req.headers['authorization'];

    const response = await axios.post(
      HUBSPOT_BASE_URL,
      req.body,
      {
        headers: {
          ...getAuthHeader(token),
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 GET ALL CONTACTS
//////////////////////////////////////////////////////
app.get('/contacts', async (req, res) => {
  try {
    const token = req.headers['authorization'];

    const response = await axios.get(HUBSPOT_BASE_URL, {
      headers: getAuthHeader(token)
    });

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 GET CONTACT BY ID
//////////////////////////////////////////////////////
app.get('/contacts/:id', async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const { id } = req.params;

    const response = await axios.get(
      `${HUBSPOT_BASE_URL}/${id}?properties=firstname,lastname,email,hs_lead_status`,
      {
        headers: getAuthHeader(token)
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 UPDATE CONTACT BY ID
//////////////////////////////////////////////////////
app.patch('/contacts/:id', async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const { id } = req.params;

    const response = await axios.patch(
      `${HUBSPOT_BASE_URL}/${id}`,
      { properties: req.body.properties },
      {
        headers: {
          ...getAuthHeader(token),
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 UPDATE CONTACT BY EMAIL
//////////////////////////////////////////////////////
app.patch('/contacts/email/:email', async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const { email } = req.params;

    const response = await axios.patch(
      `${HUBSPOT_BASE_URL}/${email}?idProperty=email`,
      { properties: req.body.properties },
      {
        headers: {
          ...getAuthHeader(token),
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 DELETE CONTACT
//////////////////////////////////////////////////////
app.delete('/contacts/:id', async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const { id } = req.params;

    await axios.delete(`${HUBSPOT_BASE_URL}/${id}`, {
      headers: getAuthHeader(token)
    });

    res.status(204).send();
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 SEARCH CONTACTS
//////////////////////////////////////////////////////
app.post('/contacts/search', async (req, res) => {
  try {
    const token = req.headers['authorization'];

    const response = await axios.post(
      `${HUBSPOT_BASE_URL}/search`,
      req.body,
      {
        headers: {
          ...getAuthHeader(token),
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('Search contacts failed:', err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////


                //     ⚡⚡⚡⚡⚡⚡⚡⚡DEALS ENDPOINTS FROM HERE ->>>>>>>>>>>>>>>>>>>






//////////////////////////////////////////////////////
// 🔹 DEALS ROUTES
//////////////////////////////////////////////////////

const DEALS_BASE = 'https://api.hubapi.com/crm/v3/objects/deals';

//////////////////////////////////////////////////////
// 🔹 GET ALL DEALS
//////////////////////////////////////////////////////
app.get('/deals', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const response = await axios.get(DEALS_BASE, {
      headers: getAuthHeader(token)
    });

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 GET DEAL BY ID
//////////////////////////////////////////////////////
app.get('/deals/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const dealId = req.params.id;

    const response = await axios.get(`${DEALS_BASE}/${dealId}`, {
      headers: getAuthHeader(token)
    });

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 CREATE DEAL
//////////////////////////////////////////////////////
app.post('/deals', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const response = await axios.post(
      DEALS_BASE,
      req.body,
      {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 UPDATE DEAL
//////////////////////////////////////////////////////
app.patch('/deals/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const dealId = req.params.id;

    const response = await axios.patch(
      `${DEALS_BASE}/${dealId}`,
      req.body,
      {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 DELETE DEAL
//////////////////////////////////////////////////////
app.delete('/deals/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const dealId = req.params.id;

    await axios.delete(`${DEALS_BASE}/${dealId}`, {
      headers: getAuthHeader(token)
    });

    res.status(204).send();
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 SEARCH DEALS (generic)
//////////////////////////////////////////////////////
app.post('/deals/search', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const response = await axios.post(
      `${DEALS_BASE}/search`,
      req.body,
      {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔍 SEARCH EXACT DEAL NAME
//////////////////////////////////////////////////////
app.post('/deals/search-by-name-exact', async (req, res) => {
  const token = req.headers.authorization;
  const { name } = req.body;

  const body = {
    filterGroups: [{
      filters: [{
        propertyName: 'dealname',
        operator: 'EQ',
        value: name
      }]
    }],
    properties: ['dealname', 'amount'],
    limit: 5,
    sorts: ['-createdate']
  };

  try {
    const response = await axios.post(
      `${DEALS_BASE}/search`,
      body,
      {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔍 SEARCH DEAL NAME CONTAINS
//////////////////////////////////////////////////////
app.post('/deals/search-by-name-contains', async (req, res) => {
  const token = req.headers.authorization;
  const { namePart } = req.body;

  const body = {
    filterGroups: [{
      filters: [{
        propertyName: 'dealname',
        operator: 'CONTAINS_TOKEN',
        value: namePart
      }]
    }],
    properties: ['dealname', 'amount'],
    limit: 5,
    sorts: ['-createdate']
  };

  try {
    const response = await axios.post(
      `${DEALS_BASE}/search`,
      body,
      {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});




//             ---------------------COMPANIES ENDPOINTS FROM HERE ->>>>>>>>>>>>>>>>>>>

//////////////////////////////////////////////////////
// 🔹 COMPANIES ROUTES
//////////////////////////////////////////////////////

const COMPANIES_BASE = "https://api.hubapi.com/crm/v3/objects/companies";

//////////////////////////////////////////////////////
// 🔹 GET ALL COMPANIES
//////////////////////////////////////////////////////
app.get('/companies', async (req, res) => {
  try {
    const token = req.headers.authorization;
    let { limit = 10, archived = false } = req.query;

    // convert string to boolean
    archived = archived === "true";

    const response = await axios.get(COMPANIES_BASE, {
      headers: getAuthHeader(token),
      params: { limit, archived }
    });

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 GET COMPANY BY ID
//////////////////////////////////////////////////////
app.get('/companies/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;

    const response = await axios.get(`${COMPANIES_BASE}/${id}`, {
      headers: getAuthHeader(token)
    });

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 CREATE COMPANY
//////////////////////////////////////////////////////
app.post('/companies', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const response = await axios.post(
      COMPANIES_BASE,
      req.body,
      {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 UPDATE COMPANY
//////////////////////////////////////////////////////
app.patch('/companies/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;

    const response = await axios.patch(
      `${COMPANIES_BASE}/${id}`,
      req.body,
      {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 DELETE COMPANY
//////////////////////////////////////////////////////
app.delete('/companies/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;

    await axios.delete(`${COMPANIES_BASE}/${id}`, {
      headers: getAuthHeader(token)
    });

    res.status(204).send();
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 SEARCH COMPANIES
//////////////////////////////////////////////////////
app.post('/companies/search', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const response = await axios.post(
      `${COMPANIES_BASE}/search`,
      req.body,
      {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});



//--------------------------------------TICKETTS ENDPOINTS FROM HERE ->>>>>>>>>>>>>>>>>>>





//////////////////////////////////////////////////////
// 🎫 TICKETS ROUTES
//////////////////////////////////////////////////////

const TICKETS_BASE = "https://api.hubapi.com/crm/v3/objects/tickets";

//////////////////////////////////////////////////////
// 🔹 GET ALL TICKETS
//////////////////////////////////////////////////////
app.get('/tickets', async (req, res) => {
  try {
    const token = req.headers.authorization;
    let { limit = 10, archived = false } = req.query;

    archived = archived === "true";

    const response = await axios.get(TICKETS_BASE, {
      headers: getAuthHeader(token),
      params: { limit, archived }
    });

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 GET TICKET BY ID
//////////////////////////////////////////////////////
app.get('/tickets/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;

    const response = await axios.get(`${TICKETS_BASE}/${id}`, {
      headers: getAuthHeader(token)
    });

    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 CREATE TICKET
//////////////////////////////////////////////////////
app.post('/tickets', async (req, res) => {
  try {
    const token = req.headers.authorization;

    const response = await axios.post(
      TICKETS_BASE,
      req.body,
      {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Create ticket error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 UPDATE TICKET
//////////////////////////////////////////////////////
app.patch('/tickets/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;

    const response = await axios.patch(
      `${TICKETS_BASE}/${id}`,
      req.body,
      {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Update ticket error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});

//////////////////////////////////////////////////////
// 🔹 DELETE TICKET
//////////////////////////////////////////////////////
app.delete('/tickets/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;

    await axios.delete(`${TICKETS_BASE}/${id}`, {
      headers: getAuthHeader(token)
    });

    res.status(204).send();
  } catch (err) {
    console.error("Delete ticket error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message
    });
  }
});




// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ HubSpot Agent API running on http://localhost:${PORT}`);
});
