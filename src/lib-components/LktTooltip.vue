<script setup lang="ts">

// Props
import {computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch} from "vue";
import {__} from "lkt-i18n";
import {PositionInstance} from "../instances/PositionInstance";
import {getAbsoluteEnginePosition} from "../functions/positioning-functions";
import {
    getDefaultValues,
    Tooltip,
    TooltipConfig,
    TooltipLocationX,
    TooltipLocationY,
    TooltipPositionEngine
} from "lkt-vue-kernel";

const emit = defineEmits(['update:modelValue']);

const slots = useSlots();

const props = withDefaults(defineProps<TooltipConfig>(), getDefaultValues(Tooltip));

const calculatedReferrerMargin = typeof props.referrerMargin === 'string' ? parseFloat(props.referrerMargin) : props.referrerMargin;
const calculatedWindowMargin = typeof props.windowMargin === 'string' ? parseFloat(props.windowMargin) : props.windowMargin;

const styles = ref(new PositionInstance({
        position: TooltipPositionEngine.Fixed,
    })),
    isOpen = ref(props.modelValue),
    contentInnerObserver = ref(<MutationObserver | null>null),
    sizerElement = ref(<HTMLElement | null>null);

const computedClassName = computed(() => {
        return props.class;
    }),
    computedText = computed(() => {

        let text = '';
        if (props.text.startsWith('__:')) {
            text = __(props.text.substring(3));
        } else {
            text = props.text;
        }

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
    isOpen.value = false;
}


const getScrollbarWidth = () => {
    // Source: https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

const adjustStyle = () => {

    if (!sizerElement.value) return;

    const rect = props.referrer.getBoundingClientRect(),
        sizerElementWidth = sizerElement.value.offsetWidth;

    let scrollBarWidth = getScrollbarWidth();
    let contentEndsAtRight = rect.left + sizerElementWidth + scrollBarWidth;

    let currentTop = styles.value.top ? styles.value.top : rect.top;

    if (contentEndsAtRight > (window.innerWidth - calculatedWindowMargin - scrollBarWidth)) {
        let diff = contentEndsAtRight - window.innerWidth;
        let newLeft = rect.left - diff - calculatedWindowMargin - scrollBarWidth;
        if (newLeft < 0) newLeft = calculatedWindowMargin;
        styles.value.left = newLeft;

        if (calculatedWindowMargin) {
            styles.value.right = calculatedWindowMargin;
        } else {
            styles.value.right = 0;
        }
    } else {
        styles.value.right = undefined;
    }

    if (props.locationY === TooltipLocationY.Top) {
        styles.value.top = currentTop - sizerElement.value.offsetHeight;
    } else if (props.locationY === TooltipLocationY.Center) {
        styles.value.top = rect.top - (sizerElement.value.offsetHeight / 2) + (props.referrer.offsetHeight / 2);
    }


    let contentEndsAtBottom = rect.top + sizerElement.value.offsetHeight + scrollBarWidth;

    if (contentEndsAtBottom > (window.innerHeight - calculatedWindowMargin - scrollBarWidth)) {
        let diff = contentEndsAtBottom - window.innerHeight;

        let newTop = rect.top - diff - calculatedWindowMargin - scrollBarWidth;
        if (newTop < 0) newTop = calculatedWindowMargin;
        styles.value.top = newTop;

        if (calculatedWindowMargin) {
            styles.value.bottom = calculatedWindowMargin;
        } else {
            styles.value.bottom = 0;
        }
    } else {
        styles.value.bottom = undefined;
    }
}

const calcStyle = () => {
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

        if (!props.referrer) return;
        const rect = props.referrer.getBoundingClientRect();

        if (props.referrerWidth) {
            styles.value.width = props.referrer.offsetWidth;
        }

        if (props.locationY === TooltipLocationY.Top) {
            styles.value.top = rect.top - calculatedReferrerMargin;

        } else if (props.locationY === TooltipLocationY.Bottom) {
            styles.value.top = rect.top + props.referrer.offsetHeight + calculatedReferrerMargin;

        } else if (props.locationY === TooltipLocationY.ReferrerCenter) {
            styles.value.top = rect.top + (props.referrer.offsetHeight / 2) + calculatedReferrerMargin;
        }

        if (props.locationX === TooltipLocationX.LeftCorner) {
            styles.value.left = rect.left;

        } else if (props.locationX === TooltipLocationX.Right) {
            styles.value.left = rect.left + props.referrer.offsetWidth + calculatedReferrerMargin;
        }

        nextTick(() => {
            adjustStyle();
        })
    },
    onClickOutside = (e: PointerEvent) => {
        if (props.alwaysOpen) return;

        //@ts-ignore
        if (isOpen.value && !(sizerElement.value.contains(e.target) || props.referrer.contains(e.target))) {
            doClose();
            return;
        }
    };

watch(() => props.modelValue, v => isOpen.value = v);
watch(isOpen, v => {
    if (v) calcStyle();
    emit('update:modelValue', v);
});

let scrollTimeout = undefined;

const onScrollEvent = () => {
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
    }

    contentInnerObserver.value.disconnect();
})

</script>

<template>
    <div
        v-show="isOpen"
        ref="sizerElement"
        class="lkt-tooltip"
        :class="computedClassName"
        :style="computedStyles">
        <template v-if="slots.default">
            <div class="lkt-tooltip-content">
                <slot name="default" :do-close="doClose"/>
            </div>
        </template>
        <template v-else>
            <div class="lkt-tooltip-content" v-html="computedText"/>
        </template>
    </div>
</template>