import styled from 'styled-components';

const ContactFormStyles = styled.div`
  h3 {
    text-align: center;
  }
  .form-container {
    margin: 0 auto;
    padding-top: 2rem;
    max-width: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .buttons-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
    button {
      margin: 0 .25rem;
    }
  }
`;

export default ContactFormStyles;
