import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Namespaces from './Namespaces';
import ReleaseInfo from './ReleaseInfo';
import HelmRelease from './HelmRelease';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="App-intro">
          <Routes>
            <Route path="/" />
            <Route path="/namespaces" element={<Namespaces />} />
            <Route path="/helm-releases" element={<HelmRelease />} />
            <Route path="/release-info" element={<ReleaseInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
