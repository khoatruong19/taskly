import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { grayColor, yellowColor } from '../../../constants';
import { useAuthContext } from '../../../context/AuthContext';
import Avatar from '../../common/Avatar';

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 10% auto;
  background-color: ${grayColor};
  border-radius: 15px;
  border: 1px solid ${yellowColor};
`;

const Wrapper = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  span {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);
  return (
    <Container>
      <Wrapper>
        <Header>
          <Avatar size="lg" />
          <span>Taskly</span>
        </Header>
        {children}
      </Wrapper>
    </Container>
  );
};

export default AuthLayout;
