import { defineComponent, useSlots, ref, computed, watch, onMounted, onBeforeUnmount, withDirectives, openBlock, createElementBlock, normalizeClass, normalizeStyle, unref, renderSlot, vShow, nextTick } from "vue";
import { __ } from "lkt-i18n";
const _hoisted_1 = {
  key: 0,
  class: "lkt-tooltip-content"
};
const _hoisted_2 = ["innerHTML"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LktTooltip",
  props: {
    modelValue: { type: Boolean, default: false },
    class: { default: "" },
    text: { default: "" },
    icon: { default: "" },
    iconAtEnd: { type: Boolean, default: false },
    referrerMargin: { default: 0 },
    windowMargin: { default: 0 },
    referrerWidth: { type: Boolean, default: false },
    referrer: {},
    locationY: { default: "bottom" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const slots = useSlots();
    const props = __props;
    const styles = ref({}), isOpen = ref(props.modelValue), sizerElement = ref(null);
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
    const doClose = () => {
      isOpen.value = false;
    };
    const getScrollbarWidth = () => {
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll";
      outer.style.msOverflowStyle = "scrollbar";
      document.body.appendChild(outer);
      const inner = document.createElement("div");
      outer.appendChild(inner);
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
      outer.parentNode.removeChild(outer);
      return scrollbarWidth;
    };
    const adjustStyle = () => {
      const rect = props.referrer.getBoundingClientRect(), left = rect.left, sizerElementWidth = sizerElement.value.offsetWidth;
      let contentEndsAtRight = left + sizerElementWidth;
      let scrollBarWidth = getScrollbarWidth();
      let currentTop = parseFloat(styles.value.top.replaceAll("px", ""));
      if (contentEndsAtRight > window.innerWidth - props.windowMargin - scrollBarWidth) {
        let diff = contentEndsAtRight - window.innerWidth;
        let newLeft = left - diff - props.windowMargin - scrollBarWidth;
        if (newLeft < 0) newLeft = props.windowMargin;
        styles.value.left = newLeft + "px";
        if (props.windowMargin) {
          styles.value.right = props.windowMargin + "px";
        }
      }
      if (props.locationY === "top") {
        styles.value.top = currentTop - sizerElement.value.offsetHeight;
      }
      let contentEndsAtBottom = rect.top + sizerElement.value.offsetHeight;
      if (contentEndsAtBottom > window.innerHeight - props.windowMargin - scrollBarWidth) {
        let diff = contentEndsAtBottom - window.innerHeight;
        let newTop = rect.top - diff - props.windowMargin - scrollBarWidth;
        if (newTop < 0) newTop = props.windowMargin;
        styles.value.top = newTop + "px";
        if (props.windowMargin) {
          styles.value.bottom = props.windowMargin + "px";
        }
      }
    };
    const calcStyle = () => {
      if (!props.referrer) return;
      const rect = props.referrer.getBoundingClientRect(), left = rect.left;
      let _styles = {
        position: "fixed",
        transform: "fixed",
        transition: "fixed",
        left: left + "px"
      };
      if (props.referrerWidth) {
        _styles.width = props.referrer.offsetWidth + "px";
      }
      if (props.locationY === "top") {
        let bottom = rect.top - props.referrerMargin;
        _styles.top = bottom + "px";
      } else {
        let top = rect.top + props.referrer.offsetHeight + props.referrerMargin;
        _styles.top = top + "px";
      }
      styles.value = _styles;
      nextTick(() => {
        adjustStyle();
      });
    }, onClickOutside = (e) => {
      if (isOpen.value && !(sizerElement.value.contains(e.target) || props.referrer.contains(e.target))) {
        doClose();
        return;
      }
    };
    watch(() => props.modelValue, (v) => isOpen.value = v);
    watch(isOpen, (v) => {
      if (v) calcStyle();
      emit("update:modelValue", v);
    });
    onMounted(() => {
      window.addEventListener("click", onClickOutside);
      window.addEventListener("scroll", calcStyle);
      window.addEventListener("resize", calcStyle);
      if (props.referrer) {
        let modalScroller = props.referrer.closest(".lkt-modal");
        if (modalScroller) {
          modalScroller.addEventListener("scroll", calcStyle);
        }
      }
      if (isOpen.value) {
        calcStyle();
      }
    });
    onBeforeUnmount(() => {
      window.removeEventListener("click", onClickOutside);
      window.removeEventListener("scroll", calcStyle);
      window.removeEventListener("resize", calcStyle);
      if (props.referrer) {
        let modalScroller = props.referrer.closest(".lkt-modal");
        if (modalScroller) {
          modalScroller.removeEventListener("scroll", calcStyle);
        }
      }
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        ref_key: "sizerElement",
        ref: sizerElement,
        class: normalizeClass(["lkt-tooltip", computedClassName.value]),
        style: normalizeStyle(styles.value)
      }, [
        unref(slots).default ? (openBlock(), createElementBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "default", { doClose })
        ])) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: "lkt-tooltip-content",
          innerHTML: computedText.value
        }, null, 8, _hoisted_2))
      ], 6)), [
        [vShow, isOpen.value]
      ]);
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
