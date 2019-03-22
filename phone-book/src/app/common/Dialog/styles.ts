import styled from 'styled-components';

const AlertDialogStyles = styled.div`
  min-width: 14rem;
  .dialog-title {
    h2 {
      text-align: center;
    }
  }
  .buttons-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  
  .confirm-button-icon {
    color: ${props => props.theme.colors.greenColor};
  }
  .cancel-button-icon {
    color: ${props => props.theme.colors.errorColor};
  }
`;

export default AlertDialogStyles;
