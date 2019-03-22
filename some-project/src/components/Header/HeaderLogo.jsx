import React, { memo } from 'react';

import LinkTo from '../LinkTo';



const HeaderLogo = () => (
    <div className="site-logo__header">
        <LinkTo to="/">
            <img src="/static/images/logo.png" alt="logo"/>
        </LinkTo>
    </div>
);

export default memo(HeaderLogo);
