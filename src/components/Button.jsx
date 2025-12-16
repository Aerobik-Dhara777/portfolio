import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="Btn">
        Hire Me
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    position: relative;
    width: 150px;
    height: 55px;
    border-radius: 45px;
    border: none;
    background-color: ##ADEED9; /* Main violet color */
    color: white;
    box-shadow: 
      0px 3px 7px #81F8EA inset,    /* subtle violet glow */
      0px 2px 5px rgba(50, 15, 140, 0.3),
      0px -4px 6px #ADEED9 inset,
      0px 0px 14px 3px #7a4dff;    /* subtle outer glow */
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

   
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .Btn::before {
    width: 70%;
    height: 2px;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.45);
    content: "";
    filter: blur(1px);
    top: 7px;
    border-radius: 50%;
  }

  .Btn::after {
    width: 70%;
    height: 2px;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.12);
    content: "";
    filter: blur(1px);
    bottom: 7px;
    border-radius: 50%;
  }

  .Btn:hover {
    animation: jello-horizontal 0.9s both;
    background-color: #0D1164; /* Darker violet on hover */
    box-shadow:
      0px 0px 38px 5px #4635B1,
      0px 10px 15px #6A42C2 inset;
  }

  @keyframes jello-horizontal {
    0% {
      transform: scale3d(1, 1, 1);
    }
    30% {
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }
`;

export default Button;
