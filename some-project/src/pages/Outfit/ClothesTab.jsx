import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import get from 'lodash/fp/get';

import Tabs from '../../components/Tabs';
import ClothesItem from './ClothesItem';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { ownItem, openAuthModal } from '../../actions';
import ClothesFilters from './ClothesFilters';
import { defaultFilters, filterByBrand, filterByPrice, filterBySale, filterBySize, sortByPrice, sortBySale } from './outfitPageHelpers';



class ClothesTab extends Component {
    state = {...defaultFilters};

    onItemOwn = (e) => {
        if (!this.props.isLoggedIn) {
            e.preventDefault();
            this.props.openAuthModal();
        } else {
            const id = get('currentTarget.dataset.itemId', e);
            if (id) this.props.ownItem.trigger({id});
        }
    };

    onFilter = (val) => {
        if (val['sizes']) {
            this.setState(({activeSizes}) => ({
                activeSizes: activeSizes.indexOf(val['sizes']) >= 0
                    ? activeSizes.filter((size) => size !== val['sizes'])
                    : [...activeSizes, val['sizes']]
            }));
        }

        if (val['brands']) {
            this.setState(({activeBrands}) => ({
                activeBrands: activeBrands.indexOf(val['brands']) >= 0
                    ? activeBrands.filter((brand) => brand !== val['brands'])
                    : [...activeBrands, val['brands']]
            }));
        }

        if (val['price']) {
            this.setState({activePrices: val['price']});
        }

        if (val['sale']) {
            this.setState({activeSales: val['sale']});
        }
    };

    onSort = (e) => {
        const {name, value} = e.target;
        if (name && value) {
            this.setState({[name]: value});
        }
    };

    filterItems = (item) => {
        return (
            filterByBrand(item, this.state.activeBrands) &&
            filterBySize(item, this.state.activeSizes) &&
            filterByPrice(item, this.state.activePrices) &&
            filterBySale(item, this.state.activeSales)
        );
    };

    sortItems = (a, b) => {
        if (this.state.priceSort && this.state.saleSort) {
            return sortBySale(a, b, this.state.saleSort) || sortByPrice(a, b, this.state.priceSort) || 0;
        }
        if (this.state.priceSort) return sortByPrice(a, b, this.state.priceSort);
        if (this.state.saleSort) return sortBySale(a, b, this.state.saleSort);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.activeTab !== this.props.activeTab) this.setState({...defaultFilters});
    }

    render() {
        const {points, activeTab, toggleTab, className} = this.props;
        const {activeBrands, activeSizes, activePrices, activeSales, priceSort, saleSort} = this.state;
        const curTab = activeTab || String(points[0].id);

        if (points.length < 0) {
            return null;
        }

        return (
            <Tabs activeTab={curTab} className={cn(className)} toggleFn={toggleTab} showSubheader>
                {points.map(({id, items, short_name, icon}) => (
                    <Tabs.Item key={id} id={String(id)}>
                        <Tabs.Header>
                            <img src={icon} alt={short_name}/>
                            <span>{short_name}</span>
                        </Tabs.Header>

                        <Tabs.Filters>
                            {Array.isArray(items) && items.length > 0 && (
                                <ClothesFilters
                                    key={id}
                                    curTab={curTab}
                                    items={items}
                                    activeBrands={activeBrands}
                                    activeSizes={activeSizes}
                                    activePrices={activePrices}
                                    activeSales={activeSales}
                                    priceSort={priceSort}
                                    saleSort={saleSort}
                                    currency="USD"
                                    onSort={this.onSort}
                                    onFilter={this.onFilter}
                                />
                            )}
                        </Tabs.Filters>

                        <Tabs.Body className="with-custom-scroll clothes-intersection-observe">
                            {String(id) === curTab && Array.isArray(items) && items.length > 0 && (
                                <div className="clothes-list">
                                    {items
                                        .filter(this.filterItems)
                                        .sort(this.sortItems)
                                        .map(({pid, brand, sale_price, price, currency, monetized_url, discount, shipping, api_image}) => (
                                            <ClothesItem
                                                key={pid}
                                                pid={pid}
                                                brand={brand}
                                                salePrice={sale_price}
                                                price={price}
                                                currency={currency}
                                                buyUrl={monetized_url}
                                                shipping={shipping}
                                                discount={discount}
                                                img={api_image && api_image.image_280}
                                                onOwn={this.onItemOwn}
                                                observerOptions={{root: '.clothes-intersection-observe'}}
                                            />
                                        ))
                                    }
                                </div>
                            )}
                        </Tabs.Body>
                    </Tabs.Item>
                ))}
            </Tabs>
        );
    }
}

ClothesTab.propTypes = {
    points: PropTypes.array.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    toggleTab: PropTypes.func,
    activeTab: PropTypes.string
};

export default connect(null, mapRoutineCreators({ownItem, openAuthModal}))(ClothesTab);
