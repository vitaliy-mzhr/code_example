import styled from 'styled-components';

const PreloaderStyles = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - ${props => props.theme.dimensions.navMinHeightRem}rem);
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media all and (max-width: ${props => props.theme.media.mobileMaxWidthPx}px) {
   height: calc(100% - ${props => props.theme.dimensions.navMinHeightRem * 0.9}rem);
  }
`;

export default PreloaderStyles;