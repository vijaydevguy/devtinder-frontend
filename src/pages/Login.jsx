import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const Login = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
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

  return (
    <div className="flex justify-center items-center lg:h-[60vh]">
      <div className="card bg-base-200 w-96 shadow-sm ">
        <div className="card-body flex flex-col gap-4">
          <h2 className="card-title">Login</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values, "testPayload");
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-8">
                {/* <div className=""> */}
                {/* email */}
                <fieldset className="fieldset relative">
                  <legend className="fieldset-legend">Email</legend>
                  <Field
                    type="text"
                    name="email"
                    className="input"
                    placeholder="Type here"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm absolute -bottom-6"
                  />
                </fieldset>

                {/* password */}
                <fieldset className="fieldset relative">
                  <legend className="fieldset-legend">Password</legend>
                  <Field
                    type="text"
                    name="password"
                    className="input"
                    placeholder="Type here"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm absolute -bottom-6"
                  />
                </fieldset>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    Login
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

export default Login;
