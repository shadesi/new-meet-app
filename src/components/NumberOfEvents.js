// src/components/NumberOfEvents.js

import React, { useState } from 'react';

function NumberOfEvents({ setCurrentNOE, setErrorAlert }) {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || isNaN(value)) {
      setErrorAlert('Enter a valid number');
    } else {
      setErrorAlert('');
      setNumberOfEvents(value);
      setCurrentNOE(value);
    }
  };

  return (
    <div id="number-of-events">
      <label>
        Number of Events:
        <input
          type="number"
          data-testid="numberOfEventsInput"
          value={numberOfEvents}
          onChange={handleInputChanged}
        />
      </label>
    </div>
  );
}

export default NumberOfEvents;
