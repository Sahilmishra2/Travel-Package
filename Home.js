// components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ packages, deletePackage }) => {
  return (
    <div>
      <h2>Available Packages</h2>
      <Link to="/create" className="btn btn-primary mb-3">Create New Package</Link>
      {packages.length === 0 ? (
        <p>No packages available</p>
      ) : (
        <div>
          {packages.map((pkg, index) => (
            <div key={index} className="card mb-3">
              <div className="card-header">
                {pkg.name}
                <Link to={`/edit/${index}`} className="btn btn-primary ml-2">Edit</Link>
              </div>
              <div className="card-body">
                <p><strong>Number of Days:</strong> {pkg.numberOfDays}</p>
                <p><strong>Number of People:</strong> {pkg.numberOfPeople}</p>
                <p><strong>Destinations:</strong></p>
                <ul>
                  {pkg.destinations.map((destination, destIndex) => (
                    <li key={destIndex}>
                      <strong>{destination.name}</strong>
                      <ul>
                        {destination.activities.map((activity, actIndex) => (
                          <li key={actIndex}>
                            {activity.name} - Cost: {activity.cost}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                <button className="btn btn-danger" onClick={() => deletePackage(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
