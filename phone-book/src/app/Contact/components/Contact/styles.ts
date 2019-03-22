import styled from 'styled-components';

const ContactStyles = styled.div`
  margin: .5rem 0;
  
  .card-action {
    width: 100%;
  }
  .phones-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    padding: .5rem .5rem .5rem 1rem;
    
    .phone {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-decoration: none;
      color: ${props => props.theme.colors.mainColor}
    }
  }
  .phones-header {
    padding: .5rem 1.5rem;
    font-weight: 600;
  }
  .buttons-container {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .contact-content {
    display: none;
    padding: 0;
    &.expanded {
      display: block;
    }
    &:last-child {
      padding-bottom: 0;
    }
  }
`;

export default ContactStyles;
