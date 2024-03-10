import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const baseURL = `https://api.telegram.org/bot${token}`;

function getAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: baseURL,
  });

  // Add custom methods to the instance
  instance.get = function (method: string, params: any) {
    return axios.get(`/${method}`, {
      baseURL: baseURL,
      params,
    });
  };

  instance.post = function (method: string, data: any) {
    return axios.post(`/${method}`, data, {
      baseURL: baseURL,
      // Add other custom configurations here if needed
    });
  };

  return instance;
}

module.exports = { axiosInstance: getAxiosInstance() };
