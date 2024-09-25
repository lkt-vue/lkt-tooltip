<script setup lang="ts">

// Props
import {computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch} from "vue";
import {__} from "lkt-i18n";

const emit = defineEmits(['update:modelValue']);

const slots = useSlots();

const props = withDefaults(defineProps<{
    modelValue?: boolean
    class?: string,
    text?: string,
    icon?: string,
    iconAtEnd?: boolean,

    referrerMargin?: number
    windowMargin?: number
    referrerWidth?: boolean,
    referrer: HTMLElement,
    locationY?: 'top' | 'bottom' | 'center' | 'referrer-center'
    locationX?: 'left' | 'right' | 'center' | 'left-corner' | 'right-corner'
}>(), {
    modelValue: false,
    class: '',
    text: '',
    icon: '',
    iconAtEnd: false,
    referrerWidth: false,
    locationY: 'bottom',
    locationX: 'left-corner',
    referrerMargin: 0,
    windowMargin: 0,
});

const styles = ref({}),
    isOpen = ref(props.modelValue),
    contentInnerObserver = ref(null),
    sizerElement = ref(null);

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

    const rect = props.referrer.getBoundingClientRect(),
        sizerElementWidth = sizerElement.value.offsetWidth;

    let scrollBarWidth = getScrollbarWidth();
    let contentEndsAtRight = rect.left + sizerElementWidth + scrollBarWidth;

    let currentTop = styles.value.top ? parseFloat(styles.value.top.replaceAll('px', '')) : rect.top;

    if (contentEndsAtRight > (window.innerWidth - props.windowMargin - scrollBarWidth)) {
        let diff = contentEndsAtRight - window.innerWidth;
        let newLeft = rect.left - diff - props.windowMargin - scrollBarWidth;
        if (newLeft < 0) newLeft = props.windowMargin;
        styles.value.left = (newLeft) + 'px';

        if (props.windowMargin) {
            styles.value.right = props.windowMargin + 'px';
        } else {
            styles.value.right = '0px';
        }
    } else {
        styles.value.right = 'initial';
    }

    if (props.locationY === 'top') {
        styles.value.top = currentTop - sizerElement.value.offsetHeight;
    }
    else if (props.locationY === 'center') {
        styles.value.top = rect.top - (sizerElement.value.offsetHeight / 2) + (props.referrer.offsetHeight / 2);
    }


    let contentEndsAtBottom = rect.top + sizerElement.value.offsetHeight + scrollBarWidth;

    if (contentEndsAtBottom > (window.innerHeight - props.windowMargin - scrollBarWidth)) {
        let diff = contentEndsAtBottom - window.innerHeight;

        let newTop = rect.top - diff - props.windowMargin - scrollBarWidth;
        if (newTop < 0) newTop = props.windowMargin;
        styles.value.top = (newTop) + 'px';

        if (props.windowMargin) {
            styles.value.bottom = props.windowMargin + 'px';
        } else {
            styles.value.bottom = '0px';
        }
    } else {
        styles.value.bottom = 'initial';
    }
}

const calcStyle = () => {
        if (!props.referrer) return;
        const rect = props.referrer.getBoundingClientRect();

        let _styles = {
            position: 'fixed',
            transform: 'fixed',
            transition: 'fixed',
        }

        if (props.referrerWidth) {
            _styles.width = props.referrer.offsetWidth + 'px';
        }

        if (props.locationY === 'top') {
            let bottom = rect.top - props.referrerMargin;
            _styles.top = bottom + 'px';

        } else if (props.locationY === 'bottom') {
            let top = rect.top + props.referrer.offsetHeight + props.referrerMargin;
            _styles.top = top + 'px';

        } else if (props.locationY === 'referrer-center') {
            let top = rect.top + (props.referrer.offsetHeight / 2) + props.referrerMargin;
            _styles.top = top + 'px';
        }

        if (props.locationX === 'left-corner') {
            _styles.left = rect.left + 'px';

        } else if (props.locationX === 'right') {
            let left = rect.left + props.referrer.offsetWidth + props.referrerMargin;
            _styles.left = left + 'px';
        }

        styles.value = _styles;

        nextTick(() => {
            adjustStyle();
        })
    },
    onClickOutside = (e: PointerEvent) => {
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

const onScrollEvent = () => {
    // calcStyle();

    setTimeout(() => {
        calcStyle();
    }, 1);
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
        :style="styles">
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