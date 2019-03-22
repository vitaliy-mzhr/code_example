import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CategoryCard from '../../components/CategoryCard';
import withIntersectionObserver from '../../HOC/withIntersectionObserver';



class CollectionsListItem extends Component {
    render() {
        const {isActive, onActivate, onAction, isVisible, categoryType, categoryName} = this.props;
        const {id, name, slug, short_description, added, api_image, viewed} = this.props.params;

        const collectionParent = categoryName && categoryType ? `${categoryName} ${categoryType}`: '';

        return (
            <div className="my-library__list-item">
                {isVisible &&
                    <CategoryCard
                        id={id}
                        viewed={viewed}
                        slug={slug}
                        title={name}
                        image={api_image.height_420}
                        link={`/collections/${slug}`}
                        desc={short_description}
                        isAdded={added}
                        isActive={isActive}
                        onActivate={onActivate}
                        onAction={onAction}
                        linkData={{collectionParent, collectionSlug: slug}}
                    />
                }
            </div>
        );
    }
}

CollectionsListItem.propTypes = {
    params: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired,
    onActivate: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    categoryName: PropTypes.string,
    categoryType: PropTypes.string
};
CollectionsListItem.defaultProps = {
    isActive: false,
    categoryType: '',
    categoryName: ''
};

export default withIntersectionObserver()(CollectionsListItem);
