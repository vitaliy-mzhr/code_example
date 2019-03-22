import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import LSHeader from '../../components/LSHeader';
import { ArrowIcon } from '../../components/SVG';
import LinkTo from '../../components/LinkTo';
import ScrollToAnimated from '../../components/ScrollToAnimated';
import withScrollOverObserver from '../../HOC/withScrollOverObserver';



const headerRef = React.createRef();

class StylistsSidebar extends Component {
    getScrollOffset() {
        const headerCoords = headerRef.current.getBoundingClientRect();
        return -(headerCoords.top + headerCoords.height);
    }

    render() {
        const {data: {name, long_description, page_cta, collections = []}, isScrolledOver} = this.props;

        return (
            <Fragment>
                <LSHeader title={name} withBorder={isScrolledOver} ref={headerRef}/>

                <hr className="left-sidebar__hr--high"/>

                <div className="scrollable with-custom-scroll left-sidebar__content stylists-sidebar">
                    <div className="left-sidebar__desc">{long_description}</div>

                    <div className="text-center">
                        <ScrollToAnimated targetQuery=".page-content" offset={this.getScrollOffset} duration={300}>
                            <button type="button" className="left-sidebar__cta-btn btn btn__with-icon btn__inverted">
                                <span>{page_cta || 'Select your stylist'}</span><ArrowIcon/>
                            </button>
                        </ScrollToAnimated>
                    </div>

                    <div className="stylists-sidebar__collections">
                        <div className="stylists-sidebar__collections-count">
                            <strong>{collections.length} stylists:</strong>
                        </div>
                        <div className="stylists-sidebar__collections-list scrollable with-custom-scroll">
                            {collections.map(({id, name, slug}) => (
                                <div key={id}>
                                    <LinkTo key={id} to={`/stylists/${slug}`}>{name}</LinkTo>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps({stylists}) {
    return {...stylists};
}

export default compose(
    withScrollOverObserver('.ls-header', '.stylists-page', 0.5, 767),
    connect(mapStateToProps)
)(StylistsSidebar);
