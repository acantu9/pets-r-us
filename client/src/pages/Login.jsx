import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import '../styles/LoginSignIn.css';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main>
      <div>
        <div>
          <div>
            {data ? (
              <p>
                Logged In. {' '}
                <Link to="/User_Profile">Go to {/**fix link */}</Link>
              </p>
            ) : (
              <div className="login-form">
                <form onSubmit={handleFormSubmit} className="mx-auto">
                  <h4 className="text-center">Login</h4>
                  <div className="mb-3 mt-5">
                    <label for="email-input" className="form-label">Email:</label>
                    <input
                      className="form-input form-control"
                      placeholder=""
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />  
                  </div>
                  <div className="mb-3">
                    <label for="password-input" className="form-label">Password:</label>
                    <input
                      className="form-input form-control"
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />  
                  </div>
                  <Link to="/User_Profile">
                    <button
                      className="btn btn-primary btn-lg mt-5 mb-3"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Login
                    </button>
                  </Link>
                  <p class="row">
                    <Link to="/signup">SignUp Instead!</Link>
                  </p>
                </form>
              </div>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                Error: Email or Password incorrect. Please try again.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;