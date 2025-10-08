import { defineComponent as Y, mergeDefaults as ee, useSlots as te, ref as g, computed as P, watch as j, onMounted as oe, nextTick as ie, onBeforeUnmount as le, resolveComponent as re, createBlock as A, withDirectives as q, openBlock as r, Teleport as ne, createElementVNode as B, normalizeStyle as z, normalizeClass as k, createElementBlock as a, createCommentVNode as F, Fragment as J, renderList as K, mergeProps as Q, unref as Z, renderSlot as X, vShow as x } from "vue";
import { TooltipPositionEngine as V, TooltipLocationY as y, TooltipLocationX as N, extractI18nValue as se, getDefaultValues as ae, Tooltip as de } from "lkt-vue-kernel";
class I {
  constructor(o) {
    this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.position = "";
    for (let d in o) this[d] = o[d];
  }
  assign(o) {
    this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.position = "";
    for (let d in o) this[d] = o[d];
  }
  getStyles() {
    let o = {};
    return this.position && (o.position = this.position), this.top && (o.top = this.top + "px"), this.bottom && (o.bottom = this.bottom + "px"), this.left && (o.left = this.left + "px"), this.right && (o.right = this.right + "px"), this.width && (o.width = this.width + "px"), o;
  }
}
const ce = (l, o, d, v, e) => {
  if (!l) return {};
  let s = new I({
    position: V.Absolute
  });
  return d && (s.width = l.offsetWidth), e === y.Top ? s.top = 0 - o : e === y.Bottom ? s.top = l.offsetHeight + o : e === y.ReferrerCenter && (s.top = l.offsetHeight / 2 + o), v === N.LeftCorner ? s.left = 0 : v === N.Right && (s.left = l.offsetWidth + o), s;
}, fe = () => {
  var v;
  const l = document.createElement("div");
  l.style.visibility = "hidden", l.style.overflow = "scroll", l.style.msOverflowStyle = "scrollbar", document.body.appendChild(l);
  const o = document.createElement("div");
  l.appendChild(o);
  const d = l.offsetWidth - o.offsetWidth;
  return (v = l.parentNode) == null || v.removeChild(l), d;
}, ue = (l, o, d, v, e, s, W, m, c, S = !1) => {
  var R, E;
  if (!l) return {};
  s = parseFloat(s), e = parseFloat(e), isNaN(s) && (s = 0), isNaN(e) && (e = 0);
  let i = new I({
    position: V.Fixed
  });
  window.scrollY || document.documentElement.scrollTop;
  const n = l.getBoundingClientRect(), f = n.height, w = (R = c == null ? void 0 : c.offsetWidth) != null ? R : 0, L = (E = c == null ? void 0 : c.offsetHeight) != null ? E : 0, p = fe(), O = window.innerWidth;
  v && (i.width = n.width), m === y.Top ? i.top = n.top - d - s : m === y.Bottom ? i.top = n.top + f + d - s : m === y.ReferrerCenter && (i.top = n.top + f / 2 + d), W === N.LeftCorner ? i.left = n.left - e : W === N.Right && (i.left = n.left + l.offsetWidth + d - e);
  let C = i.left + w + p;
  if (C > O - o - p) {
    let b = C - O, h = parseFloat(i.left) - b;
    h <= 0 && o && (h = o), i.left = h, i.left !== 0 && (o ? i.right = o + p : i.left > 0 && (i.right = p));
  } else
    i.right = void 0;
  let T = i.top ? i.top : n.top;
  m === y.Top ? i.top = T - L : m === y.Center && (i.top = n.top - L / 2 + f / 2), T = i.top ? i.top : n.top;
  let u = T + L + p;
  if (u > window.innerHeight - o - p) {
    let b = u - window.innerHeight, h = i.top - b - o - p;
    h < 0 && (h = o), i.top = h, o ? i.bottom = o : i.bottom = 0;
  } else
    i.bottom = void 0;
  return i;
}, ve = {
  key: 0,
  class: "lkt-tooltip-indicator"
}, pe = { class: "lkt-tooltip-content-inner" }, he = {
  key: 0,
  class: "lkt-tooltip-indicator"
}, me = { class: "lkt-tooltip-content-inner" }, ke = {
  key: 0,
  class: "lkt-tooltip-indicator"
}, ye = ["innerHTML"], we = {
  key: 0,
  class: "lkt-tooltip-indicator"
}, Te = { class: "lkt-tooltip-content-inner" }, ge = {
  key: 0,
  class: "lkt-tooltip-indicator"
}, Le = { class: "lkt-tooltip-content-inner" }, Ce = {
  key: 0,
  class: "lkt-tooltip-indicator"
}, be = ["innerHTML"], He = /* @__PURE__ */ Y({
  __name: "LktTooltip",
  props: /* @__PURE__ */ ee({
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
    teleport: {},
    content: {}
  }, ae(de)),
  emits: [
    "update:modelValue"
  ],
  setup(l, { emit: o }) {
    const d = o, v = te(), e = l, s = typeof e.referrerMargin == "string" ? parseFloat(e.referrerMargin) : e.referrerMargin, W = typeof e.windowMargin == "string" ? parseFloat(e.windowMargin) : e.windowMargin, m = g(new I({
      position: V.Fixed
    })), c = g(e.modelValue), S = g(null), i = g(null), n = g(void 0), f = g(void 0), w = g(!1), L = P(() => e.class), p = P(() => {
      let t = se(e.text);
      if (e.icon) {
        let H = '<i class="' + e.icon + '"></i>';
        e.iconAtEnd ? t += H : t = H + t;
      }
      return t;
    }), O = P(() => m.value.getStyles()), C = () => {
      e.remoteControl || (c.value = !1);
    };
    let T;
    const u = () => {
      T && clearTimeout(T), T = setTimeout(() => {
        if (e.engine === V.Absolute) {
          m.value.assign(ce(
            e.referrer,
            s,
            e.referrerWidth,
            e.locationX,
            e.locationY
          ));
          return;
        }
        m.value.assign(ue(
          e.referrer,
          W,
          s,
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
      if (!e.alwaysOpen && c.value && !e.remoteControl && !(i.value.contains(t.target) || e.referrer.contains(t.target))) {
        C();
        return;
      }
    }, E = (t) => {
      e.remoteControl || (w.value && e.showOnReferrerHover ? (n.value !== void 0 && clearTimeout(n.value), f.value !== void 0 && clearTimeout(f.value), n.value = setTimeout(() => {
        c.value = !0, clearTimeout(n.value), clearTimeout(f.value);
      }, e.showOnReferrerHoverDelay)) : !w.value && e.hideOnReferrerLeave ? (n.value !== void 0 && clearTimeout(n.value), f.value !== void 0 && clearTimeout(f.value), f.value = setTimeout(() => {
        c.value = !1, clearTimeout(f.value), clearTimeout(n.value);
      }, e.showOnReferrerHoverDelay)) : w.value || (clearTimeout(n.value), clearTimeout(f.value)));
    }, b = (t) => {
      w.value = !0, E();
    }, h = (t) => {
      w.value = !1, E();
    };
    j(() => e.modelValue, (t) => c.value = t), j(c, (t) => {
      t && u(), !e.remoteControl && d("update:modelValue", t);
    });
    let G;
    const M = () => {
      clearTimeout(G), G = setTimeout(() => u(), 1);
    };
    return oe(() => {
      if (window.addEventListener("click", R), window.addEventListener("scroll", M), window.addEventListener("resize", u), e.referrer) {
        let t = e.referrer.closest(".lkt-modal");
        t && t.addEventListener("scroll", u), e.showOnReferrerHover && e.referrer.addEventListener("mousemove", b), e.hideOnReferrerLeave && e.referrer.addEventListener("mouseleave", h);
      }
      c.value && u(), ie(() => {
        const t = new MutationObserver(() => {
          setTimeout(() => {
            u();
          }, 1);
        });
        t.observe(i.value, {
          childList: !0,
          subtree: !0,
          attributes: !1
        }), S.value = t;
      });
    }), le(() => {
      var t, H;
      if (window.removeEventListener("click", R), window.removeEventListener("scroll", M), window.removeEventListener("resize", u), e.referrer) {
        let _ = e.referrer.closest(".lkt-modal");
        _ && _.removeEventListener("scroll", u), e.showOnReferrerHover && e.referrer.removeEventListener("mousemove", b), e.hideOnReferrerLeave && e.referrer.removeEventListener("mouseleave", h);
      }
      typeof ((t = S.value) == null ? void 0 : t.disconnect) == "function" && ((H = S.value) == null || H.disconnect());
    }), (t, H) => {
      var $, U;
      const _ = re("lkt-polymorphic-element");
      return t.teleport ? (r(), A(ne, {
        key: 0,
        to: t.teleport
      }, [
        q(B("div", {
          ref_key: "sizerElement",
          ref: i,
          class: k(["lkt-tooltip", L.value]),
          style: z(O.value)
        }, [
          (($ = t.content) == null ? void 0 : $.length) > 0 ? (r(), a("div", {
            key: 0,
            class: k(["lkt-tooltip-content", t.contentClass])
          }, [
            t.indicator ? (r(), a("div", ve)) : F("", !0),
            B("div", pe, [
              (r(!0), a(J, null, K(t.content, (D) => (r(), A(_, Q({ ref_for: !0 }, D), null, 16))), 256))
            ])
          ], 2)) : Z(v).default ? (r(), a("div", {
            key: 1,
            class: k(["lkt-tooltip-content", t.contentClass])
          }, [
            t.indicator ? (r(), a("div", he)) : F("", !0),
            B("div", me, [
              X(t.$slots, "default", { doClose: C })
            ])
          ], 2)) : (r(), a("div", {
            key: 2,
            class: k(["lkt-tooltip-content", t.contentClass])
          }, [
            t.indicator ? (r(), a("div", ke)) : (r(), a("div", {
              key: 1,
              class: "lkt-tooltip-content-inner",
              innerHTML: p.value
            }, null, 8, ye))
          ], 2))
        ], 6), [
          [x, c.value]
        ])
      ], 8, ["to"])) : q((r(), a("div", {
        key: 1,
        ref_key: "sizerElement",
        ref: i,
        class: k(["lkt-tooltip", L.value]),
        style: z(O.value)
      }, [
        ((U = t.content) == null ? void 0 : U.length) > 0 ? (r(), a("div", {
          key: 0,
          class: k(["lkt-tooltip-content", t.contentClass])
        }, [
          t.indicator ? (r(), a("div", we)) : F("", !0),
          B("div", Te, [
            (r(!0), a(J, null, K(t.content, (D) => (r(), A(_, Q({ ref_for: !0 }, D), null, 16))), 256))
          ])
        ], 2)) : Z(v).default ? (r(), a("div", {
          key: 1,
          class: k(["lkt-tooltip-content", t.contentClass])
        }, [
          t.indicator ? (r(), a("div", ge)) : F("", !0),
          B("div", Le, [
            X(t.$slots, "default", { doClose: C })
          ])
        ], 2)) : (r(), a("div", {
          key: 2,
          class: k(["lkt-tooltip-content", t.contentClass])
        }, [
          t.indicator ? (r(), a("div", Ce)) : (r(), a("div", {
            key: 1,
            class: "lkt-tooltip-content-inner",
            innerHTML: p.value
          }, null, 8, be))
        ], 2))
      ], 6)), [
        [x, c.value]
      ]);
    };
  }
}), Ee = {
  install: (l) => {
    l.component("lkt-tooltip") === void 0 && l.component("lkt-tooltip", He);
  }
};
export {
  Ee as default
};
