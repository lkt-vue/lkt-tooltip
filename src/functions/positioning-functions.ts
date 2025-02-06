import {PositionInstance} from "../instances/PositionInstance";
import {TooltipLocationX, TooltipLocationY, TooltipPositionEngine} from "lkt-vue-kernel";

export const getAbsoluteEnginePosition = (referrer: HTMLElement, referrerMargin: number, referrerWidth: boolean, locationX: TooltipLocationX, locationY: TooltipLocationY) => {

    if (!referrer) return {};

    let r = new PositionInstance({
        position: TooltipPositionEngine.Absolute,
    });
    const rect = referrer.getBoundingClientRect();

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