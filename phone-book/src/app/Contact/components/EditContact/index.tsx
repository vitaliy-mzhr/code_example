import * as React from 'react';
import { ContactForm } from '../../../common';
import { Redirect } from 'react-router-dom';

interface EditContactProps {
  contact: {
    firstName: string;
    lastName: string;
    phones: string[];
  };
  handleSubmit: (contact: object) => void;
}

const EditContact: React.StatelessComponent<EditContactProps> = ({contact, handleSubmit}) => {
  return (
    // @ts-ignore
    contact ?
      <ContactForm title="Edit contact" onSubmit={handleSubmit} initialValues={contact} forEdit={true}/>
      : <Redirect to={'/add'}/>
  );
};

export default EditContact;
