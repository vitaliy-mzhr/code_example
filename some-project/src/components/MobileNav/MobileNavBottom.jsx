import React, { memo } from 'react';

import LinkTo from '../LinkTo';
import { FacebookIcon, TwitterIcon, InstagramIcon, EmailIcon } from '../SVG';



const MobileNavBottom = () => (
    <div className="mobile-menu__bottom">
        <LinkTo to="/about-us">About us</LinkTo>

        <div className="mobile-menu__social">
            <a href="//facebook.com/portefini" title="Facebook" target="_blank" rel="noopener noreferrer">
                <FacebookIcon/>
            </a>
            <a href="//twitter.com/portefini" title="Twitter" target="_blank" rel="noopener noreferrer">
                <TwitterIcon/>
            </a>
            <a href="//instagram.com/portefini" title="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon/>
            </a>
            <a href="mailto:info@portefini.com" title="Email" target="_blank" rel="noopener noreferrer">
                <EmailIcon/>
            </a>
        </div>
    </div>
);

export default memo(MobileNavBottom);
