import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { toggleSidebar, clearStore } from '../features/user/userSlice';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutButtonContainer = useRef();
  const dropdownContainer = useRef();

  const mouseLeaveOnBtnContainerHandler = function (event) {
    const logoutButton = logoutButtonContainer.current;
    const { left, right, top } = logoutButton.getBoundingClientRect();
    const { clientX, clientY } = event;
    if (clientX < left + 1 || clientX > right - 1 || clientY < top - 1) {
      setShowLogout(false);
    }
  };

  const mouseLeaveOnDropdownHandler = function (event) {
    const dropdownDiv = dropdownContainer.current;
    const { left, right, bottom } = dropdownDiv.getBoundingClientRect();
    const { clientX, clientY } = event;
    if (clientX < left + 1 || clientX > right - 1 || clientY > bottom - 1) {
      setShowLogout(false);
    }
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
            ref={logoutButtonContainer}
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={mouseLeaveOnBtnContainerHandler}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <AnimatePresence>
            {showLogout && (
              <motion.div
                className="dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, type: 'spring' }}
                ref={dropdownContainer}
                onMouseLeave={mouseLeaveOnDropdownHandler}
              >
                <button
                  type="button"
                  className="dropdown-btn"
                  onClick={() => dispatch(clearStore('Logging out...'))}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
