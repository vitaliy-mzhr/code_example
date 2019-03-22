import React, { Component } from 'react';
import Observer from '@researchgate/react-intersection-observer';



const withIntersectionObserver = (HOCOptions = {}) => (BaseComponent) => {
    const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';

    return class extends Component {
        static displayName = `withIntersectionObserver(${displayName})`;
        static defaultProps = {
            observerOptions: {}
        };

        state = {
            isIntersecting: false,
        };

        handleChange = ({isIntersecting, intersectionRatio}, unobserve) => {
            const options = {...HOCOptions, ...this.props.observerOptions};
            const {threshold = 0, once} = options;

            if (isIntersecting && once) {
                unobserve();
            }

            this.setState({isIntersecting: isIntersecting && intersectionRatio >= threshold});
        };

        render() {
            const {observerOptions, ...rest} = this.props;
            const options = {...HOCOptions, ...observerOptions};

            return (
                <Observer onChange={this.handleChange} {...options}>
                    <BaseComponent {...rest} isVisible={this.state.isIntersecting}/>
                </Observer>
            );
        }
    };
};

export default withIntersectionObserver;
