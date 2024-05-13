import React from "react";
import {
  redirect,
  useLoaderData,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router";
import { getToken, getUserById, deleteToken } from "../Services/authService";

interface UserData {
  userId: string;
  email: string;
  password: string;
  error?: string;
}

const ProfilePage: React.FC = () => {
  const data = useLoaderData() as UserData;
  const navigate = useNavigate();
  console.log(data);
  return (
    <div>
      <div>Email : {data.email}</div>
      <button
        onClick={() => {
          deleteToken();
          navigate("/");
        }}>
        Sign-Out
      </button>
    </div>
  );
};

export const profileLoader = () => {
  const AuthUserId: string | null = getToken();
  const AuthUser = getUserById(AuthUserId);
  console.log(AuthUser, AuthUserId);
  if (AuthUser) {
    return AuthUser;
  }

  return redirect("/login");
};

export default ProfilePage;
