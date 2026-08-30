import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLogin } from "../hooks/useLogin";
import useProfile from "../hooks/useProfile";
import { VscEdit } from "react-icons/vsc";

const EditProfile = () => {
  const {
    ProfileSchema,
    initialValues,
    handleSubmit,
    fileInputRef,
    uploadImg,
    handleFileChange,
  } = useProfile();

  return (
    <div className="flex justify-center items-center ">
      <div className="card bg-base-200 w-full lg:w-1/2 md:w-3/4 shadow-sm mx-6">
        <div className="card-body flex flex-col gap-4">
          <h2 className="card-title">Profile</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form className="grid md:grid-cols-2 grid-cols-1 gap-8">
                <div className="flex w-full justify-center md:col-span-2">
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadImg}
                    type="button"
                    className="relative cursor-pointer"
                  >
                    <img
                      src={values.photoUrl || null}
                      alt=""
                      name="photoUrl"
                      className="rounded-full bg-gray-200 w-16 h-16 object-center object-cover"
                    />
                    <VscEdit
                      size={22}
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1 text-black"
                    />
                  </button>
                </div>

                {/* <div className=""> */}
                {/* firstName */}
                <fieldset className="fieldset relative w-full">
                  <legend className="fieldset-legend">First Name</legend>
                  <Field
                    type="text"
                    name="firstName"
                    className="input w-full"
                    placeholder="Type here"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm absolute -bottom-6"
                  />
                </fieldset>

                {/* lastName */}
                <fieldset className="fieldset relative">
                  <legend className="fieldset-legend">Last Name</legend>
                  <Field
                    type="text"
                    name="lastName"
                    className="input w-full"
                    placeholder="Type here"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm absolute -bottom-6"
                  />
                </fieldset>

                {/* age */}
                <fieldset className="fieldset relative">
                  <legend className="fieldset-legend">Age</legend>
                  <Field
                    type="text"
                    name="age"
                    className="input w-full"
                    placeholder="Type here"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-500 text-sm absolute -bottom-6"
                  />
                </fieldset>

                {/* gender */}
                {/* <fieldset className="fieldset relative">
                  <legend className="fieldset-legend">Gender</legend>
                  <Field
                    type="text"
                    name="gender"
                    className="input"
                    placeholder="Type here"
                  />
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm absolute -bottom-6"
                  />
                </fieldset> */}
                {/* gender */}
                <fieldset className="fieldset relative">
                  <legend className="fieldset-legend">Gender</legend>
                  <Field as="select" name="gender" className="select w-full">
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </Field>
                  <ErrorMessage
                    name="firstName" // Note: Remember to update this to name="gender" as well!
                    component="div"
                    className="text-red-500 text-sm absolute -bottom-6"
                  />
                </fieldset>

                {/* submit button */}
                <div className="card-actions justify-end md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
