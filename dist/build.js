import { defineComponent as _, mergeDefaults as I, useSlots as $, ref as g, computed as F, watch as N, onMounted as j, nextTick as M, onBeforeUnmount as U, withDirectives as q, createElementBlock as P, openBlock as A, normalizeStyle as G, normalizeClass as D, unref as J, renderSlot as K, vShow as Q } from "vue";
import { TooltipPositionEngine as S, TooltipLocationY as w, TooltipLocationX as x, TooltipSettingsController as X, extractI18nValue as Z, getDefaultValues as z, Tooltip as Y } from "lkt-vue-kernel";
class V {
  constructor(o) {
    this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.position = "";
    for (let r in o) this[r] = o[r];
  }
  assign(o) {
    this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.position = "";
    for (let r in o) this[r] = o[r];
  }
  getStyles() {
    let o = {};
    return this.position && (o.position = this.position), this.top && (o.top = this.top + "px"), this.bottom && (o.bottom = this.bottom + "px"), this.left && (o.left = this.left + "px"), this.right && (o.right = this.right + "px"), this.width && (o.width = this.width + "px"), o;
  }
}
const ee = (l, o, r, c, e) => {
  if (!l) return {};
  let n = new V({
    position: S.Absolute
  });
  return r && (n.width = l.offsetWidth), e === w.Top ? n.top = 0 - o : e === w.Bottom ? n.top = l.offsetHeight + o : e === w.ReferrerCenter && (n.top = l.offsetHeight / 2 + o), c === x.LeftCorner ? n.left = 0 : c === x.Right && (n.left = l.offsetWidth + o), n;
}, te = () => {
  var c;
  const l = document.createElement("div");
  l.style.visibility = "hidden", l.style.overflow = "scroll", l.style.msOverflowStyle = "scrollbar", document.body.appendChild(l);
  const o = document.createElement("div");
  l.appendChild(o);
  const r = l.offsetWidth - o.offsetWidth;
  return (c = l.parentNode) == null || c.removeChild(l), r;
};
function oe(l) {
  let o = 0, r = 0;
  for (; l; )
    o += l.offsetTop - (l.scrollTop || 0), r += l.offsetLeft - (l.scrollLeft || 0), l = l.offsetParent;
  return { top: o, left: r };
}
const ie = (l, o, r, c, e, n, E, v, f, H = !1) => {
  var C, k, R;
  if (!l) return {};
  n = parseFloat(n), e = parseFloat(e), isNaN(n) && (n = 0), isNaN(e) && (e = 0);
  let i = new V({
    position: S.Fixed
  });
  oe(l), window.pageYOffset || document.documentElement.scrollTop;
  const d = window.scrollY || document.documentElement.scrollTop;
  window.scrollX || document.documentElement.scrollLeft;
  const s = l.getBoundingClientRect(), p = s.height, B = (C = f == null ? void 0 : f.offsetWidth) != null ? C : 0, y = (k = f == null ? void 0 : f.offsetHeight) != null ? k : 0, h = te(), b = window.innerWidth;
  if (c && (i.width = s.width), v === w.Top ? i.top = s.top - r - n : v === w.Bottom ? i.top = s.top + p + r - n : v === w.ReferrerCenter && (i.top = s.top + p / 2 + r), E === x.LeftCorner ? i.left = s.left - e : E === x.Right && (i.left = s.left + l.offsetWidth + r - e), !(l == null ? void 0 : l.closest(".lkt-modal"))) {
    let u = 0, t = 0;
    (R = X.data.globalContainersAffectingPositioning) == null || R.forEach((m) => {
      const T = getComputedStyle(m);
      u += parseFloat(T.borderTopWidth) || 0, u += parseFloat(T.paddingTop) || 0, t += parseFloat(T.borderLeftWidth) || 0, t += parseFloat(T.paddingLeft) || 0;
    }), i.left && (i.left -= t), i.top && (i.top -= u), i.top && (i.top += d);
  }
  let a = i.left + B + h;
  if (a > b - o - h) {
    let u = a - b, t = parseFloat(i.left) - u;
    t <= 0 && o && (t = o), i.left = t, i.left !== 0 && (o ? i.right = o + h : i.left > 0 && (i.right = h));
  } else
    i.right = void 0;
  let L = i.top ? i.top : s.top;
  v === w.Top ? i.top = L - y : v === w.Center && (i.top = s.top - y / 2 + p / 2), L = i.top ? i.top : s.top;
  let O = L + y + h;
  if (O > window.innerHeight - o - h) {
    let u = O - window.innerHeight, t = i.top - u - o - h;
    t < 0 && (t = o), i.top = t, o ? i.bottom = o : i.bottom = 0;
  } else
    i.bottom = void 0;
  return i;
}, le = ["innerHTML"], re = /* @__PURE__ */ _({
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
    compensationY: {}
  }, z(Y)),
  emits: [
    "update:modelValue"
  ],
  setup(l, { emit: o }) {
    const r = o, c = $(), e = l, n = typeof e.referrerMargin == "string" ? parseFloat(e.referrerMargin) : e.referrerMargin, E = typeof e.windowMargin == "string" ? parseFloat(e.windowMargin) : e.windowMargin, v = g(new V({
      position: S.Fixed
    })), f = g(e.modelValue), H = g(null), i = g(null), d = g(void 0), s = g(void 0), p = g(!1), B = F(() => e.class), y = F(() => {
      let t = Z(e.text);
      if (e.icon) {
        let m = '<i class="' + e.icon + '"></i>';
        e.iconAtEnd ? t += m : t = m + t;
      }
      return t;
    }), h = F(() => v.value.getStyles()), b = () => {
      f.value = !1;
    };
    let W;
    const a = () => {
      W && clearTimeout(W), W = setTimeout(() => {
        if (e.engine === S.Absolute) {
          v.value.assign(ee(
            e.referrer,
            n,
            e.referrerWidth,
            e.locationX,
            e.locationY
          ));
          return;
        }
        v.value.assign(ie(
          e.referrer,
          E,
          n,
          e.referrerWidth,
          e.compensationX,
          e.compensationY,
          e.locationX,
          e.locationY,
          i.value
        ));
      }, 50);
    }, L = (t) => {
      if (!e.alwaysOpen && f.value && !(i.value.contains(t.target) || e.referrer.contains(t.target))) {
        b();
        return;
      }
    }, O = (t) => {
      p.value && e.showOnReferrerHover ? (d.value !== void 0 && clearTimeout(d.value), s.value !== void 0 && clearTimeout(s.value), d.value = setTimeout(() => {
        f.value = !0, clearTimeout(d.value), clearTimeout(s.value);
      }, e.showOnReferrerHoverDelay)) : !p.value && e.hideOnReferrerLeave ? (d.value !== void 0 && clearTimeout(d.value), s.value !== void 0 && clearTimeout(s.value), s.value = setTimeout(() => {
        f.value = !1, clearTimeout(s.value), clearTimeout(d.value);
      }, e.showOnReferrerHoverDelay)) : p.value || (clearTimeout(d.value), clearTimeout(s.value));
    }, C = (t) => {
      p.value = !0, O();
    }, k = (t) => {
      p.value = !1, O();
    };
    N(() => e.modelValue, (t) => f.value = t), N(f, (t) => {
      t && a(), r("update:modelValue", t);
    });
    let R;
    const u = () => {
      clearTimeout(R), R = setTimeout(() => a(), 1);
    };
    return j(() => {
      if (window.addEventListener("click", L), window.addEventListener("scroll", u), window.addEventListener("resize", a), e.referrer) {
        let t = e.referrer.closest(".lkt-modal");
        t && t.addEventListener("scroll", a), e.showOnReferrerHover && e.referrer.addEventListener("mousemove", C), e.hideOnReferrerLeave && e.referrer.addEventListener("mouseleave", k);
      }
      f.value && a(), M(() => {
        const t = new MutationObserver(() => {
          setTimeout(() => {
            a();
          }, 1);
        });
        t.observe(i.value, {
          childList: !0,
          subtree: !0,
          attributes: !1
        }), H.value = t;
      });
    }), U(() => {
      var t, m;
      if (window.removeEventListener("click", L), window.removeEventListener("scroll", u), window.removeEventListener("resize", a), e.referrer) {
        let T = e.referrer.closest(".lkt-modal");
        T && T.removeEventListener("scroll", a), e.showOnReferrerHover && e.referrer.removeEventListener("mousemove", C), e.hideOnReferrerLeave && e.referrer.removeEventListener("mouseleave", k);
      }
      typeof ((t = H.value) == null ? void 0 : t.disconnect) == "function" && ((m = H.value) == null || m.disconnect());
    }), (t, m) => q((A(), P("div", {
      ref_key: "sizerElement",
      ref: i,
      class: D(["lkt-tooltip", B.value]),
      style: G(h.value)
    }, [
      J(c).default ? (A(), P("div", {
        key: 0,
        class: D(["lkt-tooltip-content", t.contentClass])
      }, [
        K(t.$slots, "default", { doClose: b })
      ], 2)) : (A(), P("div", {
        key: 1,
        class: D(["lkt-tooltip-content", t.contentClass]),
        innerHTML: y.value
      }, null, 10, le))
    ], 6)), [
      [Q, f.value]
    ]);
  }
}), fe = {
  install: (l) => {
    l.component("lkt-tooltip") === void 0 && l.component("lkt-tooltip", re);
  }
};
export {
  fe as default
};
