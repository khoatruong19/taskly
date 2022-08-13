import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 3rem 3rem;
`;

const PaddingWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PaddingWrapper;
