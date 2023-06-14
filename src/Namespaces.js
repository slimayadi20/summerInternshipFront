import React, { useEffect, useState } from 'react';
import './App.css';

const Namespaces = () => {
  const [namespaces, setNamespaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch('/namespaces')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check the data received from the API
        const deploymentItems = data.items; // Access the "items" array
        setNamespaces(data); // Set the "namespaces" state with the deployment items
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching release info:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="App">
      <div className="App-intro">
        <h2>Release Info</h2>
        {!Array.isArray(namespaces) || namespaces.length === 0 ? (
          <p>No release info available</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>API Version</th>
                  <th>Namespace</th>
                  <th>Phase</th>
                </tr>
              </thead>
              <tbody>
                {namespaces.map(namespace => (
                  <tr key={namespace.metadata.uid}>
                    <td>{namespace.apiVersion}</td>
                    <td>{namespace.metadata.name}</td>
                    <td>{namespace.status.phase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Namespaces;
