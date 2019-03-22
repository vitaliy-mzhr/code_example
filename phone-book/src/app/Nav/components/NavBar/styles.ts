import styled from 'styled-components';

const NavBarStyles = styled.div`
   width: 100%;
   .app-bar {
    min-height: ${props => props.theme.dimensions.navMinHeightRem}rem;
   }
   .back-button {
      color: ${props => props.theme.colors.whiteColor};
   }
   .home-button {
    margin-left: -12px;
    margin-right: 20px;
    color: ${props => props.theme.colors.whiteColor};
   }
   .search-button {
    color: ${props => props.theme.colors.whiteColor};
   }
   .flex-grow {
    flex-grow: 1;
   }
   .search-container {
    position: relative;
    border-radius: ${props => props.theme.borders.mainBorderRadiusPx}px;
    margin-left: 0;
    background-color: ${props => props.theme.colors.navSearchBackground};
    //width: 100%;
    &:hover {
      background-color: ${props => props.theme.colors.navSearchBackgroundHover};
    }
   }
   .search-icon {
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    width: 4rem;
   }
   .search-input {
    color: inherit;
    padding: .1rem .1rem .1rem 4.1rem;
    input {
      width: 10rem;
    }
    &.add-transition {
      input {
        width: 10rem;
        &:focus {
        width: 15rem;
      }
        transition: width .15s ease-in;
      }
    }
   }
   
   @media all and (max-width: ${props => props.theme.media.mobileMaxWidthPx}px) {
   .app-bar {
    padding: 0 .7rem;
    min-height: ${props => props.theme.dimensions.navMinHeightRem * 0.9}rem;
   }
    .title {
      display: none;
    }
    .search-input {
      input {
        width: 7rem;
     }
     &.add-transition {
      input {
        width: 7rem;
        &:focus {
        width: 10rem;
      }
     }
     }
    }
  }
`;

export default NavBarStyles;
