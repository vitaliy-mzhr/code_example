import get from 'lodash/fp/get';
import noop from 'lodash/fp/noop';



export default class SwipeToReveal {
    PointerEventsSupport = false;

    STATE_DEFAULT = 'DEFAULT';
    STATE_EXPANDED = 'EXPANDED';

    rafPending = false;
    initialTouchPos = null;
    lastTouchPos = null;
    currentYPosition = 0;
    currentState = this.STATE_DEFAULT;
    slopValue = 0;
    initialOffset = 0;
    targetOffset = 0;
    bottomBound = 0;
    topBound = 0;
    maxOpacity = 0.8;
    swipeFrontElement = null;
    overlayElement = null;
    _disabled = false;
    wasMove = false;
    wasStart = false;

    constructor(elQuery, overlayElQuery, initialOffset = 0, targetOffset = 0, onStateChange = noop) {
        if (window.PointerEvent || window.navigator.msPointerEnabled) {
            this.PointerEventsSupport = true;
        }

        if (elQuery) {
            this.init(elQuery, overlayElQuery, initialOffset, targetOffset, onStateChange);
        }
    }

    bindEventHandlers() {
        if (window.PointerEvent) {
            this.swipeFrontElement.addEventListener('pointerdown', this.handleGestureStart, true);
            this.swipeFrontElement.addEventListener('pointermove', this.handleGestureMove, true);
            this.swipeFrontElement.addEventListener('pointerup', this.handleGestureEnd, true);
            this.swipeFrontElement.addEventListener('pointercancel', this.handleGestureEnd, true);
        } else {
            this.swipeFrontElement.addEventListener('touchstart', this.handleGestureStart, true);
            this.swipeFrontElement.addEventListener('touchmove', this.handleGestureMove, true);
            this.swipeFrontElement.addEventListener('touchend', this.handleGestureEnd, true);
            this.swipeFrontElement.addEventListener('touchcancel', this.handleGestureEnd, true);

            this.swipeFrontElement.addEventListener('mousedown', this.handleGestureStart, true);
        }
    }

    getGesturePointFromEvent = (evt) => {
        const point = {};

        if (evt.targetTouches) {
            point.y = evt.targetTouches[0].clientY;
        } else {
            point.y = evt.clientY;
        }

        return point;
    };

    changeState = (newState) => {
        let opacity = 0;
        switch (newState) {
            case this.STATE_DEFAULT:
                this.currentYPosition = this.initialOffset;
                break;
            case this.STATE_EXPANDED:
                opacity = this.maxOpacity;
                this.currentYPosition = this.targetOffset;
                break;
        }

        const shouldTriggerFn = this.currentState !== newState;
        this.swipeFrontElement.style.transform = `translateY(${this.currentYPosition}px)`;
        this.overlayElement.style.opacity = opacity;
        this.currentState = newState;

        if (this.currentState === this.STATE_EXPANDED) {
            this.swipeFrontElement.classList.add('is-expanded');
            this.overlayElement.style.pointerEvents = 'auto';
        } else {
            this.swipeFrontElement.classList.remove('is-expanded');
            this.overlayElement.style.pointerEvents = 'none';
        }

        if (shouldTriggerFn) {
            this.onStateChange(newState);
        }
    };

    updateSwipeRestPosition = () => {
        if (this.wasStart && !this.wasMove) {
            return;
        }

        const initialY = get('y', this.initialTouchPos) || 0;
        const lastY = get('y', this.lastTouchPos) || 0;
        const differenceInY = initialY - lastY;
        this.currentYPosition = Math.min(this.topBound, Math.max(this.bottomBound, this.currentYPosition - differenceInY));

        let newState = this.currentState;
        if (Math.abs(differenceInY) > this.slopValue ) {
            if (this.currentState === this.STATE_DEFAULT && differenceInY > 0) {
                newState = this.STATE_EXPANDED;
            } else if (this.currentState === this.STATE_EXPANDED && differenceInY < 0) {
                newState = this.STATE_DEFAULT;
            }
        }

        this.swipeFrontElement.style.transition = 'transform 0.2s ease-out';
        this.overlayElement.style.transition = 'opacity 0.2s ease-out';
        this.changeState(newState);
    };

    onAnimFrame = () => {
        if (!this.rafPending) return;

        const initialY = get('y', this.initialTouchPos) || 0;
        const lastY = get('y', this.lastTouchPos) || 0;
        const differenceInY = initialY - lastY;
        const newYTransform = Math.min(this.topBound, Math.max(this.bottomBound, this.currentYPosition - differenceInY));

        const totalDistance = Math.abs(this.targetOffset - this.initialOffset);
        const passedDistance = Math.abs(this.initialOffset - newYTransform);
        const passedDistancePercent = 1 - (totalDistance - passedDistance) / totalDistance;
        const newOpacity = Math.min(this.maxOpacity, Math.max(0, (this.maxOpacity * passedDistancePercent) * 1.5));

        this.swipeFrontElement.style.transform = `translateY(${newYTransform}px)`;
        this.overlayElement.style.opacity = newOpacity;

        this.rafPending = false;
    };



