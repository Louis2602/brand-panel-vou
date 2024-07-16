import { env } from "@/env";
import axios from "axios";

const BASE_URL = env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000/api/v1";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
