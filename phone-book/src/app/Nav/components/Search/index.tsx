import * as React from 'react';
import Preloader from '../../../common/Preloader';
import { AppSearchProps, AppSearchDispatch } from '../../interfaces';
import { ContactsList } from '../../../Home/components';

const Search: React.StatelessComponent<AppSearchProps & AppSearchDispatch> = (props) => (
    props.isLoading ? <Preloader/> : <ContactsList {...props}/>
);

export default Search;
