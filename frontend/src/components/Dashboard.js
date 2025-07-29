import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://127.0.0.1:5000/yields');
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        setVaults(data.vaults);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome to WarVault</h2>
      {loading && <p>Loading vault data...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Vault</th>
              <th>APY</th>
            </tr>
          </thead>
          <tbody>
            {vaults.map((v, idx) => (
              <tr key={idx}>
                <td>{v.name}</td>
                <td>{v.apy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
