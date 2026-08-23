import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLogin } from "../hooks/useLogin";
import useProfile from "../hooks/useProfile";
import { VscEdit } from "react-icons/vsc";

const EditProfile = () => {
  const { ProfileSchema, loading, setLoading, initialValues, handleSubmit } =
    useProfile();

  return (
    <div className="flex justify-center items-center ">
      <div className="card bg-base-200 w-96 shadow-sm ">
        <div className="card-body flex flex-col gap-4">
          <h2 className="card-title">Profile</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, isSubmitting }) => (
              <Form className="flex flex-col gap-8">
                <div className="flex w-full justify-center">
                  <button className="relative cursor-pointer">
                    <img
                      src={values.photoUrl || ""}
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
                <fieldset className="fieldset relative">
                  <legend className="fieldset-legend">First Name</legend>
                  <Field
                    type="text"
                    name="firstName"
                    className="input"
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
                    className="input"
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
                    className="input"
                    placeholder="Type here"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-500 text-sm absolute -bottom-6"
                  />
                </fieldset>

                {/* gender */}
                <fieldset className="fieldset relative">
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
                </fieldset>

                {/* submit button */}
                <div className="card-actions justify-end">
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
