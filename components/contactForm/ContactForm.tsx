"use client";
import ContactUsService from "@/services/contactUs";
import { TextInput, Textarea, Checkbox, Button } from "@mantine/core";
import { useFormik } from "formik";
import React, { CSSProperties, useState } from "react";
import { object, string } from "yup";
import classes from "./ContactForm.module.css";
import Error from "@/modals/Error";
import { openErrorNotification } from "@/utils/openNotification";

export default function ContactForm() {
  const [checked, setChecked] = useState(false);
  const [persist, setPersist] = useState(false);
  const { contactUsApi } = ContactUsService();

  const errStyle: CSSProperties = {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: "#e80e0f",
    fontSize: "12px",
  };

  const validationSchema = object().shape({
    firstName: string().required("This field id required"),
    lastName: string().required("This field id required"),
    emailAddress: string()
      .required("This field id required")
      .email("This field must be a valid email address"),
    phoneNumber: string().required("This field id required"),
    message: string().required("This field id required"),
  });

  const { handleChange, handleSubmit, errors, touched, values, isSubmitting } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        message: "",
      },
      validationSchema,
      onSubmit: async (
        { emailAddress, firstName, lastName, message, phoneNumber },
        { resetForm, setSubmitting }
      ) => {
        if (checked) {
          await contactUsApi({
            emailAddress,
            firstName,
            lastName,
            message,
            phoneNumber,
          });
          resetForm();
          setSubmitting(false);
          setChecked(false);
        } else {
          openErrorNotification(
            "You must agree to our friendly privacy policy"
          );
          setPersist(true);
          return;
        }
      },
    });
  return (
    <div className={classes.container}>
      <h5 data-aos="fade-left" data-aos-duration="1000">
        Contact us
      </h5>
      <h1 data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
        Get in touch
      </h1>
      <p data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
        We&apos;d love to hear how we can leverage the internet to solving your
        problems. Please fill out this form.
      </p>

      <form onSubmit={handleSubmit} className="w-full">
        <div className={classes.contactGroup}>
          <div
            className="w-full flex flex-col gap-1"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <TextInput
              placeholder="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              label="First name"
              size="md"
              withAsterisk
              className="text-left"
              error={<p style={errStyle}>{errors.firstName}</p>}
            />
          </div>
          <div
            className="w-full flex flex-col gap-1"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <TextInput
              placeholder="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              label="Last name"
              size="md"
              withAsterisk
              className="text-left"
              error={<p style={errStyle}>{errors.lastName}</p>}
            />
          </div>
        </div>

        <div
          className="w-full flex flex-col gap-1"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="800"
        >
          <TextInput
            placeholder="Email"
            name="emailAddress"
            value={values.emailAddress}
            onChange={handleChange}
            label="Email"
            size="md"
            withAsterisk
            className="mt-4 text-left"
            error={<p style={errStyle}>{errors.emailAddress}</p>}
          />
        </div>

        <div
          className="w-full flex flex-col gap-1"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="800"
        >
          <TextInput
            placeholder="0801 234 5678"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            label="Phone number"
            size="md"
            className="mt-4 text-left"
            error={<p style={errStyle}>{errors.phoneNumber}</p>}
          />
        </div>

        <div
          className="w-full flex flex-col gap-1"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="1000"
        >
          <Textarea
            placeholder="Enter your message"
            name="message"
            value={values.message}
            onChange={handleChange}
            label="Message"
            size="md"
            withAsterisk
            className="mt-4 text-left"
            error={<p style={errStyle}>{errors.message}</p>}
          />
        </div>

        <div className="contact-us-check-group">
          <Checkbox
            label="You agree to our friendly privacy policy."
            title="This field must be checked before submitting the form"
            checked={checked}
            onChange={(event) => {
              setChecked(event.currentTarget.checked);
              if (persist) {
                setPersist(false);
              }
              return;
            }}
            size="md"
            className={
              persist ? "mt-5 text-[green] animate-pulse" : "mt-5 text-black"
            }
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={classes.contactFormBtn}
        >
          Send message
        </button>
      </form>
    </div>
  );
}
