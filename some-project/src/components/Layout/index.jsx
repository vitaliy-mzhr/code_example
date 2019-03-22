import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import { LeftSidebar, RightSidebar } from '../Sidebar';



class Layout extends Component {
    render() {
        const  {children, hideLSidebar, hideRSidebar, hideFooter, hideHeader, LSidebar, RSidebar} = this.props;

        return (
            <Fragment>
                {!hideHeader && <Header/>}

                {!hideLSidebar && LSidebar && <LeftSidebar sidebarData={this.props.LSidebar}/>}

                {!hideRSidebar && RSidebar && <RightSidebar sidebarData={this.props.RSidebar}/>}

                <main className="page-content">
                    {children}
                </main>

                {!hideFooter && <Footer/>}
            </Fragment>
        );
    }
}

Layout.propTypes = {
    hideFooter: PropTypes.bool,
    hideHeader: PropTypes.bool,
    hideRSidebar: PropTypes.bool,
    hideLSidebar: PropTypes.bool,
    LSidebar: PropTypes.func,
    RSidebar: PropTypes.func
};
Layout.defaultProps = {
    hideFooter: false,
    hideHeader: false,
    hideRSidebar: false,
    hideLSidebar: false,
    LSidebar: null,
    RSidebar: null
};

export default Layout;
