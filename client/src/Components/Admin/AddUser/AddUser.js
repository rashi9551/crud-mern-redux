import React ,{useEffect} from 'react'
import './AddUser.css'
import {useFormik} from 'formik'
import { useNavigate } from "react-router-dom";
import validation from '../../../utils/signupValidation';
import axiosInstance from '../../../utils/axios';
import { toast } from "react-toastify";


const initialValues={
    name:"",
    email:"",
    phone:"",
    password:"",
    cpassword:"",
    img:""
}
const AddUser = () => {
    const navigate=useNavigate()
    const {values,handleBlur,handleSubmit,handleChange,errors,touched}=useFormik({
        initialValues,
        validationSchema:validation,
        onSubmit:async (values,{setErrors})=>{
            try {
                const token=localStorage.getItem('adminToken')
                await axiosInstance.post('/admin/addUser',{values,token}) 
                navigate('/dashboard')
                toast.success("user add successful!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } catch (err) {
                if (err.response && err.response.status === 409) {
                    setErrors({ email: 'Email is already in use' });
                }
            
            }
        }

    })
    useEffect(()=>{
        const token=localStorage.getItem('adminToken')
        if(!token){
            navigate('/adminLogin')
        }
    },[])
  return (
    <div>
            <div className="signup-container">
                <div className="signup-form">
                    <div className="signup">
                        <div className="heading">
                            <h1>Add user</h1>
                        </div>
                        <form  onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter your name"
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {touched.name && <div>{errors.name}</div>}
                            <div>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="Enter your email"
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {touched.email && <div>{errors.email}</div>}
                            <div>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter your number"
                                    name='phone'
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {touched.phone && <div>{errors.phone}</div>}
                            <div>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Create a password"
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {touched.password && <div>{errors.password}</div>}
                            <div>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Confirm password"
                                    name='cpassword'
                                    value={values.cpassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>
                            {touched.cpassword && <div>{errors.cpassword}</div>}
                            <div className="image-selection">
                                <label htmlFor="fileInput" className="custom-file-upload">
                                    Select a profile Photo
                                </label>
                                <input
                                    className="file-input"
                                    type="file"
                                    id="fileInput"
                                    required
                                    name='img'
                                    value={values.img}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div>
                                {values.img && (
                                    <img
                                        style={{ width: "auto", height: "100px", margin: "5px 0 15px 0" }}
                                        src=''
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                )}
                            </div>
                            <button type='submit'>Add user</button>
                        </form>
                        {/* <p>
                            Already registered?{" "}
                            <span
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Login here
                            </span>
                        </p> */}
                    </div>
                    <div className="signup-image ">
                        <img className='ml-2' src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?w=740&t=st=1689949881~exp=1689950481~hmac=58560ad660e25612b606680a6bdc8653304832d1d1ecc9a86b0857d6dee6af83" alt="" />
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AddUser
