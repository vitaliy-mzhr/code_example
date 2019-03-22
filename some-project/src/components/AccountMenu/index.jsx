import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Collapse, { Panel } from 'rc-collapse';

import LinkTo from '../LinkTo';
import UserLibraryLinks from '../UserLibraryLinks';



const AccountMenu = ({activeRoute, isCollapsed}) => (
    <div className="account-menu">
        <LinkTo to="/my-info" className={cn('account-menu__title', { 'is-active': isCollapsed})}>
            My Info
        </LinkTo>

        <hr/>

        <Collapse className="account-menu__collapse" defaultActiveKey={!isCollapsed ? 'myLibrary' : null}>
            <Panel showArrow={false} header="My Library" key="myLibrary">
                <UserLibraryLinks className="account-menu__item" route={activeRoute}/>
            </Panel>
        </Collapse>
    </div>
);

AccountMenu.propTypes = {
    activeRoute: PropTypes.string.isRequired,
    isCollapsed: PropTypes.bool.isRequired
};

export default AccountMenu;
