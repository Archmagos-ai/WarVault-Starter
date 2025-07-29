import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://127.0.0.1:5000/yields');
        const data = await res.json();
        setVaults(data.vaults);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome to WarVault</h2>
      {loading ? (
        <p>Loading vault data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Vault</th>
