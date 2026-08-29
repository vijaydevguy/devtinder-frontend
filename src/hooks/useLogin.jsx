import { useState } from "react";
import * as Yup from "yup";
import {
  fetchUser,
  loginService,
  logout,
  signUp,
} from "../services/authService";
import { notify } from "../utils/toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { selectUserDetails } from "../redux/selectors/userSelector";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(true);

  const userData = useSelector(selectUserDetails) || null;

  const LoginSchema = Yup.object().shape({
    emailId: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Please enter a valid email address",
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[@$!%*?&]/, "Must contain at least one special character"),

    ...(!isLogin && {
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().optional(),
    }),
  });

  const initialValues = isLogin
    ? {
        emailId: "",
        password: "",
      }
    : {
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
      };

  // login user
  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors },
  ) => {
    console.log(values, "testPayload");

    try {
      if (isLogin) {
        const loginPayload = {
          emailId: values.emailId,
          password: values.password,
        };
        const res = await loginService(loginPayload);
        // const res = await loginService(values);
        // store data in redux
        dispatch(addUser(res.data));
        notify("Logged in successfully", `${res.firstName}${res.lastName}`);
      } else {
        const signupPayload = {
          firstName: values.firstName,
          lastName: values.lastName,
          emailId: values.emailId,
          password: values.password,
        };
        const res = await signUp(signupPayload);
        // store data in redux
        dispatch(addUser(res.data));
        notify("Sign up successfully", `${res.firstName}${res.lastName}`);
      }

      navigate("/");
    } catch (error) {
      notify(
        `${isLogin ? "Login" : "Sign up"} failed ${error.message}`,
        "error",
      );
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  // get user
  const getUser = async () => {
    if (userData) return;
    try {
      setLoading(true);
      const res = await fetchUser();
      // console.log(res, "testFetchUser");
      setUser(res.data);
      dispatch(addUser(res.data));
    } catch (error) {
      // notify(error.message, "error");
      console.log(error.message);
      if (error.status == 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(`Logout failed, ${error}`);
    }
  };

  return {
    LoginSchema,
    initialValues,
    handleSubmit,
    getUser,
    loading,
    setLoading,
    error,
    setError,
    userData,
    handleLogout,
    isLogin,
    setIsLogin,
  };
};
