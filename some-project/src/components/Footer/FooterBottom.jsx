import React, { memo } from 'react';

import { FacebookIcon, TwitterIcon, InstagramIcon, EmailIcon } from '../SVG';
import LinkTo from '../LinkTo';



const FooterBottom = () => (
    <div className="site-footer__bottom">
        <div className="site-footer__about-us">
            <LinkTo to="/about-us">About us</LinkTo>
        </div>

        <div className="site-footer__logo-container">
            <img src="/static/images/logo-mini.png" alt="logo"/>
        </div>

        <div className="site-footer__social">
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

export default memo(FooterBottom);
