import { AxiosClient } from "./authService";

export function login({ email, password }) {
  return AxiosClient.post(
    "/login",
    { email, password },
    { authorization: false }
  );
}

export function getUserDetails() {
  return AxiosClient.get("/profile", {}, { authorization: true });
}
