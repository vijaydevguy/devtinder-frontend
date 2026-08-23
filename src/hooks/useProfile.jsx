import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { fetchUser, loginService, logout } from "../services/authService";
import { notify } from "../utils/toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserDetails } from "../redux/selectors/userSelector";

const useProfile = () => {
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectUserDetails) || null;
  console.log(user,"testUserFrom")


  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),

    lastName: Yup.string().required("Last Name is required"),
  });

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    photoUrl: user?.photoUrl || "",
    age: user?.age || "",
    gender: user?.gender || "",
  };

  console.log("initialValueof",initialValues)

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors },
  ) => {
    console.log("Submitted Profile");
    try {
      setLoading(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    ProfileSchema,
    loading,
    setLoading,
    initialValues,
    handleSubmit,
    user,
  };
};

export default useProfile;
