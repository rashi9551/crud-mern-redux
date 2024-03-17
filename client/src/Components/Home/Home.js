import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserAuthentication } from "../../Redux/userSlice";
import "./Home.css";

import axiosInstance from "../../utils/axios";
import Login from "../Login/Login";

const Home = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("jwt");
    if(!token)
    {
      navigate('/')
    }
    axiosInstance
      .get("/home", {
        params: {
          id: id,
          token: token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err.message);
        if (err.response && err.response.status === 401) {
          console.log("user not found");
        }
        if (err.response && err.response.status === 401) {
          console.log("user not found");
        }
      });
  }, []);
  useEffect(() => {
    dispatch(checkUserAuthentication());
  }, [dispatch]);

  if (!data) {
    return <Login />;
  }
  return (
    <div className="main">
      <div className="navbar">
        <div className="navbar-brand">
          <h3>User Profile</h3>
        </div>
        <nav className="navbar-nav">
         <div onClick={Logout} className="nav-item cursor-pointer">
              <p>Logout</p>
            </div>
        </nav>
      </div>

      <div className="container">
        {data.email && (
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
              <div className="image d-flex flex-column justify-content-center align-items-center">
                <img
                  className="logo m-auto"
                  src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                  alt=""
                />
                <span className="name mt-3">UserName : {data.name}</span>
                <br></br>
                <span className="font-bold">Email : {data.email}</span>
                <br></br>
                <span className="number">Phone No :{data.phone}</span>
                <div className="d-flex mt-2 justify-between">
                  <button
                    onClick={() => navigate("/profile-update")}
                    className="btn1 btn-dark"
                  >
                    Edit Profile
                  </button>
                  <button onClick={Logout} className="btn2">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;