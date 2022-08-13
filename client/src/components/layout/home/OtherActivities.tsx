import { useState } from 'react';
import styled from 'styled-components';
import { borderRadius, grayColor, yellowColor } from '../../../constants';
import Avatar from '../../common/Avatar';
import PaddingWrapper from '../../common/PaddingWrapper';
import { FiLogOut } from 'react-icons/fi';
import AudioPlayer from '../../common/AudioPlayer';
import Clock from '../../common/Clock';
import Weather from '../../common/Weather';
import { useLogoutUserMutation, User } from '../../../generated/graphql';
import { useAuthContext } from '../../../context/AuthContext';
import JWTManager from '../../../utils/jwt';
import { client } from '../../..';
import UserModal from '../../common/UserModal';

const Container = styled.div`
  flex: 1.1;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  span {
    position: absolute;
    top: 4.5rem;
    right: 0;
    padding: 1rem;
    background-color: ${yellowColor};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    z-index: 999;

    &:hover {
      color: black;
    }

    &:before {
      content: '';
      position: absolute;
      right: 1.2rem;
      top: -10px;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid ${yellowColor};
    }
  }
`;

const LeftHeader = styled.div`
  cursor: pointer;
  h1 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.9rem;
    color: ${yellowColor};
    font-weight: 600;
    margin-top: 1px;
  }
`;

const TimeAndWeather = styled.div`
  width: 100%;
  background-color: ${grayColor};
  margin-top: 2rem;
  border-radius: ${borderRadius};
`;

const TimeAndWeatherWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  username?: string;
  avatar?: string;
}

const OtherActivities = ({ username, avatar }: IProps) => {
  const { logoutClient } = useAuthContext();
  const [logoutServer, _] = useLogoutUserMutation();
  const [openLogout, setOpenLogout] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const logout = async () => {
    logoutClient();
    await logoutServer({
      variables: {
        userId: `${JWTManager.getUserId()}`,
      },
    });

    client.resetStore();
  };

  const handleOpenModal = () => {
    setOpenUserModal(true);
  };
  return (
    <Container>
      <PaddingWrapper>
        <Header>
          <LeftHeader onClick={handleOpenModal}>
            <h1>{username}</h1>
            <p>My profile</p>
          </LeftHeader>
          <Avatar
            onClick={() => setOpenLogout(!openLogout)}
            size="lg"
            src={avatar}
            cursor
          />
          {openLogout && (
            <span onClick={logout}>
              <FiLogOut />
              Logout
            </span>
          )}
        </Header>
        <AudioPlayer />
        <TimeAndWeather>
          <TimeAndWeatherWrapper>
            <Clock />
            <Weather />
          </TimeAndWeatherWrapper>
        </TimeAndWeather>
      </PaddingWrapper>
      {openUserModal && (
        <UserModal
          closeModal={() => setOpenUserModal(false)}
          username={username}
          avatar={avatar}
        />
      )}
    </Container>
  );
};

export default OtherActivities;
