import React, { useState } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations.filter((location) =>
      location.toUpperCase().includes(value.toUpperCase())
    );

    setQuery(value);
    setSuggestions(filteredLocations);
    setShowSuggestions(value.length > 0 && filteredLocations.length > 0); // Show suggestions based on input

    const infoText = filteredLocations.length === 0
      ? "We cannot find the city you are looking for. Please try another city."
      : "";
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent.trim(); // Trim whitespace
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert(""); // Clear alert after selection
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(query.length > 0)} // Show suggestions if there's a query
        onChange={handleInputChanged}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
