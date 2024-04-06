// components/CreatePackage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePackage = ({ addPackage }) => {
  const [packageName, setPackageName] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(1); // Default to 1 day
  const [destinations, setDestinations] = useState([{ name: '', activities: [{ name: '', cost: 0 }] }]);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const navigate = useNavigate();

  const handleDestinationChange = (index, value) => {
    const newDestinations = [...destinations];
    newDestinations[index].name = value;
    setDestinations(newDestinations);
  };

  const handleNumberOfPeopleChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= 40) {
      setNumberOfPeople(value);
    }
  };

  const handleBack = () => {
    navigate('/');
  };


  const handleActivityChange = (destIndex, actIndex, field, value) => {
    const newDestinations = [...destinations];
    newDestinations[destIndex].activities[actIndex][field] = value;
    setDestinations(newDestinations);
  };

  const addDestination = () => {
    setDestinations([...destinations, { name: '', activities: [{ name: '', cost: 0 }] }]);
  };

  const addActivity = (destIndex) => {
    const newDestinations = [...destinations];
    newDestinations[destIndex].activities.push({ name: '', cost: 0 });
    setDestinations(newDestinations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPackage = {
      name: packageName,
      numberOfDays: numberOfDays,
      destinations: destinations,
      numberOfPeople: numberOfPeople
    };

    if(!isNaN(numberOfPeople) && numberOfPeople > 0 && numberOfPeople <= 40) {
    addPackage(newPackage);
    navigate('/');
    }
  };

  return (
    <div>
      <h2>Create Package</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Package Name:</label>
          <input
            type="text"
            className="form-control"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Number of People:</label>
          <input
            type="number"
            className="form-control"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
            min={1}
            max={40}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of Days:</label>
          <input
            type="number"
            className="form-control"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label>Destinations:</label>
          {destinations.map((destination, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={`Destination ${index + 1}`}
                value={destination.name}
                onChange={(e) => handleDestinationChange(index, e.target.value)}
                required
              />
              <div className="mt-2">
                <label>Activities:</label>
                {destination.activities.map((activity, actIndex) => (
                  <div key={actIndex} className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Activity"
                        value={activity.name}
                        onChange={(e) => handleActivityChange(index, actIndex, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Cost"
                        value={activity.cost}
                        onChange={(e) => handleActivityChange(index, actIndex, 'cost', parseInt(e.target.value))}
                        required
                      />
                    </div>
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-secondary mt-2" onClick={() => addActivity(index)}>Add Activity</button>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-sm btn-secondary" onClick={addDestination}>Add Destination</button>
        </div>
        <button type="submit" className="btn btn-primary">Create Package</button>
      </form>
      <br></br>
      <button className="btn btn-secondary" onClick={handleBack}>Back</button>
    </div>
  );
};

export default CreatePackage;
