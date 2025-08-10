import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {FaEnvelope} from 'react-icons/fa'; 

function ForgotPasswordPage() {
    function callForgotApi(values) {
        console.log("Sending data ", values.email);
    }

    const forgotSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Please Enter Email Id.'),
    });

    const { handleSubmit, values, handleChange, errors, handleBlur, touched, dirty, isValid } = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: callForgotApi,
        validationSchema: forgotSchema,
    });

    return (
        <div className='flex flex-col mt-20'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 bg-white p-10 rounded-lg m-auto'>

                 <div className='m-5'>
                        <h1 className='text-4xl font-medium text-center'>Forgot Password</h1>
                </div>
                <label htmlFor="email" className='sr-only'>Enter Email:</label>
                <div className='relative'>
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                        type="email"
                        id="email"
                        placeholder='Email'
                        className='pl-10 pr-3 py-2 border-2 border-[#329ca8] rounded-md w-full'
                    />
                </div>
                 {touched.email && errors.email && <div className='text-red-500 text-sm mt-1'>{errors.email}</div>}
                <div className='flex flex-col space-y-3'>
                    <button
                        type="submit"
                        disabled={!dirty || !isValid}
                        className='bg-blue-700 text-xl text-white py-2 rounded-md disabled:bg-gray-400'
                    >Forgot Password</button>
                   <p className='text-blue-600 text-center self-end'><Link to={"/login"} >Back to Login?</Link></p>
                </div>
            </form>
        </div>
    );
}

export default ForgotPasswordPage;