import api from './api';



export const emailSubscription = ({ email }) =>
    api({
        method: 'POST',
        url: 'other/email_subscription',
        data: { email }
    }).then(function(response) {
        return response.data;
    });
