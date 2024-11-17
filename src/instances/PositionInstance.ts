import {LktObject} from "lkt-ts-interfaces";

export class PositionInstance {

    top?: number = undefined;
    bottom?: number = undefined;
    left?: number = undefined;
    right?: number = undefined;
    width?: number = undefined;
    position?: 'fixed' | 'absolute' | '' = '';

    constructor(data: LktObject) {
        //@ts-ignore
        for (let k in data) this[k] = data[k];
    }

    assign(data: LktObject|PositionInstance) {
        //@ts-ignore
        for (let k in data) this[k] = data[k];
    }

    getStyles() {
        let r: LktObject = {};
        if (this.position) r.position = this.position;
        if (this.top) r.top = this.top + 'px';
        if (this.bottom) r.bottom = this.bottom + 'px';
        if (this.left) r.left = this.left + 'px';
        if (this.right) r.right = this.right + 'px';
        if (this.width) r.width = this.width + 'px';
        return r;
    }
}