import styled from 'styled-components';

const ContactsDividerStyles = styled.div`
  .divider {
    padding: .5rem;
    margin-bottom: .25rem;
    background-color: ${props => props.theme.colors.greyColor};
  }
  .title {
    text-align: center;
  }
`;

export default ContactsDividerStyles;
