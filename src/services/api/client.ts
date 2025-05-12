import axios from "axios";
import { API_TIMEOUT, API_HEADERS } from "@/constants/api";

const apiClient = axios.create({
  baseURL: "https://businessyds.csb.gov.tr/api",
  timeout: API_TIMEOUT,
  headers: API_HEADERS,
});

export default apiClient;
