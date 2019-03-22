import styled from 'styled-components';

const ErrorPageStyles = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  .page-message-container {
    margin-top: 2rem;
    padding: 2rem;
    color: ${props => props.theme.colors.errorColor};
}
`;

export default ErrorPageStyles;
