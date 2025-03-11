import { LktObject } from "lkt-ts-interfaces";
export declare class PositionInstance {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    width?: number;
    position?: 'fixed' | 'absolute' | '';
    constructor(data: LktObject);
    assign(data: LktObject | PositionInstance): void;
    getStyles(): LktObject;
}
