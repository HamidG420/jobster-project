import { useSelector, useDispatch } from 'react-redux';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import Wrapper from '../assets/wrappers/PageBtnContainer';
import { changePage } from '../features/allJobs/allJobsSlice';

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((state) => state.allJobs);

  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const prevPage = function () {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  const nextPage = function () {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
            onClick={() => dispatch(changePage(pageNumber))}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button type="button" className="next-btn" onClick={nextPage}>
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
