import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

const WeatherDashboard = () => {
  const [query, setQuery] = useState(""); // For manual search
  const [location, setLocation] = useState({}); // Holds location/weather data
  const [error, setError] = useState(null); // For error handling
  const [alert, setAlert] = useState(null); // For disaster alerts
  const apiKey = "d6d0ce29ac8f6c002c630e2ce36058db"; // Your API Key

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  // Map OpenWeatherMap weather codes to ReactAnimatedWeather icons
  const weatherIcons = {
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Rain: "RAIN",
    Snow: "SNOW",
    Thunderstorm: "SLEET",
    Drizzle: "RAIN",
    Mist: "FOG",
  };

  // Function to trigger voice alerts
  const speakAlert = (message) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(message);
      synth.speak(utterance);
      console.log("Voice alert: " + message); // Log for debugging
    } else {
      console.error("Voice alerts are not supported in this browser.");
    }
  };

// Function to check weather conditions and set an alert
const handleAlerts = (weatherData) => {
  // Log the entire weather data for debugging
  console.log("Weather data received:", weatherData);

  // Extract weather condition and rain data
  const weatherCondition = weatherData.weather[0]?.main;
  const rainVolume = weatherData.rain ? weatherData.rain["1h"] : 0;

  // Log extracted weather condition and rain volume
  console.log("Weather Condition:", weatherCondition);
  console.log("Rain Volume:", rainVolume);

  if (weatherCondition === "Rain" && rainVolume > 5) {
    const alertMessage =
      "Heavy rain detected. There could be a risk of flooding in low-lying areas. Stay cautious!";
    setAlert(alertMessage);
    speakAlert(alertMessage); // Voice alert
    console.log("Alert set: " + alertMessage); // Log for debugging
  } else if (weatherCondition === "Rain") {
    const alertMessage =
      "It's raining. Watch out for possible water logging in some areas.";
    setAlert(alertMessage);
    speakAlert(alertMessage); // Voice alert
    console.log("Alert set: " + alertMessage); // Log for debugging
  } else {
    setAlert(null);
    console.log("No alerts triggered"); // Log for debugging
  }
};


  // Function to search weather based on city or coordinates
  const search = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          city || query
        }&units=metric&APPID=${apiKey}`
      )
      .then((response) => {
        setLocation(response.data);
        setQuery(""); // Clear the input after search
        setError(null); // Clear any previous errors
        handleAlerts(response.data); // Check for disaster conditions
      })
      .catch((error) => {
        console.log(error);
        setLocation({});
        setError({ message: "City not found", query: city || query });
      });
  };

  // Handle geolocation-based weather data fetch
  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        try {
          const response = await fetch(weatherApiUrl);
          const data = await response.json();

          if (data) {
            setLocation(data);
            setError(null);
            handleAlerts(data);
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setError({ message: "Unable to retrieve weather data." });
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Fetch default weather for the current location on component mount
  useEffect(() => {
    handleLocationSearch();
  }, []);

  return (
    <div className="bg-gray-600 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        {/* React Animated Weather Icon */}
        <ReactAnimatedWeather
          icon={weatherIcons[location.weather ? location.weather[0].main : "Clear"]}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>

      <div className="today-weather text-center">
        <h3 className="text-2xl font-bold mb-2">
          {location.name ? `${location.name}, ${location.sys.country}` : "Weather Forecast"}
        </h3>

        {/* Display alerts */}
        {alert && (
          <div className="bg-red-600 text-white font-semibold p-4 mb-4 rounded-lg">
            {alert}
          </div>
        )}

        {/* Search Box */}
        <div className="search-box flex justify-center mb-4">
          <input
            type="text"
            className="search-bar bg-gray-500 text-white placeholder:text-gray-300 p-2 rounded-l-lg focus:outline-none w-3/4"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={(e) => e.key === "Enter" && search()}
          />
          <button
            className="bg-gray-700 p-2 rounded-r-lg"
            onClick={() => search()}
          >
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              alt="Search"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Display weather data */}
        <ul className="space-y-2 text-left">
          {location.main ? (
            <div>
              <li className="cityHead text-xl font-semibold">
                <p>
                  {location.name}, {location.sys.country}
                </p>
                <img
                  className="temp w-12 h-12 inline-block bg-gray-400 rounded-full "
                  src={`https://openweathermap.org/img/wn/${location.weather[0].icon}.png`}
                  alt="Weather icon"
                />
              </li>
              <li className="mt-2">
                <span className="font-semibold">Temperature:</span>{" "}
                {Math.round(location.main.temp)}°C ({location.weather[0].main})
              </li>
              <li>
                <span className="font-semibold">Humidity:</span>{" "}
                {Math.round(location.main.humidity)}%
              </li>
              <li>
                <span className="font-semibold">Visibility:</span>{" "}
                {Math.round(location.visibility / 1000)} km
              </li>
              <li>
                <span className="font-semibold">Wind Speed:</span>{" "}
                {Math.round(location.wind.speed)} km/h
              </li>
            </div>
          ) : error ? (
            <li className="text-red-400">
              {error.query}: {error.message}
            </li>
          ) : null}
        </ul>

        <button
          className="bg-gray-900 text-white py-2 px-4 rounded-lg mt-4"
          onClick={handleLocationSearch}
        >
          Use Current Location
        </button>
      </div>
    </div>
  );
};

export default WeatherDashboard;
