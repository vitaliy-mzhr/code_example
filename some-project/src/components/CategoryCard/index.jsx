import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/fp/noop';
import cn from 'classnames';

import { Router } from '../../../routes';
import { CheckMarkIconFilled, MinusIconBoxed, PlusIcon, SearchIcon, EyeIcon, CheckMarkIcon, PlusIconActive } from '../SVG';
import { LinkToVerbose } from '../LinkTo';
import ImgFadeIn from '../ImageFadeIn';



class CategoryCard extends Component {
    goTo = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const {link, linkData} = this.props;
        if (link) {
            Router.push({
                pathname: '/categoryCollection',
                query: linkData,
            }, link);
        }
    };

    render() {
        const {id, image, title, desc, onAction, link, isAdded, onActivate, slug, isActive, viewed, linkData} = this.props;

        return (
            <LinkToVerbose
                to={link}
                page="categoryCollection"
                params={linkData}
                data-id={id}
                className={cn('category-card', {'is-active': isActive})}
                onTouchEnd={onActivate}
            >
                {onAction && (
                    <span className="category-card__btn" data-slug={slug} data-action-remove={isAdded} onClick={onAction}>
                        <div>
                            {isAdded ? <CheckMarkIconFilled/> : <PlusIcon/>}
                            <span>{isAdded ? 'Added' : 'Add'}</span>
                        </div>
                        <div>
                            {isAdded ? <MinusIconBoxed/> : <PlusIconActive/>}
                            <span>{isAdded ? 'Remove from My Collection' : 'Add to My Collection'}</span>
                        </div>
                    </span>
                )}

                <ImgFadeIn src={image} alt={title} className="category-card__cover"/>

                {(viewed || isAdded) &&
                    <span className="category-card__status">
                        {viewed && <span><EyeIcon/><span>Viewed</span></span>}
                        {isAdded && <span><CheckMarkIcon/><span>Added</span></span>}
                    </span>
                }

                <div className="category-card__details">
                    <div className="category-card__title">{title}</div>
                    <div className="category-card__more-info">
                        <hr/>
                        <div className="category-card__desc">{desc}</div>
                        <button type="button" className="btn category-card__link">
                            <SearchIcon/><span>View outfits</span>
                        </button>
                    </div>
                </div>
            </LinkToVerbose>
        );
    }
}

CategoryCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    slug: PropTypes.string,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    isAdded: PropTypes.bool.isRequired,
    isActive: PropTypes.bool,
    linkData: PropTypes.object,
    viewed: PropTypes.bool,
    onAction: PropTypes.func,
    onActivate: PropTypes.func
};
CategoryCard.defaultProps = {
    isActive: false,
    viewed: false,
    linkData: {},
    onActivate: noop
};

export default CategoryCard;
