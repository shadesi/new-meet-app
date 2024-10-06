// src/components/EventList.js

import React from "react";
import Event from "./Event";

const EventList = ({ events, currentCity }) => {
  // Filter events based on the selected city
  const filteredEvents = currentCity === "See all cities" 
    ? events 
    : events.filter(event => event.location && event.location.includes(currentCity));

  return (
    <ul id="event-list">
      {filteredEvents && filteredEvents.length > 0 
        ? filteredEvents.map((event) => <Event key={event.id} event={event} />)
        : <p>No events found for {currentCity}.</p> /* Display message if no events are found */
      }
    </ul>
  );
};

export default EventList;
