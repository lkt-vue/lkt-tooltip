import { defineComponent as A, mergeDefaults as I, useSlots as G, ref as T, computed as x, watch as _, onMounted as $, nextTick as M, onBeforeUnmount as U, withDirectives as j, createElementBlock as B, openBlock as S, normalizeStyle as q, normalizeClass as F, unref as J, renderSlot as K, vShow as Q } from "vue";
import { TooltipPositionEngine as E, TooltipLocationY as p, TooltipLocationX as W, extractI18nValue as Z, getDefaultValues as z, Tooltip as X } from "lkt-vue-kernel";
class D {
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
const Y = (l, t, s, v, e) => {
  if (!l) return {};
  let n = new D({
    position: E.Absolute
  });
  return s && (n.width = l.offsetWidth), e === p.Top ? n.top = 0 - t : e === p.Bottom ? n.top = l.offsetHeight + t : e === p.ReferrerCenter && (n.top = l.offsetHeight / 2 + t), v === W.LeftCorner ? n.left = 0 : v === W.Right && (n.left = l.offsetWidth + t), n;
}, ee = () => {
  var v;
  const l = document.createElement("div");
  l.style.visibility = "hidden", l.style.overflow = "scroll", l.style.msOverflowStyle = "scrollbar", document.body.appendChild(l);
  const t = document.createElement("div");
  l.appendChild(t);
  const s = l.offsetWidth - t.offsetWidth;
  return (v = l.parentNode) == null || v.removeChild(l), s;
}, te = (l, t, s, v, e, n, R, c, a, k = !1) => {
  var C, O;
  if (!l) return {};
  n = parseFloat(n), e = parseFloat(e), isNaN(n) && (n = 0), isNaN(e) && (e = 0);
  let o = new D({
    position: E.Fixed
  });
  window.scrollY || document.documentElement.scrollTop;
  const r = l.getBoundingClientRect(), f = r.height, m = (C = a == null ? void 0 : a.offsetWidth) != null ? C : 0, L = (O = a == null ? void 0 : a.offsetHeight) != null ? O : 0, h = ee(), H = window.innerWidth;
  v && (o.width = r.width), c === p.Top ? o.top = r.top - s - n : c === p.Bottom ? o.top = r.top + f + s - n : c === p.ReferrerCenter && (o.top = r.top + f / 2 + s), R === W.LeftCorner ? o.left = r.left - e : R === W.Right && (o.left = r.left + l.offsetWidth + s - e);
  let b = o.left + m + h;
  if (b > H - t - h) {
    let g = b - H, d = parseFloat(o.left) - g;
    d <= 0 && t && (d = t), o.left = d, o.left !== 0 && (t ? o.right = t + h : o.left > 0 && (o.right = h));
  } else
    o.right = void 0;
  let w = o.top ? o.top : r.top;
  c === p.Top ? o.top = w - L : c === p.Center && (o.top = r.top - L / 2 + f / 2), w = o.top ? o.top : r.top;
  let u = w + L + h;
  if (u > window.innerHeight - t - h) {
    let g = u - window.innerHeight, d = o.top - g - t - h;
    d < 0 && (d = t), o.top = d, t ? o.bottom = t : o.bottom = 0;
  } else
    o.bottom = void 0;
  return o;
}, oe = ["innerHTML"], ie = /* @__PURE__ */ A({
  __name: "LktTooltip",
  props: /* @__PURE__ */ I({
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
    remoteControl: { type: Boolean }
  }, z(X)),
  emits: [
    "update:modelValue"
  ],
  setup(l, { emit: t }) {
    const s = t, v = G(), e = l, n = typeof e.referrerMargin == "string" ? parseFloat(e.referrerMargin) : e.referrerMargin, R = typeof e.windowMargin == "string" ? parseFloat(e.windowMargin) : e.windowMargin, c = T(new D({
      position: E.Fixed
    })), a = T(e.modelValue), k = T(null), o = T(null), r = T(void 0), f = T(void 0), m = T(!1), L = x(() => e.class), h = x(() => {
      let i = Z(e.text);
      if (e.icon) {
        let y = '<i class="' + e.icon + '"></i>';
        e.iconAtEnd ? i += y : i = y + i;
      }
      return i;
    }), H = x(() => c.value.getStyles()), b = () => {
      e.remoteControl || (a.value = !1);
    };
    let w;
    const u = () => {
      w && clearTimeout(w), w = setTimeout(() => {
        if (e.engine === E.Absolute) {
          c.value.assign(Y(
            e.referrer,
            n,
            e.referrerWidth,
            e.locationX,
            e.locationY
          ));
          return;
        }
        c.value.assign(te(
          e.referrer,
          R,
          n,
          e.referrerWidth,
          e.compensationX,
          e.compensationY,
          e.locationX,
          e.locationY,
          o.value,
          e.compensateGlobalContainers
        ));
      }, 50);
    }, C = (i) => {
      if (!e.alwaysOpen && a.value && !e.remoteControl && !(o.value.contains(i.target) || e.referrer.contains(i.target))) {
        b();
        return;
      }
    }, O = (i) => {
      e.remoteControl || (m.value && e.showOnReferrerHover ? (r.value !== void 0 && clearTimeout(r.value), f.value !== void 0 && clearTimeout(f.value), r.value = setTimeout(() => {
        a.value = !0, clearTimeout(r.value), clearTimeout(f.value);
      }, e.showOnReferrerHoverDelay)) : !m.value && e.hideOnReferrerLeave ? (r.value !== void 0 && clearTimeout(r.value), f.value !== void 0 && clearTimeout(f.value), f.value = setTimeout(() => {
        a.value = !1, clearTimeout(f.value), clearTimeout(r.value);
      }, e.showOnReferrerHoverDelay)) : m.value || (clearTimeout(r.value), clearTimeout(f.value)));
    }, g = (i) => {
      m.value = !0, O();
    }, d = (i) => {
      m.value = !1, O();
    };
    _(() => e.modelValue, (i) => a.value = i), _(a, (i) => {
      i && u(), !e.remoteControl && s("update:modelValue", i);
    });
    let V;
    const N = () => {
      clearTimeout(V), V = setTimeout(() => u(), 1);
    };
    return $(() => {
      if (window.addEventListener("click", C), window.addEventListener("scroll", N), window.addEventListener("resize", u), e.referrer) {
        let i = e.referrer.closest(".lkt-modal");
        i && i.addEventListener("scroll", u), e.showOnReferrerHover && e.referrer.addEventListener("mousemove", g), e.hideOnReferrerLeave && e.referrer.addEventListener("mouseleave", d);
      }
      a.value && u(), M(() => {
        const i = new MutationObserver(() => {
          setTimeout(() => {
            u();
          }, 1);
        });
        i.observe(o.value, {
          childList: !0,
          subtree: !0,
          attributes: !1
        }), k.value = i;
      });
    }), U(() => {
      var i, y;
      if (window.removeEventListener("click", C), window.removeEventListener("scroll", N), window.removeEventListener("resize", u), e.referrer) {
        let P = e.referrer.closest(".lkt-modal");
        P && P.removeEventListener("scroll", u), e.showOnReferrerHover && e.referrer.removeEventListener("mousemove", g), e.hideOnReferrerLeave && e.referrer.removeEventListener("mouseleave", d);
      }
      typeof ((i = k.value) == null ? void 0 : i.disconnect) == "function" && ((y = k.value) == null || y.disconnect());
    }), (i, y) => j((S(), B("div", {
      ref_key: "sizerElement",
      ref: o,
      class: F(["lkt-tooltip", L.value]),
      style: q(H.value)
    }, [
      J(v).default ? (S(), B("div", {
        key: 0,
        class: F(["lkt-tooltip-content", i.contentClass])
      }, [
        K(i.$slots, "default", { doClose: b })
      ], 2)) : (S(), B("div", {
        key: 1,
        class: F(["lkt-tooltip-content", i.contentClass]),
        innerHTML: h.value
      }, null, 10, oe))
    ], 6)), [
      [Q, a.value]
    ]);
  }
}), ne = {
  install: (l) => {
    l.component("lkt-tooltip") === void 0 && l.component("lkt-tooltip", ie);
  }
};
export {
  ne as default
};
