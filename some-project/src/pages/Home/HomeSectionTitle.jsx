import React, { Component } from 'react';
import cn from 'classnames';

import withIntersectionObserver from '../../HOC/withIntersectionObserver';



class HomeSectionTitle extends Component {
    render() {
        let {children, isVisible} = this.props;

        return (
            <h2 className={cn('with-entrance', {'is-entered': isVisible})}>
                { children }
            </h2>
        );
    }
}

export default withIntersectionObserver({once: true, threshold: 0.5})(HomeSectionTitle);
