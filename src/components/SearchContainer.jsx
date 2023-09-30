import { useState, useEffect } from 'react';
import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { changeHandler, clearFilters } from '../features/allJobs/allJobsSlice';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const { isLoading, searchStatus, searchType, sort, sortOptions } =
    useSelector((state) => state.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((state) => state.job);

  const dispatch = useDispatch();
  const searchInputHandler = function (event) {
    dispatch(
      changeHandler({
        key: event.target.name,
        value: event.target.value,
      })
    );
  };

  const submitSearchForm = function (event) {
    event.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  };

  /*   
  Debounce function using useMemo Hook approach

  const debounce = function () {
      let timeoutID;
      return (event) => {
        setLocalSearch(event.target.value);
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          dispatch(
            changeHandler({
              key: event.target.name,
              value: event.target.value,
            })
          );
        }, 1000);
      };
    };

  const optimizedDebounce = useMemo(() => debounce(), []); 

  */

  useEffect(() => {
    const debounceId = setTimeout(() => {
      dispatch(
        changeHandler({
          key: 'search',
          value: localSearch,
        })
      );
    }, 1000);
    return () => {
      clearTimeout(debounceId);
    };
  }, [dispatch, localSearch]);

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Form</h4>
        <div className="form-center">
          {/* Search Position Input */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            // changeHandler={optimizedDebounce}
            changeHandler={(event) => setLocalSearch(event.target.value)}
          />

          {/* Search By Status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            changeHandler={searchInputHandler}
            list={['all', ...statusOptions]}
          />

          {/* Search By Job Type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            changeHandler={searchInputHandler}
            list={['all', ...jobTypeOptions]}
          />

          {/* Sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            changeHandler={searchInputHandler}
            list={sortOptions}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={submitSearchForm}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
