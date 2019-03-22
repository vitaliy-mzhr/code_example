import React, { PureComponent } from 'react';

import withIntersectionObserver from '../../HOC/withIntersectionObserver';
import ClothesCard from '../../components/ClothesCard';



class ClothesItem extends PureComponent {
    render() {
        const {isVisible, ...rest} = this.props;

        return (
            <div className="clothes-list__item">
                {isVisible && (
                    <ClothesCard {...rest}/>
                )}
            </div>
        );
    }
}

ClothesItem.propTypes = ClothesCard.propTypes;
ClothesItem.defaultProps = ClothesCard.defaultProps;

export default withIntersectionObserver()(ClothesItem);
