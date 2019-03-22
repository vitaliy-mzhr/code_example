import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import List from '@researchgate/react-intersection-list';

// Components
import OutfitCard from '../../components/OutfitCard';
import ContentSlider from '../../components/ContentSlider';



class HorizontalList extends Component {
    _onIsScrollableChange = (status) => {
        this.props.onIsScrollableChange(status, this.props.outfitsType);
    }

    renderItems = (items, ref) => (
        <ContentSlider scrollLength={216} updatesWatcherVal={items.length} className={`${this.props.outfitsType}`} onIsScrollableChange={this._onIsScrollableChange}>
            <div className="flex">
                <div className="my-library__group-list" ref={ref}>
                    {items}
                </div>
            </div>
        </ContentSlider>
    );

    renderItem = (index, key) => {
        const item = get(`results[${index}]`, this.props);
        if (!item) return null;

        const {api_image, outfit_id} = item;

        return (
            <div className="my-library__list-item" key={key}>
                <OutfitCard
                    image={api_image.image_600x600}
                    id={outfit_id}
                    observerOptions={{rootMargin: '150px 300px 150px 300px', root: `.${this.props.outfitsType}`}}
                />
            </div>
        );
    };

    _handleLoadMore = () => {
        const {outfitsType, results} = this.props;
        this.props.handleLoadMore(outfitsType, results.length);
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
    results: PropTypes.array.isRequired,
    limit: PropTypes.number.isRequired,
    outfitsType: PropTypes.string.isRequired
};

export default HorizontalList;
