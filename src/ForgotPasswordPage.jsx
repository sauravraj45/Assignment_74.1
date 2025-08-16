import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ForgotPasswordPage() {
  const [apiMessage, setApiMessage] = useState("");

  async function callForgotApi(values) {
    setApiMessage("");
    try {
      const res = await fetch("https://myeasykart.codeyogi.io/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) setApiMessage("Password reset link sent to your email.");
      else setApiMessage("Failed to send reset link. Email may not exist.");
    } catch {
      setApiMessage("Network error. Try again.");
    }
  }

  const forgotSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please Enter Email Id.'),
  });

  const { handleSubmit, values, handleChange, handleBlur, errors, touched, dirty, isValid } = useFormik({
    initialValues: { email: '' },
    onSubmit: callForgotApi,
    validationSchema: forgotSchema,
  });

  return (
    <div className='flex flex-col mt-20'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 bg-white p-10 rounded-lg m-auto'>
        <h1 className='text-4xl font-medium text-center mb-4'>Forgot Password</h1>
        {apiMessage && <div className='text-green-500 text-sm'>{apiMessage}</div>}
        <input type="email" id="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} className='pl-3 pr-3 py-2 border-2 border-[#329ca8] rounded-md w-full' />
        {touched.email && errors.email && <div className='text-red-500 text-sm mt-1'>{errors.email}</div>}
        <button type="submit" disabled={!dirty || !isValid} className='bg-blue-700 text-xl text-white py-2 rounded-md disabled:bg-gray-400'>Forgot Password</button>
        <p className='text-blue-600 text-center'><Link to="/">Back to Login</Link></p>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
