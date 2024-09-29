// src/App.js

import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import EventList from './components/EventList';
import { getEvents } from './api';
import { InfoAlert, ErrorAlert } from './components/Alert';  // Import ErrorAlert
import './App.css';

const App = () => {
  const [allLocations] = useState([]);  // Removed the unused setAllLocations
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");  // New state for InfoAlert
  const [errorAlert, setErrorAlert] = useState("");  // New state for ErrorAlert

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEvents = await getEvents(currentCity, currentNOE);
      setEvents(fetchedEvents);
    };
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <div className="alerts-container">  {/* Container for alerts */}
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}  // Passing setInfoAlert to CitySearch
      />
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}  // Passing setErrorAlert to NumberOfEvents
      />
      <EventList events={events} />
    </div>
  );
};

export default App;
