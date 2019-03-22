import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/fp/noop';
import cn from 'classnames';

import { HeartIcon, HeartIconFilled } from '../../components/SVG';
import { numberMetricFormat } from '../../utils/helpers';



const SaveOutfitBtn = ({isOn, onClick, likes, isVisible}) => (
    <span className={cn('save-outfit-btn', {'is-visible': isVisible})}>
        {isOn && <HeartIconFilled onClick={onClick}/>}
        {!isOn && <HeartIcon onClick={onClick}/>}
        <span>{numberMetricFormat(likes, 1)}</span>
    </span>
);

SaveOutfitBtn.propTypes = {
    onClick: PropTypes.func,
    isOn: PropTypes.bool,
    isVisible: PropTypes.bool
};
SaveOutfitBtn.defaultProps = {
    isOn: false,
    isVisible: false,
    onClick: noop
};

export default React.memo(SaveOutfitBtn);
