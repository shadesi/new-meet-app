// src/App.js

import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import EventList from './components/EventList';
import { getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert'; // Import WarningAlert
import './App.css';

const App = () => {
  const [allLocations] = useState([]); // Removed the unused setAllLocations
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState(""); // New state for InfoAlert
  const [errorAlert, setErrorAlert] = useState(""); // New state for ErrorAlert
  const [warningAlert, setWarningAlert] = useState(""); // New state for WarningAlert

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEvents = await getEvents(currentCity, currentNOE);
      setEvents(fetchedEvents);
    };

    if (navigator.onLine) {
      setWarningAlert(""); // Online: no warning
    } else {
      setWarningAlert("You are offline. The displayed events may not be up to date.");
    }

    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <div className="alerts-container"> {/* Container for alerts */}
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert} // Passing setInfoAlert to CitySearch
      />
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert} // Passing setErrorAlert to NumberOfEvents
      />
      <EventList events={events} />
    </div>
  );
};

export default App;
