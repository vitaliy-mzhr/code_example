import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { compose } from 'redux';
import get from 'lodash/fp/get';

import withIntersectionObserver from '../../HOC/withIntersectionObserver';
import Menu from '../../containers/Menu';
import ImageSwitcher from '../../components/ImageSwitcher';
import { withDimensionObserver } from '../../context/Dimension';



class HomeCarousel extends Component {
    state = {
        activeImage: null
    };

    onMenuActivate = (index) => {
        const { vw, vh } = this.props;
        const imagePath = (vw <= 600 && vh <= 400) ? 'width_600' : 'width_1366';
        const activeImage = get(`menu.[${index}].api_img_web.${imagePath}`, this.props);
        this.setState({activeImage});
    };

    render() {
        const {name, menu, isVisible} = this.props;
        const {activeImage} = this.state;

        return (
            <div className={cn('home-carousel with-entrance', `home-carousel__${name.toLowerCase()}`, {'is-entered': isVisible})}>
                <div className="home-carousel__content">
                    <h2 className="home-carousel__title">By {name}</h2>

                    {isVisible &&
                        <Menu
                            urlBase={name.toLowerCase()}
                            items={menu}
                            onActivate={this.onMenuActivate}
                            isLoopEnabled
                        />
                    }
                </div>

                <div className="home-carousel__image">
                    {activeImage && isVisible && <ImageSwitcher image={activeImage}/>}
                </div>
            </div>
        );
    }
}

HomeCarousel.propTypes = {
    name: PropTypes.string.isRequired,
    menuId: PropTypes.string.isRequired,
    menu: PropTypes.array.isRequired,
};

export default compose(
    withDimensionObserver,
    withIntersectionObserver({once: true, threshold: 0.1})
)(HomeCarousel);
