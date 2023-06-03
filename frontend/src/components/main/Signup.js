import React from 'react';
import app_config from '../../config';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

const Signup = () => {

  const url = app_config.apiUrl;
  const { themeColor, themeColorLight } = app_config;
  const navigate = useNavigate();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cPassword: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const res = await fetch(`${url}/user/add`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User Registered Successfully!!",
        });
        const data = (await res.json()).result;
        navigate("/main/signin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Some Error Occured!!",
        });
      }
    },
  });


  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/303040/pexels-photo-303040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                  <form onSubmit={signupForm.handleSubmit}>
                    <div className="form-outline mb-4">
                      <input type="text" id="name" onChange={signupForm.handleChange} value={signupForm.values.name} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="name">
                        Your Name
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="email" id="email" onChange={signupForm.handleChange} value={signupForm.values.email} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="email">
                        Your Email
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" id="password" onChange={signupForm.handleChange} value={signupForm.values.password} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" id="cPassword" onChange={signupForm.handleChange} value={signupForm.values.cPassword} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="cPassword">
                        Repeat your password
                      </label>
                    </div>
                    <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" defaultValue="" id="form2Example3cg" />
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in{' '}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4">
                        Register
                      </button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{' '}
                      <a href="#!" className="fw-bold text-body">
                        <u>Login here</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
