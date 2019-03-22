import styled from 'styled-components';

const BaseLayoutStyles = styled.div`
  //padding-top: 7rem;
  
  @media all and (max-width: ${props => props.theme.media.mobileMaxWidthPx}px) {
    //padding-top: 5rem;
  }
  
`;

export default BaseLayoutStyles;
