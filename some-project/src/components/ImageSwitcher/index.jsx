import React, { Component } from 'react';
import PropTypes from 'prop-types';



class ImageSwitcher extends Component {
    state = {
        propImg: this.props.image,
        image1: {
            src: this.props.image,
            opacity: 0
        },
        image2: {
            src: null,
            opacity: 0
        },
        activeImage: 'image1'
    };

    static getDerivedStateFromProps(props, state) {
        if (props.image !== state.propImg) {
            const newState = {
                propImg: props.image,
                image1: {...state.image1},
                image2: {...state.image2}
            };

            if (state.activeImage === 'image1') {
                newState.activeImage = 'image2';
            } else {
                newState.activeImage = 'image1';
            }

            if (newState[newState.activeImage].src === props.image) {
                if (newState.activeImage === 'image1') {
                    newState.image2.opacity = 0;
                } else {
                    newState.image1.opacity = 0;
                }
                newState[newState.activeImage].opacity = 1;
            } else {
                newState[newState.activeImage].src = props.image;
            }

            return newState;
        }

        return null;
    }

    onLoad = () => {
        const newState = {
            image1: {...this.state.image1},
            image2: {...this.state.image2}
        };

        if (this.state.activeImage === 'image1') {
            newState.image1.opacity = 1;
            newState.image2.opacity = 0;
        } else {
            newState.image1.opacity = 0;
            newState.image2.opacity = 1;
        }

        this.setState({...newState});
    };


    render() {
        const { image1, image2 } = this.state;

        return (
            <div className="image-switcher">
                {image1.src &&
                    <img
                        src={image1.src}
                        onLoad={this.onLoad}
                        style={{opacity: image1.opacity}}
                        alt="portefini crossfade slide"
                    />
                }

                {image2.src &&
                    <img
                        src={image2.src}
                        onLoad={this.onLoad}
                        style={{opacity: image2.opacity}}
                        alt="portefini crossfade slide"
                    />
                }
            </div>
        );
    }
}

ImageSwitcher.propTypes = {
    image: PropTypes.string.isRequired
};

export default ImageSwitcher;
