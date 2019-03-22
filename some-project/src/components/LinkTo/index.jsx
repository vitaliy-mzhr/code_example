import React from 'react';
import PropTypes from 'prop-types';

import { Link, Router } from '../../../routes';



const _customNav = (to, page, query) => (e) => {
    e.preventDefault();
    Router.push({
        pathname: `/${page}`,
        query,
    }, to);
};

export const LinkToVerbose = ({to, page, params, children, ...rest}) => (
    <a href={to} onClick={_customNav(to, page, params)} {...rest}>{children}</a>
);

LinkToVerbose.propTypes = {
    to: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    params: PropTypes.object
};
LinkToVerbose.defaultProps = {
    params: {}
};



const LinkTo = ({to, children, params, ...rest}) => (
    <Link route={to} params={params}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a {...rest}>{children}</a>
    </Link>
);

LinkTo.propTypes = {
    to: PropTypes.string.isRequired,
    params: PropTypes.object
};
LinkTo.defaultProps = {
    params: {}
};

export default LinkTo;
