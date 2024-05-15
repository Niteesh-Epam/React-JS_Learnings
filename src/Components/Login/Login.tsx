import {
  Form,
  redirect,
  useActionData,
  type ActionFunctionArgs,
} from "react-router-dom";
import { setAccesstoken, setRefreshtoken } from "../../Services/authService";
import { login } from "../../Services/services";

type ActionData = {
  email: string;
  password: string;
  error?: string;
};

export default function LoginPage() {
  const data = useActionData() as ActionData | null;

  return (
    <div className='contact'>
      <h3>Login Page</h3>
      <Form method='post' action='/login'>
        <label htmlFor='email' id='email'>
          Your email:{" "}
        </label>
        <input
          type='email'
          id='email'
          name='email'
          aria-labelledby='email'
          required
        />

        <label htmlFor='password' id='password'>
          Your message:{" "}
        </label>
        <input
          type='password'
          id='password'
          name='password'
          aria-labelledby='password'
          required></input>
        <button>Submit</button>

        {data && data.error && <p>{data.error}</p>}
      </Form>
    </div>
  );
}

export const LoginPageActions = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const submission: {
    email: string | null;
    password: string | null;
  } = {
    email: String(data.get("email")),
    password: String(data.get("password")),
  };
  const response = await login(submission);
  console.log(response);
  if (response.data && response?.data.access_token) {
    setAccesstoken(response?.data.access_token);
    setRefreshtoken(response?.data.refresh_token);
  }
  // const AuthUser = AuthenticateUser(submission);
  if (response.status !== 201) {
    return { error: "User Doesnot Exist / Incorrect email or Password" };
  }
  // send your post request

  return redirect("/profile");
};
