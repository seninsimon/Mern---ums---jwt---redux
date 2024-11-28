import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { edituserthunk } from '../../features/adminslices/edituserslice';
import './Editeuser.css';

const Editeuser = () => {
  const { id } = useParams();
  const { success } = useSelector((state) => state.adminpanel);

  const [updateddata, setupdateddata] = useState({
    username: '',
    email: '',
    phonenumber: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const filtereduser = success.find((user) => user._id === id);
    if (filtereduser) {
      setupdateddata({
        username: filtereduser.username,
        email: filtereduser.email,
        phonenumber: filtereduser.phonenumber,
      });
    }
  }, [id, success]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setupdateddata({ ...updateddata, [name]: value });
  };

  const dispatch = useDispatch();

  const handleupdateuser = (e) => {
    e.preventDefault();
    dispatch(edituserthunk({ updateddata, id }))
      .unwrap()
      .then(() => navigate('/adminpanel'));
  };

  return (
    <div className="edit-user-page">
      <form className="edit-user-form" onSubmit={handleupdateuser}>
        <h2 className="edit-user-title">Edit User</h2>
        <input
          type="text"
          name="username"
          className="edit-user-input"
          placeholder="User Name"
          value={updateddata.username}
          onChange={handlechange}
        />
        <input
          type="email"
          name="email"
          className="edit-user-input"
          placeholder="Email"
          value={updateddata.email}
          onChange={handlechange}
        />
        <input
          type="number"
          name="phonenumber"
          className="edit-user-input"
          placeholder="Phone Number"
          value={updateddata.phonenumber}
          onChange={handlechange}
        />
        <button type="submit" className="edit-user-button">
          Update User
        </button>
      </form>
    </div>
  );
};

export default Editeuser;
