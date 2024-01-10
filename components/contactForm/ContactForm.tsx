"use client";
import ContactUsService from "@/services/contactUs";
import { TextInput, Textarea, Checkbox, Button } from "@mantine/core";
import { useFormik } from "formik";
import React, { useState } from "react";
import { object, string } from "yup";
import classes from "./ContactForm.module.css";
import Error from "@/modals/Error";
import Notification from "@/utils/notification";

export default function ContactForm() {
  const [checked, setChecked] = useState(false);
  const { contactUsApi, error, success, close, opened } = ContactUsService();

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
            />
            {errors.firstName && touched.firstName && (
              <p className="text-left text-primary text-[11px]">
                {errors.firstName}
              </p>
            )}
          </div>
          <div
            className="w-full flex flex-col gap-1"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <TextInput
              placeholder="First Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              label="Last name"
              size="md"
              withAsterisk
            />
            {errors.firstName && touched.firstName && (
              <p className="text-left text-primary text-[11px]">
                {errors.firstName}
              </p>
            )}
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
            className="mt-4"
          />
          {errors.emailAddress && touched.emailAddress && (
            <p className="text-left text-primary text-[11px]">
              {errors.emailAddress}
            </p>
          )}
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
            withAsterisk
            className="mt-4"
          />
          {errors.phoneNumber && touched.phoneNumber && (
            <p className="text-left text-primary text-[11px]">
              {errors.phoneNumber}
            </p>
          )}
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
            className="mt-4"
          />
          {errors.message && touched.message && (
            <p className="text-left text-primary text-[11px]">
              {errors.message}
            </p>
          )}
        </div>

        <div
          className="contact-us-check-group"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="1200"
        >
          <Checkbox
            label="You agree to our friendly privacy policy."
            title="This field must be checked before submitting the form"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            size="md"
            className="mt-5"
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

      {error && (
        <Error
          closeErrorModal={close}
          isErrorModalOpened={opened}
          message={error}
        />
      )}
      {success && <Notification message="Message was sent successfully" />}
    </div>
  );
}
