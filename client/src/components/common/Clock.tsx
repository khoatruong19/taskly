import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 3.5rem;
`;

const Clock = () => {
  const [clock, setClock] = useState('');
  useEffect(() => {
    const clockId = setInterval(() => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }, 1000);

    return () => clearInterval(clockId);
  }, []);
  return <Container>{clock}</Container>;
};

export default Clock;
