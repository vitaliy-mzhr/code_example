import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { SimpleImg } from 'react-simple-img';
import cn from 'classnames';

import LinkTo from '../LinkTo';
import { SearchIcon, HeartIconFilled, HeartIcon } from '../SVG';
import withIntersectionObserver from '../../HOC/withIntersectionObserver';
import { outfitCardInteract } from '../../actions';



class OutfitCard extends Component {
    handleCardInteract = () => {
        if (this.props.showOutfitCardText) {
            this.props.outfitCardInteract();
        }
    };

    render() {
        let {image, id, isVisible, showOutfitCardText, label, isSaved, onAction} = this.props;

        return (
            <div className="outfit-card">
                {isVisible && (
                    <LinkTo to={`/outfit/${id}`} className="outfit-card__link" onClick={this.handleCardInteract}>
                        <SimpleImg
                            wrapperClassName="img-holder"
                            placeholder="#ececec"
                            src={image}
                            animationDuration={0.3}
                        />

                        <div className="outfit-card__overlay">
                            <span className={cn('outfit-card__btn', {'is-interacted': !showOutfitCardText})}>
                                <SearchIcon/>
                                <span>{label}</span>
                            </span>

                            {onAction && (
                                <span
                                    className="outfit-card__like-btn"
                                    data-id={id}
                                    data-action-remove={isSaved}
                                    onClick={onAction}
                                >
                                    {isSaved ? <HeartIconFilled/> : <HeartIcon/>}
                                </span>
                            )}
                        </div>
                    </LinkTo>
                )}
            </div>
        );
    }
}

OutfitCard.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    label: PropTypes.string,
    isSaved: PropTypes.bool,
    onAction: PropTypes.func
};
OutfitCard.defaultProps = {
    label: 'View clothes'
};

function mapStateToProps({auth}) {
    return {showOutfitCardText: auth.showOutfitCardText};
}

export default compose(
    withIntersectionObserver(),
    connect(mapStateToProps, {outfitCardInteract})
)(OutfitCard);
