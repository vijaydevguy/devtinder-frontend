import { useRef, useState } from "react";
import * as Yup from "yup";
import { notify } from "../utils/toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails } from "../redux/selectors/userSelector";
import { updateProfile } from "../services/profileService";
import { addUser } from "../redux/slices/userSlice";
import uploadToCloudinary from "../utils/uploadToCloudinary";

const useProfile = () => {
  const user = useSelector(selectUserDetails) || null;
  // console.log(user, "testUserFrom");
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const [uploadImg, setUploadImg] = useState(false);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),

    lastName: Yup.string().required("Last Name is required"),
    age: Yup.string().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
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

  const handleFileChange = async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadImg(true);
      const uploadedUrl = await uploadToCloudinary(file);
      if (uploadedUrl) {
        setFieldValue("photoUrl", uploadedUrl);
      }
    } catch (error) {
      notify(`Image upload failed with ${error.message}`);
    } finally {
      setUploadImg(false);
    }
  };

  return {
    ProfileSchema,
    initialValues,
    handleSubmit,
    user,
    fileInputRef,
    uploadImg,
    setUploadImg,
    handleFileChange,
  };
};

export default useProfile;
