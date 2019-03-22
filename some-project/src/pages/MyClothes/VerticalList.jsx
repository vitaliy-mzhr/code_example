import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Components
import ClothesItem from './ClothesItem';



class VerticalList extends Component {
    _handleLoadMore = () => {
        const {results, clothesType} = this.props;
        this.props.handleLoadMore(clothesType, results.length);
    }

    render() {
        const {results, count, clothesType, onAction, onOwn, onBought, toCart} = this.props;

        return (
            <Fragment>

                <div className={cn('my-library__group-list is-vertical')}>
                    {results &&
                        results.map(({pid}) => (
                            <ClothesItem
                                key={pid}
                                pid={pid}
                                observerOptions={{rootMargin: '400px 0px 400px 0px'}}
                                onAction={onAction}
                                onOwn={clothesType !== 'owned_list' ? onOwn : null}
                                toCart={clothesType === 'owned_list' ? toCart : null}
                                onBought={clothesType === 'owned_list' ? onBought : null}
                                clothesType={clothesType}
                            />
                        ))
                    }
                </div>

                {results.length < count && (
                    <div className="my-outfits__group-btn-container">
                        <button className="btn my-outfits__group-btn" onClick={this._handleLoadMore}>
                            Load more
                        </button>
                    </div>
                )}

            </Fragment>
        );
    }
}

VerticalList.propTypes = {
    handleLoadMore: PropTypes.func.isRequired,
    onAction: PropTypes.func,
    onOwn: PropTypes.func,
    toCart: PropTypes.func,
    onBought: PropTypes.func,
    results: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    clothesType: PropTypes.string.isRequired
};

export default VerticalList;
