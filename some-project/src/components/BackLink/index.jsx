import React from 'react';
import Router from 'next/router';



const BackLink = ({children, ...otherProps}) => {
    const newChild = React.Children.only(React.cloneElement(children, {...otherProps, onClick: Router.back}));
    return newChild;
};

export default BackLink;
