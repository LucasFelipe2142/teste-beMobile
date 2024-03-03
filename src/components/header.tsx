import React from 'react';
import styled from 'styled-components';
import beLogo from '../assets/beLogo.png';

// Header component
const Header: React.FC = () => {
  return (
    <HeaderDiv>
      <div className='containerLogo'>
        <Logo src={beLogo} alt="beLogo" />
      </div>        
    </HeaderDiv>
  );
};

export default Header;

// Styled components for Header and Logo
const HeaderDiv = styled.div`
  background-color: white;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  
  // Styling for the logo container
  .containerLogo {
    width: 90%;
  }
`;

const Logo = styled.img`
  width: 44px;
`;
