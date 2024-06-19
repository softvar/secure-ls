/*!
 * secure-ls - v1.2.6
 * URL - https://github.com/softvar/secure-ls
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016-2024 Varun Malhotra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * Dependencies used -
 *  1. crypto-js - ^4.2.0
 *  2. lz-string - ^1.5.0
 */
!(function (t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
      ? define([], e)
      : 'object' == typeof exports
        ? (exports.SecureLS = e())
        : (t.SecureLS = e());
})(this, () =>
  (() => {
    var t = {
        955: function (t, e, r) {
          var i;
          t.exports =
            ((i = r(21)),
            r(754),
            r(636),
            r(506),
            r(165),
            (function () {
              var t = i,
                e = t.lib.BlockCipher,
                r = t.algo,
                n = [],
                o = [],
                s = [],
                c = [],
                a = [],
                h = [],
                l = [],
                f = [],
                u = [],
                p = [];
              !(function () {
                for (var t = [], e = 0; e < 256; e++) t[e] = e < 128 ? e << 1 : (e << 1) ^ 283;
                var r = 0,
                  i = 0;
                for (e = 0; e < 256; e++) {
                  var d = i ^ (i << 1) ^ (i << 2) ^ (i << 3) ^ (i << 4);
                  (d = (d >>> 8) ^ (255 & d) ^ 99), (n[r] = d), (o[d] = r);
                  var y = t[r],
                    _ = t[y],
                    g = t[_],
                    v = (257 * t[d]) ^ (16843008 * d);
                  (s[r] = (v << 24) | (v >>> 8)),
                    (c[r] = (v << 16) | (v >>> 16)),
                    (a[r] = (v << 8) | (v >>> 24)),
                    (h[r] = v),
                    (v = (16843009 * g) ^ (65537 * _) ^ (257 * y) ^ (16843008 * r)),
                    (l[d] = (v << 24) | (v >>> 8)),
                    (f[d] = (v << 16) | (v >>> 16)),
                    (u[d] = (v << 8) | (v >>> 24)),
                    (p[d] = v),
                    r ? ((r = y ^ t[t[t[g ^ y]]]), (i ^= t[t[i]])) : (r = i = 1);
                }
              })();
              var d = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                y = (r.AES = e.extend({
                  _doReset: function () {
                    if (!this._nRounds || this._keyPriorReset !== this._key) {
                      for (
                        var t = (this._keyPriorReset = this._key),
                          e = t.words,
                          r = t.sigBytes / 4,
                          i = 4 * ((this._nRounds = r + 6) + 1),
                          o = (this._keySchedule = []),
                          s = 0;
                        s < i;
                        s++
                      )
                        s < r
                          ? (o[s] = e[s])
                          : ((h = o[s - 1]),
                            s % r
                              ? r > 6 &&
                                s % r == 4 &&
                                (h =
                                  (n[h >>> 24] << 24) |
                                  (n[(h >>> 16) & 255] << 16) |
                                  (n[(h >>> 8) & 255] << 8) |
                                  n[255 & h])
                              : ((h =
                                  (n[(h = (h << 8) | (h >>> 24)) >>> 24] << 24) |
                                  (n[(h >>> 16) & 255] << 16) |
                                  (n[(h >>> 8) & 255] << 8) |
                                  n[255 & h]),
                                (h ^= d[(s / r) | 0] << 24)),
                            (o[s] = o[s - r] ^ h));
                      for (var c = (this._invKeySchedule = []), a = 0; a < i; a++) {
                        if (((s = i - a), a % 4)) var h = o[s];
                        else h = o[s - 4];
                        c[a] =
                          a < 4 || s <= 4
                            ? h
                            : l[n[h >>> 24]] ^ f[n[(h >>> 16) & 255]] ^ u[n[(h >>> 8) & 255]] ^ p[n[255 & h]];
                      }
                    }
                  },
                  encryptBlock: function (t, e) {
                    this._doCryptBlock(t, e, this._keySchedule, s, c, a, h, n);
                  },
                  decryptBlock: function (t, e) {
                    var r = t[e + 1];
                    (t[e + 1] = t[e + 3]),
                      (t[e + 3] = r),
                      this._doCryptBlock(t, e, this._invKeySchedule, l, f, u, p, o),
                      (r = t[e + 1]),
                      (t[e + 1] = t[e + 3]),
                      (t[e + 3] = r);
                  },
                  _doCryptBlock: function (t, e, r, i, n, o, s, c) {
                    for (
                      var a = this._nRounds,
                        h = t[e] ^ r[0],
                        l = t[e + 1] ^ r[1],
                        f = t[e + 2] ^ r[2],
                        u = t[e + 3] ^ r[3],
                        p = 4,
                        d = 1;
                      d < a;
                      d++
                    ) {
                      var y = i[h >>> 24] ^ n[(l >>> 16) & 255] ^ o[(f >>> 8) & 255] ^ s[255 & u] ^ r[p++],
                        _ = i[l >>> 24] ^ n[(f >>> 16) & 255] ^ o[(u >>> 8) & 255] ^ s[255 & h] ^ r[p++],
                        g = i[f >>> 24] ^ n[(u >>> 16) & 255] ^ o[(h >>> 8) & 255] ^ s[255 & l] ^ r[p++],
                        v = i[u >>> 24] ^ n[(h >>> 16) & 255] ^ o[(l >>> 8) & 255] ^ s[255 & f] ^ r[p++];
                      (h = y), (l = _), (f = g), (u = v);
                    }
                    (y =
                      ((c[h >>> 24] << 24) | (c[(l >>> 16) & 255] << 16) | (c[(f >>> 8) & 255] << 8) | c[255 & u]) ^
                      r[p++]),
                      (_ =
                        ((c[l >>> 24] << 24) | (c[(f >>> 16) & 255] << 16) | (c[(u >>> 8) & 255] << 8) | c[255 & h]) ^
                        r[p++]),
                      (g =
                        ((c[f >>> 24] << 24) | (c[(u >>> 16) & 255] << 16) | (c[(h >>> 8) & 255] << 8) | c[255 & l]) ^
                        r[p++]),
                      (v =
                        ((c[u >>> 24] << 24) | (c[(h >>> 16) & 255] << 16) | (c[(l >>> 8) & 255] << 8) | c[255 & f]) ^
                        r[p++]),
                      (t[e] = y),
                      (t[e + 1] = _),
                      (t[e + 2] = g),
                      (t[e + 3] = v);
                  },
                  keySize: 8,
                }));
              t.AES = e._createHelper(y);
            })(),
            i.AES);
        },
        165: function (t, e, r) {
          var i, n, o, s, c, a, h, l, f, u, p, d, y, _, g, v, m, S, B;
          t.exports =
            ((i = r(21)),
            r(506),
            void (
              i.lib.Cipher ||
              ((n = i),
              (o = n.lib),
              (s = o.Base),
              (c = o.WordArray),
              (a = o.BufferedBlockAlgorithm),
              (h = n.enc),
              h.Utf8,
              (l = h.Base64),
              (f = n.algo.EvpKDF),
              (u = o.Cipher =
                a.extend({
                  cfg: s.extend(),
                  createEncryptor: function (t, e) {
                    return this.create(this._ENC_XFORM_MODE, t, e);
                  },
                  createDecryptor: function (t, e) {
                    return this.create(this._DEC_XFORM_MODE, t, e);
                  },
                  init: function (t, e, r) {
                    (this.cfg = this.cfg.extend(r)), (this._xformMode = t), (this._key = e), this.reset();
                  },
                  reset: function () {
                    a.reset.call(this), this._doReset();
                  },
                  process: function (t) {
                    return this._append(t), this._process();
                  },
                  finalize: function (t) {
                    return t && this._append(t), this._doFinalize();
                  },
                  keySize: 4,
                  ivSize: 4,
                  _ENC_XFORM_MODE: 1,
                  _DEC_XFORM_MODE: 2,
                  _createHelper: (function () {
                    function t(t) {
                      return 'string' == typeof t ? B : m;
                    }
                    return function (e) {
                      return {
                        encrypt: function (r, i, n) {
                          return t(i).encrypt(e, r, i, n);
                        },
                        decrypt: function (r, i, n) {
                          return t(i).decrypt(e, r, i, n);
                        },
                      };
                    };
                  })(),
                })),
              (o.StreamCipher = u.extend({
                _doFinalize: function () {
                  return this._process(!0);
                },
                blockSize: 1,
              })),
              (p = n.mode = {}),
              (d = o.BlockCipherMode =
                s.extend({
                  createEncryptor: function (t, e) {
                    return this.Encryptor.create(t, e);
                  },
                  createDecryptor: function (t, e) {
                    return this.Decryptor.create(t, e);
                  },
                  init: function (t, e) {
                    (this._cipher = t), (this._iv = e);
                  },
                })),
              (y = p.CBC =
                (function () {
                  var t = d.extend();
                  function e(t, e, r) {
                    var i,
                      n = this._iv;
                    n ? ((i = n), (this._iv = void 0)) : (i = this._prevBlock);
                    for (var o = 0; o < r; o++) t[e + o] ^= i[o];
                  }
                  return (
                    (t.Encryptor = t.extend({
                      processBlock: function (t, r) {
                        var i = this._cipher,
                          n = i.blockSize;
                        e.call(this, t, r, n), i.encryptBlock(t, r), (this._prevBlock = t.slice(r, r + n));
                      },
                    })),
                    (t.Decryptor = t.extend({
                      processBlock: function (t, r) {
                        var i = this._cipher,
                          n = i.blockSize,
                          o = t.slice(r, r + n);
                        i.decryptBlock(t, r), e.call(this, t, r, n), (this._prevBlock = o);
                      },
                    })),
                    t
                  );
                })()),
              (_ = (n.pad = {}).Pkcs7 =
                {
                  pad: function (t, e) {
                    for (
                      var r = 4 * e, i = r - (t.sigBytes % r), n = (i << 24) | (i << 16) | (i << 8) | i, o = [], s = 0;
                      s < i;
                      s += 4
                    )
                      o.push(n);
                    var a = c.create(o, i);
                    t.concat(a);
                  },
                  unpad: function (t) {
                    var e = 255 & t.words[(t.sigBytes - 1) >>> 2];
                    t.sigBytes -= e;
                  },
                }),
              (o.BlockCipher = u.extend({
                cfg: u.cfg.extend({ mode: y, padding: _ }),
                reset: function () {
                  var t;
                  u.reset.call(this);
                  var e = this.cfg,
                    r = e.iv,
                    i = e.mode;
                  this._xformMode == this._ENC_XFORM_MODE
                    ? (t = i.createEncryptor)
                    : ((t = i.createDecryptor), (this._minBufferSize = 1)),
                    this._mode && this._mode.__creator == t
                      ? this._mode.init(this, r && r.words)
                      : ((this._mode = t.call(i, this, r && r.words)), (this._mode.__creator = t));
                },
                _doProcessBlock: function (t, e) {
                  this._mode.processBlock(t, e);
                },
                _doFinalize: function () {
                  var t,
                    e = this.cfg.padding;
                  return (
                    this._xformMode == this._ENC_XFORM_MODE
                      ? (e.pad(this._data, this.blockSize), (t = this._process(!0)))
                      : ((t = this._process(!0)), e.unpad(t)),
                    t
                  );
                },
                blockSize: 4,
              })),
              (g = o.CipherParams =
                s.extend({
                  init: function (t) {
                    this.mixIn(t);
                  },
                  toString: function (t) {
                    return (t || this.formatter).stringify(this);
                  },
                })),
              (v = (n.format = {}).OpenSSL =
                {
                  stringify: function (t) {
                    var e = t.ciphertext,
                      r = t.salt;
                    return (r ? c.create([1398893684, 1701076831]).concat(r).concat(e) : e).toString(l);
                  },
                  parse: function (t) {
                    var e,
                      r = l.parse(t),
                      i = r.words;
                    return (
                      1398893684 == i[0] &&
                        1701076831 == i[1] &&
                        ((e = c.create(i.slice(2, 4))), i.splice(0, 4), (r.sigBytes -= 16)),
                      g.create({ ciphertext: r, salt: e })
                    );
                  },
                }),
              (m = o.SerializableCipher =
                s.extend({
                  cfg: s.extend({ format: v }),
                  encrypt: function (t, e, r, i) {
                    i = this.cfg.extend(i);
                    var n = t.createEncryptor(r, i),
                      o = n.finalize(e),
                      s = n.cfg;
                    return g.create({
                      ciphertext: o,
                      key: r,
                      iv: s.iv,
                      algorithm: t,
                      mode: s.mode,
                      padding: s.padding,
                      blockSize: t.blockSize,
                      formatter: i.format,
                    });
                  },
                  decrypt: function (t, e, r, i) {
                    return (
                      (i = this.cfg.extend(i)),
                      (e = this._parse(e, i.format)),
                      t.createDecryptor(r, i).finalize(e.ciphertext)
                    );
                  },
                  _parse: function (t, e) {
                    return 'string' == typeof t ? e.parse(t, this) : t;
                  },
                })),
              (S = (n.kdf = {}).OpenSSL =
                {
                  execute: function (t, e, r, i, n) {
                    if ((i || (i = c.random(8)), n)) o = f.create({ keySize: e + r, hasher: n }).compute(t, i);
                    else var o = f.create({ keySize: e + r }).compute(t, i);
                    var s = c.create(o.words.slice(e), 4 * r);
                    return (o.sigBytes = 4 * e), g.create({ key: o, iv: s, salt: i });
                  },
                }),
              (B = o.PasswordBasedCipher =
                m.extend({
                  cfg: m.cfg.extend({ kdf: S }),
                  encrypt: function (t, e, r, i) {
                    var n = (i = this.cfg.extend(i)).kdf.execute(r, t.keySize, t.ivSize, i.salt, i.hasher);
                    i.iv = n.iv;
                    var o = m.encrypt.call(this, t, e, n.key, i);
                    return o.mixIn(n), o;
                  },
                  decrypt: function (t, e, r, i) {
                    (i = this.cfg.extend(i)), (e = this._parse(e, i.format));
                    var n = i.kdf.execute(r, t.keySize, t.ivSize, e.salt, i.hasher);
                    return (i.iv = n.iv), m.decrypt.call(this, t, e, n.key, i);
                  },
                })))
            ));
        },
        21: function (t, e, r) {
          var i;
          t.exports =
            ((i =
              i ||
              (function (t, e) {
                var i;
                if (
                  ('undefined' != typeof window && window.crypto && (i = window.crypto),
                  'undefined' != typeof self && self.crypto && (i = self.crypto),
                  'undefined' != typeof globalThis && globalThis.crypto && (i = globalThis.crypto),
                  !i && 'undefined' != typeof window && window.msCrypto && (i = window.msCrypto),
                  !i && void 0 !== r.g && r.g.crypto && (i = r.g.crypto),
                  !i)
                )
                  try {
                    i = r(477);
                  } catch (t) {}
                var n = function () {
                    if (i) {
                      if ('function' == typeof i.getRandomValues)
                        try {
                          return i.getRandomValues(new Uint32Array(1))[0];
                        } catch (t) {}
                      if ('function' == typeof i.randomBytes)
                        try {
                          return i.randomBytes(4).readInt32LE();
                        } catch (t) {}
                    }
                    throw new Error('Native crypto module could not be used to get secure random number.');
                  },
                  o =
                    Object.create ||
                    (function () {
                      function t() {}
                      return function (e) {
                        var r;
                        return (t.prototype = e), (r = new t()), (t.prototype = null), r;
                      };
                    })(),
                  s = {},
                  c = (s.lib = {}),
                  a = (c.Base = {
                    extend: function (t) {
                      var e = o(this);
                      return (
                        t && e.mixIn(t),
                        (e.hasOwnProperty('init') && this.init !== e.init) ||
                          (e.init = function () {
                            e.$super.init.apply(this, arguments);
                          }),
                        (e.init.prototype = e),
                        (e.$super = this),
                        e
                      );
                    },
                    create: function () {
                      var t = this.extend();
                      return t.init.apply(t, arguments), t;
                    },
                    init: function () {},
                    mixIn: function (t) {
                      for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                      t.hasOwnProperty('toString') && (this.toString = t.toString);
                    },
                    clone: function () {
                      return this.init.prototype.extend(this);
                    },
                  }),
                  h = (c.WordArray = a.extend({
                    init: function (t, e) {
                      (t = this.words = t || []), (this.sigBytes = null != e ? e : 4 * t.length);
                    },
                    toString: function (t) {
                      return (t || f).stringify(this);
                    },
                    concat: function (t) {
                      var e = this.words,
                        r = t.words,
                        i = this.sigBytes,
                        n = t.sigBytes;
                      if ((this.clamp(), i % 4))
                        for (var o = 0; o < n; o++) {
                          var s = (r[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                          e[(i + o) >>> 2] |= s << (24 - ((i + o) % 4) * 8);
                        }
                      else for (var c = 0; c < n; c += 4) e[(i + c) >>> 2] = r[c >>> 2];
                      return (this.sigBytes += n), this;
                    },
                    clamp: function () {
                      var e = this.words,
                        r = this.sigBytes;
                      (e[r >>> 2] &= 4294967295 << (32 - (r % 4) * 8)), (e.length = t.ceil(r / 4));
                    },
                    clone: function () {
                      var t = a.clone.call(this);
                      return (t.words = this.words.slice(0)), t;
                    },
                    random: function (t) {
                      for (var e = [], r = 0; r < t; r += 4) e.push(n());
                      return new h.init(e, t);
                    },
                  })),
                  l = (s.enc = {}),
                  f = (l.Hex = {
                    stringify: function (t) {
                      for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
                        var o = (e[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
                        i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16));
                      }
                      return i.join('');
                    },
                    parse: function (t) {
                      for (var e = t.length, r = [], i = 0; i < e; i += 2)
                        r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << (24 - (i % 8) * 4);
                      return new h.init(r, e / 2);
                    },
                  }),
                  u = (l.Latin1 = {
                    stringify: function (t) {
                      for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
                        var o = (e[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
                        i.push(String.fromCharCode(o));
                      }
                      return i.join('');
                    },
                    parse: function (t) {
                      for (var e = t.length, r = [], i = 0; i < e; i++)
                        r[i >>> 2] |= (255 & t.charCodeAt(i)) << (24 - (i % 4) * 8);
                      return new h.init(r, e);
                    },
                  }),
                  p = (l.Utf8 = {
                    stringify: function (t) {
                      try {
                        return decodeURIComponent(escape(u.stringify(t)));
                      } catch (t) {
                        throw new Error('Malformed UTF-8 data');
                      }
                    },
                    parse: function (t) {
                      return u.parse(unescape(encodeURIComponent(t)));
                    },
                  }),
                  d = (c.BufferedBlockAlgorithm = a.extend({
                    reset: function () {
                      (this._data = new h.init()), (this._nDataBytes = 0);
                    },
                    _append: function (t) {
                      'string' == typeof t && (t = p.parse(t)), this._data.concat(t), (this._nDataBytes += t.sigBytes);
                    },
                    _process: function (e) {
                      var r,
                        i = this._data,
                        n = i.words,
                        o = i.sigBytes,
                        s = this.blockSize,
                        c = o / (4 * s),
                        a = (c = e ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0)) * s,
                        l = t.min(4 * a, o);
                      if (a) {
                        for (var f = 0; f < a; f += s) this._doProcessBlock(n, f);
                        (r = n.splice(0, a)), (i.sigBytes -= l);
                      }
                      return new h.init(r, l);
                    },
                    clone: function () {
                      var t = a.clone.call(this);
                      return (t._data = this._data.clone()), t;
                    },
                    _minBufferSize: 0,
                  })),
                  y =
                    ((c.Hasher = d.extend({
                      cfg: a.extend(),
                      init: function (t) {
                        (this.cfg = this.cfg.extend(t)), this.reset();
                      },
                      reset: function () {
                        d.reset.call(this), this._doReset();
                      },
                      update: function (t) {
                        return this._append(t), this._process(), this;
                      },
                      finalize: function (t) {
                        return t && this._append(t), this._doFinalize();
                      },
                      blockSize: 16,
                      _createHelper: function (t) {
                        return function (e, r) {
                          return new t.init(r).finalize(e);
                        };
                      },
                      _createHmacHelper: function (t) {
                        return function (e, r) {
                          return new y.HMAC.init(t, r).finalize(e);
                        };
                      },
                    })),
                    (s.algo = {}));
                return s;
              })(Math)),
            i);
        },
        754: function (t, e, r) {
          var i, n, o;
          t.exports =
            ((i = r(21)),
            (o = (n = i).lib.WordArray),
            (n.enc.Base64 = {
              stringify: function (t) {
                var e = t.words,
                  r = t.sigBytes,
                  i = this._map;
                t.clamp();
                for (var n = [], o = 0; o < r; o += 3)
                  for (
                    var s =
                        (((e[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16) |
                        (((e[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) & 255) << 8) |
                        ((e[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255),
                      c = 0;
                    c < 4 && o + 0.75 * c < r;
                    c++
                  )
                    n.push(i.charAt((s >>> (6 * (3 - c))) & 63));
                var a = i.charAt(64);
                if (a) for (; n.length % 4; ) n.push(a);
                return n.join('');
              },
              parse: function (t) {
                var e = t.length,
                  r = this._map,
                  i = this._reverseMap;
                if (!i) {
                  i = this._reverseMap = [];
                  for (var n = 0; n < r.length; n++) i[r.charCodeAt(n)] = n;
                }
                var s = r.charAt(64);
                if (s) {
                  var c = t.indexOf(s);
                  -1 !== c && (e = c);
                }
                return (function (t, e, r) {
                  for (var i = [], n = 0, s = 0; s < e; s++)
                    if (s % 4) {
                      var c = (r[t.charCodeAt(s - 1)] << ((s % 4) * 2)) | (r[t.charCodeAt(s)] >>> (6 - (s % 4) * 2));
                      (i[n >>> 2] |= c << (24 - (n % 4) * 8)), n++;
                    }
                  return o.create(i, n);
                })(t, e, i);
              },
              _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            }),
            i.enc.Base64);
        },
        506: function (t, e, r) {
          var i, n, o, s, c, a, h, l;
          t.exports =
            ((l = r(21)),
            r(471),
            r(25),
            (o = (n = (i = l).lib).Base),
            (s = n.WordArray),
            (a = (c = i.algo).MD5),
            (h = c.EvpKDF =
              o.extend({
                cfg: o.extend({ keySize: 4, hasher: a, iterations: 1 }),
                init: function (t) {
                  this.cfg = this.cfg.extend(t);
                },
                compute: function (t, e) {
                  for (
                    var r,
                      i = this.cfg,
                      n = i.hasher.create(),
                      o = s.create(),
                      c = o.words,
                      a = i.keySize,
                      h = i.iterations;
                    c.length < a;

                  ) {
                    r && n.update(r), (r = n.update(t).finalize(e)), n.reset();
                    for (var l = 1; l < h; l++) (r = n.finalize(r)), n.reset();
                    o.concat(r);
                  }
                  return (o.sigBytes = 4 * a), o;
                },
              })),
            (i.EvpKDF = function (t, e, r) {
              return h.create(r).compute(t, e);
            }),
            l.EvpKDF);
        },
        25: function (t, e, r) {
          var i, n, o;
          t.exports =
            ((n = (i = r(21)).lib.Base),
            (o = i.enc.Utf8),
            void (i.algo.HMAC = n.extend({
              init: function (t, e) {
                (t = this._hasher = new t.init()), 'string' == typeof e && (e = o.parse(e));
                var r = t.blockSize,
                  i = 4 * r;
                e.sigBytes > i && (e = t.finalize(e)), e.clamp();
                for (
                  var n = (this._oKey = e.clone()), s = (this._iKey = e.clone()), c = n.words, a = s.words, h = 0;
                  h < r;
                  h++
                )
                  (c[h] ^= 1549556828), (a[h] ^= 909522486);
                (n.sigBytes = s.sigBytes = i), this.reset();
              },
              reset: function () {
                var t = this._hasher;
                t.reset(), t.update(this._iKey);
              },
              update: function (t) {
                return this._hasher.update(t), this;
              },
              finalize: function (t) {
                var e = this._hasher,
                  r = e.finalize(t);
                return e.reset(), e.finalize(this._oKey.clone().concat(r));
              },
            })));
        },
        636: function (t, e, r) {
          var i;
          t.exports =
            ((i = r(21)),
            (function (t) {
              var e = i,
                r = e.lib,
                n = r.WordArray,
                o = r.Hasher,
                s = e.algo,
                c = [];
              !(function () {
                for (var e = 0; e < 64; e++) c[e] = (4294967296 * t.abs(t.sin(e + 1))) | 0;
              })();
              var a = (s.MD5 = o.extend({
                _doReset: function () {
                  this._hash = new n.init([1732584193, 4023233417, 2562383102, 271733878]);
                },
                _doProcessBlock: function (t, e) {
                  for (var r = 0; r < 16; r++) {
                    var i = e + r,
                      n = t[i];
                    t[i] = (16711935 & ((n << 8) | (n >>> 24))) | (4278255360 & ((n << 24) | (n >>> 8)));
                  }
                  var o = this._hash.words,
                    s = t[e + 0],
                    a = t[e + 1],
                    p = t[e + 2],
                    d = t[e + 3],
                    y = t[e + 4],
                    _ = t[e + 5],
                    g = t[e + 6],
                    v = t[e + 7],
                    m = t[e + 8],
                    S = t[e + 9],
                    B = t[e + 10],
                    k = t[e + 11],
                    E = t[e + 12],
                    C = t[e + 13],
                    w = t[e + 14],
                    A = t[e + 15],
                    x = o[0],
                    b = o[1],
                    T = o[2],
                    D = o[3];
                  (x = h(x, b, T, D, s, 7, c[0])),
                    (D = h(D, x, b, T, a, 12, c[1])),
                    (T = h(T, D, x, b, p, 17, c[2])),
                    (b = h(b, T, D, x, d, 22, c[3])),
                    (x = h(x, b, T, D, y, 7, c[4])),
                    (D = h(D, x, b, T, _, 12, c[5])),
                    (T = h(T, D, x, b, g, 17, c[6])),
                    (b = h(b, T, D, x, v, 22, c[7])),
                    (x = h(x, b, T, D, m, 7, c[8])),
                    (D = h(D, x, b, T, S, 12, c[9])),
                    (T = h(T, D, x, b, B, 17, c[10])),
                    (b = h(b, T, D, x, k, 22, c[11])),
                    (x = h(x, b, T, D, E, 7, c[12])),
                    (D = h(D, x, b, T, C, 12, c[13])),
                    (T = h(T, D, x, b, w, 17, c[14])),
                    (x = l(x, (b = h(b, T, D, x, A, 22, c[15])), T, D, a, 5, c[16])),
                    (D = l(D, x, b, T, g, 9, c[17])),
                    (T = l(T, D, x, b, k, 14, c[18])),
                    (b = l(b, T, D, x, s, 20, c[19])),
                    (x = l(x, b, T, D, _, 5, c[20])),
                    (D = l(D, x, b, T, B, 9, c[21])),
                    (T = l(T, D, x, b, A, 14, c[22])),
                    (b = l(b, T, D, x, y, 20, c[23])),
                    (x = l(x, b, T, D, S, 5, c[24])),
                    (D = l(D, x, b, T, w, 9, c[25])),
                    (T = l(T, D, x, b, d, 14, c[26])),
                    (b = l(b, T, D, x, m, 20, c[27])),
                    (x = l(x, b, T, D, C, 5, c[28])),
                    (D = l(D, x, b, T, p, 9, c[29])),
                    (T = l(T, D, x, b, v, 14, c[30])),
                    (x = f(x, (b = l(b, T, D, x, E, 20, c[31])), T, D, _, 4, c[32])),
                    (D = f(D, x, b, T, m, 11, c[33])),
                    (T = f(T, D, x, b, k, 16, c[34])),
                    (b = f(b, T, D, x, w, 23, c[35])),
                    (x = f(x, b, T, D, a, 4, c[36])),
                    (D = f(D, x, b, T, y, 11, c[37])),
                    (T = f(T, D, x, b, v, 16, c[38])),
                    (b = f(b, T, D, x, B, 23, c[39])),
                    (x = f(x, b, T, D, C, 4, c[40])),
                    (D = f(D, x, b, T, s, 11, c[41])),
                    (T = f(T, D, x, b, d, 16, c[42])),
                    (b = f(b, T, D, x, g, 23, c[43])),
                    (x = f(x, b, T, D, S, 4, c[44])),
                    (D = f(D, x, b, T, E, 11, c[45])),
                    (T = f(T, D, x, b, A, 16, c[46])),
                    (x = u(x, (b = f(b, T, D, x, p, 23, c[47])), T, D, s, 6, c[48])),
                    (D = u(D, x, b, T, v, 10, c[49])),
                    (T = u(T, D, x, b, w, 15, c[50])),
                    (b = u(b, T, D, x, _, 21, c[51])),
                    (x = u(x, b, T, D, E, 6, c[52])),
                    (D = u(D, x, b, T, d, 10, c[53])),
                    (T = u(T, D, x, b, B, 15, c[54])),
                    (b = u(b, T, D, x, a, 21, c[55])),
                    (x = u(x, b, T, D, m, 6, c[56])),
                    (D = u(D, x, b, T, A, 10, c[57])),
                    (T = u(T, D, x, b, g, 15, c[58])),
                    (b = u(b, T, D, x, C, 21, c[59])),
                    (x = u(x, b, T, D, y, 6, c[60])),
                    (D = u(D, x, b, T, k, 10, c[61])),
                    (T = u(T, D, x, b, p, 15, c[62])),
                    (b = u(b, T, D, x, S, 21, c[63])),
                    (o[0] = (o[0] + x) | 0),
                    (o[1] = (o[1] + b) | 0),
                    (o[2] = (o[2] + T) | 0),
                    (o[3] = (o[3] + D) | 0);
                },
                _doFinalize: function () {
                  var e = this._data,
                    r = e.words,
                    i = 8 * this._nDataBytes,
                    n = 8 * e.sigBytes;
                  r[n >>> 5] |= 128 << (24 - (n % 32));
                  var o = t.floor(i / 4294967296),
                    s = i;
                  (r[15 + (((n + 64) >>> 9) << 4)] =
                    (16711935 & ((o << 8) | (o >>> 24))) | (4278255360 & ((o << 24) | (o >>> 8)))),
                    (r[14 + (((n + 64) >>> 9) << 4)] =
                      (16711935 & ((s << 8) | (s >>> 24))) | (4278255360 & ((s << 24) | (s >>> 8)))),
                    (e.sigBytes = 4 * (r.length + 1)),
                    this._process();
                  for (var c = this._hash, a = c.words, h = 0; h < 4; h++) {
                    var l = a[h];
                    a[h] = (16711935 & ((l << 8) | (l >>> 24))) | (4278255360 & ((l << 24) | (l >>> 8)));
                  }
                  return c;
                },
                clone: function () {
                  var t = o.clone.call(this);
                  return (t._hash = this._hash.clone()), t;
                },
              }));
              function h(t, e, r, i, n, o, s) {
                var c = t + ((e & r) | (~e & i)) + n + s;
                return ((c << o) | (c >>> (32 - o))) + e;
              }
              function l(t, e, r, i, n, o, s) {
                var c = t + ((e & i) | (r & ~i)) + n + s;
                return ((c << o) | (c >>> (32 - o))) + e;
              }
              function f(t, e, r, i, n, o, s) {
                var c = t + (e ^ r ^ i) + n + s;
                return ((c << o) | (c >>> (32 - o))) + e;
              }
              function u(t, e, r, i, n, o, s) {
                var c = t + (r ^ (e | ~i)) + n + s;
                return ((c << o) | (c >>> (32 - o))) + e;
              }
              (e.MD5 = o._createHelper(a)), (e.HmacMD5 = o._createHmacHelper(a));
            })(Math),
            i.MD5);
        },
        19: function (t, e, r) {
          var i, n, o, s, c, a, h, l, f;
          t.exports =
            ((f = r(21)),
            r(9),
            r(25),
            (o = (n = (i = f).lib).Base),
            (s = n.WordArray),
            (a = (c = i.algo).SHA256),
            (h = c.HMAC),
            (l = c.PBKDF2 =
              o.extend({
                cfg: o.extend({ keySize: 4, hasher: a, iterations: 25e4 }),
                init: function (t) {
                  this.cfg = this.cfg.extend(t);
                },
                compute: function (t, e) {
                  for (
                    var r = this.cfg,
                      i = h.create(r.hasher, t),
                      n = s.create(),
                      o = s.create([1]),
                      c = n.words,
                      a = o.words,
                      l = r.keySize,
                      f = r.iterations;
                    c.length < l;

                  ) {
                    var u = i.update(e).finalize(o);
                    i.reset();
                    for (var p = u.words, d = p.length, y = u, _ = 1; _ < f; _++) {
                      (y = i.finalize(y)), i.reset();
                      for (var g = y.words, v = 0; v < d; v++) p[v] ^= g[v];
                    }
                    n.concat(u), a[0]++;
                  }
                  return (n.sigBytes = 4 * l), n;
                },
              })),
            (i.PBKDF2 = function (t, e, r) {
              return l.create(r).compute(t, e);
            }),
            f.PBKDF2);
        },
        298: function (t, e, r) {
          var i;
          t.exports =
            ((i = r(21)),
            r(754),
            r(636),
            r(506),
            r(165),
            (function () {
              var t = i,
                e = t.lib.StreamCipher,
                r = t.algo,
                n = [],
                o = [],
                s = [],
                c = (r.Rabbit = e.extend({
                  _doReset: function () {
                    for (var t = this._key.words, e = this.cfg.iv, r = 0; r < 4; r++)
                      t[r] = (16711935 & ((t[r] << 8) | (t[r] >>> 24))) | (4278255360 & ((t[r] << 24) | (t[r] >>> 8)));
                    var i = (this._X = [
                        t[0],
                        (t[3] << 16) | (t[2] >>> 16),
                        t[1],
                        (t[0] << 16) | (t[3] >>> 16),
                        t[2],
                        (t[1] << 16) | (t[0] >>> 16),
                        t[3],
                        (t[2] << 16) | (t[1] >>> 16),
                      ]),
                      n = (this._C = [
                        (t[2] << 16) | (t[2] >>> 16),
                        (4294901760 & t[0]) | (65535 & t[1]),
                        (t[3] << 16) | (t[3] >>> 16),
                        (4294901760 & t[1]) | (65535 & t[2]),
                        (t[0] << 16) | (t[0] >>> 16),
                        (4294901760 & t[2]) | (65535 & t[3]),
                        (t[1] << 16) | (t[1] >>> 16),
                        (4294901760 & t[3]) | (65535 & t[0]),
                      ]);
                    for (this._b = 0, r = 0; r < 4; r++) a.call(this);
                    for (r = 0; r < 8; r++) n[r] ^= i[(r + 4) & 7];
                    if (e) {
                      var o = e.words,
                        s = o[0],
                        c = o[1],
                        h = (16711935 & ((s << 8) | (s >>> 24))) | (4278255360 & ((s << 24) | (s >>> 8))),
                        l = (16711935 & ((c << 8) | (c >>> 24))) | (4278255360 & ((c << 24) | (c >>> 8))),
                        f = (h >>> 16) | (4294901760 & l),
                        u = (l << 16) | (65535 & h);
                      for (
                        n[0] ^= h, n[1] ^= f, n[2] ^= l, n[3] ^= u, n[4] ^= h, n[5] ^= f, n[6] ^= l, n[7] ^= u, r = 0;
                        r < 4;
                        r++
                      )
                        a.call(this);
                    }
                  },
                  _doProcessBlock: function (t, e) {
                    var r = this._X;
                    a.call(this),
                      (n[0] = r[0] ^ (r[5] >>> 16) ^ (r[3] << 16)),
                      (n[1] = r[2] ^ (r[7] >>> 16) ^ (r[5] << 16)),
                      (n[2] = r[4] ^ (r[1] >>> 16) ^ (r[7] << 16)),
                      (n[3] = r[6] ^ (r[3] >>> 16) ^ (r[1] << 16));
                    for (var i = 0; i < 4; i++)
                      (n[i] =
                        (16711935 & ((n[i] << 8) | (n[i] >>> 24))) | (4278255360 & ((n[i] << 24) | (n[i] >>> 8)))),
                        (t[e + i] ^= n[i]);
                  },
                  blockSize: 4,
                  ivSize: 2,
                }));
              function a() {
                for (var t = this._X, e = this._C, r = 0; r < 8; r++) o[r] = e[r];
                for (
                  e[0] = (e[0] + 1295307597 + this._b) | 0,
                    e[1] = (e[1] + 3545052371 + (e[0] >>> 0 < o[0] >>> 0 ? 1 : 0)) | 0,
                    e[2] = (e[2] + 886263092 + (e[1] >>> 0 < o[1] >>> 0 ? 1 : 0)) | 0,
                    e[3] = (e[3] + 1295307597 + (e[2] >>> 0 < o[2] >>> 0 ? 1 : 0)) | 0,
                    e[4] = (e[4] + 3545052371 + (e[3] >>> 0 < o[3] >>> 0 ? 1 : 0)) | 0,
                    e[5] = (e[5] + 886263092 + (e[4] >>> 0 < o[4] >>> 0 ? 1 : 0)) | 0,
                    e[6] = (e[6] + 1295307597 + (e[5] >>> 0 < o[5] >>> 0 ? 1 : 0)) | 0,
                    e[7] = (e[7] + 3545052371 + (e[6] >>> 0 < o[6] >>> 0 ? 1 : 0)) | 0,
                    this._b = e[7] >>> 0 < o[7] >>> 0 ? 1 : 0,
                    r = 0;
                  r < 8;
                  r++
                ) {
                  var i = t[r] + e[r],
                    n = 65535 & i,
                    c = i >>> 16,
                    a = ((((n * n) >>> 17) + n * c) >>> 15) + c * c,
                    h = (((4294901760 & i) * i) | 0) + (((65535 & i) * i) | 0);
                  s[r] = a ^ h;
                }
                (t[0] = (s[0] + ((s[7] << 16) | (s[7] >>> 16)) + ((s[6] << 16) | (s[6] >>> 16))) | 0),
                  (t[1] = (s[1] + ((s[0] << 8) | (s[0] >>> 24)) + s[7]) | 0),
                  (t[2] = (s[2] + ((s[1] << 16) | (s[1] >>> 16)) + ((s[0] << 16) | (s[0] >>> 16))) | 0),
                  (t[3] = (s[3] + ((s[2] << 8) | (s[2] >>> 24)) + s[1]) | 0),
                  (t[4] = (s[4] + ((s[3] << 16) | (s[3] >>> 16)) + ((s[2] << 16) | (s[2] >>> 16))) | 0),
                  (t[5] = (s[5] + ((s[4] << 8) | (s[4] >>> 24)) + s[3]) | 0),
                  (t[6] = (s[6] + ((s[5] << 16) | (s[5] >>> 16)) + ((s[4] << 16) | (s[4] >>> 16))) | 0),
                  (t[7] = (s[7] + ((s[6] << 8) | (s[6] >>> 24)) + s[5]) | 0);
              }
              t.Rabbit = e._createHelper(c);
            })(),
            i.Rabbit);
        },
        193: function (t, e, r) {
          var i;
          t.exports =
            ((i = r(21)),
            r(754),
            r(636),
            r(506),
            r(165),
            (function () {
              var t = i,
                e = t.lib.StreamCipher,
                r = t.algo,
                n = (r.RC4 = e.extend({
                  _doReset: function () {
                    for (var t = this._key, e = t.words, r = t.sigBytes, i = (this._S = []), n = 0; n < 256; n++)
                      i[n] = n;
                    n = 0;
                    for (var o = 0; n < 256; n++) {
                      var s = n % r,
                        c = (e[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
                      o = (o + i[n] + c) % 256;
                      var a = i[n];
                      (i[n] = i[o]), (i[o] = a);
                    }
                    this._i = this._j = 0;
                  },
                  _doProcessBlock: function (t, e) {
                    t[e] ^= o.call(this);
                  },
                  keySize: 8,
                  ivSize: 0,
                }));
              function o() {
                for (var t = this._S, e = this._i, r = this._j, i = 0, n = 0; n < 4; n++) {
                  r = (r + t[(e = (e + 1) % 256)]) % 256;
                  var o = t[e];
                  (t[e] = t[r]), (t[r] = o), (i |= t[(t[e] + t[r]) % 256] << (24 - 8 * n));
                }
                return (this._i = e), (this._j = r), i;
              }
              t.RC4 = e._createHelper(n);
              var s = (r.RC4Drop = n.extend({
                cfg: n.cfg.extend({ drop: 192 }),
                _doReset: function () {
                  n._doReset.call(this);
                  for (var t = this.cfg.drop; t > 0; t--) o.call(this);
                },
              }));
              t.RC4Drop = e._createHelper(s);
            })(),
            i.RC4);
        },
        471: function (t, e, r) {
          var i, n, o, s, c, a, h, l;
          t.exports =
            ((n = (i = l = r(21)).lib),
            (o = n.WordArray),
            (s = n.Hasher),
            (c = i.algo),
            (a = []),
            (h = c.SHA1 =
              s.extend({
                _doReset: function () {
                  this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
                },
                _doProcessBlock: function (t, e) {
                  for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], c = r[4], h = 0; h < 80; h++) {
                    if (h < 16) a[h] = 0 | t[e + h];
                    else {
                      var l = a[h - 3] ^ a[h - 8] ^ a[h - 14] ^ a[h - 16];
                      a[h] = (l << 1) | (l >>> 31);
                    }
                    var f = ((i << 5) | (i >>> 27)) + c + a[h];
                    (f +=
                      h < 20
                        ? 1518500249 + ((n & o) | (~n & s))
                        : h < 40
                          ? 1859775393 + (n ^ o ^ s)
                          : h < 60
                            ? ((n & o) | (n & s) | (o & s)) - 1894007588
                            : (n ^ o ^ s) - 899497514),
                      (c = s),
                      (s = o),
                      (o = (n << 30) | (n >>> 2)),
                      (n = i),
                      (i = f);
                  }
                  (r[0] = (r[0] + i) | 0),
                    (r[1] = (r[1] + n) | 0),
                    (r[2] = (r[2] + o) | 0),
                    (r[3] = (r[3] + s) | 0),
                    (r[4] = (r[4] + c) | 0);
                },
                _doFinalize: function () {
                  var t = this._data,
                    e = t.words,
                    r = 8 * this._nDataBytes,
                    i = 8 * t.sigBytes;
                  return (
                    (e[i >>> 5] |= 128 << (24 - (i % 32))),
                    (e[14 + (((i + 64) >>> 9) << 4)] = Math.floor(r / 4294967296)),
                    (e[15 + (((i + 64) >>> 9) << 4)] = r),
                    (t.sigBytes = 4 * e.length),
                    this._process(),
                    this._hash
                  );
                },
                clone: function () {
                  var t = s.clone.call(this);
                  return (t._hash = this._hash.clone()), t;
                },
              })),
            (i.SHA1 = s._createHelper(h)),
            (i.HmacSHA1 = s._createHmacHelper(h)),
            l.SHA1);
        },
        9: function (t, e, r) {
          var i;
          t.exports =
            ((i = r(21)),
            (function (t) {
              var e = i,
                r = e.lib,
                n = r.WordArray,
                o = r.Hasher,
                s = e.algo,
                c = [],
                a = [];
              !(function () {
                function e(e) {
                  for (var r = t.sqrt(e), i = 2; i <= r; i++) if (!(e % i)) return !1;
                  return !0;
                }
                function r(t) {
                  return (4294967296 * (t - (0 | t))) | 0;
                }
                for (var i = 2, n = 0; n < 64; )
                  e(i) && (n < 8 && (c[n] = r(t.pow(i, 0.5))), (a[n] = r(t.pow(i, 1 / 3))), n++), i++;
              })();
              var h = [],
                l = (s.SHA256 = o.extend({
                  _doReset: function () {
                    this._hash = new n.init(c.slice(0));
                  },
                  _doProcessBlock: function (t, e) {
                    for (
                      var r = this._hash.words,
                        i = r[0],
                        n = r[1],
                        o = r[2],
                        s = r[3],
                        c = r[4],
                        l = r[5],
                        f = r[6],
                        u = r[7],
                        p = 0;
                      p < 64;
                      p++
                    ) {
                      if (p < 16) h[p] = 0 | t[e + p];
                      else {
                        var d = h[p - 15],
                          y = ((d << 25) | (d >>> 7)) ^ ((d << 14) | (d >>> 18)) ^ (d >>> 3),
                          _ = h[p - 2],
                          g = ((_ << 15) | (_ >>> 17)) ^ ((_ << 13) | (_ >>> 19)) ^ (_ >>> 10);
                        h[p] = y + h[p - 7] + g + h[p - 16];
                      }
                      var v = (i & n) ^ (i & o) ^ (n & o),
                        m = ((i << 30) | (i >>> 2)) ^ ((i << 19) | (i >>> 13)) ^ ((i << 10) | (i >>> 22)),
                        S =
                          u +
                          (((c << 26) | (c >>> 6)) ^ ((c << 21) | (c >>> 11)) ^ ((c << 7) | (c >>> 25))) +
                          ((c & l) ^ (~c & f)) +
                          a[p] +
                          h[p];
                      (u = f), (f = l), (l = c), (c = (s + S) | 0), (s = o), (o = n), (n = i), (i = (S + (m + v)) | 0);
                    }
                    (r[0] = (r[0] + i) | 0),
                      (r[1] = (r[1] + n) | 0),
                      (r[2] = (r[2] + o) | 0),
                      (r[3] = (r[3] + s) | 0),
                      (r[4] = (r[4] + c) | 0),
                      (r[5] = (r[5] + l) | 0),
                      (r[6] = (r[6] + f) | 0),
                      (r[7] = (r[7] + u) | 0);
                  },
                  _doFinalize: function () {
                    var e = this._data,
                      r = e.words,
                      i = 8 * this._nDataBytes,
                      n = 8 * e.sigBytes;
                    return (
                      (r[n >>> 5] |= 128 << (24 - (n % 32))),
                      (r[14 + (((n + 64) >>> 9) << 4)] = t.floor(i / 4294967296)),
                      (r[15 + (((n + 64) >>> 9) << 4)] = i),
                      (e.sigBytes = 4 * r.length),
                      this._process(),
                      this._hash
                    );
                  },
                  clone: function () {
                    var t = o.clone.call(this);
                    return (t._hash = this._hash.clone()), t;
                  },
                }));
              (e.SHA256 = o._createHelper(l)), (e.HmacSHA256 = o._createHmacHelper(l));
            })(Math),
            i.SHA256);
        },
        628: function (t, e, r) {
          var i;
          t.exports =
            ((i = r(21)),
            r(754),
            r(636),
            r(506),
            r(165),
            (function () {
              var t = i,
                e = t.lib,
                r = e.WordArray,
                n = e.BlockCipher,
                o = t.algo,
                s = [
                  57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52,
                  44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5,
                  28, 20, 12, 4,
                ],
                c = [
                  14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31,
                  37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32,
                ],
                a = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
                h = [
                  {
                    0: 8421888,
                    268435456: 32768,
                    536870912: 8421378,
                    805306368: 2,
                    1073741824: 512,
                    1342177280: 8421890,
                    1610612736: 8389122,
                    1879048192: 8388608,
                    2147483648: 514,
                    2415919104: 8389120,
                    2684354560: 33280,
                    2952790016: 8421376,
                    3221225472: 32770,
                    3489660928: 8388610,
                    3758096384: 0,
                    4026531840: 33282,
                    134217728: 0,
                    402653184: 8421890,
                    671088640: 33282,
                    939524096: 32768,
                    1207959552: 8421888,
                    1476395008: 512,
                    1744830464: 8421378,
                    2013265920: 2,
                    2281701376: 8389120,
                    2550136832: 33280,
                    2818572288: 8421376,
                    3087007744: 8389122,
                    3355443200: 8388610,
                    3623878656: 32770,
                    3892314112: 514,
                    4160749568: 8388608,
                    1: 32768,
                    268435457: 2,
                    536870913: 8421888,
                    805306369: 8388608,
                    1073741825: 8421378,
                    1342177281: 33280,
                    1610612737: 512,
                    1879048193: 8389122,
                    2147483649: 8421890,
                    2415919105: 8421376,
                    2684354561: 8388610,
                    2952790017: 33282,
                    3221225473: 514,
                    3489660929: 8389120,
                    3758096385: 32770,
                    4026531841: 0,
                    134217729: 8421890,
                    402653185: 8421376,
                    671088641: 8388608,
                    939524097: 512,
                    1207959553: 32768,
                    1476395009: 8388610,
                    1744830465: 2,
                    2013265921: 33282,
                    2281701377: 32770,
                    2550136833: 8389122,
                    2818572289: 514,
                    3087007745: 8421888,
                    3355443201: 8389120,
                    3623878657: 0,
                    3892314113: 33280,
                    4160749569: 8421378,
                  },
                  {
                    0: 1074282512,
                    16777216: 16384,
                    33554432: 524288,
                    50331648: 1074266128,
                    67108864: 1073741840,
                    83886080: 1074282496,
                    100663296: 1073758208,
                    117440512: 16,
                    134217728: 540672,
                    150994944: 1073758224,
                    167772160: 1073741824,
                    184549376: 540688,
                    201326592: 524304,
                    218103808: 0,
                    234881024: 16400,
                    251658240: 1074266112,
                    8388608: 1073758208,
                    25165824: 540688,
                    41943040: 16,
                    58720256: 1073758224,
                    75497472: 1074282512,
                    92274688: 1073741824,
                    109051904: 524288,
                    125829120: 1074266128,
                    142606336: 524304,
                    159383552: 0,
                    176160768: 16384,
                    192937984: 1074266112,
                    209715200: 1073741840,
                    226492416: 540672,
                    243269632: 1074282496,
                    260046848: 16400,
                    268435456: 0,
                    285212672: 1074266128,
                    301989888: 1073758224,
                    318767104: 1074282496,
                    335544320: 1074266112,
                    352321536: 16,
                    369098752: 540688,
                    385875968: 16384,
                    402653184: 16400,
                    419430400: 524288,
                    436207616: 524304,
                    452984832: 1073741840,
                    469762048: 540672,
                    486539264: 1073758208,
                    503316480: 1073741824,
                    520093696: 1074282512,
                    276824064: 540688,
                    293601280: 524288,
                    310378496: 1074266112,
                    327155712: 16384,
                    343932928: 1073758208,
                    360710144: 1074282512,
                    377487360: 16,
                    394264576: 1073741824,
                    411041792: 1074282496,
                    427819008: 1073741840,
                    444596224: 1073758224,
                    461373440: 524304,
                    478150656: 0,
                    494927872: 16400,
                    511705088: 1074266128,
                    528482304: 540672,
                  },
                  {
                    0: 260,
                    1048576: 0,
                    2097152: 67109120,
                    3145728: 65796,
                    4194304: 65540,
                    5242880: 67108868,
                    6291456: 67174660,
                    7340032: 67174400,
                    8388608: 67108864,
                    9437184: 67174656,
                    10485760: 65792,
                    11534336: 67174404,
                    12582912: 67109124,
                    13631488: 65536,
                    14680064: 4,
                    15728640: 256,
                    524288: 67174656,
                    1572864: 67174404,
                    2621440: 0,
                    3670016: 67109120,
                    4718592: 67108868,
                    5767168: 65536,
                    6815744: 65540,
                    7864320: 260,
                    8912896: 4,
                    9961472: 256,
                    11010048: 67174400,
                    12058624: 65796,
                    13107200: 65792,
                    14155776: 67109124,
                    15204352: 67174660,
                    16252928: 67108864,
                    16777216: 67174656,
                    17825792: 65540,
                    18874368: 65536,
                    19922944: 67109120,
                    20971520: 256,
                    22020096: 67174660,
                    23068672: 67108868,
                    24117248: 0,
                    25165824: 67109124,
                    26214400: 67108864,
                    27262976: 4,
                    28311552: 65792,
                    29360128: 67174400,
                    30408704: 260,
                    31457280: 65796,
                    32505856: 67174404,
                    17301504: 67108864,
                    18350080: 260,
                    19398656: 67174656,
                    20447232: 0,
                    21495808: 65540,
                    22544384: 67109120,
                    23592960: 256,
                    24641536: 67174404,
                    25690112: 65536,
                    26738688: 67174660,
                    27787264: 65796,
                    28835840: 67108868,
                    29884416: 67109124,
                    30932992: 67174400,
                    31981568: 4,
                    33030144: 65792,
                  },
                  {
                    0: 2151682048,
                    65536: 2147487808,
                    131072: 4198464,
                    196608: 2151677952,
                    262144: 0,
                    327680: 4198400,
                    393216: 2147483712,
                    458752: 4194368,
                    524288: 2147483648,
                    589824: 4194304,
                    655360: 64,
                    720896: 2147487744,
                    786432: 2151678016,
                    851968: 4160,
                    917504: 4096,
                    983040: 2151682112,
                    32768: 2147487808,
                    98304: 64,
                    163840: 2151678016,
                    229376: 2147487744,
                    294912: 4198400,
                    360448: 2151682112,
                    425984: 0,
                    491520: 2151677952,
                    557056: 4096,
                    622592: 2151682048,
                    688128: 4194304,
                    753664: 4160,
                    819200: 2147483648,
                    884736: 4194368,
                    950272: 4198464,
                    1015808: 2147483712,
                    1048576: 4194368,
                    1114112: 4198400,
                    1179648: 2147483712,
                    1245184: 0,
                    1310720: 4160,
                    1376256: 2151678016,
                    1441792: 2151682048,
                    1507328: 2147487808,
                    1572864: 2151682112,
                    1638400: 2147483648,
                    1703936: 2151677952,
                    1769472: 4198464,
                    1835008: 2147487744,
                    1900544: 4194304,
                    1966080: 64,
                    2031616: 4096,
                    1081344: 2151677952,
                    1146880: 2151682112,
                    1212416: 0,
                    1277952: 4198400,
                    1343488: 4194368,
                    1409024: 2147483648,
                    1474560: 2147487808,
                    1540096: 64,
                    1605632: 2147483712,
                    1671168: 4096,
                    1736704: 2147487744,
                    1802240: 2151678016,
                    1867776: 4160,
                    1933312: 2151682048,
                    1998848: 4194304,
                    2064384: 4198464,
                  },
                  {
                    0: 128,
                    4096: 17039360,
                    8192: 262144,
                    12288: 536870912,
                    16384: 537133184,
                    20480: 16777344,
                    24576: 553648256,
                    28672: 262272,
                    32768: 16777216,
                    36864: 537133056,
                    40960: 536871040,
                    45056: 553910400,
                    49152: 553910272,
                    53248: 0,
                    57344: 17039488,
                    61440: 553648128,
                    2048: 17039488,
                    6144: 553648256,
                    10240: 128,
                    14336: 17039360,
                    18432: 262144,
                    22528: 537133184,
                    26624: 553910272,
                    30720: 536870912,
                    34816: 537133056,
                    38912: 0,
                    43008: 553910400,
                    47104: 16777344,
                    51200: 536871040,
                    55296: 553648128,
                    59392: 16777216,
                    63488: 262272,
                    65536: 262144,
                    69632: 128,
                    73728: 536870912,
                    77824: 553648256,
                    81920: 16777344,
                    86016: 553910272,
                    90112: 537133184,
                    94208: 16777216,
                    98304: 553910400,
                    102400: 553648128,
                    106496: 17039360,
                    110592: 537133056,
                    114688: 262272,
                    118784: 536871040,
                    122880: 0,
                    126976: 17039488,
                    67584: 553648256,
                    71680: 16777216,
                    75776: 17039360,
                    79872: 537133184,
                    83968: 536870912,
                    88064: 17039488,
                    92160: 128,
                    96256: 553910272,
                    100352: 262272,
                    104448: 553910400,
                    108544: 0,
                    112640: 553648128,
                    116736: 16777344,
                    120832: 262144,
                    124928: 537133056,
                    129024: 536871040,
                  },
                  {
                    0: 268435464,
                    256: 8192,
                    512: 270532608,
                    768: 270540808,
                    1024: 268443648,
                    1280: 2097152,
                    1536: 2097160,
                    1792: 268435456,
                    2048: 0,
                    2304: 268443656,
                    2560: 2105344,
                    2816: 8,
                    3072: 270532616,
                    3328: 2105352,
                    3584: 8200,
                    3840: 270540800,
                    128: 270532608,
                    384: 270540808,
                    640: 8,
                    896: 2097152,
                    1152: 2105352,
                    1408: 268435464,
                    1664: 268443648,
                    1920: 8200,
                    2176: 2097160,
                    2432: 8192,
                    2688: 268443656,
                    2944: 270532616,
                    3200: 0,
                    3456: 270540800,
                    3712: 2105344,
                    3968: 268435456,
                    4096: 268443648,
                    4352: 270532616,
                    4608: 270540808,
                    4864: 8200,
                    5120: 2097152,
                    5376: 268435456,
                    5632: 268435464,
                    5888: 2105344,
                    6144: 2105352,
                    6400: 0,
                    6656: 8,
                    6912: 270532608,
                    7168: 8192,
                    7424: 268443656,
                    7680: 270540800,
                    7936: 2097160,
                    4224: 8,
                    4480: 2105344,
                    4736: 2097152,
                    4992: 268435464,
                    5248: 268443648,
                    5504: 8200,
                    5760: 270540808,
                    6016: 270532608,
                    6272: 270540800,
                    6528: 270532616,
                    6784: 8192,
                    7040: 2105352,
                    7296: 2097160,
                    7552: 0,
                    7808: 268435456,
                    8064: 268443656,
                  },
                  {
                    0: 1048576,
                    16: 33555457,
                    32: 1024,
                    48: 1049601,
                    64: 34604033,
                    80: 0,
                    96: 1,
                    112: 34603009,
                    128: 33555456,
                    144: 1048577,
                    160: 33554433,
                    176: 34604032,
                    192: 34603008,
                    208: 1025,
                    224: 1049600,
                    240: 33554432,
                    8: 34603009,
                    24: 0,
                    40: 33555457,
                    56: 34604032,
                    72: 1048576,
                    88: 33554433,
                    104: 33554432,
                    120: 1025,
                    136: 1049601,
                    152: 33555456,
                    168: 34603008,
                    184: 1048577,
                    200: 1024,
                    216: 34604033,
                    232: 1,
                    248: 1049600,
                    256: 33554432,
                    272: 1048576,
                    288: 33555457,
                    304: 34603009,
                    320: 1048577,
                    336: 33555456,
                    352: 34604032,
                    368: 1049601,
                    384: 1025,
                    400: 34604033,
                    416: 1049600,
                    432: 1,
                    448: 0,
                    464: 34603008,
                    480: 33554433,
                    496: 1024,
                    264: 1049600,
                    280: 33555457,
                    296: 34603009,
                    312: 1,
                    328: 33554432,
                    344: 1048576,
                    360: 1025,
                    376: 34604032,
                    392: 33554433,
                    408: 34603008,
                    424: 0,
                    440: 34604033,
                    456: 1049601,
                    472: 1024,
                    488: 33555456,
                    504: 1048577,
                  },
                  {
                    0: 134219808,
                    1: 131072,
                    2: 134217728,
                    3: 32,
                    4: 131104,
                    5: 134350880,
                    6: 134350848,
                    7: 2048,
                    8: 134348800,
                    9: 134219776,
                    10: 133120,
                    11: 134348832,
                    12: 2080,
                    13: 0,
                    14: 134217760,
                    15: 133152,
                    2147483648: 2048,
                    2147483649: 134350880,
                    2147483650: 134219808,
                    2147483651: 134217728,
                    2147483652: 134348800,
                    2147483653: 133120,
                    2147483654: 133152,
                    2147483655: 32,
                    2147483656: 134217760,
                    2147483657: 2080,
                    2147483658: 131104,
                    2147483659: 134350848,
                    2147483660: 0,
                    2147483661: 134348832,
                    2147483662: 134219776,
                    2147483663: 131072,
                    16: 133152,
                    17: 134350848,
                    18: 32,
                    19: 2048,
                    20: 134219776,
                    21: 134217760,
                    22: 134348832,
                    23: 131072,
                    24: 0,
                    25: 131104,
                    26: 134348800,
                    27: 134219808,
                    28: 134350880,
                    29: 133120,
                    30: 2080,
                    31: 134217728,
                    2147483664: 131072,
                    2147483665: 2048,
                    2147483666: 134348832,
                    2147483667: 133152,
                    2147483668: 32,
                    2147483669: 134348800,
                    2147483670: 134217728,
                    2147483671: 134219808,
                    2147483672: 134350880,
                    2147483673: 134217760,
                    2147483674: 134219776,
                    2147483675: 0,
                    2147483676: 133120,
                    2147483677: 2080,
                    2147483678: 131104,
                    2147483679: 134350848,
                  },
                ],
                l = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
                f = (o.DES = n.extend({
                  _doReset: function () {
                    for (var t = this._key.words, e = [], r = 0; r < 56; r++) {
                      var i = s[r] - 1;
                      e[r] = (t[i >>> 5] >>> (31 - (i % 32))) & 1;
                    }
                    for (var n = (this._subKeys = []), o = 0; o < 16; o++) {
                      var h = (n[o] = []),
                        l = a[o];
                      for (r = 0; r < 24; r++)
                        (h[(r / 6) | 0] |= e[(c[r] - 1 + l) % 28] << (31 - (r % 6))),
                          (h[4 + ((r / 6) | 0)] |= e[28 + ((c[r + 24] - 1 + l) % 28)] << (31 - (r % 6)));
                      for (h[0] = (h[0] << 1) | (h[0] >>> 31), r = 1; r < 7; r++) h[r] = h[r] >>> (4 * (r - 1) + 3);
                      h[7] = (h[7] << 5) | (h[7] >>> 27);
                    }
                    var f = (this._invSubKeys = []);
                    for (r = 0; r < 16; r++) f[r] = n[15 - r];
                  },
                  encryptBlock: function (t, e) {
                    this._doCryptBlock(t, e, this._subKeys);
                  },
                  decryptBlock: function (t, e) {
                    this._doCryptBlock(t, e, this._invSubKeys);
                  },
                  _doCryptBlock: function (t, e, r) {
                    (this._lBlock = t[e]),
                      (this._rBlock = t[e + 1]),
                      u.call(this, 4, 252645135),
                      u.call(this, 16, 65535),
                      p.call(this, 2, 858993459),
                      p.call(this, 8, 16711935),
                      u.call(this, 1, 1431655765);
                    for (var i = 0; i < 16; i++) {
                      for (var n = r[i], o = this._lBlock, s = this._rBlock, c = 0, a = 0; a < 8; a++)
                        c |= h[a][((s ^ n[a]) & l[a]) >>> 0];
                      (this._lBlock = s), (this._rBlock = o ^ c);
                    }
                    var f = this._lBlock;
                    (this._lBlock = this._rBlock),
                      (this._rBlock = f),
                      u.call(this, 1, 1431655765),
                      p.call(this, 8, 16711935),
                      p.call(this, 2, 858993459),
                      u.call(this, 16, 65535),
                      u.call(this, 4, 252645135),
                      (t[e] = this._lBlock),
                      (t[e + 1] = this._rBlock);
                  },
                  keySize: 2,
                  ivSize: 2,
                  blockSize: 2,
                }));
              function u(t, e) {
                var r = ((this._lBlock >>> t) ^ this._rBlock) & e;
                (this._rBlock ^= r), (this._lBlock ^= r << t);
              }
              function p(t, e) {
                var r = ((this._rBlock >>> t) ^ this._lBlock) & e;
                (this._lBlock ^= r), (this._rBlock ^= r << t);
              }
              t.DES = n._createHelper(f);
              var d = (o.TripleDES = n.extend({
                _doReset: function () {
                  var t = this._key.words;
                  if (2 !== t.length && 4 !== t.length && t.length < 6)
                    throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
                  var e = t.slice(0, 2),
                    i = t.length < 4 ? t.slice(0, 2) : t.slice(2, 4),
                    n = t.length < 6 ? t.slice(0, 2) : t.slice(4, 6);
                  (this._des1 = f.createEncryptor(r.create(e))),
                    (this._des2 = f.createEncryptor(r.create(i))),
                    (this._des3 = f.createEncryptor(r.create(n)));
                },
                encryptBlock: function (t, e) {
                  this._des1.encryptBlock(t, e), this._des2.decryptBlock(t, e), this._des3.encryptBlock(t, e);
                },
                decryptBlock: function (t, e) {
                  this._des3.decryptBlock(t, e), this._des2.encryptBlock(t, e), this._des1.decryptBlock(t, e);
                },
                keySize: 6,
                ivSize: 2,
                blockSize: 2,
              }));
              t.TripleDES = n._createHelper(d);
            })(),
            i.TripleDES);
        },
        992: (t, e, r) => {
          var i,
            n = (function () {
              var t = String.fromCharCode,
                e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$',
                i = {};
              function n(t, e) {
                if (!i[t]) {
                  i[t] = {};
                  for (var r = 0; r < t.length; r++) i[t][t.charAt(r)] = r;
                }
                return i[t][e];
              }
              var o = {
                compressToBase64: function (t) {
                  if (null == t) return '';
                  var r = o._compress(t, 6, function (t) {
                    return e.charAt(t);
                  });
                  switch (r.length % 4) {
                    default:
                    case 0:
                      return r;
                    case 1:
                      return r + '===';
                    case 2:
                      return r + '==';
                    case 3:
                      return r + '=';
                  }
                },
                decompressFromBase64: function (t) {
                  return null == t
                    ? ''
                    : '' == t
                      ? null
                      : o._decompress(t.length, 32, function (r) {
                          return n(e, t.charAt(r));
                        });
                },
                compressToUTF16: function (e) {
                  return null == e
                    ? ''
                    : o._compress(e, 15, function (e) {
                        return t(e + 32);
                      }) + ' ';
                },
                decompressFromUTF16: function (t) {
                  return null == t
                    ? ''
                    : '' == t
                      ? null
                      : o._decompress(t.length, 16384, function (e) {
                          return t.charCodeAt(e) - 32;
                        });
                },
                compressToUint8Array: function (t) {
                  for (var e = o.compress(t), r = new Uint8Array(2 * e.length), i = 0, n = e.length; i < n; i++) {
                    var s = e.charCodeAt(i);
                    (r[2 * i] = s >>> 8), (r[2 * i + 1] = s % 256);
                  }
                  return r;
                },
                decompressFromUint8Array: function (e) {
                  if (null == e) return o.decompress(e);
                  for (var r = new Array(e.length / 2), i = 0, n = r.length; i < n; i++)
                    r[i] = 256 * e[2 * i] + e[2 * i + 1];
                  var s = [];
                  return (
                    r.forEach(function (e) {
                      s.push(t(e));
                    }),
                    o.decompress(s.join(''))
                  );
                },
                compressToEncodedURIComponent: function (t) {
                  return null == t
                    ? ''
                    : o._compress(t, 6, function (t) {
                        return r.charAt(t);
                      });
                },
                decompressFromEncodedURIComponent: function (t) {
                  return null == t
                    ? ''
                    : '' == t
                      ? null
                      : ((t = t.replace(/ /g, '+')),
                        o._decompress(t.length, 32, function (e) {
                          return n(r, t.charAt(e));
                        }));
                },
                compress: function (e) {
                  return o._compress(e, 16, function (e) {
                    return t(e);
                  });
                },
                _compress: function (t, e, r) {
                  if (null == t) return '';
                  var i,
                    n,
                    o,
                    s = {},
                    c = {},
                    a = '',
                    h = '',
                    l = '',
                    f = 2,
                    u = 3,
                    p = 2,
                    d = [],
                    y = 0,
                    _ = 0;
                  for (o = 0; o < t.length; o += 1)
                    if (
                      ((a = t.charAt(o)),
                      Object.prototype.hasOwnProperty.call(s, a) || ((s[a] = u++), (c[a] = !0)),
                      (h = l + a),
                      Object.prototype.hasOwnProperty.call(s, h))
                    )
                      l = h;
                    else {
                      if (Object.prototype.hasOwnProperty.call(c, l)) {
                        if (l.charCodeAt(0) < 256) {
                          for (i = 0; i < p; i++) (y <<= 1), _ == e - 1 ? ((_ = 0), d.push(r(y)), (y = 0)) : _++;
                          for (n = l.charCodeAt(0), i = 0; i < 8; i++)
                            (y = (y << 1) | (1 & n)), _ == e - 1 ? ((_ = 0), d.push(r(y)), (y = 0)) : _++, (n >>= 1);
                        } else {
                          for (n = 1, i = 0; i < p; i++)
                            (y = (y << 1) | n), _ == e - 1 ? ((_ = 0), d.push(r(y)), (y = 0)) : _++, (n = 0);
                          for (n = l.charCodeAt(0), i = 0; i < 16; i++)
                            (y = (y << 1) | (1 & n)), _ == e - 1 ? ((_ = 0), d.push(r(y)), (y = 0)) : _++, (n >>= 1);
                        }
                        0 == --f && ((f = Math.pow(2, p)), p++), delete c[l];
                      } else
                        for (n = s[l], i = 0; i < p; i++)
                          (y = (y << 1) | (1 & n)), _ == e - 1 ? ((_ = 0), d.push(r(y)), (y = 0)) : _++, (n >>= 1);
                      0 == --f && ((f = Math.pow(2, p)), p++), (s[h] = u++), (l = String(a));
                    }
                  if ('' !== l) {
                    if (Object.prototype.hasOwnProperty.call(c, l)) {
                      if (l.charCodeAt(0) < 256) {
                        for (i = 0; i < p; i++) (y <<= 1), _ == e - 1 ? ((_ = 0), d.push(r(y)), (y = 0)) : _++;
                        for (n = l.charCodeAt(0), i = 0; i < 8; i++)
                          (y = (y << 1) | (1 & n)), _ == e - 1 ? ((_ = 0), d.push(r(y)), (y = 0)) : _++, (n >>= 1);
                      } else {
                        for (n = 1, i = 0; i < p; i++)
                          (y = (y << 1) | n), _ == e - 1 ? ((_ = 0), d.push(r(y)), (y = 0)) : _++, (n = 0);
                        for (n = l.charCodeAt(0), i = 0; i < 16; i++)
                          (y = (y << 1) | (1 & n)), _ == e - 1 ? ((_ = 0), d.push(r(y)), (y = 0)) : _++, (n >>= 1);
                      }
                      0 == --f && ((f = Math.pow(2, p)), p++), delete c[l];
                    } else
                      for (n = s[l], i = 0; i < p; i++)
                        (y = (y << 1) | (1 & n)), _ == e - 1 ? ((_ = 0), d.push(r(y)), (y = 0)) : _++, (n >>= 1);
                    0 == --f && ((f = Math.pow(2, p)), p++);
                  }
                  for (n = 2, i = 0; i < p; i++)
                    (y = (y << 1) | (1 & n)), _ == e - 1 ? ((_ = 0), d.push(r(y)), (y = 0)) : _++, (n >>= 1);
                  for (;;) {
                    if (((y <<= 1), _ == e - 1)) {
                      d.push(r(y));
                      break;
                    }
                    _++;
                  }
                  return d.join('');
                },
                decompress: function (t) {
                  return null == t
                    ? ''
                    : '' == t
                      ? null
                      : o._decompress(t.length, 32768, function (e) {
                          return t.charCodeAt(e);
                        });
                },
                _decompress: function (e, r, i) {
                  var n,
                    o,
                    s,
                    c,
                    a,
                    h,
                    l,
                    f = [],
                    u = 4,
                    p = 4,
                    d = 3,
                    y = '',
                    _ = [],
                    g = { val: i(0), position: r, index: 1 };
                  for (n = 0; n < 3; n += 1) f[n] = n;
                  for (s = 0, a = Math.pow(2, 2), h = 1; h != a; )
                    (c = g.val & g.position),
                      (g.position >>= 1),
                      0 == g.position && ((g.position = r), (g.val = i(g.index++))),
                      (s |= (c > 0 ? 1 : 0) * h),
                      (h <<= 1);
                  switch (s) {
                    case 0:
                      for (s = 0, a = Math.pow(2, 8), h = 1; h != a; )
                        (c = g.val & g.position),
                          (g.position >>= 1),
                          0 == g.position && ((g.position = r), (g.val = i(g.index++))),
                          (s |= (c > 0 ? 1 : 0) * h),
                          (h <<= 1);
                      l = t(s);
                      break;
                    case 1:
                      for (s = 0, a = Math.pow(2, 16), h = 1; h != a; )
                        (c = g.val & g.position),
                          (g.position >>= 1),
                          0 == g.position && ((g.position = r), (g.val = i(g.index++))),
                          (s |= (c > 0 ? 1 : 0) * h),
                          (h <<= 1);
                      l = t(s);
                      break;
                    case 2:
                      return '';
                  }
                  for (f[3] = l, o = l, _.push(l); ; ) {
                    if (g.index > e) return '';
                    for (s = 0, a = Math.pow(2, d), h = 1; h != a; )
                      (c = g.val & g.position),
                        (g.position >>= 1),
                        0 == g.position && ((g.position = r), (g.val = i(g.index++))),
                        (s |= (c > 0 ? 1 : 0) * h),
                        (h <<= 1);
                    switch ((l = s)) {
                      case 0:
                        for (s = 0, a = Math.pow(2, 8), h = 1; h != a; )
                          (c = g.val & g.position),
                            (g.position >>= 1),
                            0 == g.position && ((g.position = r), (g.val = i(g.index++))),
                            (s |= (c > 0 ? 1 : 0) * h),
                            (h <<= 1);
                        (f[p++] = t(s)), (l = p - 1), u--;
                        break;
                      case 1:
                        for (s = 0, a = Math.pow(2, 16), h = 1; h != a; )
                          (c = g.val & g.position),
                            (g.position >>= 1),
                            0 == g.position && ((g.position = r), (g.val = i(g.index++))),
                            (s |= (c > 0 ? 1 : 0) * h),
                            (h <<= 1);
                        (f[p++] = t(s)), (l = p - 1), u--;
                        break;
                      case 2:
                        return _.join('');
                    }
                    if ((0 == u && ((u = Math.pow(2, d)), d++), f[l])) y = f[l];
                    else {
                      if (l !== p) return null;
                      y = o + o.charAt(0);
                    }
                    _.push(y), (f[p++] = o + y.charAt(0)), (o = y), 0 == --u && ((u = Math.pow(2, d)), d++);
                  }
                },
              };
              return o;
            })();
          void 0 ===
            (i = function () {
              return n;
            }.call(e, r, e, t)) || (t.exports = i);
        },
        477: () => {},
      },
      e = {};
    function r(i) {
      var n = e[i];
      if (void 0 !== n) return n.exports;
      var o = (e[i] = { exports: {} });
      return t[i].call(o.exports, o, o.exports, r), o.exports;
    }
    (r.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return r.d(e, { a: e }), e;
    }),
      (r.d = (t, e) => {
        for (var i in e) r.o(e, i) && !r.o(t, i) && Object.defineProperty(t, i, { enumerable: !0, get: e[i] });
      }),
      (r.g = (function () {
        if ('object' == typeof globalThis) return globalThis;
        try {
          return this || new Function('return this')();
        } catch (t) {
          if ('object' == typeof window) return window;
        }
      })()),
      (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (r.r = (t) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      });
    var i = {};
    return (
      (() => {
        'use strict';
        r.r(i), r.d(i, { default: () => D });
        const t = { KEY_NOT_PROVIDED: 'keyNotProvided', META_KEY_REMOVE: 'metaKeyRemove', DEFAULT_TEXT: 'defaultText' },
          e = {};
        (e[t.KEY_NOT_PROVIDED] = 'Secure LS: Key not provided. Aborting operation!'),
          (e[t.META_KEY_REMOVE] =
            'Secure LS: Meta key can not be removed\nunless all keys created by Secure LS are removed!'),
          (e[t.DEFAULT_TEXT] = 'Unexpected output');
        const n = {
            WarningEnum: t,
            WarningTypes: e,
            EncrytionTypes: { BASE64: 'base64', AES: 'aes', DES: 'des', RABBIT: 'rabbit', RC4: 'rc4' },
            metaKey: '_secure__ls__metadata',
            secretPhrase: 's3cr3t$#@135^&*246',
          },
          o = {
            Latin1: {
              stringify: (t) => {
                let e,
                  r,
                  i = t.words,
                  n = t.sigBytes,
                  o = [];
                for (e = 0; e < n; e++) (r = (i[e >>> 2] >>> (24 - (e % 4) * 8)) & 255), o.push(String.fromCharCode(r));
                return o.join('');
              },
            },
            _Utf8: {
              stringify: (t) => {
                try {
                  return decodeURIComponent(escape(o.Latin1.stringify(t)));
                } catch (t) {
                  throw new Error('Malformed UTF-8 data', t);
                }
              },
            },
          },
          s = o;
        var c = r(19),
          a = r.n(c);
        let h = {
          random: function (t) {
            let e = [],
              r = function (t) {
                let e = 987654321,
                  r = 4294967295;
                return function () {
                  e = (36969 * (65535 & e) + (e >> 16)) & r;
                  let i = ((e << 16) + (t = (18e3 * (65535 & t) + (t >> 16)) & r)) & r;
                  return (i /= 4294967296), (i += 0.5), i * (Math.random() > 0.5 ? 1 : -1);
                };
              };
            for (let i, n = 0; n < t; n += 4) {
              let t = r(4294967296 * (i || Math.random()));
              (i = 987654071 * t()), e.push((4294967296 * t()) | 0);
            }
            return new h.Set(e, t);
          },
          Set: function (t, e) {
            (t = this.words = t || []), (this.sigBytes = void 0 !== e ? e : 8 * t.length);
          },
        };
        const l = h,
          f = (t) => !!t,
          u = (t = n.WarningEnum.DEFAULT_TEXT) => {
            console.warn(n.WarningTypes[t]);
          },
          p = () => {
            const t = l.random(16);
            return a()(n.secretPhrase, t, { keySize: 4 }).toString();
          },
          d = (t = [], e) => t.find((t) => t.k === e) || {},
          y = ({ keys: t = [] } = {}) => t.map(({ k: t }) => t),
          _ = (t = [], e) => t.some((t) => String(t.k) === String(e)),
          g = (t = [], e) => {
            const r = t.findIndex((t) => t.k === e);
            return -1 !== r && t.splice(r, 1), r;
          };
        var v = r(955),
          m = r.n(v),
          S = r(298),
          B = r.n(S),
          k = r(193),
          E = r.n(k),
          C = r(628),
          w = r.n(C),
          A = r(992);
        const x = {
            _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            encode: function (t) {
              let e,
                r,
                i,
                n,
                o,
                s,
                c,
                a = '',
                h = 0;
              for (t = x._utf8Encode(t); h < t.length; )
                (e = t.charCodeAt(h++)),
                  (r = t.charCodeAt(h++)),
                  (i = t.charCodeAt(h++)),
                  (n = e >> 2),
                  (o = ((3 & e) << 4) | (r >> 4)),
                  (s = ((15 & r) << 2) | (i >> 6)),
                  (c = 63 & i),
                  isNaN(r) ? (s = c = 64) : isNaN(i) && (c = 64),
                  (a =
                    a +
                    this._keyStr.charAt(n) +
                    this._keyStr.charAt(o) +
                    this._keyStr.charAt(s) +
                    this._keyStr.charAt(c));
              return a;
            },
            decode: function (t) {
              let e,
                r,
                i,
                n,
                o,
                s,
                c,
                a = '',
                h = 0;
              for (t = t.replace(/[^A-Za-z0-9+/=]/g, ''); h < t.length; )
                (n = this._keyStr.indexOf(t.charAt(h++))),
                  (o = this._keyStr.indexOf(t.charAt(h++))),
                  (s = this._keyStr.indexOf(t.charAt(h++))),
                  (c = this._keyStr.indexOf(t.charAt(h++))),
                  (e = (n << 2) | (o >> 4)),
                  (r = ((15 & o) << 4) | (s >> 2)),
                  (i = ((3 & s) << 6) | c),
                  (a += String.fromCharCode(e)),
                  64 !== s && (a += String.fromCharCode(r)),
                  64 !== c && (a += String.fromCharCode(i));
              return (a = x._utf8Decode(a)), a;
            },
            _utf8Encode: function (t) {
              t = t.replace(/\r\n/g, '\n');
              let e = '';
              for (let r = 0; r < t.length; r++) {
                let i = t.charCodeAt(r);
                i < 128
                  ? (e += String.fromCharCode(i))
                  : i > 127 && i < 2048
                    ? ((e += String.fromCharCode((i >> 6) | 192)), (e += String.fromCharCode((63 & i) | 128)))
                    : ((e += String.fromCharCode((i >> 12) | 224)),
                      (e += String.fromCharCode(((i >> 6) & 63) | 128)),
                      (e += String.fromCharCode((63 & i) | 128)));
              }
              return e;
            },
            _utf8Decode: function (t) {
              let e,
                r,
                i,
                n = '',
                o = 0;
              for (e = r = 0; o < t.length; )
                (e = t.charCodeAt(o)),
                  e < 128
                    ? ((n += String.fromCharCode(e)), o++)
                    : e > 191 && e < 224
                      ? ((r = t.charCodeAt(o + 1)), (n += String.fromCharCode(((31 & e) << 6) | (63 & r))), (o += 2))
                      : ((r = t.charCodeAt(o + 1)),
                        (i = t.charCodeAt(o + 2)),
                        (n += String.fromCharCode(((15 & e) << 12) | ((63 & r) << 6) | (63 & i))),
                        (o += 3));
              return n;
            },
          },
          b = x,
          T = {
            [n.EncrytionTypes.AES]: m(),
            [n.EncrytionTypes.DES]: w(),
            [n.EncrytionTypes.RABBIT]: B(),
            [n.EncrytionTypes.RC4]: E(),
          },
          D = class {
            constructor({
              encryptionSecret: t = '',
              encryptionNamespace: e = '',
              isCompression: r = !0,
              encodingType: i = n.EncrytionTypes.BASE64,
              storage: o = localStorage,
              metaKey: c = n.metaKey,
            } = {}) {
              Object.assign(this, {
                _name: 'secure-ls',
                Base64: b,
                LZString: { compressToUTF16: A.compressToUTF16, decompressFromUTF16: A.decompressFromUTF16 },
                AES: m(),
                DES: w(),
                RABBIT: B(),
                RC4: E(),
                enc: s,
              }),
                (this.config = {
                  encryptionSecret: t,
                  encryptionNamespace: e,
                  isCompression: r,
                  encodingType: i.toLowerCase(),
                  storage: o,
                  metaKey: c,
                }),
                (this.encryptionSecret = t),
                (this.storage = o),
                (this.metaKey = c),
                this.init();
            }
            init() {
              let t = this.getMetaData();
              (this._isBase64 = this._isBase64EncryptionType()),
                (this._isAES = this._isAESEncryptionType()),
                (this._isDES = this._isDESEncryptionType()),
                (this._isRabbit = this._isRabbitEncryptionType()),
                (this._isRC4 = this._isRC4EncryptionType()),
                (this._isCompression = this._isDataCompressionEnabled()),
                (this.allKeys = t.keys || this.resetAllKeys());
            }
            _isBase64EncryptionType() {
              return b && (void 0 === this.config.encodingType || this.config.encodingType === n.EncrytionTypes.BASE64);
            }
            _isAESEncryptionType() {
              return m() && this.config.encodingType === n.EncrytionTypes.AES;
            }
            _isDESEncryptionType() {
              return w() && this.config.encodingType === n.EncrytionTypes.DES;
            }
            _isRabbitEncryptionType() {
              return B() && this.config.encodingType === n.EncrytionTypes.RABBIT;
            }
            _isRC4EncryptionType() {
              return E() && this.config.encodingType === n.EncrytionTypes.RC4;
            }
            _isDataCompressionEnabled() {
              return this.config.isCompression;
            }
            getEncryptionSecret(t) {
              let e = this.getMetaData(),
                r = d(e.keys, t);
              r &&
                (this._isAES || this._isDES || this._isRabbit || this._isRC4) &&
                (void 0 === this.config.encryptionSecret
                  ? ((this.encryptionSecret = r.s),
                    this.encryptionSecret || ((this.encryptionSecret = p()), this.setMetaData()))
                  : (this.encryptionSecret = this.config.encryptionSecret || r.s || ''));
            }
            getEncryptionType() {
              const t = this.config.encodingType;
              return t ? t.toLowerCase() : n.EncrytionTypes.BASE64;
            }
            getDataFromLocalStorage(t) {
              return this.storage.getItem(t, !0);
            }
            setDataToLocalStorage(t, e) {
              this.storage.setItem(t, e);
            }
            setMetaData() {
              let t = this.processData({ keys: this.allKeys }, !0);
              this.setDataToLocalStorage(this.getMetaKey(), t);
            }
            getMetaData() {
              return this.get(this.getMetaKey(), !0) || {};
            }
            getMetaKey() {
              return this.metaKey + (this.config.encryptionNamespace ? '__' + this.config.encryptionNamespace : '');
            }
            resetAllKeys() {
              return (this.allKeys = []), [];
            }
            processData(t, e) {
              if (null == t || '' === t) return '';
              let r;
              try {
                r = JSON.stringify(t);
              } catch (t) {
                throw new Error('Could not stringify data', t);
              }
              let i = r;
              if (this._isBase64 || e) i = b.encode(r);
              else {
                const t = T[this.getEncryptionType()];
                t && (i = t.encrypt(r, this.encryptionSecret)), (i = i && i.toString());
              }
              let n = i;
              return (this._isCompression || e) && (n = this.LZString.compressToUTF16(i)), n;
            }
            getAllKeys() {
              let t = this.getMetaData();
              return y(t) || [];
            }
            get(t, e) {
              let r = '',
                i = '';
              if (!f(t)) return u(n.WarningEnum.KEY_NOT_PROVIDED), i;
              let o = this.getDataFromLocalStorage(t);
              if (!o) return i;
              let c = o;
              if (
                ((this._isCompression || e) && (c = this.LZString.decompressFromUTF16(o)), (r = c), this._isBase64 || e)
              )
                r = b.decode(c);
              else {
                this.getEncryptionSecret(t);
                const e = T[this.getEncryptionType()];
                if (e) {
                  const t = e.decrypt(c.toString(), this.encryptionSecret);
                  t && (r = t.toString(s._Utf8));
                }
              }
              try {
                i = JSON.parse(r);
              } catch (t) {
                throw new Error('Could not parse JSON', t);
              }
              return i;
            }
            set(t, e) {
              let r = '';
              f(t)
                ? (this.getEncryptionSecret(t),
                  String(t) !== String(this.metaKey) &&
                    (_(this.allKeys, t) || (this.allKeys.push({ k: t, s: this.encryptionSecret }), this.setMetaData())),
                  (r = this.processData(e)),
                  this.setDataToLocalStorage(t, r))
                : u(n.WarningEnum.KEY_NOT_PROVIDED);
            }
            remove(t) {
              f(t)
                ? t === this.metaKey && this.getAllKeys().length
                  ? u(n.WarningEnum.META_KEY_REMOVE)
                  : (_(this.allKeys, t) && (g(this.allKeys, t), this.setMetaData()), this.storage.removeItem(t))
                : u(n.WarningEnum.KEY_NOT_PROVIDED);
            }
            removeAll() {
              let t = this.getAllKeys();
              for (let e = 0; e < t.length; e++) this.storage.removeItem(t[e]);
              this.storage.removeItem(this.metaKey), this.resetAllKeys();
            }
            clear() {
              this.storage.clear(), this.resetAllKeys();
            }
          };
      })(),
      i
    );
  })(),
);
//# sourceMappingURL=secure-ls.min.js.map
