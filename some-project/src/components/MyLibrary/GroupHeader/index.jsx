import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Components
import { HeartIconFilled, EyeIcon, CartIcon, CheckMarkIconFilled, HomeIcon } from '../../SVG';



class GroupHeader extends Component {
    getGroupTitle = (titleType) => {
        const {pageType} = this.props;

        if (pageType === 'collections') {
            return `${titleType} Collections`;
        }

        if (pageType === 'clothes') {
            switch (titleType) {
                case 'in_cart_list':
                    return (
                        <Fragment>
                            <CartIcon /> In-Cart Clothes
                        </Fragment>
                    );
                case 'saved_list':
                    return (
                        <Fragment>
                            <HeartIconFilled /> Saved Clothes
                        </Fragment>
                    );
                case 'viewed_list':
                    return (
                        <Fragment>
                            <EyeIcon /> Viewed Clothes
                        </Fragment>
                    );
                case 'owned_list':
                    return (
                        <Fragment>
                            <HomeIcon /> Owned / Purchased Clothes
                        </Fragment>
                    );
                default:
                    return null;
            }
        }

        if (pageType === 'outfits') {
            switch (titleType) {
                case 'saved_list':
                    return (
                        <Fragment>
                            <HeartIconFilled /> Saved Outfits
                        </Fragment>
                    );
                case 'purchased_list':
                    return (
                        <Fragment>
                            <CartIcon /> Purchased (from) Outfits
                        </Fragment>
                    );
                case 'viewed_list':
                    return (
                        <Fragment>
                            <EyeIcon /> Viewed Outfits
                        </Fragment>
                    );
                default:
                    return null;
            }
        }

        if (pageType === 'stylists') {
            switch (titleType) {
                case 'followed':
                    return (
                        <Fragment>
                            <CheckMarkIconFilled /> Followed Stylists
                        </Fragment>
                    );
                case 'viewed':
                    return (
                        <Fragment>
                            <EyeIcon /> Viewed Stylists
                        </Fragment>
                    );
                case 'my_saved_outfits':
                    return 'Stylists of My Saved Outfits';
                default:
                    return null;
            }
        }

        return null;
    }

    render() {
        const {titleType, isGridMode, changeMode, showModeBtn} = this.props;

        return (
            <div className="my-library-group-header">
                <div className="my-library-group-header__flex-center">
                    {this.getGroupTitle(titleType)}
                </div>

                {changeMode && showModeBtn && (
                    <div className="my-library-group-header__flex-center">
                        <span>View:</span>
                        <div
                            className={cn('my-library-group-header__mode-btn', {'is-active': !isGridMode})}
                            onClick={() => changeMode(titleType, false)}
                        >
                            <span/><span/><span/>
                        </div>
                        <div
                            className={cn('my-library-group-header__mode-btn', {'is-active': isGridMode})}
                            onClick={() => changeMode(titleType, true)}
                        >
                            <span/><span/><span/>
                            <span/><span/><span/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

GroupHeader.propTypes = {
    changeMode: PropTypes.func,
    isGridMode: PropTypes.bool,
    titleType: PropTypes.string.isRequired,
    pageType: PropTypes.oneOf(['collections', 'outfits', 'clothes', 'stylists']).isRequired,
    showModeBtn: PropTypes.bool
};

GroupHeader.defaultProps = {
    isGridMode: false,
    showModeBtn: false
};

export default GroupHeader;
