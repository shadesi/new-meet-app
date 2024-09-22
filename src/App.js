// src/App.js

import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import EventList from './components/EventList';
import { getEvents } from './api';
import './App.css';

const App = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEvents = await getEvents(currentCity, currentNOE);
      setEvents(fetchedEvents);
    };
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <h1>Event Finder</h1>
      <CitySearch setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      <EventList events={events} />
    </div>
  );
};

export default App;
