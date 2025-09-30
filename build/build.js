import { defineComponent as U, mergeDefaults as j, useSlots as q, ref as T, computed as F, watch as A, onMounted as z, nextTick as J, onBeforeUnmount as K, createBlock as Q, withDirectives as I, openBlock as C, Teleport as Z, createElementVNode as X, normalizeStyle as _, normalizeClass as b, createElementBlock as E, unref as G, renderSlot as M, vShow as $ } from "vue";
import { TooltipPositionEngine as S, TooltipLocationY as h, TooltipLocationX as x, extractI18nValue as Y, getDefaultValues as ee, Tooltip as te } from "lkt-vue-kernel";
class V {
  constructor(t) {
    this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.position = "";
    for (let s in t) this[s] = t[s];
  }
  assign(t) {
    this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.position = "";
    for (let s in t) this[s] = t[s];
  }
  getStyles() {
    let t = {};
    return this.position && (t.position = this.position), this.top && (t.top = this.top + "px"), this.bottom && (t.bottom = this.bottom + "px"), this.left && (t.left = this.left + "px"), this.right && (t.right = this.right + "px"), this.width && (t.width = this.width + "px"), t;
  }
}
const oe = (l, t, s, d, e) => {
  if (!l) return {};
  let n = new V({
    position: S.Absolute
  });
  return s && (n.width = l.offsetWidth), e === h.Top ? n.top = 0 - t : e === h.Bottom ? n.top = l.offsetHeight + t : e === h.ReferrerCenter && (n.top = l.offsetHeight / 2 + t), d === x.LeftCorner ? n.left = 0 : d === x.Right && (n.left = l.offsetWidth + t), n;
}, ie = () => {
  var d;
  const l = document.createElement("div");
  l.style.visibility = "hidden", l.style.overflow = "scroll", l.style.msOverflowStyle = "scrollbar", document.body.appendChild(l);
  const t = document.createElement("div");
  l.appendChild(t);
  const s = l.offsetWidth - t.offsetWidth;
  return (d = l.parentNode) == null || d.removeChild(l), s;
}, le = (l, t, s, d, e, n, B, p, a, W = !1) => {
  var O, R;
  if (!l) return {};
  n = parseFloat(n), e = parseFloat(e), isNaN(n) && (n = 0), isNaN(e) && (e = 0);
  let i = new V({
    position: S.Fixed
  });
  window.scrollY || document.documentElement.scrollTop;
  const r = l.getBoundingClientRect(), f = r.height, m = (O = a == null ? void 0 : a.offsetWidth) != null ? O : 0, y = (R = a == null ? void 0 : a.offsetHeight) != null ? R : 0, v = ie(), H = window.innerWidth;
  d && (i.width = r.width), p === h.Top ? i.top = r.top - s - n : p === h.Bottom ? i.top = r.top + f + s - n : p === h.ReferrerCenter && (i.top = r.top + f / 2 + s), B === x.LeftCorner ? i.left = r.left - e : B === x.Right && (i.left = r.left + l.offsetWidth + s - e);
  let g = i.left + m + v;
  if (g > H - t - v) {
    let L = g - H, c = parseFloat(i.left) - L;
    c <= 0 && t && (c = t), i.left = c, i.left !== 0 && (t ? i.right = t + v : i.left > 0 && (i.right = v));
  } else
    i.right = void 0;
  let w = i.top ? i.top : r.top;
  p === h.Top ? i.top = w - y : p === h.Center && (i.top = r.top - y / 2 + f / 2), w = i.top ? i.top : r.top;
  let u = w + y + v;
  if (u > window.innerHeight - t - v) {
    let L = u - window.innerHeight, c = i.top - L - t - v;
    c < 0 && (c = t), i.top = c, t ? i.bottom = t : i.bottom = 0;
  } else
    i.bottom = void 0;
  return i;
}, re = ["innerHTML"], ne = ["innerHTML"], se = /* @__PURE__ */ U({
  __name: "LktTooltip",
  props: /* @__PURE__ */ j({
    modelValue: { type: Boolean },
    alwaysOpen: { type: Boolean },
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
  }, ee(te)),
  emits: [
    "update:modelValue"
  ],
  setup(l, { emit: t }) {
    const s = t, d = q(), e = l, n = typeof e.referrerMargin == "string" ? parseFloat(e.referrerMargin) : e.referrerMargin, B = typeof e.windowMargin == "string" ? parseFloat(e.windowMargin) : e.windowMargin, p = T(new V({
      position: S.Fixed
    })), a = T(e.modelValue), W = T(null), i = T(null), r = T(void 0), f = T(void 0), m = T(!1), y = F(() => e.class), v = F(() => {
      let o = Y(e.text);
      if (e.icon) {
        let k = '<i class="' + e.icon + '"></i>';
        e.iconAtEnd ? o += k : o = k + o;
      }
      return o;
    }), H = F(() => p.value.getStyles()), g = () => {
      e.remoteControl || (a.value = !1);
    };
    let w;
    const u = () => {
      w && clearTimeout(w), w = setTimeout(() => {
        if (e.engine === S.Absolute) {
          p.value.assign(oe(
            e.referrer,
            n,
            e.referrerWidth,
            e.locationX,
            e.locationY
          ));
          return;
        }
        p.value.assign(le(
          e.referrer,
          B,
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
    }, O = (o) => {
      if (!e.alwaysOpen && a.value && !e.remoteControl && !(i.value.contains(o.target) || e.referrer.contains(o.target))) {
        g();
        return;
      }
    }, R = (o) => {
      e.remoteControl || (m.value && e.showOnReferrerHover ? (r.value !== void 0 && clearTimeout(r.value), f.value !== void 0 && clearTimeout(f.value), r.value = setTimeout(() => {
        a.value = !0, clearTimeout(r.value), clearTimeout(f.value);
      }, e.showOnReferrerHoverDelay)) : !m.value && e.hideOnReferrerLeave ? (r.value !== void 0 && clearTimeout(r.value), f.value !== void 0 && clearTimeout(f.value), f.value = setTimeout(() => {
        a.value = !1, clearTimeout(f.value), clearTimeout(r.value);
      }, e.showOnReferrerHoverDelay)) : m.value || (clearTimeout(r.value), clearTimeout(f.value)));
    }, L = (o) => {
      m.value = !0, R();
    }, c = (o) => {
      m.value = !1, R();
    };
    A(() => e.modelValue, (o) => a.value = o), A(a, (o) => {
      o && u(), !e.remoteControl && s("update:modelValue", o);
    });
    let D;
    const N = () => {
      clearTimeout(D), D = setTimeout(() => u(), 1);
    };
    return z(() => {
      if (window.addEventListener("click", O), window.addEventListener("scroll", N), window.addEventListener("resize", u), e.referrer) {
        let o = e.referrer.closest(".lkt-modal");
        o && o.addEventListener("scroll", u), e.showOnReferrerHover && e.referrer.addEventListener("mousemove", L), e.hideOnReferrerLeave && e.referrer.addEventListener("mouseleave", c);
      }
      a.value && u(), J(() => {
        const o = new MutationObserver(() => {
          setTimeout(() => {
            u();
          }, 1);
        });
        o.observe(i.value, {
          childList: !0,
          subtree: !0,
          attributes: !1
        }), W.value = o;
      });
    }), K(() => {
      var o, k;
      if (window.removeEventListener("click", O), window.removeEventListener("scroll", N), window.removeEventListener("resize", u), e.referrer) {
        let P = e.referrer.closest(".lkt-modal");
        P && P.removeEventListener("scroll", u), e.showOnReferrerHover && e.referrer.removeEventListener("mousemove", L), e.hideOnReferrerLeave && e.referrer.removeEventListener("mouseleave", c);
      }
      typeof ((o = W.value) == null ? void 0 : o.disconnect) == "function" && ((k = W.value) == null || k.disconnect());
    }), (o, k) => o.teleport ? (C(), Q(Z, {
      key: 0,
      to: o.teleport
    }, [
      I(X("div", {
        ref_key: "sizerElement",
        ref: i,
        class: b(["lkt-tooltip", y.value]),
        style: _(H.value)
      }, [
        G(d).default ? (C(), E("div", {
          key: 0,
          class: b(["lkt-tooltip-content", o.contentClass])
        }, [
          M(o.$slots, "default", { doClose: g })
        ], 2)) : (C(), E("div", {
          key: 1,
          class: b(["lkt-tooltip-content", o.contentClass]),
          innerHTML: v.value
        }, null, 10, re))
      ], 6), [
        [$, a.value]
      ])
    ], 8, ["to"])) : I((C(), E("div", {
      key: 1,
      ref_key: "sizerElement",
      ref: i,
      class: b(["lkt-tooltip", y.value]),
      style: _(H.value)
    }, [
      G(d).default ? (C(), E("div", {
        key: 0,
        class: b(["lkt-tooltip-content", o.contentClass])
      }, [
        M(o.$slots, "default", { doClose: g })
      ], 2)) : (C(), E("div", {
        key: 1,
        class: b(["lkt-tooltip-content", o.contentClass]),
        innerHTML: v.value
      }, null, 10, ne))
    ], 6)), [
      [$, a.value]
    ]);
  }
}), ue = {
  install: (l) => {
    l.component("lkt-tooltip") === void 0 && l.component("lkt-tooltip", se);
  }
};
export {
  ue as default
};
