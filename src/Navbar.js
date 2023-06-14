import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" style={{ marginRight: '30px' }}>
                            <NavLink exact="true" to="/" className="nav-link">Home</NavLink>
                        </li>

                        <li className="nav-item" style={{ marginRight: '30px' }}>
                            <NavLink exact="true" to="/namespaces" className="nav-link">Namespaces</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact="true" to="/helm-releases" className="nav-link">Helm Releases</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact="true" to="/release-info" className="nav-link">Release Info</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
