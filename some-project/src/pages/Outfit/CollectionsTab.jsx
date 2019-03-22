import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';

import CollectionsTabItem from './CollectionsTabItem';
import { isTouchSupported } from '../../utils/helpers';
import ContentSlider from '../../components/ContentSlider';



class CollectionsTab extends Component {
    state = {
        activeItem: null
    };

    activateItem = (e) => {
        if (isTouchSupported() && e.cancelable) {
            const id = get('currentTarget.dataset.id', e) || '';

            if (this.state.activeItem !== id) {
                e.preventDefault();
                this.setState((prevState) => ({
                    activeItem: prevState.activeItem !== id ? id : null
                }));
            }
        }
    };

    render() {
        const {items} = this.props;

        return (
            <div className="outfit-collections">
                {items.map((item, index) => (
                    <div className="outfit-collections__group" key={index}>
                        <div className="outfit-collections__title">{item.category_name} Occasions</div>
                        <ContentSlider scrollLength={216}>
                            <div className="outfit-collections__list">
                                {Array.isArray(item.collections) &&
                                    item.collections.map(({id, name, slug, short_description, added, api_image, viewed}) => (
                                        <CollectionsTabItem
                                            key={id}
                                            id={`${item.category_name}${id}`}
                                            name={name}
                                            slug={slug}
                                            short_description={short_description}
                                            added={added}
                                            image={api_image && api_image.height_420}
                                            viewed={viewed}
                                            isActive={this.state.activeItem === `${item.category_name}${id}`}
                                            onActivate={this.activateItem}
                                        />
                                    ))
                                }
                            </div>
                        </ContentSlider>
                    </div>
                ))}
            </div>
        );
    }
}

CollectionsTab.propTypes = {
    items: PropTypes.array.isRequired
};

export default CollectionsTab;
