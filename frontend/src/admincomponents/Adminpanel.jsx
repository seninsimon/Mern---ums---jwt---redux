import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminpanelthunk } from '../../features/adminslices/adminpanelslice';
import { deleteuserthunk } from '../../features/adminslices/deleteuserslice';
import './Adminpanel.css';

const Adminpanel = () => {
  const { success, loading, error } = useSelector((state) => state.adminpanel);
  const { deleteduser } = useSelector((state) => state.deleteuser);

  const [search, setsearch] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admintoken');
    if (!token) {
      navigate('/adminlogin');
    }
    dispatch(adminpanelthunk());
  }, [navigate, dispatch, deleteduser]);

  const handledeleteuser = (id) => {
    dispatch(deleteuserthunk(id));
  };

  const handleadduser = () => {
    navigate('/adduser');
  };

  const handlelogout = () => {
    localStorage.removeItem('admintoken');
    if (!localStorage.getItem('admintoken')) {
      navigate('/adminlogin');
    }
  };



  const filtereddata = success?.filter((user) => {
    return (
      user.username.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
      || String(user.phonenumber).includes(search)
    )
  })


  




  return (
    <div className="admin-panel-page">
      <div className="admin-panel-header">
        <button className="admin-panel-btn" onClick={handleadduser}>
          Add User
        </button>
        <button className="admin-panel-btn logout-btn" onClick={handlelogout}>
          Logout
        </button>
      </div>

      <div className="admin-panel-search">
        <input
          type="text"
          placeholder="Search by username, email, or phone number"
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>


      <div className="admin-panel-table-wrapper">
        <table className="admin-panel-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>
            {success.length ===0 && (<h1>no users avaialabale</h1>)}
            {filtereddata?.map((user) => (
              
              <tr key={user._id}>
                <td>
                  <img className="admin-panel-user-image" src={user.imageurl} alt="" />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phonenumber}</td>
                <td>
                  <button
                    className="admin-panel-action-btn edit-btn"
                    onClick={() => navigate(`/edituser/${user._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-panel-action-btn delete-btn"
                    onClick={() => handledeleteuser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminpanel;
