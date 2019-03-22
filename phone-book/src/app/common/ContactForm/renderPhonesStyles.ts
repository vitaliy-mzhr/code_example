import styled from 'styled-components';

const RenderPhonesStyles = styled.div`
  div.phones-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    button {
      margin: 0 .25rem;
    }
  }
  .add-phone-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem;
  }
  .phone-input {
    width: 100%;
  }
  
  .error {
    color: ${props => props.theme.colors.errorColor};
    text-align: center;
    padding: 1rem;
  }
`;

export default RenderPhonesStyles;