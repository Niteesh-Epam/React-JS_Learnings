import { UsersData } from "../Utils/User";

interface UserType {
  email: string | null;
  password: string | null;
}

export const AuthenticateUser = (User: UserType) => {
  const AuthUser = UsersData.find(
    (user) =>
      user.email.toLowerCase() === User?.email?.toLowerCase() &&
      user.password === User?.password
  );

  if (AuthUser) {
    SetAuthtoken(AuthUser.userId);
    return AuthUser;
  }

  return null;
};

const SetAuthtoken = (id: string) => {
  localStorage.setItem("User-token", id);
};

export const getToken = () => {
  const token = localStorage.getItem("User-token");
  if (token) {
    return token;
  }
  return null;
};

export const deleteToken = () => {
  localStorage.removeItem("User-token");
};

export const getUserById = (UserId: string | null) => {
  const AuthUser = UsersData.find((user) => UserId === user.userId);
  console.log(AuthUser);
  if (AuthUser) {
    return AuthUser;
  }
  return null;
};
