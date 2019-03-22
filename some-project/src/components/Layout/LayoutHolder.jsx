import React, { Component } from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import Layout from './index';
import pagesLayouts from '../../config/pages-layout';



class LayoutHolder extends Component {
    render() {
        const {children, sidebars} = this.props;
        const layoutProps = pagesLayouts(this.props.router.route);

        return (
            <Layout {...layoutProps} {...sidebars}>
                {children}
            </Layout>
        );
    }
}

LayoutHolder.propTypes = {
    sidebars: PropTypes.shape({
        LSidebar: PropTypes.func,
        RSidebar: PropTypes.func
    })
};
LayoutHolder.defaultProps = {
    sidebars: {}
};

export default withRouter(LayoutHolder);
