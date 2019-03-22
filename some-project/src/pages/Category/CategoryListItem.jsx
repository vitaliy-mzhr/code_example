import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import CategoryCard from '../../components/CategoryCard';
import withIntersectionObserver from '../../HOC/withIntersectionObserver';



class CategoryListItem extends Component {
    render() {
        const {isActive, onActivate, isVisible, categoryType, categoryName} = this.props;
        const {id, name, slug, short_description, added, api_image, viewed} = this.props.params;

        const collectionParent = categoryName && categoryType ? `${categoryName} ${categoryType}`: '';

        return (
            <div className={cn('masonry__item with-entrance', {'is-entered': isVisible})}>
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
                        linkData={{collectionParent, collectionSlug: slug}}
                    />
                }
            </div>
        );
    }
}

CategoryListItem.propTypes = {
    params: PropTypes.object.isRequired,
    onAction: PropTypes.func,
    onActivate: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    categoryName: PropTypes.string,
    categoryType: PropTypes.string
};
CategoryListItem.defaultProps = {
    isActive: false,
    categoryType: '',
    categoryName: ''
};

export default withIntersectionObserver({once: true, threshold: 0.1})(CategoryListItem);
