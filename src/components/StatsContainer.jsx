import { useSelector } from 'react-redux';
import { StyleSheetManager } from 'styled-components';
import isValidProp from '@emotion/is-prop-valid';
import { FaCalendarCheck } from 'react-icons/fa';
import { MdPendingActions, MdOutlineCancelPresentation } from 'react-icons/md';

import StatItem from './StatItem';

import Wrapper from '../assets/wrappers/StatsContainer';

const StatsContainer = () => {
  const { stats } = useSelector((state) => state.allJobs);
  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <MdPendingActions />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <MdOutlineCancelPresentation />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return (
          <StyleSheetManager
            shouldForwardProp={(propName) => isValidProp(propName)}
            key={index}
          >
            <StatItem key={index} {...item} />
          </StyleSheetManager>
        );
      })}
    </Wrapper>
  );
};
export default StatsContainer;
