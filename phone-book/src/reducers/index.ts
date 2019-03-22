import { combineReducers } from 'redux';
import homeReducer from '../app/Home/redux/reducer';
import searchReducer from '../app/Nav/redux/reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers<any>({
  contactsState: homeReducer,
  searchState: searchReducer,
  form: formReducer,
});

export default rootReducer;
