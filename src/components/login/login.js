import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './login.scss';
import { authenticateUser } from '../../api/authenticateService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('username & password are required');
      return;
    }

    const payload = {
      userName: username,
      password: password,
    };

    try {
      const response = await authenticateUser(payload);
    //  console.log('response', response);

      const username = response?.data?.employeeName;
      const userImage = 'https://example.com/user-image.jpg'; // Example user image URL

      if (username) {
        login({ username, image: userImage });
        navigate('/admin');
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
                    value={username}
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
        </div>      
      </section>
    </div>
  );
};

export default Login;
