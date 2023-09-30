import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });

  const submitHandler = function (event) {
    event.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error('Please fill out all fields!');
      return;
    }
    dispatch(updateUser({ name, email, lastName, location }));
  };

  const changeHandler = function (event) {
    const key = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [key]: value });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <h3>Profile</h3>
        <div className="form-center">
          {/* name field */}
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            changeHandler={changeHandler}
          />
          {/* last name field */}
          <FormRow
            type="text"
            name="lastName"
            value={userData.lastName}
            labelText="last name"
            changeHandler={changeHandler}
          />
          {/* email field */}
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            changeHandler={changeHandler}
          />
          {/* location field */}
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            changeHandler={changeHandler}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'Save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
