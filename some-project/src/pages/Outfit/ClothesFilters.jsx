import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/fp/get';
import getSymbolFromCurrency from 'currency-symbol-map';

import ArrowIcon from '../../components/SVG/ArrowIcon';
import ClothesFilterDropdown from './ClothesFilterDropdown';
import ClothesSortDropdown from './ClothesSortDropdown';



const dropdownRef = React.createRef();

class ClothesFilters extends Component {
    state = {
        curTab: null,
        activeDropdown: null,
        brandsSearchVal: '',
        sizes: [],
        brands: [],
        price: {min: 0, max: 0},
        sale: {min: 0, max: 0}
    };
    listeningClickOutside = false;

    static getDerivedStateFromProps(props, state) {
        if (props.curTab !== state.curTab) {
            const prices = props.items.map((p) => p.sale_price || p.price || null).filter(Boolean);
            const sales = props.items.map((p) => p.discount || null).filter(Boolean);
            return {
                sizes: [...new Set(props.items.reduce((acc, item) => acc.concat(item.sizes), []).filter(Boolean))],
                brands: [...new Set(props.items.map((val) => val.brand).filter(Boolean))],
                price: {
                    min: prices.length > 0 ? Math.floor(Math.min(...prices)) : 0,
                    max: prices.length > 0 ? Math.ceil(Math.max(...prices)) : 0
                },
                sale: {
                    min: sales.length > 0 ? Math.floor(Math.min(...sales)) : 0,
                    max: sales.length > 0 ? Math.ceil(Math.max(...sales)) : 0
                },
                curTab: props.curTab
            };
        }

        return null;
    }

    toggleFilter = (e) => {
        this.unlistenClickOutside();
        const filterDropdown = get('currentTarget.dataset.dropdown', e);
        this.setState(({activeDropdown}) => ({
            activeDropdown: activeDropdown !== filterDropdown ? filterDropdown : null
        }), () => this.state.activeDropdown && this.listenClickOutside());
    };

    choiceHandle = (e) => {
        const filterType = get('currentTarget.dataset.filterType', e);
        const filterChoice = get('currentTarget.dataset.filterChoice', e);

        if (filterType && filterChoice) {
            this.props.onFilter({[filterType]: filterChoice});
        }
    };

    priceRangeHandle = (value) => {
        this.props.onFilter({price: value});
    };

    saleRangeHandle = (value) => {
        const {min, max} = this.state.sale;
        if (min === value[0] && max === value[1]) {
            this.props.onFilter({sale: []});
        } else {
            this.props.onFilter({sale: value});
        }
    };

    searchBrand = (e) => {
        if (e.target.tagName.toLowerCase() === 'input') {
            this.setState({brandsSearchVal: e.target.value});
        } else {
            e.nativeEvent.stopImmediatePropagation();
            this.setState({brandsSearchVal: ''});
        }
    };

    listenClickOutside() {
        if (!this.listeningClickOutside) {
            document.addEventListener('click', this.handleClickOutside);
            this.listeningClickOutside = true;
        }
    }

    unlistenClickOutside() {
        document.removeEventListener('click', this.handleClickOutside);
        this.listeningClickOutside = false;
    }

    handleClickOutside = (event) => {
        const dropdown = get('current.ref.current', dropdownRef);
        if (dropdown && !dropdown.contains(event.target)) {
            this.setState({activeDropdown: null});
            this.unlistenClickOutside();
        }
    };

    componentWillUnmount() {
        this.unlistenClickOutside();
    }

    render() {
        const {activeDropdown, sizes, brands, price, sale, brandsSearchVal} = this.state;
        const {activeSizes, activeBrands, activePrices, activeSales, currency, onSort, priceSort, saleSort} = this.props;
        const currencySymbol = getSymbolFromCurrency(currency) || '$';
        const brandsFiltered = brands.filter(
            (val) => brandsSearchVal ? val.toLowerCase().includes(brandsSearchVal.toLowerCase()) : val
        );

        return (
            <div className="clothes-filters" style={{top: this.state.stickyOffset}}>
                <div
                    className={cn('clothes-filters__group', {'is-active': activeDropdown === 'filter'})}
                    data-dropdown="filter"
                    onClick={this.toggleFilter}
                >
                    <span>Filter<span> By</span></span>
                    <ArrowIcon/>
                </div>

                <div
                    className={cn('clothes-filters__group', {'is-active': activeDropdown === 'sort'})}
                    data-dropdown="sort"
                    onClick={this.toggleFilter}
                >
                    <span>Sort<span> By</span></span>
                    <ArrowIcon/>
                </div>

                {activeDropdown === 'filter' && (
                    <ClothesFilterDropdown
                        ref={dropdownRef}
                        key={activeDropdown}
                        activeSizes={activeSizes}
                        activeBrands={activeBrands}
                        activePrices={activePrices}
                        activeSales={activeSales}
                        sizes={sizes}
                        brands={brandsFiltered}
                        price={price}
                        sale={sale}
                        brandsSearchVal={brandsSearchVal}
                        currencySymbol={currencySymbol}
                        searchBrand={this.searchBrand}
                        onChoiceChange={this.choiceHandle}
                        onPriceChange={this.priceRangeHandle}
                        onSaleChange={this.saleRangeHandle}
                    />
                )}

                {activeDropdown === 'sort' &&
                    <ClothesSortDropdown
                        key={activeDropdown}
                        ref={dropdownRef}
                        onSort={onSort}
                        priceSort={priceSort}
                        saleSort={saleSort}
                    />
                }
            </div>
        );
    }
}

ClothesFilters.propTypes = {
    items: PropTypes.array.isRequired,
    onFilter: PropTypes.func,
    activeSizes: PropTypes.array,
    activeBrands: PropTypes.array,
    activePrices: PropTypes.array,
    activeSales: PropTypes.array,
    currency: PropTypes.string,
    priceSort: PropTypes.string,
    saleSort: PropTypes.string,
    onSort: PropTypes.func
};

export default ClothesFilters;
