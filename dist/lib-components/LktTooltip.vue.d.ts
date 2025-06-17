import { TooltipConfig, TooltipLocationX, TooltipLocationY, TooltipPositionEngine } from "lkt-vue-kernel";
declare const slots: Readonly<{
    [name: string]: import("vue").Slot<any> | undefined;
}>;
declare const isOpen: import("vue").Ref<boolean, boolean>, sizerElement: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
declare const computedClassName: import("vue").ComputedRef<string>, computedText: import("vue").ComputedRef<any>, computedStyles: import("vue").ComputedRef<import("lkt-ts-interfaces").LktObject>;
declare const doClose: () => void;
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_1: {
    doClose: () => void;
};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    default?: (props: typeof __VLS_1) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<TooltipConfig, {
    slots: typeof slots;
    isOpen: typeof isOpen;
    sizerElement: typeof sizerElement;
    computedClassName: typeof computedClassName;
    computedText: typeof computedText;
    computedStyles: typeof computedStyles;
    doClose: typeof doClose;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<TooltipConfig> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    referrer: HTMLElement;
    text: string;
    class: string;
    icon: string;
    modelValue: boolean;
    contentClass: string;
    iconAtEnd: boolean;
    alwaysOpen: boolean;
    engine: TooltipPositionEngine;
    referrerMargin: number | string;
    windowMargin: number | string;
    referrerWidth: boolean;
    locationY: TooltipLocationY;
    locationX: TooltipLocationX;
    showOnReferrerHover: boolean;
    showOnReferrerHoverDelay: number;
    hideOnReferrerLeave: boolean;
    hideOnReferrerLeaveDelay: number;
    compensationX: number;
    compensationY: number;
    compensateGlobalContainers: boolean;
    remoteControl: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_component: import("vue").DefineComponent<TooltipConfig, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<TooltipConfig> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    referrer: HTMLElement;
    text: string;
    class: string;
    icon: string;
    modelValue: boolean;
    contentClass: string;
    iconAtEnd: boolean;
    alwaysOpen: boolean;
    engine: TooltipPositionEngine;
    referrerMargin: number | string;
    windowMargin: number | string;
    referrerWidth: boolean;
    locationY: TooltipLocationY;
    locationX: TooltipLocationX;
    showOnReferrerHover: boolean;
    showOnReferrerHoverDelay: number;
    hideOnReferrerLeave: boolean;
    hideOnReferrerLeaveDelay: number;
    compensationX: number;
    compensationY: number;
    compensateGlobalContainers: boolean;
    remoteControl: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
