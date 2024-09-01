import { defineComponent, useSlots, computed, openBlock, createElementBlock, normalizeClass, unref, renderSlot } from "vue";
import { __ } from "lkt-i18n";
const _hoisted_1 = {
  key: 0,
  class: "lkt-tooltip-content"
};
const _hoisted_2 = ["innerHTML"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LktTooltip",
  props: {
    class: { default: "" },
    text: { default: "" },
    icon: { default: "" },
    iconAtEnd: { type: Boolean, default: false }
  },
  setup(__props) {
    const slots = useSlots();
    const props = __props;
    const computedClassName = computed(() => {
      return props.class;
    }), computedText = computed(() => {
      let text = "";
      if (props.text.startsWith("__:")) {
        text = __(props.text.substring(3));
      } else {
        text = props.text;
      }
      if (props.icon) {
        let icon = '<i class="' + props.icon + '"></i>';
        if (props.iconAtEnd) {
          text += icon;
        } else {
          text = icon + text;
        }
      }
      return text;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["lkt-tooltip", computedClassName.value])
      }, [
        unref(slots).default ? (openBlock(), createElementBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "default")
        ])) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: "lkt-tooltip-content",
          innerHTML: computedText.value
        }, null, 8, _hoisted_2))
      ], 2);
    };
  }
});
const LktTooltip = {
  install: (app) => {
    if (app.component("lkt-tooltip") === void 0) app.component("lkt-tooltip", _sfc_main);
  }
};
export {
  LktTooltip as default
};
