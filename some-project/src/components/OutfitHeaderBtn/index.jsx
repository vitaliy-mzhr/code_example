import React, { Component } from 'react';
import { connect } from 'react-redux';

import { expandOutfit } from '../../actions';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import BackLink from '../BackLink';
import { CrossIcon, ArrowIcon } from '../SVG';



class OutfitHeaderBtn extends Component {
    toggleExpand = () => {
        this.props.expandOutfit(false);
    };

    render() {
        const {isExpanded} = this.props;

        return (
            <div className="site-header__action-btn">
                {!isExpanded
                    ? (
                        <BackLink className="site-header__back-action">
                            <ArrowIcon/>
                        </BackLink>
                    )
                    : <CrossIcon onClick={this.toggleExpand}/>
                }
            </div>
        );
    }
}

function mapStateToProps({outfit}) {
    return {isExpanded: outfit.isExpanded};
}

export default connect(mapStateToProps, mapRoutineCreators({expandOutfit}))(OutfitHeaderBtn);
