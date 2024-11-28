import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeprofilepic } from "../../features/slices/signup/userprofilepictureslice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const { loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profiledata, setprofiledata] = useState({
    username: "",
    email: "",
    phonenumber: "",
    imageurl: "",
  });

  const [dp, changedp] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchuserdata = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setprofiledata(response.data.userdata);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchuserdata();
  }, [navigate]);

  const handlefilechange = (e) => {
    changedp(e.target.files[0]);
  };

  const handleprofilepic = () => {
    const token = localStorage.getItem("usertoken");
    if (!dp) {
      console.error("No file selected!");
      return;
    }

    dispatch(changeprofilepic({ image: dp, token }))
      .then((response) => {
        setprofiledata({ ...profiledata, imageurl: response.payload });
      })
      .catch((error) => console.error("Dispatch error:", error));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          className="profile-picture"
          src={profiledata.imageurl}
          alt="Profile"
        />
        <h3 className="profile-text">Name: {profiledata.username}</h3>
        <h3 className="profile-text">Email: {profiledata.email}</h3>
        <h3 className="profile-text">Phone: {profiledata.phonenumber}</h3>
        <div className="file-input-wrapper">
          <input
            type="file"
            name="file"
            className="file-input"
            onChange={handlefilechange}
          />
          <button
            onClick={handleprofilepic}
            className="profile-button"
            disabled={loading}
          >
            {loading ? "Changing Profile Picture..." : "Change Profile Pic"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
