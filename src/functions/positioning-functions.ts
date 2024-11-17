import {PositionInstance} from "../instances/PositionInstance";

export const getAbsoluteEnginePosition = (referrer: HTMLElement, referrerMargin: number, referrerWidth: boolean, locationX: string, locationY: string) => {

    if (!referrer) return {};

    let r = new PositionInstance({
        position: 'absolute',
    });
    const rect = referrer.getBoundingClientRect();

    if (referrerWidth) {
        r.width = referrer.offsetWidth;
    }

    if (locationY === 'top') {
        r.top = 0 - referrerMargin;

    } else if (locationY === 'bottom') {
        r.top = referrer.offsetHeight + referrerMargin;

    } else if (locationY === 'referrer-center') {
        r.top = (referrer.offsetHeight / 2) + referrerMargin;
    }

    if (locationX === 'left-corner') {
        r.left = 0;

    } else if (locationX === 'right') {
        r.left = referrer.offsetWidth + referrerMargin;
    }

    return r;
}