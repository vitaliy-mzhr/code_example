import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';

import withIntersectionObserver from '../../HOC/withIntersectionObserver';
import ClothesCard from '../../components/ClothesCard';



class ClothesItem extends Component {
    _onItemAction = () => {
        const {clothesType, clothesItem} = this.props;
        if (clothesItem) {
            const {pid, saved} = clothesItem;
            this.props.onAction(pid, clothesType, saved);
        }
    }

    render() {
        const {isVisible, clothesType, onOwn, onBought, toCart, clothesItem} = this.props;
        if (!clothesItem) return null;

        const {
            pid, brand, sale_price, price, currency, monetized_url, discount, shipping, api_image,
            finally_bought, saved, in_stock
        } = clothesItem;

        return (
            <div className="my-library__list-item">
                {isVisible && (
                    <ClothesCard
                        pid={pid}
                        brand={brand}
                        salePrice={sale_price}
                        price={price}
                        currency={currency}
                        buyUrl={monetized_url || ''}
                        shipping={shipping}
                        discount={discount}
                        img={api_image && api_image.image_280}
                        onAction={this._onItemAction}
                        onOwn={onOwn}
                        toCart={toCart}
                        onBought={onBought}
                        isSaved={saved}
                        isBought={finally_bought}
                        soldOut={!in_stock}
                        isCompact={clothesType === 'owned_list'}
                    />
                )}
            </div>
        );
    }
}

function mapStateToProps({userClothes: { clothes }}, ownProps) {
    const { pid, clothesType, onAction, onOwn, onBought, toCart } = ownProps;
    const results = get(`[${clothesType}]results`, clothes);
    let clothesItem = null;
    if (results) clothesItem = results.find(({ pid: _pid }) => pid === _pid);
    return { clothesItem, clothesType, onAction, onOwn, onBought, toCart};
}

export default compose(
    withIntersectionObserver(),
    connect(mapStateToProps),
)(ClothesItem);
