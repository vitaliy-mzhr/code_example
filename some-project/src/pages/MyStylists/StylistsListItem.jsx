import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import StylistsCard from '../../components/StylistsCard';
import withIntersectionObserver from '../../HOC/withIntersectionObserver';



class StylistsListItem extends Component {
    render() {
        const {isActive, onActivate, onAction, isVisible} = this.props;
        const {id, name, slug, api_image, outfits_amount, no_followers, followed} = this.props.params;

        return (
            <div className="my-library__list-item">
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
                        onAction={onAction}
                    />
                }
            </div>
        );
    }
}

StylistsListItem.propTypes = {
    params: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired,
    onActivate: PropTypes.func.isRequired,
    isActive: PropTypes.bool
};

StylistsListItem.defaultProps = {
    isActive: false,
};

export default withIntersectionObserver()(StylistsListItem);
