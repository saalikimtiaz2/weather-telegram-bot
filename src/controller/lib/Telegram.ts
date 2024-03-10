const { send } = require("process");
const { axiosInstance } = require("./axiosInstance");
const { TelegramMessage } = require("../../interfaces/TelegramTypes");
const { errorHandler } = require("./helper");
const { getWeather } = require("./getWeather");
import dotenv from "dotenv";

dotenv.config();

function sendMessage(messageObj: typeof TelegramMessage, messageText: string) {
  return axiosInstance
    .get("sendMessage", {
      chat_id: messageObj?.chat?.id,
      text: messageText,
    })
    .catch((ex: any) => {
      errorHandler(ex, "sendMessage", "axios");
    });
}
// ---------------------------Modals----------------------------------

function hourlyModal(temp: any) {
  let hourly =
    "----------------------\nTime\t Temp\t Condition\n----------------------\n";

  temp.hour.forEach((item: any, idx: number) => {
    if (idx < 5) {
      hourly =
        hourly +
        `${item.time.substr(11)}\t\t${Math.trunc(item.temp_c)}c\t\t${
          item.condition.text
        } \n`;
    }
  });
  return hourly;
}

function dailyModal(temp: any) {
  let daily =
    "----------------------\nDate\t Temp\t Condition\n----------------------\n";

  temp.forEach((item: any) => {
    daily =
      daily +
      `${item.date.substr(5)}\t\t${Math.trunc(item.day.avgtemp_c)}c\t\t${
        item.day.condition?.text
      } \n`;
  });
  return daily;
}

// --------------------------handler--------------------------------------
async function handleMessage(messageObj: typeof TelegramMessage) {
  const messageText = messageObj?.text || "";

  if (messageText.trim() === "") {
    // If the message text is empty or only contains whitespace characters
    return Promise.resolve(); // Return a resolved Promise without sending the message
  }

  if (messageText.charAt(0) === "/") {
    const command = messageText.substr(1);
    const temprature = await getWeather();

    switch (command) {
      case "start":
        return sendMessage(
          messageObj,
          "Hello! Welcome to Weather Bot. To check Dubai's current temprature use /current, for hourly use /hourly and for daily use /daily."
        );
      case "current":
        return sendMessage(
          messageObj,
          `Current Temprature of Dubai is ${temprature.current?.temp_c} Celcius.\nFeels Like ${temprature.current?.feelslike_c}.\nHumidity ${temprature.current?.feelslike_c}.\nCondition is ${temprature.current?.condition?.text}.\nWind speed us ${temprature.current?.wind_kph}kph \nWind direction is ${temprature.current?.wind_dir}.`
        );
      case "hourly":
        return sendMessage(
          messageObj,
          `Hourly Forecast\n${hourlyModal(temprature.forecast.forecastday[0])}`
        );
      case "daily":
        return sendMessage(
          messageObj,
          `Daily Forecast\n${dailyModal(temprature.forecast.forecastday)}`
        );
      default:
        return sendMessage(messageObj, "Sorry, I don't know what you want!");
    }
  } else {
    return sendMessage(messageObj, messageText);
  }
}

module.exports = { handleMessage };
