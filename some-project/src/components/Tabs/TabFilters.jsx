import React from 'react';

import { TabsContext } from './';



const TabFilters = ({children, id}) => (
    <TabsContext.Consumer>
        {({activeTab}) => {
            if (activeTab !== id || !children) return null;

            return children;
        }}
    </TabsContext.Consumer>
);

TabFilters.displayName = 'TabFilters';

export default TabFilters;
