import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { fetchUser, loginService } from "../services/authService";
import { notify } from "../utils/toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { selectUserDetails } from "../redux/selectors/userSelector";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState();

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
  });

  const initialValues = {
    emailId: "",
    password: "",
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors },
  ) => {
    console.log(values, "testPayload");

    try {
      const res = await loginService(values);
      // console.log(res, "testLoginRes");

      // store data in redux
      dispatch(addUser(res.data));

      notify("Logged in successfully", res.firstName);
      navigate("/");
    } catch (error) {
      notify(`Login failed ${error.message}`, "error");
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

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
  };
};
