import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function LoginPage({ setUser }) {

  function callLoginApi(values, bag){
    axios.post("https://myeasykart.codeyogi.io/login", {
        email: values.email,
        password: values.password,
    })
    .then((response) => {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        setUser(user); 
    })
    .catch(() => {
        alert("Invalid email or password");
    });
  }

  const LoginSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Please Enter Email Id.'),
      password: Yup.string()
          .min(8, 'Minimum 8 characters')
          .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
          .required('Please Enter your password.'),
  });

  const { handleSubmit, values, handleChange, errors, handleBlur, touched, dirty, isValid } = useFormik({
      initialValues: { email: '', password: '' },
      onSubmit: callLoginApi,
      validationSchema: LoginSchema,
  });

  return (
      <div className='flex flex-col mt-10 mb-10'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3 bg-white p-10 rounded-lg m-auto'>
              <div className='space-y-3 m-5'>
                  <h1 className='text-4xl font-medium text-center'>Login</h1>
                  <p className='text-xl text-bg-300 text-center'>Enter your credentials to login</p>
              </div>

              <div className='relative'>
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                      type="email"
                      id="email"
                      placeholder='Email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='pl-10 pr-3 py-2 border-2 border-[#329ca8] rounded-md w-full'
                  />
              </div>
              {touched.email && errors.email && <div className='text-red-500 text-sm mt-1'>{errors.email}</div>}

              <div className='relative'>
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                      type="password"
                      id="password"
                      placeholder='Password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='pl-10 pr-3 py-2 border-2 border-[#329ca8] rounded-md w-full'
                  />
              </div>
              {touched.password && errors.password && <div className='text-red-500 text-sm mt-1'>{errors.password}</div>}

              <div className='flex flex-col space-y-3'>
                  <button
                      type="submit"
                      disabled={!dirty || !isValid}
                      className='bg-blue-700 text-xl text-white py-2 rounded-md disabled:bg-gray-400'>
                      Login
                  </button>
                  <p className='text-blue-500 text-center self-end'>
                      <Link to={"/forgotpassword"}>Forgot Password?</Link>
                  </p>
                  <p>
                      Don't have an account?{' '}
                      <Link to="/signup" className="text-blue-600">Sign Up</Link>
                  </p>
              </div>
          </form>
      </div>
  );
}

export default LoginPage;


















