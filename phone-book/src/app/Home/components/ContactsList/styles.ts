import styled from 'styled-components';

const ContactsListStyles = styled.div`
  width: 100%;
  max-width: ${props => props.theme.dimensions.contactsMaxWidthRem * 1.25}rem;
  margin: 2rem auto;
  
  @media all and (max-width: ${props => props.theme.media.mobileMaxWidthPx}px) {
    max-width: ${props => props.theme.dimensions.contactsMaxWidthRem}rem;
  }
`;

export default ContactsListStyles;
