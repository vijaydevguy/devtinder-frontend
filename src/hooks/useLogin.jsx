import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { loginService } from "../services/authService";
import { notify } from "../utils/toastify";

export const useLogin = () => {
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
      notify("Logged in successfully", res.firstName);
      // if (res.success) {
      // }
    } catch (error) {
      notify(`Login failed ${error.message}`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    LoginSchema,
    initialValues,
    handleSubmit,
  };
};
