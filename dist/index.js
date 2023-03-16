/*! For license information please see index.js.LICENSE.txt */
!(function (t, e) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = e(require("react"));
  else if ("function" == typeof define && define.amd) define(["react"], e);
  else {
    var r = "object" == typeof exports ? e(require("react")) : e(t.React);
    for (var n in r) ("object" == typeof exports ? exports : t)[n] = r[n];
  }
})(global, (t) =>
  (() => {
    "use strict";
    var e = {
        764: (t, e, r) => {
          const n = r(238),
            o = r(665),
            i =
              "function" == typeof Symbol && "function" == typeof Symbol.for
                ? Symbol.for("nodejs.util.inspect.custom")
                : null;
          (e.lW = u), (e.h2 = 50);
          const a = 2147483647;
          function c(t) {
            if (t > a)
              throw new RangeError(
                'The value "' + t + '" is invalid for option "size"'
              );
            const e = new Uint8Array(t);
            return Object.setPrototypeOf(e, u.prototype), e;
          }
          function u(t, e, r) {
            if ("number" == typeof t) {
              if ("string" == typeof e)
                throw new TypeError(
                  'The "string" argument must be of type string. Received type number'
                );
              return f(t);
            }
            return s(t, e, r);
          }
          function s(t, e, r) {
            if ("string" == typeof t)
              return (function (t, e) {
                if (
                  (("string" == typeof e && "" !== e) || (e = "utf8"),
                  !u.isEncoding(e))
                )
                  throw new TypeError("Unknown encoding: " + e);
                const r = 0 | y(t, e);
                let n = c(r);
                const o = n.write(t, e);
                return o !== r && (n = n.slice(0, o)), n;
              })(t, e);
            if (ArrayBuffer.isView(t))
              return (function (t) {
                if (V(t, Uint8Array)) {
                  const e = new Uint8Array(t);
                  return p(e.buffer, e.byteOffset, e.byteLength);
                }
                return h(t);
              })(t);
            if (null == t)
              throw new TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                  typeof t
              );
            if (V(t, ArrayBuffer) || (t && V(t.buffer, ArrayBuffer)))
              return p(t, e, r);
            if (
              "undefined" != typeof SharedArrayBuffer &&
              (V(t, SharedArrayBuffer) || (t && V(t.buffer, SharedArrayBuffer)))
            )
              return p(t, e, r);
            if ("number" == typeof t)
              throw new TypeError(
                'The "value" argument must not be of type number. Received type number'
              );
            const n = t.valueOf && t.valueOf();
            if (null != n && n !== t) return u.from(n, e, r);
            const o = (function (t) {
              if (u.isBuffer(t)) {
                const e = 0 | d(t.length),
                  r = c(e);
                return 0 === r.length || t.copy(r, 0, 0, e), r;
              }
              return void 0 !== t.length
                ? "number" != typeof t.length || H(t.length)
                  ? c(0)
                  : h(t)
                : "Buffer" === t.type && Array.isArray(t.data)
                ? h(t.data)
                : void 0;
            })(t);
            if (o) return o;
            if (
              "undefined" != typeof Symbol &&
              null != Symbol.toPrimitive &&
              "function" == typeof t[Symbol.toPrimitive]
            )
              return u.from(t[Symbol.toPrimitive]("string"), e, r);
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                typeof t
            );
          }
          function l(t) {
            if ("number" != typeof t)
              throw new TypeError('"size" argument must be of type number');
            if (t < 0)
              throw new RangeError(
                'The value "' + t + '" is invalid for option "size"'
              );
          }
          function f(t) {
            return l(t), c(t < 0 ? 0 : 0 | d(t));
          }
          function h(t) {
            const e = t.length < 0 ? 0 : 0 | d(t.length),
              r = c(e);
            for (let n = 0; n < e; n += 1) r[n] = 255 & t[n];
            return r;
          }
          function p(t, e, r) {
            if (e < 0 || t.byteLength < e)
              throw new RangeError('"offset" is outside of buffer bounds');
            if (t.byteLength < e + (r || 0))
              throw new RangeError('"length" is outside of buffer bounds');
            let n;
            return (
              (n =
                void 0 === e && void 0 === r
                  ? new Uint8Array(t)
                  : void 0 === r
                  ? new Uint8Array(t, e)
                  : new Uint8Array(t, e, r)),
              Object.setPrototypeOf(n, u.prototype),
              n
            );
          }
          function d(t) {
            if (t >= a)
              throw new RangeError(
                "Attempt to allocate Buffer larger than maximum size: 0x" +
                  a.toString(16) +
                  " bytes"
              );
            return 0 | t;
          }
          function y(t, e) {
            if (u.isBuffer(t)) return t.length;
            if (ArrayBuffer.isView(t) || V(t, ArrayBuffer)) return t.byteLength;
            if ("string" != typeof t)
              throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                  typeof t
              );
            const r = t.length,
              n = arguments.length > 2 && !0 === arguments[2];
            if (!n && 0 === r) return 0;
            let o = !1;
            for (;;)
              switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                  return r;
                case "utf8":
                case "utf-8":
                  return K(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return 2 * r;
                case "hex":
                  return r >>> 1;
                case "base64":
                  return X(t).length;
                default:
                  if (o) return n ? -1 : K(t).length;
                  (e = ("" + e).toLowerCase()), (o = !0);
              }
          }
          function v(t, e, r) {
            let n = !1;
            if (((void 0 === e || e < 0) && (e = 0), e > this.length))
              return "";
            if (
              ((void 0 === r || r > this.length) && (r = this.length), r <= 0)
            )
              return "";
            if ((r >>>= 0) <= (e >>>= 0)) return "";
            for (t || (t = "utf8"); ; )
              switch (t) {
                case "hex":
                  return A(this, e, r);
                case "utf8":
                case "utf-8":
                  return j(this, e, r);
                case "ascii":
                  return L(this, e, r);
                case "latin1":
                case "binary":
                  return N(this, e, r);
                case "base64":
                  return O(this, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return _(this, e, r);
                default:
                  if (n) throw new TypeError("Unknown encoding: " + t);
                  (t = (t + "").toLowerCase()), (n = !0);
              }
          }
          function m(t, e, r) {
            const n = t[e];
            (t[e] = t[r]), (t[r] = n);
          }
          function g(t, e, r, n, o) {
            if (0 === t.length) return -1;
            if (
              ("string" == typeof r
                ? ((n = r), (r = 0))
                : r > 2147483647
                ? (r = 2147483647)
                : r < -2147483648 && (r = -2147483648),
              H((r = +r)) && (r = o ? 0 : t.length - 1),
              r < 0 && (r = t.length + r),
              r >= t.length)
            ) {
              if (o) return -1;
              r = t.length - 1;
            } else if (r < 0) {
              if (!o) return -1;
              r = 0;
            }
            if (("string" == typeof e && (e = u.from(e, n)), u.isBuffer(e)))
              return 0 === e.length ? -1 : b(t, e, r, n, o);
            if ("number" == typeof e)
              return (
                (e &= 255),
                "function" == typeof Uint8Array.prototype.indexOf
                  ? o
                    ? Uint8Array.prototype.indexOf.call(t, e, r)
                    : Uint8Array.prototype.lastIndexOf.call(t, e, r)
                  : b(t, [e], r, n, o)
              );
            throw new TypeError("val must be string, number or Buffer");
          }
          function b(t, e, r, n, o) {
            let i,
              a = 1,
              c = t.length,
              u = e.length;
            if (
              void 0 !== n &&
              ("ucs2" === (n = String(n).toLowerCase()) ||
                "ucs-2" === n ||
                "utf16le" === n ||
                "utf-16le" === n)
            ) {
              if (t.length < 2 || e.length < 2) return -1;
              (a = 2), (c /= 2), (u /= 2), (r /= 2);
            }
            function s(t, e) {
              return 1 === a ? t[e] : t.readUInt16BE(e * a);
            }
            if (o) {
              let n = -1;
              for (i = r; i < c; i++)
                if (s(t, i) === s(e, -1 === n ? 0 : i - n)) {
                  if ((-1 === n && (n = i), i - n + 1 === u)) return n * a;
                } else -1 !== n && (i -= i - n), (n = -1);
            } else
              for (r + u > c && (r = c - u), i = r; i >= 0; i--) {
                let r = !0;
                for (let n = 0; n < u; n++)
                  if (s(t, i + n) !== s(e, n)) {
                    r = !1;
                    break;
                  }
                if (r) return i;
              }
            return -1;
          }
          function w(t, e, r, n) {
            r = Number(r) || 0;
            const o = t.length - r;
            n ? (n = Number(n)) > o && (n = o) : (n = o);
            const i = e.length;
            let a;
            for (n > i / 2 && (n = i / 2), a = 0; a < n; ++a) {
              const n = parseInt(e.substr(2 * a, 2), 16);
              if (H(n)) return a;
              t[r + a] = n;
            }
            return a;
          }
          function E(t, e, r, n) {
            return Y(K(e, t.length - r), t, r, n);
          }
          function x(t, e, r, n) {
            return Y(
              (function (t) {
                const e = [];
                for (let r = 0; r < t.length; ++r)
                  e.push(255 & t.charCodeAt(r));
                return e;
              })(e),
              t,
              r,
              n
            );
          }
          function S(t, e, r, n) {
            return Y(X(e), t, r, n);
          }
          function k(t, e, r, n) {
            return Y(
              (function (t, e) {
                let r, n, o;
                const i = [];
                for (let a = 0; a < t.length && !((e -= 2) < 0); ++a)
                  (r = t.charCodeAt(a)),
                    (n = r >> 8),
                    (o = r % 256),
                    i.push(o),
                    i.push(n);
                return i;
              })(e, t.length - r),
              t,
              r,
              n
            );
          }
          function O(t, e, r) {
            return 0 === e && r === t.length
              ? n.fromByteArray(t)
              : n.fromByteArray(t.slice(e, r));
          }
          function j(t, e, r) {
            r = Math.min(t.length, r);
            const n = [];
            let o = e;
            for (; o < r; ) {
              const e = t[o];
              let i = null,
                a = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
              if (o + a <= r) {
                let r, n, c, u;
                switch (a) {
                  case 1:
                    e < 128 && (i = e);
                    break;
                  case 2:
                    (r = t[o + 1]),
                      128 == (192 & r) &&
                        ((u = ((31 & e) << 6) | (63 & r)), u > 127 && (i = u));
                    break;
                  case 3:
                    (r = t[o + 1]),
                      (n = t[o + 2]),
                      128 == (192 & r) &&
                        128 == (192 & n) &&
                        ((u = ((15 & e) << 12) | ((63 & r) << 6) | (63 & n)),
                        u > 2047 && (u < 55296 || u > 57343) && (i = u));
                    break;
                  case 4:
                    (r = t[o + 1]),
                      (n = t[o + 2]),
                      (c = t[o + 3]),
                      128 == (192 & r) &&
                        128 == (192 & n) &&
                        128 == (192 & c) &&
                        ((u =
                          ((15 & e) << 18) |
                          ((63 & r) << 12) |
                          ((63 & n) << 6) |
                          (63 & c)),
                        u > 65535 && u < 1114112 && (i = u));
                }
              }
              null === i
                ? ((i = 65533), (a = 1))
                : i > 65535 &&
                  ((i -= 65536),
                  n.push(((i >>> 10) & 1023) | 55296),
                  (i = 56320 | (1023 & i))),
                n.push(i),
                (o += a);
            }
            return (function (t) {
              const e = t.length;
              if (e <= I) return String.fromCharCode.apply(String, t);
              let r = "",
                n = 0;
              for (; n < e; )
                r += String.fromCharCode.apply(String, t.slice(n, (n += I)));
              return r;
            })(n);
          }
          (u.TYPED_ARRAY_SUPPORT = (function () {
            try {
              const t = new Uint8Array(1),
                e = {
                  foo: function () {
                    return 42;
                  },
                };
              return (
                Object.setPrototypeOf(e, Uint8Array.prototype),
                Object.setPrototypeOf(t, e),
                42 === t.foo()
              );
            } catch (t) {
              return !1;
            }
          })()),
            u.TYPED_ARRAY_SUPPORT ||
              "undefined" == typeof console ||
              "function" != typeof console.error ||
              console.error(
                "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
              ),
            Object.defineProperty(u.prototype, "parent", {
              enumerable: !0,
              get: function () {
                if (u.isBuffer(this)) return this.buffer;
              },
            }),
            Object.defineProperty(u.prototype, "offset", {
              enumerable: !0,
              get: function () {
                if (u.isBuffer(this)) return this.byteOffset;
              },
            }),
            (u.poolSize = 8192),
            (u.from = function (t, e, r) {
              return s(t, e, r);
            }),
            Object.setPrototypeOf(u.prototype, Uint8Array.prototype),
            Object.setPrototypeOf(u, Uint8Array),
            (u.alloc = function (t, e, r) {
              return (function (t, e, r) {
                return (
                  l(t),
                  t <= 0
                    ? c(t)
                    : void 0 !== e
                    ? "string" == typeof r
                      ? c(t).fill(e, r)
                      : c(t).fill(e)
                    : c(t)
                );
              })(t, e, r);
            }),
            (u.allocUnsafe = function (t) {
              return f(t);
            }),
            (u.allocUnsafeSlow = function (t) {
              return f(t);
            }),
            (u.isBuffer = function (t) {
              return null != t && !0 === t._isBuffer && t !== u.prototype;
            }),
            (u.compare = function (t, e) {
              if (
                (V(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)),
                V(e, Uint8Array) && (e = u.from(e, e.offset, e.byteLength)),
                !u.isBuffer(t) || !u.isBuffer(e))
              )
                throw new TypeError(
                  'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                );
              if (t === e) return 0;
              let r = t.length,
                n = e.length;
              for (let o = 0, i = Math.min(r, n); o < i; ++o)
                if (t[o] !== e[o]) {
                  (r = t[o]), (n = e[o]);
                  break;
                }
              return r < n ? -1 : n < r ? 1 : 0;
            }),
            (u.isEncoding = function (t) {
              switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return !0;
                default:
                  return !1;
              }
            }),
            (u.concat = function (t, e) {
              if (!Array.isArray(t))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              if (0 === t.length) return u.alloc(0);
              let r;
              if (void 0 === e)
                for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
              const n = u.allocUnsafe(e);
              let o = 0;
              for (r = 0; r < t.length; ++r) {
                let e = t[r];
                if (V(e, Uint8Array))
                  o + e.length > n.length
                    ? (u.isBuffer(e) || (e = u.from(e)), e.copy(n, o))
                    : Uint8Array.prototype.set.call(n, e, o);
                else {
                  if (!u.isBuffer(e))
                    throw new TypeError(
                      '"list" argument must be an Array of Buffers'
                    );
                  e.copy(n, o);
                }
                o += e.length;
              }
              return n;
            }),
            (u.byteLength = y),
            (u.prototype._isBuffer = !0),
            (u.prototype.swap16 = function () {
              const t = this.length;
              if (t % 2 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 16-bits"
                );
              for (let e = 0; e < t; e += 2) m(this, e, e + 1);
              return this;
            }),
            (u.prototype.swap32 = function () {
              const t = this.length;
              if (t % 4 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 32-bits"
                );
              for (let e = 0; e < t; e += 4)
                m(this, e, e + 3), m(this, e + 1, e + 2);
              return this;
            }),
            (u.prototype.swap64 = function () {
              const t = this.length;
              if (t % 8 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 64-bits"
                );
              for (let e = 0; e < t; e += 8)
                m(this, e, e + 7),
                  m(this, e + 1, e + 6),
                  m(this, e + 2, e + 5),
                  m(this, e + 3, e + 4);
              return this;
            }),
            (u.prototype.toString = function () {
              const t = this.length;
              return 0 === t
                ? ""
                : 0 === arguments.length
                ? j(this, 0, t)
                : v.apply(this, arguments);
            }),
            (u.prototype.toLocaleString = u.prototype.toString),
            (u.prototype.equals = function (t) {
              if (!u.isBuffer(t))
                throw new TypeError("Argument must be a Buffer");
              return this === t || 0 === u.compare(this, t);
            }),
            (u.prototype.inspect = function () {
              let t = "";
              const r = e.h2;
              return (
                (t = this.toString("hex", 0, r)
                  .replace(/(.{2})/g, "$1 ")
                  .trim()),
                this.length > r && (t += " ... "),
                "<Buffer " + t + ">"
              );
            }),
            i && (u.prototype[i] = u.prototype.inspect),
            (u.prototype.compare = function (t, e, r, n, o) {
              if (
                (V(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)),
                !u.isBuffer(t))
              )
                throw new TypeError(
                  'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                    typeof t
                );
              if (
                (void 0 === e && (e = 0),
                void 0 === r && (r = t ? t.length : 0),
                void 0 === n && (n = 0),
                void 0 === o && (o = this.length),
                e < 0 || r > t.length || n < 0 || o > this.length)
              )
                throw new RangeError("out of range index");
              if (n >= o && e >= r) return 0;
              if (n >= o) return -1;
              if (e >= r) return 1;
              if (this === t) return 0;
              let i = (o >>>= 0) - (n >>>= 0),
                a = (r >>>= 0) - (e >>>= 0);
              const c = Math.min(i, a),
                s = this.slice(n, o),
                l = t.slice(e, r);
              for (let t = 0; t < c; ++t)
                if (s[t] !== l[t]) {
                  (i = s[t]), (a = l[t]);
                  break;
                }
              return i < a ? -1 : a < i ? 1 : 0;
            }),
            (u.prototype.includes = function (t, e, r) {
              return -1 !== this.indexOf(t, e, r);
            }),
            (u.prototype.indexOf = function (t, e, r) {
              return g(this, t, e, r, !0);
            }),
            (u.prototype.lastIndexOf = function (t, e, r) {
              return g(this, t, e, r, !1);
            }),
            (u.prototype.write = function (t, e, r, n) {
              if (void 0 === e) (n = "utf8"), (r = this.length), (e = 0);
              else if (void 0 === r && "string" == typeof e)
                (n = e), (r = this.length), (e = 0);
              else {
                if (!isFinite(e))
                  throw new Error(
                    "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                  );
                (e >>>= 0),
                  isFinite(r)
                    ? ((r >>>= 0), void 0 === n && (n = "utf8"))
                    : ((n = r), (r = void 0));
              }
              const o = this.length - e;
              if (
                ((void 0 === r || r > o) && (r = o),
                (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
              )
                throw new RangeError("Attempt to write outside buffer bounds");
              n || (n = "utf8");
              let i = !1;
              for (;;)
                switch (n) {
                  case "hex":
                    return w(this, t, e, r);
                  case "utf8":
                  case "utf-8":
                    return E(this, t, e, r);
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return x(this, t, e, r);
                  case "base64":
                    return S(this, t, e, r);
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return k(this, t, e, r);
                  default:
                    if (i) throw new TypeError("Unknown encoding: " + n);
                    (n = ("" + n).toLowerCase()), (i = !0);
                }
            }),
            (u.prototype.toJSON = function () {
              return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0),
              };
            });
          const I = 4096;
          function L(t, e, r) {
            let n = "";
            r = Math.min(t.length, r);
            for (let o = e; o < r; ++o) n += String.fromCharCode(127 & t[o]);
            return n;
          }
          function N(t, e, r) {
            let n = "";
            r = Math.min(t.length, r);
            for (let o = e; o < r; ++o) n += String.fromCharCode(t[o]);
            return n;
          }
          function A(t, e, r) {
            const n = t.length;
            (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
            let o = "";
            for (let n = e; n < r; ++n) o += W[t[n]];
            return o;
          }
          function _(t, e, r) {
            const n = t.slice(e, r);
            let o = "";
            for (let t = 0; t < n.length - 1; t += 2)
              o += String.fromCharCode(n[t] + 256 * n[t + 1]);
            return o;
          }
          function T(t, e, r) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > r)
              throw new RangeError("Trying to access beyond buffer length");
          }
          function P(t, e, r, n, o, i) {
            if (!u.isBuffer(t))
              throw new TypeError(
                '"buffer" argument must be a Buffer instance'
              );
            if (e > o || e < i)
              throw new RangeError('"value" argument is out of bounds');
            if (r + n > t.length) throw new RangeError("Index out of range");
          }
          function C(t, e, r, n, o) {
            D(e, n, o, t, r, 7);
            let i = Number(e & BigInt(4294967295));
            (t[r++] = i),
              (i >>= 8),
              (t[r++] = i),
              (i >>= 8),
              (t[r++] = i),
              (i >>= 8),
              (t[r++] = i);
            let a = Number((e >> BigInt(32)) & BigInt(4294967295));
            return (
              (t[r++] = a),
              (a >>= 8),
              (t[r++] = a),
              (a >>= 8),
              (t[r++] = a),
              (a >>= 8),
              (t[r++] = a),
              r
            );
          }
          function B(t, e, r, n, o) {
            D(e, n, o, t, r, 7);
            let i = Number(e & BigInt(4294967295));
            (t[r + 7] = i),
              (i >>= 8),
              (t[r + 6] = i),
              (i >>= 8),
              (t[r + 5] = i),
              (i >>= 8),
              (t[r + 4] = i);
            let a = Number((e >> BigInt(32)) & BigInt(4294967295));
            return (
              (t[r + 3] = a),
              (a >>= 8),
              (t[r + 2] = a),
              (a >>= 8),
              (t[r + 1] = a),
              (a >>= 8),
              (t[r] = a),
              r + 8
            );
          }
          function U(t, e, r, n, o, i) {
            if (r + n > t.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("Index out of range");
          }
          function F(t, e, r, n, i) {
            return (
              (e = +e),
              (r >>>= 0),
              i || U(t, 0, r, 4),
              o.write(t, e, r, n, 23, 4),
              r + 4
            );
          }
          function R(t, e, r, n, i) {
            return (
              (e = +e),
              (r >>>= 0),
              i || U(t, 0, r, 8),
              o.write(t, e, r, n, 52, 8),
              r + 8
            );
          }
          (u.prototype.slice = function (t, e) {
            const r = this.length;
            (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
              (e = void 0 === e ? r : ~~e) < 0
                ? (e += r) < 0 && (e = 0)
                : e > r && (e = r),
              e < t && (e = t);
            const n = this.subarray(t, e);
            return Object.setPrototypeOf(n, u.prototype), n;
          }),
            (u.prototype.readUintLE = u.prototype.readUIntLE =
              function (t, e, r) {
                (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
                let n = this[t],
                  o = 1,
                  i = 0;
                for (; ++i < e && (o *= 256); ) n += this[t + i] * o;
                return n;
              }),
            (u.prototype.readUintBE = u.prototype.readUIntBE =
              function (t, e, r) {
                (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
                let n = this[t + --e],
                  o = 1;
                for (; e > 0 && (o *= 256); ) n += this[t + --e] * o;
                return n;
              }),
            (u.prototype.readUint8 = u.prototype.readUInt8 =
              function (t, e) {
                return (t >>>= 0), e || T(t, 1, this.length), this[t];
              }),
            (u.prototype.readUint16LE = u.prototype.readUInt16LE =
              function (t, e) {
                return (
                  (t >>>= 0),
                  e || T(t, 2, this.length),
                  this[t] | (this[t + 1] << 8)
                );
              }),
            (u.prototype.readUint16BE = u.prototype.readUInt16BE =
              function (t, e) {
                return (
                  (t >>>= 0),
                  e || T(t, 2, this.length),
                  (this[t] << 8) | this[t + 1]
                );
              }),
            (u.prototype.readUint32LE = u.prototype.readUInt32LE =
              function (t, e) {
                return (
                  (t >>>= 0),
                  e || T(t, 4, this.length),
                  (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                    16777216 * this[t + 3]
                );
              }),
            (u.prototype.readUint32BE = u.prototype.readUInt32BE =
              function (t, e) {
                return (
                  (t >>>= 0),
                  e || T(t, 4, this.length),
                  16777216 * this[t] +
                    ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
                );
              }),
            (u.prototype.readBigUInt64LE = Z(function (t) {
              J((t >>>= 0), "offset");
              const e = this[t],
                r = this[t + 7];
              (void 0 !== e && void 0 !== r) || $(t, this.length - 8);
              const n =
                  e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
                o =
                  this[++t] + 256 * this[++t] + 65536 * this[++t] + r * 2 ** 24;
              return BigInt(n) + (BigInt(o) << BigInt(32));
            })),
            (u.prototype.readBigUInt64BE = Z(function (t) {
              J((t >>>= 0), "offset");
              const e = this[t],
                r = this[t + 7];
              (void 0 !== e && void 0 !== r) || $(t, this.length - 8);
              const n =
                  e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
                o =
                  this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r;
              return (BigInt(n) << BigInt(32)) + BigInt(o);
            })),
            (u.prototype.readIntLE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
              let n = this[t],
                o = 1,
                i = 0;
              for (; ++i < e && (o *= 256); ) n += this[t + i] * o;
              return (o *= 128), n >= o && (n -= Math.pow(2, 8 * e)), n;
            }),
            (u.prototype.readIntBE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
              let n = e,
                o = 1,
                i = this[t + --n];
              for (; n > 0 && (o *= 256); ) i += this[t + --n] * o;
              return (o *= 128), i >= o && (i -= Math.pow(2, 8 * e)), i;
            }),
            (u.prototype.readInt8 = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 1, this.length),
                128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
              );
            }),
            (u.prototype.readInt16LE = function (t, e) {
              (t >>>= 0), e || T(t, 2, this.length);
              const r = this[t] | (this[t + 1] << 8);
              return 32768 & r ? 4294901760 | r : r;
            }),
            (u.prototype.readInt16BE = function (t, e) {
              (t >>>= 0), e || T(t, 2, this.length);
              const r = this[t + 1] | (this[t] << 8);
              return 32768 & r ? 4294901760 | r : r;
            }),
            (u.prototype.readInt32LE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                this[t] |
                  (this[t + 1] << 8) |
                  (this[t + 2] << 16) |
                  (this[t + 3] << 24)
              );
            }),
            (u.prototype.readInt32BE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                (this[t] << 24) |
                  (this[t + 1] << 16) |
                  (this[t + 2] << 8) |
                  this[t + 3]
              );
            }),
            (u.prototype.readBigInt64LE = Z(function (t) {
              J((t >>>= 0), "offset");
              const e = this[t],
                r = this[t + 7];
              (void 0 !== e && void 0 !== r) || $(t, this.length - 8);
              const n =
                this[t + 4] +
                256 * this[t + 5] +
                65536 * this[t + 6] +
                (r << 24);
              return (
                (BigInt(n) << BigInt(32)) +
                BigInt(
                  e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24
                )
              );
            })),
            (u.prototype.readBigInt64BE = Z(function (t) {
              J((t >>>= 0), "offset");
              const e = this[t],
                r = this[t + 7];
              (void 0 !== e && void 0 !== r) || $(t, this.length - 8);
              const n =
                (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
              return (
                (BigInt(n) << BigInt(32)) +
                BigInt(
                  this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r
                )
              );
            })),
            (u.prototype.readFloatLE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                o.read(this, t, !0, 23, 4)
              );
            }),
            (u.prototype.readFloatBE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                o.read(this, t, !1, 23, 4)
              );
            }),
            (u.prototype.readDoubleLE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 8, this.length),
                o.read(this, t, !0, 52, 8)
              );
            }),
            (u.prototype.readDoubleBE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 8, this.length),
                o.read(this, t, !1, 52, 8)
              );
            }),
            (u.prototype.writeUintLE = u.prototype.writeUIntLE =
              function (t, e, r, n) {
                (t = +t),
                  (e >>>= 0),
                  (r >>>= 0),
                  n || P(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                let o = 1,
                  i = 0;
                for (this[e] = 255 & t; ++i < r && (o *= 256); )
                  this[e + i] = (t / o) & 255;
                return e + r;
              }),
            (u.prototype.writeUintBE = u.prototype.writeUIntBE =
              function (t, e, r, n) {
                (t = +t),
                  (e >>>= 0),
                  (r >>>= 0),
                  n || P(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                let o = r - 1,
                  i = 1;
                for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
                  this[e + o] = (t / i) & 255;
                return e + r;
              }),
            (u.prototype.writeUint8 = u.prototype.writeUInt8 =
              function (t, e, r) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  r || P(this, t, e, 1, 255, 0),
                  (this[e] = 255 & t),
                  e + 1
                );
              }),
            (u.prototype.writeUint16LE = u.prototype.writeUInt16LE =
              function (t, e, r) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  r || P(this, t, e, 2, 65535, 0),
                  (this[e] = 255 & t),
                  (this[e + 1] = t >>> 8),
                  e + 2
                );
              }),
            (u.prototype.writeUint16BE = u.prototype.writeUInt16BE =
              function (t, e, r) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  r || P(this, t, e, 2, 65535, 0),
                  (this[e] = t >>> 8),
                  (this[e + 1] = 255 & t),
                  e + 2
                );
              }),
            (u.prototype.writeUint32LE = u.prototype.writeUInt32LE =
              function (t, e, r) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  r || P(this, t, e, 4, 4294967295, 0),
                  (this[e + 3] = t >>> 24),
                  (this[e + 2] = t >>> 16),
                  (this[e + 1] = t >>> 8),
                  (this[e] = 255 & t),
                  e + 4
                );
              }),
            (u.prototype.writeUint32BE = u.prototype.writeUInt32BE =
              function (t, e, r) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  r || P(this, t, e, 4, 4294967295, 0),
                  (this[e] = t >>> 24),
                  (this[e + 1] = t >>> 16),
                  (this[e + 2] = t >>> 8),
                  (this[e + 3] = 255 & t),
                  e + 4
                );
              }),
            (u.prototype.writeBigUInt64LE = Z(function (t, e = 0) {
              return C(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
            })),
            (u.prototype.writeBigUInt64BE = Z(function (t, e = 0) {
              return B(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
            })),
            (u.prototype.writeIntLE = function (t, e, r, n) {
              if (((t = +t), (e >>>= 0), !n)) {
                const n = Math.pow(2, 8 * r - 1);
                P(this, t, e, r, n - 1, -n);
              }
              let o = 0,
                i = 1,
                a = 0;
              for (this[e] = 255 & t; ++o < r && (i *= 256); )
                t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1),
                  (this[e + o] = (((t / i) >> 0) - a) & 255);
              return e + r;
            }),
            (u.prototype.writeIntBE = function (t, e, r, n) {
              if (((t = +t), (e >>>= 0), !n)) {
                const n = Math.pow(2, 8 * r - 1);
                P(this, t, e, r, n - 1, -n);
              }
              let o = r - 1,
                i = 1,
                a = 0;
              for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
                t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1),
                  (this[e + o] = (((t / i) >> 0) - a) & 255);
              return e + r;
            }),
            (u.prototype.writeInt8 = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 1, 127, -128),
                t < 0 && (t = 255 + t + 1),
                (this[e] = 255 & t),
                e + 1
              );
            }),
            (u.prototype.writeInt16LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 2, 32767, -32768),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
            (u.prototype.writeInt16BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 2, 32767, -32768),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
            (u.prototype.writeInt32LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 4, 2147483647, -2147483648),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                (this[e + 2] = t >>> 16),
                (this[e + 3] = t >>> 24),
                e + 4
              );
            }),
            (u.prototype.writeInt32BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || P(this, t, e, 4, 2147483647, -2147483648),
                t < 0 && (t = 4294967295 + t + 1),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
            (u.prototype.writeBigInt64LE = Z(function (t, e = 0) {
              return C(
                this,
                t,
                e,
                -BigInt("0x8000000000000000"),
                BigInt("0x7fffffffffffffff")
              );
            })),
            (u.prototype.writeBigInt64BE = Z(function (t, e = 0) {
              return B(
                this,
                t,
                e,
                -BigInt("0x8000000000000000"),
                BigInt("0x7fffffffffffffff")
              );
            })),
            (u.prototype.writeFloatLE = function (t, e, r) {
              return F(this, t, e, !0, r);
            }),
            (u.prototype.writeFloatBE = function (t, e, r) {
              return F(this, t, e, !1, r);
            }),
            (u.prototype.writeDoubleLE = function (t, e, r) {
              return R(this, t, e, !0, r);
            }),
            (u.prototype.writeDoubleBE = function (t, e, r) {
              return R(this, t, e, !1, r);
            }),
            (u.prototype.copy = function (t, e, r, n) {
              if (!u.isBuffer(t))
                throw new TypeError("argument should be a Buffer");
              if (
                (r || (r = 0),
                n || 0 === n || (n = this.length),
                e >= t.length && (e = t.length),
                e || (e = 0),
                n > 0 && n < r && (n = r),
                n === r)
              )
                return 0;
              if (0 === t.length || 0 === this.length) return 0;
              if (e < 0) throw new RangeError("targetStart out of bounds");
              if (r < 0 || r >= this.length)
                throw new RangeError("Index out of range");
              if (n < 0) throw new RangeError("sourceEnd out of bounds");
              n > this.length && (n = this.length),
                t.length - e < n - r && (n = t.length - e + r);
              const o = n - r;
              return (
                this === t &&
                "function" == typeof Uint8Array.prototype.copyWithin
                  ? this.copyWithin(e, r, n)
                  : Uint8Array.prototype.set.call(t, this.subarray(r, n), e),
                o
              );
            }),
            (u.prototype.fill = function (t, e, r, n) {
              if ("string" == typeof t) {
                if (
                  ("string" == typeof e
                    ? ((n = e), (e = 0), (r = this.length))
                    : "string" == typeof r && ((n = r), (r = this.length)),
                  void 0 !== n && "string" != typeof n)
                )
                  throw new TypeError("encoding must be a string");
                if ("string" == typeof n && !u.isEncoding(n))
                  throw new TypeError("Unknown encoding: " + n);
                if (1 === t.length) {
                  const e = t.charCodeAt(0);
                  (("utf8" === n && e < 128) || "latin1" === n) && (t = e);
                }
              } else
                "number" == typeof t
                  ? (t &= 255)
                  : "boolean" == typeof t && (t = Number(t));
              if (e < 0 || this.length < e || this.length < r)
                throw new RangeError("Out of range index");
              if (r <= e) return this;
              let o;
              if (
                ((e >>>= 0),
                (r = void 0 === r ? this.length : r >>> 0),
                t || (t = 0),
                "number" == typeof t)
              )
                for (o = e; o < r; ++o) this[o] = t;
              else {
                const i = u.isBuffer(t) ? t : u.from(t, n),
                  a = i.length;
                if (0 === a)
                  throw new TypeError(
                    'The value "' + t + '" is invalid for argument "value"'
                  );
                for (o = 0; o < r - e; ++o) this[o + e] = i[o % a];
              }
              return this;
            });
          const M = {};
          function q(t, e, r) {
            M[t] = class extends r {
              constructor() {
                super(),
                  Object.defineProperty(this, "message", {
                    value: e.apply(this, arguments),
                    writable: !0,
                    configurable: !0,
                  }),
                  (this.name = `${this.name} [${t}]`),
                  this.stack,
                  delete this.name;
              }
              get code() {
                return t;
              }
              set code(t) {
                Object.defineProperty(this, "code", {
                  configurable: !0,
                  enumerable: !0,
                  value: t,
                  writable: !0,
                });
              }
              toString() {
                return `${this.name} [${t}]: ${this.message}`;
              }
            };
          }
          function G(t) {
            let e = "",
              r = t.length;
            const n = "-" === t[0] ? 1 : 0;
            for (; r >= n + 4; r -= 3) e = `_${t.slice(r - 3, r)}${e}`;
            return `${t.slice(0, r)}${e}`;
          }
          function D(t, e, r, n, o, i) {
            if (t > r || t < e) {
              const n = "bigint" == typeof e ? "n" : "";
              let o;
              throw (
                ((o =
                  i > 3
                    ? 0 === e || e === BigInt(0)
                      ? `>= 0${n} and < 2${n} ** ${8 * (i + 1)}${n}`
                      : `>= -(2${n} ** ${8 * (i + 1) - 1}${n}) and < 2 ** ${
                          8 * (i + 1) - 1
                        }${n}`
                    : `>= ${e}${n} and <= ${r}${n}`),
                new M.ERR_OUT_OF_RANGE("value", o, t))
              );
            }
            !(function (t, e, r) {
              J(e, "offset"),
                (void 0 !== t[e] && void 0 !== t[e + r]) ||
                  $(e, t.length - (r + 1));
            })(n, o, i);
          }
          function J(t, e) {
            if ("number" != typeof t)
              throw new M.ERR_INVALID_ARG_TYPE(e, "number", t);
          }
          function $(t, e, r) {
            if (Math.floor(t) !== t)
              throw (
                (J(t, r),
                new M.ERR_OUT_OF_RANGE(r || "offset", "an integer", t))
              );
            if (e < 0) throw new M.ERR_BUFFER_OUT_OF_BOUNDS();
            throw new M.ERR_OUT_OF_RANGE(
              r || "offset",
              `>= ${r ? 1 : 0} and <= ${e}`,
              t
            );
          }
          q(
            "ERR_BUFFER_OUT_OF_BOUNDS",
            function (t) {
              return t
                ? `${t} is outside of buffer bounds`
                : "Attempt to access memory outside buffer bounds";
            },
            RangeError
          ),
            q(
              "ERR_INVALID_ARG_TYPE",
              function (t, e) {
                return `The "${t}" argument must be of type number. Received type ${typeof e}`;
              },
              TypeError
            ),
            q(
              "ERR_OUT_OF_RANGE",
              function (t, e, r) {
                let n = `The value of "${t}" is out of range.`,
                  o = r;
                return (
                  Number.isInteger(r) && Math.abs(r) > 2 ** 32
                    ? (o = G(String(r)))
                    : "bigint" == typeof r &&
                      ((o = String(r)),
                      (r > BigInt(2) ** BigInt(32) ||
                        r < -(BigInt(2) ** BigInt(32))) &&
                        (o = G(o)),
                      (o += "n")),
                  (n += ` It must be ${e}. Received ${o}`),
                  n
                );
              },
              RangeError
            );
          const z = /[^+/0-9A-Za-z-_]/g;
          function K(t, e) {
            let r;
            e = e || 1 / 0;
            const n = t.length;
            let o = null;
            const i = [];
            for (let a = 0; a < n; ++a) {
              if (((r = t.charCodeAt(a)), r > 55295 && r < 57344)) {
                if (!o) {
                  if (r > 56319) {
                    (e -= 3) > -1 && i.push(239, 191, 189);
                    continue;
                  }
                  if (a + 1 === n) {
                    (e -= 3) > -1 && i.push(239, 191, 189);
                    continue;
                  }
                  o = r;
                  continue;
                }
                if (r < 56320) {
                  (e -= 3) > -1 && i.push(239, 191, 189), (o = r);
                  continue;
                }
                r = 65536 + (((o - 55296) << 10) | (r - 56320));
              } else o && (e -= 3) > -1 && i.push(239, 191, 189);
              if (((o = null), r < 128)) {
                if ((e -= 1) < 0) break;
                i.push(r);
              } else if (r < 2048) {
                if ((e -= 2) < 0) break;
                i.push((r >> 6) | 192, (63 & r) | 128);
              } else if (r < 65536) {
                if ((e -= 3) < 0) break;
                i.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
              } else {
                if (!(r < 1114112)) throw new Error("Invalid code point");
                if ((e -= 4) < 0) break;
                i.push(
                  (r >> 18) | 240,
                  ((r >> 12) & 63) | 128,
                  ((r >> 6) & 63) | 128,
                  (63 & r) | 128
                );
              }
            }
            return i;
          }
          function X(t) {
            return n.toByteArray(
              (function (t) {
                if (
                  (t = (t = t.split("=")[0]).trim().replace(z, "")).length < 2
                )
                  return "";
                for (; t.length % 4 != 0; ) t += "=";
                return t;
              })(t)
            );
          }
          function Y(t, e, r, n) {
            let o;
            for (o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o)
              e[o + r] = t[o];
            return o;
          }
          function V(t, e) {
            return (
              t instanceof e ||
              (null != t &&
                null != t.constructor &&
                null != t.constructor.name &&
                t.constructor.name === e.name)
            );
          }
          function H(t) {
            return t != t;
          }
          const W = (function () {
            const t = "0123456789abcdef",
              e = new Array(256);
            for (let r = 0; r < 16; ++r) {
              const n = 16 * r;
              for (let o = 0; o < 16; ++o) e[n + o] = t[r] + t[o];
            }
            return e;
          })();
          function Z(t) {
            return "undefined" == typeof BigInt ? Q : t;
          }
          function Q() {
            throw new Error("BigInt not supported");
          }
        },
        238: (t) => {
          t.exports = require("base64-js");
        },
        665: (t) => {
          t.exports = require("ieee754");
        },
        359: (e) => {
          e.exports = t;
        },
      },
      r = {};
    function n(t) {
      var o = r[t];
      if (void 0 !== o) return o.exports;
      var i = (r[t] = { exports: {} });
      return e[t](i, i.exports, n), i.exports;
    }
    (n.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return n.d(e, { a: e }), e;
    }),
      (n.d = (t, e) => {
        for (var r in e)
          n.o(e, r) &&
            !n.o(t, r) &&
            Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
      }),
      (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (n.r = (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      });
    var o = {};
    return (
      (() => {
        n.r(o),
          n.d(o, {
            CommitButton: () => Or,
            Widget: () => ho,
            useAccount: () => Wt,
            useAccountId: () => Zt,
            useCache: () => pr,
            useInitNear: () => At,
            useNear: () => _t,
            utils: () => t,
          });
        var t = {};
        n.r(t),
          n.d(t, {
            ErrorFallback: () => L,
            Loading: () => I,
            MaxGasPerTransaction: () => w,
            OneNear: () => O,
            ReactKey: () => nt,
            StorageCostPerByte: () => E,
            TGas: () => b,
            availableNearBalance: () => G,
            bigMax: () => B,
            bigMin: () => C,
            bigToString: () => U,
            computeWritePermission: () => et,
            convertToStringLeaves: () => V,
            dateToString: () => M,
            deepCopy: () => it,
            deepEqual: () => at,
            deepFreeze: () => rt,
            displayGas: () => R,
            displayNear: () => F,
            displayTime: () => q,
            estimateDataSize: () => z,
            extractKeys: () => K,
            indexMatch: () => Q,
            ipfsUpload: () => J,
            ipfsUrl: () => $,
            isArray: () => A,
            isObject: () => _,
            isReactObject: () => ot,
            isString: () => T,
            isValidAccountId: () => N,
            isoDate: () => D,
            keysToCamel: () => P,
            patternMatch: () => Z,
            removeDuplicates: () => X,
          });
        var e = n(359),
          r = n.n(e);
        const i = require("react-singleton-hook"),
          a = require("near-api-js"),
          c = require("big.js");
        var u = n.n(c);
        const s = require("deep-equal");
        var l = n.n(s),
          f = n(764).lW;
        function h(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return v(t);
            })(t) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            y(t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function p(t) {
          return (
            (p =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            p(t)
          );
        }
        function d(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              var r =
                null == t
                  ? null
                  : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
              if (null != r) {
                var n,
                  o,
                  i,
                  a,
                  c = [],
                  u = !0,
                  s = !1;
                try {
                  if (((i = (r = r.call(t)).next), 0 === e)) {
                    if (Object(r) !== r) return;
                    u = !1;
                  } else
                    for (
                      ;
                      !(u = (n = i.call(r)).done) &&
                      (c.push(n.value), c.length !== e);
                      u = !0
                    );
                } catch (t) {
                  (s = !0), (o = t);
                } finally {
                  try {
                    if (
                      !u &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw o;
                  }
                }
                return c;
              }
            })(t, e) ||
            y(t, e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function y(t, e) {
          if (t) {
            if ("string" == typeof t) return v(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            return (
              "Object" === r && t.constructor && (r = t.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(t)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? v(t, e)
                : void 0
            );
          }
        }
        function v(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function m() {
          m = function () {
            return t;
          };
          var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            n =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value;
              },
            o = "function" == typeof Symbol ? Symbol : {},
            i = o.iterator || "@@iterator",
            a = o.asyncIterator || "@@asyncIterator",
            c = o.toStringTag || "@@toStringTag";
          function u(t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            u({}, "");
          } catch (t) {
            u = function (t, e, r) {
              return (t[e] = r);
            };
          }
          function s(t, e, r, o) {
            var i = e && e.prototype instanceof h ? e : h,
              a = Object.create(i.prototype),
              c = new I(o || []);
            return n(a, "_invoke", { value: S(t, r, c) }), a;
          }
          function l(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          t.wrap = s;
          var f = {};
          function h() {}
          function d() {}
          function y() {}
          var v = {};
          u(v, i, function () {
            return this;
          });
          var g = Object.getPrototypeOf,
            b = g && g(g(L([])));
          b && b !== e && r.call(b, i) && (v = b);
          var w = (y.prototype = h.prototype = Object.create(v));
          function E(t) {
            ["next", "throw", "return"].forEach(function (e) {
              u(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function x(t, e) {
            function o(n, i, a, c) {
              var u = l(t[n], t, i);
              if ("throw" !== u.type) {
                var s = u.arg,
                  f = s.value;
                return f && "object" == p(f) && r.call(f, "__await")
                  ? e.resolve(f.__await).then(
                      function (t) {
                        o("next", t, a, c);
                      },
                      function (t) {
                        o("throw", t, a, c);
                      }
                    )
                  : e.resolve(f).then(
                      function (t) {
                        (s.value = t), a(s);
                      },
                      function (t) {
                        return o("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            n(this, "_invoke", {
              value: function (t, r) {
                function n() {
                  return new e(function (e, n) {
                    o(t, r, e, n);
                  });
                }
                return (i = i ? i.then(n, n) : n());
              },
            });
          }
          function S(t, e, r) {
            var n = "suspendedStart";
            return function (o, i) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === o) throw i;
                return { value: void 0, done: !0 };
              }
              for (r.method = o, r.arg = i; ; ) {
                var a = r.delegate;
                if (a) {
                  var c = k(a, r);
                  if (c) {
                    if (c === f) continue;
                    return c;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var u = l(t, e, r);
                if ("normal" === u.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), u.arg === f)
                  )
                    continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          }
          function k(t, e) {
            var r = e.method,
              n = t.iterator[r];
            if (void 0 === n)
              return (
                (e.delegate = null),
                ("throw" === r &&
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = void 0),
                  k(t, e),
                  "throw" === e.method)) ||
                  ("return" !== r &&
                    ((e.method = "throw"),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                f
              );
            var o = l(n, t.iterator, e.arg);
            if ("throw" === o.type)
              return (
                (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), f
              );
            var i = o.arg;
            return i
              ? i.done
                ? ((e[t.resultName] = i.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method &&
                    ((e.method = "next"), (e.arg = void 0)),
                  (e.delegate = null),
                  f)
                : i
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                f);
          }
          function O(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function j(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function I(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(O, this),
              this.reset(!0);
          }
          function L(t) {
            if (t) {
              var e = t[i];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  o = function e() {
                    for (; ++n < t.length; )
                      if (r.call(t, n))
                        return (e.value = t[n]), (e.done = !1), e;
                    return (e.value = void 0), (e.done = !0), e;
                  };
                return (o.next = o);
              }
            }
            return { next: N };
          }
          function N() {
            return { value: void 0, done: !0 };
          }
          return (
            (d.prototype = y),
            n(w, "constructor", { value: y, configurable: !0 }),
            n(y, "constructor", { value: d, configurable: !0 }),
            (d.displayName = u(y, c, "GeneratorFunction")),
            (t.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === d || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, y)
                  : ((t.__proto__ = y), u(t, c, "GeneratorFunction")),
                (t.prototype = Object.create(w)),
                t
              );
            }),
            (t.awrap = function (t) {
              return { __await: t };
            }),
            E(x.prototype),
            u(x.prototype, a, function () {
              return this;
            }),
            (t.AsyncIterator = x),
            (t.async = function (e, r, n, o, i) {
              void 0 === i && (i = Promise);
              var a = new x(s(e, r, n, o), i);
              return t.isGeneratorFunction(r)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            E(w),
            u(w, c, "Generator"),
            u(w, i, function () {
              return this;
            }),
            u(w, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (t) {
              var e = Object(t),
                r = [];
              for (var n in e) r.push(n);
              return (
                r.reverse(),
                function t() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in e) return (t.value = n), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (t.values = L),
            (I.prototype = {
              constructor: I,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = void 0),
                  this.tryEntries.forEach(j),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      r.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = void 0);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function n(r, n) {
                  return (
                    (a.type = "throw"),
                    (a.arg = t),
                    (e.next = r),
                    n && ((e.method = "next"), (e.arg = void 0)),
                    !!n
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var i = this.tryEntries[o],
                    a = i.completion;
                  if ("root" === i.tryLoc) return n("end");
                  if (i.tryLoc <= this.prev) {
                    var c = r.call(i, "catchLoc"),
                      u = r.call(i, "finallyLoc");
                    if (c && u) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    } else if (c) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                    } else {
                      if (!u)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), f)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  f
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), j(r), f;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var o = n.arg;
                      j(r);
                    }
                    return o;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, e, r) {
                return (
                  (this.delegate = {
                    iterator: L(t),
                    resultName: e,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = void 0),
                  f
                );
              },
            }),
            t
          );
        }
        function g(t, e, r, n, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void r(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(n, o);
        }
        var b = u()(10).pow(12),
          w = b.mul(250),
          E = u()(10).pow(19),
          x = 2,
          S = 64,
          k = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/,
          O = u()(10).pow(24),
          j = O.div(2),
          I = r().createElement("span", {
            className: "spinner-grow spinner-grow-sm me-1",
            role: "status",
            "aria-hidden": "true",
          }),
          L = function (t) {
            var e = t.error;
            return r().createElement(
              "div",
              { role: "alert" },
              r().createElement("p", null, "Something went wrong:"),
              r().createElement("pre", null, e.message)
            );
          };
        function N(t) {
          return t && t.length >= x && t.length <= S && t.match(k);
        }
        var A = function (t) {
            return Array.isArray(t);
          },
          _ = function (t) {
            return t === Object(t) && !A(t) && "function" != typeof t;
          },
          T = function (t) {
            return "string" == typeof t;
          },
          P = function t(e) {
            if (_(e)) {
              var r = {};
              return (
                Object.keys(e).forEach(function (n) {
                  var o;
                  r[
                    ((o = n),
                    o.replace(/([-_][a-z])/gi, function (t) {
                      return t.toUpperCase().replace("-", "").replace("_", "");
                    }))
                  ] = t(e[n]);
                }),
                r
              );
            }
            return A(e)
              ? e.map(function (e) {
                  return t(e);
                })
              : e;
          },
          C = function (t, e) {
            return t && e ? (t.lt(e) ? t : e) : t || e;
          },
          B = function (t, e) {
            return t && e ? (t.gt(e) ? t : e) : t || e;
          },
          U = function (t, e, r) {
            if (null === t) return "???";
            var n = t.toFixed(),
              o = n.indexOf(".");
            if (((e = e || 6), (r = r || 7), o > 0)) {
              var i = Math.min(e, Math.max(r - o, 0));
              i > 0 && (i += 1),
                o + i < n.length && (n = n.substring(0, o + i));
            } else o = n.length;
            for (var a = o - 4; a >= 0; a -= 3)
              n = n.slice(0, a + 1) + "," + n.slice(a + 1);
            return "0.000000" === n && 6 === e && 7 === r ? "<0.000001" : n;
          },
          F = function (t) {
            return t
              ? t.eq(1)
                ? r().createElement(
                    r().Fragment,
                    null,
                    "1 ",
                    r().createElement(
                      "span",
                      { className: "text-secondary" },
                      "yoctoNEAR"
                    )
                  )
                : r().createElement(
                    r().Fragment,
                    null,
                    U(t.div(O)),
                    " ",
                    r().createElement(
                      "span",
                      { className: "text-secondary" },
                      "NEAR"
                    )
                  )
              : "???";
          },
          R = function (t) {
            return t
              ? r().createElement(
                  r().Fragment,
                  null,
                  U(t.div(b)),
                  " ",
                  r().createElement(
                    "span",
                    { className: "text-secondary" },
                    "TGas"
                  )
                )
              : "???";
          },
          M = function (t) {
            return t.toLocaleString("en-us", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
          },
          q = function (t) {
            return t.toLocaleString();
          },
          G = function (t) {
            if (t && !t.loading && t.state) {
              var e = u()(t.state.amount).sub(
                u()(t.state.storage_usage).mul(u()(E))
              );
              if (e.gt(j)) return e.sub(j);
            }
            return u()(0);
          },
          D = function (t) {
            return t ? new Date(t).toISOString().substring(0, 10) : "";
          },
          J = (function () {
            var t,
              e =
                ((t = m().mark(function t(e) {
                  var r;
                  return m().wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.next = 2),
                            fetch("https://ipfs.near.social/add", {
                              method: "POST",
                              headers: { Accept: "application/json" },
                              body: e,
                            })
                          );
                        case 2:
                          return (r = t.sent), (t.next = 5), r.json();
                        case 5:
                          return t.abrupt("return", t.sent.cid);
                        case 6:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })),
                function () {
                  var e = this,
                    r = arguments;
                  return new Promise(function (n, o) {
                    var i = t.apply(e, r);
                    function a(t) {
                      g(i, n, o, a, c, "next", t);
                    }
                    function c(t) {
                      g(i, n, o, a, c, "throw", t);
                    }
                    a(void 0);
                  });
                });
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
          $ = function (t) {
            return "https://ipfs.near.social/ipfs/".concat(t);
          },
          z = function t(e, r) {
            return _(e)
              ? Object.entries(e).reduce(
                  function (e, n) {
                    var o = d(n, 2),
                      i = o[0],
                      a = o[1],
                      c = _(r) ? r[i] : void 0;
                    return (
                      e +
                      (void 0 !== c
                        ? t(a, c)
                        : 2 * i.length + t(a, void 0) + 140)
                    );
                  },
                  _(r) ? 0 : 98
                )
              : ((null == e ? void 0 : e.length) || 8) - (T(r) ? r.length : 0);
          },
          K = function t(e) {
            var r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "";
            return Object.entries(e)
              .map(function (e) {
                var n = d(e, 2),
                  o = n[0],
                  i = n[1];
                return _(i)
                  ? t(i, "".concat(r).concat(o, "/"))
                  : "".concat(r).concat(o);
              })
              .flat();
          },
          X = function t(e, r) {
            var n = Object.entries(e).reduce(function (e, n) {
              var o = d(n, 2),
                i = o[0],
                a = o[1],
                c = _(r) ? r[i] : void 0;
              if (_(a)) {
                var u = _(c) ? t(a, c) : a;
                void 0 !== u && (e[i] = u);
              } else a !== c && (e[i] = a);
              return e;
            }, {});
            return Object.keys(n).length ? n : void 0;
          },
          Y = function (t) {
            return T(t) || null === t ? t : JSON.stringify(t);
          },
          V = function t(e) {
            return _(e)
              ? Object.entries(e).reduce(function (e, r) {
                  var n = d(r, 2),
                    o = n[0],
                    i = n[1];
                  return (e[Y(o)] = t(i)), e;
                }, {})
              : Y(e);
          },
          H = function t(e, r) {
            var n = r[0],
              o = "**" === n;
            return o
              ? 1 === r.length
              : ("*" === n || o ? Object.values(e) : n in e ? [e[n]] : []).some(
                  function (e) {
                    return _(e)
                      ? r.length > 1
                        ? t(e, r.slice(1))
                        : void 0 !== e[""]
                      : 1 === r.length;
                  }
                );
          },
          W = function t(e, r) {
            var n = r[0];
            return ("*" === n ? Object.values(e) : n in e ? [e[n]] : []).some(
              function (e) {
                return 1 === r.length || (_(e) && t(e, r.slice(1)));
              }
            );
          },
          Z = function (t, e, r) {
            var n = e.split("/");
            return "get" === t ? H(r, n) : "keys" === t && W(r, n);
          },
          Q = function (t, e, r) {
            return Object.values(r).some(function (r) {
              var n,
                o =
                  null == r || null === (n = r.index) || void 0 === n
                    ? void 0
                    : n[t];
              try {
                return (
                  o && JSON.stringify(JSON.parse(o).key) === JSON.stringify(e)
                );
              } catch (t) {
                return !1;
              }
            });
          },
          tt = { graph: !0, post: !0, index: !0, settings: !0 },
          et = function (t, e) {
            var r = _(t) ? JSON.parse(JSON.stringify(t)) : {};
            return (
              _(e) &&
                Object.entries(e).forEach(function (t) {
                  var e = d(t, 2),
                    n = e[0],
                    o = e[1];
                  if (n in tt)
                    if (_(o)) {
                      var i = (r[n] = r[n] || {});
                      Object.keys(o).forEach(function (t) {
                        i[t] = !0;
                      });
                    } else r[n] = !0;
                  else r[n] = !0;
                }),
              r
            );
          },
          rt = function t(e) {
            return (
              Object.keys(e).forEach(function (r) {
                (function (t, e) {
                  return !!Object.getOwnPropertyDescriptor(t, e).get;
                })(e, r) ||
                  "object" !== p(e[r]) ||
                  Object.isFrozen(e[r]) ||
                  t(e[r]);
              }),
              Object.freeze(e)
            );
          },
          nt = "$$typeof",
          ot = function (t) {
            return null !== t && "object" === p(t) && !!t[nt];
          },
          it = function t(e) {
            return Array.isArray(e)
              ? e.map(function (e) {
                  return t(e);
                })
              : e instanceof Map
              ? new Map(
                  h(e.entries()).map(function (e) {
                    var r = d(e, 2),
                      n = r[0],
                      o = r[1];
                    return [t(n), t(o)];
                  })
                )
              : e instanceof Set
              ? new Set(
                  h(e).map(function (e) {
                    return t(e);
                  })
                )
              : f.isBuffer(e)
              ? f.from(e)
              : e instanceof URL
              ? new URL(e)
              : e instanceof File
              ? new File([e], e.name, { type: e.type })
              : e instanceof Blob
              ? new Blob([e], { type: e.type })
              : e instanceof Uint8Array || e instanceof ArrayBuffer
              ? e.slice(0)
              : _(e)
              ? ot(e)
                ? e
                : Object.fromEntries(
                    Object.entries(e).map(function (e) {
                      var r = d(e, 2),
                        n = r[0],
                        o = r[1];
                      return [n, t(o)];
                    })
                  )
              : void 0 === e || "function" == typeof e
              ? e
              : JSON.parse(JSON.stringify(e));
          },
          at = l(),
          ct = n(764).lW;
        function ut(t) {
          return (
            (ut =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            ut(t)
          );
        }
        function st(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              var r =
                null == t
                  ? null
                  : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
              if (null != r) {
                var n,
                  o,
                  i,
                  a,
                  c = [],
                  u = !0,
                  s = !1;
                try {
                  if (((i = (r = r.call(t)).next), 0 === e)) {
                    if (Object(r) !== r) return;
                    u = !1;
                  } else
                    for (
                      ;
                      !(u = (n = i.call(r)).done) &&
                      (c.push(n.value), c.length !== e);
                      u = !0
                    );
                } catch (t) {
                  (s = !0), (o = t);
                } finally {
                  try {
                    if (
                      !u &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw o;
                  }
                }
                return c;
              }
            })(t, e) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return lt(t, e);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                return (
                  "Object" === r && t.constructor && (r = t.constructor.name),
                  "Map" === r || "Set" === r
                    ? Array.from(t)
                    : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? lt(t, e)
                    : void 0
                );
              }
            })(t, e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function lt(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function ft() {
          ft = function () {
            return t;
          };
          var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            n =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value;
              },
            o = "function" == typeof Symbol ? Symbol : {},
            i = o.iterator || "@@iterator",
            a = o.asyncIterator || "@@asyncIterator",
            c = o.toStringTag || "@@toStringTag";
          function u(t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            u({}, "");
          } catch (t) {
            u = function (t, e, r) {
              return (t[e] = r);
            };
          }
          function s(t, e, r, o) {
            var i = e && e.prototype instanceof h ? e : h,
              a = Object.create(i.prototype),
              c = new O(o || []);
            return n(a, "_invoke", { value: E(t, r, c) }), a;
          }
          function l(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          t.wrap = s;
          var f = {};
          function h() {}
          function p() {}
          function d() {}
          var y = {};
          u(y, i, function () {
            return this;
          });
          var v = Object.getPrototypeOf,
            m = v && v(v(j([])));
          m && m !== e && r.call(m, i) && (y = m);
          var g = (d.prototype = h.prototype = Object.create(y));
          function b(t) {
            ["next", "throw", "return"].forEach(function (e) {
              u(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function w(t, e) {
            function o(n, i, a, c) {
              var u = l(t[n], t, i);
              if ("throw" !== u.type) {
                var s = u.arg,
                  f = s.value;
                return f && "object" == ut(f) && r.call(f, "__await")
                  ? e.resolve(f.__await).then(
                      function (t) {
                        o("next", t, a, c);
                      },
                      function (t) {
                        o("throw", t, a, c);
                      }
                    )
                  : e.resolve(f).then(
                      function (t) {
                        (s.value = t), a(s);
                      },
                      function (t) {
                        return o("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            n(this, "_invoke", {
              value: function (t, r) {
                function n() {
                  return new e(function (e, n) {
                    o(t, r, e, n);
                  });
                }
                return (i = i ? i.then(n, n) : n());
              },
            });
          }
          function E(t, e, r) {
            var n = "suspendedStart";
            return function (o, i) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === o) throw i;
                return { value: void 0, done: !0 };
              }
              for (r.method = o, r.arg = i; ; ) {
                var a = r.delegate;
                if (a) {
                  var c = x(a, r);
                  if (c) {
                    if (c === f) continue;
                    return c;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var u = l(t, e, r);
                if ("normal" === u.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), u.arg === f)
                  )
                    continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          }
          function x(t, e) {
            var r = e.method,
              n = t.iterator[r];
            if (void 0 === n)
              return (
                (e.delegate = null),
                ("throw" === r &&
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = void 0),
                  x(t, e),
                  "throw" === e.method)) ||
                  ("return" !== r &&
                    ((e.method = "throw"),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                f
              );
            var o = l(n, t.iterator, e.arg);
            if ("throw" === o.type)
              return (
                (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), f
              );
            var i = o.arg;
            return i
              ? i.done
                ? ((e[t.resultName] = i.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method &&
                    ((e.method = "next"), (e.arg = void 0)),
                  (e.delegate = null),
                  f)
                : i
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                f);
          }
          function S(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function k(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function O(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(S, this),
              this.reset(!0);
          }
          function j(t) {
            if (t) {
              var e = t[i];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  o = function e() {
                    for (; ++n < t.length; )
                      if (r.call(t, n))
                        return (e.value = t[n]), (e.done = !1), e;
                    return (e.value = void 0), (e.done = !0), e;
                  };
                return (o.next = o);
              }
            }
            return { next: I };
          }
          function I() {
            return { value: void 0, done: !0 };
          }
          return (
            (p.prototype = d),
            n(g, "constructor", { value: d, configurable: !0 }),
            n(d, "constructor", { value: p, configurable: !0 }),
            (p.displayName = u(d, c, "GeneratorFunction")),
            (t.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === p || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, d)
                  : ((t.__proto__ = d), u(t, c, "GeneratorFunction")),
                (t.prototype = Object.create(g)),
                t
              );
            }),
            (t.awrap = function (t) {
              return { __await: t };
            }),
            b(w.prototype),
            u(w.prototype, a, function () {
              return this;
            }),
            (t.AsyncIterator = w),
            (t.async = function (e, r, n, o, i) {
              void 0 === i && (i = Promise);
              var a = new w(s(e, r, n, o), i);
              return t.isGeneratorFunction(r)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            b(g),
            u(g, c, "Generator"),
            u(g, i, function () {
              return this;
            }),
            u(g, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (t) {
              var e = Object(t),
                r = [];
              for (var n in e) r.push(n);
              return (
                r.reverse(),
                function t() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in e) return (t.value = n), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (t.values = j),
            (O.prototype = {
              constructor: O,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = void 0),
                  this.tryEntries.forEach(k),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      r.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = void 0);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function n(r, n) {
                  return (
                    (a.type = "throw"),
                    (a.arg = t),
                    (e.next = r),
                    n && ((e.method = "next"), (e.arg = void 0)),
                    !!n
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var i = this.tryEntries[o],
                    a = i.completion;
                  if ("root" === i.tryLoc) return n("end");
                  if (i.tryLoc <= this.prev) {
                    var c = r.call(i, "catchLoc"),
                      u = r.call(i, "finallyLoc");
                    if (c && u) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    } else if (c) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                    } else {
                      if (!u)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), f)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  f
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), k(r), f;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var o = n.arg;
                      k(r);
                    }
                    return o;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, e, r) {
                return (
                  (this.delegate = {
                    iterator: j(t),
                    resultName: e,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = void 0),
                  f
                );
              },
            }),
            t
          );
        }
        function ht(t, e, r, n, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void r(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(n, o);
        }
        function pt(t) {
          return function () {
            var e = this,
              r = arguments;
            return new Promise(function (n, o) {
              var i = t.apply(e, r);
              function a(t) {
                ht(i, n, o, a, c, "next", t);
              }
              function c(t) {
                ht(i, n, o, a, c, "throw", t);
              }
              a(void 0);
            });
          };
        }
        var dt = {
            networkId: "testnet",
            nodeUrl: "https://rpc.testnet.near.org",
            archivalNodeUrl: "https://rpc.testnet.internal.near.org",
            contractName: "v1.social08.testnet",
            walletUrl: "https://wallet.testnet.near.org",
            wrapNearAccountId: "wrap.testnet",
            apiUrl: null,
            enableWeb4FastRpc: !1,
          },
          yt = {
            networkId: "mainnet",
            nodeUrl: "https://rpc.mainnet.near.org",
            archivalNodeUrl: "https://rpc.mainnet.internal.near.org",
            contractName: "social.near",
            walletUrl: "https://wallet.near.org",
            wrapNearAccountId: "wrap.near",
            apiUrl: "https://api.near.social",
            enableWeb4FastRpc: !1,
          },
          vt = { get: !0, keys: !0 },
          mt = (function () {
            var t = pt(
              ft().mark(function t(e, r, n, o, i) {
                return ft().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (e.apiUrl && r in vt) {
                            t.next = 2;
                            break;
                          }
                          return t.abrupt("return", i());
                        case 2:
                          return (
                            (n = n || {}),
                            o && (n.blockHeight = o),
                            (t.prev = 4),
                            (t.next = 7),
                            fetch("".concat(e.apiUrl, "/").concat(r), {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(n),
                            })
                          );
                        case 7:
                          return (t.next = 9), t.sent.json();
                        case 9:
                          return t.abrupt("return", t.sent);
                        case 12:
                          return (
                            (t.prev = 12),
                            (t.t0 = t.catch(4)),
                            console.log("API call failed", r, n),
                            console.error(t.t0),
                            t.abrupt("return", i())
                          );
                        case 17:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[4, 12]]
                );
              })
            );
            return function (e, r, n, o, i) {
              return t.apply(this, arguments);
            };
          })();
        function gt(t, e, r, n, o, i) {
          return bt.apply(this, arguments);
        }
        function bt() {
          return (bt = pt(
            ft().mark(function t(e, r, n, o, i, a) {
              var c;
              return ft().wrap(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (t.prev = 0), (t.next = 3), e.selector;
                      case 3:
                        return (t.next = 5), t.sent.wallet();
                      case 5:
                        return (
                          (c = t.sent),
                          (t.next = 8),
                          c.signAndSendTransaction({
                            receiverId: r,
                            actions: [
                              {
                                type: "FunctionCall",
                                params: {
                                  methodName: n,
                                  args: o,
                                  gas: null != i ? i : b.mul(30).toFixed(0),
                                  deposit: null != a ? a : "0",
                                },
                              },
                            ],
                          })
                        );
                      case 8:
                        return t.abrupt("return", t.sent);
                      case 11:
                        throw ((t.prev = 11), (t.t0 = t.catch(0)), t.t0);
                      case 14:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                null,
                [[0, 11]]
              );
            })
          )).apply(this, arguments);
        }
        function wt(t, e) {
          return Et.apply(this, arguments);
        }
        function Et() {
          return (Et = pt(
            ft().mark(function t(e, r) {
              var n;
              return ft().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (n = new a.Account(e.nearConnection.connection, r)),
                        (t.next = 3),
                        n.state()
                      );
                    case 3:
                      return t.abrupt("return", t.sent);
                    case 4:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )).apply(this, arguments);
        }
        function xt(t, e) {
          return St.apply(this, arguments);
        }
        function St() {
          return (St = pt(
            ft().mark(function t(e, r) {
              var n, o, i;
              return ft().wrap(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (t.prev = 0), (t.next = 3), e.selector;
                      case 3:
                        return (t.next = 5), t.sent.wallet();
                      case 5:
                        return (
                          (n = t.sent),
                          (o = []),
                          (i = u()(0)),
                          r.forEach(function (t) {
                            var e,
                              r = t.contractName,
                              n = t.methodName,
                              a = t.args,
                              c = t.gas,
                              u = t.deposit,
                              s = i.add(c),
                              l = {
                                type: "FunctionCall",
                                params: {
                                  methodName: n,
                                  args: a,
                                  gas: c.toFixed(0),
                                  deposit: u.toFixed(0),
                                },
                              };
                            (null === (e = o[o.length - 1]) || void 0 === e
                              ? void 0
                              : e.receiverId) !== r || s.gt(w)
                              ? (o.push({ receiverId: r, actions: [] }),
                                (i = c))
                              : (i = s),
                              o[o.length - 1].actions.push(l);
                          }),
                          (t.next = 11),
                          n.signAndSendTransactions({ transactions: o })
                        );
                      case 11:
                        return t.abrupt("return", t.sent);
                      case 14:
                        throw ((t.prev = 14), (t.t0 = t.catch(0)), t.t0);
                      case 17:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                null,
                [[0, 14]]
              );
            })
          )).apply(this, arguments);
        }
        function kt(t, e, r) {
          var n = r.viewMethods,
            o = void 0 === n ? [] : n,
            i = r.changeMethods,
            a = void 0 === i ? [] : i,
            c = { near: t, contractId: e };
          return (
            o.forEach(function (r) {
              c[r] = function (n) {
                return t.viewCall(e, r, n);
              };
            }),
            a.forEach(function (r) {
              c[r] = function (n, o, i) {
                return t.functionCall(e, r, n, o, i);
              };
            }),
            c
          );
        }
        function Ot(t, e, r, n, o, i) {
          return jt.apply(this, arguments);
        }
        function jt() {
          return (jt = pt(
            ft().mark(function t(e, r, n, o, i, a) {
              var c;
              return ft().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (i = i || {}),
                        (t.next = 3),
                        e.query({
                          request_type: "call_function",
                          account_id: n,
                          method_name: o,
                          args_base64: ct
                            .from(JSON.stringify(i))
                            .toString("base64"),
                          block_id: r,
                          finality: a,
                        })
                      );
                    case 3:
                      return (
                        (c = t.sent),
                        t.abrupt(
                          "return",
                          c.result &&
                            c.result.length > 0 &&
                            JSON.parse(ct.from(c.result).toString())
                        )
                      );
                    case 5:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )).apply(this, arguments);
        }
        function It(t, e, r, n) {
          return Lt.apply(this, arguments);
        }
        function Lt() {
          return (Lt = pt(
            ft().mark(function t(e, r, n, o) {
              var i;
              return ft().wrap(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (n = n || {}),
                          (i = new URL(
                            "https://rpc.web4.near.page/account/"
                              .concat(e, "/view/")
                              .concat(r)
                          )),
                          Object.entries(n).forEach(function (t) {
                            var e = st(t, 2),
                              r = e[0],
                              n = e[1];
                            void 0 !== n &&
                              i.searchParams.append(
                                "".concat(r, ".json"),
                                JSON.stringify(n)
                              );
                          }),
                          (t.prev = 3),
                          (t.next = 6),
                          fetch(i.toString())
                        );
                      case 6:
                        return (t.next = 8), t.sent.json();
                      case 8:
                        return t.abrupt("return", t.sent);
                      case 11:
                        return (
                          (t.prev = 11),
                          (t.t0 = t.catch(3)),
                          console.log("Web4 view call failed", i.toString()),
                          console.error(t.t0),
                          t.abrupt("return", o())
                        );
                      case 16:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                null,
                [[3, 11]]
              );
            })
          )).apply(this, arguments);
        }
        function Nt() {
          return (
            (Nt = pt(
              ft().mark(function t() {
                var e,
                  r,
                  n,
                  o,
                  i,
                  c,
                  u,
                  s,
                  l,
                  f = arguments;
                return ft().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (n = (r = f.length > 0 && void 0 !== f[0] ? f[0] : {})
                            .networkId),
                          (o = r.config),
                          (i = r.keyStore),
                          (c = r.selector),
                          o || ((o = {}), n || (o.networkId = "mainnet")),
                          n && !o.networkId && (o.networkId = n),
                          "mainnet" === o.networkId
                            ? (o = Object.assign({}, o, yt))
                            : "testnet" === o.networkId &&
                              (o = Object.assign({}, o, dt)),
                          (i =
                            null !== (e = i) && void 0 !== e
                              ? e
                              : new a.keyStores.BrowserLocalStorageKeyStore()),
                          (t.next = 7),
                          a.connect(Object.assign({ deps: { keyStore: i } }, o))
                        );
                      case 7:
                        return (
                          (u = t.sent),
                          ((s = {
                            config: o,
                            selector: c,
                            keyStore: i,
                            nearConnection: u,
                          }).nearArchivalConnection = a.Connection.fromConfig({
                            networkId: o.networkId,
                            provider: {
                              type: "JsonRpcProvider",
                              args: { url: o.archivalNodeUrl },
                            },
                            signer: { type: "InMemorySigner", keyStore: i },
                          })),
                          (l = function (t) {
                            return "optimistic" === t || "final" === t
                              ? { finality: t, blockId: void 0 }
                              : null != t
                              ? { finality: void 0, blockId: parseInt(t) }
                              : { finality: "optimistic", blockId: void 0 };
                          }),
                          (s.viewCall = function (t, e, r, n) {
                            var i = l(n),
                              a = i.blockId,
                              c = i.finality,
                              u = function () {
                                return Ot(
                                  a
                                    ? s.nearArchivalConnection.provider
                                    : s.nearConnection.connection.provider,
                                  null != a ? a : void 0,
                                  t,
                                  e,
                                  r,
                                  c
                                );
                              },
                              f = function () {
                                return "optimistic" === c && o.enableWeb4FastRpc
                                  ? It(t, e, r, u)
                                  : u();
                              };
                            return t !== o.contractName || (!a && "final" !== c)
                              ? f()
                              : mt(o, e, r, a, f);
                          }),
                          (s.block = function (t) {
                            var e = l(t);
                            return (
                              e.blockId
                                ? s.nearArchivalConnection.provider
                                : s.nearConnection.connection.provider
                            ).block(e);
                          }),
                          (s.functionCall = function (t, e, r, n, o) {
                            return gt(s, t, e, r, n, o);
                          }),
                          (s.sendTransactions = function (t) {
                            return xt(s, t);
                          }),
                          (s.contract = kt(s, o.contractName, {
                            viewMethods: [
                              "storage_balance_of",
                              "get",
                              "get_num_accounts",
                              "get_accounts_paged",
                              "is_write_permission_granted",
                              "keys",
                            ],
                            changeMethods: [
                              "set",
                              "grant_write_permission",
                              "storage_deposit",
                              "storage_withdraw",
                            ],
                          })),
                          (s.accountState = function (t) {
                            return wt(s, t);
                          }),
                          t.abrupt("return", s)
                        );
                      case 18:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            )),
            Nt.apply(this, arguments)
          );
        }
        var At = (0, i.singletonHook)({}, function () {
            var t = st((0, e.useState)(null), 2),
              r = t[0],
              n = t[1];
            return {
              nearPromise: r,
              initNear: (0, e.useMemo)(function () {
                return function (t) {
                  return n(
                    (function () {
                      return Nt.apply(this, arguments);
                    })(t)
                  );
                };
              }, []),
            };
          }),
          _t = (0, i.singletonHook)(null, function () {
            var t = st((0, e.useState)(null), 2),
              r = t[0],
              n = t[1],
              o = At().nearPromise;
            return (
              (0, e.useEffect)(
                function () {
                  o && o.then(n);
                },
                [o]
              ),
              r
            );
          });
        const Tt = require("local-storage");
        var Pt,
          Ct,
          Bt,
          Ut,
          Ft = n.n(Tt);
        function Rt(t) {
          return (
            (Rt =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            Rt(t)
          );
        }
        function Mt(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              var r =
                null == t
                  ? null
                  : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
              if (null != r) {
                var n,
                  o,
                  i,
                  a,
                  c = [],
                  u = !0,
                  s = !1;
                try {
                  if (((i = (r = r.call(t)).next), 0 === e)) {
                    if (Object(r) !== r) return;
                    u = !1;
                  } else
                    for (
                      ;
                      !(u = (n = i.call(r)).done) &&
                      (c.push(n.value), c.length !== e);
                      u = !0
                    );
                } catch (t) {
                  (s = !0), (o = t);
                } finally {
                  try {
                    if (
                      !u &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw o;
                  }
                }
                return c;
              }
            })(t, e) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return qt(t, e);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                return (
                  "Object" === r && t.constructor && (r = t.constructor.name),
                  "Map" === r || "Set" === r
                    ? Array.from(t)
                    : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? qt(t, e)
                    : void 0
                );
              }
            })(t, e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function qt(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function Gt() {
          Gt = function () {
            return t;
          };
          var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            n =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value;
              },
            o = "function" == typeof Symbol ? Symbol : {},
            i = o.iterator || "@@iterator",
            a = o.asyncIterator || "@@asyncIterator",
            c = o.toStringTag || "@@toStringTag";
          function u(t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            u({}, "");
          } catch (t) {
            u = function (t, e, r) {
              return (t[e] = r);
            };
          }
          function s(t, e, r, o) {
            var i = e && e.prototype instanceof h ? e : h,
              a = Object.create(i.prototype),
              c = new O(o || []);
            return n(a, "_invoke", { value: E(t, r, c) }), a;
          }
          function l(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          t.wrap = s;
          var f = {};
          function h() {}
          function p() {}
          function d() {}
          var y = {};
          u(y, i, function () {
            return this;
          });
          var v = Object.getPrototypeOf,
            m = v && v(v(j([])));
          m && m !== e && r.call(m, i) && (y = m);
          var g = (d.prototype = h.prototype = Object.create(y));
          function b(t) {
            ["next", "throw", "return"].forEach(function (e) {
              u(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function w(t, e) {
            function o(n, i, a, c) {
              var u = l(t[n], t, i);
              if ("throw" !== u.type) {
                var s = u.arg,
                  f = s.value;
                return f && "object" == Rt(f) && r.call(f, "__await")
                  ? e.resolve(f.__await).then(
                      function (t) {
                        o("next", t, a, c);
                      },
                      function (t) {
                        o("throw", t, a, c);
                      }
                    )
                  : e.resolve(f).then(
                      function (t) {
                        (s.value = t), a(s);
                      },
                      function (t) {
                        return o("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            n(this, "_invoke", {
              value: function (t, r) {
                function n() {
                  return new e(function (e, n) {
                    o(t, r, e, n);
                  });
                }
                return (i = i ? i.then(n, n) : n());
              },
            });
          }
          function E(t, e, r) {
            var n = "suspendedStart";
            return function (o, i) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === o) throw i;
                return { value: void 0, done: !0 };
              }
              for (r.method = o, r.arg = i; ; ) {
                var a = r.delegate;
                if (a) {
                  var c = x(a, r);
                  if (c) {
                    if (c === f) continue;
                    return c;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var u = l(t, e, r);
                if ("normal" === u.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), u.arg === f)
                  )
                    continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          }
          function x(t, e) {
            var r = e.method,
              n = t.iterator[r];
            if (void 0 === n)
              return (
                (e.delegate = null),
                ("throw" === r &&
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = void 0),
                  x(t, e),
                  "throw" === e.method)) ||
                  ("return" !== r &&
                    ((e.method = "throw"),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                f
              );
            var o = l(n, t.iterator, e.arg);
            if ("throw" === o.type)
              return (
                (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), f
              );
            var i = o.arg;
            return i
              ? i.done
                ? ((e[t.resultName] = i.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method &&
                    ((e.method = "next"), (e.arg = void 0)),
                  (e.delegate = null),
                  f)
                : i
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                f);
          }
          function S(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function k(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function O(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(S, this),
              this.reset(!0);
          }
          function j(t) {
            if (t) {
              var e = t[i];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  o = function e() {
                    for (; ++n < t.length; )
                      if (r.call(t, n))
                        return (e.value = t[n]), (e.done = !1), e;
                    return (e.value = void 0), (e.done = !0), e;
                  };
                return (o.next = o);
              }
            }
            return { next: I };
          }
          function I() {
            return { value: void 0, done: !0 };
          }
          return (
            (p.prototype = d),
            n(g, "constructor", { value: d, configurable: !0 }),
            n(d, "constructor", { value: p, configurable: !0 }),
            (p.displayName = u(d, c, "GeneratorFunction")),
            (t.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === p || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, d)
                  : ((t.__proto__ = d), u(t, c, "GeneratorFunction")),
                (t.prototype = Object.create(g)),
                t
              );
            }),
            (t.awrap = function (t) {
              return { __await: t };
            }),
            b(w.prototype),
            u(w.prototype, a, function () {
              return this;
            }),
            (t.AsyncIterator = w),
            (t.async = function (e, r, n, o, i) {
              void 0 === i && (i = Promise);
              var a = new w(s(e, r, n, o), i);
              return t.isGeneratorFunction(r)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            b(g),
            u(g, c, "Generator"),
            u(g, i, function () {
              return this;
            }),
            u(g, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (t) {
              var e = Object(t),
                r = [];
              for (var n in e) r.push(n);
              return (
                r.reverse(),
                function t() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in e) return (t.value = n), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (t.values = j),
            (O.prototype = {
              constructor: O,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = void 0),
                  this.tryEntries.forEach(k),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      r.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = void 0);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function n(r, n) {
                  return (
                    (a.type = "throw"),
                    (a.arg = t),
                    (e.next = r),
                    n && ((e.method = "next"), (e.arg = void 0)),
                    !!n
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var i = this.tryEntries[o],
                    a = i.completion;
                  if ("root" === i.tryLoc) return n("end");
                  if (i.tryLoc <= this.prev) {
                    var c = r.call(i, "catchLoc"),
                      u = r.call(i, "finallyLoc");
                    if (c && u) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    } else if (c) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                    } else {
                      if (!u)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), f)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  f
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), k(r), f;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var o = n.arg;
                      k(r);
                    }
                    return o;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, e, r) {
                return (
                  (this.delegate = {
                    iterator: j(t),
                    resultName: e,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = void 0),
                  f
                );
              },
            }),
            t
          );
        }
        function Dt(t, e, r, n, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void r(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(n, o);
        }
        function Jt(t) {
          return function () {
            var e = this,
              r = arguments;
            return new Promise(function (n, o) {
              var i = t.apply(e, r);
              function a(t) {
                Dt(i, n, o, a, c, "next", t);
              }
              function c(t) {
                Dt(i, n, o, a, c, "throw", t);
              }
              a(void 0);
            });
          };
        }
        var $t = "near-social-vm:v01:",
          zt = $t + ":accountId:",
          Kt = $t + ":pretendAccountId:",
          Xt = {
            loading: !0,
            signedAccountId:
              null !== (Pt = Ft().get(zt)) && void 0 !== Pt ? Pt : void 0,
            pretendAccountId:
              null !== (Ct = Ft().get(Kt)) && void 0 !== Ct ? Ct : void 0,
            accountId:
              null !==
                (Bt =
                  null !== (Ut = Ft().get(Kt)) && void 0 !== Ut
                    ? Ut
                    : Ft().get(zt)) && void 0 !== Bt
                ? Bt
                : void 0,
            state: null,
            near: null,
          };
        function Yt(t, e) {
          return Vt.apply(this, arguments);
        }
        function Vt() {
          return (Vt = Jt(
            Gt().mark(function t(e, r) {
              var n, o, i, c, u, s, l, f, h, p, d;
              return Gt().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (
                        ((e.connectedContractId =
                          null === (n = r) ||
                          void 0 === n ||
                          null === (o = n.contract) ||
                          void 0 === o
                            ? void 0
                            : o.contractId),
                        !e.connectedContractId ||
                          e.connectedContractId === e.config.contractName)
                      ) {
                        t.next = 12;
                        break;
                      }
                      return (t.next = 4), e.selector;
                    case 4:
                      return (l = t.sent), (t.next = 7), l.wallet();
                    case 7:
                      return (f = t.sent), (t.next = 10), f.signOut();
                    case 10:
                      (e.connectedContractId = null), (r = l.store.getState());
                    case 12:
                      if (
                        ((e.accountId =
                          null !==
                            (i =
                              null === (c = r) ||
                              void 0 === c ||
                              null === (u = c.accounts) ||
                              void 0 === u ||
                              null === (s = u[0]) ||
                              void 0 === s
                                ? void 0
                                : s.accountId) && void 0 !== i
                            ? i
                            : null),
                        e.accountId)
                      ) {
                        e.publicKey = null;
                        try {
                          "here-wallet" ===
                            (null === (h = r) || void 0 === h
                              ? void 0
                              : h.selectedWalletId) &&
                            ((p = Ft().get("herewallet:keystore")),
                            (e.publicKey = a.KeyPair.fromString(
                              p[e.config.networkId].accounts[e.accountId]
                            ).getPublicKey()));
                        } catch (t) {
                          console.error(t);
                        }
                        if (!e.publicKey)
                          try {
                            e.publicKey = a.KeyPair.fromString(
                              Ft().get(
                                "meteor-wallet" ===
                                  (null === (d = r) || void 0 === d
                                    ? void 0
                                    : d.selectedWalletId)
                                  ? "_meteor_wallet"
                                      .concat(e.accountId, ":")
                                      .concat(e.config.networkId)
                                  : "near-api-js:keystore:"
                                      .concat(e.accountId, ":")
                                      .concat(e.config.networkId)
                              )
                            ).getPublicKey();
                          } catch (t) {
                            console.error(t);
                          }
                      }
                    case 14:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )).apply(this, arguments);
        }
        var Ht = (function () {
            var t = Jt(
              Gt().mark(function t(e, r) {
                var n, o, i, a, c, u, s, l;
                return Gt().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (
                          ((o = e.accountId)
                            ? Ft().set(zt, o)
                            : Ft().remove(zt),
                          (i =
                            null !== (n = Ft().get(Kt)) && void 0 !== n
                              ? n
                              : void 0),
                          (a = {
                            loading: !1,
                            signedAccountId: o,
                            pretendAccountId: i,
                            accountId: null != i ? i : o,
                            state: null,
                            near: e,
                            refresh: (function () {
                              var t = Jt(
                                Gt().mark(function t() {
                                  return Gt().wrap(function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          return (t.next = 2), Ht(e, r);
                                        case 2:
                                          return t.abrupt("return", t.sent);
                                        case 3:
                                        case "end":
                                          return t.stop();
                                      }
                                  }, t);
                                })
                              );
                              return function () {
                                return t.apply(this, arguments);
                              };
                            })(),
                            startPretending: (function () {
                              var t = Jt(
                                Gt().mark(function t(n) {
                                  return Gt().wrap(function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          return (
                                            n
                                              ? Ft().set(Kt, n)
                                              : Ft().remove(Kt),
                                            (t.next = 3),
                                            Ht(e, r)
                                          );
                                        case 3:
                                        case "end":
                                          return t.stop();
                                      }
                                  }, t);
                                })
                              );
                              return function (e) {
                                return t.apply(this, arguments);
                              };
                            })(),
                          }),
                          !o)
                        ) {
                          t.next = 13;
                          break;
                        }
                        return (
                          (t.next = 7),
                          Promise.all([
                            e.contract.storage_balance_of({ account_id: o }),
                            e.accountState(o),
                          ])
                        );
                      case 7:
                        (c = t.sent),
                          (u = Mt(c, 2)),
                          (s = u[0]),
                          (l = u[1]),
                          (a.storageBalance = s),
                          (a.state = l);
                      case 13:
                        r(a);
                      case 14:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })(),
          Wt = (0, i.singletonHook)(Xt, function () {
            var t = Mt((0, e.useState)(Xt), 2),
              r = t[0],
              n = t[1],
              o = _t();
            return (
              (0, e.useEffect)(
                function () {
                  o &&
                    o.selector.then(function (t) {
                      t.store.observable.subscribe(
                        (function () {
                          var t = Jt(
                            Gt().mark(function t(e) {
                              return Gt().wrap(
                                function (t) {
                                  for (;;)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        return (t.next = 2), Yt(o, e);
                                      case 2:
                                        return (
                                          (t.prev = 2), (t.next = 5), Ht(o, n)
                                        );
                                      case 5:
                                        t.next = 10;
                                        break;
                                      case 7:
                                        (t.prev = 7),
                                          (t.t0 = t.catch(2)),
                                          console.error(t.t0);
                                      case 10:
                                      case "end":
                                        return t.stop();
                                    }
                                },
                                t,
                                null,
                                [[2, 7]]
                              );
                            })
                          );
                          return function (e) {
                            return t.apply(this, arguments);
                          };
                        })()
                      );
                    });
                },
                [o]
              ),
              r
            );
          }),
          Zt = function () {
            return Wt().accountId;
          };
        const Qt = require("acorn"),
          te = require("acorn-jsx");
        var ee = n.n(te);
        const re = require("react-bootstrap/Modal");
        var ne = n.n(re);
        const oe = require("remark-gfm");
        var ie = n.n(oe);
        const ae = require("react-markdown");
        var ce = n.n(ae);
        const ue = require("react-syntax-highlighter"),
          se = require("react-syntax-highlighter/dist/esm/styles/prism"),
          le = require("mdast-util-find-and-replace");
        var fe =
          /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
        function he() {
          function t(t, e, r) {
            if (
              /[\w`]/.test(r.input.charAt(r.index - 1)) ||
              /[/\w`]/.test(r.input.charAt(r.index + t.length)) ||
              e.length < 2 ||
              e.length > 64
            )
              return !1;
            var n = { type: "text", value: t };
            return {
              type: "strong",
              children: [n],
              data: { hProperties: { accountId: e } },
            };
          }
          return function (e) {
            return (0, le.findAndReplace)(e, fe, t), e;
          };
        }
        var pe = /#(\w+)/gi;
        function de() {
          function t(t, e, r) {
            if (
              /[\w`]/.test(r.input.charAt(r.index - 1)) ||
              /[/\w`]/.test(r.input.charAt(r.index + t.length))
            )
              return !1;
            var n = { type: "text", value: t };
            return {
              type: "strong",
              children: [n],
              data: { hProperties: { hashtag: e } },
            };
          }
          return function (e) {
            return (0, le.findAndReplace)(e, pe, t), e;
          };
        }
        var ye = [
            "onLinkClick",
            "text",
            "onMention",
            "onHashtag",
            "syntaxHighlighterProps",
          ],
          ve = ["node", "children"],
          me = ["node"],
          ge = ["node"],
          be = ["node"],
          we = ["node"],
          Ee = ["node", "inline", "className", "children"];
        function xe() {
          return (
            (xe = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var r = arguments[e];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) &&
                        (t[n] = r[n]);
                  }
                  return t;
                }),
            xe.apply(this, arguments)
          );
        }
        function Se(t, e) {
          if (null == t) return {};
          var r,
            n,
            o = (function (t, e) {
              if (null == t) return {};
              var r,
                n,
                o = {},
                i = Object.keys(t);
              for (n = 0; n < i.length; n++)
                (r = i[n]), e.indexOf(r) >= 0 || (o[r] = t[r]);
              return o;
            })(t, e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(t);
            for (n = 0; n < i.length; n++)
              (r = i[n]),
                e.indexOf(r) >= 0 ||
                  (Object.prototype.propertyIsEnumerable.call(t, r) &&
                    (o[r] = t[r]));
          }
          return o;
        }
        var ke = function (t) {
          var e = t.onLinkClick,
            n = t.text,
            o = t.onMention,
            i = t.onHashtag,
            a = t.syntaxHighlighterProps,
            c = Se(t, ye);
          return r().createElement(
            ce(),
            xe({}, c, {
              plugins: [],
              rehypePlugins: [],
              remarkPlugins: [ie(), he, de],
              children: n,
              components: {
                strong: function (t) {
                  var e,
                    n,
                    a,
                    c,
                    u = t.node,
                    s = t.children,
                    l = Se(t, ve);
                  return o &&
                    null !== (e = u.properties) &&
                    void 0 !== e &&
                    e.accountId
                    ? o(
                        null === (a = u.properties) || void 0 === a
                          ? void 0
                          : a.accountId
                      )
                    : i &&
                      null !== (n = u.properties) &&
                      void 0 !== n &&
                      n.hashtag
                    ? i(
                        null === (c = u.properties) || void 0 === c
                          ? void 0
                          : c.hashtag
                      )
                    : r().createElement("strong", l, s);
                },
                a: function (t) {
                  t.node;
                  var n = Se(t, me);
                  return e
                    ? r().createElement("a", xe({ onClick: e }, n))
                    : r().createElement("a", xe({ target: "_blank" }, n));
                },
                img: function (t) {
                  t.node;
                  var e = Se(t, ge);
                  return r().createElement(
                    "img",
                    xe({ className: "img-fluid" }, e)
                  );
                },
                blockquote: function (t) {
                  t.node;
                  var e = Se(t, be);
                  return r().createElement(
                    "blockquote",
                    xe({ className: "blockquote" }, e)
                  );
                },
                table: function (t) {
                  t.node;
                  var e = Se(t, we);
                  return r().createElement(
                    "table",
                    xe({ className: "table table-striped" }, e)
                  );
                },
                code: function (t) {
                  t.node;
                  var e = t.inline,
                    n = t.className,
                    o = t.children,
                    i = Se(t, Ee),
                    c = /language-(\w+)/.exec(n || ""),
                    u = null != a ? a : {},
                    s = u.wrapLines,
                    l = u.lineProps,
                    f = u.showLineNumbers,
                    h = u.lineNumberStyle;
                  return !e && c
                    ? r().createElement(
                        ue.Prism,
                        xe(
                          {
                            children: String(o).replace(/\n$/, ""),
                            style: se.tomorrow,
                            language: c[1],
                            PreTag: "div",
                            wrapLines: s,
                            lineProps: l,
                            showLineNumbers: f,
                            lineNumberStyle: h,
                          },
                          i
                        )
                      )
                    : r().createElement("code", xe({ className: n }, i), o);
                },
              },
            })
          );
        };
        const Oe = require("react-uuid");
        var je = n.n(Oe);
        function Ie(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        var Le = function (t) {
          var e = JSON.stringify(t, null, 2);
          return "```json\n".concat(e, "\n```");
        };
        function Ne(t) {
          var n,
            o,
            i = (0, e.useState)(je()()),
            a = _t(),
            c =
              ((n = (0, e.useState)(!1)),
              (o = 2),
              (function (t) {
                if (Array.isArray(t)) return t;
              })(n) ||
                (function (t, e) {
                  var r =
                    null == t
                      ? null
                      : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                        t["@@iterator"];
                  if (null != r) {
                    var n,
                      o,
                      i,
                      a,
                      c = [],
                      u = !0,
                      s = !1;
                    try {
                      if (((i = (r = r.call(t)).next), 0 === e)) {
                        if (Object(r) !== r) return;
                        u = !1;
                      } else
                        for (
                          ;
                          !(u = (n = i.call(r)).done) &&
                          (c.push(n.value), c.length !== e);
                          u = !0
                        );
                    } catch (t) {
                      (s = !0), (o = t);
                    } finally {
                      try {
                        if (
                          !u &&
                          null != r.return &&
                          ((a = r.return()), Object(a) !== a)
                        )
                          return;
                      } finally {
                        if (s) throw o;
                      }
                    }
                    return c;
                  }
                })(n, o) ||
                (function (t, e) {
                  if (t) {
                    if ("string" == typeof t) return Ie(t, e);
                    var r = Object.prototype.toString.call(t).slice(8, -1);
                    return (
                      "Object" === r &&
                        t.constructor &&
                        (r = t.constructor.name),
                      "Map" === r || "Set" === r
                        ? Array.from(t)
                        : "Arguments" === r ||
                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        ? Ie(t, e)
                        : void 0
                    );
                  }
                })(n, o) ||
                (function () {
                  throw new TypeError(
                    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                  );
                })()),
            u = c[0],
            s = c[1],
            l = t.onHide,
            f = t.transactions,
            h = !!f;
          return r().createElement(
            ne(),
            { size: "xl", centered: !0, scrollable: !0, show: h, onHide: l },
            r().createElement(
              ne().Header,
              { closeButton: !0 },
              r().createElement(ne().Title, null, "Confirm Transaction")
            ),
            r().createElement(
              ne().Body,
              null,
              f &&
                f.map(function (t, e) {
                  return r().createElement(
                    "div",
                    { key: "".concat(i, "-").concat(e) },
                    r().createElement(
                      "div",
                      null,
                      r().createElement("h4", null, "Transaction #", e + 1)
                    ),
                    r().createElement(
                      "div",
                      null,
                      r().createElement(
                        "span",
                        { className: "text-secondary" },
                        "Contract ID: "
                      ),
                      r().createElement(
                        "span",
                        { className: "font-monospace" },
                        t.contractName
                      )
                    ),
                    r().createElement(
                      "div",
                      null,
                      r().createElement(
                        "span",
                        { className: "text-secondary" },
                        "Method name: "
                      ),
                      r().createElement(
                        "span",
                        { className: "font-monospace" },
                        t.methodName
                      )
                    ),
                    t.deposit &&
                      t.deposit.gt(0) &&
                      r().createElement(
                        "div",
                        null,
                        r().createElement(
                          "span",
                          { className: "text-secondary" },
                          "Deposit: "
                        ),
                        r().createElement(
                          "span",
                          { className: "font-monospace" },
                          F(t.deposit)
                        )
                      ),
                    r().createElement(
                      "div",
                      null,
                      r().createElement(
                        "span",
                        { className: "text-secondary" },
                        "Gas: "
                      ),
                      r().createElement(
                        "span",
                        { className: "font-monospace" },
                        R(t.gas)
                      )
                    ),
                    r().createElement(ke, { text: Le(t.args) })
                  );
                })
            ),
            r().createElement(
              ne().Footer,
              null,
              r().createElement(
                "button",
                {
                  className: "btn btn-success",
                  disabled: u,
                  onClick: function (t) {
                    t.preventDefault(),
                      s(!0),
                      a.sendTransactions(f).then(function () {
                        s(!1), l();
                      });
                  },
                },
                u && I,
                " Confirm"
              ),
              r().createElement(
                "button",
                { className: "btn btn-secondary", onClick: l, disabled: u },
                "Close"
              )
            )
          );
        }
        const Ae = require("react-files");
        var _e = n.n(Ae);
        const Te = require("@braintree/sanitize-url"),
          Pe = require("react-infinite-scroller");
        var Ce = n.n(Pe);
        function Be(t) {
          return (
            (Be =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            Be(t)
          );
        }
        function Ue(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function Fe() {
          Fe = function () {
            return t;
          };
          var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            n =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value;
              },
            o = "function" == typeof Symbol ? Symbol : {},
            i = o.iterator || "@@iterator",
            a = o.asyncIterator || "@@asyncIterator",
            c = o.toStringTag || "@@toStringTag";
          function u(t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            u({}, "");
          } catch (t) {
            u = function (t, e, r) {
              return (t[e] = r);
            };
          }
          function s(t, e, r, o) {
            var i = e && e.prototype instanceof h ? e : h,
              a = Object.create(i.prototype),
              c = new O(o || []);
            return n(a, "_invoke", { value: E(t, r, c) }), a;
          }
          function l(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          t.wrap = s;
          var f = {};
          function h() {}
          function p() {}
          function d() {}
          var y = {};
          u(y, i, function () {
            return this;
          });
          var v = Object.getPrototypeOf,
            m = v && v(v(j([])));
          m && m !== e && r.call(m, i) && (y = m);
          var g = (d.prototype = h.prototype = Object.create(y));
          function b(t) {
            ["next", "throw", "return"].forEach(function (e) {
              u(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function w(t, e) {
            function o(n, i, a, c) {
              var u = l(t[n], t, i);
              if ("throw" !== u.type) {
                var s = u.arg,
                  f = s.value;
                return f && "object" == Be(f) && r.call(f, "__await")
                  ? e.resolve(f.__await).then(
                      function (t) {
                        o("next", t, a, c);
                      },
                      function (t) {
                        o("throw", t, a, c);
                      }
                    )
                  : e.resolve(f).then(
                      function (t) {
                        (s.value = t), a(s);
                      },
                      function (t) {
                        return o("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            n(this, "_invoke", {
              value: function (t, r) {
                function n() {
                  return new e(function (e, n) {
                    o(t, r, e, n);
                  });
                }
                return (i = i ? i.then(n, n) : n());
              },
            });
          }
          function E(t, e, r) {
            var n = "suspendedStart";
            return function (o, i) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === o) throw i;
                return { value: void 0, done: !0 };
              }
              for (r.method = o, r.arg = i; ; ) {
                var a = r.delegate;
                if (a) {
                  var c = x(a, r);
                  if (c) {
                    if (c === f) continue;
                    return c;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var u = l(t, e, r);
                if ("normal" === u.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), u.arg === f)
                  )
                    continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          }
          function x(t, e) {
            var r = e.method,
              n = t.iterator[r];
            if (void 0 === n)
              return (
                (e.delegate = null),
                ("throw" === r &&
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = void 0),
                  x(t, e),
                  "throw" === e.method)) ||
                  ("return" !== r &&
                    ((e.method = "throw"),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                f
              );
            var o = l(n, t.iterator, e.arg);
            if ("throw" === o.type)
              return (
                (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), f
              );
            var i = o.arg;
            return i
              ? i.done
                ? ((e[t.resultName] = i.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method &&
                    ((e.method = "next"), (e.arg = void 0)),
                  (e.delegate = null),
                  f)
                : i
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                f);
          }
          function S(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function k(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function O(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(S, this),
              this.reset(!0);
          }
          function j(t) {
            if (t) {
              var e = t[i];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  o = function e() {
                    for (; ++n < t.length; )
                      if (r.call(t, n))
                        return (e.value = t[n]), (e.done = !1), e;
                    return (e.value = void 0), (e.done = !0), e;
                  };
                return (o.next = o);
              }
            }
            return { next: I };
          }
          function I() {
            return { value: void 0, done: !0 };
          }
          return (
            (p.prototype = d),
            n(g, "constructor", { value: d, configurable: !0 }),
            n(d, "constructor", { value: p, configurable: !0 }),
            (p.displayName = u(d, c, "GeneratorFunction")),
            (t.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === p || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, d)
                  : ((t.__proto__ = d), u(t, c, "GeneratorFunction")),
                (t.prototype = Object.create(g)),
                t
              );
            }),
            (t.awrap = function (t) {
              return { __await: t };
            }),
            b(w.prototype),
            u(w.prototype, a, function () {
              return this;
            }),
            (t.AsyncIterator = w),
            (t.async = function (e, r, n, o, i) {
              void 0 === i && (i = Promise);
              var a = new w(s(e, r, n, o), i);
              return t.isGeneratorFunction(r)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            b(g),
            u(g, c, "Generator"),
            u(g, i, function () {
              return this;
            }),
            u(g, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (t) {
              var e = Object(t),
                r = [];
              for (var n in e) r.push(n);
              return (
                r.reverse(),
                function t() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in e) return (t.value = n), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (t.values = j),
            (O.prototype = {
              constructor: O,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = void 0),
                  this.tryEntries.forEach(k),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      r.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = void 0);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function n(r, n) {
                  return (
                    (a.type = "throw"),
                    (a.arg = t),
                    (e.next = r),
                    n && ((e.method = "next"), (e.arg = void 0)),
                    !!n
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var i = this.tryEntries[o],
                    a = i.completion;
                  if ("root" === i.tryLoc) return n("end");
                  if (i.tryLoc <= this.prev) {
                    var c = r.call(i, "catchLoc"),
                      u = r.call(i, "finallyLoc");
                    if (c && u) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    } else if (c) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                    } else {
                      if (!u)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), f)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  f
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), k(r), f;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var o = n.arg;
                      k(r);
                    }
                    return o;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, e, r) {
                return (
                  (this.delegate = {
                    iterator: j(t),
                    resultName: e,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = void 0),
                  f
                );
              },
            }),
            t
          );
        }
        function Re(t, e, r, n, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void r(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(n, o);
        }
        function Me(t) {
          return function () {
            var e = this,
              r = arguments;
            return new Promise(function (n, o) {
              var i = t.apply(e, r);
              function a(t) {
                Re(i, n, o, a, c, "next", t);
              }
              function c(t) {
                Re(i, n, o, a, c, "throw", t);
              }
              a(void 0);
            });
          };
        }
        var qe = E.mul(2e3),
          Ge = E.mul(500),
          De = E.mul(500),
          Je = E.mul(500),
          $e = (function () {
            var t = Me(
              Fe().mark(function t(e, r) {
                var n;
                return Fe().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (n = K(r)), (t.next = 3), e.contract.get({ keys: n })
                        );
                      case 3:
                        return t.abrupt("return", t.sent);
                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })(),
          ze = (function () {
            var t = Me(
              Fe().mark(function t(e, r, n, o) {
                var i, a, c, s, l, f, h, p, d, y;
                return Fe().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (t.next = 2), e.selector;
                      case 2:
                        if ((i = e.accountId)) {
                          t.next = 6;
                          break;
                        }
                        return (
                          alert(
                            "You're not logged in. Sign in to commit data."
                          ),
                          t.abrupt("return")
                        );
                      case 6:
                        return (
                          (t.next = 8),
                          Promise.all([
                            e.viewCall(
                              e.config.contractName,
                              "storage_balance_of",
                              { account_id: i }
                            ),
                            i !== r
                              ? e.viewCall(
                                  e.config.contractName,
                                  "is_write_permission_granted",
                                  { predecessor_id: i, key: r }
                                )
                              : e.publicKey
                              ? e.viewCall(
                                  e.config.contractName,
                                  "is_write_permission_granted",
                                  { public_key: e.publicKey.toString(), key: r }
                                )
                              : Promise.resolve(!1),
                          ])
                        );
                      case 8:
                        if (
                          ((a = t.sent),
                          (w = 2),
                          (c =
                            (function (t) {
                              if (Array.isArray(t)) return t;
                            })((b = a)) ||
                            (function (t, e) {
                              var r =
                                null == t
                                  ? null
                                  : ("undefined" != typeof Symbol &&
                                      t[Symbol.iterator]) ||
                                    t["@@iterator"];
                              if (null != r) {
                                var n,
                                  o,
                                  i,
                                  a,
                                  c = [],
                                  u = !0,
                                  s = !1;
                                try {
                                  if (((i = (r = r.call(t)).next), 0 === e)) {
                                    if (Object(r) !== r) return;
                                    u = !1;
                                  } else
                                    for (
                                      ;
                                      !(u = (n = i.call(r)).done) &&
                                      (c.push(n.value), c.length !== e);
                                      u = !0
                                    );
                                } catch (t) {
                                  (s = !0), (o = t);
                                } finally {
                                  try {
                                    if (
                                      !u &&
                                      null != r.return &&
                                      ((a = r.return()), Object(a) !== a)
                                    )
                                      return;
                                  } finally {
                                    if (s) throw o;
                                  }
                                }
                                return c;
                              }
                            })(b, w) ||
                            (function (t, e) {
                              if (t) {
                                if ("string" == typeof t) return Ue(t, e);
                                var r = Object.prototype.toString
                                  .call(t)
                                  .slice(8, -1);
                                return (
                                  "Object" === r &&
                                    t.constructor &&
                                    (r = t.constructor.name),
                                  "Map" === r || "Set" === r
                                    ? Array.from(t)
                                    : "Arguments" === r ||
                                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                        r
                                      )
                                    ? Ue(t, e)
                                    : void 0
                                );
                              }
                            })(b, w) ||
                            (function () {
                              throw new TypeError(
                                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                              );
                            })()),
                          (s = c[0]),
                          (l = c[1]),
                          (f = u()((null == s ? void 0 : s.available) || "0")),
                          (v = {}),
                          (m = r),
                          (g = V(n)),
                          (m = (function (t) {
                            var e = (function (t, e) {
                              if ("object" !== Be(t) || null === t) return t;
                              var r = t[Symbol.toPrimitive];
                              if (void 0 !== r) {
                                var n = r.call(t, "string");
                                if ("object" !== Be(n)) return n;
                                throw new TypeError(
                                  "@@toPrimitive must return a primitive value."
                                );
                              }
                              return String(t);
                            })(t);
                            return "symbol" === Be(e) ? e : String(e);
                          })(m)) in v
                            ? Object.defineProperty(v, m, {
                                value: g,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                              })
                            : (v[m] = g),
                          (h = v),
                          (p = {}),
                          o)
                        ) {
                          t.next = 20;
                          break;
                        }
                        return (t.next = 18), $e(e, h);
                      case 18:
                        (p = t.sent), (h = X(h, p));
                      case 20:
                        return (
                          (d = E.mul(z(h, p))
                            .add(s ? u()(0) : Ge)
                            .add(l ? u()(0) : Je)
                            .add(De)),
                          (y = B(d.sub(f), l ? u()(0) : s ? u()(1) : qe)),
                          t.abrupt("return", {
                            originalData: n,
                            accountId: r,
                            storageBalance: s,
                            availableStorage: f,
                            currentData: p,
                            data: h,
                            expectedDataBalance: d,
                            deposit: y,
                            permissionGranted: l,
                          })
                        );
                      case 23:
                      case "end":
                        return t.stop();
                    }
                  var v, m, g, b, w;
                }, t);
              })
            );
            return function (e, r, n, o) {
              return t.apply(this, arguments);
            };
          })(),
          Ke = (function () {
            var t = Me(
              Fe().mark(function t(e, r, n) {
                return Fe().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          console.log("Committing data", r),
                          (t.next = 3),
                          e.contract.set(
                            { data: r },
                            b.mul(100).toFixed(0),
                            n.toFixed(0)
                          )
                        );
                      case 3:
                        return t.abrupt("return", t.sent);
                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (e, r, n) {
              return t.apply(this, arguments);
            };
          })(),
          Xe = (function () {
            var t = Me(
              Fe().mark(function t(e, r, n) {
                var o, i;
                return Fe().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (t.next = 2), e.selector;
                      case 2:
                        return (t.next = 4), t.sent.wallet();
                      case 4:
                        return (
                          (o = t.sent),
                          (i = []),
                          e.publicKey &&
                            (i.push({
                              type: "FunctionCall",
                              params: {
                                methodName: "grant_write_permission",
                                args: {
                                  public_key: e.publicKey.toString(),
                                  keys: [e.accountId],
                                },
                                gas: b.mul(100).toFixed(0),
                                deposit: n.gt(0) ? n.toFixed(0) : "1",
                              },
                            }),
                            (n = u()(0))),
                          i.push({
                            type: "FunctionCall",
                            params: {
                              methodName: "set",
                              args: { data: r },
                              gas: b.mul(100).toFixed(0),
                              deposit: n.gt(0) ? n.toFixed(0) : "1",
                            },
                          }),
                          (t.next = 10),
                          o.signAndSendTransaction({
                            receiverId: e.config.contractName,
                            actions: i,
                          })
                        );
                      case 10:
                        return t.abrupt("return", t.sent);
                      case 11:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (e, r, n) {
              return t.apply(this, arguments);
            };
          })();
        const Ye = require("react-bootstrap"),
          Ve = require("idb");
        function He(t) {
          return (
            (He =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            He(t)
          );
        }
        function We(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function Ze() {
          Ze = function () {
            return t;
          };
          var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            n =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value;
              },
            o = "function" == typeof Symbol ? Symbol : {},
            i = o.iterator || "@@iterator",
            a = o.asyncIterator || "@@asyncIterator",
            c = o.toStringTag || "@@toStringTag";
          function u(t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            u({}, "");
          } catch (t) {
            u = function (t, e, r) {
              return (t[e] = r);
            };
          }
          function s(t, e, r, o) {
            var i = e && e.prototype instanceof h ? e : h,
              a = Object.create(i.prototype),
              c = new O(o || []);
            return n(a, "_invoke", { value: E(t, r, c) }), a;
          }
          function l(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          t.wrap = s;
          var f = {};
          function h() {}
          function p() {}
          function d() {}
          var y = {};
          u(y, i, function () {
            return this;
          });
          var v = Object.getPrototypeOf,
            m = v && v(v(j([])));
          m && m !== e && r.call(m, i) && (y = m);
          var g = (d.prototype = h.prototype = Object.create(y));
          function b(t) {
            ["next", "throw", "return"].forEach(function (e) {
              u(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function w(t, e) {
            function o(n, i, a, c) {
              var u = l(t[n], t, i);
              if ("throw" !== u.type) {
                var s = u.arg,
                  f = s.value;
                return f && "object" == He(f) && r.call(f, "__await")
                  ? e.resolve(f.__await).then(
                      function (t) {
                        o("next", t, a, c);
                      },
                      function (t) {
                        o("throw", t, a, c);
                      }
                    )
                  : e.resolve(f).then(
                      function (t) {
                        (s.value = t), a(s);
                      },
                      function (t) {
                        return o("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            n(this, "_invoke", {
              value: function (t, r) {
                function n() {
                  return new e(function (e, n) {
                    o(t, r, e, n);
                  });
                }
                return (i = i ? i.then(n, n) : n());
              },
            });
          }
          function E(t, e, r) {
            var n = "suspendedStart";
            return function (o, i) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === o) throw i;
                return { value: void 0, done: !0 };
              }
              for (r.method = o, r.arg = i; ; ) {
                var a = r.delegate;
                if (a) {
                  var c = x(a, r);
                  if (c) {
                    if (c === f) continue;
                    return c;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var u = l(t, e, r);
                if ("normal" === u.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), u.arg === f)
                  )
                    continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          }
          function x(t, e) {
            var r = e.method,
              n = t.iterator[r];
            if (void 0 === n)
              return (
                (e.delegate = null),
                ("throw" === r &&
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = void 0),
                  x(t, e),
                  "throw" === e.method)) ||
                  ("return" !== r &&
                    ((e.method = "throw"),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                f
              );
            var o = l(n, t.iterator, e.arg);
            if ("throw" === o.type)
              return (
                (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), f
              );
            var i = o.arg;
            return i
              ? i.done
                ? ((e[t.resultName] = i.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method &&
                    ((e.method = "next"), (e.arg = void 0)),
                  (e.delegate = null),
                  f)
                : i
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                f);
          }
          function S(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function k(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function O(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(S, this),
              this.reset(!0);
          }
          function j(t) {
            if (t) {
              var e = t[i];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  o = function e() {
                    for (; ++n < t.length; )
                      if (r.call(t, n))
                        return (e.value = t[n]), (e.done = !1), e;
                    return (e.value = void 0), (e.done = !0), e;
                  };
                return (o.next = o);
              }
            }
            return { next: I };
          }
          function I() {
            return { value: void 0, done: !0 };
          }
          return (
            (p.prototype = d),
            n(g, "constructor", { value: d, configurable: !0 }),
            n(d, "constructor", { value: p, configurable: !0 }),
            (p.displayName = u(d, c, "GeneratorFunction")),
            (t.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === p || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, d)
                  : ((t.__proto__ = d), u(t, c, "GeneratorFunction")),
                (t.prototype = Object.create(g)),
                t
              );
            }),
            (t.awrap = function (t) {
              return { __await: t };
            }),
            b(w.prototype),
            u(w.prototype, a, function () {
              return this;
            }),
            (t.AsyncIterator = w),
            (t.async = function (e, r, n, o, i) {
              void 0 === i && (i = Promise);
              var a = new w(s(e, r, n, o), i);
              return t.isGeneratorFunction(r)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            b(g),
            u(g, c, "Generator"),
            u(g, i, function () {
              return this;
            }),
            u(g, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (t) {
              var e = Object(t),
                r = [];
              for (var n in e) r.push(n);
              return (
                r.reverse(),
                function t() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in e) return (t.value = n), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (t.values = j),
            (O.prototype = {
              constructor: O,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = void 0),
                  this.tryEntries.forEach(k),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      r.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = void 0);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function n(r, n) {
                  return (
                    (a.type = "throw"),
                    (a.arg = t),
                    (e.next = r),
                    n && ((e.method = "next"), (e.arg = void 0)),
                    !!n
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var i = this.tryEntries[o],
                    a = i.completion;
                  if ("root" === i.tryLoc) return n("end");
                  if (i.tryLoc <= this.prev) {
                    var c = r.call(i, "catchLoc"),
                      u = r.call(i, "finallyLoc");
                    if (c && u) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    } else if (c) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                    } else {
                      if (!u)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), f)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  f
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), k(r), f;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var o = n.arg;
                      k(r);
                    }
                    return o;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, e, r) {
                return (
                  (this.delegate = {
                    iterator: j(t),
                    resultName: e,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = void 0),
                  f
                );
              },
            }),
            t
          );
        }
        function Qe(t, e, r, n, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void r(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(n, o);
        }
        function tr(t) {
          return function () {
            var e = this,
              r = arguments;
            return new Promise(function (n, o) {
              var i = t.apply(e, r);
              function a(t) {
                Qe(i, n, o, a, c, "next", t);
              }
              function c(t) {
                Qe(i, n, o, a, c, "throw", t);
              }
              a(void 0);
            });
          };
        }
        function er(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(
                t,
                (void 0,
                (o = (function (t, e) {
                  if ("object" !== He(t) || null === t) return t;
                  var r = t[Symbol.toPrimitive];
                  if (void 0 !== r) {
                    var n = r.call(t, "string");
                    if ("object" !== He(n)) return n;
                    throw new TypeError(
                      "@@toPrimitive must return a primitive value."
                    );
                  }
                  return String(t);
                })(n.key)),
                "symbol" === He(o) ? o : String(o)),
                n
              );
          }
          var o;
        }
        var rr = "ViewCall",
          nr = "Fetch",
          or = "LocalStorage",
          ir = "NotStarted",
          ar = "InProgress",
          cr = "Done",
          ur = "Invalidated",
          sr = "cacheDb",
          lr = "cache-v1",
          fr = (function () {
            function t() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 3e3;
              !(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
                (this.dbPromise = (0, Ve.openDB)(sr, 1, {
                  upgrade: function (t) {
                    t.createObjectStore(lr);
                  },
                })),
                (this.cache = {}),
                (this.finalSynchronizationDelayMs = e);
            }
            var e, r, n, o, i;
            return (
              (e = t),
              (r = [
                {
                  key: "invalidateCallbacks",
                  value: function (t, e) {
                    var r;
                    if (
                      null !== (r = t.invalidationCallbacks) &&
                      void 0 !== r &&
                      r.length
                    ) {
                      var n = t.invalidationCallbacks;
                      (t.invalidationCallbacks = []),
                        setTimeout(
                          function () {
                            n.forEach(function (t) {
                              try {
                                t();
                              } catch (t) {}
                            });
                          },
                          e ? this.finalSynchronizationDelayMs + 50 : 50
                        );
                    }
                  },
                },
                {
                  key: "innerGet",
                  value:
                    ((i = tr(
                      Ze().mark(function t(e) {
                        return Ze().wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (t.next = 2), this.dbPromise;
                                case 2:
                                  return t.abrupt("return", t.sent.get(lr, e));
                                case 3:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          this
                        );
                      })
                    )),
                    function (t) {
                      return i.apply(this, arguments);
                    }),
                },
                {
                  key: "innerSet",
                  value:
                    ((o = tr(
                      Ze().mark(function t(e, r) {
                        return Ze().wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (t.next = 2), this.dbPromise;
                                case 2:
                                  return t.abrupt(
                                    "return",
                                    t.sent.put(lr, r, e)
                                  );
                                case 3:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          this
                        );
                      })
                    )),
                    function (t, e) {
                      return o.apply(this, arguments);
                    }),
                },
                {
                  key: "cachedPromise",
                  value: function (t, e, r, n) {
                    var o = this;
                    t = JSON.stringify(t);
                    var i = this.cache[t] || {
                      status: ir,
                      invalidationCallbacks: [],
                      result: null,
                      time: new Date().getTime(),
                    };
                    return (
                      (this.cache[t] = i),
                      _(r) || (r = { onInvalidate: r }),
                      r.onInvalidate &&
                        i.invalidationCallbacks.push(r.onInvalidate),
                      !i.subscription &&
                        r.subscribe &&
                        (function t() {
                          i.subscription = setTimeout(function () {
                            document.hidden
                              ? t()
                              : ((i.subscription = null),
                                (i.status = ur),
                                o.invalidateCallbacks(i, !1));
                          }, 5e3);
                        })(),
                      i.status === ar ||
                        (i.status === cr &&
                          i.time + 3e5 > new Date().getTime()) ||
                        (i.status === ir &&
                          this.innerGet(t).then(function (t) {
                            (t || n) &&
                              i.status === ar &&
                              ((i.result = t),
                              (i.time = new Date().getTime()),
                              o.invalidateCallbacks(i, !1));
                          }),
                        (i.status = ar),
                        e &&
                          e()
                            .then(function (e) {
                              (i.status = cr),
                                (i.time = new Date().getTime()),
                                JSON.stringify(e) !==
                                  JSON.stringify(i.result) &&
                                  ((i.result = e),
                                  o.innerSet(t, e),
                                  o.invalidateCallbacks(i, !1));
                            })
                            .catch(function (e) {
                              console.error(e), (i.status = cr);
                              var r = void 0;
                              (i.time = new Date().getTime()),
                                JSON.stringify(r) !==
                                  JSON.stringify(i.result) &&
                                  ((i.result = r),
                                  o.innerSet(t, r),
                                  o.invalidateCallbacks(i, !1));
                            })),
                      i.result
                    );
                  },
                },
                {
                  key: "invalidateCache",
                  value: function (t, e) {
                    var r = this,
                      n = [],
                      o = "".concat(t.config.apiUrl, "/index");
                    Object.keys(this.cache).forEach(function (r) {
                      var i;
                      try {
                        i = JSON.parse(r);
                      } catch (t) {
                        return void console.error(
                          "Key deserialization failed",
                          r
                        );
                      }
                      if (
                        i.action === rr &&
                        i.contractId === t.config.contractName &&
                        (!i.blockId ||
                          "optimistic" === i.blockId ||
                          "final" === i.blockId)
                      )
                        try {
                          var a;
                          (null === (a = i.args) || void 0 === a
                            ? void 0
                            : a.keys
                          ).some(function (t) {
                            return Z(i.methodName, t, e);
                          }) && n.push([r, "final" === i.blockId]);
                        } catch (t) {}
                      if (i.action === nr && i.url === o)
                        try {
                          var c,
                            u = JSON.parse(
                              null === (c = i.options) || void 0 === c
                                ? void 0
                                : c.body
                            ),
                            s = u.action,
                            l = u.key;
                          s && l && Q(s, l, e) && n.push([r, !0]);
                        } catch (t) {}
                    }),
                      console.log("Cache invalidation", n),
                      n.forEach(function (t) {
                        var e,
                          n,
                          o =
                            ((n = 2),
                            (function (t) {
                              if (Array.isArray(t)) return t;
                            })((e = t)) ||
                              (function (t, e) {
                                var r =
                                  null == t
                                    ? null
                                    : ("undefined" != typeof Symbol &&
                                        t[Symbol.iterator]) ||
                                      t["@@iterator"];
                                if (null != r) {
                                  var n,
                                    o,
                                    i,
                                    a,
                                    c = [],
                                    u = !0,
                                    s = !1;
                                  try {
                                    if (((i = (r = r.call(t)).next), 0 === e)) {
                                      if (Object(r) !== r) return;
                                      u = !1;
                                    } else
                                      for (
                                        ;
                                        !(u = (n = i.call(r)).done) &&
                                        (c.push(n.value), c.length !== e);
                                        u = !0
                                      );
                                  } catch (t) {
                                    (s = !0), (o = t);
                                  } finally {
                                    try {
                                      if (
                                        !u &&
                                        null != r.return &&
                                        ((a = r.return()), Object(a) !== a)
                                      )
                                        return;
                                    } finally {
                                      if (s) throw o;
                                    }
                                  }
                                  return c;
                                }
                              })(e, n) ||
                              (function (t, e) {
                                if (t) {
                                  if ("string" == typeof t) return We(t, e);
                                  var r = Object.prototype.toString
                                    .call(t)
                                    .slice(8, -1);
                                  return (
                                    "Object" === r &&
                                      t.constructor &&
                                      (r = t.constructor.name),
                                    "Map" === r || "Set" === r
                                      ? Array.from(t)
                                      : "Arguments" === r ||
                                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                          r
                                        )
                                      ? We(t, e)
                                      : void 0
                                  );
                                }
                              })(e, n) ||
                              (function () {
                                throw new TypeError(
                                  "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                                );
                              })()),
                          i = o[0],
                          a = o[1],
                          c = r.cache[i];
                        (c.status = ur), r.invalidateCallbacks(c, a);
                      });
                  },
                },
                {
                  key: "cachedBlock",
                  value: function (t, e, r) {
                    return this.cachedPromise(
                      { action: "Block", blockId: e },
                      function () {
                        return t.block(e);
                      },
                      r
                    );
                  },
                },
                {
                  key: "cachedViewCall",
                  value: function (t, e, r, n, o, i) {
                    return this.cachedPromise(
                      {
                        action: rr,
                        contractId: e,
                        methodName: r,
                        args: n,
                        blockId: o,
                      },
                      function () {
                        return t.viewCall(e, r, n, o);
                      },
                      i
                    );
                  },
                },
                {
                  key: "asyncFetch",
                  value:
                    ((n = tr(
                      Ze().mark(function t(e, r) {
                        var n, o, i, a, c, u, s, l, f, h, p;
                        return Ze().wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (
                                    (u =
                                      null === (n = r) ||
                                      void 0 === n ||
                                      null === (o = n.responseType) ||
                                      void 0 === o
                                        ? void 0
                                        : o.toLowerCase()),
                                    (r = {
                                      method:
                                        null === (i = r) || void 0 === i
                                          ? void 0
                                          : i.method,
                                      headers:
                                        null === (a = r) || void 0 === a
                                          ? void 0
                                          : a.headers,
                                      body:
                                        null === (c = r) || void 0 === c
                                          ? void 0
                                          : c.body,
                                    }),
                                    (t.prev = 2),
                                    (t.next = 5),
                                    fetch(e, r)
                                  );
                                case 5:
                                  if (
                                    ((s = t.sent),
                                    (l = s.status),
                                    (f = s.ok),
                                    (h = s.headers.get("content-type")),
                                    !f)
                                  ) {
                                    t.next = 15;
                                    break;
                                  }
                                  return (
                                    (t.next = 12),
                                    "arraybuffer" === u
                                      ? s.arrayBuffer()
                                      : "blob" === u
                                      ? s.blob()
                                      : "formdata" === u
                                      ? s.formData()
                                      : "json" === u
                                      ? s.json()
                                      : "text" === u
                                      ? s.text()
                                      : h &&
                                        -1 !== h.indexOf("application/json")
                                      ? s.json()
                                      : s.text()
                                  );
                                case 12:
                                  (t.t0 = t.sent), (t.next = 16);
                                  break;
                                case 15:
                                  t.t0 = void 0;
                                case 16:
                                  return (
                                    (p = t.t0),
                                    t.abrupt("return", {
                                      ok: f,
                                      status: l,
                                      contentType: h,
                                      body: p,
                                    })
                                  );
                                case 20:
                                  return (
                                    (t.prev = 20),
                                    (t.t1 = t.catch(2)),
                                    t.abrupt("return", {
                                      ok: !1,
                                      error: t.t1.message,
                                    })
                                  );
                                case 23:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          null,
                          [[2, 20]]
                        );
                      })
                    )),
                    function (t, e) {
                      return n.apply(this, arguments);
                    }),
                },
                {
                  key: "cachedFetch",
                  value: function (t, e, r) {
                    var n = this;
                    return this.cachedPromise(
                      { action: nr, url: t, options: e },
                      function () {
                        return n.asyncFetch(t, e);
                      },
                      r
                    );
                  },
                },
                {
                  key: "cachedCustomPromise",
                  value: function (t, e, r) {
                    return this.cachedPromise(
                      { action: "CustomPromise", key: t },
                      function () {
                        return e();
                      },
                      r
                    );
                  },
                },
                {
                  key: "socialGet",
                  value: function (t, e, r, n, o, i) {
                    if (!t) return null;
                    var a = {
                        keys: (e = (e = Array.isArray(e) ? e : [e]).map(
                          function (t) {
                            return r ? "".concat(t, "/**") : "".concat(t);
                          }
                        )),
                        options: o,
                      },
                      c = this.cachedViewCall(
                        t,
                        t.config.contractName,
                        "get",
                        a,
                        n,
                        i
                      );
                    if (null === c) return null;
                    if (1 === e.length)
                      for (var u = e[0].split("/"), s = 0; s < u.length; s++) {
                        var l,
                          f = u[s];
                        if ("*" === f || "**" === f) break;
                        c = null === (l = c) || void 0 === l ? void 0 : l[f];
                      }
                    return c;
                  },
                },
                {
                  key: "socialIndex",
                  value: function (t, e, r, n, o) {
                    var i = this.cachedFetch(
                      "".concat(t.config.apiUrl, "/index"),
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ action: e, key: r, options: n }),
                      },
                      o
                    );
                    return null != i && i.ok ? i.body : null;
                  },
                },
                {
                  key: "localStorageGet",
                  value: function (t, e, r) {
                    return this.cachedPromise(
                      { action: or, domain: t, key: e },
                      void 0,
                      r,
                      !0
                    );
                  },
                },
                {
                  key: "asyncLocalStorageGet",
                  value: function (t, e) {
                    return (
                      (e = JSON.stringify({ action: or, domain: t, key: e })),
                      this.innerGet(e)
                    );
                  },
                },
                {
                  key: "localStorageSet",
                  value: function (t, e, r) {
                    e = JSON.stringify({ action: or, domain: t, key: e });
                    var n = this.cache[e] || {
                      status: ir,
                      invalidationCallbacks: [],
                      result: null,
                      time: new Date().getTime(),
                    };
                    (this.cache[e] = n),
                      (n.status = cr),
                      JSON.stringify(r) !== JSON.stringify(n.result) &&
                        ((n.result = r),
                        this.innerSet(e, r),
                        this.invalidateCallbacks(n, !1));
                  },
                },
              ]),
              r && er(e.prototype, r),
              Object.defineProperty(e, "prototype", { writable: !1 }),
              t
            );
          })(),
          hr = new fr(),
          pr = (0, i.singletonHook)(hr, function () {
            return hr;
          });
        function dr(t) {
          return (
            (dr =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            dr(t)
          );
        }
        var yr = [
          "data",
          "children",
          "onClick",
          "onCommit",
          "onCancel",
          "disabled",
          "widgetSrc",
          "force",
        ];
        function vr() {
          return (
            (vr = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var r = arguments[e];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) &&
                        (t[n] = r[n]);
                  }
                  return t;
                }),
            vr.apply(this, arguments)
          );
        }
        function mr() {
          mr = function () {
            return t;
          };
          var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            n =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value;
              },
            o = "function" == typeof Symbol ? Symbol : {},
            i = o.iterator || "@@iterator",
            a = o.asyncIterator || "@@asyncIterator",
            c = o.toStringTag || "@@toStringTag";
          function u(t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            u({}, "");
          } catch (t) {
            u = function (t, e, r) {
              return (t[e] = r);
            };
          }
          function s(t, e, r, o) {
            var i = e && e.prototype instanceof h ? e : h,
              a = Object.create(i.prototype),
              c = new O(o || []);
            return n(a, "_invoke", { value: E(t, r, c) }), a;
          }
          function l(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          t.wrap = s;
          var f = {};
          function h() {}
          function p() {}
          function d() {}
          var y = {};
          u(y, i, function () {
            return this;
          });
          var v = Object.getPrototypeOf,
            m = v && v(v(j([])));
          m && m !== e && r.call(m, i) && (y = m);
          var g = (d.prototype = h.prototype = Object.create(y));
          function b(t) {
            ["next", "throw", "return"].forEach(function (e) {
              u(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function w(t, e) {
            function o(n, i, a, c) {
              var u = l(t[n], t, i);
              if ("throw" !== u.type) {
                var s = u.arg,
                  f = s.value;
                return f && "object" == dr(f) && r.call(f, "__await")
                  ? e.resolve(f.__await).then(
                      function (t) {
                        o("next", t, a, c);
                      },
                      function (t) {
                        o("throw", t, a, c);
                      }
                    )
                  : e.resolve(f).then(
                      function (t) {
                        (s.value = t), a(s);
                      },
                      function (t) {
                        return o("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            n(this, "_invoke", {
              value: function (t, r) {
                function n() {
                  return new e(function (e, n) {
                    o(t, r, e, n);
                  });
                }
                return (i = i ? i.then(n, n) : n());
              },
            });
          }
          function E(t, e, r) {
            var n = "suspendedStart";
            return function (o, i) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === o) throw i;
                return { value: void 0, done: !0 };
              }
              for (r.method = o, r.arg = i; ; ) {
                var a = r.delegate;
                if (a) {
                  var c = x(a, r);
                  if (c) {
                    if (c === f) continue;
                    return c;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var u = l(t, e, r);
                if ("normal" === u.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), u.arg === f)
                  )
                    continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          }
          function x(t, e) {
            var r = e.method,
              n = t.iterator[r];
            if (void 0 === n)
              return (
                (e.delegate = null),
                ("throw" === r &&
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = void 0),
                  x(t, e),
                  "throw" === e.method)) ||
                  ("return" !== r &&
                    ((e.method = "throw"),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                f
              );
            var o = l(n, t.iterator, e.arg);
            if ("throw" === o.type)
              return (
                (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), f
              );
            var i = o.arg;
            return i
              ? i.done
                ? ((e[t.resultName] = i.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method &&
                    ((e.method = "next"), (e.arg = void 0)),
                  (e.delegate = null),
                  f)
                : i
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                f);
          }
          function S(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function k(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function O(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(S, this),
              this.reset(!0);
          }
          function j(t) {
            if (t) {
              var e = t[i];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  o = function e() {
                    for (; ++n < t.length; )
                      if (r.call(t, n))
                        return (e.value = t[n]), (e.done = !1), e;
                    return (e.value = void 0), (e.done = !0), e;
                  };
                return (o.next = o);
              }
            }
            return { next: I };
          }
          function I() {
            return { value: void 0, done: !0 };
          }
          return (
            (p.prototype = d),
            n(g, "constructor", { value: d, configurable: !0 }),
            n(d, "constructor", { value: p, configurable: !0 }),
            (p.displayName = u(d, c, "GeneratorFunction")),
            (t.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === p || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, d)
                  : ((t.__proto__ = d), u(t, c, "GeneratorFunction")),
                (t.prototype = Object.create(g)),
                t
              );
            }),
            (t.awrap = function (t) {
              return { __await: t };
            }),
            b(w.prototype),
            u(w.prototype, a, function () {
              return this;
            }),
            (t.AsyncIterator = w),
            (t.async = function (e, r, n, o, i) {
              void 0 === i && (i = Promise);
              var a = new w(s(e, r, n, o), i);
              return t.isGeneratorFunction(r)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            b(g),
            u(g, c, "Generator"),
            u(g, i, function () {
              return this;
            }),
            u(g, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (t) {
              var e = Object(t),
                r = [];
              for (var n in e) r.push(n);
              return (
                r.reverse(),
                function t() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in e) return (t.value = n), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (t.values = j),
            (O.prototype = {
              constructor: O,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = void 0),
                  this.tryEntries.forEach(k),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      r.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = void 0);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function n(r, n) {
                  return (
                    (a.type = "throw"),
                    (a.arg = t),
                    (e.next = r),
                    n && ((e.method = "next"), (e.arg = void 0)),
                    !!n
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var i = this.tryEntries[o],
                    a = i.completion;
                  if ("root" === i.tryLoc) return n("end");
                  if (i.tryLoc <= this.prev) {
                    var c = r.call(i, "catchLoc"),
                      u = r.call(i, "finallyLoc");
                    if (c && u) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    } else if (c) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                    } else {
                      if (!u)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), f)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  f
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), k(r), f;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var o = n.arg;
                      k(r);
                    }
                    return o;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, e, r) {
                return (
                  (this.delegate = {
                    iterator: j(t),
                    resultName: e,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = void 0),
                  f
                );
              },
            }),
            t
          );
        }
        function gr(t, e, r, n, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void r(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(n, o);
        }
        function br(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              var r =
                null == t
                  ? null
                  : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
              if (null != r) {
                var n,
                  o,
                  i,
                  a,
                  c = [],
                  u = !0,
                  s = !1;
                try {
                  if (((i = (r = r.call(t)).next), 0 === e)) {
                    if (Object(r) !== r) return;
                    u = !1;
                  } else
                    for (
                      ;
                      !(u = (n = i.call(r)).done) &&
                      (c.push(n.value), c.length !== e);
                      u = !0
                    );
                } catch (t) {
                  (s = !0), (o = t);
                } finally {
                  try {
                    if (
                      !u &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw o;
                  }
                }
                return c;
              }
            })(t, e) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return wr(t, e);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                return (
                  "Object" === r && t.constructor && (r = t.constructor.name),
                  "Map" === r || "Set" === r
                    ? Array.from(t)
                    : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? wr(t, e)
                    : void 0
                );
              }
            })(t, e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function wr(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        var Er = function (t) {
            var e = JSON.stringify(t, null, 2);
            return "```json\n".concat(e, "\n```");
          },
          xr = { page: "commit" },
          Sr = "write_permission",
          kr = function (t) {
            var n,
              o = _t(),
              i = Zt(),
              a = pr(),
              c = br((0, e.useState)(!1), 2),
              u = c[0],
              s = c[1],
              l = br((0, e.useState)(0), 2),
              f = l[0],
              h = l[1],
              p = br((0, e.useState)(!1), 2),
              d = p[0],
              y = p[1],
              v = br((0, e.useState)(null), 2),
              m = v[0],
              g = v[1],
              b = br((0, e.useState)(null), 2),
              w = b[0],
              x = b[1],
              S = br((0, e.useState)(null), 2),
              k = S[0],
              O = S[1],
              j = br((0, e.useState)(!0), 2),
              L = j[0],
              N = j[1],
              A = t.show,
              _ = t.onHide,
              T = function () {
                if (t.onCancel)
                  try {
                    t.onCancel();
                  } catch (t) {
                    console.error(t);
                  }
                _();
              },
              P = t.data,
              C = t.force,
              B = t.widgetSrc;
            (0, e.useEffect)(
              function () {
                B
                  ? (O(null),
                    a
                      .asyncLocalStorageGet(xr, {
                        widgetSrc: B,
                        accountId: i,
                        type: Sr,
                      })
                      .then(function (t) {
                        return O(t);
                      }))
                  : O(!1);
              },
              [B, i, a, A]
            ),
              (0, e.useEffect)(
                function () {
                  N(!1 !== k);
                },
                [k]
              ),
              (0, e.useEffect)(
                function () {
                  if (!d && A && i && o) {
                    var t = JSON.stringify(null != P ? P : null);
                    (C || t !== m) && (g(t), x(null), ze(o, i, P, C).then(x));
                  }
                },
                [d, P, m, C, o, i, A]
              );
            var U = (function () {
                var e,
                  r =
                    ((e = mr().mark(function e() {
                      var r, n;
                      return mr().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                (y(!0),
                                (r = L && et(k, w.data[i])),
                                a.localStorageSet(
                                  xr,
                                  { widgetSrc: B, accountId: i, type: Sr },
                                  r
                                ),
                                O(r),
                                (n = w.deposit.add(E.mul(f))),
                                !w.permissionGranted)
                              ) {
                                e.next = 10;
                                break;
                              }
                              return (e.next = 8), Ke(o, w.data, n);
                            case 8:
                              e.next = 16;
                              break;
                            case 10:
                              if (i !== o.accountId) {
                                e.next = 15;
                                break;
                              }
                              return (e.next = 13), Xe(o, w.data, n);
                            case 13:
                              e.next = 16;
                              break;
                            case 15:
                              alert(
                                "No permission to commit under given account"
                              );
                            case 16:
                              if ((x(null), g(null), t.onCommit))
                                try {
                                  t.onCommit(w.data);
                                } catch (t) {
                                  console.error(t);
                                }
                              a.invalidateCache(o, w.data), _(), y(!1);
                            case 22:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })),
                    function () {
                      var t = this,
                        r = arguments;
                      return new Promise(function (n, o) {
                        var i = e.apply(t, r);
                        function a(t) {
                          gr(i, n, o, a, c, "next", t);
                        }
                        function c(t) {
                          gr(i, n, o, a, c, "throw", t);
                        }
                        a(void 0);
                      });
                    });
                return function () {
                  return r.apply(this, arguments);
                };
              })(),
              R = w && !w.permissionGranted && i !== o.accountId;
            !d &&
              !R &&
              !u &&
              w &&
              A &&
              k &&
              w.data &&
              w.deposit.add(E.mul(f)).eq(0) &&
              w.permissionGranted &&
              JSON.stringify(et(k, w.data[i])) === JSON.stringify(k) &&
              (s(!0),
              U().then(function () {
                return s(!1);
              }));
            var M = !!w && A && !u && null !== k;
            return r().createElement(
              ne(),
              { size: "xl", centered: !0, scrollable: !0, show: M, onHide: T },
              r().createElement(
                ne().Header,
                { closeButton: !0 },
                r().createElement(ne().Title, null, "Saving data")
              ),
              r().createElement(
                ne().Body,
                null,
                R
                  ? r().createElement(
                      "div",
                      null,
                      r().createElement(
                        "h5",
                        null,
                        "Can't commit, because the account ",
                        o.accountId,
                        " doesn't have permission to write under pretended account ",
                        i
                      )
                    )
                  : w
                  ? r().createElement(
                      "div",
                      null,
                      r().createElement(
                        "div",
                        null,
                        w.data
                          ? r().createElement(ke, { text: Er(w.data) })
                          : r().createElement("h5", null, "No new data to save")
                      ),
                      w.data &&
                        (null == w || null === (n = w.deposit) || void 0 === n
                          ? void 0
                          : n.gt(0)) &&
                        r().createElement(
                          "div",
                          null,
                          r().createElement(
                            "h6",
                            null,
                            "Required storage deposit",
                            " ",
                            r().createElement(
                              "small",
                              { className: "text-secondary" },
                              "(can be recovered later)"
                            )
                          ),
                          r().createElement(
                            "div",
                            { className: "mb-2" },
                            w.deposit.div(E).toFixed(0),
                            " bytes =",
                            " ",
                            F(w.deposit)
                          ),
                          r().createElement(
                            "h6",
                            null,
                            "Optional storage deposit",
                            " ",
                            r().createElement(
                              "small",
                              { className: "text-secondary" },
                              "(can be used to avoid future wallet TX confirmation)"
                            )
                          ),
                          r().createElement(
                            "div",
                            null,
                            r().createElement(
                              Ye.ToggleButtonGroup,
                              {
                                type: "radio",
                                name: "storageDeposit",
                                value: f,
                                onChange: h,
                                disabled: d,
                              },
                              r().createElement(
                                Ye.ToggleButton,
                                {
                                  id: "esd-0",
                                  variant: "outline-success",
                                  value: 0,
                                },
                                "No Deposit"
                              ),
                              r().createElement(
                                Ye.ToggleButton,
                                {
                                  id: "esd-5000",
                                  variant: "outline-success",
                                  value: 5e3,
                                },
                                "0.05 NEAR (5Kb)"
                              ),
                              r().createElement(
                                Ye.ToggleButton,
                                {
                                  id: "esd-20000",
                                  variant: "outline-success",
                                  value: 2e4,
                                },
                                "0.2 NEAR (20Kb)"
                              ),
                              r().createElement(
                                Ye.ToggleButton,
                                {
                                  id: "esd-100000",
                                  variant: "outline-success",
                                  value: 1e5,
                                },
                                "1 NEAR (100Kb)"
                              )
                            )
                          )
                        ),
                      !R &&
                        B &&
                        w.data &&
                        r().createElement(
                          "div",
                          { className: "form-check form-switch" },
                          r().createElement("input", {
                            className: "form-check-input",
                            type: "checkbox",
                            role: "switch",
                            id: "dont-ask-for-widget",
                            checked: L,
                            onChange: function (t) {
                              N(t.target.checked);
                            },
                          }),
                          r().createElement(
                            "label",
                            {
                              className: "form-check-label",
                              htmlFor: "dont-ask-for-widget",
                            },
                            "Don't ask again for saving similar data by",
                            " ",
                            r().createElement(
                              "span",
                              { className: "font-monospace" },
                              B
                            )
                          )
                        )
                    )
                  : I
              ),
              r().createElement(
                ne().Footer,
                null,
                r().createElement(
                  "button",
                  {
                    className: "btn btn-success",
                    disabled: !(null != w && w.data) || d || R,
                    onClick: function (t) {
                      t.preventDefault(), U();
                    },
                  },
                  d && I,
                  " Save Data"
                ),
                r().createElement(
                  "button",
                  { className: "btn btn-secondary", onClick: T, disabled: d },
                  "Close"
                )
              )
            );
          },
          Or = function (t) {
            var n = Zt(),
              o = t.data,
              i = t.children,
              a = t.onClick,
              c = t.onCommit,
              u = t.onCancel,
              s = t.disabled,
              l = t.widgetSrc,
              f = t.force,
              h = (function (t, e) {
                if (null == t) return {};
                var r,
                  n,
                  o = (function (t, e) {
                    if (null == t) return {};
                    var r,
                      n,
                      o = {},
                      i = Object.keys(t);
                    for (n = 0; n < i.length; n++)
                      (r = i[n]), e.indexOf(r) >= 0 || (o[r] = t[r]);
                    return o;
                  })(t, e);
                if (Object.getOwnPropertySymbols) {
                  var i = Object.getOwnPropertySymbols(t);
                  for (n = 0; n < i.length; n++)
                    (r = i[n]),
                      e.indexOf(r) >= 0 ||
                        (Object.prototype.propertyIsEnumerable.call(t, r) &&
                          (o[r] = t[r]));
                }
                return o;
              })(t, yr),
              p = br((0, e.useState)(null), 2),
              d = p[0],
              y = p[1];
            return r().createElement(
              r().Fragment,
              null,
              r().createElement(
                "button",
                vr({}, h, {
                  disabled: s || !o || !!d || !n,
                  onClick: function (t) {
                    t.preventDefault(),
                      y("function" == typeof o ? o() : o),
                      a && a();
                  },
                }),
                !!d && I,
                i
              ),
              r().createElement(kr, {
                show: !!d,
                widgetSrc: l,
                data: d,
                force: f,
                onHide: function () {
                  return y(null);
                },
                onCancel: u,
                onCommit: c,
              })
            );
          };
        require("react-bootstrap-typeahead/css/Typeahead.css"),
          require("react-bootstrap-typeahead/css/Typeahead.bs5.css");
        const jr = require("react-bootstrap-typeahead"),
          Ir = require("styled-components");
        var Lr = n.n(Ir);
        const Nr = require("elliptic"),
          Ar = require("bn.js");
        var _r = n.n(Ar);
        const Tr = require("tweetnacl");
        function Pr() {
          return (
            (Pr = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var r = arguments[e];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) &&
                        (t[n] = r[n]);
                  }
                  return t;
                }),
            Pr.apply(this, arguments)
          );
        }
        function Cr(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              var r =
                null == t
                  ? null
                  : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
              if (null != r) {
                var n,
                  o,
                  i,
                  a,
                  c = [],
                  u = !0,
                  s = !1;
                try {
                  if (((i = (r = r.call(t)).next), 0 === e)) {
                    if (Object(r) !== r) return;
                    u = !1;
                  } else
                    for (
                      ;
                      !(u = (n = i.call(r)).done) &&
                      (c.push(n.value), c.length !== e);
                      u = !0
                    );
                } catch (t) {
                  (s = !0), (o = t);
                } finally {
                  try {
                    if (
                      !u &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw o;
                  }
                }
                return c;
              }
            })(t, e) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return Br(t, e);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                return (
                  "Object" === r && t.constructor && (r = t.constructor.name),
                  "Map" === r || "Set" === r
                    ? Array.from(t)
                    : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? Br(t, e)
                    : void 0
                );
              }
            })(t, e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function Br(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function Ur(t) {
          var n = t.className,
            o = t.style,
            i = t.src,
            a = t.srcDoc,
            c = t.title,
            u = t.message,
            s = t.onMessage,
            l = { className: n, style: o, src: i, srcDoc: a, title: c },
            f = Cr((0, e.useState)(!1), 2),
            h = f[0],
            p = f[1],
            d = Cr((0, e.useState)(void 0), 2),
            y = d[0],
            v = d[1],
            m = r().useRef(),
            g = (0, e.useCallback)(
              function (t) {
                t.source === m.current.contentWindow && s && s(t.data);
              },
              [m, s]
            );
          return (
            (0, e.useEffect)(
              function () {
                return (
                  window.addEventListener("message", g, !1),
                  function () {
                    window.removeEventListener("message", g, !1);
                  }
                );
              },
              [g]
            ),
            (0, e.useEffect)(
              function () {
                m.current &&
                  h &&
                  !at(y, u) &&
                  (v(it(u)), m.current.contentWindow.postMessage(u, "*"));
              },
              [u, m, h, y]
            ),
            (0, e.useEffect)(
              function () {
                p(!1);
              },
              [i, a]
            ),
            r().createElement(
              "iframe",
              Pr({}, l, {
                ref: m,
                sandbox: "allow-scripts",
                onLoad: function () {
                  return p(!0);
                },
              })
            )
          );
        }
        const Fr = require("nanoid"),
          Rr = require("@radix-ui/react-accordion"),
          Mr = require("@radix-ui/react-alert-dialog"),
          qr = require("@radix-ui/react-aspect-ratio"),
          Gr = require("@radix-ui/react-avatar"),
          Dr = require("@radix-ui/react-checkbox"),
          Jr = require("@radix-ui/react-collapsible"),
          $r = require("@radix-ui/react-context-menu"),
          zr = require("@radix-ui/react-dialog"),
          Kr = require("@radix-ui/react-dropdown-menu"),
          Xr = require("@radix-ui/react-hover-card"),
          Yr = require("@radix-ui/react-label"),
          Vr = require("@radix-ui/react-menubar"),
          Hr = require("@radix-ui/react-navigation-menu"),
          Wr = require("@radix-ui/react-popover"),
          Zr = require("@radix-ui/react-progress"),
          Qr = require("@radix-ui/react-radio-group"),
          tn = require("@radix-ui/react-scroll-area"),
          en = require("@radix-ui/react-select"),
          rn = require("@radix-ui/react-separator"),
          nn = require("@radix-ui/react-slider"),
          on = require("@radix-ui/react-switch"),
          an = require("@radix-ui/react-tabs"),
          cn = require("@radix-ui/react-toast"),
          un = require("@radix-ui/react-toggle"),
          sn = require("@radix-ui/react-toggle-group"),
          ln = require("@radix-ui/react-toolbar"),
          fn = require("@radix-ui/react-tooltip");
        var hn,
          pn = n(764).lW;
        function dn(t, e) {
          var r =
            ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
            t["@@iterator"];
          if (!r) {
            if (
              Array.isArray(t) ||
              (r = Sn(t)) ||
              (e && t && "number" == typeof t.length)
            ) {
              r && (t = r);
              var n = 0,
                o = function () {};
              return {
                s: o,
                n: function () {
                  return n >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[n++] };
                },
                e: function (t) {
                  throw t;
                },
                f: o,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var i,
            a = !0,
            c = !1;
          return {
            s: function () {
              r = r.call(t);
            },
            n: function () {
              var t = r.next();
              return (a = t.done), t;
            },
            e: function (t) {
              (c = !0), (i = t);
            },
            f: function () {
              try {
                a || null == r.return || r.return();
              } finally {
                if (c) throw i;
              }
            },
          };
        }
        function yn(t, e, r) {
          return (
            (yn = (function () {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (t) {
                return !1;
              }
            })()
              ? Reflect.construct.bind()
              : function (t, e, r) {
                  var n = [null];
                  n.push.apply(n, e);
                  var o = new (Function.bind.apply(t, n))();
                  return r && vn(o, r.prototype), o;
                }),
            yn.apply(null, arguments)
          );
        }
        function vn(t, e) {
          return (
            (vn = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t;
                }),
            vn(t, e)
          );
        }
        function mn() {
          return (
            (mn = Object.assign
              ? Object.assign.bind()
              : function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var r = arguments[e];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) &&
                        (t[n] = r[n]);
                  }
                  return t;
                }),
            mn.apply(this, arguments)
          );
        }
        function gn(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return kn(t);
            })(t) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            Sn(t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function bn(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function wn(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, Nn(n.key), n);
          }
        }
        function En(t, e, r) {
          return (
            e && wn(t.prototype, e),
            r && wn(t, r),
            Object.defineProperty(t, "prototype", { writable: !1 }),
            t
          );
        }
        function xn(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              var r =
                null == t
                  ? null
                  : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
              if (null != r) {
                var n,
                  o,
                  i,
                  a,
                  c = [],
                  u = !0,
                  s = !1;
                try {
                  if (((i = (r = r.call(t)).next), 0 === e)) {
                    if (Object(r) !== r) return;
                    u = !1;
                  } else
                    for (
                      ;
                      !(u = (n = i.call(r)).done) &&
                      (c.push(n.value), c.length !== e);
                      u = !0
                    );
                } catch (t) {
                  (s = !0), (o = t);
                } finally {
                  try {
                    if (
                      !u &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw o;
                  }
                }
                return c;
              }
            })(t, e) ||
            Sn(t, e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function Sn(t, e) {
          if (t) {
            if ("string" == typeof t) return kn(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            return (
              "Object" === r && t.constructor && (r = t.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(t)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? kn(t, e)
                : void 0
            );
          }
        }
        function kn(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function On(t) {
          return (
            (On =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            On(t)
          );
        }
        function jn(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function In(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? jn(Object(r), !0).forEach(function (e) {
                  Ln(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
              : jn(Object(r)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(r, e)
                  );
                });
          }
          return t;
        }
        function Ln(t, e, r) {
          return (
            (e = Nn(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function Nn(t) {
          var e = (function (t, e) {
            if ("object" !== On(t) || null === t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(t, "string");
              if ("object" !== On(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(t);
          })(t);
          return "symbol" === On(e) ? e : String(e);
        }
        var An = Object.freeze({
            randomBytes: rt(Tr.randomBytes),
            secretbox: rt(Tr.secretbox),
            scalarMult: rt(Tr.scalarMult),
            box: rt(Tr.box),
            sign: rt(Tr.sign),
            hash: rt(Tr.hash),
            verify: rt(Tr.verify),
          }),
          _n = Object.freeze({
            version: rt(Nr.version),
            utils: rt(Nr.utils),
            curve: rt(Nr.curve),
            curves: rt(Nr.curves),
            ec: Object.freeze(Nr.ec),
            eddsa: Object.freeze(Nr.eddsa),
          }),
          Tn = Object.freeze({
            nanoid: rt(Fr.nanoid),
            customAlphabet: rt(Fr.customAlphabet),
          }),
          Pn = "state",
          Cn = "private",
          Bn = "public",
          Un = {
            h1: !0,
            h2: !0,
            h3: !0,
            h4: !0,
            h5: !0,
            h6: !0,
            div: !0,
            span: !0,
            strong: !0,
            sub: !0,
            sup: !0,
            pre: !0,
            i: !0,
            b: !0,
            p: !0,
            input: !0,
            button: !0,
            fieldset: !0,
            ul: !0,
            ol: !0,
            li: !0,
            table: !0,
            tr: !0,
            th: !0,
            td: !0,
            thead: !0,
            tbody: !0,
            tfoot: !0,
            br: !1,
            hr: !1,
            img: !1,
            textarea: !0,
            select: !0,
            option: !0,
            label: !0,
            small: !0,
            svg: !0,
            animate: !1,
            animateMotion: !1,
            animateTransform: !1,
            defs: !0,
            circle: !0,
            clipPath: !0,
            ellipse: !0,
            g: !0,
            image: !1,
            line: !0,
            linearGradient: !0,
            marker: !0,
            mask: !0,
            mpath: !1,
            path: !0,
            pattern: !0,
            polygon: !0,
            polyline: !0,
            radialGradient: !0,
            rect: !0,
            set: !1,
            stop: !1,
            symbol: !0,
            text: !0,
            textPath: !0,
            tspan: !0,
            use: !1,
            a: !0,
          },
          Fn = {
            Accordion: Rr,
            AlertDialog: Mr,
            AspectRatio: qr,
            Avatar: Gr,
            Checkbox: Dr,
            Collapsible: Jr,
            ContextMenu: $r,
            Dialog: zr,
            DropdownMenu: Kr,
            HoverCard: Xr,
            Label: Yr,
            Menubar: Vr,
            NavigationMenu: Hr,
            Popover: Wr,
            Progress: Zr,
            RadioGroup: Qr,
            ScrollArea: tn,
            Select: en,
            Separator: rn,
            Slider: nn,
            Switch: on,
            Tabs: an,
            Toast: cn,
            Toggle: un,
            ToggleGroup: sn,
            Toolbar: ln,
            Tooltip: fn,
          },
          Rn = In(In({}, Un), {
            Widget: !1,
            CommitButton: !0,
            IpfsImageUpload: !1,
            Markdown: !1,
            Fragment: !0,
            InfiniteScroll: !0,
            Typeahead: !1,
            Tooltip: !0,
            OverlayTrigger: !0,
            Files: !0,
            iframe: !1,
          }),
          Mn = {
            JSON: !0,
            Social: !0,
            Storage: !0,
            Near: !0,
            State: !0,
            console: !0,
            styled: !0,
            Object: !0,
            Date,
            Number,
            Big: u(),
            Math,
            Buffer: pn,
            Audio,
            Image,
            File,
            Blob,
            FileReader,
            URL,
            Array,
            BN: _r(),
            Uint8Array,
            Map,
            Set,
            clipboard: !0,
          },
          qn =
            (Ln((hn = {}), nt, !0),
            Ln(hn, "constructor", !0),
            Ln(hn, "prototype", !0),
            Ln(hn, "__proto__", !0),
            Ln(hn, "__defineGetter__", !0),
            Ln(hn, "__defineSetter__", !0),
            Ln(hn, "__lookupGetter__", !0),
            Ln(hn, "__lookupSetter__", !0),
            hn),
          Gn = function (t) {
            if (!0 === qn[t])
              throw new Error("".concat(t, " is reserved and can't be used"));
          },
          Dn = function (t) {
            if (ot(t)) throw new Error("React objects shouldn't dereferenced");
          },
          Jn = function t(e) {
            null !== e &&
              "object" === On(e) &&
              Object.entries(e).forEach(function (e) {
                var r = xn(e, 2),
                  n = r[0],
                  o = r[1];
                Gn(n), t(o);
              });
          },
          $n = function (t) {
            if (Object.keys(Fn).includes(t.split(".")[0])) {
              var e = t.split(".").reduce(function (t, e) {
                return t[e];
              }, Fn);
              if (void 0 === e)
                throw new Error(
                  '"'.concat(t, '" is not a valid Radix component')
                );
              return e;
            }
          },
          zn = function (t, e) {
            return t && (null == e || "final" === e || "optimistic" === e);
          },
          Kn = function (t) {
            if ("Identifier" !== t.type)
              throw new Error("Non identifier: " + t.type);
            var e = t.name;
            if ((Gn(e), e in Mn)) throw new Error("Cannot use keyword: " + e);
            return { type: "Identifier", name: e };
          },
          Xn = function (t) {
            if ("JSXIdentifier" !== t.type)
              throw new Error("Non JSXIdentifier: " + t.type);
            return t.name;
          },
          Yn = function t(e) {
            if ("JSXIdentifier" === e.type) return e.name;
            if ("JSXMemberExpression" === e.type)
              return t(e.object) + "." + Xn(e.property);
            throw new Error(
              "Non JSXIdentifier or JSXMemberExpression: " + e.type
            );
          },
          Vn = function t(e) {
            if ("Identifier" === e.type) return Kn(e);
            if ("ArrayPattern" === e.type)
              return { type: "ArrayPattern", elements: e.elements.map(t) };
            if ("ObjectPattern" === e.type)
              return {
                type: "ObjectPattern",
                properties: e.properties.map(function (e) {
                  if ("Property" === e.type)
                    return { key: Kn(e.key), value: t(e.value) };
                  if ("RestElement" === e.type)
                    return { type: "RestElement", argument: Kn(e.argument) };
                  throw new Error("Unknown property type: " + e.type);
                }),
              };
            if ("RestElement" === e.type)
              return { type: "RestElement", argument: Kn(e.argument) };
            throw new Error("Unknown pattern: " + e.type);
          },
          Hn = (function () {
            function t(e, r) {
              bn(this, t), (this.prevStack = e), (this.state = r);
            }
            return (
              En(t, [
                {
                  key: "findObj",
                  value: function (t) {
                    return t in this.state
                      ? this.state
                      : this.prevStack
                      ? this.prevStack.findObj(t)
                      : void 0;
                  },
                },
                {
                  key: "get",
                  value: function (t) {
                    return t in this.state
                      ? this.state[t]
                      : this.prevStack
                      ? this.prevStack.get(t)
                      : void 0;
                  },
                },
              ]),
              t
            );
          })(),
          Wn = (function () {
            function t(e, r, n, o) {
              bn(this, t),
                (this.gIndex = 0),
                (this.vm = e),
                (this.isTrusted = !!o),
                (this.stack = new Hn(r, n));
            }
            return (
              En(t, [
                {
                  key: "newStack",
                  value: function (e) {
                    return new t(
                      this.vm,
                      this.stack,
                      {},
                      this.isTrusted || !!e
                    );
                  },
                },
                {
                  key: "executeExpression",
                  value: function (t) {
                    return this.executeExpressionInternal(t);
                  },
                },
                {
                  key: "renderElement",
                  value: function (t) {
                    var e,
                      n = this,
                      o =
                        "JSXFragment" === t.type
                          ? "Fragment"
                          : Yn(t.openingElement.name),
                      i = Rn[o],
                      a = $n(o),
                      c =
                        void 0 === i &&
                        this.executeExpression(t.openingElement.name);
                    if (void 0 === i && !a) {
                      if (void 0 === c)
                        throw new Error("Unknown element: " + o);
                      if (
                        !(0, Ir.isStyledComponent)(c) &&
                        "function" != typeof c
                      )
                        throw new Error("Unsupported component: " + o);
                    }
                    var u = {},
                      s = {};
                    "input" === o
                      ? (u.className = "form-control")
                      : "CommitButton" === o
                      ? (u.className = "btn btn-success")
                      : "button" === o
                      ? (u.className = "btn btn-primary")
                      : "IpfsImageUpload" === o &&
                        (u.className = "btn btn-outline-primary");
                    var l = {};
                    ("JSXFragment" === t.type
                      ? t.openingFragment
                      : t.openingElement
                    ).attributes.forEach(function (t) {
                      if ("JSXAttribute" === t.type) {
                        var e = Xn(t.name);
                        (u[e] =
                          null === t.value || n.executeExpression(t.value)),
                          ("value" !== e &&
                            "image" !== e &&
                            "onChange" !== e) ||
                            (l[e] = t.value);
                      } else {
                        if ("JSXSpreadAttribute" !== t.type)
                          throw new Error("Unknown attribute type: " + t.type);
                        var r = n.executeExpression(t.argument);
                        Object.assign(u, r);
                      }
                    }),
                      "forwardedRef" === u.ref &&
                        (u = In(In({}, u), this.vm.forwardedProps)),
                      Object.entries(l).forEach(function (t) {
                        var e = xn(t, 2),
                          r = e[0],
                          i = e[1];
                        if (
                          "value" !== r ||
                          "input" !== o ||
                          "text" !== u.type ||
                          "JSXExpressionContainer" !== i.type ||
                          "onChange" in l
                        ) {
                          if (
                            "image" === r &&
                            "IpfsImageUpload" === o &&
                            "JSXExpressionContainer" === i.type
                          ) {
                            var a = n.resolveMemberExpression(i.expression, {
                                requireState: !0,
                                left: !0,
                              }),
                              c = a.obj,
                              f = a.key;
                            (s.img = c[f]),
                              (u.onChange = function (t) {
                                (null == t ? void 0 : t.length) > 0
                                  ? ((c[f] = { uploading: !0, cid: null }),
                                    n.vm.setReactState(n.vm.state.state),
                                    J(t[0]).then(function (t) {
                                      if (n.vm.alive) {
                                        var e =
                                          n.vm.vmStack.resolveMemberExpression(
                                            i.expression,
                                            { requireState: !0, left: !0 }
                                          );
                                        (e.obj[e.key] = { cid: t }),
                                          n.vm.setReactState(n.vm.state.state);
                                      }
                                    }))
                                  : ((c[f] = null),
                                    n.vm.setReactState(n.vm.state.state));
                              });
                          }
                        } else {
                          var h = n.resolveMemberExpression(i.expression, {
                              requireState: !0,
                              left: !0,
                            }),
                            p = h.obj,
                            d = h.key;
                          (u.value = (null == p ? void 0 : p[d]) || ""),
                            (u.onChange = function (t) {
                              t.preventDefault(),
                                (p[d] = t.target.value),
                                n.vm.setReactState(n.vm.state.state);
                            });
                        }
                      }),
                      (u.key =
                        null !== (e = u.key) && void 0 !== e
                          ? e
                          : ""
                              .concat(this.vm.widgetSrc, "-")
                              .concat(o, "-")
                              .concat(this.vm.gIndex)),
                      delete u.dangerouslySetInnerHTML;
                    var f,
                      h =
                        ((0, Ir.isStyledComponent)(c) &&
                          (null == c ? void 0 : c.target)) ||
                        o;
                    if (
                      (u.as && !Un[u.as] && delete u.as,
                      u.forwardedAs &&
                        !Un[u.forwardedAs] &&
                        delete u.forwardedAs,
                      "img" === h
                        ? (u.alt =
                            null !== (f = u.alt) && void 0 !== f
                              ? f
                              : "not defined")
                        : "a" === h
                        ? "href" in u && (u.href = (0, Te.sanitizeUrl)(u.href))
                        : "Widget" === o &&
                          ((u.depth = this.vm.depth + 1),
                          (u.config = [u.config]
                            .concat(gn(this.vm.widgetConfigs))
                            .filter(Boolean))),
                      !1 === i && t.children.length)
                    )
                      throw new Error(
                        "And element '" +
                          o +
                          "' contains children, but shouldn't"
                      );
                    var p,
                      d,
                      y,
                      v,
                      m = t.children.map(function (t, e) {
                        return (n.vm.gIndex = e), n.executeExpression(t);
                      });
                    if (c)
                      return (0, Ir.isStyledComponent)(c)
                        ? r().createElement.apply(
                            r(),
                            [c, In({}, u)].concat(gn(m))
                          )
                        : c(In({ children: m }, u));
                    if ("Widget" === o) return r().createElement(ho, u);
                    if ("CommitButton" === o)
                      return r().createElement(
                        Or,
                        mn({}, u, { widgetSrc: this.vm.widgetSrc }),
                        m
                      );
                    if ("InfiniteScroll" === o)
                      return r().createElement(Ce(), u, m);
                    if ("Tooltip" === o)
                      return r().createElement(Ye.Tooltip, u, m);
                    if ("OverlayTrigger" === o)
                      return r().createElement(
                        Ye.OverlayTrigger,
                        u,
                        m.filter(function (t) {
                          return !T(t) || !!t.trim();
                        })[0]
                      );
                    if ("Typeahead" === o)
                      return r().createElement(jr.Typeahead, u);
                    if ("Markdown" === o) return r().createElement(ke, u);
                    if ("Fragment" === o)
                      return r().createElement(r().Fragment, u, m);
                    if ("IpfsImageUpload" === o)
                      return r().createElement(
                        "div",
                        { className: "d-inline-block", key: u.key },
                        (null === (p = s.img) || void 0 === p
                          ? void 0
                          : p.cid) &&
                          r().createElement(
                            "div",
                            {
                              className:
                                "d-inline-block me-2 overflow-hidden align-middle",
                              style: { width: "2.5em", height: "2.5em" },
                            },
                            r().createElement("img", {
                              className: "rounded w-100 h-100",
                              style: { objectFit: "cover" },
                              src: $(
                                null === (d = s.img) || void 0 === d
                                  ? void 0
                                  : d.cid
                              ),
                              alt: "upload preview",
                            })
                          ),
                        r().createElement(
                          _e(),
                          mn(
                            {
                              multiple: !1,
                              accepts: ["image/*"],
                              minFileSize: 1,
                              clickable: !0,
                            },
                            u
                          ),
                          null !== (y = s.img) && void 0 !== y && y.uploading
                            ? r().createElement(
                                r().Fragment,
                                null,
                                I,
                                " Uploading"
                              )
                            : null !== (v = s.img) && void 0 !== v && v.cid
                            ? "Replace"
                            : "Upload an Image"
                        )
                      );
                    if ("Files" === o) return r().createElement(_e(), u, m);
                    if ("iframe" === o) return r().createElement(Ur, u);
                    if (a) {
                      if (o.includes("Portal"))
                        throw new Error(
                          "Radix's \"".concat(
                            o,
                            "\" component is not allowed. This portal element is an optional Radix feature and isn't necessary for most use cases."
                          )
                        );
                      var g = m;
                      return (
                        Array.isArray(g) &&
                          (1 ===
                          (g = g.filter(function (t) {
                            return "string" != typeof t || "" !== t.trim();
                          })).length
                            ? (g = g[0])
                            : 0 === g.length && (g = void 0)),
                        r().createElement(a, u, g)
                      );
                    }
                    if (!0 === i)
                      return r().createElement.apply(
                        r(),
                        [o, In({}, u)].concat(gn(m))
                      );
                    if (!1 === i) return r().createElement(o, In({}, u));
                    throw new Error("Unsupported element: " + o);
                  },
                },
                {
                  key: "resolveKey",
                  value: function (t, e) {
                    var r =
                      e ||
                      ("Identifier" !== t.type && "JSXIdentifier" !== t.type)
                        ? this.executeExpression(t)
                        : t.name;
                    return Gn(r), r;
                  },
                },
                {
                  key: "callFunction",
                  value: function (t, e, r, n, o) {
                    var i = this,
                      a = Mn[t];
                    if (!0 === a || void 0 === a) {
                      if (
                        ("Social" === t && "getr" === e) ||
                        "socialGetr" === e
                      ) {
                        if (r.length < 1)
                          throw new Error(
                            "Missing argument 'keys' for Social.getr"
                          );
                        return this.vm.cachedSocialGet(r[0], !0, r[1], r[2]);
                      }
                      if (
                        ("Social" === t && "get" === e) ||
                        "socialGet" === e
                      ) {
                        if (r.length < 1)
                          throw new Error(
                            "Missing argument 'keys' for Social.get"
                          );
                        return this.vm.cachedSocialGet(r[0], !1, r[1], r[2]);
                      }
                      if ("Social" === t && "keys" === e) {
                        if (r.length < 1)
                          throw new Error(
                            "Missing argument 'keys' for Social.keys"
                          );
                        return this.vm.cachedSocialKeys(r[0], r[1], r[2]);
                      }
                      if ("Social" === t && "index" === e) {
                        if (r.length < 2)
                          throw new Error(
                            "Missing argument 'action' and 'key` for Social.index"
                          );
                        return this.vm.cachedIndex(r[0], r[1], r[2]);
                      }
                      if ("Social" === t && "set" === e) {
                        if (r.length < 1)
                          throw new Error(
                            "Missing argument 'data' for Social.set"
                          );
                        return this.vm.socialSet(r[0], r[1]);
                      }
                      if ("Near" === t && "view" === e) {
                        if (r.length < 2)
                          throw new Error(
                            "Method: Near.view. Required arguments: 'contractName', 'methodName'. Optional: 'args', 'blockId/finality', 'subscribe'"
                          );
                        var c = xn(r, 5),
                          u = c[0],
                          s = c[1],
                          l = c[2],
                          f = c[3],
                          h = c[4];
                        return this.vm.cachedNearView(u, s, l, f, zn(h, f));
                      }
                      if ("Near" === t && "asyncView" === e) {
                        var p;
                        if (r.length < 2)
                          throw new Error(
                            "Method: Near.asyncView. Required arguments: 'contractName', 'methodName'. Optional: 'args', 'blockId/finality'"
                          );
                        return (p = this.vm).asyncNearView.apply(p, gn(r));
                      }
                      if ("Near" === t && "block" === e) {
                        var d = xn(r, 2),
                          y = d[0],
                          v = d[1];
                        return this.vm.cachedNearBlock(y, zn(v, y));
                      }
                      if ("Near" === t && "call" === e) {
                        if (1 === r.length) {
                          if (_(r[0]))
                            return this.vm.confirmTransactions([r[0]]);
                          if (A(r[0])) return this.vm.confirmTransactions(r[0]);
                          throw new Error(
                            "Method: Near.call. Required argument: 'tx/txs'. A single argument call requires an TX object or an array of TX objects."
                          );
                        }
                        var m;
                        if (r.length < 2 || r.length > 5)
                          throw new Error(
                            "Method: Near.call. Required argument: 'contractName'. If the first argument is a string: 'methodName'. Optional: 'args', 'gas' (defaults to 300Tg), 'deposit' (defaults to 0)"
                          );
                        return this.vm.confirmTransactions([
                          {
                            contractName: r[0],
                            methodName: r[1],
                            args: null !== (m = r[2]) && void 0 !== m ? m : {},
                            gas: r[3],
                            deposit: r[4],
                          },
                        ]);
                      }
                      if ("fetch" === e) {
                        var g;
                        if (r.length < 1)
                          throw new Error(
                            "Method: fetch. Required arguments: 'url'. Optional: 'options'"
                          );
                        return (g = this.vm).cachedFetch.apply(g, gn(r));
                      }
                      if ("asyncFetch" === e) {
                        var b;
                        if (r.length < 1)
                          throw new Error(
                            "Method: asyncFetch. Required arguments: 'url'. Optional: 'options'"
                          );
                        return (b = this.vm).asyncFetch.apply(b, gn(r));
                      }
                      if ("useCache" === e) {
                        var w;
                        if (r.length < 2)
                          throw new Error(
                            "Method: useCache. Required arguments: 'promiseGenerator', 'dataKey'. Optional: 'options'"
                          );
                        if (!(r[0] instanceof Function))
                          throw new Error(
                            "Method: useCache. The first argument 'promiseGenerator' must be a function"
                          );
                        return (w = this.vm).useCache.apply(w, gn(r));
                      }
                      if ("parseInt" === e)
                        return parseInt.apply(void 0, gn(r));
                      if ("parseFloat" === e)
                        return parseFloat.apply(void 0, gn(r));
                      if ("isNaN" === e) return isNaN.apply(void 0, gn(r));
                      if ("setTimeout" === e) {
                        var E = xn(r, 2),
                          x = E[0],
                          S = E[1],
                          k = setTimeout(function () {
                            i.vm.alive && x();
                          }, S);
                        return this.vm.timeouts.add(k), k;
                      }
                      if ("setInterval" === e) {
                        if (this.vm.intervals.size >= 16)
                          throw new Error(
                            "Too many intervals. Max allowed: ".concat(16)
                          );
                        var O = xn(r, 2),
                          j = O[0],
                          I = O[1],
                          L = setInterval(function () {
                            i.vm.alive && j();
                          }, I);
                        return this.vm.intervals.add(L), L;
                      }
                      if ("clearTimeout" === e) {
                        var N = r[0];
                        return this.vm.timeouts.delete(N), clearTimeout(N);
                      }
                      if ("clearInterval" === e) {
                        var T = r[0];
                        return this.vm.intervals.delete(T), clearInterval(T);
                      }
                      if (
                        ("JSON" === t && "stringify" === e) ||
                        "stringify" === e
                      ) {
                        if (r.length < 1)
                          throw new Error(
                            "Missing argument 'obj' for JSON.stringify"
                          );
                        return Dn(r[0]), JSON.stringify(r[0], r[1], r[2]);
                      }
                      if ("JSON" === t && "parse" === e) {
                        if (r.length < 1)
                          throw new Error(
                            "Missing argument 's' for JSON.parse"
                          );
                        try {
                          var P = JSON.parse(r[0]);
                          return Jn(P), P;
                        } catch (t) {
                          return null;
                        }
                      } else if ("Object" === t) {
                        if ("keys" === e) {
                          if (r.length < 1)
                            throw new Error(
                              "Missing argument 'obj' for Object.keys"
                            );
                          return Dn(r[0]), Object.keys(r[0]);
                        }
                        if ("values" === e) {
                          if (r.length < 1)
                            throw new Error(
                              "Missing argument 'obj' for Object.values"
                            );
                          return Dn(r[0]), Object.values(r[0]);
                        }
                        if ("entries" === e) {
                          if (r.length < 1)
                            throw new Error(
                              "Missing argument 'obj' for Object.entries"
                            );
                          return Dn(r[0]), Object.entries(r[0]);
                        }
                        if ("assign" === e) {
                          r.forEach(function (t) {
                            return Dn(t);
                          });
                          var C = Object.assign.apply(Object, gn(r));
                          return Jn(C), C;
                        }
                        if ("fromEntries" === e) {
                          var B = Object.fromEntries(r[0]);
                          return Jn(B), B;
                        }
                      } else {
                        if (
                          ("State" === t && "init" === e) ||
                          "initState" === e
                        ) {
                          if (r.length < 1)
                            throw new Error(
                              "Missing argument 'initialState' for State.init"
                            );
                          if (
                            null === r[0] ||
                            "object" !== On(r[0]) ||
                            ot(r[0])
                          )
                            throw new Error("'initialState' is not an object");
                          if (void 0 === this.vm.state.state) {
                            var U = r[0];
                            (this.vm.state.state = U), this.vm.setReactState(U);
                          }
                          return this.vm.state.state;
                        }
                        if ("State" === t && "update" === e) {
                          var F;
                          if (_(r[0]))
                            (this.vm.state.state =
                              null !== (F = this.vm.state.state) && void 0 !== F
                                ? F
                                : {}),
                              Object.assign(this.vm.state.state, it(r[0]));
                          else if (r[0] instanceof Function) {
                            var R;
                            (this.vm.state.state =
                              null !== (R = this.vm.state.state) && void 0 !== R
                                ? R
                                : {}),
                              (this.vm.state.state = r[0](this.vm.state.state));
                          }
                          if (void 0 === this.vm.state.state)
                            throw new Error("The state was not initialized");
                          return (
                            this.vm.setReactState(this.vm.state.state),
                            this.vm.state.state
                          );
                        }
                        if ("Storage" === t && "privateSet" === e) {
                          if (r.length < 2)
                            throw new Error(
                              "Missing argument 'key' or 'value' for Storage.privateSet"
                            );
                          return this.vm.storageSet(
                            { src: this.vm.widgetSrc, type: Cn },
                            r[0],
                            r[1]
                          );
                        }
                        if ("Storage" === t && "privateGet" === e) {
                          if (r.length < 1)
                            throw new Error(
                              "Missing argument 'key' for Storage.privateGet"
                            );
                          return this.vm.storageGet(
                            { src: this.vm.widgetSrc, type: Cn },
                            r[0]
                          );
                        }
                        if ("Storage" === t && "set" === e) {
                          if (r.length < 2)
                            throw new Error(
                              "Missing argument 'key' or 'value' for Storage.set"
                            );
                          return this.vm.storageSet(
                            { src: this.vm.widgetSrc, type: Bn },
                            r[0],
                            r[1]
                          );
                        }
                        if ("Storage" === t && "get" === e) {
                          var M;
                          if (r.length < 1)
                            throw new Error(
                              "Missing argument 'key' for Storage.get"
                            );
                          return this.vm.storageGet(
                            {
                              src:
                                null !== (M = r[1]) && void 0 !== M
                                  ? M
                                  : this.vm.widgetSrc,
                              type: Bn,
                            },
                            r[0]
                          );
                        }
                        var q, G;
                        if ("console" === t && "log" === e)
                          return (q = console).log.apply(
                            q,
                            [this.vm.widgetSrc].concat(gn(r))
                          );
                        if ("clipboard" === t && "writeText" === e)
                          return this.isTrusted
                            ? (G = navigator.clipboard).writeText.apply(
                                G,
                                gn(r)
                              )
                            : Promise.reject(
                                new Error("Not trusted (not a click)")
                              );
                      }
                    } else {
                      var D = e === t ? a : a[e];
                      if ("function" == typeof D)
                        return o ? yn(D, gn(r)) : D.apply(void 0, gn(r));
                    }
                    if (!n)
                      throw new Error(
                        t && t !== e
                          ? "Unsupported callee method '"
                              .concat(t, ".")
                              .concat(e, "'")
                          : "Unsupported callee method '".concat(e, "'")
                      );
                  },
                },
                {
                  key: "resolveMemberExpression",
                  value: function (t, e) {
                    if ("Identifier" === t.type || "JSXIdentifier" === t.type) {
                      var r,
                        n = t.name;
                      if ((Gn(n), null != e && e.requireState && n !== Pn))
                        throw new Error("The top object should be ".concat(Pn));
                      var o =
                        null !== (r = this.stack.findObj(n)) && void 0 !== r
                          ? r
                          : this.stack.state;
                      if ((Dn(o), o === this.stack.state && n in Mn)) {
                        if (null != e && e.left)
                          throw new Error(
                            "Cannot assign to keyword '" + n + "'"
                          );
                        return { obj: o, key: n, keyword: n };
                      }
                      if (null != e && e.left && (!o || !(n in o)))
                        throw new Error(
                          "Accessing undeclared identifier '".concat(
                            t.name,
                            "'"
                          )
                        );
                      return { obj: o, key: n };
                    }
                    if (
                      "MemberExpression" === t.type ||
                      "JSXMemberExpression" === t.type
                    ) {
                      var i, a;
                      if (
                        "Identifier" ===
                          (null === (i = t.object) || void 0 === i
                            ? void 0
                            : i.type) ||
                        "JSXIdentifier" ===
                          (null === (a = t.object) || void 0 === a
                            ? void 0
                            : a.type)
                      ) {
                        var c = t.object.name;
                        if (c in Mn) {
                          if (null == e || !e.callee)
                            throw new Error(
                              "Cannot dereference keyword '" +
                                c +
                                "' in non-call expression"
                            );
                          return {
                            obj: this.stack.state,
                            key: this.resolveKey(t.property, t.computed),
                            keyword: c,
                          };
                        }
                      }
                      var u = this.executeExpression(t.object);
                      return (
                        Dn(u),
                        { obj: u, key: this.resolveKey(t.property, t.computed) }
                      );
                    }
                    throw new Error(
                      "Unsupported member type: '" + t.type + "'"
                    );
                  },
                },
                {
                  key: "getArray",
                  value: function (t) {
                    var e = this,
                      r = [];
                    return (
                      t.forEach(function (t) {
                        "SpreadElement" === t.type
                          ? r.push.apply(r, gn(e.executeExpression(t.argument)))
                          : r.push(e.executeExpression(t));
                      }),
                      r
                    );
                  },
                },
                {
                  key: "executeExpressionInternal",
                  value: function (t) {
                    var e = this;
                    if (!t) return null;
                    var r = null == t ? void 0 : t.type;
                    if ("AssignmentExpression" === r) {
                      var n,
                        o = this.resolveMemberExpression(t.left, { left: !0 }),
                        i = o.obj,
                        a = o.key,
                        c = this.executeExpression(t.right);
                      if ("=" === t.operator) return (i[a] = c);
                      if ("+=" === t.operator) return (i[a] += c);
                      if ("-=" === t.operator) return (i[a] -= c);
                      if ("*=" === t.operator) return (i[a] *= c);
                      if ("/=" === t.operator) return (i[a] /= c);
                      if ("??=" === t.operator)
                        return null !== (n = i[a]) && void 0 !== n
                          ? n
                          : (i[a] = c);
                      throw new Error(
                        "Unknown AssignmentExpression operator '" +
                          t.operator +
                          "'"
                      );
                    }
                    if ("ChainExpression" === r)
                      return this.executeExpression(t.expression);
                    if (
                      "MemberExpression" === r ||
                      "JSXMemberExpression" === r
                    ) {
                      var u = this.resolveMemberExpression(t),
                        s = u.obj,
                        l = u.key;
                      return null == s ? void 0 : s[l];
                    }
                    if ("Identifier" === r || "JSXIdentifier" === r)
                      return this.stack.get(t.name);
                    if ("JSXExpressionContainer" === r)
                      return this.executeExpression(t.expression);
                    if ("TemplateLiteral" === r) {
                      for (var f = [], h = 0; h < t.quasis.length; h++) {
                        var p = t.quasis[h];
                        if ("TemplateElement" !== p.type)
                          throw new Error("Unknown quasis type: " + p.type);
                        f.push(p.value.cooked),
                          p.tail ||
                            f.push(this.executeExpression(t.expressions[h]));
                      }
                      return f.join("");
                    }
                    if ("CallExpression" === r || "NewExpression" === r) {
                      var d = "NewExpression" === r,
                        y = this.resolveMemberExpression(t.callee, {
                          callee: !0,
                        }),
                        v = y.obj,
                        m = y.key,
                        g = y.keyword,
                        b = this.getArray(t.arguments);
                      if (!g && (null == v ? void 0 : v[m]) instanceof Function)
                        return d ? yn(v[m], gn(b)) : v[m].apply(v, gn(b));
                      if (g || v === this.stack.state || v === this.vm.state)
                        return this.callFunction(
                          null != g ? g : "",
                          m,
                          b,
                          t.optional,
                          d
                        );
                      if (t.optional) return;
                      throw new Error("Not a function call expression");
                    }
                    if ("Literal" === r || "JSXText" === r) return t.value;
                    if ("JSXElement" === r || "JSXFragment" === r)
                      return this.renderElement(t);
                    if ("JSXExpressionContainer" === r)
                      return this.executeExpression(t.expression);
                    if ("BinaryExpression" === r) {
                      var w = this.executeExpression(t.left),
                        E = this.executeExpression(t.right);
                      if ("+" === t.operator) return w + E;
                      if ("-" === t.operator) return w - E;
                      if ("%" === t.operator) return w % E;
                      if ("*" === t.operator) return w * E;
                      if ("/" === t.operator) return w / E;
                      if ("<" === t.operator) return w < E;
                      if ("|" === t.operator) return w | E;
                      if ("&" === t.operator) return w & E;
                      if (">" === t.operator) return w > E;
                      if ("<=" === t.operator) return w <= E;
                      if (">=" === t.operator) return w >= E;
                      if ("===" === t.operator || "==" === t.operator)
                        return w === E;
                      if ("!==" === t.operator || "!=" === t.operator)
                        return w !== E;
                      if ("in" === t.operator) return w in E;
                      throw new Error(
                        "Unknown BinaryExpression operator '" + t.operator + "'"
                      );
                    }
                    if ("UnaryExpression" === r) {
                      if ("delete" === t.operator) {
                        var x = this.resolveMemberExpression(t.argument, {
                            left: !0,
                          }),
                          S = x.obj,
                          k = x.key;
                        return null == S || delete S[k];
                      }
                      var O = this.executeExpression(t.argument);
                      if ("-" === t.operator) return -O;
                      if ("!" === t.operator) return !O;
                      if ("typeof" === t.operator) return On(O);
                      throw new Error(
                        "Unknown UnaryExpression operator '" + t.operator + "'"
                      );
                    }
                    if ("LogicalExpression" === r) {
                      var j = this.executeExpression(t.left);
                      if ("||" === t.operator)
                        return j || this.executeExpression(t.right);
                      if ("&&" === t.operator)
                        return j && this.executeExpression(t.right);
                      if ("??" === t.operator)
                        return null != j ? j : this.executeExpression(t.right);
                      throw new Error(
                        "Unknown LogicalExpression operator '" +
                          t.operator +
                          "'"
                      );
                    }
                    if ("ConditionalExpression" === r)
                      return this.executeExpression(t.test)
                        ? this.executeExpression(t.consequent)
                        : this.executeExpression(t.alternate);
                    if ("UpdateExpression" === r) {
                      var I = this.resolveMemberExpression(t.argument, {
                          left: !0,
                        }),
                        L = I.obj,
                        N = I.key;
                      if ("++" === t.operator)
                        return t.prefix ? ++L[N] : L[N]++;
                      if ("--" === t.operator)
                        return t.prefix ? --L[N] : L[N]--;
                      throw new Error(
                        "Unknown UpdateExpression operator '" + t.operator + "'"
                      );
                    }
                    if ("ObjectExpression" === r)
                      return t.properties.reduce(function (t, r) {
                        if ("Property" === r.type)
                          t[e.resolveKey(r.key, r.computed)] =
                            e.executeExpression(r.value);
                        else {
                          if ("SpreadElement" !== r.type)
                            throw new Error("Unknown property type: " + r.type);
                          var n = e.executeExpression(r.argument);
                          Dn(n), Object.assign(t, n);
                        }
                        return t;
                      }, {});
                    if ("ArrayExpression" === r)
                      return this.getArray(t.elements);
                    if ("JSXEmptyExpression" === r) return null;
                    if ("ArrowFunctionExpression" === r)
                      return this.createFunction(
                        t.params,
                        t.body,
                        t.expression
                      );
                    if ("TaggedTemplateExpression" === r) {
                      var A, _;
                      if (
                        "MemberExpression" !== t.tag.type &&
                        "CallExpression" !== t.tag.type
                      )
                        throw new Error(
                          "TaggedTemplateExpression is only supported for `styled` components"
                        );
                      var T = this.resolveMemberExpression(
                          "MemberExpression" === t.tag.type
                            ? t.tag
                            : t.tag.callee,
                          { callee: !0 }
                        ),
                        P = T.key;
                      if ("styled" !== T.keyword)
                        throw new Error(
                          "TaggedTemplateExpression is only supported for `styled` components"
                        );
                      if ("CallExpression" === t.tag.type) {
                        var C = this.getArray(t.tag.arguments),
                          B = null == C ? void 0 : C[0],
                          U = $n(B);
                        if (!(0, Ir.isStyledComponent)(B) && !U)
                          throw new Error(
                            'styled() can only take `styled` components or valid Radix components (EG: "Accordion.Trigger")'
                          );
                        A = Lr()(null != U ? U : B);
                      } else {
                        if ("keyframes" === P) A = Ir.keyframes;
                        else {
                          if (!(P in Un))
                            throw new Error("Unsupported styled tag: " + P);
                          A = Lr()(P);
                        }
                        _ = P;
                      }
                      if ("TemplateLiteral" !== t.quasi.type)
                        throw new Error("Unknown quasi type: " + t.quasi.type);
                      var F = t.quasi.quasis.map(function (t) {
                          if ("TemplateElement" !== t.type)
                            throw new Error("Unknown quasis type: " + t.type);
                          return t.value.cooked;
                        }),
                        R =
                          0 === t.quasi.expressions.length &&
                          "CallExpression" !== t.tag.type,
                        M = JSON.stringify([_].concat(gn(F)));
                      if (R && this.vm.cachedStyledComponents.has(M))
                        return this.vm.cachedStyledComponents.get(M);
                      var q = t.quasi.expressions.map(function (t) {
                        return e.executeExpression(t);
                      });
                      if (A instanceof Function) {
                        var G = A.apply(void 0, [F].concat(gn(q)));
                        return R && this.vm.cachedStyledComponents.set(M, G), G;
                      }
                      throw new Error("styled error");
                    }
                    throw (
                      (console.log(t),
                      new Error("Unknown expression type '" + r + "'"))
                    );
                  },
                },
                {
                  key: "createFunction",
                  value: function (t, e, r) {
                    var n = this;
                    return (
                      (t = t.map(Vn)),
                      function () {
                        for (
                          var o,
                            i,
                            a,
                            c = arguments.length,
                            u = new Array(c),
                            s = 0;
                          s < c;
                          s++
                        )
                          u[s] = arguments[s];
                        if (n.vm.alive) {
                          var l = !!(
                              (null == u || null === (o = u[0]) || void 0 === o
                                ? void 0
                                : o.nativeEvent) instanceof Event &&
                              null != u &&
                              null !== (i = u[0]) &&
                              void 0 !== i &&
                              i.nativeEvent.isTrusted
                            ),
                            f = n.newStack(l);
                          return (
                            t.forEach(function (t, e) {
                              var r = void 0,
                                n = null == u ? void 0 : u[e];
                              if (void 0 !== n)
                                try {
                                  var o,
                                    i,
                                    a,
                                    c,
                                    s,
                                    l,
                                    h,
                                    p,
                                    d,
                                    y,
                                    v,
                                    m,
                                    g,
                                    b,
                                    w,
                                    E,
                                    x,
                                    S,
                                    k,
                                    O,
                                    j,
                                    I,
                                    L,
                                    N,
                                    A;
                                  (null === (o = n) || void 0 === o
                                    ? void 0
                                    : o.nativeEvent) instanceof Event &&
                                    (n.preventDefault(),
                                    (n = {
                                      target: {
                                        value:
                                          null === (i = n = n.nativeEvent) ||
                                          void 0 === i ||
                                          null === (a = i.target) ||
                                          void 0 === a
                                            ? void 0
                                            : a.value,
                                        id:
                                          null === (c = n) ||
                                          void 0 === c ||
                                          null === (s = c.target) ||
                                          void 0 === s
                                            ? void 0
                                            : s.id,
                                        dataset:
                                          null === (l = n) ||
                                          void 0 === l ||
                                          null === (h = l.target) ||
                                          void 0 === h
                                            ? void 0
                                            : h.dataset,
                                        href:
                                          null === (p = n) ||
                                          void 0 === p ||
                                          null === (d = p.target) ||
                                          void 0 === d
                                            ? void 0
                                            : d.href,
                                        checked:
                                          null === (y = n) ||
                                          void 0 === y ||
                                          null === (v = y.target) ||
                                          void 0 === v
                                            ? void 0
                                            : v.checked,
                                      },
                                      data:
                                        null === (m = n) || void 0 === m
                                          ? void 0
                                          : m.data,
                                      code:
                                        null === (g = n) || void 0 === g
                                          ? void 0
                                          : g.code,
                                      key:
                                        null === (b = n) || void 0 === b
                                          ? void 0
                                          : b.key,
                                      ctrlKey:
                                        null === (w = n) || void 0 === w
                                          ? void 0
                                          : w.ctrlKey,
                                      altKey:
                                        null === (E = n) || void 0 === E
                                          ? void 0
                                          : E.altKey,
                                      shiftKey:
                                        null === (x = n) || void 0 === x
                                          ? void 0
                                          : x.shiftKey,
                                      metaKey:
                                        null === (S = n) || void 0 === S
                                          ? void 0
                                          : S.metaKey,
                                      button:
                                        null === (k = n) || void 0 === k
                                          ? void 0
                                          : k.button,
                                      buttons:
                                        null === (O = n) || void 0 === O
                                          ? void 0
                                          : O.buttons,
                                      clientX:
                                        null === (j = n) || void 0 === j
                                          ? void 0
                                          : j.clientX,
                                      clientY:
                                        null === (I = n) || void 0 === I
                                          ? void 0
                                          : I.clientY,
                                      screenX:
                                        null === (L = n) || void 0 === L
                                          ? void 0
                                          : L.screenX,
                                      screenY:
                                        null === (N = n) || void 0 === N
                                          ? void 0
                                          : N.screenY,
                                      touches:
                                        null === (A = n) || void 0 === A
                                          ? void 0
                                          : A.touches,
                                    })),
                                    (r = it(n));
                                } catch (t) {
                                  console.warn(t);
                                }
                              f.stackDeclare(t, r);
                            }),
                            r
                              ? f.executeExpression(e)
                              : null === (a = f.executeStatement(e)) ||
                                void 0 === a
                              ? void 0
                              : a.result
                          );
                        }
                      }
                    );
                  },
                },
                {
                  key: "stackDeclare",
                  value: function (t, e) {
                    var r = this;
                    if ("Identifier" === t.type) this.stack.state[t.name] = e;
                    else if ("ArrayPattern" === t.type)
                      Dn(e),
                        t.elements.forEach(function (t, n) {
                          "RestElement" === t.type
                            ? r.stackDeclare(t.argument, e.slice(n))
                            : r.stackDeclare(t, null == e ? void 0 : e[n]);
                        });
                    else {
                      if ("ObjectPattern" !== t.type)
                        throw new Error("Unknown pattern type: " + t.type);
                      Dn(e);
                      var n = new Set();
                      t.properties.forEach(function (t) {
                        if ("RestElement" === t.type) {
                          var o = {};
                          _(e) &&
                            (Object.assign(o, e),
                            n.forEach(function (t) {
                              return delete o[t];
                            })),
                            r.stackDeclare(t.argument, o);
                        } else r.stackDeclare(t.value, null == e ? void 0 : e[t.key.name]), n.add(t.key.name);
                      });
                    }
                  },
                },
                {
                  key: "executeStatement",
                  value: function (t) {
                    var e = this;
                    if (!t || "EmptyStatement" === t.type) return null;
                    if ("VariableDeclaration" === t.type)
                      t.declarations.forEach(function (t) {
                        if ("VariableDeclarator" !== t.type)
                          throw new Error(
                            "Unknown variable declaration type '" + t.type + "'"
                          );
                        e.stackDeclare(Vn(t.id), e.executeExpression(t.init));
                      });
                    else {
                      if ("ReturnStatement" === t.type)
                        return { result: this.executeExpression(t.argument) };
                      if ("FunctionDeclaration" === t.type)
                        this.stackDeclare(
                          Kn(t.id),
                          this.createFunction(t.params, t.body, t.expression)
                        );
                      else if ("ExpressionStatement" === t.type)
                        this.executeExpression(t.expression);
                      else if (
                        "BlockStatement" === t.type ||
                        "Program" === t.type
                      )
                        for (
                          var r = t.body, n = this.newStack(), o = 0;
                          o < r.length;
                          o++
                        ) {
                          var i = n.executeStatement(r[o]);
                          if (i) return i;
                        }
                      else if ("ForStatement" === t.type) {
                        var a = this.newStack();
                        for (
                          a.executeStatement(t.init);
                          this.vm.loopLimit-- > 0 &&
                          (!t.test || a.executeExpression(t.test));

                        ) {
                          var c = a.executeStatement(t.body);
                          if (c) {
                            if (c.break) break;
                            if (!c.continue) return c;
                          }
                          a.executeExpression(t.update);
                        }
                        if (this.vm.loopLimit <= 0)
                          throw new Error("Exceeded loop limit");
                      } else if ("ForOfStatement" === t.type) {
                        var u = this.newStack(),
                          s = u.executeExpression(t.right);
                        Dn(s);
                        var l,
                          f = dn(s);
                        try {
                          var h = function () {
                            var r = l.value;
                            if (e.vm.loopLimit-- <= 0)
                              throw new Error("Exceeded loop limit");
                            if ("VariableDeclaration" === t.left.type) {
                              if (1 !== t.left.declarations.length)
                                throw new Error("Invalid for-of statement");
                              t.left.declarations.forEach(function (t) {
                                if ("VariableDeclarator" !== t.type)
                                  throw new Error(
                                    "Unknown variable declaration type '" +
                                      t.type +
                                      "'"
                                  );
                                e.stackDeclare(Vn(t.id), r);
                              });
                            } else {
                              var n = e.resolveMemberExpression(t.left, {
                                left: !0,
                              });
                              n.obj[n.key] = r;
                            }
                            var o = u.executeStatement(t.body);
                            if (o) {
                              if (o.break) return "break";
                              if (!o.continue) return { v: o };
                            }
                          };
                          for (f.s(); !(l = f.n()).done; ) {
                            var p = h();
                            if ("break" === p) break;
                            if ("object" === On(p)) return p.v;
                          }
                        } catch (t) {
                          f.e(t);
                        } finally {
                          f.f();
                        }
                      } else if ("WhileStatement" === t.type) {
                        for (
                          var d = this.newStack();
                          this.vm.loopLimit-- > 0 &&
                          d.executeExpression(t.test);

                        ) {
                          var y = d.executeStatement(t.body);
                          if (y) {
                            if (y.break) break;
                            if (!y.continue) return y;
                          }
                        }
                        if (this.vm.loopLimit <= 0)
                          throw new Error("Exceeded loop limit");
                      } else if ("IfStatement" === t.type) {
                        var v = this.executeExpression(t.test),
                          m = this.newStack(),
                          g = v
                            ? m.executeStatement(t.consequent)
                            : m.executeStatement(t.alternate);
                        if (g) return g;
                      } else {
                        if ("BreakStatement" === t.type) return { break: !0 };
                        if ("ContinueStatement" === t.type)
                          return { continue: !0 };
                        if ("ThrowStatement" === t.type)
                          throw this.executeExpression(t.argument);
                        if ("TryStatement" === t.type)
                          try {
                            var b = this.newStack().executeStatement(t.block);
                            if (b) return b;
                          } catch (e) {
                            if (!this.vm.alive || !t.handler) return null;
                            if ("CatchClause" !== t.handler.type)
                              throw new Error(
                                "Unknown try statement handler type '" +
                                  t.handler.type +
                                  "'"
                              );
                            var w = this.newStack();
                            t.handler.param &&
                              w.stackDeclare(
                                Kn(t.handler.param),
                                it(
                                  e instanceof Error
                                    ? {
                                        name: null == e ? void 0 : e.name,
                                        message: null == e ? void 0 : e.message,
                                        toString: function () {
                                          return e.toString();
                                        },
                                      }
                                    : e
                                )
                              );
                            var E = w.executeStatement(t.handler.body);
                            if (E) return E;
                          } finally {
                            this.vm.alive &&
                              this.newStack().executeStatement(t.finalizer);
                          }
                        else {
                          if ("SwitchStatement" !== t.type)
                            throw new Error(
                              "Unknown token type '" + t.type + "'"
                            );
                          var x,
                            S = this.executeExpression(t.discriminant),
                            k = this.newStack(),
                            O = !1,
                            j = dn(t.cases);
                          try {
                            for (j.s(); !(x = j.n()).done; ) {
                              var I = x.value;
                              if ("SwitchCase" !== I.type)
                                throw new Error(
                                  "Unknown switch case type '" + I.type + "'"
                                );
                              if (!O && I.test) {
                                if (k.executeExpression(I.test) !== S) continue;
                                O = !0;
                              }
                              if (O) {
                                var L,
                                  N = !1,
                                  A = dn(I.consequent);
                                try {
                                  for (A.s(); !(L = A.n()).done; ) {
                                    var _ = L.value,
                                      T = k.executeStatement(_);
                                    if (T) {
                                      if (T.break) {
                                        N = !0;
                                        break;
                                      }
                                      return T;
                                    }
                                  }
                                } catch (t) {
                                  A.e(t);
                                } finally {
                                  A.f();
                                }
                                if (N) break;
                              }
                            }
                          } catch (t) {
                            j.e(t);
                          } finally {
                            j.f();
                          }
                        }
                      }
                    }
                    return null;
                  },
                },
              ]),
              t
            );
          })(),
          Zn = (function () {
            function t(e) {
              bn(this, t);
              var r = e.near,
                n = e.code,
                o = e.setReactState,
                i = e.cache,
                a = e.refreshCache,
                c = e.confirmTransactions,
                u = e.depth,
                s = e.widgetSrc,
                l = e.requestCommit,
                f = e.version,
                h = e.widgetConfigs;
              if (!n) throw new Error("Not a program");
              (this.alive = !0),
                (this.near = r),
                (this.code = n),
                (this.setReactState = function (t) {
                  return o(it(t));
                }),
                (this.cache = i),
                (this.refreshCache = a),
                (this.confirmTransactions = c),
                (this.depth = u),
                (this.widgetSrc = s),
                (this.requestCommit = l),
                (this.version = f),
                (this.cachedStyledComponents = new Map()),
                (this.widgetConfigs = h),
                (this.timeouts = new Set()),
                (this.intervals = new Set());
            }
            return (
              En(t, [
                {
                  key: "stop",
                  value: function () {
                    (this.alive = !1),
                      this.timeouts.forEach(function (t) {
                        return clearTimeout(t);
                      }),
                      this.intervals.forEach(function (t) {
                        return clearInterval(t);
                      });
                  },
                },
                {
                  key: "cachedPromise",
                  value: function (t, e) {
                    var r = this;
                    return it(
                      t({
                        onInvalidate: function () {
                          r.alive && r.refreshCache();
                        },
                        subscribe: !!e,
                      })
                    );
                  },
                },
                {
                  key: "cachedSocialGet",
                  value: function (t, e, r, n) {
                    var o = this;
                    return (
                      (t = Array.isArray(t) ? t : [t]),
                      this.cachedPromise(
                        function (i) {
                          return o.cache.socialGet(o.near, t, e, r, n, i);
                        },
                        null == n ? void 0 : n.subscribe
                      )
                    );
                  },
                },
                {
                  key: "storageGet",
                  value: function (t, e) {
                    var r = this;
                    return this.cachedPromise(function (n) {
                      return r.cache.localStorageGet(t, e, n);
                    });
                  },
                },
                {
                  key: "storageSet",
                  value: function (t, e, r) {
                    return this.cache.localStorageSet(t, e, r);
                  },
                },
                {
                  key: "cachedSocialKeys",
                  value: function (t, e, r) {
                    var n = this;
                    return (
                      (t = Array.isArray(t) ? t : [t]),
                      this.cachedPromise(
                        function (o) {
                          return n.cache.cachedViewCall(
                            n.near,
                            n.near.config.contractName,
                            "keys",
                            { keys: t, options: r },
                            e,
                            o
                          );
                        },
                        null == r ? void 0 : r.subscribe
                      )
                    );
                  },
                },
                {
                  key: "asyncNearView",
                  value: function (t, e, r, n) {
                    return this.near.viewCall(t, e, r, n);
                  },
                },
                {
                  key: "cachedNearView",
                  value: function (t, e, r, n, o) {
                    var i = this;
                    return this.cachedPromise(function (o) {
                      return i.cache.cachedViewCall(i.near, t, e, r, n, o);
                    }, o);
                  },
                },
                {
                  key: "cachedNearBlock",
                  value: function (t, e) {
                    var r = this;
                    return this.cachedPromise(function (e) {
                      return r.cache.cachedBlock(r.near, t, e);
                    }, e);
                  },
                },
                {
                  key: "asyncFetch",
                  value: function (t, e) {
                    return this.cache.asyncFetch(t, e);
                  },
                },
                {
                  key: "cachedFetch",
                  value: function (t, e) {
                    var r = this;
                    return this.cachedPromise(
                      function (n) {
                        return r.cache.cachedFetch(t, e, n);
                      },
                      null == e ? void 0 : e.subscribe
                    );
                  },
                },
                {
                  key: "cachedIndex",
                  value: function (t, e, r) {
                    var n = this;
                    return this.cachedPromise(
                      function (o) {
                        return n.cache.socialIndex(n.near, t, e, r, o);
                      },
                      null == r ? void 0 : r.subscribe
                    );
                  },
                },
                {
                  key: "useCache",
                  value: function (t, e, r) {
                    var n = this;
                    return this.cachedPromise(
                      function (r) {
                        return n.cache.cachedCustomPromise(
                          { widgetSrc: n.widgetSrc, dataKey: e },
                          t,
                          r
                        );
                      },
                      null == r ? void 0 : r.subscribe
                    );
                  },
                },
                {
                  key: "socialSet",
                  value: function (t, e) {
                    return this.requestCommit({
                      data: t,
                      force: null == e ? void 0 : e.force,
                      onCommit: null == e ? void 0 : e.onCommit,
                      onCancel: null == e ? void 0 : e.onCancel,
                    });
                  },
                },
                {
                  key: "renderCode",
                  value: function (t) {
                    var e = t.props,
                      n = t.context,
                      o = t.state,
                      i = t.forwardedProps;
                    if (this.depth >= 32) return "Too deep";
                    (this.gIndex = 0),
                      (this.state = {
                        props: it(e),
                        context: n,
                        state: it(o),
                        nacl: An,
                        elliptic: _n,
                        nanoid: Tn,
                      }),
                      (this.forwardedProps = i),
                      (this.loopLimit = 1e6),
                      (this.vmStack = new Wn(this, void 0, this.state));
                    var a = this.vmStack.executeStatement(this.code);
                    if (null != a && a.break)
                      throw new Error("BreakStatement outside of a loop");
                    if (null != a && a.continue)
                      throw new Error("ContinueStatement outside of a loop");
                    var c = null == a ? void 0 : a.result;
                    return ot(c) || "string" == typeof c || "number" == typeof c
                      ? c
                      : r().createElement(
                          "pre",
                          null,
                          JSON.stringify(c, void 0, 2)
                        );
                  },
                },
              ]),
              t
            );
          })();
        const Qn = require("react-error-boundary"),
          to = require("react-bootstrap-typeahead/types/utils");
        function eo(t) {
          return (
            (eo =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            eo(t)
          );
        }
        var ro = ["src", "code", "depth", "config", "props"];
        function no(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function oo(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? no(Object(r), !0).forEach(function (e) {
                  io(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
              : no(Object(r)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(r, e)
                  );
                });
          }
          return t;
        }
        function io(t, e, r) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" !== eo(t) || null === t) return t;
                var r = t[Symbol.toPrimitive];
                if (void 0 !== r) {
                  var n = r.call(t, "string");
                  if ("object" !== eo(n)) return n;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return String(t);
              })(t);
              return "symbol" === eo(e) ? e : String(e);
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function ao(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              var r =
                null == t
                  ? null
                  : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
              if (null != r) {
                var n,
                  o,
                  i,
                  a,
                  c = [],
                  u = !0,
                  s = !1;
                try {
                  if (((i = (r = r.call(t)).next), 0 === e)) {
                    if (Object(r) !== r) return;
                    u = !1;
                  } else
                    for (
                      ;
                      !(u = (n = i.call(r)).done) &&
                      (c.push(n.value), c.length !== e);
                      u = !0
                    );
                } catch (t) {
                  (s = !0), (o = t);
                } finally {
                  try {
                    if (
                      !u &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw o;
                  }
                }
                return c;
              }
            })(t, e) ||
            co(t, e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function co(t, e) {
          if (t) {
            if ("string" == typeof t) return uo(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            return (
              "Object" === r && t.constructor && (r = t.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(t)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? uo(t, e)
                : void 0
            );
          }
        }
        function uo(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        var so = { ecmaVersion: 13, allowReturnOutsideFunction: !0 },
          lo = {},
          fo = Qt.Parser.extend(ee()()),
          ho = r().forwardRef(function (t, n) {
            var o = t.src,
              i = t.code,
              a = t.depth,
              c = t.config,
              s = t.props,
              l = (function (t, e) {
                if (null == t) return {};
                var r,
                  n,
                  o = (function (t, e) {
                    if (null == t) return {};
                    var r,
                      n,
                      o = {},
                      i = Object.keys(t);
                    for (n = 0; n < i.length; n++)
                      (r = i[n]), e.indexOf(r) >= 0 || (o[r] = t[r]);
                    return o;
                  })(t, e);
                if (Object.getOwnPropertySymbols) {
                  var i = Object.getOwnPropertySymbols(t);
                  for (n = 0; n < i.length; n++)
                    (r = i[n]),
                      e.indexOf(r) >= 0 ||
                        (Object.prototype.propertyIsEnumerable.call(t, r) &&
                          (o[r] = t[r]));
                }
                return o;
              })(t, ro),
              f = ao((0, e.useState)(0), 2),
              h = f[0],
              p = f[1],
              d = ao((0, e.useState)(null), 2),
              y = d[0],
              v = d[1],
              m = ao((0, e.useState)(null), 2),
              g = m[0],
              w = m[1],
              E = ao((0, e.useState)(void 0), 2),
              x = E[0],
              S = E[1],
              k = ao((0, e.useState)(0), 2),
              O = k[0],
              j = k[1],
              N = ao((0, e.useState)(null), 2),
              A = N[0],
              P = N[1],
              C = ao((0, e.useState)({}), 2),
              B = C[0],
              U = C[1],
              F = ao((0, e.useState)(null), 2),
              R = F[0],
              M = F[1],
              q = ao((0, e.useState)(null), 2),
              G = q[0],
              D = q[1],
              J = ao((0, e.useState)(null), 2),
              $ = J[0],
              z = J[1],
              K = ao((0, e.useState)(null), 2),
              X = K[0],
              Y = K[1],
              V = ao((0, e.useState)(null), 2),
              H = V[0],
              W = V[1],
              Z = ao((0, e.useState)(null), 2),
              Q = Z[0],
              tt = Z[1],
              et = pr(),
              rt = _t(),
              nt = Zt(),
              ot = ao((0, e.useState)(null), 2),
              ct = ot[0],
              ut = ot[1];
            (0, e.useEffect)(
              function () {
                var t = c ? (Array.isArray(c) ? c : [c]) : [];
                at(t, H) || W(t);
              },
              [c, H]
            ),
              (0, e.useEffect)(
                function () {
                  var t = (function (t, e, r) {
                    var n,
                      o = t ? { src: t } : e ? { code: e } : null,
                      i = (function (t, e) {
                        var r =
                          ("undefined" != typeof Symbol &&
                            t[Symbol.iterator]) ||
                          t["@@iterator"];
                        if (!r) {
                          if (Array.isArray(t) || (r = co(t))) {
                            r && (t = r);
                            var n = 0,
                              o = function () {};
                            return {
                              s: o,
                              n: function () {
                                return n >= t.length
                                  ? { done: !0 }
                                  : { done: !1, value: t[n++] };
                              },
                              e: function (t) {
                                throw t;
                              },
                              f: o,
                            };
                          }
                          throw new TypeError(
                            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                          );
                        }
                        var i,
                          a = !0,
                          c = !1;
                        return {
                          s: function () {
                            r = r.call(t);
                          },
                          n: function () {
                            var t = r.next();
                            return (a = t.done), t;
                          },
                          e: function (t) {
                            (c = !0), (i = t);
                          },
                          f: function () {
                            try {
                              a || null == r.return || r.return();
                            } finally {
                              if (c) throw i;
                            }
                          },
                        };
                      })(r || []);
                    try {
                      for (i.s(); !(n = i.n()).done; ) {
                        var a,
                          c = n.value;
                        if (null !== (a = o) && void 0 !== a && a.src) {
                          var u,
                            s = o.src,
                            l =
                              _(null == c ? void 0 : c.redirectMap) &&
                              c.redirectMap[s];
                          if (!l)
                            try {
                              l =
                                (0, to.isFunction)(
                                  null == c ? void 0 : c.redirect
                                ) && c.redirect(s);
                            } catch (t) {}
                          if (T(l)) o = { src: l };
                          else if (
                            T(
                              null === (u = l) || void 0 === u ? void 0 : u.code
                            )
                          )
                            return { code: l.code };
                        }
                      }
                    } catch (t) {
                      i.e(t);
                    } finally {
                      i.f();
                    }
                    return o;
                  })(o, i, H);
                  at(t, Q) || tt(t);
                },
                [o, i, H, Q]
              ),
              (0, e.useEffect)(
                function () {
                  if (rt)
                    if (null != Q && Q.src) {
                      var t = Q.src,
                        e = ao(t.split("@"), 2),
                        r = e[0],
                        n = e[1],
                        o = et.socialGet(
                          rt,
                          r.toString(),
                          !1,
                          n,
                          void 0,
                          function () {
                            p(h + 1);
                          }
                        );
                      v(o), w(t);
                    } else null != Q && Q.code && (v(Q.code), w(null));
                },
                [rt, Q, h]
              ),
              (0, e.useEffect)(
                function () {
                  if ((M(null), ut(null), y))
                    try {
                      var t = (function (t) {
                        return t in lo ? lo[t] : (lo[t] = fo.parse(t, so));
                      })(y);
                      P({ parsedCode: t });
                    } catch (t) {
                      ut(
                        r().createElement(
                          "div",
                          { className: "alert alert-danger" },
                          "Compilation error:",
                          r().createElement("pre", null, t.message),
                          r().createElement("pre", null, t.stack)
                        )
                      ),
                        console.error(t);
                    }
                  else
                    void 0 === y &&
                      ut(
                        r().createElement(
                          "div",
                          { className: "alert alert-danger" },
                          'Source code for "',
                          g,
                          '" is not found'
                        )
                      );
                },
                [y, g]
              );
            var st = (0, e.useCallback)(
                function (t) {
                  if (!rt || !t || 0 === t.length) return null;
                  (t = t.map(function (t) {
                    return {
                      contractName: t.contractName,
                      methodName: t.methodName,
                      args: t.args || {},
                      deposit: t.deposit ? u()(t.deposit) : u()(0),
                      gas: t.gas ? u()(t.gas) : b.mul(30),
                    };
                  })),
                    console.log("confirm txs", t),
                    D(t);
                },
                [rt]
              ),
              lt = (0, e.useCallback)(
                function (t) {
                  if (!rt) return null;
                  console.log("commit requested", t), z(t);
                },
                [rt]
              );
            return (
              (0, e.useEffect)(
                function () {
                  if (rt && A) {
                    S(void 0);
                    var t = new Zn({
                      near: rt,
                      code: A.parsedCode,
                      setReactState: S,
                      cache: et,
                      refreshCache: function () {
                        j(function (t) {
                          return t + 1;
                        });
                      },
                      confirmTransactions: st,
                      depth: a,
                      widgetSrc: g,
                      requestCommit: lt,
                      version: je()(),
                      widgetConfigs: H,
                    });
                    return (
                      M(t),
                      function () {
                        t.stop();
                      }
                    );
                  }
                },
                [g, rt, A, a, lt, st, H]
              ),
              (0, e.useEffect)(
                function () {
                  rt &&
                    U({
                      loading: !1,
                      accountId: null != nt ? nt : null,
                      widgetSrc: g,
                      networkId: rt.config.networkId,
                    });
                },
                [rt, nt, g]
              ),
              (0, e.useLayoutEffect)(
                function () {
                  if (R) {
                    var t = {
                      props: s || {},
                      context: B,
                      state: x,
                      cacheNonce: O,
                      version: R.version,
                      forwardedProps: oo(oo({}, l), {}, { ref: n }),
                    };
                    if (!at(t, X)) {
                      Y(it(t));
                      try {
                        var e;
                        ut(
                          null !== (e = R.renderCode(t)) && void 0 !== e
                            ? e
                            : "Execution failed"
                        );
                      } catch (t) {
                        ut(
                          r().createElement(
                            "div",
                            { className: "alert alert-danger" },
                            "Execution error:",
                            r().createElement("pre", null, t.message),
                            r().createElement("pre", null, t.stack)
                          )
                        ),
                          console.error(t);
                      }
                    }
                  }
                },
                [R, s, B, x, O, X, n, l]
              ),
              null != ct
                ? r().createElement(
                    Qn.ErrorBoundary,
                    {
                      FallbackComponent: L,
                      onReset: function () {
                        ut(null);
                      },
                      resetKeys: [ct],
                    },
                    r().createElement(
                      r().Fragment,
                      null,
                      ct,
                      G &&
                        r().createElement(Ne, {
                          transactions: G,
                          onHide: function () {
                            return D(null);
                          },
                        }),
                      $ &&
                        r().createElement(kr, {
                          show: !0,
                          widgetSrc: g,
                          data: $.data,
                          force: $.force,
                          onHide: function () {
                            return z(null);
                          },
                          onCommit: $.onCommit,
                          onCancel: $.onCancel,
                        })
                    )
                  )
                : I
            );
          });
      })(),
      o
    );
  })()
);
