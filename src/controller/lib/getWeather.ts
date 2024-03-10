import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.WEATHER_API;

async function getWeather() {
  const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Dubai&days=7`;
  try {
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error: any) {
    throw new Error(`Could not fetch weather data: ${error}`);
  }
}

module.exports = { getWeather };
