// React Library Imports
import { useState, useEffect } from 'react';

// Third Party Library Imports
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Developer Imports
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';

// Initial local state in register page
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  // Local state object holds all the values for login/registration
  const [values, setValues] = useState(initialState);

  // Retrieving user and isLoading latest states from redux store.
  const { user, isLoading } = useSelector((state) => state.user);

  // Initializing dispatch object for performing actions on register page.
  const dispatch = useDispatch();

  // Navigate object for programmatically navigating back to the dashboard after successful login.
  const navigate = useNavigate();

  // The global onChange handler function for setting new properties for values state.
  const changeHandler = function (event) {
    const key = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [key]: value }); // Using `Dynamic Object Keys` from Vanilla JS
  };

  // The onSubmit handler function for submitting the form and dispatching proper actions based on the login/register condition.
  const submitHandler = function (event) {
    event.preventDefault();
    const { name, email, password, isMember } = values;

    /* 
      Checking out for empty input fields. 
      By checking isMember in the if statement, the checking required input fields of both forms don't mix together. 
    */
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields');
      return;
    }

    // Performing the login action
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }

    // Performing the register action
    dispatch(registerUser({ name, email, password }));
  };

  // This function switches between login and register form based on the user choice.
  const toggleMember = function () {
    setValues({ ...values, isMember: !values.isMember });
  };

  // Redirect from login page to dashboard programmatically
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={submitHandler}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {/* NAME FIELD */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            changeHandler={changeHandler}
          />
        )}

        {/* EMAIL FIELD */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          changeHandler={changeHandler}
        />

        {/* PASSWORD FIELD */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          changeHandler={changeHandler}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({ email: 'testUser@test.com', password: 'secret' })
            )
          }
        >
          {isLoading ? 'Loading...' : 'Demo App'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
