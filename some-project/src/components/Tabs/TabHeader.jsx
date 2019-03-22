import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { TabsContext } from './';



const TabHeader = ({children, id, className}) => (
    <TabsContext.Consumer>
        {({activeTab, toggleTab}) => {
            return (
                <div
                    className={cn('tabs__name', className, {'is-active': id === activeTab})}
                    onClick={toggleTab}
                    data-tab-id={id}
                >
                    {children}
                    <div className="tabs__name-underline"/>
                </div>
            );
        }}
    </TabsContext.Consumer>
);

TabHeader.displayName = 'TabHeader';

export default TabHeader;
