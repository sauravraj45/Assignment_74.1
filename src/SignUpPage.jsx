import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; 

function SignUpPage() {
    function callSignUpApi(values) {
        console.log("Sending data ", values.username, values.email, values.password);
    }

    const SignUpSchema = Yup.object().shape({
        username: Yup.string()
            .required('Please Enter a username.')
            .min(5, 'Must be at least 5 characters')
            .matches(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'Invalid UserName.'),
        email: Yup.string().email('Invalid Email').required('Please Enter Email Id.'),
        password: Yup.string()
            .min(8, 'Minimum 8 characters')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character').required('Please Enter your password.'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], `Password don't match.`)
            .required('Please confirm your password.'),
    });

    const { handleSubmit, values, handleChange, errors, handleBlur, touched, dirty, isValid } = useFormik({
        initialValues: {
            username: "",
            email: '',
            password: '',
            confirmpassword: "",
        },
        onSubmit: callSignUpApi,
        validationSchema: SignUpSchema,
    });

    return (
        <div className='flex flex-col mt-5 mb-10'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 bg-white p-10 rounded-lg m-auto'>
                    <div className='space-y-3 m-5'>
                        <h1 className='text-4xl font-medium text-center'>Sign Up</h1>
                        <p className=' text-xl text-bg-300 text-center'>Create your account</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="username" className='sr-only'>Enter UserName:</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                onChange={handleChange}
                                value={values.username}
                                onBlur={handleBlur}
                                type="text"
                                id="username"
                                placeholder='Username'
                                className='border-2 pl-10 pr-4 py-2 border-[#329ca8] rounded-md w-full'
                            />
                        </div>
                        {touched.username && errors.username && <div className='text-red-500'>{errors.username}</div>}

                        <label htmlFor="email" className='sr-only'>Enter Email:</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                onChange={handleChange}
                                value={values.email}
                                onBlur={handleBlur}
                                type="email"
                                id="email"
                                placeholder='Email'
                                className='border-2 pl-10 pr-4 py-2 border-[#329ca8] rounded-md w-full'
                            />
                        </div>
                        {touched.email && errors.email && <div className='text-red-500'>{errors.email}</div>}

                      
                        <label htmlFor="password" className='sr-only'>Enter Password:</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                onChange={handleChange}
                                value={values.password}
                                onBlur={handleBlur}
                                type="password"
                                id="password"
                                placeholder='Password'
                                className='border-2 pl-10 pr-4 py-2 border-[#329ca8] rounded-md w-full'
                            />
                        </div>
                        {touched.password && errors.password && <div className='text-red-500'>{errors.password}</div>}

            
                        <label htmlFor="confirmpassword" className='sr-only'>Enter Confirm Password:</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                onChange={handleChange}
                                value={values.confirmpassword}
                                onBlur={handleBlur}
                                type="password"
                                id="confirmpassword"
                                placeholder='Confirm Password'
                                className='border-2 pl-10 pr-4 py-2 border-[#329ca8] rounded-md w-full'
                            />
                        </div>
                        {touched.confirmpassword && errors.confirmpassword && <div className='text-red-500'>{errors.confirmpassword}</div>}

                    </div>

                    <div className='flex flex-col space-y-3'>
                        <button
                            type="submit"
                            disabled={!dirty || !isValid}
                            className='bg-blue-700 text-xl text-white py-2 rounded-md disabled:bg-gray-400'>SignUp</button>
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 ">Login</Link>
                        </p>
                    </div>

                </form>
        </div>
    )
}

export default SignUpPage;