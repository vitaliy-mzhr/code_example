import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import StylistsCard from '../../components/StylistsCard';
import withIntersectionObserver from '../../HOC/withIntersectionObserver';



class StylistsListItem extends Component {
    render() {
        const {isActive, onActivate, isVisible} = this.props;
        const {id, name, slug, api_image, outfits_amount, no_followers, followed} = this.props.params;

        return (
            <div className={cn('masonry__item with-entrance', {'is-entered': isVisible})}>
                {isVisible &&
                    <StylistsCard
                        id={id}
                        slug={slug}
                        title={name}
                        image={api_image && api_image.height_420}
                        followersCount={no_followers}
                        outfitsCount={outfits_amount}
                        link={`/stylists/${slug}`}
                        isFollowed={followed}
                        isActive={isActive}
                        onActivate={onActivate}
                    />
                }
            </div>
        );
    }
}

StylistsListItem.propTypes = {
    params: PropTypes.object.isRequired,
    onAction: PropTypes.func,
    onActivate: PropTypes.func.isRequired,
    isActive: PropTypes.bool
};

export default withIntersectionObserver({once: true, threshold: 0.1})(StylistsListItem);
