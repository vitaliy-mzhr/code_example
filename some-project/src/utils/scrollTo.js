import isElement from 'lodash/fp/isElement';
import isFinite from 'lodash/fp/isFinite';



export default function scrollTo(container = window, target = 0, _duration = 0, speed = 60, offset = 0, immediate = false, easeFn = _easeLinear) {
    if ((!isElement(target) && !isFinite(target)) || (!isElement(container) && container !== window)) {
        return;
    }

    const targetOffset = isElement(target) ? target.offsetTop : target;

    if (immediate) {
        container.scrollTop = targetOffset;
        return;
    }

    let distance = null;
    let from = null;

    if (container === window) {
        from = window.pageYOffset;
        distance = isElement(target) ? target.getBoundingClientRect().top + offset : targetOffset + offset;
    } else {
        from = container.scrollTop;
        distance = targetOffset - from + offset;
    }

    let startTime = null;
    let lastPageYOffset;
    let duration = _duration ? _duration : parseInt(Math.abs(distance) / 100 * speed, 10);

    // rAF loop
    const loop = (currentTime) => {
        let currentPageYOffset = null;

        if (container === window) {
            currentPageYOffset = window.pageYOffset;
        } else {
            currentPageYOffset = container.scrollTop;
        }

        if (!startTime) {
            // To starts time from 1, we subtracted 1 from current time
            // If time starts from 1 The first loop will not do anything,
            // because easing value will be zero
            startTime = currentTime - 1;
        }

        const timeElapsed = currentTime - startTime;

        if (lastPageYOffset) {
            if ((distance > 0 && lastPageYOffset > currentPageYOffset) || (distance < 0 && lastPageYOffset < currentPageYOffset)) {
                return;
            }
        }
        lastPageYOffset = currentPageYOffset;

        let val = easeFn(timeElapsed, from, distance, duration);

        if (container === window) {
            window.scroll(0, val);
        } else {
            container.scrollTop = val;
        }

        if (timeElapsed < duration) {
            window.requestAnimationFrame(loop);
        } else {
            if (container === window) {
                window.scroll(0, distance + from);
            } else {
                container.scrollTop = distance + from;
            }
        }
    };

    window.requestAnimationFrame(loop);
}

export function _easeLinear(t, b, _c, d) {
    const c = _c - b;
    return c * t / d + b;
}
