import { defineComponent as _, mergeDefaults as I, useSlots as G, ref as y, computed as F, watch as N, onMounted as $, nextTick as M, onBeforeUnmount as U, withDirectives as j, createElementBlock as D, openBlock as P, normalizeStyle as q, normalizeClass as V, unref as J, renderSlot as K, vShow as Q } from "vue";
import { TooltipPositionEngine as S, TooltipLocationY as w, TooltipLocationX as x, TooltipSettingsController as Z, extractI18nValue as z, getDefaultValues as X, Tooltip as Y } from "lkt-vue-kernel";
class A {
  constructor(o) {
    this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.position = "";
    for (let n in o) this[n] = o[n];
  }
  assign(o) {
    this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.position = "";
    for (let n in o) this[n] = o[n];
  }
  getStyles() {
    let o = {};
    return this.position && (o.position = this.position), this.top && (o.top = this.top + "px"), this.bottom && (o.bottom = this.bottom + "px"), this.left && (o.left = this.left + "px"), this.right && (o.right = this.right + "px"), this.width && (o.width = this.width + "px"), o;
  }
}
const ee = (l, o, n, c, e) => {
  if (!l) return {};
  let s = new A({
    position: S.Absolute
  });
  return n && (s.width = l.offsetWidth), e === w.Top ? s.top = 0 - o : e === w.Bottom ? s.top = l.offsetHeight + o : e === w.ReferrerCenter && (s.top = l.offsetHeight / 2 + o), c === x.LeftCorner ? s.left = 0 : c === x.Right && (s.left = l.offsetWidth + o), s;
}, te = () => {
  var c;
  const l = document.createElement("div");
  l.style.visibility = "hidden", l.style.overflow = "scroll", l.style.msOverflowStyle = "scrollbar", document.body.appendChild(l);
  const o = document.createElement("div");
  l.appendChild(o);
  const n = l.offsetWidth - o.offsetWidth;
  return (c = l.parentNode) == null || c.removeChild(l), n;
}, oe = (l, o, n, c, e, s, W, v, a, b = !1) => {
  var R, H, E;
  if (!l) return {};
  s = parseFloat(s), e = parseFloat(e), isNaN(s) && (s = 0), isNaN(e) && (e = 0);
  let t = new A({
    position: S.Fixed
  });
  const u = window.scrollY || document.documentElement.scrollTop, r = l.getBoundingClientRect(), p = r.height, B = (R = a == null ? void 0 : a.offsetWidth) != null ? R : 0, C = (H = a == null ? void 0 : a.offsetHeight) != null ? H : 0, h = te(), O = window.innerWidth;
  if (c && (t.width = r.width), v === w.Top ? t.top = r.top - n - s : v === w.Bottom ? t.top = r.top + p + n - s : v === w.ReferrerCenter && (t.top = r.top + p / 2 + n), W === x.LeftCorner ? t.left = r.left - e : W === x.Right && (t.left = r.left + l.offsetWidth + n - e), b && !(l == null ? void 0 : l.closest(".lkt-modal"))) {
    let f = 0, i = 0;
    (E = Z.data.globalContainersAffectingPositioning) == null || E.forEach((m) => {
      const g = getComputedStyle(m);
      f += parseFloat(g.borderTopWidth) || 0, f += parseFloat(g.paddingTop) || 0, i += parseFloat(g.borderLeftWidth) || 0, i += parseFloat(g.paddingLeft) || 0;
    }), t.left && (t.left -= i), t.top && (t.top -= f), t.top && (t.top += u);
  }
  let L = t.left + B + h;
  if (L > O - o - h) {
    let T = L - O, f = parseFloat(t.left) - T;
    f <= 0 && o && (f = o), t.left = f, t.left !== 0 && (o ? t.right = o + h : t.left > 0 && (t.right = h));
  } else
    t.right = void 0;
  let d = t.top ? t.top : r.top;
  v === w.Top ? t.top = d - C : v === w.Center && (t.top = r.top - C / 2 + p / 2), d = t.top ? t.top : r.top;
  let k = d + C + h;
  if (k > window.innerHeight - o - h) {
    let T = k - window.innerHeight, f = t.top - T - o - h;
    f < 0 && (f = o), t.top = f, o ? t.bottom = o : t.bottom = 0;
  } else
    t.bottom = void 0;
  return t;
}, ie = ["innerHTML"], le = /* @__PURE__ */ _({
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
    compensateGlobalContainers: { type: Boolean }
  }, X(Y)),
  emits: [
    "update:modelValue"
  ],
  setup(l, { emit: o }) {
    const n = o, c = G(), e = l, s = typeof e.referrerMargin == "string" ? parseFloat(e.referrerMargin) : e.referrerMargin, W = typeof e.windowMargin == "string" ? parseFloat(e.windowMargin) : e.windowMargin, v = y(new A({
      position: S.Fixed
    })), a = y(e.modelValue), b = y(null), t = y(null), u = y(void 0), r = y(void 0), p = y(!1), B = F(() => e.class), C = F(() => {
      let i = z(e.text);
      if (e.icon) {
        let m = '<i class="' + e.icon + '"></i>';
        e.iconAtEnd ? i += m : i = m + i;
      }
      return i;
    }), h = F(() => v.value.getStyles()), O = () => {
      a.value = !1;
    };
    let L;
    const d = () => {
      L && clearTimeout(L), L = setTimeout(() => {
        if (e.engine === S.Absolute) {
          v.value.assign(ee(
            e.referrer,
            s,
            e.referrerWidth,
            e.locationX,
            e.locationY
          ));
          return;
        }
        v.value.assign(oe(
          e.referrer,
          W,
          s,
          e.referrerWidth,
          e.compensationX,
          e.compensationY,
          e.locationX,
          e.locationY,
          t.value,
          e.compensateGlobalContainers
        ));
      }, 50);
    }, k = (i) => {
      if (!e.alwaysOpen && a.value && !(t.value.contains(i.target) || e.referrer.contains(i.target))) {
        O();
        return;
      }
    }, R = (i) => {
      p.value && e.showOnReferrerHover ? (u.value !== void 0 && clearTimeout(u.value), r.value !== void 0 && clearTimeout(r.value), u.value = setTimeout(() => {
        a.value = !0, clearTimeout(u.value), clearTimeout(r.value);
      }, e.showOnReferrerHoverDelay)) : !p.value && e.hideOnReferrerLeave ? (u.value !== void 0 && clearTimeout(u.value), r.value !== void 0 && clearTimeout(r.value), r.value = setTimeout(() => {
        a.value = !1, clearTimeout(r.value), clearTimeout(u.value);
      }, e.showOnReferrerHoverDelay)) : p.value || (clearTimeout(u.value), clearTimeout(r.value));
    }, H = (i) => {
      p.value = !0, R();
    }, E = (i) => {
      p.value = !1, R();
    };
    N(() => e.modelValue, (i) => a.value = i), N(a, (i) => {
      i && d(), n("update:modelValue", i);
    });
    let T;
    const f = () => {
      clearTimeout(T), T = setTimeout(() => d(), 1);
    };
    return $(() => {
      if (window.addEventListener("click", k), window.addEventListener("scroll", f), window.addEventListener("resize", d), e.referrer) {
        let i = e.referrer.closest(".lkt-modal");
        i && i.addEventListener("scroll", d), e.showOnReferrerHover && e.referrer.addEventListener("mousemove", H), e.hideOnReferrerLeave && e.referrer.addEventListener("mouseleave", E);
      }
      a.value && d(), M(() => {
        const i = new MutationObserver(() => {
          setTimeout(() => {
            d();
          }, 1);
        });
        i.observe(t.value, {
          childList: !0,
          subtree: !0,
          attributes: !1
        }), b.value = i;
      });
    }), U(() => {
      var i, m;
      if (window.removeEventListener("click", k), window.removeEventListener("scroll", f), window.removeEventListener("resize", d), e.referrer) {
        let g = e.referrer.closest(".lkt-modal");
        g && g.removeEventListener("scroll", d), e.showOnReferrerHover && e.referrer.removeEventListener("mousemove", H), e.hideOnReferrerLeave && e.referrer.removeEventListener("mouseleave", E);
      }
      typeof ((i = b.value) == null ? void 0 : i.disconnect) == "function" && ((m = b.value) == null || m.disconnect());
    }), (i, m) => j((P(), D("div", {
      ref_key: "sizerElement",
      ref: t,
      class: V(["lkt-tooltip", B.value]),
      style: q(h.value)
    }, [
      J(c).default ? (P(), D("div", {
        key: 0,
        class: V(["lkt-tooltip-content", i.contentClass])
      }, [
        K(i.$slots, "default", { doClose: O })
      ], 2)) : (P(), D("div", {
        key: 1,
        class: V(["lkt-tooltip-content", i.contentClass]),
        innerHTML: C.value
      }, null, 10, ie))
    ], 6)), [
      [Q, a.value]
    ]);
  }
}), ne = {
  install: (l) => {
    l.component("lkt-tooltip") === void 0 && l.component("lkt-tooltip", le);
  }
};
export {
  ne as default
};
