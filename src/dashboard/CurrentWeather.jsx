import React, { useState, useEffect } from "react";
import Clock from "react-live-clock";
// import Forcast from "./Forcast";
import ReactAnimatedWeather from "react-animated-weather";

// Helper function to format the date
const dateBuilder = (d) => {
  let months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December",
  ];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

// OpenWeatherMap API Key
const apiKey = "d6d0ce29ac8f6c002c630e2ce36058db";

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

const CurrentWeather = () => {
  const [location, setLocation] = useState({
    lat: undefined,
    lon: undefined,
    city: undefined,
    country: undefined,
    temperatureC: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    main: undefined,
  });
  const [loading, setLoading] = useState(true); // Implement loading state

  useEffect(() => {
    const getWeatherIcon = (weatherMain) => {
      switch (weatherMain) {
        case "Haze": return "CLEAR_DAY";
        case "Clouds": return "CLOUDY";
        case "Rain": return "RAIN";
        case "Snow": return "SNOW";
        case "Dust": return "WIND";
        case "Drizzle": return "SLEET";
        case "Fog": return "FOG";
        case "Smoke": return "FOG";
        case "Tornado": return "WIND";
        default: return "CLEAR_DAY";
      }
    };

    const fetchWeather = async (lat, lon) => {
      try {
        const api_call = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const data = await api_call.json();

        setLocation((prevState) => ({
          ...prevState,
          lat,
          lon,
          city: data.name,
          country: data.sys.country,
          temperatureC: Math.round(data.main.temp),
          humidity: data.main.humidity,
          main: data.weather[0].main,
          icon: getWeatherIcon(data.weather[0].main),
        }));
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching weather data", error);
        setLoading(false); // Stop loading even on error
      }
    };

    const getPosition = (options) => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };

    const fetchLocationAndWeather = () => {
      if (navigator.geolocation) {
        getPosition()
          .then((position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          })
          .catch(() => {
            fetchWeather(28.67, 77.22); // Default to New Delhi
            alert("You have disabled location services. Default location weather will be shown.");
          });
      } else {
        alert("Geolocation not supported by this browser.");
        setLoading(false);
      }
    };

    fetchLocationAndWeather();

    const intervalId = setInterval(() => {
      if (location.lat && location.lon) {
        fetchWeather(location.lat, location.lon);
      }
    }, 600000); // Refresh weather every 10 minutes

    return () => clearInterval(intervalId);
  }, []); 

  if (loading) {
    return (
      <div className="text-center text-white">
        <p className="text-2xl font-semibold">Loading...</p>
        <h3 className="mt-4">Detecting your location...</h3>
        <h3 className="mt-2">Your current location will be used to fetch real-time weather data.</h3>
      </div>
    );
  }

  return (
    <div className="min-h-96  flex flex-col items-center justify-center p-8 text-white ">
      <div className="bg-blue-800 bg-opacity-60 rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <div className="city">
          <h2 className="text-4xl font-bold">{location.city}</h2>
          <h3 className="text-xl text-gray-300">{location.country}</h3>
        </div>

        <div className="flex justify-center items-center mb-icon mt-6">
          <ReactAnimatedWeather
            icon={location.icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
          <p className="text-2xl mt-4 font-semibold">{location.main}</p>
        </div>

        <div className="date-time mt-6">
          <div className="current-time text-3xl font-mono">
            <Clock format="HH:mm:ss" interval={1000} ticking={true} />
          </div>
          <div className="current-date mt-2 text-lg">
            {dateBuilder(new Date())}
          </div>
          <div className="temperature mt-4">
            <p className="text-5xl font-bold">
              {location.temperatureC}°<span className="text-2xl">C</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CurrentWeather;
