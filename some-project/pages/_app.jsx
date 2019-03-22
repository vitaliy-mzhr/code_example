import React from 'react';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { initSimpleImg } from 'react-simple-img';
import Router from 'next/router';
import NProgress from 'nprogress';
import nextCookie from 'next-cookies';

// Actions
import { setAuth, resetAuth, getUser } from '../src/actions';
// Components
import LayoutHolder from '../src/components/Layout/LayoutHolder';
// Store
import makeStore from '../src/store';
// Styles
import '../src/styles/main.scss';
// Utils
import { apiSetToken, apiRemoveToken } from '../src/utils/api';
import { DimensionProvider } from '../src/context/Dimension';
import monitorSagas from '../src/utils/monitor-saga';
import { redirectOnError } from '../src/utils/authHelpers';



NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());



if (process.browser) {
    require('intersection-observer');
    initSimpleImg();
}



class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        const { store } = ctx;
        const { token } = nextCookie(ctx);
        const { auth } = store.getState();

        if (token) {
            store.dispatch(setAuth.success());
            apiSetToken(token);
        } else {
            store.dispatch(resetAuth.success());
            apiRemoveToken();
        }

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        if (token) {
            if (!Object.keys(auth.user).length) {
                store.dispatch(getUser.trigger());
            }
        } else {
            /**
             * This logic is for pages which validate authorization.
             * For this logic add static variable IS_PRIVATE = true in the private page
             */
            if (Component.IS_PRIVATE) {
                redirectOnError(ctx);
            }
        }

        //Be careful with this line, it may cause problems with saga/redux/store
        //After monitorSagas fulfill any updates triggered to the store from any getInitialProps of components become available
        await monitorSagas(store);

        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        const sidebars = {
            LSidebar: Component.LSidebar,
            RSidebar: Component.RSidebar
        };

        return (
            <Container>
                <Head>
                    <title>Portefini – Shop menswear effortlessly</title>
                </Head>
                <Provider store={store}>
                    <DimensionProvider>
                        <LayoutHolder sidebars={sidebars}>
                            <Component {...pageProps}/>
                        </LayoutHolder>
                    </DimensionProvider>
                </Provider>
            </Container>
        );
    }
}

export default compose(
    withRedux(makeStore),
    withReduxSaga
)(MyApp);
