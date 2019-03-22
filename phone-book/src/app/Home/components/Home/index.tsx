import * as React from 'react';
import HomeStyles from './styles';
import { AppHomeProps } from '../../interfaces';
import { AppSearchDispatch } from '../../../Nav/interfaces';
import { Preloader } from '../../../common';
import { ContactsList } from '../../components';

const Home: React.StatelessComponent<AppHomeProps & AppSearchDispatch> =
  ({contacts, isLoading, toggleContact, deleteContact}) => {
  return (
    <HomeStyles>
      {isLoading
        ? <Preloader/>
        : (
          <ContactsList
            contacts={contacts}
            toggleContact={toggleContact}
            deleteContact={deleteContact}
          />
        )}
    </HomeStyles>
  );
};

export default Home;
