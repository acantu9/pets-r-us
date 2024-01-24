import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import '../styles/LoginSignIn.css';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <div>
        <div>
          
          <div>
            {data ? (
              <p>
                Signed In{' '}
                <Link to="/">{/*fix link*/}</Link> 
              </p>
            ) : (
              
              <form onSubmit={handleFormSubmit} class="mx-auto">
                <h4 class="text-center">Sign Up</h4>
                <div class="mb-3 mt-5">
                <input
                  className="form-input form-control"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                </div>
                <div class="mb-3">
                <input
                  className="form-input form-control"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                </div>
                <div class="mb-3">
                <input
                  className="form-input form-control"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                </div>
                <button
                  className="btn btn-primary mt-5"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  SignUp
                </button>
              </form>
              
    
            )}

            {error && (
              <div>
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;