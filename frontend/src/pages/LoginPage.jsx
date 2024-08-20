import { useContext,useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // For validation schema

export default function LoginPage() {
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address!')
      .required('Email is required!'),
    password: Yup.string()
      .required('Password is required!'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('https://blogpage-mern-stack-gi6a.vercel.app/api/auth/login', 
        values,{
          headers:{'Content-Type':'application/json'},
          credentials: 'include'
        }
      );
      
      setUserInfo(response.data);
      
      setRedirect(true);
    } catch (error) {
      if (error.response) {
        setErrors({ general: error.response.data || 'Wrong credentials' });
      } else {
        console.error('Error:', error.message);
        setErrors({ general: 'Login failed' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <section className="login">
      <div className="container">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form login__form">
              <h1>Login</h1>
              
              <Field
                type="email"
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
              <ErrorMessage style={{color:"red",fontSize:"13px"}} name="password" component="div" className="error" />
              
              <button
                type="submit"
                className="btn primary"
                disabled={isSubmitting}
              >
                Login
              </button>
              
              <ErrorMessage name="general" component="div" className="error" />
            </Form>
          )}
        </Formik>
        <small>Don't have an account?<Link to='/register'>Sign Up</Link></small>
      </div>
    </section>
  );
}
