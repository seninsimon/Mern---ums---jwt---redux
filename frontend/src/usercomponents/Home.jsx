import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handlelogout = () => {
    localStorage.removeItem("usertoken");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome Home</h1>
      <Link to="/profile" className="profile-link">
        <h3>Profile</h3>
      </Link>
      <button onClick={handlelogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Home;
