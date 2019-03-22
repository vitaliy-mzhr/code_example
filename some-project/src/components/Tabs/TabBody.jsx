import React from 'react';
import cn from 'classnames';

import { TabsContext } from './';



const TabBody = ({id, className, children}) => (
    <TabsContext.Consumer>
        {({activeTab}) => {
            if (activeTab !== id || !children) return null;

            return (
                <div className={cn('tabs__content', className)}>
                    {children}
                </div>
            );
        }}
    </TabsContext.Consumer>
);

TabBody.displayName = 'TabBody';

export default TabBody;
