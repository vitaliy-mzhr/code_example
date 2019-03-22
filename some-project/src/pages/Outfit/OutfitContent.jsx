import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { compose } from 'redux';
import get from 'lodash/fp/get';

import ImgFadeIn from '../../components/ImageFadeIn';
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { outfitTagInteract, saveOutfit, removeOutfit, openAuthModal, getOutfit, activateOutfitTab, expandOutfit } from '../../actions';
import OutfitPoints from '../../components/OutfitPoints';
import { getElDimensions, getImageOffset, getZoomMousePosition, setImageCoords } from './outfitPageHelpers';
import { withDimensionObserver } from '../../context/Dimension';
import withClientReady from '../../HOC/withClientReady';
import { AUTH_MODAL_TYPES, IMAGE_ZOOM_LEVEL, OUTFIT_TABS } from '../../config';
import OutfitLinks from './OutfitLinks';
import OutfitStylist from './OutfitStylist';
import SaveOutfitBtn from './SaveOutfitBtn';
import setCSSVariables from '../../utils/setCSSVariables';
import OutfitToolbar from './OutfitToolbar';
import SwipeToReveal from '../../utils/swipeToReveal';



const outfitBoxImgRef = React.createRef();
const outfitPageRef = React.createRef();

class OutfitContent extends Component {
    state = {
        imgReady: false,
        imgLoaded: false,
        isZoomed: false,
        outfit_id: null,
        imageWasLoaded: false
    };
    outfitPageOffset = {};
    imgSizes = {};
    revealInstance = {};

    static getDerivedStateFromProps(props, state) {
        if (state.outfit_id !== props.outfit_id) {
            return {
                outfit_id: props.outfit_id,
                imgReady: false,
                imgLoaded: false
            };
        }
        return null;
    }

    componentDidMount() {
        this.revealInstance = new SwipeToReveal();
        if (this.props.vw <= 767) {
            setCSSVariables(outfitPageRef.current, {vh: `${this.props.vh}px`});
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.isClientReady && (this.props.vw !== prevProps.vw || this.props.vh !== prevProps.vh)) {
            this.onZoomOut();
            if (this.props.vw <= 767) {
                if (this.props.vh !== prevProps.vh) {
                    setCSSVariables(outfitPageRef.current, {vh: `${this.props.vh}px`});
                }
                const imageRect = outfitBoxImgRef.current.getBoundingClientRect();

                if (prevProps.vw > 767) {
                    const sidebar = document.querySelector('.outfit-sidebar');
                    sidebar.style.display = 'block';
                    this.revealInstance.init('.outfit-sidebar', '.outfit-page__overlay', imageRect.bottom - 56, 0, this.onExpandSidebar);
                } else {
                    this.revealInstance.setOffset(imageRect.bottom - 56, 0);
                }
            } else if (prevProps.vw <= 767) {
                this.revealInstance.destroy();
                this.props.expandOutfit(false);
            }
        }

        if (prevProps.outfit_id !== this.props.outfit_id) {
            if (this.props.vw <= 767) {
                const sidebar = document.querySelector('.outfit-sidebar');
                sidebar.style.display = 'none';
            }

            this.onZoomOut();
            const firstPoint = get('points[0].id', this.props);
            this.props.activateOutfitTab({
                activeTab: OUTFIT_TABS.CLOTHES,
                activeSubTab: firstPoint ? String(firstPoint) : null
            });
        }

        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
            this.props.getOutfit.trigger({outfitId: this.props.outfit_id, isUpdate: true});
        }

