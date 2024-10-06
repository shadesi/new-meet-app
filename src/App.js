// src/App.js

import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import EventList from './components/EventList';
import { getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert'; 
import CityEventsChart from './components/CityEventsChart'; 
import EventGenresChart from './components/EventGenresChart'; 
import './App.css';

const App = () => {
  const [allLocations] = useState([]); 
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState(""); 
  const [errorAlert, setErrorAlert] = useState(""); 
  const [warningAlert, setWarningAlert] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEvents = await getEvents(currentCity, currentNOE);
      setEvents(fetchedEvents);

      if (navigator.onLine) {
        localStorage.setItem('cachedEvents', JSON.stringify(fetchedEvents)); 
        setWarningAlert(""); 
      } else {
        const cachedEvents = localStorage.getItem('cachedEvents');
        if (cachedEvents) {
          setEvents(JSON.parse(cachedEvents)); 
          setWarningAlert("You are offline. The displayed events are loaded from the cache and may not be up to date.");
        } else {
          setWarningAlert("You are offline and no cached events are available.");
        }
      }
    };

    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <h1>Meet App</h1>
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert} 
      />
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert} 
      />
      <div className='charts-container'>
        <CityEventsChart events={events} />
        <EventGenresChart events={events} />
      </div>
      <EventList events={events} currentCity={currentCity} /> {/* Pass currentCity */}
    </div>
  );
};

export default App;
