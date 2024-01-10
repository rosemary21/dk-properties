"use client";
import classes from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import { object, string } from "yup";
import { useFormik } from "formik";
import errorStyle from "@/utils/ErrorStyle";
import NewsLetterService from "@/services/newsLetter";
import Error from "@/modals/Error";
import { CssLoader } from "@/utils/Loader";
import Success from "@/modals/Success";

export default function Footer() {
  const {
    handleJoinNewsletter,
    error,
    isLoading,
    isSuccess,
    isSuccessModalOpened,
    isErrorModalOpened,
    closeErrorModal,
    closeSuccessModal,
  } = NewsLetterService();

  const validationSchema = object().shape({
    emailAddress: string()
      .email("Enter a valid email")
      .min(6, "This field must contain more than 5 characters")
      .required("This field is required"),
  });

  const { handleChange, handleSubmit, errors, touched, isSubmitting, values } =
    useFormik({
      initialValues: {
        emailAddress: "",
      },
      validationSchema,
      onSubmit: async ({ emailAddress }, { resetForm, setSubmitting }) => {
        await handleJoinNewsletter({ emailAddress });
        resetForm();
        setSubmitting(false);
      },
    });

  return (
    <div>
      <footer className={classes.footer}>
        <div className={classes.footerTop}>
          <div className={classes.footerCol_1}>
            <Image
              src="/logo.png"
              alt="logo"
              width={32}
              height={32}
              loading="lazy"
            />
            <span>
              Clarity gives you the blocks and components you <br />
              need to create a truly professional website.
            </span>
          </div>

          <div className={classes.footerCol_2}>
            <h4>Company</h4>
            <Link href="/apartments">Apartments</Link>
            <Link href="/lands">Lands</Link>
            <Link href="/shortlets">Shortlets</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className={classes.footerCol_2}>
            <h4>HELP</h4>
            <Link href="/customer-support">Customer Support</Link>
            <Link href="/delivery-detail" className={classes.red}>
              Delivery Details
            </Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>

          <div className={`${classes.footerCol_2} ${classes.footerCol_3}`}>
            <h4>NEWSLETTER</h4>
            <form className={classes.footerForm} onSubmit={handleSubmit}>
              <input
                type="email"
                name="emailAddress"
                placeholder="Enter your email address"
                value={values.emailAddress}
                onChange={handleChange}
              />
              {errors.emailAddress && touched.emailAddress && (
                <div style={errorStyle}>{errors.emailAddress}</div>
              )}
              <button disabled={isSubmitting}>Subscribe Now</button>
            </form>
          </div>
        </div>

        <div className={classes.copyright}>
          © Copyright {new Date().getFullYear()}, All Rights Reserved by
          DkerulativeUI
        </div>
      </footer>

      {isErrorModalOpened && (
        <Error
          closeErrorModal={closeErrorModal}
          isErrorModalOpened={isErrorModalOpened}
          message={error}
        />
      )}

      {isLoading && <CssLoader />}
      {isSuccess && (
        <Success
          closeSuccessModal={closeSuccessModal}
          isSuccessModalOpened={isSuccessModalOpened}
          message="Thank you for subscribing to our newsletter. We’re happy to always inform you about our latest activities"
          status="Horray!!!!!"
        />
      )}
    </div>
  );
}
