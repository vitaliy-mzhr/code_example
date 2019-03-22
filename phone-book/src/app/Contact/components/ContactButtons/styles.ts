import styled from 'styled-components';

const ContactButtonStyles = styled.div`
  padding: .25rem;
  .contact-button {
    
    .contact-icon {
      font-size: 1.5rem;
    }
    
    &:hover {
      .edit-icon {
        color: ${props => props.theme.colors.blueColor};
      }
      .delete-icon {
        color: ${props => props.theme.colors.redColor};
      }
      .close-icon {
        color: ${props => props.theme.colors.mainColor};
      }
    }
  }
`;

export default ContactButtonStyles;
