import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { easeInOutCubic } from 'js-easing-functions';
import throttle from 'lodash/fp/throttle';
import noop from 'lodash/fp/noop';

import { withDimensionObserver } from '../../context/Dimension';
import ArrowIcon from '../SVG/ArrowIcon';



class ContentSlider extends Component {
    state = {
        isScrollable: null,
        showPrevBtn: null,
        showNextBtn: null
    };
    ticking = false;
    isListening = false;
    sliderInnerRef = React.createRef();

    checkScrolls = () => {
        const scrollWidth = this.sliderInnerRef.current.scrollWidth;
        const clientWidth = this.sliderInnerRef.current.clientWidth;
        const scrollLeft = this.sliderInnerRef.current.scrollLeft;
        this.setState({
            isScrollable: scrollWidth > clientWidth,
            showPrevBtn: scrollWidth > clientWidth && scrollLeft > 0,
            showNextBtn: scrollWidth > clientWidth && scrollWidth - scrollLeft !== clientWidth
        });
    };

    onScrollEnd = () => {
        this.checkScrolls();
    };

    componentDidMount() {
        this.checkScrolls();

        if (this.props.vw <= 767) this.sliderInnerRef.current.addEventListener('scroll', this.listenScrollThrottled);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.vw !== this.props.vw || prevProps.updatesWatcherVal !== this.props.updatesWatcherVal) {
            this.checkScrolls();
            if (this.props.vw <= 767) {
                this.sliderInnerRef.current.addEventListener('scroll', this.listenScrollThrottled);
            } else {
                this.sliderInnerRef.current.removeEventListener('scroll', this.listenScrollThrottled);
            }
        }

        if (prevState.isScrollable !== this.state.isScrollable) {
            this.props.onIsScrollableChange(this.state.isScrollable);
        }
    }

    componentWillUnmount() {
        this.sliderInnerRef.current.removeEventListener('scroll', this.listenScrollThrottled);
        this.isListening = false;
    }

    _listenScroll = () => {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.checkScrolls();
                this.ticking = false;
            });
            this.ticking = true;
        }
    };
    listenScrollThrottled = throttle(100, this._listenScroll);

    scrollTo(target = 100, duration = 300, container = this.sliderInnerRef.current, immediate = false, easeFn = easeInOutCubic) {
        const from = container.scrollLeft;
        if (immediate) {
            container.scrollLeft = target + from;
            return;
        }
        let startTime = null;
        let lastPageXOffset;

        const loop = (currentTime) => {
            let currentPageXOffset = container.scrollLeft;
            if (!startTime) {
                // To starts time from 1, we subtracted 1 from current time
                // If time starts from 1 The first loop will not do anything,
                // because easing value will be zero
                startTime = currentTime - 1;
            }
            const timeElapsed = currentTime - startTime;

            if (lastPageXOffset) {
                if ((target > 0 && lastPageXOffset > currentPageXOffset) || (target < 0 && lastPageXOffset < currentPageXOffset)) {
                    return;
                }
            }
            lastPageXOffset = currentPageXOffset;

            const val = easeFn(timeElapsed, from, target, duration);
            container.scrollLeft = Math[target >= 0 ? 'min' : 'max'](val, target + from);

            if (timeElapsed < duration) {
                window.requestAnimationFrame(loop);
            } else {
                container.scrollLeft = target + from;
                this.onScrollEnd();
            }
        };

        window.requestAnimationFrame(loop);
    }

    scrollNext = () => {
        this.scrollTo(this.props.scrollLength, this.props.duration);
    };

    scrollPrev = () => {
        this.scrollTo(-this.props.scrollLength, this.props.duration);
    };

    render() {
        const {children, className} = this.props;
        const {isScrollable, showNextBtn, showPrevBtn} = this.state;

        if (!children) return null;

        return (
            <div className={cn('content-slider', className)}>
                <div className="content-slider__inner" ref={this.sliderInnerRef}>
                    {children}
                </div>

                <div
                    onClick={this.scrollPrev}
                    className={cn('content-slider__prev-btn', {'is-hidden': !isScrollable || !showPrevBtn})}
                >
                    <ArrowIcon/>
                </div>

                <div
                    onClick={this.scrollNext}
                    className={cn('content-slider__next-btn', {'is-hidden': !isScrollable || !showNextBtn})}
                >
                    <ArrowIcon/>
                </div>
            </div>
        );
    }
}

ContentSlider.propTypes = {
    scrollLength: PropTypes.number,
    duration: PropTypes.number,
    updatesWatcherVal: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    onIsScrollableChange: PropTypes.func
};
ContentSlider.defaultProps = {
    scrollLength: 150,
    duration: 300,
    onIsScrollableChange: noop,
    updatesWatcherVal: null
};

export default withDimensionObserver(ContentSlider);
