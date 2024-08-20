import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios
import { Formik, Field, Form, ErrorMessage } from 'formik'; // Import Formik components
import * as Yup from 'yup'; // For validation schema

export default function RegisterPage() {
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
 const Navigate = useNavigate()
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('https://blogpage-mern-stack-gi6a.vercel.app/api/auth/register', values, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) { // Check for status 201 for successful creation
        alert('Registration successful');
        Navigate('/login')
      }
    } catch (error) {
      if (error.response) {
        setErrors({ general: error.response.data.error || 'Registration failed' });
      } else {
        console.error('Error:', error.message);
        setErrors({ general: 'Registration failed' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="register">
        <div className="container">
          <h2>Sign Up</h2>
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="form register__form">
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="input"
                />
                <ErrorMessage style={{color:"red", fontSize:"13px"}} name="username" component="div" className="error" />
                
                <Field
                  type="email" // Changed type to email for better validation
                  name="email"
                  placeholder="Email"
                  className="input"
                />
                <ErrorMessage style={{color:"red", fontSize:"13px"}} name="email" component="div" className="error" />
                
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input"
                />
                <ErrorMessage style={{color:"red", fontSize:"13px"}} name="password" component="div" className="error" />
                
                <ErrorMessage style={{color:"red", fontSize:"13px"}} name="general" component="div" className="error" />
                
                <button
                  type="submit"
                  className="btn primary"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
          <small>Already have an account? <Link to="/login">Sign in</Link></small>
        </div>
      </section>
    </>
  );
}
