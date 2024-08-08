"use strict";
import axios from "axios";
import pkg from "agentkeepalive";
const Agent = pkg;
const HttpsAgent = pkg.HttpsAgent;
import { get_env_vars } from "@/plugins/utilities";

let api_address;
const env_vars = get_env_vars();

const development = `${env_vars.VITE_DEVELOPMENT_BACKEND_PROTOCOL}${env_vars.VITE_LOCAL_IP}:${env_vars.VITE_DEVELOPMENT_BACKEND_PORT}/`;
const production = `${env_vars.VITE_PRODUCTION_BACKEND_PROTOCOL}${env_vars.VITE_PRODUCTION_BACKEND_IP}/`;

if (env_vars.VITE_ENV === "development") {
  api_address = development
} else {
  api_address = production
}

const baseURL = api_address;

const keepAliveAgent = new Agent({
  maxSockets: 160,
  maxFreeSockets: 160,
  timeout: 15000,
  freeSocketTimeout: 5000,
  keepAliveMsecs: 10000,
});

const httpsKeepAliveAgent = new HttpsAgent({
  maxSockets: 160,
  maxFreeSockets: 160,
  timeout: 15000,
  freeSocketTimeout: 5000,
  keepAliveMsecs: 10000,
});

// Default config for the axios instance
const axiosParams = {
  baseURL: baseURL,
  headers: { "X-Requested-With": "XMLHttpRequest", "ngrok-skip-browser-warning": "69420", "bypass-tunnel-reminder": "111" },
  httpAgent: keepAliveAgent,
  httpsAgent: httpsKeepAliveAgent,
};
// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);
// Main api function
const api = (axios) => {
  // Wrapper functions around axios
  return {
    get: async (url, config) => await axios.get(url, config),
    post: async (url, body, config) => await axios.post(url, body, config),
    patch: async (url, body, config) => await axios.patch(url, body, config),
    delete: async (url, config) => await axios.delete(url, config),
  };
};

// Initialize the api function and pass axiosInstance to it
export default api(axiosInstance);
