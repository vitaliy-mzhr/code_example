// Actions
import { resetAuth } from '../../actions';
// Utils
import api from './api';
import { LogoutHelper } from '../authHelpers';


export const apiSetInterceptor = (store) => {
    api.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        const { response } = error;
        if (response && response.status === 401) {
            store.dispatch(resetAuth.success());
            LogoutHelper();
        }
        return Promise.reject(error.response);
    });
};