    handleGestureStart = (evt) => {
        if (this._disabled) return;
        evt.preventDefault();

        if (evt.touches && evt.touches.length > 1) return;
        this.wasStart = true;

        if (window.PointerEvent) {
            evt.target.setPointerCapture(evt.pointerId);
        } else {
            document.addEventListener('mousemove', this.handleGestureMove, true);
            document.addEventListener('mouseup', this.handleGestureEnd, true);
        }

        this.initialTouchPos = this.getGesturePointFromEvent(evt);
        this.swipeFrontElement.style.transition = 'initial';
        this.overlayElement.style.transition = 'initial';
    };

    handleGestureMove = (evt) => {
        if (this._disabled) return;
        evt.preventDefault();

        if (!this.initialTouchPos) return;
        this.wasMove = true;
        this.lastTouchPos = this.getGesturePointFromEvent(evt);

        if (this.rafPending) return;
        this.rafPending = true;

        requestAnimationFrame(this.onAnimFrame);
    };

    handleGestureEnd = (evt) => {
        if (this._disabled) return;
        evt.preventDefault();

        if (evt.touches && evt.touches.length > 0) return;
        this.rafPending = false;

        if (window.PointerEvent) {
            evt.target.releasePointerCapture(evt.pointerId);
        } else {
            document.removeEventListener('mousemove', this.handleGestureMove, true);
            document.removeEventListener('mouseup', this.handleGestureEnd, true);
        }

        this.updateSwipeRestPosition();
        this.initialTouchPos = null;
        this.wasStart = false;
        this.wasMove = false;
    };



    destroy = () => {
        if (this.swipeFrontElement) {
            if (window.PointerEvent) {
                this.swipeFrontElement.removeEventListener('pointerdown', this.handleGestureStart, true);
                this.swipeFrontElement.removeEventListener('pointermove', this.handleGestureMove, true);
                this.swipeFrontElement.removeEventListener('pointerup', this.handleGestureEnd, true);
                this.swipeFrontElement.removeEventListener('pointercancel', this.handleGestureEnd, true);
            } else {
                this.swipeFrontElement.removeEventListener('touchstart', this.handleGestureStart, true);
                this.swipeFrontElement.removeEventListener('touchmove', this.handleGestureMove, true);
                this.swipeFrontElement.removeEventListener('touchend', this.handleGestureEnd, true);
                this.swipeFrontElement.removeEventListener('touchcancel', this.handleGestureEnd, true);

                this.swipeFrontElement.removeEventListener('mousedown', this.handleGestureStart, true);
            }
            this.swipeFrontElement.style.transform = '';
            this.overlayElement.style.pointerEvents = 'none';
            this.overlayElement.style.opacity = '';
        }

        document.removeEventListener('mousemove', this.handleGestureMove, true);
        document.removeEventListener('mouseup', this.handleGestureEnd, true);
        this.swipeFrontElement = null;
        this.overlayElement = null;
    };

    init = (elQuery, overlayElQuery, initialOffset = 0, targetOffset = 0, onStateChange = noop) => {
        if (!elQuery) return;
        this.swipeFrontElement = document.querySelector(elQuery);
        this.overlayElement = document.querySelector(overlayElQuery);

        if (this.swipeFrontElement) {
            this.slopValue = (initialOffset - targetOffset) * (1 / 4);
            this.initialOffset = initialOffset;
            this.targetOffset = targetOffset;
            this.bottomBound = Math.min(initialOffset, targetOffset);
            this.topBound = Math.max(initialOffset, targetOffset);
            this.initialTouchPos = null;
            this.lastTouchPos = null;
            this.currentYPosition = 0;
            this.onStateChange = onStateChange;
            this.changeState(this.STATE_DEFAULT);
            this.enable();
            this.bindEventHandlers();
        }
    };

    disable = () => {
        this._disabled = true;
    };

    enable = () => {
        this._disabled = false;
    };

    setOffset = (initialOffset = this.initialOffset, targetOffset = this.targetOffset) => {
        this.slopValue = (initialOffset - targetOffset) * (1 / 4);
        this.initialOffset = initialOffset;
        this.targetOffset = targetOffset;
        this.bottomBound = Math.min(initialOffset, targetOffset);
        this.topBound = Math.max(initialOffset, targetOffset);
        if (this.currentState === this.STATE_DEFAULT) {
            this.changeState(this.STATE_DEFAULT);
        }
    };

    toExpandState = (immediate) => {
        if (!immediate && this.swipeFrontElement) this.swipeFrontElement.style.transition = 'transform 0.2s ease-out';
        if (!immediate && this.overlayElement) this.overlayElement.style.transition = 'opacity 0.2s ease-out';
        this.changeState(this.STATE_EXPANDED);
    };

    toInitialState = (immediate) => {
        if (!immediate && this.swipeFrontElement) this.swipeFrontElement.style.transition = 'transform 0.2s ease-out';
        if (!immediate && this.overlayElement) this.overlayElement.style.transition = 'opacity 0.2s ease-out';
        this.changeState(this.STATE_DEFAULT);
    };
}
