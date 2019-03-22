import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';
import List from '@researchgate/react-intersection-list';
import cn from 'classnames';

import OutfitCard from '../../components/OutfitCard';
import { withDimensionObserver } from '../../context/Dimension';
import LoopMeInContainer from '../../containers/LoopMeInContainer';
import LSFiltersMob from '../../components/Filters/LSFiltersMob';
import withClientReady from '../../HOC/withClientReady';
import { COLLECTION_LAYOUT } from '../../config';
import scrollTo from '../../utils/scrollTo';



class Collection extends Component {
    state = {
        threshold: this.getThresholdSize()
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {wideMode, vw, outfits: {filtersQuery}, isClientReady} = this.props;

        if ((prevProps.outfits.filtersQuery !== filtersQuery || prevProps.wideMode !== wideMode) && process.browser) {
            if (vw > 767) {
                window.scrollTo(0,0);
            } else {
                const page = document.querySelector('.page-content');
                page && scrollTo(window, page, 0, 0);
            }
        }

        if (prevProps.vw !== vw || prevProps.isClientReady !== isClientReady) {
            this.setState({threshold: this.getThresholdSize()});
        }
    }

    getThresholdSize() {
        const { vw, isClientReady } = this.props;
        if (!isClientReady) {
            return 300;
        }

        if (vw > 767) {
            return Math.max(150, (vw - 600) / 1.6);
        } else {
            return Math.max(150, vw / 1.4);
        }
    }

    handleLoadMore = () => {
        const {getCollectionOutfits, data: {slug}, outfits: {offset, limit, filtersQuery}, isLoadingOutfits} = this.props;

        if (!isLoadingOutfits) {
            getCollectionOutfits({
                slug,
                offset: offset + limit,
                limit,
                filtersQuery,
                loadMore: true
            });
        }
    };

    renderItems = (items, ref) => (
        <div className={cn('collection', {'wide-mode': this.props.wideMode === COLLECTION_LAYOUT.WIDE})} ref={ref}>
            {items}
        </div>
    );

    renderItem = (index, key) => {
        const item = get(`outfits.results[${index}]`, this.props);
        if (!item) return null;

        const {api_image, outfit_id} = item;
        const {vw, isClientReady, outfits_cards_cta} = this.props;
        const nth = this.props.wideMode === COLLECTION_LAYOUT.WIDE ? 14 : 22;
        let loopMeIn = null;

        const cardItem = (
            <div className="collection__item">
                <OutfitCard
                    image={api_image.image_600x600}
                    id={outfit_id}
                    observerOptions={{rootMargin: '400px 0px 400px 0px'}}
                    label={outfits_cards_cta}
                />
            </div>
        );

        if ((vw > 767 && index > 21 && !(index % 20)) ||
            (isClientReady && vw <= 767 && index > 0 && !(index % nth))) {
            loopMeIn = (
                <div className="collection__loop-me-in">
                    <LoopMeInContainer messageType="float"/>
                </div>
            );
        }

        return <Fragment key={key}>{loopMeIn}{cardItem}</Fragment>;
    };

    render() {
        const {outfits: {results = [], limit, filtersQuery}, vw, isClientReady, wideMode, getCollectionOutfits} = this.props;

        return (
            <Fragment>
                {isClientReady && (vw <= 767) && <LSFiltersMob onFilter={getCollectionOutfits}/>}

                <List
                    key={`${filtersQuery}${wideMode}`}
                    awaitMore={results.length > limit - 1}
                    itemsRenderer={this.renderItems}
                    itemCount={results.length}
                    onIntersection={this.handleLoadMore}
                    pageSize={limit}
                    renderItem={this.renderItem}
                    threshold={`${this.state.threshold}px`}
                />
            </Fragment>
        );
    }
}

Collection.propTypes = {
    getCollectionOutfits: PropTypes.func.isRequired
};

function mapStateToProps({collection}) {
    return {...collection};
}

export default compose(
    withClientReady,
    withDimensionObserver,
    connect(mapStateToProps)
)(Collection);
