import { UsersData } from "../Utils/User";
import { createAxiosClient } from "../Axios/interceptors";

interface UserType {
  email: string | null;
  password: string | null;
}

const BASE_URL = "https://api.escuelajs.co/api/v1/auth";
// export const AuthenticateUser = (User: UserType) => {
//   const AuthUser = UsersData.find(
//     (user) =>
//       user.email.toLowerCase() === User?.email?.toLowerCase() &&
//       user.password === User?.password
//   );

//   if (AuthUser) {
//     SetAuthtoken(AuthUser.userId, _);
//     return AuthUser;
//   }

//   return null;
// };

export const setAccesstoken = (token: string) => {
  localStorage.setItem("User-token", token);
};

export const setRefreshtoken = (token: string) => {
  localStorage.setItem("Refresh-token", token);
};

export const getAccessToken = () => {
  const token = localStorage.getItem("User-token");
  if (token) {
    return token;
  }
  return null;
};

export const getRefreshToken = () => {
  const token = localStorage.getItem("Refresh-token");
  if (token) {
    return token;
  }
  return null;
};
export const deleteToken = () => {
  localStorage.removeItem("User-token");
  localStorage.removeItem("Refresh-token");
};

// export const getUserById = (UserId: string | null) => {
//   const AuthUser = UsersData.find((user) => UserId === user.userId);
//   console.log(AuthUser);
//   if (AuthUser) {
//     return AuthUser;
//   }
//   return null;
// };

export const AxiosClient = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  },

  getCurrentAccessToken: getAccessToken,
  getCurrentRefreshToken: getRefreshToken,
  logout: deleteToken,
});
