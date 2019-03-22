import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/fp/noop';
import cn from 'classnames';
import get from 'lodash/fp/get';

import { Router } from '../../../routes';
import { CheckMarkIconFilled, MinusIconBoxed, PlusIcon, SearchIcon, PlusIconActive } from '../SVG';
import LinkTo from '../LinkTo';
import ImgFadeIn from '../ImageFadeIn';
import { numberMetricFormat } from '../../utils/helpers';



class StylistsCard extends Component {
    goTo = (e) => {
        e.stopPropagation();

        const link = get('currentTarget.dataset.link', e) || '';

        if (link) {
            Router.pushRoute(link);
        }
    };

    render() {
        const {id, image, title, onAction, link, isFollowed, onActivate, slug, isActive, followersCount, outfitsCount} = this.props;
        const followersNum = numberMetricFormat(followersCount);
        const outfitsNum = numberMetricFormat(outfitsCount);

        return (
            <LinkTo
                to={link}
                data-id={id}
                className={cn('stylists-card', {'is-active': isActive})}
                onTouchEnd={onActivate}
            >
                {onAction && (
                    <span className="stylists-card__btn" data-slug={slug} data-action-unfollow={isFollowed} onClick={onAction}>
                        <div>
                            {isFollowed ? <CheckMarkIconFilled/> : <PlusIcon/>}
                            <span>{isFollowed ? 'Followed' : 'Follow'}</span>
                        </div>
                        <div>
                            {isFollowed ? <MinusIconBoxed/> : <PlusIconActive/>}
                            <span>{isFollowed ? 'Unfollow' : 'Follow stylist'}</span>
                        </div>
                    </span>
                )}

                <ImgFadeIn src={image} alt={title} className="stylists-card__cover"/>

                <div className="stylists-card__details">
                    <div className="stylists-card__title">{title}</div>
                    <div className="stylists-card__more-info">
                        <div className="stylists-card__desc">{followersNum} followers | {outfitsNum} outfits</div>
                        <button type="button" className="btn stylists-card__link" data-link={link}>
                            <SearchIcon/><span>View outfits</span>
                        </button>
                    </div>
                </div>
            </LinkTo>
        );
    }
}

StylistsCard.propTypes = {
    id: PropTypes.number,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    followersCount: PropTypes.number.isRequired,
    outfitsCount: PropTypes.number.isRequired,
    isFollowed: PropTypes.bool.isRequired,
    isActive: PropTypes.bool,
    onActivate: PropTypes.func
};
StylistsCard.defaultProps = {
    isActive: false,
    onActivate: noop
};

export default StylistsCard;
