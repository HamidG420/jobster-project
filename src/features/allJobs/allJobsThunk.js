import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllJobsThunk = async function (_, thunkAPI) {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;
  let url = `/jobs`;
  /*     
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
        if (search) {
          url = url + `&search=${search}`;
        } 
    */
  try {
    const response = await customFetch.get(url, {
      params: {
        search: search || null,
        status: searchStatus,
        jobType: searchType,
        sort,
        page,
      },
    });
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async function (_, thunkAPI) {
  try {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
