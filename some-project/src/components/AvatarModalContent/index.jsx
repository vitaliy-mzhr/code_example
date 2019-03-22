import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

// Components
import { RefreshIcon, TrashIcon } from '../SVG';
// Utils
import { convertToBytes } from '../../utils/helpers';
// HOC
import { withDimensionObserver } from '../../context/Dimension';



class AvatarModalContent extends Component {
    state = {
        image: this.props.userPhoto,
        angle: 0,
        scale: 1,
    };

    ref = React.createRef();

    handleDrop = (acceptedFiles) => {
        this.setState({ image: acceptedFiles[0] });
    };

    onImageReady = () => {
        this.props.onChangeAvatar(this.ref.current.getImageScaledToCanvas().toDataURL());
    }

    onImageChange = () => {
        this.props.onChangeAvatar(this.ref.current.getImageScaledToCanvas().toDataURL());
    }

    rotateImageToLeft = () => {
        const angle = (this.state.angle - 90) % 360;
        this.setState({ angle });
    }

    rotateImageToRight = () => {
        const angle = (this.state.angle + 90) % 360;
        this.setState({ angle });
    }

    removeImage = () => {
        // TODO: this feature is postponed, do later
        // this.setState({ image: null });
        // this.props.onChangeAvatar(null);
    }

    scaleImage = (event) => {
        this.setState({ scale: parseFloat(event.target.value) });
    }

    render() {
        const { vw } = this.props;
        const { image, angle, scale } = this.state;
        const staticAvatar = '/static/images/default_profile.jpg';
        const maxSize = convertToBytes(10, 'm');

        return (
            <div className="avatar-modal-content">
                <div className="avatar-modal-content__title">
                    Drag the corner of the box to change position and size, or upload a new image
                </div>

                <div className="avatar-modal-content__inner">
                    <section>
                        <div className="avatar-modal-content__editor">
                            {image ? (
                                <AvatarEditor
                                    ref={this.ref}
                                    style={{ width: '100%', height: '100%', cursor: 'grabbing', touchAction: 'none', }}
                                    image={`${image}?t=${Date.now()}`}
                                    rotate={angle}
                                    scale={scale}
                                    crossOrigin="anonymous"
                                    onImageReady={this.onImageReady}
                                    onImageChange={this.onImageChange}
                                />
                            ) : (
                                <img src={staticAvatar} alt="user avatar" />
                            )}
                        </div>

                        <div className="avatar-modal-content__edit-tools">
                            <div title="Rotate left">
                                <RefreshIcon className="avatar-modal-content__rotate-back-icon" onClick={this.rotateImageToLeft}/>
                            </div>
                            <div title="Rotate right">
                                <RefreshIcon className="avatar-modal-content__rotate-forward-icon" onClick={this.rotateImageToRight}/>
                            </div>
                            {/* <TrashIcon className="avatar-modal-content__trash-icon" onClick={this.removeImage}/> */}

                            <div className="avatar-modal-content__scale-wrapper">
                                <label>Scale:</label>
                                <input type="range" min="1" max="10" step="0.01" value={scale} onChange={this.scaleImage}/>
                            </div>
                        </div>
                    </section>

                    <section>
                        <Dropzone onDrop={this.handleDrop} maxSize={maxSize} accept="image/*" multiple={false}>
                            {({ getRootProps, getInputProps, isDragActive }) => (
                                <div {...getRootProps()} className="avatar-modal-content__dropzone-wrapper">

                                    <input {...getInputProps()}/>

                                    { vw > 561 ?
                                        <div className="avatar-modal-content__dropzone">
                                            <div className="avatar-modal-content__plus-icon" />

                                            <div className="avatar-modal-content__dropzone-label">
                                                Click or drag & drop photo here to upload
                                            </div>
                                        </div> :
                                        <div className="btn btn__inverted">
                                            Upload new photo
                                        </div>
                                    }

                                </div>
                            )}
                        </Dropzone>

                        <div className="avatar-modal-content__help-text">You can upload a JPG, GIF or PNG file</div>
                    </section>
                </div>
            </div>
        );
    }
}

AvatarModalContent.propTypes = {
    userPhoto: PropTypes.string,
    onChangeAvatar: PropTypes.func.isRequired,
};

AvatarModalContent.defaultProps = {
    userPhoto: null
};

export default withDimensionObserver(AvatarModalContent);
