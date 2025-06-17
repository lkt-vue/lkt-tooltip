import {PositionInstance} from "../instances/PositionInstance";
import {TooltipLocationX, TooltipLocationY, TooltipPositionEngine, TooltipSettingsController} from "lkt-vue-kernel";

export const getAbsoluteEnginePosition = (referrer: HTMLElement, referrerMargin: number, referrerWidth: boolean, locationX: TooltipLocationX, locationY: TooltipLocationY) => {

    if (!referrer) return {};

    let r = new PositionInstance({
        position: TooltipPositionEngine.Absolute,
    });

    if (referrerWidth) {
        r.width = referrer.offsetWidth;
    }

    if (locationY === TooltipLocationY.Top) {
        r.top = 0 - referrerMargin;

    } else if (locationY === TooltipLocationY.Bottom) {
        r.top = referrer.offsetHeight + referrerMargin;

    } else if (locationY === TooltipLocationY.ReferrerCenter) {
        r.top = (referrer.offsetHeight / 2) + referrerMargin;
    }

    if (locationX === TooltipLocationX.LeftCorner) {
        r.left = 0;

    } else if (locationX === TooltipLocationX.Right) {
        r.left = referrer.offsetWidth + referrerMargin;
    }

    return r;
}

export const getScrollbarWidth = () => {
    // Source: https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    // @ts-ignore
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode?.removeChild(outer);

    return scrollbarWidth;
}

function getAbsolutePosition(element) {
    let top = 0;
    let left = 0;

    while (element) {
        top += element.offsetTop - (element.scrollTop || 0);
        left += element.offsetLeft - (element.scrollLeft || 0);
        element = element.offsetParent;
    }

    return { top, left };
}

export const getFixedEnginePosition = (
    referrer: HTMLElement,
    windowMargin: number,
    referrerMargin: number,
    referrerWidth: boolean,
    compensationX: number,
    compensationY: number,
    locationX: TooltipLocationX,
    locationY: TooltipLocationY,
    sizerElement?: HTMLElement,
    compensateGlobalContainers: boolean = false
) => {

    if (!referrer) return {};

    //@ts-ignore
    compensationY = parseFloat(compensationY);
    //@ts-ignore
    compensationX = parseFloat(compensationX);
    if (isNaN(compensationY)) compensationY = 0;
    if (isNaN(compensationX)) compensationX = 0;

    let r = new PositionInstance({
        position: TooltipPositionEngine.Fixed,
    });

    // const absolutePosition = getAbsolutePosition(referrer);
    // const scrollOffset = window.pageYOffset || document.documentElement.scrollTop;

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    // const scrollX = window.scrollX || document.documentElement.scrollLeft;

    const rect = referrer.getBoundingClientRect(),
        referrerHeight = rect.height,
        sizerElementWidth = sizerElement?.offsetWidth ?? 0,
        sizerElementHeight = sizerElement?.offsetHeight ?? 0,
        scrollBarWidth = getScrollbarWidth(),
        windowWidth = window.innerWidth;

    if (referrerWidth) {
        r.width = rect.width;
    }

    if (locationY === TooltipLocationY.Top) {
        r.top = rect.top - referrerMargin - compensationY;

    } else if (locationY === TooltipLocationY.Bottom) {
        r.top = rect.top + referrerHeight + referrerMargin - compensationY;

    } else if (locationY === TooltipLocationY.ReferrerCenter) {
        r.top = rect.top + (referrerHeight / 2) + referrerMargin;
    }

    if (locationX === TooltipLocationX.LeftCorner) {
        r.left = rect.left - compensationX;

    } else if (locationX === TooltipLocationX.Right) {
        r.left = rect.left + referrer.offsetWidth + referrerMargin - compensationX;
    }

    // // Deal with containers affecting positioning (only if not inside lkt-modal)
    // if (compensateGlobalContainers) {
    //     let modalContainer = referrer?.closest('.lkt-modal');
    //     if (!modalContainer) {
    //         let topOffset = 0;
    //         let leftOffset = 0;
    //         TooltipSettingsController.data.globalContainersAffectingPositioning?.forEach(element => {
    //             const style = getComputedStyle(element);
    //
    //             // Accumulate top offset
    //             topOffset += parseFloat(style.borderTopWidth) || 0;
    //             topOffset += parseFloat(style.paddingTop) || 0;
    //
    //             // Accumulate left offset
    //             leftOffset += parseFloat(style.borderLeftWidth) || 0;
    //             leftOffset += parseFloat(style.paddingLeft) || 0;
    //         })
    //
    //         if (r.left) r.left -= leftOffset;
    //         if (r.top) r.top -= topOffset;
    //
    //         if (r.top) r.top += scrollY;
    //     }
    // }




    // Adjust style if content is bigger than window size
    let wLastPixel = r.left + sizerElementWidth + scrollBarWidth;

    if (wLastPixel > (windowWidth - windowMargin - scrollBarWidth)) {
        let diff = wLastPixel - windowWidth;

        let newLeft = parseFloat(r.left) - diff;
        if (newLeft <= 0 && windowMargin) {
            newLeft = windowMargin;
        }

        r.left = newLeft;

        if (r.left !== 0) {
        if (windowMargin) {
            r.right = windowMargin + scrollBarWidth;
        } else if (r.left > 0) {
            r.right = scrollBarWidth;
        }
        }
    } else {
        r.right = undefined;
    }


    let currentTop = r.top ? r.top : rect.top;

    if (locationY === TooltipLocationY.Top) {
        r.top = currentTop - sizerElementHeight;
    } else if (locationY === TooltipLocationY.Center) {
        r.top = rect.top - (sizerElementHeight / 2) + (referrerHeight / 2);
    }

    currentTop = r.top ? r.top : rect.top;

    let hLastPixel = currentTop + sizerElementHeight + scrollBarWidth;

    if (hLastPixel > (window.innerHeight - windowMargin - scrollBarWidth)) {
        // if (!adjusted && [TooltipLocationY.Bottom, TooltipLocationY.Top].includes(locationY)) {
        //     console.log('ajustes máximos!')
        //     let newLocationY: TooltipLocationY = locationY;
        //     if (locationY === TooltipLocationY.Bottom) newLocationY = TooltipLocationY.Top;
        //     else if (locationY === TooltipLocationY.Top) newLocationY = TooltipLocationY.Bottom;
        //     return getFixedEnginePosition(
        //         referrer,
        //         windowMargin,
        //         referrerMargin,
        //         referrerWidth,
        //         compensationX,
        //         compensationY,
        //         locationX,
        //         newLocationY,
        //         sizerElement,
        //         true,
        //     );
        // }

        let diff = hLastPixel - window.innerHeight;

        let newTop = r.top - diff - windowMargin - scrollBarWidth;
        if (newTop < 0) newTop = windowMargin;
        r.top = newTop;

        if (windowMargin) {
            r.bottom = windowMargin;
        } else {
            r.bottom = 0;
        }
    } else {
        r.bottom = undefined;
    }
    return r;
}