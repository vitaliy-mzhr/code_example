import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { easeInOutCubic } from 'js-easing-functions';

import scrollTo from '../../utils/scrollTo';
import { getTypeOf } from '../../utils/helpers';



class ScrollToAnimated extends Component {
    scrollTo = () => {
        const {targetQuery, duration, speed, offset, immediate, easeFn} = this.props;
        const targetEl = document.querySelector(targetQuery);


        if (targetEl) {
            const _offset = getTypeOf(offset) === 'function' ? offset() : offset;
            scrollTo(window, targetEl, duration, speed, _offset, immediate, easeFn);
        }
    };

    render() {
        const { children, targetQuery, duration, offset, speed, immediate, easeFn, ...otherProps } = this.props;
        const newChild = React.Children.only(React.cloneElement(children, {...otherProps, onClick: this.scrollTo}));

        return newChild;
    }
}

ScrollToAnimated.propTypes = {
    targetQuery: PropTypes.string.isRequired,
    duration: PropTypes.number,
    speed: PropTypes.number,
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    immediate: PropTypes.bool,
    easeFn: PropTypes.func
};
ScrollToAnimated.defaultProps = {
    duration: 0,
    speed: 50,
    offset: 0,
    immediate: false,
    easeFn: easeInOutCubic
};

export default ScrollToAnimated;
