import axios from "axios";

import { API_KEY_WILAYAH, BASE_API_WILAYAH } from "@/constants/config";

export const domicileApi = axios.create({
  baseURL: BASE_API_WILAYAH,
  params: {
    api_key: API_KEY_WILAYAH,
  },
  timeout: 10000,
});
