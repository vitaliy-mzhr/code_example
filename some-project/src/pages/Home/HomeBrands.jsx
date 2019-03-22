import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SimpleImg } from 'react-simple-img';
import cn from 'classnames';

import withIntersectionObserver from '../../HOC/withIntersectionObserver';



class BrandsMsg extends Component {
    render() {
        const {isVisible, title, desc} = this.props;

        return (
            <div className={cn('home-brands__msg with-entrance', {'is-entered': isVisible})}>
                <h4>{ title }</h4>
                <p>{ desc }</p>
            </div>
        );
    }
}

const BrandsMsgIO = withIntersectionObserver({once: true, threshold: 0.2})(BrandsMsg);



class HomeBrands extends Component {
    render() {
        const {items, title, desc} = this.props;

        return (
            <div className="home-brands">
                <div className="home-brands__list">
                    {items.map(({image}, index) => (
                        <div className="home-brands__item" key={index}>
                            <SimpleImg
                                wrapperClassName="img-holder"
                                key={index}
                                placeholder="#fff"
                                src={image}
                                animationDuration={0.6}
                            />
                        </div>
                    ))}
                </div>

                <BrandsMsgIO title={title} desc={desc}/>
            </div>
        );
    }
}

HomeBrands.propTypes = {
    items: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
};

export default HomeBrands;
