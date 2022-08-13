import moment from 'moment';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OtherActivities from '../components/layout/home/OtherActivities';
import TaskPinnedSide from '../components/layout/home/TasksPinnedSide';
import TodaySchedule from '../components/layout/home/TodaySchedule';
import { useAuthContext } from '../context/AuthContext';
import { useMeQuery } from '../generated/graphql';
import JWTManager, { LOGOUT_EVENT } from '../utils/jwt';

const Container = styled.div`
  display: flex;
`;

const Homepage = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const { data, loading, error } = useMeQuery({ fetchPolicy: 'network-only' });
  const navigate = useNavigate();
  const [day, setDay] = useState(moment(new Date()).format('L'));

  if (!isAuthenticated) navigate('/login');

  const handleChangeDay = (type: 'acs' | 'dec') => {
    let now = new Date(day);
    if (type === 'acs') now.setDate(now.getDate() + 1);
    else now.setDate(now.getDate() - 1);

    setDay(moment(now).format('L'));
  };

  //logout all tabs
  window.addEventListener('storage', (event) => {
    if (event.key === LOGOUT_EVENT) {
      JWTManager.setTokenToNull();
      setIsAuthenticated(false);
    }
  });

  useEffect(() => {
    if (!loading && data?.me) {
      toast.success(
        <span>
          Welcome <b>{data?.me?.username}</b>
        </span>,
        {
          duration: 2000,
        }
      );
    }
  }, [data, loading]);

  return (
    <>
      <Container>
        <TaskPinnedSide
          day={day}
          setDay={(value: Date) => setDay(moment(value).format('L'))}
        />
        <TodaySchedule day={day} setDay={handleChangeDay} />
        <OtherActivities
          username={data?.me?.username}
          avatar={data?.me?.avatar}
        />
      </Container>
    </>
  );
};

export default Homepage;
