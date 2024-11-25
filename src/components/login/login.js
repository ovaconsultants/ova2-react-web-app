import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './login.scss';
import { Link } from 'react-router-dom';
import { authenticate_user } from '../../api/adminUserService';
import { useSetAtom } from 'jotai';
import { usernameAtom , registrationIdAtom , roleIdAtom , roleNameAtom , userImageAtom } from '../jotia/globalAtoms/userRelatedAtoms';


const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // functions for setting atom value 
  const setGlobalUsername = useSetAtom(usernameAtom);
  const setGlobalRoleId = useSetAtom(roleIdAtom);
  const setGlobalRegistrationId = useSetAtom(registrationIdAtom);
  const setGlobalRoleName = useSetAtom(roleNameAtom);
  const setGlobalUserImage = useSetAtom(userImageAtom);

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!userName || !password) {
      setError('username & password are required');
      return;
    }

    const payload = {
      userName: userName,
      password: password,
    };

    try {
    
      const response = await authenticate_user(payload);
      console.log("response from the autheticate api " , response);
      const username = response?.user?._full_name;
      const roleId = response?.user?._role_id;
      const registrationId = response?.user?._registration_id;
      const roleName  = response?.user?._role_name;
      const userImage = 'https://example.com/user-image.jpg'; // Example user image URL
      const token = response?.token ;
      localStorage.setItem('jwtToken', token);
 
      if (username) {
        setGlobalUsername(username);
        setGlobalRoleId(roleId);
        console.log("from login :" , registrationId);
        setGlobalRegistrationId(registrationId);
        setGlobalRoleName(roleName);
        setGlobalUserImage(userImage);
        login({ username, image: userImage });
        roleName === 'admin' ? navigate('/admin') : navigate('/');

      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div>
      <section className="page-title bg-2">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>Sign In</h1>
                <p>Please enter your login details to access your account.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form">
        <div className="container">
          <form className="row" id="contact-form">
            <div className="col-md-6 col-sm-12">

              {error && <p className="error">{error}</p>}
              <div className="block">
                <div className="form-group">
                  <input name="user_name" type="text" className="form-control" placeholder="Email or Phone"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                </div>
                <div className="form-group">
                  <input name="password" type="password" className="form-control" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required/>
                </div>
                <button className="btn btn-default" type="button" onClick={handleLogin}>Login</button>
              </div>
               </div>
          </form>
          <div className='ps-5 m-3 text-start'>
          <Link to="/sign-up" className="fs-5">Not a member? Register here</Link>
          </div>
        </div>      
      </section>
    </div>
  );
};

export default Login;
