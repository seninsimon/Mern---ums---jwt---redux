import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adduserthunk } from '../../features/adminslices/adduserslice';
import './Adduser.css';

const Adduser = () => {
  const [userdata, setuserdata] = useState({
    username: '',
    email: '',
    password: '',
    phonenumber: '',
  });

  const [image, setimage] = useState();

  const dispatch = useDispatch();

  const { success, loading, error } = useSelector((state) => state.adduser);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setuserdata({ ...userdata, [name]: value });
  };

  const handleimage = (e) => {
    setimage(e.target.files[0]);
  };

  const handleadduser = (e) => {
    e.preventDefault();
    dispatch(adduserthunk({ userdata, image }));
  };

  return (
    <div className="add-user-page">
      <form onSubmit={handleadduser} className="add-user-form">
        <h2>Add User</h2>

        <input
          type="file"
          onChange={handleimage}
          className="input-file"
        />

        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={userdata.username}
          onChange={handlechange}
          className="input-field"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userdata.email}
          onChange={handlechange}
          className="input-field"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userdata.password}
          onChange={handlechange}
          className="input-field"
        />

        <input
          type="number"
          name="phonenumber"
          placeholder="Phone Number"
          value={userdata.phonenumber}
          onChange={handlechange}
          className="input-field"
        />

        <button type="submit" className="submit-btn">
          {loading ? 'Adding User...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default Adduser;
