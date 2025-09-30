<script setup lang="ts">
import {computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch} from "vue";
import {PositionInstance} from "../instances/PositionInstance";
import {getAbsoluteEnginePosition, getFixedEnginePosition} from "../functions/positioning-functions";
import {
    extractI18nValue,
    getDefaultValues,
    Tooltip,
    TooltipConfig,
    TooltipLocationX,
    TooltipLocationY,
    TooltipPositionEngine
} from "lkt-vue-kernel";

const emit = defineEmits([
    'update:modelValue'
]);

const slots = useSlots();

const props = withDefaults(defineProps<TooltipConfig>(), getDefaultValues(Tooltip));

const calculatedReferrerMargin = typeof props.referrerMargin === 'string' ? parseFloat(props.referrerMargin) : props.referrerMargin;
const calculatedWindowMargin = typeof props.windowMargin === 'string' ? parseFloat(props.windowMargin) : props.windowMargin;

const styles = ref(new PositionInstance({
        position: TooltipPositionEngine.Fixed,
    })),
    isOpen = ref(props.modelValue),
    contentInnerObserver = ref(<MutationObserver | null>null),
    sizerElement = ref(<HTMLElement | null>null),
    showTooltipOnHoverTimeout = ref(undefined),
    hideTooltipOnLeaveTimeout = ref(undefined),
    referrerIsHovered = ref(false);

const computedClassName = computed(() => {
        return props.class;
    }),
    computedText = computed(() => {

        let text = extractI18nValue(props.text);

        if (props.icon) {
            let icon = '<i class="' + props.icon + '"></i>'
            if (props.iconAtEnd) {
                text += icon;
            } else {
                text = icon + text;
            }
        }

        return text;
    }),
    computedStyles = computed(() => {
        return styles.value.getStyles();
    });

const doClose = () => {
    if (props.remoteControl) return;
    isOpen.value = false;
}

let calcStyleTimeout = undefined;

const calcStyle = () => {

        if (calcStyleTimeout) clearTimeout(calcStyleTimeout);

        calcStyleTimeout = setTimeout(() => {
            if (props.engine === TooltipPositionEngine.Absolute) {
                styles.value.assign(getAbsoluteEnginePosition(
                    props.referrer,
                    calculatedReferrerMargin,
                    props.referrerWidth,
                    props.locationX,
                    props.locationY,
                ))
                return;
            }

            styles.value.assign(getFixedEnginePosition(
                props.referrer,
                calculatedWindowMargin,
                calculatedReferrerMargin,
                props.referrerWidth,
                props.compensationX,
                props.compensationY,
                props.locationX,
                props.locationY,
                sizerElement.value,
                props.compensateGlobalContainers
            ))
        }, 50);


    },
    onClickOutside = (e: PointerEvent) => {
        if (props.alwaysOpen) return;

        //@ts-ignore
        if (isOpen.value && !props.remoteControl && !(sizerElement.value.contains(e.target) || props.referrer.contains(e.target))) {
            doClose();
            return;
        }
    },
    handleReferrerHover = ($event: MouseEvent) => {
        if (props.remoteControl) return;
        if (referrerIsHovered.value && props.showOnReferrerHover) {
            if (showTooltipOnHoverTimeout.value !== undefined) {
                clearTimeout(showTooltipOnHoverTimeout.value);
            }
            if (hideTooltipOnLeaveTimeout.value !== undefined) {
                clearTimeout(hideTooltipOnLeaveTimeout.value);
            }

            //@ts-ignore
            showTooltipOnHoverTimeout.value = setTimeout(() => {
                isOpen.value = true;
                clearTimeout(showTooltipOnHoverTimeout.value);
                clearTimeout(hideTooltipOnLeaveTimeout.value);
            }, props.showOnReferrerHoverDelay);

        } else if (!referrerIsHovered.value && props.hideOnReferrerLeave) {
            if (showTooltipOnHoverTimeout.value !== undefined) {
                clearTimeout(showTooltipOnHoverTimeout.value);
            }
            if (hideTooltipOnLeaveTimeout.value !== undefined) {
                clearTimeout(hideTooltipOnLeaveTimeout.value);
            }

            //@ts-ignore
            hideTooltipOnLeaveTimeout.value = setTimeout(() => {
                isOpen.value = false;
                clearTimeout(hideTooltipOnLeaveTimeout.value);
                clearTimeout(showTooltipOnHoverTimeout.value);
            }, props.showOnReferrerHoverDelay);

        } else if (!referrerIsHovered.value) {
            clearTimeout(showTooltipOnHoverTimeout.value);
            clearTimeout(hideTooltipOnLeaveTimeout.value);
        }
    },
    onReferrerMousemove = (event: MouseEvent) => {
        referrerIsHovered.value = true;
        handleReferrerHover(event);
    },
    onReferrerMouseleave = (event: MouseEvent) => {
        referrerIsHovered.value = false;
        handleReferrerHover(event);
    };

