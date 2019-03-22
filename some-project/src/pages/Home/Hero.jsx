import React, { Component } from 'react';
import { SimpleImg } from 'react-simple-img';
import PropTypes from 'prop-types';

import withIntersectionObserver from '../../HOC/withIntersectionObserver';
import HomeCta from './HomeCta';



class Hero extends Component {
    render() {
        let {images, title, desc, isVisible} = this.props;

        return (
            <div className="home-page__hero">
                {isVisible && images.map(({image}, index) => (
                    <SimpleImg
                        wrapperClassName="img-holder"
                        key={index}
                        placeholder="#ececec"
                        src={image}
                        animationDuration={0.3}
                    />
                ))}

                {title && desc && <HomeCta title={title} desc={desc}/>}
            </div>
        );
    }
}

Hero.propTypes = {
    images: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
};

export default withIntersectionObserver({threshold: 0, once: true})(Hero);
