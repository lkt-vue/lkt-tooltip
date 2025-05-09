import { defineComponent as j, mergeDefaults as U, useSlots as q, ref as w, computed as H, watch as V, onMounted as G, nextTick as Y, onBeforeUnmount as J, withDirectives as K, createElementBlock as b, openBlock as O, normalizeStyle as Q, normalizeClass as k, unref as Z, renderSlot as ee, vShow as te } from "vue";
import { TooltipPositionEngine as C, TooltipLocationY as p, TooltipLocationX as L, extractI18nValue as oe, getDefaultValues as ie, Tooltip as re } from "lkt-vue-kernel";
class _ {
  constructor(o) {
    this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.position = "";
    for (let f in o) this[f] = o[f];
  }
  assign(o) {
    for (let f in o) this[f] = o[f];
  }
  getStyles() {
    let o = {};
    return this.position && (o.position = this.position), this.top && (o.top = this.top + "px"), this.bottom && (o.bottom = this.bottom + "px"), this.left && (o.left = this.left + "px"), this.right && (o.right = this.right + "px"), this.width && (o.width = this.width + "px"), o;
  }
}
const le = (l, o, f, y, e) => {
  if (!l) return {};
  let r = new _({
    position: C.Absolute
  });
  return l.getBoundingClientRect(), f && (r.width = l.offsetWidth), e === p.Top ? r.top = 0 - o : e === p.Bottom ? r.top = l.offsetHeight + o : e === p.ReferrerCenter && (r.top = l.offsetHeight / 2 + o), y === L.LeftCorner ? r.left = 0 : y === L.Right && (r.left = l.offsetWidth + o), r;
}, ne = ["innerHTML"], se = /* @__PURE__ */ j({
  __name: "LktTooltip",
  props: /* @__PURE__ */ U({
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
    hideOnReferrerLeaveDelay: {}
  }, ie(re)),
  emits: [
    "update:modelValue"
  ],
  setup(l, { emit: o }) {
    const f = o, y = q(), e = l, r = typeof e.referrerMargin == "string" ? parseFloat(e.referrerMargin) : e.referrerMargin, a = typeof e.windowMargin == "string" ? parseFloat(e.windowMargin) : e.windowMargin, i = w(new _({
      position: C.Fixed
    })), u = w(e.modelValue), E = w(null), v = w(null), d = w(void 0), c = w(void 0), g = w(!1), I = H(() => e.class), X = H(() => {
      let t = oe(e.text);
      if (e.icon) {
        let n = '<i class="' + e.icon + '"></i>';
        e.iconAtEnd ? t += n : t = n + t;
      }
      return t;
    }), F = H(() => i.value.getStyles()), W = () => {
      u.value = !1;
    }, P = () => {
      var T;
      const t = document.createElement("div");
      t.style.visibility = "hidden", t.style.overflow = "scroll", t.style.msOverflowStyle = "scrollbar", document.body.appendChild(t);
      const n = document.createElement("div");
      t.appendChild(n);
      const s = t.offsetWidth - n.offsetWidth;
      return (T = t.parentNode) == null || T.removeChild(t), s;
    }, N = () => {
      if (!v.value) return;
      const t = e.referrer.getBoundingClientRect(), n = v.value.offsetWidth;
      let s = P(), T = t.left + n + s, $ = i.value.top ? i.value.top : t.top;
      if (T > window.innerWidth - a - s) {
        let R = T - window.innerWidth, m = t.left - R - a - s;
        m < 0 && (m = a), i.value.left = m, a ? i.value.right = a : i.value.right = 0;
      } else
        i.value.right = void 0;
      e.locationY === p.Top ? i.value.top = $ - v.value.offsetHeight : e.locationY === p.Center && (i.value.top = t.top - v.value.offsetHeight / 2 + e.referrer.offsetHeight / 2);
      let D = t.top + v.value.offsetHeight + s;
      if (D > window.innerHeight - a - s) {
        let R = D - window.innerHeight, m = t.top - R - a - s;
        m < 0 && (m = a), i.value.top = m, a ? i.value.bottom = a : i.value.bottom = 0;
      } else
        i.value.bottom = void 0;
    }, h = () => {
      if (e.engine === C.Absolute) {
        i.value.assign(le(
          e.referrer,
          r,
          e.referrerWidth,
          e.locationX,
          e.locationY
        ));
        return;
      }
      if (!e.referrer) return;
      const t = e.referrer.getBoundingClientRect();
      e.referrerWidth && (i.value.width = e.referrer.offsetWidth), e.locationY === p.Top ? i.value.top = t.top - r : e.locationY === p.Bottom ? i.value.top = t.top + e.referrer.offsetHeight + r : e.locationY === p.ReferrerCenter && (i.value.top = t.top + e.referrer.offsetHeight / 2 + r), e.locationX === L.LeftCorner ? i.value.left = t.left : e.locationX === L.Right && (i.value.left = t.left + e.referrer.offsetWidth + r), Y(() => {
        N();
      });
    }, B = (t) => {
      if (!e.alwaysOpen && u.value && !(v.value.contains(t.target) || e.referrer.contains(t.target))) {
        W();
        return;
      }
    }, S = (t) => {
      g.value && e.showOnReferrerHover ? (d.value !== void 0 && clearTimeout(d.value), c.value !== void 0 && clearTimeout(c.value), d.value = setTimeout(() => {
        u.value = !0, clearTimeout(d.value), clearTimeout(c.value);
      }, e.showOnReferrerHoverDelay)) : !g.value && e.hideOnReferrerLeave ? (d.value !== void 0 && clearTimeout(d.value), c.value !== void 0 && clearTimeout(c.value), c.value = setTimeout(() => {
        u.value = !1, clearTimeout(c.value), clearTimeout(d.value);
      }, e.showOnReferrerHoverDelay)) : g.value || (clearTimeout(d.value), clearTimeout(c.value));
    }, M = (t) => {
      g.value = !0, S();
    }, x = (t) => {
      g.value = !1, S();
    };
    V(() => e.modelValue, (t) => u.value = t), V(u, (t) => {
      t && h(), f("update:modelValue", t);
    });
    let z;
    const A = () => {
      clearTimeout(z), z = setTimeout(() => h(), 1);
    };
    return G(() => {
      if (window.addEventListener("click", B), window.addEventListener("scroll", A), window.addEventListener("resize", h), e.referrer) {
        let t = e.referrer.closest(".lkt-modal");
        t && t.addEventListener("scroll", h), e.showOnReferrerHover && e.referrer.addEventListener("mousemove", M), e.hideOnReferrerLeave && e.referrer.addEventListener("mouseleave", x);
      }
      u.value && h(), Y(() => {
        const t = new MutationObserver(() => {
          setTimeout(() => {
            h();
          }, 1);
        });
        t.observe(v.value, {
          childList: !0,
          subtree: !0,
          attributes: !1
        }), E.value = t;
      });
    }), J(() => {
      var t, n;
      if (window.removeEventListener("click", B), window.removeEventListener("scroll", A), window.removeEventListener("resize", h), e.referrer) {
        let s = e.referrer.closest(".lkt-modal");
        s && s.removeEventListener("scroll", h), e.showOnReferrerHover && e.referrer.removeEventListener("mousemove", M), e.hideOnReferrerLeave && e.referrer.removeEventListener("mouseleave", x);
      }
      typeof ((t = E.value) == null ? void 0 : t.disconnect) == "function" && ((n = E.value) == null || n.disconnect());
    }), (t, n) => K((O(), b("div", {
      ref_key: "sizerElement",
      ref: v,
      class: k(["lkt-tooltip", I.value]),
      style: Q(F.value)
    }, [
      Z(y).default ? (O(), b("div", {
        key: 0,
        class: k(["lkt-tooltip-content", t.contentClass])
      }, [
        ee(t.$slots, "default", { doClose: W })
      ], 2)) : (O(), b("div", {
        key: 1,
        class: k(["lkt-tooltip-content", t.contentClass]),
        innerHTML: X.value
      }, null, 10, ne))
    ], 6)), [
      [te, u.value]
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
