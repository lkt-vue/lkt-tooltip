import { defineComponent as q, mergeDefaults as z, useSlots as J, ref as k, computed as N, watch as I, onMounted as K, nextTick as Q, onBeforeUnmount as Z, createBlock as X, withDirectives as G, openBlock as p, Teleport as Y, createElementVNode as B, normalizeStyle as M, normalizeClass as H, createElementBlock as m, unref as $, createCommentVNode as _, renderSlot as U, vShow as j } from "vue";
import { TooltipPositionEngine as V, TooltipLocationY as y, TooltipLocationX as F, extractI18nValue as ee, getDefaultValues as te, Tooltip as oe } from "lkt-vue-kernel";
class D {
  constructor(o) {
    this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.position = "";
    for (let s in o) this[s] = o[s];
  }
  assign(o) {
    this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.position = "";
    for (let s in o) this[s] = o[s];
  }
  getStyles() {
    let o = {};
    return this.position && (o.position = this.position), this.top && (o.top = this.top + "px"), this.bottom && (o.bottom = this.bottom + "px"), this.left && (o.left = this.left + "px"), this.right && (o.right = this.right + "px"), this.width && (o.width = this.width + "px"), o;
  }
}
const ie = (l, o, s, c, e) => {
  if (!l) return {};
  let n = new D({
    position: V.Absolute
  });
  return s && (n.width = l.offsetWidth), e === y.Top ? n.top = 0 - o : e === y.Bottom ? n.top = l.offsetHeight + o : e === y.ReferrerCenter && (n.top = l.offsetHeight / 2 + o), c === F.LeftCorner ? n.left = 0 : c === F.Right && (n.left = l.offsetWidth + o), n;
}, le = () => {
  var c;
  const l = document.createElement("div");
  l.style.visibility = "hidden", l.style.overflow = "scroll", l.style.msOverflowStyle = "scrollbar", document.body.appendChild(l);
  const o = document.createElement("div");
  l.appendChild(o);
  const s = l.offsetWidth - o.offsetWidth;
  return (c = l.parentNode) == null || c.removeChild(l), s;
}, re = (l, o, s, c, e, n, W, h, a, S = !1) => {
  var R, E;
  if (!l) return {};
  n = parseFloat(n), e = parseFloat(e), isNaN(n) && (n = 0), isNaN(e) && (e = 0);
  let i = new D({
    position: V.Fixed
  });
  window.scrollY || document.documentElement.scrollTop;
  const r = l.getBoundingClientRect(), f = r.height, w = (R = a == null ? void 0 : a.offsetWidth) != null ? R : 0, g = (E = a == null ? void 0 : a.offsetHeight) != null ? E : 0, u = le(), O = window.innerWidth;
  c && (i.width = r.width), h === y.Top ? i.top = r.top - s - n : h === y.Bottom ? i.top = r.top + f + s - n : h === y.ReferrerCenter && (i.top = r.top + f / 2 + s), W === F.LeftCorner ? i.left = r.left - e : W === F.Right && (i.left = r.left + l.offsetWidth + s - e);
  let L = i.left + w + u;
  if (L > O - o - u) {
    let C = L - O, v = parseFloat(i.left) - C;
    v <= 0 && o && (v = o), i.left = v, i.left !== 0 && (o ? i.right = o + u : i.left > 0 && (i.right = u));
  } else
    i.right = void 0;
  let T = i.top ? i.top : r.top;
  h === y.Top ? i.top = T - g : h === y.Center && (i.top = r.top - g / 2 + f / 2), T = i.top ? i.top : r.top;
  let d = T + g + u;
  if (d > window.innerHeight - o - u) {
    let C = d - window.innerHeight, v = i.top - C - o - u;
    v < 0 && (v = o), i.top = v, o ? i.bottom = o : i.bottom = 0;
  } else
    i.bottom = void 0;
  return i;
}, ne = {
  key: 0,
  class: "lkt-tooltip-indicator"
}, se = { class: "lkt-tooltip-content-inner" }, ae = {
  key: 0,
  class: "lkt-tooltip-indicator"
}, fe = ["innerHTML"], de = {
  key: 0,
  class: "lkt-tooltip-indicator"
}, ce = { class: "lkt-tooltip-content-inner" }, ue = {
  key: 0,
  class: "lkt-tooltip-indicator"
}, ve = ["innerHTML"], pe = /* @__PURE__ */ q({
  __name: "LktTooltip",
  props: /* @__PURE__ */ z({
    modelValue: { type: Boolean },
    alwaysOpen: { type: Boolean },
    indicator: { type: Boolean },
    class: {},
    contentClass: {},
    text: {},
    icon: {},
    iconAtEnd: { type: Boolean },
    engine: {},
    referrerMargin: {},
    windowMargin: {},
    referrerWidth: { type: Boolean },
    referrer: {},
    locationY: {},
    locationX: {},
    showOnReferrerHover: { type: Boolean },
    showOnReferrerHoverDelay: {},
    hideOnReferrerLeave: { type: Boolean },
    hideOnReferrerLeaveDelay: {},
    compensationX: {},
    compensationY: {},
    compensateGlobalContainers: { type: Boolean },
    remoteControl: { type: Boolean },
    teleport: {}
  }, te(oe)),
  emits: [
    "update:modelValue"
  ],
  setup(l, { emit: o }) {
    const s = o, c = J(), e = l, n = typeof e.referrerMargin == "string" ? parseFloat(e.referrerMargin) : e.referrerMargin, W = typeof e.windowMargin == "string" ? parseFloat(e.windowMargin) : e.windowMargin, h = k(new D({
      position: V.Fixed
    })), a = k(e.modelValue), S = k(null), i = k(null), r = k(void 0), f = k(void 0), w = k(!1), g = N(() => e.class), u = N(() => {
      let t = ee(e.text);
      if (e.icon) {
        let b = '<i class="' + e.icon + '"></i>';
        e.iconAtEnd ? t += b : t = b + t;
      }
      return t;
    }), O = N(() => h.value.getStyles()), L = () => {
      e.remoteControl || (a.value = !1);
    };
    let T;
    const d = () => {
      T && clearTimeout(T), T = setTimeout(() => {
        if (e.engine === V.Absolute) {
          h.value.assign(ie(
            e.referrer,
            n,
            e.referrerWidth,
            e.locationX,
            e.locationY
          ));
          return;
        }
        h.value.assign(re(
          e.referrer,
          W,
          n,
          e.referrerWidth,
          e.compensationX,
          e.compensationY,
          e.locationX,
          e.locationY,
          i.value,
          e.compensateGlobalContainers
        ));
      }, 50);
    }, R = (t) => {
      if (!e.alwaysOpen && a.value && !e.remoteControl && !(i.value.contains(t.target) || e.referrer.contains(t.target))) {
        L();
        return;
      }
    }, E = (t) => {
      e.remoteControl || (w.value && e.showOnReferrerHover ? (r.value !== void 0 && clearTimeout(r.value), f.value !== void 0 && clearTimeout(f.value), r.value = setTimeout(() => {
        a.value = !0, clearTimeout(r.value), clearTimeout(f.value);
      }, e.showOnReferrerHoverDelay)) : !w.value && e.hideOnReferrerLeave ? (r.value !== void 0 && clearTimeout(r.value), f.value !== void 0 && clearTimeout(f.value), f.value = setTimeout(() => {
        a.value = !1, clearTimeout(f.value), clearTimeout(r.value);
      }, e.showOnReferrerHoverDelay)) : w.value || (clearTimeout(r.value), clearTimeout(f.value)));
    }, C = (t) => {
      w.value = !0, E();
    }, v = (t) => {
      w.value = !1, E();
    };
    I(() => e.modelValue, (t) => a.value = t), I(a, (t) => {
      t && d(), !e.remoteControl && s("update:modelValue", t);
    });
    let x;
    const P = () => {
      clearTimeout(x), x = setTimeout(() => d(), 1);
    };
    return K(() => {
      if (window.addEventListener("click", R), window.addEventListener("scroll", P), window.addEventListener("resize", d), e.referrer) {
        let t = e.referrer.closest(".lkt-modal");
        t && t.addEventListener("scroll", d), e.showOnReferrerHover && e.referrer.addEventListener("mousemove", C), e.hideOnReferrerLeave && e.referrer.addEventListener("mouseleave", v);
      }
      a.value && d(), Q(() => {
        const t = new MutationObserver(() => {
          setTimeout(() => {
            d();
          }, 1);
        });
        t.observe(i.value, {
          childList: !0,
          subtree: !0,
          attributes: !1
        }), S.value = t;
      });
    }), Z(() => {
      var t, b;
      if (window.removeEventListener("click", R), window.removeEventListener("scroll", P), window.removeEventListener("resize", d), e.referrer) {
        let A = e.referrer.closest(".lkt-modal");
        A && A.removeEventListener("scroll", d), e.showOnReferrerHover && e.referrer.removeEventListener("mousemove", C), e.hideOnReferrerLeave && e.referrer.removeEventListener("mouseleave", v);
      }
      typeof ((t = S.value) == null ? void 0 : t.disconnect) == "function" && ((b = S.value) == null || b.disconnect());
    }), (t, b) => t.teleport ? (p(), X(Y, {
      key: 0,
      to: t.teleport
    }, [
      G(B("div", {
        ref_key: "sizerElement",
        ref: i,
        class: H(["lkt-tooltip", g.value]),
        style: M(O.value)
      }, [
        $(c).default ? (p(), m("div", {
          key: 0,
          class: H(["lkt-tooltip-content", t.contentClass])
        }, [
          t.indicator ? (p(), m("div", ne)) : _("", !0),
          B("div", se, [
            U(t.$slots, "default", { doClose: L })
          ])
        ], 2)) : (p(), m("div", {
          key: 1,
          class: H(["lkt-tooltip-content", t.contentClass])
        }, [
          t.indicator ? (p(), m("div", ae)) : _("", !0),
          B("div", {
            class: "lkt-tooltip-content-inner",
            innerHTML: u.value
          }, null, 8, fe)
        ], 2))
      ], 6), [
        [j, a.value]
      ])
    ], 8, ["to"])) : G((p(), m("div", {
      key: 1,
      ref_key: "sizerElement",
      ref: i,
      class: H(["lkt-tooltip", g.value]),
      style: M(O.value)
    }, [
      $(c).default ? (p(), m("div", {
        key: 0,
        class: H(["lkt-tooltip-content", t.contentClass])
      }, [
        t.indicator ? (p(), m("div", de)) : _("", !0),
        B("div", ce, [
          U(t.$slots, "default", { doClose: L })
        ])
      ], 2)) : (p(), m("div", {
        key: 1,
        class: H(["lkt-tooltip-content", t.contentClass])
      }, [
        t.indicator ? (p(), m("div", ue)) : _("", !0),
        B("div", {
          class: "lkt-tooltip-content-inner",
          innerHTML: u.value
        }, null, 8, ve)
      ], 2))
    ], 6)), [
      [j, a.value]
    ]);
  }
}), ye = {
  install: (l) => {
    l.component("lkt-tooltip") === void 0 && l.component("lkt-tooltip", pe);
  }
};
export {
  ye as default
};
