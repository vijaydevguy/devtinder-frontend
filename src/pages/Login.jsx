import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { loginService } from "../services/authService";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { LoginSchema, initialValues, handleSubmit } = useLogin();

  return (
    <div className="flex justify-center items-center lg:h-[60vh]">
      <div className="card bg-base-200 w-96 shadow-sm ">
        <div className="card-body flex flex-col gap-4">
          <h2 className="card-title">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-8">
                {/* <div className=""> */}
                {/* email */}
                <fieldset className="fieldset relative">
                  <legend className="fieldset-legend">Email</legend>
                  <Field
                    type="text"
                    name="emailId"
                    className="input"
                    placeholder="Type here"
                  />
                  <ErrorMessage
                    name="emailId"
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
                    {isSubmitting ? "Loading..." : "Login"}
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
