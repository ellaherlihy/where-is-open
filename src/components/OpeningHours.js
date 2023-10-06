import React, { useState } from 'react';
import axios from 'axios';
// require('dotenv').config()

// const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const apiKey = "AIzaSyAr0k6GSZAj31mUG9nvH3CLoMfMB9SlBik"

function OpeningHours() {
  const [locationName, setLocationName] = useState('');
  // const [openingHours, setOpeningHours] = useState(null);

  const searchLocation = () => {
    axios
      .get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${locationName}&key=${apiKey}`)
      .then((response) => {
        console.log(response.data.results[0].opening_hours.open_now)
        // if (response.data.results && response.data.results.length > 0) {
        //   const placeId = response.data.results[0].place_id;
        //   fetchOpeningHours(placeId);
        // } else {
        //   setOpeningHours(null);
        // }
      })
      .catch((error) => {
        console.error('Error searching for location:', error);
      });
  };

  // const fetchOpeningHours = (placeId) => {
  //   axios
  //     .get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=opening_hours&key=${apiKey}`)
  //     .then((response) => {
  //       if (response.data.result && response.data.result.opening_hours) {
  //         setOpeningHours(response.data.result.opening_hours);
  //       } else {
  //         setOpeningHours(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching opening hours:', error);
  //     });
  // };

  return (
    <div>
      <h2>Where can I get a drink!!</h2>
      <input
        type="text"
        placeholder="Enter location name"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
      />
      <button onClick={searchLocation}>Search</button>
    </div>
  );
}

export default OpeningHours;
