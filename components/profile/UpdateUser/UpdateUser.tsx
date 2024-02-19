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

export default function UpdateUser() {
  const { close, error, handleUpdateUser, isLoading, opened } = AuthService();

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
        <Box ml={5}>{label}</Box>
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

    return Math.max(50 - (50 / (requirements.length + 1)) * multiplier, 5);
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
      },
      validationSchema,
      onSubmit: async (
        { firstName, lastName, email, userName, userType, password },
        { resetForm, setSubmitting }
      ) => {
        await handleUpdateUser({
          firstName,
          lastName,
          email,
          userName,
          userType,
          password,
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
  const color = strength === 50 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <div className="my-5 w-full">
      <p className="text-[#888] text-center">Update your account</p>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextInput
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
          className="mt-[1rem]"
          radius={5}
        />
        {errors.firstName && touched.firstName && (
          <div style={errorStyle} className="mt-2">
            {errors.firstName}
          </div>
        )}

        <TextInput
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
          className="mt-[1rem]"
          radius={5}
        />
        {errors.lastName && touched.lastName && (
          <div style={errorStyle} className="mt-2">
            {errors.lastName}
          </div>
        )}

        <TextInput
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={values.email}
          className="mt-[1rem]"
          radius={5}
        />
        {errors.email && touched.email && (
          <div style={errorStyle} className="mt-2">
            {errors.email}
          </div>
        )}

        <TextInput
          placeholder="UserName"
          name="userName"
          onChange={handleChange}
          value={values.userName}
          className="mt-[1rem]"
          radius={5}
          readOnly
        />
        {errors.userName && touched.userName && (
          <div style={errorStyle} className="mt-2">
            {errors.userName}
          </div>
        )}

        <TextInput
          placeholder="UserType"
          name="userType"
          value={"property"}
          disabled
          className="mt-[1rem]"
          radius={5}
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
                radius={5}
                onChange={handleChange}
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

        <Button
          type="submit"
          color="#E80E0F"
          variant="light"
          className="w-full mt-8"
          disabled={isSubmitting}
        >
          Update
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
    </div>
  );
}
