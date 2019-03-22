import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import noop from 'lodash/fp/noop';

import { getTypeOf } from '../../utils/helpers';



class ImgFadeIn extends Component {
    state = {
        instantLoad: false,
        isLoaded: false
    };
    ref = React.createRef();

    componentDidMount() {
        if (this.ref.current.complete) {
            this.handleOnLoad(true);
        }
    }

    handleOnLoad = (instantLoad = false) => {
        this.setState({isLoaded: true, instantLoad});
        this.props.onLoad();
    };

    handleAnimationEnd = () => {
        this.props.onFinish();
    };

    render() {
        const {src, withPlaceholder, className, duration, delay, onLoad, onFinish, ...rest} = this.props;
        const {isLoaded, instantLoad} = this.state;
        const placeholderBg = {};
        const imgStyles = {};
        const imgParams = {};

        if (getTypeOf(withPlaceholder) === 'string') {
            placeholderBg.style = {
                background: withPlaceholder
            };
        }

        if (duration) imgStyles['--animation-duration'] = `${duration}ms`;
        if (delay) imgStyles['--animation-delay'] = `${delay}ms`;
        if (Object.keys(imgStyles).length) imgParams.style = imgStyles;

        return (
            <Fragment>
                {withPlaceholder &&
                    <div className="img-fade-in__placeholder" {...placeholderBg}/>
                }

                <img
                    src={src}
                    className={cn('img-fade-in', className, {'is-loaded': isLoaded, 'instant-load': instantLoad})}
                    alt="portefini media"
                    onLoad={this.handleOnLoad}
                    onTransitionEnd={this.handleAnimationEnd}
                    onAnimationEnd={this.handleAnimationEnd}
                    ref={this.ref}
                    {...imgParams}
                    {...rest}
                />
            </Fragment>
        );
    }
}

ImgFadeIn.propTypes = {
    src: PropTypes.string.isRequired,
    withPlaceholder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onLoad: PropTypes.func,
    onFinish: PropTypes.func,
    duration: PropTypes.number,
    delay: PropTypes.number
};
ImgFadeIn.defaultProps = {
    withPlaceholder: true,
    duration: null,
    onLoad: noop,
    onFinish: noop,
    delay: null
};

export default ImgFadeIn;
