import React from 'react';


const ArrowIcon = ({pathProps = {}, ...props}) => (
    <svg viewBox="6 8 12 7" width="1.714em" height="1em" {...props}>
        <path
            d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"
            fill="currentColor"
            {...pathProps}
        />
    </svg>
);

export default ArrowIcon;
