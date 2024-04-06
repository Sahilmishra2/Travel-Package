// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreatePackage from './components/CreatePackage';
import EditPackage from './components/EditPackage';
import "./App.css";

function App() {
  const [packages, setPackages] = useState([]);

  const addPackage = (newPackage) => {
    setPackages([...packages, newPackage]);
  };

  const editPackage = (index, editedPackage) => {
    const updatedPackages = [...packages];
    updatedPackages[index] = editedPackage;
    setPackages(updatedPackages);
  };

  const deletePackage = (index) => {
    const updatedPackages = [...packages];
    updatedPackages.splice(index, 1);
    setPackages(updatedPackages);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Home packages={packages} deletePackage={deletePackage} />}
          />
          <Route
            path="/create"
            element={<CreatePackage addPackage={addPackage} />}
          />
          <Route
            path="/edit/:index"
            element={<EditPackage packages={packages} editPackage={editPackage} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
