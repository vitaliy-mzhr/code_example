import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ScrollToAnimated from '../../components/ScrollToAnimated';
import ArrowIcon from '../../components/SVG/ArrowIcon';
import LSHeader from '../../components/LSHeader';
import LSFilters from '../../components/Filters/LSFilters';
import { withDimensionObserver } from '../../context/Dimension';
import withClientReady from '../../HOC/withClientReady';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { userAddCollection, userRemoveCollection, getCategoryCollectionOutfits, openAuthModal, getCategoryCollection } from '../../actions';
import { AUTH_MODAL_TYPES } from '../../config';



const headerRef = React.createRef();

class CategoryCollectionSidebar extends Component {
    getScrollOffset() {
        const headerCoords = headerRef.current.getBoundingClientRect();
        return -(headerCoords.top + headerCoords.height);
    }

    addToLibrary = () => {
        const {userRemoveCollection, userAddCollection, isAuthenticated, openAuthModal, added, slug, isLoadingData} = this.props;

        if (isLoadingData) return;

        if (!isAuthenticated) {
            openAuthModal({
                type: AUTH_MODAL_TYPES.SIGNUP,
                title: 'Make Shopping Effortless',
                subtitle: 'Create an account on Portefini to instantly save your favorite collections'
            });
            return;
        }

        if (added) {
            userRemoveCollection.trigger({slug});
        } else {
            userAddCollection.trigger({slug});
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
            this.props.getCategoryCollection.trigger({
                slug: this.props.slug,
                collectionParent: this.props.collectionParent
            });
        }
    }

    render() {
        const {name, collectionParent, long_description, page_cta, vw, isClientReady, added, getCategoryCollectionOutfits} = this.props;

        return (
            <Fragment>
                <LSHeader
                    title={name}
                    subtitle={collectionParent || ''}
                    ref={headerRef}
                    isSaved={added}
                    onSave={this.addToLibrary}
                    className="collection-sidebar-header"
                    withShare
                />

                <hr/>

                <div className="scrollable with-custom-scroll left-sidebar__content collection-sidebar">
                    <div className="left-sidebar__desc">{long_description}</div>

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

                    {isClientReady && (vw > 767) && <LSFilters onFilter={getCategoryCollectionOutfits.trigger}/>}
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps({collection, auth: {isAuthenticated}}) {
    const {data: {name, collectionParent, long_description, page_cta, added, slug}} = collection;

    return {
        name,
        collectionParent,
        long_description,
        page_cta,
        added,
        slug,
        isAuthenticated
    };
}

export default compose(
    withClientReady,
    withDimensionObserver,
    connect(mapStateToProps, mapRoutineCreators({
        userAddCollection,
        userRemoveCollection,
        getCategoryCollectionOutfits,
        openAuthModal,
        getCategoryCollection
    }))
)(CategoryCollectionSidebar);
