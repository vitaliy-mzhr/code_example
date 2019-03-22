import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SimpleImg } from 'react-simple-img';



class HomeMedia extends Component {
    render() {
        const {items} = this.props;

        return (
            <div className="home-media">
                <div className="home-media__list">
                    {items.map(({image}, index) => (
                        <div className="home-media__item" key={index}>
                            <SimpleImg
                                wrapperClassName="img-holder"
                                key={index}
                                placeholder="#f7f6f6"
                                src={image}
                                animationDuration={0.6}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

HomeMedia.propTypes = {
    items: PropTypes.array.isRequired
};

export default HomeMedia;
