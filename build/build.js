import { defineComponent, useSlots, ref, computed, watch, nextTick, onMounted, onBeforeUnmount, withDirectives, openBlock, createElementBlock, normalizeStyle, normalizeClass, unref, renderSlot, vShow } from "vue";
import { __ } from "lkt-i18n";
class PositionInstance {
  constructor(data) {
    this.top = void 0;
    this.bottom = void 0;
    this.left = void 0;
    this.right = void 0;
    this.width = void 0;
    this.position = "";
    for (let k in data) this[k] = data[k];
  }
  assign(data) {
    for (let k in data) this[k] = data[k];
  }
  getStyles() {
    let r = {};
    if (this.position) r.position = this.position;
    if (this.top) r.top = this.top + "px";
    if (this.bottom) r.bottom = this.bottom + "px";
    if (this.left) r.left = this.left + "px";
    if (this.right) r.right = this.right + "px";
    if (this.width) r.width = this.width + "px";
    return r;
  }
}
var PositionEngine = /* @__PURE__ */ ((PositionEngine2) => {
  PositionEngine2["Fixed"] = "fixed";
  PositionEngine2["Absolute"] = "absolute";
  return PositionEngine2;
})(PositionEngine || {});
const getAbsoluteEnginePosition = (referrer, referrerMargin, referrerWidth, locationX, locationY) => {
  if (!referrer) return {};
  let r = new PositionInstance({
    position: "absolute"
  });
  referrer.getBoundingClientRect();
  if (referrerWidth) {
    r.width = referrer.offsetWidth;
  }
  if (locationY === "top") {
    r.top = 0 - referrerMargin;
  } else if (locationY === "bottom") {
    r.top = referrer.offsetHeight + referrerMargin;
  } else if (locationY === "referrer-center") {
    r.top = referrer.offsetHeight / 2 + referrerMargin;
  }
  if (locationX === "left-corner") {
    r.left = 0;
  } else if (locationX === "right") {
    r.left = referrer.offsetWidth + referrerMargin;
  }
  return r;
};
const _hoisted_1 = {
  key: 0,
  class: "lkt-tooltip-content"
};
const _hoisted_2 = ["innerHTML"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LktTooltip",
  props: {
    modelValue: { type: Boolean, default: false },
    alwaysOpen: { type: Boolean, default: false },
    class: { default: "" },
    text: { default: "" },
    icon: { default: "" },
    iconAtEnd: { type: Boolean, default: false },
    engine: { default: PositionEngine.Fixed },
    referrerMargin: { default: 0 },
    windowMargin: { default: 0 },
    referrerWidth: { type: Boolean, default: false },
    referrer: {},
    locationY: { default: "bottom" },
    locationX: { default: "left-corner" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const slots = useSlots();
    const props = __props;
    const calculatedReferrerMargin = typeof props.referrerMargin === "string" ? parseFloat(props.referrerMargin) : props.referrerMargin;
    const calculatedWindowMargin = typeof props.windowMargin === "string" ? parseFloat(props.windowMargin) : props.windowMargin;
    const styles = ref(new PositionInstance({
      position: "fixed"
    })), isOpen = ref(props.modelValue), contentInnerObserver = ref(null), sizerElement = ref(null);
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
    }), computedStyles = computed(() => {
      return styles.value.getStyles();
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
      if (!sizerElement.value) return;
      const rect = props.referrer.getBoundingClientRect(), sizerElementWidth = sizerElement.value.offsetWidth;
      let scrollBarWidth = getScrollbarWidth();
      let contentEndsAtRight = rect.left + sizerElementWidth + scrollBarWidth;
      let currentTop = styles.value.top ? styles.value.top : rect.top;
      if (contentEndsAtRight > window.innerWidth - calculatedWindowMargin - scrollBarWidth) {
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
        styles.value.right = void 0;
      }
      if (props.locationY === "top") {
        styles.value.top = currentTop - sizerElement.value.offsetHeight;
      } else if (props.locationY === "center") {
        styles.value.top = rect.top - sizerElement.value.offsetHeight / 2 + props.referrer.offsetHeight / 2;
      }
      let contentEndsAtBottom = rect.top + sizerElement.value.offsetHeight + scrollBarWidth;
      if (contentEndsAtBottom > window.innerHeight - calculatedWindowMargin - scrollBarWidth) {
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
        styles.value.bottom = void 0;
      }
    };
    const calcStyle = () => {
      if (props.engine === PositionEngine.Absolute) {
        styles.value.assign(getAbsoluteEnginePosition(
          props.referrer,
          calculatedReferrerMargin,
          props.referrerWidth,
          props.locationX,
          props.locationY
        ));
        return;
      }
      if (!props.referrer) return;
      const rect = props.referrer.getBoundingClientRect();
      if (props.referrerWidth) {
        styles.value.width = props.referrer.offsetWidth;
      }
      if (props.locationY === "top") {
        styles.value.top = rect.top - calculatedReferrerMargin;
      } else if (props.locationY === "bottom") {
        styles.value.top = rect.top + props.referrer.offsetHeight + calculatedReferrerMargin;
      } else if (props.locationY === "referrer-center") {
        styles.value.top = rect.top + props.referrer.offsetHeight / 2 + calculatedReferrerMargin;
      }
      if (props.locationX === "left-corner") {
        styles.value.left = rect.left;
      } else if (props.locationX === "right") {
        styles.value.left = rect.left + props.referrer.offsetWidth + calculatedReferrerMargin;
      }
      nextTick(() => {
        adjustStyle();
      });
    }, onClickOutside = (e) => {
      if (props.alwaysOpen) return;
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
    let scrollTimeout = void 0;
    const onScrollEvent = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => calcStyle(), 1);
    };
    onMounted(() => {
      window.addEventListener("click", onClickOutside);
      window.addEventListener("scroll", onScrollEvent);
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
      nextTick(() => {
        const observer = new MutationObserver(() => {
          setTimeout(() => {
            calcStyle();
          }, 1);
        });
        observer.observe(sizerElement.value, {
          childList: true,
          subtree: true,
          attributes: false
        });
        contentInnerObserver.value = observer;
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("click", onClickOutside);
      window.removeEventListener("scroll", onScrollEvent);
      window.removeEventListener("resize", calcStyle);
      if (props.referrer) {
        let modalScroller = props.referrer.closest(".lkt-modal");
        if (modalScroller) {
          modalScroller.removeEventListener("scroll", calcStyle);
        }
      }
      contentInnerObserver.value.disconnect();
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        ref_key: "sizerElement",
        ref: sizerElement,
        class: normalizeClass(["lkt-tooltip", computedClassName.value]),
        style: normalizeStyle(computedStyles.value)
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
