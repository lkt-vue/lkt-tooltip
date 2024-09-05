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

    windowMargin?: number
    referrerWidth?: boolean,
    referrer: HTMLElement,
    locationY?: 'top' | 'bottom'
}>(), {
    open: false,
    class: '',
    text: '',
    icon: '',
    iconAtEnd: false,
    referrerWidth: false,
    locationY: 'bottom',
    windowMargin: 0
});

const styles = ref({}),
    isOpen = ref(props.modelValue),
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
        left = rect.left,
        sizerElementWidth = sizerElement.value.offsetWidth;

    let contentEndsAtRight = left + sizerElementWidth;

    if (contentEndsAtRight > window.innerWidth) {
        let diff = contentEndsAtRight - window.innerWidth;
        let scrollBarWidth = getScrollbarWidth();

        styles.value.left = (left - diff - props.windowMargin - scrollBarWidth) + 'px';

        if (props.windowMargin) {
            styles.value.right = props.windowMargin + 'px';
        }
    }
}

const calcStyle = () => {
        if (!props.referrer) return;
        const rect = props.referrer.getBoundingClientRect(),
            left = rect.left;

        let _styles = {
            position: 'fixed',
            transform: 'fixed',
            transition: 'fixed',
            left: left + 'px',
        }

        if (props.referrerWidth) {
            _styles.width = props.referrer.offsetWidth + 'px';
        }

        if (props.locationY === 'top') {
            let bottom = window.outerHeight - rect.bottom - props.referrer.offsetHeight;
            _styles.bottom = bottom + 'px';
        } else {
            let top = rect.top + props.referrer.offsetHeight;
            _styles.top = top + 'px';
        }

        styles.value = _styles;

        nextTick(() => {
            adjustStyle();
        })
    },
    onClickOutside = (e: PointerEvent) => {
        //@ts-ignore
        if (!props.referrer.contains(e.target)) {
            doClose();
            return;
        }
    };

watch(() => props.modelValue, v => isOpen.value = v);
watch(isOpen, v => {
    if (v) calcStyle();
    emit('update:modelValue', v);
});


onMounted(() => {
    window.addEventListener('click', onClickOutside);
    window.addEventListener('scroll', calcStyle);
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
})

onBeforeUnmount(() => {
    window.removeEventListener('click', onClickOutside);
    window.removeEventListener('scroll', calcStyle);
    window.removeEventListener('resize', calcStyle);

    if (props.referrer) {
        let modalScroller = props.referrer.closest(".lkt-modal");
        if (modalScroller) {
            modalScroller.removeEventListener('scroll', calcStyle);
        }
    }
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