import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";

function App() {
  const [city, setCity] = useState(""); // City name
  const [Weatherdata, setWeatherData] = useState(null); // Weather data
  const [temperature, setTemperature] = useState(null); // Temperature
  const [error, setError] = useState(""); // Error message
//  Directly API call from frontend
  // const fetchWeather = async () => {
  //   try {
  //     const API_KEY = import.meta.env.VITE_API_KEY;
  //     const response = await fetch(
  //       `/api/data/2.5/weather?q=${city}&appid=${API_KEY}`
  //     );
  //     // const response = await fetch(`http://localhost:5000/weather?city=${city}`);
  //     console.log(response);
  //     if (!response.ok) {
  //       throw new Error("City not found");
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     setWeatherData(data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
//  API call from backend
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/weather?city=${city}`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setWeatherData(null);
        
        return;
      }
       
      setWeatherData(data);
      setTemperature(data.main?.temp);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city) {
      setError("City is required");
      setWeatherData(null);
      return;
    }
    setError("");

    fetchWeather();
  };

  return (
    <div className="container">
      <div className="card">
        <div className="title">
          <h1 onClick={() => (window.location.href = "/")}>WeatherApp</h1>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className=" bg-transparent outline-none"
          />
          <FaSearch onClick={handleSearch} />
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {Weatherdata && temperature !== null && (
        <div className="weather-container">
          <h1>{Weatherdata.name}</h1>
          {/* Temperature Data */}
          <div className="weather-section">
            <h3>🌡️ Temperature</h3>
             
        <div className="text-center mt-4">
          <span className="text-4xl">
            {temperature >= 30 ? "🔥" : 
             temperature >= 20 ? "🌤️" : 
             temperature >= 10 ? "☁️" : 
             temperature >= 0 ? "🌧️" : 
 temperature >= -5 ? "🌨️" :  
 temperature >= -10 ? "☃️"  : "❄️"
 }
             
          </span>
          <p className="text-lg">Current Temperature: {temperature}°C</p>
        </div>
            <p>Current: {Math.floor(Weatherdata.main?.temp)}°C</p>
            <p>Feels Like: {Math.floor(Weatherdata.main?.feels_like)}°C</p>
            <p>Min: {Math.floor(Weatherdata.main?.temp_min)}°C</p>
            <p>Max: {Math.floor(Weatherdata.main?.temp_max)}°C</p>
          </div>
          <h3>🌍 Country: {Weatherdata.sys?.country}</h3>
          <h3>
            🌅 Sunrise:{" "}
            {new Date(Weatherdata.sys?.sunrise * 1000).toLocaleTimeString()}
          </h3>
          <h3>
            🌇 Sunset:{" "}
            {new Date(Weatherdata.sys?.sunset * 1000).toLocaleTimeString()}
          </h3>
          {/* Wind Data */}
          <div className="weather-section">
            <h3>🌬️ Wind</h3>
            <p>Direction: {Weatherdata.wind?.deg}°</p>
            <p>Speed: {Weatherdata.wind?.speed} m/s</p>
            <p>Gust: {Weatherdata.wind?.gust} m/s</p>
          </div>

          {/* Other Details */}
          <div className="weather-section">
            <h3>📊 Other Details</h3>
            <p>Humidity: {Weatherdata.main?.humidity}%</p>
            <p>Pressure: {Weatherdata.main?.pressure} hPa</p>
            <p>Visibility: {Weatherdata.visibility} meters</p>
          </div>

          {/* Location Info */}
          <div className="weather-section">
            <h3>📍 Location</h3>
            <p>Latitude: {Weatherdata.coord?.lat}</p>
            <p>Longitude: {Weatherdata.coord?.lon}</p>
            <p>Timezone Offset: {Weatherdata.timezone / 3600} hours</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
