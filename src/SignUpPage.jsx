import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function SignUpPage({ setUser }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  // Validation schema using Yup
  const SignUpSchema = Yup.object().shape({
    username: Yup.string()
      .required('Please enter a username')
      .min(5, 'Minimum 5 characters')
      .matches(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'Start with a letter, use only letters, numbers, underscores'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Please enter your email'),
    password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must include a special character')
      .required('Please enter your password'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  // API call function
  function callSignUpApi(values) {
    setIsSubmitting(true);
    setApiError("");

    axios.post("https://myeasykart.codeyogi.io/signup", {
      fullName: values.username,
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      navigate("/dashboard");
    })
    .catch((err) => {
      console.error("Signup error", err.response || err);
      setApiError(err.response?.data?.message || "Signup failed. Try again.");
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  }

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: callSignUpApi,
  });

  return (
    <div className='flex flex-col mt-5 mb-10'>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col gap-3 bg-white p-10 rounded-lg m-auto w-full max-w-md shadow-md'
      >
        <h1 className='text-4xl font-medium text-center'>Sign Up</h1>

        {apiError && (
          <div className='text-red-500 text-sm text-center'>{apiError}</div>
        )}

        <input
          type="text"
          id="username"
          placeholder="Username"
          autoComplete="off"
          {...formik.getFieldProps("username")}
          className='pl-3 pr-3 py-2 border-2 border-[#329ca8] rounded-md w-full'
        />
        {formik.touched.username && formik.errors.username && (
          <div className='text-red-500 text-sm'>{formik.errors.username}</div>
        )}

        <input
          type="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          {...formik.getFieldProps("email")}
          className='pl-3 pr-3 py-2 border-2 border-[#329ca8] rounded-md w-full'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='text-red-500 text-sm'>{formik.errors.email}</div>
        )}

        <input
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="new-password"
          {...formik.getFieldProps("password")}
          className='pl-3 pr-3 py-2 border-2 border-[#329ca8] rounded-md w-full'
        />
        {formik.touched.password && formik.errors.password && (
          <div className='text-red-500 text-sm'>{formik.errors.password}</div>
        )}

        <input
          type="password"
          id="confirmpassword"
          placeholder="Confirm Password"
          autoComplete="new-password"
          {...formik.getFieldProps("confirmpassword")}
          className='pl-3 pr-3 py-2 border-2 border-[#329ca8] rounded-md w-full'
        />
        {formik.touched.confirmpassword && formik.errors.confirmpassword && (
          <div className='text-red-500 text-sm'>{formik.errors.confirmpassword}</div>
        )}

        <button
          type="submit"
          disabled={!formik.dirty || !formik.isValid || isSubmitting}
          className={`text-xl py-2 rounded-md text-white ${
            (!formik.dirty || !formik.isValid || isSubmitting)
              ? "bg-gray-400"
              : "bg-blue-700"
          }`}
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>

        <p className='text-center'>
          Already have an account?{" "}
          <Link to="/login" className='text-blue-600'>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;