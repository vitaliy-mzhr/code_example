import api from './api';


export const apiSetToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
};

export const apiRemoveToken = () => {
    delete api.defaults.headers.common['Authorization'];
};
