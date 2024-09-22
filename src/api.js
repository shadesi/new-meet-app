// src/api.js

import mockData from "./mock-data";

/**
 * Extract locations from the events data, removing duplicates.
 * @param {*} events - array of event objects
 * @returns Array of unique locations
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Get the access token from localStorage or redirect to Google authorization.
 * @returns Promise resolving to the access token
 */
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (!code) {
      const response = await fetch("https://plqoig0l0f.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url");
      const result = await response.json();
      const { authUrl } = result;
      window.location.href = authUrl;
    } else {
      return await getToken(code);
    }
  }
  return accessToken;
};

/**
 * Check the validity of the access token.
 * @param {string} accessToken - the token to check
 * @returns Promise resolving to the token information
 */
const checkToken = async (accessToken) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
  return await response.json();
};

/**
 * Fetch the list of events, using mock data for localhost.
 * @param {string} currentCity - the selected city
 * @param {number} currentNOE - the number of events to fetch
 * @returns Promise resolving to the array of events
 */
export const getEvents = async (currentCity, currentNOE) => {
  if (window.location.href.startsWith("http://localhost:3000/")) {
    return mockData.slice(0, currentNOE); // Simulate fetching a specific number of events
  }

  const token = await getAccessToken();
  if (token) {
    removeQuery();
    const url = `YOUR_GET_EVENTS_API_ENDPOINT/${token}?city=Berlin${currentCity}&number=5${currentNOE}`; // Modify to include city and number
    const response = await fetch(url);
    const result = await response.json();
    return result.events || null;
  }
};

/**
 * Remove the query parameters from the URL.
 */
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.pushState("", "", newurl);
  } else {
    newurl = `${window.location.protocol}//${window.location.host}`;
    window.history.pushState("", "", newurl);
  }
};

/**
 * Retrieve the access token using the provided authorization code.
 * @param {string} code - the authorization code from Google
 * @returns Promise resolving to the access token
 */
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(`YOUR_GET_ACCESS_TOKEN_ENDPOINT/${encodeCode}`);
  const { access_token } = await response.json();
  if (access_token) {
    localStorage.setItem("access_token", access_token);
  }
  return access_token;
};
