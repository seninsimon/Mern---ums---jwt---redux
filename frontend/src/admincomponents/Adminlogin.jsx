import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminloginthunk } from "../../features/adminslices/adminloginslice";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [admindata, setadmindata] = useState({
        adminname: "",
        adminpassword: "",
    });

    const navigate = useNavigate()

   

    const { loading, success, error } = useSelector((state) => state.adminlogin);

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("admintoken")
        if(token)
        {
         navigate("/adminpanel")
        }
    },[success])

    const handlechange = (e) => {
        const { name, value } = e.target;
        setadmindata({ ...admindata, [name]: value });
    };

    const handleadminlogin = (e) => {
        e.preventDefault();
        dispatch(adminloginthunk(admindata));
    };

    return (
        <div className="admin-login-container">
            <form className="admin-login-form" onSubmit={handleadminlogin}>
                <h2 className="form-title">Admin Login</h2>
                <input
                    type="text"
                    name="adminname"
                    placeholder="Admin Name"
                    className="form-input"
                    onChange={handlechange}
                />
                <input
                    type="password"
                    name="adminpassword"
                    placeholder="Admin Password"
                    className="form-input"
                    onChange={handlechange}
                />
                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? "Logging in..." : "Log in"}
                </button>
                {error && <p className="form-error">Admin login error</p>}
                {success && <p className="form-success">Admin login successful</p>}
            </form>
        </div>
    );
};

export default AdminLogin;
