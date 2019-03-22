import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import set from 'lodash/fp/set';

import { COLLECTION_OUTFITS_PER_PAGE } from '../config';



const withLSFiltersLogic = (BaseComponent) => {
    const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';

    class BaseComponentWrapper extends Component {
        static displayName = `withLSFiltersLogic(${displayName})`;

        static propTypes = {
            onFilter: PropTypes.func.isRequired
        };

        state = {
            collectionId: null,
            filters: []
        };

        static getDerivedStateFromProps(props, state) {
            if (props.collectionId !== state.collectionId) {
                const {filters} = props;
                const _filters = Array.isArray(filters) ? filters.map((val) => ({...val, selected: []})) : [];

                return {
                    collectionId: props.collectionId,
                    filters: _filters
                };
            }

            return null;
        }

        componentDidMount() {
            const {chosenFilters} = this.props;
            if (chosenFilters.length) {
                this.setState((prevState) => ({
                    filters: prevState.filters.map((filter) => {
                        const index = chosenFilters.findIndex((val) => val.name === filter.name);
                        if (index >= 0) {
                            filter.selected = [...filter.selected, ...chosenFilters[index].selected];
                        }
                        return filter;
                    })
                }));
            }
        }

        getFilterChoices = () => {
            const filters = this.state.filters.map((filter) => ({
                name: filter.name,
                selected: filter.selected
            })).filter((filter) => filter.selected.length);

            const queryItems = [];

            for (let i = 0, filtersL = filters.length; i < filtersL; i++) {
                const filterGroup = filters[i];
                for (let j = 0, selectedL = filterGroup.selected.length; j < selectedL; j++) {
                    queryItems.push(`${filterGroup.name}=${filterGroup.selected[j]}`);
                }
            }

            return [filters, queryItems.join('&')];
        };

        filterHandleChange = (e) => {
            const filterGroup = get('target.dataset.filterGroup', e) || null;
            const filterChoice = get('target.dataset.filterChoice', e) || null;

            if (filterGroup && filterChoice) {
                const filterIndex = this.state.filters.findIndex((val) => val.name === filterGroup);

                if (filterIndex >= 0) {
                    const filterSelected = this.state.filters[filterIndex].selected.indexOf(filterChoice) === -1
                        ? [...this.state.filters[filterIndex].selected, filterChoice]
                        : this.state.filters[filterIndex].selected.filter((val) => val !== filterChoice);

                    const {slug, onFilter} = this.props;

                    this.setState({
                        filters: set(`[${filterIndex}].selected`, filterSelected, this.state.filters)
                    }, () => {
                        const [chosenFilters, filtersQuery] = this.getFilterChoices();
                        onFilter({
                            slug,
                            offset: 0,
                            limit: COLLECTION_OUTFITS_PER_PAGE,
                            filtersQuery: filtersQuery ? `?${filtersQuery}` : '',
                            chosenFilters
                        });
                    });
                }
            }
        };

        render() {
            return <BaseComponent filters={this.state.filters} filterHandle={this.filterHandleChange}/>;
        }
    }

    function mapStateToProps({collection}) {
        return {
            ...collection.data,
            chosenFilters: collection.outfits.chosenFilters || [],
            isLoadingOutfits: collection.isLoadingOutfits
        };
    }

    return connect(mapStateToProps)(BaseComponentWrapper);
};

export default withLSFiltersLogic;
