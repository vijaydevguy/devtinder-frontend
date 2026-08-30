import React from "react";
import { cloudinaryConfig } from "../../common";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryConfig.uploadpreset);
  formData.append("folder", "devtinder"); // Directs the upload to the 'devtinder' folder

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudname}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();
  console.log("Uploaded Image URL:", data.secure_url);
  return data.secure_url;
};

export default uploadToCloudinary;
