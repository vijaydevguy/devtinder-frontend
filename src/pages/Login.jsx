import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { LoginSchema, initialValues, handleSubmit, isLogin, setIsLogin } =
    useLogin();

  return (
    <div className="flex justify-center items-center py-10">
      <div className="card bg-base-200 w-96 shadow-sm ">
        <div className="card-body flex flex-col gap-4">
          <h2 className="card-title"> {isLogin ? "Login" : "Sign up"}</h2>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-8">
                {/* <div className=""> */}
                {/* firstName */}
                {!isLogin && (
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
                )}

                {/* lastName */}
                {!isLogin && (
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
                )}

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
                    {/* {isLogin ? "Login" : "Sign up"} */}
                    {isSubmitting
                      ? "Loading..."
                      : isLogin
                        ? "Login"
                        : "Sign up"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <h2 className="">
            {isLogin ? "Don't" : "Already"} have an account?{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="underline cursor-pointer pl-1 font-medium"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
