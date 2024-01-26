import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

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
      username: '',
      password: '',
    });
  };

  return (
    <main>
      <div>
        <div >
          <h4>Login</h4>
          <div>
            {data ? (
              <p>
                Logged In. {' '}
                <Link to="/">Go to {/**fix link */}</Link>
              </p>
            ) : (
              <div>
                <form onSubmit={handleFormSubmit} class="mx-auto">
                  <div class="mb-3 mt-5">
                    <label for="email-input" class="form-label">Email:</label>
                    <input
                      className="form-input"
                      placeholder=""
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />  
                  </div>
                  <div class="mb-3">
                    <label for="password-input" class="form-label">Password:</label>
                    <input
                      className="form-input"
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />  
                  </div>
                  <button
                    className="btn btn-block btn-primary"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Login
                  </button>
                </form>
                <p class="row">
                  
                  <Link to="/signup">SignUp Instead!</Link>
                </p>
              </div>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;