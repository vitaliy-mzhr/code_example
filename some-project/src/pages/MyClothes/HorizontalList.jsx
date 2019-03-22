import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import List from '@researchgate/react-intersection-list';

// Components
import ClothesItem from './ClothesItem';
import ContentSlider from '../../components/ContentSlider';
// Config
import { USER_COLLECTION_CLOTHES_PER_PAGE } from '../../config';



class HorizontalList extends Component {
    componentDidUpdate(prevProps) {
        if (
            prevProps.results.length >= USER_COLLECTION_CLOTHES_PER_PAGE &&
            this.props.results.length < USER_COLLECTION_CLOTHES_PER_PAGE
        ) {
            this._handleLoadMore();
        }
    }

    _onIsScrollableChange = (status) => {
        this.props.onIsScrollableChange(status, this.props.clothesType);
    }

    renderItems = (items, ref) => (
        <ContentSlider scrollLength={200} updatesWatcherVal={items.length} className={`${this.props.clothesType}`} onIsScrollableChange={this._onIsScrollableChange}>
            <div className="flex">
                <div className="my-library__group-list is-horizontal" ref={ref}>
                    {items}
                </div>
            </div>
        </ContentSlider>
    );

    renderItem = (index, key) => {
        const {clothesType, onAction, onOwn, onBought, toCart} = this.props;
        const item = get(`results[${index}]`, this.props);
        if (!item) return null;

        const {pid} = item;

        return (
            <ClothesItem
                key={pid}
                pid={pid}
                observerOptions={{rootMargin: '150px 300px 150px 300px', root: `.${clothesType}`}}
                onAction={onAction}
                onOwn={clothesType !== 'owned_list' ? onOwn : null}
                toCart={clothesType === 'owned_list' ? toCart : null}
                onBought={clothesType === 'owned_list' ? onBought : null}
                clothesType={clothesType}
            />
        );
    };

    _handleLoadMore = () => {
        const {clothesType, results} = this.props;
        this.props.handleLoadMore(clothesType, results.length);
    }

    render() {
        const {results, limit} = this.props;

        return (
            <List
                awaitMore={results.length > limit - 1}
                itemsRenderer={this.renderItems}
                itemCount={results.length}
                onIntersection={this._handleLoadMore}
                pageSize={results.length}
                renderItem={this.renderItem}
            />
        );
    }
}

HorizontalList.propTypes = {
    handleLoadMore: PropTypes.func.isRequired,
    onIsScrollableChange: PropTypes.func.isRequired,
    onAction: PropTypes.func,
    onOwn: PropTypes.func,
    toCart: PropTypes.func,
    onBought: PropTypes.func,
    results: PropTypes.array.isRequired,
    limit: PropTypes.number.isRequired,
    clothesType: PropTypes.string.isRequired
};

export default HorizontalList;
