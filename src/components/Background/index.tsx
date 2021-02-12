import React from 'react'
import styled from 'styled-components';
import background from "../../img/background.png";
import mobilebackground from '../../img/mobilebackground.png'


const Background: React.FC = (props) => {
  return(
  <StyledBackground style={{
    backgroundImage: `url(${background})`
    }}> 
    {props.children}
  </StyledBackground>

  )
}

const StyledBackground = styled.div`
background-image: 'url(${background})';
background-size: cover;
background-position: bottom center;
background-repeat: no-repeat;
`;

export default Background