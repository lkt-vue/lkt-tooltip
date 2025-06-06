import { TooltipLocationX, TooltipLocationY } from "lkt-vue-kernel";
export declare const getAbsoluteEnginePosition: (referrer: HTMLElement, referrerMargin: number, referrerWidth: boolean, locationX: TooltipLocationX, locationY: TooltipLocationY) => {};
export declare const getScrollbarWidth: () => number;
export declare const getFixedEnginePosition: (referrer: HTMLElement, windowMargin: number, referrerMargin: number, referrerWidth: boolean, compensationX: number, compensationY: number, locationX: TooltipLocationX, locationY: TooltipLocationY, sizerElement?: HTMLElement, adjusted?: boolean) => {};
