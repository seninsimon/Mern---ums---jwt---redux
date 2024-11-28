import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/slices/signup/usersignupslice"; // AsyncThunk action
import { useNavigate } from "react-router-dom";
import "./UserSignup.css";

const UserSignup = () => {
  const { loading, error } = useSelector((state) => state.signup);

  const [userdata, setuserdata] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
    phonenumber: "",
  });

  const [image, setimage] = useState(null);

  const [validation, setvalidation] = useState({})

  const handlechange = (e) => {
    const { name, value } = e.target;
    setuserdata({ ...userdata, [name]: value });
  };

  const handleimage = (e) => {
    setimage(e.target.files[0]);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesignup = async (e) => {
    e.preventDefault();
    if (!validationfun()) return


    dispatch(signup({ userdata, image }))
      .unwrap()
      .then(() => navigate("/login"));
  };

  const validationfun = () => {
    const errors = {};

    if (!userdata.username.trim()) {
      errors.username = "username is required"
    }

    if (!userdata.email.trim()) {
      errors.email = "email is required"
    }

    if (userdata.phonenumber.length < 10 || userdata.phonenumber.length > 10) {
      errors.phonenumber = "enter a valid phone number"
    }

    if (userdata.password.length < 6) {
      errors.password = "password must be atleast of 6 charecters"
    }

    if (userdata.password !== userdata.confirmpassword) {
      errors.confirmpassword = "password do not match"
    }



    setvalidation(errors)

    if (Object.keys(errors).length === 0) return
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handlesignup}>
        <h2 className="form-title">Sign Up</h2>

        {validation?.username && <p style={{ color: "red" }} >provide username</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="form-input"
          onChange={handlechange}
        />

        {validation?.email && <p style={{ color: "red" }} >provide valid email</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-input"
          onChange={handlechange}
        />

        {validation?.phonenumber && <p style={{ color: "red" }} >provide valid phonenumber</p>}

        <input
          type="number"
          name="phonenumber"
          placeholder="Phone Number"
          className="form-input"
          onChange={handlechange}
        />

        {validation?.phonenumber && (<p style={{ color: "red" }} >{validation.password}</p>)}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-input"
          onChange={handlechange}
        />

        {validation?.confirmpassword && (<p style={{ color: "red" }} >{validation.confirmpassword}</p>)}

        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          className="form-input"
          onChange={handlechange}
        />
        <input
          type="file"
          className="file-input"
          onChange={handleimage}
        />
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
};

export default UserSignup;
