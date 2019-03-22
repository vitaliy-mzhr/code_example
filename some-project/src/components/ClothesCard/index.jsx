import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getSymbolFromCurrency from 'currency-symbol-map';
import cn from 'classnames';

import LinkTo, { LinkToVerbose } from '../LinkTo';
import ImgFadeIn from '../ImageFadeIn';
import { CheckMarkIcon, CrossIcon, ExitIcon, HeartIcon, HeartIconFilled, SaleTagIcon, DollarIconFilled } from '../SVG';



class ClothesCard extends Component {
    render() {
        const {
            pid, brand, salePrice, price, currency, buyUrl, shipping, img, isSaved,
            discount, onAction, onOwn, onBought, toCart, isBought, soldOut, isCompact
        } = this.props;

        const currencySymbol = getSymbolFromCurrency(currency) || '$';

        return (
            <div className={cn('clothes-card', {'is-compact': isCompact})}>
                <LinkTo className="clothes-card__link" to={`/item/${pid}`}>
                    <ImgFadeIn src={img} alt={brand} className="clothes-card__cover" withPlaceholder={false}/>

                    {isBought &&
                        <span className="clothes-card__tags">
                            <span><DollarIconFilled/><span>From Portefini</span></span>
                        </span>
                    }
                </LinkTo>

                <div className="clothes-card__details">
                    <div className="clothes-card__title">{brand}</div>

                    {!isCompact && (
                        <div className="clothes-card__prices">
                            {price && salePrice && <div className="clothes-card__start-price">{currencySymbol}{price}</div>}
                            {discount && <div className="clothes-card__discount">({discount}% off)</div>}
                            {(salePrice || price) && (
                                <div className="clothes-card__sale-price">
                                    <span>{currencySymbol}{salePrice || price}</span>
                                    <SaleTagIcon/>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {(shipping === 'FreeShipping' || soldOut) &&
                    <span className="clothes-card__shipping">
                        {soldOut && <span className="is-inverted">Sold out</span>}
                        {shipping === 'FreeShipping' && <span>Free Shipping</span>}
                    </span>
                }

                {onAction && (
                    <span className="clothes-buttons__like-btn" data-item-id={pid} data-action-remove={isSaved} onClick={onAction}>
                        {isSaved ? <HeartIconFilled/> : <HeartIcon/>}
                    </span>
                )}

                {onOwn && !isBought && !soldOut && (
                    <LinkTo
                        to={buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn__with-icon clothes-buttons__buy-link"
                        data-item-id={pid}
                        onClick={onOwn}
                    >
                        <span>Buy</span>
                        <ExitIcon/>
                    </LinkTo>
                )}

                {soldOut && (
                    <LinkToVerbose
                        to={`/item/${pid}`}
                        page="item"
                        params={{showSimilar: true, itemId: pid}}
                        className="btn btn__with-icon clothes-buttons__buy-link"
                    >
                        <span>See similar items</span>
                    </LinkToVerbose>
                )}

                {toCart && onBought && !isBought && (
                    <div className="btn clothes-buttons__buy-confirm">
                        <div className="clothes-buttons__confirm-label">Finally bought it?</div>
                        <div className="clothes-buttons__confirm-btns">
                            <span data-item-id={pid} onClick={onBought}><CheckMarkIcon/> Yes</span>
                            <span data-item-id={pid} onClick={toCart}><CrossIcon/> No</span>
                        </div>
                    </div>
                )}

                {toCart && isBought && (
                    <div className="btn clothes-buttons__discard-buy" data-item-id={pid} onClick={toCart}>
                        I did not buy this item
                    </div>
                )}
            </div>
        );
    }
}

ClothesCard.propTypes = {
    pid: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    salePrice: PropTypes.number,
    discount: PropTypes.number,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string,
    buyUrl: PropTypes.string.isRequired,
    shipping: PropTypes.string,
    img: PropTypes.string.isRequired,
    isSaved: PropTypes.bool,
    isBought: PropTypes.bool,
    soldOut: PropTypes.bool,
    isCompact: PropTypes.bool,
    onAction: PropTypes.func,
    onOwn: PropTypes.func,
    toCart: PropTypes.func,
    onBought: PropTypes.func
};
ClothesCard.defaultProps = {
    currency: 'USD',
    isSaved: false,
    soldOut: false,
    isCompact: false,
    isBought: false
};

export default ClothesCard;
