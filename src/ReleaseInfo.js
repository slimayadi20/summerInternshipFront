import React, { useEffect, useState } from 'react';
import './App.css';

const ReleaseInfo = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (searching) {
      setLoading(true);

      fetch(`/infosrelease/${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          console.log(data); // Check the data received from the API
          setGroups(data); // Set the "groups" state with the data
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching release info:', error);
          setError(error);
          setLoading(false);
        });

      setSearching(false);
    }
  }, [searchTerm, searching]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setSearching(true);
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="App">
      <div className="App-intro">
        <h2>Release Info</h2>
        <div className="search-container">
          <label htmlFor="search">Search by Namespace:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchClick}>Search</button>
        </div>
        {!Array.isArray(groups) || groups.length === 0 ? (
          <p>No release info available</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>namespace</th>
                  <th>releaseName</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, index) => (
                  <tr key={index}>
                    <td>{group.namespace}</td>
                    <td>{group.releaseName}</td>
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

export default ReleaseInfo;
