import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  changeHandler,
  clearValues,
  createJob,
  editJob,
} from '../../features/job/jobSlice';
import { useEffect } from 'react';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((state) => state.job);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const submitAddJobFormHandler = function (event) {
    event.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all fields!');
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, status, jobType }));
  };

  const jobInputChangeHandler = function (event) {
    const key = event.target.name;
    const value = event.target.value;
    dispatch(changeHandler({ key, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(
        changeHandler({
          key: 'jobLocation',
          value: user.location,
        })
      );
    }
  }, [dispatch, user.location, isEditing]);
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className="form-center">
          {/* Position Field */}
          <FormRow
            type="text"
            name="position"
            value={position}
            changeHandler={jobInputChangeHandler}
          />

          {/* Company Field */}
          <FormRow
            type="text"
            name="company"
            value={company}
            changeHandler={jobInputChangeHandler}
          />

          {/* Job Location Field */}
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            labelText="Job Location"
            changeHandler={jobInputChangeHandler}
          />
          {/* Status Select */}
          <FormRowSelect
            name="status"
            value={status}
            changeHandler={jobInputChangeHandler}
            list={statusOptions}
          />

          {/* Job Type Select */}
          <FormRowSelect
            name="jobType"
            value={jobType}
            labelText="Job Type"
            changeHandler={jobInputChangeHandler}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={submitAddJobFormHandler}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
