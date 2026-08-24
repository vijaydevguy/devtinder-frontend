import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { fetchUser, loginService, logout } from "../services/authService";
import { notify } from "../utils/toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserDetails } from "../redux/selectors/userSelector";
import { updateProfile } from "../services/profileService";
import { addUser } from "../redux/slices/userSlice";

const useProfile = () => {
  const user = useSelector(selectUserDetails) || null;
  // console.log(user, "testUserFrom");
  const dispatch = useDispatch();

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

  // console.log("initialValueof", initialValues);

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors },
  ) => {
    try {
      const res = await updateProfile(values);
      // console.log(res, "testUpdateProfile");
      dispatch(addUser(res));
      notify("Profile updated successfully");
    } catch (error) {
      console.error(error);
      notify("Failed to update profile");
    } finally {
      // console.log("Submitted Profile");
      setSubmitting(false);
    }
  };

  return {
    ProfileSchema,
    initialValues,
    handleSubmit,
    user,
  };
};

export default useProfile;