        if (prevProps.isExpanded !== this.props.isExpanded && !this.props.isExpanded && this.props.vw <= 767) {
            this.revealInstance.toInitialState();
            this.revealInstance.enable();
        }
    }

    onImgVisible = () => {
        if (!this.state.imgReady) {
            this.setState({imgReady: true, imageWasLoaded: true});
            setCSSVariables(outfitPageRef.current, {
                outfitFontColor: `rgb(${this.props.font_color || '0,0,0'})`,
                outfitBtnColor: `rgb(${this.props.button_color || '0,0,0'})`
            });
        }
    };

    onExpandSidebar = (newState) => {
        if (newState === 'EXPANDED') {
            this.props.expandOutfit(true);
            this.revealInstance.disable();
        }
    };

    activatePoint = (e) => {
        e.stopPropagation();
        const pointId = get('currentTarget.dataset.pointId', e) || null;
        if (pointId && (pointId !== this.props.activeSubTab || this.props.activeTab !== OUTFIT_TABS.CLOTHES)) {
            this.props.activateOutfitTab({activeTab: OUTFIT_TABS.CLOTHES, activeSubTab: pointId});
            if (this.props.vw <= 767) {
                this.revealInstance.toExpandState();
            }

            if (!this.props.isTagInteracted) {
                this.props.outfitTagInteract();
            }
        }
    };

    onImageLoad = () => {
        if (!this.state.imgLoaded) {
            this.setState({imgLoaded: true});
        }
        if (this.props.vw <= 767) {
            setTimeout(() => {
                const imageRect = outfitBoxImgRef.current.getBoundingClientRect();
                const sidebar = document.querySelector('.outfit-sidebar');
                sidebar.style.display = 'block';
                this.revealInstance.init('.outfit-sidebar', '.outfit-page__overlay', imageRect.bottom - 56, 0, this.onExpandSidebar);
            });
        }
    };

    onZoomIn = (coords) => {
        this.setState({isZoomed: true});
        setImageCoords(outfitBoxImgRef.current, 0, 0, IMAGE_ZOOM_LEVEL, 'transform .2s linear');
        this.outfitPageOffset = getElDimensions(outfitPageRef.current);
        this.imgSizes = getElDimensions(outfitBoxImgRef.current);
        this.onZoomMove(coords, 'transform .2s linear');
        outfitPageRef.current.addEventListener('mousemove', this.onZoomMove);
    };

    onZoomOut = () => {
        this.setState({isZoomed: false});
        setImageCoords(outfitBoxImgRef.current, undefined, undefined, undefined, 'transform .2s linear');
        outfitPageRef.current.removeEventListener('mousemove', this.onZoomMove);
    };

    onZoomToggle = (e) => {
        if (this.props.vw <= 767) return;
        if (this.state.isZoomed) {
            this.onZoomOut();
        } else {
            this.onZoomIn({pageX: e.pageX, pageY: e.pageY});
        }
    };

    onZoomMove = (e, transition) => {
        const mousePos = getZoomMousePosition(e.pageX, e.pageY, this.outfitPageOffset);
        const imageOffset = getImageOffset(this.imgSizes, this.outfitPageOffset, mousePos, IMAGE_ZOOM_LEVEL);
        setImageCoords(outfitBoxImgRef.current, imageOffset.x, imageOffset.y, IMAGE_ZOOM_LEVEL, transition);
    };

    outfitAction = () => {
        const {saveOutfit, removeOutfit, saved, outfit_id, isLoading, openAuthModal, isAuthenticated} = this.props;
        if (isLoading) return;

        if (!isAuthenticated) {
            openAuthModal({
                type: AUTH_MODAL_TYPES.SIGNUP,
                title: 'Make Shopping Effortless',
                subtitle: 'Create an account on Portefini to instantly save your favorite outfits'
            });
            return;
        }

        if (saved) {
            removeOutfit.trigger({outfitId: outfit_id});
        } else {
            saveOutfit.trigger({outfitId: outfit_id});
        }
    };

    componentWillUnmount() {
        outfitPageRef.current.removeEventListener('mousemove', this.onZoomMove);
        this.revealInstance.destroy();
    }

    render() {
        const {stylist = {}, no_likes, api_image = {}, saved, points = [], isTagInteracted, activeSubTab, prevOutfit, nextOutfit, outfit_id, isClientReady, vw} = this.props;
        const {name, no_followers, slug} = stylist;
        const {imgReady, isZoomed, imageWasLoaded, imgLoaded} = this.state;

        return (
            <div className="outfit-page" ref={outfitPageRef}>
                {isClientReady && imgLoaded && vw <= 767 && (
                    <OutfitToolbar
                        stylistName={name}
                        followers={no_followers}
                        stylistSlug={slug}
                        isVisible={imgReady}
                        likes={no_likes}
                        saved={saved}
                        onAction={this.outfitAction}
                    />
                )}

                <div className={cn('outfit-box', {'is-zoomed': isZoomed})}>
                    <div className="outfit-box__image" onClick={this.onZoomToggle} ref={outfitBoxImgRef}>
                        <ImgFadeIn
                            key={outfit_id}
                            src={api_image.image_900x900}
                            onFinish={this.onImgVisible}
                            onLoad={this.onImageLoad}
                            withPlaceholder={false}
                        />
                    </div>

                    <OutfitPoints
                        items={points}
                        activePoint={activeSubTab}
                        onClick={this.activatePoint}
                        buzzOnce={isTagInteracted}
                        isVisible={imgReady}
                    />

                    <OutfitStylist name={name} followers={no_followers} isVisible={imgReady && !isZoomed} slug={slug}/>
                    <SaveOutfitBtn isOn={saved} likes={no_likes} onClick={this.outfitAction} isVisible={imgReady && !isZoomed}/>
                </div>

                <OutfitLinks prevLink={prevOutfit} nextLink={nextOutfit} ready={isClientReady && vw <= 767 ? imgReady : imageWasLoaded} hide={isZoomed}/>
                <div className="outfit-page__overlay"/>
            </div>
        );
    }
}

function mapStateToProps({outfit: {data, activeSubTab, activeTab, isTagInteracted, isLoading, isExpanded}, auth: {isAuthenticated}}) {
    return {...data, activeSubTab, activeTab, isTagInteracted, isLoading, isAuthenticated, isExpanded};
}

export default compose(
    withClientReady,
    withDimensionObserver,
    connect(mapStateToProps, mapRoutineCreators({
        outfitTagInteract, saveOutfit, removeOutfit, openAuthModal, getOutfit, activateOutfitTab, expandOutfit
    }))
)(OutfitContent);