watch(() => props.modelValue, v => isOpen.value = v);
watch(isOpen, v => {
    if (v) calcStyle();
    if (props.remoteControl) return;
    emit('update:modelValue', v);
});

//@ts-ignore
let scrollTimeout = undefined;

const onScrollEvent = () => {
    //@ts-ignore
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => calcStyle(), 1);
}


onMounted(() => {
    window.addEventListener('click', onClickOutside);
    window.addEventListener('scroll', onScrollEvent);
    window.addEventListener('resize', calcStyle);

    if (props.referrer) {
        let modalScroller = props.referrer.closest(".lkt-modal");
        if (modalScroller) {
            modalScroller.addEventListener('scroll', calcStyle);
        }

        if (props.showOnReferrerHover) {
            props.referrer.addEventListener('mousemove', onReferrerMousemove);
        }
        if (props.hideOnReferrerLeave) {
            props.referrer.addEventListener('mouseleave', onReferrerMouseleave);
        }
    }

    if (isOpen.value) {
        calcStyle();
    }

    nextTick(() => {
        const observer = new MutationObserver(() => {
            setTimeout(() => {
                calcStyle()
            }, 1);
        });
        //@ts-ignore
        observer.observe(sizerElement.value, {
            childList: true,
            subtree: true,
            attributes: false,
        });
        contentInnerObserver.value = observer;
    })
})

onBeforeUnmount(() => {
    window.removeEventListener('click', onClickOutside);
    window.removeEventListener('scroll', onScrollEvent);
    window.removeEventListener('resize', calcStyle);

    if (props.referrer) {
        let modalScroller = props.referrer.closest(".lkt-modal");
        if (modalScroller) {
            modalScroller.removeEventListener('scroll', calcStyle);
        }

        if (props.showOnReferrerHover) {
            props.referrer.removeEventListener('mousemove', onReferrerMousemove);
        }
        if (props.hideOnReferrerLeave) {
            props.referrer.removeEventListener('mouseleave', onReferrerMouseleave);
        }
    }

    if (typeof contentInnerObserver.value?.disconnect === 'function') {
        contentInnerObserver.value?.disconnect();
    }
})

</script>

<template>
    <template v-if="teleport">
        <teleport :to="teleport">
            <div
                v-show="isOpen"
                ref="sizerElement"
                class="lkt-tooltip"
                :class="computedClassName"
                :style="computedStyles">
                <template v-if="slots.default">
                    <div class="lkt-tooltip-content" :class="contentClass">
                        <slot name="default" :do-close="doClose"/>
                    </div>
                </template>
                <template v-else>
                    <div class="lkt-tooltip-content" :class="contentClass" v-html="computedText"/>
                </template>
            </div>
        </teleport>
    </template>
    <template v-else>
        <div
            v-show="isOpen"
            ref="sizerElement"
            class="lkt-tooltip"
            :class="computedClassName"
            :style="computedStyles">
            <template v-if="slots.default">
                <div class="lkt-tooltip-content" :class="contentClass">
                    <slot name="default" :do-close="doClose"/>
                </div>
            </template>
            <template v-else>
                <div class="lkt-tooltip-content" :class="contentClass" v-html="computedText"/>
            </template>
        </div>
    </template>
</template>