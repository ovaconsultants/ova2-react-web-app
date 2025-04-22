import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.8); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.fullPage ? '100vh' : 'auto'};
  width: ${props => props.fullPage ? '100vw' : 'auto'};
  position: ${props => props.fullPage ? 'fixed' : 'relative'};
  top: 0;
  left: 0;
  background-color: ${props => props.fullPage ? 'rgba(255, 255, 255, 0.8)' : 'transparent'};
  z-index: 9999;
`;

const DotContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #1d192c;
  animation: ${pulse} 1.5s ease-in-out infinite;
  
  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
`;

const LoadingSpinner = ({ fullPage = false }) => {
  return (
    <SpinnerContainer fullPage={fullPage}>
      <DotContainer>
        <Dot />
        <Dot />
        <Dot />
      </DotContainer>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;