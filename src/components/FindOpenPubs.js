import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export default function FindOpenPubs() {
  const [latitude, setLatitude] = useState(null);
  const [error, setError] = useState(null);
  const [bars, setBars] = useState([]);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not available in your browser.");
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
          {
            params: {
              open_now: true,
              location: `${latitude},${longitude}`,
              radius: 500, // Adjust the radius as needed (in meters)
              keyword: 'pub',
              key: apiKey,
              minrating: 4,
            },
          }
        );
        setBars(response.data.results.slice(0, 5));
        console.log(response);
      };
    fetchData();
    },[latitude, longitude]);

  return (
    <div className="font-mono">
      <h2 className="text-3xl font-bold underline">Nearest Pubs</h2>
      {error && <p>{error}</p>}
      <ul className="list-none">
        {bars.map((bar, index) => (
          <li key={index}>{bar.name}</li>
        ))}
      </ul>
    </div>
  );
}
