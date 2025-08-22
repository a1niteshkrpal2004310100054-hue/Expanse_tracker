import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // get token from client

  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = await error.config;
    console.log(originalRequest);
    if (error.response?.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.get("http://localhost:3000/api/refresh", {
          withCredentials: true,
        });

        const token = response.data.accessToken;
        localStorage.setItem("authToken", token);

        originalRequest.headers.Authorization = `Bearer ${token}`;

        return axios(originalRequest);
      } catch (error) {
        console.error("Token refresh failed", error);

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
