// Import necessary dependencies from React and external libraries
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Import Apollo Client hooks and mutation query
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

// Import component-specific styles
import '../styles/LoginSignIn.css';

// Import authentication utility
import Auth from '../utils/auth';

// Define the Signup component
const Signup = () => {
  // Initialize state for form inputs
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Use Apollo Client's useMutation hook to handle user registration
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Handle changes in form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update the form state with the new input value
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Execute the addUser mutation with the form data
      const { data } = await addUser({
        variables: { ...formState },
      });

      // If successful, log the user in using Auth utility
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // Render the Signup component
  return (
    <main>
      <div>
        <div>
          <div>
            {/* Display success message if user is signed in, otherwise show the signup form */}
            {data ? (
              <p>
                Signed In{' '}
                {/* Provide a Link to navigate to the home page */}
                <Link to="/">Home</Link> 
              </p>
            ) : (
              // Render the signup form
              <form onSubmit={handleFormSubmit} class="mx-auto">
                <h4 class="text-center">Sign Up</h4>
                <div class="mb-3 mt-5">
                  {/* Input field for username */}
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
                  {/* Input field for email */}
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
                  {/* Input field for password */}
                  <input
                    className="form-input form-control"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </div>
                {/* Signup button */}
                <button
                  className="btn btn-primary mt-5"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  SignUp
                </button>
              </form>
            )}

            {/* Display error message if there is an error during signup */}
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

// Export the Signup component as the default export
export default Signup;
