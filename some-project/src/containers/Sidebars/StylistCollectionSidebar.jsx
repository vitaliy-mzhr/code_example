import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ScrollToAnimated from '../../components/ScrollToAnimated';
import LSHeader from '../../components/LSHeader';
import LSFilters from '../../components/Filters/LSFilters';
import { withDimensionObserver } from '../../context/Dimension';
import withClientReady from '../../HOC/withClientReady';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { followStylist, unfollowStylist, getStylistOutfits, openAuthModal } from '../../actions';
import { AUTH_MODAL_TYPES } from '../../config';
import { numberMetricFormat } from '../../utils/helpers';
import ImgFadeIn from '../../components/ImageFadeIn';
import { InstagramIcon, ArrowIcon } from '../../components/SVG';
import LinkTo from '../../components/LinkTo';



const headerRef = React.createRef();

class StylistCollectionSidebar extends Component {
    getScrollOffset() {
        const headerCoords = headerRef.current.getBoundingClientRect();
        return -(headerCoords.top + headerCoords.height);
    }

    addToLibrary = () => {
        const {unfollowStylist, followStylist, isAuthenticated, openAuthModal, followed, slug, isLoadingData} = this.props;

        if (isLoadingData) return;

        if (!isAuthenticated) {
            openAuthModal({type: AUTH_MODAL_TYPES.SIGNUP});
            return;
        }

        if (followed) {
            unfollowStylist.trigger({slug});
        } else {
            followStylist.trigger({slug});
        }
    };

    render() {
        const {name, bio, page_cta, vw, isClientReady, followed, api_image, no_followers, outfits_amount, getStylistOutfits} = this.props;

        return (
            <Fragment>
                <LSHeader
                    title={name}
                    subtitle="Stylist"
                    ref={headerRef}
                    isAdded={followed}
                    onAdd={this.addToLibrary}
                    className="collection-sidebar-header"
                    withShare
                />

                <hr/>

                <div className="scrollable with-custom-scroll left-sidebar__content collection-sidebar">
                    <div className="left-sidebar__followers">
                        <LinkTo to={`//instagram.com/${name}`} title="Instagram" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon/>
                        </LinkTo>
                        {numberMetricFormat(no_followers)} followers | {numberMetricFormat(outfits_amount)} outfits
                    </div>

                    {api_image && api_image.height_420 && (
                        <div className="left-sidebar__stylist-img">
                            <ImgFadeIn src={api_image.height_420} alt={name}/>}
                        </div>
                    )}

                    <div className="left-sidebar__desc">{bio}</div>

                    <div className="text-center">
                        <ScrollToAnimated
                            targetQuery={vw <= 767 ? '.ls-filters-mob' : '.page-content'}
                            offset={this.getScrollOffset}
                            duration={300}
                        >
                            <button type="button" className="left-sidebar__cta-btn btn btn__with-icon btn__inverted">
                                <span>{page_cta}</span><ArrowIcon/>
                            </button>
                        </ScrollToAnimated>
                    </div>

                    {isClientReady && (vw > 767) && <LSFilters onFilter={getStylistOutfits.trigger}/>}
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps({collection, auth}) {
    const {data: {name, bio, page_cta, followed, slug, api_image, no_followers, outfits_amount}} = collection;

    return {
        name,
        bio,
        page_cta,
        followed,
        slug,
        api_image,
        no_followers,
        outfits_amount,
        isAuthenticated: auth.isAuthenticated
    };
}

export default compose(
    withClientReady,
    withDimensionObserver,
    connect(mapStateToProps, mapRoutineCreators({followStylist, unfollowStylist, getStylistOutfits, openAuthModal}))
)(StylistCollectionSidebar);
