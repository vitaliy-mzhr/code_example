import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import {
    getUserClothesInCartList, getUserClothesSavedList, getUserClothesViewedList,
    getUserClothesOwnedList, saveItem, removeItem, ownItem, inCartItem, boughtItem
} from '../../actions';
// Components
import GroupHeader from '../../components/MyLibrary/GroupHeader';
import HorizontalList from './HorizontalList';
import VerticalList from './VerticalList';
// Config
import { USER_COLLECTION_CLOTHES_PER_PAGE } from '../../config';



class MyClothes extends Component {
    state = {
        isGridMode: {
            in_cart_list: false,
            saved_list: false,
            viewed_list: false,
            owned_list: false
        },
        showModeBtn: {
            in_cart_list: false,
            saved_list: false,
            viewed_list: false,
            owned_list: false
        },
    };

    handleLoadMore = (clothesType, offset) => {
        const limit = USER_COLLECTION_CLOTHES_PER_PAGE;

        switch (clothesType) {
            case 'in_cart_list':
                this.props.getUserClothesInCartList.trigger({ offset, limit });
                break;
            case 'saved_list':
                this.props.getUserClothesSavedList.trigger({ offset, limit });
                break;
            case 'viewed_list':
                this.props.getUserClothesViewedList.trigger({ offset, limit });
                break;
            case 'owned_list':
                this.props.getUserClothesOwnedList.trigger({ offset, limit });
                break;
            default:
                break;
        }
    };

    changeMode = (key, status) => {
        const isGridMode = {...this.state.isGridMode};
        isGridMode[key] = status;
        this.setState({isGridMode});
    }

    onItemOwn = (e) => {
        const id = get('currentTarget.dataset.itemId', e);
        if (id) this.props.ownItem.trigger({id});
    };

    onItemAction = (id, clothesType, saved) => {
        const action = saved ? 'removeItem' : 'saveItem';
        this.props[action].trigger({id, clothesType});
    };

    onItemToCart = (e) => {
        const id = get('currentTarget.dataset.itemId', e);
        if (id) this.props.inCartItem.trigger({id});
    }

    onItemBought = (e) => {
        const id = get('currentTarget.dataset.itemId', e);
        if (id) this.props.boughtItem.trigger({id});
    }

    onIsScrollableChange = (status, clothesType) => {
        this.setState((prevState) => ({
            ...prevState,
            showModeBtn: {
                ...prevState.showModeBtn,
                [clothesType]: status
            }
        }));
    }

    render() {
        const {clothes} = this.props;
        const { isGridMode, showModeBtn } = this.state;

        return (
            <div className="my-library my-clothes">
                <div className="my-library__content">
                    <h1>My Clothes</h1>

                    {Object.entries(clothes).map(([clothesType, { results, count } ]) =>
                        Array.isArray(results) && results.length > 0 && (
                            <div key={clothesType} className="my-library__group">

                                <GroupHeader
                                    pageType="clothes"
                                    changeMode={this.changeMode}
                                    titleType={clothesType}
                                    isGridMode={isGridMode[clothesType]}
                                    showModeBtn={showModeBtn[clothesType]}
                                />

                                {isGridMode[clothesType] && (
                                    <VerticalList
                                        handleLoadMore={this.handleLoadMore}
                                        results={results}
                                        count={count}
                                        clothesType={clothesType}
                                        onAction={this.onItemAction}
                                        onOwn={this.onItemOwn}
                                        toCart={this.onItemToCart}
                                        onBought={this.onItemBought}
                                    />
                                )}

                                {!isGridMode[clothesType] && (
                                    <HorizontalList
                                        handleLoadMore={this.handleLoadMore}
                                        onIsScrollableChange={this.onIsScrollableChange}
                                        results={results}
                                        limit={USER_COLLECTION_CLOTHES_PER_PAGE}
                                        clothesType={clothesType}
                                        onAction={this.onItemAction}
                                        onOwn={this.onItemOwn}
                                        toCart={this.onItemToCart}
                                        onBought={this.onItemBought}
                                    />
                                )}

                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps({userClothes: { clothes }}) {
    return {clothes};
}

export default connect(
    mapStateToProps,
    mapRoutineCreators({
        getUserClothesInCartList, getUserClothesSavedList, getUserClothesViewedList,
        getUserClothesOwnedList, saveItem, removeItem, ownItem, inCartItem, boughtItem
    })
)(MyClothes);
