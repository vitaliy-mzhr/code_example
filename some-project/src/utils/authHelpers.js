import cookie from 'js-cookie';

// Routes
import { Router } from '../../routes';
// Utils
import { apiRemoveToken } from './api';



export function LogoutHelper (ctx) {
    apiRemoveToken();
    if (process.browser) {
        cookie.remove('token');
        redirectOnError(ctx);
    } else {
        if (ctx) {
            ctx.res.setHeader('Set-Cookie', ['token=;']);
        }
        redirectOnError(ctx);
    }
}

export function redirectOnError (ctx) {
    if (ctx) {
        const { isServer, req, res } = ctx;
        if (req && isServer) {
            res.writeHead(301, { Location: '/' });
            res.end();
        } else {
            Router.pushRoute('/');
        }
    } else if (process.browser) {
        Router.pushRoute('/');
    }
}
