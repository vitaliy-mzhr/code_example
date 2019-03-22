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
import { getClothesOutfits } from '../../actions';



const headerRef = React.createRef();

class ClothesCollectionSidebar extends Component {
    getScrollOffset() {
        const headerCoords = headerRef.current.getBoundingClientRect();
        return -(headerCoords.top + headerCoords.height);
    }

    getOutfits = (params) => {
        const {getClothesOutfits, parentSlug} = this.props;
        getClothesOutfits.trigger({clothesSlug1: parentSlug, ...params});
    };

    render() {
        const {name, category1_name, long_description, page_cta, vw, isClientReady} = this.props;

        return (
            <Fragment>
                <LSHeader
                    title={name}
                    subtitle={`In ${category1_name}`}
                    ref={headerRef}
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

                    {isClientReady && (vw > 767) && <LSFilters onFilter={this.getOutfits}/>}
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps({collection}) {
    const {data: {name, long_description, page_cta, slug, category1_name, parentSlug}} = collection;

    return {
        name,
        long_description,
        page_cta,
        slug,
        parentSlug,
        category1_name
    };
}

export default compose(
    withClientReady,
    withDimensionObserver,
    connect(mapStateToProps, mapRoutineCreators({getClothesOutfits}))
)(ClothesCollectionSidebar);
