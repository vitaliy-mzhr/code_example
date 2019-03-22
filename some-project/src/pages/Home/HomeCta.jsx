import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import withIntersectionObserver from '../../HOC/withIntersectionObserver';
import ScrollToAnimated from '../../components/ScrollToAnimated';



class HomeCtaInner extends Component {
    render() {
        const {isVisible, title, desc} = this.props;

        return (
            <div className={cn('home-cta__inner with-entrance', {'is-entered': isVisible})}>
                <h1 className="home-cta__title">{title}</h1>

                <div className="home-cta__desc">{desc}</div>

                <div className="home-cta__buttons">
                    <ScrollToAnimated targetQuery=".home-carousel__occasions" offset={-56} speed={60}>
                        <button className="btn btn__inverted home-cta__btn with-entrance" type="button">
                            By occasions
                        </button>
                    </ScrollToAnimated>

                    <ScrollToAnimated targetQuery=".home-carousel__styles" offset={-56} speed={60}>
                        <button className="btn btn__inverted home-cta__btn with-entrance" type="button">
                            By styles
                        </button>
                    </ScrollToAnimated>

                    <ScrollToAnimated targetQuery=".home-carousel__clothes" offset={-56} speed={60}>
                        <button className="btn btn__inverted home-cta__btn with-entrance" type="button">
                            By clothes
                        </button>
                    </ScrollToAnimated>
                </div>
            </div>
        );
    }
}

const HomeCtaInnerIO = withIntersectionObserver({threshold: 0.25, once: true})(HomeCtaInner);
const HomeCta = (props) => (
    <div className="home-cta">
        <HomeCtaInnerIO {...props}/>
    </div>
);

HomeCta.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
};

export default HomeCta;
