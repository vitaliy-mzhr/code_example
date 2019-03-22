import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import withIntersectionObserver from '../../HOC/withIntersectionObserver';



class HomeUserFlow extends Component {
    render() {
        const {items, isVisible} = this.props;

        return (
            <div className="home-user-flow">
                {items.map(({id, title, icon, description}, index) => (
                    <Fragment key={id}>
                        <div className={cn('home-user-flow__item with-entrance', {'is-entered': isVisible})}>
                            <img src={icon} alt="portefini use flow icon"/>
                            <h3>{title}</h3>
                            <p>{description}</p>
                        </div>

                        {index < items.length - 1 &&
                            <div className={cn('home-user-flow__arrow with-entrance', {'is-entered': isVisible})}/>
                        }
                    </Fragment>
                ))}
            </div>
        );
    }
}

HomeUserFlow.propTypes = {
    items: PropTypes.array.isRequired
};

export default withIntersectionObserver({once: true, threshold: 0.1})(HomeUserFlow);

