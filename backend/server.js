 require('dotenv').config();
const API_KEY = process.env.OPENWEATHER_API_KEY;
console.log(API_KEY)
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

 
app.get('/weather', async (req, res) => {
    const { city } = req.query;
    
    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    try {
        const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        console.log("API URL:", apiUrl);
        console.log("Fetching weather from:", apiUrl);

        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (response.status !== 200) {
            throw new Error(data.message);
        }

        res.json(data);
           } catch (error) {
        console.error("Error fetching weather data:", error.message);
        res.status(500).json({error: error.message|| "Failed to fetch weather data" });
    }
});
 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
