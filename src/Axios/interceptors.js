import axios from "axios";

export function createAxiosClient({
  options,
  getCurrentAccessToken,
  getCurrentRefreshToken,
  logout,
}) {
  const client = axios.create(options);

  client.interceptors.request.use(
    (config) => {
      if (config.authorization !== false) {
        const token = getCurrentAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      console.log(error);
    }
  );

  // "id": 12,
  // "email": "niteeshvarma@gmail.com",
  // "password": "Niteesh1234",
  // "name": "Niteesh",
  // "role": "customer",
  // "avatar": "https://picsum.photos/800",
  // "creationAt": "2024-05-15T03:44:37.000Z",
  // "updatedAt": "2024-05-15T03:44:37.000Z"
  client.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = getCurrentRefreshToken(); // Retrieve the stored refresh token.
          const response = await client.post("/refresh", {
            refreshToken,
          });
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          error.config.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          return client(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // window.location.href = "/login";
          return refreshError.response.status;
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
}
