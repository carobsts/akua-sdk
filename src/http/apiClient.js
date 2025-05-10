import axios from "axios";

export const createApiClient = (tokenManager) => {
  const instance = axios.create({
    baseURL: tokenManager.baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  instance.interceptors.request.use(async (config) => {
    const token = await tokenManager.getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return instance;
};
