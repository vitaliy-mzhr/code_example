import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import LSHeader from '../../components/LSHeader';
import { ArrowIcon } from '../../components/SVG';
import LinkTo from '../../components/LinkTo';
import ScrollToAnimated from '../../components/ScrollToAnimated';
import withScrollOverObserver from '../../HOC/withScrollOverObserver';



const headerRef = React.createRef();

class CategorySidebar extends Component {
    getScrollOffset() {
        const headerCoords = headerRef.current.getBoundingClientRect();
        return -(headerCoords.top + headerCoords.height);
    }

    render() {
        const {data: {name, category_type, long_description, page_cta, collections = []}, isScrolledOver} = this.props;
        const countLabel = category_type && category_type.toLowerCase() === 'styles' ? 'style collections' : 'occasions';

        return (
            <Fragment>
                <LSHeader title={name} subtitle={category_type} withBorder={isScrolledOver} ref={headerRef}/>

                <hr/>

                <div className="scrollable with-custom-scroll left-sidebar__content category-sidebar">
                    <div className="left-sidebar__desc">{long_description}</div>

                    <div className="text-center">
                        <ScrollToAnimated targetQuery=".page-content" offset={this.getScrollOffset} duration={300}>
                            <button type="button" className="left-sidebar__cta-btn btn btn__with-icon btn__inverted">
                                <span>{page_cta}</span><ArrowIcon/>
                            </button>
                        </ScrollToAnimated>
                    </div>

                    <div className="category-sidebar__collections">
                        <div className="category-sidebar__collections-count">
                            <strong>{collections.length} {countLabel}:</strong>
                        </div>
                        <div className="category-sidebar__collections-list scrollable with-custom-scroll">
                            {collections.map(({id, name, slug}) => (
                                <div key={id}>
                                    <LinkTo key={id} to={`/collections/${slug}`}>{name}</LinkTo>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps({category}) {
    return {...category};
}

export default compose(
    withScrollOverObserver('.ls-header', '.category-page', 0.5, 767),
    connect(mapStateToProps)
)(CategorySidebar);
