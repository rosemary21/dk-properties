"use client";
import {
  Button,
  PasswordInput,
  Tabs,
  TextInput,
  Progress,
  Text,
  Popover,
  Box,
  rem,
} from "@mantine/core";
import { FaCheck, FaTimes } from "react-icons/fa";
import classes from "@/app/login/page.module.css";
import { object, ref, string } from "yup";
import { useFormik } from "formik";
import AuthService from "@/services/auth";
import errorStyle from "@/utils/ErrorStyle";
import { useState } from "react";
import Error from "@/modals/Error";
import { CssLoader } from "@/utils/Loader";
import Notification from "@/utils/notification";

export default function Register() {
  const { close, error, handleSignUp, isLoading, opened, success } =
    AuthService();

  const requirements = [
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
  ];

  function PasswordRequirement({
    meets,
    label,
  }: {
    meets: boolean;
    label: string;
  }) {
    return (
      <Text
        c={meets ? "teal" : "red"}
        style={{ display: "flex", alignItems: "center" }}
        mt={7}
        size="sm"
      >
        {meets ? (
          <FaCheck style={{ width: rem(14), height: rem(14) }} />
        ) : (
          <FaTimes style={{ width: rem(14), height: rem(14) }} />
        )}{" "}
        <Box ml={10}>{label}</Box>
      </Text>
    );
  }

  function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  }

  const [popoverOpened, setPopoverOpened] = useState(false);

  const validationSchema = object().shape({
    firstName: string().required("This field is required"),
    lastName: string().required("This field is required"),
    email: string().email().required("This field is required"),
    userType: string().required("This field is required"),
    userName: string().required("This field is required"),
    password: string()
      .min(6, "Password must be 6 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[$&+,:;=?@#|'<>.^*()%!-]/, "Password requires a symbol"),
    confirmPassword: string().oneOf(
      [ref("password")],
      "This field must match the password field"
    ),
  });

  const { errors, values, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        userType: "property",
        userName: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema,
      onSubmit: async (
        {
          firstName,
          lastName,
          email,
          userName,
          userType,
          password,
          confirmPassword,
        },
        { resetForm, setSubmitting }
      ) => {
        await handleSignUp({
          firstName,
          lastName,
          email,
          userName,
          userType,
          password,
          confirmPassword,
        });
        resetForm();
        setSubmitting(false);
      },
    });

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(values.password)}
    />
  ));

  const strength = getStrength(values.password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Tabs.Panel value="register" className="mt-5 mb-10">
      <p
        className="text-[#888] text-center"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        Create an account
      </p>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextInput
          placeholder="First Name"
          name="firstName"
          size="lg"
          onChange={handleChange}
          value={values.firstName}
          className="mt-[1rem]"
          variant="filled"
          radius={10}
          data-aos="fade-right"
          data-aos-delay="400"
        />
        {errors.firstName && touched.firstName && (
          <div style={errorStyle} className="mt-2">
            {errors.firstName}
          </div>
        )}

        <TextInput
          placeholder="Last Name"
          name="lastName"
          size="lg"
          onChange={handleChange}
          value={values.lastName}
          className="mt-[1rem]"
          variant="filled"
          radius={10}
          data-aos="fade-right"
          data-aos-delay="600"
        />
        {errors.lastName && touched.lastName && (
          <div style={errorStyle} className="mt-2">
            {errors.lastName}
          </div>
        )}

        <TextInput
          placeholder="Email"
          name="email"
          size="lg"
          onChange={handleChange}
          value={values.email}
          className="mt-[1rem]"
          variant="filled"
          radius={10}
          data-aos="fade-right"
          data-aos-delay="800"
        />
        {errors.email && touched.email && (
          <div style={errorStyle} className="mt-2">
            {errors.email}
          </div>
        )}

        <TextInput
          placeholder="UserName"
          name="userName"
          size="lg"
          onChange={handleChange}
          value={values.userName}
          className="mt-[1rem]"
          variant="filled"
          radius={10}
          data-aos="fade-right"
          data-aos-delay="1000"
        />
        {errors.userName && touched.userName && (
          <div style={errorStyle} className="mt-2">
            {errors.userName}
          </div>
        )}

        <TextInput
          placeholder="UserType"
          name="userType"
          size="lg"
          value={"property"}
          disabled
          className="mt-[1rem]"
          variant="filled"
          radius={10}
          data-aos="fade-right"
          data-aos-delay="1200"
        />
        {errors.userType && touched.userType && (
          <div style={errorStyle} className="mt-2">
            {errors.userType}
          </div>
        )}

        <Popover
          opened={popoverOpened}
          position="bottom"
          width="target"
          transitionProps={{ transition: "pop" }}
        >
          <Popover.Target>
            <div
              onFocusCapture={() => setPopoverOpened(true)}
              onBlurCapture={() => setPopoverOpened(false)}
            >
              <PasswordInput
                placeholder="Password"
                value={values.password}
                name="password"
                className="mt-[1rem]"
                variant="filled"
                size="lg"
                radius={10}
                onChange={handleChange}
                data-aos="fade-right"
                data-aos-delay="1400"
              />
              {errors.password && touched.password && (
                <div style={errorStyle} className="mt-2">
                  {errors.password}
                </div>
              )}
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <Progress color={color} value={strength} size={5} mb="xs" />
            <PasswordRequirement
              label="Includes at least 6 characters"
              meets={values.password.length > 5}
            />
            {checks}
          </Popover.Dropdown>
        </Popover>

        <PasswordInput
          placeholder="Confirm Password"
          name="confirmPassword"
          size="lg"
          onChange={handleChange}
          value={values.confirmPassword}
          className="mt-[1rem]"
          variant="filled"
          radius={10}
          data-aos="fade-right"
          data-aos-delay="1600"
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <div style={errorStyle} className="mt-2">
            {errors.confirmPassword}
          </div>
        )}

        <Button
          type="submit"
          color="#E80E0F"
          className="w-full mt-8"
          size="lg"
          disabled={isSubmitting}
          data-aos="fade-right"
          data-aos-delay="1800"
        >
          Register
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
      {success && <Notification message="Registered Successfullly" />}
    </Tabs.Panel>
  );
}
