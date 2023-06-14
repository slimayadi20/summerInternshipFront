import React, { useEffect, useState } from 'react';
import './App.css';

const HelmRelease = () => {
    const [releases, setReleases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        fetch('/releases')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Check the data received from the API
                // Parse the data into an array of objects
                const parsedReleases = data.map(release => {
                    const [name, namespace] = release.split(', ');

                    return {
                        name: name.replace('Release Name: ', ''),
                        namespace: namespace.replace('Namespace: ', ''),
                    };
                });

                setReleases(parsedReleases); // Set the "releases" state with the parsed data
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

    // Group releases by namespace
    const groupedReleases = {};
    releases.forEach(release => {
        const namespace = release.namespace;
        if (groupedReleases[namespace]) {
            groupedReleases[namespace].push(release);
        } else {
            groupedReleases[namespace] = [release];
        }
    });

    return (
        <div className="App">
            <h2>Helm Releases</h2>
            <div className="releases-container">
                {Object.entries(groupedReleases).map(([namespace, releases]) => (
                    <div className="release-card" key={namespace}>
                        <h3>Namespace: {namespace}</h3>
                        <ul>
                            {releases.map((release, index) => (
                                <li key={index}>
                                    Release Name: {release.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelmRelease;
