import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import CategoryCard from '../../components/CategoryCard';
import withIntersectionObserver from '../../HOC/withIntersectionObserver';



class CollectionsTabItem extends Component {
    render() {
        const {isActive, onActivate, isVisible, id, name, slug, short_description, added, image, viewed} = this.props;
        const collectionParent = `${name} Occasions`;

        return (
            <div className={cn('outfit-collections__item with-entrance', {'is-entered': isVisible})}>
                {isVisible &&
                    <CategoryCard
                        id={id}
                        viewed={viewed}
                        slug={slug}
                        title={name}
                        image={image}
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

CollectionsTabItem.propTypes = {
    onActivate: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
    added: PropTypes.bool,
    image: PropTypes.string.isRequired,
    viewed: PropTypes.bool
};
CollectionsTabItem.defaultProps = {
    isActive: false,
    added: false,
    viewed: false
};

export default withIntersectionObserver()(CollectionsTabItem);
