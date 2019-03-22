import React, {Component} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import get from 'lodash/fp/get';

import Choice from '../../Choice';
import { ArrowIcon } from '../../SVG';
import withLSFiltersLogic from '../../../HOC/withLSFiltersLogic';
import { withDimensionObserver } from '../../../context/Dimension';
import { toggleCollectionMode } from '../../../actions';
import { COLLECTION_LAYOUT } from '../../../config';



class LSFiltersMob extends Component {
    state = {
        activeFilterGroup: null,
        stickyOffset: 0
    };

    componentDidMount() {
        if (this.props.vw && this.props.vw <= 767) {
            this.getStickyOffset();
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevProps.vw !== this.props.vw && this.props.vw <= 767) {
            this.getStickyOffset();
        }
    }

    getStickyOffset() {
        const header = document.querySelector('.ls-header');
        if (header) {
            const coords = header.getBoundingClientRect();
            this.setState({stickyOffset: coords.top + coords.height});
        }
    }

    toggleFilterGroup = (e) => {
        const filterGroup = get('currentTarget.dataset.filterGroup', e) || null;
        this.setState(({activeFilterGroup}) => ({
            activeFilterGroup: activeFilterGroup !== filterGroup ? filterGroup : null
        }));
    };

    changeMode = (e) => {
        const layoutMode = get('currentTarget.dataset.layoutMode', e) || null;
        if (layoutMode && this.props.wideMode !== layoutMode) {
            this.props.toggleCollectionMode(layoutMode);
        }
    };

    render() {
        const {wideMode, filters, filterHandle, isLoadingData, isLoadingOutfits} = this.props;
        const {activeFilterGroup} = this.state;

        return (
            <div className="ls-filters-mob" style={{top: this.state.stickyOffset}}>
                <div className="ls-filters-mob__head">
                    <div className="ls-filters-mob__label">
                        <strong>Filter by:</strong>
                    </div>

                    <div className="ls-filters-mob__groups">
                        {filters.map(({name, display_name}) => (
                            <div
                                key={name}
                                className={cn('ls-filters-mob__group', {'is-active': activeFilterGroup === name})}
                                data-filter-group={name}
                                onClick={this.toggleFilterGroup}
                            >
                                <span>{display_name}</span>
                                <ArrowIcon/>
                            </div>
                        ))}
                    </div>

                    <div className="flex">
                        <div
                            data-layout-mode={COLLECTION_LAYOUT.WIDE}
                            className={cn('ls-filters-mob__layout-btn', {'is-active': wideMode === COLLECTION_LAYOUT.WIDE})}
                            onClick={this.changeMode}
                        >
                            <span/><span/>
                        </div>

                        <div
                            data-layout-mode={COLLECTION_LAYOUT.NARROW}
                            className={cn('ls-filters-mob__layout-btn', {'is-active': wideMode === COLLECTION_LAYOUT.NARROW})}
                            onClick={this.changeMode}
                        >
                            <span/><span/><span/><span/>
                        </div>
                    </div>
                </div>

                <div key={activeFilterGroup} className={cn('ls-filters-mob__dropdown', {'is-active': activeFilterGroup})}>
                    {filters.map(({choices, name: groupName, display_name, selected}) => (
                        <div
                            key={groupName}
                            className={cn('ls-filters-mob__choices', {
                                'is-large': choices.length > 3,
                                'is-active': choices.length && activeFilterGroup === groupName
                            })}
                        >

                            {choices.map(({name: choiceName, color, icon}) => (
                                <Choice
                                    key={choiceName}
                                    label={choiceName}
                                    id={choiceName}
                                    name={choiceName}
                                    onChange={filterHandle}
                                    disabled={isLoadingData || isLoadingOutfits}
                                    data-filter-group={groupName}
                                    data-filter-choice={choiceName}
                                    checked={selected.indexOf(choiceName) >= 0}
                                    color={color}
                                    icon={icon}
                                />
                            ))}

                        </div>
                    ))}
                </div>

                <div className="ls-filters-mob__overlay" onClick={this.toggleFilterGroup}/>
            </div>
        );
    }
}

function mapStateToProps({collection}) {
    return {
        wideMode: collection.wideMode,
        isLoadingData: collection.isLoadingData,
        isLoadingOutfits: collection.isLoadingOutfits,
    };
}

export default compose(
    withLSFiltersLogic,
    withDimensionObserver,
    connect(mapStateToProps, {toggleCollectionMode})
)(LSFiltersMob);
