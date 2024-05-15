import React from "react";
import {
  redirect,
  useLoaderData,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router";
import { getAccessToken, deleteToken } from "../Services/authService";
import { getUserDetails } from "../Services/services";

interface UserData {
  userId: string;
  email: string;
  password: string;
  error?: string;
  name?: string;
}
interface UserDataProps {
  data: UserData;
}

const ProfilePage: React.FC = () => {
  const data = useLoaderData() as UserDataProps;
  const navigate = useNavigate();
  console.log(data);
  return (
    <div>
      <div>Name : {data?.data.name}</div>
      <div>Email : {data?.data.email}</div>
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

export const profileLoader = async () => {
  const AuthUserId: string | null = getAccessToken();
  const AuthUser = await getUserDetails();
  console.log(AuthUser, AuthUserId);
  if (AuthUser && AuthUserId !== null) {
    return AuthUser;
  }

  return redirect("/login");
};

export default ProfilePage;
