import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Config
import { SITE_CATEGORIES } from '../../config';
// Components
import Menu from '../../containers/Menu';
import LoopMeInContainer from '../../containers/LoopMeInContainer';
import FooterBottom from './FooterBottom';
// HOC
import { withDimensionObserver } from '../../context/Dimension';



class Footer extends Component {
    render() {
        const { menu: {items: menuItems, isLoading}, vw } = this.props;
        
        return (
            <footer className="site-footer">
                <div className="site-footer__top">
                    <div className="site-footer__nav">
                        <div className="site-footer__titles">
                            {Object.keys(SITE_CATEGORIES).map(menuId => (
                                <div key={menuId}>
                                    <span className="site-footer__title">{SITE_CATEGORIES[menuId]}</span>
                                </div>
                            ))}
                        </div>
                        <div className="site-footer__menus">
                            {!isLoading && Object.keys(menuItems).length > 0 &&
                                Object.entries(SITE_CATEGORIES).map(([menuId, menuName]) => (
                                    <div key={menuId}>
                                        <Menu urlBase={menuName.toLowerCase()} items={menuItems[menuId]} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <hr/>
                    <div className="site-footer__subscription">
                        <LoopMeInContainer messageType={vw <= 900 ? 'float' : 'static'}/>
                    </div>
                </div>

                <FooterBottom/>
            </footer>
        );
    }
}

function mapStateToProps({menu}) {
    return {menu};
}

export default compose(
    withDimensionObserver,
    connect(mapStateToProps)
)(Footer);
