import React, { useState } from 'react';
import app_config from '../../config';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

const AddLocation = () => {
  const url = app_config.apiUrl;
  const { themeColor, themeColorLight } = app_config;
  const navigate = useNavigate();
  const [selImg, setSelImg] = useState('');

  const locationform = useFormik({
    initialValues: {
      title: '',
      city: '',
      state: '',
      images: '',
      created_at: new Date(),
      updated_at: new Date()
    },
    onSubmit: async (values) => {
      values.images = [selImg];
      console.log(values);
      const res = await fetch(`${url}/location/add`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.status);
      if (res.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User Registered Successfully!!'
        });
        const data = (await res.json()).result;
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Some Error Occured!!'
        });
      }
    }
  });

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    setSelImg(file.name);
    fd.append('myfile', file);
    fetch(url + '/util/uploadfile', {
      method: 'POST',
      body: fd
    }).then((res) => {
      if (res.status === 200) {
        console.log('file uploaded');
      }
    });
  };

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
                  <h2 className="text-uppercase text-center mb-5">ADD NEW LOCATION</h2>
                  <form onSubmit={locationform.handleSubmit}>
                    <div className=" mb-4">
                      <label className="form-label" htmlFor="title">
                        Location Name
                      </label>
                      <input type="text" id="title" onChange={locationform.handleChange} value={locationform.values.title} className="form-control form-control-lg" />
                    </div>
                    <div className=" mb-4">
                      <label className="form-label" htmlFor="state">
                        State
               
                      </label>
                      <input type="text" id="state" onChange={locationform.handleChange} value={locationform.values.state} className="form-control form-control-lg" />
                    </div>
                    <div className=" mb-4">
                      <label className="form-label" htmlFor="city">
                        City
                      </label>
                      <input type="text" id="city" onChange={locationform.handleChange} value={locationform.values.city} className="form-control form-control-lg" />
                    </div>

                    <input type='file' className="form-control" onChange={uploadFile} />

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4">
                        Add Location
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

export default AddLocation;
