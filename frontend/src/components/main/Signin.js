import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signin = () => {

  const navigate = useNavigate();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      console.log(values);

      const res = await fetch('http://localhost:5000/user/authenticate', {
        method: 'POST',
        body : JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(res.status === 201){

        const data = await res.json();

        if(data.role === 'admin'){
          sessionStorage.setItem('admin', JSON.stringify(data));
          navigate('/admin/manageequipment');
        }else{
          sessionStorage.setItem('user', JSON.stringify(data));
          navigate('/main/home');
        }


        Swal.fire({
          title : 'Well Done',
          icon : "success",
          text : "You have successfully logged in"
        })
      }else if(res.status === 401){
        Swal.fire({
          title : 'Oops',
          icon : "error",
          text : "Invalid Credentials"
        })
      }
    },
  });


  return (
    <section className="vh-100 login-bg">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-left align-items-centre h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card text-white" style={{ borderRadius: '1rem', backdropFilter: 'blur(7px)', backgroundColor: 'rgba(0,0,0,0.25)' }}>
              <div className="card-body p-5 text-center">
              <form onSubmit={loginForm.handleSubmit}>
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
                  <div className=" form-white mb-4">
                    <label className="form-label text-center" htmlFor="typeEmailX">
                      Email
                    </label>
                    <input type="email" id="email"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.email} className="form-control form-control-lg" />
                  </div>
                  <div className=" form-white mb-4">
                    <label className="form-label text-center" htmlFor="typePasswordX">
                      Password
                    </label>
                    <input type="password" id="password"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.password} className="form-control form-control-lg" />
                  </div>
                  <p className="small mb-5 pb-lg-2">
                    <a className="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>
                  <button className="btn btn-outline-light btn-lg px-5" type="submit">
                    Login
                  </button>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg" />
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2" />
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg" />
                    </a>
                  </div>
                </div>
                <div>
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <a href="#!" className="text-white-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
