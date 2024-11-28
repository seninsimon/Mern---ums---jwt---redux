import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/slices/signup/userloginslice"; // AsyncThunk action
import "./UserLogin.css"; // Import the CSS file

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, loading, error } = useSelector((state) => state.login);

  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setlogindata({ ...logindata, [name]: value });
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    dispatch(login(logindata))
      .unwrap()
      .then(() => navigate("/home"));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handlelogin}>
        <h2 className="form-title">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-input"
          onChange={handlechange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-input"
          onChange={handlechange}
        />
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
        {error && <p className="form-error">Error in logging in</p>}
      </form>
    </div>
  );
};

export default UserLogin;
