"use client";
import { Button, PasswordInput, Tabs, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import { object, string } from "yup";
import classes from "@/app/login/page.module.css";
import errorStyle from "@/utils/ErrorStyle";
import AuthService from "@/services/auth";
import Error from "@/modals/Error";
import { CssLoader } from "@/utils/Loader";

export default function SignIn() {
  const { error, isLoading, handleLogIn, close, opened } = AuthService();
  const validationSchema = object().shape({
    userName: string().required("This field is required"),
    password: string().required("This field is required"),
  });

  const { errors, values, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (
        { password, userName },
        { resetForm, setSubmitting }
      ) => {
        await handleLogIn({ userName, password });
        resetForm();
        setSubmitting(false);
      },
    });

  return (
    <Tabs.Panel value="signIn" className="mt-5 mb-10">
      <p
        className="text-[#888888] text-center"
        data-aos="fade-right"
        data-aos-delay="100"
      >
        Sign in with your Email and password
      </p>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextInput
          placeholder="Username"
          name="userName"
          size="lg"
          onChange={handleChange}
          value={values.userName}
          className="mt-[3rem]"
          variant="filled"
          radius={10}
          data-aos="fade-right"
          data-aos-delay="300"
        />
        {errors.userName && touched.userName && (
          <div style={errorStyle} className="mt-2">
            {errors.userName}
          </div>
        )}

        <PasswordInput
          placeholder="Password"
          variant="filled"
          radius={10}
          size="lg"
          name="password"
          className="mt-[2rem]"
          onChange={handleChange}
          value={values.password}
          data-aos="fade-right"
          data-aos-delay="600"
        />
        {errors.password && touched.password && (
          <div style={errorStyle} className="mt-2">
            {errors.password}
          </div>
        )}

        <Button
          type="submit"
          className={`w-full mt-8 ${classes.btn_primary}`}
          size="lg"
          disabled={isSubmitting}
          data-aos="fade-right"
          data-aos-delay="900"
        >
          Sign In
        </Button>
      </form>

      {error && (
        <Error
          closeErrorModal={close}
          isErrorModalOpened={opened}
          message={error}
        />
      )}

      {isLoading && <CssLoader />}
    </Tabs.Panel>
  );
}
