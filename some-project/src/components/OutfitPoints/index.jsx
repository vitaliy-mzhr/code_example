import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import noop from 'lodash/fp/noop';

import TagIcon from '../SVG/TagIcon';



const OutfitPoints = ({items, isVisible, onClick, buzzOnce, activePoint}) => (
    items.map(({id, xcoord, ycoord}) => (
        <div
            key={id}
            className={cn('outfit-box__point', {'is-visible': isVisible})}
            style={{top: `${ycoord}%`, left: `${xcoord}%`}}
            data-point-id={id}
            onClick={onClick}
        >
            <TagIcon/>
            <div className={cn('buzz-circle--active', {'is-active': activePoint === String(id)})}/>
            <div className={cn('buzz-circle', {'once': buzzOnce})}/>
        </div>
    ))
);

OutfitPoints.propTypes = {
    items: PropTypes.array,
    activePoint: PropTypes.string,
    isVisible: PropTypes.bool,
    buzzOnce: PropTypes.bool,
    onClick: PropTypes.func,
};
OutfitPoints.defaultProps = {
    items: [],
    isVisible: false,
    onClick: noop,
    buzzOnce: false,
    activePoint: null
};

export default OutfitPoints;

