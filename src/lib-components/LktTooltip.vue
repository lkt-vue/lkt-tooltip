<script setup lang="ts">

// Props
import {computed, useSlots} from "vue";
import {__} from "lkt-i18n";

const slots = useSlots();

const props = withDefaults(defineProps<{
    class: string,
    text: string,
    icon: string,
    iconAtEnd: boolean,

}>(), {
    class: '',
    text: '',
    icon: '',
    iconAtEnd: false,
});

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


</script>

<template>
    <div class="lkt-tooltip" :class="computedClassName">
        <template v-if="slots.default">
            <div class="lkt-tooltip-content">
                <slot/>
            </div>
        </template>
        <template v-else>
            <div class="lkt-tooltip-content" v-html="computedText"/>
        </template>
    </div>
</template>