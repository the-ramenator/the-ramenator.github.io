(function() {
  var g,
    aa = this,
    l = function(a) {
      return void 0 !== a;
    },
    ba = function(a, b, c) {
      a = a.split('.');
      c = c || aa;
      a[0] in c || !c.execScript || c.execScript('var ' + a[0]);
      for (var d; a.length && (d = a.shift()); )
        !a.length && l(b) ? (c[d] = b) : (c = c[d] ? c[d] : (c[d] = {}));
    },
    ca = function(a) {
      var b = typeof a;
      if ('object' == b)
        if (a) {
          if (a instanceof Array) return 'array';
          if (a instanceof Object) return b;
          var c = Object.prototype.toString.call(a);
          if ('[object Window]' == c) return 'object';
          if (
            '[object Array]' == c ||
            ('number' == typeof a.length &&
              'undefined' != typeof a.splice &&
              'undefined' != typeof a.propertyIsEnumerable &&
              !a.propertyIsEnumerable('splice'))
          )
            return 'array';
          if (
            '[object Function]' == c ||
            ('undefined' != typeof a.call &&
              'undefined' != typeof a.propertyIsEnumerable &&
              !a.propertyIsEnumerable('call'))
          )
            return 'function';
        } else return 'null';
      else if ('function' == b && 'undefined' == typeof a.call) return 'object';
      return b;
    },
    da = function(a) {
      return 'array' == ca(a);
    },
    ea = function(a) {
      var b = ca(a);
      return 'array' == b || ('object' == b && 'number' == typeof a.length);
    },
    fa = function(a) {
      return 'string' == typeof a;
    },
    ga = function(a) {
      return 'boolean' == typeof a;
    },
    ha = function(a) {
      return 'number' == typeof a;
    },
    q = function(a) {
      return 'function' == ca(a);
    },
    ia = function(a) {
      var b = typeof a;
      return ('object' == b && null != a) || 'function' == b;
    },
    ja = 'closure_uid_' + ((1e9 * Math.random()) >>> 0),
    ka = 0,
    la = function(a, b, c) {
      return a.call.apply(a.bind, arguments);
    },
    ma = function(a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
          var c = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(c, d);
          return a.apply(b, c);
        };
      }
      return function() {
        return a.apply(b, arguments);
      };
    },
    na = function(a, b, c) {
      na =
        Function.prototype.bind &&
        -1 != Function.prototype.bind.toString().indexOf('native code')
          ? la
          : ma;
      return na.apply(null, arguments);
    },
    oa = function(a, b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b);
      };
    },
    pa =
      Date.now ||
      function() {
        return +new Date();
      },
    v = function(a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.O = b.prototype;
      a.prototype = new c();
      a.prototype.constructor = a;
      a.Tg = function(a, c, f) {
        for (
          var h = Array(arguments.length - 2), k = 2;
          k < arguments.length;
          k++
        )
          h[k - 2] = arguments[k];
        return b.prototype[c].apply(a, h);
      };
    };
  Object.defineProperty &&
    !Object.defineProperties &&
    (Object.defineProperties = function(a, b) {
      for (var c in b) Object.defineProperty(a, c, b[c]);
      return a;
    });
  'Uint32Array' in window || (window.Uint32Array = Array);
  'Uint8Array' in window || (window.Uint8Array = Array);
  'Float32Array' in window || (window.Float32Array = Array);
  var qa = String.prototype.trim
      ? function(a) {
          return a.trim();
        }
      : function(a) {
          return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
        },
    ya = function(a, b) {
      if (b)
        a = a
          .replace(ra, '&amp;')
          .replace(sa, '&lt;')
          .replace(ta, '&gt;')
          .replace(ua, '&quot;')
          .replace(va, '&#39;')
          .replace(wa, '&#0;');
      else {
        if (!xa.test(a)) return a;
        -1 != a.indexOf('&') && (a = a.replace(ra, '&amp;'));
        -1 != a.indexOf('<') && (a = a.replace(sa, '&lt;'));
        -1 != a.indexOf('>') && (a = a.replace(ta, '&gt;'));
        -1 != a.indexOf('"') && (a = a.replace(ua, '&quot;'));
        -1 != a.indexOf("'") && (a = a.replace(va, '&#39;'));
        -1 != a.indexOf('\x00') && (a = a.replace(wa, '&#0;'));
      }
      return a;
    },
    ra = /&/g,
    sa = /</g,
    ta = />/g,
    ua = /"/g,
    va = /'/g,
    wa = /\x00/g,
    xa = /[\x00&<>"']/,
    za = {
      '\x00': '\\0',
      '\b': '\\b',
      '\f': '\\f',
      '\n': '\\n',
      '\r': '\\r',
      '\t': '\\t',
      '\x0B': '\\x0B',
      '"': '\\"',
      '\\': '\\\\',
    },
    Aa = { "'": "\\'" },
    Ba = function(a) {
      a = String(a);
      if (a.quote) return a.quote();
      for (var b = ['"'], c = 0; c < a.length; c++) {
        var d = a.charAt(c),
          e = d.charCodeAt(0),
          f = c + 1,
          h;
        if (!(h = za[d])) {
          if (!(31 < e && 127 > e))
            if (d in Aa) d = Aa[d];
            else if (d in za) d = Aa[d] = za[d];
            else {
              e = d;
              h = d.charCodeAt(0);
              if (31 < h && 127 > h) e = d;
              else {
                if (256 > h) {
                  if (((e = '\\x'), 16 > h || 256 < h)) e += '0';
                } else (e = '\\u'), 4096 > h && (e += '0');
                e += h.toString(16).toUpperCase();
              }
              d = Aa[d] = e;
            }
          h = d;
        }
        b[f] = h;
      }
      b.push('"');
      return b.join('');
    },
    Ca = function(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    };
  var Da = Array.prototype,
    Ea = Da.indexOf
      ? function(a, b, c) {
          return Da.indexOf.call(a, b, c);
        }
      : function(a, b, c) {
          c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
          if (fa(a)) return fa(b) && 1 == b.length ? a.indexOf(b, c) : -1;
          for (; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    Fa = Da.every
      ? function(a, b, c) {
          return Da.every.call(a, b, c);
        }
      : function(a, b, c) {
          for (var d = a.length, e = fa(a) ? a.split('') : a, f = 0; f < d; f++)
            if (f in e && !b.call(c, e[f], f, a)) return !1;
          return !0;
        },
    Ga = function(a, b) {
      var c = Ea(a, b),
        d;
      (d = 0 <= c) && Da.splice.call(a, c, 1);
      return d;
    },
    Ha = function(a, b, c) {
      t: {
        for (var d = a.length, e = fa(a) ? a.split('') : a, f = 0; f < d; f++)
          if (f in e && b.call(c, e[f], f, a)) {
            b = f;
            break t;
          }
        b = -1;
      }
      return 0 <= b ? (Da.splice.call(a, b, 1), !0) : !1;
    },
    Ia = function(a) {
      return Da.concat.apply(Da, arguments);
    },
    Ja = function(a, b, c) {
      return 2 >= arguments.length
        ? Da.slice.call(a, b)
        : Da.slice.call(a, b, c);
    },
    La = function(a, b, c) {
      c = c || Ka;
      for (var d = 0, e = a.length, f; d < e; ) {
        var h = (d + e) >> 1,
          k;
        k = c(b, a[h]);
        0 < k ? (d = h + 1) : ((e = h), (f = !k));
      }
      return f ? d : ~d;
    },
    Na = function(a, b, c) {
      if (!ea(a) || !ea(b) || a.length != b.length) return !1;
      var d = a.length;
      c = c || Ma;
      for (var e = 0; e < d; e++) if (!c(a[e], b[e])) return !1;
      return !0;
    },
    Ka = function(a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    },
    Ma = function(a, b) {
      return a === b;
    };
  var Oa = function(a, b, c) {
      for (var d in a) b.call(c, a[d], d, a);
    },
    Pa = function(a) {
      var b = [],
        c = 0,
        d;
      for (d in a) b[c++] = a[d];
      return b;
    },
    Qa = function(a) {
      var b = [],
        c = 0,
        d;
      for (d in a) b[c++] = d;
      return b;
    },
    Ra = function(a) {
      var b = ca(a);
      if ('object' == b || 'array' == b) {
        if (a.clone) return a.clone();
        var b = 'array' == b ? [] : {},
          c;
        for (c in a) b[c] = Ra(a[c]);
        return b;
      }
      return a;
    },
    Sa = 'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
      ' '
    ),
    Ta = function(a, b) {
      for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < Sa.length; f++)
          (c = Sa[f]),
            Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
      }
    },
    Ua = function(a) {
      var b = arguments.length;
      if (1 == b && da(arguments[0])) return Ua.apply(null, arguments[0]);
      for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
      return c;
    };
  Ua(
    'area base br col command embed hr img input keygen link meta param source track wbr'.split(
      ' '
    )
  );
  Ua(
    'action',
    'cite',
    'data',
    'formaction',
    'href',
    'manifest',
    'poster',
    'src'
  );
  Ua('embed', 'iframe', 'link', 'object', 'script', 'style', 'template');
  var Va;
  t: {
    var Wa = aa.navigator;
    if (Wa) {
      var Xa = Wa.userAgent;
      if (Xa) {
        Va = Xa;
        break t;
      }
    }
    Va = '';
  }
  var Ya = function(a) {
    return -1 != Va.indexOf(a);
  };
  var Za = function() {
      return Ya('Opera') || Ya('OPR');
    },
    $a = function() {
      return Ya('Edge') || Ya('Trident') || Ya('MSIE');
    },
    ab = function() {
      return (Ya('Chrome') || Ya('CriOS')) && !Za() && !$a();
    };
  var bb = function() {
    return Ya('Edge');
  };
  var cb = function() {
    return Ya('iPhone') && !Ya('iPod') && !Ya('iPad');
  };
  var db = Za(),
    eb = $a(),
    fb =
      Ya('Gecko') &&
      !(-1 != Va.toLowerCase().indexOf('webkit') && !bb()) &&
      !(Ya('Trident') || Ya('MSIE')) &&
      !bb(),
    gb = -1 != Va.toLowerCase().indexOf('webkit') && !bb(),
    hb = gb && Ya('Mobile'),
    ib = Ya('Macintosh'),
    jb = Ya('Windows'),
    kb = Ya('Linux') || Ya('CrOS'),
    lb = Ya('Android'),
    mb = function() {
      var a = Va;
      if (fb) return /rv\:([^\);]+)(\)|;)/.exec(a);
      if (eb && bb()) return /Edge\/([\d\.]+)/.exec(a);
      if (eb) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
      if (gb) return /WebKit\/(\S+)/.exec(a);
    },
    nb = function() {
      var a = aa.document;
      return a ? a.documentMode : void 0;
    },
    ob = (function() {
      if (db && aa.opera) {
        var a = aa.opera.version;
        return q(a) ? a() : a;
      }
      var a = '',
        b = mb();
      b && (a = b ? b[1] : '');
      return eb && !bb() && ((b = nb()), b > parseFloat(a)) ? String(b) : a;
    })(),
    pb = {},
    qb = function(a) {
      var b;
      if (!(b = pb[a])) {
        b = 0;
        for (
          var c = qa(String(ob)).split('.'),
            d = qa(String(a)).split('.'),
            e = Math.max(c.length, d.length),
            f = 0;
          0 == b && f < e;
          f++
        ) {
          var h = c[f] || '',
            k = d[f] || '',
            m = RegExp('(\\d*)(\\D*)', 'g'),
            n = RegExp('(\\d*)(\\D*)', 'g');
          do {
            var t = m.exec(h) || ['', '', ''],
              p = n.exec(k) || ['', '', ''];
            if (0 == t[0].length && 0 == p[0].length) break;
            b =
              Ca(
                0 == t[1].length ? 0 : parseInt(t[1], 10),
                0 == p[1].length ? 0 : parseInt(p[1], 10)
              ) ||
              Ca(0 == t[2].length, 0 == p[2].length) ||
              Ca(t[2], p[2]);
          } while (0 == b);
        }
        b = pb[a] = 0 <= b;
      }
      return b;
    },
    rb = aa.document,
    sb = nb(),
    tb =
      !rb || !eb || (!sb && bb())
        ? void 0
        : sb || ('CSS1Compat' == rb.compatMode ? parseInt(ob, 10) : 5);
  (!fb && !eb) || (eb && eb && (bb() || 9 <= tb)) || (fb && qb('1.9.1'));
  eb && qb('9');
  var ub = function(a) {
    ub[' '](a);
    return a;
  };
  ub[' '] = function() {};
  var vb = !eb || (eb && (bb() || 9 <= tb)),
    wb = eb && !qb('9');
  !gb || qb('528');
  (fb && qb('1.9b')) ||
    (eb && qb('8')) ||
    (db && qb('9.5')) ||
    (gb && qb('528'));
  (fb && !qb('8')) || (eb && qb('9'));
  var xb = function() {
    this.Oi = this.Oi;
    this.Pj = this.Pj;
  };
  xb.prototype.Oi = !1;
  xb.prototype.hl = function() {
    this.Oi || ((this.Oi = !0), this.ph());
  };
  xb.prototype.ph = function() {
    if (this.Pj) for (; this.Pj.length; ) this.Pj.shift()();
  };
  var yb = function(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.Ze = !1;
    this.er = !0;
  };
  yb.prototype.stopPropagation = function() {
    this.Ze = !0;
  };
  yb.prototype.preventDefault = function() {
    this.defaultPrevented = !0;
    this.er = !1;
  };
  var zb = function(a, b) {
    yb.call(this, a ? a.type : '');
    this.relatedTarget = this.currentTarget = this.target = null;
    this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.Mb = this.state = null;
    a && this.init(a, b);
  };
  v(zb, yb);
  zb.prototype.init = function(a, b) {
    var c = (this.type = a.type);
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    var d = a.relatedTarget;
    if (d) {
      if (fb) {
        var e;
        t: {
          try {
            ub(d.nodeName);
            e = !0;
            break t;
          } catch (f) {}
          e = !1;
        }
        e || (d = null);
      }
    } else
      'mouseover' == c
        ? (d = a.fromElement)
        : 'mouseout' == c && (d = a.toElement);
    this.relatedTarget = d;
    this.offsetX = gb || void 0 !== a.offsetX ? a.offsetX : a.layerX;
    this.offsetY = gb || void 0 !== a.offsetY ? a.offsetY : a.layerY;
    this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
    this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
    this.screenX = a.screenX || 0;
    this.screenY = a.screenY || 0;
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.charCode = a.charCode || ('keypress' == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.state = a.state;
    this.Mb = a;
    a.defaultPrevented && this.preventDefault();
  };
  zb.prototype.stopPropagation = function() {
    zb.O.stopPropagation.call(this);
    this.Mb.stopPropagation
      ? this.Mb.stopPropagation()
      : (this.Mb.cancelBubble = !0);
  };
  zb.prototype.preventDefault = function() {
    zb.O.preventDefault.call(this);
    var a = this.Mb;
    if (a.preventDefault) a.preventDefault();
    else if (((a.returnValue = !1), wb))
      try {
        if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
      } catch (b) {}
  };
  var Ab = 'closure_listenable_' + ((1e6 * Math.random()) | 0),
    Bb = 0;
  var Cb = function(a, b, c, d, e, f) {
    this.wc = a;
    this.Tj = b;
    this.src = c;
    this.type = d;
    this.Ai = !!e;
    this.Oe = f;
    this.key = ++Bb;
    this.rg = this.zi = !1;
  };
  Cb.prototype.Kj = function() {
    this.rg = !0;
    this.Oe = this.src = this.Tj = this.wc = null;
  };
  var Db = function(a) {
    this.src = a;
    this.eb = {};
    this.gi = 0;
  };
  g = Db.prototype;
  g.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.eb[f];
    a || ((a = this.eb[f] = []), this.gi++);
    var h = Eb(a, b, d, e);
    -1 < h
      ? ((b = a[h]), c || (b.zi = !1))
      : ((b = new Cb(b, null, this.src, f, !!d, e)), (b.zi = c), a.push(b));
    return b;
  };
  g.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.eb)) return !1;
    var e = this.eb[a];
    b = Eb(e, b, c, d);
    return -1 < b
      ? (e[b].Kj(),
        Da.splice.call(e, b, 1),
        0 == e.length && (delete this.eb[a], this.gi--),
        !0)
      : !1;
  };
  g.Oq = function(a) {
    var b = a.type;
    if (!(b in this.eb)) return !1;
    var c = Ga(this.eb[b], a);
    c && (a.Kj(), 0 == this.eb[b].length && (delete this.eb[b], this.gi--));
    return c;
  };
  g.Kq = function(a) {
    a = a && a.toString();
    var b = 0,
      c;
    for (c in this.eb)
      if (!a || c == a) {
        for (var d = this.eb[c], e = 0; e < d.length; e++) ++b, d[e].Kj();
        delete this.eb[c];
        this.gi--;
      }
    return b;
  };
  g.Dl = function(a, b, c, d) {
    a = this.eb[a.toString()];
    var e = -1;
    a && (e = Eb(a, b, c, d));
    return -1 < e ? a[e] : null;
  };
  var Eb = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.rg && f.wc == b && f.Ai == !!c && f.Oe == d) return e;
    }
    return -1;
  };
  var Fb = 'closure_lm_' + ((1e6 * Math.random()) | 0),
    Gb = {},
    Hb = 0,
    Ib = function(a, b, c, d, e) {
      if (da(b)) {
        for (var f = 0; f < b.length; f++) Ib(a, b[f], c, d, e);
        return null;
      }
      c = Jb(c);
      if (a && a[Ab]) a = a.Cv(b, c, d, e);
      else {
        if (!b) throw Error('Invalid event type');
        var f = !!d,
          h = Kb(a);
        h || (a[Fb] = h = new Db(a));
        c = h.add(b, c, !1, d, e);
        c.Tj ||
          ((d = Lb()),
          (c.Tj = d),
          (d.src = a),
          (d.wc = c),
          a.addEventListener
            ? a.addEventListener(b.toString(), d, f)
            : a.attachEvent(Mb(b.toString()), d),
          Hb++);
        a = c;
      }
      return a;
    },
    Lb = function() {
      var a = Nb,
        b = vb
          ? function(c) {
              return a.call(b.src, b.wc, c);
            }
          : function(c) {
              c = a.call(b.src, b.wc, c);
              if (!c) return c;
            };
      return b;
    },
    Ob = function(a, b, c, d, e) {
      if (da(b)) {
        for (var f = 0; f < b.length; f++) Ob(a, b[f], c, d, e);
        return null;
      }
      c = Jb(c);
      if (a && a[Ab]) return a.zx(b, c, d, e);
      if (!a) return !1;
      if ((a = Kb(a))) if ((b = a.Dl(b, c, !!d, e))) return Pb(b);
      return !1;
    },
    Pb = function(a) {
      if (ha(a) || !a || a.rg) return !1;
      var b = a.src;
      if (b && b[Ab]) return b.as(a);
      var c = a.type,
        d = a.Tj;
      b.removeEventListener
        ? b.removeEventListener(c, d, a.Ai)
        : b.detachEvent && b.detachEvent(Mb(c), d);
      Hb--;
      (c = Kb(b))
        ? (c.Oq(a), 0 == c.gi && ((c.src = null), (b[Fb] = null)))
        : a.Kj();
      return !0;
    },
    Qb = function(a, b) {
      if (!a) return 0;
      if (a && a[Ab]) return a.Mq(b);
      var c = Kb(a);
      if (!c) return 0;
      var d = 0,
        e = b && b.toString(),
        f;
      for (f in c.eb)
        if (!e || f == e)
          for (var h = c.eb[f].concat(), k = 0; k < h.length; ++k)
            Pb(h[k]) && ++d;
      return d;
    },
    Mb = function(a) {
      return a in Gb ? Gb[a] : (Gb[a] = 'on' + a);
    },
    Sb = function(a, b, c, d) {
      var e = !0;
      if ((a = Kb(a)))
        if ((b = a.eb[b.toString()]))
          for (b = b.concat(), a = 0; a < b.length; a++) {
            var f = b[a];
            f && f.Ai == c && !f.rg && ((f = Rb(f, d)), (e = e && !1 !== f));
          }
      return e;
    },
    Rb = function(a, b) {
      var c = a.wc,
        d = a.Oe || a.src;
      a.zi && Pb(a);
      return c.call(d, b);
    },
    Nb = function(a, b) {
      if (a.rg) return !0;
      if (!vb) {
        var c;
        if (!(c = b))
          t: {
            c = ['window', 'event'];
            for (var d = aa, e; (e = c.shift()); )
              if (null != d[e]) d = d[e];
              else {
                c = null;
                break t;
              }
            c = d;
          }
        e = c;
        c = new zb(e, this);
        d = !0;
        if (!(0 > e.keyCode || void 0 != e.returnValue)) {
          t: {
            var f = !1;
            if (0 == e.keyCode)
              try {
                e.keyCode = -1;
                break t;
              } catch (h) {
                f = !0;
              }
            if (f || void 0 == e.returnValue) e.returnValue = !0;
          }
          e = [];
          for (f = c.currentTarget; f; f = f.parentNode) e.push(f);
          for (var f = a.type, k = e.length - 1; !c.Ze && 0 <= k; k--) {
            c.currentTarget = e[k];
            var m = Sb(e[k], f, !0, c),
              d = d && m;
          }
          for (k = 0; !c.Ze && k < e.length; k++)
            (c.currentTarget = e[k]), (m = Sb(e[k], f, !1, c)), (d = d && m);
        }
        return d;
      }
      return Rb(a, new zb(b, this));
    },
    Kb = function(a) {
      a = a[Fb];
      return a instanceof Db ? a : null;
    },
    Tb = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0),
    Jb = function(a) {
      if (q(a)) return a;
      a[Tb] ||
        (a[Tb] = function(b) {
          return a.handleEvent(b);
        });
      return a[Tb];
    };
  var Ub = function() {
    xb.call(this);
    this.ze = new Db(this);
    this.xs = this;
    this.sm = null;
  };
  v(Ub, xb);
  Ub.prototype[Ab] = !0;
  g = Ub.prototype;
  g.addEventListener = function(a, b, c, d) {
    Ib(this, a, b, c, d);
  };
  g.removeEventListener = function(a, b, c, d) {
    Ob(this, a, b, c, d);
  };
  g.dispatchEvent = function(a) {
    var b,
      c = this.sm;
    if (c) for (b = []; c; c = c.sm) b.push(c);
    var c = this.xs,
      d = a.type || a;
    if (fa(a)) a = new yb(a, c);
    else if (a instanceof yb) a.target = a.target || c;
    else {
      var e = a;
      a = new yb(d, c);
      Ta(a, e);
    }
    var e = !0,
      f;
    if (b)
      for (var h = b.length - 1; !a.Ze && 0 <= h; h--)
        (f = a.currentTarget = b[h]), (e = f.$i(d, !0, a) && e);
    a.Ze ||
      ((f = a.currentTarget = c),
      (e = f.$i(d, !0, a) && e),
      a.Ze || (e = f.$i(d, !1, a) && e));
    if (b)
      for (h = 0; !a.Ze && h < b.length; h++)
        (f = a.currentTarget = b[h]), (e = f.$i(d, !1, a) && e);
    return e;
  };
  g.ph = function() {
    Ub.O.ph.call(this);
    this.Mq();
    this.sm = null;
  };
  g.Cv = function(a, b, c, d) {
    return this.ze.add(String(a), b, !1, c, d);
  };
  g.zx = function(a, b, c, d) {
    return this.ze.remove(String(a), b, c, d);
  };
  g.as = function(a) {
    return this.ze.Oq(a);
  };
  g.Mq = function(a) {
    return this.ze ? this.ze.Kq(a) : 0;
  };
  g.$i = function(a, b, c) {
    a = this.ze.eb[String(a)];
    if (!a) return !0;
    a = a.concat();
    for (var d = !0, e = 0; e < a.length; ++e) {
      var f = a[e];
      if (f && !f.rg && f.Ai == b) {
        var h = f.wc,
          k = f.Oe || f.src;
        f.zi && this.as(f);
        d = !1 !== h.call(k, c) && d;
      }
    }
    return d && 0 != c.er;
  };
  g.Dl = function(a, b, c, d) {
    return this.ze.Dl(String(a), b, c, d);
  };
  var Xb = function(a, b, c, d, e) {
      if (!(eb || (gb && qb('525')))) return !0;
      if (ib && e) return Vb(a);
      if (e && !d) return !1;
      ha(b) && (b = Wb(b));
      if (!c && (17 == b || 18 == b || (ib && 91 == b))) return !1;
      if (gb && d && c)
        switch (a) {
          case 220:
          case 219:
          case 221:
          case 192:
          case 186:
          case 189:
          case 187:
          case 188:
          case 190:
          case 191:
          case 192:
          case 222:
            return !1;
        }
      if (eb && d && b == a) return !1;
      switch (a) {
        case 13:
          return !0;
        case 27:
          return !gb;
      }
      return Vb(a);
    },
    Vb = function(a) {
      if (
        (48 <= a && 57 >= a) ||
        (96 <= a && 106 >= a) ||
        (65 <= a && 90 >= a) ||
        (gb && 0 == a)
      )
        return !0;
      switch (a) {
        case 32:
        case 63:
        case 107:
        case 109:
        case 110:
        case 111:
        case 186:
        case 59:
        case 189:
        case 187:
        case 61:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
        case 219:
        case 220:
        case 221:
          return !0;
        default:
          return !1;
      }
    },
    Wb = function(a) {
      if (fb) a = Yb(a);
      else if (ib && gb)
        t: switch (a) {
          case 93:
            a = 91;
            break t;
        }
      return a;
    },
    Yb = function(a) {
      switch (a) {
        case 61:
          return 187;
        case 59:
          return 186;
        case 173:
          return 189;
        case 224:
          return 91;
        case 0:
          return 224;
        default:
          return a;
      }
    };
  var $b = function(a, b) {
    Ub.call(this);
    a && this.si(a, b);
  };
  v($b, Ub);
  g = $b.prototype;
  g.sh = null;
  g.Aj = null;
  g.Yl = null;
  g.Dj = null;
  g.Xb = -1;
  g.Qd = -1;
  g.uk = !1;
  var ac = {
      3: 13,
      12: 144,
      63232: 38,
      63233: 40,
      63234: 37,
      63235: 39,
      63236: 112,
      63237: 113,
      63238: 114,
      63239: 115,
      63240: 116,
      63241: 117,
      63242: 118,
      63243: 119,
      63244: 120,
      63245: 121,
      63246: 122,
      63247: 123,
      63248: 44,
      63272: 46,
      63273: 36,
      63275: 35,
      63276: 33,
      63277: 34,
      63289: 144,
      63302: 45,
    },
    bc = {
      Up: 38,
      Down: 40,
      Left: 37,
      Right: 39,
      Enter: 13,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      'U+007F': 46,
      Home: 36,
      End: 35,
      PageUp: 33,
      PageDown: 34,
      Insert: 45,
    },
    cc = eb || (gb && qb('525')),
    dc = ib && fb;
  g = $b.prototype;
  g.Ru = function(a) {
    gb &&
      ((17 == this.Xb && !a.ctrlKey) ||
        (18 == this.Xb && !a.altKey) ||
        (ib && 91 == this.Xb && !a.metaKey)) &&
      (this.Qd = this.Xb = -1);
    -1 == this.Xb &&
      (a.ctrlKey && 17 != a.keyCode
        ? (this.Xb = 17)
        : a.altKey && 18 != a.keyCode
        ? (this.Xb = 18)
        : a.metaKey && 91 != a.keyCode && (this.Xb = 91));
    cc && !Xb(a.keyCode, this.Xb, a.shiftKey, a.ctrlKey, a.altKey)
      ? this.handleEvent(a)
      : ((this.Qd = Wb(a.keyCode)), dc && (this.uk = a.altKey));
  };
  g.Iw = function() {
    this.Qd = this.Xb = -1;
  };
  g.Su = function(a) {
    this.Iw();
    this.uk = a.altKey;
  };
  g.handleEvent = function(a) {
    var b = a.Mb,
      c,
      d,
      e = b.altKey;
    eb && 'keypress' == a.type
      ? ((c = this.Qd), (d = 13 != c && 27 != c ? b.keyCode : 0))
      : gb && 'keypress' == a.type
      ? ((c = this.Qd),
        (d = 0 <= b.charCode && 63232 > b.charCode && Vb(c) ? b.charCode : 0))
      : db
      ? ((c = this.Qd), (d = Vb(c) ? b.keyCode : 0))
      : ((c = b.keyCode || this.Qd),
        (d = b.charCode || 0),
        dc && (e = this.uk),
        ib && 63 == d && 224 == c && (c = 191));
    var f = (c = Wb(c)),
      h = b.keyIdentifier;
    c
      ? 63232 <= c && c in ac
        ? (f = ac[c])
        : 25 == c && a.shiftKey && (f = 9)
      : h && h in bc && (f = bc[h]);
    a = f == this.Xb;
    this.Xb = f;
    b = new ec(f, d, a, b);
    b.altKey = e;
    this.dispatchEvent(b);
  };
  g.si = function(a, b) {
    this.Dj && this.detach();
    this.sh = a;
    this.Aj = Ib(this.sh, 'keypress', this, b);
    this.Yl = Ib(this.sh, 'keydown', this.Ru, b, this);
    this.Dj = Ib(this.sh, 'keyup', this.Su, b, this);
  };
  g.detach = function() {
    this.Aj &&
      (Pb(this.Aj),
      Pb(this.Yl),
      Pb(this.Dj),
      (this.Dj = this.Yl = this.Aj = null));
    this.sh = null;
    this.Qd = this.Xb = -1;
  };
  g.ph = function() {
    $b.O.ph.call(this);
    this.detach();
  };
  var ec = function(a, b, c, d) {
    zb.call(this, d);
    this.type = 'key';
    this.keyCode = a;
    this.charCode = b;
    this.repeat = c;
  };
  v(ec, zb);
  var fc = function(a) {
    return a;
  };
  var gc = 'StopIteration' in aa ? aa.StopIteration : Error('StopIteration'),
    hc = function() {};
  hc.prototype.next = function() {
    throw gc;
  };
  hc.prototype.rk = function() {
    return this;
  };
  var ic = function(a, b) {
    this.fa = {};
    this.xa = [];
    this.ji = this.Ga = 0;
    var c = arguments.length;
    if (1 < c) {
      if (c % 2) throw Error('Uneven number of arguments');
      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    } else a && this.Lg(a);
  };
  g = ic.prototype;
  g.sc = function() {
    return this.Ga;
  };
  g.Ob = function() {
    this.Xg();
    for (var a = [], b = 0; b < this.xa.length; b++)
      a.push(this.fa[this.xa[b]]);
    return a;
  };
  g.Gd = function() {
    this.Xg();
    return this.xa.concat();
  };
  g.gd = function(a) {
    return jc(this.fa, a);
  };
  g.Sk = function(a) {
    for (var b = 0; b < this.xa.length; b++) {
      var c = this.xa[b];
      if (jc(this.fa, c) && this.fa[c] == a) return !0;
    }
    return !1;
  };
  g.ma = function(a, b) {
    if (this === a) return !0;
    if (this.Ga != a.sc()) return !1;
    var c = b || kc;
    this.Xg();
    for (var d, e = 0; (d = this.xa[e]); e++)
      if (!c(this.get(d), a.get(d))) return !1;
    return !0;
  };
  var kc = function(a, b) {
    return a === b;
  };
  g = ic.prototype;
  g.Na = function() {
    return 0 == this.Ga;
  };
  g.clear = function() {
    this.fa = {};
    this.ji = this.Ga = this.xa.length = 0;
  };
  g.remove = function(a) {
    return jc(this.fa, a)
      ? (delete this.fa[a],
        this.Ga--,
        this.ji++,
        this.xa.length > 2 * this.Ga && this.Xg(),
        !0)
      : !1;
  };
  g.Xg = function() {
    if (this.Ga != this.xa.length) {
      for (var a = 0, b = 0; a < this.xa.length; ) {
        var c = this.xa[a];
        jc(this.fa, c) && (this.xa[b++] = c);
        a++;
      }
      this.xa.length = b;
    }
    if (this.Ga != this.xa.length) {
      for (var d = {}, b = (a = 0); a < this.xa.length; )
        (c = this.xa[a]), jc(d, c) || ((this.xa[b++] = c), (d[c] = 1)), a++;
      this.xa.length = b;
    }
  };
  g.get = function(a, b) {
    return jc(this.fa, a) ? this.fa[a] : b;
  };
  g.set = function(a, b) {
    jc(this.fa, a) || (this.Ga++, this.xa.push(a), this.ji++);
    this.fa[a] = b;
  };
  g.Lg = function(a) {
    var b;
    a instanceof ic ? ((b = a.Gd()), (a = a.Ob())) : ((b = Qa(a)), (a = Pa(a)));
    for (var c = 0; c < b.length; c++) this.set(b[c], a[c]);
  };
  g.forEach = function(a, b) {
    for (var c = this.Gd(), d = 0; d < c.length; d++) {
      var e = c[d],
        f = this.get(e);
      a.call(b, f, e, this);
    }
  };
  g.clone = function() {
    return new ic(this);
  };
  g.rk = function(a) {
    this.Xg();
    var b = 0,
      c = this.xa,
      d = this.fa,
      e = this.ji,
      f = this,
      h = new hc();
    h.next = function() {
      for (;;) {
        if (e != f.ji)
          throw Error('The map has changed since the iterator was created');
        if (b >= c.length) throw gc;
        var h = c[b++];
        return a ? h : d[h];
      }
    };
    return h;
  };
  var jc = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  };
  var lc = function(a) {
      if ('function' == typeof a.sc) a = a.sc();
      else if (ea(a) || fa(a)) a = a.length;
      else {
        var b = 0,
          c;
        for (c in a) b++;
        a = b;
      }
      return a;
    },
    mc = function(a) {
      if ('function' == typeof a.Ob) return a.Ob();
      if (fa(a)) return a.split('');
      if (ea(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
        return b;
      }
      return Pa(a);
    },
    nc = function(a, b, c) {
      if ('function' == typeof a.every) return a.every(b, c);
      if (ea(a) || fa(a)) return Fa(a, b, c);
      var d;
      if ('function' == typeof a.Gd) d = a.Gd();
      else if ('function' != typeof a.Ob)
        if (ea(a) || fa(a)) {
          d = [];
          for (var e = a.length, f = 0; f < e; f++) d.push(f);
        } else d = Qa(a);
      else d = void 0;
      for (var e = mc(a), f = e.length, h = 0; h < f; h++)
        if (!b.call(c, e[h], d && d[h], a)) return !1;
      return !0;
    };
  var oc = function(a) {
      this.fa = new ic();
      a && this.Lg(a);
    },
    pc = function(a) {
      var b = typeof a;
      return ('object' == b && a) || 'function' == b
        ? 'o' + (a[ja] || (a[ja] = ++ka))
        : b.substr(0, 1) + a;
    };
  g = oc.prototype;
  g.sc = function() {
    return this.fa.sc();
  };
  g.add = function(a) {
    this.fa.set(pc(a), a);
  };
  g.Lg = function(a) {
    a = mc(a);
    for (var b = a.length, c = 0; c < b; c++) this.add(a[c]);
  };
  g.Kq = function(a) {
    a = mc(a);
    for (var b = a.length, c = 0; c < b; c++) this.remove(a[c]);
  };
  g.remove = function(a) {
    return this.fa.remove(pc(a));
  };
  g.clear = function() {
    this.fa.clear();
  };
  g.Na = function() {
    return this.fa.Na();
  };
  g.contains = function(a) {
    return this.fa.gd(pc(a));
  };
  g.Ob = function() {
    return this.fa.Ob();
  };
  g.clone = function() {
    return new oc(this);
  };
  g.ma = function(a) {
    return this.sc() == lc(a) && this.pv(a);
  };
  g.pv = function(a) {
    var b = lc(a);
    if (this.sc() > b) return !1;
    !(a instanceof oc) && 5 < b && (a = new oc(a));
    return nc(this, function(b) {
      var d = a;
      if ('function' == typeof d.contains) b = d.contains(b);
      else if ('function' == typeof d.Sk) b = d.Sk(b);
      else if (ea(d) || fa(d)) b = 0 <= Ea(d, b);
      else
        t: {
          for (var e in d)
            if (d[e] == b) {
              b = !0;
              break t;
            }
          b = !1;
        }
      return b;
    });
  };
  g.rk = function() {
    return this.fa.rk(!1);
  };
  var qc = function(a, b) {
    for (var c = a.split('&'), d = 0; d < c.length; d++) {
      var e = c[d].indexOf('='),
        f = null,
        h = null;
      0 <= e
        ? ((f = c[d].substring(0, e)), (h = c[d].substring(e + 1)))
        : (f = c[d]);
      b(f, h ? decodeURIComponent(h.replace(/\+/g, ' ')) : '');
    }
  };
  var rc = function(a, b, c) {
    this.Bd = a || null;
    this.Xu = !!c;
  };
  g = rc.prototype;
  g.Cd = function() {
    if (!this.Oa && ((this.Oa = new ic()), (this.Ga = 0), this.Bd)) {
      var a = this;
      qc(this.Bd, function(b, c) {
        a.add(decodeURIComponent(b.replace(/\+/g, ' ')), c);
      });
    }
  };
  g.Oa = null;
  g.Ga = null;
  g.sc = function() {
    this.Cd();
    return this.Ga;
  };
  g.add = function(a, b) {
    this.Cd();
    this.sj();
    a = this.yh(a);
    var c = this.Oa.get(a);
    c || this.Oa.set(a, (c = []));
    c.push(b);
    this.Ga++;
    return this;
  };
  g.remove = function(a) {
    this.Cd();
    a = this.yh(a);
    return this.Oa.gd(a)
      ? (this.sj(), (this.Ga -= this.Oa.get(a).length), this.Oa.remove(a))
      : !1;
  };
  g.clear = function() {
    this.sj();
    this.Oa = null;
    this.Ga = 0;
  };
  g.Na = function() {
    this.Cd();
    return 0 == this.Ga;
  };
  g.gd = function(a) {
    this.Cd();
    a = this.yh(a);
    return this.Oa.gd(a);
  };
  g.Sk = function(a) {
    var b = this.Ob();
    return 0 <= Ea(b, a);
  };
  g.Gd = function() {
    this.Cd();
    for (
      var a = this.Oa.Ob(), b = this.Oa.Gd(), c = [], d = 0;
      d < b.length;
      d++
    )
      for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c;
  };
  g.Ob = function(a) {
    this.Cd();
    var b = [];
    if (fa(a)) this.gd(a) && (b = Ia(b, this.Oa.get(this.yh(a))));
    else {
      a = this.Oa.Ob();
      for (var c = 0; c < a.length; c++) b = Ia(b, a[c]);
    }
    return b;
  };
  g.set = function(a, b) {
    this.Cd();
    this.sj();
    a = this.yh(a);
    this.gd(a) && (this.Ga -= this.Oa.get(a).length);
    this.Oa.set(a, [b]);
    this.Ga++;
    return this;
  };
  g.get = function(a, b) {
    var c = a ? this.Ob(a) : [];
    return 0 < c.length ? String(c[0]) : b;
  };
  g.toString = function() {
    if (this.Bd) return this.Bd;
    if (!this.Oa) return '';
    for (var a = [], b = this.Oa.Gd(), c = 0; c < b.length; c++)
      for (
        var d = b[c], e = encodeURIComponent(String(d)), d = this.Ob(d), f = 0;
        f < d.length;
        f++
      ) {
        var h = e;
        '' !== d[f] && (h += '=' + encodeURIComponent(String(d[f])));
        a.push(h);
      }
    return (this.Bd = a.join('&'));
  };
  g.sj = function() {
    this.Bd = null;
  };
  g.clone = function() {
    var a = new rc();
    a.Bd = this.Bd;
    this.Oa && ((a.Oa = this.Oa.clone()), (a.Ga = this.Ga));
    return a;
  };
  g.yh = function(a) {
    a = String(a);
    this.Xu && (a = a.toLowerCase());
    return a;
  };
  var sc = null,
    tc = null,
    uc = fb || gb || db || 'function' == typeof aa.atob,
    vc = function() {
      if (!sc) {
        sc = {};
        tc = {};
        for (var a = 0; 65 > a; a++)
          (sc[
            a
          ] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.charAt(
            a
          )),
            (tc[sc[a]] = a),
            62 <= a &&
              (tc[
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.'.charAt(
                  a
                )
              ] = a);
      }
    };
  var xc = function(a) {
    a = String(a);
    if (
      /^\s*$/.test(a)
        ? 0
        : /^[\],:{}\s\u2028\u2029]*$/.test(
            a
              .replace(/\\["\\\/bfnrtu]/g, '@')
              .replace(
                /"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                ']'
              )
              .replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, '')
          )
    )
      try {
        return eval('(' + a + ')');
      } catch (b) {}
    throw Error('Invalid JSON string: ' + a);
  };
  var zc = function(a, b) {
    this.aq = a || null;
    this.cc = !!b;
    this.fa = new ic();
    this.Ca = new yc('', void 0);
    this.Ca.next = this.Ca.hc = this.Ca;
  };
  g = zc.prototype;
  g.Po = function(a) {
    (a = this.fa.get(a)) && this.cc && (a.remove(), this.Gp(a));
    return a;
  };
  g.get = function(a, b) {
    var c = this.Po(a);
    return c ? c.value : b;
  };
  g.set = function(a, b) {
    var c = this.Po(a);
    c ? (c.value = b) : ((c = new yc(a, b)), this.fa.set(a, c), this.Gp(c));
  };
  g.uq = function() {
    return this.Ca.next.value;
  };
  g.shift = function() {
    return this.wq(this.Ca.next);
  };
  g.pop = function() {
    return this.wq(this.Ca.hc);
  };
  g.remove = function(a) {
    return (a = this.fa.get(a)) ? (this.removeNode(a), !0) : !1;
  };
  g.removeNode = function(a) {
    a.remove();
    this.fa.remove(a.key);
  };
  g.sc = function() {
    return this.fa.sc();
  };
  g.Na = function() {
    return this.fa.Na();
  };
  g.Gd = function() {
    return this.map(function(a, b) {
      return b;
    });
  };
  g.Ob = function() {
    return this.map(function(a) {
      return a;
    });
  };
  g.contains = function(a) {
    return this.some(function(b) {
      return b == a;
    });
  };
  g.gd = function(a) {
    return this.fa.gd(a);
  };
  g.clear = function() {
    this.Zr(0);
  };
  g.forEach = function(a, b) {
    for (var c = this.Ca.next; c != this.Ca; c = c.next)
      a.call(b, c.value, c.key, this);
  };
  g.map = function(a, b) {
    for (var c = [], d = this.Ca.next; d != this.Ca; d = d.next)
      c.push(a.call(b, d.value, d.key, this));
    return c;
  };
  g.some = function(a, b) {
    for (var c = this.Ca.next; c != this.Ca; c = c.next)
      if (a.call(b, c.value, c.key, this)) return !0;
    return !1;
  };
  g.every = function(a, b) {
    for (var c = this.Ca.next; c != this.Ca; c = c.next)
      if (!a.call(b, c.value, c.key, this)) return !1;
    return !0;
  };
  g.Gp = function(a) {
    this.cc
      ? ((a.next = this.Ca.next),
        (a.hc = this.Ca),
        (this.Ca.next = a),
        (a.next.hc = a))
      : ((a.hc = this.Ca.hc),
        (a.next = this.Ca),
        (this.Ca.hc = a),
        (a.hc.next = a));
    null != this.aq && this.Zr(this.aq);
  };
  g.Zr = function(a) {
    for (var b = this.fa.sc(); b > a; b--)
      this.removeNode(this.cc ? this.Ca.hc : this.Ca.next);
  };
  g.wq = function(a) {
    this.Ca != a && this.removeNode(a);
    return a.value;
  };
  var yc = function(a, b) {
    this.key = a;
    this.value = b;
  };
  yc.prototype.remove = function() {
    this.hc.next = this.next;
    this.next.hc = this.hc;
    delete this.hc;
    delete this.next;
  };
  var Ac = cb() || Ya('iPod'),
    Bc = Ya('iPad');
  !Ya('Android') || ab() || Ya('Firefox') || Za();
  ab();
  var Cc =
    Ya('Safari') &&
    !(ab() || Ya('Coast') || Za() || $a() || Ya('Silk') || Ya('Android')) &&
    !(cb() || Ya('iPad') || Ya('iPod'));
  var Dc = /iPhone|iPod/,
    Ec = function(a, b, c, d) {
      return (a << 21) | (b << 14) | (c << 7) | d;
    },
    Fc = /OS (\d)_(\d)(?:_(\d))?/;
  var Gc = function(a, b, c, d, e) {
    this.clip = a;
    c ||
      ((a = a.wa()),
      (d = this.ip(d, e)),
      (this.wo = a.q - d.x),
      (this.xo = a.s - d.y));
    this.$g = b;
  };
  Gc.prototype.wo = 0;
  Gc.prototype.xo = 0;
  Gc.prototype.ip = function(a, b) {
    var c = this.clip.getParent() ? this.clip.getParent().ka() : Hc,
      d = new Ic(a, b);
    d.gc(c);
    return d;
  };
  Gc.prototype.Mv = function(a, b) {
    var c = this.ip(a, b),
      d = c.x + this.wo,
      c = c.y + this.xo;
    this.$g &&
      ((d = Math.max(Math.min(d, this.$g.D), this.$g.l)),
      (c = Math.max(Math.min(c, this.$g.F), this.$g.m)));
    this.clip.setTransform(this.clip.wa().Uc(d, c));
  };
  var Jc = function(a, b) {
      this.type = a;
      this.$e = b || null;
    },
    Kc = {
      eA: 0,
      cA: 1,
      wA: 2,
      sA: 3,
      tA: 4,
      kC: 5,
      Xy: 6,
      pA: 7,
      sB: 8,
      tB: 9,
      lB: 10,
      kB: 11,
      MA: 12,
      Ry: 13,
      Ty: 14,
      Qy: 15,
      Sy: 16,
      Tz: 17,
      By: 18,
      me: 19,
      dA: 20,
      Px: 21,
      uA: 22,
      vA: 23,
      Nx: 24,
      Py: 25,
      nB: 26,
      Ox: 27,
      mB: 28,
    };
  var Lc = {
      HA: 2,
      tf: 3,
      Ig: 4,
      Kg: 5,
      mf: 6,
      Vy: 7,
      fA: 8,
      gA: 9,
      Lz: 12,
      Kz: 13,
      Jz: 14,
      Iz: 15,
      qs: 16,
      Oz: 17,
      Cz: 18,
      Bz: 19,
      Hz: 20,
      Gz: 21,
      Fz: 22,
      Ez: 23,
      Dz: 24,
      Mz: 25,
      Nz: 26,
      qA: 27,
      aB: 28,
      LA: 29,
      EA: 30,
      pk: 31,
      UA: 32,
      $A: 33,
      FA: 35,
      OA: 36,
      WA: 37,
      YA: 38,
      QA: 39,
      TA: 40,
      us: 41,
      Uy: 42,
      $B: 43,
      XA: 44,
      RA: 45,
      ZA: 46,
      PA: 47,
      VA: 48,
      sf: 49,
      Jg: 50,
      oA: 53,
      mA: 54,
      nA: 55,
      kA: 56,
      lA: 57,
      KB: 58,
      IB: 59,
      JB: 60,
      GB: 61,
      HB: 62,
      rf: 64,
      ke: 65,
      me: 66,
      iy: 69,
      gy: 70,
      rB: 71,
      qB: 72,
      lf: 73,
      uy: 74,
      le: 76,
      jy: 78,
      hy: 79,
      aC: 80,
      cC: 81,
      bC: 82,
      Gg: 83,
      BA: 85,
      AA: 86,
      pi: 87,
      qf: 88,
      gz: 89,
      pf: 90,
      dz: 93,
      cz: 94,
      hz: 96,
      AB: 97,
      iz: 98,
      vB: 99,
      Hg: 100,
      nf: 101,
      nz: 102,
      Uz: 104,
      Ny: 106,
      of: 108,
      BB: 109,
      yy: 112,
      az: 113,
      $y: 114,
      xy: 115,
      zy: 116,
      wy: 117,
      vy: 118,
      mi: 119,
      li: 120,
      sd: 128,
      qy: 130,
      sy: 133,
      Ux: 134,
      Vx: 135,
      ry: 137,
      yA: 144,
      ps: 145,
      Qz: 146,
      ls: 147,
      Fy: 148,
      iC: 149,
      ts: 150,
      Xx: 151,
      js: 160,
      vs: 161,
      ss: 162,
      ms: 163,
      rs: 164,
      rA: 165,
      uB: 166,
      lC: 167,
      Wx: 168,
      Yx: 169,
      Zx: 170,
      os: 171,
      QB: 172,
      iA: 173,
      hA: 174,
      zz: 175,
      yz: 176,
      oi: 177,
      aA: 178,
      bA: 179,
      ni: 180,
      Sz: 192,
      Hy: 193,
      Rz: 194,
      Gy: 195,
      zA: 196,
      Rx: 197,
      ZB: 198,
      xA: 199,
      jz: 208,
      kz: 209,
      lz: 210,
      mz: 211,
      wB: 212,
      xB: 213,
      yB: 214,
      zB: 215,
      Cy: 239,
      Ey: 240,
      Dy: 241,
      on: 256,
      qn: 257,
      pn: 258,
      qk: 259,
      mn: 260,
      nn: 261,
      ln: 262,
      ks: 263,
    },
    Pc = {
      normal: 0,
      layer: 1,
      multiply: 2,
      screen: 3,
      lighten: 4,
      darken: 5,
      difference: 6,
      add: 7,
      subtract: 8,
      invert: 9,
      alpha: 10,
      erase: 11,
      overlay: 12,
      hardlight: 13,
      shader: 14,
      ignore_source: 100,
    },
    Qc = 'normal layer multiply screen lighten darken difference add subtract invert alpha erase overlay hardlight shader'.split(
      ' '
    );
  var Ic = function(a, b) {
    this.x = a;
    this.y = b;
  };
  Ic.prototype.Yb = function(a) {
    if (!a.Db()) {
      var b = this.x * a.o + this.y * a.i + a.s;
      this.x = this.x * a.n + this.y * a.j + a.q;
      this.y = b;
    }
  };
  Ic.prototype.gc = function(a) {
    if (!a.Db()) {
      var b = a.ij();
      if (0 != b) {
        var c = this.x - a.q,
          d = this.y - a.s;
        this.x = (c * a.i - d * a.j) / b;
        this.y = (d * a.n - c * a.o) / b;
      }
    }
  };
  Ic.prototype.clone = function() {
    return new Ic(this.x, this.y);
  };
  var Rc = function(a, b) {
      return Math.sqrt(a * a + b * b);
    },
    Sc = function(a, b, c, d, e, f) {
      this.n = a;
      this.o = b;
      this.j = c;
      this.i = d;
      this.q = e;
      this.s = f;
    },
    Hc = new Sc(1, 0, 0, 1, 0, 0),
    Tc = new Sc(20, 0, 0, 20, 0, 0),
    Uc = new Sc(0.05, 0, 0, 0.05, 0, 0),
    Vc = function(a, b, c, d, e, f) {
      if (0 === e && 0 === f && 0 === b && 0 === c) {
        if (1 === a && 1 === d) return Hc;
        if (0.05 === a && 0.05 === d) return Uc;
        if (20 === a && 20 === d) return Tc;
      }
      return new Sc(a, b, c, d, e, f);
    };
  g = Sc.prototype;
  g.ij = function() {
    return this.n * this.i - this.o * this.j;
  };
  g.Ul = function() {
    if (this.Db()) return this;
    var a = this.ij();
    return 0 == a
      ? Hc
      : Vc(
          this.i / a,
          -this.o / a,
          -this.j / a,
          this.n / a,
          (this.j * this.s - this.i * this.q) / a,
          (this.o * this.q - this.n * this.s) / a
        );
  };
  g.On = function() {
    return this.Db() || 0 != this.ij();
  };
  g.multiply = function(a) {
    return this.Db()
      ? a
      : a.Db()
      ? this
      : Vc(
          this.n * a.n + this.o * a.j,
          this.n * a.o + this.o * a.i,
          this.j * a.n + this.i * a.j,
          this.j * a.o + this.i * a.i,
          this.q * a.n + this.s * a.j + a.q,
          this.q * a.o + this.s * a.i + a.s
        );
  };
  g.wm = function(a, b) {
    return 1 === a && 1 === b
      ? this
      : Vc(this.n * a, this.o * a, this.j * b, this.i * b, this.q, this.s);
  };
  g.Nh = function(a) {
    if (0 === a) return this;
    var b = Math.cos(a);
    a = Math.sin(a);
    return Vc(
      this.n * b + this.o * a,
      this.o * b - this.n * a,
      this.j * b + this.i * a,
      this.i * b - this.j * a,
      this.q * b + this.s * a,
      this.s * b - this.q * a
    );
  };
  g.Ye = function(a, b) {
    return 1 === a && 1 === b
      ? this
      : Vc(
          this.n * a,
          this.o * b,
          this.j * a,
          this.i * b,
          this.q * a,
          this.s * b
        );
  };
  g.Nu = function() {
    return this.Db() ? 1 : Math.sqrt(this.n * this.n + this.o * this.o);
  };
  g.Ou = function() {
    return this.Db() ? 1 : Math.sqrt(this.j * this.j + this.i * this.i);
  };
  g.Gu = function() {
    return this.Db()
      ? 1
      : Math.sqrt(
          Math.sqrt(this.n * this.n + this.o * this.o) *
            Math.sqrt(this.j * this.j + this.i * this.i)
        );
  };
  g.nd = function(a, b) {
    return 0 === a && 0 === b
      ? this
      : Vc(this.n, this.o, this.j, this.i, this.q + a, this.s + b);
  };
  g.Uc = function(a, b) {
    return this.q === a && this.s === b
      ? this
      : Vc(this.n, this.o, this.j, this.i, a, b);
  };
  g.toString = function() {
    return (
      'matrix(' +
      this.n +
      ',' +
      this.o +
      ',' +
      this.j +
      ',' +
      this.i +
      ',' +
      this.q +
      ',' +
      this.s +
      ')'
    );
  };
  g.It = function() {
    var a = this.Nu(),
      b = this.Ou();
    if (!a || !b || this.Db()) return { rd: 1, kf: 1, angle: 0, j: 0, i: 1 };
    var c = this.n / a,
      d = this.o / a;
    return {
      rd: a,
      kf: b,
      angle: -Math.atan2(this.o, this.n),
      j: (c * this.j + d * this.i) / a,
      i: (c * this.i - d * this.j) / b,
    };
  };
  g.Db = function() {
    return this === Hc;
  };
  g.ma = function(a) {
    return a === this
      ? !0
      : !a || a.Db() || this.Db()
      ? !1
      : this.n == a.n &&
        this.o == a.o &&
        this.j == a.j &&
        this.i == a.i &&
        this.q == a.q &&
        this.s == a.s;
  };
  g.mb = function(a) {
    this.Db() || a.transform(this.n, this.o, this.j, this.i, this.q, this.s);
  };
  var Wc = function(a, b, c, d) {
    this.Fb = a;
    this.Ab = b;
    this.wb = c;
    this.Vc = d;
  };
  Wc.prototype.toString = function() {
    return (
      'rgb(' +
      this.Fb.toFixed() +
      ',' +
      this.Ab.toFixed() +
      ',' +
      this.wb.toFixed() +
      ')'
    );
  };
  Wc.prototype.he = function() {
    return (
      'rgba(' +
      this.Fb.toFixed() +
      ',' +
      this.Ab.toFixed() +
      ',' +
      this.wb.toFixed() +
      ',' +
      this.Vc.toFixed(3) +
      ')'
    );
  };
  var Xc = function(a, b) {
      var c = a | 0,
        d = c & 255,
        c = c >> 8,
        e = c & 255,
        f = b / 100;
      return new Wc((c >> 8) & 255, e, d, 1 >= f ? (0 <= f ? f : 0) : 1);
    },
    Yc = function(a, b) {
      return a | (((255 * b) | 0) << 24);
    };
  Wc.prototype.mv = function() {
    return 1 <= this.Vc;
  };
  Wc.prototype.yu = function() {
    return 0.3 * this.Fb + 0.6 * this.Ab + 0.1 * this.wb;
  };
  var Zc = function(a, b, c, d, e, f, h, k) {
      this.Z = a;
      this.W = b;
      this.Y = c;
      this.U = d;
      this.X = e;
      this.T = f;
      this.S = h;
      this.Q = k;
    },
    $c = new Zc(1, 0, 1, 0, 1, 0, 1, 0);
  g = Zc.prototype;
  g.Ql = function(a) {
    return new Zc(
      this.Z * a.Z,
      this.Z * a.W + this.W,
      this.Y * a.Y,
      this.Y * a.U + this.U,
      this.X * a.X,
      this.X * a.T + this.T,
      this.S * a.S,
      this.S * a.Q + this.Q
    );
  };
  g.apply = function(a) {
    return new Wc(
      a.Fb * this.Z + this.W,
      a.Ab * this.Y + this.U,
      a.wb * this.X + this.T,
      this.Pg(a.Vc)
    );
  };
  g.Pg = function(a) {
    return Math.max(Math.min(this.S * a + this.Q / 255, 1), 0);
  };
  g.ma = function(a) {
    return (
      null != a &&
      this.Z == a.Z &&
      this.W == a.W &&
      this.Y == a.Y &&
      this.U == a.U &&
      this.X == a.X &&
      this.T == a.T &&
      this.S == a.S &&
      this.Q == a.Q
    );
  };
  g.Te = function() {
    return (
      1 == this.Z &&
      0 == this.W &&
      1 == this.Y &&
      0 == this.U &&
      1 == this.X &&
      0 == this.T &&
      0 == this.Q
    );
  };
  g.Js = function() {
    return [
      this.Z,
      0,
      0,
      0,
      this.W,
      0,
      this.Y,
      0,
      0,
      this.U,
      0,
      0,
      this.X,
      0,
      this.T,
      0,
      0,
      0,
      this.S,
      this.Q,
    ];
  };
  g.qx = function() {
    return $c === this
      ? ''
      : this.Z +
          ',' +
          this.W +
          ',' +
          this.Y +
          ',' +
          this.U +
          ',' +
          this.X +
          ',' +
          this.T +
          ',' +
          this.S +
          ',' +
          this.Q;
  };
  var ad = function(a, b, c, d) {
    this.l = a;
    this.m = b;
    this.D = c;
    this.F = d;
    this.Na() && this.reset();
  };
  g = ad.prototype;
  g.reset = function() {
    this.m = this.l = Number.POSITIVE_INFINITY;
    this.F = this.D = Number.NEGATIVE_INFINITY;
  };
  g.clone = function() {
    return new ad(this.l, this.m, this.D, this.F);
  };
  g.expand = function(a, b) {
    this.qc(a, b, 0, 0);
  };
  g.qc = function(a, b, c, d) {
    this.l = Math.min(this.l, a - c);
    this.D = Math.max(this.D, a + c);
    this.m = Math.min(this.m, b - d);
    this.F = Math.max(this.F, b + d);
  };
  g.tl = function() {
    this.l = Math.floor(this.l);
    this.m = Math.floor(this.m);
    this.D = Math.ceil(this.D);
    this.F = Math.ceil(this.F);
  };
  g.add = function(a) {
    this.m += a.m;
    this.F += a.F;
    this.l += a.l;
    this.D += a.D;
  };
  g.translate = function(a, b) {
    this.l += a;
    this.m += b;
    this.D += a;
    this.F += b;
  };
  g.scale = function(a, b) {
    this.l *= a;
    this.m *= b;
    this.D *= a;
    this.F *= b;
  };
  g.hm = function(a) {
    if (!a.Db() && !this.Na()) {
      var b = this.l,
        c = this.m,
        d = this.D - this.l,
        e = this.F - this.m,
        f = a.n * b + a.j * c + a.q,
        b = a.o * b + a.i * c + a.s,
        c = f + a.n * d,
        d = b + a.o * d,
        h = a.j * e;
      a = a.i * e;
      this.l = Math.min(f, c, f + h, c + h);
      this.D = Math.max(f, c, f + h, c + h);
      this.m = Math.min(b, d, b + a, d + a);
      this.F = Math.max(b, d, b + a, d + a);
    }
  };
  g.Yb = function(a) {
    var b = this.clone();
    b.hm(a);
    return b;
  };
  g.rq = function(a) {
    return this.D >= a.l && a.D >= this.l && this.F >= a.m && a.F >= this.m;
  };
  g.pt = function(a) {
    return a.l >= this.l && a.D <= this.D && a.m >= this.m && a.F <= this.F;
  };
  g.ma = function(a) {
    return a.l == this.l && a.D == this.D && a.m == this.m && a.F == this.F;
  };
  g.contains = function(a, b) {
    return a >= this.l && a <= this.D && b >= this.m && b <= this.F;
  };
  g.eh = function(a) {
    this.l = Math.min(this.l, a.l);
    this.D = Math.max(this.D, a.D);
    this.m = Math.min(this.m, a.m);
    this.F = Math.max(this.F, a.F);
  };
  g.Sl = function(a) {
    this.l = Math.max(this.l, a.l);
    this.D = Math.min(this.D, a.D);
    this.m = Math.max(this.m, a.m);
    this.F = Math.min(this.F, a.F);
    this.Na() && this.reset();
  };
  g.hw = function(a) {
    this.l -= a;
    this.m -= a;
    this.D += a;
    this.F += a;
  };
  g.Na = function() {
    return !(this.l <= this.D && this.m <= this.F);
  };
  g.Zv = function() {
    return new ad(-this.D, -this.F, -this.l, -this.m);
  };
  g.width = function() {
    return Math.max(this.D - this.l, 0);
  };
  g.height = function() {
    return Math.max(this.F - this.m, 0);
  };
  var bd = function(a) {
    return new ad(a.xmin, a.ymin, a.xmax, a.ymax);
  };
  ad.prototype.toString = function() {
    return (
      '' + this.l + ' ' + this.m + ' ' + this.width() + ' ' + this.height()
    );
  };
  var dd = function(a, b, c, d) {
      this.x = new cd(a.l, a.width(), b.l, b.width(), c);
      this.y = new cd(a.m, a.height(), b.m, b.height(), d);
    },
    cd = function(a, b, c, d, e) {
      this.Ti = Math.min(1 / e, b / (b - d));
      this.Wu = c;
      this.Ol = d;
      this.mm = a + this.Ti * (c - a);
      this.gq = b - this.Ti * (b - d);
    };
  cd.prototype.slice = function(a) {
    a -= this.Wu;
    return 0 > a
      ? this.mm + this.Ti * a
      : a < this.Ol
      ? this.mm + (a * this.gq) / this.Ol
      : this.mm + this.gq + this.Ti * (a - this.Ol);
  };
  var fd = function(a) {
      this.uo = a || ':' + (ed++).toString(36);
    },
    ed = 0,
    gd = new fd(),
    hd = {};
  fd.prototype.bw = 0;
  fd.prototype.Fl = function() {
    return this.uo + '-' + (this.bw++).toString(36);
  };
  var id = function(a) {
    this.ha = a;
    this.ye = [];
    this.km = !1;
    this.Fj = null;
    this.Ur = 0;
    this.Uf = !1;
  };
  g = id.prototype;
  g.Dx = function() {
    if ('createTouch' in document) {
      Ib(this.ha.Ea, 'touchstart', this.vx, !1, this);
      Ib(this.ha.Ea, 'touchmove', this.tx, !1, this);
      Ib(this.ha.Ea, 'touchend', this.sx, !1, this);
      var a = Ib(document, 'touchstart', this.ux, !1, this);
      this.ye.push(a);
      a = Ib(document, 'touchend', this.rx, !1, this);
      this.ye.push(a);
    }
    Ib(this.ha.Ea, 'mousemove', this.Lv, !1, this);
    Ib(this.ha.Ea, 'mousedown', this.Jv, !1, this);
    Ib(this.ha.Ea, 'mouseup', this.Sv, !1, this);
    Ib(this.ha.Ea, 'mouseout', this.Ov, !1, this);
    Ib(this.ha.Ea, 'contextmenu', jd, !1);
    Ib(this.ha.Ea, 'mouseover', jd, !1);
    a = Ib(document, 'mousedown', this.Iv, !1, this);
    this.ye.push(a);
    a = Ib(document, 'mouseup', this.Rv, !1, this);
    this.ye.push(a);
    a = Ib(document, 'mouseover', this.Kv, !1, this);
    this.ye.push(a);
  };
  g.xx = function() {
    for (var a = 0; a < this.ye.length; a++) Pb(this.ye[a]);
  };
  g.vx = function(a) {
    a.stopPropagation();
    this.Sh(a);
    var b = a.Mb.touches,
      c = a.Mb.changedTouches;
    this.Uf || 1 != b.length || 1 != c.length
      ? ((this.Uf = !0), this.Jk(a))
      : ((this.Fj = kd(a)), this.ha.Xe(this.Rf(a)), this.ha.kq());
  };
  g.tx = function(a) {
    a.stopPropagation();
    this.Sh(a);
    this.Uf || ((a = this.Rf(a)), this.ha.Xe(a));
  };
  g.sx = function(a) {
    a.stopPropagation();
    this.Sh(a);
    var b = a.Mb.changedTouches;
    0 != a.Mb.touches.length ||
      1 != b.length ||
      this.Uf ||
      this.Wv(a) ||
      this.ha.oq();
    this.Jk(a);
  };
  g.ux = function(a) {
    a.stopPropagation();
    this.Sh(a);
    this.ha.lq();
    this.Uf = !0;
  };
  g.rx = function(a) {
    a.stopPropagation();
    this.Sh(a);
    this.Jk(a);
    this.ha.pq();
  };
  g.Jk = function(a) {
    this.ha.Xe(new Ic(-1, -1), null);
    this.km = !1;
    0 == a.Mb.touches.length && (this.Uf = !1);
  };
  g.Lv = function(a) {
    a.stopPropagation();
    this.oe(a) && this.ha.Xe(this.Rf(a));
  };
  g.Jv = function(a) {
    a.stopPropagation();
    this.oe(a) && (this.ha.Xe(this.Rf(a)), this.ha.kq());
  };
  g.Sv = function(a) {
    a.stopPropagation();
    this.oe(a) && this.ha.oq();
  };
  g.Ov = function(a) {
    a.stopPropagation();
    this.oe(a) && this.ha.Xe(this.Rf(a), null);
  };
  g.Iv = function(a) {
    a.stopPropagation();
    this.oe(a) && this.ha.lq();
  };
  g.Rv = function(a) {
    a.stopPropagation();
    this.oe(a) && this.ha.pq();
  };
  g.Kv = function(a) {
    a.stopPropagation();
    this.oe(a) && this.ha.Xe(this.Rf(a), null);
  };
  g.Sh = function() {
    this.Ur = pa() + 1e3;
  };
  g.oe = function(a) {
    return pa() < this.Ur ? !1 : 2 != a.button;
  };
  g.Wv = function(a) {
    var b = kd(a);
    if (!this.Fj) return !0;
    a = b.x - this.Fj.x;
    b = b.y - this.Fj.y;
    return 225 < a * a + b * b ? !0 : !1;
  };
  var kd = function(a) {
    var b = a.Mb.touches,
      c = a.Mb.changedTouches;
    b && 1 == b.length ? (a = b[0]) : c && 1 == c.length && (a = c[0]);
    return new Ic(a.clientX, a.clientY);
  };
  id.prototype.Rf = function(a) {
    a = kd(a);
    var b = this.ha.Pc.getBoundingClientRect();
    this.km = a.x >= b.left && a.x < b.right && a.y >= b.top && a.y < b.bottom;
    a = new Ic(a.x - b.left, a.y - b.top);
    a.gc(this.ha.H.Rm);
    return a;
  };
  var jd = function(a) {
    a.stopPropagation();
    return !1;
  };
  var ld = !!aa.Audio,
    md = window != window.top,
    nd =
      (Ac || Bc) && 0 == window.outerWidth
        ? function() {
            return window.devicePixelRatio;
          }
        : Ac || Bc
        ? function() {
            return (
              (window.outerWidth * window.devicePixelRatio) /
              (90 == Math.abs(window.orientation)
                ? screen.height
                : screen.width)
            );
          }
        : (!hb && !lb) || md
        ? !eb || 'devicePixelRatio' in window
          ? function() {
              return window.devicePixelRatio || 1;
            }
          : function() {
              return window.screen.deviceXDPI / window.screen.logicalXDPI;
            }
        : function() {
            return (
              (window.outerWidth * window.devicePixelRatio) / window.innerWidth
            );
          },
    od = function(a) {
      window.setTimeout(a, 1e3 / 60);
    },
    pd =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      null,
    qd;
  if (
    (qd =
      -1 != navigator.userAgent.indexOf('iPad') || Dc.test(navigator.userAgent))
  ) {
    var rd = Fc.exec(navigator.userAgent) || [];
    rd.shift();
    qd = Ec.apply(null, rd) < Ec(7);
  }
  var sd = qd ? od : pd ? na(pd, window) : od,
    td = document.createElement('canvas');
  td.width = 1;
  td.height = 1;
  var ud = td.getContext('2d'),
    vd = ud.createImageData(1, 1);
  vd.data[0] = 127;
  vd.data[3] = 127;
  ud.putImageData(vd, 0, 0);
  var wd = 255 == ud.getImageData(0, 0, 1, 1).data[0],
    xd = function(a, b, c, d) {
      a.putImageData(b, c, d);
    },
    yd = function(a, b, c, d) {
      for (var e = b.data, f = e.length; 0 < f; ) {
        var h = e[--f] + 1;
        e[--f] = (e[f] * h) >> 8;
        e[--f] = (e[f] * h) >> 8;
        e[--f] = (e[f] * h) >> 8;
      }
      a.putImageData(b, c, d);
    },
    zd = wd ? yd : xd;
  var Ad = function() {
    this.Lr = [];
    this.jx = [];
    this.Sg = [];
  };
  Ad.prototype.Aw = function(a, b, c) {
    this.Lr[a] = b;
    this.jx[a] = c;
  };
  Ad.prototype.Rr = function(a) {
    ld && ((this.Sg[a] = new Audio(this.Lr[a])), this.Sg[a].play());
  };
  Ad.prototype.Sr = function() {
    for (var a = 0; a < this.Sg.length; a++)
      l(this.Sg[a]) && this.Sg[a].pause();
  };
  var Bd = function() {
      this.Mi = [];
      this.vc = {};
    },
    Cd = function(a, b) {
      this.id = a;
      this.nh = b;
    };
  Cd.prototype.Wl = function() {
    return !!this.nh;
  };
  Cd.prototype.get = function() {
    return this.nh;
  };
  Bd.prototype.Ee = function(a) {
    var b = this.Mi[a];
    b || ((b = new Cd(a, null)), (this.Mi[a] = b));
    return b;
  };
  Bd.prototype.lu = function(a, b) {
    var c = this.Mi[a],
      c = c && c.nh;
    return c instanceof b ? c : null;
  };
  Bd.prototype.Aq = function(a) {
    this.Ee(a.id).nh = a;
  };
  Bd.prototype.ht = function(a, b) {
    for (var c = this.Mi, d = 0; d < c.length; d++)
      c[d] && c[d].nh && c[d].get().ia(a);
    b && a.Ik(b);
  };
  var Dd = RegExp(
      '^[A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd][A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd.0-9\u00b7\u0300-\u036f\u203f-\u2040-]*$'
    ),
    Ed = function(a) {
      if (null != a && ((a = String(a)), a.match(Dd))) return a;
    },
    Fd = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&apos;',
      '\t': '&#x9;',
      '\n': '&#xA;',
      '\r': '&#xD;',
    },
    Gd = function(a) {
      return Fd[a] || a;
    },
    Hd = function(a) {
      return String(a).replace(/[<>&]/g, Gd);
    },
    Id = function(a) {
      return String(a).replace(/[<&"\t\n\r]/g, Gd);
    },
    Jd = {},
    Kd;
  for (Kd in Fd) Jd[Fd[Kd]] = Kd;
  var Ld = '&nbsp; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &shy; &reg; &macr; &deg; &plusmn; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml;'.split(
      ' '
    ),
    Md = {},
    Nd;
  for (Nd in Jd) Md[Nd] = Jd[Nd];
  for (var Od = 0; Od < Ld.length; ++Od)
    Md[Ld[Od]] = String.fromCharCode(Od + 160);
  var Pd = function(a, b, c, d) {
    this.ac = a;
    this.Da = 0;
    this.Yu = b;
    this.iw = c;
    this.$t = d ? Md : Jd;
    this.next = this.bh;
  };
  g = Pd.prototype;
  g.Tr = function() {
    this.next = this.Tr;
    return null;
  };
  g.pc = function(a) {
    this.next = function() {
      throw this.pc(a);
    };
    throw new Qd(a);
  };
  g.$r = function(a) {
    var b = this.$t;
    return a.replace(/&(#?)([^\s]+?);/g, function(a, d, e) {
      return d && ((d = Number('0' + e)), d === d)
        ? String.fromCharCode(d)
        : b[a] || a;
    });
  };
  g.bh = function() {
    var a = this.pj('<'),
      b;
    0 > a
      ? ((b = this.ac.substring(this.Da)), (this.next = this.Tr))
      : ((b = this.ac.substring(this.Da, a)),
        (this.Da = a),
        (this.next = this.Ev));
    this.Yu && (b = b.trim());
    return b ? ((b = this.$r(b)), { type: 'text', value: b }) : this.next();
  };
  g.Ev = function() {
    var a = this.fi('<![CDATA[', ']]\x3e', !1, 'cdata');
    if (
      a ||
      (a = this.fi('\x3c!--', '--\x3e', !1, 'comment')) ||
      (a = this.fi('<!DOCTYPE', '>', !0, 'doctype')) ||
      (a = this.fi('<?XML', '?>', !0, 'xml_declaration')) ||
      (!this.iw && (a = this.fi('<?', '?>', !1, 'processing_instruction')))
    )
      return a;
    if ('/' == this.ac.charAt(this.Da + 1))
      return (this.next = this.bh), { type: 'close', value: this.nt() };
    for (a = { type: 'tag', value: this.ot(), attributes: [] }; ; ) {
      this.eo();
      if (this.ev()) throw this.pc('tag');
      if (this.dn('>')) {
        this.next = this.bh;
        break;
      }
      if (this.dn('/>')) {
        this.next = this.Ct(a.value);
        break;
      }
      a.attributes.push({ name: this.lt(), value: this.mt() });
    }
    return a;
  };
  g.Ct = function(a) {
    return function() {
      this.next = this.bh;
      return { type: 'close', value: a };
    };
  };
  g.pj = function(a) {
    return this.ac.indexOf(a, this.Da);
  };
  g.ev = function() {
    return this.Da >= this.ac.length;
  };
  g.dn = function(a) {
    return this.ac.substr(this.Da, a.length).toUpperCase() == a
      ? ((this.Da += a.length), !0)
      : !1;
  };
  g.eo = function() {
    for (var a = this.ac; this.Da < a.length; this.Da++)
      switch (a.charAt(this.Da)) {
        case ' ':
        case '\t':
        case '\r':
        case '\n':
          break;
        default:
          return;
      }
  };
  g.fi = function(a, b, c, d) {
    var e = this.Da;
    if (!this.dn(a)) return null;
    a = this.pj(b);
    if (0 > a) throw this.pc(d);
    c = c ? this.ac.substring(e, a + b.length) : this.ac.substring(this.Da, a);
    this.Da = a + b.length;
    this.next = this.bh;
    return { type: d, value: c };
  };
  g.ot = function() {
    for (var a = this.ac, b = this.Da + 1, c = b; c < a.length; c++)
      switch (a.charAt(c)) {
        case '/':
          if ('>' != a.charAt(c + 1)) break;
        case ' ':
        case '\t':
        case '\r':
        case '\n':
        case '>':
          if (c == b) throw this.pc('tag');
          this.Da = c;
          return a.substring(b, c);
      }
    throw this.pc('tag');
  };
  g.nt = function() {
    for (var a = this.ac, b = this.Da + 2, c = !1, d = b; d < a.length; d++)
      switch (a.charAt(d)) {
        case ' ':
        case '\t':
        case '\r':
        case '\n':
          c = !0;
          break;
        case '>':
          if (d == b) throw this.pc('close');
          this.Da = d + 1;
          return a.substring(b, d).trim();
        default:
          if (c) throw this.pc('close');
      }
    throw this.pc('close');
  };
  g.lt = function() {
    var a = this.pj('>');
    if (0 > a) throw this.pc('tag');
    var b = this.pj('='),
      c = this.Da;
    if (0 > b || b == c || b > a) throw this.pc('attribute');
    this.Da = b + 1;
    return this.ac.substring(c, b).trim();
  };
  g.mt = function() {
    this.eo();
    var a = this.ac,
      b = this.Da,
      c = a.charAt(b++);
    if ('"' == c || "'" == c)
      for (var d = b; d < a.length; d++)
        if (a.charAt(d) == c)
          return (this.Da = d + 1), this.$r(a.substring(b, d));
    throw this.pc('attribute');
  };
  var Qd = function(a) {
    this.type = a;
  };
  var Rd = function() {
    this.kc = this.ug = null;
  };
  Rd.prototype.Ke = function(a) {
    this.ug != a &&
      (this.kc && this.kc.la(), (this.kc = a.yd(this)), (this.ug = a));
    return this.kc;
  };
  var Sd = [];
  Rd.prototype.ob = function() {
    return new Rd();
  };
  var Td = function(a) {
    return (0, Sd[a.type])(a);
  };
  Rd.prototype.Je = function() {
    return new ad(0, 0, 0, 0);
  };
  var Vd = function(a, b, c, d) {
      var e = new ad();
      c = Ud(b, c);
      b = Ud(b, d);
      e.expand(3 * -c, 3 * -b);
      e.expand(3 * +c, 3 * +b);
      a.add(e);
    },
    Wd = function(a, b, c) {
      a.expand(Math.cos(b) * c * 20, Math.sin(b) * c * 20);
    };
  Rd.prototype.ma = function(a) {
    return null != a;
  };
  var Xd = (3 * Math.sqrt(2 * Math.PI)) / 4,
    Ud = function(a, b) {
      var c = 1;
      switch (a) {
        case 1:
          c = 2 * Xd;
          break;
        case 2:
          c = 1.5 * Xd;
          break;
        case 3:
          c = Xd;
      }
      return Math.abs((20 * b) / c);
    };
  var Yd = function(a, b, c) {
    Rd.call(this);
    this.quality = a;
    this.x = b;
    this.y = c;
  };
  v(Yd, Rd);
  Sd[2] = function(a) {
    return new Yd(a.quality, a.x, a.y);
  };
  g = Yd.prototype;
  g.ob = function() {
    return new Yd(this.quality, this.x, this.y);
  };
  g.Be = function() {
    return new Zd(this.x, this.y, this.quality);
  };
  g.Ce = function() {
    return new $d(this.x, this.y, this.quality);
  };
  g.Je = function() {
    var a = new ad(0, 0, 0, 0);
    Vd(a, this.quality, this.x, this.y);
    return a;
  };
  g.ma = function(a) {
    return (
      Yd.O.ma.call(this, a) &&
      a instanceof Yd &&
      this.quality == a.quality &&
      this.x == a.x &&
      this.y == a.y
    );
  };
  var ae = function(a) {
    Rd.call(this);
    this.matrix = a;
  };
  v(ae, Rd);
  Sd[3] = function(a) {
    return new ae(a.matrix);
  };
  ae.prototype.ob = function() {
    return new ae(this.matrix.slice());
  };
  ae.prototype.Be = function() {
    return new be(this.matrix);
  };
  ae.prototype.Ce = function() {
    return new ce(this.matrix);
  };
  ae.prototype.ma = function(a) {
    return (
      ae.O.ma.call(this, a) && a instanceof ae && Na(this.matrix, a.matrix)
    );
  };
  var de = function(a, b, c, d, e, f, h) {
    Rd.call(this);
    this.angle = a;
    this.distance = b;
    this.strength = c;
    this.quality = d;
    this.x = e;
    this.y = f;
    this.ea = h;
  };
  v(de, Rd);
  var ee = { type: 'inner', knockout: !1, dd: 'source-atop' },
    fe = { type: 'inner', knockout: !0, dd: 'source-in' },
    ge = [
      ee,
      fe,
      { type: 'outer', knockout: !1, dd: 'destination-over' },
      { type: 'outer', knockout: !0, dd: 'source-out' },
      { type: 'full', knockout: !1, dd: 'source-over' },
      { type: 'full', knockout: !0, dd: 'copy' },
    ],
    le = function(a, b, c) {
      return ke(b ? 'inner' : a ? 'full' : 'outer', c);
    },
    ke = function(a, b) {
      for (var c = 0; c < ge.length; ++c)
        if (a == ge[c].type && !!b == ge[c].knockout) return ge[c];
      return b ? fe : ee;
    };
  de.prototype.tk = function(a, b) {
    var c = 20 * this.distance * b;
    a.qc(
      Math.cos(this.angle) * c,
      Math.sin(this.angle) * c,
      this.quality * this.x * 10,
      this.quality * this.y * 10
    );
  };
  de.prototype.ma = function(a) {
    return (
      de.O.ma.call(this, a) &&
      a instanceof de &&
      this.angle == a.angle &&
      this.distance == a.distance &&
      this.strength == a.strength &&
      this.quality == a.quality &&
      this.x == a.x &&
      this.y == a.y &&
      this.ea == a.ea
    );
  };
  var me = function(a, b, c, d, e, f, h, k, m) {
    de.call(this, a, d, e, f, h, k, m);
    this.highlight = b;
    this.shadow = c;
  };
  v(me, de);
  Sd[4] = function(a) {
    return new me(
      a.angle,
      a.highlight,
      a.shadow,
      a.distance,
      a.strength,
      a.quality,
      a.x,
      a.y,
      le(a.onTop, a.inner, a.knockout)
    );
  };
  g = me.prototype;
  g.ob = function() {
    return new me(
      this.angle,
      this.highlight,
      this.shadow,
      this.distance,
      this.strength,
      this.quality,
      this.x,
      this.y,
      this.ea
    );
  };
  g.Be = function() {
    return new ne(
      this.distance,
      (180 * this.angle) / Math.PI,
      this.highlight & 16777215,
      (this.highlight >>> 24) / 255,
      this.shadow & 16777215,
      (this.shadow >>> 24) / 255,
      this.x,
      this.y,
      this.strength,
      this.quality,
      this.ea.type,
      this.ea.knockout
    );
  };
  g.Ce = function() {
    return new oe(
      this.distance,
      (180 * this.angle) / Math.PI,
      this.highlight & 16777215,
      (this.highlight >>> 24) / 255,
      this.shadow & 16777215,
      (this.shadow >>> 24) / 255,
      this.x,
      this.y,
      this.strength,
      this.quality,
      this.ea.type,
      this.ea.knockout
    );
  };
  g.Je = function() {
    var a = new ad(0, 0, 0, 0);
    Wd(a, this.angle, -this.distance);
    Wd(a, this.angle, this.distance);
    Vd(a, this.quality, this.x, this.y);
    return a;
  };
  g.ma = function(a) {
    return (
      me.O.ma.call(this, a) &&
      a instanceof me &&
      this.highlight == a.highlight &&
      this.shadow == a.shadow
    );
  };
  var pe = function(a, b, c, d, e, f, h, k) {
    Rd.call(this);
    this.bias = a;
    this.clamp = b;
    this.color = c;
    this.divisor = d;
    this.matrix = e;
    this.matrixX = f;
    this.matrixY = h;
    this.preserveAlpha = k;
  };
  v(pe, Rd);
  Sd[5] = function(a) {
    return new pe(
      a.bias,
      a.clamp,
      a.color,
      a.divisor,
      a.matrix,
      a.matrixX,
      a.matrixY,
      a.preserveAlpha
    );
  };
  pe.prototype.ob = function() {
    return new pe(
      this.bias,
      this.clamp,
      this.color,
      this.divisor,
      this.matrix,
      this.matrixX,
      this.matrixY,
      this.preserveAlpha
    );
  };
  pe.prototype.Be = function() {
    return new qe(
      this.matrixX,
      this.matrixY,
      this.matrix,
      this.divisor,
      this.bias,
      this.preserveAlpha,
      this.clamp,
      this.color & 16777215,
      (this.color >>> 24) / 255
    );
  };
  pe.prototype.Ce = function() {
    return new re(
      this.matrixX,
      this.matrixY,
      this.matrix,
      this.divisor,
      this.bias,
      this.preserveAlpha,
      this.clamp,
      this.color & 16777215,
      (this.color >>> 24) / 255
    );
  };
  pe.prototype.ma = function(a) {
    return (
      pe.O.ma.call(this, a) &&
      a instanceof pe &&
      this.bias == a.bias &&
      this.clamp == a.clamp &&
      this.color == a.color &&
      this.divisor == a.divisor &&
      Na(this.matrix, a.matrix) &&
      this.matrixX == a.matrixX &&
      this.matrixY == a.matrixY &&
      this.preserveAlpha == a.preserveAlpha
    );
  };
  var se = function(a, b, c, d, e, f, h, k) {
    de.call(this, a, c, d, e, f, h, k);
    this.color = b;
  };
  v(se, de);
  var te = function(a, b, c) {
    return ke(b ? 'inner' : a && !c ? 'full' : 'outer', c || a);
  };
  Sd[1] = function(a) {
    return new se(
      a.angle,
      a.color,
      a.distance,
      a.strength,
      a.quality,
      a.x,
      a.y,
      te(a.hideObject, a.inner, a.knockout)
    );
  };
  g = se.prototype;
  g.ob = function() {
    return new se(
      this.angle,
      this.color,
      this.distance,
      this.strength,
      this.quality,
      this.x,
      this.y,
      this.ea
    );
  };
  g.Be = function() {
    return new ue(
      this.distance,
      (180 * this.angle) / Math.PI,
      this.color & 16777215,
      (this.color >>> 24) / 255,
      this.x,
      this.y,
      this.strength,
      this.quality,
      'inner' == this.ea.type,
      this.ea.knockout && 'outer' == this.ea.type,
      this.ea.knockout
    );
  };
  g.Ce = function() {
    return new ve(
      this.distance,
      (180 * this.angle) / Math.PI,
      this.color & 16777215,
      (this.color >>> 24) / 255,
      this.x,
      this.y,
      this.strength,
      this.quality,
      'inner' == this.ea.type,
      this.ea.knockout && 'outer' == this.ea.type,
      this.ea.knockout
    );
  };
  g.Je = function() {
    var a = new ad(0, 0, 0, 0);
    Wd(a, this.angle, this.distance);
    Vd(a, this.quality, this.x, this.y);
    return a;
  };
  g.ma = function(a) {
    return se.O.ma.call(this, a) && a instanceof se && this.color == a.color;
  };
  var we = function(a, b, c, d, e, f, h, k, m, n) {
    de.call(this, a, e, f, h, k, m, n);
    this.Rb = b;
    this.Qb = c;
    this.Sb = d;
  };
  v(we, de);
  Sd[7] = function(a) {
    for (
      var b = xe(a.ratios), c = xe(a.colors), d = Array(c.length), e = 0;
      e < c.length;
      ++e
    )
      (d[e] = (c[e] >>> 24) / 255), (c[e] &= 16777215);
    return new we(
      a.angle,
      c,
      d,
      b,
      a.distance,
      a.strength,
      a.quality,
      a.x,
      a.y,
      le(a.onTop, a.inner, a.knockout)
    );
  };
  g = we.prototype;
  g.ob = function() {
    return new we(
      this.angle,
      this.Rb,
      this.Qb,
      this.Sb,
      this.distance,
      this.strength,
      this.quality,
      this.x,
      this.y,
      this.ea
    );
  };
  g.Be = function() {
    return new ye(
      this.distance,
      (180 * this.angle) / Math.PI,
      this.Rb,
      this.Qb,
      this.Sb,
      this.x,
      this.y,
      this.strength,
      this.quality,
      this.ea.type,
      this.ea.knockout
    );
  };
  g.Ce = function() {
    return new ze(
      this.distance,
      (180 * this.angle) / Math.PI,
      this.Rb,
      this.Qb,
      this.Sb,
      this.x,
      this.y,
      this.strength,
      this.quality,
      this.ea.type,
      this.ea.knockout
    );
  };
  g.Je = function() {
    var a = new ad(0, 0, 0, 0);
    this.tk(a, 1);
    this.tk(a, -1);
    return a;
  };
  g.ma = function(a) {
    return (
      we.O.ma.call(this, a) &&
      a instanceof we &&
      Na(this.Rb, a.Rb) &&
      Na(this.Qb, a.Qb) &&
      Na(this.Sb, a.Sb)
    );
  };
  var Ae = function(a, b, c, d, e, f, h, k, m, n) {
    de.call(this, a, e, f, h, k, m, n);
    this.Rb = b;
    this.Qb = c;
    this.Sb = d;
  };
  v(Ae, de);
  Sd[6] = function(a) {
    for (
      var b = xe(a.ratios), c = xe(a.colors), d = Array(c.length), e = 0;
      e < c.length;
      ++e
    )
      (d[e] = (c[e] >>> 24) / 255), (c[e] &= 16777215);
    return new Ae(
      a.angle,
      c,
      d,
      b,
      a.distance,
      a.strength,
      a.quality,
      a.x,
      a.y,
      le(a.onTop, a.inner, a.knockout)
    );
  };
  g = Ae.prototype;
  g.ob = function() {
    return new Ae(
      this.angle,
      this.Rb,
      this.Qb,
      this.Sb,
      this.distance,
      this.strength,
      this.quality,
      this.x,
      this.y,
      this.ea
    );
  };
  g.Be = function() {
    return new Be(
      this.distance,
      (180 * this.angle) / Math.PI,
      this.Rb,
      this.Qb,
      this.Sb,
      this.x,
      this.y,
      this.strength,
      this.quality,
      this.ea.type,
      this.ea.knockout
    );
  };
  g.Ce = function() {
    return new Ce(
      this.distance,
      (180 * this.angle) / Math.PI,
      this.Rb,
      this.Qb,
      this.Sb,
      this.x,
      this.y,
      this.strength,
      this.quality,
      this.ea.type,
      this.ea.knockout
    );
  };
  g.Je = function() {
    var a = new ad(0, 0, 0, 0);
    this.tk(a, 1);
    return a;
  };
  g.ma = function(a) {
    return (
      Ae.O.ma.call(this, a) &&
      a instanceof Ae &&
      Na(this.Rb, a.Rb) &&
      Na(this.Qb, a.Qb) &&
      Na(this.Sb, a.Sb)
    );
  };
  var De = function() {
    Rd.call(this);
  };
  v(De, Rd);
  Sd[0] = function(a) {
    return new De(a);
  };
  De.prototype.Je = function() {
    return new ad(0, 0, 0, 0);
  };
  De.prototype.ob = function() {
    return this;
  };
  De.prototype.ma = function() {
    return !1;
  };
  var Ee = function(a) {
    this.cc = this.Rd = this.Ha = null;
    this.ge = 0;
    this.t = a || null;
    this.Kh = [];
  };
  g = Ee.prototype;
  g.Zi = function(a) {
    if (this.cc && a == this.cc.depth) return this.cc;
    if (!this.Ha || this.Ha.depth > a) return (this.cc = null);
    for (var b = this.Ha; b.nextSibling && !(b.nextSibling.depth >= a); )
      b = b.nextSibling;
    b.nextSibling && b.nextSibling.depth == a && (b = b.nextSibling);
    return (this.cc = b);
  };
  g.Rj = function(a, b) {
    this.Fp(a, this.Zi(b));
    a.depth = b;
  };
  g.Fp = function(a, b) {
    b
      ? (b.nextSibling ? (b.nextSibling.ic = a) : (this.Rd = a),
        (a.ic = b),
        (a.nextSibling = b.nextSibling),
        (b.nextSibling = a))
      : (this.Ha && ((this.Ha.ic = a), (a.nextSibling = this.Ha)),
        (this.Ha = a),
        this.Rd || (this.Rd = a));
    a.Lc || ++this.ge;
  };
  g.qg = function(a) {
    this.cc === a && (this.cc = this.cc.nextSibling);
    a.ic ? (a.ic.nextSibling = a.nextSibling) : (this.Ha = a.nextSibling);
    a.nextSibling ? (a.nextSibling.ic = a.ic) : (this.Rd = a.ic);
    a.nextSibling = null;
    a.ic = null;
    a.depth = void 0;
    a.Lc || --this.ge;
  };
  g.tm = function(a, b) {
    this.Rj(a, b);
    Fe(this.t, a);
  };
  g.Pq = function(a) {
    return (a = this.Ic(a)) ? this.Am(a) : null;
  };
  g.Am = function(a) {
    this.qg(a);
    a.Uu(5) ? this.Kh.push(a) : this.gl(a);
    return a;
  };
  g.bu = function(a) {
    for (var b = this.Ha; b; ) {
      var c = b,
        b = b.nextSibling;
      c.Lc || a(c) || this.Am(c);
    }
  };
  g.Ic = function(a) {
    var b = this.Zi(a);
    return b && b.depth == a ? b : null;
  };
  g.forEach = function(a) {
    for (var b = this.Ha; b; ) {
      if (a(b)) return !0;
      b = b.nextSibling;
    }
    return !1;
  };
  g.du = function(a) {
    for (var b = this.Rd; b; ) {
      if (a(b)) return !0;
      b = b.ic;
    }
    return !1;
  };
  g.bp = function(a) {
    for (var b = this.Ha; b; ) {
      if (b.getName() == a) return b;
      b = b.nextSibling;
    }
    return null;
  };
  g.Au = function() {
    return this.Rd ? Math.max(0, this.Rd.depth + 1) : 0;
  };
  g.gl = function(a) {
    Ge(this.t, a);
    a.la();
    a.depth = void 0;
  };
  g.la = function() {
    for (; this.Ha; ) {
      var a = this.Ha;
      this.qg(a);
      this.gl(a);
    }
  };
  g.je = function() {
    for (var a = this.Ha; a; ) a.je(), (a = a.nextSibling);
  };
  g.Ot = function() {
    if (0 < this.Kh.length) {
      for (var a = 0; a < this.Kh.length; a++) this.gl(this.Kh[a]);
      this.Kh = [];
    }
  };
  g.Ks = function(a) {
    this.t = a.t;
    for (a = this.Ha; a; ) Fe(this.t, a), (a = a.nextSibling);
  };
  g.Lk = function(a, b) {
    this.t && (Ge(this.t, a), b && Fe(this.t, a, b));
  };
  g.Xm = function(a, b) {
    b < a && (b = a = b);
    var c = this.Zi(a),
      d = this.Zi(b);
    c && c.depth == a ? this.qg(c) : (c = null);
    d && d.depth == b ? this.qg(d) : (d = null);
    c && this.Rj(c, b);
    d && this.Rj(d, a);
  };
  g.Uv = function(a) {
    var b = Math.min(-16384, this.Ha.depth) - 1;
    this.qg(a);
    this.Rj(a, b);
  };
  g.Ed = function() {
    return this.ge;
  };
  g.De = function(a) {
    if (0 > a || a >= this.ge) return null;
    if (a <= this.ge - a) {
      for (var b = this.Ha; 1 <= a; ) (b = b.nextSibling), b.Lc || --a;
      for (; b.Lc; ) b = b.nextSibling;
    } else {
      b = this.Rd;
      for (a = this.ge - 1 - a; 1 <= a; ) (b = b.ic), b.Lc || --a;
      for (; b.Lc; ) b = b.ic;
    }
    return b;
  };
  g.Pf = function(a) {
    for (var b = 0, c = this.Ha; c; c = c.nextSibling) {
      if (c === a) return b;
      c.Lc || ++b;
    }
    return -1;
  };
  g.Md = function(a, b) {
    var c = this.De(b - 1);
    a.depth = NaN;
    this.Fp(a, c);
  };
  g.Th = function(a) {
    this.qg(a);
  };
  var Fe = function(a, b, c) {
      if (a && (c = l(c) ? c : b.getName())) {
        var d = b.c.J();
        b = b.sa() ? b.t : a;
        d.jo(a, c, b);
      }
    },
    Ge = function(a, b) {
      if (a) {
        var c = b.getName();
        if (c) {
          var d = b.c.J(),
            e = b.sa() ? b.t : a;
          d.Qq(a, c, e);
        }
      }
    };
  Ee.prototype.Wp = function(a) {
    var b = new ad();
    this.forEach(function(c) {
      b.eh(a(c).Yb(c.wa()));
      return !1;
    });
    return b;
  };
  Ee.prototype.kn = function(a) {
    var b = new ad();
    this.forEach(function(c) {
      b.eh(a(c));
      return !1;
    });
    return b;
  };
  var He = function(a, b) {
      if (this.Al())
        return Function('return (' + a + ')(' + b.join(',') + ');')();
    },
    Ie = function() {
      return !0;
    },
    Le = function(a, b, c, d) {
      var e = Je.c.Al();
      if (!e) return !1;
      var f = e[a];
      if (!f || f.__swiffy_external)
        c
          ? ((f = function() {
              try {
                for (var a = [], e = 0; e < arguments.length; ++e)
                  a.push(Ke(arguments[e]));
                var f = c.apply(b, a);
                return Ke(f);
              } catch (n) {
                return d ? d(n) : null;
              }
            }),
            Object.defineProperty(f, '__swiffy_external', { value: !0 }),
            (e[a] = f))
          : delete e[a];
      return !0;
    },
    Ne = function(a, b, c) {
      var d = a.Al();
      (d = d && d.id) &&
        null != c &&
        Me(a, 'window[' + Ba(d + '_DoFSCommand') + ']', [b, c]);
    },
    Me = function(a, b, c, d) {
      try {
        var e = a.Oo(b, c.map(Oe));
        return Ke(e);
      } catch (f) {
        if (d) return d(f);
      }
    },
    Oe = function(a) {
      switch (ca(a)) {
        case 'undefined':
        case 'null':
        case 'boolean':
        case 'number':
          return String(a);
        case 'string':
          return Ba(a);
        case 'array':
          return '[' + a.map(Oe) + ']';
        case 'object':
          if (a instanceof Date) return 'new Date(' + a.getTime() + ')';
          var b = [],
            c;
          for (c in a) b.push(Ba(c) + ':' + Oe(a[c]));
          return '{' + b.join(',') + '}';
        default:
          return 'null';
      }
    },
    Ke = function(a) {
      switch (ca(a)) {
        case 'undefined':
        case 'null':
        case 'boolean':
        case 'number':
        case 'string':
          return a;
        case 'array':
          return a.map(Ke);
        case 'object':
          if (a instanceof Date) return new Date(a.getTime());
          var b = [],
            c;
          for (c in a) b[c] = Ke(a[c]);
          return b;
        default:
          return null;
      }
    };
  var Pe = function(a) {
    this.cf = a || null;
    this.Fc = null;
    this.$c = this.Zc = 0;
    this.Tc = null;
    this.Vp = '';
    this.rm = {};
    this.Tp = this.contentType = this.content = null;
  };
  Pe.prototype.xu = function() {
    return this.Vp || this.Tc || '';
  };
  Pe.prototype.Uw = function(a) {
    this.Vp = a;
  };
  Pe.prototype.Ag = function(a) {
    this.Tc = a;
  };
  Pe.prototype.reset = function() {
    this.Fc = null;
    this.$c = this.Zc = 0;
    this.Tc = null;
    this.rm = {};
    this.contentType = this.content = null;
  };
  var w = function(a) {
      return a.__swiffy_v;
    },
    Qe = function(a, b) {
      Object.defineProperty(a, '__swiffy_v', { value: b });
    };
  var Re = function(a, b, c) {
    this.c = a;
    this.definition = b;
    this.t = c || this.na();
    this.t.__swiffy_d = this;
    this.t.__swiffy_child_ref = {};
  };
  Re.prototype.ia = function(a, b) {
    this.c.J().co(this, a, b);
  };
  Re.prototype.ah = function() {};
  Re.prototype.Nf = function() {};
  var x = function(a) {
    return a.__swiffy_d;
  };
  var Se = function() {
      this.color = this.bold = this.Qa = null;
      this.hf = !1;
      this.letterSpacing = this.Wb = this.leading = this.leftMargin = this.rightMargin = this.indent = this.target = this.url = this.Xr = this.Kn = this.vb = this.En = this.size = this.italic = this.font = null;
    },
    Te = function() {
      var a = new Se();
      a.bold = !1;
      a.italic = !1;
      a.vb = !1;
      a.font = '_serif';
      a.color = 0;
      a.size = 240;
      a.indent = 0;
      a.rightMargin = 0;
      a.leftMargin = 0;
      a.leading = 0;
      a.Qa = 0;
      a.Wb = !1;
      a.letterSpacing = 0;
      return a;
    },
    Ve = function(a) {
      var b = Te(),
        c = a.font && a.font.get();
      c instanceof Ue && (b.font = c);
      l(a.color) && (b.color = 16777215 & a.color);
      l(a.height) && (b.size = a.height);
      l(a.indent) && (b.indent = a.indent);
      l(a.align) && (b.Qa = a.align);
      l(a.leftMargin) && (b.leftMargin = a.leftMargin);
      l(a.rightMargin) && (b.rightMargin = a.rightMargin);
      l(a.leading) && (b.leading = a.leading);
      return b;
    },
    We = function(a) {
      var b = new Se();
      b.color = a;
      b.hf = !0;
      return b;
    };
  g = Se.prototype;
  g.dh = function(a) {
    this.hf = a.hf;
    null != a.color && ((this.color = a.color), (this.hf = !0));
    this.bold = null != a.bold ? a.bold : this.bold;
    this.font = null != a.font ? a.font : this.font;
    this.italic = null != a.italic ? a.italic : this.italic;
    this.size = null != a.size ? a.size : this.size;
    this.vb = null != a.vb ? a.vb : this.vb;
    this.Qa = null != a.Qa ? a.Qa : this.Qa;
    this.target = null != a.target ? a.target : this.target;
    this.url = null != a.url ? a.url : this.url;
    this.indent = null != a.indent ? a.indent : this.indent;
    this.rightMargin = null != a.rightMargin ? a.rightMargin : this.rightMargin;
    this.leftMargin = null != a.leftMargin ? a.leftMargin : this.leftMargin;
    this.leading = null != a.leading ? a.leading : this.leading;
    this.Wb = null != a.Wb ? a.Wb : this.Wb;
    this.letterSpacing =
      null != a.letterSpacing ? a.letterSpacing : this.letterSpacing;
  };
  g.Ch = function() {
    return !!this.font && this.font instanceof Ue;
  };
  g.Nl = function() {
    return (
      !!this.font &&
      this.font instanceof Ue &&
      (0 < this.font.glyphs.length || this.font == Xe)
    );
  };
  g.cp = function() {
    return this.font instanceof Ue &&
      (0 < this.font.glyphs.length || this.font == Xe)
      ? this.font
      : null;
  };
  g.clone = function() {
    var a = new Se();
    a.bold = this.bold;
    a.color = this.color;
    a.font = this.font;
    a.italic = this.italic;
    a.size = this.size;
    a.vb = this.vb;
    a.hf = this.hf;
    a.Qa = this.Qa;
    a.url = this.url;
    a.target = this.target;
    a.indent = this.indent;
    a.rightMargin = this.rightMargin;
    a.leftMargin = this.leftMargin;
    a.leading = this.leading;
    a.Wb = this.Wb;
    a.letterSpacing = this.letterSpacing;
    return a;
  };
  g.Hv = function(a) {
    this.bold = this.bold == a.bold ? this.bold : null;
    this.color = this.color == a.color ? this.color : null;
    this.font = this.font == a.font ? this.font : null;
    this.italic = this.italic == a.italic ? this.italic : null;
    this.size = this.size == a.size ? this.size : null;
    this.vb = this.vb == a.vb ? this.vb : null;
    this.Qa = this.Qa == a.Qa ? this.Qa : null;
    this.url = this.url == a.url ? this.url : null;
    this.target = this.target == a.target ? this.target : null;
    this.Wb = this.Wb == a.Wb ? this.Wb : null;
    this.indent = this.indent == a.indent ? this.indent : null;
    this.rightMargin =
      this.rightMargin == a.rightMargin ? this.rightMargin : null;
    this.leftMargin = this.leftMargin == a.leftMargin ? this.leftMargin : null;
    this.leading = this.leading == a.leading ? this.leading : null;
    this.letterSpacing =
      this.letterSpacing == a.letterSpacing ? this.letterSpacing : null;
  };
  var Ye = {
    _sans: 'Arial, Helvetica, sans-serif',
    _serif: 'Times, serif',
    _typewriter: 'monospace',
  };
  Se.prototype.mb = function(a) {
    var b = '';
    this.bold && (b += 'bold ');
    this.italic && (b += 'italic ');
    var c = this.font instanceof Ue ? this.font.name : this.font;
    a.font = b + this.size + 'px ' + (Ye[c] || '"' + c + '", sans-serif');
  };
  var Ze = function(a) {
      if (null == a) return null;
      a = Math.round(Number(a));
      a != a && (a = -2147483648);
      return 20 * a;
    },
    $e = function(a) {
      return null == a ? null : a / 20;
    },
    af = function(a) {
      if (null == a) return null;
      switch (String(a)) {
        case 'left':
          return 0;
        case 'center':
          return 2;
        case 'right':
          return 1;
        case 'justify':
          return 3;
      }
    },
    bf = function() {
      switch (w(this).Qa) {
        case 0:
          return 'left';
        case 2:
          return 'center';
        case 1:
          return 'right';
        case 3:
          return 'justify';
        default:
          return null;
      }
    },
    cf = function(a) {
      a = af(a);
      if (!l(a)) return !1;
      w(this).Qa = a;
      return !0;
    },
    df = function() {
      return $e(w(this).En);
    },
    ef = function(a) {
      w(this).En = Ze(a);
    },
    ff = function() {
      return w(this).bold;
    },
    gf = function(a) {
      w(this).bold = null == a ? null : !!a;
    },
    hf = function() {
      return w(this).Kn;
    },
    jf = function(a) {
      w(this).Kn = null == a ? null : !!a;
    },
    kf = function() {
      var a = w(this).color;
      return null == a ? null : a & 16777215;
    },
    lf = function(a) {
      w(this).color = null == a ? null : Number(a) & 16777215;
    },
    mf = function() {
      var a = w(this).font;
      a instanceof Ue && (a = a.name);
      return a;
    },
    nf = function(a) {
      w(this).font = null == a ? null : String(a);
    },
    of = function() {
      return $e(w(this).indent);
    },
    pf = function(a) {
      w(this).indent = Ze(a);
    },
    qf = function() {
      return w(this).italic;
    },
    rf = function(a) {
      w(this).italic = null == a ? null : !!a;
    },
    sf = function() {
      return w(this).Wb;
    },
    tf = function(a) {
      w(this).Wb = null == a ? null : !!a;
    },
    uf = function() {
      return $e(w(this).leading);
    },
    vf = function(a) {
      w(this).leading = Ze(a);
    },
    wf = function() {
      return $e(w(this).leftMargin);
    },
    xf = function(a) {
      w(this).leftMargin = Ze(a);
    },
    yf = function() {
      return $e(w(this).letterSpacing);
    },
    zf = function(a) {
      null == a
        ? (a = null)
        : ((a = Number(a)), a != a && (a = -2147483648), (a *= 20));
      w(this).letterSpacing = a;
    },
    Af = function() {
      return $e(w(this).rightMargin);
    },
    Bf = function(a) {
      w(this).rightMargin = Ze(a);
    },
    Cf = function() {
      return $e(w(this).size);
    },
    Df = function(a) {
      w(this).size = Ze(a);
    },
    Ef = function() {
      return w(this).target;
    },
    Ff = function(a) {
      w(this).target = null == a ? null : String(a);
    },
    Gf = function() {
      var a = w(this).Xr;
      return a && a.map($e);
    },
    Hf = function(a) {
      var b = null;
      if (a && a.length)
        for (var b = [], c = 0; c < a.length; ++c) b.push(Ze(a[c]) | 0);
      w(this).Xr = b;
    },
    If = function() {
      return w(this).vb;
    },
    Jf = function(a) {
      w(this).vb = null == a ? null : !!a;
    },
    Kf = function() {
      return w(this).url;
    },
    Lf = function(a) {
      w(this).url = null == a ? null : String(a);
    };
  var Mf = function() {
    this.Uj = [];
    this.Mr = null;
  };
  Mf.prototype.yd = function(a) {
    return new this.Uj[Nf(a.constructor)](a);
  };
  Mf.prototype.Dt = function(a) {
    return new this.Mr(a);
  };
  Mf.prototype.C = function(a, b) {
    this.Uj[Nf(a)] = b;
  };
  Mf.prototype.Iq = function(a) {
    this.Mr = a;
  };
  var Of = [],
    Nf = function(a) {
      l(a.Yq) || ((a.Yq = Of.length), Of.push(a));
      return a.Yq;
    },
    Pf = function(a) {
      Mf.call(this, a);
    };
  v(Pf, Mf);
  Pf.prototype.yd = function(a) {
    return this.Uj[Nf(a.constructor)];
  };
  Pf.prototype.C = function(a, b) {
    this.Uj[Nf(a)] = new b(null);
  };
  var Qf = function(a, b) {
      this.Ms = a;
      this.Ls = b;
      this.se = {};
    },
    Rf = function(a, b) {
      if (1 == a || a == b) return a;
      var c;
      if (a > b) c = b + 10 * Math.ceil((a - b) / 10);
      else {
        c = b;
        for (var d = Math.ceil(0.5 * c); d >= a; )
          (c = d), (d = Math.ceil(0.5 * c));
      }
      return c;
    };
  Qf.prototype.Ia = function(a, b, c, d) {
    var e = Rf(a, this.Ms),
      f = Rf(b, this.Ls),
      h = '' + e + 'x' + f,
      k = this.se[h];
    k
      ? ((this.se[h] = k.next),
        (k = k.canvas),
        (h = k.getContext('2d')),
        h.save(),
        (!d || (fb && kb)) && h.clearRect(0, 0, e, f))
      : ((k = Sf(e, f)),
        (k.mk = 0),
        (k.ge = h),
        (k.Bw = this.od.bind(this, k)),
        k.getContext('2d').save());
    k.pC = c;
    k.Xj = a;
    k.Wj = b;
    return k;
  };
  Qf.prototype.od = function(a) {
    a.Xj = void 0;
    a.Wj = void 0;
    a.mk += 1;
    a.getContext('2d').restore();
    var b = a.ge;
    this.se[b] = new Tf(a, this.se[b] || null);
    return null;
  };
  Qf.prototype.Wg = function() {
    var a,
      b,
      c = Object.keys(this.se);
    for (b = 0; b < c.length; ++b)
      (a = c[b]),
        (this.se[a] = Uf(this.se[a], function(a) {
          return a.mk ? ((a.mk = 0), !1) : !0;
        }));
  };
  var Vf = function() {};
  Vf.prototype.Ia = function(a, b) {
    var c = Sf(a, b);
    c.Xj = a;
    c.Wj = b;
    return c;
  };
  Vf.prototype.od = function() {};
  Vf.prototype.Wg = function() {};
  var Tf = function(a, b) {
      this.canvas = a;
      this.next = b;
    },
    Uf = function(a, b) {
      for (var c = a, d = null; a; a = a.next)
        b(a.canvas) ? (d ? (d.next = a.next) : (c = a.next)) : (d = a);
      return c;
    };
  var Wf = function(a) {
    this.Gv = a;
    this.Oh = {};
    this.ej = this.Fk = 0;
  };
  Wf.prototype.Ta = function(a) {
    if ((a = this.Oh[a])) a.$l = this.ej;
    return a;
  };
  Wf.prototype.Ws = function() {
    return this.Fk < this.Gv;
  };
  Wf.prototype.add = function(a, b) {
    this.Oh[a] = b;
    this.Fk++;
    b.$l = this.ej;
  };
  Wf.prototype.Wg = function() {
    for (var a in this.Oh) {
      var b = this.Oh[a];
      6 < this.ej - b.$l && (b.oj.Bw(), delete this.Oh[a], this.Fk--);
    }
    this.ej++;
  };
  var Xf = function(a, b, c) {
    this.oj = a;
    this.Ps = b;
    this.Ok = c;
    this.$l = 0;
  };
  var Yf = new Pf('canvas');
  ba('swiffy.CANVAS', Yf, void 0);
  var $f = function(a) {
    var b = Yf;
    a.Pd() && (b = Zf);
    return a.Ke(b);
  };
  var ag = function(a, b, c, d, e, f, h, k, m, n, t) {
    this.ib = d;
    this.jb = e;
    this.jg = f;
    this.fb = b;
    this.hb = c;
    this.lb = a.Xj || a.width;
    this.tc = a.Wj || a.height;
    this.Xq = new ad(this.fb, this.hb, this.lb + this.fb, this.tc + this.hb);
    this.Xq.scale(1 / this.ib, 1 / this.jb);
    this.Ua = a.getContext('2d');
    this.ai = m || null;
    this.flags = k || 0;
    this.qa = h;
    this.ig = n || null;
    this.Lj = t || null;
  };
  g = ag.prototype;
  g.Nd = function() {
    return !!(this.flags & 16);
  };
  g.Se = function() {
    return !!(this.flags & 8);
  };
  g.xj = function() {
    return !(this.flags & 24);
  };
  g.fv = function() {
    return !!(this.flags & 64);
  };
  g.rc = function(a) {
    a &&
      this.Ua.setTransform(
        a.n * this.ib,
        a.o * this.jb,
        a.j * this.ib,
        a.i * this.jb,
        a.q * this.ib - this.fb,
        a.s * this.jb - this.hb
      );
    return this.Ua;
  };
  g.Ne = function() {
    this.Ua.setTransform(1, 0, 0, 1, 0, 0);
    return this.Ua;
  };
  g.Hl = function(a) {
    return Vc(
      a.n * this.ib,
      a.o * this.jb,
      a.j * this.ib,
      a.i * this.jb,
      a.q * this.ib - this.fb,
      a.s * this.jb - this.hb
    );
  };
  g.clear = function(a) {
    var b = this.Ua;
    b.setTransform(1, 0, 0, 1, 0, 0);
    a
      ? ((b.globalCompositeOperation = 'copy'),
        (b.fillStyle = a),
        b.fillRect(0, 0, this.lb, this.tc),
        (b.globalCompositeOperation = 'source-over'))
      : b.clearRect(0, 0, this.lb, this.tc);
  };
  g.K = function() {
    return this.lb;
  };
  g.$ = function() {
    return this.tc;
  };
  g.jj = function() {
    return new ad(0, 0, this.lb, this.tc);
  };
  g.Ia = function() {
    return this.Ua.canvas;
  };
  g.Pr = function(a, b) {
    return this.hh(this.Gk(a, b), !1, this.flags | 16);
  };
  g.xn = function() {
    return this.hh(this.jj(), !1, this.ig.flags, this.ig);
  };
  g.ml = function() {
    this.Zn();
    this.ig.af();
    this.af();
    return this.Lj;
  };
  g.Zn = function() {
    this.gm(this.ig, 1);
    this.Lj.xe(this);
  };
  g.hh = function(a, b, c, d) {
    c = A(c, this.flags);
    var e = a.width(),
      f = a.height();
    if (0 >= e || 0 >= f)
      (e = f = 1), (a = new ad(this.fb - 1, this.hb - 1, this.fb, this.hb));
    b = this.qa.Ia(e, f, b);
    return new ag(
      b,
      a.l + this.fb,
      a.m + this.hb,
      this.ib,
      this.jb,
      this.jg,
      this.qa,
      c,
      this.ai,
      this,
      d
    );
  };
  g.af = function() {
    this.qa.od(this.Ia());
    return (this.Ua = null);
  };
  g.Gk = function(a, b, c) {
    a = a.Yb(this.Hl(b));
    b = this.jj();
    c && ((c = c.clone()), c.scale(this.ib, this.jb), b.add(c.Zv()));
    a.Sl(b);
    a.tl();
    return a;
  };
  g.ov = function(a, b) {
    return (
      a.width() == this.lb &&
      a.height() == this.tc &&
      a.l + b.fb == this.fb &&
      a.m + b.hb == this.hb
    );
  };
  g.xe = function(a) {
    var b = this.Ua;
    b.setTransform(1, 0, 0, 1, 0, 0);
    b.drawImage(a.Ia(), a.fb - this.fb, a.hb - this.hb);
  };
  g.Os = function(a, b, c) {
    if (100 != b) {
      var d = this.Lj;
      if (1 >= b || !d) this.Dn(a, b, c);
      else {
        var e = this.Ua;
        this.Zn();
        e.globalCompositeOperation = 'copy';
        this.xe(a);
        this.gm(this.ig, 1);
        d.Dn(this, b, c);
        this.clear();
        e.globalCompositeOperation = 'source-over';
      }
    }
  };
  g.gm = function(a, b) {
    var c = this.Ua;
    c.globalAlpha = b;
    c.globalCompositeOperation = 'destination-in';
    this.xe(a);
    c.globalAlpha = 1;
    c.globalCompositeOperation = 'source-over';
  };
  g.Dn = function(a, b, c) {
    var d = this.Ua,
      e = bg(b);
    d.globalAlpha = c;
    d.globalCompositeOperation = e;
    d.globalCompositeOperation == e
      ? (this.xe(a), (d.globalCompositeOperation = 'source-over'))
      : this.jw(a, b);
    d.globalAlpha = 1;
  };
  g.jw = function(a, b) {
    var c = a.jj(),
      d = a.fb - this.fb,
      e = a.hb - this.hb;
    c.translate(d, e);
    c.Sl(this.jj());
    var d = c.l,
      e = c.m,
      f = c.width(),
      h = c.height();
    if (!(0 >= f || 0 >= h)) {
      var c = this.Ua,
        k = c.getImageData(d, e, f, h),
        m = k.data,
        n = cg[b];
      if (n) {
        for (
          var k = a.Ua.getImageData(
              d - (a.fb - this.fb),
              e - (a.hb - this.hb),
              f,
              h
            ),
            t = k.data,
            p = t.length,
            r = 0;
          r < p;
          r += 4
        ) {
          var u = m[r + 3] / 255;
          t[r + 0] = n(t[r + 0], m[r + 0]) * u + t[r + 0] * (1 - u);
          t[r + 1] = n(t[r + 1], m[r + 1]) * u + t[r + 1] * (1 - u);
          t[r + 2] = n(t[r + 2], m[r + 2]) * u + t[r + 2] * (1 - u);
        }
        f = this.qa.Ia(f, h);
        zd(f.getContext('2d'), k, 0, 0);
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.drawImage(f, d, e);
        this.qa.od(f);
      } else
        c.putImageData(c.createImageData(f, h), d, e),
          this.xe(a),
          (f = c.getImageData(d, e, f, h).data),
          dg(f, m, b),
          zd(c, k, d, e);
    }
  };
  var bg = function(a) {
    switch (a) {
      case 2:
      case 4:
      case 5:
      case 3:
      case 12:
      case 6:
        return Qc[a];
      case 13:
        return 'hard-light';
      case 7:
        return 'lighter';
      case 10:
        return 'destination-in';
      case 11:
        return 'destination-out';
      case 8:
      case 9:
        return '';
      default:
        return 'source-over';
    }
  };
  g = ag.prototype;
  g.getImageData = function() {
    return this.Ua.getImageData(0, 0, this.lb, this.tc);
  };
  g.createImageData = function() {
    return this.Ua.createImageData(this.lb, this.tc);
  };
  g.putImageData = function(a) {
    zd(this.Ua, a, 0, 0);
  };
  g.uw = function(a) {
    this.Ua.putImageData(a, 0, 0);
  };
  g.Di = function(a, b, c) {
    var d = this.Ua;
    d.setTransform(c || 1, 0, 0, c || 1, 0, 0);
    d.globalCompositeOperation = b;
    d.drawImage(a, 0, 0);
    d.globalCompositeOperation = 'source-over';
  };
  g.Bt = function(a) {
    var b = this.qa.Ia(Math.ceil(this.lb * a), Math.ceil(this.tc * a), !1, !0),
      b = new ag(
        b,
        this.fb,
        this.hb,
        this.ib * a,
        this.jb * a,
        this.jg * a,
        this.qa,
        this.flags,
        this.ai
      ),
      c = this.Ia(),
      d = b.Ne();
    d.globalCompositeOperation = 'copy';
    d.drawImage(c, 0, 0, this.lb, this.tc, 0, 0, this.lb * a, this.tc * a);
    d.globalCompositeOperation = 'source-over';
    return b;
  };
  g.Fx = function(a) {
    return a === this.ai
      ? this
      : new ag(
          this.Ia(),
          this.fb,
          this.hb,
          this.ib,
          this.jb,
          this.jg,
          this.qa,
          this.flags,
          a,
          this.ig,
          this.Lj
        );
  };
  g.Zu = function(a) {
    return this.Xq.rq(a);
  };
  var eg = function(a, b, c) {
      for (var d = a.length, e = 0; e < d; e += 4) {
        var f = a[e + 3],
          h = b[e + 3];
        b[e + 3] = f + h - (f * h) / 255;
        var k = 1 / (255 * b[e + 3]);
        b[e + 0] =
          k *
          (c(a[e + 0], b[e + 0]) * f * h +
            a[e + 0] * f * (255 - h) +
            b[e + 0] * h * (255 - f));
        b[e + 1] =
          k *
          (c(a[e + 1], b[e + 1]) * f * h +
            a[e + 1] * f * (255 - h) +
            b[e + 1] * h * (255 - f));
        b[e + 2] =
          k *
          (c(a[e + 2], b[e + 2]) * f * h +
            a[e + 2] * f * (255 - h) +
            b[e + 2] * h * (255 - f));
      }
    },
    fg = function(a, b, c) {
      for (var d = a.length, e = 0; e < d; e += 4) {
        var f = a[e + 3],
          h = b[e + 3];
        if (0 < h) {
          var k = Math.min(255, (f + h) | 0);
          b[e + 3] = k;
          k = 1 / k;
          f *= c;
          b[e + 0] = (b[e + 0] * h + a[e + 0] * f) * k;
          b[e + 1] = (b[e + 1] * h + a[e + 1] * f) * k;
          b[e + 2] = (b[e + 2] * h + a[e + 2] * f) * k;
        } else
          (b[e + 0] = a[e + 0]),
            (b[e + 1] = a[e + 1]),
            (b[e + 2] = a[e + 2]),
            (b[e + 3] = f);
      }
    },
    gg = function(a, b) {
      for (var c = a.length, d = 0; d < c; d += 4) {
        var e = a[d + 3];
        0 < b[d + 3]
          ? ((b[d + 0] = b[d + 0] * (1 - (2 / 255) * e) + e),
            (b[d + 1] = b[d + 1] * (1 - (2 / 255) * e) + e),
            (b[d + 2] = b[d + 2] * (1 - (2 / 255) * e) + e))
          : ((b[d + 0] = a[d + 0]),
            (b[d + 1] = a[d + 1]),
            (b[d + 2] = a[d + 2]),
            (b[d + 3] = e));
      }
    },
    cg = [
      ,
      ,
      function(a, b) {
        return (a * b) / 255;
      },
      function(a, b) {
        return a + b - (a * b) / 255;
      },
    ];
  cg[5] = Math.min;
  cg[4] = Math.max;
  cg[13] = function(a, b) {
    return 127 >= a ? (2 * a * b) / 255 : 2 * (a + b - (a * b) / 255) - 255;
  };
  cg[12] = function(a, b) {
    return 127 >= b ? (2 * b * a) / 255 : 2 * (b + a - (b * a) / 255) - 255;
  };
  cg[6] = function(a, b) {
    return Math.abs(a - b);
  };
  var dg = function(a, b, c) {
    var d = cg[c];
    if (!d)
      switch (((d = 1), c)) {
        case 8:
          d = -1;
        case 7:
          fg(a, b, d);
          return;
        case 9:
          gg(a, b);
          return;
        default:
          d = function(a) {
            return a;
          };
      }
    eg(a, b, d);
  };
  var hg = function() {};
  Yf.C(De, hg);
  hg.prototype.apply = function() {};
  hg.prototype.la = function() {};
  var ig = function(a, b) {
    if (b.Q) {
      for (
        var c = a.getImageData(),
          d = c.data,
          e = d.length,
          f = b.Z,
          h = b.W,
          k = b.Y,
          m = b.U,
          n = b.X,
          t = b.T,
          p = b.S,
          r = b.Q,
          u = 0;
        u < e;
        u += 4
      )
        d[u + 3] &&
          ((d[u + 0] = d[u + 0] * f + h),
          (d[u + 1] = d[u + 1] * k + m),
          (d[u + 2] = d[u + 2] * n + t),
          (d[u + 3] = d[u + 3] * p + r));
      a.putImageData(c);
    } else (c = new ae(b.Js())), c.Ke(Yf).apply(c, a);
  };
  var jg = function() {};
  v(jg, hg);
  Yf.C(Yd, jg);
  var kg = function(a, b, c, d, e, f, h, k, m) {
      for (var n = 0, t = 0; t < m; ++t) {
        for (
          var p = 0, r = 0, u = 0, y = 0, z = t * k * 4, D = z, F = 0;
          F < h;
          ++F
        )
          (r += a[D + 0]),
            (u += a[D + 1]),
            (y += a[D + 2]),
            (p += a[D + 3]),
            (D += 4);
        for (var E = n, F = 0; F < f; ++F)
          (b[E + 0] = r * e),
            (b[E + 1] = u * e),
            (b[E + 2] = y * e),
            (b[E + 3] = p * e),
            F + h < k &&
              ((r += a[D + 0]),
              (u += a[D + 1]),
              (y += a[D + 2]),
              (p += a[D + 3]),
              (D += 4)),
            (E += c);
        for (; F + h + 4 <= k; F += 4)
          (b[E + 0] = r * e),
            (b[E + 1] = u * e),
            (b[E + 2] = y * e),
            (b[E + 3] = p * e),
            (E += c),
            (r += a[D + 0] - a[z + 0]),
            (u += a[D + 1] - a[z + 1]),
            (y += a[D + 2] - a[z + 2]),
            (p += a[D + 3] - a[z + 3]),
            (b[E + 0] = r * e),
            (b[E + 1] = u * e),
            (b[E + 2] = y * e),
            (b[E + 3] = p * e),
            (E += c),
            (r += a[D + 4] - a[z + 4]),
            (u += a[D + 5] - a[z + 5]),
            (y += a[D + 6] - a[z + 6]),
            (p += a[D + 7] - a[z + 7]),
            (b[E + 0] = r * e),
            (b[E + 1] = u * e),
            (b[E + 2] = y * e),
            (b[E + 3] = p * e),
            (E += c),
            (r += a[D + 8] - a[z + 8]),
            (u += a[D + 9] - a[z + 9]),
            (y += a[D + 10] - a[z + 10]),
            (p += a[D + 11] - a[z + 11]),
            (b[E + 0] = r * e),
            (b[E + 1] = u * e),
            (b[E + 2] = y * e),
            (b[E + 3] = p * e),
            (E += c),
            (r += a[D + 12] - a[z + 12]),
            (u += a[D + 13] - a[z + 13]),
            (y += a[D + 14] - a[z + 14]),
            (p += a[D + 15] - a[z + 15]),
            (z += 16),
            (D += 16);
        for (; F + h < k; ++F)
          (b[E + 0] = r * e),
            (b[E + 1] = u * e),
            (b[E + 2] = y * e),
            (b[E + 3] = p * e),
            (r += a[D + 0] - a[z + 0]),
            (u += a[D + 1] - a[z + 1]),
            (y += a[D + 2] - a[z + 2]),
            (p += a[D + 3] - a[z + 3]),
            (z += 4),
            (D += 4),
            (E += c);
        for (; F < k; ++F)
          (b[E + 0] = r * e),
            (b[E + 1] = u * e),
            (b[E + 2] = y * e),
            (b[E + 3] = p * e),
            (r -= a[z + 0]),
            (u -= a[z + 1]),
            (y -= a[z + 2]),
            (p -= a[z + 3]),
            (z += 4),
            (E += c);
        n += d;
      }
    },
    lg = function(a, b, c, d, e, f, h, k, m) {
      var n = 0;
      e /= 255;
      for (var t = 0; t < m; ++t) {
        for (
          var p = 0, r = 0, u = 0, y = 0, z = t * k * 4, D = z, F, E = 0;
          E < h;
          ++E
        )
          (F = a[D + 3]),
            (r += a[D + 0] * F),
            (u += a[D + 1] * F),
            (y += a[D + 2] * F),
            (p += 255 * F),
            (D += 4);
        for (var L = n, E = 0; E < f; ++E)
          (b[L + 0] = r * e),
            (b[L + 1] = u * e),
            (b[L + 2] = y * e),
            (b[L + 3] = p * e),
            E + h < k &&
              ((F = a[D + 3]),
              (r += a[D + 0] * F),
              (u += a[D + 1] * F),
              (y += a[D + 2] * F),
              (p += 255 * F),
              (D += 4)),
            (L += c);
        for (; E + h + 4 <= k; E += 4)
          (b[L + 0] = r * e),
            (b[L + 1] = u * e),
            (b[L + 2] = y * e),
            (b[L + 3] = p * e),
            (L += c),
            (F = a[D + 3]),
            (r += a[D + 0] * F),
            (u += a[D + 1] * F),
            (y += a[D + 2] * F),
            (p += 255 * F),
            (F = a[z + 3]),
            (r -= a[z + 0] * F),
            (u -= a[z + 1] * F),
            (y -= a[z + 2] * F),
            (p -= 255 * F),
            (b[L + 0] = r * e),
            (b[L + 1] = u * e),
            (b[L + 2] = y * e),
            (b[L + 3] = p * e),
            (L += c),
            (F = a[D + 7]),
            (r += a[D + 4] * F),
            (u += a[D + 5] * F),
            (y += a[D + 6] * F),
            (p += 255 * F),
            (F = a[z + 7]),
            (r -= a[z + 4] * F),
            (u -= a[z + 5] * F),
            (y -= a[z + 6] * F),
            (p -= 255 * F),
            (b[L + 0] = r * e),
            (b[L + 1] = u * e),
            (b[L + 2] = y * e),
            (b[L + 3] = p * e),
            (L += c),
            (F = a[D + 11]),
            (r += a[D + 8] * F),
            (u += a[D + 9] * F),
            (y += a[D + 10] * F),
            (p += 255 * F),
            (F = a[z + 11]),
            (r -= a[z + 8] * F),
            (u -= a[z + 9] * F),
            (y -= a[z + 10] * F),
            (p -= 255 * F),
            (b[L + 0] = r * e),
            (b[L + 1] = u * e),
            (b[L + 2] = y * e),
            (b[L + 3] = p * e),
            (L += c),
            (F = a[D + 15]),
            (r += a[D + 12] * F),
            (u += a[D + 13] * F),
            (y += a[D + 14] * F),
            (p += 255 * F),
            (F = a[z + 15]),
            (r -= a[z + 12] * F),
            (u -= a[z + 13] * F),
            (y -= a[z + 14] * F),
            (p -= 255 * F),
            (z += 16),
            (D += 16);
        for (; E + h < k; ++E)
          (b[L + 0] = r * e),
            (b[L + 1] = u * e),
            (b[L + 2] = y * e),
            (b[L + 3] = p * e),
            (F = a[D + 3]),
            (r += a[D + 0] * F),
            (u += a[D + 1] * F),
            (y += a[D + 2] * F),
            (p += 255 * F),
            (F = a[z + 3]),
            (r -= a[z + 0] * F),
            (u -= a[z + 1] * F),
            (y -= a[z + 2] * F),
            (p -= 255 * F),
            (z += 4),
            (D += 4),
            (L += c);
        for (; E < k; ++E)
          (b[L + 0] = r * e),
            (b[L + 1] = u * e),
            (b[L + 2] = y * e),
            (b[L + 3] = p * e),
            (F = a[z + 3]),
            (r -= a[z + 0] * F),
            (u -= a[z + 1] * F),
            (y -= a[z + 2] * F),
            (p -= 255 * F),
            (z += 4),
            (L += c);
        n += d;
      }
    },
    mg = function(a, b, c, d, e, f, h, k, m) {
      for (var n = 0, t = 0; t < m; ++t) {
        for (
          var p = 0, r = 0, u = 0, y = 0, z = t * k * 4, D = z, F = 0;
          F < h;
          ++F
        )
          (r += a[D + 0]),
            (u += a[D + 1]),
            (y += a[D + 2]),
            (p += a[D + 3]),
            (D += 4);
        for (var E = n, L, F = 0; F < f; ++F)
          (L = 255 / p),
            (b[E + 0] = r * L),
            (b[E + 1] = u * L),
            (b[E + 2] = y * L),
            (b[E + 3] = p * e),
            F + h < k &&
              ((r += a[D + 0]),
              (u += a[D + 1]),
              (y += a[D + 2]),
              (p += a[D + 3]),
              (D += 4)),
            (E += c);
        for (; F + h + 4 <= k; F += 4)
          (L = 255 / p),
            (b[E + 0] = r * L),
            (b[E + 1] = u * L),
            (b[E + 2] = y * L),
            (b[E + 3] = p * e),
            (E += c),
            (r += a[D + 0] - a[z + 0]),
            (u += a[D + 1] - a[z + 1]),
            (y += a[D + 2] - a[z + 2]),
            (p += a[D + 3] - a[z + 3]),
            (L = 255 / p),
            (b[E + 0] = r * L),
            (b[E + 1] = u * L),
            (b[E + 2] = y * L),
            (b[E + 3] = p * e),
            (E += c),
            (r += a[D + 4] - a[z + 4]),
            (u += a[D + 5] - a[z + 5]),
            (y += a[D + 6] - a[z + 6]),
            (p += a[D + 7] - a[z + 7]),
            (L = 255 / p),
            (b[E + 0] = r * L),
            (b[E + 1] = u * L),
            (b[E + 2] = y * L),
            (b[E + 3] = p * e),
            (E += c),
            (r += a[D + 8] - a[z + 8]),
            (u += a[D + 9] - a[z + 9]),
            (y += a[D + 10] - a[z + 10]),
            (p += a[D + 11] - a[z + 11]),
            (L = 255 / p),
            (b[E + 0] = r * L),
            (b[E + 1] = u * L),
            (b[E + 2] = y * L),
            (b[E + 3] = p * e),
            (E += c),
            (r += a[D + 12] - a[z + 12]),
            (u += a[D + 13] - a[z + 13]),
            (y += a[D + 14] - a[z + 14]),
            (p += a[D + 15] - a[z + 15]),
            (z += 16),
            (D += 16);
        for (; F + h < k; ++F)
          (L = 255 / p),
            (b[E + 0] = r * L),
            (b[E + 1] = u * L),
            (b[E + 2] = y * L),
            (b[E + 3] = p * e),
            (r += a[D + 0] - a[z + 0]),
            (u += a[D + 1] - a[z + 1]),
            (y += a[D + 2] - a[z + 2]),
            (p += a[D + 3] - a[z + 3]),
            (z += 4),
            (D += 4),
            (E += c);
        for (; F < k; ++F)
          (L = 255 / p),
            (b[E + 0] = r * L),
            (b[E + 1] = u * L),
            (b[E + 2] = y * L),
            (b[E + 3] = p * e),
            (r -= a[z + 0]),
            (u -= a[z + 1]),
            (y -= a[z + 2]),
            (p -= a[z + 3]),
            (z += 4),
            (E += c);
        n += d;
      }
    };
  jg.prototype.apply = function(a, b) {
    if (!(1 >= a.x && 1 >= a.y)) {
      var c = b;
      2 < a.x &&
        2 < a.y &&
        2 < b.K() &&
        2 < b.$() &&
        100 < b.K() * b.$() &&
        (b = c.Bt(0.5));
      for (
        var d = 20 * b.jb,
          e = Math.max((20 * a.x * b.ib) | 0, 1),
          d = Math.max((a.y * d) | 0, 1),
          f = a.quality,
          h = b.K(),
          k = b.$(),
          m = b.getImageData(),
          n = m.data,
          t = b.createImageData().data,
          p = f & 1,
          r,
          u,
          y = lg,
          z = 1;
        z < f;
        ++z
      )
        (r = ((e - p) / 2) | 0),
          (u = e - r),
          y(n, t, 4, 4 * h, 1 / e, r, u, h, k),
          (p ^= 1),
          (r = n),
          (n = t),
          (t = r),
          (y = kg);
      f & 1 && (e = (e - 1) | 1);
      r = ((e - p) / 2) | 0;
      y(n, t, 4 * k, 4, 1 / e, r, e - r, h, k);
      r = n;
      n = t;
      t = r;
      y = kg;
      p = f & 1;
      for (z = 1; z < f; ++z)
        (r = ((d - p) / 2) | 0),
          (u = d - r),
          y(n, t, 4, 4 * k, 1 / d, r, u, k, h),
          (p ^= 1),
          (r = n),
          (n = t),
          (t = r);
      y = wd ? kg : mg;
      f & 1 && (d = (d - 1) | 1);
      r = ((d - p) / 2) | 0;
      y(n, t, 4 * h, 4, 1 / d, r, d - r, k, h);
      b.uw(m);
      b != c &&
        ((e = b.Ia()),
        (d = c.Ne()),
        (d.globalCompositeOperation = 'copy'),
        d.drawImage(e, 0, 0, b.K(), b.$(), 0, 0, c.K(), c.$()),
        b.af());
    }
  };
  var ng = function() {};
  v(ng, hg);
  Yf.C(ae, ng);
  var og = /10000010000010000010/,
    pg = /100000100000100000[0x]0/,
    qg = /1000[01x]0100[01x]0010[01x]000[01x]0/,
    rg = /0000[01x]0000[01x]0000[01x]000[01x]0/,
    sg = function(a) {
      a = a[18];
      var b = this.Ne();
      b.save();
      b.globalAlpha = a;
      b.globalCompositeOperation = 'source-in';
      b.drawImage(this.Ia(), 0, 0);
      b.restore();
    },
    tg = function(a) {
      var b = a[4] | 0,
        c = a[9] | 0,
        d = a[14] | 0;
      a = a[18];
      var e = this.qa.Ia(this.K(), this.$(), !1, !0),
        f = this.K(),
        h = this.$(),
        k = e.getContext('2d');
      k.globalAlpha = 1;
      k.globalCompositeOperation = 'copy';
      k.drawImage(this.Ia(), 0, 0);
      k.fillStyle =
        'rgb(' +
        Math.min(b, 255) +
        ',' +
        Math.min(c, 255) +
        ',' +
        Math.min(d, 255) +
        ')';
      k.globalCompositeOperation = 'lighter';
      k.fillRect(0, 0, f, h);
      b = this.Ne();
      b.save();
      b.globalAlpha = a;
      b.globalCompositeOperation = 'source-in';
      b.drawImage(e, 0, 0);
      b.restore();
      this.qa.od(e);
    },
    ug = function(a) {
      var b = a[4] | 0,
        c = a[9] | 0,
        d = a[14] | 0;
      a = a[18];
      var e = this.Ne();
      e.save();
      0 == a
        ? e.clearRect(0, 0, this.K(), this.$())
        : ((e.globalCompositeOperation = 'source-in'),
          (e.fillStyle = 'rgba(' + b + ',' + c + ',' + d + ',' + a + ')'),
          e.fillRect(0, 0, this.K(), this.$()));
      e.restore();
    },
    vg = {},
    wg = function(a) {
      for (var b = [!1, !1, !1, !1], c = [], d = 0, e = 0; 4 > e; ++e) {
        for (var f = !1, h = !1, k = [], m = 0; 4 > m; ++m) {
          var n = a[d++];
          1 == n
            ? (m == e ? (f = !0) : (h = b[m] = !0), k.push('s' + m))
            : 0 != n &&
              ((h = b[m] = !0), k.push('m[' + (5 * e + m) + ']*s' + m));
        }
        0 != a[d++] && ((h = !0), k.push('m[' + (5 * e + 4) + ']'));
        k.length || ((h = !0), k.push('0'));
        h && ((b[e] |= f), c.push('this[i+' + e + ']=' + k.join('+') + ';'));
      }
      a = [];
      for (m = 0; 4 > m; ++m) b[m] && a.push('s' + m + '=this[i+' + m + ']');
      b = [];
      b.push('for(var i=0,l=this.length;i<l;i+=4){');
      a.length && b.push('var ' + a.join() + ';');
      b.push(c.join('\n'));
      b.push('}');
      var t = new Function('m', b.join('\n'));
      return function(a) {
        var b = this.getImageData();
        t.apply(b.data, [a]);
        this.putImageData(b);
      };
    },
    xg = function(a) {
      for (var b = '', c = 0; 20 > c; ++c)
        var d = a[c], b = 0 != d && 1 != d ? b + 'x' : b + d;
      if (og.test(b)) return function() {};
      if (pg.test(b)) return sg;
      if (qg.test(b) && 0 <= a[4] && 0 <= a[9] && 0 <= a[14]) return tg;
      if (rg.test(b)) return ug;
      c = vg[b];
      c || ((c = wg(a, b)), (vg[b] = c));
      return c;
    };
  ng.prototype.apply = function(a, b) {
    xg(a.matrix).apply(b, [a.matrix]);
  };
  var yg = function() {};
  v(yg, hg);
  var zg = function(a, b, c, d, e, f, h, k, m, n) {
      for (var t = 0; t < n; ++t) {
        for (var p = 0, r = t * m * 4 + b, u = r, y = 0; y < k; ++y)
          (p += a[u]), (u += 4);
        for (var z = c, y = 0; y < h; ++y)
          (a[z] = p * f), y + k < m && ((p += a[u]), (u += 4)), (z += d);
        for (; y + k + 4 <= m; y += 4)
          (a[z] = p * f),
            (z += d),
            (p += a[u] - a[r]),
            (a[z] = p * f),
            (z += d),
            (p += a[u + 4] - a[r + 4]),
            (a[z] = p * f),
            (z += d),
            (p += a[u + 8] - a[r + 8]),
            (a[z] = p * f),
            (z += d),
            (p += a[u + 12] - a[r + 12]),
            (r += 16),
            (u += 16);
        for (; y + k < m; ++y)
          (a[z] = p * f), (p += a[u] - a[r]), (r += 4), (u += 4), (z += d);
        for (; y < m; ++y) (a[z] = p * f), (p -= a[r]), (r += 4), (z += d);
        c += e;
      }
    },
    Ag = function(a, b, c, d, e, f, h, k) {
      e = Math.max((a.x * e) | 0, 1);
      f = Math.max((a.y * f) | 0, 1);
      a = a.quality;
      if (0 < a && 1 < e * f) {
        for (var m = a & 1, n, t, p = 3, r = 2, u = 1; u < a; ++u)
          (n = ((e - m) / 2) | 0),
            (t = e - n),
            zg(b, p, r, 4, 4 * c, 1 / e, n, t, c, d),
            (m ^= 1),
            (n = p),
            (p = r),
            (r = n);
        a & 1 && (e = (e - 1) | 1);
        n = ((e - m) / 2) | 0;
        zg(b, p, r, 4 * d, 4, 1 / e, n, e - n, c, d);
        n = p;
        p = r;
        r = n;
        m = a & 1;
        for (u = 1; u < a; ++u)
          (n = ((f - m) / 2) | 0),
            (t = f - n),
            zg(b, p, r, 4, 4 * d, 1 / f, n, t, d, c),
            (m ^= 1),
            (n = p),
            (p = r),
            (r = n);
        a & 1 && (f = (f - 1) | 1);
        n = ((f - m) / 2) | 0;
        zg(b, p, h, 4 * c, 4, k / f, n, f - n, d, c);
      } else for (e = 3; e < c * d * 4; e += 4, h += 4) b[h] = b[e] * k;
    },
    Bg = function(a, b, c, d, e, f) {
      Ag(a, b, c, d, e, f, 1, 1);
      var h = a.distance;
      e = Math.round(Math.cos(a.angle) * h * e);
      f = Math.round(Math.sin(a.angle) * h * f);
      a = a.strength;
      a *= 0.5;
      for (h = 0; h < d; ++h)
        for (var k = 0; k < c; ++k) {
          var m = 0,
            n = 0;
          0 <= k + e &&
            k + e < c &&
            0 <= h + f &&
            h + f < d &&
            (m = b[4 * ((h + f) * c + k + e) + 1]);
          0 <= k - e &&
            k - e < c &&
            0 <= h - f &&
            h - f < d &&
            (n = b[4 * ((h - f) * c + k - e) + 1]);
          b[4 * (h * c + k) + 3] = (m - n) * a + 127.5;
        }
    },
    Dg = function(a, b, c, d) {
      for (
        var e = new Uint8Array(1024),
          f = 0,
          h = Cg(b[f]),
          k = c[f],
          m = d[f],
          n = 0,
          t = h,
          p = k,
          r = 0;
        256 > r;
        ++r
      ) {
        if (
          r >= m &&
          ((t = h),
          (p = k),
          (n = m),
          ++f < d.length ? ((h = Cg(b[f])), (k = c[f]), (m = d[f])) : (m = 255),
          r == n)
        ) {
          e[4 * r + 0] = t.Fb;
          e[4 * r + 1] = t.Ab;
          e[4 * r + 2] = t.wb;
          e[4 * r + 3] = 255 * p;
          continue;
        }
        var u = (r - n) / (m - n);
        e[4 * r + 0] = t.Fb + (h.Fb - t.Fb) * u;
        e[4 * r + 1] = t.Ab + (h.Ab - t.Ab) * u;
        e[4 * r + 2] = t.wb + (h.wb - t.wb) * u;
        e[4 * r + 3] = 255 * (p + (k - p) * u);
      }
      b = a.length;
      for (c = 0; c < b; c += 4)
        (d = 4 * a[c + 3]),
          (a[c + 0] = e[d + 0]),
          (a[c + 1] = e[d + 1]),
          (a[c + 2] = e[d + 2]),
          (a[c + 3] = e[d + 3]);
    };
  var Eg = function() {};
  v(Eg, hg);
  Yf.C(pe, Eg);
  Eg.prototype.apply = function(a, b) {
    for (
      var c = b.K(),
        d = b.$(),
        e = b.createImageData(),
        f = e.data,
        h = b.getImageData().data,
        k = a.divisor || 1,
        m = a.matrixX,
        n = a.matrixY,
        t = new Float32Array(m * n),
        p = 0;
      p < a.matrix.length;
      ++p
    )
      t[p] = a.matrix[p] / k;
    var k = (m / 2) | 0,
      p = (n / 2) | 0,
      r = a.bias,
      u = a.preserveAlpha,
      y = a.clamp;
    if (!y)
      var z = (a.color >> 24) & 255,
        D = (a.color >> 16) & 255,
        F = (a.color >> 8) & 255,
        E = a.color & 255;
    for (var L = 0, he = 0; L < d; ++L)
      for (var Cj = 0; Cj < c; ++Cj, he += 4) {
        for (var Mc = r, Nc = r, Oc = r, Zb = r, qn = 0, Dj = 0; Dj < n; ++Dj)
          for (
            var rn = L + Dj - p, sn = Math.max(0, Math.min(rn, d - 1)), Ej = 0;
            Ej < m;
            ++Ej, ++qn
          ) {
            var wc = t[qn],
              ie = Cj + Ej - k,
              tn = Math.max(0, Math.min(ie, c - 1)),
              je = 4 * (sn * c + tn);
            y || (tn === ie && sn === rn)
              ? u
                ? ((Mc += wc * h[je]),
                  (Nc += wc * h[je + 1]),
                  (Oc += wc * h[je + 2]))
                : ((ie = h[je + 3]),
                  (Mc += (wc * ie * h[je]) / 255),
                  (Nc += (wc * ie * h[je + 1]) / 255),
                  (Oc += (wc * ie * h[je + 2]) / 255),
                  (Zb += wc * ie))
              : ((Mc += wc * D),
                (Nc += wc * F),
                (Oc += wc * E),
                (Zb += wc * z));
          }
        u
          ? (Zb = h[he + 3])
          : 0 >= Zb
          ? (Mc = Nc = Oc = Zb = 0)
          : (255 < Zb && (Zb = 255),
            (Mc = (255 * Mc) / Zb),
            (Nc = (255 * Nc) / Zb),
            (Oc = (255 * Oc) / Zb));
        f[he] = Mc;
        f[he + 1] = Nc;
        f[he + 2] = Oc;
        f[he + 3] = Zb;
      }
    b.putImageData(e);
  };
  var Fg = new Pf('nul');
  ba('swiffy.NUL', Fg, void 0);
  var Gg = function(a, b, c) {
    this.gridFit = a;
    this.thickness = b;
    this.sharpness = c;
  };
  var Hg = {
      Hd: function() {
        return 0;
      },
    },
    Jg = function(a, b, c) {
      return da(a)
        ? 1 == a.length
          ? new Ig(c(a[0]))
          : new b(c(a[0]), c(a[1]))
        : new Ig(c(a));
    },
    Ig = function(a) {
      this.value = a;
    };
  Ig.prototype.Hh = !0;
  Ig.prototype.Ta = function() {
    return this.value;
  };
  var Kg = function(a, b) {
    this.from = a;
    this.to = b;
  };
  Kg.prototype.Hh = !1;
  Kg.prototype.Ta = function(a) {
    return Lg(this.from, this.to, a.Hd());
  };
  var Mg = function(a) {
      return Jg(a, Kg, fc);
    },
    Ng = function(a, b) {
      this.from = a;
      this.to = b;
    };
  Ng.prototype.Hh = !1;
  Ng.prototype.Ta = function(a) {
    var b = this.from,
      c = this.to;
    a = a.Hd();
    return Vc(
      Lg(b.n, c.n, a),
      Lg(b.o, c.o, a),
      Lg(b.j, c.j, a),
      Lg(b.i, c.i, a),
      Lg(b.q, c.q, a),
      Lg(b.s, c.s, a)
    );
  };
  var Pg = function(a, b, c) {
      return a
        ? Jg(a, Ng, function(a) {
            return Og(a).wm(b, b);
          })
        : c;
    },
    Qg = function(a, b) {
      this.from = a;
      this.to = b;
    };
  Qg.prototype.Hh = !1;
  Qg.prototype.Ta = function(a) {
    var b = this.from,
      c = this.to;
    a = a.Hd();
    return new Wc(
      Lg(b.Fb, c.Fb, a),
      Lg(b.Ab, c.Ab, a),
      Lg(b.wb, c.wb, a),
      Lg(b.Vc, c.Vc, a)
    );
  };
  var Rg = function(a, b) {
    this.from = a;
    this.to = b;
    this.eu = a.hs();
    this.px = b.hs();
  };
  Rg.prototype.Hh = !1;
  Rg.prototype.Ta = function(a) {
    a = a.Hd();
    return 0 == a ? this.from : 1 == a ? this.to : this.eu.zv(this.px, a);
  };
  var Sg = function() {};
  Sg.prototype.Ub = function() {};
  var Tg = [],
    Ug = function(a, b) {
      Tg[a] = b;
    },
    Vg = function(a, b) {
      Ug(a, function(a, d, e, f, h, k, m) {
        b(a, d, e, f, m).Ub(h, d, e, f.Dc, k);
      });
    };
  var Xg = function(a) {
    this.id = a;
    this.di = null;
    this.Gj = '';
    this.en = Wg++;
  };
  v(Xg, Sg);
  var Wg = 1;
  g = Xg.prototype;
  g.sa = !1;
  g.ia = function() {};
  g.Kb = function() {
    return null;
  };
  g.Nm = function(a) {
    this.di = a;
    Yg(a, this);
  };
  g.Ub = function(a, b, c, d) {
    d.Aq(this);
  };
  var Zg = function(a, b) {
    Xg.call(this, a);
    this.Gj = '';
    this.vc = b;
  };
  v(Zg, Xg);
  var $g = function(a, b, c, d, e) {
    Xg.call(this, a);
    this.trackAsMenu = b;
    this.records = c;
    this.actions = d;
    this.sounds = e;
  };
  v($g, Xg);
  Vg(10, function(a, b, c, d) {
    c = [];
    for (var e = 0; a.records && e < a.records.length; e++) {
      var f = a.records[e],
        h = f.transform ? Og(f.transform) : null,
        k = f.colortransform ? ah(f.colortransform) : null,
        m = void 0;
      if (f.filters)
        for (var m = [], n = 0; n < f.filters.length; n++)
          m.push(Td(f.filters[n]));
      l(f.id) &&
        c.push(new bh(d.Dc.Ee(f.id), f.depth, h, f.states, k, m, f.blendmode));
    }
    d = [];
    for (e = 0; a.actions && e < a.actions.length; e++)
      (f = b.bf(ch)),
        (h = a.actions[e]),
        d.push(new dh(f.Ei(h.actions, void 0), h.key, h.events));
    b = [];
    for (e = 0; a.sounds && e < a.sounds.length; e++)
      (f = a.sounds[e]), b.push(new eh(f.events, f.sound));
    return new $g(a.id, a.trackAsMenu, c, d, b);
  });
  $g.prototype.Kb = function(a, b, c) {
    return new fh(this, a, b, c);
  };
  $g.prototype.sa = !0;
  var bh = function(a, b, c, d, e, f, h) {
      this.definition = a;
      this.depth = b;
      this.transform = c;
      this.states = d;
      this.Ok = e;
      this.filters = f;
      this.blendmode = h;
    },
    dh = function(a, b, c) {
      this.actions = a;
      this.key = b;
      this.events = c;
    },
    eh = function(a, b) {
      this.events = a;
      this.sound = b;
    };
  var gh = function(a, b, c, d, e) {
    Xg.call(this, a);
    this.paths = b;
    this.bounds = c;
    this.fillstyles = d;
    this.linestyles = e;
    this.Gx = this.Hx();
  };
  v(gh, Xg);
  gh.prototype.ia = function() {};
  Vg(1, function(a, b, c, d) {
    var e = d.Dc;
    b = a.fillstyles
      ? a.fillstyles.map(function(a) {
          return hh(e, a);
        })
      : [];
    c = a.linestyles
      ? a.linestyles.map(function(a) {
          if (a) {
            var b = Mg(a.width),
              c = ih[a.cap] || 'round',
              d = ih[a.ecap] || c,
              n = jh[a.joint] || 'round';
            a = a.fill
              ? new kh(hh(e, a.fill), b, c, d, n, a.miter | 0, a.flags | 0)
              : new lh(
                  Jg(a.color, Qg, Cg),
                  b,
                  c,
                  d,
                  n,
                  a.miter | 0,
                  a.flags | 0
                );
          } else a = null;
          return a;
        })
      : [];
    return new gh(a.id, a.paths.map(mh), a.bounds.map(bd), b, c);
  });
  gh.prototype.Kb = function(a, b, c) {
    return new nh(this, a, c);
  };
  gh.prototype.re = function(a) {
    if (this.bounds) {
      if (1 == this.bounds.length) return this.bounds[0];
      a = a.Hd();
      return new ad(
        Lg(this.bounds[0].l, this.bounds[1].l, a),
        Lg(this.bounds[0].m, this.bounds[1].m, a),
        Lg(this.bounds[0].D, this.bounds[1].D, a),
        Lg(this.bounds[0].F, this.bounds[1].F, a)
      );
    }
    for (var b = new ad(), c = this.paths, d = 0; d < c.length; ++d) {
      var e = c[d].data.Ta(a),
        f = 0;
      null != c[d].line && (f = this.linestyles[c[d].line].width.Ta(a) / 2);
      e.qc(b, f);
    }
    return b;
  };
  gh.prototype.Qs = function(a) {
    for (var b = new ad(), c = this.paths, d = 0; d < c.length; ++d)
      c[d].data.Ta(a).qc(b, 0);
    return b;
  };
  var oh = function(a, b, c) {
      this.data = a;
      this.fill = b;
      this.line = c;
    },
    mh = function(a) {
      return new oh(Jg(a.data, Rg, ph), a.fill, a.line);
    };
  gh.prototype.Hx = function() {
    for (var a = 0, b = 0; b < this.paths.length; b++) {
      var c = this.paths[b];
      if (!c.data.Hh) return !1;
      var d = c.data.Ta(Hg).Xa.length,
        e = this.linestyles[c.line];
      if (e) {
        if (e.flags) return !1;
        a += d * e.ue();
      }
      (c = this.fillstyles[c.fill]) && (a += d * c.ue());
    }
    return 150 < a;
  };
  var qh = function(a, b, c) {
    Xg.call(this, a);
    this.sound = b;
    this.format = c;
  };
  v(qh, Xg);
  Vg(11, function(a) {
    return new qh(a.id, a.data, a.format);
  });
  qh.prototype.Ub = function(a, b) {
    b.Le().Aw(this.id, this.sound, this.format);
  };
  var rh = function(a, b, c, d, e, f, h) {
    Xg.call(this, a);
    this.numFrames = b;
    this.width = c;
    this.height = d;
    this.deblocking = e;
    this.smoothing = f;
    this.codecId = h;
  };
  v(rh, Xg);
  Vg(24, function(a) {
    return new rh(
      a.id,
      a.numFrames,
      a.width,
      a.height,
      a.deblocking,
      a.smoothing,
      a.codecId
    );
  });
  rh.prototype.Kb = function(a, b, c) {
    return new sh(this, a, c);
  };
  Tg[18] = function(a, b, c) {
    c = c || b.bf(th).kh;
    c.vw(a);
  };
  Tg[15] = function(a, b, c, d, e, f) {
    e.$b.ys(f, a.label);
  };
  Tg[19] = function(a, b, c, d) {
    c = c || b.bf(th).kh;
    for (b = 0; b < a.references.length; b++) {
      var e = a.references[b],
        f = d.Dc.Ee(e.id).get(),
        e = c.$a[e.name];
      f && e && f.Nm(e);
    }
  };
  var uh = function() {
    this.md = [];
  };
  g = uh.prototype;
  g.Ep = function(a) {
    var b = this.md;
    b.push(a);
    this.Vv(b.length - 1);
  };
  g.remove = function() {
    var a = this.md,
      b = a.length,
      c = a[0];
    if (!(0 >= b))
      return 1 == b ? (this.md = []) : ((a[0] = a.pop()), this.Tv(0)), c;
  };
  g.uq = function() {
    return 0 == this.md.length ? void 0 : this.md[0];
  };
  g.Tv = function(a) {
    for (var b = this.md, c = b.length, d = b[a]; 2 * a + 1 < c; ) {
      var e = 2 * a + 1,
        f = e + 1,
        e = f < c && 0 > b[f].compare(b[e]) ? f : e;
      if (0 > d.compare(b[e])) break;
      b[a] = b[e];
      a = e;
    }
    b[a] = d;
  };
  g.Vv = function(a) {
    for (var b = this.md, c = b[a]; 0 < a; ) {
      var d = Math.floor((a - 1) / 2);
      if (0 > c.compare(b[d])) (b[a] = b[d]), (a = d);
      else break;
    }
    b[a] = c;
  };
  g.Na = function() {
    return 0 == this.md.length;
  };
  var vh = new uh(),
    wh = 0,
    xh = function() {
      return Date.now();
    },
    zh = function(a, b) {
      return yh(a, b, !1);
    },
    Ah = function(a, b) {
      return yh(a, b, !0);
    },
    yh = function(a, b, c) {
      b = Math.floor(Math.max(b, 1));
      var d = xh() + b,
        e = wh++;
      vh.Ep(new Bh(d, a, e, c ? b : void 0));
      return e;
    },
    Ch = function(a) {
      for (var b = vh.md, c = 0; c < b.length; ++c)
        if (b[c].id == a) {
          b[c].Mk = !0;
          break;
        }
    },
    Dh = function() {
      if (!vh.Na() && vh.uq().time <= xh()) {
        var a = vh.remove();
        a.Mk ||
          (l(a.interval) && !a.Mk && ((a.time += a.interval), vh.Ep(a)),
          a.fu.apply(window));
        vh.Na() || window.setTimeout(Dh, 0);
      }
    },
    Bh = function(a, b, c, d) {
      this.time = a;
      this.fu = b;
      this.id = c;
      this.interval = d;
      this.Mk = !1;
    };
  Bh.prototype.compare = function(a) {
    var b = this.time - a.time;
    return 0 == b ? this.id - a.id : b;
  };
  var Eh = function(a, b, c) {
    this.ul = a ? a : 60;
    this.Fv = b;
    this.eg = 0;
    this.ha = c;
    this.lk = !1;
    this.iq = na(this.dw, this);
    this.tg = this.dj = 0;
    this.Ft = xh();
  };
  Eh.prototype.Rw = function(a) {
    this.ul = a;
  };
  Eh.prototype.start = function() {
    this.lk || ((this.lk = !0), (this.eg = xh()), sd(this.iq));
  };
  Eh.prototype.stop = function() {
    this.lk = !1;
  };
  Eh.prototype.dw = function() {
    if (this.lk) {
      var a = xh();
      vh.Na() || window.setTimeout(Dh, 0);
      if (a >= this.eg)
        if ((this.ha.an(), (a = 1e3 / this.ul), 0 >= this.dj)) {
          var b = xh();
          this.eg = Math.max(this.eg + a, b);
          this.ha.Uh();
          this.tg += xh() - b;
          this.dj = Math.min(Math.floor(this.tg / a), this.Fv);
          this.tg = 0;
        } else (this.eg += a), this.dj--;
      else
        this.ha.Bm &&
          0 >= this.dj &&
          ((b = xh()), this.ha.Uh(), (this.tg += xh() - b));
      sd(this.iq);
    }
  };
  var Fh = function(a, b, c, d, e, f, h) {
    switch (arguments.length) {
      case 0:
        return new Date(xh());
      case 1:
        return new Date(a);
      default:
        return new Date(
          a,
          b,
          l(c) ? c : 1,
          l(d) ? d : 0,
          l(e) ? e : 0,
          l(f) ? f : 0,
          l(h) ? h : 0
        );
    }
  };
  Object.defineProperty(Date, '__swiffy_override', { value: Fh });
  Object.defineProperty(Array, '__swiffy_override', { value: Array });
  var Gh = function(a) {
      Object.defineProperty(a.prototype, '__swiffy_nvr', { value: !0 });
    },
    Hh = function(a) {
      window.console && window.console.log('[trace] ' + a);
    },
    Ih = function(a) {
      this.value = a;
    },
    Jh = '',
    Kh = 0,
    Lh = function(a) {
      if (Kh >= a) throw new RangeError('Maximum stack size reached');
      ++Kh;
    },
    Mh = function(a) {
      if (--Kh) throw a;
      if (a instanceof Ih) Hh(a.value);
      else if (!(a instanceof RangeError)) throw a;
    };
  var Nh = function() {
    this.source = '';
  };
  g = Nh.prototype;
  g.append = function(a) {
    this.source += a;
    return this;
  };
  g.Yr = function() {
    var a = this.source;
    this.source = '';
    return a;
  };
  g.qj = function(a) {
    return a.fw;
  };
  g.zk = function(a) {
    return this.append(this.qj(a));
  };
  g.Og = function(a, b) {
    this.zk(a).append('(');
    for (var c = 1; c < arguments.length; ++c)
      1 < c && this.append(','), this.append(arguments[c]);
    return this.append(')');
  };
  g.I = function(a, b) {
    return this.Og.apply(this, arguments).append(';');
  };
  g.au = function(a) {
    return fa(a) ? Ba(a) : String(a);
  };
  Object.defineProperty(Array, 'CASEINSENSITIVE', { value: 1 });
  Object.defineProperty(Array, 'DESCENDING', { value: 2 });
  Object.defineProperty(Array, 'NUMERIC', { value: 16 });
  Object.defineProperty(Array, 'RETURNINDEXEDARRAY', { value: 8 });
  Object.defineProperty(Array, 'UNIQUESORT', { value: 4 });
  var Oh = function(a, b, c) {
      var d = b & Array.DESCENDING ? -1 : 1,
        e = Je,
        f;
      f = b & Array.NUMERIC ? e.Wn : b & Array.CASEINSENSITIVE ? e.Un : e.Vn;
      return function(b, k) {
        return d * f.call(e, b && b[a], k && k[a]) || c(b, k);
      };
    },
    Ph = function(a, b) {
      return function(c, d) {
        return b(a[c], a[d]);
      };
    };
  Object.defineProperty(Array.prototype, 'sortOn', {
    value: function(a, b) {
      a = da(a) ? a : [a];
      var c;
      da(b) && b.length == a.length
        ? (c = b[0] >>> 0)
        : ((c = b >>> 0), (b = null));
      for (
        var d = c & Array.RETURNINDEXEDARRAY,
          e = c & Array.UNIQUESORT,
          f = !1,
          h = function() {
            f = !0;
            return 0;
          },
          k = a.length - 1;
        0 <= k;
        --k
      )
        h = Oh(a[k], b ? b[k] >>> 0 : c, h);
      c = this;
      if (d || e)
        for (h = Ph(c, h), c = [], k = this.length - 1; 0 <= k; --k) c[k] = k;
      c.sort(h);
      if (e) {
        if (f) return 0;
        if (!d) {
          for (d = 0; d < c.length; d++)
            if (-1 != c[d]) {
              for (
                var e = this[d], m, h = d;
                (m = c[h]), (c[h] = -1), m != d;
                h = m
              )
                this[h] = this[m];
              this[h] = e;
            }
          return this;
        }
      }
      return c;
    },
  });
  var Je = null;
  var Qh = function(a, b) {
    this.av = a;
    this.oh = b;
  };
  var Rh = 1,
    Sh = function(a, b) {
      a.prototype = Object.create(b.prototype);
      a.prototype.constructor = a;
    },
    B = function(a, b, c) {
      c && Sh(a, c);
      a.prototype
        ? ((c = a.prototype.__swiffy_as2_classdef || null),
          Object.defineProperty(a.prototype, '__swiffy_as2_classdef', {
            value: a,
          }))
        : (c = Object);
      Object.defineProperty(a, '__swiffy_as2_typeid', { value: Rh++ });
      Object.defineProperty(a, '__swiffy_as2_baseclass', { value: c });
      Object.defineProperty(a, '__swiffy_as2_name', { value: b });
    };
  B(Object, 'Object');
  var C = function(a, b, c, d) {
    b = null == b ? Object.getOwnPropertyNames(a) : fa(b) ? b.split(',') : b;
    var e = {};
    d & 4 && (e.writable = !0);
    d & 2 && (e.configurable = !0);
    d & 1 && (e.enumerable = !0);
    c & 4 && (e.writable = !1);
    c & 2 && (e.configurable = !1);
    c & 1 && (e.enumerable = !1);
    for (c = 0; c < b.length; ++c)
      (d = Object.getOwnPropertyDescriptor(a, b[c])) &&
        d.configurable &&
        Object.defineProperty(a, b[c], e);
  };
  var Th = function(a) {
    Object.defineProperty(this, '__swiffy_vm', { value: a });
  };
  B(Th, 'AsBroadcaster');
  var Uh = function(a, b) {
      for (var c = [], d = 2; d < arguments.length; ++d) c.push(arguments[d]);
      for (d = 0; d < this._listeners.length; ++d) {
        var e = this._listeners[d],
          f = a.Sa(e, b);
        q(f) && f.apply(e, c);
      }
      return 0 < this._listeners.length ? !0 : void 0;
    },
    Vh = function(a) {
      null != a
        ? Ga(this._listeners, a)
        : Ha(this._listeners, function(a) {
            return null == a;
          });
      this._listeners.push(a);
      return !0;
    },
    Wh = function(a) {
      return Ga(this._listeners, a);
    };
  Th.prototype.initialize = function(a) {
    ia(a) &&
      ((a._listeners = []),
      (a.addListener = Vh),
      (a.broadcastMessage = oa(Uh, this.__swiffy_vm)),
      (a.removeListener = Wh),
      C(
        a,
        ['addListener', 'broadcastMessage', 'removeListener', '_listeners'],
        3
      ));
  };
  C(Th.prototype, null, 3);
  var Xh = function() {};
  B(Xh, 'BitmapFilter');
  var ne = function(a, b, c, d, e, f, h, k, m, n, t, p) {
    this.angle = l(b) ? b : 45;
    this.blurX = l(h) ? h : 4;
    this.blurY = l(k) ? k : 4;
    this.distance = l(a) ? a : 4;
    this.highlightAlpha = l(d) ? d : 1;
    this.highlightColor = l(c) ? c : 16777215;
    this.knockout = l(p) ? p : !1;
    this.quality = l(n) ? n : 1;
    this.shadowAlpha = l(f) ? f : 1;
    this.shadowColor = l(e) ? e : 0;
    this.strength = l(m) ? m : 1;
    this.type = l(t) ? t : 'inner';
    C(this, null, 3);
    Object.defineProperty(this, '__swiffy_v', {
      get: function() {
        return new me(
          (this.angle * Math.PI) / 180,
          Yc(this.highlightColor, this.highlightAlpha),
          Yc(this.shadowColor, this.shadowAlpha),
          this.distance,
          this.strength,
          this.quality,
          this.blurX,
          this.blurY,
          ke(this.type, this.knockout)
        );
      },
    });
  };
  B(ne, 'BevelFilter', Xh);
  var Zd = function(a, b, c) {
    this.blurX = l(a) ? a : 4;
    this.blurY = l(b) ? b : 4;
    this.quality = l(c) ? c : 1;
    C(this, null, 3);
    Object.defineProperty(this, '__swiffy_v', {
      get: function() {
        return new Yd(this.quality, this.blurX, this.blurY);
      },
    });
  };
  B(Zd, 'BlurFilter', Xh);
  var be = function(a) {
    this.matrix = l(a)
      ? a.slice()
      : [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
    C(this, null, 3);
    Object.defineProperty(this, '__swiffy_v', {
      get: function() {
        return new ae(this.matrix);
      },
    });
  };
  B(be, 'ColorMatrixFilter', Xh);
  var qe = function(a, b, c, d, e, f, h, k, m) {
    this.matrixX = l(a) ? a : 0;
    this.matrixY = l(b) ? b : 0;
    var n = [];
    Object.defineProperty(this, 'matrix', {
      get: function() {
        return n;
      },
      set: function(a) {
        var b = this.matrixY * this.matrixX;
        n = null != a ? a : [];
        if (n.length > b) n.length = b;
        else for (; n.length < b; ) n.push(0);
      },
    });
    this.matrix = c;
    this.bias = l(e) ? e : 0;
    this.preserveAlpha = l(f) ? f : !0;
    this.clamp = l(h) ? h : !0;
    this.color = l(k) ? k : 0;
    this.alpha = l(m) ? m : 0;
    this.divisor = l(d) ? d : 1;
    C(this, null, 3);
    Object.defineProperty(this, '__swiffy_v', {
      get: function() {
        return new pe(
          this.bias,
          this.clamp,
          Yc(this.color, this.alpha),
          this.divisor,
          this.matrix,
          this.matrixX,
          this.matrixY,
          this.preserveAlpha
        );
      },
    });
  };
  B(qe, 'ConvolutionFilter', Xh);
  var ue = function(a, b, c, d, e, f, h, k, m, n, t) {
    this.angle = l(b) ? b : 45;
    this.blurX = l(e) ? e : 4;
    this.blurY = l(f) ? f : 4;
    this.distance = l(a) ? a : 4;
    this.alpha = l(d) ? d : 1;
    this.color = l(c) ? c : 0;
    this.knockout = l(n) ? n : !1;
    this.quality = l(k) ? k : 1;
    this.strength = l(h) ? h : 1;
    this.inner = l(m) ? m : !1;
    this.hideObject = l(t) ? t : !1;
    C(this, null, 3);
    Object.defineProperty(this, '__swiffy_v', {
      get: function() {
        return new se(
          (this.angle * Math.PI) / 180,
          Yc(this.color, this.alpha),
          this.distance,
          this.strength,
          this.quality,
          this.blurX,
          this.blurY,
          te(this.hideObject, this.inner, this.knockout)
        );
      },
    });
  };
  B(ue, 'DropShadowFilter', Xh);
  var Yh = function(a) {
    this.name = 'Error';
    this.message = l(a) ? a : 'Error';
  };
  B(Yh, 'Error');
  Yh.prototype.toString = function() {
    return this.message;
  };
  C(Yh.prototype, null, 3);
  var Zh = function() {};
  B(Zh, 'ExternalInterface');
  Object.defineProperty(Zh, 'available', { get: Ie });
  Zh.call = function(a, b) {
    return Me(Je.c, String(a), Array.prototype.slice.call(arguments, 1));
  };
  Zh.addCallback = function(a, b, c) {
    return Le(String(a), l(b) ? b : null, c);
  };
  C(Zh, null, 3);
  var $h = function(a, b, c, d, e, f, h, k) {
    this.blurX = l(c) ? c : 6;
    this.blurY = l(d) ? d : 6;
    this.alpha = l(b) ? b : 1;
    this.color = l(a) ? a : 16711680;
    this.knockout = l(k) ? k : !1;
    this.quality = l(f) ? f : 1;
    this.strength = l(e) ? e : 2;
    this.inner = l(h) ? h : !1;
    C(this, null, 3);
    Object.defineProperty(this, '__swiffy_v', {
      get: function() {
        return new se(
          0,
          Yc(this.color, this.alpha),
          0,
          this.strength,
          this.quality,
          this.blurX,
          this.blurY,
          te(!1, this.inner, this.knockout)
        );
      },
    });
  };
  B($h, 'GlowFilter', Xh);
  var ye = function(a, b, c, d, e, f, h, k, m, n, t) {
    this.distance = l(a) ? a : 4;
    this.angle = l(b) ? b : 45;
    var p = [];
    Object.defineProperty(this, 'colors', {
      enumerable: !0,
      get: function() {
        return p;
      },
      set: function(a) {
        p = da(a) ? a : [];
        for (a = 0; a < p.length; a++)
          p[a] = (null != p[a] ? Number(p[a]) : 16711680) % 16777216;
      },
    });
    this.colors = c;
    var r = [];
    Object.defineProperty(this, 'alphas', {
      enumerable: !0,
      get: function() {
        return r;
      },
      set: function(a) {
        r = da(a) ? a : [];
        a = l(p) ? p.length : 0;
        for (var b = 0; b < a; b++)
          r[b] = Math.min(
            1,
            Math.floor(Number(255 * (null != r[b] ? Number(r[b]) : 1))) / 255
          );
        r.length = a;
      },
    });
    this.alphas = d;
    var u = [];
    Object.defineProperty(this, 'ratios', {
      enumerable: !0,
      get: function() {
        return u;
      },
      set: function(a) {
        u = da(a) ? a : [];
        a = l(p) ? p.length : 0;
        for (var b = 0; b < a; b++) {
          var c = null != u[b] ? Number(u[b]) : 0,
            c = Math.floor(c);
          0 > c ? (c = 0) : 255 < c && (c = 255);
          u[b] = c;
        }
        u.length = a;
      },
    });
    this.ratios = e;
    this.blurX = l(f) ? f : 4;
    this.blurY = l(h) ? h : 4;
    this.quality = l(m) ? m : 1;
    this.strength = l(k) ? k : 1;
    this.knockout = l(t) ? t : !1;
    this.type = l(n) ? n : 'inner';
    Object.defineProperty(this, '__swiffy_v', {
      get: function() {
        return new we(
          (this.angle * Math.PI) / 180,
          p,
          r,
          u,
          this.distance,
          this.strength,
          this.quality,
          this.blurX,
          this.blurY,
          ke(this.type, this.knockout)
        );
      },
    });
  };
  B(ye, 'GradientBevelFilter', Xh);
  var Be = function(a, b, c, d, e, f, h, k, m, n, t) {
    this.distance = l(a) ? a : 4;
    this.angle = l(b) ? b : 45;
    var p = [];
    Object.defineProperty(this, 'colors', {
      enumerable: !0,
      get: function() {
        return p;
      },
      set: function(a) {
        p = da(a) ? a : [];
        for (a = 0; a < p.length; a++)
          p[a] = (null != p[a] ? Number(p[a]) : 16711680) % 16777216;
      },
    });
    this.colors = c;
    var r = [];
    Object.defineProperty(this, 'alphas', {
      enumerable: !0,
      get: function() {
        return r;
      },
      set: function(a) {
        r = da(a) ? a : [];
        a = l(p) ? p.length : 0;
        for (var b = 0; b < a; b++)
          r[b] = Math.min(
            1,
            Math.floor(Number(255 * (null != r[b] ? Number(r[b]) : 1))) / 255
          );
        r.length = a;
      },
    });
    this.alphas = d;
    var u = [];
    Object.defineProperty(this, 'ratios', {
      enumerable: !0,
      get: function() {
        return u;
      },
      set: function(a) {
        u = da(a) ? a : [];
        a = l(p) ? p.length : 0;
        for (var b = 0; b < a; b++) {
          var c = null != u[b] ? Number(u[b]) : 0,
            c = Math.floor(c);
          0 > c ? (c = 0) : 255 < c && (c = 255);
          u[b] = c;
        }
        u.length = a;
      },
    });
    this.ratios = e;
    this.blurX = l(f) ? f : 4;
    this.blurY = l(h) ? h : 4;
    this.quality = l(m) ? m : 1;
    this.strength = l(k) ? k : 1;
    this.knockout = l(t) ? t : !1;
    this.type = l(n) ? n : 'inner';
    Object.defineProperty(this, '__swiffy_v', {
      get: function() {
        return new Ae(
          (this.angle * Math.PI) / 180,
          p,
          r,
          u,
          this.distance,
          this.strength,
          this.quality,
          this.blurX,
          this.blurY,
          ke(this.type, this.knockout)
        );
      },
    });
  };
  B(Be, 'GradientGlowFilter', Xh);
  var ai = function() {
    this.xa = {};
    this.Ak = this.Ci = 0;
    C(this, null, 3);
  };
  B(ai, 'Key');
  ai.prototype.getAscii = function() {
    return this.Ak;
  };
  ai.prototype.getCode = function() {
    return this.Ci;
  };
  ai.prototype.isDown = function(a) {
    return !!this.xa[a];
  };
  ai.prototype.isToggled = function() {
    return !1;
  };
  Object.defineProperties(ai.prototype, {
    BACKSPACE: { value: 8 },
    CAPSLOCK: { value: 20 },
    CONTROL: { value: 17 },
    DELETEKEY: { value: 46 },
    DOWN: { value: 40 },
    END: { value: 35 },
    ENTER: { value: 13 },
    ESCAPE: { value: 27 },
    HOME: { value: 36 },
    INSERT: { value: 45 },
    LEFT: { value: 37 },
    PGDN: { value: 34 },
    PGUP: { value: 33 },
    RIGHT: { value: 39 },
    SHIFT: { value: 16 },
    SPACE: { value: 32 },
    TAB: { value: 9 },
    UP: { value: 38 },
  });
  ai.prototype.Cj = function(a) {
    this.Ci = a.keyCode;
    this.xa[a.keyCode] = !1;
  };
  ai.prototype.Bj = function(a) {
    this.Ci = a.keyCode;
    this.Ak = a.charCode;
    this.xa[a.keyCode] = !0;
  };
  var bi = {
    37: 1,
    39: 2,
    36: 3,
    35: 4,
    45: 5,
    46: 6,
    8: 8,
    13: 13,
    38: 14,
    40: 15,
    33: 16,
    34: 17,
    9: 18,
    27: 19,
  };
  ai.prototype.Ku = function() {
    var a = bi[this.Ci];
    return a ? a : this.Ak;
  };
  C(ai.prototype, null, 3);
  var ci = function(a, b, c, d, e, f) {
    Object.defineProperty(this, '__swiffy_v', {
      writable: !0,
      value: Vc(
        l(a) ? a : 1,
        l(b) ? b : 0,
        l(c) ? c : 0,
        l(d) ? d : 1,
        l(e) ? e : 0,
        l(f) ? f : 0
      ),
    });
  };
  B(ci, 'Matrix', di);
  var ei = function(a) {
      return a instanceof ci
        ? ((a = a.__swiffy_v), a.Uc(20 * a.q, 20 * a.s))
        : Hc;
    },
    fi = function(a) {
      return new ci(a.n, a.o, a.j, a.i, a.q / 20, a.s / 20);
    };
  Object.defineProperty(ci.prototype, 'a', {
    get: function() {
      return this.__swiffy_v.n;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = Vc(a, b.o, b.j, b.i, b.q, b.s);
    },
  });
  Object.defineProperty(ci.prototype, 'b', {
    get: function() {
      return this.__swiffy_v.o;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = Vc(b.n, a, b.j, b.i, b.q, b.s);
    },
  });
  Object.defineProperty(ci.prototype, 'c', {
    get: function() {
      return this.__swiffy_v.j;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = Vc(b.n, b.o, a, b.i, b.q, b.s);
    },
  });
  Object.defineProperty(ci.prototype, 'd', {
    get: function() {
      return this.__swiffy_v.i;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = Vc(b.n, b.o, b.j, a, b.q, b.s);
    },
  });
  Object.defineProperty(ci.prototype, 'tx', {
    get: function() {
      return this.__swiffy_v.q;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = b.Uc(a, b.s);
    },
  });
  Object.defineProperty(ci.prototype, 'ty', {
    get: function() {
      return this.__swiffy_v.s;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = b.Uc(b.q, a);
    },
  });
  ci.prototype.clone = function() {
    var a = new ci();
    a.__swiffy_v = this.__swiffy_v;
    return a;
  };
  ci.prototype.concat = function(a) {
    this.__swiffy_v = this.__swiffy_v.multiply(a.__swiffy_v);
  };
  ci.prototype.copyFrom = function(a) {
    this.__swiffy_v = a.__swiffy_v;
  };
  ci.prototype.createBox = function(a, b, c, d, e) {
    this.__swiffy_v = Hc.Nh(-(c || 0))
      .Ye(a, b)
      .nd(d || 0, e || 0);
  };
  ci.prototype.createGradientBox = function(a, b, c, d, e) {
    this.__swiffy_v = gi(a, b, c, d, e);
  };
  ci.prototype.deltaTransformPoint = function(a) {
    var b = this.__swiffy_v;
    return new hi(b.n * a.x + b.j * a.y, b.o * a.x + b.i * a.y);
  };
  ci.prototype.identity = function() {
    this.__swiffy_v = Hc;
  };
  ci.prototype.invert = function() {
    var a = this.__swiffy_v;
    this.__swiffy_v = a.On() ? a.Ul() : Vc(Infinity, 0, 0, Infinity, NaN, NaN);
  };
  ci.prototype.rotate = function(a) {
    this.__swiffy_v = this.__swiffy_v.Nh(-a);
  };
  ci.prototype.scale = function(a, b) {
    this.__swiffy_v = this.__swiffy_v.Ye(a, b);
  };
  ci.prototype.transformPoint = function(a) {
    var b = this.__swiffy_v;
    return new hi(b.n * a.x + b.j * a.y + b.q, b.o * a.x + b.i * a.y + b.s);
  };
  ci.prototype.translate = function(a, b) {
    this.__swiffy_v = this.__swiffy_v.nd(a, b);
  };
  ci.prototype.toString = function() {
    return (
      '(a=' +
      this.__swiffy_v.n +
      ', b=' +
      this.__swiffy_v.o +
      ', c=' +
      this.__swiffy_v.j +
      ', d=' +
      this.__swiffy_v.i +
      ', tx=' +
      this.__swiffy_v.q +
      ', ty=' +
      this.__swiffy_v.s +
      ')'
    );
  };
  var ii = function() {
    Object.defineProperty(this, '__swiffy_mv', { value: !0, writable: !0 });
    C(this, null, 3);
  };
  B(ii, 'Mouse');
  ii.prototype.Vd = function() {
    this.broadcastMessage('onMouseDown');
  };
  ii.prototype.Zf = function() {
    this.broadcastMessage('onMouseMove');
  };
  ii.prototype.$f = function() {
    this.broadcastMessage('onMouseUp');
  };
  ii.prototype.hide = function() {
    var a = this.__swiffy_mv;
    this.__swiffy_mv = !1;
    return a;
  };
  ii.prototype.show = function() {
    var a = this.__swiffy_mv;
    this.__swiffy_mv = !0;
    return a;
  };
  C(ii.prototype, null, 3);
  var ji = function() {
    this.isConnected = !1;
  };
  B(ji, 'NetConnection');
  ji.prototype.connect = function() {
    return !0;
  };
  var ki = function() {
    Object.defineProperty(this, '__swiffy_v', {
      value: { Dk: 0, Ug: 0.1, Zc: 0, $c: 0, al: 0, time: 0, paused: !1 },
    });
  };
  B(ki, 'NetStream');
  ki.prototype.play = function() {};
  ki.prototype.close = function() {};
  ki.prototype.pause = function() {};
  ki.prototype.receiveAudio = function() {};
  ki.prototype.receiveVideo = function() {};
  ki.prototype.seek = function() {};
  ki.prototype.setBufferTime = function(a) {
    this.__swiffy_v.Ug = a;
  };
  Object.defineProperty(ki.prototype, 'bufferTime', {
    get: function() {
      return this.__swiffy_v.Ug;
    },
  });
  Object.defineProperty(ki.prototype, 'bufferLength', {
    get: function() {
      return this.__swiffy_v.Dk;
    },
  });
  Object.defineProperty(ki.prototype, 'bytesLoaded', {
    get: function() {
      return this.__swiffy_v.Zc;
    },
  });
  Object.defineProperty(ki.prototype, 'bytesTotal', {
    get: function() {
      return this.__swiffy_v.$c;
    },
  });
  Object.defineProperty(ki.prototype, 'currentFps', {
    get: function() {
      return this.__swiffy_v.al;
    },
  });
  Object.defineProperty(ki.prototype, 'time', {
    get: function() {
      return this.__swiffy_v.time;
    },
  });
  var hi = function(a, b) {
    this.x = l(a) ? a : 0;
    this.y = l(b) ? b : 0;
  };
  B(hi, 'Point', di);
  Object.defineProperty(hi.prototype, 'length', {
    get: function() {
      return Rc(this.x, this.y);
    },
  });
  hi.prototype.add = function(a) {
    return new hi(this.x + a.x, this.y + a.y);
  };
  hi.prototype.clone = function() {
    return new hi(this.x, this.y);
  };
  hi.distance = function(a, b) {
    return Rc(a.x - b.x, a.y - b.y);
  };
  hi.prototype.equals = function(a) {
    return this.x == a.x && this.y == a.y;
  };
  hi.interpolate = function(a, b, c) {
    return new hi(a.x * c + b.x * (1 - c), a.y * c + b.y * (1 - c));
  };
  hi.prototype.normalize = function(a) {
    a /= this.length;
    this.x *= a;
    this.y *= a;
  };
  hi.prototype.offset = function(a, b) {
    this.x += a;
    this.y += b;
  };
  hi.polar = function(a, b) {
    return new hi(a * Math.cos(b), a * Math.sin(b));
  };
  hi.prototype.subtract = function(a) {
    return new hi(this.x - a.x, this.y - a.y);
  };
  hi.prototype.toString = function() {
    return '(x=' + this.x + ', y=' + this.y + ')';
  };
  var li = function(a, b, c, d) {
    this.x = l(a) ? a : 0;
    this.y = l(b) ? b : 0;
    this.width = l(c) ? c : 0;
    this.height = l(d) ? d : 0;
  };
  B(li, 'Rectangle', di);
  Object.defineProperty(li.prototype, 'top', {
    get: function() {
      return this.y;
    },
    set: function(a) {
      this.y = a;
    },
  });
  Object.defineProperty(li.prototype, 'left', {
    get: function() {
      return this.x;
    },
    set: function(a) {
      this.x = a;
    },
  });
  Object.defineProperty(li.prototype, 'bottom', {
    get: function() {
      return this.y + this.height;
    },
    set: function(a) {
      this.height = a - this.y;
    },
  });
  Object.defineProperty(li.prototype, 'right', {
    get: function() {
      return this.x + this.width;
    },
    set: function(a) {
      this.width = a - this.x;
    },
  });
  Object.defineProperty(li.prototype, 'topLeft', {
    get: function() {
      return new hi(this.left, this.top);
    },
    set: function(a) {
      this.left = a.x;
      this.top = a.y;
    },
  });
  Object.defineProperty(li.prototype, 'bottomRight', {
    get: function() {
      return new hi(this.right, this.bottom);
    },
    set: function(a) {
      this.right = a.x;
      this.bottom = a.y;
    },
  });
  Object.defineProperty(li.prototype, 'size', {
    get: function() {
      return new hi(this.width, this.height);
    },
    set: function(a) {
      this.width = a.x;
      this.height = a.y;
    },
  });
  li.prototype.clone = function() {
    return new li(this.x, this.y, this.width, this.height);
  };
  li.prototype.contains = function(a, b) {
    return this.x <= a && this.y <= b && a < this.right && b < this.bottom;
  };
  li.prototype.containsPoint = function(a) {
    return this.contains(a.x, a.y);
  };
  li.prototype.containsRectangle = function(a) {
    var b = this.right,
      c = this.bottom,
      d = a.right,
      e = a.bottom;
    return (
      this.x <= a.x &&
      this.y <= a.y &&
      a.x < b &&
      a.y < c &&
      this.x < d &&
      this.y < e &&
      d <= b &&
      e <= c
    );
  };
  li.prototype.copyFrom = function(a) {
    this.x = a.x;
    this.y = a.y;
    this.width = a.width;
    this.height = a.height;
  };
  li.prototype.equals = function(a) {
    return (
      this.x == a.x &&
      this.y == a.y &&
      this.width == a.width &&
      this.height == a.height
    );
  };
  li.prototype.inflate = function(a, b) {
    this.x -= a;
    this.y -= b;
    this.width += 2 * a;
    this.height += 2 * b;
  };
  li.prototype.inflatePoint = function(a) {
    this.inflate(a.x, a.y);
  };
  li.prototype.intersection = function(a) {
    if (this.intersects(a)) {
      var b = Math.max(this.x, a.x),
        c = Math.max(this.y, a.y),
        d = Math.min(this.right, a.right);
      a = Math.min(this.bottom, a.bottom);
      return new li(b, c, d - b, a - c);
    }
    return new li();
  };
  li.prototype.intersects = function(a) {
    return (
      0 < a.width &&
      0 < a.height &&
      0 < this.width &&
      0 < this.height &&
      a.x < this.right &&
      a.y < this.bottom &&
      a.right > this.x &&
      a.bottom > this.y
    );
  };
  li.prototype.isEmpty = function() {
    return 0 >= this.width || 0 >= this.height;
  };
  li.prototype.offset = function(a, b) {
    this.x += a;
    this.y += b;
  };
  li.prototype.offsetPoint = function(a) {
    this.offset(a.x, a.y);
  };
  li.prototype.setEmpty = function() {
    this.height = this.width = this.y = this.x = 0;
  };
  li.prototype.union = function(a) {
    if (this.isEmpty()) return a.clone();
    if (a.isEmpty()) return this.clone();
    var b = Math.min(this.x, a.x),
      c = Math.min(this.y, a.y),
      d = Math.max(this.right, a.right);
    a = Math.max(this.bottom, a.bottom);
    return new li(b, c, d - b, a - c);
  };
  li.prototype.toString = function() {
    return (
      '(x=' +
      this.x +
      ', y=' +
      this.y +
      ', w=' +
      this.width +
      ', h=' +
      this.height +
      ')'
    );
  };
  var mi = function() {};
  mi.prototype.valueOf = function() {};
  var di = function(a) {
    return null != a ? Object(a) : new mi();
  };
  '__proto__' in Object ||
    Object.defineProperty(di.prototype, '__proto__', {
      get: function() {
        return Object.getPrototypeOf(this);
      },
    });
  var ni = function(a) {
      return null != a ? Object(a) : Object.create(di.prototype);
    },
    oi = {};
  di.registerClass = function(a, b) {
    if (2 > arguments.length) return !1;
    oi[a] = b;
    return !0;
  };
  C(di, null, 3);
  var pi = function(a, b, c, d, e, f, h, k) {
    a = l(a) ? a : 1;
    b = l(b) ? b : 1;
    c = l(c) ? c : 1;
    d = l(d) ? d : 1;
    e = l(e) ? e : 0;
    f = l(f) ? f : 0;
    h = l(h) ? h : 0;
    k = l(k) ? k : 0;
    Object.defineProperty(this, '__swiffy_v', {
      writable: !0,
      value: new Zc(a, e, b, f, c, h, d, k),
    });
  };
  B(pi, 'ColorTransform', di);
  var qi = function(a) {
    return new pi(a.Z, a.Y, a.X, a.S, a.W, a.U, a.T, a.Q);
  };
  Object.defineProperty(pi.prototype, 'redMultiplier', {
    get: function() {
      return this.__swiffy_v.Z;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(Number(a), b.W, b.Y, b.U, b.X, b.T, b.S, b.Q);
    },
  });
  Object.defineProperty(pi.prototype, 'greenMultiplier', {
    get: function() {
      return this.__swiffy_v.Y;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, Number(a), b.U, b.X, b.T, b.S, b.Q);
    },
  });
  Object.defineProperty(pi.prototype, 'blueMultiplier', {
    get: function() {
      return this.__swiffy_v.X;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, b.Y, b.U, Number(a), b.T, b.S, b.Q);
    },
  });
  Object.defineProperty(pi.prototype, 'alphaMultiplier', {
    get: function() {
      return this.__swiffy_v.S;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, b.Y, b.U, b.X, b.T, Number(a), b.Q);
    },
  });
  Object.defineProperty(pi.prototype, 'redOffset', {
    get: function() {
      return this.__swiffy_v.W;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, Number(a), b.Y, b.U, b.X, b.T, b.S, b.Q);
    },
  });
  Object.defineProperty(pi.prototype, 'greenOffset', {
    get: function() {
      return this.__swiffy_v.U;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, b.Y, Number(a), b.X, b.T, b.S, b.Q);
    },
  });
  Object.defineProperty(pi.prototype, 'blueOffset', {
    get: function() {
      return this.__swiffy_v.T;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, b.Y, b.U, b.X, Number(a), b.S, b.Q);
    },
  });
  Object.defineProperty(pi.prototype, 'alphaOffset', {
    get: function() {
      return this.__swiffy_v.Q;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, b.Y, b.U, b.X, b.T, b.S, Number(a));
    },
  });
  Object.defineProperty(pi.prototype, 'rgb', {
    get: function() {
      return (
        ((this.__swiffy_v.W << 16) |
          (this.__swiffy_v.U << 8) |
          this.__swiffy_v.T) >>>
        0
      );
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(
        0,
        (a >> 16) & 255,
        0,
        (a >> 8) & 255,
        0,
        a & 255,
        b.S,
        b.Q
      );
    },
  });
  pi.prototype.concat = function(a) {
    this.__swiffy_v = this.__swiffy_v.Ql(a.__swiffy_v);
  };
  pi.prototype.toString = function() {
    return (
      '(redMultiplier=' +
      this.__swiffy_v.Z +
      ', greenMultiplier=' +
      this.__swiffy_v.Y +
      ', blueMultiplier=' +
      this.__swiffy_v.X +
      ', alphaMultiplier=' +
      this.__swiffy_v.S +
      ', redOffset=' +
      this.__swiffy_v.W +
      ', greenOffset=' +
      this.__swiffy_v.U +
      ', blueOffset=' +
      this.__swiffy_v.T +
      ', alphaOffset=' +
      this.__swiffy_v.Q +
      ')'
    );
  };
  var G = function() {};
  Sh(G, di);
  G.prototype.valueOf = function() {
    return this;
  };
  G.prototype.getDepth = function() {
    var a = this.__swiffy_d;
    return a ? a.depth : void 0;
  };
  var ri = function(a, b, c, d) {
      Object.defineProperty(a, b, {
        get: function() {
          var a = this.__swiffy_d;
          if (a) return c.call(this, a);
        },
        set: function(a) {
          var c = this.__swiffy_d;
          c ? d.call(this, c, a) : Object.defineProperty(this, b, { value: a });
        },
      });
    },
    si = function(a, b, c, d) {
      ri(a, b, c, function(a, b) {
        var c = a.c.J().pd(b);
        isNaN(c) || d.call(this, a, c);
      });
    },
    ti = function(a, b) {
      ri(
        a,
        b,
        function() {
          return 0;
        },
        function() {}
      );
    },
    ui = function(a, b, c) {
      ri(a, b, c, function() {});
    };
  si(
    G.prototype,
    '_x',
    function(a) {
      return a.wa().q / 20;
    },
    function(a, b) {
      var c = a.wa();
      a.setTransform(c.nd(20 * b - c.q, 0));
      a.Fa();
    }
  );
  si(
    G.prototype,
    '_y',
    function(a) {
      return a.wa().s / 20;
    },
    function(a, b) {
      var c = a.wa();
      a.setTransform(c.nd(0, 20 * b - c.s));
      a.Fa();
    }
  );
  si(
    G.prototype,
    '_xscale',
    function(a) {
      return 100 * a.ec().rd;
    },
    function(a, b) {
      a.ec().rd = b / 100;
      a.wf();
      a.Fa();
    }
  );
  si(
    G.prototype,
    '_yscale',
    function(a) {
      return 100 * a.ec().kf;
    },
    function(a, b) {
      a.ec().kf = b / 100;
      a.wf();
      a.Fa();
    }
  );
  si(
    G.prototype,
    '_alpha',
    function(a) {
      return ((256 * a.nb.S) | 0) / 2.56;
    },
    function(a, b) {
      var c = a.nb;
      a.Gb(new Zc(c.Z, c.W, c.Y, c.U, c.X, c.T, b / 100, c.Q));
      a.Fa();
    }
  );
  si(
    G.prototype,
    '_visible',
    function(a) {
      return a.jf;
    },
    function(a, b) {
      a.ck(Boolean(b));
    }
  );
  si(
    G.prototype,
    '_rotation',
    function(a) {
      return (-180 * a.ec().angle) / Math.PI;
    },
    function(a, b) {
      a.ec().angle = (-b * Math.PI) / 180;
      a.wf();
      a.Fa();
    }
  );
  ri(
    G.prototype,
    '_name',
    function(a) {
      return a.getName();
    },
    function(a, b) {
      a.Hb(b);
    }
  );
  ti(G.prototype, '_quality');
  ti(G.prototype, '_highquality');
  ti(G.prototype, '_soundbuftime');
  ui(G.prototype, '_parent', function(a) {
    return (a = a.getParent()) && a != a.c.H ? a.t : void 0;
  });
  ui(G.prototype, '_xmouse', function(a) {
    var b = a.c.Eb.clone();
    b.gc(a.ka());
    return b.x / 20;
  });
  ui(G.prototype, '_ymouse', function(a) {
    var b = a.c.Eb.clone();
    b.gc(a.ka());
    return b.y / 20;
  });
  ui(G.prototype, '_url', function(a) {
    return null === a.Tc ? a.El().Tc.replace(/^([^?#]+)\.html?\b/, '$1') : a.Tc;
  });
  si(
    G.prototype,
    '_width',
    function(a) {
      return a.K();
    },
    function(a, b) {
      a.Om(b);
      a.Fa();
    }
  );
  si(
    G.prototype,
    '_height',
    function(a) {
      return a.$();
    },
    function(a, b) {
      a.Lm(b);
      a.Fa();
    }
  );
  ui(G.prototype, '_root', function(a) {
    for (; a && !a.Jj && a.getParent() != a.c.H; ) a = a.getParent();
    return a ? a.t : void 0;
  });
  ui(G.prototype, '_target', function(a) {
    for (var b = ''; a && a.getName(); )
      (b = '/' + a.getName() + b), (a = a.getParent());
    a &&
      a.getParent() == a.c.H &&
      (a = a.depth - -16384) &&
      (b = '_level' + a + b);
    return b || '/';
  });
  ri(
    G.prototype,
    'filters',
    function(a) {
      var b = [];
      a = a.zb;
      for (var c = 0; c < a.length; c++) b.push(a[c].Be());
      return b;
    },
    function(a, b) {
      for (var c = [], d = 0; null != b && d < b.length; d++) {
        var e = b[d].__swiffy_v;
        c.push(e ? e : new De());
      }
      a.yg(c);
    }
  );
  ri(
    G.prototype,
    'transform',
    function(a) {
      return new vi(a);
    },
    function(a, b) {
      if (ia(b)) {
        var c = new vi(a);
        c.colorTransform = b.colorTransform;
        c.matrix = b.matrix;
      }
    }
  );
  C(G.prototype, null, 3);
  var wi = 0,
    Og = function(a) {
      var b = 0,
        c = xi(function() {
          return a.charCodeAt(b++);
        });
      return Vc(
        c() / 65536 + 1,
        c() / 65536,
        c() / 65536,
        c() / 65536 + 1,
        c(),
        c()
      );
    },
    xe = function(a) {
      for (
        var b = [],
          c = 0,
          d = yi(function() {
            return a.charCodeAt(c++);
          }),
          e = 0;
        c < a.length;

      )
        (e += parseInt(d(), 10)), b.push(e);
      return b;
    },
    yi = function(a) {
      return function() {
        var b = a();
        if (58 == b) return 0;
        for (var c = ''; 48 <= b && 57 >= b; )
          (c += String.fromCharCode(b)), (b = a());
        return (97 <= b ? b - 96 : -(b - 64)) + c;
      };
    },
    xi = function(a) {
      var b = yi(a);
      return function() {
        return parseInt(b(), 10);
      };
    },
    zi = function(a) {
      a = Number(a);
      return isFinite(a) ? a : 0;
    },
    ah = function(a) {
      var b = 0,
        c = xi(function() {
          return a.charCodeAt(b++);
        });
      return new Zc(
        (c() + 256) / 256,
        c(),
        (c() + 256) / 256,
        c(),
        (c() + 256) / 256,
        c(),
        (c() + 256) / 256,
        c()
      );
    },
    Cg = function(a, b) {
      var c = a,
        d = c & 255,
        c = c >> 8,
        e = c & 255,
        c = c >> 8,
        f = c & 255,
        c = (c >> 8) & 255,
        c = c / 255;
      b &&
        ((f = f * b.Z + b.W),
        (e = e * b.Y + b.U),
        (d = d * b.X + b.T),
        (c = c * b.S + b.Q / 255));
      return new Wc(f, e, d, c);
    },
    Ai = function(a) {
      a = a.replace(
        /^ *rgb *\( *([^,]+) *, *([^,]+) *, *([^,]+) *\) *$/,
        function(a, c, d, e) {
          return (c << 16) + (d << 8) + (e << 0);
        }
      );
      a = a.replace(/^ *#([0-9a-fA-F]+) *$/, function(a, c) {
        var d = parseInt(c, 16);
        return 4278190080 | d;
      });
      return a | 0;
    },
    Lg = function(a, b, c) {
      return a + (b - a) * c;
    },
    Bi = function(a) {
      a = String(a).trim();
      return '0' == a.charAt(0) && 'x' != a.charAt(1).toLowerCase();
    },
    Ci = function(a) {
      return '__swiffy_' == a.substr(0, 9);
    },
    Di = function(a, b, c) {
      if (a)
        for (var d in a) {
          var e = a[d];
          if (!('$' == d.charAt(0) || Ci(d) || e instanceof G)) {
            da(e) || (e = [e]);
            for (var f = 0; f < e.length; ++f) b.call(c, d, String(e[f]));
          }
        }
    },
    Ei = function(a, b) {
      var c;
      fa(a) ? (c = a) : ((c = new rc()), Di(a, c.add, c), (c = c.toString()));
      if (!b) return c;
      if (!c) return b;
      var d = b.indexOf('?') + 1;
      return (b = d ? b.slice(0, d) + c + '&' + b.slice(d) : b + ('?' + c));
    },
    Gi = function(a) {
      var b = a.internedStrings;
      b && (delete a.internedStrings, Fi(a, b));
    },
    Fi = function(a, b) {
      for (var c in a) {
        var d = a[c];
        'string' == typeof d && '#' == d.charAt(0)
          ? (a[c] = b[d.substr(1)])
          : d instanceof Object && Fi(d, b);
      }
    },
    Hi = function(a) {
      a = a.replace(/\+/g, ' ');
      try {
        return decodeURIComponent(a);
      } catch (b) {
        for (var c = '', d = 0, e = d; e < a.length; d = e) {
          e = a.indexOf('%', d);
          if (0 > e) break;
          for (var c = c + a.substring(d, e), f = (d = 0); e < a.length; ) {
            var h = a.charCodeAt(e++);
            if (37 === h) {
              if (
                !/[0-9a-fA-F]/.test(a.charAt(e)) ||
                !/[0-9a-fA-F]/.test(a.charAt(++e))
              )
                if (0 < f) continue;
                else break;
              h = parseInt(a.substr(++e - 2, 2), 16);
            }
            if (0 < f) (d = (d << 6) + (h & 63)), f--;
            else if (192 === (h & 192)) {
              for (; h & 64; ) (h <<= 1), f++;
              d = (h & 127) >> f;
            } else d = h;
            if (0 === f) {
              c += String.fromCharCode(d);
              break;
            }
          }
        }
        return c + a.substring(d);
      }
    },
    Ji = function(a) {
      var b = a.indexOf('?'),
        c = a.indexOf('#');
      return 0 <= b && (0 > c || c > b) ? Ii(a.substring(b + 1)) : {};
    },
    Ii = function(a, b) {
      var c = {};
      if (a)
        for (var d = a.split('&'), e = 0; e < d.length; e++) {
          var f = d[e],
            h = f.indexOf('='),
            k = 0 <= h ? f.substring(0, h) : f;
          if (k || b)
            (f = 0 <= h ? f.substring(h + 1) : ''),
              (k = Hi(k)),
              (f = Hi(f)),
              k in c || (c[k] = []),
              c[k].push(f);
        }
      return c;
    },
    Ki = function(a, b) {
      if (b in a) {
        for (var c; !c && a; a = Object.getPrototypeOf(a))
          c = Object.getOwnPropertyDescriptor(a, b);
        return c;
      }
    },
    A = function(a, b) {
      return l(a) ? a : b;
    },
    Sf = function(a, b) {
      var c = document.createElement('canvas');
      c.width = a;
      c.height = b;
      return c;
    },
    Li = function(a, b, c) {
      a[b] || (a[b] = []);
      a[b].push(c);
    };
  var Mi = function(a, b, c) {
    '_self' == b && this.Pt() && (b = '_parent');
    if (c) {
      var d = document.createElement('form');
      d.method = 'post';
      d.action = a;
      d.target = b;
      a = [];
      for (b = 0; b < c.length; ) {
        var e = c[b++],
          f = c[b++];
        a.push('<input type="hidden" name="', ya(e));
        l(f) && a.push('" value="', ya(f));
        a.push('" />');
      }
      d.innerHTML = a.join('');
      d.style.visibility = 'hidden';
      document.body.appendChild(d);
      d.submit();
      document.body.removeChild(d);
    } else window.open(a, b);
  };
  var Ni = function(a) {
      this.Xa = a || [];
      this.kl = this.Um = null;
    },
    Oi = { 0: 1, 1: 1, 2: 2, 3: 0 };
  Ni.prototype.qc = function(a, b) {
    for (var c = 0, d = 0, e = 0, f = this.Xa; c < f.length; )
      switch (f[c++]) {
        case 0:
          d = f[c++];
          e = f[c++];
          break;
        case 1:
          a.qc(d, e, b, b);
          d = f[c++];
          e = f[c++];
          a.qc(d, e, b, b);
          break;
        case 2:
          a.qc(d, e, b, b);
          var h = f[c++],
            k = f[c++],
            m = f[c++],
            n = f[c++],
            t = (h - d) / (2 * h - d - m),
            p = (k - e) / (2 * k - e - n);
          0 < p &&
            1 > p &&
            a.qc(
              d,
              (1 - p) * (1 - p) * e + 2 * (1 - p) * p * k + p * p * n,
              b,
              b
            );
          0 < t &&
            1 > t &&
            a.qc(
              (1 - t) * (1 - t) * d + 2 * (1 - t) * t * h + t * t * m,
              e,
              b,
              b
            );
          d = m;
          e = n;
          a.qc(d, e, b, b);
      }
  };
  Ni.prototype.slice = function(a, b) {
    function c() {
      var a = r[y],
        b = r[y + 1],
        c = t.slice(a * e + b * h + m) - m,
        a = p.slice(a * f + b * k + n) - n;
      r[y++] = (c * k - a * h) / d;
      r[y++] = (a * e - c * f) / d;
    }
    if (!a) return this;
    var d = b.ij();
    if (0 == d) return this;
    for (
      var e = b.n,
        f = b.o,
        h = b.j,
        k = b.i,
        m = b.q,
        n = b.s,
        t = a.x,
        p = a.y,
        r = this.Xa.slice(),
        u = r.length,
        y = 0;
      y < u;

    )
      switch (r[y++]) {
        case 2:
          c();
        case 1:
        case 0:
          c();
      }
    return new Ni(r);
  };
  Ni.prototype.Co = function(a) {
    Pi(a, this.Xa, 1, 0, 0, 1, 0, 0);
  };
  var Pi = function(a, b, c, d, e, f, h, k) {
    a.moveTo(h, k);
    for (var m = b.length, n = 0; n < m; ) {
      var t = b[n++];
      if (3 === t) a.closePath();
      else {
        var p = b[n] * c + b[n + 1] * e + h,
          r = b[n] * d + b[n + 1] * f + k,
          n = n + 2;
        if (0 === t) a.moveTo(p, r);
        else if (1 === t) a.lineTo(p, r);
        else if (2 === t) {
          var t = b[n] * c + b[n + 1] * e + h,
            u = b[n] * d + b[n + 1] * f + k,
            n = n + 2;
          a.quadraticCurveTo(p, r, t, u);
        }
      }
    }
  };
  Ni.prototype.Na = function() {
    for (var a = 0; a < this.Xa.length; )
      switch (this.Xa[a++]) {
        case 0:
          a += 2;
        case 3:
          break;
        case 1:
        case 2:
          return !1;
        default:
          return !1;
      }
    return !0;
  };
  Ni.prototype.hs = function() {
    for (var a = [], b = 0; b < this.Xa.length; ) {
      var c = this.Xa[b++];
      3 != c && a.push(c);
      for (var d = 0; d < 2 * Oi[c]; d++) a.push(this.Xa[b++]);
    }
    return new Ni(a);
  };
  var ph = function(a) {
      return new Ni(Qi(a));
    },
    Qi = function(a) {
      for (
        var b = a.length,
          c = 0,
          d = xi(function() {
            return a.charCodeAt(c++);
          }),
          e = 0,
          f = 0,
          h = [];
        c < b;

      ) {
        var k = d();
        h.push(k);
        switch (k) {
          case 2:
            h.push(e + d(), f + d());
          case 0:
          case 1:
            (e += d()), (f += d()), h.push(e, f);
        }
      }
      return h;
    };
  g = Ni.prototype;
  g.Xt = function(a) {
    this.Um || this.Bp();
    Pi(a, this.Um, 1, 0, 0, 1, 0, 0);
  };
  g.Ut = function(a) {
    this.kl || this.Bp();
    Pi(a, this.kl, 1, 0, 0, 1, 0, 0);
  };
  g.zv = function(a, b) {
    for (var c = 0, d = []; c < this.Xa.length; ) {
      var e = this.Xa[c++];
      d.push(e);
      for (var f = 0; f < 2 * Oi[e]; f++) d.push(Lg(this.Xa[c], a.Xa[c++], b));
    }
    return new Ni(d);
  };
  g.Bp = function() {
    for (
      var a = [],
        b = [],
        c = 0,
        d = 0,
        e = 0,
        f = 0,
        h = this.Xa,
        k = function(a, b, c) {
          if (a !== b) {
            var d = h[a];
            a = h[a + 1];
            var e = d - h[b];
            b = a - h[b + 1];
            var f = 10 * Math.max(Math.abs(e), Math.abs(b));
            c.push(0, d, a, 1, d - e / f, a - b / f, 1, d, a);
          }
        },
        m = h.length,
        n = 0;
      n < m;

    ) {
      var t = h[n++];
      3 == t && (d = e = f = c);
      0 == t
        ? (k(c, d, a), k(f, e, b), (d = e = f = c = n), (n += 2))
        : (c === d && (d = n),
          (e = f),
          (f = n),
          (n += 2),
          2 === t && ((e = f), (f = n), (n += 2)));
    }
    k(c, d, a);
    k(f, e, b);
    this.Um = a;
    this.kl = b;
  };
  g.moveTo = function(a, b) {
    this.Xa.push(0, a, b);
    return this;
  };
  g.lineTo = function(a, b) {
    this.Xa.push(1, a, b);
    return this;
  };
  g.close = function() {
    this.Xa.push(3);
    return this;
  };
  g.pb = function(a, b, c, d) {
    this.Xa.push(2, a, b, c, d);
    return this;
  };
  var Ri = [null, 'reflect', 'repeat'],
    Si = [null, 'linearRGB'],
    Ti = 10 / 16384,
    gi = function(a, b, c, d, e) {
      c = Number(c || 0);
      d = Number(d || 0);
      e = Number(e || 0);
      a = Number(a);
      b = Number(b);
      return Hc.Nh(-c)
        .Ye(a * Ti, b * Ti)
        .nd(a / 2 + d, b / 2 + e);
    },
    Ui = function(a) {
      this.color = a;
    };
  Ui.prototype.mb = function(a, b, c) {
    b = b.rc();
    a = this.color.Ta(a);
    a = c.apply(a);
    b.fillStyle = a.he();
    b.fill('evenodd');
  };
  Ui.prototype.ue = function() {
    return 1;
  };
  var Vi = function(a, b, c) {
    this.transform = a;
    this.stops = b;
    this.Qm = Ri[c];
  };
  Vi.prototype.vn = function(a, b, c, d, e) {
    var f = b,
      h = 1 / (c - b);
    switch (this.Qm) {
      case 'reflect':
        for (f & 1 && (++f, this.Mg(a, b - f, -h, d, e)); f + 1 < c; )
          this.Mg(a, f - b, h, d, e), (f += 2), this.Mg(a, b - f, -h, d, e);
      case 'repeat':
        for (; f < c; ) this.Mg(a, f - b, h, d, e), ++f;
        break;
      default:
        this.Mg(a, 0, 1, d, e);
    }
  };
  Vi.prototype.Mg = function(a, b, c, d, e) {
    for (var f = this.stops, h = 0; h < f.length; h++) {
      var k = (f[h].offset.Ta(d) + b) * c,
        m = f[h].color.Ta(d),
        m = e.apply(m);
      a && a.addColorStop(k, m.he());
    }
  };
  Vi.prototype.ue = function() {
    return 1;
  };
  var Wi = function(a, b, c, d) {
    Vi.call(this, a, b, c, d);
  };
  v(Wi, Vi);
  Wi.prototype.ad = function(a, b, c) {
    a = new Ic(a, b);
    a.gc(c);
    return a.x;
  };
  Wi.prototype.mb = function(a, b, c) {
    b = b.rc();
    b.save();
    var d = this.transform.Ta(a);
    d.mb(b);
    var e = -1,
      f = 1;
    if (this.Qm) {
      var h = Xi(a),
        k = this.ad(h.l, h.m, d);
      k < e && (e = k);
      k > f && (f = k);
      k = this.ad(h.D, h.m, d);
      k < e && (e = k);
      k > f && (f = k);
      k = this.ad(h.l, h.F, d);
      k < e && (e = k);
      k > f && (f = k);
      k = this.ad(h.D, h.F, d);
      k < e && (e = k);
      k > f && (f = k);
      f = Math.ceil(Math.min(25, f)) | 1;
      e = (Math.floor(Math.max(-25, e)) - 1) | 1;
    }
    d = b.createLinearGradient(e, 0, f, 0);
    this.vn(d, (e + 1) / 2, (f + 1) / 2, a, c);
    b.fillStyle = d;
    b.fill('evenodd');
    b.restore();
  };
  var Yi = function(a, b, c, d, e) {
    Vi.call(this, a, b, c, d);
    this.tp = e;
  };
  v(Yi, Vi);
  Yi.prototype.ad = function(a, b, c, d, e) {
    var f = new Ic(b, c);
    f.gc(e);
    b = f.x;
    c = f.y;
    e = d * d - 1;
    f = d * (b - d);
    b = (b - d) * (b - d) + c * c;
    if (0 != e) {
      b = f * f - e * b;
      if (0 > b) return a;
      b = 0 < e ? (-f + Math.sqrt(b)) / e : (-f - Math.sqrt(b)) / e;
    } else b = (-0.5 * b) / f;
    return b > a ? b : a;
  };
  Yi.prototype.mb = function(a, b, c) {
    b = b.rc();
    b.save();
    var d = this.transform.Ta(a);
    d.mb(b);
    var e = 0;
    this.tp && (e = this.tp.Ta(a));
    var f = 1;
    if (this.Qm)
      var h = Xi(a),
        f = this.ad(f, h.l, h.m, e, d),
        f = this.ad(f, h.D, h.m, e, d),
        f = this.ad(f, h.l, h.F, e, d),
        f = this.ad(f, h.D, h.F, e, d),
        f = Math.ceil(Math.min(25, f));
    d = b.createRadialGradient(e, 0, 0, e * (1 - f), 0, f);
    this.vn(d, 0, f, a, c);
    b.fillStyle = d;
    b.fill('evenodd');
    b.restore();
  };
  var Zi = function(a, b) {
    this.Pl = a;
    this.transform = b;
  };
  Zi.prototype.yq = function(a, b) {
    var c = this.Pl.canvas,
      d = Sf(c.width, c.height),
      e = new ag(d, 0, 0, 1, 1, 1, a.qa);
    e.Ne().drawImage(c, 0, 0);
    ig(e, b);
    return d;
  };
  Zi.prototype.mb = function(a, b, c) {
    a = b.rc();
    a.save();
    this.transform.mb(a);
    a.clip('evenodd');
    c.Te()
      ? ((a.globalAlpha = c.Pg(1)), a.drawImage(this.Pl.canvas, 0, 0))
      : ((b = this.yq(b, c)), a.drawImage(b, 0, 0));
    a.restore();
  };
  Zi.prototype.ue = function() {
    return 150;
  };
  var $i = function(a, b) {
    Zi.call(this, a, b);
  };
  v($i, Zi);
  $i.prototype.mb = function(a, b, c) {
    a = b.rc();
    a.save();
    this.transform.mb(a);
    c.Te()
      ? ((a.globalAlpha = c.Pg(1)),
        (a.fillStyle = a.createPattern(this.Pl.canvas, 'repeat')))
      : ((b = this.yq(b, c)), (a.fillStyle = a.createPattern(b, 'repeat')));
    a.fill('evenodd');
    a.restore();
  };
  var aj = function(a, b, c, d, e, f) {
    this.width = a;
    this.miter = e;
    this.Tm = b;
    this.Fo = c;
    this.sv = d;
    this.flags = f;
  };
  aj.prototype.Wm = function(a, b, c, d, e) {
    var f = this.Tm != this.Fo;
    c.lineCap = f ? 'butt' : this.Tm;
    c.lineJoin = this.sv;
    c.miterLimit = this.miter;
    a = this.width.Ta(a);
    var h = (e.n + e.j) * b.ib;
    e = (e.o + e.i) * b.jb;
    var k = this.flags & 4,
      m = this.flags & 2;
    c.lineWidth = Math.max(
      a *
        (k && m ? 0.05 * b.jg : m ? h : k ? e : Math.sqrt((h * h + e * e) / 2)),
      b.jg
    );
    bj(c);
    f &&
      ((c.lineJoin = 'bevel'),
      c.beginPath(),
      (c.lineCap = this.Tm),
      d.Xt(c),
      bj(c),
      c.beginPath(),
      (c.lineCap = this.Fo),
      d.Ut(c),
      bj(c));
  };
  var bj = function(a) {
      a.save();
      a.setTransform(1, 0, 0, 1, 0, 0);
      a.stroke();
      a.restore();
    },
    lh = function(a, b, c, d, e, f, h) {
      aj.call(this, b, c, d, e, f, h);
      this.color = a;
    };
  v(lh, aj);
  lh.prototype.yn = function(a, b, c, d, e, f) {
    var h = this.color.Ta(a);
    c.strokeStyle = f.apply(h).he();
    this.Wm(a, b, c, d, e);
  };
  lh.prototype.ue = function() {
    return 2;
  };
  var kh = function(a, b, c, d, e, f, h) {
    aj.call(this, b, c, d, e, f, h);
    this.fill = a;
  };
  v(kh, aj);
  kh.prototype.yn = function(a, b, c, d, e, f) {
    c.save();
    var h = Xi(a),
      k = b.Gk(h, e),
      m = b.hh(k, !1),
      n = m.rc(e);
    n.beginPath();
    d.Co(n);
    n.strokeStyle = 'rgb(0,0,0)';
    this.Wm(a, m, n, d, e);
    n.globalCompositeOperation = 'source-in';
    !Cc || jb
      ? (n.beginPath(),
        n.rect(h.l, h.m, h.width(), h.height()),
        this.fill.mb(a, m, f))
      : ((d = m.hh(k, !1)),
        (e = d.rc(e)),
        e.beginPath(),
        e.rect(h.l, h.m, h.width(), h.height()),
        this.fill.mb(a, d, f),
        m.xe(d),
        d.af());
    b.xe(m);
    c.restore();
    m.af();
  };
  kh.prototype.ue = function() {
    return 2 * this.fill.ue();
  };
  var dj = function(a, b, c) {
    Re.call(this, b, a, c);
    this.k = null;
    this.Ec = !1;
    this.vi = [];
    this.lm = this.em = !1;
    a !== cj &&
      ((this.k = Sf(a.width, a.height).getContext('2d')),
      this.k.drawImage(a.canvas, 0, 0),
      (this.Ec = a.transparent));
  };
  v(dj, Re);
  var cj = {};
  g = dj.prototype;
  g.Ub = function(a, b, c, d) {
    this.k ||
      ((this.k = Sf(a, b).getContext('2d')),
      (this.Ec = c) || (d = (d | 4278190080) >>> 0),
      (this.k.fillStyle = Cg(d).he()),
      this.k.fillRect(0, 0, a, b));
  };
  g.K = function() {
    return this.k ? this.k.canvas.width : 0;
  };
  g.$ = function() {
    return this.k ? this.k.canvas.height : 0;
  };
  g.Ia = function() {
    return this.k.canvas;
  };
  g.rn = function(a) {
    var b = this.vi;
    0 <= Ea(b, a) || b.push(a);
  };
  g.Nq = function(a) {
    Ga(this.vi, a);
  };
  g.Dv = function() {
    this.em = !0;
  };
  g.Ax = function() {
    this.em = !1;
    this.lm && this.gg();
  };
  g.gg = function() {
    if (this.em) this.lm = !0;
    else {
      this.lm = !1;
      for (var a = 0; a < this.vi.length; ++a) this.vi[a].eq();
    }
  };
  g.hl = function() {
    this.k = null;
    this.gg();
  };
  g.At = function(a, b) {
    return this.k.createImageData(a, b);
  };
  g.Fd = function(a, b, c, d) {
    return this.k.getImageData(a, b, c, d);
  };
  g.Ph = function(a, b, c) {
    zd(this.k, a, b, c);
    this.gg();
  };
  g.Lb = function(a, b, c) {
    this.k && (a.Ri(this.k, b || Hc, c || $c), this.gg());
  };
  g.Ri = function(a, b, c) {
    a.save();
    a.setTransform(b.n, b.o, b.j, b.i, 0.05 * b.q, 0.05 * b.s);
    b = this.K();
    var d = this.$(),
      e;
    if (c.Te()) (e = this.k), (a.globalAlpha = c.S);
    else {
      e = Sf(b, d).getContext('2d');
      e.drawImage(this.k.canvas, 0, 0);
      var f = new ag(e.canvas, 0, 0, 1, 1, 1, new Vf());
      ig(f, c);
    }
    a.drawImage(e.canvas, 0, 0, b, d);
    a.restore();
  };
  g.fillRect = function(a, b, c, d, e) {
    var f = this.k;
    this.Ec
      ? 4278190080 === (e & 4278190080) || f.clearRect(a, b, c, d)
      : (e = (e | 4278190080) >>> 0);
    0 != e && ((f.fillStyle = Cg(e).he()), f.fillRect(a, b, c, d));
    this.gg();
  };
  g.Mm = function(a, b, c) {
    var d = this.At(1, 1),
      e = d.data;
    e[0] = (c >>> 16) & 255;
    e[1] = (c >>> 8) & 255;
    e[2] = c & 255;
    e[3] = this.Ec ? c >>> 24 : 255;
    this.Ph(d, a, b);
  };
  g.Yw = function(a, b, c) {
    var d = this.Fd(a, b, 1, 1),
      e = d.data;
    e[0] = (c >>> 16) & 255;
    e[1] = (c >>> 8) & 255;
    e[2] = c & 255;
    this.Ph(d, a, b);
  };
  g.Gl = function(a, b) {
    var c = this.Fd(a, b, 1, 1).data;
    return ((c[3] << 24) | (c[0] << 16) | (c[1] << 8) | c[2]) >>> 0;
  };
  g.Cu = function(a, b) {
    var c = this.Fd(a, b, 1, 1).data;
    return ((c[0] << 16) | (c[1] << 8) | c[2]) >>> 0;
  };
  g.Eu = function(a, b, c, d) {
    if (0 >= c || 0 >= d) return [];
    a = this.Fd(a, b, c, d).data;
    b = Array(Math.floor(a.length / 4));
    for (d = c = 0; d < b.length; d++)
      b[d] = ((a[c++] << 16) | (a[c++] << 8) | a[c++] | (a[c++] << 24)) >>> 0;
    return b;
  };
  g.$w = function(a, b, c, d, e) {
    if (!(0 >= c || 0 >= d)) {
      var f = this.Fd(a, b, c, d),
        h = f.data;
      c = Math.min(e.length, c * d * 4);
      d = this.Ec ? 0 : 255;
      for (var k = 0, m = 0; k < c; k++) {
        var n = e[k];
        h[m++] = (n >>> 16) & 255;
        h[m++] = (n >>> 8) & 255;
        h[m++] = n & 255;
        h[m++] = ((n >>> 24) | d) & 255;
      }
      this.Ph(f, a, b);
    }
  };
  g.Du = function(a, b, c, d, e) {
    if (0 >= c || 0 >= d) return new Uint8Array(0);
    a = this.Fd(a, b, c, d).data;
    if (e)
      for (e = 0; e < a.length; e += 4)
        (b = a[e]), (a[e] = a[e + 2]), (a[e + 2] = b);
    else
      for (e = 0; e < a.length; e += 4)
        (b = a[e]),
          (a[e] = a[e + 3]),
          (a[e + 3] = a[e + 2]),
          (a[e + 2] = a[e + 1]),
          (a[e + 1] = b);
    return a;
  };
  g.Zw = function(a, b, c, d, e, f) {
    if (!(0 >= c || 0 >= d)) {
      c = this.Fd(a, b, c, d);
      d = c.data;
      var h = 4 * Math.floor(Math.min(d.length, e.length) / 4),
        k = this.Ec ? 0 : 255;
      e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
      if (f)
        for (f = 0; f < h; f += 4)
          (d[f] = e[f + 2]),
            (d[f + 1] = e[f + 1]),
            (d[f + 2] = e[f]),
            (d[f + 3] = e[f + 3] | k);
      else
        for (f = 0; f < h; f += 4)
          (d[f] = e[f + 1]),
            (d[f + 1] = e[f + 2]),
            (d[f + 2] = e[f + 3]),
            (d[f + 3] = e[f] | k);
      this.Ph(c, a, b);
    }
  };
  g.scroll = function(a, b) {
    if (a || b) {
      var c = 0 > a ? -a : 0,
        d = 0 > b ? -b : 0,
        e = 0 > a ? 0 : a,
        f = 0 > b ? 0 : b,
        h = this.K() - c - e,
        k = this.$() - d - f;
      0 < h && 0 < k && this.Ph(this.Fd(c, d, h, k), e, f);
    }
  };
  g.fo = function(a, b, c, d, e, f, h, k, m, n, t) {
    d = Math.min(d, a.K() - b, this.K() - f);
    e = Math.min(e, a.$() - c, this.$() - h);
    k && ((d = Math.min(d, k.K() - m)), (e = Math.min(e, k.$() - n)));
    if (!(0 >= d || 0 >= e)) {
      var p;
      k && k.Ec
        ? ((p = Sf(d, e).getContext('2d')),
          p.drawImage(a.k.canvas, -b, -c),
          (p.globalCompositeOperation = 'destination-in'),
          p.drawImage(k.k.canvas, -m, -n),
          (c = b = 0),
          (a = !0))
        : ((p = a.k), (a = a.Ec));
      !a || (!t && this.Ec)
        ? zd(this.k, p.getImageData(b, c, d, e), f, h)
        : this.k.drawImage(p.canvas, b, c, d, e, f, h, d, e);
      this.gg();
    }
  };
  var ej = function() {
    this.canvas = Sf(1, 1);
    this.Pn = new Vf();
  };
  ej.prototype.Oj = function(a, b, c) {
    b = new ag(this.canvas, b, c, 1, 1, 1, this.Pn, 8);
    c = Yf.yd(a);
    var d = !1;
    c.Lb(a, b);
    if ((d = 0 < b.getImageData().data[3])) this.canvas.width = 1;
    c.la();
    this.Pn.Wg();
    return d;
  };
  var fj = function(a, b, c) {
    Re.call(this, a, b, c);
    this.depth = this.Bf = void 0;
    this.Ve = '';
    this.ic = this.nextSibling = this.ca = null;
    this.ol = this.Aa = 4100;
    this.zb = [];
    this.jf = !0;
    this.Dq = 0;
    this.Ni = void 0;
    this.Vb = !1;
    this.ie = Hc;
    this.Ef = null;
    this.nb = $c;
    this.Fg = this.ok = null;
    this.am = $c;
    this.sg = this.Yi = this.ud = this.Dh = this.aj = null;
    this.Bk = void 0;
    this.Fn = !1;
    this.qb = this.jd = null;
    this.Jj = !1;
    this.Tc = null;
    this.Lc = !1;
    this.kc = this.ug = null;
    this.Ek = !1;
    this.Ud = null;
    this.nc = 471859200;
  };
  v(fj, Re);
  var gj = function(a, b) {
    if (!b && !a.Fg) return !1;
    a.Fg = null;
    a.u(4096);
    (!b && a.Pd()) || a.bj(gj);
    return !1;
  };
  g = fj.prototype;
  g.es = function() {
    if (!this.Fg) {
      var a = this.ca,
        a = a ? a.ld().Ql(this.nb) : this.nb;
      this.Pd()
        ? ((this.am = a), (this.Fg = $c))
        : ((this.am = $c), (this.Fg = a));
    }
    return this.Fg;
  };
  g.ld = function() {
    return this.es();
  };
  g.gp = function() {
    this.es();
    return this.am;
  };
  g.ka = function() {
    if (!this.ok) {
      var a = this.ca || (this.qb && this.qb.ca);
      this.ok = a ? this.ie.multiply(a.ka()) : this.ie;
    }
    return this.ok;
  };
  g.bj = function() {
    return !1;
  };
  g.Uo = function() {
    return !1;
  };
  g.map = function(a) {
    return a(this);
  };
  g.Fa = function() {
    this.Fn = !0;
  };
  g.Gn = function() {
    return !!this.Fn;
  };
  g.setTransform = function(a, b) {
    if (b || !this.ie.ma(a))
      this.u(1), (this.ie = a), (this.Ef = null), this.Fh();
  };
  g.ec = function() {
    this.Ef || (this.Ef = this.ie.It());
    return this.Ef;
  };
  g.wf = function() {
    var a = this.Ef;
    if (a) {
      var b = Math.cos(a.angle),
        c = Math.sin(a.angle);
      this.setTransform(
        Vc(
          a.rd * b,
          -a.rd * c,
          a.rd * b * a.j + a.kf * c * a.i,
          a.kf * b * a.i - a.rd * c * a.j,
          this.ie.q,
          this.ie.s
        )
      );
      this.Ef = a;
    }
  };
  g.K = function() {
    var a = hj(this),
      a = a.Yb(this.wa());
    return a.width() / 20;
  };
  g.Om = function(a) {
    if (0 <= a) {
      var b = this.K(),
        c = this.wa();
      0 == b
        ? ((b = hj(this).width() / 20),
          0 == b && (b = 1),
          this.setTransform(Vc(a / b, c.o, 0, c.i, c.q, c.s)))
        : (0 == a && (a = 1 / 1024),
          this.setTransform(c.Ye(a / b, 1).Uc(c.q, c.s)));
    }
  };
  g.$ = function() {
    var a = hj(this),
      a = a.Yb(this.wa());
    return a.height() / 20;
  };
  g.Lm = function(a) {
    if (0 <= a) {
      var b = this.$(),
        c = this.wa();
      0 == b
        ? ((b = hj(this).height() / 20),
          0 == b && (b = 1),
          this.setTransform(Vc(c.n, 0, c.j, a / b, c.q, c.s)))
        : (0 == a && (a = 1 / 1024),
          this.setTransform(c.Ye(1, a / b).Uc(c.q, c.s)));
    }
  };
  g.Fh = function() {
    this.ca && this.ca.Cb();
    ij(this);
  };
  var ij = function(a) {
    a.ok = null;
    a.Dh = null;
    a.sg = null;
    a.u(2048);
    a.bj(ij);
    a.Uo(ij);
    return !1;
  };
  g = fj.prototype;
  g.Cb = function() {
    for (var a = this; a; a = a.ca)
      (a.aj = null), (a.ud = null), (a.Dh = null), (a.sg = null), a.u(16384);
  };
  g.wa = function() {
    return this.ie;
  };
  g.wp = function() {
    return l(this.Bf);
  };
  g.Jm = function(a) {
    this.Bf != a && (this.u(32768), (this.Bf = a));
  };
  g.Hd = function() {
    return this.Dq;
  };
  g.u = function(a) {
    (this.Aa & a) != a &&
      ((this.Aa |= a),
      (this.ol |= a),
      this.qb ? this.qb.u(32768) : this.ca && this.ca.u(65536));
  };
  g.$j = function(a) {
    this.Dq = a;
  };
  g.la = function() {
    this.Ni = !0;
    this.qb && this.qb.df(null);
    this.c.iv(this) && this.c.ik();
    this.c.J().jq(this);
  };
  g.je = function() {};
  g.Gb = function(a, b) {
    if (b || !this.nb.ma(a)) this.u(4), (this.nb = a), gj(this);
  };
  g.Yh = function(a) {
    a != this.Bb() &&
      (this.u(8192),
      gj(this, !0),
      (a = (1 < a ? -1 : 0) + (1 < this.Bb() ? 1 : 0)) &&
        this.ca &&
        this.ca.Ng(a));
  };
  g.xg = function(a) {
    var b = this.Bb();
    this.Bk = a;
    this.Yh(b);
  };
  g.Bb = function() {
    return !this.Bk && (0 < this.zb.length || this.Ek) ? 1 : this.Bk | 0;
  };
  g.nu = function() {
    var a = this.Bb();
    switch (a) {
      case 10:
      case 11:
        var b = this;
        do b = b.getParent();
        while (b && !b.Pd());
        return b && !b.getParent() ? 100 : a;
      default:
        return a;
    }
  };
  g.df = function(a) {
    if (this.jd != a) {
      this.u(32768);
      var b = this.jd;
      this.qb && this.qb.df(null);
      b &&
        (b.u(32768),
        (b.qb = null),
        b.getParent() ? b.getParent().u(65536) : b.Fh());
      a &&
        (a.u(32768),
        a.df(null),
        a.Jm(void 0),
        a.qb && a.qb.df(null),
        (a.qb = this),
        a.getParent() || a.Fh());
      this.jd = a;
    }
  };
  g.yg = function(a) {
    if (this.zb != a && (0 < this.zb.length || 0 < a.length)) {
      var b = this.Bb(),
        c = this.zb;
      this.zb = [];
      for (var d = !1, e = 0; e < a.length; e++)
        e >= c.length || !c[e].ma(a[e])
          ? ((d = !0), this.zb.push(a[e].ob()))
          : this.zb.push(c[e]);
      if (d || a.length != c.length)
        for (this.u(2), this.Yh(b), this.Yi = null, a = this; a; a = a.ca)
          a.sg = null;
    }
  };
  g.Hb = function(a) {
    a = String(a);
    a != this.Ve && this.ca && this.ca.Lk(this, a);
    this.Ve = a;
  };
  g.getName = function() {
    return this.Ve;
  };
  g.zg = function(a) {
    if (this.ca != a) {
      var b = (1 < this.Bb() ? 1 : 0) + (this.Pd() ? 0 : this.yl());
      this.ca && (this.Aa || b) && (b && this.ca.Ng(-b), this.ca.u(65536));
      (this.ca = a) && (this.Aa || b) && (b && this.ca.Ng(b), this.ca.u(65536));
    }
  };
  g.getParent = function() {
    return this.ca;
  };
  g.xl = function() {
    for (var a = [], b = this; b; b = b.getParent()) a.push(b);
    return a;
  };
  g.lv = function() {
    return this.c.H.contains(this);
  };
  g.kj = function() {
    for (var a = '', b = this; b && b.getName(); )
      (a = '.' + b.getName() + a), (b = b.getParent());
    b && b.getParent() == b.c.H && (a = '_level' + (b.depth - -16384) + a);
    return a;
  };
  g.El = function() {
    return this.Ud
      ? this.Ud
      : (this.getParent() && this.getParent().El()) || this.c.J().Qf();
  };
  g.wr = function(a) {
    this.Ud = a;
  };
  g.ck = function(a) {
    this.jf != a && (this.u(8), (this.jf = a));
  };
  g.sa = function() {
    return !1;
  };
  g.dv = function() {
    return !1 === this.Ni;
  };
  g.Od = function() {
    return !0 === this.Ni;
  };
  g.th = function(a) {
    this.nc |= 1 << a;
  };
  g.Qt = function(a) {
    this.nc &= ~(1 << a);
  };
  g.fireEvent = function(a, b) {
    var c = !1;
    !this.Lc &&
      this.nc & (1 << a.type) &&
      ((c = this.zl(a.type)) && c.sound && this.c.Le().Rr(c.sound),
      (c = this.c.J().fireEvent(this.t, c, a, b)));
    return c;
  };
  g.zl = function() {
    return null;
  };
  g.Uu = function(a) {
    return !!this.zl(a, !0);
  };
  var hj = function(a) {
      a.aj || (a.aj = a.zf());
      return a.aj;
    },
    Xi = function(a) {
      a.ud || (a.ud = a.re());
      return a.ud;
    },
    jj = function(a) {
      a.Dh || (a.Dh = a.Hk());
      return a.Dh;
    },
    kj = function(a) {
      if (!a.Yi) {
        for (var b = new ad(0, 0, 0, 0), c = 0; c < a.zb.length; c++)
          b.add(a.zb[c].Je());
        a.Yi = b;
      }
      return a.Yi;
    },
    lj = function(a) {
      if (!a.sg) {
        var b = a.Nn();
        b.add(kj(a));
        a.sg = b;
      }
      return a.sg;
    };
  g = fj.prototype;
  g.re = function() {
    return hj(this);
  };
  g.Hk = function() {
    return hj(this).Yb(this.ka());
  };
  g.Nn = function() {
    return Xi(this).Yb(this.ka());
  };
  g.mp = function() {
    var a = hj(this).Yb(this.ka());
    a.scale(0.05, 0.05);
    a.tl();
    return a;
  };
  g.ho = function() {};
  g.ia = function(a, b) {
    this.Ni = !1;
    fj.O.ia.call(this, a, b);
  };
  g.Ag = function(a) {
    this.Tc = a;
  };
  g.qi = function() {
    return this.c.J().qi(this);
  };
  g.xr = function(a) {
    this.Jj = a;
  };
  g.contains = function(a) {
    for (; a && a != this; ) a = a.getParent();
    return a == this;
  };
  g.Ke = function(a) {
    this.ug != a &&
      (this.kc && this.kc.la(),
      (this.Aa = this.ol),
      (this.kc = a.yd(this)),
      (this.ug = a));
    return this.kc;
  };
  g.Jq = function() {
    this.kc && this.kc.la();
    this.kc = this.ug = null;
  };
  g.yl = function() {
    return 0;
  };
  g.Pd = function() {
    return 1 <= this.Bb();
  };
  g.qt = function(a, b) {
    return new ej().Oj(this, a, b);
  };
  g.Ad = function(a, b, c, d, e) {
    return this.yj(a, b) && e.Oj(this, a, b) ? (c(this) ? this : d) : null;
  };
  g.yj = function(a, b) {
    return this.jf && jj(this).contains(a, b);
  };
  g.ep = function(a, b, c) {
    var d = new ej();
    return this.Ad(a, b, c, null, d);
  };
  g.Im = function(a) {
    var b = this.Bb();
    this.Ek = a;
    this.Yh(b);
  };
  g.Kp = function() {
    return this.Ek || 0 < this.zb.length;
  };
  var mj = { zn: 27, qq: 21 },
    nj = { zn: 28, qq: 26 };
  fj.prototype.Nf = function(a, b, c) {
    c != this.ca &&
      this.dv() &&
      (this.fireEvent(new Jc(a.zn), !0),
      this.lv() &&
        this.map(function(c) {
          c.fireEvent(new Jc(a.qq), !0);
          return b;
        }));
  };
  fj.prototype.Ri = function(a, b, c) {
    a.save();
    var d = a.canvas,
      e = $f(this),
      f = new ag(d, 0, 0, 0.05, 0.05, 1, new Vf()),
      h = this;
    this.detach(b, c, function() {
      e.yb(h, f);
    });
    a.restore();
  };
  fj.prototype.detach = function(a, b, c) {
    var d = this.ca,
      e = this.wa(),
      f = this.nb;
    this.ca = null;
    this.setTransform(a, !!d);
    this.Gb(b, !!d);
    c();
    this.setTransform(e, !!d);
    this.Gb(f, !!d);
    this.ca = d;
  };
  fj.prototype.Xi = function() {};
  var oj = function(a) {
    a.Xi();
    return !1;
  };
  var pj = function(a, b, c) {
    fj.call(this, b, cj, c);
    this.Jb = a;
    this.vq = 'auto';
    this.smoothing = !1;
  };
  v(pj, fj);
  g = pj.prototype;
  g.Bb = function() {
    return Math.max(1, pj.O.Bb.call(this));
  };
  g.Mw = function(a) {
    a !== this.Jb &&
      (this.Jb && this.Jb.Nq(this),
      (this.Jb = a) && this.Jb.rn(this),
      this.eq());
  };
  g.eq = function() {
    this.u(262144);
  };
  g.ia = function(a, b) {
    pj.O.ia.call(this, a, b);
    this.Jb && this.Jb.rn(this);
  };
  g.la = function() {
    pj.O.la.call(this);
    this.Jb && this.Jb.Nq(this);
  };
  g.zf = function() {
    var a = this.Jb,
      b = a ? 20 * a.K() : 0,
      a = a ? 20 * a.$() : 0;
    return new ad(0, 0, b, a);
  };
  var qj = function(a, b, c, d) {
    fj.call(this, a, b, d);
    this.mc = 1;
    this.rj = !1;
    this.Yf = !0;
    this.Kl = [];
    this.jl = !1;
    this.Zl = 0;
    this.ef = void 0;
    this.tabIndex = -1;
    this.kg = c || gd.Fl();
    this.nc |= 65011456;
  };
  v(qj, fj);
  var rj = function() {
    this.actions = [];
    this.sound = null;
  };
  g = qj.prototype;
  g.zl = function(a, b) {
    var c = this.Kl[a];
    return !c || (b && !c.actions.length) ? null : c;
  };
  g.dp = function(a) {
    var b = this.Kl[a];
    b || ((b = new rj()), (this.Kl[a] = b));
    return b;
  };
  g.sn = function(a, b, c) {
    var d = this.c.J(),
      e;
    for (e in Kc) {
      var f = Kc[e];
      if (a & (1 << f)) {
        this.th(f);
        var h = this.dp(f),
          k = {};
        k.Ck = new Qh(c, d.lp(this));
        20 === f &&
          ((k.ao = function(a) {
            return a.getKey().Ku() == b;
          }),
          (k.stopPropagation = !0));
        h.actions.push(k);
        (1 << f) & 63045376 && this.Vi();
      }
    }
  };
  g.cx = function(a, b) {
    for (var c in Kc) {
      var d = Kc[c];
      a & d && (this.dp(d).sound = b);
    }
  };
  g.isEnabled = function() {
    return this.Sc() && this.Yf;
  };
  g.Xl = function() {
    return !!this.ef;
  };
  g.Sc = function() {
    return this.rj && !this.Od() && 0 != this.t.enabled;
  };
  g.Vi = function() {
    this.rj || (this.u(256), (this.rj = !0));
  };
  g.tb = function(a) {
    this.mc != a && (this.mc = a);
  };
  g.Ow = function(a) {
    this.jl = a;
  };
  g.yr = function(a) {
    this.Yf != a && (this.u(256), (this.Yf = a));
  };
  g.trackAsMenu = function() {
    return !1;
  };
  g.Pv = function(a) {
    this.Sc() && (this.c.Re() || this.fireEvent(new Jc(23, a)));
  };
  g.hr = function(a) {
    if (this.Sc()) {
      var b;
      this.c.Re() || 1 != this.mc
        ? this.trackAsMenu() && !this.c.vj() && 1 == this.mc
          ? (this.tb(4), (b = 14))
          : this.c.uj(this) && 2 == this.mc && (this.tb(4), (b = 16))
        : (this.tb(2), (b = 9));
      b && this.fireEvent(new Jc(b, a));
    }
  };
  g.Nv = function(a) {
    this.Sc() && (this.c.Re() || this.fireEvent(new Jc(22, a)));
  };
  g.gr = function(a) {
    if (this.Sc()) {
      var b;
      this.c.Re() || 2 != this.mc
        ? this.trackAsMenu() && !this.c.vj() && 4 == this.mc
          ? (this.tb(1), (b = 13))
          : this.c.uj(this) && 4 == this.mc && (this.tb(2), (b = 15))
        : (this.tb(1), (b = 8));
      b && this.fireEvent(new Jc(b, a));
    } else this.tb(1);
  };
  g.Vd = function() {
    this.Sc()
      ? (this.c.setCapture(this, !this.trackAsMenu()),
        this.tb(4),
        this.fireEvent(new Jc(12)))
      : this.tb(1);
  };
  g.$f = function() {
    if (this.Sc()) {
      var a = (this.trackAsMenu() && 0 == this.c.vj()) || this.c.uj(this);
      this.c.releaseCapture(this);
      this.tb(2);
      if (a) {
        var a = xh(),
          b = a - this.Zl;
        this.jl && 600 > b
          ? (this.fireEvent(new Jc(25)), (this.Zl = 0))
          : (this.fireEvent(new Jc(11)), (this.Zl = a));
      } else this.fireEvent(new Jc(9));
    } else this.tb(1);
  };
  g.Zf = function() {
    this.isEnabled() && !this.c.Re() && this.fireEvent(new Jc(24));
  };
  g.Ys = function() {
    this.Sc() &&
      !this.trackAsMenu() &&
      (this.tb(1), this.fireEvent(new Jc(10)));
  };
  g.gj = function() {
    if (!this.isEnabled()) return 'default';
    var a = this.t.useHandCursor;
    return l(a) && !a ? 'default' : 'pointer';
  };
  var sj = function(a, b, c, d) {
    qj.call(this, a, b, c, d);
    this.G = new Ee(this.t);
    this.Pk = 0;
    this.Mj = !0;
    this.Bg = this.Wh = null;
  };
  v(sj, qj);
  g = sj.prototype;
  g.la = function() {
    sj.O.la.call(this);
    this.G.la();
    this.u(16);
  };
  g.zf = function() {
    return this.G.Wp(hj);
  };
  g.re = function() {
    return this.G.Wp(Xi);
  };
  g.Hk = function() {
    return this.G.kn(jj);
  };
  g.Nn = function() {
    return this.G.kn(lj);
  };
  g.map = function(a) {
    var b = sj.O.map.call(this, a);
    return (b =
      b ||
      this.G.forEach(function(b) {
        return b.map(a);
      }));
  };
  g.bj = function(a) {
    return this.G.forEach(a);
  };
  g.sa = function() {
    return !0;
  };
  g.ku = function(a) {
    return this.G.bp(a);
  };
  g.Wc = function(a, b) {
    this.u(16);
    var c = a.getParent();
    c && c.removeChild(a);
    a.zg(this);
    this.G.tm(a, b);
    this.Cb();
    a.Nf(mj, !1, c);
  };
  g.removeChild = function(a, b) {
    a.Nf(nj, !1, b);
    this.u(16);
    this.G.Am(a);
    a.je();
    a.zg(null);
    this.Cb();
  };
  g.Lq = function() {
    for (var a = this.G.Ha; a; ) this.removeChild(a), (a = this.G.Ha);
  };
  g.de = function(a) {
    (a = this.G.Ic(a)) && this.removeChild(a);
  };
  g.Ic = function(a) {
    return this.G.Ic(a);
  };
  g.Lk = function(a, b) {
    this.G.Lk(a, b);
  };
  g.Xm = function(a, b) {
    this.u(16);
    this.G.Xm(a, b);
  };
  g.vp = function(a) {
    return this === a.getParent();
  };
  g.qv = function(a, b) {
    return (0 <= a && a < this.G.Ed()) || (!!b && a == this.G.Ed());
  };
  g.Ed = function() {
    return this.G.Ed();
  };
  g.De = function(a) {
    return this.G.De(a);
  };
  g.Pf = function(a) {
    return this.G.Pf(a);
  };
  g.Md = function(a, b) {
    this.u(16);
    var c = a.getParent();
    c && c.Th(a, this);
    a.zg(this);
    this.G.Md(a, b);
    this.Cb();
    a.Nf(mj, !1, c);
  };
  g.Th = function(a, b) {
    a.Nf(nj, !1, b);
    this.u(16);
    this.G.Th(a);
    a.zg(null);
    this.Cb();
  };
  g.Cb = function() {
    sj.O.Cb.call(this);
    this.Bg = null;
  };
  g.Fh = function() {
    sj.O.Fh.call(this);
    this.Bg = null;
  };
  g.ax = function(a) {
    this.Wh = a;
    this.Bg = null;
  };
  g.Iu = function() {
    if (!this.Bg && this.Wh && 0 < this.Wh.width() && 0 < this.Wh.height()) {
      var a = this.wa();
      if (0 < a.n && 0 < a.i && !a.o && !a.j) {
        var b = new ad();
        this.bj(function(a) {
          a.ho(b);
          return !1;
        });
        0 < b.width() &&
          0 < b.height() &&
          (this.Bg = new dd(b, this.Wh, a.n, a.i));
      }
    }
    return this.Bg;
  };
  g.Ww = function(a) {
    this.Mj != a && ((this.Mj = a), this.u(256));
  };
  g.yl = function() {
    return this.Pk;
  };
  g.Yh = function(a) {
    sj.O.Yh.call(this, a);
    var b = this.Pk;
    (a = (1 <= a ? b : 0) + (1 <= this.Bb() ? -b : 0)) &&
      this.getParent().Ng(a);
  };
  g.Ng = function(a) {
    this.Pk = this.yl() + a;
    this.u(131072);
    !this.Pd() && this.getParent() && this.getParent().Ng(a);
  };
  g.Ad = function(a, b, c, d, e) {
    return this.yj(a, b)
      ? (c(this) && (d = this), this.yp(a, b, c, d, e))
      : null;
  };
  g.yp = function(a, b, c, d, e) {
    var f = null,
      h = [];
    this.G.forEach(function(k) {
      if (k.qb) return !1;
      for (; 0 < h.length && k.depth > h[h.length - 1]; ) h.pop();
      if (k.wp()) {
        if (k instanceof tj) return !1;
        e.Oj(k, a, b) || h.push(k.Bf);
      } else if (0 == h.length) {
        var m = k.jd;
        if (!m || e.Oj(m, a, b))
          (k = k.Ad(a, b, c, d, e)), !k || (k == d && f) || (f = k);
      }
      return !1;
    });
    return f;
  };
  fj.prototype.Rn = function() {
    return !0;
  };
  var fh = function(a, b, c, d) {
    sj.call(this, b, a, c, d);
    this.Ld = new Ee();
  };
  v(fh, sj);
  g = fh.prototype;
  g.ia = function() {
    fh.O.ia.call(this);
    this.gf(this.G, 1);
    this.gf(this.Ld, 8);
    this.Vi();
    for (var a = 0; a < this.definition.actions.length; a++) {
      var b = this.definition.actions[a];
      this.sn(b.events, b.key, b.actions);
    }
    for (a = 0; a < this.definition.sounds.length; a++)
      (b = this.definition.sounds[a]), this.cx(b.events, b.sound);
  };
  g.la = function() {
    fh.O.la.call(this);
    this.Ld.la();
  };
  g.Hk = function() {
    return this.Ld.kn(jj);
  };
  g.Uo = function(a) {
    return this.Ld.forEach(a);
  };
  g.tb = function(a) {
    a != this.mc && (this.gf(this.G, a, this.mc), this.c.H.$h());
    fh.O.tb.call(this, a);
  };
  g.Sc = function() {
    return fh.O.Sc.call(this) && this.Yf;
  };
  g.trackAsMenu = function() {
    return this.definition.trackAsMenu;
  };
  g.gf = function(a, b, c) {
    this.u(16);
    var d = this.definition.records;
    if (d) {
      if (l(c))
        for (var e = 0; e < d.length; e++) {
          var f = d[e],
            h = f.states & c,
            k = f.states & b;
          h && !k && a.Pq(f.depth);
        }
      for (e = 0; e < d.length; e++)
        if (
          ((f = d[e]),
          (h = f.states & c),
          (k = f.states & b) &&
            !h &&
            ((h = this.kg + '.' + f.definition.id.toString(36)),
            f.definition.Wl() && (h = f.definition.get().Kb(this.c, h))))
        )
          h.sa() && 8 != b && h.Hb(this.c.zh()),
            h.zg(this),
            h.ia(),
            a.tm(h, f.depth),
            f.transform && h.setTransform(f.transform),
            f.filters && h.yg(f.filters),
            f.blendmode && h.xg(f.blendmode),
            f.Ok && h.Gb(f.Ok);
    }
  };
  g.Ad = function(a, b, c, d, e) {
    var f = null;
    if (this.yj(a, b)) {
      var h = c(this);
      h && (d = this);
      if ((f = this.yp(a, b, c, d, e)) && f != d) return f;
      if (
        h &&
        this.Ld.du(function(f) {
          return !!f.Ad(a, b, c, d, e);
        })
      )
        return d;
    }
    return f;
  };
  var tj = function(a, b, c, d) {
    qj.call(this, b, a, c, d);
    this.vk = 'normal';
    this.xf = a.autoSize;
    this.ui = a.border;
    this.ti = 16777215;
    this.yi = a.border;
    this.xi = 0;
    this.$n = !1;
    this.Ui = a.editable;
    this.Jf = a.Eo;
    this.up = 'pixel';
    this.Tb = a.html;
    this.$p = a.maxChars;
    this.Ue = a.multiline;
    this.ei = !1;
    this.tq = a.password;
    this.Em = null;
    this.Xh = a.selectable;
    this.Ir = 0;
    this.ua = null;
    this.ff = a.color;
    this.Zm = 0;
    this.ki = a.wrap;
    this.Hc = Ve(a);
    this.Pe = [];
    this.Qc = [];
    this.yf = a.bounds.clone();
    this.Qn = !0;
    this.fs = !1;
    this.Eg = a.variable;
    this.links = [];
    null == this.ua && ((a = a.text), this.Bc(l(a) ? a : ''));
  };
  v(tj, qj);
  g = tj.prototype;
  g.zf = function() {
    var a = this.yf.clone();
    if ('none' != this.xf) {
      var b = new ad(a.l, a.m, a.l + this.Jl() + 80, a.m + this.Il() + 80);
      a.eh(b);
    }
    return a;
  };
  g.Bc = function(a) {
    this.Qn &&
      this.Tb &&
      this.ff != this.definition.color &&
      (this.u(64), (this.ff = this.definition.color));
    if (this.ei || this.ua != a) (this.fs = !0), this.ds(a), (this.ei = !1);
  };
  g.Zj = function(a) {
    this.Qn = a;
  };
  g.fp = function() {
    var a = this.ua;
    if (this.Tb) {
      for (
        var b = /\s*<p(?: [^>]*)?>.*?<\/p>\s*/gi, c = 0, d = b.exec(a), e = '';
        d;

      )
        d.index > c && (e += '<p>' + a.substring(c, d.index) + '</p>'),
          (e += d[0]),
          (c = b.lastIndex),
          (d = b.exec(a));
      a.length > c && (e += '<p>' + a.substring(c) + '</p>');
      a = e;
    }
    return a;
  };
  g.Tw = function(a) {
    this.Tb != a && (this.u(64), (this.Tb = a));
  };
  g.Gr = function(a) {
    this.ff = (16777215 & a) | (this.ff & 4278190080);
    this.ak(We(this.ff));
  };
  g.pp = function() {
    return this.ff & 16777215;
  };
  g.mr = function(a) {
    this.vk = a;
  };
  g.wg = function(a) {
    this.ui = a;
    this.u(128);
  };
  g.or = function(a) {
    this.ti = a & 16777215;
    this.u(128);
  };
  g.pr = function(a) {
    this.yi = a;
    this.u(128);
  };
  g.qr = function(a) {
    this.xi = a & 16777215;
    this.u(128);
  };
  g.Nw = function(a) {
    this.$n = a;
  };
  g.tr = function(a) {
    this.Jf = a;
    this.ds(this.ua);
  };
  g.Sw = function(a) {
    this.up = a;
  };
  g.Vw = function(a) {
    this.$p = a;
  };
  g.zr = function(a) {
    this.Ue != a && (this.ei = !0);
    this.Ue = a;
    this.Dg();
  };
  g.Xw = function(a) {
    this.tq = a;
  };
  g.Cr = function(a) {
    this.Em = a;
  };
  g.bx = function(a) {
    this.Ir = a;
  };
  g.ex = function(a) {
    this.Zm = a;
  };
  g.Jd = function() {
    return this.Eg;
  };
  g.bk = function(a) {
    this.Eg && this.c.J().fn(this.Eg, this);
    (this.Eg = a) && this.c.J().zm(this.Eg, this, this.definition.text);
  };
  g.Hr = function(a) {
    this.ki != a && (this.ei = !0);
    this.ki = a;
    this.Dg();
  };
  g.nr = function(a) {
    this.u(32);
    this.xf = a;
    this.Cb();
  };
  g.Er = function(a) {
    this.Xh = a;
  };
  g.Km = function(a) {
    this.Ui = a;
  };
  g.Xl = function() {
    return l(this.ef) ? this.ef : this.Ui;
  };
  g.qp = function(a, b) {
    l(a) ? l(b) || (b = a + 1) : ((a = 0), (b = this.ua.length));
    for (var c = null, d = 0, e, f = 0; f < this.Pe.length; f++)
      for (var h = this.Pe[f], k = 0; k < h.length; k++) {
        var m = h[k];
        e = d + m.ua.length - 1;
        d < b && e >= a && (c ? c.Hv(m.format) : (c = m.format.clone()));
        d = e + 1;
      }
    c ? (c.font = c.Ch() ? c.font.name : c.font) : (c = new Se());
    return c;
  };
  g.kp = function() {
    var a = new Se();
    a.dh(this.Hc);
    return a;
  };
  g.ak = function(a, b, c) {
    a = a.clone();
    l(b) ? l(c) || (c = b + 1) : ((b = 0), (c = this.ua.length));
    for (var d = 0, e, f = 0; f < this.Pe.length; f++)
      for (var h = this.Pe[f], k = 0; k < h.length; k++) {
        var m = h[k],
          n = m.ua;
        e = d + n.length - 1;
        if (d < c && e >= b) {
          var t = Math.max(d, b) - d,
            d = Math.min(e + 1, c) - d;
          if (0 < t) {
            var p = m.wh(n.substring(0, t));
            h.splice(k, 0, p);
            k++;
          }
          d < n.length && ((p = m.wh(n.substring(d))), h.splice(k + 1, 0, p));
          m.Bc(n.substring(t, d));
          null != a.color && (a.color |= 4278190080);
          !this.Jf && m.format.Nl() && (a.font = m.format.font);
          m.format.dh(a);
          m.hi(this.Bl());
        }
        d = e + 1;
      }
    this.Dg();
    this.u(128);
  };
  g.Br = function(a) {
    this.ei = !0;
    this.Hc.dh(a);
  };
  g.ia = function() {
    tj.O.ia.call(this);
    (this.c.J().Do || this.Xh) && this.yr(!0);
    this.definition.variable &&
      this.c.J().zm(this.definition.variable, this, this.definition.text);
  };
  g.la = function() {
    tj.O.la.call(this);
    this.definition.variable && this.c.J().fn(this.definition.variable, this);
  };
  g.sa = function() {
    return this.definition.sa;
  };
  g.ds = function(a) {
    this.u(32);
    this.ua = a;
    this.Pe = [];
    this.Tb || (a = uj(a));
    this.Fs(a, this.Ue);
  };
  g.Fs = function(a, b) {
    var c = new vj(null, null);
    c.format = Ve(this.definition);
    if (this.Jf && this.definition.font) {
      var d = this.definition.font.get();
      d instanceof Ue && (c.format.font = d);
    } else
      this.definition.font &&
        ((d = this.definition.font.get()),
        d instanceof Ue && (c.format.font = d.name));
    c.format.color = this.ff | 0;
    c.format.Ch() &&
      ((d = c.format.font),
      (c.format.italic = d.italic),
      (c.format.bold = d.bold));
    this.Tb &&
      this.Hc &&
      ((c.format.italic = !!this.Hc.italic),
      (c.format.bold = !!this.Hc.bold),
      (c.format.size = this.Hc.size),
      (c.format.Qa = this.Hc.Qa),
      (c.format.indent = this.Hc.indent),
      (d = this.Hc.color),
      (c.format.color = this.Hc.hf ? 4278190080 | d : c.format.color));
    var d = new wj(c, this.Bl(), b),
      e = a.replace(/\r\n|\r|\n/g, '<br/>');
    c.hi(this.Bl());
    var c = new Pd(e, !1, !1, !0),
      f;
    try {
      for (; (f = c.next()); )
        switch (f.type) {
          case 'tag':
            e = {};
            if (f.attributes)
              for (var h = 0; h < f.attributes.length; ++h) {
                var k = f.attributes[h];
                e[k.name.toLowerCase()] = k.value;
              }
            d.lx(f.value.toLowerCase(), e);
            break;
          case 'close':
            d.Yt(f.value.toLowerCase());
            break;
          case 'text':
          case 'cdata':
            d.$s(f.value);
        }
    } catch (m) {}
    this.Pe = d.bm;
    this.Dg();
  };
  g.Dg = function() {
    var a = this.Pe;
    if (!(this.fs || this.Ue || this.Tb)) {
      var b = [];
      b.push(Array.prototype.concat.apply([], a));
      a = b;
    }
    this.ki && (a = this.Mx(a, this.yf));
    this.Qc = a;
    'none' != this.xf && this.Cb();
  };
  g.hp = function(a, b) {
    var c = a.D - a.l - 80;
    b && (c -= b.leftMargin + b.rightMargin);
    return c;
  };
  g.Mx = function(a, b) {
    var c = [],
      d = 0,
      e = !1;
    c[d] = [];
    for (var f = 0; f < a.length; f++) {
      for (
        var h = a[f],
          k = 0 < h.length ? h[0].format : null,
          m = this.hp(b, k),
          k = k ? k.indent | 0 : 0,
          n = 0;
        n < h.length;
        n++
      )
        for (var t = h[n].Lx(k, m, e), p = 0; p < t.length; p++)
          (e = h[n].wh(t[p])),
            (e.Ej = p == t.length - 1),
            c[d].push(e),
            p == t.length - 1
              ? ((k += e.K()), (e = this.Ue || ' ' == e.ua[e.ua.length - 1]))
              : (d++, (c[d] = []), (k = 0), (e = !1));
      d++;
      c[d] = [];
    }
    0 == c[d].length && c.pop();
    return c;
  };
  g.vu = function(a) {
    if (0 <= a && a < this.Qc.length) {
      a = this.Qc[a];
      for (var b = '', c = 0; c < a.length; c++) b += a[0].ua;
      return b.replace(/\n/, '');
    }
    return null;
  };
  g.Uq = function(a) {
    var b = hj(this);
    this.links = [];
    for (var c = 0, d = !0, e = 0, f = this.Qc, h = 0; h < f.length; h++) {
      var k = f[h],
        m = xj(k),
        n = yj(k) * m;
      if (0 != h && 'none' == this.xf && c + n > b.F) break;
      var t = 0 < k.length ? k[0].format : null;
      0 == h &&
        t &&
        ((e = t.leading | 0),
        (c = b.m + 40 - 0.5 * e),
        0 > e ? (c = b.m) : 0 > c && (c = b.m + 40));
      for (
        var p = b.l + 40 + (t ? t.leftMargin : 0),
          r = this.hp(b, t),
          u = 0,
          y = 0;
        y < k.length;
        y++
      )
        u += k[y].K();
      if (t)
        switch (
          (l(t.indent) && d && ((p += t.indent), (r -= t.indent), (d = !1)),
          t.Qa)
        ) {
          case 2:
            p += (r - u) / 2;
            break;
          case 1:
            p += r - u;
        }
      for (y = 0; y < k.length; y++)
        k[y].ua.length &&
          ((u = 0),
          (t = k[y].K()),
          !k[k.length - 1].Ej &&
            3 == k[y].format.Qa &&
            h < f.length - 1 &&
            ((u = (k[y].ua.match(/ /g) || []).length), (u = (r - t) / u)),
          a.Sq(k[y], p, c, m, u),
          k[y].format.url &&
            ((u = new zj(p, c, t, n, k[y].format.url, k[y].format.target)),
            this.links.push(u)),
          (p += t),
          (d = d || k[y].Ej));
      c += n + e;
    }
  };
  g.Bl = function() {
    return this.Jf ? this.c.Dd : null;
  };
  g.Om = function(a) {
    0 <= a &&
      ((this.yf.D = this.yf.l + 20 * a), this.Dg(), this.Cb(), this.u(128));
  };
  g.Lm = function(a) {
    0 <= a &&
      ((this.yf.F = this.yf.m + 20 * a), this.Dg(), this.Cb(), this.u(128));
  };
  g.Vd = function() {
    var a = this.wu();
    a
      ? this.c.Qh(new Aj(this.c.J(), '', a.Bv, a.target, 1))
      : tj.O.Vd.call(this);
  };
  g.wu = function() {
    var a = new Ic(this.c.Eb.x, this.c.Eb.y);
    a.gc(this.ka());
    for (var b = 0; b < this.links.length; b++)
      if (this.links[b].An.contains(a.x, a.y)) return this.links[b];
    return null;
  };
  var zj = function(a, b, c, d, e, f) {
      this.An = new ad(a, b, a + c, b + d);
      this.Bv = e || '';
      this.target = f || '_self';
    },
    Bj = function() {
      this.format = Te();
      this.Ej = !1;
      this.ua = '';
      this.lb = 0;
    },
    Fj = Sf(1, 1);
  g = Bj.prototype;
  g.wh = function(a) {
    var b = this.xt();
    b.ua = a;
    return b;
  };
  g.Bc = function(a) {
    this.ua = a;
    this.lb = 0;
  };
  g.hi = function(a, b) {
    this.lb = 0;
    !l(b) && this.format.Ch() && (b = this.format.font.name);
    if (a) {
      if (
        (!l(b) && l(this.format.font) && (b = String(this.format.font)),
        !this.format.Ch() ||
          b != this.format.font.name ||
          !!this.format.italic != !!this.format.font.italic ||
          !!this.format.bold != !!this.format.font.bold)
      ) {
        var c = Xe;
        if (l(b) && a && a[b])
          for (var d = a[b], e = 0; e < d.length; ++e) {
            if (
              !!this.format.italic == !!d[e].italic &&
              !!this.format.bold == !!d[e].bold
            ) {
              this.format.font = d[e];
              return;
            }
            c == Xe && (c = d[e]);
          }
        this.format.font = c;
      }
    } else b && (this.format.font = b);
  };
  g.xt = function() {
    var a = new Bj();
    a.format.dh(this.format);
    return a;
  };
  g.K = function() {
    this.lb || (this.lb = this.measureText(this.ua));
    return this.lb;
  };
  g.measureText = function(a) {
    if (this.format.Nl()) {
      for (var b = 0, c = 0; c < a.length; c++) {
        var d = this.format.font.Cl(a.charAt(c));
        l(d) && (b += d.advance ? d.advance : 0);
      }
      b = (b * this.format.size) / (this.format.font.emSquareSize | 0);
      return (b += (this.format.letterSpacing * a.length) | 0);
    }
    return this.ju(a);
  };
  g.Zo = function() {
    var a = Fj.getContext('2d');
    this.format.mb(a);
    return a;
  };
  g.ju = function(a) {
    return this.Zo().measureText(a).width;
  };
  g.Lx = function(a, b, c) {
    for (
      var d = [], e = 0, f = (d[0] = ''), h = 0, k = this.ua.split(' '), m = 0;
      m < k.length;
      m++
    )
      if (!(0 < e && 0 == a && '' == k[m])) {
        k[m] = k[m].replace(/&nbsp;/g, ' ');
        var n = this.measureText(k[m]);
        a + h + n > b
          ? n < b && c
            ? (e++, (a = n), (d[e] = k[m]))
            : (e || d[e] ? (a = 0) : d.pop(),
              this.Kx(k[m], b, a, d),
              (e = d.length - 1),
              (a = this.measureText(d[e])))
          : ((d[e] = d[e] + f + k[m]), (a += h + n));
        c = !0;
        0 == m &&
          ((f = ' '), (h = this.measureText('a a') - this.measureText('aa')));
      }
    return d;
  };
  g.Kx = function(a, b, c, d) {
    this.format.Nl() ? this.Jx(a, b, c, d) : this.Ix(a, b, c, d);
  };
  g.Jx = function(a, b, c, d) {
    for (
      var e = 0,
        f = 0,
        h = this.format.size / (this.format.font.emSquareSize | 0),
        k = 0;
      k < a.length;
      k++
    ) {
      var m = this.format.font.Cl(a.charAt(k)),
        m = (l(m) && m.advance ? m.advance : 0) * h + this.format.letterSpacing;
      0 < k - f &&
        e + m > b - c &&
        (d.push(a.substring(f, k)), (f = k), (c = e = 0));
      e += m;
    }
    d.push(a.substring(f));
  };
  g.Ix = function(a, b, c, d) {
    for (var e = this.Zo(), f = 0; f < a.length; ) {
      for (var h = f + 1, k = a.length, m; k > h; ) {
        var n = h + (k - h) / 2,
          n = Math.ceil(n);
        m = a.substring(f, n);
        e.measureText(m).width <= b - c ? (h = n) : (k = n - 1);
      }
      d.push(a.substr(f, h));
      f = h;
      c = 0;
    }
  };
  var vj = function(a, b) {
    Bj.call(this);
    a && this.format.dh(a.format);
    this.parent = a;
    this.ew = b;
  };
  v(vj, Bj);
  var Gj = function(a, b) {
      return a.replace(/<[^>]+>|&[^;]+;/g, function(a) {
        switch (a) {
          case '&amp;':
            return '&';
          case '&lt;':
            return '<';
          case '&gt;':
            return '>';
          case '&quot;':
            return '"';
          case '&apos;':
            return "'";
          case '&nbsp;':
            return ' ';
          case '</p>':
          case '<br>':
          case '<br/>':
            return b ? '\n' : '';
        }
        return '';
      });
    },
    Hj = function(a) {
      return a.replace(/[<>&]/g, function(a) {
        switch (a) {
          case '&':
            return '&amp;';
          case '<':
            return '&lt;';
          case '>':
            return '&gt;';
        }
        return a;
      });
    },
    uj = function(a) {
      return a.replace(/[&<>"'\u02c6\u02dc]/g, function(a) {
        switch (a) {
          case '&':
            return '&amp;';
          case '<':
            return '&lt;';
          case '>':
            return '&gt;';
          case "'":
            return '&apos;';
          case '"':
            return '&quot;';
          case '\u02c6':
            return '&#710;';
          case '\u02dc':
            return '&#732;';
        }
        return a;
      });
    };
  tj.prototype.Il = function() {
    for (var a = 0, b = 0; b < this.Qc.length; b++)
      var c = this.Qc[b], d = xj(c), c = yj(c), a = a + c * d;
    return a;
  };
  var xj = function(a) {
      for (var b = 0, c = 0; c < a.length; c++)
        b = Math.max(b, a[c].format.size);
      return b;
    },
    yj = function(a) {
      for (var b = 1, c = 0; c < a.length; c++)
        b =
          a[c].format.Ch() && a[c].format.font.lineHeight
            ? Math.max(b, a[c].format.font.lineHeight)
            : Math.max(b, 1.14);
      return b;
    },
    Ij = function(a) {
      switch (a) {
        case 'left':
          return 0;
        case 'center':
          return 2;
        case 'right':
          return 1;
        case 'justify':
          return 3;
        default:
          return 0;
      }
    };
  tj.prototype.Jl = function() {
    for (var a = 0, b = 0; b < this.Qc.length; b++) {
      for (var c = 0, d = this.Qc[b], e = 0; e < d.length; e++) c += d[e].K();
      a = Math.max(a, c);
    }
    return a;
  };
  var wj = function(a, b, c) {
    this.Wa = a;
    this.Gc = [];
    this.bm = [];
    this.bm.push(this.Gc);
    this.Dd = b;
    this.multiline = c;
  };
  g = wj.prototype;
  g.mg = function(a) {
    this.Wa = new vj(this.Wa, a);
  };
  g.lw = function(a) {
    var b = this.Wa;
    b.parent && b.ew == a && (this.Wa = b.parent);
  };
  g.lx = function(a, b) {
    switch (a) {
      case 'p':
        this.mg(a);
        var c = b.align;
        c && (this.Wa.format.Qa = Ij(c));
        break;
      case 'b':
        this.mg(a);
        this.Wa.format.bold = !0;
        this.Wa.hi(this.Dd);
        break;
      case 'i':
        this.mg(a);
        this.Wa.format.italic = !0;
        this.Wa.hi(this.Dd);
        break;
      case 'u':
        this.mg(a);
        this.Wa.format.vb = !0;
        break;
      case 'a':
        this.mg(a);
        if ((c = b.href)) this.Wa.format.url = c;
        if ((c = b.target)) this.Wa.format.target = c;
        break;
      case 'br':
      case 'sbr':
        this.tn();
        break;
      case 'font':
        this.mg(a);
        if ((c = b.color)) this.Wa.format.color = Ai(c);
        (c = b.face) && this.Wa.hi(this.Dd, c);
        c = Number(b.size);
        c == c && (this.Wa.format.size = 20 * c);
        c = Number(b.letterspacing);
        c == c && (this.Wa.format.letterSpacing = 20 * c);
    }
  };
  g.Yt = function(a) {
    switch (a) {
      case 'p':
        this.multiline && this.tn();
    }
    this.lw(a);
  };
  g.tn = function() {
    if (this.Gc.length) {
      var a = this.Gc.length;
      a && (this.Gc[a - 1].Ej = !0);
      do {
        a--;
        var b = this.Gc[a];
        b.Bc(b.ua.replace(/\s+$/g, ''));
      } while (0 < a && !this.Gc[a].ua.length);
    } else this.Gc.push(this.Wa.wh(''));
    this.Gc = [];
    this.bm.push(this.Gc);
  };
  g.$s = function(a) {
    this.Gc.push(this.Wa.wh(a));
  };
  tj.prototype.Ad = function(a, b, c, d) {
    if (this.yj(a, b)) {
      if (this.Xh || c(this)) return this;
      a = new Ic(a, b);
      a.gc(this.ka());
      for (b = 0; b < this.links.length; b++)
        if (this.links[b].An.contains(a.x, a.y)) return this;
      return d;
    }
    return null;
  };
  tj.prototype.uu = function(a) {
    var b = this.Qc[a];
    if (!b) return null;
    for (var c = (a = 0), d = 0, e = 0, f = 0, h = 0; h < b.length; h++) {
      var k = b[h].format.cp(),
        m = b[h].format.size,
        n = b[h].format.leading;
      a = Math.max(a, ((k ? k.ascent / k.emSquareSize : 0.9) * m) | 0);
      c = Math.max(c, ((k ? k.descent / k.emSquareSize : 1 - 0.9) * m) | 0);
      d = Math.max(d, n);
      e = Math.max(e, (n + (k ? k.lineHeight : 1.14) * m) | 0);
      f += b[h].K() | 0;
    }
    b = hj(this).l + 40 + b[0] ? b[0].format.leftMargin : 0;
    return { ascent: a, descent: c, leading: d, height: e, width: f, x: b };
  };
  var nh = function(a, b, c) {
    fj.call(this, b, a, c);
  };
  v(nh, fj);
  nh.prototype.re = function() {
    return this.definition.re(this);
  };
  nh.prototype.zf = function() {
    var a = this.definition;
    return a.bounds && a.bounds.length ? a.bounds[0] : a.re(this);
  };
  nh.prototype.ho = function(a) {
    var b = this.definition.Qs(this);
    a.eh(b.Yb(this.wa()));
  };
  nh.prototype.$j = function(a) {
    a != this.Hd() && (this.u(512), this.Cb());
    nh.O.$j.call(this, a);
  };
  var Jj = function(a, b) {
    var c = new gh(-1, [], null, [], []);
    fj.call(this, a, c, b);
    this.clear();
    this.lh = this.Df = null;
    this.Fa();
  };
  v(Jj, nh);
  g = Jj.prototype;
  g.Ka = function() {
    return this;
  };
  g.duplicate = function() {
    var a = new Jj(this.c);
    a.definition = Ra(this.definition);
    return a;
  };
  g.clear = function() {
    this.definition.fillstyles = [];
    this.definition.linestyles = [];
    this.definition.paths = [];
    this.Mc = this.Nc = this.Sd = this.Td = 0;
    this.u(1024);
    this.Cb();
  };
  g.He = function() {
    var a = this.Df,
      b = this.lh,
      c;
    b && (c = b);
    a && a != b && (c = a);
    return c ? (this.u(1024), this.Cb(), c.data.value) : new Ni();
  };
  g.moveTo = function(a, b) {
    l(a) &&
      l(b) &&
      ((a *= 20),
      (b *= 20),
      this.He().moveTo(a, b),
      (this.Mc = a),
      (this.Nc = b),
      (this.Sd = a),
      (this.Td = b));
  };
  g.lineTo = function(a, b) {
    l(a) &&
      l(b) &&
      ((a *= 20),
      (b *= 20),
      a != this.Mc || b != this.Nc || this.lh
        ? this.He().lineTo(a, b)
        : this.He().close(),
      (this.Sd = a),
      (this.Td = b));
  };
  g.pb = function(a, b, c, d) {
    l(c) &&
      l(d) &&
      l(a) &&
      l(b) &&
      ((a *= 20),
      (b *= 20),
      (c *= 20),
      (d *= 20),
      this.He().pb(a, b, c, d),
      (this.Sd = c),
      (this.Td = d));
  };
  g.Vt = function(a, b, c, d) {
    l(a) &&
      l(b) &&
      l(c) &&
      l(d) &&
      ((a *= 20),
      (b *= 20),
      (c *= 20),
      (d *= 20),
      this.He()
        .moveTo(a, b)
        .lineTo(a, b + d)
        .lineTo(a + c, b + d)
        .lineTo(a + c, b)
        .lineTo(a, b),
      (this.Mc = this.Sd = a),
      (this.Nc = this.Td = b));
  };
  var Kj = Math.sqrt(2);
  g = Jj.prototype;
  g.Ao = function(a, b, c, d) {
    if (l(a) && l(b) && l(c) && l(d)) {
      a *= 20;
      b *= 20;
      c *= 20;
      d *= 20;
      var e = c / Kj,
        f = d / Kj,
        h = c * (Kj - 1),
        k = d * (Kj - 1);
      this.He()
        .moveTo(a + c, b)
        .pb(a + c, b + k, a + e, b + f)
        .pb(a + h, b + d, a, b + d)
        .pb(a - h, b + d, a - e, b + f)
        .pb(a - c, b + k, a - c, b)
        .pb(a - c, b - k, a - e, b - f)
        .pb(a - h, b - d, a, b - d)
        .pb(a + h, b - d, a + e, b - f)
        .pb(a + c, b - k, a + c, b);
      this.Mc = this.Sd = a + c;
      this.Nc = this.Td = b;
    }
  };
  g.Wt = function(a, b, c, d, e, f) {
    l(a) &&
      l(b) &&
      l(c) &&
      l(d) &&
      l(e) &&
      l(f) &&
      (e && f ? (e > c && (e = c), f > d && (f = d)) : (e = f = 0),
      (a *= 20),
      (b *= 20),
      (c *= 20),
      (d *= 20),
      (e *= 10),
      (f *= 10),
      this.He()
        .moveTo(a + c, b + d - f)
        .pb(a + c, b + d, a + c - e, b + d)
        .lineTo(a + e, b + d)
        .pb(a, b + d, a, b + d - f)
        .lineTo(a, b + f)
        .pb(a, b, a + e, b)
        .lineTo(a + c - e, b)
        .pb(a + c, b, a + c, b + f)
        .lineTo(a + c, b + d - f),
      (this.Mc = this.Sd = a + c),
      (this.Nc = this.Td = b + d - f));
  };
  g.ci = function(a, b, c, d) {
    var e = this.definition.paths,
      f = e[e.length - 1],
      h = new Ni();
    h.moveTo(a, b);
    a = new oh(new Ig(h), d, c);
    f && f.data.value.Na() ? (e[e.length - 1] = a) : e.push(a);
    return a;
  };
  g.$v = function(a) {
    var b = this.Df,
      c = this.lh;
    if (c) {
      if (c.data.value.Na()) {
        b = c;
        b.line = a;
        this.Df = b;
        return;
      }
      b == c &&
        ((b = this.ci(0, 0, c.line, void 0)), (b.data = c.data), delete c.line);
    }
    this.Df = b = l(a) ? this.ci(this.Sd, this.Td, a, void 0) : null;
  };
  g.bg = function(a) {
    var b = this.lh;
    b && b.data.value.close();
    var c = this.Df;
    b && c && c != b
      ? (c.data.value.lineTo(this.Mc, this.Nc),
        l(a) ? (c = b = this.ci(this.Mc, this.Nc, c.line, a)) : (b = null))
      : ((b = l(a) ? this.ci(this.Mc, this.Nc, void 0, a) : null),
        c &&
          (b
            ? ((b.line = c.line), (c = b))
            : (c = this.ci(this.Mc, this.Nc, c.line, void 0))));
    this.lh = b;
    this.Df = c;
    this.Sd = this.Mc;
    this.Td = this.Nc;
    this.u(1024);
  };
  var Lj = { round: 'round', none: 'butt', square: 'square' },
    Mj = { round: 'round', bevel: 'bevel', miter: 'miter' };
  Jj.prototype.Pp = function(a, b, c, d, e, f, h, k) {
    var m = void 0;
    a *= 20;
    if (a == a) {
      var n = 0;
      d && (n |= 1);
      e &&
        'normal' != e &&
        ('horizontal' != e && (n |= 4), 'vertical' != e && (n |= 2));
      d = this.definition.linestyles;
      m = d.length;
      f = Lj[f] || 'round';
      h = Mj[h] || 'round';
      d.push(new lh(new Ig(Xc(b, c)), new Ig(a), f, f, h, k, n));
    }
    this.$v(m);
  };
  var Nj = function(a, b, c) {
    return b && ((a = a.indexOf(b)), 0 <= a) ? a : c;
  };
  Jj.prototype.Bn = function(a, b) {
    if (l(a)) {
      var c = this.definition.fillstyles;
      c.push(new Ui(new Ig(Xc(a, b))));
      this.bg(c.length - 1);
    } else this.bg();
  };
  Jj.prototype.Cn = function(a, b, c, d, e, f, h, k) {
    if (l(b) && da(b) && da(c) && da(d)) {
      for (var m = b.length, n = [], t = 0; t < m; ++t) {
        var p = Number(d[t]);
        0 <= p &&
          255 >= p &&
          n.push({ color: new Ig(Xc(b[t], c[t])), offset: new Ig(p / 255) });
      }
      var r;
      switch (a) {
        case 'linear':
          r = Wi;
          break;
        case 'radial':
          r = Yi;
      }
      r
        ? ((a = this.definition.fillstyles),
          a.push(
            new r(
              e ? new Ig(e.wm(16384, 16384)) : Oj,
              n,
              Nj(Ri, f, 0),
              Nj(Si, h, 0),
              new Ig(k || 0)
            )
          ),
          this.bg(a.length - 1))
        : this.bg();
    } else this.bg();
  };
  Jj.prototype.Go = function() {
    this.bg();
  };
  var Pj = function(a, b, c, d) {
    sj.call(this, b, a, c, d);
    this.Ap();
    this.Ij = !1;
    this.rh = {};
    this.If = null;
    this.c.yw(this);
    this.nc |= 127;
    this.vl = 0;
  };
  v(Pj, sj);
  g = Pj.prototype;
  g.Ap = function() {
    this.zp = [];
    this.zj = this.ro = this.ja = -1;
    this.Mh = !1;
    this.Vg = !0;
    this.Vo = [];
  };
  g.um = function(a) {
    this.je();
    this.Lq();
    this.Ap();
    for (
      var b = this.t, c = Object.getOwnPropertyNames(b), d = 0;
      d < c.length;
      ++d
    )
      Ci(c[d]) || delete b[c[d]];
    this.definition = a;
    this.Vb = !0;
    this.ia();
  };
  g.ia = function(a, b) {
    this.Vb && this.th(7);
    Pj.O.ia.call(this, a, b);
  };
  g.ah = function() {
    this.Xi(0, !0);
    Pj.O.ah.call(this);
    this.Ij || ((this.Ij = !0), this.play(), this.wn());
  };
  g.je = function() {
    this.Ij && (this.G.je(), this.fireEvent(new Jc(5)), (this.Ij = !1));
    Pj.O.je.call(this);
  };
  g.play = function() {
    this.Mh = !0;
  };
  g.sr = function(a) {
    this.Vg = a;
  };
  g.Xl = function() {
    return l(this.ef) ? this.ef : this.Vg;
  };
  g.an = function() {
    this.G.Ot();
    this.Mh && this.wn();
  };
  g.wn = function() {
    var a = this.ja + 1;
    if (a >= this.definition.frameCount) {
      if (this.c.Ja === this && this.c.ox) return;
      a = 0;
    }
    (0 == this.definition.frameCount && this.c.Ja == this) || this.Qp(a);
  };
  g.stop = function() {
    this.Mh = !1;
  };
  g.Pb = function(a, b) {
    0 <= a &&
      (a >= this.definition.frameCount
        ? this.Rp(this.definition.frameCount - 1)
        : (this.Qp(a), this.Xi(this.ja, !0)),
      (this.Mh = b));
  };
  g.dl = function(a, b) {
    this.zj = a;
    this.tv = b;
    var c = this;
    this.J().ng(function() {
      -1 != c.zj && c.Pb(c.zj, c.tv);
    });
  };
  g.ow = function() {
    var a = this.definition.$b.Fu(this.ja);
    0 > a && (a = 0);
    this.dl(a, !0);
  };
  g.cw = function() {
    var a = this.definition.$b,
      b = a.Bu(this.ja),
      a = a.lc,
      a = a.length ? a[a.length - 1].offset : 0;
    b > a && (b = a);
    this.dl(b, !0);
  };
  g.Wf = function(a, b) {
    var c = this.definition.$b,
      d;
    if (l(b)) {
      if (((d = c.jr[b]), !l(d))) return;
    } else d = c.np(this.ja);
    var e = Number(a) + d - 1;
    return 0 <= e && e == Math.floor(e)
      ? e
      : (e = c.cj[a]) && c.np(e) != d
      ? void 0
      : e;
  };
  g.ou = function(a) {
    return this.definition.tags[a];
  };
  g.Qp = function(a) {
    this.zj = -1;
    if (a != this.ja)
      if (a > this.ja) {
        if (
          (this.Rp(a - 1),
          (this.ja = a),
          this.Lo(this.ja),
          (a = this.definition.tags[this.ja]))
        )
          for (var b = 0; b < a.length; b++) a[b].Ae(this), a[b].pl(this);
      } else {
        this.ja = a;
        a = this.definition.Np[this.ja];
        var c = [];
        if (a)
          for (b = 0; b < a.length; b++) {
            var d = a[b].uh(this);
            d && c.push(d);
            a[b].pl(this);
          }
        var e = this;
        this.G.bu(function(a) {
          if (!(0 > a.depth) || 0 <= c.indexOf(a)) return !0;
          e.u(16);
          a.je();
          return !1;
        });
        this.Aa & 16 && this.G.Ks(this);
      }
  };
  g.Rp = function(a) {
    for (; a > this.ja; ) {
      this.ja++;
      this.Lo(this.ja);
      var b = this.definition.tags[this.ja];
      if (b) for (var c = 0; c < b.length; c++) b[c].Ae(this);
    }
  };
  g.Xi = function(a, b) {
    var c = l(a) ? a : this.ja;
    b ? this.J().ng(na(this.Ko, this, c)) : this.Ko(c);
  };
  g.Ko = function(a) {
    var b = this.Vo[a];
    if (q(b) && this.ro != a) {
      var c = this;
      this.J().Jo(b, function() {
        c.stop();
      });
    }
    this.ro = a;
  };
  g.Rn = function(a) {
    var b = this.vl != a;
    this.vl = a;
    return b;
  };
  g.$u = function() {
    return ++this.vl;
  };
  g.Lo = function(a) {
    if (!this.zp[a]) {
      for (var b = this.definition.Dp[a], c = 0; b && c < b.length; c++)
        b[c].ql(this);
      this.zp[a] = !0;
    }
  };
  g.J = function() {
    return this.c.J();
  };
  g.fj = function() {
    return this.c.fj();
  };
  g.Le = function() {
    return this.c.Le();
  };
  g.duplicate = function(a, b, c) {
    var d = new Pj(this.definition, this.c, this.kg + '_d');
    d.Vb = !0;
    d.Hb(b);
    d.setTransform(this.wa());
    this.If && ((d.If = this.If.duplicate(d)), d.Wc(d.If, -16385));
    d.ia();
    a.de(c);
    a.Wc(d, c);
    d.Gb(this.nb);
    return d;
  };
  g.Ka = function() {
    var a = this.If;
    a || ((this.If = a = new Jj(this.c)), (a.Lc = !0), this.Wc(a, -16385));
    return a;
  };
  g.tb = function(a) {
    if (this.Vg && a != this.mc) {
      var b;
      switch (a) {
        case 1:
          b = '_up';
          break;
        case 4:
          b = '_down';
          break;
        case 2:
          b = '_over';
      }
      b &&
        ((b = this.definition.$b.cj[b]),
        l(b) && (this.Pb(b, !1), this.c.H.$h()));
    }
    Pj.O.tb.call(this, a);
  };
  g.Sp = function(a, b, c) {
    var d = new Qj();
    this.Ag(Rj(a));
    var e = this;
    d.Va = function(a) {
      Sj(e, a);
    };
    Tj(a, this.c, b, c, d);
  };
  g.mu = function() {
    var a = this.c.Eb,
      b = this;
    return this.c.H.ep(a.x, a.y, function(a) {
      return !b.contains(a) && a instanceof qj;
    });
  };
  g.gj = function() {
    return this.Vg ? Pj.O.gj.call(this) : 'default';
  };
  g.qo = function() {
    var a = this.definition.$b;
    return a.Of[a.pu(this.ja)];
  };
  var Uj = function(a, b, c, d) {
    fh.call(this, a, b, c, d);
    this.Vm = {};
  };
  v(Uj, fh);
  g = Uj.prototype;
  g.ia = function() {
    Uj.O.ia.call(this);
    this.gf(this.G, 1);
    this.gf(this.Ld, 8);
  };
  g.la = function() {
    Uj.O.la.call(this);
  };
  g.dx = function(a, b) {
    b && b.zg(this);
    this.Vm[a] = b;
    (a != this.mc && 8 != a) || this.gf(8 == a ? this.Ld : this.G, a);
  };
  g.Ju = function(a) {
    return this.Vm[a];
  };
  g.gf = function(a, b) {
    var c = this.Vm[b];
    c != a.Ic(1) && (a.Pq(1), c && a.tm(c, 1), this.u(16));
  };
  var Wj = function(a, b) {
    sj.call(this, a, new Vj(0, 0, null, null), 'stage');
    this.backgroundColor = Cg(b.backgroundColor).toString();
    this.fk = b.frameSize.xmax / 20;
    this.ek = b.frameSize.ymax / 20;
    this.yc = 'showAll';
    this.Rk = this.Qk = this.ed = this.fd = this.vd = 0;
    this.Rm = Hc;
    this.Ac = this.zc = 1;
    this.u(1572864);
  };
  v(Wj, sj);
  g = Wj.prototype;
  g.Ad = function(a, b, c, d, e) {
    a = Wj.O.Ad.call(this, a, b, c, d, e);
    a === this.c.Ja && (a = null);
    return !a && c(this) ? this : a;
  };
  g.Dr = function(a) {
    this.yc != a &&
      ((this.yc = a),
      this.hn(),
      'noScale' == this.yc &&
        ((a = this.ed != this.ek),
        (this.fd != this.fk || a) && this.c.J().nm()));
  };
  g.kr = function(a) {
    a = a.toUpperCase();
    var b = 0;
    -1 < a.indexOf('L') && (b |= 1);
    -1 < a.indexOf('T') && (b |= 2);
    -1 < a.indexOf('R') && (b |= 4);
    -1 < a.indexOf('B') && (b |= 8);
    this.vd != b && ((this.vd = b), this.hn());
  };
  g.ru = function() {
    return this.vd & 1 ? 0 : this.vd & 4 ? 2 : 1;
  };
  g.Lu = function() {
    return this.vd & 2 ? 0 : this.vd & 8 ? 2 : 1;
  };
  g.cs = function() {
    var a = this.c.Pc.offsetWidth,
      b = this.c.Pc.offsetHeight,
      c,
      d = this.c.Pc,
      e = (c = 0);
    if (d.offsetParent) {
      do (c += d.offsetLeft), (e += d.offsetTop);
      while ((d = d.offsetParent));
    }
    c = [c, e];
    d = c[0];
    c = c[1];
    e = !1;
    if (this.Qk != d || this.Rk != c) (this.Qk = d), (this.Rk = c), (e = !0);
    if (this.fd != a || this.ed != b)
      (this.fd = a),
        (this.ed = b),
        'noScale' == this.yc && this.c.J().nm(),
        (e = !0);
    e && this.hn();
  };
  g.hn = function() {
    var a = this.fd,
      b = this.ed,
      c = this.fk,
      d = this.ek;
    this.zc = c ? a / c : 1;
    this.Ac = d ? b / d : 1;
    switch (this.yc) {
      case 'noScale':
        this.zc = this.Ac = 1;
        break;
      case 'showAll':
        this.zc < this.Ac ? (this.Ac = this.zc) : (this.zc = this.Ac);
        break;
      case 'noBorder':
        this.zc > this.Ac ? (this.Ac = this.zc) : (this.zc = this.Ac);
    }
    var e = 0,
      f = 0;
    switch (this.ru()) {
      case 1:
        e = (a - c * this.zc) / 2;
        break;
      case 2:
        e = a - c * this.zc;
    }
    switch (this.Lu()) {
      case 1:
        f = (b - d * this.Ac) / 2;
        break;
      case 2:
        f = b - d * this.Ac;
    }
    this.Rm = Vc(this.zc / 20, 0, 0, this.Ac / 20, e, f);
    this.u(524288);
  };
  g.Pd = function() {
    return !0;
  };
  g.wg = function(a) {
    this.u(524288);
    this.backgroundColor = a ? a : 'rgba(0,0,0,0)';
  };
  g.$h = function() {
    this.u(1048576);
  };
  g.Yo = function(a) {
    return this.ep(a.x, a.y, function(a) {
      return a instanceof qj && a.rj && a.Yf;
    });
  };
  g.gj = function() {
    return 'default';
  };
  var Xj = { ez: 'fullScreen', fz: 'fullScreenInteractive', IA: 'normal' };
  var Yj = function(a, b, c) {
    fj.call(this, b, a, c);
  };
  v(Yj, fj);
  Yj.prototype.zf = function() {
    return this.definition.bounds;
  };
  Yj.prototype.re = function() {
    return this.definition.gu();
  };
  var sh = function(a, b, c) {
    fj.call(this, b, a, c);
  };
  v(sh, fj);
  sh.prototype.sa = function() {
    return !0;
  };
  sh.prototype.zf = function() {
    return new ad(0, 0, this.definition.width, this.definition.height);
  };
  var Zj = {};
  var ak = function() {
    this.hd = {};
  };
  Yf.C(fj, ak);
  Yf.C(qj, ak);
  var bk = new Wf(15);
  g = ak.prototype;
  g.Lb = function(a, b) {
    b.Zu(lj(a)) &&
      (b.Nd() ? this.qh(a, b) : (a.jf || b.Se()) && this.Qi(a, b),
      b.Se() || (a.Aa = 0));
  };
  g.qh = function(a, b) {
    var c = this.iu(a, b);
    c ? this.Dw(c, a, b) : this.yb(a, b);
  };
  g.iu = function(a, b) {
    if (b.Se() || b.ai || !this.Pm(a)) return null;
    var c = b.Hl(a.ka()),
      d = c.n * c.n + c.o * c.o,
      e = c.i * c.i + c.j * c.j;
    if (
      1.2 * d < e ||
      1.2 * e < d ||
      0.001 < Math.abs(c.n * c.j + c.o * c.i) + Math.abs(c.n * c.o + c.j * c.i)
    )
      return null;
    c = this.hd[a.definition.en];
    c || ((c = d), (this.hd[a.definition.en] = c));
    d = Math.ceil(Math.log(d / c) / 2 / Math.log(1.4));
    e = a.ld();
    if (e.Te() || b.Nd()) e = $c;
    var f = a.definition.en + ';' + d + ';' + b.Nd() + e.qx(),
      h = bk.Ta(f);
    !h &&
      bk.Ws() &&
      (h = this.nw(a, b, Math.pow(1.4, d) * Math.sqrt(c), e)) &&
      bk.add(f, h);
    return h;
  };
  g.Pm = function() {
    return !1;
  };
  g.Dw = function(a, b, c) {
    var d = c.rc(b.ka());
    c.Nd() || ((b = b.ld()), b.Te() && (d.globalAlpha = b.Pg(1)));
    b = a.Ps;
    var e = (c = a.oj);
    d.drawImage(
      a.oj,
      0,
      0,
      c.Xj || c.width,
      e.Wj || e.height,
      b.l,
      b.m,
      b.width(),
      b.height()
    );
    d.globalAlpha = 1;
  };
  g.nw = function(a, b, c, d) {
    var e = Xi(a).clone();
    e.add(kj(a));
    e.scale(c, c);
    e.hw(1);
    e.tl();
    if (e.Na() || 1e6 < e.width() * e.height()) return null;
    var f = b.qa.Ia(e.width(), e.height(), !0),
      h = new ag(f, e.l, e.m, c, c, b.jg, b.qa, b.flags),
      k = this;
    a.detach(Hc, d, function() {
      k.yb(a, h);
    });
    e.scale(1 / c, 1 / c);
    return new Xf(f, e, d);
  };
  g.yb = function() {};
  g.Qi = function(a, b) {
    var c = a.jd;
    c
      ? ((b = b.Pr(Xi(c), c.ka())),
        Yf.yd(c).Lb(c, b),
        (b = b.xn()),
        this.qh(a, b),
        b.ml())
      : this.qh(a, b);
  };
  g.la = function() {};
  var ck = function() {
    this.hd = {};
  };
  v(ck, ak);
  Yf.C(pj, ck);
  ck.prototype.yb = function(a, b) {
    var c = a.Jb,
      d = b.rc(a.ka());
    b.xj()
      ? d.drawImage(c.Ia(), 0, 0, 20 * c.K(), 20 * c.$())
      : d.fillRect(0, 0, 20 * c.K(), 20 * c.$());
  };
  var dk = function() {
    this.hd = {};
  };
  v(dk, ak);
  Yf.C(tj, dk);
  dk.prototype.yb = function(a, b) {
    var c = b.rc(a.ka()),
      d = hj(a);
    if (b.Se()) c.fillRect(d.l, d.m, d.width(), d.height());
    else {
      var e = b.Nd();
      if (!e) {
        c.save();
        c.beginPath();
        c.rect(d.l, d.m, d.width(), d.height());
        var d = a.Vb ? void 0 : a.ld(),
          f;
        a.ui && ((f = Cg(a.ti, d)), (c.fillStyle = f.toString()), c.fill());
        a.yi &&
          ((f = Cg(a.xi, d)),
          (c.strokeStyle = f.toString()),
          (c.lineJoin = 'miter'),
          ek(c));
        c.clip();
      }
      a.Uq(new fk(c, a, e));
      e || c.restore();
    }
  };
  var fk = function(a, b, c) {
    this.Ht = a;
    this.at = c;
    this.oh = b;
  };
  fk.prototype.Sq = function(a, b, c, d, e) {
    var f = this.Ht,
      h = this.oh,
      k = a.format,
      m = k.size,
      n = k.letterSpacing,
      t = a.ua;
    if (!this.at) {
      var p = Cg(k.color),
        p = h.ld().apply(p);
      f.fillStyle = p.he();
    }
    h = k.cp();
    c += d * (h ? h.ascent / h.emSquareSize : 0.9);
    if (h) (t = h.Dm(t)), h.Rq(f, m, t, h.yv(b, m, n, e, t), c, Hc, null, null);
    else if ((k.mb(f), n))
      for (e = b, m = 0; m < t.length; m++)
        (p = t[m]), f.fillText(p, e, c), (e += f.measureText(p).width + n);
    else f.fillText(t, b, c);
    k.vb &&
      ((d = c + (d * (h ? h.descent / h.emSquareSize : 1 - 0.9)) / 2),
      f.beginPath(),
      f.moveTo(b, d),
      f.lineTo(b + a.K(), d),
      ek(f));
  };
  var ek = function(a) {
    a.save();
    a.transform(1, 0, 0, 1, 0, 0);
    a.lineWidth = 10;
    a.stroke();
    a.restore();
  };
  var Zf = new Mf('canvas isolate'),
    gk = function(a) {
      this.oh = a;
      this.Ih = null;
    };
  Zf.C(nh, gk);
  Zf.C(Jj, gk);
  Zf.C(Yj, gk);
  Zf.C(tj, gk);
  Zf.C(Pj, gk);
  Zf.C(fh, gk);
  Zf.C(pj, gk);
  Zf.C(sh, gk);
  Zf.C(Uj, gk);
  Zf.C(Wj, gk);
  gk.prototype.Lb = function(a, b) {
    if (a.jf) {
      var c = a.gp(),
        d = this.Ih,
        e = b.Gk(lj(a), Hc, kj(a));
      if (!d || a.Aa || b.fv() || !d.ov(e, b))
        d && d.af(),
          (d = this.Ih = b.hh(e, !0)),
          this.Qi(a, d),
          this.Is(a, d),
          c.Te() || ig(d, c);
      e = 1;
      c.Te() && (e = c.Pg(1));
      a.qb ? b.gm(d, e) : b.Os(d, a.nu(), e);
    } else this.Ih && (this.Ih = this.Ih.af());
    a.Aa = 0;
  };
  gk.prototype.Is = function(a, b) {
    for (var c = a.zb, d = 0; d < c.length; ++d) c[d].Ke(Yf).apply(c[d], b);
  };
  gk.prototype.Qi = function(a, b) {
    var c = a.jd,
      d = Yf.yd(a);
    c ? (c.Pd() ? (d.qh(a, b), $f(c).Lb(c, b)) : d.Qi(a, b)) : d.qh(a, b);
  };
  gk.prototype.la = function() {};
  var hk = function() {
    this.hd = {};
  };
  v(hk, ak);
  Yf.C(nh, hk);
  Yf.C(Jj, hk);
  hk.prototype.yb = function(a, b) {
    for (
      var c = a.wa(),
        d = a.ka(),
        e = a.ld(),
        f = a.definition,
        h = b.rc(d),
        k = 0;
      k < f.paths.length;
      k++
    ) {
      var m = f.paths[k],
        n = m.data.Ta(a).slice(b.ai, c),
        t = f.linestyles[m.line],
        m = f.fillstyles[m.fill];
      h.beginPath();
      n.Co(h);
      m && (b.xj() ? m.mb(a, b, e) : h.fill());
      t && !b.Nd() && (b.Se() ? t.Wm(a, b, h, n, d) : t.yn(a, b, h, n, d, e));
    }
  };
  hk.prototype.Pm = function(a) {
    return a.definition.Gx;
  };
  var ik = function(a) {
    this.c = a;
    this.bd = document.createElement('canvas');
    this.qa = null;
    this.Vq = 0;
    this.Wq = new ad(0, 0, 0, 0);
  };
  Yf.Iq(ik);
  ik.prototype.si = function(a) {
    a.appendChild(this.bd);
  };
  ik.prototype.Tq = function() {
    var a = this.c,
      b = a.H;
    if (b.Aa & 1048576) {
      b.Aa &= -1048577;
      var c = b.Aa,
        d = nd(),
        e = a.Mu();
      if (!e.Na()) {
        var f = Math.max(b.fd, b.ed);
        2048 < f * d && (d = 2048 / f);
        (this.Vq == d && this.Wq.pt(e)) || (c |= 524288);
        c &&
          (this.qa || (this.qa = new Qf(b.fd * d, b.ed * d)),
          (this.bd.width = e.width() * d),
          (this.bd.height = e.height() * d),
          (this.bd.style.width = e.width() + 'px'),
          (this.bd.style.height = e.height() + 'px'),
          (this.bd.style.position = 'relative'),
          (this.bd.style.left = e.l + 'px'),
          (this.bd.style.top = e.m + 'px'),
          (b = b.Rm),
          (b = new ag(
            this.bd,
            e.l * d - b.q,
            e.m * d - b.s,
            b.n * d,
            b.i * d,
            d,
            this.qa
          )),
          this.Cw(b),
          (this.Vq = d),
          (this.Wq = e),
          Yf.yd(a.H).Lb(a.H, b, 0),
          bk.Wg(),
          this.qa.Wg());
      }
    }
  };
  ik.prototype.Cw = function(a) {
    a.clear(this.c.H.backgroundColor);
  };
  ik.prototype.la = function() {
    this.c.H.Jq();
  };
  var jk = function() {
    this.hd = {};
  };
  v(jk, ak);
  Yf.C(Yj, jk);
  jk.prototype.yb = function(a, b) {
    for (
      var c = a.ka(),
        d = a.ld(),
        e = a.definition,
        f = e.wx,
        h = b.Ne(),
        c = b.Hl(c),
        k = e.matrix.multiply(c),
        d = b.xj() ? d : null,
        m = 0;
      m < e.records.length;
      m++
    )
      e.records[m].Ew(h, k, d, f);
    b.Se() &&
      f &&
      ((e = e.bounds),
      e.Na() || (c.mb(h), h.fillRect(e.l, e.m, e.D - e.l, e.F - e.m)));
  };
  jk.prototype.Pm = function() {
    return !0;
  };
  var kk = function() {
    this.hd = {};
  };
  v(kk, ak);
  Yf.C(sh, kk);
  kk.prototype.yb = function() {};
  var lk = function() {};
  v(lk, yg);
  Yf.C(me, lk);
  lk.prototype.apply = function(a, b) {
    var c = b.K(),
      d = b.$(),
      e = b.qa.Ia(c, d),
      f = e.getContext('2d'),
      h = b.getImageData();
    Bg(a, h.data, c, d, 20 * b.ib, 20 * b.jb);
    for (
      var k = Cg(a.highlight),
        m = Cg(a.shadow),
        c = h.data,
        d = k.Fb,
        n = k.Ab,
        t = k.wb,
        k = k.Vc,
        p = m.Fb,
        r = m.Ab,
        u = m.wb,
        m = m.Vc,
        y = c.length,
        k = 2 * k,
        m = 2 * m,
        z = 0;
      z < y;
      z += 4
    )
      127.5 < c[z + 3]
        ? ((c[z + 0] = d),
          (c[z + 1] = n),
          (c[z + 2] = t),
          (c[z + 3] = (c[z + 3] - 127.5) * m))
        : ((c[z + 0] = p),
          (c[z + 1] = r),
          (c[z + 2] = u),
          (c[z + 3] = (127.5 - c[z + 3]) * k));
    zd(f, h, 0, 0);
    b.Di(e, a.ea.dd, void 0);
    b.qa.od(e);
  };
  var mk = function() {};
  v(mk, yg);
  Yf.C(se, mk);
  mk.prototype.apply = function(a, b) {
    var c = a.distance,
      d = 2 < c ? 0.5 : 1,
      e = 20 * b.ib * d,
      f = 20 * b.jb * d,
      h = Math.ceil(b.K() * d),
      k = Math.ceil(b.$() * d),
      m = Math.cos(a.angle) * c * e,
      n = Math.sin(a.angle) * c * f,
      c = b.qa.Ia(h, k, !1, !0),
      t = c.getContext('2d');
    t.globalCompositeOperation = 'copy';
    t.drawImage(b.Ia(), 0, 0, b.K(), b.$(), m, n, h, k);
    t.globalCompositeOperation = 'source-over';
    m = t.getImageData(0, 0, h, k);
    n = Cg(a.color);
    if ('inner' == a.ea.type) {
      Ag(a, m.data, h, k, e, f, 3, 1);
      for (
        var e = m.data,
          f = n.Fb,
          h = n.Ab,
          k = n.wb,
          n = n.Vc,
          p = a.strength,
          r = e.length,
          u = 0;
        u < r;
        u += 4
      )
        (e[u + 0] = f),
          (e[u + 1] = h),
          (e[u + 2] = k),
          (e[u + 3] = (255 - e[u + 3]) * p),
          (e[u + 3] *= n);
      zd(t, m, 0, 0);
    } else
      Ag(a, m.data, h, k, e, f, 3, a.strength),
        zd(t, m, 0, 0),
        (t.globalCompositeOperation = 'source-in'),
        (n =
          fb && kb && 254 < n.Fb && 254 < n.Ab && 254 < n.wb
            ? new Wc(254, 254, 254, n.Vc)
            : n),
        (t.fillStyle = n.he()),
        t.fillRect(0, 0, h, k);
    b.Di(c, a.ea.dd, 1 / d);
    b.qa.od(c);
  };
  var nk = function() {};
  v(nk, yg);
  Yf.C(we, nk);
  nk.prototype.apply = function(a, b) {
    var c = b.K(),
      d = b.$(),
      e = b.qa.Ia(c, d),
      f = e.getContext('2d'),
      h = b.getImageData();
    Bg(a, h.data, c, d, 20 * b.ib, 20 * b.jb);
    Dg(h.data, a.Rb, a.Qb, a.Sb);
    zd(f, h, 0, 0);
    b.Di(e, a.ea.dd, void 0);
    b.qa.od(e);
  };
  var ok = function() {};
  v(ok, yg);
  Yf.C(Ae, ok);
  ok.prototype.apply = function(a, b) {
    var c = 20 * b.ib,
      d = 20 * b.jb,
      e = b.K(),
      f = b.$(),
      h = a.distance,
      k = Math.cos(a.angle) * h * c,
      m = Math.sin(a.angle) * h * d,
      h = b.qa.Ia(e, f),
      n = h.getContext('2d');
    n.drawImage(b.Ia(), k, m);
    k = n.getImageData(0, 0, e, f);
    Ag(a, k.data, e, f, c, d, 3, a.strength);
    Dg(k.data, a.Rb, a.Qb, a.Sb);
    zd(n, k, 0, 0);
    b.Di(h, a.ea.dd, void 0);
    b.qa.od(h);
  };
  var pk = function() {};
  Fg.C(fj, pk);
  Fg.C(Jj, pk);
  Fg.C(Yj, pk);
  Fg.C(pj, pk);
  Fg.C(sh, pk);
  Fg.C(nh, pk);
  pk.prototype.Lb = function(a, b) {
    if (a.Aa) {
      a.gp();
      this.yb(a, b);
      if (a.jd) {
        var c = a.jd;
        c.Ke(Fg).Lb(c, 16 | b);
      }
      a.Aa = 0;
    }
  };
  pk.prototype.yb = function() {};
  pk.prototype.la = function() {};
  var qk = function() {};
  v(qk, pk);
  Fg.C(sj, qk);
  Fg.C(Pj, qk);
  Fg.C(Wj, qk);
  Fg.C(fh, qk);
  Fg.C(Uj, qk);
  qk.prototype.yb = function(a, b) {
    if (a.Aa & 65552)
      for (var c = a.G.Ha; c; c = c.nextSibling) c.qb || c.Ke(Fg).Lb(c, b);
  };
  var rk = function() {};
  v(rk, pk);
  Fg.C(tj, rk);
  rk.prototype.yb = function(a) {
    a.Uq(this);
  };
  rk.prototype.Sq = function() {};
  rk.prototype.la = function() {};
  var sk = function(a) {
    this.c = a;
  };
  Fg.Iq(sk);
  sk.prototype.Tq = function() {
    var a = this.c.H;
    a.Aa & 1048576 && ((a.Aa &= -1048577), a.Aa && a.Ke(Fg).Lb(a, 0));
  };
  sk.prototype.si = function() {};
  sk.prototype.la = function() {
    this.c.H.Jq();
  };
  var tk = function() {};
  v(tk, Sg);
  g = tk.prototype;
  g.uh = function() {};
  g.ql = function() {};
  g.Ae = function() {};
  g.pl = function() {};
  g.Tk = function() {};
  g.Qg = function() {};
  var vk = function(a, b) {
    for (var c = 0; c < a.length; ++c) {
      var d = a[c];
      if (d instanceof uk && d.depth == b) return c;
    }
    return -1;
  };
  tk.prototype.Ub = function(a, b, c, d, e) {
    Li(a.tags, e, this);
  };
  var wk = function(a, b, c, d) {
    Xg.call(this, a.id);
    this.font = d || null;
    this.height = a.height;
    this.color = l(a.color) ? a.color : 4278190080;
    this.text = a.text;
    this.align = !l(a.align) || (a.html && 7 >= c) ? 0 : a.align;
    this.bounds = b;
    this.html = !!a.html;
    this.wrap = !!a.wrap;
    this.multiline = !!a.multiline;
    this.indent = a.indent;
    this.leading = a.leading;
    this.leftMargin = a.leftMargin;
    this.rightMargin = a.rightMargin;
    this.border = !!a.border;
    this.variable = a.variable || null;
    this.sa = 6 <= c;
    this.selectable = !!a.selectable;
    this.editable = !!a.editable;
    this.password = !!a.password;
    this.maxChars = a.maxChars || null;
    this.Eo = !!a.embed;
    this.autoSize = a.autoSize ? 'left' : 'none';
  };
  v(wk, Xg);
  Vg(13, function(a, b, c, d) {
    c = l(a.font) ? d.Dc.Ee(a.font) : null;
    return new wk(a, bd(a.bounds), b.Rc, c);
  });
  wk.prototype.Kb = function(a, b, c) {
    return new tj(this, a, b, c);
  };
  var Ue = function(a, b, c, d, e, f, h, k, m) {
    Xg.call(this, a);
    this.name = b;
    this.glyphs = c;
    this.emSquareSize = d;
    this.ascent = e;
    this.descent = f;
    this.bold = h;
    this.italic = k;
    this.lineHeight = (e + f) / d;
    this.Nk = {};
    for (a = 0; a < c.length; a++) this.Nk[c[a].unicode] = a;
    this.Zm = m;
  };
  v(Ue, Xg);
  var Xe = new Ue(-1, '', [], 1024, 0, 0, !1, !1);
  Vg(5, function(a) {
    for (
      var b = a.emSquareSize ? a.emSquareSize : 1024, c = [], d = 0;
      a.glyphs && d < a.glyphs.length;
      d++
    ) {
      var e = a.glyphs[d];
      c.push(new xk(Qi(e.data), e.unicode, e.advance));
    }
    return new Ue(
      a.id,
      a.name,
      c,
      b,
      a.ascent ? a.ascent : 0,
      a.descent ? a.descent : 0,
      a.bold,
      a.italic,
      a.thickness
    );
  });
  g = Ue.prototype;
  g.Cl = function(a) {
    return this.glyphs[this.Nk[a]];
  };
  g.Ub = function(a, b, c, d, e) {
    Ue.O.Ub.call(this, a, b, c, d, e);
    Li(b.Dd, this.name, this);
  };
  g.Dm = function(a) {
    for (var b = [], c = 0; c < a.length; ++c) b[c] = this.Nk[a.charAt(c)];
    return b;
  };
  g.yv = function(a, b, c, d, e) {
    for (var f = [], h = 0; h < e.length; ++h) {
      f[h] = a;
      var k = this.glyphs[e[h]];
      k &&
        ((a += (k.advance * b) / this.emSquareSize + c),
        ' ' == k.unicode && (a += d));
    }
    return f;
  };
  g.Rq = function(a, b, c, d, e, f, h, k) {
    var m = e * f.j + f.q;
    e = e * f.i + f.s;
    var n = f.n,
      t = f.o,
      p = b / this.emSquareSize,
      r = p * f.n,
      u = p * f.o,
      y = p * f.j,
      p = p * f.i;
    a.beginPath();
    for (var z = 0; z < c.length; ++z) {
      var D = this.glyphs[c[z]];
      if (D) {
        var F = d[z];
        Pi(a, D.data, r, u, y, p, F * n + m, F * t + e);
      }
    }
    h && (a.fillStyle = a.strokeStyle = h.he());
    a.fill();
    k &&
      h &&
      h.mv() &&
      200 < h.yu() &&
      ((b = 1 - (f.Gu() * b) / 20), 0 < b && ((a.lineWidth = b), a.stroke()));
  };
  var xk = function(a, b, c) {
    this.data = a;
    this.unicode = b;
    this.advance = c;
  };
  var yk = function(a, b, c, d, e, f) {
    Zg.call(this, a, null);
    this.data = b;
    this.mask = c;
    this.width = d;
    this.height = e;
    this.transparent = f;
    this.canvas = Sf(d, e);
  };
  v(yk, Zg);
  var zk = function(a) {
    return new yk(
      a.id,
      a.data,
      a.mask,
      a.width,
      a.height,
      !(!a.transparent && !a.mask)
    );
  };
  Vg(8, zk);
  yk.prototype.ia = function(a) {
    a.Li();
    var b,
      c = !1,
      d,
      e = !this.mask,
      f = this,
      h = function() {
        if (c && e) {
          var h = f.canvas.getContext('2d');
          h.clearRect(0, 0, f.width, f.height);
          h.drawImage(b, 0, 0, f.width, f.height);
          d &&
            ((h.globalCompositeOperation = 'destination-in'),
            h.drawImage(d, 0, 0, f.width, f.height));
          a.we();
        }
      };
    b = new Image();
    b.onload = function() {
      c = !0;
      h();
    };
    b.onerror = function() {
      a.we();
    };
    b.src = this.data;
    this.mask &&
      ((d = new Image()),
      (d.onload = function() {
        e = !0;
        h();
      }),
      (d.onerror = b.onerror),
      (d.src = this.mask));
  };
  yk.prototype.Kb = function(a, b, c) {
    return new pj(new dj(this, a), a, c);
  };
  yk.prototype.Nm = function(a) {
    var b = this;
    b.di = a;
    Ak(
      a,
      Bk(Ck, a)
        ? function(a, d) {
            return new pj(new dj(b, a), a, d);
          }
        : function(a, d) {
            return new dj(b, a, d);
          }
    );
  };
  yk.prototype.Ub = function(a, b, c, d, e) {
    yk.O.Ub.call(this, a, b, c, d, e);
    this.vc = d.vc;
  };
  var Oj = new Ig(Hc.wm(16384, 16384)),
    Dk = function(a) {
      var b = [];
      if (a)
        for (var c = 0; c < a.length; c++) {
          var d = a[c];
          b[c] = {
            color: Jg(d.color, Qg, Cg),
            offset: Mg(
              d.offset.map(function(a) {
                return a / 255;
              })
            ),
          };
        }
      return b;
    },
    Ek = function(a, b) {
      return new this(
        Pg(b.transform, 16384, Oj),
        Dk(b.gradient.stops),
        b.gradient.spread | 0,
        b.gradient.interpolation | 0,
        b.gradient.f ? Mg(b.gradient.f) : null
      );
    },
    Fk = function(a, b) {
      var c = a.lu(b.bitmap, yk);
      if (!c) return new Ui(new Ig(new Wc(255, 0, 0, 1)));
      var d = b.transform ? Og(b.transform) : Tc;
      return new this(c, d);
    },
    Gk = [
      null,
      function(a, b) {
        return new Ui(Jg(b.color, Qg, Cg));
      },
      Ek.bind(Wi),
      Ek.bind(Yi),
      Ek.bind(Yi),
      Fk.bind($i),
      Fk.bind(Zi),
    ],
    hh = function(a, b) {
      var c = Gk[b.type];
      return c ? c(a, b) : null;
    },
    ih = ['round', 'butt', 'square'],
    jh = ['round', 'bevel', 'miter'];
  var Ik = function(a, b, c, d, e) {
    Xg.call(this, a);
    this.matrix = b;
    this.records = c;
    this.bounds = d;
    this.wx = e;
    this.ud = null;
    Hk && Hk(this);
  };
  v(Ik, Xg);
  var Hk = null;
  Vg(6, function(a, b, c, d) {
    b = bd(a.bounds);
    c = Og(a.matrix);
    for (
      var e =
          l(a.mode) && 1 != a.mode
            ? null
            : new Gg(a.gridFit || 0, a.thickness || 0, a.sharpness || 0),
        f = [],
        h = 0;
      a.records && h < a.records.length;
      h++
    ) {
      var k = a.records[h],
        m = l(k.font) ? d.Dc.Ee(k.font) : null,
        n = l(k.glyphs) ? xe(k.glyphs) : null;
      f.push(new Jk(k.text, n, m, k.height, xe(k.x), Number(k.y), k.color));
    }
    return new Ik(a.id, c, f, b, e);
  });
  Ik.prototype.Kb = function(a, b, c) {
    return new Yj(this, a, c);
  };
  Ik.prototype.gu = function() {
    if (!this.ud)
      for (
        var a = (this.ud = this.bounds.clone()), b = 0;
        b < this.records.length;
        b++
      ) {
        var c = this.records[b].hu();
        c.hm(this.matrix);
        a.eh(c);
      }
    return this.ud;
  };
  var Jk = function(a, b, c, d, e, f, h) {
    this.text = a;
    this.font = c;
    this.height = d;
    this.x = e;
    this.y = f;
    this.color = h;
    this.Kd = b;
  };
  Jk.prototype.Ew = function(a, b, c, d) {
    var e = this.font && this.font.get();
    e instanceof Ue &&
      (this.Kd || (this.Kd = e.Dm(this.text)),
      (c = c ? c.apply(Cg(this.color)) : null),
      e.Rq(a, this.height, this.Kd, this.x, this.y, b, c, d));
  };
  Jk.prototype.hu = function() {
    var a = this.font && this.font.get(),
      b = 0,
      c = 0,
      d = 0,
      e = 0;
    a instanceof Ue &&
      (this.Kd || (this.Kd = a.Dm(this.text)),
      this.Kd.length &&
        ((c = this.y + (a.descent * this.height) / a.emSquareSize),
        (b = this.y - (a.ascent * this.height) / a.emSquareSize),
        (d = this.x[0]),
        (e = this.Kd.length - 1),
        (e =
          this.x[e] +
          ((a.glyphs[this.Kd[e]].advance | 0) * this.height) /
            a.emSquareSize)));
    return new ad(d, b, e, c);
  };
  var Kk = function(a) {
    this.actions = a;
  };
  v(Kk, tk);
  Vg(9, function(a, b) {
    var c = b.bf(ch).Ei(a.actions, void 0);
    return new Kk(c);
  });
  Kk.prototype.uh = function() {};
  Kk.prototype.pl = function(a) {
    a.J().Cq(new Qh(this.actions, a));
  };
  Kk.prototype.ql = function(a) {
    a.J().il(new Qh(this.actions, a));
  };
  Kk.prototype.Qg = function(a) {
    a.push(this);
  };
  var Lk = function(a) {
    this.actions = a;
  };
  v(Lk, Kk);
  Vg(20, function(a, b) {
    var c = b.bf(ch).Ei(a.actions, void 0);
    return new Lk(c);
  });
  Lk.prototype.Ub = function(a, b, c, d, e) {
    Li(a.Dp, e, this);
  };
  Tg[16] = function(a, b, c, d) {
    for (var e in a.data)
      (c = d.Dc.Ee(a.data[e]).get()),
        c instanceof Zg
          ? ((c.vc[e] = c), (c.Gj = e))
          : c instanceof Ue && Li(b.Dd, e, c);
  };
  var uk = function(a, b, c, d, e, f, h, k) {
    this.definition = b;
    this.depth = a.depth;
    this.matrix = c;
    this.clip = a.clip;
    this.colortransform = d;
    this.name = a.name;
    this.ratio = h;
    this.blendmode = a.blendmode;
    this.replace = a.replace;
    this.actions = e;
    this.filters = f;
    this.sa = !!(b && b.Wl() && b.get().sa);
    this.kg = k;
    this.visible = a.visible;
    this.cacheAsBitmap = a.cacheAsBitmap;
  };
  v(uk, tk);
  Vg(3, function(a, b, c, d) {
    var e;
    if (l(a.actions)) {
      var f = b.bf(ch);
      e = a.actions.map(function(a) {
        return {
          events: a.events,
          key: a.key,
          actions: f.Ei(a.actions, void 0),
        };
      });
    }
    var h;
    l(a.filters) &&
      (h = a.filters.map(function(a) {
        return Td(a);
      }));
    var k;
    l(a.matrix) && (k = a.matrix ? Og(a.matrix) : Hc);
    b = l(a.id) ? d.Dc.Ee(a.id) : null;
    c = a.colortransform ? ah(a.colortransform) : void 0;
    return new uk(
      a,
      b,
      k,
      c,
      e,
      h,
      l(a.ratio) ? a.ratio / 65535 : void 0,
      d.kw.Fl()
    );
  });
  g = uk.prototype;
  g.Ae = function(a) {
    var b = this.depth + -16384,
      c = a.G.Ic(b),
      d = null;
    if (!this.replace == !c) {
      if (c)
        if (!this.definition || c.sa() || this.sa) d = c;
        else {
          if ((a.de(b), (d = this.Fi(a))))
            d.setTransform(c.wa()),
              d.Gb(c.nb),
              d.yg(c.zb),
              d.xg(c.Bb()),
              d.Jm(c.Bf),
              d.Hb(c.getName());
        }
      else d = this.Fi(a);
      d &&
        !d.Gn() &&
        (this.matrix && d.setTransform(this.matrix),
        this.colortransform && d.Gb(this.colortransform),
        l(this.ratio) && d.$j(this.ratio),
        this.filters && d.yg(this.filters),
        l(this.blendmode) && d.xg(this.blendmode),
        l(this.visible) && d.ck(!!this.visible),
        l(this.cacheAsBitmap) && d.Im(this.cacheAsBitmap));
    }
  };
  g.uh = function(a) {
    var b = a.G.Ic(this.depth + -16384),
      c = null;
    if (b) {
      var c = b.sa() && this.sa,
        d = this.definition ? this.definition.id : void 0,
        d = !b.sa() && b.definition.id == d;
      (c || d) && b.Hd() == (this.ratio || 0)
        ? (c = b)
        : (a.G.Uv(b), (c = this.Fi(a)));
    } else c = this.Fi(a);
    if (c)
      return (
        c.Gn() ||
          (c.setTransform(this.matrix ? this.matrix : Hc),
          c.Gb(this.colortransform ? this.colortransform : $c),
          c.$j(this.ratio || 0),
          c.yg(this.filters ? this.filters : []),
          c.xg(this.blendmode | 0),
          l(this.visible) && c.ck(!!this.visible)),
        c
      );
  };
  g.Fi = function(a) {
    if (!this.definition || !this.definition.Wl()) return null;
    var b = this.definition.get(),
      c = b.Kb(a.c, this.kg);
    if (!c) return null;
    this.name ? c.Hb(this.name) : a.c.J().Ho(a.c, c);
    this.clip && c.Jm(this.clip + -16384);
    if (this.actions)
      for (c.th(7), b = 0; b < this.actions.length; ++b) {
        var d = this.actions[b];
        c.sn(d.events, d.key, d.actions);
      }
    else b.Gj && c.th(7);
    a.Wc(c, this.depth + -16384);
    c.ia(!0);
    return c;
  };
  g.Tk = function(a) {
    a.push(this);
  };
  g.Qg = function(a) {
    var b = vk(a, this.depth);
    if (0 > b) this.replace || a.push(this);
    else if (this.replace) {
      var c = a[b];
      a.splice(b, 1);
      b = c.definition;
      c.sa || this.sa || !this.definition || (b = this.definition);
      c = new uk(
        {
          depth: this.depth,
          name: c.name,
          replace: !1,
          sa: c.sa,
          clip: c.clip,
          blendmode: A(this.blendmode, c.blendmode),
          visible: A(this.visible, c.visible),
          filters: A(this.filters, c.filters),
        },
        b,
        A(this.matrix, c.matrix),
        A(this.colortransform, c.colortransform),
        A(this.actions, c.actions),
        A(this.filters, c.filters),
        A(this.ratio, c.ratio),
        this.kg
      );
      a.push(c);
    }
  };
  g.Tu = function(a) {
    if (!this.actions || !this.sa) return !1;
    for (var b = 0; b < this.actions.length; ++b)
      if (0 != (this.actions[b].events & a)) return !0;
    return !1;
  };
  g.tt = function() {
    return new uk(
      {
        depth: this.depth + -65536,
        name: this.name,
        replace: !1,
        sa: !0,
        clip: 0,
        blendmode: this.blendmode,
        filters: this.filters,
        visible: this.visible,
      },
      this.definition,
      this.matrix,
      this.colortransform,
      this.actions,
      this.filters,
      this.ratio,
      this.kg
    );
  };
  var Mk = function(a) {
    this.fl = a;
  };
  v(Mk, tk);
  Vg(4, function(a) {
    return new Mk(a.depth);
  });
  g = Mk.prototype;
  g.Ae = function(a) {
    a.de(this.fl + -16384);
  };
  g.uh = Mk.prototype.Ae;
  g.Tk = function(a) {
    a.push(this);
  };
  g.Qg = function(a) {
    var b = vk(a, this.fl);
    if (0 <= b) {
      var c = a[b];
      c.Tu(160) ? ((a[b] = c.tt()), a.push(this.ut())) : a.splice(b, 1);
    }
  };
  g.ut = function() {
    return new Mk(this.fl + -65536);
  };
  var Nk = function(a, b) {
    this.lc = a;
    this.Hm = [];
    this.jr = {};
    for (var c = 0; c < a.length; c++) this.jr[a[c].name] = a[c].offset;
    this.Of = b;
    this.cj = {};
    for (c = 0; c < b.length; c++) this.cj[b[c].name] = b[c].offset;
  };
  v(Nk, tk);
  Vg(23, function(a) {
    return new Nk(a.scenes, a.frames);
  });
  Nk.prototype.Ub = function(a) {
    a.$b = this;
    for (
      var b = this.lc, c = this.Of, d = this.Hm, e = 0, f = 0;
      e < b.length;
      e++
    ) {
      for (
        var h = [], k = e + 1 < b.length ? b[e + 1].offset : a.frameCount;
        f < c.length && c[f].offset < k;

      )
        h.push(c[f++]);
      d.push({ numFrames: k - b[e].offset, Of: h });
    }
  };
  Nk.prototype.ys = function(a, b) {
    this.cj[b] = a;
  };
  var Ok = function(a, b) {
    var c = La(a, { offset: b }, function(a, b) {
      return a.offset - b.offset;
    });
    0 > c && (c = -c - 2);
    return c;
  };
  g = Nk.prototype;
  g.Ah = function(a) {
    return Ok(this.lc, a);
  };
  g.np = function(a) {
    a = this.Ah(a);
    return this.lc[a] ? this.lc[a].offset : 0;
  };
  g.Fu = function(a) {
    a = this.Ah(a);
    return this.lc[a - 1] ? this.lc[a - 1].offset : Number.NEGATIVE_INFINITY;
  };
  g.Bu = function(a) {
    a = this.Ah(a);
    return this.lc[a + 1] ? this.lc[a + 1].offset : Number.POSITIVE_INFINITY;
  };
  g.pu = function(a) {
    return Ok(this.Of, a);
  };
  var Vj = function(a, b, c, d) {
    Zg.call(this, a, d);
    this.Np = [];
    this.$b = new Nk([], []);
    this.frameCount = b;
    this.scaleRect = c;
    this.tags = [];
    this.Dp = [];
  };
  v(Vj, Zg);
  Vg(7, function(a, b, c, d, e) {
    var f = new Vj(
      a.id,
      a.frameCount,
      a.scaleRect ? bd(a.scaleRect) : null,
      d.Dc.vc
    );
    f.sq(a.tags, b, c, d, e);
    return f;
  });
  Vj.prototype.sq = function(a, b, c, d) {
    for (var e = 0, f = 0, h = 0; a && h < a.length; h++) {
      var k = a[h];
      if (2 == k.type) e++, (f = 0);
      else {
        var m = Tg[k.type];
        m && (f++, m(k, b, c, d, this, e, void 0));
      }
    }
    this.it();
  };
  Vj.prototype.sa = !0;
  Vj.prototype.Kb = function(a, b, c) {
    a = new Pj(this, a, b, c);
    this.scaleRect && a.ax(this.scaleRect);
    return a;
  };
  Vj.prototype.it = function() {
    for (var a = [], b = 0; b < this.frameCount; ++b) {
      for (var c = this.tags[b], d = [], e = 0; e < a.length; ++e) a[e].Tk(d);
      if (c) for (e = 0; e < c.length; ++e) c[e].Qg(d);
      a = this.Np[b] = d;
    }
  };
  var Aj = function(a, b, c, d, e, f, h) {
      this.c = a.c;
      this.variables = b;
      this.url = c;
      this.target = d || '_self';
      this.method = e;
      this.Lp = !!f;
      this.Vl = !!h;
      this.cr =
        this.Lp || this.Vl
          ? a.Jd('_self' == this.target ? 'this' : this.target)
          : null;
    },
    Pk = { 0: void 0, 1: 'GET', 2: 'POST' };
  g = Aj.prototype;
  g.Hw = function(a) {
    var b = this.target.match(/^\_level(\d+)$/i);
    if (this.Lp)
      return this.Vl ? (b ? this.zo(Number(b[1])) : this.Tt()) : this.St(), !0;
    if (b) return this.Vl ? this.zo(Number(b[1])) : this.Rt(Number(b[1])), !0;
    if ('' == this.url) return !0;
    if ((b = this.url.match(/^fscommand:(.*)$/i)))
      return Ne(this.c, b[1], this.target), !0;
    b = this.target;
    if (!a && '_self' != b) return !1;
    var c = this.method;
    a = this.url;
    if (1 == c) (a = Ei(this.variables, a)), (a = a.replace(/%20/g, '+'));
    else if (2 == c) {
      var d;
      d = this.variables;
      fa(d) ? (d = [d]) : ((c = []), Di(d, c.push, c), (d = c));
    }
    this.c.navigate(a, b, d);
    return !0;
  };
  g.Rt = function(a) {
    var b = this.c;
    b.H.de(-16384 + a);
    if (this.url) {
      var c = new Qj();
      c.Va = function(c) {
        Qk(b, a, c);
      };
      Tj(this.url, b, Pk[this.method], this.variables, c);
    }
  };
  g.St = function() {
    var a = this.cr,
      b = Pk[this.method];
    if (a instanceof H) {
      var c = a.__swiffy_d;
      c && c.Sp(this.url, b, a);
    }
  };
  g.Tt = function() {
    var a = this.cr,
      b = Pk[this.method];
    a instanceof H && a.loadVariables.call(a, this.url, b);
  };
  g.zo = function(a) {
    var b = this.c;
    Rk(this.url, b, Pk[this.method], this.variables, function() {
      var c = b.su(a);
      c ||
        ((c = new Vj(0, 0, null, {})),
        (c = new Pj(c, b, null)),
        b.sk(c, a),
        c.ia(),
        (c.Vb = !0));
      return c;
    });
  };
  var Sk = function(a, b, c, d, e) {
    var f = new Bd();
    Vj.call(this, 0, a, null, f.vc);
    this.frameRate = b;
    this.Rc = c;
    this.as3 = d;
    this.Dc = f;
    e ? ((a = hd[e]), (b = new fd(a)), a || (hd[e] = b.uo), (e = b)) : (e = gd);
    this.kw = e;
    f.Aq(this);
  };
  v(Sk, Vj);
  var Tk = function(a, b, c) {
    var d;
    t: if (l(a.as3)) d = a.as3;
    else {
      if (a.tags)
        for (d = 0; d < a.tags.length; ++d)
          if (18 == a.tags[d].type) {
            d = !0;
            break t;
          }
      d = !1;
    }
    d = new Sk(a.frameCount, a.frameRate, a.version, d, a.digest);
    d.sq(a.tags, b, c, d, a.url || 'root');
    return d;
  };
  var Sj = function(a, b) {
      a.um(b);
      a.fireEvent(new Jc(18));
      a.c.va();
    },
    Qk = function(a, b, c, d) {
      c = new Pj(c, a, null);
      d && d(c);
      a.sk(c, b);
      c.ia();
      c.Vb = !0;
      a.va();
    },
    Uk = function(a, b, c, d) {
      var e = !1;
      if (da(c))
        for (var f = 0; f < c.length; ++f) {
          var h = c[f];
          switch (h.name && h.name.toLowerCase()) {
            case 'content-type':
              e = !0;
          }
          a.setRequestHeader(h.name, h.value);
        }
      e ||
        ('POST' == b && (d = d || 'application/x-www-form-urlencoded'),
        d && a.setRequestHeader('Content-Type', d));
    },
    Xk = function(a, b, c, d, e, f, h) {
      d = String(d).toUpperCase();
      switch (d) {
        case 'POST':
          if ('function' == typeof ArrayBuffer) {
            Vk(a, b, c, 'POST', Ei(e), f, h);
            break;
          }
        case 'GET':
          b = Ei(e, b);
        default:
          USING_XML_HTTP_MOCK ? Vk(a, b, c, 'GET', null, f, h) : Wk(b, c, f);
      }
    },
    Vk = function(a, b, c, d, e, f, h) {
      c && c.Li();
      var k = new XMLHttpRequest();
      k.open(d, b);
      k.responseType = 'arraybuffer';
      k.onreadystatechange = function() {
        if (4 == k.readyState) {
          if (Yk(k)) {
            var b = new Uint8Array(k.response);
            if (!ea(b))
              throw Error('encodeByteArray takes an array as a parameter');
            vc();
            for (var d = sc, e = [], h = 0; h < b.length; h += 3) {
              var r = b[h],
                u = h + 1 < b.length,
                y = u ? b[h + 1] : 0,
                z = h + 2 < b.length,
                D = z ? b[h + 2] : 0,
                F = r >> 2,
                r = ((r & 3) << 4) | (y >> 4),
                y = ((y & 15) << 2) | (D >> 6),
                D = D & 63;
              z || ((D = 64), u || (y = 64));
              e.push(d[F], d[r], d[y], d[D]);
            }
            Wk('data:image/' + a + ';base64,' + e.join(''), c, f);
          } else f.xc(k.status);
          c && c.we();
        }
      };
      Uk(k, d, h);
      k.send(e);
    },
    Wk = function(a, b, c) {
      b && b.Li();
      var d = new Image();
      d.onload = function() {
        c.Lh();
        c.Xd(0, 1024);
        c.Xd(1024, 1024);
        c.Va(
          { type: 8, id: 1, data: d.src, width: d.width, height: d.height },
          200
        );
        b && b.we();
      };
      d.onerror = function() {
        c.xc(404);
        b && b.we();
      };
      d.src = a;
    },
    Zk = function(a, b, c, d, e, f, h) {
      b && b.Li();
      var k = new XMLHttpRequest(),
        m = !0,
        n = 0,
        t = 0;
      k.onreadystatechange = function() {
        2 == k.readyState
          ? Yk(k) && e.Lh()
          : 4 == k.readyState && Yk(k) && 0 != t && n != t && e.Xd(t, t);
      };
      k.onprogress = function(a) {
        Yk(k) &&
          (m && 0 != a.loaded && e.Xd(0, a.total), e.Xd(a.loaded, a.total));
        m = !1;
        n = a.loaded;
        t = a.total;
      };
      k.onload = function() {
        Yk(k) ? e.Va(k.responseText, k.status) : e.xc(k.status);
        b && b.we();
      };
      k.onerror = function() {
        e.xc(k.status);
        b && b.we();
      };
      c = String(c).toUpperCase();
      var p = null;
      switch (c) {
        case 'POST':
          k.open(c, a);
          p = Ei(d);
          break;
        case 'GET':
          a = Ei(d, a);
        default:
          k.open('GET', a);
      }
      Uk(k, c, f, h);
      k.send(p);
    },
    Rk = function(a, b, c, d, e, f) {
      var h = new Qj();
      h.Va = function(a) {
        var b = e(),
          c = b.t;
        a = Ii(a);
        for (var d = Object.keys(a), f = 0; f < d.length; f++) {
          var h = a[d[f]];
          c[d[f]] = h[h.length - 1];
        }
        b.fireEvent(new Jc(18));
        c.onData && c.onData.call(c);
      };
      Zk(a, b, c, d, h, f);
    },
    $k = function(a) {
      return ((a = a.match(/\.([^.?#]+)(?:#.*$|\?.*$|$)/)) && a[1]) || '';
    },
    al = {
      png: 'image/png',
      gif: 'image/gif',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      swf: 'application/x-shockwave-flash',
    },
    bl = {
      png: oa(Xk, 'png'),
      gif: oa(Xk, 'gif'),
      jpg: oa(Xk, 'jpeg'),
      jpeg: oa(Xk, 'jpeg'),
      swf: function(a, b, c, d, e, f) {
        USING_XML_HTTP_MOCK ||
          (a = a.replace(/^([^?#]+)([?#].*)?$/g, '$1.json$2'));
        var h = new Qj(e);
        h.Va = function(a, b) {
          var c = {};
          try {
            a && ((c = xc(a)), Gi(c));
          } catch (d) {
            e.xc(b);
            return;
          }
          e.Va(c, b);
        };
        Zk(a, b, c, d, h, f);
      },
    },
    cl = function(a, b, c, d, e, f) {
      var h = $k(a);
      (h = bl[h]) && h(a, b, c, d, e, f);
    },
    dl = function(a, b, c, d) {
      var e = Tk(a, b, c);
      b.Cp(e.Dc, function() {
        d(e);
      });
    },
    el = function(a, b, c, d, e, f, h) {
      var k = new Qj(f);
      k.Va = function(a, d) {
        if (8 == a.type) {
          var e = zk(a);
          e.ia(b);
          b.Ik(function() {
            f.Va(e, d);
          });
        } else
          dl(a, b, c, function(a) {
            f.Va(a, d);
          });
      };
      cl(a, b, d, e, k, h);
    },
    Tj = function(a, b, c, d, e, f) {
      var h = new Qj(e);
      h.Va = function(a, c) {
        a.type &&
          (a = {
            tags: [a, { type: 3, id: a.id, depth: 1 }, { type: 2 }],
            frameCount: 1,
          });
        dl(a, b, null, function(a) {
          e.Va(a, c);
        });
      };
      cl(a, b, c, d, h, f);
    },
    Yk = function(a) {
      return 200 == a.status || (0 == a.status && null != a.response);
    },
    Rj = function(a) {
      var b = document.createElement('a');
      b.href = a;
      return b.href;
    },
    Qj = function(a) {
      this.Lh = function() {
        l(a) && q(a.Lh) && a.Lh();
      };
      this.xc = function(b) {
        l(a) && q(a.xc) && a.xc(b);
      };
      this.Xd = function(b, c) {
        l(a) && q(a.Xd) && a.Xd(b, c);
      };
      this.Va = function(b, c) {
        l(a) && q(a.Va) && a.Va(b, c);
      };
    };
  var fl = function(a) {
    this.id = a;
  };
  v(fl, tk);
  Vg(12, function(a) {
    return new fl(a.id);
  });
  fl.prototype.Ae = function(a) {
    a.Le().Rr(this.id);
  };
  fl.prototype.uh = fl.prototype.Ae;
  fl.prototype.Qg = function(a) {
    a.push(this);
  };
  var gl = function(a, b, c, d) {
    c = l(c) ? c : !0;
    d = l(d) ? d : 4294967295;
    if (!('__swiffy_d' in this)) {
      var e = new dj(cj, Je.c);
      e.Ub(a, b, c, d);
      this.__swiffy_d = e;
    }
  };
  B(gl, 'BitmapData', di);
  var hl = function(a) {
    return a.__swiffy_d;
  };
  Object.defineProperty(gl, '__swiffy_override', {
    value: function(a, b, c, d) {
      return 8191 >= a && 8191 >= b && 16777215 >= a * b
        ? new gl(a, b, c, d)
        : void 0;
    },
  });
  Object.defineProperty(gl.prototype, 'width', {
    get: function() {
      return hl(this).K();
    },
  });
  Object.defineProperty(gl.prototype, 'height', {
    get: function() {
      return hl(this).$();
    },
  });
  Object.defineProperty(gl.prototype, 'rect', {
    get: function() {
      var a = hl(this);
      return new li(0, 0, a.K(), a.$());
    },
  });
  Object.defineProperty(gl.prototype, 'transparent', {
    get: function() {
      return hl(this).Ec;
    },
  });
  gl.loadBitmap = function(a) {
    for (
      var b = oi[a] || gl,
        c = Object.create(b.prototype),
        d = Je,
        e = d.c.Vr,
        f = 0;
      f < e.length;
      f++
    ) {
      var h = e[f].vc[a];
      if (h instanceof yk) {
        c.__swiffy_d = new dj(h, d.c, c);
        break;
      }
    }
    b.call(c);
    return c;
  };
  gl.prototype.copyPixels = function(a, b, c, d, e, f) {
    a &&
      b &&
      c &&
      ((e = e || b),
      hl(this).fo(
        hl(a),
        b.x,
        b.y,
        b.width,
        b.height,
        c.x,
        c.y,
        d ? hl(d) : null,
        e.x,
        e.y,
        !!f
      ));
  };
  gl.prototype.dispose = function() {
    hl(this).hl();
  };
  gl.prototype.fillRect = function(a, b) {
    a && hl(this).fillRect(a.x, a.y, a.width, a.height, b);
  };
  gl.prototype.getPixel = function(a, b) {
    return hl(this).Gl(a, b) & 16777215;
  };
  gl.prototype.getPixel32 = function(a, b) {
    return hl(this).Gl(a, b);
  };
  gl.prototype.scroll = function(a, b) {
    hl(this).scroll(a, b);
  };
  gl.prototype.setPixel = function(a, b, c) {
    hl(this).Mm(a, b, c | 4278190080);
  };
  gl.prototype.setPixel32 = function(a, b, c) {
    hl(this).Mm(a, b, c);
  };
  C(gl, null, 3);
  gl.prototype.draw = function(a, b, c) {
    (a = a && a.__swiffy_d) &&
      a.Ri &&
      this.__swiffy_d.Lb(
        a,
        b && ei(b),
        c && (c instanceof pi ? c.__swiffy_v : $c)
      );
  };
  var il = function(a) {
    Object.defineProperty(this, '__swiffy_v', {
      value: { cf: this.__swiffy_vm.Cg(a), fr: 0 },
    });
  };
  B(il, 'Color');
  Gh(il);
  il.prototype.getRGB = function() {
    var a = this.__swiffy_v.cf;
    return a && a.__swiffy_d ? this.__swiffy_v.fr : void 0;
  };
  il.prototype.setRGB = function(a) {
    var b = this.__swiffy_v.cf;
    b &&
      (b = b.__swiffy_d) &&
      ((this.__swiffy_v.fr = a),
      b.Gb(
        new Zc(0, (a & 16711680) >> 16, 0, (a & 65280) >> 8, 0, a & 255, 1, 0)
      ),
      b.Fa());
  };
  il.prototype.setTransform = function(a) {
    var b = this.__swiffy_v.cf;
    if (b && a && (b = b.__swiffy_d)) {
      var c = this.__swiffy_vm,
        d = c.Sa(a, 'ra'),
        e = c.Sa(a, 'rb'),
        f = c.Sa(a, 'ga'),
        h = c.Sa(a, 'gb'),
        k = c.Sa(a, 'ba'),
        m = c.Sa(a, 'bb'),
        n = c.Sa(a, 'aa');
      a = c.Sa(a, 'ab');
      c = b.nb;
      b.Gb(
        new Zc(
          l(d) ? d / 100 : c.Z,
          l(e) ? e : c.W,
          l(f) ? f / 100 : c.Y,
          l(h) ? h : c.U,
          l(k) ? k / 100 : c.X,
          l(m) ? m : c.T,
          l(n) ? n / 100 : c.S,
          l(a) ? a : c.Q
        )
      );
      b.Fa();
    }
  };
  il.prototype.getTransform = function() {
    var a = this.__swiffy_v.cf;
    if (a && (a = a.__swiffy_d))
      return (
        (a = a.nb),
        {
          ra: 100 * a.Z,
          rb: a.W,
          ga: 100 * a.Y,
          gb: a.U,
          ba: 100 * a.X,
          bb: a.T,
          aa: 100 * a.S,
          ab: a.Q,
        }
      );
  };
  C(il.prototype, null, 3);
  var jl = function(a) {
    return di.call(this, a);
  };
  B(jl, 'Function', di);
  Object.defineProperty(jl, '__swiffy_wrapped_type', { value: Function });
  Object.defineProperty(Function, '__swiffy_override', { value: ni });
  Object.defineProperty(jl, '__swiffy_override', { value: ni });
  var kl = function(a, b) {
    var c = (this && this.__swiffy_override) || this;
    if (q(c)) return c.apply(di(a), da(b) ? b : []);
  };
  jl.prototype.apply = kl;
  Object.defineProperty(Function.prototype.apply, '__swiffy_override', {
    value: kl,
  });
  Function.prototype.bind &&
    Object.defineProperty(Function.prototype.bind, '__swiffy_override', {
      value: void 0,
    });
  var ll = function(a, b) {
    return kl.call(this, a, Array.prototype.slice.call(arguments, 1));
  };
  jl.prototype.call = ll;
  Object.defineProperty(Function.prototype.call, '__swiffy_override', {
    value: ll,
  });
  C(jl, null, 3);
  C(jl.prototype, null, 3);
  var ml = function(a) {
      a.__swiffy_v.$q = [];
      Object.defineProperty(a, 'contentType', {
        value: 'application/x-www-form-urlencoded',
        writable: !0,
      });
      Object.defineProperty(a, 'loaded', { value: !1, writable: !0 });
    },
    nl = function(a, b, c) {
      var d = Je;
      a = a.__swiffy_v.$q;
      if (fa(b) && l(c)) a.push({ name: b, value: d.ya(c) });
      else if (da(b)) {
        c = b.length / 2;
        for (var e = 0; e < c; e++)
          a.push({ name: d.ya(b[2 * e]), value: d.ya(b[2 * e + 1]) });
      }
    },
    pl = function(a, b, c, d) {
      var e = Je;
      a = e.ya(a);
      b.loaded = !1;
      var f = new Qj();
      f.Va = function(a) {
        ol(b.onData, b, a);
      };
      f.xc = function() {
        ol(b.onData, b, void 0);
      };
      var h = null,
        k = 'GET',
        m,
        n;
      c &&
        ((h = c.toString()),
        (k = l(d) ? d : 'POST'),
        (m = c.__swiffy_v.$q),
        (n = c.contentType));
      Zk(a, e.c, k, h, f, m, n);
    },
    ql = function(a, b, c, d) {
      var e = Je;
      a = e.ya(a);
      c = l(c) ? c : '_self';
      d = l(d) ? d : 'POST';
      if ('GET' == d) d = 1;
      else if ('POST' == d) d = 2;
      else return;
      e.c.Qh(new Aj(e, b, a, c, d));
    },
    ol = function(a, b, c) {
      if (q(a)) return a.call.apply(a.call, arguments);
    };
  var rl = function() {};
  Sh(rl, G);
  var sl = function(a, b) {
      Object.defineProperty(this, a, {
        value: b,
        configurable: !0,
        writable: !0,
        enumerable: !0,
      });
      var c = this.__swiffy_d;
      c && c != c.c.Ja && c.Vi();
    },
    tl = function() {},
    ul = [
      ,
      ,
      'onMouseUp',
      'onMouseDown',
      'onMouseMove',
      'onUnload',
      'onEnterFrame',
    ];
  ul[19] = 'onConstruct';
  ul[7] = 'onLoad';
  ul[14] = 'onDragOver';
  ul[16] = 'onDragOver';
  ul[8] = 'onRollOut';
  ul[9] = 'onRollOver';
  ul[10] = 'onReleaseOutside';
  ul[11] = 'onRelease';
  ul[12] = 'onPress';
  ul[13] = 'onDragOut';
  ul[15] = 'onDragOut';
  Object.defineProperties(
    rl.prototype,
    (function() {
      for (var a = {}, b = 0; b < ul.length; b++)
        if ((1 << b) & 63045376) {
          var c = ul[b];
          a[c] = { get: tl, set: oa(sl, c) };
        }
      return a;
    })()
  );
  C(rl.prototype, null, 3);
  var vl = function() {};
  Sh(vl, rl);
  C(vl.prototype, null, 3);
  var wl = function() {};
  B(wl, 'Button', vl);
  wl.prototype.enabled = !0;
  wl.prototype.useHandCursor = !0;
  Object.defineProperty(wl.prototype, 'tabIndex', {
    value: void 0,
    writable: !0,
    enumerable: !0,
  });
  C(wl.prototype, null, 3);
  var xl = function() {
    Object.defineProperty(this, '__swiffy_v', { value: {} });
    ml(this);
  };
  B(xl, 'LoadVars');
  xl.prototype.addRequestHeader = function(a, b) {
    nl(this, a, b);
  };
  xl.prototype.load = function(a) {
    pl(a, this);
  };
  xl.prototype.send = function(a, b, c) {
    if (0 == arguments.length) return !1;
    ql(a, this, b, c);
    return !0;
  };
  xl.prototype.sendAndLoad = function(a, b, c) {
    pl(a, b, this, c);
  };
  xl.prototype.onData = function(a) {
    var b = l(a);
    b && ol(this.decode, this, a);
    this.loaded = b;
    ol(this.onLoad, this, b);
  };
  xl.prototype.onLoad = function() {};
  xl.prototype.decode = function(a) {
    a = Ii(a);
    for (var b in a) {
      var c = a[b];
      this[b] = c[c.length - 1];
    }
  };
  xl.prototype.toString = function() {
    return Ei(this);
  };
  C(xl.prototype, null, 3);
  var H = function() {};
  B(H, 'MovieClip', vl);
  H.prototype.enabled = !0;
  H.prototype.useHandCursor = !0;
  H.prototype.focusEnabled = void 0;
  Object.defineProperty(H.prototype, '_droptarget', {
    get: function() {
      var a = this.__swiffy_d;
      return a ? ((a = (a = a.mu()) && a.t._target) && '/' != a ? a : '') : '';
    },
  });
  H.prototype.gotoAndStop = function(a) {
    var b = this.__swiffy_d;
    b && b.Pb(b.Wf(a), !1);
  };
  H.prototype.gotoAndPlay = function(a) {
    var b = this.__swiffy_d;
    b && b.Pb(b.Wf(a), !0);
  };
  H.prototype.play = function() {
    var a = this.__swiffy_d;
    a && a.play();
  };
  H.prototype.stop = function() {
    var a = this.__swiffy_d;
    a && a.stop();
  };
  H.prototype.nextFrame = function() {
    var a = this.__swiffy_d;
    a && a.Pb(a.ja + 1, !1);
  };
  H.prototype.prevFrame = function() {
    var a = this.__swiffy_d;
    a && a.Pb(a.ja - 1, !1);
  };
  H.prototype.globalToLocal = function(a) {
    var b = this.__swiffy_d;
    b &&
      b.c.J().bq(a, function(a) {
        a.gc(b.ka());
      });
  };
  H.prototype.localToGlobal = function(a) {
    var b = this.__swiffy_d;
    b &&
      b.c.J().bq(a, function(a) {
        a.Yb(b.ka());
      });
  };
  H.prototype.createEmptyMovieClip = function(a, b) {
    var c = this.__swiffy_d;
    if (c) {
      var d = new Vj(0, 0, null, c.definition.vc),
        d = new Pj(d, c.c, null);
      d.Vb = !0;
      d.Hb(a);
      d.ia();
      c.de(b);
      c.Wc(d, b);
      return d.t;
    }
  };
  H.prototype.createTextField = function(a, b, c, d, e, f) {
    if (!(6 > arguments.length)) {
      var h = this.__swiffy_d;
      if (h) {
        var k = zi(b),
          m = zi(c),
          n = zi(d),
          t = new wk(
            {
              tag: -1,
              height: 240,
              color: 4278190080,
              border: !1,
              Eo: !1,
              html: !1,
              maxChars: null,
              multiline: !1,
              password: !1,
              selectable: !0,
              variable: null,
              wrap: !1,
              sa: 6 <= h.c.Rc,
            },
            new ad(0, 0, 20 * Math.abs(zi(e)), 20 * Math.abs(zi(f))),
            h.c.Rc
          ),
          t = new tj(t, h.c, null);
        t.Hb(String(a));
        t.setTransform(Vc(1, 0, 0, 1, 20 * m, 20 * n));
        t.ia();
        t.Vb = !0;
        h.de(k);
        h.Wc(t, k);
        return t.t;
      }
    }
  };
  H.prototype.getNextHighestDepth = function() {
    var a = this.__swiffy_d;
    return a ? a.G.Au() : void 0;
  };
  H.prototype.getInstanceAtDepth = function(a) {
    var b = this.__swiffy_d;
    if (b && !(-16384 > a) && (a = b.G.Ic(a)))
      return a instanceof qj ? a.t : b.t;
  };
  H.prototype.getSWFVersion = function() {
    var a = this.__swiffy_d;
    return a ? a.c.Rc : -1;
  };
  H.prototype.setMask = function(a) {
    var b = this.__swiffy_d;
    if (b) {
      var c;
      c = fa(a) ? b.c.J().Qo(a) : a;
      if (c instanceof H || c instanceof yl) return b.df(c.__swiffy_d), !0;
      b.df(null);
      return !l(a);
    }
  };
  H.prototype.attachMovie = function(a, b, c, d) {
    var e = this.__swiffy_d;
    if (e && ((a = e.definition.vc[a]), l(a))) {
      var f = gd.Fl();
      a = a.Kb(e.c, f);
      a.Vb = !0;
      a.Hb(b);
      e.de(c);
      e.Wc(a, c);
      if (l(d)) {
        b = a.t;
        for (var h in d) b[h] = d[h];
      }
      a.ia();
      return a.t;
    }
  };
  H.prototype.attachBitmap = function(a, b) {
    var c = this.__swiffy_d;
    if (c && a) {
      var d = new pj(a.__swiffy_d, c.c);
      d.Vb = !0;
      c.de(b);
      c.Wc(d, b);
    }
  };
  H.prototype.duplicateMovieClip = function(a, b, c) {
    var d = this.__swiffy_d;
    if (d) {
      var e = d.getParent();
      if (e) {
        a = d.duplicate(e, a, b);
        if (l(c)) {
          b = a.t;
          for (var f in c) b[f] = c[f];
        }
        return a.t;
      }
    }
  };
  H.prototype.removeMovieClip = function() {
    var a = this.__swiffy_d;
    if (a) {
      var b = a.getParent();
      0 <= a.depth && a.Vb && b && (a.la(), b.removeChild(a));
    }
  };
  H.prototype.loadMovie = function(a, b) {
    var c = this.__swiffy_d;
    c && ((a = c.c.J().ya(a)), c.Sp(a, b, this));
  };
  H.prototype.loadVariables = function(a, b) {
    var c = this.__swiffy_d;
    c &&
      Rk(a, c.c, b, this, function() {
        return c;
      });
  };
  H.prototype.unloadMovie = function() {
    var a = this.__swiffy_d;
    a && a.um(new Vj(0, 0, null, a.definition.vc));
  };
  H.prototype.swapDepths = function(a) {
    var b = this.__swiffy_d,
      c = b ? b.getParent() : void 0;
    if (c) {
      var d = void 0;
      if (a instanceof G) {
        a = a.__swiffy_d;
        if (a.getParent() != c) return;
        d = a.depth;
      } else 'number' === typeof a && (d = a);
      l(d) && c.Xm(b.depth, d);
    }
  };
  H.prototype.getBytesTotal = function() {
    var a = this.__swiffy_d;
    if (a) return a.c.gw;
  };
  H.prototype.getBytesLoaded = H.prototype.getBytesTotal;
  H.prototype.getBounds = function(a) {
    var b = this.__swiffy_d;
    if (b) {
      var c = hj(b).clone();
      c.Na() && c.expand(134217728, 134217728);
      if (l(a)) {
        var d = null;
        fa(a) && (a = b.c.J().vh(a, this));
        a instanceof H && (d = a.__swiffy_d);
        if (d) c.hm(b.ka().multiply(d.ka().Ul()));
        else return;
      }
      return { xMin: c.l / 20, xMax: c.D / 20, yMin: c.m / 20, yMax: c.F / 20 };
    }
  };
  H.prototype.getURL = function(a, b, c) {
    var d = this.__swiffy_d;
    if (d) {
      var e = d.c.J();
      a = e.ya(a);
      var f = 0;
      fa(c) &&
        ((c = c.toLowerCase()), 'get' == c ? (f = 1) : 'post' == c && (f = 2));
      a = new Aj(e, this, a, b, f);
      d.c.Qh(a);
    }
  };
  H.prototype.hitTest = function(a, b, c) {
    var d = this.__swiffy_d;
    if (l(a) && d) {
      var e = hj(d).Yb(d.ka());
      if (!l(b) && !l(c)) {
        if (
          ((c = null),
          a instanceof H
            ? (c = a.__swiffy_d)
            : fa(a) && (c = d.c.J().vh(a, this)),
          null != c)
        )
          return (d = hj(c).Yb(c.ka())), e.rq(d);
      } else if (l(b))
        return (a *= 20), (b *= 20), e.contains(a, b) && (!c || d.qt(a, b));
    }
    return !1;
  };
  H.prototype.clear = function() {
    var a = this.__swiffy_d;
    a && a.Ka().clear();
  };
  H.prototype.moveTo = function(a, b) {
    var c = this.__swiffy_d;
    c && c.Ka().moveTo(a, b);
  };
  H.prototype.lineTo = function(a, b) {
    var c = this.__swiffy_d;
    c && c.Ka().lineTo(a, b);
  };
  H.prototype.curveTo = function(a, b, c, d) {
    var e = this.__swiffy_d;
    e && e.Ka().pb(a, b, c, d);
  };
  H.prototype.lineStyle = function(a, b, c, d, e, f, h, k) {
    var m = this.__swiffy_d;
    m && m.Ka().Pp(a, b, c, d, e, f, h, k);
  };
  H.prototype.beginFill = function(a, b) {
    var c = this.__swiffy_d;
    c && c.Ka().Bn(a, b);
  };
  H.prototype.beginGradientFill = function(a, b, c, d, e, f, h, k) {
    var m = this.__swiffy_d;
    if (m) {
      var n = null;
      ia(e) &&
        (e instanceof ci
          ? (n = ei(e))
          : 'box' == e.matrixType
          ? ((n = gi(e.w, e.h, e.r, e.x, e.y)), (n = n.Uc(20 * n.q, 20 * n.s)))
          : (n = Vc(
              e.a * Ti,
              e.b * Ti,
              e.d * Ti,
              e.e * Ti,
              20 * e.g,
              20 * e.h
            )));
      e = n;
      m.Ka().Cn(a, b, c, d, e, f, h, k);
    }
  };
  H.prototype.endFill = function() {
    var a = this.__swiffy_d;
    a && a.Ka().Go();
  };
  H.prototype.startDrag = function(a, b, c, d, e) {
    var f = this.__swiffy_d;
    f && f.c.Qr(f, a, b, c, d, e);
  };
  H.prototype.stopDrag = function() {
    var a = this.__swiffy_d;
    a && a.c.ik();
  };
  ui(H.prototype, '_currentframe', function(a) {
    return Math.max(1, a.ja + 1);
  });
  ui(H.prototype, '_totalframes', function(a) {
    return a.definition.frameCount;
  });
  ui(H.prototype, '_framesloaded', function(a) {
    return a.definition.frameCount;
  });
  ri(
    H.prototype,
    '_lockroot',
    function(a) {
      return a.Jj;
    },
    function(a, b) {
      a.xr(Boolean(b));
    }
  );
  ri(
    H.prototype,
    'blendMode',
    function(a) {
      return Qc[a.Bb()];
    },
    function(a, b) {
      var c = 0;
      Number(b) == b
        ? ((c = Number(b) - 1), Qc[c] || (c = 0))
        : (c = Pc[String(b)] || 0);
      a.xg(c);
    }
  );
  ri(
    H.prototype,
    'cacheAsBitmap',
    function(a) {
      return a.Kp();
    },
    function(a, b) {
      a.Im(Boolean(b));
    }
  );
  C(H.prototype, null, 3);
  var zl = function() {
    this.__swiffy_vm.Eh(this);
  };
  B(zl, 'MovieClipLoader');
  Gh(zl);
  zl.prototype.checkPolicyFile = !1;
  zl.prototype.loadClip = function(a, b) {
    if (a && b) {
      var c = this.__swiffy_vm;
      a = c.ya(a);
      var d = this,
        e = b.__swiffy_d;
      ha(b) ? (e = c.c.Ja) : fa(b) ? (e = c.Cg(b).__swiffy_d) : e.Ag(Rj(a));
      c = new Qj();
      c.Va = function(c, h) {
        d.broadcastMessage('onLoadStart', b);
        d.broadcastMessage('onLoadProgress', b, 1024, 1024);
        d.broadcastMessage('onLoadComplete', b, h);
        ha(b)
          ? Qk(e.c, b, c, function(b) {
              b.Ag(Rj(a));
            })
          : Sj(e, c);
        d.broadcastMessage('onLoadInit', b);
      };
      c.xc = function(a) {
        d.broadcastMessage('onLoadError', b, a);
      };
      Tj(a, e.c, '', this, c);
    }
  };
  zl.prototype.getProgress = function() {
    return { bytesLoaded: 1024, bytesTotal: 1024 };
  };
  zl.prototype.unloadClip = function(a) {
    (a = a && a.__swiffy_d) && a.um(new Vj(0, 0, null, a.definition.vc));
  };
  var Al = function() {
    Object.defineProperty(this, '__swiffy_v', {
      value: {
        qm: 0,
        volume: 100,
        transform: { Hj: 100, fm: 0, Fm: 0, Gm: 100 },
      },
    });
  };
  B(Al, 'Sound');
  Gh(Al);
  Al.prototype.checkPolicyFile = !1;
  Object.defineProperty(Al.prototype, 'duration', { value: 0 });
  Object.defineProperty(Al.prototype, 'id3', { value: void 0 });
  Object.defineProperty(Al.prototype, 'position', { value: 0 });
  Al.prototype.onID3 = void 0;
  Al.prototype.onLoad = void 0;
  Al.prototype.onSoundComplete = void 0;
  Al.prototype.attachSound = function() {};
  Al.prototype.getBytesLoaded = function() {
    return 0;
  };
  Al.prototype.getBytesTotal = function() {
    return 0;
  };
  Al.prototype.getPan = function() {
    return this.__swiffy_v.qm;
  };
  Al.prototype.getTransform = function() {
    var a = this.__swiffy_v;
    return {
      ll: a.transform.Hj,
      lr: a.transform.fm,
      rl: a.transform.Fm,
      rr: a.transform.Gm,
    };
  };
  Al.prototype.getVolume = function() {
    return this.__swiffy_v.volume;
  };
  Al.prototype.loadSound = function() {
    zh(
      na(function() {
        if (q(this.onLoad)) this.onLoad(!0);
      }, this),
      1
    );
  };
  Al.prototype.setPan = function(a) {
    a = Bl.call(this, a);
    var b = this.__swiffy_v;
    b.qm = -100 > a ? -200 - a : 100 < a ? 200 - a : a;
    b.transform = {
      Hj: 0 < a ? 100 - a : 100,
      Gm: 0 > a ? 100 + a : 100,
      fm: 0,
      Fm: 0,
    };
  };
  Al.prototype.setTransform = function(a) {
    if (a) {
      var b = this.__swiffy_v;
      l(a.ll) && (b.transform.Hj = Cl.call(this, a.ll));
      l(a.lr) && (b.transform.fm = Cl.call(this, a.lr));
      l(a.rl) && (b.transform.Fm = Cl.call(this, a.rl));
      l(a.rr) && (b.transform.Gm = Cl.call(this, a.rr));
      a = 100 - b.transform.Hj;
      b.qm = -100 > a ? -200 - a : 100 < a ? 200 - a : a;
    }
  };
  Al.prototype.setVolume = function(a) {
    this.__swiffy_v.volume = Bl.call(this, a);
  };
  Al.prototype.start = function() {
    zh(
      na(function() {
        if (q(this.onSoundComplete)) this.onSoundComplete();
      }, this),
      1
    );
  };
  Al.prototype.stop = function() {};
  Al.prototype.toString = function() {
    return '[object Object]';
  };
  C(Al.prototype, null, 3);
  var Bl = function(a) {
      a = this.__swiffy_vm.xh('Number')(a);
      return isNaN(a) ? -2147483648 : a >> 0;
    },
    Cl = function(a) {
      return this.__swiffy_vm.xh('Number')(a) >> 0;
    };
  var Dl = function() {
    this.showMenu = !0;
  };
  B(Dl, 'Stage');
  Object.defineProperty(Dl.prototype, 'height', {
    get: function() {
      var a = this.__swiffy_d;
      return 'noScale' == a.yc ? a.ed : a.ek;
    },
    set: function() {},
  });
  Object.defineProperty(Dl.prototype, 'width', {
    get: function() {
      var a = this.__swiffy_d;
      return 'noScale' == a.yc ? a.fd : a.fk;
    },
    set: function() {},
  });
  Object.defineProperty(Dl.prototype, 'align', {
    get: function() {
      var a = this.__swiffy_d.vd,
        b = '';
      a & 1 && (b += 'L');
      a & 2 && (b += 'T');
      a & 4 && (b += 'R');
      a & 8 && (b += 'B');
      return b;
    },
    set: function(a) {
      this.__swiffy_d.kr(String(a));
    },
  });
  Object.defineProperty(Dl.prototype, 'scaleMode', {
    get: function() {
      return this.__swiffy_d.yc;
    },
    set: function(a) {
      var b = this.__swiffy_d;
      switch (String(a).toLowerCase()) {
        case 'exactfit':
          a = 'exactFit';
          break;
        case 'noborder':
          a = 'noBorder';
          break;
        case 'noscale':
          a = 'noScale';
          break;
        default:
          a = 'showAll';
      }
      b.Dr(a);
    },
  });
  C(Dl.prototype, null, 3);
  var El = function() {
    this.allowDomain = function() {
      return !0;
    };
    this.allowInsecureDomain = function() {
      return !0;
    };
  };
  B(El, 'System.security');
  var Fl = function() {
    this.security = new El();
  };
  B(Fl, 'System');
  var Gl = function() {
    Qe(this, new Se());
  };
  B(Gl, 'TextFormat');
  var Hl = function(a) {
    var b = Object.create(Gl.prototype);
    Qe(b, a);
    return b;
  };
  Object.defineProperties(Gl.prototype, {
    align: { get: bf, set: cf, Za: !0 },
    blockIndent: { get: df, set: ef, Za: !0 },
    bold: { get: ff, set: gf, Za: !0 },
    bullet: { get: hf, set: jf, Za: !0 },
    color: { get: kf, set: lf, Za: !0 },
    font: { get: mf, set: nf, Za: !0 },
    indent: { get: of, set: pf, Za: !0 },
    italic: { get: qf, set: rf, Za: !0 },
    kerning: { get: sf, set: tf, Za: !0 },
    leading: { get: uf, set: vf, Za: !0 },
    leftMargin: { get: wf, set: xf, Za: !0 },
    letterSpacing: { get: yf, set: zf, Za: !0 },
    rightMargin: { get: Af, set: Bf, Za: !0 },
    size: { get: Cf, set: Df, Za: !0 },
    tabStops: { get: Gf, set: Hf, Za: !0 },
    target: { get: Ef, set: Ff, Za: !0 },
    underline: { get: If, set: Jf, Za: !0 },
    url: { get: Kf, set: Lf, Za: !0 },
  });
  var yl = function() {};
  B(yl, 'TextField', G);
  yl.prototype.getTextFormat = function(a, b) {
    var c = this.__swiffy_d;
    if (c) return (c = c.qp(a, b)), Hl(c);
  };
  yl.prototype.setTextFormat = function(a, b, c) {
    var d = this.__swiffy_d;
    if (d) {
      var e, f, h;
      a instanceof Gl
        ? (e = a)
        : b instanceof Gl
        ? ((e = b), (f = a))
        : c instanceof Gl && ((e = c), (f = a), (h = b));
      e && d.ak(w(e), f, h);
    }
  };
  yl.prototype.getNewTextFormat = function() {
    var a = this.__swiffy_d;
    if (a) return (a = a.kp()), Hl(a);
  };
  yl.prototype.setNewTextFormat = function(a) {
    var b = this.__swiffy_d;
    b && a instanceof Gl && b.Br(w(a));
  };
  var Il = function(a, b, c, d) {
    Object.defineProperty(yl.prototype, a, {
      get: function() {
        var a = this.__swiffy_d;
        if (a) return b.call(this, a);
      },
      set: function(a) {
        var b = this.__swiffy_d;
        b && c && c.call(this, b, a);
      },
      enumerable: l(d) ? d : !0,
    });
  };
  Il(
    'text',
    function(a) {
      var b = a.ua;
      a.Tb && (b = Gj(b, a.definition.multiline));
      return b;
    },
    function(a, b) {
      var c = a.c.J();
      b = c.ya(b);
      a.Tb && (a.Zj(!1), (b = Hj(b)));
      null != a.Jd() ? c.Cx(a.Jd(), a, b) : a.Bc(b);
      a.Zj(!0);
    }
  );
  Il(
    'htmlText',
    function(a) {
      return a.fp();
    },
    function(a, b) {
      var c = a.c.J();
      b = c.ya(b);
      null != a.Jd() ? c.bk(a.Jd(), b) : a.Bc(b);
    }
  );
  Il(
    'textColor',
    function(a) {
      return a.pp();
    },
    function(a, b) {
      a.Gr(Number(b));
    }
  );
  Il(
    'antiAliasType',
    function(a) {
      return a.vk;
    },
    function(a, b) {
      ('normal' != b && 'advanced' != b) || a.mr(String(b));
    }
  );
  Il(
    'autoSize',
    function(a) {
      return a.xf;
    },
    function(a, b) {
      switch (b) {
        case !0:
          b = 'left';
        case 'center':
        case 'left':
        case 'none':
        case 'right':
          break;
        default:
          b = 'none';
      }
      a.nr(b);
    }
  );
  Il(
    'background',
    function(a) {
      return a.ui;
    },
    function(a, b) {
      a.wg(!!b);
    },
    !1
  );
  Il(
    'backgroundColor',
    function(a) {
      return a.ti;
    },
    function(a, b) {
      a.or(Number(b));
    },
    !1
  );
  Il(
    'border',
    function(a) {
      return a.yi;
    },
    function(a, b) {
      a.pr(!!b);
    },
    !1
  );
  Il(
    'borderColor',
    function(a) {
      return a.xi;
    },
    function(a, b) {
      a.qr(Number(b));
    },
    !1
  );
  Il(
    'condenseWhite',
    function(a) {
      return a.$n;
    },
    function(a, b) {
      a.Nw(!!b);
    },
    !1
  );
  Il(
    'embedFonts',
    function(a) {
      return a.Jf;
    },
    function(a, b) {
      a.tr(!!b);
    }
  );
  Il(
    'gridFitType',
    function(a) {
      return a.up;
    },
    function(a, b) {
      ('none' != b && 'pixel' != b && 'subpixel' != b) || a.Sw(String(b));
    },
    !1
  );
  Il(
    'html',
    function(a) {
      return a.Tb;
    },
    function(a, b) {
      b = !!b;
      if (b != a.Tb) {
        var c = this.text;
        a.Tw(b);
        this.text = c;
      }
    }
  );
  Il('length', function() {
    return this.text.length;
  });
  Il(
    'maxChars',
    function(a) {
      return a.$p;
    },
    function(a, b) {
      a.Vw(null != b ? Number(b) : null);
    },
    !1
  );
  Il(
    'mouseWheelEnabled',
    function() {
      return !0;
    },
    void 0,
    !1
  );
  Il(
    'multiline',
    function(a) {
      return a.Ue;
    },
    function(a, b) {
      a.zr(!!b);
    }
  );
  Il(
    'password',
    function(a) {
      return a.tq;
    },
    function(a, b) {
      a.Xw(!!b);
    },
    !1
  );
  Il(
    'restrict',
    function(a) {
      return a.Em;
    },
    function(a, b) {
      a.Cr(null != b ? String(b) : null);
    },
    !1
  );
  Il(
    'selectable',
    function(a) {
      return a.Xh;
    },
    function(a, b) {
      a.Er(!!b);
    }
  );
  Object.defineProperty(yl.prototype, 'styleSheet', {
    value: void 0,
    enumerable: !1,
  });
  Il(
    'sharpness',
    function(a) {
      return a.Ir;
    },
    function(a, b) {
      a.bx(Number(b));
    },
    !1
  );
  Object.defineProperty(yl.prototype, 'tabIndex', {
    value: void 0,
    writable: !0,
    enumerable: !1,
  });
  Il('textHeight', function(a) {
    return Math.floor(a.Il() / 20);
  });
  Il('textWidth', function(a) {
    return Math.floor(a.Jl() / 20);
  });
  Il(
    'thickness',
    function(a) {
      return a.Zm;
    },
    function(a, b) {
      a.ex(Number(b));
    },
    !1
  );
  Il(
    'variable',
    function(a) {
      return a.Jd();
    },
    function(a, b) {
      a.bk(null != b ? String(b) : null);
    }
  );
  Il(
    'wordWrap',
    function(a) {
      return a.ki;
    },
    function(a, b) {
      a.Hr(!!b);
    }
  );
  Il(
    'type',
    function(a) {
      return a.Ui ? 'input' : 'dynamic';
    },
    function(a, b) {
      b = String(b).toLowerCase();
      'input' == b ? a.Km(!0) : 'dynamic' == b && a.Km(!1);
    },
    !1
  );
  C(yl.prototype, null, 3);
  var vi = function(a) {
    a instanceof fj || (a = (a = this.__swiffy_vm.Cg(a)) && a.__swiffy_d);
    Object.defineProperty(this, '__swiffy_d', { value: a });
  };
  B(vi, 'Transform');
  Gh(vi);
  ri(
    vi.prototype,
    'colorTransform',
    function(a) {
      return qi(a.nb);
    },
    function(a, b) {
      a.Gb(b instanceof pi ? b.__swiffy_v : $c);
    }
  );
  ui(vi.prototype, 'concatenatedColorTransform', function(a) {
    return qi(a.ld());
  });
  ui(vi.prototype, 'concatenatedMatrix', function(a) {
    return fi(a.ka());
  });
  ri(
    vi.prototype,
    'matrix',
    function(a) {
      return fi(a.wa());
    },
    function(a, b) {
      a.setTransform(ei(b));
    }
  );
  ui(vi.prototype, 'pixelBounds', function(a) {
    a = a.mp();
    return new li(a.l, a.m, a.width(), a.height());
  });
  var Jl = function() {};
  B(Jl, 'Video', G);
  Object.defineProperty(Jl.prototype, 'width', {
    get: function() {
      return this.__swiffy_d.width;
    },
  });
  Object.defineProperty(Jl.prototype, 'height', {
    get: function() {
      return this.__swiffy_d.height;
    },
  });
  Object.defineProperty(Jl.prototype, 'smoothing', {
    get: function() {
      return this.__swiffy_d.smoothing;
    },
    set: function(a) {
      this.__swiffy_d.smoothing = a;
    },
  });
  Object.defineProperty(Jl.prototype, 'deblocking', {
    get: function() {
      return this.__swiffy_d.deblocking;
    },
    set: function(a) {
      this.__swiffy_d.deblocking = a;
    },
  });
  Jl.prototype.attachVideo = function() {};
  Jl.prototype.clear = function() {};
  C(Jl.prototype, null, 3);
  var Ll = function(a, b) {
      if ('_' == b.charAt(0) && a instanceof G) {
        if (b in a) return b;
        var c = b.toLowerCase();
        if (c in Kl && c in a) return c;
      }
      return b;
    },
    Ol = function(a, b) {
      var c = Ml[typeof a];
      if (c) {
        var d = b.toLowerCase();
        return (c = c[d]) ? c : d;
      }
      if (b in a) return b;
      var e = Nl(a),
        d = b.toLowerCase();
      return (c = e[d]) ? c : b == d || d in a ? d : (e[d] = b);
    },
    Pl = function(a, b) {
      if ('_' == b.charAt(0) && a instanceof G) {
        if (b in a) return b;
        var c = b.toLowerCase();
        if (c in Kl && c in a) return c;
      }
      return b;
    },
    Ql = function(a, b) {
      var c = Ml[typeof a];
      if (!c) {
        if (b in a) return b;
        c = Nl(a);
      }
      var d = b.toLowerCase();
      return (c = c[d]) ? c : d;
    },
    Rl = function(a) {
      a = a instanceof fh ? a.getParent() : a;
      return (a = this.wl(a, sj));
    },
    Sl = function(a) {
      a = a instanceof fh ? a.getParent() : a;
      return (a = this.wl(a, Pj));
    },
    Tl = function(a) {
      return ha(a)
        ? a
        : !l(a) || null === a || (fa(a) && '' === a.trim())
        ? Number.NaN
        : Number(a);
    },
    Ul = function(a) {
      return ha(a)
        ? a
        : l(a) && null !== a
        ? fa(a) && '' === a.trim()
          ? Number.NaN
          : Number(a)
        : 0;
    },
    Vl = function(a) {
      return ha(a)
        ? a
        : l(a) && null !== a
        ? fa(a)
          ? ((a = Number(a)), isNaN(a) ? 0 : a)
          : Number(a)
        : 0;
    },
    Wl = function(a) {
      if (fa(a)) return a;
      ga(a) && (a = a ? '1' : '0');
      return l(a)
        ? a instanceof G
          ? (a = a.__swiffy_d)
            ? a.kj()
            : ''
          : a + ''
        : '';
    },
    Xl = function(a) {
      return fa(a)
        ? a
        : l(a)
        ? a instanceof G
          ? (a = a.__swiffy_d)
            ? a.kj()
            : ''
          : a + ''
        : '';
    },
    Yl = function(a) {
      return fa(a)
        ? a
        : a instanceof G
        ? (a = a.__swiffy_d)
          ? a.kj()
          : ''
        : a + '';
    },
    Zl = function(a) {
      return Boolean(a);
    },
    $l = function(a) {
      return 'string' == typeof a ? Boolean(Number(a)) : Boolean(a);
    },
    am = function(a, b) {
      return a == b ? 1 : 0;
    },
    bm = function(a, b) {
      return a == b;
    },
    cm = function(a, b) {
      var c = typeof a,
        d = typeof b;
      return 'number' === c && 'number' === d ? a == b : this.Wo(a, c, b, d);
    },
    dm = function(a, b) {
      var c = typeof a,
        d = typeof b;
      return c === d && (null === a) === (null === b)
        ? a == b
        : this.Wo(a, c, b, d);
    };
  var em = function(a, b) {
    Object.defineProperty(this, 'nodeType', { value: a, writable: !1 });
    Object.defineProperty(this, 'attributes', { value: {}, writable: !1 });
    1 == a
      ? ((this.nodeName = b), (this.nodeValue = null))
      : ((this.nodeName = null), (this.nodeValue = b));
    Object.defineProperty(this, '__swiffy_v', {
      value: {
        nextSibling: null,
        previousSibling: null,
        parentNode: null,
        childNodes: [],
      },
    });
  };
  B(em, 'XMLNode');
  var fm = function(a) {
    return a.__swiffy_v;
  };
  Object.defineProperty(em.prototype, 'childNodes', {
    get: function() {
      return fm(this).childNodes.slice(0);
    },
  });
  Object.defineProperty(em.prototype, 'firstChild', {
    get: function() {
      return fm(this).childNodes[0];
    },
  });
  Object.defineProperty(em.prototype, 'lastChild', {
    get: function() {
      var a = fm(this).childNodes;
      return a[a.length - 1];
    },
  });
  Object.defineProperty(em.prototype, 'nextSibling', {
    get: function() {
      return fm(this).nextSibling;
    },
  });
  Object.defineProperty(em.prototype, 'parentNode', {
    get: function() {
      return fm(this).parentNode;
    },
  });
  Object.defineProperty(em.prototype, 'previousSibling', {
    get: function() {
      return fm(this).previousSibling;
    },
  });
  em.prototype.toString = function() {
    return gm(this, !1, 0);
  };
  var gm = function(a, b, c) {
    b = 'undefined' !== typeof b ? b : !1;
    c = 'undefined' !== typeof c ? c : 0;
    var d = '';
    if (b) for (var e = 0; e < c; e++) d += '  ';
    var f = b ? '\n' : '';
    if (3 == a.nodeType) return d + Hd(a.nodeValue) + f;
    var h = '';
    if (null == a.nodeName)
      a.xmlDecl && (h += d + a.xmlDecl + f),
        a.docTypeDecl && (h += d + a.docTypeDecl + f);
    else {
      var h = h + (d + '<' + a.nodeName),
        k;
      for (k in a.attributes) h += ' ' + k + '="' + a.attributes[k] + '"';
      if (0 == fm(a).childNodes.length) return h + ' />';
      h += '>' + f;
    }
    k = fm(a).childNodes;
    for (e = 0; e < k.length; e++) h += gm(k[e], b, c + 1);
    null != a.nodeName && (h += d + '</' + a.nodeName + '>' + f);
    return h;
  };
  em.prototype.appendChild = function(a) {
    if (!~fm(this).childNodes.indexOf(a)) {
      a.removeNode();
      var b = this.lastChild;
      fm(this).childNodes.push(a);
      b && ((fm(b).nextSibling = a), (fm(a).previousSibling = b));
      fm(a).parentNode = this;
    }
  };
  em.prototype.insertBefore = function(a, b) {
    var c = fm(this).childNodes;
    if (!~c.indexOf(a)) {
      var d = c.indexOf(b);
      if (~d) {
        a.removeNode();
        fm(a).parentNode = this;
        var e = c[d - 1],
          f = c[d];
        c.splice(d, 0, a);
        e
          ? ((fm(e).nextSibling = a), (fm(a).previousSibling = e))
          : (fm(a).previousSibling = null);
        f
          ? ((fm(f).previousSibling = a), (fm(a).nextSibling = f))
          : (fm(a).nextSibling = null);
      }
    }
  };
  em.prototype.removeNode = function() {
    var a = fm(this);
    a.parentNode && Ga(fm(a.parentNode).childNodes, this);
    a.nextSibling && (fm(a.nextSibling).previousSibling = a.previousSibling);
    a.previousSibling && (fm(a.previousSibling).nextSibling = a.nextSibling);
    a.nextSibling = null;
    a.previousSibling = null;
    a.parentNode = null;
  };
  em.prototype.cloneNode = function(a) {
    var b = new em(this.nodeType, null);
    b.nodeName = this.nodeName;
    b.nodeValue = this.nodeValue;
    for (var c in this.attributes) b.attributes[c] = this.attributes[c];
    if (a) {
      c = fm(this).childNodes;
      for (var d = fm(b).childNodes, e = 0; e < c.length; e++) {
        var f = c[e].cloneNode(a);
        d[e] = f;
      }
    }
    return b;
  };
  em.prototype.hasChildNodes = function() {
    return 0 < fm(this).childNodes.length;
  };
  var hm = function(a, b, c) {
      for (var d = null, e = fm(b), f; (f = c.next()); ) {
        var h;
        switch (f.type) {
          case 'close':
            return f.value;
          case 'tag':
            h = 1;
            break;
          case 'text':
          case 'cdata':
            h = 3;
            break;
          case 'xml_declaration':
            a.xmlDecl || (a.xmlDecl = '');
            a.xmlDecl += f.value;
            continue;
          case 'doctype':
            a.docTypeDecl = f.value;
            continue;
          default:
            continue;
        }
        h = new em(h, f.value);
        var k = fm(h);
        k.parentNode = b;
        d && ((k.previousSibling = d), (fm(d).nextSibling = h));
        d = h;
        e.childNodes.push(h);
        if ('tag' == f.type) {
          if (f.attributes)
            for (k = 0; k < f.attributes.length; k++) {
              var m = f.attributes[k];
              h.attributes[m.name] = m.value;
            }
          h = hm(a, h, c);
          if (null === h || h != f.value) return (a.status = -9), h;
        }
      }
      return null;
    },
    im = function(a) {
      em.call(this, 1, null);
      ml(this);
      a && this.parseXML(a);
    };
  B(im, 'XML', em);
  Gh(im);
  im.prototype.status = 0;
  im.prototype.createElement = function(a) {
    return new em(1, a);
  };
  im.prototype.createTextNode = function(a) {
    return new em(3, a);
  };
  im.prototype.addRequestHeader = function(a, b) {
    nl(this, a, b);
  };
  im.prototype.load = function(a) {
    pl(a, this);
  };
  im.prototype.send = function(a, b, c) {
    if (0 == arguments.length) return !1;
    ql(a, this.toString(), b, c);
    return !0;
  };
  im.prototype.sendAndLoad = function(a, b, c) {
    pl(a, b, this, c);
  };
  im.prototype.onData = function(a) {
    var b = l(a);
    b && ol(this.parseXML, this, a);
    this.loaded = b;
    ol(this.onLoad, this, b);
  };
  im.prototype.onLoad = function() {};
  im.prototype.parseXML = function(a) {
    for (var b = fm(this).childNodes, c = b.length - 1; 0 <= c; c--)
      b[c].removeNode();
    for (var d in this.attributes) delete this.attributes[d];
    this.docTypeDecl = this.xmlDecl = void 0;
    a = new Pd(a, this.ignoreWhite, !0);
    try {
      (this.status = 0), null !== hm(this, this, a) && (this.status = -10);
    } catch (e) {
      this.status = jm(e.type);
    }
  };
  var jm = function(a) {
    switch (a) {
      case 'cdata':
        return -2;
      case 'xml_declaration':
        return -3;
      case 'doctype':
        return -4;
      case 'comment':
        return -5;
      case 'tag':
      case 'close':
        return -6;
      case 'attribute':
        return -8;
      default:
        return -1;
    }
  };
  C(im.prototype, null, 3);
  var mm = function(a) {
    Object.defineProperty(this, '__swiffy_vm', { value: a });
    this.String = km(
      String,
      function(b) {
        return a.ya(b);
      },
      ['fromCharCode']
    );
    C(this, 'String', 3);
    this.Number = km(
      Number,
      function(b) {
        return a.pd(b);
      },
      [
        'MAX_VALUE',
        'MIN_VALUE',
        'NaN',
        'NEGATIVE_INFINITY',
        'POSITIVE_INFINITY',
      ]
    );
    C(this, 'Number', 3);
    this.Boolean = km(Boolean, function(b) {
      return a.cn(b);
    });
    C(this, 'Boolean', 3);
    this.AsBroadcaster = new Th(a);
    C(this, 'AsBroadcaster', 3);
    this.setInterval = function() {
      return lm(a, Ah, arguments);
    };
    C(this, 'setInterval', 3);
    this.setTimeout = function() {
      return lm(a, zh, arguments);
    };
    C(this, 'setTimeout', 3);
    this.getVersion = function() {
      return 'HTML 11,0,0,0';
    };
    C(this, 'getVersion', 3);
    this.updateAfterEvent = function() {
      a.c.H.$h();
    };
    C(this, 'updateAfterEvent', 3);
    this.escape = function(b) {
      return encodeURIComponent(a.ya(b)).replace(/[.!*'()]/g, function(a) {
        return (
          '%' +
          a
            .charCodeAt(0)
            .toString(16)
            .toUpperCase()
        );
      });
    };
    C(this, 'escape', 3);
    this.unescape = function(b) {
      return Hi(a.ya(b));
    };
    C(this, 'unescape', 3);
    this._global = this;
    C(this, '_global', 3);
    Object.prototype.hasOwnProperty('addProperty') ||
      ((Function.prototype.toString = function() {
        return '[type Function]';
      }),
      (Object.prototype.unwatch = function(a) {
        if (1 > arguments.length) return !1;
        var c = this[a];
        delete this[a];
        this[a] = c;
        return !0;
      }),
      (Object.prototype.watch = function(a, c, d) {
        if (2 > arguments.length) return !1;
        for (var e = this, f = null, h = this; h; h = Object.getPrototypeOf(h))
          if (null != Object.getOwnPropertyDescriptor(h, a)) {
            e = h;
            f = Object.getOwnPropertyDescriptor(h, a);
            break;
          }
        if (!f || f.configurable) {
          var k = e[a];
          delete e[a];
          Object.defineProperty(e, a, {
            get: function() {
              return k;
            },
            set: function(e) {
              return (k = c.call(this, a, k, e, d));
            },
            configurable: !0,
          });
        }
        return !0;
      }),
      (Object.prototype.addProperty = function(a, c, d) {
        var e = Object.getOwnPropertyDescriptor(this, a);
        if (
          null == a ||
          '' == a ||
          !q(c) ||
          (d && !q(d)) ||
          (e && !e.configurable)
        )
          return !1;
        if (!d || (e && !e.writable)) d = function() {};
        Object.defineProperty(this, a, {
          get: c,
          set: d,
          configurable: !0,
          enumerable: !(e && !e.enumerable),
        });
        return !0;
      }),
      C(Object.prototype, ['watch', 'unwatch', 'addProperty'], 3));
  };
  B(mm, 'global');
  var km = function(a, b, c) {
      b.__swiffy_override = function(c) {
        return new a(b(c));
      };
      b.__swiffy_wrapped_type = a;
      if (l(c)) for (var d = 0; d < c.length; d++) b[c[d]] = a[c[d]];
      C(b, null, 3);
      return b;
    },
    nm = function(a, b, c, d) {
      Object.defineProperty(a.prototype, b, {
        get: c,
        set: d || function() {},
      });
    };
  mm.prototype.ASSetPropFlags = function(a, b, c, d) {
    ia(a) && C(a, b, c, d);
  };
  mm.prototype.clearInterval = function(a) {
    Ch(a);
  };
  mm.prototype.clearTimeout = function(a) {
    Ch(a);
  };
  mm.prototype.parseFloat = parseFloat;
  mm.prototype.parseInt = function(a, b) {
    !l(b) && Bi(a) && (b = 8);
    return parseInt(a, b);
  };
  mm.prototype.isFinite = function(a) {
    return isFinite(a);
  };
  mm.prototype.isNaN = function(a) {
    return isNaN(a);
  };
  var lm = function(a, b, c) {
    var d = c[0];
    if (q(d) && 2 <= c.length) {
      var e = Array.prototype.slice.call(c, 2);
      c = c[1];
      return b(function() {
        d.apply(di(null), e);
        a.va();
      }, c);
    }
    if (ia(d) && 3 <= c.length) {
      var f = c[1],
        e = Array.prototype.slice.call(c, 3);
      c = c[2];
      return b(function() {
        q(d[f]) && (d[f].apply(di(d), e), a.va());
      }, c);
    }
  };
  mm.prototype.Array = Array;
  mm.prototype.AsBroadcaster = Th;
  mm.prototype.Button = wl;
  mm.prototype.flash = {
    display: { BitmapData: gl },
    external: { ExternalInterface: Zh },
    filters: {
      BevelFilter: ne,
      BlurFilter: Zd,
      ColorMatrixFilter: be,
      ConvolutionFilter: qe,
      DropShadowFilter: ue,
      GlowFilter: $h,
      GradientBevelFilter: ye,
      GradientGlowFilter: Be,
    },
    geom: {
      ColorTransform: pi,
      Matrix: ci,
      Point: hi,
      Rectangle: li,
      Transform: vi,
    },
  };
  mm.prototype.Color = il;
  mm.prototype.Date = Date;
  nm(Date, 'date', Date.prototype.getDate, Date.prototype.setDate);
  nm(Date, 'dateUTC', Date.prototype.getUTCDate, Date.prototype.setUTCDate);
  nm(Date, 'day', Date.prototype.getDay);
  nm(Date, 'dayUTC', Date.prototype.getUTCDay);
  nm(Date, 'fullYear', Date.prototype.getFullYear, Date.prototype.setFullYear);
  nm(
    Date,
    'fullYearUTC',
    Date.prototype.getUTCFullYear,
    Date.prototype.setUTCFullYear
  );
  nm(Date, 'hours', Date.prototype.getHours, Date.prototype.setHours);
  nm(Date, 'hoursUTC', Date.prototype.getUTCHours, Date.prototype.setUTCHours);
  nm(
    Date,
    'milliseconds',
    Date.prototype.getMilliseconds,
    Date.prototype.setMilliseconds
  );
  nm(
    Date,
    'millisecondsUTC',
    Date.prototype.getUTCMilliseconds,
    Date.prototype.setUTCMilliseconds
  );
  nm(Date, 'minutes', Date.prototype.getMinutes, Date.prototype.setMinutes);
  nm(
    Date,
    'minutesUTC',
    Date.prototype.getUTCMinutes,
    Date.prototype.setUTCMinutes
  );
  nm(Date, 'month', Date.prototype.getMonth, Date.prototype.setMonth);
  nm(Date, 'monthUTC', Date.prototype.getUTCMonth, Date.prototype.setUTCMonth);
  nm(Date, 'seconds', Date.prototype.getSeconds, Date.prototype.setSeconds);
  nm(
    Date,
    'secondsUTC',
    Date.prototype.getUTCSeconds,
    Date.prototype.setUTCSeconds
  );
  nm(Date, 'time', Date.prototype.getTime, Date.prototype.setTime);
  nm(Date, 'timezoneOffset', Date.prototype.getTimezoneOffset);
  mm.prototype.Error = Yh;
  mm.prototype.Function = jl;
  mm.prototype.LoadVars = xl;
  mm.prototype.Math = Math;
  mm.prototype.MovieClip = H;
  mm.prototype.MovieClipLoader = zl;
  mm.prototype.NetConnection = ji;
  mm.prototype.NetStream = ki;
  mm.prototype.Object = di;
  Object.defineProperty(di, '__swiffy_override', { value: ni });
  Object.defineProperty(di, '__swiffy_wrapped_type', { value: Object });
  mm.prototype.Sound = Al;
  mm.prototype.System = new Fl();
  mm.prototype.TextField = yl;
  mm.prototype.TextFormat = Gl;
  mm.prototype.XML = im;
  mm.prototype.XMLNode = em;
  mm.prototype.Video = Jl;
  Object.defineProperty(mm.prototype, 'Key', {
    get: function() {
      return this.__swiffy_vm.getKey();
    },
    set: function() {},
  });
  Object.defineProperty(mm.prototype, 'Mouse', {
    get: function() {
      return this.__swiffy_vm.ag;
    },
    set: function() {},
  });
  Object.defineProperty(mm.prototype, 'Stage', {
    get: function() {
      return this.__swiffy_vm.c.H.t;
    },
    set: function() {},
  });
  C(mm.prototype, null, 3);
  B(Array, 'Array');
  B(Boolean, 'Boolean');
  B(Date, 'Date');
  B(Math, 'Math');
  B(Number, 'Number');
  B(String, 'String');
  var om = function(a, b) {
    this.object = a;
    this.method = b;
  };
  om.prototype.op = function() {
    for (var a = this.object; (a = Object.getPrototypeOf(a)); )
      for (var b = Object.getOwnPropertyNames(a), c = 0; c < b.length; c++)
        if (a[b[c]] === this.method) return Object.getPrototypeOf(a);
    return null;
  };
  var pm = function(a, b) {
    this.P = a;
    this.data = {};
    this.kb = b;
  };
  g = pm.prototype;
  g.get = function(a) {
    var b = this.P.Ba(this.data, a);
    return b in this.data ? this.data[b] : this.kb.get(a);
  };
  g.call = function(a, b) {
    var c = this.P.Ba(this.data, a);
    return c in this.data
      ? ((c = this.data[c]),
        c instanceof om
          ? this.P.wd(
              c.object,
              Object.getPrototypeOf(c.method.prototype).constructor,
              b,
              'super'
            )
          : this.P.wd(this.Nb(), c, b, a))
      : this.kb.call(a, b);
  };
  g.set = function(a, b) {
    var c = this.P.Ba(this.data, a);
    return c in this.data ? ((this.data[c] = b), !0) : this.kb.set(a, b);
  };
  g.zd = function(a, b) {
    this.P.Zh(this.data, a, b);
  };
  g.Ki = function(a) {
    a = this.P.qe(this.data, a);
    a in this.data || (this.data[a] = void 0);
  };
  g.Ff = function(a) {
    return this.P.Ba(this.data, a) in this.data ? !1 : this.kb.Ff(a);
  };
  g.ee = function(a) {
    this.kb.ee(a);
  };
  g.Nb = function() {
    return this.kb.Nb();
  };
  g.Sf = function() {
    return this.kb.Sf();
  };
  var qm = function(a, b, c) {
    this.P = a;
    this.data = c;
    this.kb = b;
  };
  g = qm.prototype;
  g.get = function(a) {
    var b = this.P.Ba(this.data, a);
    return b in this.data ? this.data[b] : this.kb.get(a);
  };
  g.call = function(a, b) {
    var c = this.P.Ba(this.data, a);
    return c in this.data
      ? this.P.wd(this.data, this.data[c], b, a)
      : this.kb.call(a, b);
  };
  g.set = function(a, b) {
    var c = this.P.Ba(this.data, a);
    return c in this.data ? ((this.data[c] = b), !0) : this.kb.set(a, b);
  };
  g.zd = function(a, b) {
    var c = this.P.Ba(this.data, a);
    c in this.data ? (this.data[c] = b) : this.kb.zd(a, b);
  };
  g.Ki = function(a) {
    this.P.Ba(this.data, a) in this.data || this.kb.Ki(a);
  };
  g.Ff = function(a) {
    var b = this.P.Ba(this.data, a);
    return b in this.data ? this.P.dc(this.data, b) : this.kb.Ff(a);
  };
  g.ee = function(a) {
    this.kb.ee(a);
  };
  g.Nb = function() {
    return this.kb.Nb();
  };
  g.Sf = function() {
    return this.kb.Sf();
  };
  var rm = function(a, b) {
    this.P = a;
    this.$m = this.Ym = this.data = b;
  };
  g = rm.prototype;
  g.get = function(a) {
    var b = this.P.Ba(this.data, a);
    return b in this.data
      ? this.data[b]
      : 'this' == a.toLowerCase()
      ? this.$m
      : this.P.xh(a);
  };
  g.call = function(a, b) {
    var c = this.P.Ba(this.data, a),
      c = c in this.data ? this.data[c] : this.P.xh(a);
    return this.P.wd(this.data, c, b, a);
  };
  g.set = function(a, b) {
    this.P.Zh(this.data, a, b);
    return !0;
  };
  g.zd = function(a, b) {
    this.P.Zh(this.data, a, b);
  };
  g.Ki = function(a) {
    a = this.P.qe(this.data, a);
    a in this.data || (this.data[a] = void 0);
  };
  g.Ff = function(a) {
    var b = this.P.Ba(this.data, a);
    return b in this.data
      ? this.P.dc(this.data, b)
      : this.P.dc(this.P.$a, this.P.Ba(this.P.$a, a));
  };
  g.ee = function(a) {
    a ? (this.data = this.Ym = a) : ((this.Ym = null), (this.data = this.$m));
  };
  g.Nb = function() {
    return this.Ym;
  };
  g.Sf = function() {
    return this.$m;
  };
  var ch = function(a) {
    this.gx(a.Rc);
    this.La = [];
    this.Zb = 0;
    this.ub = this.Cc = 4;
    this.bo = [];
    this.c = a;
    this.Cf = [];
    this.td = [];
    this.sl = !1;
    this.bl = this.k = null;
    this.$a = new mm(this);
    this.Ud = new Pe();
    this.ag = new ii();
    this.Eh(this.ag);
    this.Vf = new ai();
    this.Eh(this.Vf);
    this.cm();
    this.fx();
  };
  g = ch.prototype;
  g.Do = !1;
  g.gx = function(a) {
    this.qe = Ol;
    this.ma = cm;
    this.Ba = Ql;
    this.lp = Sl;
    this.fq = am;
    this.cn = $l;
    this.pd = Vl;
    this.ya = Wl;
    5 <= a &&
      ((this.fq = bm),
      (this.pd = Ul),
      (this.ya = Xl),
      6 <= a &&
        ((this.ma = dm),
        (this.lp = Rl),
        7 <= a &&
          ((this.qe = Ll),
          (this.Ba = Pl),
          (this.cn = Zl),
          (this.pd = Tl),
          (this.ya = Yl))));
  };
  g.fx = function() {
    var a = this,
      b = this.c.Pc;
    b.SetVariable = function(b, d) {
      var e = a.bi(String(b), a.c.Ja.t);
      if (e) {
        var f = a.qe(e.path, e.Rh);
        e.path[f] = String(d);
      }
    };
    b.GetVariable = function(b) {
      if ((b = a.bi(String(b), a.c.Ja.t))) {
        var d = a.Ba(b.path, b.Rh);
        return d in b.path ? String(b.path[d]) : null;
      }
      return null;
    };
  };
  g.getKey = function() {
    return this.Vf;
  };
  g.Cq = function(a) {
    this.td.push(function() {
      this.il(a);
    });
  };
  g.ng = function(a) {
    this.td.push(a);
  };
  g.va = function() {
    if (!this.sl) {
      for (this.sl = !0; this.Cf.length || this.td.length; )
        this.Cf.length
          ? this.Cf.shift().call(this)
          : this.td.shift().call(this);
      this.sl = !1;
    }
  };
  g.Jo = function(a, b) {
    try {
      a();
    } catch (c) {
      throw (b(c), c);
    }
  };
  g.Eh = function(a) {
    this.xh('AsBroadcaster').initialize(a);
  };
  g.reset = function(a) {
    this.La = [];
    this.Zb = 0;
    this.ub = this.Cc = 4;
    this.k = new rm(this, a.t);
  };
  g.il = function(a) {
    a.oh.Od() || (this.reset(a.oh), a.av());
  };
  var sm = function(a) {
      a = a.replace(/\.\.|\/:?|:/g, function(a) {
        return '..' == a ? '_parent' : '.';
      });
      '.' == a[0] && (a = '_root' + a);
      '.' == a[a.length - 1] && (a = a.substring(0, a.length - 1));
      return a;
    },
    tm = function(a) {
      for (var b = [], c = 0, d = a.length, e = 0; e < d; e++)
        switch (a[e]) {
          case '.':
            var f = e + 1;
            if (f != d && '.' == a[f]) {
              e > c && b.push(a.substring(c, e));
              b.push('_parent');
              c = e + 2;
              e++;
              break;
            }
          case ':':
            e > c && b.push(a.substring(c, e));
            c = e + 1;
            break;
          case '/':
            0 == e ? b.push('_root') : e > c && b.push(a.substring(c, e)),
              (c = e + 1);
        }
      e > c
        ? b.push(0 == c && e == d ? a : a.substring(c, e))
        : 0 == b.length && b.push('');
      return b;
    };
  ch.prototype.bi = function(a, b) {
    if ((b = b || this.Nb())) {
      var c = 0 < a.indexOf(':') ? a.split(':') : a.split('.');
      if (1 < c.length) {
        var d = c.slice(0, c.length - 1).join('.');
        b = this.vh(d, b);
      }
      if (b) return { path: b, Rh: c[c.length - 1] };
    }
  };
  ch.prototype.xh = function(a) {
    return this.Sa(this.$a, a);
  };
  var Ml = {
      boolean: {},
      number: {},
      string: {},
      object: void 0,
      function: void 0,
      undefined: {},
    },
    um = function(a) {
      var b = Object.getOwnPropertyNames(a.constructor.prototype);
      a = Ml[typeof a];
      for (var c = 0; c < b.length; ++c) {
        var d = b[c],
          e = d.toLowerCase();
        d != e && (a[e] = d);
      }
    };
  um(!1);
  um(0);
  um('');
  var Nl = function(a) {
    if (!a) return { constructor: 'constructor' };
    var b = a.__swiffy_nm;
    if (!b || b.__swiffy_nm != a) {
      for (
        var b = Object.create(Nl(Object.getPrototypeOf(a))),
          c = Object.getOwnPropertyNames(a),
          d = 0;
        d < c.length;
        ++d
      ) {
        var e = c[d],
          f = e.toLowerCase();
        e != f && (b[f] = e);
      }
      Object.defineProperty(b, '__swiffy_nm', { value: a, writable: !0 });
      Object.defineProperty(a, '__swiffy_nm', { value: b, writable: !0 });
    }
    return b;
  };
  g = ch.prototype;
  g.bq = function(a, b) {
    if (ia(a)) {
      var c = this.Ba(a, 'x'),
        d = this.Ba(a, 'y'),
        e = a[c],
        f = a[d];
      ha(e) &&
        ha(f) &&
        ((e = new Ic(20 * e, 20 * f)),
        b(e),
        (a[c] = e.x / 20),
        (a[d] = e.y / 20));
    }
  };
  g.Nb = function() {
    return this.k.Nb();
  };
  g.Id = function() {
    var a = this.k.Nb();
    return a ? a.__swiffy_d : null;
  };
  g.push = function(a) {
    this.La[this.ub++] = a;
  };
  g.pop = function() {
    if (this.ub > this.Cc) {
      var a = this.La[--this.ub];
      this.La[this.ub] = void 0;
      return a;
    }
  };
  g.N = function() {
    return this.pd(this.pop());
  };
  g.ta = function() {
    return this.ya(this.pop());
  };
  g.$d = function() {
    return this.cn(this.pop());
  };
  g.xq = function() {
    return this.Cg(this.pop());
  };
  g.Sj = function() {
    for (
      var a = Number(this.pop()),
        a = Math.min(a, this.ub - this.Cc),
        b = [],
        c = 0;
      c < a;
      ++c
    )
      b[c] = this.pop();
    return b;
  };
  g.Cg = function(a) {
    if (a instanceof G || (a = this.Qo(String(a)))) return a;
  };
  g.vh = function(a, b) {
    if (a)
      for (var c = tm(a), d = 0; d < c.length && b; d++) b = this.Sa(b, c[d]);
    return b;
  };
  g.Qo = function(a) {
    return this.vh(a, this.Nb());
  };
  g.Vd = function() {
    this.ag.Vd();
  };
  g.Zf = function() {
    this.Gf(new Jc(4));
    this.va();
    this.ag.Zf();
  };
  g.$f = function() {
    this.ag.$f();
  };
  g.Mp = function() {
    return this.ag.__swiffy_mv;
  };
  g.nm = function() {
    this.c.H.t.broadcastMessage('onResize');
  };
  g.Cj = function(a) {
    this.Vf.Cj(a);
  };
  g.In = function() {
    this.Vf.broadcastMessage('onKeyUp');
  };
  g.Bj = function(a) {
    this.Vf.Bj(a);
  };
  g.Hn = function() {
    this.Vf.broadcastMessage('onKeyDown');
  };
  g.nl = function() {};
  g.Mo = function() {};
  g.Uh = function() {};
  g.dm = function() {};
  g.jo = function(a, b, c) {
    b = this.Ba(a, b);
    var d = !(b in a);
    if (!d) {
      var e = a.__swiffy_child_ref[b];
      e &&
        ((d = a[b]), (d = d === e && d.__swiffy_d.depth > c.__swiffy_d.depth));
    }
    d && ((b = this.qe(a, b)), (a[b] = c), (a.__swiffy_child_ref[b] = c));
  };
  g.Qq = function(a, b, c) {
    b = this.Ba(a, b);
    c === a[b] && (delete a[b], delete a.__swiffy_child_ref[b]);
  };
  g.zm = function(a, b, c) {
    this.Cf.push(function() {
      this.ww(a, b, c);
    });
  };
  g.ww = function(a, b, c) {
    this.jm(a, b, function(a, e, f, h) {
      var k = c;
      l(h.rh[f]) || (h.rh[f] = []);
      h.rh[f].push(b);
      f in e && (b.Bc(String(e[f])), (k = e[f]));
      Object.defineProperty(e, f, a.zt(k, h.rh[f]));
    });
  };
  g.fn = function(a, b) {
    this.Cf.push(function() {
      this.Bx(a, b);
    });
  };
  g.Bx = function(a, b) {
    this.jm(a, b, function(a, d, e, f) {
      (a = f.rh[e]) && Ga(a, b);
    });
  };
  g.Cx = function(a, b, c) {
    this.jm(a, b, function(a, b, f) {
      b[f] = c;
    });
  };
  g.jm = function(a, b, c) {
    if ((b = this.wl(b, Pj)))
      (a = sm(a)),
        (a = (b = this.bi(a, b.t)) && b.path) &&
          a.__swiffy_d &&
          ((b = this.qe(a, b.Rh)), c(this, a, b, a.__swiffy_d));
  };
  g.wl = function(a, b) {
    for (var c = a; c && !(c instanceof b); ) c = c.getParent();
    return c;
  };
  g.Gq = function(a, b) {
    var c = -16384 + b,
      d = '_level' + b;
    d in H.prototype ||
      Object.defineProperty(H.prototype, d, {
        get: function() {
          var a = this.__swiffy_d;
          if (a && (a = a.c.H.Ic(c))) return a.t;
        },
        set: function(a) {
          Object.defineProperty(this, d, {
            value: a,
            configurable: !0,
            writable: !0,
            enumerable: !0,
          });
        },
      });
  };
  g.fireEvent = function(a, b, c, d) {
    var e = ul[c.type];
    c = !1;
    if (b)
      for (var f = 0; f < b.actions.length; ++f) {
        var h = b.actions[f];
        if (!h.ao || h.ao(this))
          h.Ck && (d ? this.il(h.Ck) : this.Cq(h.Ck)),
            h.stopPropagation && (c = !0);
      }
    if (e) {
      var k = this;
      b = function() {
        var b = k.Sa(a, e);
        q(b) && b.call(a);
      };
      d ? b() : this.ng(b);
    }
    return c;
  };
  g.cm = function() {
    var a = this;
    fj.prototype.na = function() {
      return Object.create(G.prototype);
    };
    tj.prototype.na = function() {
      var b = Object.create(yl.prototype);
      a.Eh(b);
      b.addListener(b);
      return b;
    };
    Wj.prototype.na = function() {
      var b = Object.create(Dl.prototype);
      a.Eh(b);
      return b;
    };
    sj.prototype.na = function() {
      return Object.create(vl.prototype);
    };
    Pj.prototype.na = function() {
      var a = void 0,
        c = this.definition.Gj;
      c && (a = oi[c]);
      return Object.create((a ? a : H).prototype);
    };
    fh.prototype.na = function() {
      return Object.create(wl.prototype);
    };
    dj.prototype.na = function() {
      return {};
    };
    sh.prototype.na = function() {
      return Object.create(Jl.prototype);
    };
  };
  g.co = function(a, b) {
    var c = a.t;
    b
      ? (this.Cf.push(function() {
          a.fireEvent(new Jc(19), !0);
          c.constructor();
        }),
        a.fireEvent(new Jc(7)),
        a.ah())
      : (a.ah(),
        a.fireEvent(new Jc(19), !0),
        c.constructor(),
        a.fireEvent(new Jc(7)));
  };
  g.jq = function() {};
  g.zt = function(a, b) {
    var c = a,
      d = this;
    return {
      get: function() {
        return c;
      },
      set: function(a) {
        c = a;
        a = d.ya(a);
        for (var f = 0; f < b.length; f++) b[f].Bc(a);
      },
      configurable: !0,
    };
  };
  g.dc = function(a, b) {
    if (null != a) {
      var c = b in a,
        d = delete a[b];
      delete a[b];
      this.Gw(a, b);
      return c && d;
    }
    return !1;
  };
  g.Gw = function(a, b) {
    if (a instanceof H) {
      var c = a.__swiffy_d;
      c && (c = c.G.bp(b)) && Fe(a, c, b);
    }
  };
  g.ur = function(a, b) {
    this.c.Ja.t[a] = b;
  };
  g.Qf = function() {
    return this.Ud;
  };
  g.Ei = function(a) {
    a = this.Zg(a, 4);
    a = 'return ' + vm(wm, a);
    return Function('vm', a)(this);
  };
  g.Kf = function(a, b, c, d, e) {
    Lh(120);
    var f = Je;
    Je = this;
    try {
      var h = a(b, c, d, e);
      --Kh;
      return h;
    } catch (k) {
      Mh(k);
    } finally {
      Je = f;
    }
  };
  g.Zg = function(a, b) {
    return a ? 'function(){' + this.Xn(a, b) + '}' : 'null';
  };
  g.Xn = function(a, b) {
    for (
      var c = 0,
        d = 'for(var j=0;;){' + vm(xm) + 'switch(j){',
        e = this.cu(a),
        f = { labels: e, registerCount: b },
        d = d + 'case 0:',
        h = 0;
      h < a.length;
      h++
    ) {
      var k = e[h];
      k && (d += 'case ' + k + ':');
      c++;
      var k = a[h],
        m = I[k.type];
      m && (d = m.compile ? d + m.compile.call(m, k, this, f) : d + vm(m));
    }
    return d + 'default:return;}}';
  };
  g.cu = function(a) {
    for (var b = [-1], c = 0; c < a.length; ) {
      var d = a[c++];
      switch (d.type) {
        case 157:
        case 153:
          b[d.target] = -1;
      }
    }
    for (d = c = 0; c < a.length; ++c) b[c] && (b[c] = d++);
    return b;
  };
  var ym = function(a, b) {
      for (var c = 'vm.' + a.action + '(', d = 1; d < arguments.length; ++d)
        1 < d && (c += ','), (c += arguments[d]);
      return c + ')';
    },
    vm = function(a, b) {
      return ym.apply(null, arguments) + ';';
    },
    zm = function(a) {
      return l(a) && 0 <= a ? 'j=' + a + ';continue;' : 'return;';
    };
  g = ch.prototype;
  g.qi = function(a) {
    return !(a instanceof Pj && a.isEnabled());
  };
  g.mq = function(a, b) {
    a && a.gr(b);
    b && b.hr(a);
  };
  g.Gf = function(a) {
    for (var b = this.c.Oc, c = b.length - 1; 0 <= c; c--)
      b[c].Od() || b[c].fireEvent(a);
  };
  g.Ho = function(a, b) {
    b.sa() && b.Hb(a.zh());
  };
  g.Vn = function(a, b) {
    a = String(a);
    b = String(b);
    return a < b ? -1 : a > b ? 1 : 0;
  };
  g.Un = function(a, b) {
    a = String(a).toUpperCase();
    b = String(b).toUpperCase();
    return a < b ? -1 : a > b ? 1 : 0;
  };
  g.Wn = function(a, b) {
    (ha(a) && ha(b)) || ((a = String(a)), (b = String(b)));
    return a < b ? -1 : a > b ? 1 : 0;
  };
  var Am = '_x _y _xscale _yscale _currentframe _totalframes _alpha _visible _width _height _rotation _target _framesloaded _name _droptarget _url _highquality _focusrect _soundbuftime _quality _xmouse _ymouse'.split(
      ' '
    ),
    Kl = (function() {
      var a = {};
      Am.forEach(function(b) {
        a[b] = !0;
      });
      return a;
    })(),
    I = {
      4: function() {
        this.aw();
      },
    };
  ch.prototype.aw = function() {
    var a = this.Id();
    a instanceof Pj && a.Pb(a.ja + 1, !1);
  };
  I[5] = function() {
    this.pw();
  };
  ch.prototype.pw = function() {
    var a = this.Id();
    a instanceof Pj && a.Pb(a.ja - 1, !1);
  };
  I[6] = function() {
    this.play();
  };
  ch.prototype.play = function() {
    var a = this.Id();
    a instanceof Pj && a.play();
  };
  I[7] = function() {
    this.stop();
  };
  ch.prototype.stop = function() {
    var a = this.Id();
    a instanceof Pj && a.stop();
  };
  I[9] = function() {
    this.mx();
  };
  ch.prototype.mx = function() {
    var a = this.Id();
    a instanceof Pj && a.Le().Sr();
  };
  I[10] = function() {
    var a = this.N(),
      b = this.N();
    this.push(b + a);
  };
  I[11] = function() {
    var a = this.N(),
      b = this.N();
    this.push(b - a);
  };
  I[12] = function() {
    var a = this.N(),
      b = this.N();
    this.push(b * a);
  };
  I[13] = function() {
    var a = this.N(),
      b = this.N();
    this.push(b / a);
  };
  I[14] = function() {
    var a = this.N(),
      b = this.N();
    this.push(this.fq(b, a));
  };
  I[15] = function() {
    var a = this.N(),
      b = this.N();
    this.push(b < a);
  };
  I[16] = function() {
    var a = this.$d(),
      b = this.$d();
    this.push(b && a);
  };
  I[17] = function() {
    var a = this.$d(),
      b = this.$d();
    this.push(b || a);
  };
  I[18] = function() {
    var a = this.$d();
    this.push(!a);
  };
  I[19] = function() {
    var a = this.ta(),
      b = this.ta();
    this.push(b == a);
  };
  I[20] = function() {
    var a = this.ta();
    this.push(a.length);
  };
  I[21] = function() {
    var a = this.pop(),
      b = this.pop(),
      c = this.ta();
    this.push(this.nx(c, b, a));
  };
  ch.prototype.nx = function(a, b, c) {
    a = this.ya(a);
    c = Number(c);
    b = Math.max(0, Number(b) - 1);
    return a.substr(b, c);
  };
  var Bm = function() {
    return this.pop();
  };
  I[23] = Bm;
  I[24] = function() {
    var a = this.N(),
      a = 0 > a ? Math.ceil(a) : Math.floor(a);
    this.push(a);
  };
  I[28] = function() {
    var a = this.ta();
    this.push(this.Jd(a));
  };
  ch.prototype.Jd = function(a) {
    a = tm(a);
    for (var b = this.k.get(a[0]), c = 1; c < a.length && l(b); ++c)
      b = this.Sa(b, a[c]);
    return b;
  };
  I[29] = function() {
    var a = this.pop(),
      b = this.ta();
    this.bk(b, a);
  };
  ch.prototype.bk = function(a, b) {
    var c = tm(a);
    if (1 == c.length) this.k.set(c[0], b);
    else {
      for (var d = this.k.get(c[0]), e = 1; l(d) && e < c.length - 1; ++e)
        d = this.Sa(d, c[e]);
      l(d) && this.Zh(d, c[e], b);
    }
  };
  I[33] = function() {
    var a = this.ta(),
      b = this.ta();
    this.push(b + a);
  };
  I[34] = function() {
    var a = Am[this.N()],
      b = this.Cg(this.pop());
    this.push(b && a && b[a]);
  };
  I[35] = function() {
    var a = this.pop(),
      b = Am[this.N()],
      c = this.Cg(this.pop());
    c && b && (c[b] = a);
  };
  I[36] = function() {
    var a = this.N(),
      b = this.ta(),
      c = this.xq(),
      d = this.Id();
    c && d && c.__swiffy_d && c.__swiffy_d.duplicate(d, b, a + -16384);
  };
  I[37] = function() {
    var a = this.xq();
    a instanceof H && a.removeMovieClip();
  };
  I[38] = function() {
    this.trace(this.pop());
  };
  ch.prototype.trace = function(a) {
    window.console && ((a = l(a) ? this.ya(a) : 'undefined'), Hh(a));
  };
  I[51] = function() {
    var a = this.N();
    this.push(String.fromCharCode(a));
  };
  I[50] = function() {
    var a = this.ta();
    this.push(a.charCodeAt(0));
  };
  I[52] = function() {
    this.push(this.c.sp());
  };
  I[48] = function() {
    var a = this.N();
    this.push(this.random(a));
  };
  ch.prototype.random = function(a) {
    var b;
    do b = Math.floor(Math.random() * a);
    while (b == a && 0 < a);
    return b;
  };
  I[60] = function() {
    var a = this.pop(),
      b = this.ta();
    b && this.k.zd(b, a);
  };
  I[65] = function() {
    var a = this.ta();
    a && this.k.Ki(a);
  };
  I[59] = function() {
    var a = this.Jt(this.pop());
    this.push(a);
  };
  ch.prototype.Jt = function(a) {
    a = this.ya(a);
    a = tm(a);
    if (1 == a.length) return this.k.Ff(a[0]);
    var b = this.k.get(a[0]),
      c;
    for (c = 1; l(b) && c < a.length - 1; ++c) b = this.Sa(b, a[c]);
    return this.dc(b, this.Ba(b, a[c]));
  };
  I[62] = function() {};
  I[62].Ma = 2;
  I[62].compile = function() {
    return 'return ' + vm(Bm);
  };
  I[63] = function() {
    var a = this.N(),
      b = this.N();
    this.push(b % a);
  };
  I[71] = function() {
    var a = this.pop(),
      b = this.pop();
    this.push(this.add(b, a));
  };
  ch.prototype.add = function(a, b) {
    return fa(a) || fa(b) ? this.ya(a) + this.ya(b) : this.pd(a) + this.pd(b);
  };
  I[72] = function() {
    var a = this.pop(),
      b = this.pop();
    this.push(this.Op(b, a));
  };
  ch.prototype.Op = function(a, b) {
    var c = typeof a,
      d = typeof b;
    if ('number' !== c || 'number' !== d) {
      if (
        ('object' === c &&
          null !== a &&
          ((a = Cm(a)), (c = typeof a), 'object' === c)) ||
        ('object' === d &&
          null !== b &&
          ((b = Cm(b)), (d = typeof b), 'object' === d))
      )
        return !1;
      if ('string' === c && 'string' === d) return a < b;
      a = this.pd(a);
      b = this.pd(b);
    }
    return a !== a || b !== b ? void 0 : a < b;
  };
  I[103] = function() {
    var a = this.pop(),
      b = this.pop();
    this.push(this.Op(a, b));
  };
  I[73] = function() {
    var a = this.pop(),
      b = this.pop();
    this.push(this.ma(b, a));
  };
  ch.prototype.Wo = function(a, b, c, d) {
    'object' === b && null !== a && ((a = Cm(a)), (b = typeof a));
    'object' === d && null !== c && ((c = Cm(c)), (d = typeof c));
    if ('object' === b || 'object' === d)
      return void 0 === a || null === a ? void 0 === c || null === c : a === c;
    if (a != c) return !1;
    if ('string' === b) {
      if (('boolean' === d || 'number' === d) && '' == a.trim()) return !1;
    } else if (
      'string' === d &&
      ('boolean' === b || 'number' === b) &&
      '' == c.trim()
    )
      return !1;
    return !0;
  };
  var Cm = function(a) {
    return a.valueOf ? (q(a.valueOf) ? a.valueOf() : a.valueOf) : a.toString();
  };
  I[102] = function() {
    var a = this.pop(),
      b = this.pop();
    this.push(b === a);
  };
  I[41] = function() {
    var a = this.ta(),
      b = this.ta();
    this.push(b < a);
  };
  I[42] = function() {
    throw new Ih(this.pop());
  };
  I[42].Ma = 2;
  I[104] = function() {
    var a = this.ta(),
      b = this.ta();
    this.push(b > a);
  };
  I[105] = function() {
    var a = this.pop(),
      b = this.pop();
    q(a) && q(b) && Sh(b, a);
  };
  I[74] = function() {
    var a = this.N();
    this.push(a);
  };
  I[75] = function() {
    var a = this.ta();
    this.push(a);
  };
  I[76] = function() {
    var a = this.pop();
    this.push(a);
    this.push(a);
  };
  I[77] = function() {
    var a = this.pop(),
      b = this.pop();
    this.push(a);
    this.push(b);
  };
  I[78] = function() {
    var a = this.pop(),
      b = this.pop();
    this.push(this.Sa(b, a));
  };
  ch.prototype.Sa = function(a, b) {
    if (null != a) {
      a instanceof om && (a = a.op());
      if (!ha(b)) b = this.Ba(a, this.ya(b));
      else if (fa(a)) return;
      return a[b];
    }
  };
  I[79] = function() {
    var a = this.pop(),
      b = this.pop(),
      c = this.pop();
    this.Zh(c, b, a);
  };
  ch.prototype.Zh = function(a, b, c) {
    null != a &&
      (ha(b) ||
        ((b = this.qe(a, this.ya(b))),
        'length' == b
          ? a instanceof Array && (c = Math.max(0, c | 0))
          : 'prototype' == b && q(a) && (c.constructor = a)),
      (a[b] = c));
  };
  I[80] = function() {
    var a = this.N();
    this.push(++a);
  };
  I[81] = function() {
    var a = this.N();
    this.push(--a);
  };
  I[96] = function() {
    var a = this.N(),
      b = this.N();
    this.push(a & b);
  };
  I[97] = function() {
    var a = this.N(),
      b = this.N();
    this.push(a | b);
  };
  I[98] = function() {
    var a = this.N(),
      b = this.N();
    this.push(b ^ a);
  };
  I[99] = function() {
    var a = this.N(),
      b = this.N();
    this.push(b << a);
  };
  I[100] = function() {
    var a = this.N(),
      b = this.N();
    this.push(b >> a);
  };
  I[101] = function() {
    var a = this.N(),
      b = this.N();
    this.push(b >>> a);
  };
  I[58] = function() {
    var a = this.ta(),
      b = this.pop(),
      a = this.dc(b, this.Ba(b, a));
    this.push(a);
  };
  I[129] = function(a) {
    this.Pu(a);
  };
  I[129].compile = function(a) {
    return vm(this, a.frame);
  };
  ch.prototype.Pu = function(a) {
    var b = this.Id();
    b instanceof Pj && b.Pb(a, !1);
  };
  I[140] = function(a) {
    this.Qu(a);
  };
  I[140].compile = function(a) {
    return vm(this, Ba(a.label));
  };
  ch.prototype.Qu = function(a) {
    var b = this.Id();
    b instanceof Pj && ((a = b.Wf(a)), void 0 != a && b.Pb(a, !1));
  };
  I[136] = function() {};
  I[136].compile = function(a, b) {
    b.bo = a.constants;
    return vm(this);
  };
  I[32] = function() {
    this.ee(this.pop());
  };
  ch.prototype.ee = function(a) {
    a instanceof G ||
      ((a = String(a)),
      (a = this.vh(a, this.k.Sf())),
      a instanceof G || (a = void 0));
    this.k.ee(a);
  };
  I[69] = function() {
    var a = this.pop(),
      b = void 0;
    a instanceof G && (b = a.__swiffy_d.kj());
    this.push(b);
  };
  I[305] = function(a) {
    this.push(a);
  };
  I[305].compile = function(a) {
    a = a.value;
    fa(a) && (a = Ba(a));
    return vm(this, a);
  };
  I[306] = function() {
    this.push(void 0);
  };
  I[307] = function() {
    this.push(Number.POSITIVE_INFINITY);
  };
  I[308] = function() {
    this.push(Number.NEGATIVE_INFINITY);
  };
  I[309] = function() {
    this.push(Number.NaN);
  };
  I[304] = function(a) {
    this.push(a);
  };
  I[304].compile = function(a, b) {
    var c = b.bo[a.index];
    l(c) && (c = Ba(c));
    return vm(this, c);
  };
  I[303] = function(a) {
    this.push(this.La[a + this.Zb]);
  };
  I[303].compile = function(a, b, c) {
    a = a.index;
    return a < c.registerCount ? vm(this, a) : vm(I[306]);
  };
  I[135] = function(a) {
    this.La[a + this.Zb] = this.La[this.ub - 1];
  };
  I[135].compile = function(a, b, c) {
    a = a.index;
    return a < c.registerCount ? vm(this, a) : '';
  };
  I[154] = function(a, b, c) {
    var d = this.ta(),
      e = this.ta();
    a = new Aj(this, this.Nb(), e, d, a, b, c);
    this.c.Qh(a);
  };
  I[154].compile = function(a) {
    return vm(this, a.method, a.target, a.variables);
  };
  I[148] = function(a) {
    var b = this.pop();
    if (b instanceof Object) {
      var c = this.k;
      this.k = new qm(this, c, b);
      try {
        this.Kf(a);
      } finally {
        this.k = c;
      }
    }
  };
  I[148].compile = function(a, b, c) {
    return vm(this, b.Zg(a.body, c.registerCount));
  };
  I[155] = function(a) {
    this.push(this.so(4, a));
  };
  I[155].compile = function(a, b) {
    var c = b.Yn(a.args, [], 0, a.body, 4);
    return vm(this, c);
  };
  I[142] = function(a, b) {
    this.push(this.so(a, b));
  };
  I[142].compile = function(a, b) {
    var c = b.Yn(a.args, a.preloads, a.suppress, a.body, a.registerCount);
    return vm(this, a.registerCount, c);
  };
  ch.prototype.Yn = function(a, b, c, d, e) {
    var f = 'function(self,fn,caller,args){';
    c & 4 || (f += vm(Dm, '"this"', 'self'));
    c & 1 || (f += vm(Em, 'self', 'fn'));
    c & 2 ||
      ((f += 'args=Array.prototype.slice.call(args);args.callee=fn;'),
      (f += 'args.caller=caller;'),
      (f += vm(Dm, '"arguments"', 'args')));
    for (c = 0; c < b.length && c + 1 < e; ++c)
      var h = ym(Fm, Ba(b[c])), f = f + vm(Gm, c + 1, h);
    for (c = 0; c < a.length; ++c)
      (b = a[c]),
        (h = 'args[' + c + ']'),
        (f = fa(b) ? f + vm(Dm, Ba(b), h) : f + vm(Gm, b, h));
    return f + this.Xn(d, e) + '}';
  };
  ch.prototype.so = function(a, b) {
    var c = this,
      d = this.k,
      e = function() {
        var f = c.k,
          h = c.k.Nb(),
          k = c.bl;
        c.bl = e;
        c.k = new pm(c, 5 < c.c.Rc ? d : new rm(c, this), e);
        var m = c.Zb,
          n = c.Cc;
        c.Zb = c.ub;
        c.ub += a;
        c.Cc = c.ub;
        try {
          return c.Kf(b, this, e, k, arguments);
        } finally {
          for (var t = c.Zb; t < c.ub; ++t) c.La[t] = void 0;
          c.ub = c.Zb;
          c.Zb = m;
          c.Cc = n;
          c.bl = k;
          c.k = f;
          c.k.ee(h);
        }
      };
    Sh(e, di);
    return e;
  };
  I[143] = function(a, b, c, d, e) {
    try {
      this.Kf(a);
    } catch (f) {
      if (f instanceof Ih) {
        var h = f.value;
        if (null != b) {
          var k;
          l(e)
            ? ((k = this.k.get(e)), this.k.zd(e, h))
            : ((d += this.Zb), d >= this.Zb && d < this.Cc && (this.La[d] = h));
          try {
            this.Kf(b);
          } finally {
            l(e) && (l(k) ? this.k.zd(e, k) : this.k.Ff(e));
          }
        } else throw f;
      } else throw ((c = null), f);
    } finally {
      null != c && this.Kf(c);
    }
  };
  I[143].compile = function(a, b, c) {
    var d = a.variable;
    l(d) && (d = Ba(d));
    return vm(
      this,
      b.Zg(a.tryBlock, c.registerCount),
      b.Zg(a.catchBlock, c.registerCount),
      b.Zg(a.finallyBlock, c.registerCount),
      a.register,
      d
    );
  };
  I[61] = function() {
    var a = this.ta(),
      b = this.Sj(),
      c = tm(a);
    if (2 > c.length) this.push(this.k.call(c[0], b));
    else {
      for (var d = this.k.get(c[0]), e = 1; null != d && e < c.length; ++e)
        var f = d, d = this.Sa(f, c[e]);
      this.push(this.wd(f, d, b, a));
    }
  };
  I[61].Ma = 1;
  ch.prototype.wd = function(a, b, c) {
    if (q(b)) return b.apply(a, c);
  };
  I[82] = function() {
    var a = this.pop(),
      b = this.pop(),
      c = this.Sj();
    this.push(this.Ss(a, b, c));
  };
  I[82].Ma = 1;
  ch.prototype.Ss = function(a, b, c) {
    if (null != b) {
      if (null != a && '' !== a) {
        var d = b;
        if (d instanceof om) {
          b = d.op();
          if (!b) return;
          d = d.object;
        }
        b = this.Sa(b, a);
        q(b) && '__swiffy_override' in b && (b = b.__swiffy_override);
        return this.wd(di(d), b, c, a);
      }
      if (b instanceof om)
        return this.wd(
          di(b.object),
          Object.getPrototypeOf(b.method.prototype).constructor,
          c,
          'super'
        );
      (a = this.k.Nb()) || (a = this.k.Sf());
      q(b) && '__swiffy_override' in b && (b = b.__swiffy_override);
      return this.wd(di(a), b, c, '');
    }
  };
  I[64] = function() {
    var a = this.ta(),
      a = this.k.get(a),
      b = this.Sj();
    q(a) || (a = di);
    var c;
    q(a) && '__swiffy_override' in a
      ? (c = a.__swiffy_override.apply(di(null), b))
      : ((c = Object.create(a.prototype)),
        c.__swiffy_nvr &&
          Object.defineProperty(c, '__swiffy_vm', { value: this }),
        a.apply(di(c), b));
    this.push(c);
  };
  I[83] = function() {
    var a = this.pop(),
      b = this.pop(),
      c = this.Sj(),
      d = void 0;
    null != b && (d = null != a && '' !== a ? this.Sa(b, a) : b);
    q(d) || (d = di);
    q(d) && '__swiffy_override' in d
      ? (a = d.__swiffy_override.apply(di(null), c))
      : ((a = Object.create(d.prototype)),
        a.__swiffy_nvr &&
          Object.defineProperty(a, '__swiffy_vm', { value: this }),
        d.apply(di(a), c));
    this.push(a);
  };
  I[67] = function() {
    for (var a = ni(), b = Number(this.pop()), c = 0; c < b; c++) {
      var d = this.pop(),
        e = this.ta();
      a[e] = d;
    }
    this.push(a);
  };
  I[66] = function() {
    for (var a = [], b = Number(this.pop()), c = 0; c < b; c++) {
      var d = this.pop();
      a[c] = d;
    }
    this.push(a);
  };
  I[68] = function() {
    var a = this.pop();
    this.push(
      a instanceof H
        ? 'movieclip'
        : null == a || void 0 == a
        ? String(a)
        : typeof a
    );
  };
  I[85] = function() {
    var a = this.pop();
    this.push(void 0);
    if ('string' !== typeof a) for (var b in a) Ci(b) || this.push(b);
  };
  I[153] = function() {};
  I[153].Ma = 2;
  I[153].compile = function(a, b, c) {
    return zm(c.labels[a.target]);
  };
  I[157] = function() {
    return this.$d();
  };
  I[157].Ma = 1;
  I[157].compile = function(a, b, c) {
    return 'if(' + ym(this) + '){' + zm(c.labels[a.target]) + '}';
  };
  I[158] = function() {
    var a = this.ta(),
      b = this.bi(a);
    if ((a = b && b.path.__swiffy_d))
      if (((b = a.Wf(b.Rh)), void 0 != b && (b = a.ou(b)))) {
        for (
          var c = this.k,
            d = this.Zb,
            e = this.Cc,
            f = this.ub,
            h = this.La,
            k = 0;
          k < b.length;
          k++
        )
          b[k].ql(a);
        this.La = h;
        this.k = c;
        this.Zb = d;
        this.Cc = e;
        this.ub = f;
      }
  };
  I[158].Ma = 1;
  I[159] = function(a, b) {
    var c = this.ta(),
      d = this.bi(c);
    if ((c = d && d.path.__swiffy_d))
      (d = c.Wf(d.Rh)), void 0 != d && c.Pb(d + a, b);
  };
  I[159].compile = function(a) {
    return vm(this, a.frameBias, a.play);
  };
  I[44] = function() {
    var a = this.pop(),
      b = Number(this.pop()),
      a = (a = a ? a.prototype : null) ? a : {},
      c;
    a.hasOwnProperty('__swiffy_if')
      ? (c = a.__swiffy_if)
      : ((c = new oc()),
        a.__swiffy_if && c.Lg(a.__swiffy_if),
        Object.defineProperty(a, '__swiffy_if', { value: c }));
    for (var d = 0; d < b; ++d) {
      var e = this.pop();
      if ((a = e ? e.prototype : null))
        c.add(e), a.__swiffy_if && c.Lg(a.__swiffy_if);
    }
  };
  var Hm = function(a, b) {
    if (q(b)) {
      '__swiffy_wrapped_type' in b && (b = b.__swiffy_wrapped_type);
      if (a instanceof b) return a;
      if (a instanceof Object) {
        var c = a.__swiffy_if;
        if (c && c.contains(b)) return a;
      }
    }
    return null;
  };
  I[43] = function() {
    var a = this.pop(),
      b = this.pop();
    this.push(Hm(a, b));
  };
  I[84] = function() {
    var a = this.pop(),
      b = this.pop();
    this.push(!!Hm(b, a));
  };
  I[39] = function() {
    var a = this.pop(),
      b = this.$d(),
      c = this.$d(),
      d = c ? this.N() : void 0,
      e = c ? this.N() : void 0,
      f = c ? this.N() : void 0,
      c = c ? this.N() : void 0,
      a = a ? a.__swiffy_d : null;
    a instanceof Pj && this.c.Qr(a, b, c, f, e, d);
  };
  I[40] = function() {
    this.c.ik();
  };
  I[1e3] = function() {};
  var Gm = function(a, b) {
    this.La[a + this.Zb] = b;
  };
  I[1001] = Gm;
  var Dm = function(a, b) {
    this.k.zd(a, b);
  };
  I[1002] = Dm;
  var Em = function(a, b) {
    this.k.zd('super', new om(a, b));
  };
  I[1003] = Em;
  var Fm = function(a) {
    return this.k.get(a);
  };
  I[1004] = Fm;
  var wm = function(a) {
    var b = this;
    return function() {
      b.Kf(a);
    };
  };
  I[1005] = wm;
  var xm = function() {
    ++wi;
  };
  I[1006] = xm;
  Oa(
    {
      GA: 4,
      NA: 5,
      KA: 6,
      NB: 7,
      OB: 9,
      js: 10,
      vs: 11,
      ss: 12,
      ms: 13,
      os: 14,
      LESS: 15,
      Sx: 16,
      JA: 17,
      ts: 18,
      UB: 19,
      XB: 20,
      VB: 21,
      us: 23,
      eC: 24,
      uz: 28,
      FB: 29,
      EB: 32,
      TB: 33,
      qz: 34,
      DB: 35,
      py: 36,
      oB: 37,
      hC: 38,
      MB: 39,
      Wy: 40,
      YB: 41,
      tf: 42,
      my: 43,
      Pz: 44,
      jB: 48,
      ny: 50,
      Tx: 51,
      rz: 52,
      My: 58,
      Oy: 59,
      Ky: 60,
      ky: 61,
      pB: 62,
      rs: 63,
      DA: 64,
      Ly: 65,
      Vz: 66,
      Xz: 67,
      jC: 68,
      dC: 69,
      Qx: 71,
      jA: 72,
      Zy: 73,
      fC: 74,
      gC: 75,
      cB: 76,
      LB: 77,
      pz: 78,
      CB: 79,
      ps: 80,
      ls: 81,
      ly: 82,
      CA: 83,
      $z: 84,
      Yy: 85,
      $x: 96,
      by: 97,
      ey: 98,
      ay: 99,
      cy: 100,
      dy: 101,
      RB: 102,
      GREATER: 103,
      WB: 104,
      bz: 105,
      vz: 129,
      PB: 135,
      ty: 136,
      xz: 140,
      Jy: 142,
      qk: 143,
      mC: 148,
      qs: 153,
      sz: 154,
      Iy: 155,
      Az: 157,
      ke: 158,
      wz: 159,
      gB: 303,
      bB: 304,
      iB: 305,
      hB: 306,
      fB: 307,
      eB: 308,
      dB: 309,
      Ay: 1e3,
      Yz: 1001,
      Wz: 1002,
      Zz: 1003,
      oz: 1004,
      fy: 1005,
      oy: 1006,
    },
    function(a, b) {
      var c = I[a];
      c.action = b;
      ch.prototype[b] = c;
    }
  );
  var Im = function(a) {
    this.Mn = a;
    this.tj = 0;
  };
  g = Im.prototype;
  g.Vu = function() {
    return this.tj < this.Mn.length;
  };
  g.ce = function() {
    return this.Mn.charCodeAt(this.tj++);
  };
  g.Fq = function() {
    return (this.ce() << 24) >> 24;
  };
  g.og = function() {
    var a = 0,
      b = 0;
    do
      var c = this.ce(),
        b = b + ((c & 127) << a),
        a = a + 7;
    while (c & 128);
    return b;
  };
  g.Eq = function() {
    var a = this.ce(),
      a = a | (this.ce() << 8);
    return (a |= this.Fq() << 16);
  };
  var Jm = function(a) {
      return [a.og()];
    },
    Km = function(a) {
      return [a.og(), a.og()];
    },
    Lm = function(a, b, c) {
      a = a.Eq() + a.tj;
      c[a] = !0;
      return [a];
    };
  var Mm = function(a) {
      Object.defineProperty(this, '__swiffy_vm', { value: a });
      for (var b in Mm.prototype)
        Object.defineProperty(this, b, { value: na(Mm.prototype[b], this) });
    },
    Nm = function(a, b) {
      Object.defineProperty(Mm.prototype, a, { value: b });
    };
  var Om = function(a, b) {
      return a ? a + '.' + b : String(b);
    },
    Qm = function(a, b, c) {
      Pm &&
        b instanceof Pm &&
        ((b = b.__swiffy_v),
        (c = c || b.pa),
        a ? (b = b.Ra()) : ((a = b.uri), (b = b.localName)));
      this.uri = a;
      this.localName = b;
      this.pa = c;
      this.Ve = void 0;
    };
  g = Qm.prototype;
  g.complete = function() {
    return this;
  };
  g.compile = function() {
    return '';
  };
  g.jc = function() {
    l(this.Ve) || (this.Ve = Om(this.uri, this.localName));
    return this.Ve;
  };
  g.cb = function(a) {
    if (!(this.pa || (a instanceof Rm && ia(this.localName)))) {
      var b = this.jc();
      if (b in Object(a)) return b;
    }
  };
  g.Xc = function() {
    return this;
  };
  g.Ra = function() {
    switch (this.uri) {
      case '':
        return '' + this.localName;
      case null:
        return '*::' + this.localName;
      default:
        return this.uri + '::' + this.localName;
    }
  };
  g.toString = function() {
    return (this.pa ? '@' : '') + this.jc();
  };
  g.normalize = function() {
    var a = String(this.localName);
    return a === this.localName ? this : new Qm(this.uri, a, this.pa);
  };
  g.oc = function() {
    if (!this.pa && !this.uri) {
      var a = this.localName;
      return ha(a)
        ? !isFinite(a) || 0 > a || 0 != a % 1
          ? void 0
          : a
        : ((a = String(a)), /^[0-9]+$/.test(a) ? parseInt(a, 10) : void 0);
    }
  };
  g.Rg = function(a, b) {
    var c = this.oc();
    if (!l(c)) throw J(a, this.Ra(), Sm(b).jc());
    return c;
  };
  var Tm = function(a, b) {
    this.name = a;
    this.pa = b;
  };
  Tm.prototype.complete = function(a) {
    return new Qm(String(a), this.name, this.pa);
  };
  Tm.prototype.compile = function(a) {
    return ',' + a.pop();
  };
  Tm.prototype.toString = function() {
    return (this.pa ? '@' : '') + Om('?', this.name);
  };
  var Um = function(a) {
    this.pa = a;
  };
  Um.prototype.complete = function(a, b) {
    return new Qm(String(b), a, this.pa);
  };
  Um.prototype.compile = function(a) {
    return ',' + a.pop() + ',' + a.pop();
  };
  Um.prototype.toString = function() {
    return (this.pa ? '@' : '') + Om('?', '?');
  };
  var Vm = function(a, b, c) {
    this.namespaces = a;
    this.localName = b;
    this.pa = c;
  };
  g = Vm.prototype;
  g.complete = function() {
    return this;
  };
  g.compile = function() {
    return '';
  };
  g.jc = function() {
    return Om('', this.localName);
  };
  g.cb = function(a) {
    if (!(this.pa || (a instanceof Rm && ia(this.localName)))) {
      var b = this.namespaces,
        c = this.localName;
      a = Object(a);
      for (var d = 0; d < b.length; ++d) {
        var e = Om(b[d], c);
        if (e in a) return e;
      }
    }
  };
  g.Xc = function() {
    return new Qm('', this.localName, this.pa);
  };
  g.Ra = function() {
    return String(this.localName);
  };
  g.toString = function() {
    return (
      (this.pa ? '@' : '') +
      Om('[' + this.namespaces.join(', ') + ']', this.localName)
    );
  };
  var Wm = function(a, b) {
    this.namespaces = a;
    this.pa = b;
  };
  Wm.prototype.complete = function(a) {
    return new Vm(this.namespaces, a, this.pa);
  };
  Wm.prototype.compile = function(a) {
    return ',' + a.pop();
  };
  Wm.prototype.toString = function() {
    return (
      (this.pa ? '@' : '') + Om('[' + this.namespaces.join(', ') + ']', '?')
    );
  };
  var Xm = function(a) {
    this.Xo = a;
    this.hg = '';
  };
  Xm.prototype.un = function(a) {
    this.hg && (this.hg += ',');
    this.hg += a ? a.Ra() : '*';
    return this;
  };
  Xm.prototype.Jn = function() {
    return new Qm(this.Xo.uri, this.Xo.localName + '.<' + this.hg + '>', !1);
  };
  var Ym = function(a, b, c, d, e) {
    switch (a.kind) {
      case 9:
        return new Vm(d[a.ns], b[a.name], !1);
      case 14:
        return new Vm(d[a.ns], b[a.name], !0);
      case 27:
        return new Wm(d[a.ns], !1);
      case 28:
        return new Wm(d[a.ns], !0);
      case 15:
        return new Tm(b[a.name], !1);
      case 16:
        return new Tm(b[a.name], !0);
      case 17:
        return new Um(!1);
      case 18:
        return new Um(!0);
      case 7:
        return new Qm(c[a.ns], b[a.name], !1);
      case 13:
        return new Qm(c[a.ns], b[a.name], !0);
      case 29:
        b = new Xm(e[a.name]);
        for (c = 0; c < a.params.length; c++) b.un(e[a.params[c]]);
        return b.Jn();
      default:
        return null;
    }
  };
  var an = function(a, b, c, d) {
      a = Zm(a);
      var e = b.cb(a);
      if (l(e)) return (b = a[e]), $m(b, e), b.apply(l(d) ? d : a, c);
      if ((d = a.__swiffy_proxy) && d.Af) return d.Af.call(a, b.Xc(), c);
      throw J(1069, b.Ra(), Sm(a).jc());
    },
    bn = function(a, b) {
      a = Zm(a);
      if (b.cb(a)) return !0;
      var c = a.__swiffy_proxy;
      return c && c.Qe ? c.Qe.call(a, b.Xc()) : !1;
    },
    cn = function(a, b) {
      a = Zm(a);
      var c = b.cb(a);
      if (l(c)) return a[c];
      if ((c = a.__swiffy_proxy) && c.Ie) return c.Ie.call(a, b.Xc());
    },
    dn = function(a, b, c) {
      a = Zm(a);
      var d = b.cb(a);
      l(d)
        ? (a[d] = c)
        : (d = a.__swiffy_proxy) && d.setProperty
        ? d.setProperty.call(a, b.Xc(), c)
        : (a[b.jc()] = c);
    };
  var en = /^(?:(\{\d+(?:,(?:\d+)?)?\})|(\\u\d{4})|(\\x\d{2})|(\\[0-7]{1,3})|(\\b|\\B|\\d|\\D|\\f|\\n|\\r|\\s|\\S|\\t|\\v|\\w|\\W)|(\(\?P<\w+>)|(\(\?:)|(\(\?=)|(\(\?!)|(\()|(\[\^)|(\[)|([\^$.*+?|])|(\)))/,
    fn = /^(?:(\\u\d{4})|(\\x\d{2})|(\\[0-7]{1,3})|(\\b|\\B|\\d|\\D|\\f|\\n|\\r|\\s|\\S|\\t|\\v|\\w|\\W)|([\-])|(\]))/,
    gn = /<(\w+)>/,
    jn = function(a, b) {
      this.To = b || '';
      this.ir = new hn(a);
      this.gk = [];
      this.mh = 0;
      this.Mf = !1;
    };
  jn.prototype.translate = function() {
    for (var a = '', b = '', c = !1, d = !1, e = 0; e < this.To.length; ++e) {
      var f = this.To[e];
      's' === f
        ? (c = !0)
        : 'x' === f
        ? (d = !0)
        : -1 !== 'gim'.indexOf(f) && (b += f);
    }
    var h = 0,
      k = [],
      m = this;
    this.ir.kt(function(b, e) {
      var f;
      if (0 === m.mh)
        switch (((f = 0), e)) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            a += b;
            break;
          case 13:
            a = c && '.' === b ? a + '[\\s\\S]' : a + b;
            break;
          case 7:
          case 8:
          case 9:
            a += b;
            m.Wi(0);
            break;
          case 6:
            ++h;
            var r = gn.exec(b);
            k.push({ name: r[1], index: h });
            a += '(';
            m.Wi(0);
            break;
          case 10:
            ++h;
            a += b;
            m.Wi(0);
            break;
          case 11:
          case 12:
            a += b;
            m.Wi(1);
            f = 1;
            break;
          case 14:
            a += b;
            m.No();
            break;
          case -2:
            a += '\\' + b;
            break;
          case -1:
            (d && ' ' === b) || (a += b);
        }
      else if (1 === m.mh)
        switch (((f = 1), e)) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            a += b;
            break;
          case 6:
            a += b;
            m.No();
            f = 0;
            break;
          case -2:
            a += '\\' + b;
            break;
          case -1:
            (d && ' ' === b) || (a += b);
        }
      else f = -1;
      return f;
    });
    0 !== this.gk.length && (this.Mf = !0);
    if (this.Mf || this.ir.Mf) return RegExp('.^', b);
    if (0 === k.length) return new RegExp(a, b);
    b = new RegExp(a, b);
    b.exec = function(a) {
      var b = RegExp.prototype.exec.call(this, a);
      k.forEach(function(a) {
        b[a.name] = b[a.index];
      });
      return b;
    };
    return b;
  };
  jn.prototype.Wi = function(a) {
    this.gk.push(this.mh);
    this.mh = a;
  };
  jn.prototype.No = function() {
    0 !== this.gk.length ? (this.mh = this.gk.pop()) : (this.Mf = !0);
  };
  var hn = function(a) {
    this.uc = a;
    this.k = 0;
    this.Mf = !1;
  };
  hn.prototype.kt = function(a) {
    for (; '' !== this.uc; ) {
      var b;
      0 === this.k ? (b = en) : 1 === this.k && (b = fn);
      var c = b.exec(this.uc);
      if (null !== c) {
        var d = 0,
          e = this;
        c.forEach(function(b, f) {
          0 !== f && void 0 !== b && ((e.k = a(c[0], f)), ++d);
        });
        this.uc = this.uc.slice(c[0].length);
      } else {
        var f = this.uc[0];
        '\\' === f
          ? ((this.uc = this.uc.slice(1)),
            '' !== this.uc ? (f = this.uc[0]) : (this.Mf = !0),
            (this.k = a(f, -2)))
          : (this.k = a(f, -1));
        this.uc = this.uc.slice(1);
      }
    }
  };
  var kn = function(a, b, c) {
      this.ca = a;
      this.Jh = b;
      this.rv = c;
      this.lj = a ? a.lj : b;
    },
    ln = new kn(null, {}, !1);
  g = kn.prototype;
  g.zq = function(a) {
    return new kn(this === ln ? null : this, a, !1);
  };
  g.tw = function(a) {
    return new kn(this === ln ? null : this, a, !0);
  };
  g.xp = function(a) {
    return this.rv ? bn(this.Jh, a) : l(a.cb(this.Jh));
  };
  g.find = function(a) {
    for (var b = this; b.ca && !b.xp(a); ) b = b.ca;
    return b.Jh;
  };
  g.Ro = function(a) {
    for (var b = this; b; b = b.ca) if (b.xp(a)) return b.Jh;
    throw J(1065, a.jc());
  };
  g.tu = function(a) {
    var b = this.Ro(a);
    return cn(b, a);
  };
  g.Ts = function(a, b, c) {
    return an(a, b, c, this.lj);
  };
  g.Hu = function() {
    return this.Jh;
  };
  g.qu = function() {
    return this.lj;
  };
  g.bt = function(a) {
    return null != a && a !== aa ? a : this.lj;
  };
  var mn = function(a) {
    this.traits = a ? Object.create(a.traits) : {};
    this.hk = a ? a.hk.slice() : [];
    this.Si = a ? a.Si.slice() : [];
  };
  g = mn.prototype;
  g.uf = function(a, b) {
    this.traits[a] = b.om(this.traits[a]);
  };
  g.vt = function(a) {
    for (var b in a.traits) this.uf(b, a.traits[b]);
  };
  g.Ii = function(a) {
    (this.hk.length || this.Si.length) &&
      Object.defineProperty(a, '__swiffy_slots', {
        value: this.hk.concat(this.Si),
      });
    for (var b in this.traits) a.hasOwnProperty(b) || this.traits[b].Zk(a, b);
    return a;
  };
  g.Jw = function(a, b, c, d, e, f) {
    a = this.Et(a, b, c, d, e, f);
    b && this.uf(b.jc(), a);
  };
  g.Et = function(a, b, c, d, e, f) {
    if (a.slot)
      return (
        d && (c = d.__swiffy_coerce(c)),
        (this.hk[a.slot] = c),
        new nn(a.slot, d, !a.writable)
      );
    b = String(b.localName);
    switch (a.kind) {
      case 'methods':
        return new on((c ? c(e, f) : void 0) || pn(b));
      case 'setters':
        return new un(void 0, (c ? c(e, f) : void 0) || vn(b));
      case 'getters':
        return new un((c ? c(e, f) : void 0) || wn(b), void 0);
      default:
        return (
          d && (c = d.__swiffy_coerce(c)),
          new nn(-this.Si.unshift(c), d, !a.writable)
        );
    }
  };
  var nn = function(a, b, c) {
    this.gt = c;
    this.Mt = xn(a, b);
  };
  g = nn.prototype;
  g.Zk = function(a, b) {
    Object.defineProperty(a, b, this.Mt);
  };
  g.get = function(a, b) {
    return a[b];
  };
  g.set = function(a, b, c) {
    a[b] = c;
  };
  g.callee = function(a, b) {
    return a[b];
  };
  g.om = function() {
    return this;
  };
  var xn = function(a, b) {
      var c, d;
      0 > a
        ? ((c = function() {
            var b = this.__swiffy_slots;
            return b[b.length + a];
          }),
          (d = b
            ? function(c) {
                var d = this.__swiffy_slots;
                d[d.length + a] = b.__swiffy_coerce(c);
              }
            : function(b) {
                var c = this.__swiffy_slots;
                c[c.length + a] = b;
              }))
        : ((c = function() {
            return this.__swiffy_slots[a];
          }),
          (d = b
            ? function(c) {
                this.__swiffy_slots[a] = b.__swiffy_coerce(c);
              }
            : function(b) {
                this.__swiffy_slots[a] = b;
              }));
      return { get: c, set: d };
    },
    on = function(a) {
      this.method = a;
    };
  g = on.prototype;
  g.Zk = function(a, b) {
    Object.defineProperty(a, b, { value: na(this.method, a) });
  };
  g.get = function(a) {
    return na(this.method, a);
  };
  g.set = function() {};
  g.callee = function() {
    return this.method;
  };
  g.om = function() {
    return this;
  };
  var un = function(a, b) {
    this.Kc = a;
    this.fe = b;
  };
  g = un.prototype;
  g.Zk = function(a, b) {
    var c = Ki(a, b) || {};
    c.get = this.Kc || c.get;
    c.set = this.fe || c.set;
    Object.defineProperty(a, b, c);
  };
  g.get = function(a) {
    if (this.Kc) return this.Kc.call(a);
  };
  g.set = function(a, b, c) {
    this.fe && this.fe.call(a, c);
  };
  g.callee = function(a) {
    if (this.Kc) return this.Kc.call(a);
  };
  g.om = function(a) {
    if (a instanceof un) {
      var b = this.Kc || a.Kc;
      a = this.fe || a.fe;
      if (b != this.Kc || a != this.fe) return new un(b, a);
    }
    return this;
  };
  var pn = function(a) {
      return function() {
        return this[a].apply(this, arguments);
      };
    },
    wn = function(a) {
      return function() {
        return this[a];
      };
    },
    vn = function(a) {
      return function(b) {
        this[a] = b;
      };
    },
    K = function(a, b, c) {
      yn(a).uf(b, new on(c));
      zn(a, b, 'value', c);
    },
    M = function(a, b, c) {
      yn(a).uf(b, new un(c, void 0));
      zn(a, b, 'get', c);
    },
    N = function(a, b, c) {
      yn(a).uf(b, new un(void 0, c));
      zn(a, b, 'set', c);
    },
    An = function(a) {
      var b = yn(a),
        c = Sm(a),
        c = (c.uri ? c.uri + ':' : '') + c.localName + '.',
        d;
      for (d in a.prototype) b.uf(c + d, new on(pn(d)));
    },
    zn = function(a, b, c, d) {
      a = a.prototype;
      var e = Ki(a, b) || {};
      e.configurable = !0;
      e[c] = d;
      Object.defineProperty(a, b, e);
    };
  var Bn = function() {
      return '[class ' + this.__swiffy_name.localName + ']';
    },
    Dn = function() {
      return Cn;
    },
    En = 1,
    Gn = function(a, b, c, d, e, f, h, k, m) {
      var n = En++;
      if (!k) k = new Qm('', 'unnamed#' + n, !1);
      else if (!(k instanceof Qm)) {
        var t = k.lastIndexOf('.');
        k = new Qm(
          0 < t ? k.substring(0, t) : '',
          0 < t ? k.substring(t + 1) : k,
          !1
        );
      }
      (m = A(m, Mm.prototype)) && O(m, k.jc(), a);
      Object.defineProperty(a.prototype, '__swiffy_classdef', { value: a });
      Object.defineProperty(a.prototype, 'constructor', {
        value: a,
        writable: !0,
      });
      Object.defineProperty(a, '__swiffy_classdef', { get: Dn });
      Object.defineProperty(a, '__swiffy_coerce', { value: b });
      Object.defineProperty(a, '__swiffy_istype', { value: c });
      Object.defineProperty(a, '__swiffy_constructor', { value: d });
      Object.defineProperty(a, '__swiffy_new', { value: e });
      Object.defineProperty(a, '__swiffy_baseclass', { value: f });
      b = new mn(f && f.__swiffy_traits);
      Object.defineProperty(a, '__swiffy_traits', { value: b });
      f = f ? f.__swiffy_if.slice() : [];
      if (h)
        for (c = 0; c < h.length; ++c)
          for (
            d = Fn(h[c]), b.vt(d.__swiffy_traits), d = d.__swiffy_if, e = 0;
            e < d.length;
            ++e
          )
            d[e] && (f[e] = d[e]);
      f[n] = a;
      Object.defineProperty(a, '__swiffy_if', { value: f });
      Object.defineProperty(a, '__swiffy_name', { value: k });
      Object.defineProperty(a, '__swiffy_typeid', { value: n });
      Object.defineProperty(a, 'toString', { value: Bn });
      return a;
    },
    Jn = function(a, b, c, d) {
      return Gn(b, c || b, Hn, b, d || b, In, null, a);
    },
    Kn = function(a, b) {
      return null != a && Bk(b, a.__swiffy_classdef);
    },
    Mn = function() {
      return function b(c) {
        return Ln.call(b, c);
      };
    },
    Ln = function(a) {
      if (null != a) {
        if (Kn(a, this)) return a;
        throw J(1034, Sm(a), this.__swiffy_name);
      }
      return null;
    },
    Nn = function(a) {
      return Kn(a, this);
    },
    Hn = function(a) {
      return this(a) === a;
    },
    On = function(a) {
      return a.__swiffy_typeid ? a : a.__swiffy_classdef;
    },
    Sm = function(a) {
      return null != a ? On(a).__swiffy_name : new Qm('', String(a), !1);
    },
    Pn = function(a) {
      a = Object.create(a.prototype);
      yn(a.__swiffy_classdef).Ii(a);
      return a;
    },
    Rn = function(a) {
      var b = Pn(this);
      Qn(b).apply(b, arguments);
      return b;
    },
    Sn = function() {
      var a = this.__swiffy_singleton;
      l(a) ||
        ((a = Rn.call(this)),
        Object.defineProperty(this, '__swiffy_singleton', { value: a }));
      return a;
    },
    P = function(a, b, c, d, e) {
      return Tn(a, b, { Tg: c, interfaces: d }, e);
    },
    Tn = function(a, b, c, d) {
      var e = c.te || Mn(),
        f = c.Tg || In;
      e.prototype = Object.create(f.prototype);
      a.prototype = e.prototype;
      return Gn(
        e,
        c.ct || c.te || Ln,
        Nn,
        a,
        c.Tf || Rn,
        Fn(f),
        c.interfaces,
        b,
        d
      );
    },
    Un = function(a) {
      return function() {
        throw J(a, Sm(this).localName + '$');
      };
    },
    Bk = function(a, b) {
      if (!b) return !1;
      if (!a) return !0;
      var c = Fn(a),
        d = Fn(b).__swiffy_if;
      return !(!d || !d[c.__swiffy_typeid]);
    },
    Ak = function(a, b) {
      a.prototype.hasOwnProperty('__swiffy_buildsym') ||
        Object.defineProperty(a.prototype, '__swiffy_buildsym', { value: b });
    },
    Yg = function(a, b) {
      Ak(a, function(a, d) {
        return b.Kb(a, null, d);
      });
    },
    yn = function(a) {
      return a.__swiffy_traits;
    },
    Qn = function(a) {
      return a.__swiffy_classdef.__swiffy_constructor;
    },
    Vn = function(a, b) {
      if (!b || !b.__swiffy_typeid) throw J(1041);
      return b.__swiffy_istype(a) ? a : null;
    },
    Wn = function(a, b) {
      if (!b || !b.__swiffy_typeid) throw J(1041);
      return b.__swiffy_istype(a);
    },
    Q = function(a, b) {
      if (!b || !b.__swiffy_typeid) throw J(1041);
      return b.__swiffy_coerce(a);
    },
    Xn = function(a) {
      if (this.__swiffy_new) return this.__swiffy_new.apply(this, arguments);
      var b = Object.create(this.prototype),
        c = this.apply(b, arguments);
      return c instanceof Object ? c : b;
    },
    Fn = function(a) {
      return a.prototype.__swiffy_classdef;
    },
    R = function(a, b, c, d, e) {
      var f = d;
      Object.defineProperty(a, b, {
        get: function() {
          return f;
        },
        set: function(a) {
          f = e && null == a ? null : Q(a, Mm.prototype[c]);
        },
      });
    },
    O = function(a, b, c) {
      Object.defineProperty(a, b, { value: c });
    },
    S = function(a) {
      Sm(a).jc();
    },
    Yn = function(a) {
      return null != a ? a : null;
    },
    In = function(a) {
      return null != a ? a : {};
    },
    Zn = Mn();
  Mm.prototype = Object.create(In.prototype);
  Zn.prototype = Mm.prototype;
  Gn(
    In,
    Yn,
    function(a) {
      return null != a;
    },
    function() {},
    function() {
      return {};
    },
    null,
    null,
    'Object'
  );
  Object.defineProperty(In.prototype, 'toString', {
    value: function() {
      return '[object ' + this.__swiffy_classdef.__swiffy_name.localName + ']';
    },
    writable: !0,
  });
  Object.defineProperty(Object.prototype, '__swiffy_classdef', { value: In });
  Gn(Zn, Ln, Nn, Un(1115), Rn, In, null, 'global', null);
  var Cn = P(Un(1115), 'Class');
  var ao = function(a, b) {
      this.Rl = a;
      this.strings = a.strings;
      this.ints = a.ints;
      this.uints = a.uints;
      this.doubles = [Number.NaN];
      if (a.doubles)
        for (var c = 0; c < a.doubles.length; ++c)
          this.doubles.push(Number(a.doubles[c]));
      this.Fc = b;
      for (var d = [''], c = 0; c < a.namespaces.length; ++c)
        d.push($n(a, a.namespaces[c]));
      this.Yv = d;
      this.namespaces = [];
      for (var e = [['']], c = 0; c < a.namespacesets.length; ++c) {
        for (var f = a.namespacesets[c], h = [], k = 0; k < f.length; ++k)
          h.push(d[f[k]]);
        e.push(h);
      }
      this.multinames = [null];
      for (c = 0; c < a.multinames.length; ++c)
        this.multinames.push(
          Ym(a.multinames[c], this.strings, d, e, this.multinames)
        );
      this.im = [];
      this.classes = [];
    },
    bo = 0,
    $n = function(a, b) {
      return 'PROTECTED' == b.kind
        ? '|PROTECTED|'
        : b.name
        ? a.strings[b.name]
        : '|' + b.kind + bo++ + '|';
    };
  ao.prototype.ii = 'pool';
  ao.prototype.Fe = function(a) {
    if (a in this.im) a = this.im[a];
    else {
      var b = this.im,
        c;
      c = this.Rl.methods[a];
      var d = this.Fc;
      if (c.code) {
        var e = c.exceptions || [],
          f = c.code,
          h;
        if (uc) h = aa.atob(f);
        else {
          vc();
          var k = tc;
          h = [];
          for (var m = 0; m < f.length; ) {
            var n = k[f.charAt(m++)],
              t = m < f.length ? k[f.charAt(m)] : 0;
            ++m;
            var p = m < f.length ? k[f.charAt(m)] : 64;
            ++m;
            var r = m < f.length ? k[f.charAt(m)] : 64;
            ++m;
            if (null == n || null == t || null == p || null == r) throw Error();
            h.push((n << 2) | (t >> 4));
            64 != p &&
              (h.push(((t << 4) & 240) | (p >> 2)),
              64 != r && h.push(((p << 6) & 192) | r));
          }
          if (8192 > h.length) h = String.fromCharCode.apply(null, h);
          else {
            f = '';
            for (k = 0; k < h.length; k += 8192)
              (m = Ja(h, k, k + 8192)),
                (f += String.fromCharCode.apply(null, m));
            h = f;
          }
        }
        f = [!0];
        k = [];
        for (p = 0; p < e.length; ++p)
          (m = e[p]), (f[m.target] = !0), (k[m.from] = !0), (k[m.to + 1] = !0);
        for (var p = new Im(h), m = [], u; p.Vu(); )
          if (((n = p.tj), (t = p.ce()), (r = T[t])))
            (m[n] = t = {
              qj: r,
              args: r.decode && r.decode(p, n, f),
              wi: void 0,
              next: void 0,
              mj: void 0,
            }),
              u && (u.next = t),
              (u = 2 != r.Ma ? t : void 0);
        u = 0;
        r = !1;
        for (n = 0; n < h.length; ++n)
          if (
            ((r = r || !!k[n]),
            (p = f[n]),
            (t = m[n]) && (r || p) && (p && (t.wi = u++), (r = !1), e.length))
          )
            for (t.mj = [], p = 0; p < e.length; ++p)
              n >= e[p].from && n <= e[p].to && t.mj.push(p);
        u = this.Vh(c.traits);
        h = new co(m, c.type, this);
        h.Es(e);
        h.append('return function(base,scope){return ');
        h.zk(T.qn).append('(');
        h.Ds(c);
        h.Cs(e);
        h.append('});};');
        c = Function(
          eo.prototype.ii,
          ao.prototype.ii,
          'traits',
          h.source
        )(d, this, u);
      } else c = null;
      a = b[a] = c;
    }
    return a;
  };
  var fo = [void 0, !1, !0, null];
  g = ao.prototype;
  g.br = function(a, b, c) {
    switch (a) {
      case 'methods':
        return this.Fe(b, c);
      case 'getters':
        return this.Fe(b, void 0);
      case 'setters':
        return this.Fe(b, void 0);
      case 'classes':
        return this.classes[b];
      case 'specials':
        return fo[b];
      case 'doubles':
        return b ? this.doubles[b] : void 0;
      case 'namespaces':
        return this.jp(b);
      default:
        return b ? this.Rl[a][b] : void 0;
    }
  };
  g.Ge = function(a, b, c) {
    return this.multinames[a].complete(b, c);
  };
  g.jp = function(a) {
    var b = this.namespaces[a];
    b || (this.namespaces[a] = b = new go(void 0, this.Yv[a]));
    return b;
  };
  g.Vh = function(a, b, c, d) {
    b = b || null;
    c = c || ln;
    d = d || new mn();
    for (var e = 0; e < a.length; ++e) {
      var f = a[e],
        h = null;
      f.type &&
        f.writable &&
        ((h = this.Ge(f.type).jc()), (h = Mm.prototype[h] || In));
      var k = f.name ? this.Ge(f.name).Xc() : null,
        m = this.br(f.kind, f.value, void 0);
      d.Jw(f, k, m, h, b, c);
    }
    return d;
  };
  g.rp = function(a) {
    a = this.Ge(a);
    return this.Fc.$o(a);
  };
  g.Tn = function(a, b) {
    if (!b) return a;
    var c = this.rp(b);
    return c || null !== a ? Q(a, c) : null;
  };
  var ho = function(a) {
      return null != a ? String(a) : null;
    },
    io = function(a, b) {
      return void 0 === a ? b : null === a ? null : String(a);
    };
  Jn('Boolean', Boolean, function(a) {
    return !!a;
  });
  Jn('Number', Number, function(a) {
    return +a;
  });
  Jn('String', String, ho);
  var jo = Jn('int', function(a) {
    return a | 0;
  });
  O(jo, 'MIN_VALUE', -2147483648);
  O(jo, 'MAX_VALUE', 2147483647);
  var ko = Jn('uint', function(a) {
    return a >>> 0;
  });
  O(ko, 'MIN_VALUE', 0);
  O(ko, 'MAX_VALUE', 4294967295);
  Jn('void', function() {});
  var U = function(a, b) {
      a = A(a, '');
      O(this, 'errorID', b | 0);
      R(this, 'message', 'String', a);
      R(this, 'name', 'String', 'Error');
    },
    lo = P(U, 'Error');
  U.prototype.getStackTrace = function() {
    S(this, 'getStackTrace');
    return '';
  };
  U.prototype.toString = function() {
    return this.name + (this.message ? ': ' + this.message : '');
  };
  var mo = function(a, b) {
    U.call(this, a, b);
    this.name = 'ReferenceError';
  };
  P(mo, 'ReferenceError', U);
  var no = function(a, b) {
    U.call(this, a, b);
    this.name = 'TypeError';
  };
  P(no, 'TypeError', U);
  var oo = function(a, b) {
    U.call(this, a, b);
    this.name = 'VerifyError';
  };
  P(oo, 'VerifyError', U);
  var po = function(a, b) {
    U.call(this, a, b);
    this.name = 'ArgumentError';
  };
  P(po, 'ArgumentError', U);
  var qo = function(a, b) {
    U.call(this, a, b);
    this.name = 'RangeError';
  };
  P(qo, 'RangeError', U);
  var ro = function(a, b) {
    U.call(this, a, b);
    this.name = 'URIError';
  };
  P(ro, 'URIError', U);
  var so = function(a, b) {
    U.call(this, a, b);
    this.name = 'SecurityError';
  };
  P(so, 'SecurityError', U);
  var to = function(a, b) {
    U.call(this, a, b);
  };
  P(to, 'flash.errors.IOError', U);
  var uo = function(a, b) {
    U.call(this, a, b);
  };
  P(uo, 'flash.errors.EOFError', to);
  var vo = function(a, b) {
    U.call(this, a, b);
  };
  P(vo, 'flash.errors.StackOverflowError', U);
  var wo = function(a) {
      if (null === a) throw J(1009);
      if (void 0 === a) throw J(1010);
    },
    Zm = function(a) {
      wo(a);
      return Object(a);
    },
    $m = function(a, b) {
      if (!q(a)) throw J(1006, b || 'value');
    },
    xo = function(a, b) {
      if (null == a) throw J(2007, b);
    },
    J = function(a, b) {
      var c = yo[a] || U,
        d = zo[a],
        e = 'Error #' + a;
      if (d)
        var f = arguments,
          e =
            e +
            (': ' +
              d.replace(/%(\d+)/g, function(a, b) {
                return b < f.length ? f[b] : '';
              }));
      return new Ih(new c(e, a));
    },
    zo = {
      1001: 'The method %1 is not implemented.',
      1006: '%1 is not a function.',
      1007: 'Instantiation attempted on a non-constructor.',
      1009: 'Cannot access a property or method of a null object reference.',
      1010: 'A term is undefined and has no properties.',
      1014: 'Class %1 could not be found.',
      1016: 'Descendants operator (..) not supported on type',
      1023: 'Stack overflow occurred',
      1034: 'Type Coercion failed: cannot convert %1 to %2.',
      1040: 'The right-hand side of instanceof must be a class or function.',
      1041: 'The right-hand side of operator must be a class.',
      1052: 'Invalid URI passed to %1 function.',
      1056: 'Cannot create property %1 on %2.',
      1065: 'Variable %1 is not defined.',
      1069: 'Property %1 not found on %2 and there is no default value.',
      1083: 'The prefix "%1" for element "%2" is not bound.',
      1085: 'The element type "%1" must be terminated by the matching end-tag "</%2>".',
      1086: 'The %1 method only works on lists containing one item.',
      1087: 'Assignment to indexed XML is not allowed.',
      1088: 'The markup in the document following the root element must be well-formed.',
      1090: 'XML parser failure: element is malformed.',
      1091: 'XML parser failure: Unterminated CDATA section.',
      1094: 'XML parser failure: Unterminated comment.',
      1095: 'XML parser failure: Unterminated attribute.',
      1097: 'XML parser failure: Unterminated processing instruction.',
      1100: 'Cannot supply flags when constructing one RegExp from another.',
      1115: '%1 is not a constructor.',
      1123: 'Filter operator not supported on type %1.',
      1125: 'The index %1 is out of range %2.',
      1126: 'Cannot change the length of a fixed Vector.',
      1127: 'Type application attempted on a non-parameterized type.',
      1504: 'End of file.',
      1506: 'The specified range is invalid.',
      1508: 'The value specified for argument %1 is invalid.',
      2004: 'One of the parameters is invalid.',
      2005: 'Parameter %1 is of the incorrect type. Should be type %2.',
      2006: 'The supplied index is out of bounds.',
      2007: 'Parameter %1 must be non-null.',
      2008: 'Parameter %1 must be one of the accepted values.',
      2012: '%1 class cannot be instantiated.',
      2015: 'Invalid %1.',
      2024: 'An object cannot be added as a child of itself.',
      2025: 'The supplied DisplayObject must be a child of the caller.',
      2030: 'End of file was encountered.',
      2035: 'URL Not Found. URL: %1',
      2058: 'There was an error decompressing the data.',
      2067: 'The ExternalInterface is not available in this container.',
      2088: 'The Proxy class does not implement %1. It must be overridden by a subclass.',
      2089: 'The Proxy class does not implement %1. It must be overridden by a subclass.',
      2090: 'The Proxy class does not implement %1. It must be overridden by a subclass.',
      2091: 'The Proxy class does not implement %1. It must be overridden by a subclass.',
      2092: 'The Proxy class does not implement %1. It must be overridden by a subclass.',
      2093: 'The Proxy class does not implement %1. It must be overridden by a subclass.',
      2098: 'The loading object is not a .swf file, you cannot request SWF properties from it.',
      2099: 'The loading object is not sufficiently loaded to provide this information.',
      2101: 'The String passed to URLVariables.decode() must be a URL-encoded query string containing name/value pairs.',
      2105: 'The Proxy class does not implement %1. It must be overridden by a subclass.',
      2106: 'The Proxy class does not implement %1. It must be overridden by a subclass.',
      2107: 'The Proxy class does not implement %1. It must be overridden by a subclass.',
      2108: 'Scene %1 was not found.',
      2109: 'Frame label %1 not found in scene %2.',
      2124: 'Loaded file is an unknown type. URL: %1',
      2150: "An object cannot be added as a child to one of it's children (or children's children, etc.).",
      2152: 'Full screen mode is not allowed.',
    },
    yo = {
      1001: oo,
      1006: no,
      1007: no,
      1009: no,
      1010: no,
      1014: mo,
      1016: no,
      1023: vo,
      1034: no,
      1040: no,
      1041: no,
      1052: ro,
      1056: mo,
      1065: mo,
      1069: mo,
      1083: no,
      1085: no,
      1086: no,
      1087: no,
      1088: no,
      1090: no,
      1091: no,
      1094: no,
      1095: no,
      1097: no,
      1100: no,
      1115: no,
      1123: no,
      1125: qo,
      1126: qo,
      1127: no,
      1504: U,
      1506: qo,
      1508: po,
      2004: no,
      2005: po,
      2006: qo,
      2007: no,
      2008: po,
      2012: po,
      2015: po,
      2024: po,
      2025: po,
      2030: uo,
      2035: to,
      2058: to,
      2067: U,
      2088: U,
      2089: U,
      2090: U,
      2091: U,
      2092: U,
      2093: U,
      2098: U,
      2099: U,
      2101: U,
      2105: U,
      2106: U,
      2107: U,
      2108: po,
      2109: po,
      2124: to,
      2150: po,
      2152: so,
    };
  var T = {
      Ns: function(a) {
        Oa(Lc, function(b, c) {
          var d = T[b];
          if (d.implementation) {
            var e = (d.fc || a).prototype;
            d.fw = (e.ii || '') + '.' + c;
            e[c] = d.implementation;
          }
        });
      },
    },
    Ao = function(a, b, c, d) {
      this.Fc = a.Fc;
      this.target = d;
      this.typeName = 0 == b ? null : a.Ge(b);
      this.traits = a.Vh([
        { slot: 1, kind: 'specials', value: 0, type: b, name: c },
      ]);
    };
  Ao.prototype.Xs = function(a) {
    return !this.typeName || Kn(a, this.Fc.$o(this.typeName));
  };
  var Bo = function(a, b) {
    var c;
    if (b && a instanceof Ih) c = a.value;
    else if (b && a instanceof RangeError) c = J(1023).value;
    else throw a;
    for (var d = 0; d < b.length; d++) {
      var e = b[d];
      if (e.Xs(c)) return e.target;
    }
    throw a;
  };
  T[36] = function(a) {
    this.da(a);
  };
  T[36].decode = function(a) {
    return [a.Fq()];
  };
  T[47] = function(a) {
    this.da(this.lg.doubles[a]);
  };
  T[47].decode = Jm;
  T[39] = function() {
    this.da('!1');
  };
  T[45] = function(a) {
    this.da(this.lg.ints[a]);
  };
  T[45].decode = Jm;
  T.sf = function(a) {
    this.za().I(T.sf, a);
  };
  T.sf.implementation = ao.prototype.jp;
  T.sf.decode = Jm;
  T.sf.fc = ao;
  T[49] = T.sf;
  T[40] = function() {
    this.da('Number.NaN');
  };
  T[32] = function() {
    this.da(null);
  };
  T[37] = function(a) {
    this.da(a);
  };
  T[37].decode = Jm;
  T[44] = function(a) {
    this.da(Ba(this.lg.strings[a]));
  };
  T[44].decode = Jm;
  T[38] = function() {
    this.da('!0');
  };
  T[46] = function(a) {
    this.da(this.lg.uints[a]);
  };
  T[46].decode = Jm;
  T[33] = function() {
    this.da(void 0);
  };
  T[42] = function() {
    this.da(this.stack(0));
  };
  T[43] = function() {
    var a = this.stack(0),
      b = this.stack(1);
    this.Vj('t');
    this.append('t=' + a + ',');
    this.append(a + '=' + b + ',');
    this.append(b + '=t,');
    this.append('t=undefined;');
  };
  T[41] = function() {
    this.pop();
  };
  T[71] = function() {
    this.append('return;');
  };
  T[71].Ma = 2;
  T[72] = function() {
    var a = this.pop();
    this.append('return ');
    this.dr ? this.I(T.sd, a, this.dr) : this.append(a + ';');
  };
  T[72].Ma = 2;
  T[85] = function(a) {
    for (var b = [], c = []; 0 < a--; )
      (c[a] = this.pop()), (b[a] = this.pop());
    this.Vj('t');
    this.append('t={},');
    for (a = 0; a < b.length; ++a) this.append('t[' + b[a] + ']=' + c[a] + ',');
    this.za().append('t,t=undefined;');
  };
  T[85].decode = Jm;
  T[86] = function(a) {
    this.da(this.Zd(a));
  };
  T[86].decode = Jm;
  T.Ya = function(a) {
    return function() {
      var b = this.pop(),
        c = this.pop();
      this.da(c + a + b);
    };
  };
  T.jh = function(a) {
    return function() {
      this.da(a + this.pop());
    };
  };
  T[160] = T.Ya('+');
  T[161] = T.Ya('-');
  T[162] = T.Ya('*');
  T[163] = T.Ya('/');
  T[164] = T.Ya('%');
  T[144] = T.jh('-');
  T[150] = T.jh('!');
  T[145] = function() {
    this.append('++' + this.stack(0) + ';');
  };
  T[147] = function() {
    this.append('--' + this.stack(0) + ';');
  };
  T.$k = function(a) {
    return function() {
      var b = this.pop(),
        c = this.pop();
      this.da('(' + c + '|0)' + a + '(' + b + '|0)|0');
    };
  };
  T[197] = T.$k('+');
  T[198] = T.$k('-');
  T[199] = T.$k('*');
  T[196] = function() {
    this.da('(-(' + this.pop() + '|0))|0');
  };
  T[192] = function() {
    this.da('((' + this.pop() + '|0)+1)|0');
  };
  T[193] = function() {
    this.da('((' + this.pop() + '|0)-1)|0');
  };
  T[151] = T.jh('~');
  T[169] = T.Ya('|');
  T[170] = T.Ya('^');
  T[168] = T.Ya('&');
  T[165] = T.Ya('<<');
  T[166] = T.Ya('>>');
  T[167] = T.Ya('>>>');
  T[118] = T.jh('!!');
  T[117] = T.jh('+');
  T[115] = function() {
    this.da(this.pop() + '|0');
  };
  T[116] = function() {
    this.da(this.pop() + '>>>0');
  };
  T[112] = function() {
    this.da('String(' + this.pop() + ')');
  };
  T.Gi = function(a) {
    return function() {
      this.da(this.register(a));
    };
  };
  T[208] = T.Gi(0);
  T[209] = T.Gi(1);
  T[210] = T.Gi(2);
  T[211] = T.Gi(3);
  T.Hi = function(a) {
    return function() {
      this.append(this.register(a) + '=' + this.pop() + ';');
    };
  };
  T[212] = T.Hi(0);
  T[213] = T.Hi(1);
  T[214] = T.Hi(2);
  T[215] = T.Hi(3);
  T.ve = function(a) {
    var b = function(b) {
      a.call(this, this.register(b));
    };
    b.decode = Jm;
    return b;
  };
  T[98] = T.ve(function(a) {
    this.da(a);
  });
  T[99] = T.ve(function(a) {
    this.append(a + '=' + this.pop() + ';');
  });
  T[146] = T.ve(function(a) {
    this.append('++' + a + ';');
  });
  T[148] = T.ve(function(a) {
    this.append('--' + a + ';');
  });
  T[194] = T.ve(function(a) {
    this.append(a + '=((' + a + '|0)+1)|0;');
  });
  T[195] = T.ve(function(a) {
    this.append(a + '=((' + a + '|0)-1)|0;');
  });
  T[8] = T.ve(function(a) {
    this.append(a + '=undefined;');
  });
  T[130] = function() {};
  T[133] = function() {
    var a = this.pop();
    this.da(a + '==null?null:String(' + a + ')');
  };
  T[137] = function() {
    var a = this.pop();
    this.da(a + '==null?null:' + a);
  };
  T[149] = function() {
    this.da('typeof ' + this.pop());
  };
  T[171] = T.Ya('==');
  T[172] = T.Ya('===');
  T[173] = T.Ya('<');
  T[174] = T.Ya('<=');
  T[175] = T.Ya('>');
  T[176] = T.Ya('>=');
  T[16] = function(a) {
    a = this.pg(a);
    0 > a ? this.append('return;') : this.append('j=' + a + ';break;');
  };
  T[16].Ma = 2;
  T[16].decode = Lm;
  T.xb = function(a) {
    var b = function(b) {
      this.append('if(')
        .append(a.call(this))
        .append(')');
      b = this.pg(b);
      0 > b ? this.append('return;') : this.append('{j=' + b + ';break;}');
    };
    b.Ma = 1;
    b.decode = Lm;
    return b;
  };
  T[14] = T.xb(function() {
    var a = this.pop(),
      b = this.pop();
    return '!(' + a + '<' + b + ')';
  });
  T[12] = T.xb(function() {
    var a = this.pop();
    return '!(' + this.pop() + '<' + a + ')';
  });
  T[15] = T.xb(function() {
    var a = this.pop(),
      b = this.pop();
    return '!(' + a + '<=' + b + ')';
  });
  T[19] = T.xb(function() {
    var a = this.pop();
    return this.pop() + '==' + a;
  });
  T[20] = T.xb(function() {
    var a = this.pop();
    return this.pop() + '!=' + a;
  });
  T[25] = T.xb(function() {
    var a = this.pop();
    return this.pop() + '===' + a;
  });
  T[26] = T.xb(function() {
    var a = this.pop();
    return this.pop() + '!==' + a;
  });
  T[13] = T.xb(function() {
    var a = this.pop();
    return '!(' + this.pop() + '<=' + a + ')';
  });
  T[18] = T.xb(function() {
    return '!' + this.pop();
  });
  T[23] = T.xb(function() {
    var a = this.pop(),
      b = this.pop();
    return a + '<' + b;
  });
  T[21] = T.xb(function() {
    var a = this.pop();
    return this.pop() + '<' + a;
  });
  T[24] = T.xb(function() {
    var a = this.pop(),
      b = this.pop();
    return a + '<=' + b;
  });
  T[22] = T.xb(function() {
    var a = this.pop();
    return this.pop() + '<=' + a;
  });
  T[17] = T.xb(function() {
    return this.pop();
  });
  T[27] = function(a, b) {
    var c = this.pop(),
      d = this.pg(a);
    if (2 == arguments.length) {
      var e = this.pg(b);
      this.append('j=' + c + '?' + d + ':' + e);
    } else {
      this.append('j=[');
      for (e = 1; e < arguments.length; ++e)
        1 < e && this.append(','), this.append(String(this.pg(arguments[e])));
      this.append('][' + c + '],j=j===undefined?' + d + ':j');
    }
    this.append(';break;');
  };
  T[27].decode = function(a, b, c) {
    var d = [],
      e = function() {
        var e = a.Eq() + b;
        c[e] = !0;
        d.push(e);
      };
    e();
    for (var f = a.og() + 1; 0 < f--; ) e();
    return d;
  };
  T[27].Ma = 2;
  T[29] = function() {
    this.mw();
  };
  T.ko = function(a) {
    var b = function() {
      var a = this.pop(),
        d = this.scope();
      this.Gs()
        .append(d)
        .I(b, a);
    };
    b.implementation = a;
    b.fc = kn;
    return b;
  };
  T[48] = T.ko(kn.prototype.zq);
  T[28] = T.ko(kn.prototype.tw);
  T.nf = function(a) {
    this.za()
      .append(this.scope(a))
      .I(T.nf);
  };
  T.nf.implementation = kn.prototype.Hu;
  T.nf.fc = kn;
  T.nf.decode = function(a) {
    return [a.ce()];
  };
  T[101] = T.nf;
  T.Hg = function() {
    this.za()
      .append(this.scope())
      .I(T.Hg);
  };
  T.Hg.implementation = kn.prototype.qu;
  T.Hg.fc = kn;
  T[100] = T.Hg;
  T.ke = function(a) {
    a = this.Zd(a);
    var b = this.pop(),
      c = this.pop();
    this.za();
    this.I(T.ke, b, c, a);
  };
  T.ke.implementation = function(a, b, c) {
    $m(b);
    return b.apply(a, c);
  };
  T.ke.decode = Jm;
  T.ke.Ma = 1;
  T[65] = T.ke;
  T.le = function(a, b) {
    var c = this.Zd(b),
      d = this.ae(a),
      e = this.pop();
    this.za()
      .append(this.scope())
      .I(T.le, e, d, c);
  };
  T.le.implementation = kn.prototype.Ts;
  T.le.Ma = 1;
  T.le.decode = Km;
  T.le.fc = kn;
  T[76] = T.le;
  T.Uk = function(a, b) {
    var c = function(a, e) {
      var f = this.Zd(e),
        h = this.ae(a),
        k = this.pop();
      b && this.za();
      this.I(c, k, h, f);
    };
    c.Ma = 1;
    c.decode = Km;
    c.implementation = a;
    return c;
  };
  T[70] = T.Uk(an, !0);
  T[79] = T.Uk(an, !1);
  T.Xk = function(a) {
    var b = function(a) {
      a = this.ae(a);
      this.za().append(this.scope());
      this.I(b, a);
    };
    b.decode = Jm;
    b.implementation = a;
    b.fc = kn;
    return b;
  };
  T[94] = T.Xk(kn.prototype.find);
  T[93] = T.Xk(kn.prototype.Ro);
  T[96] = T.Xk(kn.prototype.tu);
  T.lo = function(a) {
    var b = function(a) {
      var d = this.pop();
      a = this.ae(a);
      var e = this.pop();
      this.I(b, e, a, d);
    };
    b.decode = Jm;
    b.implementation = a;
    return b;
  };
  T[97] = T.lo(dn);
  T[104] = T.lo(dn);
  T.Yk = function(a) {
    var b = function(a) {
      a = this.ae(a);
      var d = this.pop();
      this.za().I(b, d, a);
    };
    b.decode = Jm;
    b.implementation = a;
    return b;
  };
  T[102] = T.Yk(cn);
  T[89] = T.Yk(function(a, b) {
    a = Zm(a);
    var c = a.__swiffy_proxy;
    if (c && c.hj) return c.hj.call(a, b.Xc());
    throw J(1016);
  });
  T[106] = T.Yk(function(a, b) {
    a = Zm(a);
    var c = a.__swiffy_proxy;
    if (c && c.dc) return c.dc.call(a, b.Xc());
    c = b.cb(a);
    return l(c) ? delete a[c] : !1;
  });
  T.tf = function() {
    this.I(T.tf, this.pop());
  };
  T.tf.implementation = function(a) {
    throw new Ih(a);
  };
  T.tf.Ma = 2;
  T[3] = T.tf;
  T.pf = function(a) {
    this.za().append('handler' + a);
    this.I(T.pf);
  };
  T.pf.implementation = function() {
    return this.traits.Ii({});
  };
  T.pf.fc = Ao;
  T.pf.decode = Jm;
  T[90] = T.pf;
  T.li = function() {
    this.I(T.li, this.stack(0));
  };
  T.li.implementation = function(a) {
    wo(a);
    if (!Kn(a, Co) && !Kn(a, Do)) throw J(1123, Sm(a).jc());
  };
  T[120] = T.li;
  T.mf = function(a) {
    this.I(T.mf, Ba(this.lg.strings[a]));
  };
  T.mf.implementation = function(a) {
    Jh = String(a);
  };
  T.mf.decode = Jm;
  T[6] = T.mf;
  T[7] = function() {
    this.I(T.mf, this.pop());
  };
  T.mo = function(a) {
    var b = function() {
      var a = this.stack(0);
      this.append(a + '=').I(b, a);
    };
    b.implementation = a;
    return b;
  };
  T[114] = T.mo(Id);
  T[113] = T.mo(Hd);
  T.of = function(a) {
    var b = this.stack(0);
    this.append(b + '=');
    this.Og(T.of, b);
    this.append('[' + a + '];');
  };
  T.of.implementation = function(a) {
    Zm(a);
    return a.__swiffy_slots;
  };
  T.of.decode = Jm;
  T[108] = T.of;
  T[109] = function(a) {
    var b = this.pop(),
      c = this.pop();
    this.Og(T.of, c);
    this.append('[' + a + ']=' + b + ';');
  };
  T[109].decode = Jm;
  T.oi = function() {
    var a = this.pop(),
      b = this.pop();
    this.za().I(T.oi, b, a);
  };
  T.oi.implementation = function(a, b) {
    if (b == In) return null != a;
    if (!q(b)) throw J(1040);
    return Object(a) instanceof b;
  };
  T[177] = T.oi;
  T.ni = function() {
    var a = this.pop(),
      b = this.pop();
    this.za().I(T.ni, b, a);
  };
  T.ni.implementation = function(a, b) {
    b = Zm(b);
    return bn(b, new Qm('', a, !1));
  };
  T[180] = T.ni;
  T.qf = function(a) {
    var b = this.pop(),
      c = this.scope();
    this.za().I(T.qf, 'pool', c, a, b);
  };
  T.qf.implementation = function(a, b, c, d) {
    return this.wt(a, b, c, d);
  };
  T.qf.decode = Jm;
  T.qf.fc = eo;
  T[88] = T.qf;
  T.rf = function(a) {
    this.za().I(T.rf, this.scope(), a);
  };
  T.rf.implementation = function(a, b) {
    return this.Fe(b, void 0)(null, a);
  };
  T.rf.decode = Jm;
  T.rf.fc = ao;
  T[64] = T.rf;
  T.me = function(a) {
    a = this.Zd(a);
    var b = this.pop();
    this.za().I(T.me, b, a);
  };
  T.me.implementation = function(a, b) {
    return this.Hp(a, b);
  };
  T.me.decode = Jm;
  T.me.Ma = 1;
  T[66] = T.me;
  T[74] = T.Uk(function(a, b, c) {
    a = Zm(a);
    b = b.cb(a);
    return this.Hp(a[b], c);
  }, !0);
  T.Us = function(a, b, c, d) {
    b = Zm(b);
    var e = yn(a).traits,
      f = c.cb(e);
    if (l(f)) return (a = e[f].callee(b, f)), $m(a, c), a.apply(b, d);
    f = c.cb(a.prototype);
    if (l(f)) return (a = a.prototype[f]), $m(a, c), a.apply(b, d);
    throw J(1069, c.Ra(), Sm(a).localName);
  };
  T.io = function(a) {
    var b = function(c, d) {
      var e = this.Zd(d),
        f = this.ae(c),
        h = this.pop();
      a && this.za();
      this.I(b, 'base', h, f, e);
    };
    b.Ma = 1;
    b.decode = Km;
    b.implementation = T.Us;
    return b;
  };
  T[69] = T.io(!0);
  T[78] = T.io(!1);
  T.Kg = function(a) {
    var b = this.pop();
    a = this.ae(a);
    var c = this.pop();
    this.I(T.Kg, 'base', c, a, b);
  };
  T.Kg.decode = Jm;
  T.Kg.implementation = function(a, b, c, d) {
    b = Zm(b);
    var e = yn(a).traits,
      f = c.cb(e);
    if (l(f)) e[f].set(b, f, d);
    else {
      f = c.cb(a.prototype);
      if (l(f) && (e = Ki(a.prototype, f)) && e.set) {
        e.set.call(b, d);
        return;
      }
      throw J(1056, c.Ra(), Sm(a).localName);
    }
  };
  T[5] = T.Kg;
  T.Ig = function(a) {
    a = this.ae(a);
    var b = this.pop();
    this.za().I(T.Ig, 'base', b, a);
  };
  T.Ig.decode = Jm;
  T.Ig.implementation = function(a, b, c) {
    b = Zm(b);
    var d = yn(a).traits,
      e = c.cb(d);
    if (l(e)) return d[e].get(b, e);
    e = c.cb(a.prototype);
    if (l(e) && (d = Ki(a.prototype, e)) && d.get) return d.get.call(b);
    throw J(1069, c.Ra(), Sm(a).localName);
  };
  T[4] = T.Ig;
  T.lf = function(a) {
    a = this.Zd(a);
    var b = this.pop();
    this.I(T.lf, 'base', b, a);
  };
  T.lf.implementation = function(a, b, c) {
    b = Zm(b);
    a.__swiffy_constructor.apply(b, c);
  };
  T.lf.decode = Jm;
  T.lf.Ma = 1;
  T[73] = T.lf;
  T.Gg = function(a) {
    a = this.Zd(a);
    var b = this.pop();
    this.za();
    this.I(T.Gg, b, a);
  };
  T.Gg.implementation = function(a, b) {
    var c = a && a.__swiffy_type_apply;
    if (!c) throw J(1127);
    return c.call(a, this.$a, b);
  };
  T.Gg.decode = Jm;
  T[83] = T.Gg;
  T.pi = function() {
    this.za();
    this.I(T.pi, 'traits');
  };
  T.pi.implementation = function(a) {
    return a.Ii({});
  };
  T[87] = T.pi;
  T.sd = function(a) {
    var b = this.stack(0);
    this.append(b + '=');
    this.I(T.sd, b, a);
  };
  T.sd.implementation = function(a, b) {
    return this.Tn(a, b);
  };
  T.sd.decode = Jm;
  T.sd.fc = ao;
  T[128] = T.sd;
  T.mi = function() {
    this.I(T.mi, this.stack(0));
  };
  T.mi.implementation = wo;
  T[119] = T.mi;
  T.no = function(a) {
    var b = function(a) {
      var d = this.stack(0);
      this.append(d + '=');
      this.I(b, d, a);
    };
    b.decode = Jm;
    b.implementation = function(b, d) {
      return a(b, this.rp(d));
    };
    b.fc = ao;
    return b;
  };
  T[134] = T.no(Vn);
  T[178] = T.no(Wn);
  T.oo = function(a) {
    var b = function() {
      var a = this.pop(),
        d = this.pop();
      this.za();
      this.I(b, d, a);
    };
    b.implementation = a;
    return b;
  };
  T[135] = T.oo(Vn);
  T[179] = T.oo(Wn);
  T.Wk = function(a) {
    var b = function() {
      var a = this.pop(),
        d = this.pop();
      this.za().I(b, d, a);
    };
    b.implementation = a;
    return b;
  };
  T.pk = T.Wk(function(a, b) {
    a = Zm(a);
    var c = a.__swiffy_proxy;
    if (c && c.We) b = c.We.call(a, b);
    else {
      c = Object.keys(a);
      do if (++b > c.length) return 0;
      while (Ci(c[b - 1]));
    }
    return b;
  });
  T[31] = T.pk;
  T[30] = T.Wk(function(a, b) {
    a = Zm(a);
    var c = a.__swiffy_proxy;
    return c && c.dg ? c.dg.call(a, b) : Object.keys(a)[b - 1];
  });
  T[35] = T.Wk(function(a, b) {
    a = Zm(a);
    var c = a.__swiffy_proxy;
    return c && c.fg ? c.fg.call(a, b) : a[Object.keys(a)[b - 1]];
  });
  T.Jg = function(a, b) {
    this.append('while(' + this.register(a) + '&&!(' + this.register(b) + '=');
    this.Og(T.pk, this.register(a), this.register(b)).append('))');
    this.append(this.register(a) + '=').I(T.Jg, this.register(a));
    this.da('!!' + this.register(b));
  };
  T.Jg.implementation = function(a) {
    var b = a.__swiffy_proxy;
    return b && b.We ? null : Object.getPrototypeOf(a);
  };
  T.Jg.decode = Km;
  T[50] = T.Jg;
  T.fh = function(a) {
    var b = function() {
      var a = this.pop();
      this.za().I(b, a);
    };
    b.implementation = a;
    return b;
  };
  T.gh = function(a) {
    var b = function() {
      var a = this.pop(),
        d = this.pop();
      this.za().I(b, a, d);
    };
    b.implementation = a;
    return b;
  };
  T[53] = T.fh(function(a) {
    return this.Jc(a, 1).getUint8(a);
  });
  T[54] = T.fh(function(a) {
    return this.Jc(a, 2).getUint16(a, !0);
  });
  T[55] = T.fh(function(a) {
    return this.Jc(a, 4).getInt32(a, !0);
  });
  T[56] = T.fh(function(a) {
    return this.Jc(a, 4).getFloat32(a, !0);
  });
  T[57] = T.fh(function(a) {
    return this.Jc(a, 8).getFloat64(a, !0);
  });
  T[58] = T.gh(function(a, b) {
    this.Jc(a, 1).setUint8(a, b);
  });
  T[59] = T.gh(function(a, b) {
    this.Jc(a, 2).setUint16(a, b, !0);
  });
  T[60] = T.gh(function(a, b) {
    this.Jc(a, 4).setUint32(a, b, !0);
  });
  T[61] = T.gh(function(a, b) {
    this.Jc(a, 4).setFloat32(a, b, !0);
  });
  T[62] = T.gh(function(a, b) {
    this.Jc(a, 8).setFloat64(a, b, !0);
  });
  T[80] = function() {
    this.da(this.pop() + '<<31>>31');
  };
  T[81] = function() {
    this.da(this.pop() + '<<24>>24');
  };
  T[82] = function() {
    this.da(this.pop() + '<<16>>16');
  };
  T.ih = function(a) {
    var b = function() {};
    b.decode = a;
    return b;
  };
  T[2] = T.ih();
  T[9] = T.ih();
  T[239] = T.ih(function(a) {
    return [a.ce(), a.og(), a.ce(), a.og()];
  });
  T[241] = T.ih(Jm);
  T[240] = T.ih(Jm);
  T.xd = function(a, b, c) {
    var d = function() {};
    d.implementation = a;
    d.fc = c;
    return (T[b] = d);
  };
  T.on = T.xd(ao.prototype.Ge, 256, ao);
  T.pn = T.xd(
    function(a, b, c) {
      return new Ao(this, a, b, c);
    },
    258,
    ao
  );
  T.qn = T.xd(function(a) {
    var b = this;
    return function() {
      Lh(55);
      var c = Jh;
      Jh = '';
      var d = Je;
      Je = b.P;
      try {
        var e = a.apply(this, arguments);
        --Kh;
        return e;
      } catch (f) {
        Mh(f);
      } finally {
        (Jh = c), (Je = d);
      }
    };
  }, 257);
  T.qk = T.xd(function(a) {
    for (
      var b,
        c = function() {
          b = arguments;
        },
        d,
        e = 0;
      ;

    )
      try {
        return a(c, e, d);
      } catch (f) {
        (e = Bo(f, b)), (d = f.value);
      }
  }, 259);
  T.mn = T.xd(
    function(a, b, c, d, e) {
      return a.length > b ? this.Tn(a[b], c) : this.br(d, e);
    },
    260,
    ao
  );
  T.nn = T.xd(kn.prototype.bt, 261, kn);
  T.ln = T.xd(function() {
    ++wi;
  }, 262);
  T.ks = T.xd(function() {}, 263);
  var co = function(a, b, c) {
    this.source = '';
    this.Jp = a;
    this.dr = b;
    this.lg = c;
    this.nk = {};
    this.Io = [];
    this.vg = this.La = 0;
  };
  v(co, Nh);
  g = co.prototype;
  g.pg = function(a, b) {
    var c = this.Jp[a];
    return this.xm(c, b) ? c.wi : -1;
  };
  g.xm = function(a, b) {
    return a && l(a.wi)
      ? (this.Io.push({ Ip: a, stack: l(b) ? b : this.La, Kw: this.vg }), !0)
      : !1;
  };
  g.Xv = function(a) {
    return String(a);
  };
  g.Oe = function(a) {
    return 'handler' + a;
  };
  g.register = function(a) {
    return 'r' + a;
  };
  g.stack = function(a) {
    return 's' + (this.La - a - 1);
  };
  g.push = function() {
    return this.Vj('s' + this.La++);
  };
  g.pop = function() {
    return 's' + --this.La;
  };
  g.Zd = function(a) {
    for (var b = '[', c = (this.La -= a); 0 < a; ++c, --a)
      (b += 's' + c), 1 < a && (b += ',');
    return b + ']';
  };
  g.ae = function(a) {
    var b = this.lg.multinames[a];
    return this.qj(T.on) + '(' + this.Xv(a) + b.compile(this) + ')';
  };
  g.za = function() {
    this.append(this.push() + '=');
    return this;
  };
  g.da = function(a) {
    this.append(this.push() + '=' + a + ';');
    return this;
  };
  g.scope = function(a) {
    return l(a) ? 'scope' + a : this.vg ? 'scope' + (this.vg - 1) : 'scope';
  };
  g.mw = function() {
    this.vg--;
  };
  g.Gs = function() {
    this.append(this.Vj('scope' + this.vg++) + '=');
    return this;
  };
  g.Es = function(a) {
    for (var b = 0; b < a.length; ++b) {
      var c = a[b],
        d = this.pg(c.target, 1);
      this.append('var ' + this.Oe(b) + '=');
      this.I(T.pn, c.excType, c.varName, d);
    }
  };
  g.Ds = function(a) {
    var b = a.params || [],
      c = a.optionals || [],
      d = b.length - c.length;
    this.append('function(');
    for (var e = 0; e < b.length; )
      0 < e && this.append(','), this.append(this.register(++e));
    this.append('){');
    for (e = 0; e < b.length; ++e) {
      var f = b[e];
      if (e >= d) {
        var h = c[e - d];
        this.append(this.register(e + 1) + '=');
        this.I(T.mn, 'arguments', e, f, this.au(h.kind), h.value);
      } else
        f &&
          (this.append(this.register(e + 1) + '='),
          this.I(T.sd, this.register(e + 1), f));
    }
    this.append('var ' + this.register(0) + '=scope').Og(T.nn, 'this');
    for (
      null != a.arguments &&
      this.append(
        ',' +
          this.register(++e) +
          '=Array.prototype.slice.call(arguments,' +
          a.arguments +
          ')'
      );
      ++e < a.locals;

    )
      this.append(',' + this.register(e));
    this.append(';');
  };
  g.Vj = function(a) {
    this.nk[a] = !0;
    return a;
  };
  g.sw = function(a) {
    this.nk[a] = !1;
  };
  g.Hs = function() {
    var a = !1,
      b;
    for (b in this.nk)
      this.nk[b] && (this.append((a ? ', ' : 'var ') + b), (a = !0));
    a && this.append(';');
  };
  g.Lw = function(a) {
    this.append('katch(');
    for (var b = 0; b < a.length; ++b)
      0 < b && this.append(','), this.append(this.Oe(a[b]));
    this.append(');');
  };
  g.et = function(a) {
    this.La = a.stack;
    this.vg = a.Kw;
    var b = 0;
    for (a = a.Ip; a; ) {
      b++;
      a.mj && this.Lw(a.mj);
      var c = a.qj;
      c.Ma && (b = 0);
      c.apply(this, a.args);
      a = a.next;
      if (this.xm(a)) break;
    }
    return this.Yr();
  };
  g.Cs = function(a) {
    var b = [],
      c = this.Yr();
    this.xm(this.Jp[0]);
    for (var d, e = 0; (d = this.Io.pop()); e++) {
      var f = d.Ip.wi;
      b[f] || (b[f] = this.et(d));
    }
    this.append(c);
    c = 1 < e;
    if ((a = !!a.length))
      this.append('return ').zk(T.qk),
        this.append('(function(katch,j,s0){'),
        this.sw('s0');
    this.Hs();
    c &&
      (this.append(a ? 'for(;;){' : 'for(var j=0;;){'),
      this.I(T.ln),
      this.append('switch(j){'));
    for (d = 0; d < b.length; ++d)
      b[d] && (c && this.append('case ' + d + ':'), this.append(b[d]));
    c && this.append('default:return;}}');
    a && this.append('});');
  };
  var Pm = function(a) {
      Object.defineProperty(this, '__swiffy_v', { value: a.normalize() });
    },
    Eo = function(a, b, c) {
      return new Pm(new Qm(a, b, c));
    };
  Tn(Pm, 'QName', {
    te: function(a) {
      return a instanceof Pm ? a : Eo('', a, !1);
    },
    Tf: function(a, b) {
      var c, d;
      if (l(b))
        (c = l(a)
          ? a instanceof Pm
            ? a.uri
            : null !== a
            ? String(a)
            : null
          : b instanceof Pm
          ? b.uri
          : ''),
          (d = b instanceof Pm ? b.localName : String(b));
      else if (((c = ''), l(a))) {
        if (a instanceof Pm) return a;
        d = String(a);
      } else d = '';
      return Eo(c, d, !1);
    },
  });
  Object.defineProperty(Pm.prototype, 'uri', {
    get: function() {
      return this.__swiffy_v.uri;
    },
  });
  Object.defineProperty(Pm.prototype, 'localName', {
    get: function() {
      return this.__swiffy_v.localName;
    },
  });
  Pm.prototype.toString = function() {
    return this.__swiffy_v.Ra();
  };
  var go = function(a, b) {
      var c, d;
      l(b)
        ? ((c = Ed(a)), (d = b instanceof Pm ? b.uri : String(b)))
        : l(a)
        ? a instanceof go
          ? ((c = a.prefix), (d = a.uri))
          : ((d = a instanceof Pm ? a.uri : String(a)), (c = void 0))
        : (d = c = '');
      O(this, 'prefix', c);
      O(this, 'uri', d);
    },
    Fo = function(a) {
      return a instanceof go ? a : new go(void 0, String(a));
    };
  Tn(go, 'Namespace', { te: Fo });
  go.prototype.valueOf = function() {
    return this.uri;
  };
  go.prototype.toString = function() {
    return this.uri;
  };
  Mm.prototype.trace = function(a) {
    var b = Array.prototype.map.call(arguments, String).join(' ');
    this.__swiffy_vm.trace(b);
  };
  Mm.prototype.parseInt = function(a, b) {
    !l(b) && Bi(a) && (b = 10);
    return parseInt(a, b);
  };
  Mm.prototype.parseFloat = parseFloat;
  Mm.prototype.isNaN = isNaN;
  Mm.prototype.isFinite = isFinite;
  Mm.prototype['flash.utils.setTimeout'] = function(a, b) {
    for (var c = this, d = [], e = 2; e < arguments.length; ++e)
      d.push(arguments[e]);
    return zh(function() {
      a.apply(c, d);
    }, b);
  };
  Mm.prototype['flash.utils.clearTimeout'] = function(a) {
    Ch(a);
  };
  Mm.prototype['flash.utils.setInterval'] = function(a, b) {
    for (var c = this, d = [], e = 2; e < arguments.length; ++e)
      d.push(arguments[e]);
    return Ah(function() {
      a.apply(c, d);
    }, b);
  };
  Mm.prototype['flash.utils.clearInterval'] = function(a) {
    Ch(a);
  };
  Mm.prototype['flash.utils.getTimer'] = function() {
    return Je.c.sp();
  };
  Mm.prototype['flash.utils.getDefinitionByName'] = function(a) {
    xo(a, 'name');
    a = String(a);
    var b = this.__swiffy_vm.kh;
    if (b.Ml(a)) return b.ap(a);
    throw J(1065, a);
  };
  Mm.prototype['flash.utils.getQualifiedClassName'] = function(a) {
    switch (typeof a) {
      case 'undefined':
        return 'void';
      case 'number':
        if ((a | 0) == a) return 'int';
    }
    return Sm(a).Ra();
  };
  Mm.prototype['flash.utils.getQualifiedSuperclassName'] = function(a) {
    t: {
      if (null != a && ((a = On(a).__swiffy_baseclass), null != a)) {
        a = a.__swiffy_name;
        break t;
      }
      a = null;
    }
    return a ? a.Ra() : a;
  };
  Mm.prototype['flash.utils.describeType'] = function(a) {
    var b;
    if (!l(a)) throw J(1010);
    Go || (Go = new Ho());
    b = Go;
    var c = new Io(null, b.Pa('type'));
    if (null === a)
      c.bc(b.Pa('@name'), 'null'), c.bc(b.Pa('@isStatic'), 'false');
    else {
      var d = !!a.__swiffy_typeid;
      a = d ? a : a.__swiffy_classdef;
      var e = b.yo(c, a, d),
        f = a.__swiffy_name.Ra();
      c.bc(b.Pa('@name'), f);
      c.bc(b.Pa('@isStatic'), String(d));
      e && c.bc(b.Pa('@base'), e.__swiffy_name.Ra());
      e = c;
      d &&
        ((e = c.ne(b.Pa('factory'))), e.bc(b.Pa('@type'), f), b.yo(e, a, !1));
      b.Lt(e, a.__swiffy_traits);
    }
    b = c.Yd;
    return b;
  };
  Mm.prototype['flash.system.fscommand'] = function(a, b) {
    xo(a, 'command');
    Ne(Je.c, String(a), 2 > arguments.length ? '' : ho(b));
  };
  Mm.prototype.isXMLName = function(a) {
    return l(Ed(a));
  };
  var Jo = function(a, b) {
    Nm(a, function(c) {
      try {
        return null != c ? b(String(c)) : 'null';
      } catch (d) {
        throw J(1052, a);
      }
    });
  };
  Jo('escape', escape);
  Jo('unescape', unescape);
  Jo('encodeURI', encodeURI);
  Jo('encodeURIComponent', encodeURIComponent);
  Jo('decodeURI', decodeURI);
  Jo('decodeURIComponent', decodeURIComponent);
  Nm('Math', Math);
  Jn(
    'Date',
    function(a) {
      return a instanceof Date ? a : new Date(xh()).toString();
    },
    function(a) {
      if (a instanceof Date) return a;
      if (null == a) return null;
      throw J(1034, Sm(a), 'Date');
    },
    Fh
  );
  Mm.prototype.Date.prototype = Date.prototype;
  Mm.prototype.Date.UTC = Date.UTC;
  Gn(Function, Ln, Nn, Function, Function, In, null, 'Function');
  Gn(Array, Ln, Nn, Array, Array, In, null, 'Array');
  var Ko = aa.RegExp;
  Gn(
    Ko,
    Ln,
    Nn,
    Ko,
    function(a, b) {
      if (a instanceof RegExp) {
        if (l(b)) throw J(1100);
        return new RegExp(a);
      }
      a = String(a);
      null != b && (b = String(b));
      return new jn(a, b).translate();
    },
    In,
    null,
    'RegExp'
  );
  Nm('undefined', void 0);
  Nm('null', null);
  Nm('Infinity', Infinity);
  Nm('NaN', NaN);
  Nm('AS3', Fo('http://adobe.com/AS3/2006/builtin'));
  Object.defineProperty(Object.prototype, 'setPropertyIsEnumerable', {
    value: function(a, b) {
      a = String(a);
      b = !!b;
      var c = Object.getOwnPropertyDescriptor(this, a);
      c &&
        c.configurable &&
        c.enumerable != b &&
        ((c.enumerable = b), Object.defineProperty(this, a, c));
    },
  });
  var Lo = function(a, b) {
    Object.defineProperty(a, Om('http://adobe.com/AS3/2006/builtin', b), {
      value: function() {
        return this[b].apply(this, arguments);
      },
    });
  };
  Lo(Object.prototype, 'toLocaleString');
  Lo(Object.prototype, 'toString');
  Lo(Object.prototype, 'valueOf');
  var V = function(a, b) {
    Object.defineProperty(a, Om('http://adobe.com/AS3/2006/builtin', b), {
      value: a[b],
    });
  };
  V(Object.prototype, 'hasOwnProperty');
  V(Object.prototype, 'isPrototypeOf');
  V(Object.prototype, 'propertyIsEnumerable');
  V(Function.prototype, 'apply');
  V(Function.prototype, 'call');
  V(String, 'fromCharCode');
  V(String.prototype, 'charAt');
  V(String.prototype, 'charCodeAt');
  V(String.prototype, 'concat');
  V(String.prototype, 'indexOf');
  V(String.prototype, 'lastIndexOf');
  V(String.prototype, 'localeCompare');
  V(String.prototype, 'match');
  V(String.prototype, 'replace');
  V(String.prototype, 'search');
  V(String.prototype, 'slice');
  V(String.prototype, 'split');
  V(String.prototype, 'substr');
  V(String.prototype, 'substring');
  V(String.prototype, 'toLocaleLowerCase');
  V(String.prototype, 'toLocaleUpperCase');
  V(String.prototype, 'toLowerCase');
  V(String.prototype, 'toUpperCase');
  V(String.prototype, 'toString');
  V(String.prototype, 'valueOf');
  V(Array.prototype, 'concat');
  V(Array.prototype, 'every');
  V(Array.prototype, 'filter');
  V(Array.prototype, 'forEach');
  V(Array.prototype, 'indexOf');
  V(Array.prototype, 'join');
  V(Array.prototype, 'lastIndexOf');
  V(Array.prototype, 'map');
  V(Array.prototype, 'pop');
  V(Array.prototype, 'push');
  V(Array.prototype, 'reverse');
  V(Array.prototype, 'shift');
  V(Array.prototype, 'slice');
  V(Array.prototype, 'some');
  V(Array.prototype, 'sort');
  V(Array.prototype, 'sortOn');
  V(Array.prototype, 'splice');
  V(Array.prototype, 'unshift');
  V(Date.prototype, 'getDate');
  V(Date.prototype, 'getDay');
  V(Date.prototype, 'getFullYear');
  V(Date.prototype, 'getHours');
  V(Date.prototype, 'getMilliseconds');
  V(Date.prototype, 'getMinutes');
  V(Date.prototype, 'getMonth');
  V(Date.prototype, 'getSeconds');
  V(Date.prototype, 'getTime');
  V(Date.prototype, 'getTimezoneOffset');
  V(Date.prototype, 'getUTCDate');
  V(Date.prototype, 'getUTCDay');
  V(Date.prototype, 'getUTCFullYear');
  V(Date.prototype, 'getUTCHours');
  V(Date.prototype, 'getUTCMilliseconds');
  V(Date.prototype, 'getUTCMinutes');
  V(Date.prototype, 'getUTCMonth');
  V(Date.prototype, 'getUTCSeconds');
  V(Date.prototype, 'setDate');
  V(Date.prototype, 'setFullYear');
  V(Date.prototype, 'setHours');
  V(Date.prototype, 'setMilliseconds');
  V(Date.prototype, 'setMinutes');
  V(Date.prototype, 'setMonth');
  V(Date.prototype, 'setSeconds');
  V(Date.prototype, 'setTime');
  V(Date.prototype, 'setUTCDate');
  V(Date.prototype, 'setUTCFullYear');
  V(Date.prototype, 'setUTCHours');
  V(Date.prototype, 'setUTCMilliseconds');
  V(Date.prototype, 'setUTCMinutes');
  V(Date.prototype, 'setUTCMonth');
  V(Date.prototype, 'setUTCSeconds');
  V(Date.prototype, 'toDateString');
  V(Date.prototype, 'toJSON');
  V(Date.prototype, 'toLocaleDateString');
  V(Date.prototype, 'toLocaleString');
  V(Date.prototype, 'toLocaleTimeString');
  V(Date.prototype, 'toTimeString');
  V(Date.prototype, 'toUTCString');
  Lo(RegExp.prototype, 'exec');
  Lo(RegExp.prototype, 'test');
  var W = function(a, b, c) {
      Object.defineProperty(this, '__swiffy_v', { value: a });
      c && Mo(this, 0);
      R(this, 'fixed', 'Boolean', !!b);
      Object.defineProperty(this, 'length', {
        get: function() {
          return this.__swiffy_v.length;
        },
        set: function(a) {
          a >>>= 0;
          if (this.fixed) throw J(1126);
          var b = this.__swiffy_v.length;
          this.__swiffy_v.length = a;
          Mo(this, b);
        },
      });
    },
    No = function(a) {
      return a.__swiffy_classdef.__swiffy_v.wj ? 0 : null;
    },
    Mo = function(a, b) {
      for (var c = a.__swiffy_v, d = No(a); b < c.length; b++) c[b] = d;
    },
    Oo = function(a, b, c) {
      if (null == b) return No(a);
      a = a.__swiffy_classdef.__swiffy_v;
      return !a.type || (c && !a.wj) ? b : Q(b, a.type);
    },
    Po = function(a, b) {
      var c = Object.create(a.prototype);
      W.call(c, b || []);
      return c;
    };
  W.prototype = Object.create(In.prototype);
  var Qo = function(a, b) {
      var c = function(a) {
        if (Kn(a, c)) return a;
        if (null == a || Object(a) !== a) throw J(1034, Sm(a), c.__swiffy_name);
        var b = Po(c);
        a instanceof W && (a = a.__swiffy_v);
        if (da(a))
          for (var f = b.__swiffy_v, h = 0; h < a.length; h++)
            f[h] = Oo(b, a[h]);
        return b;
      };
      Object.defineProperty(c, '__swiffy_v', { value: { type: a, wj: b } });
      return c;
    },
    Ro = function() {
      return function(a, b) {
        W.call(this, Array(a >>> 0), !!b, !0);
      };
    },
    So = new Qm('__AS3__.vec', 'Vector', !1),
    Uo = function(a, b, c, d) {
      d = d || Mm.prototype;
      var e = new Xm(So).un(a && a.__swiffy_name).Jn(),
        f = d[e];
      f ||
        ((f = Tn(Ro(), e, { te: Qo(a, b), ct: Ln, Tg: c ? W : To })),
        (d[e] = f));
      return f;
    },
    Vo = function(a, b, c) {
      a = Uo(a && Mm.prototype[a], b, !0);
      Nm(So + '$' + c, a);
      return a;
    },
    To = Vo(null, !1, 'object'),
    Wo = Vo('int', !0, 'int'),
    Xo = Vo('uint', !0, 'uint'),
    Yo = Vo('Number', !0, 'double'),
    Zo = P(function() {
      throw J(1007);
    }, So);
  Object.defineProperty(Zo, '__swiffy_type_apply', {
    value: function(a, b) {
      if (1 != b.length) throw 'PANIC! Wrong number of vector type parameters';
      return Uo(b[0], !1, !1, a);
    },
  });
  Object.defineProperty(W.prototype, '__swiffy_proxy', {
    value: {
      Af: function(a, b) {
        var c = a.Rg(1069, this),
          d = this.__swiffy_v;
        if (c >= d.length) throw J(1125, c, d.length);
        c = d[c];
        if (!q(c)) throw J(1006);
        return c.apply(this, b);
      },
      dc: function(a) {
        return !a.cb(this);
      },
      Ie: function(a) {
        a = a.Rg(1069, this);
        var b = this.__swiffy_v;
        if (a >= b.length) throw J(1125, a, b.length);
        return b[a];
      },
      Qe: function(a) {
        return a.oc() < this.__swiffy_v.length;
      },
      dg: function(a) {
        return a - 1;
      },
      We: function(a) {
        return ++a > this.__swiffy_v.length ? 0 : a;
      },
      fg: function(a) {
        return this.__swiffy_v[a - 1];
      },
      setProperty: function(a, b) {
        var c = a.Rg(1056, this),
          d = this.__swiffy_v;
        if (c > d.length || (c == d.length && this.fixed))
          throw J(1125, c, d.length);
        d[c] = Oo(this, b);
      },
    },
  });
  var $o = function(a, b, c) {
      if (!Kn(c, a)) throw J(1034, Sm(c), a.__swiffy_name);
      b.push.apply(b, c.__swiffy_v);
    },
    ap = function(a, b, c, d) {
      if (null != b) {
        b = Q(b, Function);
        for (var e = a.__swiffy_v, f = 0; f < e.length; f++) {
          var h = e[f],
            k = b.call(c, h, f, a);
          if (d && d.call(a, k, h)) return !1;
        }
      }
      return !0;
    },
    bp = function(a, b, c, d) {
      if (a.fixed) throw J(1126);
      var e = a.__swiffy_v,
        f = d.length;
      c = [b, c];
      c.length += f;
      c = e.splice.apply(e, c);
      var h = 0;
      try {
        for (; 0 < f; h++, b++, f--) e[b] = Oo(a, d[h]);
      } finally {
        for (a = No(a); 0 < f; b++, f--) e[b] = a;
      }
      return c;
    };
  W.prototype.concat = function(a) {
    var b = this.__swiffy_classdef,
      c = this.__swiffy_v.slice();
    if (10 < Je.c.Rc)
      for (var d = 0; d < arguments.length; d++) $o(b, c, arguments[d]);
    else for (d = arguments.length - 1; 0 <= d; d--) $o(b, c, arguments[d]);
    return Po(b, c);
  };
  V(W.prototype, 'concat');
  W.prototype.every = function(a, b) {
    return ap(this, a, b, function(a) {
      return !a;
    });
  };
  V(W.prototype, 'every');
  W.prototype.filter = function(a, b) {
    var c = [];
    ap(this, a, b, function(a, b) {
      a && c.push(b);
    });
    return Po(this.__swiffy_classdef, c);
  };
  V(W.prototype, 'filter');
  W.prototype.forEach = function(a, b) {
    ap(this, a, b);
  };
  V(W.prototype, 'forEach');
  W.prototype.indexOf = function(a, b) {
    a = Oo(this, a, !0);
    return this.__swiffy_v.indexOf(a, b | 0);
  };
  V(W.prototype, 'indexOf');
  W.prototype.join = function(a) {
    a = io(a, ',');
    return this.__swiffy_v.join(a);
  };
  V(W.prototype, 'join');
  W.prototype.lastIndexOf = function(a, b) {
    a = Oo(this, a, !0);
    b = A(b, 2147483647) | 0;
    return this.__swiffy_v.lastIndexOf(a, b);
  };
  V(W.prototype, 'lastIndexOf');
  W.prototype.map = function(a, b) {
    var c = [];
    ap(this, a, b, function(a) {
      c.push(Oo(this, a));
    });
    return Po(this.__swiffy_classdef, c);
  };
  V(W.prototype, 'map');
  W.prototype.pop = function() {
    if (this.fixed) throw J(1126);
    var a = this.__swiffy_v;
    return a.length
      ? a.pop()
      : this.__swiffy_classdef.__swiffy_v.wj
      ? 0
      : void 0;
  };
  V(W.prototype, 'pop');
  W.prototype.push = function(a) {
    var b = this.__swiffy_v;
    bp(this, b.length, 0, arguments);
    return b.length;
  };
  V(W.prototype, 'push');
  W.prototype.reverse = function() {
    this.__swiffy_v.reverse();
    return this;
  };
  V(W.prototype, 'reverse');
  W.prototype.shift = function() {
    if (this.fixed) throw J(1126);
    var a = this.__swiffy_v;
    return a.length
      ? a.shift()
      : this.__swiffy_classdef.__swiffy_v.wj
      ? 0
      : void 0;
  };
  V(W.prototype, 'shift');
  W.prototype.slice = function(a, b) {
    b = A(b, 16777215) | 0;
    return Po(this.__swiffy_classdef, this.__swiffy_v.slice(a | 0, b));
  };
  V(W.prototype, 'slice');
  W.prototype.some = function(a, b) {
    return !ap(this, a, b, function(a) {
      return a;
    });
  };
  V(W.prototype, 'some');
  W.prototype.sort = function(a) {
    this.__swiffy_v.sort(a);
    return this;
  };
  V(W.prototype, 'sort');
  W.prototype.splice = function(a, b, c) {
    a |= 0;
    b >>>= 0;
    c = Array.prototype.slice.call(arguments, 2);
    return Po(this.__swiffy_classdef, bp(this, a, b, c));
  };
  V(W.prototype, 'splice');
  W.prototype.toLocaleString = function() {
    return this.toString();
  };
  W.prototype.unshift = function(a) {
    bp(this, 0, 0, arguments);
    return this.__swiffy_v.length;
  };
  V(W.prototype, 'unshift');
  W.prototype.toString = function() {
    return this.__swiffy_v.join(',');
  };
  var fp = function(a) {
      if (a instanceof cp) return (a = dp.call(a, 1088)), ep.copy.call(a);
      if (a instanceof fp) return ep.copy.call(a);
      if (null != a) {
        a = String(a);
        a = new Pd(a, Co.ignoreWhitespace, !1);
        var b = gp(a);
        b || (b = new hp(null, ''));
        if (ip(a)) throw J(1088);
        return b.Yd;
      }
      return new hp(null, '').Yd;
    },
    Co = function(a) {
      return a instanceof fp
        ? a
        : a instanceof cp
        ? dp.call(a, 1088)
        : new fp(a);
    };
  Tn(fp, 'XML', { te: Co, Tf: fp });
  R(Co, 'ignoreComments', 'Boolean', !0);
  R(Co, 'ignoreProcessingInstructions', 'Boolean', !0);
  R(Co, 'ignoreWhitespace', 'Boolean', !0);
  R(Co, 'prettyIndent', 'int', 2);
  R(Co, 'prettyPrinting', 'Boolean', !0);
  var jp = function(a) {
    return 0 == a.oc() || this.__swiffy_v.Ll(a);
  };
  Object.defineProperty(fp.prototype, '__swiffy_proxy', {
    value: {
      Af: function(a, b) {
        var c = ep[a];
        if (q(c)) return c.apply(this, b);
        c = String.prototype[a];
        if (q(c) && this.__swiffy_v.nj()) return c.apply(this.toString(), b);
        throw J(1006, 'value');
      },
      dc: function() {
        return !1;
      },
      hj: function(a) {
        a = this.__swiffy_v.vf([], a, !1);
        return kp(a);
      },
      Ie: function(a) {
        if (0 == a.oc()) return this;
        a = this.__swiffy_v.pe([], a);
        return kp(a);
      },
      setProperty: function(a) {
        if (l(a.oc())) throw J(1087);
      },
      Qe: jp,
      dg: function() {
        return '0';
      },
      We: function(a) {
        return 0 == a ? 1 : 0;
      },
      fg: function() {
        return this;
      },
    },
  });
  fp.prototype.hasOwnProperty = function(a) {
    return jp.call(this, lp(a));
  };
  fp.prototype.toString = function() {
    return this.__swiffy_v.Yc(!1);
  };
  fp.prototype.valueOf = function() {
    return this;
  };
  fp.prototype.toJSON = function() {
    return 'XML';
  };
  var ep = {
    addNamespace: function() {
      S(this, 'addNamespace');
      return this;
    },
    appendChild: function() {
      S(this, 'appendChild');
      return this;
    },
    attribute: function(a) {
      a = this.__swiffy_v.pe([], lp(a), !0);
      return kp(a);
    },
    attributes: function() {
      var a = this.__swiffy_v.wk([]);
      return kp(a);
    },
    child: function() {
      S(this, 'child');
      return kp([]);
    },
    childIndex: function() {
      return this.__swiffy_v.Pf();
    },
    children: function() {
      var a = this.__swiffy_v.xk([]);
      return kp(a);
    },
    comments: function() {
      S(this, 'comments');
      return kp([]);
    },
    contains: function(a) {
      Q(a, Co);
      S(this, 'contains');
      return !1;
    },
    copy: function() {
      return this.__swiffy_v.ob(null).Yd;
    },
  };
  Co.defaultSettings = function() {
    return {
      ignoreComments: !0,
      ignoreProcessingInstructions: !0,
      ignoreWhitespace: !0,
      prettyIndent: 2,
      prettyPrinting: !0,
    };
  };
  ep.descendants = function(a) {
    a = lp(a, '*');
    a = this.__swiffy_v.vf([], a, !0);
    return kp(a);
  };
  ep.elements = function(a) {
    a = this.__swiffy_v.pe([], lp(a, '*'), !1);
    return kp(a);
  };
  ep.hasComplexContent = function() {
    return this.__swiffy_v.Bh();
  };
  ep.hasSimpleContent = function() {
    return this.__swiffy_v.nj();
  };
  ep.inScopeNamespaces = function() {
    S(this, 'inScopeNamespaces');
    return [];
  };
  ep.insertChildAfter = function() {
    S(this, 'insertChildAfter');
  };
  ep.insertChildBefore = function() {
    S(this, 'insertChildBefore');
  };
  ep.length = function() {
    return 1;
  };
  ep.localName = function() {
    var a = this.__swiffy_v.name;
    return a ? a.localName : null;
  };
  ep.name = function() {
    return this.__swiffy_v.name;
  };
  ep.namespace = function() {
    S(this, 'namespace');
    return null;
  };
  ep.namespaceDeclarations = function() {
    S(this, 'namespaceDeclarations');
    return [];
  };
  ep.nodeKind = function() {
    return this.__swiffy_v.Wd;
  };
  ep.normalize = function() {
    S(this, 'normalize');
    return this;
  };
  ep.parent = function() {
    var a = this.__swiffy_v;
    if (a.parent) return a.parent.Yd;
  };
  ep.prependChild = function() {
    S(this, 'prependChild');
    return this;
  };
  ep.processingInstructions = function() {
    S(this, 'processingInstructions');
    return kp([]);
  };
  ep.propertyIsEnumerable = function(a) {
    return '0' == lp(a).oc();
  };
  ep.removeNamespace = function(a) {
    Q(a, Fo);
    S(this, 'removeNamespace');
    return this;
  };
  ep.replace = function() {
    S(this, 'replace');
    return this;
  };
  ep.setChildren = function() {
    S(this, 'setChildren');
    return this;
  };
  ep.setLocalName = function() {
    S(this, 'setLocalName');
  };
  ep.setName = function() {
    S(this, 'setName');
  };
  ep.setNamespace = function(a) {
    Q(a, Fo);
    S(this, 'setNamespace');
  };
  Co.setSettings = function(a) {
    ia(a) || (a = fp.defaultSettings());
    ga(a.ignoreComments) && (Co.ignoreComments = a.ignoreComments);
    ga(a.ignoreProcessingInstructions) &&
      (Co.ignoreProcessingInstructions = a.ignoreProcessingInstructions);
    ga(a.ignoreWhitespace) && (Co.ignoreWhitespace = a.ignoreWhitespace);
    ha(a.prettyIndent) && (Co.prettyIndent = a.prettyIndent);
    ga(a.prettyPrinting) && (Co.prettyPrinting = a.prettyPrinting);
  };
  Co.settings = function() {
    return {
      ignoreComments: fp.ignoreComments,
      ignoreProcessingInstructions: Co.ignoreProcessingInstructions,
      ignoreWhitespace: fp.ignoreWhitespace,
      prettyIndent: fp.prettyIndent,
      prettyPrinting: fp.prettyPrinting,
    };
  };
  ep.text = function() {
    var a = this.__swiffy_v.yk([], 'text');
    return kp(a);
  };
  ep.toXMLString = function() {
    return this.__swiffy_v.Yc(!0);
  };
  var mp = function(a) {
    this.Yd = Object.create(fp.prototype);
    Object.defineProperty(this.Yd, '__swiffy_v', { value: this });
    this.parent = a;
  };
  g = mp.prototype;
  g.name = null;
  g.namespaces = null;
  g.attributes = null;
  g.children = null;
  g.value = null;
  g.ri = function(a, b) {
    b.push(this.Yc(a));
    return a;
  };
  g.Bh = function() {
    return !1;
  };
  g.nj = function() {
    return !this.Bh();
  };
  g.Pf = function() {
    if (this.parent)
      for (var a = 0; a < this.parent.children.length; a++)
        if (this.parent.children[a] == this) return a;
    return -1;
  };
  g.Xf = function(a, b) {
    return !b && !a.pa && '*' == a.localName;
  };
  g.Ll = function() {
    return !1;
  };
  g.pe = function(a) {
    return a;
  };
  g.vf = function(a) {
    return a;
  };
  g.wk = function(a) {
    return a;
  };
  g.xk = function(a) {
    return a;
  };
  g.yk = function(a) {
    return a;
  };
  var Io = function(a, b, c) {
    mp.call(this, a);
    this.name = b;
    this.namespaces = c || [];
    this.attributes = [];
    this.children = [];
  };
  v(Io, mp);
  g = Io.prototype;
  g.Wd = 'element';
  g.Yc = function(a) {
    var b = [];
    a = this.ri(a, b);
    return np(b, a);
  };
  g.ri = function(a, b, c) {
    a = a || this.Bh();
    if (!a) {
      for (a = 0; a < this.children.length; a++) this.children[a].ri(!1, b);
      return !1;
    }
    c = new op(c);
    for (a = 0; a < this.namespaces.length; a++) c.Hq(this.namespaces[a]);
    var d = c.ar(this.name),
      e = '<' + d;
    for (a = 0; a < this.attributes.length; a++)
      var f = this.attributes[a],
        e = e + (' ' + c.ar(f.name) + '="' + Id(f.value) + '"');
    e += c.yt();
    if (0 == this.children.length) b.push(e + '/>');
    else if (1 == this.children.length && 'text' == this.children[0].Wd)
      b.push(e + '>' + this.children[a].Yc(!0) + '</' + d + '>');
    else {
      f = [];
      for (a = 0; a < this.children.length; a++) this.children[a].ri(!0, f, c);
      b.push(e + '>');
      b.push(f);
      b.push('</' + d + '>');
    }
    return !0;
  };
  g.Bh = function() {
    for (var a = 0; a < this.children.length; a++)
      if (this.children[a] instanceof Io) return !0;
    return !1;
  };
  g.ob = function(a) {
    a = new Io(a, this.name, this.namespaces.slice());
    for (var b = 0; b < this.attributes.length; b++)
      a.attributes.push(this.attributes[b].ob(a));
    for (b = 0; b < this.children.length; b++)
      a.children.push(this.children[b].ob(a));
    return a;
  };
  g.Xf = function(a) {
    if (a.pa) return !1;
    if ('*' == a.localName) return !0;
    var b = this.name.__swiffy_v;
    return a.localName == b.localName && a.uri == b.uri;
  };
  g.Ll = function(a) {
    for (
      var b = a.pa ? this.attributes : this.children, c = 0;
      c < b.length;
      c++
    )
      if (b[c].Xf(a, !1)) return !0;
    return !1;
  };
  g.pe = function(a, b, c) {
    var d = l(c);
    c = (c = d ? c : b.pa) ? this.attributes : this.children;
    for (var e = 0; e < c.length; e++) {
      var f = c[e];
      f.Xf(b, d) && a.push(f);
    }
    return a;
  };
  g.vf = function(a, b, c) {
    if (b.pa)
      for (var d = 0; d < this.attributes.length; d++) {
        var e = this.attributes[d];
        e.Xf(b, c) && a.push(e);
      }
    for (d = 0; d < this.children.length; d++)
      (e = this.children[d]), e.Xf(b, c) && a.push(e), e.vf(a, b, c);
    return a;
  };
  g.wk = function(a) {
    for (var b = 0; b < this.attributes.length; b++) a.push(this.attributes[b]);
    return a;
  };
  g.xk = function(a) {
    for (var b = 0; b < this.children.length; b++) a.push(this.children[b]);
    return a;
  };
  g.yk = function(a, b) {
    for (var c = 0; c < this.children.length; c++) {
      var d = this.children[c];
      d.Wd == b && a.push(d);
    }
    return a;
  };
  g.bc = function(a, b) {
    this.attributes.push(new pp(this, a, b));
    return this;
  };
  g.ne = function(a) {
    a = new Io(this, a, []);
    this.children.push(a);
    return a;
  };
  var pp = function(a, b, c) {
    mp.call(this, a);
    this.name = b;
    this.value = c;
  };
  v(pp, mp);
  g = pp.prototype;
  g.Wd = 'attribute';
  g.Yc = function(a) {
    return a ? Id(this.value) : this.value;
  };
  g.ob = function(a) {
    return new pp(a, this.name, this.value);
  };
  g.Pf = function() {
    return -1;
  };
  g.Xf = function(a, b) {
    if ('*' == a.localName) return !0;
    var c = this.name.__swiffy_v;
    return a.localName == c.localName && ((b && !c.uri) || a.uri == c.uri);
  };
  var hp = function(a, b) {
    mp.call(this, a);
    this.value = b;
  };
  v(hp, mp);
  hp.prototype.Wd = 'text';
  hp.prototype.Yc = function(a) {
    return a ? Hd(this.value) : this.value;
  };
  hp.prototype.ob = function(a) {
    return new hp(a, this.value);
  };
  var qp = function(a, b) {
    mp.call(this, a);
    this.value = b;
  };
  v(qp, mp);
  qp.prototype.Wd = 'text';
  qp.prototype.Yc = function(a) {
    return a ? '<![CDATA[' + this.value + ']]\x3e' : this.value;
  };
  qp.prototype.ob = function(a) {
    return new qp(a, this.value);
  };
  var lp = function(a, b) {
      if (a instanceof Pm) return a.__swiffy_v;
      !l(a) && l(b) && (a = b);
      a = String(a);
      var c = '@' == a.charAt(0);
      c && (a = a.substring(1));
      return new Qm('', a, c);
    },
    ip = function(a) {
      try {
        return a.next();
      } catch (b) {
        switch (b.type) {
          case 'tag':
          case 'close':
            throw J(1090);
          case 'cdata':
            throw J(1091);
          case 'comment':
            throw J(1094);
          case 'processing_instruction':
            throw J(1097);
          case 'attribute':
            throw J(1095);
          default:
            throw b;
        }
      }
    },
    rp = function(a, b) {
      for (var c = new zc(), d = 0; d < a.length; ) {
        var e = a[d],
          f = e.name.match(/^xmlns(?::(.*))?$/);
        f ? (c.set(f[1] || '', e.value), a.splice(d, 1)) : d++;
      }
      b || !Jh || c.gd('') || c.set('', Jh);
      this.gs = c;
      this.ca = b;
    };
  rp.prototype.resolve = function(a, b, c) {
    if (!l(c)) {
      var d = b.indexOf(':');
      c = 0 <= d ? b.substring(0, d) : '';
      b = 0 <= d ? b.substring(d + 1) : b;
    }
    if (a && !c) return Eo('', b, !0);
    d = this.gs.get(c);
    if (l(d)) return Eo(d, b, a);
    if (this.ca) return this.ca.resolve(a, b, c);
    if (c) throw J(1083, c, b);
    return Eo('', b, !1);
  };
  rp.prototype.zu = function() {
    return this.gs.map(function(a, b) {
      return new go(b, a);
    });
  };
  var gp = function(a, b, c, d) {
      for (var e = c || null, f; (f = ip(a)); )
        switch (f.type) {
          case 'tag':
            c = f.attributes;
            b = new rp(c, b);
            e = new Io(e, b.resolve(!1, f.value), b.zu());
            for (d = 0; d < c.length; d++) {
              var h = c[d];
              e.attributes.push(new pp(e, b.resolve(!0, h.name), h.value));
            }
            for (;;) {
              c = gp(a, b, e, f.value);
              if (!c) return e;
              e.children.push(c);
            }
          case 'close':
            if (e) {
              if (d != f.value) throw ((a = e.name.localName), J(1085, a, a));
              return null;
            }
            throw J(1088);
          case 'text':
            return new hp(e || null, f.value);
          case 'cdata':
            return new qp(e || null, f.value);
        }
      if (!c) return null;
      a = e.name.localName;
      throw J(1085, a, a);
    },
    op = function(a) {
      this.Nj = [];
      this.be = (this.pm = !l(a)) ? {} : a.be;
    };
  op.prototype.Zt = function() {
    if (!this.pm) {
      var a = {},
        b;
      for (b in this.be) a[b] = this.be[b];
      this.be = a;
      this.pm = !0;
    }
  };
  op.prototype.Hq = function(a) {
    var b = a.prefix || '',
      c = a.uri,
      d = this.be[c];
    d != b && (void 0 === d && (this.Zt(), (this.be[c] = b)), this.Nj.push(a));
  };
  op.prototype.ar = function(a) {
    var b = a.uri;
    a = a.localName;
    if (!b) return a;
    var c = this.be[b];
    if (!c) {
      for (var c = '', d = 0; c in this.be; d++)
        c =
          String.fromCharCode(97 + d / 17576) +
          String.fromCharCode(97 + ((d / 17576) % 26)) +
          String.fromCharCode(97 + ((d / 676) % 26)) +
          String.fromCharCode(97 + ((d / 26) % 26));
      this.Hq(new go(c, b));
    }
    return c ? c + ':' + a : a;
  };
  op.prototype.yt = function() {
    for (var a = '', b = 0; b < this.Nj.length; b++) {
      var a = a + ' xmlns',
        c = this.Nj[b],
        d = c.prefix;
      d && (a += ':' + d);
      a += '="' + Id(c.uri) + '"';
    }
    this.Nj = [];
    return a;
  };
  var np = function(a, b) {
    b = b && Co.prettyPrinting;
    var c = '';
    if (b) for (var d = Co.prettyIndent; 0 < d; d--) c += ' ';
    var e = [],
      f = function(a, d) {
        for (var m = 0; m < a.length; m++)
          if (da(a[m])) f(a[m], d + c);
          else if (b)
            for (var n = a[m].trim().split(/\n/), t = 0; t < n.length; t++)
              e.push(d + n[t]);
          else e.push(a[m]);
      };
    f(a, '');
    return e.join(b ? '\n' : '');
  };
  var cp = function(a) {
      if (a instanceof fp) a = [a.__swiffy_v];
      else if (a instanceof cp) a = a.__swiffy_v.slice();
      else if (null != a && '' != a) {
        a = String(a);
        a = new Pd(a, Co.ignoreWhitespace, !1);
        for (var b, c = []; (b = gp(a)); ) c.push(b);
        a = c;
      } else a = [];
      return kp(a);
    },
    Do = function(a) {
      return a instanceof cp ? a : new cp(a);
    };
  Tn(cp, 'XMLList', { te: Do, Tf: cp });
  var sp = function(a) {
    for (
      var b = this.__swiffy_v, c = a.oc() < b.length, d = 0;
      !c && d < b.length;
      d++
    )
      c = b[d].Ll(a);
    return c;
  };
  Object.defineProperty(cp.prototype, '__swiffy_proxy', {
    value: {
      Af: function(a, b) {
        var c = tp[a];
        if (q(c)) return c.apply(this, b);
        c = ep[a];
        if (q(c)) {
          var d = dp.call(this, 1086, a);
          return c.apply(d, b);
        }
        c = String.prototype[a];
        if (q(c) && ((d = dp.call(this, 1086, a)), d.__swiffy_v.nj()))
          return c.apply(d.toString(), b);
        throw J(1006, 'value');
      },
      dc: function() {
        return !1;
      },
      hj: function(a) {
        for (var b = this.__swiffy_v, c = [], d = 0; d < b.length; d++)
          b[d].vf(c, a, !1);
        return kp(c);
      },
      Ie: function(a) {
        var b = this.__swiffy_v,
          c = a.oc();
        if (l(c)) return up(b[c]);
        for (var c = [], d = 0; d < b.length; d++) b[d].pe(c, a);
        return kp(c);
      },
      setProperty: function(a, b) {
        var c = this.__swiffy_v,
          d = a.oc();
        l(d) &&
          (d > c.length && (d = c.length),
          b instanceof fp && (c[d] = b.__swiffy_v));
      },
      Qe: sp,
      dg: function(a) {
        return String(a - 1);
      },
      We: function(a) {
        return ++a > this.__swiffy_v.length ? 0 : a;
      },
      fg: function(a) {
        return up(this.__swiffy_v[a - 1]);
      },
    },
  });
  cp.prototype.hasOwnProperty = function(a) {
    return sp.call(this, lp(a));
  };
  cp.prototype.toString = function() {
    if (tp.hasComplexContent.call(this)) return tp.toXMLString.call(this);
    for (var a = this.__swiffy_v, b = [], c = 0; c < a.length; c++)
      b.push(a[c].Yc(!1));
    return b.join('');
  };
  cp.prototype.valueOf = function() {
    return this;
  };
  cp.prototype.toJSON = function() {
    return 'XMLList';
  };
  var tp = {
      attribute: function(a) {
        a = lp(a);
        for (var b = this.__swiffy_v, c = 0; c < b.length; c++)
          b[c].pe([], a, !0);
        return kp([]);
      },
      attributes: function() {
        for (var a = [], b = this.__swiffy_v, c = 0; c < b.length; c++)
          b[c].wk(a);
        return kp(a);
      },
      child: function() {
        S(this, 'child');
        return kp([]);
      },
      children: function() {
        for (var a = this.__swiffy_v, b = [], c = 0; c < a.length; c++)
          a[c].xk(b);
        return kp(b);
      },
      comments: function() {
        S(this, 'comments');
        return kp([]);
      },
      contains: function(a) {
        Q(a, Co);
        S(this, 'contains');
        return !1;
      },
      copy: function() {
        S(this, 'copy');
        return kp([]);
      },
      descendants: function(a) {
        a = lp(a, '*');
        for (var b = this.__swiffy_v, c = [], d = 0; d < b.length; d++)
          b[d].vf(c, a, !0);
        return kp(c);
      },
      elements: function(a) {
        a = lp(a, '*');
        for (var b = this.__swiffy_v, c = [], d = 0; d < b.length; d++)
          b[d].pe(c, a, !1);
        return kp(c);
      },
      hasComplexContent: function() {
        var a = this.__swiffy_v;
        if (0 == a.length) return !1;
        if (1 == a.length) return a[0].Bh();
        for (var b = 0; b < a.length; b++) if ('element' == a[b].Wd) return !0;
        return !1;
      },
      hasSimpleContent: function() {
        var a = this.__swiffy_v;
        if (0 == a.length) return !0;
        if (1 == a.length) return a[0].nj();
        for (var b = 0; b < a.length; b++) if ('element' == a[b].Wd) return !1;
        return !0;
      },
      length: function() {
        return this.__swiffy_v.length;
      },
      normalize: function() {
        S(this, 'normalize');
        return kp([]);
      },
      parent: function() {
        var a = this.__swiffy_v;
        if (a.length) {
          for (var b = a[0].parent, c = 1; b && c < a.length; c++)
            if (a[c].parent != b) return;
          return up(b);
        }
      },
      processingInstructions: function() {
        S(this, 'processingInstructions');
        return kp([]);
      },
      propertyIsEnumerable: function(a) {
        return lp(a).oc() < this.__swiffy_v.length;
      },
      text: function() {
        for (var a = this.__swiffy_v, b = [], c = 0; c < a.length; c++)
          a[c].yk(b, 'text');
        return kp(b);
      },
      toXMLString: function() {
        for (var a = this.__swiffy_v, b = [], c = 0; c < a.length; c++)
          b.push(a[c].Yc(!0));
        return b.join('\n');
      },
    },
    kp = function(a) {
      var b = Object.create(cp.prototype);
      Object.defineProperty(b, '__swiffy_v', { value: a });
      return b;
    },
    dp = function(a, b) {
      var c = this.__swiffy_v;
      if (1 == c.length) return c[0].Yd;
      throw J.apply(null, arguments);
    },
    up = function(a) {
      return a ? a.Yd : void 0;
    };
  P(function() {
    R(this, 'description', 'String', '');
    R(this, 'forceSimple', 'Boolean', !1);
    R(this, 'name', 'String', '');
    R(this, 'noAutoLabeling', 'Boolean', !1);
    R(this, 'shortcut', 'String', '');
    R(this, 'silent', 'Boolean', !1);
  }, 'flash.accessibility.AccessibilityProperties');
  var vp = P(function() {}, 'flash.display.BitmapDataChannel');
  Object.defineProperties(vp, {
    ALPHA: { value: 8 },
    BLUE: { value: 4 },
    GREEN: { value: 2 },
    RED: { value: 1 },
  });
  var wp = P(function() {}, 'flash.display.BlendMode');
  Object.defineProperties(wp, {
    ADD: { value: 'add' },
    ALPHA: { value: 'alpha' },
    DARKEN: { value: 'darken' },
    DIFFERENCE: { value: 'difference' },
    ERASE: { value: 'erase' },
    HARDLIGHT: { value: 'hardlight' },
    INVERT: { value: 'invert' },
    LAYER: { value: 'layer' },
    LIGHTEN: { value: 'lighten' },
    MULTIPLY: { value: 'multiply' },
    NORMAL: { value: 'normal' },
    OVERLAY: { value: 'overlay' },
    SCREEN: { value: 'screen' },
    SHADER: { value: 'shader' },
    SUBTRACT: { value: 'subtract' },
  });
  var xp = P(function() {}, 'flash.display.CapsStyle');
  O(xp, 'NONE', 'none');
  O(xp, 'ROUND', 'round');
  O(xp, 'SQUARE', 'square');
  var yp = P(function() {}, 'flash.display.GradientType');
  O(yp, 'LINEAR', 'linear');
  O(yp, 'RADIAL', 'radial');
  var zp = Un(2012);
  zp.p = P(zp, 'flash.display.Graphics');
  zp.create = function(a) {
    var b = Object.create(zp.prototype);
    Object.defineProperty(b, '__swiffy_d', { value: a });
    return b;
  };
  zp.prototype.beginBitmapFill = function(a, b) {
    Q(a, Ap);
    Q(b, Bp);
    S(this, 'beginBitmapFill');
  };
  zp.prototype.beginFill = function(a, b) {
    a >>>= 0;
    b = 100 * +A(b, 1);
    this.__swiffy_d.Ka().Bn(a, b);
  };
  zp.prototype.beginGradientFill = function(a, b, c, d, e, f, h, k) {
    a = String(a);
    b = Q(b, Array);
    c = Q(c, Array);
    d = Q(d, Array);
    e = Q(e, Bp);
    f = io(f, 'pad');
    h = io(h, 'rgb');
    k = +A(k, 0);
    this.__swiffy_d.Ka().Cn(a, b, c, d, Cp(e), f, h, k);
  };
  zp.prototype.beginShaderFill = function(a, b) {
    Q(b, Bp);
    S(this, 'beginShaderFill');
  };
  zp.prototype.clear = function() {
    this.__swiffy_d.Ka().clear();
  };
  zp.prototype.copyFrom = function(a) {
    Q(a, zp.p);
    S(this, 'copyFrom');
  };
  zp.prototype.cubicCurveTo = function() {
    S(this, 'cubicCurveTo');
  };
  zp.prototype.curveTo = function(a, b, c, d) {
    a = +a;
    b = +b;
    c = +c;
    d = +d;
    this.__swiffy_d.Ka().pb(a, b, c, d);
  };
  zp.prototype.drawCircle = function(a, b, c) {
    a = +a;
    b = +b;
    c = +c;
    this.__swiffy_d.Ka().Ao(a, b, c, c);
  };
  zp.prototype.drawEllipse = function(a, b, c, d) {
    c = +c / 2;
    d = +d / 2;
    a = +a + c;
    b = +b + d;
    this.__swiffy_d.Ka().Ao(a, b, c, d);
  };
  zp.prototype.drawGraphicsData = function() {
    S(this, 'drawGraphicsData');
  };
  zp.prototype.drawPath = function(a, b) {
    Q(a, Wo);
    Q(b, Yo);
    S(this, 'drawPath');
  };
  zp.prototype.drawRect = function(a, b, c, d) {
    a = +a;
    b = +b;
    c = +c;
    d = +d;
    this.__swiffy_d.Ka().Vt(a, b, c, d);
  };
  zp.prototype.drawRoundRect = function(a, b, c, d, e, f) {
    a = +a;
    b = +b;
    c = +c;
    d = +d;
    e = +e;
    f = +A(f, e);
    this.__swiffy_d.Ka().Wt(a, b, c, d, e, f);
  };
  zp.prototype.drawTriangles = function(a, b, c) {
    Q(a, Yo);
    Q(b, Wo);
    Q(c, Yo);
    S(this, 'drawTriangles');
  };
  zp.prototype.endFill = function() {
    this.__swiffy_d.Ka().Go();
  };
  zp.prototype.lineBitmapStyle = function(a, b) {
    Q(a, Ap);
    Q(b, Bp);
    S(this, 'lineBitmapStyle');
  };
  zp.prototype.lineGradientStyle = function(a, b, c, d, e) {
    Q(b, Array);
    Q(c, Array);
    Q(d, Array);
    Q(e, Bp);
    S(this, 'lineGradientStyle');
  };
  zp.prototype.lineShaderStyle = function(a, b) {
    Q(b, Bp);
    S(this, 'lineShaderStyle');
  };
  zp.prototype.lineStyle = function(a, b, c, d, e, f, h, k) {
    l(a) && (a = +a);
    b >>>= 0;
    c = 100 * +A(c, 1);
    d = !!d;
    e = io(e, 'normal');
    f = ho(f);
    h = ho(h);
    k = +A(k, 3);
    this.__swiffy_d.Ka().Pp(a, b, c, d, e, f, h, k);
  };
  zp.prototype.lineTo = function(a, b) {
    a = +a;
    b = +b;
    this.__swiffy_d.Ka().lineTo(a, b);
  };
  zp.prototype.moveTo = function(a, b) {
    a = +a;
    b = +b;
    this.__swiffy_d.Ka().moveTo(a, b);
  };
  var Dp = P(Un(1001), 'flash.display.IBitmapDrawable');
  Dp.p = Dp;
  An(Dp.p);
  var Ep = P(function() {}, 'flash.display.InterpolationMethod');
  O(Ep, 'RGB', 'rgb');
  O(Ep, 'LINEAR_RGB', 'linearRGB');
  var Fp = P(function() {}, 'flash.display.JointStyle');
  O(Fp, 'BEVEL', 'bevel');
  O(Fp, 'MITER', 'miter');
  O(Fp, 'ROUND', 'round');
  var Gp = P(function() {}, 'flash.display.LineScaleMode');
  O(Gp, 'HORIZONTAL', 'horizontal');
  O(Gp, 'NONE', 'none');
  O(Gp, 'NORMAL', 'normal');
  O(Gp, 'VERTICAL', 'vertical');
  var Hp = P(function() {}, 'flash.display.PixelSnapping');
  Object.defineProperties(Hp, {
    ALWAYS: { value: 'always' },
    AUTO: { value: 'auto' },
    NEVER: { value: 'never' },
  });
  var Ip = function(a, b, c) {
      Object.defineProperty(this, '__swiffy_v', {
        value: { name: String(a), numFrames: b | 0, labels: Q(c, Array) },
      });
    },
    Jp = P(Ip, 'flash.display.Scene');
  M(Jp, 'name', function() {
    return this.__swiffy_v.name;
  });
  M(Jp, 'numFrames', function() {
    return this.__swiffy_v.numFrames;
  });
  M(Jp, 'labels', function() {
    return this.__swiffy_v.labels;
  });
  var Kp = P(function() {}, 'flash.display.SpreadMethod');
  O(Kp, 'PAD', 'pad');
  O(Kp, 'REFLECT', 'reflect');
  O(Kp, 'REPEAT', 'repeat');
  var Lp = P(function() {}, 'flash.display.StageAlign');
  O(Lp, 'BOTTOM', 'B');
  O(Lp, 'BOTTOM_LEFT', 'BL');
  O(Lp, 'BOTTOM_RIGHT', 'BR');
  O(Lp, 'LEFT', 'L');
  O(Lp, 'RIGHT', 'R');
  O(Lp, 'TOP', 'T');
  O(Lp, 'TOP_LEFT', 'TL');
  O(Lp, 'TOP_RIGHT', 'TR');
  var Mp = P(function() {}, 'flash.display.StageDisplayState');
  Object.defineProperties(Mp, {
    FULL_SCREEN: { value: 'fullScreen' },
    FULL_SCREEN_INTERACTIVE: { value: 'fullScreenInteractive' },
    NORMAL: { value: 'normal' },
  });
  var Np = P(function() {}, 'flash.display.StageQuality');
  Object.defineProperties(Np, {
    BEST: { value: 'best' },
    HIGH: { value: 'high' },
    HIGH_16X16: { value: '16x16' },
    HIGH_16X16_LINEAR: { value: '16x16linear' },
    HIGH_8X8: { value: '8x8' },
    HIGH_8X8_LINEAR: { value: '8x8linear' },
    LOW: { value: 'low' },
    MEDIUM: { value: 'medium' },
  });
  var Op = P(function() {}, 'flash.display.StageScaleMode');
  O(Op, 'EXACT_FIT', 'exactFit');
  O(Op, 'NO_BORDER', 'noBorder');
  O(Op, 'NO_SCALE', 'noScale');
  O(Op, 'SHOW_ALL', 'showAll');
  var Pp = function(a, b, c) {
      a = String(a);
      Object.defineProperty(this, '__swiffy_v', {
        value: {
          type: a,
          bubbles: !!b,
          cancelable: !!c,
          eventPhase: 2,
          target: null,
          currentTarget: null,
          dk: !1,
          Jr: !1,
          defaultPrevented: !1,
          jk: !1,
        },
      });
    },
    Qp = function(a) {
      return a.__swiffy_v;
    },
    Rp = P(Pp, 'flash.events.Event');
  M(Rp, 'bubbles', function() {
    return Qp(this).bubbles;
  });
  M(Rp, 'cancelable', function() {
    return Qp(this).cancelable;
  });
  M(Rp, 'currentTarget', function() {
    return Qp(this).currentTarget;
  });
  M(Rp, 'eventPhase', function() {
    return Qp(this).eventPhase;
  });
  M(Rp, 'target', function() {
    return Qp(this).target;
  });
  M(Rp, 'type', function() {
    return Qp(this).type;
  });
  K(Rp, 'isDefaultPrevented', function() {
    return Qp(this).defaultPrevented;
  });
  K(Rp, 'preventDefault', function() {
    var a = Qp(this);
    a.cancelable && (a.defaultPrevented = !0);
  });
  K(Rp, 'stopPropagation', function() {
    Qp(this).dk = !0;
  });
  K(Rp, 'stopImmediatePropagation', function() {
    var a = Qp(this);
    a.Jr = !0;
    a.dk = !0;
  });
  K(Rp, 'formatToString', function() {
    for (var a = '[' + Sm(this).localName, b = 0; b < arguments.length; b++) {
      var c = this[arguments[b]];
      ha(c) ? (c = Math.round(100 * c) / 100) : fa(c) && (c = '"' + c + '"');
      a += ' ' + arguments[b] + '=' + c;
    }
    return a + ']';
  });
  K(Rp, 'clone', function() {
    return Rn.call(Rp, this.type, this.bubbles, this.cancelable);
  });
  K(Rp, 'toString', function() {
    return this.formatToString('type', 'bubbles', 'cancelable', 'eventPhase');
  });
  Object.defineProperties(Rp, {
    ACTIVATE: { value: 'activate' },
    ADDED: { value: 'added' },
    ADDED_TO_STAGE: { value: 'addedToStage' },
    CANCEL: { value: 'cancel' },
    CHANGE: { value: 'change' },
    CHANNEL_MESSAGE: { value: 'channelMessage' },
    CHANNEL_STATE: { value: 'channelState' },
    CLEAR: { value: 'clear' },
    CLOSE: { value: 'close' },
    CLOSING: { value: 'closing' },
    COMPLETE: { value: 'complete' },
    CONNECT: { value: 'connect' },
    CONTEXT3D_CREATE: { value: 'context3DCreate' },
    COPY: { value: 'copy' },
    CUT: { value: 'cut' },
    DEACTIVATE: { value: 'deactivate' },
    DISPLAYING: { value: 'displaying' },
    ENTER_FRAME: { value: 'enterFrame' },
    EXIT_FRAME: { value: 'exitFrame' },
    EXITING: { value: 'exiting' },
    FRAME_CONSTRUCTED: { value: 'frameConstructed' },
    FRAME_LABEL: { value: 'frameLabel' },
    FULLSCREEN: { value: 'fullScreen' },
    HTML_BOUNDS_CHANGE: { value: 'htmlBoundsChange' },
    HTML_DOM_INITIALIZE: { value: 'htmlDOMInitialize' },
    HTML_RENDER: { value: 'htmlRender' },
    ID3: { value: 'id3' },
    INIT: { value: 'init' },
    LOCATION_CHANGE: { value: 'locationChange' },
    MOUSE_LEAVE: { value: 'mouseLeave' },
    NETWORK_CHANGE: { value: 'networkChange' },
    OPEN: { value: 'open' },
    PASTE: { value: 'paste' },
    PREPARING: { value: 'preparing' },
    REMOVED: { value: 'removed' },
    REMOVED_FROM_STAGE: { value: 'removedFromStage' },
    RENDER: { value: 'render' },
    RESIZE: { value: 'resize' },
    SCROLL: { value: 'scroll' },
    SELECT: { value: 'select' },
    SELECT_ALL: { value: 'selectAll' },
    SOUND_COMPLETE: { value: 'soundComplete' },
    STANDARD_ERROR_CLOSE: { value: 'standardErrorClose' },
    STANDARD_INPUT_CLOSE: { value: 'standardInputClose' },
    STANDARD_OUTPUT_CLOSE: { value: 'standardOutputClose' },
    SUSPEND: { value: 'suspend' },
    TAB_CHILDREN_CHANGE: { value: 'tabChildrenChange' },
    TAB_ENABLED_CHANGE: { value: 'tabEnabledChange' },
    TAB_INDEX_CHANGE: { value: 'tabIndexChange' },
    TEXT_INTERACTION_MODE_CHANGE: { value: 'textInteractionModeChange' },
    TEXTURE_READY: { value: 'textureReady' },
    UNLOAD: { value: 'unload' },
    USER_IDLE: { value: 'userIdle' },
    USER_PRESENT: { value: 'userPresent' },
    VIDEO_FRAME: { value: 'videoFrame' },
    WORKER_STATE: { value: 'workerState' },
  });
  var Sp = function(a, b, c, d) {
      Pp.call(this, a, b, c);
      this.activating = d;
    },
    Tp = P(Sp, 'flash.events.ActivityEvent', Pp);
  M(Tp, 'activating', function() {
    return this.__swiffy_v.ws;
  });
  N(Tp, 'activating', function(a) {
    this.__swiffy_v.ws = !!a;
  });
  K(Tp, 'clone', function() {
    return Rn.call(
      Rp,
      this.type,
      this.bubbles,
      this.cancelable,
      this.activating
    );
  });
  K(Tp, 'toString', function() {
    return this.formatToString(
      'type',
      'bubbles',
      'cancelable',
      'eventPhase',
      'status',
      'activating'
    );
  });
  Object.defineProperty(Tp, 'ACTIVITY', { value: 'activity' });
  var Up = function(a, b, c, d, e) {
      Pp.call(this, a, b, c);
      this.contextMenuOwner = e;
      this.isMouseTargetInaccessible = !1;
      this.mouseTarget = d;
    },
    Vp = function(a) {
      return a.__swiffy_v;
    },
    Wp = P(Up, 'flash.events.ContextMenuEvent', Pp);
  M(Rp, 'contextMenuOwner', function() {
    return Vp(this).rt;
  });
  N(Rp, 'contextMenuOwner', function(a) {
    Vp(this).rt = Q(a, Xp);
  });
  M(Rp, 'isMouseTargetInaccessible', function() {
    return Vp(this).hv;
  });
  N(Rp, 'isMouseTargetInaccessible', function(a) {
    Vp(this).hv = !!a;
  });
  M(Rp, 'mouseTarget', function() {
    return Vp(this).Qv;
  });
  N(Rp, 'mouseTarget', function(a) {
    Vp(this).Qv = Q(a, Xp);
  });
  K(Wp, 'clone', function() {
    return Rn.call(
      Up,
      this.type,
      this.bubbles,
      this.cancelable,
      this.mouseTarget,
      this.contextMenuOwner
    );
  });
  Object.defineProperty(Wp, 'MENU_ITEM_SELECT', { value: 'menuItemSelect' });
  Object.defineProperty(Wp, 'MENU_SELECT', { value: 'menuSelect' });
  var Yp = function(a) {
      return a.__swiffy_v;
    },
    Zp = P(
      function(a, b, c, d, e, f, h) {
        Pp.call(this, a, b, c);
        this.relatedObject = l(d) ? d : null;
        this.shiftKey = l(e) ? e : !1;
        this.keyCode = l(f) ? f : 0;
        this.direction = l(h) ? h : 'none';
        this.isRelatedObjectInaccessible = !1;
      },
      'flash.events.FocusEvent',
      Pp
    );
  M(Zp, 'direction', function() {
    return Yp(this).direction;
  });
  M(Zp, 'isRelatedObjectInaccessible', function() {
    return Yp(this).nv;
  });
  M(Zp, 'keyCode', function() {
    return Yp(this).keyCode;
  });
  M(Zp, 'relatedObject', function() {
    return Yp(this).$e;
  });
  M(Zp, 'shiftKey', function() {
    return Yp(this).shiftKey;
  });
  N(Zp, 'direction', function(a) {
    Yp(this).direction = String(a);
  });
  N(Zp, 'isRelatedObjectInaccessible', function(a) {
    Yp(this).nv = !!a;
  });
  N(Zp, 'keyCode', function(a) {
    Yp(this).keyCode = a >>> 0;
  });
  N(Zp, 'relatedObject', function(a) {
    Yp(this).$e = Q(a, Xp);
  });
  N(Zp, 'shiftKey', function(a) {
    Yp(this).shiftKey = !!a;
  });
  Object.defineProperties(Zp, {
    FOCUS_IN: { value: 'focusIn' },
    FOCUS_OUT: { value: 'focusOut' },
    KEY_FOCUS_CHANGE: { value: 'keyFocusChange' },
    MOUSE_FOCUS_CHANGE: { value: 'mouseFocusChange' },
  });
  var $p = P(
    function(a, b, c, d, e) {
      Sp.call(this, a, b, c);
      a = this.__swiffy_v;
      a.fullScreen = !!d;
      a.bv = !!e;
    },
    'flash.events.FullScreenEvent',
    Sp
  );
  M($p, 'fullScreen', function() {
    return this.__swiffy_v.fullScreen;
  });
  M($p, 'interactive', function() {
    return this.__swiffy_v.bv;
  });
  K($p, 'clone', function() {
    return Rn.call(
      $p,
      this.type,
      this.bubbles,
      this.cancelable,
      this.activating,
      this.fullScreen,
      this.interactive
    );
  });
  K($p, 'toString', function() {
    return this.formatToString(
      'type',
      'bubbles',
      'cancelable',
      'eventPhase',
      'activating',
      'fullScreen',
      'interactive'
    );
  });
  Object.defineProperty($p, 'FULL_SCREEN', { value: 'fullScreen' });
  Object.defineProperty($p, 'FULL_SCREEN_INTERACTIVE_ACCEPTED', {
    value: 'fullScreenInteractiveAccepted',
  });
  var aq = function(a, b, c, d) {
      Pp.call(this, a, b, c);
      this.__swiffy_v.status = +A(d, 0);
      this.responseURL = null;
    },
    bq = P(aq, 'flash.events.HTTPStatusEvent', Pp);
  M(bq, 'status', function() {
    return this.__swiffy_v.status;
  });
  K(bq, 'clone', function() {
    return Rn.call(bq, this.type, this.bubbles, this.cancelable, this.status);
  });
  K(bq, 'toString', function() {
    return this.formatToString(
      'type',
      'bubbles',
      'cancelable',
      'eventPhase',
      'status',
      'responseURL'
    );
  });
  Object.defineProperties(bq, {
    HTTP_RESPONSE_STATUS: { value: 'httpResponseStatus' },
    HTTP_STATUS: { value: 'httpStatus' },
  });
  var cq = P(Un(1001), 'flash.events.IEventDispatcher');
  cq.p = cq;
  cq.prototype.addEventListener = function() {};
  cq.prototype.dispatchEvent = function() {};
  cq.prototype.hasEventListener = function() {};
  cq.prototype.removeEventListener = function() {};
  cq.prototype.willTrigger = function() {};
  An(cq.p);
  var dq = function(a, b, c) {
      this.wc = a;
      this.jn = b;
      this.qw = c;
    },
    X = function(a) {
      a = Q(a, cq.p);
      Object.defineProperty(this, '__swiffy_v', {
        value: { target: a || this },
      });
    };
  P(X, 'flash.events.EventDispatcher', void 0, [cq]);
  var eq = {},
    fq = function(a, b) {
      for (var c = 1; c < arguments.length; ++c) eq[arguments[c]] = a;
    };
  fq(X, 'activate', 'deactivate');
  var gq = function(a, b) {
      var c = eq[a];
      return !!c && b instanceof c;
    },
    hq = function(a, b) {
      var c = b.__swiffy_d;
      (c instanceof fj && c.Od()) ||
        ((c = new Pp(a, !1, !1)), (Qp(c).jk = !0), b.dispatchEvent(c));
    };
  X.prototype.addEventListener = function(a, b, c, d) {
    this.__swiffy_listeners ||
      Object.defineProperty(this, '__swiffy_listeners', { value: {} });
    var e = this.__swiffy_listeners,
      f = e[a];
    f || (e[a] = f = []);
    d |= 0;
    c = !!c;
    for (e = 0; e < f.length; ++e) if (f[e].wc == b && f[e].jn == c) return;
    0 == f.length && gq(a, this) && Je.xw(a, this);
    for (e = f.length; 0 < e && d > f[e - 1].qw; --e);
    f.splice(e, 0, new dq(b, c, d));
  };
  X.prototype.dispatchEvent = function(a) {
    var b = Qp(a),
      c = this.__swiffy_v;
    b.target = (c && c.target) || this;
    if (!b.jk) {
      for (var d = [], c = this; (c = c.parent); ) d.push(c);
      b.eventPhase = 1;
      for (c = d.length - 1; 0 <= c && !b.dk; c--)
        (b.currentTarget = d[c]), iq(d[c], a, !0);
    }
    b.eventPhase = 2;
    b.currentTarget = this;
    iq(this, a);
    if (!b.jk && b.bubbles)
      for (b.eventPhase = 3, c = 0; c < d.length && !b.dk; c++)
        (b.currentTarget = d[c]), iq(d[c], a);
    return !b.defaultPrevented;
  };
  var iq = function(a, b, c) {
    var d = a.__swiffy_listeners;
    a = Qp(b);
    if (d && d[a.type])
      for (var d = d[a.type], e = 0; e < d.length && !a.Jr; e++)
        d[e].jn == !!c && d[e].wc.call(null, b);
  };
  X.prototype.removeEventListener = function(a, b, c) {
    var d = this.__swiffy_listeners;
    if (d && d[a] && d[a].length) {
      d = d[a];
      c = !!c;
      for (var e = 0; e < d.length; e++)
        d[e].wc == b && d[e].jn == c && d.splice(e--, 1);
      0 == d.length && gq(a, this) && Je.bs(a, this);
    }
  };
  X.prototype.hasEventListener = function(a) {
    var b = this.__swiffy_listeners;
    return !!b && !!b[a] && b[a].length;
  };
  X.prototype.willTrigger = function(a) {
    var b = this;
    do if (b.hasEventListener(a)) return !0;
    while ((b = b.parent));
    return !1;
  };
  var jq = function(a, b) {
      X.call(this);
      var c = this.__swiffy_v;
      c.name = b;
      c.frame = a;
    },
    kq = P(jq, 'flash.display.FrameLabel', X);
  M(kq, 'frame', function() {
    return this.__swiffy_v.frame;
  });
  M(kq, 'name', function() {
    return this.__swiffy_v.name;
  });
  var lq = function(a) {
      X.call(this, a);
      Object.defineProperty(this, '__swiffy_d', { value: new Pe(this) });
      O(this, 'bytes', null);
      O(this, 'childAllowsParent', !0);
      R(this, 'childSandboxBridge', 'Object', null);
      R(this, 'isURLInaccessible', 'Boolean', !1);
      O(this, 'parentAllowsChild', !0);
      R(this, 'parentSandboxBridge', 'Object', null);
      O(this, 'sameDomain', !1);
      O(this, 'sharedEvents', new X());
      O(this, 'uncaughtErrorEvents', null);
    },
    mq = Tn(lq, 'flash.display.LoaderInfo', { Tg: X, Tf: Un(2012) }),
    nq = function(a) {
      a = a.__swiffy_d;
      a = a.content && a.content.__swiffy_d;
      if (!a) throw J(2099);
      return a;
    },
    oq = function(a) {
      var b = a.__swiffy_d;
      a = nq(a);
      if ('application/x-shockwave-flash' != b.contentType) throw J(2098);
      return a;
    };
  M(mq, 'actionScriptVersion', function() {
    return oq(this).definition.as3 ? 3 : 2;
  });
  Object.defineProperty(lq.prototype, 'applicationDomain', {
    get: function() {
      var a = this.__swiffy_d;
      return a.Fc ? pq(a.Fc) : null;
    },
  });
  Object.defineProperty(lq.prototype, 'bytesLoaded', {
    get: function() {
      return this.__swiffy_d.Zc;
    },
  });
  Object.defineProperty(lq.prototype, 'bytesTotal', {
    get: function() {
      return this.__swiffy_d.$c;
    },
  });
  Object.defineProperty(lq.prototype, 'content', {
    get: function() {
      return this.__swiffy_d.content;
    },
  });
  Object.defineProperty(lq.prototype, 'contentType', {
    get: function() {
      return this.__swiffy_d.contentType;
    },
  });
  M(mq, 'frameRate', function() {
    return oq(this).definition.frameRate;
  });
  M(mq, 'height', function() {
    return nq(this).$();
  });
  Object.defineProperty(lq.prototype, 'loader', {
    get: function() {
      return this.__swiffy_d.Tp;
    },
  });
  Object.defineProperty(lq.prototype, 'loaderURL', {
    get: function() {
      return this.__swiffy_d.xu();
    },
  });
  Object.defineProperty(lq.prototype, 'parameters', {
    get: function() {
      return this.__swiffy_d.rm;
    },
  });
  M(mq, 'swfVersion', function() {
    return oq(this).definition.Rc;
  });
  Object.defineProperty(lq.prototype, 'url', {
    get: function() {
      return this.__swiffy_d.Tc;
    },
  });
  M(mq, 'width', function() {
    return nq(this).K();
  });
  mq.getLoaderInfoByDefinition = function() {
    S(lq, 'getLoaderInfoByDefinition');
    return null;
  };
  var qq = function() {
    X.call(this);
  };
  P(qq, 'flash.display.NativeMenu', X);
  qq.prototype.clone = function() {
    return new qq();
  };
  var rq = function() {
    X.call(this);
  };
  P(rq, 'flash.display.NativeMenuItem', X);
  rq.prototype.clone = function() {
    return new rq();
  };
  var sq = function(a) {
      return a.__swiffy_v;
    },
    tq = P(
      function(a, b, c, d, e, f, h, k, m, n, t) {
        Pp.call(this, a, b, c);
        this.charCodeValue = l(d) ? d : 0;
        this.keyCodeValue = l(e) ? e : 0;
        this.keyLocationValue = l(f) ? f : 0;
        this.ctrlKeyValue = l(h) ? h : !1;
        this.altKeyValue = l(k) ? k : !1;
        this.shiftKeyValue = l(m) ? m : !1;
        this.controlKeyValue = l(n) ? n : !1;
        this.commandKeyValue = l(t) ? t : !1;
      },
      'flash.events.KeyboardEvent',
      Pp
    );
  M(tq, 'charCodeValue', function() {
    return sq(this).Zs;
  });
  M(tq, 'keyCodeValue', function() {
    return sq(this).uv;
  });
  M(tq, 'keyLocationValue', function() {
    return sq(this).vv;
  });
  M(tq, 'ctrlKeyValue', function() {
    return sq(this).Gt;
  });
  M(tq, 'altKeyValue', function() {
    return sq(this).Bs;
  });
  M(tq, 'shiftKeyValue', function() {
    return sq(this).ix;
  });
  M(tq, 'controlKeyValue', function() {
    return sq(this).st;
  });
  M(tq, 'commandKeyValue', function() {
    return sq(this).dt;
  });
  N(tq, 'charCodeValue', function(a) {
    sq(this).Zs = a >>> 0;
  });
  N(tq, 'keyCodeValue', function(a) {
    sq(this).uv = a >>> 0;
  });
  N(tq, 'keyLocationValue', function(a) {
    sq(this).vv = a >>> 0;
  });
  N(tq, 'ctrlKeyValue', function(a) {
    sq(this).Gt = !!a;
  });
  N(tq, 'altKeyValue', function(a) {
    sq(this).Bs = !!a;
  });
  N(tq, 'shiftKeyValue', function(a) {
    sq(this).ix = !!a;
  });
  N(tq, 'controlKeyValue', function(a) {
    sq(this).st = !!a;
  });
  N(tq, 'commandKeyValue', function(a) {
    sq(this).dt = !!a;
  });
  K(tq, 'updateAfterEvent', function() {
    Je.c.Cm();
  });
  Object.defineProperties(tq, {
    KEY_DOWN: { value: 'keyDown' },
    KEY_UP: { value: 'keyUp' },
  });
  var vq = function(a, b, c, d, e, f, h, k, m, n, t) {
      Pp.call(this, a, b, c);
      this.localX = d;
      this.localY = e;
      this.relatedObject = f;
      this.ctrlKey = h;
      this.altKey = k;
      this.shiftKey = m;
      this.buttonDown = n;
      this.delta = t;
      a = uq(this);
      a.Nr = NaN;
      a.Or = NaN;
    },
    uq = function(a) {
      return a.__swiffy_v;
    },
    wq = P(vq, 'flash.events.MouseEvent', Pp);
  M(wq, 'localX', function() {
    return uq(this).Yp;
  });
  N(wq, 'localX', function(a) {
    uq(this).Yp = +a;
  });
  M(wq, 'localY', function() {
    return uq(this).Zp;
  });
  N(wq, 'localY', function(a) {
    uq(this).Zp = +a;
  });
  M(wq, 'stageX', function() {
    return uq(this).Nr;
  });
  M(wq, 'stageY', function() {
    return uq(this).Or;
  });
  M(wq, 'relatedObject', function() {
    return uq(this).$e;
  });
  N(wq, 'relatedObject', function(a) {
    uq(this).$e = Q(a, Xp);
  });
  M(wq, 'ctrlKey', function() {
    return uq(this).ctrlKey;
  });
  N(wq, 'ctrlKey', function(a) {
    uq(this).ctrlKey = !!a;
  });
  M(wq, 'altKey', function() {
    return uq(this).altKey;
  });
  N(wq, 'altKey', function(a) {
    uq(this).altKey = !!a;
  });
  M(wq, 'shiftKey', function() {
    return uq(this).shiftKey;
  });
  N(wq, 'shiftKey', function(a) {
    uq(this).shiftKey = !!a;
  });
  M(wq, 'buttonDown', function() {
    return uq(this).Ln;
  });
  N(wq, 'buttonDown', function(a) {
    uq(this).Ln = !!a;
  });
  M(wq, 'delta', function() {
    return uq(this).Kt;
  });
  N(wq, 'delta', function(a) {
    uq(this).Kt = a | 0;
  });
  K(wq, 'toString', function() {
    return this.formatToString(
      'type',
      'bubbles',
      'cancelable',
      'eventPhase',
      'localX',
      'localY',
      'stageX',
      'stageY',
      'relatedObject',
      'ctrlKey',
      'altKey',
      'shiftKey',
      'buttonDown',
      'delta'
    );
  });
  K(wq, 'updateAfterEvent', function() {
    Je.c.Cm();
  });
  Object.defineProperties(wq, {
    CLICK: { value: 'click' },
    CONTEXT_MENU: { value: 'contextMenu' },
    DOUBLE_CLICK: { value: 'doubleClick' },
    MIDDLE_CLICK: { value: 'middleClick' },
    MIDDLE_MOUSE_DOWN: { value: 'middleMouseDown' },
    MIDDLE_MOUSE_UP: { value: 'middleMouseUp' },
    MOUSE_DOWN: { value: 'mouseDown' },
    MOUSE_MOVE: { value: 'mouseMove' },
    MOUSE_OUT: { value: 'mouseOut' },
    MOUSE_OVER: { value: 'mouseOver' },
    MOUSE_UP: { value: 'mouseUp' },
    MOUSE_WHEEL: { value: 'mouseWheel' },
    RIGHT_CLICK: { value: 'rightClick' },
    RIGHT_MOUSE_DOWN: { value: 'rightMouseDown' },
    RIGHT_MOUSE_UP: { value: 'rightMouseUp' },
    ROLL_OUT: { value: 'rollOut' },
    ROLL_OVER: { value: 'rollOver' },
  });
  var xq = function(a, b, c, d) {
      Pp.call(this, a, b, c);
      this.info = d;
    },
    yq = P(xq, 'flash.events.NetStatusEvent', Pp);
  M(yq, 'info', function() {
    return this.__swiffy_v.info;
  });
  N(yq, 'info', function(a) {
    this.__swiffy_v.info = Yn(a);
  });
  Object.defineProperty(yq, 'NET_STATUS', { value: 'netStatus' });
  var zq = function(a, b, c, d, e) {
      Pp.call(this, a, b, c);
      this.bytesLoaded = d;
      this.bytesTotal = e;
    },
    Aq = P(zq, 'flash.events.ProgressEvent', Pp);
  M(Aq, 'bytesLoaded', function() {
    return this.__swiffy_v.Zc;
  });
  N(Aq, 'bytesLoaded', function(a) {
    this.__swiffy_v.Zc = +A(a, 0);
  });
  M(Aq, 'bytesTotal', function() {
    return this.__swiffy_v.$c;
  });
  N(Aq, 'bytesTotal', function(a) {
    this.__swiffy_v.$c = +A(a, 0);
  });
  K(Aq, 'clone', function() {
    return Rn.call(
      Aq,
      this.type,
      this.bubbles,
      this.cancelable,
      this.bytesLoaded,
      this.bytesTotal
    );
  });
  K(Aq, 'toString', function() {
    return this.formatToString(
      'type',
      'bubbles',
      'cancelable',
      'bytesLoaded',
      'bytesTotal'
    );
  });
  Object.defineProperties(Aq, {
    PROGRESS: { value: 'progress' },
    SOCKET_DATA: { value: 'socketData' },
    STANDARD_ERROR_DATA: { value: 'standardErrorData' },
    STANDARD_INPUT_PROGRESS: { value: 'standardInputProgress' },
    STANDARD_OUTPUT_DATA: { value: 'standardOutputData' },
  });
  var Bq = P(
    function(a, b, c, d, e) {
      Pp.call(this, a, b, c);
      this.code = d;
      this.level = e;
    },
    'flash.events.StatusEvent',
    Pp
  );
  M(Bq, 'code', function() {
    return this.__swiffy_v.code;
  });
  N(Bq, 'code', function(a) {
    this.__swiffy_v.code = String(a);
  });
  M(Bq, 'level', function() {
    return this.__swiffy_v.Av;
  });
  N(Bq, 'level', function(a) {
    this.__swiffy_v.Av = String(a);
  });
  K(Bq, 'clone', function() {
    return Rn.call(
      Bq,
      this.type,
      this.bubbles,
      this.cancelable,
      this.code,
      this.level
    );
  });
  Object.defineProperty(Bq, 'STATUS', { value: 'status' });
  var Dq = function(a, b, c, d) {
      Pp.call(this, a, b, c);
      Cq.call(this, A(d, ''));
    },
    Cq = function(a) {
      this.__swiffy_v.text = ho(a);
    },
    Eq = P(Dq, 'flash.events.TextEvent', Pp);
  M(Eq, 'text', function() {
    return this.__swiffy_v.text;
  });
  N(Eq, 'text', Cq);
  K(Eq, 'clone', function() {
    return Rn.call(Eq, this.type, this.bubbles, this.cancelable, this.text);
  });
  K(Eq, 'toString', function() {
    return this.formatToString('type', 'bubbles', 'cancelable', 'text');
  });
  Object.defineProperty(Eq, 'LINK', { value: 'link' });
  Object.defineProperty(Eq, 'TEXT_INPUT', { value: 'textInput' });
  var Fq = function(a, b, c, d) {
      Dq.call(this, a, b, c, d);
    },
    Gq = P(Fq, 'flash.events.ErrorEvent', Dq);
  K(Gq, 'clone', function() {
    return Rn.call(Gq, this.type, this.bubbles, this.cancelable, this.text);
  });
  Object.defineProperty(Gq, 'ERROR', { value: 'error' });
  var Hq = P(
    function(a, b, c, d, e) {
      Dq.call(this, a, b, c, d);
      this.error = e;
    },
    'flash.events.AsyncErrorEvent',
    Fq
  );
  M(Hq, 'error', function() {
    return this.__swiffy_v.error;
  });
  N(Hq, 'error', function(a) {
    this.__swiffy_v.error = Q(a, lo);
  });
  K(Hq, 'clone', function() {
    return Rn.call(
      Hq,
      this.type,
      this.bubbles,
      this.cancelable,
      this.text,
      this.error
    );
  });
  Object.defineProperty(Hq, 'ASYNC_ERROR', { value: 'asyncError' });
  var Iq = function(a, b, c, d) {
      Dq.call(this, a, b, c, d);
    },
    Kq = function(a, b) {
      var c = J.apply(null, arguments);
      return Rn.call(Iq, Jq.IO_ERROR, !1, !1, c.value.message);
    },
    Jq = P(Iq, 'flash.events.IOErrorEvent', Fq);
  K(Jq, 'clone', function() {
    return Rn.call(Jq, this.type, this.bubbles, this.cancelable, this.text);
  });
  Object.defineProperties(Jq, {
    IO_ERROR: { value: 'ioError' },
    STANDARD_ERROR_IO_ERROR: { value: 'standardErrorIoError' },
    STANDARD_INPUT_IO_ERROR: { value: 'standardInputIoError' },
    STANDARD_OUTPUT_IO_ERROR: { value: 'standardOutputIoError' },
  });
  var Lq = P(
    function(a, b, c, d) {
      Dq.call(this, a, b, c, d);
    },
    'flash.events.SecurityErrorEvent',
    Fq
  );
  K(Lq, 'clone', function() {
    return Rn.call(Lq, this.type, this.bubbles, this.cancelable, this.text);
  });
  Object.defineProperty(Lq, 'SECURITY_ERROR', { value: 'securityError' });
  var Mq = function(a, b, c) {
      Pp.call(this, a, b, c);
    },
    Nq = P(Mq, 'flash.events.TimerEvent', Pp);
  K(Nq, 'clone', function() {
    return Rn.call(
      Nq,
      this.type,
      this.bubbles,
      this.cancelable,
      this.activating
    );
  });
  K(Nq, 'updateAfterEvent', function() {
    Je.c.Cm();
  });
  Object.defineProperties(Nq, {
    TIMER: { value: 'timer' },
    TIMER_COMPLETE: { value: 'timerComplete' },
  });
  var Oq = Un(2012);
  Oq.p = P(Oq, 'flash.external.ExternalInterface');
  Object.defineProperty(Oq.p, 'available', { get: Ie });
  R(Oq.p, 'marshallExceptions', 'Boolean', !1);
  Object.defineProperty(Oq.p, 'objectID', {
    get: function() {
      return Je.c.getName();
    },
  });
  Oq.p.addCallback = function(a, b) {
    Le(String(a), null, Q(b, Function), Oq.Vs);
  };
  Oq.Vs = function() {
    if (Oq.p.marshallExceptions) throw Error('Error in ActionScript');
    return null;
  };
  Oq.p.call = function(a, b) {
    return Me(Je.c, String(a), Array.prototype.slice.call(arguments, 1), Oq.Rs);
  };
  Oq.Rs = function(a) {
    if (Oq.p.marshallExceptions) throw new Ih(new U(String(a)));
    return null;
  };
  var Pq = function() {
    Object.defineProperty(this, '__swiffy_v', {
      get: function() {
        return this.kd();
      },
    });
  };
  Pq.prototype.kd = function() {
    return new De();
  };
  var Qq = P(Pq, 'flash.filters.BitmapFilter');
  Pq.prototype.clone = function() {
    return new Pq();
  };
  Pq.prototype.toString = function() {
    return '[object BitmapFilter]';
  };
  var Rq = P(function() {}, 'flash.filters.BitmapFilterQuality');
  Object.defineProperties(Rq, {
    HIGH: { value: 3 },
    LOW: { value: 1 },
    MEDIUM: { value: 2 },
  });
  var Sq = P(function() {}, 'flash.filters.BitmapFilterType');
  Object.defineProperties(Sq, {
    FULL: { value: 'full' },
    INNER: { value: 'inner' },
    OUTER: { value: 'outer' },
  });
  var Tq = function(a) {
      return Math.max(0, Math.min(a | 0, 255));
    },
    Uq = function(a, b, c) {
      for (; a.length < b; ) a.push(c);
      a.length = b;
    };
  var Vq = function() {
      if (!this.__swiffy_d) throw J(2012, Sm(this).localName + '$');
      X.call(this);
    },
    Wq = P(Vq, 'flash.display.DisplayObject', X, [Dp]);
  fq(Vq, 'enterFrame', 'exitFrame', 'render');
  K(Wq, 'localToGlobal', function(a) {
    a = Q(a, Xq);
    a = new Ic(20 * a.x, 20 * a.y);
    a.Yb(this.__swiffy_d.ka());
    return new Yq(a.x / 20, a.y / 20);
  });
  K(Wq, 'globalToLocal', function(a) {
    a = Q(a, Xq);
    a = new Ic(20 * a.x, 20 * a.y);
    a.gc(this.__swiffy_d.ka());
    return new Yq(a.x / 20, a.y / 20);
  });
  K(Wq, 'getBounds', function() {
    S(this, 'getBounds');
    return Zq(hj(this.__swiffy_d).clone());
  });
  K(Wq, 'getRect', function() {
    S(this, 'getRect');
    return Zq(hj(this.__swiffy_d).clone());
  });
  Object.defineProperty(Vq.prototype, 'x', {
    get: function() {
      return this.__swiffy_d.wa().q / 20;
    },
    set: function(a) {
      var b = this.__swiffy_d,
        c = b.wa();
      b.setTransform(c.nd(((20 * a) | 0) - c.q, 0));
      b.Fa();
    },
  });
  Object.defineProperty(Vq.prototype, 'y', {
    get: function() {
      return this.__swiffy_d.wa().s / 20;
    },
    set: function(a) {
      var b = this.__swiffy_d,
        c = b.wa();
      b.setTransform(c.nd(0, ((20 * a) | 0) - c.s));
      b.Fa();
    },
  });
  Object.defineProperty(Vq.prototype, 'alpha', {
    get: function() {
      return ((256 * this.__swiffy_d.nb.S) | 0) / 256;
    },
    set: function(a) {
      var b = this.__swiffy_d,
        c = b.nb;
      b.Gb(new Zc(c.Z, c.W, c.Y, c.U, c.X, c.T, a, c.Q));
      b.Fa();
    },
  });
  Object.defineProperty(Vq.prototype, 'visible', {
    get: function() {
      return this.__swiffy_d.jf;
    },
    set: function(a) {
      this.__swiffy_d.ck(Boolean(a));
    },
  });
  Object.defineProperty(Vq.prototype, 'rotation', {
    get: function() {
      return (-180 * this.__swiffy_d.ec().angle) / Math.PI;
    },
    set: function(a) {
      var b = this.__swiffy_d;
      b.ec().angle = (-a * Math.PI) / 180;
      b.wf();
      b.Fa();
    },
  });
  Object.defineProperty(Vq.prototype, 'width', {
    get: function() {
      return this.__swiffy_d.K();
    },
    set: function(a) {
      var b = this.__swiffy_d;
      b.Om(Number(a));
      b.Fa();
    },
  });
  Object.defineProperty(Vq.prototype, 'height', {
    get: function() {
      return this.__swiffy_d.$();
    },
    set: function(a) {
      var b = this.__swiffy_d;
      b.Lm(Number(a));
      b.Fa();
    },
  });
  Object.defineProperty(Vq.prototype, 'scaleX', {
    get: function() {
      return this.__swiffy_d.ec().rd;
    },
    set: function(a) {
      var b = this.__swiffy_d;
      b.ec().rd = a;
      b.wf();
      b.Fa();
    },
  });
  Object.defineProperty(Vq.prototype, 'scaleY', {
    get: function() {
      return this.__swiffy_d.ec().kf;
    },
    set: function(a) {
      var b = this.__swiffy_d;
      b.ec().kf = a;
      b.wf();
      b.Fa();
    },
  });
  Object.defineProperty(Vq.prototype, 'mouseX', {
    get: function() {
      var a = this.__swiffy_d,
        b = a.c.Eb.clone();
      b.gc(a.ka());
      return b.x / 20;
    },
  });
  Object.defineProperty(Vq.prototype, 'mouseY', {
    get: function() {
      var a = this.__swiffy_d,
        b = a.c.Eb.clone();
      b.gc(a.ka());
      return b.y / 20;
    },
  });
  Object.defineProperty(Vq.prototype, 'root', {
    get: function() {
      for (var a = this.__swiffy_d; a && !a.Jj && a != a.c.H; )
        if (a.getParent())
          if (a == a.c.Ja) break;
          else a = a.getParent();
        else a = null;
      return a ? a.t : null;
    },
  });
  Object.defineProperty(Vq.prototype, 'parent', {
    get: function() {
      var a = this.__swiffy_d.getParent();
      return a ? a.t : null;
    },
  });
  Object.defineProperty(Vq.prototype, 'name', {
    get: function() {
      return this.__swiffy_d.getName();
    },
    set: function(a) {
      this.__swiffy_d.Hb(a);
    },
  });
  Object.defineProperty(Vq.prototype, 'loaderInfo', {
    get: function() {
      return this.__swiffy_d.El().cf;
    },
  });
  Object.defineProperty(Vq.prototype, 'stage', {
    get: function() {
      var a = this.__swiffy_d;
      return this.root ? a.c.H.t : null;
    },
  });
  Object.defineProperty(Vq.prototype, 'transform', {
    get: function() {
      return new $q(this);
    },
    set: function(a) {
      a = Q(a, ar);
      a = a.__swiffy_d;
      var b = this.__swiffy_d;
      b.setTransform(a.wa());
      b.Gb(a.nb);
      b.Fa();
    },
  });
  Object.defineProperty(Vq.prototype, 'filters', {
    get: function() {
      for (var a = [], b = this.__swiffy_d.zb, c = 0; c < b.length; c++)
        a.push(b[c].Ce());
      return a;
    },
    set: function(a) {
      for (var b = this.__swiffy_d, c = [], d = 0; d < a.length; d++) {
        var e = a[d].__swiffy_v;
        c.push(e ? e : new De());
      }
      b.yg(c);
    },
  });
  Object.defineProperty(Vq.prototype, 'mask', {
    get: function() {
      var a = this.__swiffy_d.jd;
      return a ? a.t : null;
    },
    set: function(a) {
      a = Q(a, Wq);
      this.__swiffy_d.df(a.__swiffy_d);
    },
  });
  Object.defineProperty(Vq.prototype, 'blendMode', {
    get: function() {
      return Qc[this.__swiffy_d.Bb()];
    },
    set: function(a) {
      a = String(a);
      var b = this.__swiffy_d;
      a = Pc[a];
      if (!l(a)) throw J(2008, 'blendMode');
      b.xg(a);
    },
  });
  var br = function(a, b, c) {
      Vq.call(this);
      a && (this.bitmapData = a);
      this.pixelSnapping = b;
      this.smoothing = c;
    },
    Ck = P(br, 'flash.display.Bitmap', Vq);
  Object.defineProperty(br.prototype, 'bitmapData', {
    get: function() {
      var a = this.__swiffy_d.Jb;
      return a ? a.t : null;
    },
    set: function(a) {
      a = Q(a, Ap);
      this.__swiffy_d.Mw(a ? a.__swiffy_d : null);
    },
  });
  Object.defineProperty(br.prototype, 'pixelSnapping', {
    get: function() {
      return this.__swiffy_d.vq;
    },
    set: function(a) {
      this.__swiffy_d.vq = String(a);
    },
  });
  Object.defineProperty(br.prototype, 'smoothing', {
    get: function() {
      return this.__swiffy_d.smoothing;
    },
    set: function(a) {
      this.__swiffy_d.smoothing = !!a;
    },
  });
  Ak(br, function(a, b) {
    return new pj(null, a, b);
  });
  var cr = function() {
      Vq.call(this);
      var a = this.__swiffy_d;
      a.nc |= 127;
      a.Vi();
      R(this, 'focusRect', 'Boolean', null);
    },
    Xp = P(cr, 'flash.display.InteractiveObject', Vq);
  Object.defineProperty(cr.prototype, 'tabIndex', {
    get: function() {
      return this.__swiffy_d.tabIndex;
    },
    set: function(a) {
      this.__swiffy_d.tabIndex = a | 0;
    },
  });
  Object.defineProperty(cr.prototype, 'tabEnabled', {
    get: function() {
      return this.__swiffy_d.Xl();
    },
    set: function(a) {
      this.__swiffy_d.ef = !!a;
    },
  });
  Object.defineProperty(cr.prototype, 'mouseEnabled', {
    get: function() {
      return this.__swiffy_d.Yf;
    },
    set: function(a) {
      return this.__swiffy_d.yr(!!a);
    },
  });
  Object.defineProperty(cr.prototype, 'doubleClickEnabled', {
    get: function() {
      return this.__swiffy_d.jl;
    },
    set: function(a) {
      return this.__swiffy_d.Ow(!!a);
    },
  });
  var dr = function(a, b, c, d) {
      a = new vq(a, b, !1);
      b = uq(a);
      d.$e && (b.$e = d.$e.t);
      c instanceof Vq &&
        ((b.Yp = c.mouseX),
        (b.Zp = c.mouseY),
        (c = c.__swiffy_d),
        (b.Nr = c.c.Eb.x / 20),
        (b.Or = c.c.Eb.y / 20),
        (b.Ln = c.c.Gh));
      return a;
    },
    er = function(a) {
      a = new Pp(a, !1, !1);
      Qp(a).jk = !0;
      return a;
    },
    fr = function(a, b, c) {
      return new Pp(a, b, c);
    },
    gr = {};
  gr[27] = oa(fr, Rp.ADDED, !0, !1);
  gr[21] = oa(er, Rp.ADDED_TO_STAGE);
  gr[28] = oa(fr, Rp.REMOVED, !0, !1);
  gr[26] = oa(er, Rp.REMOVED_FROM_STAGE);
  gr[5] = oa(er, Rp.UNLOAD);
  gr[11] = oa(dr, wq.CLICK, !0);
  gr[25] = oa(dr, wq.DOUBLE_CLICK, !0);
  gr[2] = oa(dr, wq.MOUSE_UP, !0);
  gr[3] = oa(dr, wq.MOUSE_DOWN, !0);
  gr[8] = oa(dr, wq.ROLL_OUT, !1);
  gr[9] = oa(dr, wq.ROLL_OVER, !1);
  gr[24] = oa(dr, wq.MOUSE_MOVE, !1);
  gr[22] = oa(dr, wq.MOUSE_OUT, !1);
  gr[23] = oa(dr, wq.MOUSE_OVER, !1);
  var hr = function() {
    cr.call(this);
  };
  P(hr, 'flash.display.DisplayObjectContainer', cr);
  Object.defineProperty(hr.prototype, 'tabChildren', {
    value: !0,
    writable: !0,
  });
  Object.defineProperty(hr.prototype, 'numChildren', {
    get: function() {
      return this.__swiffy_d.Ed();
    },
  });
  Object.defineProperty(cr.prototype, 'mouseChildren', {
    get: function() {
      return this.__swiffy_d.Mj;
    },
    set: function(a) {
      return this.__swiffy_d.Ww(!!a);
    },
  });
  hr.prototype.addChild = function(a) {
    xo(a, 'child');
    var b = this.__swiffy_d;
    a = a.__swiffy_d;
    if (a === b) throw J(2024);
    if (a.contains(b)) throw J(2150);
    b.Md(a, b.Ed());
  };
  hr.prototype.addChildAt = function(a, b) {
    xo(a, 'child');
    b |= 0;
    var c = this.__swiffy_d,
      d = a.__swiffy_d;
    if (d === c) throw J(2024);
    if (d.contains(c)) throw J(2150);
    if (!c.qv(b, !0)) throw J(2006);
    c.Md(d, b);
  };
  hr.prototype.contains = function(a) {
    xo(a, 'child');
    return this.__swiffy_d.contains(a.__swiffy_d);
  };
  hr.prototype.getChildAt = function(a) {
    if ((a = this.__swiffy_d.De(a | 0))) return a.t;
    throw J(2006);
  };
  hr.prototype.getChildByName = function(a) {
    return (a = this.__swiffy_d.ku(a)) ? a.t : a;
  };
  hr.prototype.getChildIndex = function(a) {
    xo(a, 'child');
    a = this.__swiffy_d.Pf(a.__swiffy_d);
    if (-1 == a) throw J(2025);
    return a;
  };
  hr.prototype.removeChild = function(a) {
    xo(a, 'child');
    var b = this.__swiffy_d;
    a = a.__swiffy_d;
    if (!b.vp(a)) throw J(2025);
    b.Th(a);
  };
  hr.prototype.removeChildAt = function(a) {
    var b = this.__swiffy_d;
    if ((a = b.De(a | 0))) return b.Th(a), a.t;
    throw J(2006);
  };
  hr.prototype.setChildIndex = function(a, b) {
    xo(a, 'child');
    b |= 0;
    var c = this.__swiffy_d,
      d = a.__swiffy_d;
    if (!c.vp(d)) throw J(2025);
    c.Md(d, b);
  };
  hr.prototype.swapChildren = function(a, b) {
    this.swapChildrenAt(this.getChildIndex(a), this.getChildIndex(b));
  };
  hr.prototype.swapChildrenAt = function(a, b) {
    a |= 0;
    b |= 0;
    var c = this.__swiffy_d,
      d = c.De(a),
      e = c.De(b);
    if (!d || !e) throw J(2006);
    c.Md(d, b);
    c.Md(e, a);
  };
  var ir = function() {
      cr.call(this);
      var a = new lq();
      O(this, 'contentLoaderInfo', a);
      a = a.__swiffy_d;
      a.Uw(Je.Qf().Tc);
      a.Tp = this;
      O(this, 'uncaughtErrorEvents', null);
    },
    jr = P(ir, 'flash.display.Loader', hr);
  new Vj(0, 0, null, null).Nm(jr);
  Object.defineProperty(ir.prototype, 'content', {
    get: function() {
      return this.contentLoaderInfo.content;
    },
  });
  ir.prototype.close = function() {
    S(this, 'close');
  };
  ir.prototype.load = function(a, b) {
    a = Q(a, kr);
    b = Q(b, lr);
    S(this, 'load');
    var c = b || new mr(),
      d = c.applicationDomain ? w(c.applicationDomain) : Je.kh.Vk(),
      e = a.url,
      f = this.contentLoaderInfo,
      h = f.__swiffy_d,
      k = Ji(e),
      m;
    for (m in k) {
      var n = k[m];
      Object.defineProperty(h.rm, m, {
        value: n.length ? n[n.length - 1] : void 0,
        configurable: !0,
        enumerable: !0,
      });
    }
    var t = this,
      p = this.__swiffy_d,
      k = new Qj();
    k.Lh = function() {
      t.unload();
      f.dispatchEvent(new Pp(Rp.OPEN));
    };
    k.Xd = function(a, b) {
      h.Zc = a;
      h.$c = b;
      f.dispatchEvent(new zq(Aq.PROGRESS, !1, !1, a, b));
    };
    k.Va = function(a, b) {
      var f = a.Kb(p.c, null);
      f.xr(!0);
      f.Vb = !0;
      f.Hb(p.c.zh());
      f.wr(h);
      f.ia();
      h.Fc = d;
      h.Ag(e);
      h.content = f.t;
      var k = $k(e);
      h.contentType = al[k] || null;
      k = c.requestedContentParent ? c.requestedContentParent.__swiffy_d : p;
      k.Md(f, k.Ed());
      k.c.va();
      p.c.J().dm(h, b);
      p.c.va();
    };
    k.xc = function(a) {
      f.dispatchEvent(new aq(bq.HTTP_STATUS, !1, !1, a));
      200 == a ? f.dispatchEvent(Kq(2124, e)) : f.dispatchEvent(Kq(2035, e));
    };
    el(e, p.c, d, a.method, a.data ? a.data.toString() : null, k, nr(a));
  };
  ir.prototype.loadBytes = function(a, b) {
    Q(a, or);
    Q(b, lr);
    S(this, 'loadBytes');
  };
  ir.prototype.loadFilePromise = function(a, b) {
    Q(b, lr);
    S(this, 'loadFilePromise');
  };
  ir.prototype.unload = function() {
    var a = this.__swiffy_d;
    a.Ed() &&
      (a.Lq(),
      (a = this.contentLoaderInfo),
      a.__swiffy_d.reset(),
      a.dispatchEvent(new Pp(Rp.UNLOAD)));
  };
  ir.prototype.unloadAndStop = function() {
    S(this, 'unloadAndStop');
    this.unload();
  };
  var pr = function() {
    Vq.call(this);
    O(this, 'graphics', zp.create(this.__swiffy_d));
  };
  P(pr, 'flash.display.Shape', Vq);
  Ak(pr, function(a, b) {
    return new Jj(a, b);
  });
  var qr = function() {
      cr.call(this);
      this.__swiffy_d.ef = !0;
    },
    rr = P(qr, 'flash.display.SimpleButton', cr);
  Ak(qr, function(a, b) {
    var c = new $g(0, !1, [], [], []);
    return new Uj(c, a, null, b);
  });
  qr.prototype.enabled = !0;
  qr.prototype.useHandCursor = !0;
  var sr = function(a, b) {
    M(rr, a, function() {
      var a = this.__swiffy_d.Ju(b);
      return a ? a.t : null;
    });
    N(rr, a, function(a) {
      a = Q(a, Wq);
      this.__swiffy_d.dx(b, a ? a.__swiffy_d : null);
    });
  };
  sr('upState', 1);
  sr('overState', 2);
  sr('downState', 4);
  sr('hitTestState', 8);
  var tr = function() {
      cr.call(this);
      var a = this.__swiffy_d;
      a.sr(!1);
      O(this, 'graphics', zp.create(a));
    },
    ur = P(tr, 'flash.display.Sprite', hr);
  Yg(tr, new Vj(0, 0, null, null));
  Object.defineProperty(tr.prototype, 'buttonMode', {
    set: function(a) {
      this.__swiffy_d.sr(Boolean(a));
    },
    get: function() {
      return this.__swiffy_d.Vg;
    },
  });
  Object.defineProperty(tr.prototype, 'soundTransform', {
    set: function(a) {
      Q(a, vr);
      S(this, 'soundTransform');
    },
    get: function() {
      S(this, 'soundTransform');
      return new wr();
    },
  });
  tr.prototype.useHandCursor = !0;
  var xr = function() {
    tr.call(this);
  };
  P(xr, 'flash.display.MovieClip', tr);
  xr.prototype.addFrameScript = function(a, b) {
    for (var c = 0; c < arguments.length; c += 2)
      this.__swiffy_d.Vo[arguments[c]] = arguments[c + 1];
  };
  xr.prototype.stop = function() {
    this.__swiffy_d.stop();
  };
  xr.prototype.play = function() {
    this.__swiffy_d.play();
  };
  xr.prototype.prevScene = function() {
    this.__swiffy_d.ow();
  };
  xr.prototype.nextScene = function() {
    this.__swiffy_d.cw();
  };
  xr.prototype.prevFrame = function() {
    var a = this.__swiffy_d;
    a && a.Pb(a.ja - 1, !1);
  };
  xr.prototype.nextFrame = function() {
    var a = this.__swiffy_d;
    a && a.Pb(a.ja + 1, !1);
  };
  var yr = function(a, b, c, d) {
    a = a.__swiffy_d;
    var e = a.Wf(b, c);
    if (l(e)) a.dl(e, d);
    else if (0 != b) throw J(2109, b, c);
  };
  xr.prototype.gotoAndStop = function(a, b) {
    yr(this, a, b, !1);
  };
  xr.prototype.gotoAndPlay = function(a, b) {
    yr(this, a, b, !0);
  };
  Object.defineProperty(xr.prototype, 'currentFrame', {
    get: function() {
      return this.__swiffy_d.ja + 1;
    },
  });
  Object.defineProperty(xr.prototype, 'framesLoaded', {
    get: function() {
      return this.__swiffy_d.definition.frameCount;
    },
  });
  Object.defineProperty(xr.prototype, 'totalFrames', {
    get: function() {
      return this.__swiffy_d.definition.frameCount;
    },
  });
  Object.defineProperty(xr.prototype, 'isPlaying', {
    get: function() {
      return this.__swiffy_d.Mh;
    },
  });
  Object.defineProperty(xr.prototype, 'cacheAsBitmap', {
    get: function() {
      return this.__swiffy_d.Kp();
    },
    set: function(a) {
      this.__swiffy_d.Im(Boolean(a));
    },
  });
  Object.defineProperty(xr.prototype, 'currentFrameLabel', {
    get: function() {
      var a = this.__swiffy_d,
        b = a.qo();
      return b && b.offset === a.ja ? b.name : null;
    },
  });
  Object.defineProperty(xr.prototype, 'currentLabel', {
    get: function() {
      var a = this.__swiffy_d.qo();
      return a ? a.name : null;
    },
  });
  var zr = function(a, b) {
    var c = a.definition.$b,
      d = c.lc[b],
      c = c.Hm[b],
      e = [];
    if (!d || !c) return e;
    for (var f = 0; f < c.Of.length; f++) {
      var h = c.Of[f];
      e.push(new jq(h.offset - d.offset + 1, h.name));
    }
    return e;
  };
  Object.defineProperty(xr.prototype, 'currentLabels', {
    get: function() {
      var a = this.__swiffy_d;
      return zr(a, a.definition.$b.Ah(a.ja));
    },
  });
  var Ar = function(a, b) {
    var c = a.definition.$b.lc[b],
      d = a.definition.$b.Hm[b];
    return c && d ? new Ip(c.name, d.numFrames, zr(a, b)) : null;
  };
  Object.defineProperty(xr.prototype, 'currentScene', {
    get: function() {
      var a = this.__swiffy_d;
      return Ar(a, a.definition.$b.Ah(a.ja));
    },
  });
  Object.defineProperty(xr.prototype, 'scenes', {
    get: function() {
      for (
        var a = this.__swiffy_d, b = a.definition.$b.lc, c = [], d = 0;
        d < b.length;
        d++
      )
        c.push(Ar(a, d));
      return c;
    },
  });
  var Cr = function() {
      cr.call(this);
      O(this, 'allowsFullScreen', !1);
      O(this, 'allowsFullScreenInteractive', !1);
      R(this, 'autoOrients', 'Boolean', !1);
      R(this, 'color', 'uint', 0);
      R(this, 'colorCorrection', 'String', 'default');
      O(this, 'colorCorrectionSupport', 'unsupported');
      O(this, 'contentsScaleFactor', 1);
      O(this, 'deviceOrientation', 'unknown');
      R(this, 'focus', 'flash.display.InteractiveObject', null);
      R(this, 'fullScreenSourceRect', 'flash.geom.Rectangle', null);
      R(this, 'mouseLock', 'Boolean', !1);
      O(this, 'nativeWindow', null);
      O(this, 'orientation', 'unknown');
      R(this, 'quality', 'String', Np.HIGH);
      R(this, 'showDefaultContextMenu', 'Boolean', !0);
      O(this, 'softKeyboardRect', new Br(0, 0, 0, 0));
      O(this, 'stage3Ds', null);
      R(this, 'stageFocusRect', 'Boolean', !0);
      O(this, 'stageVideos', null);
      O(this, 'supportedOrientations', ['default']);
      O(this, 'wmodeGPU', !1);
    },
    Dr = P(Cr, 'flash.display.Stage', hr);
  O(Dr, 'supportsOrientationChange', !1);
  Cr.prototype.assignFocus = function(a) {
    Q(a, Xp);
    S(this, 'assignFocus');
  };
  Cr.prototype.invalidate = function() {
    this.__swiffy_d.c.cv();
  };
  Cr.prototype.isFocusInaccessible = function() {
    S(this, 'isFocusInaccessible');
    return !1;
  };
  Cr.prototype.setAspectRatio = function() {
    S(this, 'setAspectRatio');
  };
  Cr.prototype.setOrientation = function() {
    S(this, 'setOrientation');
  };
  Object.defineProperty(Cr.prototype, 'displayState', {
    get: function() {
      return 'normal';
    },
    set: function(a) {
      a = String(a);
      t: {
        for (var b in Xj)
          if (a == Xj[b]) {
            a = Xj[b];
            break t;
          }
        a = null;
      }
      if (null === a) throw J(2008, 'displayState');
      if ('normal' != a) throw J(2152);
    },
  });
  Object.defineProperty(Cr.prototype, 'stageWidth', {
    get: function() {
      var a = this.__swiffy_d;
      return 'noScale' == a.yc ? a.fd : a.fk;
    },
    set: function() {},
  });
  Object.defineProperty(Cr.prototype, 'stageHeight', {
    get: function() {
      var a = this.__swiffy_d;
      return 'noScale' == a.yc ? a.ed : a.ek;
    },
    set: function() {},
  });
  Object.defineProperty(Cr.prototype, 'fullScreenWidth', {
    get: function() {
      S(this, 'fullScreenWidth');
      return this.stageWidth;
    },
  });
  Object.defineProperty(Cr.prototype, 'fullScreenHeight', {
    get: function() {
      S(this, 'fullScreenHeight');
      return this.stageHeight;
    },
  });
  Object.defineProperty(Cr.prototype, 'frameRate', {
    get: function() {
      return this.__swiffy_d.c.fj().ul;
    },
    set: function(a) {
      a = +a;
      a = 0 >= a ? 0.01 : Math.min(1e3, a);
      this.__swiffy_d.c.fj().Rw(a);
    },
  });
  Object.defineProperty(Cr.prototype, 'scaleMode', {
    get: function() {
      return this.__swiffy_d.yc;
    },
    set: function(a) {
      a = String(a);
      var b = this.__swiffy_d;
      switch (a) {
        case 'showAll':
        case 'exactFit':
        case 'noBorder':
        case 'noScale':
          break;
        default:
          throw J(2008, 'scaleMode');
      }
      b.Dr(a);
    },
  });
  Object.defineProperty(Cr.prototype, 'align', {
    get: function() {
      var a = this.__swiffy_d.vd,
        b = '';
      a & 2 && (b += 'T');
      a & 8 && (b += 'B');
      a & 1 && (b += 'L');
      a & 4 && (b += 'R');
      return b;
    },
    set: function(a) {
      a = String(a);
      this.__swiffy_d.kr(a);
    },
  });
  var oe = function(a, b, c, d, e, f, h, k, m, n, t, p) {
    Pq.call(this);
    a = +A(a, 4);
    b = +A(b, 45);
    c = A(c, 16777215) >>> 0;
    d = +A(d, 1);
    e >>>= 0;
    f = +A(f, 1);
    h = +A(h, 4);
    k = +A(k, 4);
    m = +A(m, 1);
    n = A(n, 1) | 0;
    t = io(t, 'inner');
    p = !!p;
    R(this, 'angle', 'Number', b);
    R(this, 'blurX', 'Number', h);
    R(this, 'blurY', 'Number', k);
    R(this, 'distance', 'Number', a);
    R(this, 'highlightAlpha', 'Number', d);
    R(this, 'highlightColor', 'uint', c);
    R(this, 'knockout', 'Boolean', p);
    R(this, 'quality', 'int', n);
    R(this, 'shadowAlpha', 'Number', f);
    R(this, 'shadowColor', 'uint', e);
    R(this, 'strength', 'Number', m);
    R(this, 'type', 'String', t);
  };
  P(oe, 'flash.filters.BevelFilter', Pq);
  oe.prototype.kd = function() {
    return new me(
      (this.angle * Math.PI) / 180,
      Yc(this.highlightColor, this.highlightAlpha),
      Yc(this.shadowColor, this.shadowAlpha),
      this.distance,
      this.strength,
      this.quality,
      this.blurX,
      this.blurY,
      ke(this.type, this.knockout)
    );
  };
  oe.prototype.clone = function() {
    return new oe(
      this.distance,
      this.angle,
      this.highlightColor,
      this.highlightAlpha,
      this.shadowColor,
      this.shadowAlpha,
      this.blurX,
      this.blurY,
      this.strength,
      this.quality,
      this.type,
      this.knockout
    );
  };
  var $d = function(a, b, c) {
    Pq.call(this);
    a = +A(a, 4);
    b = +A(b, 4);
    c = A(c, 1) | 0;
    R(this, 'blurX', 'Number', a);
    R(this, 'blurY', 'Number', b);
    R(this, 'quality', 'int', c);
  };
  P($d, 'flash.filters.BlurFilter', Pq);
  $d.prototype.kd = function() {
    return new Yd(this.quality, this.blurX, this.blurY);
  };
  $d.prototype.clone = function() {
    return new $d(this.blurX, this.blurY, this.quality);
  };
  var ce = function(a) {
    Pq.call(this);
    var b;
    Object.defineProperty(this, 'matrix', {
      get: function() {
        return b;
      },
      set: function(a) {
        b = Q(a, Array) || [
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
        ];
        Uq(b, 20, 0);
      },
    });
    this.matrix = l(a) ? a.slice() : null;
  };
  P(ce, 'flash.filters.ColorMatrixFilter', Pq);
  ce.prototype.kd = function() {
    return new ae(this.matrix);
  };
  ce.prototype.clone = function() {
    return new ce(this.matrix);
  };
  var re = function(a, b, c, d, e, f, h, k, m) {
    Pq.call(this);
    a = +A(a, 0);
    b = +A(b, 0);
    d = +A(d, 1);
    e = +A(e, 0);
    f = !l(f) || !!f;
    h = !l(h) || !!h;
    var n;
    Object.defineProperty(this, 'alpha', {
      get: function() {
        return n;
      },
      set: function(a) {
        n = Tq(255 * A(a, 0)) / 255;
      },
    });
    this.alpha = m;
    R(this, 'bias', 'Number', e);
    R(this, 'clamp', 'Boolean', h);
    var t;
    Object.defineProperty(this, 'color', {
      get: function() {
        return t;
      },
      set: function(a) {
        t = a & 16777215;
      },
    });
    this.color = k;
    R(this, 'divisor', 'Number', d);
    R(this, 'matrixX', 'Number', a);
    R(this, 'matrixY', 'Number', b);
    var p = [];
    Object.defineProperty(this, 'matrix', {
      get: function() {
        return p;
      },
      set: function(a) {
        p = Q(a, Array) || [];
        Uq(p, this.matrixY * this.matrixX, 0);
      },
    });
    this.matrix = c;
    R(this, 'preserveAlpha', 'Boolean', f);
  };
  P(re, 'flash.filters.ConvolutionFilter', Pq);
  re.prototype.kd = function() {
    return new pe(
      this.bias,
      this.clamp,
      Yc(this.color, this.alpha),
      this.divisor,
      this.matrix,
      this.matrixX,
      this.matrixY,
      this.preserveAlpha
    );
  };
  re.prototype.clone = function() {
    return new re(
      this.matrixX,
      this.matrixY,
      this.matrix,
      this.divisor,
      this.bias,
      this.preserveAlpha,
      this.clamp,
      this.color,
      this.alpha
    );
  };
  var Er = function(a, b, c, d, e, f, h, k, m) {
    Pq.call(this);
    c >>>= 0;
    d >>>= 0;
    e = +A(e, 0);
    f = +A(f, 0);
    h = io(h, 'wrap');
    var n;
    Object.defineProperty(this, 'alpha', {
      get: function() {
        return n;
      },
      set: function(a) {
        n = Tq(255 * A(a, 0)) / 255;
      },
    });
    this.alpha = m;
    var t;
    Object.defineProperty(this, 'color', {
      get: function() {
        return t;
      },
      set: function(a) {
        t = (a >>> 0) & 16777215;
      },
    });
    this.color = k;
    R(this, 'componentX', 'uint', c);
    R(this, 'componentY', 'uint', d);
    R(this, 'mapBitmap', 'flash.display.BitmapData', a);
    var p;
    Object.defineProperty(this, 'mapPoint', {
      get: function() {
        return p;
      },
      set: function(a) {
        a = Q(a, Xq);
        p = null != a ? new Yq(a.x, a.y) : new Yq(0, 0);
      },
    });
    this.mapPoint = b;
    R(this, 'mode', 'String', h);
    R(this, 'scaleX', 'Number', e);
    R(this, 'scaleY', 'Number', f);
  };
  P(Er, 'flash.filters.DisplacementMapFilter', Pq);
  Er.prototype.clone = function() {
    return new Er(
      this.mapBitmap,
      this.mapPoint,
      this.componentX,
      this.componentY,
      this.scaleX,
      this.scaleY,
      this.mode,
      this.color,
      this.alpha
    );
  };
  var Fr = function() {};
  Fr.p = P(Fr, 'flash.filters.DisplacementMapFilterMode');
  Object.defineProperties(Fr.p, {
    CLAMP: { value: 'clamp' },
    COLOR: { value: 'color' },
    IGNORE: { value: 'ignore' },
    WRAP: { value: 'wrap' },
  });
  var ve = function(a, b, c, d, e, f, h, k, m, n, t) {
    Pq.call(this);
    a = +A(a, 4);
    b = +A(b, 45);
    c >>>= 0;
    d = +A(d, 1);
    e = +A(e, 4);
    f = +A(f, 4);
    h = +A(h, 1);
    k = A(k, 1) | 0;
    m = !!m;
    n = !!n;
    t = !!t;
    var p;
    Object.defineProperty(this, 'alpha', {
      get: function() {
        return p;
      },
      set: function(a) {
        p = Tq(255 * A(a, 0)) / 255;
      },
    });
    this.alpha = d;
    R(this, 'angle', 'Number', b);
    R(this, 'blurX', 'Number', e);
    R(this, 'blurY', 'Number', f);
    var r;
    Object.defineProperty(this, 'color', {
      get: function() {
        return r;
      },
      set: function(a) {
        r = (a >>> 0) & 16777215;
      },
    });
    this.color = c;
    R(this, 'distance', 'Number', a);
    R(this, 'hideObject', 'Boolean', t);
    R(this, 'inner', 'Boolean', m);
    R(this, 'knockout', 'Boolean', n);
    R(this, 'quality', 'int', k);
    R(this, 'strength', 'Number', h);
  };
  P(ve, 'flash.filters.DropShadowFilter', Pq);
  ve.prototype.kd = function() {
    return new se(
      (this.angle * Math.PI) / 180,
      Yc(this.color, this.alpha),
      this.distance,
      this.strength,
      this.quality,
      this.blurX,
      this.blurY,
      te(this.hideObject, this.inner, this.knockout)
    );
  };
  ve.prototype.clone = function() {
    return new ve(
      this.distance,
      this.angle,
      this.color,
      this.alpha,
      this.blurX,
      this.blurY,
      this.strength,
      this.quality,
      this.inner,
      this.knockout,
      this.hideObject
    );
  };
  var Gr = function(a, b, c, d, e, f, h, k) {
    Pq.call(this);
    c = +A(c, 6);
    d = +A(d, 6);
    e = +A(e, 2);
    f = A(f, 1) | 0;
    h = !!h;
    k = !!k;
    var m;
    Object.defineProperty(this, 'alpha', {
      get: function() {
        return m;
      },
      set: function(a) {
        m = Tq(255 * A(a, 1)) / 255;
      },
    });
    this.alpha = b;
    R(this, 'blurX', 'Number', c);
    R(this, 'blurY', 'Number', d);
    var n;
    Object.defineProperty(this, 'color', {
      get: function() {
        return n;
      },
      set: function(a) {
        n = (A(a, 16711680) >>> 0) & 16777215;
      },
    });
    this.color = a;
    R(this, 'inner', 'Boolean', h);
    R(this, 'knockout', 'Boolean', k);
    R(this, 'quality', 'int', f);
    R(this, 'strength', 'Number', e);
  };
  P(Gr, 'flash.filters.GlowFilter', Pq);
  Gr.prototype.kd = function() {
    return new se(
      0,
      Yc(this.color, this.alpha),
      0,
      this.strength,
      this.quality,
      this.blurX,
      this.blurY,
      te(!1, this.inner, this.knockout)
    );
  };
  Gr.prototype.clone = function() {
    return new Gr(
      this.color,
      this.alpha,
      this.blurX,
      this.blurY,
      this.strength,
      this.quality,
      this.inner,
      this.knockout
    );
  };
  var Hr = function(a, b, c, d, e, f, h, k, m, n, t) {
    Pq.call(this);
    a = +A(a, 4);
    b = +A(b, 45);
    f = +A(f, 4);
    h = +A(h, 4);
    k = +A(k, 1);
    m = A(m, 1) | 0;
    n = io(n, 'inner');
    t = !!t;
    var p = [],
      r = [],
      u = [],
      y = 0;
    Object.defineProperty(this, 'colors', {
      get: function() {
        return p;
      },
      set: function(a) {
        a = Q(a, Array) || [];
        y = a.length;
        for (var b = 0; b < y; b++) p[b] = (A(a[b], 16711680) >>> 0) & 16777215;
        Uq(r, y, 1);
        Uq(u, y, 0);
      },
    });
    this.colors = c;
    Object.defineProperty(this, 'alphas', {
      get: function() {
        return r;
      },
      set: function(a) {
        a = Q(a, Array) || [];
        for (var b = 0; b < y; b++) r[b] = Tq(255 * A(a[b], 1)) / 255;
        r.length = y;
      },
    });
    this.alphas = d;
    Object.defineProperty(this, 'ratios', {
      get: function() {
        return u;
      },
      set: function(a) {
        a = Q(a, Array) || [];
        for (var b = 0; b < y; b++) u[b] = Tq(a[b]);
        u.length = y;
      },
    });
    this.ratios = e;
    R(this, 'angle', 'Number', b);
    R(this, 'blurX', 'Number', f);
    R(this, 'blurY', 'Number', h);
    R(this, 'distance', 'Number', a);
    R(this, 'knockout', 'Boolean', t);
    R(this, 'quality', 'int', m);
    R(this, 'strength', 'Number', k);
    R(this, 'type', 'String', n);
  };
  var ze = function(a, b, c, d, e, f, h, k, m, n, t) {
    Hr.call(this, a, b, c, d, e, f, h, k, m, n, t);
  };
  P(ze, 'flash.filters.GradientBevelFilter', Pq);
  ze.prototype.kd = function() {
    return new we(
      (this.angle * Math.PI) / 180,
      this.colors,
      this.alphas,
      this.ratios,
      this.distance,
      this.strength,
      this.quality,
      this.blurX,
      this.blurY,
      ke(this.type, this.knockout)
    );
  };
  ze.prototype.clone = function() {
    return new ze(
      this.distance,
      this.angle,
      this.colors,
      this.alphas,
      this.ratios,
      this.blurX,
      this.blurY,
      this.strength,
      this.quality,
      this.type,
      this.knockout
    );
  };
  var Ce = function(a, b, c, d, e, f, h, k, m, n, t) {
    Hr.call(this, a, b, c, d, e, f, h, k, m, n, t);
  };
  P(Ce, 'flash.filters.GradientGlowFilter', Pq);
  Ce.prototype.kd = function() {
    return new Ae(
      (this.angle * Math.PI) / 180,
      this.colors,
      this.alphas,
      this.ratios,
      this.distance,
      this.strength,
      this.quality,
      this.blurX,
      this.blurY,
      ke(this.type, this.knockout)
    );
  };
  Ce.prototype.clone = function() {
    return new Ce(
      this.distance,
      this.angle,
      this.colors,
      this.alphas,
      this.ratios,
      this.blurX,
      this.blurY,
      this.strength,
      this.quality,
      this.type,
      this.knockout
    );
  };
  var Ir = function(a, b, c, d, e, f, h, k) {
      a = +A(a, 1);
      b = +A(b, 1);
      c = +A(c, 1);
      d = +A(d, 1);
      e = +A(e, 0);
      f = +A(f, 0);
      h = +A(h, 0);
      k = +A(k, 0);
      Object.defineProperty(this, '__swiffy_v', {
        writable: !0,
        value: new Zc(a, e, b, f, c, h, d, k),
      });
    },
    Jr = P(Ir, 'flash.geom.ColorTransform'),
    Kr = function(a) {
      return new Ir(a.Z, a.Y, a.X, a.S, a.W, a.U, a.T, a.Q);
    };
  Object.defineProperty(Ir.prototype, 'redMultiplier', {
    get: function() {
      return this.__swiffy_v.Z;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(+a, b.W, b.Y, b.U, b.X, b.T, b.S, b.Q);
    },
  });
  Object.defineProperty(Ir.prototype, 'greenMultiplier', {
    get: function() {
      return this.__swiffy_v.Y;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, +a, b.U, b.X, b.T, b.S, b.Q);
    },
  });
  Object.defineProperty(Ir.prototype, 'blueMultiplier', {
    get: function() {
      return this.__swiffy_v.X;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, b.Y, b.U, +a, b.T, b.S, b.Q);
    },
  });
  Object.defineProperty(Ir.prototype, 'alphaMultiplier', {
    get: function() {
      return this.__swiffy_v.S;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, b.Y, b.U, b.X, b.T, +a, b.Q);
    },
  });
  Object.defineProperty(Ir.prototype, 'redOffset', {
    get: function() {
      return this.__swiffy_v.W;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, +a, b.Y, b.U, b.X, b.T, b.S, b.Q);
    },
  });
  Object.defineProperty(Ir.prototype, 'greenOffset', {
    get: function() {
      return this.__swiffy_v.U;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, b.Y, +a, b.X, b.T, b.S, b.Q);
    },
  });
  Object.defineProperty(Ir.prototype, 'blueOffset', {
    get: function() {
      return this.__swiffy_v.T;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, b.Y, b.U, b.X, +a, b.S, b.Q);
    },
  });
  Object.defineProperty(Ir.prototype, 'alphaOffset', {
    get: function() {
      return this.__swiffy_v.Q;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(b.Z, b.W, b.Y, b.U, b.X, b.T, b.S, +a);
    },
  });
  Object.defineProperty(Ir.prototype, 'color', {
    get: function() {
      return (
        ((this.__swiffy_v.W << 16) |
          (this.__swiffy_v.U << 8) |
          this.__swiffy_v.T) >>>
        0
      );
    },
    set: function(a) {
      a >>>= 0;
      var b = this.__swiffy_v;
      this.__swiffy_v = new Zc(
        0,
        (a >> 16) & 255,
        0,
        (a >> 8) & 255,
        0,
        a & 255,
        b.S,
        b.Q
      );
    },
  });
  Ir.prototype.concat = function(a) {
    a = Q(a, Jr);
    this.__swiffy_v = this.__swiffy_v.Ql(a.__swiffy_v);
  };
  Ir.prototype.toString = function() {
    return (
      '(redMultiplier=' +
      this.__swiffy_v.Z +
      ', greenMultiplier=' +
      this.__swiffy_v.Y +
      ', blueMultiplier=' +
      this.__swiffy_v.X +
      ', alphaMultiplier=' +
      this.__swiffy_v.S +
      ', redOffset=' +
      this.__swiffy_v.W +
      ', greenOffset=' +
      this.__swiffy_v.U +
      ', blueOffset=' +
      this.__swiffy_v.T +
      ', alphaOffset=' +
      this.__swiffy_v.Q +
      ')'
    );
  };
  var Lr = function(a, b, c, d, e, f) {
      a = +A(a, 1);
      b = +A(b, 0);
      c = +A(c, 0);
      d = +A(d, 1);
      e = +A(e, 0);
      f = +A(f, 0);
      Object.defineProperty(this, '__swiffy_v', {
        writable: !0,
        value: Vc(a, b, c, d, e, f),
      });
    },
    Bp = P(Lr, 'flash.geom.Matrix'),
    Cp = function(a) {
      a = a.__swiffy_v;
      return a.Uc(20 * a.q, 20 * a.s);
    },
    Mr = function(a) {
      return new Lr(a.n, a.o, a.j, a.i, a.q / 20, a.s / 20);
    };
  Object.defineProperty(Lr.prototype, 'a', {
    get: function() {
      return this.__swiffy_v.n;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = Vc(+a, b.o, b.j, b.i, b.q, b.s);
    },
  });
  Object.defineProperty(Lr.prototype, 'b', {
    get: function() {
      return this.__swiffy_v.o;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = Vc(b.n, +a, b.j, b.i, b.q, b.s);
    },
  });
  Object.defineProperty(Lr.prototype, 'c', {
    get: function() {
      return this.__swiffy_v.j;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = Vc(b.n, b.o, +a, b.i, b.q, b.s);
    },
  });
  Object.defineProperty(Lr.prototype, 'd', {
    get: function() {
      return this.__swiffy_v.i;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = Vc(b.n, b.o, b.j, +a, b.q, b.s);
    },
  });
  Object.defineProperty(Lr.prototype, 'tx', {
    get: function() {
      return this.__swiffy_v.q;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = b.Uc(+a, b.s);
    },
  });
  Object.defineProperty(Lr.prototype, 'ty', {
    get: function() {
      return this.__swiffy_v.s;
    },
    set: function(a) {
      var b = this.__swiffy_v;
      this.__swiffy_v = b.Uc(b.q, +a);
    },
  });
  Lr.prototype.clone = function() {
    var a = new Lr();
    a.__swiffy_v = this.__swiffy_v;
    return a;
  };
  Lr.prototype.concat = function(a) {
    a = Q(a, Bp);
    this.__swiffy_v = this.__swiffy_v.multiply(a.__swiffy_v);
  };
  Lr.prototype.copyColumnFrom = function(a, b) {
    a >>>= 0;
    b = Q(b, Nr);
    var c = this.__swiffy_v.n,
      d = this.__swiffy_v.o,
      e = this.__swiffy_v.j,
      f = this.__swiffy_v.i,
      h = this.__swiffy_v.q,
      k = this.__swiffy_v.s;
    switch (a) {
      case 0:
        c = b.x;
        d = b.y;
        break;
      case 1:
        e = b.x;
        f = b.y;
        break;
      case 2:
        h = b.x;
        k = b.y;
        break;
      default:
        return;
    }
    this.__swiffy_v = Vc(c, d, e, f, h, k);
  };
  Lr.prototype.copyColumnTo = function(a, b) {
    a >>>= 0;
    b = Q(b, Nr);
    switch (a) {
      case 0:
        b.x = this.__swiffy_v.n;
        b.y = this.__swiffy_v.o;
        b.z = 0;
        break;
      case 1:
        b.x = this.__swiffy_v.j;
        b.y = this.__swiffy_v.i;
        b.z = 0;
        break;
      case 2:
        (b.x = this.__swiffy_v.q), (b.y = this.__swiffy_v.s), (b.z = 1);
    }
  };
  Lr.prototype.copyFrom = function(a) {
    a = Q(a, Bp);
    this.__swiffy_v = a.__swiffy_v;
  };
  Lr.prototype.copyRowFrom = function(a, b) {
    a >>>= 0;
    b = Q(b, Nr);
    var c = this.__swiffy_v.n,
      d = this.__swiffy_v.o,
      e = this.__swiffy_v.j,
      f = this.__swiffy_v.i,
      h = this.__swiffy_v.q,
      k = this.__swiffy_v.s;
    switch (a) {
      case 0:
        c = b.x;
        e = b.y;
        h = b.z;
        break;
      case 1:
        d = b.x;
        f = b.y;
        k = b.z;
        break;
      default:
        return;
    }
    this.__swiffy_v = Vc(c, d, e, f, h, k);
  };
  Lr.prototype.copyRowTo = function(a, b) {
    a >>>= 0;
    b = Q(b, Nr);
    switch (a) {
      case 0:
        b.x = this.__swiffy_v.n;
        b.y = this.__swiffy_v.j;
        b.z = this.__swiffy_v.q;
        break;
      case 1:
        b.x = this.__swiffy_v.j;
        b.y = this.__swiffy_v.i;
        b.z = this.__swiffy_v.s;
        break;
      case 2:
        (b.x = 0), (b.y = 0), (b.z = 1);
    }
  };
  Lr.prototype.createBox = function(a, b, c, d, e) {
    c = +A(c, 0);
    d = +A(d, 0);
    e = +A(e, 0);
    this.__swiffy_v = Hc.Nh(-c)
      .Ye(+a, +b)
      .nd(d, e);
  };
  Lr.prototype.createGradientBox = function(a, b, c, d, e) {
    c = +A(c, 0);
    d = +A(d, 0);
    e = +A(e, 0);
    this.__swiffy_v = gi(+a, +b, c, d, e);
  };
  Lr.prototype.deltaTransformPoint = function(a) {
    a = Q(a, Xq);
    return new Yq(
      this.__swiffy_v.n * a.x + this.__swiffy_v.j * a.y,
      this.__swiffy_v.o * a.x + this.__swiffy_v.i * a.y
    );
  };
  Lr.prototype.identity = function() {
    this.__swiffy_v = Hc;
  };
  Lr.prototype.invert = function() {
    var a = this.__swiffy_v;
    this.__swiffy_v = a.On() ? a.Ul() : Vc(Infinity, 0, 0, Infinity, NaN, NaN);
  };
  Lr.prototype.rotate = function(a) {
    this.__swiffy_v = this.__swiffy_v.Nh(-+a);
  };
  Lr.prototype.scale = function(a, b) {
    this.__swiffy_v = this.__swiffy_v.Ye(+a, +b);
  };
  Lr.prototype.setTo = function(a, b, c, d, e, f) {
    this.__swiffy_v = Vc(+a, +b, +c, +d, +e, +f);
  };
  Lr.prototype.transformPoint = function(a) {
    a = Q(a, Xq);
    return new Yq(
      this.__swiffy_v.n * a.x + this.__swiffy_v.j * a.y + this.__swiffy_v.q,
      this.__swiffy_v.o * a.x + this.__swiffy_v.i * a.y + this.__swiffy_v.s
    );
  };
  Lr.prototype.translate = function(a, b) {
    this.__swiffy_v = this.__swiffy_v.nd(+a, +b);
  };
  Lr.prototype.toString = function() {
    return (
      '(a=' +
      this.__swiffy_v.n +
      ', b=' +
      this.__swiffy_v.o +
      ', c=' +
      this.__swiffy_v.j +
      ', d=' +
      this.__swiffy_v.i +
      ', tx=' +
      this.__swiffy_v.q +
      ', ty=' +
      this.__swiffy_v.s +
      ')'
    );
  };
  var Yq = function(a, b) {
      a = +A(a, 0);
      b = +A(b, 0);
      R(this, 'x', 'Number', a);
      R(this, 'y', 'Number', b);
    },
    Xq = P(Yq, 'flash.geom.Point');
  Object.defineProperty(Yq.prototype, 'length', {
    get: function() {
      return Rc(this.x, this.y);
    },
  });
  Yq.prototype.add = function(a) {
    return new Yq(this.x + a.x, this.y + a.y);
  };
  Yq.prototype.clone = function() {
    return new Yq(this.x, this.y);
  };
  Yq.prototype.copyFrom = function(a) {
    this.x = a.x;
    this.y = a.y;
  };
  Xq.distance = function(a, b) {
    return Rc(a.x - b.x, a.y - b.y);
  };
  Yq.prototype.equals = function(a) {
    return this.x == a.x && this.y == a.y;
  };
  Xq.interpolate = function(a, b, c) {
    return new Yq(a.x * c + b.x * (1 - c), a.y * c + b.y * (1 - c));
  };
  Yq.prototype.normalize = function(a) {
    a /= this.length;
    this.x *= a;
    this.y *= a;
  };
  Yq.prototype.offset = function(a, b) {
    this.x += a;
    this.y += b;
  };
  Xq.polar = function(a, b) {
    return new Yq(a * Math.cos(b), a * Math.sin(b));
  };
  Yq.prototype.setTo = function(a, b) {
    this.x = a;
    this.y = b;
  };
  Yq.prototype.subtract = function(a) {
    return new Yq(this.x - a.x, this.y - a.y);
  };
  Yq.prototype.toString = function() {
    return '(x=' + this.x + ', y=' + this.y + ')';
  };
  var Br = function(a, b, c, d) {
      a = +A(a, 0);
      b = +A(b, 0);
      c = +A(c, 0);
      d = +A(d, 0);
      R(this, 'x', 'Number', a);
      R(this, 'y', 'Number', b);
      R(this, 'width', 'Number', c);
      R(this, 'height', 'Number', d);
    },
    Or = P(Br, 'flash.geom.Rectangle');
  Object.defineProperty(Br.prototype, 'top', {
    get: function() {
      return this.y;
    },
    set: function(a) {
      this.y = +a;
    },
  });
  Object.defineProperty(Br.prototype, 'left', {
    get: function() {
      return this.x;
    },
    set: function(a) {
      this.x = +a;
    },
  });
  Object.defineProperty(Br.prototype, 'bottom', {
    get: function() {
      return this.y + this.height;
    },
    set: function(a) {
      this.height = +a - this.y;
    },
  });
  Object.defineProperty(Br.prototype, 'right', {
    get: function() {
      return this.x + this.width;
    },
    set: function(a) {
      this.width = +a - this.x;
    },
  });
  Object.defineProperty(Br.prototype, 'topLeft', {
    get: function() {
      return new Yq(this.left, this.top);
    },
    set: function(a) {
      a = Q(a, Xq);
      this.left = a.x;
      this.top = a.y;
    },
  });
  Object.defineProperty(Br.prototype, 'bottomRight', {
    get: function() {
      return new Yq(this.right, this.bottom);
    },
    set: function(a) {
      a = Q(a, Xq);
      this.right = a.x;
      this.bottom = a.y;
    },
  });
  Object.defineProperty(Br.prototype, 'size', {
    get: function() {
      return new Yq(this.width, this.height);
    },
    set: function(a) {
      a = Q(a, Xq);
      this.width = a.x;
      this.height = a.y;
    },
  });
  Br.prototype.clone = function() {
    return new Br(this.x, this.y, this.width, this.height);
  };
  Br.prototype.contains = function(a, b) {
    return this.x <= a && this.y <= b && a < this.right && b < this.bottom;
  };
  Br.prototype.containsPoint = function(a) {
    return this.contains(a.x, a.y);
  };
  Br.prototype.containsRect = function(a) {
    var b = this.right,
      c = this.bottom,
      d = a.right,
      e = a.bottom;
    return (
      this.x <= a.x &&
      this.y <= a.y &&
      a.x < b &&
      a.y < c &&
      this.x < d &&
      this.y < e &&
      d <= b &&
      e <= c
    );
  };
  Br.prototype.copyFrom = function(a) {
    this.x = a.x;
    this.y = a.y;
    this.width = a.width;
    this.height = a.height;
  };
  Br.prototype.equals = function(a) {
    return (
      this.x == a.x &&
      this.y == a.y &&
      this.width == a.width &&
      this.height == a.height
    );
  };
  Br.prototype.inflate = function(a, b) {
    this.x -= a;
    this.y -= b;
    this.width += 2 * a;
    this.height += 2 * b;
  };
  Br.prototype.inflatePoint = function(a) {
    this.inflate(a.x, a.y);
  };
  Br.prototype.intersection = function(a) {
    if (this.intersects(a)) {
      var b = Math.max(this.x, a.x),
        c = Math.max(this.y, a.y),
        d = Math.min(this.right, a.right);
      a = Math.min(this.bottom, a.bottom);
      return new Br(b, c, d - b, a - c);
    }
    return new Br();
  };
  Br.prototype.intersects = function(a) {
    return (
      0 < a.width &&
      0 < a.height &&
      0 < this.width &&
      0 < this.height &&
      a.x < this.right &&
      a.y < this.bottom &&
      a.right > this.x &&
      a.bottom > this.y
    );
  };
  Br.prototype.isEmpty = function() {
    return 0 >= this.width || 0 >= this.height;
  };
  Br.prototype.offset = function(a, b) {
    this.x += a;
    this.y += b;
  };
  Br.prototype.offsetPoint = function(a) {
    this.offset(a.x, a.y);
  };
  Br.prototype.setEmpty = function() {
    this.height = this.width = this.y = this.x = 0;
  };
  Br.prototype.setTo = function(a, b, c, d) {
    this.x = a;
    this.y = b;
    this.width = c;
    this.height = d;
  };
  Br.prototype.union = function(a) {
    if (this.isEmpty()) return a.clone();
    if (a.isEmpty()) return this.clone();
    var b = Math.min(this.x, a.x),
      c = Math.min(this.y, a.y),
      d = Math.max(this.right, a.right);
    a = Math.max(this.bottom, a.bottom);
    return new Br(b, c, d - b, a - c);
  };
  Br.prototype.toString = function() {
    return (
      '(x=' +
      this.x +
      ', y=' +
      this.y +
      ', w=' +
      this.width +
      ', h=' +
      this.height +
      ')'
    );
  };
  var Zq = function(a) {
    return new Br(a.l, a.m, a.width(), a.height());
  };
  var Y = function(a, b, c, d) {
      a |= 0;
      b |= 0;
      c = !l(c) || !!c;
      d = A(d, 4294967295) >>> 0;
      if (!(8191 >= a && 8191 >= b && 16777215 >= a * b))
        throw J(2015, 'BitmapData');
      this.__swiffy_d.Ub(a, b, c, d);
    },
    Ap = P(Y, 'flash.display.BitmapData', In, [Dp]);
  Object.defineProperty(Y.prototype, 'width', {
    get: function() {
      return this.__swiffy_d.K();
    },
  });
  Object.defineProperty(Y.prototype, 'height', {
    get: function() {
      return this.__swiffy_d.$();
    },
  });
  Object.defineProperty(Y.prototype, 'rect', {
    get: function() {
      return new Br(0, 0, this.__swiffy_d.K(), this.__swiffy_d.$());
    },
  });
  Object.defineProperty(Y.prototype, 'transparent', {
    get: function() {
      return this.__swiffy_d.Ec;
    },
  });
  Y.prototype.applyFilter = function() {
    S(this, 'applyFilter');
  };
  Y.prototype.clone = function() {
    S(this, 'clone');
    return null;
  };
  Y.prototype.colorTransform = function(a, b) {
    Q(a, Or);
    Q(b, Jr);
    S(this, 'colorTransform');
  };
  Y.prototype.compare = function(a) {
    Q(a, Ap);
    S(this, 'compare');
    return 0;
  };
  Y.prototype.copyChannel = function(a, b, c) {
    Q(a, Ap);
    Q(b, Or);
    Q(c, Xq);
    S(this, 'copyChannel');
  };
  Y.prototype.copyPixels = function(a, b, c, d, e, f) {
    a = Q(a, Ap);
    b = Q(b, Or);
    c = Q(c, Xq);
    d = Q(d, Ap);
    e = Q(e, Xq);
    this.__swiffy_d.fo(
      a.__swiffy_d,
      b.x,
      b.y,
      b.width,
      b.height,
      c.x,
      c.y,
      d ? d.__swiffy_d : null,
      (e || b).x,
      (e || b).y,
      !!f
    );
  };
  Y.prototype.copyPixelsToByteArray = function(a, b) {
    a = Q(a, Or);
    b = Q(b, or);
    var c = this.__swiffy_d.Du(
        a.x,
        a.y,
        a.width,
        a.height,
        b.endian == Pr.LITTLE_ENDIAN
      ),
      d = c.byteLength,
      e = void 0 === d;
    e && (d = c.length);
    if (0 != d) {
      var f = Qr(b, d);
      if (e) for (e = 0; e < d; ++e) f[e] = c[e];
      else f.set(new Uint8Array(c.buffer, c.byteOffset, c.byteLength));
    }
  };
  Y.prototype.dispose = function() {
    this.__swiffy_d.hl();
  };
  Y.prototype.draw = function(a, b, c, d, e) {
    a = Q(a, Dp.p);
    b = Q(b, Bp);
    c = Q(c, Jr);
    Q(e, Or);
    a = a && a.__swiffy_d;
    if (!a || !a.Ri) throw J(2005, 0, 'IBitmapDrawable');
    this.__swiffy_d.Lb(a, b && Cp(b), c && c.__swiffy_v);
  };
  Y.prototype.drawWithQuality = function(a, b, c, d, e) {
    Q(a, Dp.p);
    Q(b, Bp);
    Q(c, Jr);
    Q(e, Or);
    S(this, 'drawWithQuality');
  };
  Y.prototype.encode = function(a, b, c) {
    xo(a, 'rectangle');
    Q(a, Or);
    xo(b, 'compressor');
    Q(c, or);
    S(this, 'encode');
    return new Rr();
  };
  Y.prototype.fillRect = function(a, b) {
    a = Q(a, Or);
    this.__swiffy_d.fillRect(a.x, a.y, a.width, a.height, b >>> 0);
  };
  Y.prototype.floodFill = function() {
    S(this, 'floodFill');
  };
  Y.prototype.generateFilterRect = function(a, b) {
    Q(a, Or);
    Q(b, Qq);
    S(this, 'generateFilterRect');
    return new Br();
  };
  Y.prototype.getColorBoundsRect = function() {
    S(this, 'getColorBoundsRect');
    return new Br();
  };
  Y.prototype.getPixel = function(a, b) {
    return this.__swiffy_d.Cu(a | 0, b | 0);
  };
  Y.prototype.getPixel32 = function(a, b) {
    return this.__swiffy_d.Gl(a | 0, b | 0);
  };
  Y.prototype.getPixels = function(a) {
    var b = new Rr();
    this.copyPixelsToByteArray(a, b);
    return b;
  };
  Y.prototype.getVector = function(a) {
    a = Q(a, Or);
    a = this.__swiffy_d.Eu(a.x, a.y, a.width, a.height);
    return Po(Xo, a);
  };
  Y.prototype.histogram = function(a) {
    Q(a, Or);
    S(this, 'histogram');
    return Po(Uo(Yo, !1, !1));
  };
  Y.prototype.hitTest = function(a, b, c, d) {
    xo(a, 'firstPoint');
    Q(a, Xq);
    Q(d, Xq);
    S(this, 'hitTest');
    return !1;
  };
  Y.prototype.lock = function() {
    S(this, 'lock');
    this.__swiffy_d.Dv();
  };
  Y.prototype.merge = function(a, b, c) {
    Q(a, Ap);
    Q(b, Or);
    Q(c, Xq);
    S(this, 'merge');
  };
  Y.prototype.noise = function() {
    S(this, 'noise');
  };
  Y.prototype.paletteMap = function(a, b, c, d, e, f, h) {
    Q(a, Ap);
    Q(b, Or);
    Q(c, Xq);
    Q(d, Array);
    Q(e, Array);
    Q(f, Array);
    Q(h, Array);
    S(this, 'paletteMap');
  };
  Y.prototype.perlinNoise = function(a, b, c, d, e, f, h, k, m) {
    Q(m, Array);
    S(this, 'perlinNoise');
  };
  Y.prototype.pixelDissolve = function(a, b, c) {
    Q(a, Ap);
    Q(b, Or);
    Q(c, Xq);
    S(this, 'pixelDissolve');
    return 0;
  };
  Y.prototype.scroll = function(a, b) {
    this.__swiffy_d.scroll(a | 0, b | 0);
  };
  Y.prototype.setPixel = function(a, b, c) {
    this.__swiffy_d.Yw(a | 0, b | 0, c >>> 0);
  };
  Y.prototype.setPixel32 = function(a, b, c) {
    this.__swiffy_d.Mm(a | 0, b | 0, c >>> 0);
  };
  Y.prototype.setPixels = function(a, b) {
    a = Q(a, Or);
    b = Q(b, or);
    var c = a.width,
      d = a.height,
      e = c * d * 4,
      f = Z(b),
      h = f.position;
    e + h > f.B.byteLength && ((e = f.B.byteLength - h), 0 >= e && (h = 0));
    h = new Uint8Array(f.B.buffer, h, e);
    f.position += e;
    this.__swiffy_d.Zw(a.x, a.y, c, d, h, b.endian == Pr.LITTLE_ENDIAN);
  };
  Y.prototype.setVector = function(a, b) {
    a = Q(a, Or);
    b = Q(b, Xo);
    this.__swiffy_d.$w(a.x, a.y, a.width, a.height, b.__swiffy_v);
  };
  Y.prototype.threshold = function(a, b, c) {
    Q(a, Ap);
    Q(b, Or);
    Q(c, Xq);
    S(this, 'threshold');
    return 0;
  };
  Y.prototype.unlock = function(a) {
    Q(a, Or);
    this.__swiffy_d.Ax();
  };
  Ak(Y, function(a, b) {
    return new dj(cj, a, b);
  });
  var $q = function(a) {
      a = Q(a, Wq);
      Object.defineProperty(this, '__swiffy_d', { value: a.__swiffy_d });
    },
    ar = P($q, 'flash.geom.Transform');
  Object.defineProperty($q.prototype, 'colorTransform', {
    get: function() {
      return Kr(this.__swiffy_d.nb);
    },
    set: function(a) {
      a = Q(a, Jr);
      var b = this.__swiffy_d;
      b.Gb(a.__swiffy_v);
      b.Fa();
    },
  });
  Object.defineProperty($q.prototype, 'concatenatedColorTransform', {
    get: function() {
      return Kr(this.__swiffy_d.ld());
    },
  });
  Object.defineProperty($q.prototype, 'concatenatedMatrix', {
    get: function() {
      return Mr(this.__swiffy_d.ka());
    },
  });
  Object.defineProperty($q.prototype, 'matrix', {
    get: function() {
      return Mr(this.__swiffy_d.wa());
    },
    set: function(a) {
      a = Q(a, Bp);
      var b = this.__swiffy_d;
      b.setTransform(Cp(a));
      b.Fa();
    },
  });
  Object.defineProperty($q.prototype, 'pixelBounds', {
    get: function() {
      return Zq(this.__swiffy_d.mp());
    },
  });
  var Sr = function(a, b, c, d) {
      this.w = l(d) ? Number(d) : 0;
      this.x = l(a) ? Number(a) : 0;
      this.y = l(b) ? Number(b) : 0;
      this.z = l(c) ? Number(c) : 0;
    },
    Nr = P(Sr, 'flash.geom.Vector3D');
  Object.defineProperty(Sr.prototype, 'lengthSquared', {
    get: function() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    },
  });
  Object.defineProperty(Sr.prototype, 'length', {
    get: function() {
      return Math.sqrt(this.lengthSquared);
    },
  });
  Object.defineProperty(Nr, 'X_AXIS', { value: new Sr(1, 0, 0, 0) });
  Object.defineProperty(Nr, 'Y_AXIS', { value: new Sr(0, 1, 0, 0) });
  Object.defineProperty(Nr, 'Z_AXIS', { value: new Sr(0, 0, 1, 0) });
  Sr.prototype.add = function(a) {
    return new Sr(this.x + a.x, this.y + a.y, this.z + a.z);
  };
  Nr.angleBetween = function() {
    return 0;
  };
  Sr.prototype.clone = function() {
    return new Sr(this.x, this.y, this.z, this.w);
  };
  Sr.prototype.copyFrom = function(a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
  };
  Sr.prototype.crossProduct = function() {
    return new Sr();
  };
  Sr.prototype.decrementBy = function() {};
  Nr.distance = function(a, b) {
    return a.subtract(b).length;
  };
  Sr.prototype.dotProduct = function() {
    return 0;
  };
  Sr.prototype.equals = function(a, b) {
    return (
      this.x == a.x && this.y == a.y && this.z == a.z && (!b || this.w == a.w)
    );
  };
  Sr.prototype.incrementBy = function() {};
  Sr.prototype.nearEquals = function() {
    return !1;
  };
  Sr.prototype.negate = function() {};
  Sr.prototype.normalize = function() {
    return 0;
  };
  Sr.prototype.project = function() {};
  Sr.prototype.scaleBy = function() {};
  Sr.prototype.setTo = function(a, b, c) {
    this.x = Number(a);
    this.y = Number(b);
    this.z = Number(c);
  };
  Sr.prototype.subtract = function(a) {
    return new Sr(this.x - a.x, this.y - a.y, this.z - a.z);
  };
  Sr.prototype.toString = function() {
    return 'Vector3D(' + this.x + ', ' + this.y + ', ' + this.z + ')';
  };
  var Tr = P(function() {}, 'flash.media.AudioDecoder');
  Object.defineProperties(Tr, {
    DOLBY_DIGITAL: { value: 'DolbyDigital' },
    DOLBY_DIGITAL_PLUS: { value: 'DolbyDigitalPlus' },
    DTS: { value: 'DTS' },
    DTS_EXPRESS: { value: 'DTSExpress' },
    DTS_HD_HIGH_RESOLUTION_AUDIO: { value: 'DTSHDHighResolutionAudio' },
    DTS_HD_MASTER_AUDIO: { value: 'DTSHDMasterAudio' },
  });
  var Vr = function(a, b) {
    Q(a, kr);
    Q(b, Ur);
    R(this, 'bytesLoaded', 'uint', 0);
    R(this, 'bytesTotal', 'Number', 0);
    R(this, 'isBuffering', 'Boolean', !1);
    R(this, 'isURLInaccessible', 'Boolean', !0);
    R(this, 'length', 'Number', 0);
    R(this, 'url', 'String', '');
  };
  P(Vr, 'flash.media.Sound');
  Vr.prototype.play = function() {
    S(this, 'play');
  };
  Vr.prototype.close = function() {
    S(this, 'close');
  };
  Vr.prototype.connect = function() {
    S(this, 'connect');
  };
  var Ur = P(function(a, b) {
    a = +A(a, 1e3);
    b = !!b;
    R(this, 'bufferTime', 'Number', a);
    R(this, 'checkPolicyFile', 'Boolean', b);
  }, 'flash.media.SoundLoaderContext');
  var wr = function(a, b) {
      a = +A(a, 1);
      b = +A(b, 0);
      R(this, 'leftToLeft', 'Number', 0);
      R(this, 'leftToRight', 'Number', 0);
      R(this, 'pan', 'Number', b);
      R(this, 'rightToLeft', 'Number', 0);
      R(this, 'rightToRight', 'Number', 0);
      R(this, 'volume', 'Number', a);
    },
    vr = P(wr, 'flash.media.SoundTransform');
  var Wr = function() {
      Vq.call(this);
      this.deblocking = 0;
      this.smoothing = !1;
    },
    Xr = P(Wr, 'flash.media.Video', Vq);
  Ak(Wr, function(a, b) {
    return new sh(Zj, a, b);
  });
  M(Xr, 'deblocking', function() {
    return this.__swiffy_v.deblocking;
  });
  N(Xr, 'deblocking', function(a) {
    this.__swiffy_v.deblocking = a | 0;
  });
  M(Xr, 'smoothing', function() {
    return this.__swiffy_v.smoothing;
  });
  N(Xr, 'smoothing', function(a) {
    this.__swiffy_v.smoothing = !!a;
  });
  M(Xr, 'videoHeight', function() {
    return 0;
  });
  M(Xr, 'videoWidth', function() {
    return 0;
  });
  Wr.prototype.attachCamera = function() {
    S(this, 'attachCamera');
  };
  Wr.prototype.attachNetStream = function(a) {
    Q(a, Yr);
    S(this, 'attachNetStream');
  };
  Wr.prototype.clear = function() {
    S(this, 'clear');
  };
  Mm.prototype['flash.net.navigateToURL'] = function(a, b) {
    xo(a, 'request');
    xo(a.url, 'url');
    var c = l(b) ? b : '_blank',
      d = 0;
    a.data && (d = a.method == Zr.POST ? 2 : 1);
    var e = Je;
    e.c.Qh(new Aj(e, a.data ? a.data.toString() : null, a.url, c, d));
  };
  var $r = {};
  Mm.prototype['flash.net.registerClassAlias'] = function(a, b) {
    xo(a, 'aliasName');
    xo(b, 'classObject');
    a = String(a);
    b = Q(b, Cn);
    S(this, 'flash.net.registerClassAlias');
    $r[a] = b;
  };
  Mm.prototype['flash.net.getClassByAlias'] = function(a) {
    xo(a, 'aliasName');
    a = String(a);
    S(this, 'flash.net.getClassByAlias');
    var b = $r[a];
    if (!b) throw J(1014, a);
    return b;
  };
  var as = function() {
      X.call(this);
      R(this, 'client', 'Object', null);
      O(this, 'domain', '');
      R(this, 'isPerUser', 'Boolean', !1);
    },
    bs = P(as, 'flash.net.LocalConnection', X);
  Object.defineProperty(bs, 'isSupported', { value: !1 });
  as.prototype.allowDomain = function() {
    S(this, 'allowDomain');
  };
  as.prototype.allowInsecureDomain = function() {
    S(this, 'allowInsecureDomain');
  };
  as.prototype.close = function() {
    S(this, 'close');
  };
  as.prototype.connect = function() {
    S(this, 'connect');
  };
  as.prototype.send = function() {
    S(this, 'send');
  };
  var cs = function() {
      X.call(this);
      R(this, 'client', 'Object', null);
      O(this, 'connectedProxyType', '');
      O(this, 'farID', '');
      O(this, 'farNonce', '');
      R(this, 'httpIdleTimeout', 'Number', 0);
      R(this, 'maxPeerConnections', 'uint', 0);
      O(this, 'nearID', '');
      O(this, 'nearNonce', '');
      R(this, 'objectEncoding', 'uint', 0);
      O(this, 'protocol', '');
      R(this, 'proxyType', 'String', '');
      O(this, 'unconnectedPeerStreams', null);
      O(this, 'uri', '');
      O(this, 'usingTLS', !1);
      this.__swiffy_v.ft = !1;
    },
    ds = P(cs, 'flash.net.NetConnection', X);
  M(ds, 'connected', function() {
    return this.__swiffy_v.ft;
  });
  Object.defineProperty(ds, 'defaultObjectEncoding', { value: 0 });
  cs.prototype.addHeader = function() {
    S(this, 'addHeader');
  };
  cs.prototype.call = function(a, b) {
    Q(b, es);
    S(this, 'call');
  };
  cs.prototype.close = function() {
    S(this, 'close');
  };
  cs.prototype.connect = function() {
    S(this, 'connect');
  };
  var gs = function(a) {
      X.call(this);
      Q(a, ds);
      R(this, 'audioReliable', 'Boolean', !1);
      R(this, 'audioSampleAccess', 'Boolean', !1);
      O(this, 'backBufferLength', 0);
      R(this, 'backBufferTime', 'Number', 0);
      R(this, 'bufferTimeMax', 'Number', 0);
      R(this, 'checkPolicyFile', 'Boolean', !1);
      R(this, 'dataReliable', 'Boolean', !1);
      O(this, 'farID', '');
      O(this, 'farNonce', '');
      R(this, 'inBufferSeek', 'Boolean', !1);
      O(this, 'info', null);
      O(this, 'liveDelay', 0);
      R(this, 'maxPauseBufferTime', 'Number', 0);
      R(this, 'multicastAvailabilitySendToAll', 'Boolean', !1);
      R(this, 'multicastAvailabilityUpdatePeriod', 'Number', 0);
      R(this, 'multicastFetchPeriod', 'Number', 0);
      O(this, 'multicastInfo', null);
      R(this, 'multicastPushNeighborLimit', 'Number', 0);
      R(this, 'multicastRelayMarginDuration', 'Number', 0);
      R(this, 'multicastWindowDuration', 'Number', 0);
      O(this, 'nearNonce', '');
      O(this, 'objectEncoding', 0);
      O(this, 'peerStreams', null);
      R(this, 'soundTransform', 'flash.media.SoundTransform', null);
      R(this, 'useHardwareDecoder', 'Boolean', !1);
      R(this, 'useJitterBuffer', 'Boolean', !1);
      R(this, 'videoReliable', 'Boolean', !1);
      R(this, 'videoSampleAccess', 'Boolean', !1);
      R(this, 'videoStreamSettings', 'flash.media.VideoStreamSettings', null);
      a = fs(this);
      a.Dk = 0;
      a.Ug = 0.1;
      a.Zc = 0;
      a.$c = 0;
      a.al = 0;
      a.time = 0;
      a.Yg = null;
    },
    fs = function(a) {
      return a.__swiffy_v;
    },
    Yr = P(gs, 'flash.net.NetStream', X);
  M(Yr, 'bufferTime', function() {
    return fs(this).Ug;
  });
  N(Yr, 'bufferTime', function(a) {
    fs(this).Ug = +a;
  });
  M(Yr, 'bufferLength', function() {
    return fs(this).Dk;
  });
  M(Yr, 'bytesLoaded', function() {
    return fs(this).Zc;
  });
  M(Yr, 'bytesTotal', function() {
    return fs(this).$c;
  });
  M(Yr, 'currentFPS', function() {
    return fs(this).al;
  });
  M(Yr, 'time', function() {
    return fs(this).time;
  });
  M(Yr, 'client', function() {
    return fs(this).Yg;
  });
  N(Yr, 'client', function(a) {
    fs(this).Yg = a;
  });
  Object.defineProperty(Yr, 'CONNECT_TO_FMS', { value: 'connectToFMS' });
  Object.defineProperty(Yr, 'DIRECT_CONNECTIONS', {
    value: 'directConnections',
  });
  gs.prototype.appendBytes = function(a) {
    Q(a, or);
    S(this, 'appendBytes');
  };
  gs.prototype.appendBytesAction = function() {
    S(this, 'appendBytesAction');
  };
  gs.prototype.attach = function(a) {
    Q(a, ds);
    S(this, 'attach');
  };
  gs.prototype.attachAudio = function() {
    S(this, 'attachAudio');
  };
  gs.prototype.attachCamera = function() {
    S(this, 'attachCamera');
  };
  gs.prototype.close = function() {
    S(this, 'close');
  };
  gs.prototype.dispose = function() {
    S(this, 'dispose');
  };
  gs.prototype.onPeerConnect = function(a) {
    Q(a, Yr);
    S(this, 'onPeerConnect');
    return !1;
  };
  gs.prototype.pause = function() {
    S(this, 'pause');
  };
  gs.prototype.play = function() {
    S(this, 'play');
  };
  gs.prototype.play2 = function(a) {
    Q(a, hs);
    S(this, 'play2');
  };
  gs.prototype.preloadEmbeddedData = function(a) {
    Q(a, hs);
    S(this, 'preloadEmbeddedData');
  };
  gs.prototype.publish = function() {
    S(this, 'publish');
  };
  gs.prototype.receiveAudio = function() {
    S(this, 'receiveAudio');
  };
  gs.prototype.receiveVideo = function() {
    S(this, 'receiveVideo');
  };
  gs.prototype.receiveVideoFPS = function() {
    S(this, 'receiveVideoFPS');
  };
  Yr.resetDRMVouchers = function() {
    S(this, 'resetDRMVouchers');
  };
  gs.prototype.resume = function() {
    S(this, 'resume');
  };
  gs.prototype.seek = function() {
    S(this, 'seek');
    this.dispatchEvent(
      new xq('netStatus', !1, !1, {
        code: 'NetStream.SeekStart.Notify',
        level: 'status',
      })
    );
  };
  gs.prototype.send = function() {
    S(this, 'send');
  };
  gs.prototype.step = function() {
    S(this, 'step');
  };
  gs.prototype.togglePause = function() {
    S(this, 'togglePause');
  };
  var hs = P(
    function() {
      X.call(this);
      R(this, 'len', 'Number', 0);
      R(this, 'offset', 'Number', 0);
      R(this, 'oldStreamName', 'String', '');
      R(this, 'start', 'Number', 0);
      R(this, 'streamName', 'String', '');
      R(this, 'transition', 'String', '');
    },
    'flash.net.NetStreamPlayOptions',
    X
  );
  var is = Un(2012);
  is.p = P(is, 'flash.net.ObjectEncoding');
  Object.defineProperty(is.p, 'dynamicPropertyWriter', { value: null });
  Object.defineProperty(is.p, 'AMF0', { value: 0 });
  Object.defineProperty(is.p, 'AMF3', { value: 3 });
  Object.defineProperty(is.p, 'DEFAULT', { value: 3 });
  var es = P(function(a, b) {
    Q(a, Function);
    Q(b, Function);
  }, 'flash.net.Responder');
  var js = Un(2012);
  js.Me = function(a) {
    return a.__swiffy_v;
  };
  js.po = function() {
    var a = Pn(js.p);
    X.call(a);
    var b = js.Me(a);
    b.Yg = a;
    b.hq = js.cl;
    b.data = {};
    return a;
  };
  js.Xp = {};
  js.cl = is.p.AMF3;
  js.p = P(js, 'flash.net.SharedObject', X);
  M(js.p, 'client', function() {
    return js.Me(this).Yg;
  });
  N(js.p, 'client', function(a) {
    if (null == a) throw J(2004);
    js.Me(this).Yg = a;
  });
  K(js.p, 'clear', function() {
    S(this, 'clear');
    js.Me(this).data = {};
  });
  K(js.p, 'close', function() {
    S(this, 'close');
  });
  K(js.p, 'connect', function(a) {
    Q(a, ds);
    S(this, 'connect');
  });
  M(js.p, 'data', function() {
    return js.Me(this).data;
  });
  Object.defineProperty(js.p, 'defaultObjectEncoding', {
    get: function() {
      return js.cl;
    },
    set: function(a) {
      js.cl = a >>> 0;
    },
  });
  K(js.p, 'flush', function() {
    S(this, 'flush');
    return ks.p.FLUSHED;
  });
  N(js.p, 'fps', function() {
    S(this, 'fps');
  });
  js.p.getLocal = function(a) {
    xo(a, 'name');
    a = String(a);
    S(this, 'getLocal');
    var b = js.Xp[a];
    b || (js.Xp[a] = b = js.po());
    return b;
  };
  js.p.getRemote = function(a) {
    xo(a, 'name');
    S(this, 'getRemote');
    return js.po();
  };
  M(js.p, 'objectEncoding', function() {
    return js.Me(this).hq;
  });
  N(js.p, 'objectEncoding', function(a) {
    a >>>= 0;
    S(this, 'objectEncoding');
    if (a != is.p.AMF0 && a != is.p.AMF3) throw J(2008, 'objectEncoding');
    js.Me(this).hq = a;
  });
  K(js.p, 'send', function() {
    S(this, 'send');
  });
  K(js.p, 'setDirty', function(a) {
    xo(a, 'propertyName');
    S(this, 'setDirty');
  });
  K(js.p, 'setProperty', function() {
    S(this, 'setProperty');
  });
  M(js.p, 'size', function() {
    S(this, 'size');
    return 0;
  });
  var ks = Un(2012);
  ks.p = P(ks, 'flash.net.SharedObjectFlushStatus');
  Object.defineProperty(ks.p, 'FLUSHED', { value: 'flushed' });
  Object.defineProperty(ks.p, 'PENDING', { value: 'pending' });
  var ls = function() {
    X.call(this);
    O(this, 'bytesAvailable', 0);
    O(this, 'bytesPending', 0);
    O(this, 'connected', !1);
    R(this, 'endian', 'String', 'bigEndian');
    O(this, 'localAddress', '');
    O(this, 'localPort', 0);
    R(this, 'objectEncoding', 'uint', 0);
    O(this, 'remoteAddress', '');
    O(this, 'remotePort', 0);
    R(this, 'timeout', 'uint', 0);
  };
  P(ls, 'flash.net.Socket', X);
  ls.prototype.close = function() {
    S(this, 'close');
  };
  ls.prototype.connect = function() {
    S(this, 'connect');
  };
  ls.prototype.flush = function() {
    S(this, 'flush');
  };
  ls.prototype.readBoolean = function() {
    S(this, 'readBoolean');
    return !1;
  };
  ls.prototype.readByte = function() {
    S(this, 'readByte');
    return 0;
  };
  ls.prototype.readBytes = function(a) {
    Q(a, or);
    S(this, 'readBytes');
  };
  ls.prototype.readDouble = function() {
    S(this, 'readDouble');
    return 0;
  };
  ls.prototype.readFloat = function() {
    S(this, 'readFloat');
    return 0;
  };
  ls.prototype.readInt = function() {
    S(this, 'readInt');
    return 0;
  };
  ls.prototype.readMultiByte = function() {
    S(this, 'readMultiByte');
    return '';
  };
  ls.prototype.readObject = function() {
    S(this, 'readObject');
    return null;
  };
  ls.prototype.readShort = function() {
    S(this, 'readShort');
    return 0;
  };
  ls.prototype.readUnsignedByte = function() {
    S(this, 'readUnsignedByte');
    return 0;
  };
  ls.prototype.readUnsignedInt = function() {
    S(this, 'readUnsignedInt');
    return 0;
  };
  ls.prototype.readUnsignedShort = function() {
    S(this, 'readUnsignedShort');
    return 0;
  };
  ls.prototype.readUTF = function() {
    S(this, 'readUTF');
    return '';
  };
  ls.prototype.readUTFBytes = function() {
    S(this, 'readUTFBytes');
    return '';
  };
  ls.prototype.writeBoolean = function() {
    S(this, 'writeBoolean');
  };
  ls.prototype.writeByte = function() {
    S(this, 'writeByte');
  };
  ls.prototype.writeBytes = function(a) {
    Q(a, or);
    S(this, 'writeBytes');
  };
  ls.prototype.writeDouble = function() {
    S(this, 'writeDouble');
  };
  ls.prototype.writeFloat = function() {
    S(this, 'writeFloat');
  };
  ls.prototype.writeInt = function() {
    S(this, 'writeInt');
  };
  ls.prototype.writeMultiByte = function() {
    S(this, 'writeMultiByte');
  };
  ls.prototype.writeObject = function() {
    S(this, 'writeObject');
  };
  ls.prototype.writeShort = function() {
    S(this, 'writeShort');
  };
  ls.prototype.writeUnsignedInt = function() {
    S(this, 'writeUnsignedInt');
  };
  ls.prototype.writeUTF = function() {
    S(this, 'writeUTF');
  };
  ls.prototype.writeUTFBytes = function() {
    S(this, 'writeUTFBytes');
  };
  var ns = function(a) {
    X.call(this);
    a = Q(a, kr);
    R(this, 'bytesLoaded', 'uint', 0);
    R(this, 'bytesTotal', 'uint', 0);
    this.data = void 0;
    R(this, 'dataFormat', 'String', ms.TEXT);
    a && this.load(a);
  };
  P(ns, 'flash.net.URLLoader', X);
  ns.prototype.close = function() {
    S(this, 'close');
  };
  ns.prototype.load = function(a) {
    a = Q(a, kr);
    S(this, 'load');
    var b = this;
    this.dispatchEvent(new Pp(Rp.OPEN));
    var c = new Qj();
    c.Va = function(a) {
      b.bytesLoaded = 1024;
      b.bytesTotal = 1024;
      b.dispatchEvent(new zq(Aq.PROGRESS, !1, !1, 1024, 1024));
      b.dispatchEvent(new aq(bq.HTTP_STATUS, !1, !1, 400));
      b.data = a;
      b.dispatchEvent(new Pp(Rp.COMPLETE));
    };
    c.xc = function() {};
    Zk(a.url, null, a.method, a.data ? a.data.toString() : null, c, nr(a));
  };
  var ms = P(function() {}, 'flash.net.URLLoaderDataFormat');
  O(ms, 'BINARY', 'binary');
  O(ms, 'TEXT', 'text');
  O(ms, 'VARIABLES', 'variables');
  var os = P(function(a, b) {
      Object.defineProperty(this, '__swiffy_v', {
        value: { name: io(a, ''), value: io(b, '') },
      });
    }, 'flash.net.URLRequestHeader'),
    ps = function(a) {
      return a.__swiffy_v;
    };
  M(os, 'name', function() {
    return ps(this).name;
  });
  N(os, 'name', function(a) {
    ps(this).name = ho(a);
  });
  M(os, 'value', function() {
    return ps(this).value;
  });
  N(os, 'value', function(a) {
    ps(this).value = ho(a);
  });
  var nr = function(a) {
      return a.requestHeaders.map(function(a) {
        return ps(Q(a, os));
      });
    },
    kr = P(function(a) {
      a = ho(a);
      R(this, 'authenticate', 'Boolean', !1);
      R(this, 'cacheResponse', 'Boolean', !1);
      R(this, 'contentType', 'String', null);
      R(this, 'data', 'Object', null);
      R(this, 'digest', 'String', '');
      R(this, 'followRedirects', 'Boolean', !1);
      R(this, 'idleTimeout', 'Number', 0);
      R(this, 'manageCookies', 'Boolean', !1);
      R(this, 'method', 'String', Zr.GET);
      R(this, 'url', 'String', a);
      R(this, 'useCache', 'Boolean', !1);
      R(this, 'userAgent', 'String', '');
      O(this, 'requestHeaders', []);
    }, 'flash.net.URLRequest');
  var qs = function() {},
    Zr = P(qs, 'flash.net.URLRequestMethod');
  O(Zr, 'DELETE', 'DELETE');
  O(Zr, 'GET', 'GET');
  O(Zr, 'HEAD', 'HEAD');
  O(Zr, 'OPTIONS', 'OPTIONS');
  O(Zr, 'POST', 'POST');
  O(qs, 'PUT', 'PUT');
  var rs = function(a) {
    a = ho(a);
    null != a && this.decode(a);
  };
  P(rs, 'flash.net.URLVariables');
  Object.defineProperty(rs.prototype, 'decode', {
    value: function(a) {
      a = String(a);
      a = Ii(a, !0);
      var b = Object.keys(a);
      if (!b.length) throw J(2101);
      for (var c = 0; c < b.length; c++) {
        var d = b[c];
        if (!d.length) throw J(2101);
        var e = a[d];
        this[d] = 1 == e.length ? e[0] : e;
      }
    },
  });
  Object.defineProperty(rs.prototype, 'toString', {
    value: function() {
      return Ei(this);
    },
  });
  var pq = function(a) {
      return Rn.call(ss, a);
    },
    ss = Tn(
      function(a) {
        Qe(this, a || Je.kh);
      },
      'flash.system.ApplicationDomain',
      {
        Tf: function(a) {
          a = Q(a, ss);
          return pq((a ? w(a) : Je.Wr).Vk());
        },
      }
    );
  O(ss, 'MIN_DOMAIN_MEMORY_LENGTH', 1024);
  Object.defineProperty(ss, 'currentDomain', {
    get: function() {
      return pq();
    },
  });
  M(ss, 'parentDomain', function() {
    var a = w(this).parent;
    return a ? (a.parent ? pq(a) : null) : null;
  });
  M(ss, 'domainMemory', function() {
    S(this, 'domainMemory');
    return w(this).Pi;
  });
  N(ss, 'domainMemory', function(a) {
    S(this, 'domainMemory');
    if ((a = Q(a, or)) && 1024 > a.length) throw J(1504);
    w(this).Pi = a;
  });
  K(ss, 'getDefinition', function(a) {
    a = String(a);
    var b = w(this);
    if (b.Ml(a)) return b.ap(a);
    throw J(1065, a);
  });
  K(ss, 'getQualifiedDefinitionNames', function() {
    S(this, 'getQualifiedDefinitionNames');
    return Po(String, []);
  });
  K(ss, 'hasDefinition', function(a) {
    a = String(a);
    return w(this).Ml(a);
  });
  var ts = P(function() {}, 'flash.system.Capabilities');
  Object.defineProperty(ts, 'avHardwareDisable', { value: !1 });
  Object.defineProperty(ts, 'cpuArchitecture', { value: '' });
  Object.defineProperty(ts, 'hasAccessibility', { value: !1 });
  Object.defineProperty(ts, 'hasAudio', { value: !1 });
  Object.defineProperty(ts, 'hasAudioEncoder', { value: !1 });
  Object.defineProperty(ts, 'hasEmbeddedVideo', { value: !1 });
  Object.defineProperty(ts, 'hasIME', { value: !1 });
  Object.defineProperty(ts, 'hasMP3', { value: !1 });
  Object.defineProperty(ts, 'hasPrinting', { value: !1 });
  Object.defineProperty(ts, 'hasScreenBroadcast', { value: !1 });
  Object.defineProperty(ts, 'hasScreenPlayback', { value: !1 });
  Object.defineProperty(ts, 'hasStreamingAudio', { value: !0 });
  Object.defineProperty(ts, 'hasStreamingVideo', { value: !0 });
  Object.defineProperty(ts, 'hasTLS', { value: !1 });
  Object.defineProperty(ts, 'hasVideoEncoder', { value: !1 });
  Object.defineProperty(ts, 'isDebugger', { value: !1 });
  Object.defineProperty(ts, 'isEmbeddedInAcrobat', { value: !1 });
  Object.defineProperty(ts, 'language', { value: '' });
  Object.defineProperty(ts, 'localFileReadDisable', { value: !0 });
  Object.defineProperty(ts, 'manufacturer', { value: '' });
  Object.defineProperty(ts, 'maxLevelIDC', { value: '5.1' });
  Object.defineProperty(ts, 'os', { value: '' });
  Object.defineProperty(ts, 'pixelAspectRatio', { value: 1 });
  Object.defineProperty(ts, 'playerType', { value: 'PlugIn' });
  Object.defineProperty(ts, 'screenColor', { value: 'color' });
  Object.defineProperty(ts, 'screenDPI', { value: 72 });
  Object.defineProperty(ts, 'screenResolutionX', {
    get: function() {
      return screen.width;
    },
  });
  Object.defineProperty(ts, 'screenResolutionY', {
    get: function() {
      return screen.height;
    },
  });
  Object.defineProperty(ts, 'serverString', {
    get: function() {
      var a = [],
        b;
      for (b in us) {
        var c = us[b],
          c = q(c) ? c(this) : this[c],
          c = !0 === c ? 't' : !1 === c ? 'f' : encodeURIComponent(c);
        a.push(b + '=' + c);
      }
      return a.join('&');
    },
  });
  Object.defineProperty(ts, 'supports32BitProcesses', { value: !1 });
  Object.defineProperty(ts, 'supports64BitProcesses', { value: !1 });
  Object.defineProperty(ts, 'touchscreenType', { value: '' });
  Object.defineProperty(ts, 'version', {
    get: function() {
      return 'HTML 11,0,0,0';
    },
  });
  ts.hasMultiChannelAudio = function() {
    S(this, 'hasMultiChannelAudio');
    return !1;
  };
  var vs = function(a) {
      return function(b) {
        return b.hasMultiChannelAudio(a);
      };
    },
    us = {
      A: 'hasAudio',
      SA: 'hasStreamingAudio',
      SV: 'hasStreamingVideo',
      EV: 'hasEmbeddedVideo',
      MP3: 'hasMP3',
      AE: 'hasAudioEncoder',
      VE: 'hasVideoEncoder',
      ACC: 'hasAccessibility',
      PR: 'hasPrinting',
      SP: 'hasScreenPlayback',
      SB: 'hasScreenBroadcast',
      DEB: 'isDebugger',
      V: 'version',
      M: 'manufacturer',
      R: function(a) {
        return a.screenResolutionX + 'x' + a.screenResolutionY;
      },
      COL: 'screenColor',
      AR: 'pixelAspectRatio',
      OS: 'os',
      ARCH: 'cpuArchitecture',
      L: 'language',
      PR32: 'supports32BitProcesses',
      PR64: 'supports64BitProcesses',
      PT: 'playerType',
      AVD: 'avHardwareDisable',
      LFD: 'localFileReadDisable',
      WD: function() {
        return !1;
      },
      TLS: 'hasTLS',
      ML: 'maxLevelIDC',
      DP: 'screenDPI',
      IME: 'hasIME',
      DD: vs('DolbyDigital'),
      DDP: vs('DolbyDigitalPlus'),
      DTS: vs('DTS'),
      DTE: vs('DTSExpress'),
      DTH: vs('DTSHDHighResolutionAudio'),
      DTM: vs('DTSHDMasterAudio'),
    };
  var mr = function(a, b, c) {
      a = !!a;
      b = Q(b, ss);
      c = Q(c, ws);
      R(this, 'allowCodeImport', 'Boolean', !0);
      R(this, 'applicationDomain', 'flash.system.ApplicationDomain', b);
      R(this, 'checkPolicyFile', 'Boolean', a);
      R(this, 'imageDecodingPolicy', 'String', 'onDemand');
      R(this, 'parameters', 'Object', null);
      R(
        this,
        'requestedContentParent',
        'flash.display.DisplayObjectContainer',
        null
      );
      R(this, 'securityDomain', 'flash.system.SecurityDomain', c);
    },
    lr = P(mr, 'flash.system.LoaderContext');
  M(ss, 'allowLoadBytesCodeExecution', function() {
    return this.zs;
  });
  N(ss, 'allowLoadBytesCodeExecution', function(a) {
    this.zs = a;
  });
  var xs = Un(2012);
  xs.p = P(xs, 'flash.system.Security');
  R(xs.p, 'exactSettings', 'Boolean', !1);
  O(xs.p, 'pageDomain', void 0);
  O(xs.p, 'sandboxType', 'remote');
  O(xs.p, 'LOCAL_TRUSTED', 'localTrusted');
  O(xs.p, 'LOCAL_WITH_FILE', 'localWithFile');
  O(xs.p, 'LOCAL_WITH_NETWORK', 'localWithNetwork');
  O(xs.p, 'REMOTE', 'remote');
  xs.p.allowDomain = function() {
    S(xs, 'allowDomain');
  };
  xs.p.allowInsecureDomain = function() {
    S(xs, 'allowInsecureDomain');
  };
  xs.p.loadPolicyFile = function() {
    S(xs, 'loadPolicyFile');
  };
  xs.p.showSettings = function() {
    S(xs, 'showSettings');
  };
  var ys = function() {},
    ws = Tn(ys, 'flash.system.SecurityDomain', {
      Tf: function() {
        throw J(2012, 'SecurityDomain');
      },
    });
  O(ws, 'currentDomain', new ys());
  var zs = P(function() {}, 'flash.text.AntiAliasType');
  O(zs, 'ADVANCED', 'advanced');
  O(zs, 'NORMAL', 'normal');
  var As = P(function() {}, 'flash.text.FontStyle');
  O(As, 'BOLD', 'bold');
  O(As, 'BOLD_ITALIC', 'boldItalic');
  O(As, 'ITALIC', 'italic');
  O(As, 'REGULAR', 'regular');
  var Bs = P(function() {}, 'flash.text.FontType');
  O(Bs, 'DEVICE', 'device');
  O(Bs, 'EMBEDDED', 'embedded');
  O(Bs, 'EMBEDDED_CFF', 'embeddedCFF');
  var Cs = function() {},
    Ds = P(Cs, 'flash.text.Font');
  Object.defineProperty(Cs.prototype, 'fontName', {
    get: function() {
      var a = this.__swiffy_v;
      return a ? a.name : null;
    },
  });
  Object.defineProperty(Cs.prototype, 'fontStyle', {
    get: function() {
      var a = this.__swiffy_v;
      return a
        ? a.bold
          ? a.italic
            ? As.BOLD_ITALIC
            : As.BOLD
          : a.italic
          ? As.ITALIC
          : As.REGULAR
        : null;
    },
  });
  Object.defineProperty(Cs.prototype, 'fontType', {
    get: function() {
      return this.__swiffy_v ? Bs.EMBEDDED : null;
    },
  });
  Ds.enumerateFonts = function() {
    var a = [],
      b = Je.c.Dd,
      c;
    for (c in b)
      for (var d = b[c], e = 0; e < d.length; e++) {
        var f = new Cs();
        Object.defineProperty(f, '__swiffy_v', { value: d[e] });
        a.push(f);
      }
    return a;
  };
  Cs.prototype.hasGlyphs = function(a) {
    a = String(a);
    var b = this.__swiffy_v;
    if (!b) return !1;
    for (var c = 0; c < a.length; c++) if (!b.Cl(a.charAt(c))) return !1;
    return !0;
  };
  Ds.registerFont = function(a) {
    Q(a, Cn);
    throw J(1508, 'font');
  };
  var Es = function() {
      cr.call(this);
    },
    Fs = P(Es, 'flash.text.TextField', cr);
  Ak(Es, function(a, b) {
    return new wk(
      {
        id: 0,
        height: 240,
        html: !0,
        selectable: !0,
        leftMargin: 0,
        rightMargin: 0,
      },
      new ad(0, 0, 2e3, 2e3),
      a.Rc
    ).Kb(a, null, b);
  });
  M(Fs, 'textHeight', function() {
    return x(this).Il() / 20;
  });
  M(Fs, 'textWidth', function() {
    return x(this).Jl() / 20;
  });
  Es.prototype.appendText = function(a) {
    var b = x(this);
    b.Bc(b.ua + Hj(String(a)));
  };
  Es.prototype.getTextFormat = function(a, b) {
    var c = x(this).qp(a, b);
    return Gs(c);
  };
  Es.prototype.setTextFormat = function(a, b, c) {
    a = Q(a, Hs);
    xo(a, 'format');
    x(this).ak(w(a), b, c);
  };
  Es.prototype.getLineMetrics = function(a) {
    a = x(this).uu(a | 0);
    if (!a) throw J(2006, 'lineIndex');
    return new Is(
      a.x / 20,
      a.width / 20,
      a.height / 20,
      a.ascent / 20,
      a.descent / 20,
      a.leading / 20
    );
  };
  Object.defineProperty(Es.prototype, 'text', {
    get: function() {
      var a = x(this),
        b = a.ua;
      a.Tb && (b = Gj(b, a.definition.multiline));
      return b;
    },
    set: function(a) {
      var b = x(this);
      a = String(a);
      b.Tb && ((a = Hj(a)), b.Zj(!1));
      b.Bc(a);
      b.Zj(!0);
    },
  });
  Object.defineProperty(Es.prototype, 'htmlText', {
    get: function() {
      return x(this).fp();
    },
    set: function(a) {
      var b = x(this),
        c = Te();
      c.color = 4278190080;
      b.ak(c);
      b.Bc(String(a));
    },
  });
  Object.defineProperty(Es.prototype, 'length', {
    get: function() {
      return this.text.length;
    },
  });
  Object.defineProperty(Es.prototype, 'textColor', {
    get: function() {
      return x(this).pp();
    },
    set: function(a) {
      x(this).Gr(a);
    },
  });
  Object.defineProperty(Es.prototype, 'autoSize', {
    get: function() {
      return x(this).xf;
    },
    set: function(a) {
      switch (a) {
        case 'center':
        case 'left':
        case 'none':
        case 'right':
          break;
        default:
          throw J(2008, 'autoSize');
      }
      x(this).nr(a);
    },
  });
  Object.defineProperty(Es.prototype, 'selectable', {
    get: function() {
      return x(this).Xh;
    },
    set: function(a) {
      x(this).Er(!!a);
    },
  });
  Object.defineProperty(Es.prototype, 'border', {
    get: function() {
      return x(this).yi;
    },
    set: function(a) {
      x(this).pr(!!a);
    },
  });
  Object.defineProperty(Es.prototype, 'borderColor', {
    get: function() {
      return x(this).xi;
    },
    set: function(a) {
      x(this).qr(Number(a));
    },
  });
  Object.defineProperty(Es.prototype, 'background', {
    get: function() {
      return x(this).ui;
    },
    set: function(a) {
      x(this).wg(!!a);
    },
  });
  Object.defineProperty(Es.prototype, 'backgroundColor', {
    get: function() {
      return x(this).ti;
    },
    set: function(a) {
      x(this).or(Number(a));
    },
  });
  Object.defineProperty(Es.prototype, 'type', {
    get: function() {
      var a = Js;
      return x(this).Ui ? a.INPUT : a.DYNAMIC;
    },
    set: function(a) {
      switch (a) {
        case Js.DYNAMIC:
          a = !1;
          break;
        case Js.INPUT:
          a = !0;
          break;
        default:
          throw J(2008, 'type');
      }
      x(this).Km(a);
    },
  });
  Object.defineProperty(Es.prototype, 'antiAliasType', {
    get: function() {
      return 'advanced' == x(this).vk ? zs.ADVANCED : zs.NORMAL;
    },
    set: function(a) {
      x(this).mr(a == zs.ADVANCED ? 'advanced' : 'normal');
    },
  });
  Object.defineProperty(Es.prototype, 'numLines', {
    get: function() {
      return x(this).Qc.length;
    },
  });
  Es.prototype.getLineText = function(a) {
    a = x(this).vu(a);
    if (null === a) throw new RangeError();
    return a;
  };
  Object.defineProperty(Es.prototype, 'multiline', {
    get: function() {
      return x(this).Ue;
    },
    set: function(a) {
      x(this).zr(!!a);
    },
  });
  Object.defineProperty(Es.prototype, 'wordWrap', {
    get: function() {
      return x(this).ki;
    },
    set: function(a) {
      x(this).Hr(!!a);
    },
  });
  Object.defineProperty(Es.prototype, 'embedFonts', {
    get: function() {
      return x(this).Jf;
    },
    set: function(a) {
      x(this).tr(!!a);
    },
  });
  Object.defineProperty(Es.prototype, 'defaultTextFormat', {
    get: function() {
      return Gs(x(this).kp());
    },
    set: function(a) {
      a = Q(a, Hs);
      xo(a, 'format');
      x(this).Br(w(a));
    },
  });
  Object.defineProperty(Es.prototype, 'restrict', {
    get: function() {
      return x(this).Em;
    },
    set: function(a) {
      a = ho(a);
      x(this).Cr(a);
    },
  });
  var eo = function(a, b) {
    this.P = a;
    this.$a = (this.parent = b || null)
      ? Object.create(this.parent.$a)
      : new Mm(this.P);
    this.Pi = null;
  };
  g = eo.prototype;
  g.cq = function(a) {
    a = a.replace('::', '.');
    '.' == a[0] && (a = a.substring(1));
    return a;
  };
  g.Ml = function(a) {
    a = this.cq(a);
    return a in this.$a;
  };
  g.ap = function(a) {
    a = this.cq(a);
    return this.$a[a];
  };
  g.$o = function(a) {
    a = a.cb(this.$a);
    return this.$a[a];
  };
  g.ii = '$';
  g.Vk = function() {
    return new eo(this.P, this);
  };
  g.zw = function(a, b, c) {
    var d = Mn();
    d.prototype = Object.create(this.$a);
    Gn(d, Ln, Nn, b.Fe(a.init, void 0)(null, ln), Sn, In, null, 'global', null);
    var e = yn(d);
    b.Vh(a.traits, null, ln, e, c);
    var f = this;
    a = function(a) {
      Object.defineProperty(f.$a, a, {
        get: function() {
          return Xn.call(d)[a];
        },
        set: function(b) {
          Xn.call(d)[a] = b;
        },
        configurable: !0,
      });
    };
    for (var h in e.traits) h in this.$a || a(h);
  };
  g.vw = function(a) {
    for (var b = new ao(a, this), c = 0; c < a.scripts.length; ++c)
      this.zw(a.scripts[c], b, void 0);
  };
  g.wt = function(a, b, c, d) {
    var e = a.Rl.classes[c],
      f = Mn(),
      h = b.zq(f),
      k = a.Ge(e.name).Xc(),
      m = [];
    if (e.interfaces)
      for (var n = 0; n < e.interfaces.length; ++n) {
        var t = a.Ge(e.interfaces[n]).cb(this.$a);
        t && m.push(this.$a[t]);
      }
    n = (n = a.Fe(e.init, void 0)) ? n(d, h) : Un(1001);
    Tn(n, k, { te: f, Tg: d, interfaces: m }, this.$a);
    a.Vh(e.traits, d, h, yn(f), void 0);
    a.Vh(e.ctraits, null, h, void 0, void 0).Ii(f);
    a.classes[c] = f;
    a.Fe(e.cinit, void 0)(null, b).call(f);
    return f;
  };
  g.Hp = function(a, b) {
    if (null == a) throw J(1007);
    var c = a.prototype.__swiffy_buildsym;
    if (c) {
      var d = Pn(a),
        c = c(this.P.c, d);
      c instanceof fj && (c.Hb(this.P.c.zh()), (c.Vb = !0));
      c && c.ia(!1, b);
      return d;
    }
    return Xn.apply(a, b);
  };
  g.Jc = function(a, b) {
    var c;
    this.Pi
      ? (c = Z(this.Pi).B)
      : (Ks || (Ks = new DataView(new ArrayBuffer(1024))), (c = Ks));
    if (0 > a || a + b > c.byteLength) throw J(1506);
    return c;
  };
  var th = function(a) {
    this.Wr = new eo(this);
    this.kh = this.Wr.Vk();
    this.c = a;
    this.Ud = new lq();
    this.td = [];
    this.kk = {};
    this.cm();
  };
  th.prototype.ii = 'vm';
  T.Ns(eo);
  g = th.prototype;
  g.Do = !0;
  g.trace = function(a) {
    Hh(a);
  };
  g.Qf = function() {
    return this.Ud.__swiffy_d;
  };
  g.Vd = function() {};
  g.Zf = function(a) {
    if (a) {
      a = a.xl();
      for (var b = 0; b < a.length; b++) a[b].Zf();
    }
    this.va();
  };
  g.$f = function() {};
  g.Mp = function() {
    return !0;
  };
  g.Cj = function() {};
  g.In = function() {};
  g.Bj = function() {};
  g.Hn = function() {};
  g.ng = function(a) {
    this.td.push(a);
  };
  g.va = function() {
    for (; 0 < this.td.length; ) this.td.shift().call(this);
  };
  g.Jo = function(a, b) {
    ++Kh;
    try {
      a(), --Kh;
    } catch (c) {
      b(c), Mh(c);
    }
  };
  g.nm = function() {};
  g.jo = function(a, b, c) {
    a[b] = c;
  };
  g.Qq = function(a, b) {
    a[b] = null;
  };
  g.zm = function() {};
  g.fn = function() {};
  g.Gq = function() {};
  g.fireEvent = function(a, b, c, d) {
    if (a instanceof X && (b = gr[c.type])) {
      c = b(a, c);
      if (d) return a.dispatchEvent(c);
      this.ng(na(a.dispatchEvent, a, c));
    }
    return !1;
  };
  g.xw = function(a, b) {
    var c = this.kk[a];
    c || (this.kk[a] = c = []);
    c.push(b);
  };
  g.bs = function(a, b) {
    var c = this.kk[a];
    c && Ga(c, b);
  };
  g.jq = function(a) {
    a = a.t;
    if (a instanceof X) {
      var b = a.__swiffy_listeners;
      if (b) for (var c in b) b[c].length && gq(c, a) && this.bs(c, a);
    }
  };
  g.ym = function(a) {
    var b = this.kk[a];
    if (b) for (var c = 0; c < b.length; ++c) this.ng(oa(hq, a, b[c]));
  };
  g.nl = function() {
    this.ym('enterFrame');
  };
  g.Mo = function() {
    this.ym('exitFrame');
  };
  g.Uh = function() {
    this.ym('render');
  };
  g.dm = function(a, b) {
    var c = a && a.cf;
    c &&
      (c.dispatchEvent(new Pp(Rp.INIT)),
      l(b) && c.dispatchEvent(new aq(bq.HTTP_STATUS, !1, !1, b)),
      c.dispatchEvent(new Pp(Rp.COMPLETE)));
  };
  g.co = function(a, b, c) {
    a.ah();
    b = a.t;
    Qn(b).apply(b, c);
    a.Nf(mj, !0);
  };
  g.na = function(a, b) {
    var c = a.definition.di,
      c = Pn(Bk(b, c) ? c : b),
      d;
    for (d in c) q(c[d]) && (c[d] = na(c[d], c));
    return c;
  };
  g.cm = function() {
    var a = this;
    fj.prototype.na = function() {
      return a.na(this, Vq);
    };
    Pj.prototype.na = function() {
      return a.na(
        this,
        this.definition.di && Bk(ur, this.definition.di) ? tr : xr
      );
    };
    Wj.prototype.na = function() {
      return a.na(this, Cr);
    };
    tj.prototype.na = function() {
      return a.na(this, Es);
    };
    fh.prototype.na = function() {
      return a.na(this, qr);
    };
    pj.prototype.na = function() {
      return a.na(this, br);
    };
    dj.prototype.na = function() {
      return a.na(this, Y);
    };
    sh.prototype.na = function() {
      return a.na(this, Wr);
    };
    nh.prototype.na = function() {
      return a.na(this, pr);
    };
  };
  g.ur = function(a, b) {
    Object.defineProperty(this.Ud.parameters, a, {
      value: b,
      configurable: !0,
      enumerable: !0,
    });
  };
  g.qi = function(a) {
    return (a instanceof Pj && a.Mj) || a instanceof Wj;
  };
  g.mq = function(a, b) {
    var c;
    c = a ? a.xl() : [];
    var d;
    d = b ? b.xl() : [];
    var e = c.length - 1,
      f = d.length - 1;
    if (0 < e && 0 < f) for (; c[e] == d[f]; ) e--, f--;
    for (var h = 0; h < c.length; h++) c[h].Nv(b);
    for (h = 0; h <= e; h++) c[h].gr(b);
    for (h = 0; h <= f; h++) d[h].hr(a);
    for (h = 0; h < d.length; h++) d[h].Pv(b);
  };
  g.Gf = function(a) {
    var b = this.c.Ib;
    b && !b.Od() && b.fireEvent(a);
  };
  g.Ho = function(a, b) {
    b.Hb(a.zh());
  };
  g.Vn = function(a, b) {
    a = String(a);
    b = String(b);
    return a < b ? -1 : a > b ? 1 : 0;
  };
  g.Un = function(a, b) {
    a = String(a).toLowerCase();
    b = String(b).toLowerCase();
    return a < b ? -1 : a > b ? 1 : 0;
  };
  g.Wn = function(a, b) {
    a = null !== a ? Number(a) : null;
    b = null !== b ? Number(b) : null;
    if (a !== a) throw J(1034, a, 'Number');
    if (b !== b) throw J(1034, b, 'Number');
    return a < b ? -1 : a > b ? 1 : 0;
  };
  var Ks = null;
  USING_XML_HTTP_MOCK = !!aa.USING_XML_HTTP_MOCK;
  var Ls = function(a, b, c) {
    Gi(b);
    this.Pc = a;
    this.Rc = b.version;
    a = window.location.href;
    var d = c && c.maxFrameDrop;
    null != d || (d = 3);
    this.Fw = (c && c.renderer) || aa.swiffy.CANVAS;
    this.Sm = this.Fw.Dt(this);
    this.Eb = new Ic(0, 0);
    this.Gh = !1;
    this.kx = new Ad();
    this.gw = b.fileSize;
    this.cg = [];
    this.ox = !!b.truncated;
    this.Bi = new Eh(b.frameRate, d, this);
    this.el = 0;
    this.Qj = [];
    this.Vr = [];
    this.Dd = {};
    d = Tk(b, this, null);
    this.oa || this.bf(ch);
    this.Oc = [];
    this.cd = null;
    this.Kk = !1;
    this.yx = 1;
    this.Kr = !(c && c.dontWireEvents);
    this.Ea = document.createElement('div');
    this.Ea.style.position = 'relative';
    this.Ea.style.width = '100%';
    this.Ea.style.height = '100%';
    this.Ea.style.overflow = 'hidden';
    this.Ea.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';
    this.Ea.style.webkitUserSelect = 'none';
    this.Ea.style.nC = 'none';
    this.Ea.style.oC = 'none';
    this.vm = new id(this);
    this.H = new Wj(this, b);
    this.Ja = new Pj(d, this, '#0');
    this.oa instanceof th && (this.Ja.Hb('root1'), this.Ja.wr(this.oa.Qf()));
    this.H.ia();
    this.Ja.Qt(19);
    this.Ja.play();
    this.sk(this.Ja, 0);
    this.Ib = null;
    this.Cp(d.Dc);
    this.H.cs();
    this.So = !0;
    this.qd = [];
    this.Hf = null;
    this.Fr(a);
    this.navigate = Mi;
    this.Oo = He;
    this.As = !(c && 0 == c.allowScriptAccess);
    this.Bm = this.Tl = !1;
  };
  ba('swiffy.Stage', Ls, void 0);
  Ls.prototype.Nt = function() {
    this.Bi.stop();
    this.vm.xx();
    this.H.la();
    this.Sm.la();
    Qb(this.Ea);
    var a = this.Ea;
    a && a.parentNode && a.parentNode.removeChild(a);
    this.Le().Sr();
  };
  Ls.prototype.destroy = Ls.prototype.Nt;
  Ls.prototype.wg = function(a) {
    this.H.wg(a);
  };
  Ls.prototype.setBackground = Ls.prototype.wg;
  Ls.prototype.Pw = function(a) {
    this.Oo = a || He;
  };
  Ls.prototype.setExternalInterfaceCallHook = Ls.prototype.Pw;
  Ls.prototype.Qw = function(a) {
    this.vr(Ii(a));
  };
  Ls.prototype.setFlashVars = Ls.prototype.Qw;
  Ls.prototype.Fr = function(a) {
    this.oa.Qf().Ag(a);
    this.vr(Ji(a));
  };
  Ls.prototype.setSwfUrl = Ls.prototype.Fr;
  Ls.prototype.Ar = function(a) {
    this.navigate = a || Mi;
  };
  Ls.prototype.setNavigateHook = Ls.prototype.Ar;
  Ls.prototype.hx = function(a) {
    this.Ar(
      a
        ? function(b, c, d) {
            b = a(b, d ? 'POST' : 'GET', c);
            Mi.call(this, b, c, d);
          }
        : null
    );
  };
  Ls.prototype.setUrlHook = Ls.prototype.hx;
  Ls.prototype.start = function() {
    var a = this.Bi;
    this.Ik(function() {
      a.start();
    });
  };
  Ls.prototype.start = Ls.prototype.start;
  g = Ls.prototype;
  g.sk = function(a, b) {
    this.H.Wc(a, -16384 + b);
    this.J().Gq(a, b);
  };
  g.su = function(a) {
    return this.H.Ic(-16384 + a);
  };
  g.Li = function() {
    this.el++;
  };
  g.we = function() {
    if (0 == --this.el) {
      for (var a = 0; a < this.Qj.length; a++) this.Qj[a].call();
      this.Qj = [];
    }
  };
  g.gv = function() {
    return 0 == this.el;
  };
  g.Ik = function(a) {
    this.gv() ? a.call() : this.Qj.push(a);
  };
  g.Ex = function() {
    this.Kr = !1;
    this.vm.Dx();
    Ib(document, 'keyup', this.xv, !1, this);
    Ib(new $b(document), 'key', this.wv, !1, this);
  };
  g.rw = function(a) {
    this.Ja.map(function(b) {
      if (b instanceof qj) return b.fireEvent(a);
    });
  };
  g.kq = function() {
    this.Sn();
    this.Gh = !0;
    this.oa.Gf(new Jc(3));
    this.va();
    this.oa.Vd();
    this.Ib ? this.Ib.Vd() : this.setCapture(this.H);
    this.va();
    this.Lf(!1);
  };
  g.oq = function() {
    this.Gh = !1;
    this.oa.Gf(new Jc(2));
    this.va();
    this.oa.$f();
    this.Ib ? this.Ib.$f() : this.releaseCapture(this.H);
    this.va();
    this.Lf(!0);
  };
  g.nq = function(a) {
    if (a) {
      var b = a.getParent();
      if (b) {
        do this.oa.qi(b) || (a = b);
        while ((b = b.getParent()));
      }
    }
    this.Ib != a &&
      (this.oa.mq(this.dq(this.Ib), this.dq(a)),
      (this.Ib = a),
      this.va(),
      this.Lf(!1),
      this.gn());
  };
  g.Xe = function(a, b) {
    l(b) || (b = this.H.Yo(a));
    this.Eb.x = a.x;
    this.Eb.y = a.y;
    this.Hf && this.Hf.Mv(a.x, a.y);
    this.oa.Zf(b);
    this.nq(b);
  };
  g.lq = function() {
    this.setCapture(this.H, !0);
  };
  g.pq = function() {
    this.releaseCapture(this.H);
  };
  g.Mu = function() {
    var a = this.H,
      b = new ad(0, 0, a.fd, a.ed),
      c = window.pageXOffset - a.Qk,
      a = window.pageYOffset - a.Rk,
      c = new ad(c, a, c + window.innerWidth, a + window.innerHeight);
    b.Sl(c);
    return b;
  };
  g.xv = function(a) {
    this.oa.Cj(a);
    this.oa.Gf(new Jc(0));
    this.va();
    this.oa.In();
    this.Lf(!0);
  };
  g.wv = function(a) {
    this.oa.Bj(a);
    this.oa.Gf(new Jc(1));
    this.va();
    this.oa.Hn();
    this.rw(new Jc(20));
    this.va();
    this.Lf(!0);
  };
  g.kv = function() {
    return null != this.Ib;
  };
  g.gn = function() {
    var a = 'default';
    this.J().Mp()
      ? (this.vj() || this.jv() || (!this.Re() && this.kv())) &&
        this.Ib &&
        (a = this.Ib.gj())
      : (a = 'none');
    this.Ea.style.cursor = a;
  };
  g.Qr = function(a, b, c, d, e, f) {
    this.ik();
    var h = null;
    l(c) &&
      l(d) &&
      l(e) &&
      l(f) &&
      (h = new ad(20 * c, 20 * d, 20 * e, 20 * f));
    this.Hf = new Gc(a, h, l(b) && b, this.Eb.x, this.Eb.y);
  };
  g.ik = function() {
    this.Hf = null;
  };
  g.iv = function(a) {
    return null != this.Hf && this.Hf.clip === a;
  };
  g.dq = function(a) {
    return a != this.H ? a : null;
  };
  g.Re = function() {
    return !!this.cd && !this.cd.Od();
  };
  g.vj = function() {
    return this.Re() && this.Kk;
  };
  g.uj = function(a) {
    return this.cd == a && !a.Od();
  };
  g.jv = function() {
    var a = this.Ib;
    return !!a && this.uj(a);
  };
  g.setCapture = function(a, b) {
    this.releaseCapture(a);
    this.Gh = !0;
    this.cd = a;
    b && ((this.Kk = !0), this.gn());
  };
  g.releaseCapture = function(a) {
    this.Gh = !1;
    this.cd &&
      (this.gn(),
      this.cd != a && (this.Sn(), this.cd && (this.cd.Ys(), this.va())),
      (this.cd = null),
      (this.Kk = !1));
  };
  g.yw = function(a) {
    this.oa instanceof ch ? this.Oc.push(a) : this.cg.push(a);
  };
  g.Cp = function(a, b) {
    a.ht(this, b);
    this.Vr.push(a);
  };
  g.an = function() {
    this.Kr && this.Ex();
    this.Oc = this.Oc.filter(function(a) {
      return !a.Od();
    });
    if (this.So)
      this.oa.nl(),
        this.Ja.fireEvent(new Jc(6)),
        this.jt(),
        this.oa.dm(this.oa.Qf()),
        (this.So = !1);
    else {
      this.oa.nl();
      for (var a = this.Oc.length - 1; 0 <= a; --a) {
        var b = this.Oc[a];
        b.fireEvent(new Jc(6));
        b.an();
      }
      this.cg.length &&
        (Array.prototype.push.apply(this.Oc, this.cg), (this.cg = []));
      this.va();
      b = this.Ja.$u();
      for (a = this.Oc.length - 1; 0 <= a; --a)
        for (var c = this.Oc[a]; c.Rn(b); )
          if (c.getParent()) c = c.getParent();
          else {
            c.map(oj);
            break;
          }
      this.Ja.map(oj);
    }
    this.oa.Mo();
    this.va();
    this.H.Aa &&
      this.vm.km &&
      ((a = this.H.Yo(this.Eb)), a != this.Ib && this.nq(a));
    this.Lf(!1);
    this.H.$h();
  };
  g.jt = function() {
    this.Ja.ia();
    this.Ja.t.$version = 'HTML 11,0,0,0';
    Array.prototype.push.apply(this.Oc, this.cg);
    this.cg = [];
    this.va();
    this.Ja.th(7);
    this.Ja.fireEvent(new Jc(7));
  };
  g.bf = function(a) {
    this.oa || (this.oa = new a(this));
    return this.oa;
  };
  g.J = function() {
    return this.oa;
  };
  g.va = function() {
    this.oa.va();
  };
  g.Lf = function(a) {
    for (var b = [], c = 0; c < this.qd.length; ++c)
      this.qd[c].Hw(a) || b.push(this.qd[c]);
    this.qd = b;
  };
  g.Sn = function() {
    this.qd = [];
  };
  g.Qh = function(a) {
    for (var b = 0; b < this.qd.length; ++b)
      if (this.qd[b].target == a.target) {
        this.qd[b] = a;
        return;
      }
    this.qd.push(a);
  };
  g.fj = function() {
    return this.Bi;
  };
  g.sp = function() {
    return xh() - this.Bi.Ft;
  };
  g.Le = function() {
    return this.kx;
  };
  g.vr = function(a) {
    for (var b = Object.keys(a), c = 0; c < b.length; c++) {
      var d = b[c],
        e = a[d];
      this.J().ur(d, e[e.length - 1]);
    }
  };
  g.zh = function() {
    return 'instance' + this.yx++;
  };
  g.Uh = function() {
    this.Tl && (this.J().Uh(), this.J().va(), (this.Tl = !1));
    this.Bm = !1;
    this.H.cs();
    this.Sm.Tq();
    this.Ea.parentNode || (this.Sm.si(this.Ea), this.Pc.appendChild(this.Ea));
  };
  g.cv = function() {
    this.Tl = !0;
  };
  g.Cm = function() {
    this.H.$h();
    this.Bm = !0;
  };
  g.getName = function() {
    return this.Pc.id;
  };
  g.Pt = function() {
    if (window.top == window) return !1;
    var a = this.Pc.parentNode;
    if (!a || a != document.body) return !1;
    for (a = a.firstChild; a; a = a.nextSibling)
      if (
        a != this.Pc &&
        'SCRIPT' != a.tagName &&
        (a.nodeType != Node.TEXT_NODE || a.nodeValue.trim())
      )
        return !1;
    return !0;
  };
  g.Al = function() {
    return this.As ? this.Pc : null;
  };
  var Ms = function() {
    this.hd = {};
  };
  v(Ms, ak);
  Yf.C(sj, Ms);
  Yf.C(Pj, Ms);
  Yf.C(Wj, Ms);
  Yf.C(Ls, Ms);
  Ms.prototype.yb = function(a, b) {
    this.Bo(a.G, b, a.Iu());
  };
  Ms.prototype.Bo = function(a, b, c) {
    b = b.Fx(c);
    c = [];
    for (a = a.Ha; a; a = a.nextSibling)
      if (!a.qb || b.Nd()) {
        for (; 0 < c.length && a.depth > c[c.length - 1]; )
          c.pop(), (b = b.ml());
        var d = a.wp() && !b.Nd();
        if (d) {
          if (a instanceof tj) continue;
          c.push(a.Bf);
          b = b.Pr(Xi(a), a.ka());
        }
        (b.xj() ? $f(a) : Yf.yd(a)).Lb(a, b);
        d && (b = b.xn());
      }
    for (a = 0; a < c.length; a++) b = b.ml();
  };
  var Ns = function() {
    this.hd = {};
  };
  v(Ns, Ms);
  Yf.C(fh, Ns);
  Yf.C(Uj, Ns);
  Ns.prototype.yb = function(a, b) {
    this.Bo(b.Se() ? a.Ld : a.G, b, null);
  };
  var Os = P(function() {}, 'flash.text.TextFieldAutoSize');
  O(Os, 'CENTER', 'center');
  O(Os, 'LEFT', 'left');
  O(Os, 'NONE', 'none');
  O(Os, 'RIGHT', 'right');
  var Js = P(function() {}, 'flash.text.TextFieldType');
  O(Js, 'DYNAMIC', 'dynamic');
  O(Js, 'INPUT', 'input');
  var Qs = function(a, b, c, d, e, f, h, k, m, n, t, p, r) {
      Qe(this, new Se());
      nf.call(this, a);
      Df.call(this, b);
      lf.call(this, c);
      gf.call(this, d);
      rf.call(this, e);
      Jf.call(this, f);
      Lf.call(this, h);
      Ff.call(this, k);
      Ps.call(this, m);
      xf.call(this, n);
      Bf.call(this, t);
      pf.call(this, p);
      vf.call(this, r);
    },
    Hs = P(Qs, 'flash.text.TextFormat'),
    Gs = function(a) {
      var b = Pn(Qs);
      Qe(b, a);
      return b;
    },
    Ps = function(a) {
      if (!cf.call(this, a)) throw J(2008, 'align');
    };
  Object.defineProperties(Qs.prototype, {
    align: { get: bf, set: Ps },
    blockIndent: { get: df, set: ef },
    bold: { get: ff, set: gf },
    bullet: { get: hf, set: jf },
    color: { get: kf, set: lf },
    font: { get: mf, set: nf },
    indent: { get: of, set: pf },
    italic: { get: qf, set: rf },
    kerning: { get: sf, set: tf },
    leading: { get: uf, set: vf },
    leftMargin: { get: wf, set: xf },
    letterSpacing: { get: yf, set: zf },
    rightMargin: { get: Af, set: Bf },
    size: { get: Cf, set: Df },
    tabStops: {
      get: Gf,
      set: function(a) {
        a = Q(a, Array);
        Hf.call(this, a);
      },
    },
    target: { get: Ef, set: Ff },
    underline: { get: If, set: Jf },
    url: { get: Kf, set: Lf },
  });
  var Rs = P(function() {}, 'flash.text.TextFormatAlign');
  O(Rs, 'CENTER', 'center');
  O(Rs, 'END', 'end');
  O(Rs, 'JUSTIFY', 'justify');
  O(Rs, 'LEFT', 'left');
  O(Rs, 'RIGHT', 'right');
  O(Rs, 'START', 'start');
  var Is = function(a, b, c, d, e, f) {
    R(this, 'ascent', 'Number', d);
    R(this, 'descent', 'Number', e);
    R(this, 'height', 'Number', c);
    R(this, 'leading', 'Number', f);
    R(this, 'width', 'Number', b);
    R(this, 'x', 'Number', a);
  };
  P(Is, 'flash.text.TextLineMetrics');
  var Ss = function(a, b, c, d, e, f) {
      a = io(a, '_serif');
      b = io(b, 'normal');
      c = io(c, 'normal');
      d = io(d, 'device');
      e = io(e, 'cff');
      f = io(f, 'horizontalStem');
      R(this, 'cffHinting', 'String', f);
      R(this, 'fontLookup', 'String', d);
      R(this, 'fontName', 'String', a);
      R(this, 'fontPosture', 'String', c);
      R(this, 'fontWeight', 'String', b);
      R(this, 'locked', 'Boolean', !1);
      R(this, 'renderingMode', 'String', e);
    },
    Ts = P(Ss, 'flash.text.engine.FontDescription');
  Ss.prototype.clone = function() {
    return new Ss(
      this.fontName,
      this.fontWeight,
      this.fontPosture,
      this.fontLookup,
      this.renderingMode,
      this.ccfHinting
    );
  };
  Ts.isDeviceFontCompatible = function() {
    S(this, 'isDeviceFontCompatible');
    return !1;
  };
  Ts.isFontCompatible = function() {
    S(this, 'isFontCompatible');
    return !1;
  };
  var Us = P(function() {}, 'flash.text.engine.FontPosture');
  Object.defineProperty(Us, 'ITALIC', { value: 'italic' });
  Object.defineProperty(Us, 'NORMAL', { value: 'normal' });
  var Vs = P(function() {}, 'flash.text.engine.FontWeight');
  Object.defineProperty(Vs, 'BOLD', { value: 'bold' });
  Object.defineProperty(Vs, 'NORMAL', { value: 'normal' });
  var Ws = function() {
      X.call(this);
      R(this, 'builtInItems', 'flash.ui.ContextMenuBuiltInItems', null);
      R(this, 'clipboardItems', 'flash.ui.ContextMenuClipboardItems', null);
      R(this, 'clipboardMenu', 'Boolean', !1);
      R(this, 'customItems', 'Array', []);
      R(this, 'link', 'flash.net.URLRequest', null);
    },
    Xs = P(Ws, 'flash.ui.ContextMenu', qq);
  Object.defineProperty(Xs, 'isSupported', { value: !1 });
  Ws.prototype.clone = function() {
    return new Ws();
  };
  Ws.prototype.hideBuiltInItems = function() {
    S(this, 'hideBuiltInItems');
  };
  var Ys = function(a, b, c, d) {
      X.call(this);
      a = String(a);
      b = !!b;
      d = !l(d) || !!d;
      R(this, 'caption', 'String', a);
      R(this, 'separatorBefore', 'Boolean', b);
      R(this, 'visible', 'Boolean', d);
    },
    Zs = P(Ys, 'flash.ui.ContextMenuItem', rq);
  Ys.prototype.clone = function() {
    return new Ys(
      this.caption,
      this.separatorBefore,
      this.enabled,
      this.visible
    );
  };
  Zs.systemClearMenuItem = function() {
    S(this, 'systemClearMenuItem');
    return null;
  };
  Zs.systemCopyLinkMenuItem = function() {
    S(this, 'systemCopyLinkMenuItem');
    return null;
  };
  Zs.systemCopyMenuItem = function() {
    S(this, 'systemCopyMenuItem');
    return null;
  };
  Zs.systemCutMenuItem = function() {
    S(this, 'systemCutMenuItem');
    return null;
  };
  Zs.systemOpenLinkMenuItem = function() {
    S(this, 'systemOpenLinkMenuItem');
    return null;
  };
  Zs.systemPasteMenuItem = function() {
    S(this, 'systemPasteMenuItem');
    return null;
  };
  Zs.systemSelectAllMenuItem = function() {
    S(this, 'systemSelectAllMenuItem');
    return null;
  };
  var $s = P(function() {}, 'flash.ui.Keyboard');
  O($s, 'capsLock', !1);
  O($s, 'hasVirtualKeyboard', !1);
  O($s, 'numLock', !1);
  O($s, 'physicalKeyboardType', 'alphanumeric');
  $s.isAccessible = function() {
    S(this, 'isAccessible');
    return !1;
  };
  var at = ['Up', 'Down', 'Left', 'Right'],
    bt = 'Insert Delete Home Begin End PgUp PgDn PrntScrn ScrlLck Pause SysReq Break Reset Stop Menu User Sys Print ClrLn ClrDsp InsLn DelLn InsChr DelChr Prev Next Select Exec Undo Redo Find Help ModeSw'.split(
      ' '
    ),
    ct = {
      PgUp: 'PAGEUP',
      PgDn: 'PAGEDOWN',
      PrntScrn: 'PRINTSCREEN',
      ScrlLck: 'SCROLLLOCK',
      Sys: 'SYSTEM',
      ClrLn: 'CLEARLINE',
      ClrDsp: 'CLEARDISPLAY',
      InsLn: 'INSERTLINE',
      DelLn: 'DELETELINE',
      InsChr: 'INSERTCHAR',
      DelChr: 'DELETECHAR',
      Exec: 'EXECUTE',
      ModeSw: 'MODESWITCH',
    },
    dt = 'RED GREEN YELLOW BLUE CHANNEL_UP CHANNEL_DOWN RECORD PLAY PAUSE STOP FAST_FORWARD REWIND SKIP_FORWARD SKIP_BACKWARD NEXT PREVIOUS LIVE LAST MENU INFO GUIDE EXIT BACK AUDIO SUBTITLE DVR VOD INPUT SETUP HELP MASTER_SHELL SEARCH'.split(
      ' '
    ),
    et = {
      BACKSPACE: 8,
      TAB: 9,
      ENTER: 13,
      COMMAND: 15,
      SHIFT: 16,
      CONTROL: 17,
      ALTERNATE: 18,
      CAPS_LOCK: 20,
      NUMPAD: 21,
      ESCAPE: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      INSERT: 45,
      DELETE: 46,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_ADD: 107,
      NUMPAD_ENTER: 108,
      NUMPAD_SUBTRACT: 109,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      SEMICOLON: 186,
      EQUAL: 187,
      COMMA: 188,
      MINUS: 189,
      PERIOD: 190,
      SLASH: 191,
      BACKQUOTE: 192,
      LEFTBRACKET: 219,
      BACKSLASH: 220,
      RIGHTBRACKET: 221,
      QUOTE: 222,
    },
    ft = [];
  O($s, 'CharCodeStrings', ft);
  var gt = function(a, b, c) {
      ft.push(b);
      O($s, 'KEYNAME_' + a, b);
      O($s, 'STRING_' + a, String.fromCharCode(c));
    },
    ht;
  for (ht = 65; 90 >= ht; ++ht) O($s, String.fromCharCode(ht), ht);
  for (ht = 0; 9 >= ht; ++ht)
    O($s, 'NUMBER_' + ht, 48 + ht), O($s, 'NUMPAD_' + ht, 96 + ht);
  for (ht = 0; ht < dt.length; ++ht) O($s, dt[ht], 16777216 + ht);
  for (var it in et) O($s, it, et[it]);
  for (ht = 0; ht < at.length; ++ht) {
    var jt = at[ht];
    gt(jt.toUpperCase() + 'ARROW', jt, 63232 + ht);
  }
  for (ht = 1; 35 >= ht; ++ht) {
    var kt = 'F' + ht;
    gt(kt, kt, 63235 + ht);
    15 >= ht && O($s, kt, 111 + ht);
  }
  for (ht = 0; ht < bt.length; ++ht) {
    var lt = bt[ht];
    gt(ct[lt] || lt.toUpperCase(), lt, 63271 + ht);
  }
  var mt = P(function() {}, 'flash.utils.CompressionAlgorithm');
  Object.defineProperties(mt, {
    DEFLATE: { value: 'deflate' },
    ZLIB: { value: 'zlib' },
  });
  var nt = {};
  var Ho = function() {
      this.Bq = {};
    },
    Go = null;
  Ho.prototype.Pa = function(a) {
    var b = this.Bq[a];
    b ||
      ((b = '@' === a.charAt(0)) && (a = a.substring(1)),
      (b = this.Bq[a] = Eo('', a, b)));
    return b;
  };
  Ho.prototype.yo = function(a, b, c) {
    var d = c ? Cn : b.__swiffy_baseclass;
    if (!d) return null;
    for (var e = [], f = d; f; f = f.__swiffy_baseclass)
      a.ne(this.Pa('extendsClass')).bc(this.Pa('@type'), f.__swiffy_name.Ra()),
        (e[f.__swiffy_typeid] = !0);
    if (!c) {
      e[b.__swiffy_typeid] = !0;
      b = b.__swiffy_if;
      for (var h in b)
        e[h] ||
          ((c = b[h]),
          a
            .ne(this.Pa('implementsInterface'))
            .bc(this.Pa('@type'), c.__swiffy_name.Ra()));
    }
    return d;
  };
  Ho.prototype.Lt = function(a, b) {
    for (var c in b.traits)
      if (!(0 <= c.indexOf('.'))) {
        var d = b.traits[c],
          e;
        d instanceof un
          ? ((e = a.ne(this.Pa('accessor'))),
            d.Kc && d.fe
              ? e.bc(this.Pa('@access'), 'readwrite')
              : d.Kc
              ? e.bc(this.Pa('@access'), 'readonly')
              : d.fe && e.bc(this.Pa('@access'), 'writeonly'))
          : (e =
              d instanceof on
                ? a.ne(this.Pa('method'))
                : d.gt
                ? a.ne(this.Pa('constant'))
                : a.ne(this.Pa('variable')));
        e.bc(this.Pa('@name'), c);
      }
  };
  var Rm = function() {
    Object.defineProperty(this, '__swiffy_v', { value: {} });
  };
  P(Rm, 'flash.utils.Dictionary');
  var ot = 0,
    pt = function(a, b) {
      this.key = fa(a) && /^[0-9]+$/.test(a) ? parseInt(a, 10) : a;
      this.value = b;
    },
    qt = function(a) {
      if (!a.pa && !a.uri)
        switch (((a = a.localName), typeof a)) {
          case 'object':
            if (null === a) return '_null';
          case 'function':
            var b = a.__swiffy_dic_key;
            b || (a.__swiffy_dic_key = b = ++ot);
            return b;
          default:
            return '_' + a;
        }
    };
  Object.defineProperty(Rm.prototype, 'toJSON', {
    value: function(a) {
      return (a = String(a));
    },
    writable: !0,
    configurable: !0,
  });
  Object.defineProperty(Rm.prototype, '__swiffy_proxy', {
    value: {
      Af: function(a, b) {
        var c = qt(a);
        if (c)
          return (
            (c = (c = this.__swiffy_v[c]) && c.value),
            $m(c, a),
            c.apply(this, b)
          );
        throw J(1069, a.Ra(), 'flash.utils.Dictionary');
      },
      dc: function(a) {
        return (a = qt(a)) ? delete this.__swiffy_v[a] : !1;
      },
      Ie: function(a) {
        var b = qt(a);
        if (b) return (a = this.__swiffy_v[b]) && a.value;
        throw J(1069, a.Ra(), 'flash.utils.Dictionary');
      },
      Qe: function(a) {
        return (a = qt(a)) ? a in this.__swiffy_v : !1;
      },
      dg: function(a) {
        var b = this.__swiffy_v;
        return b[Object.keys(b)[a - 1]].key;
      },
      We: function(a) {
        var b = this.__swiffy_v;
        return a++ < Object.keys(b).length ? a : 0;
      },
      fg: function(a) {
        var b = this.__swiffy_v;
        return b[Object.keys(b)[a - 1]].value;
      },
      setProperty: function(a, b) {
        var c = qt(a);
        if (c) this.__swiffy_v[c] = new pt(a.localName, b);
        else throw J(1056, a.Ra(), 'flash.utils.Dictionary');
      },
    },
  });
  var Pr = P(function() {}, 'flash.utils.Endian');
  Object.defineProperty(Pr, 'BIG_ENDIAN', { value: 'bigEndian' });
  Object.defineProperty(Pr, 'LITTLE_ENDIAN', { value: 'littleEndian' });
  var Rr = function() {
      Object.defineProperty(this, '__swiffy_v', {
        value: { B: new DataView(new ArrayBuffer(0)), position: 0, sb: !1 },
      });
      R(this, 'objectEncoding', 'uint', 0);
      R(this, 'shareable', 'Boolean', !1);
    },
    Z = function(a) {
      return a.__swiffy_v;
    },
    or = P(Rr, 'flash.utils.ByteArray');
  M(or, 'bytesAvailable', function() {
    var a = Z(this);
    return Math.max(0, a.B.byteLength - a.position);
  });
  M(or, 'endian', function() {
    return Z(this).sb ? 'littleEndian' : 'bigEndian';
  });
  N(or, 'endian', function(a) {
    xo(a, 'endian');
    a = String(a);
    var b = Z(this);
    if ('littleEndian' === a) b.sb = !0;
    else if ('bigEndian' === a) b.sb = !1;
    else throw J(2008, 'type');
  });
  M(or, 'position', function() {
    return Z(this).position;
  });
  N(or, 'position', function(a) {
    Z(this).position = a >>> 0;
  });
  M(or, 'length', function() {
    return Z(this).B.byteLength;
  });
  N(or, 'length', function(a) {
    a >>>= 0;
    var b = Z(this);
    rt(b, a);
    b.position > a && (b.position = a);
  });
  var rt = function(a, b) {
      var c = a.B;
      if (b > c.buffer.byteLength) {
        var d = new Uint8Array(b + (b >> 3) + (9 > b ? 3 : 6));
        d.set(new Uint8Array(c.buffer));
        a.B = new DataView(d.buffer, 0, b);
      } else b !== c.byteLength && (a.B = new DataView(c.buffer, 0, b));
    },
    st = function(a, b) {
      var c = a.position;
      if (c + b > a.B.byteLength) throw J(2030);
      a.position = c + b;
      return c;
    },
    tt = function(a, b) {
      var c = a.position,
        d = c + b;
      d > a.B.byteLength && rt(a, d);
      a.position = c + b;
      return c;
    },
    Qr = function(a, b) {
      var c = Z(a),
        d = tt(c, b);
      return new Uint8Array(c.B.buffer, d, b);
    };
  Object.defineProperty(or, 'defaultObjectEncoding', { value: 0 });
  Object.defineProperty(Rr.prototype, '__swiffy_proxy', {
    value: {
      Ie: function(a) {
        a = a.Rg(1069, this);
        var b = Z(this).B;
        return a < b.byteLength ? b.getUint8(a) : void 0;
      },
      Qe: function(a) {
        return a.oc() < Z(this).B.byteLength;
      },
      setProperty: function(a, b) {
        var c = a.Rg(1056, this);
        b |= 0;
        var d = Z(this),
          e = c + 1;
        e > d.B.byteLength && rt(d, e);
        d.B.setUint8(c, b);
      },
    },
  });
  Rr.prototype.atomicCompareAndSwapIntAt = function(a, b, c) {
    a |= 0;
    b |= 0;
    c |= 0;
    var d = this.position;
    try {
      this.position = a;
      var e = this.readInt();
      e == b && ((this.position = a), this.writeInt(c));
      return e;
    } finally {
      this.position = d;
    }
  };
  Rr.prototype.atomicCompareAndSwapLength = function(a, b) {
    var c = this.length;
    c == (a | 0) && (this.length = b | 0);
    return c;
  };
  Rr.prototype.clear = function() {
    var a = Z(this);
    a.B = new DataView(new ArrayBuffer(0));
    a.position = 0;
  };
  Rr.prototype.compress = function() {
    S(this, 'compress');
  };
  Rr.prototype.deflate = function() {
    S(this, 'deflate');
  };
  Rr.prototype.inflate = function() {
    this.uncompress('deflate');
  };
  Rr.prototype.readBoolean = function() {
    var a = Z(this),
      b = st(a, 1);
    return !!a.B.getUint8(b);
  };
  Rr.prototype.readByte = function() {
    var a = Z(this),
      b = st(a, 1);
    return a.B.getInt8(b);
  };
  Rr.prototype.readBytes = function(a, b, c) {
    a = Q(a, or);
    b >>>= 0;
    c >>>= 0;
    if (0 == c) {
      var d = Z(this),
        d = d.B.byteLength - d.position;
      0 < d && (c = d);
    }
    var d = c,
      e = Z(this),
      f = st(e, d),
      d = new Uint8Array(e.B.buffer, f, d);
    a = Z(a);
    e = b + c;
    e > a.B.byteLength && rt(a, e);
    new Uint8Array(a.B.buffer, b, c).set(d);
  };
  Rr.prototype.readDouble = function() {
    var a = Z(this),
      b = st(a, 8);
    return a.B.getFloat64(b, a.sb);
  };
  Rr.prototype.readFloat = function() {
    var a = Z(this),
      b = st(a, 4);
    return a.B.getFloat32(b, a.sb);
  };
  Rr.prototype.readInt = function() {
    var a = Z(this),
      b = st(a, 4);
    return a.B.getInt32(b, a.sb);
  };
  Rr.prototype.readMultiByte = function() {
    S(this, 'readMultiByte');
    return '';
  };
  Rr.prototype.readObject = function() {
    S(this, 'readObject');
  };
  Rr.prototype.readShort = function() {
    var a = Z(this),
      b = st(a, 2);
    return a.B.getInt16(b, a.sb);
  };
  Rr.prototype.readUnsignedByte = function() {
    var a = Z(this),
      b = st(a, 1);
    return a.B.getUint8(b);
  };
  Rr.prototype.readUnsignedInt = function() {
    var a = Z(this),
      b = st(a, 4);
    return a.B.getUint32(b, a.sb);
  };
  Rr.prototype.readUnsignedShort = function() {
    var a = Z(this),
      b = st(a, 2);
    return a.B.getUint16(b, a.sb);
  };
  var ut = function(a, b) {
    if (0 == b) return '';
    for (var c = st(a, b), d = [], e = 0; e < b; ++e, ++c)
      d.push(a.B.getUint8(c));
    return Hi(escape(String.fromCharCode.apply(String, d)));
  };
  Rr.prototype.readUTF = function() {
    var a = Z(this),
      b = st(a, 2),
      b = a.B.getUint16(b, a.sb);
    return ut(a, b);
  };
  Rr.prototype.readUTFBytes = function(a) {
    return ut(Z(this), a >>> 0);
  };
  Rr.prototype.toJSON = function() {
    return 'ByteArray';
  };
  Rr.prototype.uncompress = function(a) {
    a = io(a, 'zlib');
    xo(a, 'algorithm');
    a = nt[a];
    if (!a) throw J(2058);
    var b = Z(this);
    if (b.B.byteLength) {
      var c = new Uint8Array(b.B.byteLength + 1);
      c.set(new Uint8Array(b.B.buffer, 0, b.B.byteLength));
      try {
        var d = a(c);
        b.B = new DataView(d.buffer, 0, d.length);
        b.position = 0;
      } catch (e) {
        throw J(2058);
      }
    }
  };
  Rr.prototype.writeBoolean = function(a) {
    a = !!a;
    var b = Z(this),
      c = tt(b, 1);
    b.B.setUint8(c, a ? 1 : 0);
  };
  Rr.prototype.writeByte = function(a) {
    a |= 0;
    var b = Z(this),
      c = tt(b, 1);
    b.B.setInt8(c, a);
  };
  Rr.prototype.writeBytes = function(a, b, c) {
    a = Q(a, or);
    b >>>= 0;
    c >>>= 0;
    a = Z(a).B;
    var d = a.byteLength;
    if (b > d || b + c > d) throw J(2006);
    0 == c && (c = d - b);
    Qr(this, c).set(new Uint8Array(a.buffer, b, c));
  };
  Rr.prototype.writeDouble = function(a) {
    a = +a;
    var b = Z(this),
      c = tt(b, 8);
    b.B.setFloat64(c, a, b.sb);
  };
  Rr.prototype.writeFloat = function(a) {
    a = +a;
    var b = Z(this),
      c = tt(b, 4);
    b.B.setFloat32(c, a, b.sb);
  };
  Rr.prototype.writeInt = function(a) {
    a |= 0;
    var b = Z(this),
      c = tt(b, 4);
    b.B.setInt32(c, a, b.sb);
  };
  Rr.prototype.writeMultiByte = function() {
    S(this, 'writeMultiByte');
  };
  Rr.prototype.writeObject = function() {
    S(this, 'writeObject');
  };
  Rr.prototype.writeShort = function(a) {
    a |= 0;
    var b = Z(this),
      c = tt(b, 2);
    b.B.setInt16(c, a, b.sb);
  };
  Rr.prototype.writeUnsignedInt = function(a) {
    a >>>= 0;
    var b = Z(this),
      c = tt(b, 4);
    b.B.setUint32(c, a, b.sb);
  };
  Rr.prototype.writeUTF = function(a) {
    a = String(a);
    a = unescape(encodeURIComponent(a));
    var b = a.length;
    if (65535 < b) throw J(2006);
    var c = Z(this),
      d = tt(c, b + 2);
    c.B.setUint16(d, b, c.sb);
    for (var d = d + 2, e = 0; e < b; ++e, ++d)
      c.B.setUint8(d, a.charCodeAt(e));
  };
  Rr.prototype.writeUTFBytes = function(a) {
    a = String(a);
    a = unescape(encodeURIComponent(a));
    for (var b = a.length, c = Z(this), d = tt(c, b), e = 0; e < b; ++e, ++d)
      c.B.setUint8(d, a.charCodeAt(e));
  };
  var vt = function() {};
  P(vt, 'flash.utils.Proxy');
  Nm(
    'flash.utils.flash_proxy',
    new go(void 0, 'http://www.adobe.com/2006/actionscript/flash/proxy')
  );
  Nm(
    Om('http://www.adobe.com/2006/actionscript/flash/proxy', 'isAttribute'),
    function(a) {
      return a instanceof Pm && a.__swiffy_v.pa;
    }
  );
  var wt = function(a) {
    var b = a.localName;
    return a.pa || a.uri || !ha(b) ? new Pm(a) : String(b);
  };
  Object.defineProperty(vt.prototype, '__swiffy_proxy', {
    value: {
      Af: function(a, b) {
        a = wt(a);
        return this[
          Om(
            'http://www.adobe.com/2006/actionscript/flash/proxy',
            'callProperty'
          )
        ].apply(this, [a].concat(b));
      },
      dc: function(a) {
        a = wt(a);
        return this[
          Om(
            'http://www.adobe.com/2006/actionscript/flash/proxy',
            'deleteProperty'
          )
        ].call(this, a);
      },
      hj: function(a) {
        a = wt(a);
        return this[
          Om(
            'http://www.adobe.com/2006/actionscript/flash/proxy',
            'getDescendants'
          )
        ].call(this, a);
      },
      Ie: function(a) {
        a = wt(a);
        return this[
          Om(
            'http://www.adobe.com/2006/actionscript/flash/proxy',
            'getProperty'
          )
        ].call(this, a);
      },
      Qe: function(a) {
        a = a.Ra();
        return this[
          Om(
            'http://www.adobe.com/2006/actionscript/flash/proxy',
            'hasProperty'
          )
        ].call(this, a);
      },
      dg: function(a) {
        return this[
          Om('http://www.adobe.com/2006/actionscript/flash/proxy', 'nextName')
        ].call(this, a | 0);
      },
      We: function(a) {
        return this[
          Om(
            'http://www.adobe.com/2006/actionscript/flash/proxy',
            'nextNameIndex'
          )
        ].call(this, a | 0);
      },
      fg: function(a) {
        return this[
          Om('http://www.adobe.com/2006/actionscript/flash/proxy', 'nextValue')
        ].call(this, a | 0);
      },
      setProperty: function(a, b) {
        a = wt(a);
        this[
          Om(
            'http://www.adobe.com/2006/actionscript/flash/proxy',
            'setProperty'
          )
        ].call(this, a, b);
      },
    },
  });
  var xt = function(a, b) {
    Object.defineProperty(
      vt.prototype,
      Om('http://www.adobe.com/2006/actionscript/flash/proxy', a),
      {
        value: function() {
          throw J(b, a);
        },
      }
    );
  };
  xt('callProperty', 2090);
  xt('deleteProperty', 2092);
  xt('getDescendants', 2093);
  xt('getProperty', 2088);
  xt('hasProperty', 2091);
  xt('setProperty', 2089);
  xt('nextNameIndex', 2105);
  xt('nextName', 2106);
  xt('nextValue', 2107);
  var yt = function(a) {
      return a.__swiffy_v;
    },
    zt = P(
      function(a, b) {
        X.call(this);
        var c = yt(this);
        c.bn = null;
        c.Yj = !1;
        c.vo = +a;
        c.Zq = b | 0;
        c.Ji = 0;
      },
      'flash.utils.Timer',
      X
    );
  M(zt, 'delay', function() {
    return yt(this).vo;
  });
  N(zt, 'delay', function(a) {
    yt(this).vo = +a;
  });
  M(zt, 'repeatCount', function() {
    return yt(this).Zq;
  });
  N(zt, 'repeatCount', function(a) {
    yt(this).Zq = a | 0;
  });
  M(zt, 'running', function() {
    return yt(this).Yj;
  });
  M(zt, 'currentCount', function() {
    return yt(this).Ji;
  });
  K(zt, 'start', function() {
    var a = yt(this);
    if (!a.Yj) {
      var b = this;
      a.bn = Ah(function() {
        a.Ji++;
        b.dispatchEvent(Xn.call(Mq, Nq.TIMER, !1, !1));
        var c = b.repeatCount;
        c &&
          a.Ji >= c &&
          (b.stop(), b.dispatchEvent(Xn.call(Mq, Nq.TIMER_COMPLETE, !1, !1)));
      }, this.delay);
      a.Yj = !0;
    }
  });
  K(zt, 'stop', function() {
    var a = yt(this);
    Ch(a.bn);
    a.Yj = !1;
    a.bn = null;
  });
  K(zt, 'reset', function() {
    this.stop();
    yt(this).Ji = 0;
  });
})();
