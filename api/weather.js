export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const API_KEY = process.env.OPENWEATHER_API_KEY; // Use .env file
    const { city } = req.query;
  
    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ error: data.message });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
  