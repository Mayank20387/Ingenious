import { c as createCommonjsModule, g as getDefaultExportFromCjs, r as react, o as objectAssign } from '../common/index-52176fc1.js';
import { m as murmur2, a as memoize$6, u as unitlessKeys } from '../common/memoize.browser.esm-1fa6c8a7.js';
import { l as lodash_mergewith } from '../common/index-0df76ae7.js';

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var inheritsLoose = createCommonjsModule(function (module) {
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}

module.exports = _inheritsLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _inheritsLoose = /*@__PURE__*/getDefaultExportFromCjs(inheritsLoose);

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler
var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};
var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};

var createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new stylis_min(stylisOptions);

  var inserted = {}; // $FlowFixMe

  var container;

  {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};

var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = memoize$6(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        }

        break;
      }
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {

      styles += strings[i];
    }
  }


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

var EmotionCacheContext = react.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? createCache() : null);
var ThemeContext = react.createContext({});
var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  var render = function render(props, ref) {
    return react.createElement(EmotionCacheContext.Consumer, null, function (cache) {
      return func(props, cache, ref);
    });
  }; // $FlowFixMe


  return react.forwardRef(render);
};
var Global =
/* #__PURE__ */
withEmotionCache(function (props, cache) {

  var styles = props.styles;

  if (typeof styles === 'function') {
    return react.createElement(ThemeContext.Consumer, null, function (theme) {
      var serialized = serializeStyles([styles(theme)]);
      return react.createElement(InnerGlobal, {
        serialized: serialized,
        cache: cache
      });
    });
  }

  var serialized = serializeStyles([styles]);
  return react.createElement(InnerGlobal, {
    serialized: serialized,
    cache: cache
  });
});

// maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag
var InnerGlobal =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InnerGlobal, _React$Component);

  function InnerGlobal(props, context, updater) {
    return _React$Component.call(this, props, context, updater) || this;
  }

  var _proto = InnerGlobal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.sheet = new StyleSheet({
      key: this.props.cache.key + "-global",
      nonce: this.props.cache.sheet.nonce,
      container: this.props.cache.sheet.container
    }); // $FlowFixMe

    var node = document.querySelector("style[data-emotion-" + this.props.cache.key + "=\"" + this.props.serialized.name + "\"]");

    if (node !== null) {
      this.sheet.tags.push(node);
    }

    if (this.props.cache.sheet.tags.length) {
      this.sheet.before = this.props.cache.sheet.tags[0];
    }

    this.insertStyles();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.serialized.name !== this.props.serialized.name) {
      this.insertStyles();
    }
  };

  _proto.insertStyles = function insertStyles$1() {
    if (this.props.serialized.next !== undefined) {
      // insert keyframes
      insertStyles(this.props.cache, this.props.serialized.next, true);
    }

    if (this.sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = this.sheet.tags[this.sheet.tags.length - 1].nextElementSibling;
      this.sheet.before = element;
      this.sheet.flush();
    }

    this.props.cache.insert("", this.props.serialized, this.sheet, false);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.sheet.flush();
  };

  _proto.render = function render() {

    return null;
  };

  return InnerGlobal;
}(react.Component);

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = withEmotionCache(function (props, context) {
  return react.createElement(ThemeContext.Consumer, null, function (theme) {
    var hasRendered = false;

    var css = function css() {
      if (hasRendered && "production" !== 'production') {
        throw new Error('css can only be used during render');
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var serialized = serializeStyles(args, context.registered);

      {
        insertStyles(context, serialized, false);
      }

      return context.key + "-" + serialized.name;
    };

    var cx = function cx() {
      if (hasRendered && "production" !== 'production') {
        throw new Error('cx can only be used during render');
      }

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return merge(context.registered, css, classnames(args));
    };

    var content = {
      css: css,
      cx: cx,
      theme: theme
    };
    var ele = props.children(content);
    hasRendered = true;

    return ele;
  });
});

var CSSReset = () => /*#__PURE__*/react.createElement(Global, {
  styles: "\n      html {\n        line-height: 1.5;\n        -webkit-text-size-adjust: 100%;\n        font-family: system-ui, sans-serif;\n        -webkit-font-smoothing: antialiased;\n        text-rendering: optimizeLegibility;      \n        -moz-osx-font-smoothing: grayscale; \n        touch-action: manipulation; \n      }\n\n      body {\n        position: relative;\n        min-height: 100%;\n        font-feature-settings: 'kern';\n      }\n\n      *,\n      *::before,\n      *::after {\n        border-width: 0;\n        border-style: solid;\n        box-sizing: border-box;\n      }\n\n      main {\n        display: block;\n      }\n\n      hr {\n        border-top-width: 1px;\n        box-sizing: content-box;\n        height: 0;\n        overflow: visible;\n      }\n\n      pre,\n      code,\n      kbd,\n      samp {\n        font-family: SFMono-Regular,  Menlo, Monaco, Consolas, monospace;\n        font-size: 1em;\n      }\n\n      a {\n        background-color: transparent;\n        color: inherit;\n        text-decoration: inherit;\n      }\n\n      abbr[title] {\n        border-bottom: none;\n        text-decoration: underline;\n        -webkit-text-decoration: underline dotted;\n        text-decoration: underline dotted;\n      }\n\n      b,\n      strong {\n        font-weight: bold;\n      }\n\n      small {\n        font-size: 80%;\n      }\n\n      sub,\n      sup {\n        font-size: 75%;\n        line-height: 0;\n        position: relative;\n        vertical-align: baseline;\n      }\n\n      sub {\n        bottom: -0.25em;\n      }\n\n      sup {\n        top: -0.5em;\n      }\n\n      img {\n        border-style: none;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        font-family: inherit;\n        font-size: 100%;\n        line-height: 1.15;\n        margin: 0;\n      }\n\n      button,\n      input {\n        overflow: visible;\n      }\n\n      button,\n      select {\n        text-transform: none;\n      }\n\n      button::-moz-focus-inner,\n      [type=\"button\"]::-moz-focus-inner,\n      [type=\"reset\"]::-moz-focus-inner,\n      [type=\"submit\"]::-moz-focus-inner {\n        border-style: none;\n        padding: 0;\n      }\n\n      fieldset {\n        padding: 0.35em 0.75em 0.625em;\n      }\n\n      legend {\n        box-sizing: border-box;\n        color: inherit;\n        display: table;\n        max-width: 100%;\n        padding: 0;\n        white-space: normal;\n      }\n\n      progress {\n        vertical-align: baseline;\n      }\n\n      textarea {\n        overflow: auto;\n      }\n\n      [type=\"checkbox\"],\n      [type=\"radio\"] {\n        box-sizing: border-box;\n        padding: 0;\n      }\n\n      [type=\"number\"]::-webkit-inner-spin-button,\n      [type=\"number\"]::-webkit-outer-spin-button {\n        -webkit-appearance: none !important;\n      }\n\n      input[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n\n      [type=\"search\"] {\n        -webkit-appearance: textfield;\n        outline-offset: -2px;\n      }\n\n      [type=\"search\"]::-webkit-search-decoration {\n        -webkit-appearance: none !important;\n      }\n\n      ::-webkit-file-upload-button {\n        -webkit-appearance: button;\n        font: inherit;\n      }\n\n      details {\n        display: block;\n      }\n\n      summary {\n        display: list-item;\n      }\n\n      template {\n        display: none;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      body,\n      blockquote,\n      dl,\n      dd,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6,\n      hr,\n      figure,\n      p,\n      pre {\n        margin: 0;\n      }\n\n      button {\n        background: transparent;\n        padding: 0;\n      }\n\n      fieldset {\n        margin: 0;\n        padding: 0;\n      }\n\n      ol,\n      ul {\n        margin: 0;\n        padding: 0;\n      }\n\n      textarea {\n        resize: vertical;\n      }\n\n      button,\n      [role=\"button\"] {\n        cursor: pointer;\n      }\n\n      button::-moz-focus-inner {\n        border: 0 !important;\n      }\n\n      table {\n        border-collapse: collapse;\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-size: inherit;\n        font-weight: inherit;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        padding: 0;\n        line-height: inherit;\n        color: inherit;\n      }\n\n      img,\n      svg,\n      video,\n      canvas,\n      audio,\n      iframe,\n      embed,\n      object {\n        display: block;\n        vertical-align: middle;\n      }\n\n      img,\n      video {\n        max-width: 100%;\n        height: auto;\n      }\n\n      [data-js-focus-visible] :focus:not([data-focus-visible-added]) {\n        outline: none;\n        box-shadow: none;\n      }\n\n      select::-ms-expand {\n        display: none;\n      }\n    "
});

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
function createContext(options) {
  if (options === void 0) {
    options = {};
  }

  var {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name
  } = options;
  var Context = /*#__PURE__*/react.createContext(undefined);
  Context.displayName = name;

  function useContext() {
    var context = react.useContext(Context);

    if (!context && strict) {
      throw new Error(errorMessage);
    }

    return context;
  }

  return [Context.Provider, useContext, Context];
}

var win;
/**
 * Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
 * hits a memory leak, whereas aliasing it and calling "typeof win" does not.
 * Caching the window value at the file scope lets us minimize the impact.
 *
 * @see IE11 Memory Leak Issue https://github.com/microsoft/fluentui/pull/9010#issuecomment-490768427
 */

try {
  win = window;
} catch (e) {
  /* no-op */
}
/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11.
 */


var getWindow = node => {
  var _node$ownerDocument$d, _node$ownerDocument;

  return (_node$ownerDocument$d = node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) != null ? _node$ownerDocument$d : win;
};
/**
 * Check if we can use the DOM. Useful for SSR purposes
 */

function checkIsBrowser() {
  var win = getWindow();
  return Boolean(typeof win !== "undefined" && win.document && win.document.createElement);
}

var isBrowser$1 = checkIsBrowser();

/**
 * useSafeLayoutEffect enables us to safely call `useLayoutEffect` on the browser
 * (for SSR reasons)
 *
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser.
 *
 * @see https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 */

var useSafeLayoutEffect = isBrowser$1 ? react.useLayoutEffect : react.useEffect;

function useUnmountEffect(fn, deps) {
  if (deps === void 0) {
    deps = [];
  }

  return react.useEffect(() => () => fn(), deps);
}

function useForceUpdate() {
  var unloadingRef = react.useRef(false);
  var [count, setCount] = react.useState(0);
  useUnmountEffect(() => {
    unloadingRef.current = true;
  });
  return react.useCallback(() => {
    if (!unloadingRef.current) {
      setCount(count + 1);
    }
  }, [count]);
}

var [PortalManagerContextProvider, usePortalManager] = createContext({
  strict: false,
  name: "PortalManagerContext"
});

/**
 * PortalManager
 *
 * Used to manage multiple portals within an application.
 * It must be render only once, at the root of your application.
 *
 * Inspired by BaseWeb's LayerManager component
 */
var PortalManager = props => {
  var {
    children,
    zIndex
  } = props;
  /**
   * The element that wraps the stacked layers
   */

  var ref = react.useRef(null);
  var forceUpdate = useForceUpdate();
  /**
   * force an update on mount so the Provider works correctly
   */

  useSafeLayoutEffect(() => {
    forceUpdate();
  }, []);
  /**
   * let's detect if use has mutiple instances of this component
   */

  var parentManager = usePortalManager();
  var context = {
    node: (parentManager == null ? void 0 : parentManager.node) || ref.current,
    zIndex
  };
  return /*#__PURE__*/react.createElement(PortalManagerContextProvider, {
    value: context
  }, children, /*#__PURE__*/react.createElement("div", {
    className: "chakra-portal-manager",
    ref: ref
  }));
};

// Number assertions
function isNumber(value) {
  return typeof value === "number";
}

function isArray(value) {
  return Array.isArray(value);
}

function isFunction(value) {
  return typeof value === "function";
} // Generic assertions

var isObject = value => {
  var type = typeof value;
  return value != null && (type === "object" || type === "function") && !isArray(value);
};
var isEmptyObject = value => isObject(value) && Object.keys(value).length === 0;

function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]";
} // Event assertions

function runIfFn(valueOrFn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
var noop = () => {};

var win$1;
/**
 * Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
 * hits a memory leak, whereas aliasing it and calling "typeof win" does not.
 * Caching the window value at the file scope lets us minimize the impact.
 *
 * @see IE11 Memory Leak Issue https://github.com/microsoft/fluentui/pull/9010#issuecomment-490768427
 */

try {
  win$1 = window;
} catch (e) {
  /* no-op */
}
/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11.
 */


var getWindow$1 = node => {
  var _node$ownerDocument$d, _node$ownerDocument;

  return (_node$ownerDocument$d = node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) != null ? _node$ownerDocument$d : win$1;
};
/**
 * Check if we can use the DOM. Useful for SSR purposes
 */

function checkIsBrowser$1() {
  var win = getWindow$1();
  return Boolean(typeof win !== "undefined" && win.document && win.document.createElement);
}

var isBrowser$2 = checkIsBrowser$1();

function getLastItem(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
/**
 * since breakpoints are defined as custom properties on an array, you may
 * `Object.keys(theme.breakpoints)` to retrieve both regular numeric indices
 * and custom breakpoints as string.
 *
 * This function returns true given a custom array property.
 */

var isCustomBreakpoint = maybeBreakpoint => Number.isNaN(parseInt(maybeBreakpoint, 10));

/**
 * Get value from a deeply nested object using a string path.
 * Memoizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */

function get(obj, path, fallback, index) {
  var key = typeof path === "string" ? path.split(".") : [path];

  for (index = 0; index < key.length; index += 1) {
    if (!obj) {
      break;
    }

    obj = obj[key[index]];
  }

  return obj === undefined ? fallback : obj;
}

var memoize = fn => {
  var cache = new WeakMap();

  var memoizedFn = (obj, path, fallback, index) => {
    if (!cache.has(obj)) {
      cache.set(obj, new Map());
    }

    var map = cache.get(obj);
    var key = typeof path === "string" ? path.split(".") : [path];

    if (map.has(key)) {
      return map.get(key);
    }

    var value = fn(obj, path, fallback, index);
    map.set(key, value);
    return value;
  };

  return memoizedFn;
};

var memoizedGet = memoize(get);
/**
 * Object.entries polyfill for Nodev10 compatibility
 */

var fromEntries = entries => entries.reduce((carry, _ref) => {
  var [key, value] = _ref;
  carry[key] = value;
  return carry;
}, {});

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
function createContext$1(options) {
  if (options === void 0) {
    options = {};
  }

  var {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name
  } = options;
  var Context = /*#__PURE__*/react.createContext(undefined);
  Context.displayName = name;

  function useContext() {
    var context = react.useContext(Context);

    if (!context && strict) {
      throw new Error(errorMessage);
    }

    return context;
  }

  return [Context.Provider, useContext, Context];
}

var breakpoints = Object.freeze(["base", "sm", "md", "lg", "xl"]);
function objectToArrayNotation(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints;
  }

  var result = bps.map(br => {
    var _obj$br;

    return (_obj$br = obj[br]) != null ? _obj$br : null;
  });

  while (getLastItem(result) === null) {
    result.pop();
  }

  return result;
}
function isResponsiveObjectLike(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints;
  }

  var keys = Object.keys(obj);
  return keys.length > 0 && keys.every(key => bps.includes(key));
}

var classNames = {
  light: "chakra-ui-light",
  dark: "chakra-ui-dark"
};

/**
 * SSR: Graceful fallback for the `body` element
 */
var mockBody = {
  classList: {
    add: noop,
    remove: noop
  }
};

var getBody = () => {
  return isBrowser$2 ? document.body : mockBody;
};
/**
 * Function to add/remove class from `body` based on color mode
 */


function syncBodyClassName(isDark) {
  var body = getBody();
  body.classList.add(isDark ? classNames.dark : classNames.light);
  body.classList.remove(isDark ? classNames.light : classNames.dark);
}
/**
 * Check if JS media query matches the query string passed
 */

function getMediaQuery(query) {
  var mediaQueryList = window.matchMedia == null ? void 0 : window.matchMedia(query);

  if (!mediaQueryList) {
    return undefined;
  }

  return !!mediaQueryList.media === mediaQueryList.matches;
}

var queries = {
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)"
};
function getColorScheme(fallback) {
  var _getMediaQuery;

  var isDark = (_getMediaQuery = getMediaQuery(queries.dark)) != null ? _getMediaQuery : fallback === "dark";
  return isDark ? "dark" : "light";
}
/**
 * Adds system os color mode listener, and run the callback
 * once preference changes
 */

function addListener(fn) {
  if (!("matchMedia" in window)) {
    return noop;
  }

  var mediaQueryList = window.matchMedia(queries.dark);

  var listener = () => {
    fn(mediaQueryList.matches ? "dark" : "light");
  };

  listener();
  mediaQueryList.addListener(listener);
  return () => {
    mediaQueryList.removeListener(listener);
  };
}
var root = {
  get: () => document.documentElement.style.getPropertyValue("--chakra-ui-color-mode"),
  set: mode => {
    if (isBrowser$2) {
      document.documentElement.style.setProperty("--chakra-ui-color-mode", mode);
    }
  }
};

var hasLocalStorage = typeof Storage !== "undefined";
var storageKey = "chakra-ui-color-mode";

/**
 * Simple object to handle read-write to localStorage
 */
var localStorageManager = {
  get(init) {
    if (!hasLocalStorage) {
      return init;
    }

    var maybeValue = window.localStorage.getItem(storageKey);
    return maybeValue != null ? maybeValue : init;
  },

  set(value) {
    if (hasLocalStorage) {
      window.localStorage.setItem(storageKey, value);
    }
  },

  type: "localStorage"
};

var ColorModeContext = /*#__PURE__*/react.createContext({});
/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */


var useColorMode = () => {
  var context = react.useContext(ColorModeContext);

  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }

  return context;
};

/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
function ColorModeProvider(props) {
  var {
    value,
    children,
    options: {
      useSystemColorMode,
      initialColorMode
    },
    colorModeManager = localStorageManager
  } = props;
  /**
   * Only attempt to retrieve if we're on the server. Else this will result
   * in a hydration mismatch warning and partially invalid visuals.
   *
   * Else fallback safely to `theme.config.initialColormode` (default light)
   */

  var [colorMode, rawSetColorMode] = react.useState(colorModeManager.type === "cookie" ? colorModeManager.get(initialColorMode) : initialColorMode);
  react.useEffect(() => {
    /**
     * Since we cannot initially retrieve localStorage to due above mentioned
     * reasons, do so after hydration.
     *
     * Priority:
     * - system color mode
     * - defined value on <ColorModeScript />, if present
     * - previously stored value
     */
    if (isBrowser$2 && colorModeManager.type === "localStorage") {
      var mode = useSystemColorMode ? getColorScheme(initialColorMode) : root.get() || colorModeManager.get();

      if (mode) {
        rawSetColorMode(mode);
      }
    }
  }, [colorModeManager, useSystemColorMode, initialColorMode]);
  react.useEffect(() => {
    var isDark = colorMode === "dark";
    syncBodyClassName(isDark);
    root.set(isDark ? "dark" : "light");
  }, [colorMode]);
  var setColorMode = react.useCallback(value => {
    colorModeManager.set(value);
    rawSetColorMode(value);
  }, [colorModeManager]);
  var toggleColorMode = react.useCallback(() => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  }, [colorMode, setColorMode]);
  react.useEffect(() => {
    var removeListener;

    if (useSystemColorMode) {
      removeListener = addListener(setColorMode);
    }

    return () => {
      if (removeListener && useSystemColorMode) {
        removeListener();
      }
    };
  }, [setColorMode, useSystemColorMode]); // presence of `value` indicates a controlled context

  var context = {
    colorMode: value != null ? value : colorMode,
    toggleColorMode: value ? noop : toggleColorMode,
    setColorMode: value ? noop : setColorMode
  };
  return /*#__PURE__*/react.createElement(ColorModeContext.Provider, {
    value: context
  }, children);
}

var merge$1 = function merge(a, b) {
  var result = objectAssign({}, a, b);

  for (var key in a) {
    var _assign;

    if (!a[key] || typeof b[key] !== 'object') continue;
    objectAssign(result, (_assign = {}, _assign[key] = objectAssign(a[key], b[key]), _assign));
  }

  return result;
}; // sort object-value responsive styles

var sort = function sort(obj) {
  var next = {};
  Object.keys(obj).sort(function (a, b) {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  }).forEach(function (key) {
    next[key] = obj[key];
  });
  return next;
};

var defaults = {
  breakpoints: [40, 52, 64].map(function (n) {
    return n + 'em';
  })
};

var createMediaQuery = function createMediaQuery(n) {
  return "@media screen and (min-width: " + n + ")";
};

var getValue = function getValue(n, scale) {
  return get$1(scale, n, n);
};

var get$1 = function get(obj, key, def, p, undef) {
  key = key && key.split ? key.split('.') : [key];

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }

  return obj === undef ? def : obj;
};
var createParser = function createParser(config) {
  var cache = {};

  var parse = function parse(props) {
    var styles = {};
    var shouldSort = false;
    var isCacheDisabled = props.theme && props.theme.disableStyledSystemCache;

    for (var key in props) {
      if (!config[key]) continue;
      var sx = config[key];
      var raw = props[key];
      var scale = get$1(props.theme, sx.scale, sx.defaults);

      if (typeof raw === 'object') {
        cache.breakpoints = !isCacheDisabled && cache.breakpoints || get$1(props.theme, 'breakpoints', defaults.breakpoints);

        if (Array.isArray(raw)) {
          cache.media = !isCacheDisabled && cache.media || [null].concat(cache.breakpoints.map(createMediaQuery));
          styles = merge$1(styles, parseResponsiveStyle(cache.media, sx, scale, raw, props));
          continue;
        }

        if (raw !== null) {
          styles = merge$1(styles, parseResponsiveObject(cache.breakpoints, sx, scale, raw, props));
          shouldSort = true;
        }

        continue;
      }

      objectAssign(styles, sx(raw, scale, props));
    } // sort object-based responsive styles


    if (shouldSort) {
      styles = sort(styles);
    }

    return styles;
  };

  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;
  var keys = Object.keys(config).filter(function (k) {
    return k !== 'config';
  });

  if (keys.length > 1) {
    keys.forEach(function (key) {
      var _createParser;

      parse[key] = createParser((_createParser = {}, _createParser[key] = config[key], _createParser));
    });
  }

  return parse;
};

var parseResponsiveStyle = function parseResponsiveStyle(mediaQueries, sx, scale, raw, _props) {
  var styles = {};
  raw.slice(0, mediaQueries.length).forEach(function (value, i) {
    var media = mediaQueries[i];
    var style = sx(value, scale, _props);

    if (!media) {
      objectAssign(styles, style);
    } else {
      var _assign2;

      objectAssign(styles, (_assign2 = {}, _assign2[media] = objectAssign({}, styles[media], style), _assign2));
    }
  });
  return styles;
};

var parseResponsiveObject = function parseResponsiveObject(breakpoints, sx, scale, raw, _props) {
  var styles = {};

  for (var key in raw) {
    var breakpoint = breakpoints[key];
    var value = raw[key];
    var style = sx(value, scale, _props);

    if (!breakpoint) {
      objectAssign(styles, style);
    } else {
      var _assign3;

      var media = createMediaQuery(breakpoint);
      objectAssign(styles, (_assign3 = {}, _assign3[media] = objectAssign({}, styles[media], style), _assign3));
    }
  }

  return styles;
};

var createStyleFunction = function createStyleFunction(_ref) {
  var properties = _ref.properties,
      property = _ref.property,
      scale = _ref.scale,
      _ref$transform = _ref.transform,
      transform = _ref$transform === void 0 ? getValue : _ref$transform,
      defaultScale = _ref.defaultScale;
  properties = properties || [property];

  var sx = function sx(value, scale, _props) {
    var result = {};
    var n = transform(value, scale, _props);
    if (n === null) return;
    properties.forEach(function (prop) {
      result[prop] = n;
    });
    return result;
  };

  sx.scale = scale;
  sx.defaults = defaultScale;
  return sx;
}; // new v5 API

var system = function system(args) {
  if (args === void 0) {
    args = {};
  }

  var config = {};
  Object.keys(args).forEach(function (key) {
    var conf = args[key];

    if (conf === true) {
      // shortcut definition
      config[key] = createStyleFunction({
        property: key,
        scale: key
      });
      return;
    }

    if (typeof conf === 'function') {
      config[key] = conf;
      return;
    }

    config[key] = createStyleFunction(conf);
  });
  var parser = createParser(config);
  return parser;
};
var compose = function compose() {
  var config = {};

  for (var _len = arguments.length, parsers = new Array(_len), _key = 0; _key < _len; _key++) {
    parsers[_key] = arguments[_key];
  }

  parsers.forEach(function (parser) {
    if (!parser || !parser.config) return;
    objectAssign(config, parser.config);
  });
  var parser = createParser(config);
  return parser;
};

var config = {
  bg: {
    property: "background",
    scale: "colors"
  },
  bgColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  background: {
    property: "background",
    scale: "colors"
  },
  backgroundColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  bgImage: {
    property: "backgroundImage"
  },
  bgImg: {
    property: "backgroundImage"
  },
  bgBlendMode: {
    property: "backgroundBlendMode"
  },
  bgSize: {
    property: "backgroundSize"
  },
  bgPosition: {
    property: "backgroundPosition"
  },
  bgPos: {
    property: "backgroundPosition"
  },
  bgRepeat: {
    property: "backgroundRepeat"
  },
  bgAttachment: {
    property: "backgroundAttachment"
  }
};
var background = system(config);
var backgroundParser = createParser(config);

/**
 * The parser configuration for common border properties
 */
var config$1 = {
  border: {
    property: "border",
    scale: "borders"
  },
  borderWidth: {
    property: "borderWidth",
    scale: "borderWidths"
  },
  borderStyle: {
    property: "borderStyle",
    scale: "borderStyles"
  },
  borderColor: {
    property: "borderColor",
    scale: "colors"
  },
  borderRadius: {
    property: "borderRadius",
    scale: "radii"
  },
  rounded: {
    property: "borderRadius",
    scale: "radii"
  },
  borderTop: {
    property: "borderTop",
    scale: "borders"
  },
  borderTopLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  roundedTopLeft: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  roundedTopRight: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  borderRight: {
    property: "borderRight",
    scale: "borders"
  },
  borderBottom: {
    property: "borderBottom",
    scale: "borders"
  },
  borderBottomLeftRadius: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  roundedBottomLeft: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  roundedBottomRight: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  borderLeft: {
    property: "borderLeft",
    scale: "borders"
  },
  borderX: {
    properties: ["borderLeft", "borderRight"],
    scale: "borders"
  },
  borderY: {
    properties: ["borderTop", "borderBottom"],
    scale: "borders"
  },
  borderTopWidth: {
    property: "borderTopWidth",
    scale: "borderWidths"
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors"
  },
  borderTopStyle: {
    property: "borderTopStyle",
    scale: "borderStyles"
  },
  borderBottomWidth: {
    property: "borderBottomWidth",
    scale: "borderWidths"
  },
  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors"
  },
  borderBottomStyle: {
    property: "borderBottomStyle",
    scale: "borderStyles"
  },
  borderLeftWidth: {
    property: "borderLeftWidth",
    scale: "borderWidths"
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors"
  },
  borderLeftStyle: {
    property: "borderLeftStyle",
    scale: "borderStyles"
  },
  borderRightWidth: {
    property: "borderRightWidth",
    scale: "borderWidths"
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors"
  },
  borderRightStyle: {
    property: "borderRightStyle",
    scale: "borderStyles"
  },
  borderTopRadius: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  roundedTop: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedBottom: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  roundedLeft: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedRight: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  }
};
/**
 * The prop types for border properties listed above
 */

var border = system(config$1);
var borderParser = createParser(config$1);

/**
 * The parser configuration for common border properties
 */
var config$2 = {
  color: {
    property: "color",
    scale: "colors"
  },
  textColor: {
    property: "color",
    scale: "colors"
  },
  opacity: true,
  fill: {
    property: "fill",
    scale: "colors"
  },
  stroke: {
    property: "stroke",
    scale: "colors"
  }
};
var color = system(config$2);
var colorParser = createParser(config$2);

var config$3 = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: {
    property: "flexBasis",
    scale: "sizes"
  },
  justifySelf: true,
  alignSelf: true,
  order: true,
  flexDir: {
    property: "flexDirection"
  }
};
/**
 * Types for flexbox related CSS properties
 */

var flexbox = system(config$3);
var flexboxParser = createParser(config$3);

var config$4 = {
  gridGap: {
    property: "gridGap",
    scale: "space"
  },
  gridColumnGap: {
    property: "gridColumnGap",
    scale: "space"
  },
  gridRowGap: {
    property: "gridRowGap",
    scale: "space"
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
  placeItems: true
};
/**
 * Types for grid related CSS properties
 */

var grid = system(config$4);
var gridParser = createParser(config$4);

function transform(value, scale) {
  var defaultValue = !isNumber(value) || value > 1 ? value : value * 100 + "%";
  return memoizedGet(scale, value, defaultValue);
}

var config$5 = {
  width: {
    property: "width",
    scale: "sizes",
    transform
  },
  w: {
    property: "width",
    scale: "sizes",
    transform
  },
  height: {
    property: "height",
    scale: "sizes"
  },
  h: {
    property: "height",
    scale: "sizes"
  },
  boxSize: {
    properties: ["width", "height"],
    scale: "sizes"
  },
  minWidth: {
    property: "minWidth",
    scale: "sizes"
  },
  minW: {
    property: "minWidth",
    scale: "sizes"
  },
  minHeight: {
    property: "minHeight",
    scale: "sizes"
  },
  minH: {
    property: "minHeight",
    scale: "sizes"
  },
  maxWidth: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxHeight: {
    property: "maxHeight",
    scale: "sizes"
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes"
  },
  d: {
    property: "display"
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true
};
/**
 * Types for layout related CSS properties
 */

var layout = system(config$5);
var layoutParser = createParser(config$5);

var config$6 = {
  animation: true,
  appearance: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  objectFit: true,
  objectPosition: true,
  float: true,
  willChange: true
};
var others = system(config$6);
var othersParser = createParser(config$6);

var cssGetUnit = function unit (value) {

  var len = value.length;
  if (!value || !len)
    return null
		
  var i = len;
  while (i--)
    if (!isNaN(value[i]))
      return value.slice(i + 1, len) || null

  return null
};

var startsWith = (string, target) => string.slice(0, 0 + target.length) === target;

function positiveOrNegative(value, scale) {
  if (!scale || value == null) return value;
  var result;
  var valueString = value.toString();

  if (startsWith(valueString, "-")) {
    var raw = scale[valueString.slice(1)];

    if (isString(raw)) {
      result = "-" + raw;
    } else if (isNumber(raw)) {
      result = raw * -1;
    } else {
      result = value;
    }
  } else {
    var _scale$value;

    result = (_scale$value = scale[value]) != null ? _scale$value : value;
  }

  var computedValue = result || value;
  var hasUnit = cssGetUnit(computedValue);

  if (!hasUnit && !Number.isNaN(Number(computedValue))) {
    computedValue = Number(computedValue);
  }

  return computedValue;
}

var config$7 = {
  position: true,
  pos: {
    property: "position"
  },
  zIndex: {
    property: "zIndex",
    scale: "zIndices"
  },
  inset: {
    properties: ["left", "top", "bottom", "right"],
    scale: "space",
    transform: positiveOrNegative
  },
  insetX: {
    properties: ["left", "right"],
    scale: "space",
    transform: positiveOrNegative
  },
  insetY: {
    properties: ["top", "bottom"],
    scale: "space",
    transform: positiveOrNegative
  },
  top: {
    property: "top",
    scale: "space",
    transform: positiveOrNegative
  },
  right: {
    property: "right",
    scale: "space",
    transform: positiveOrNegative
  },
  bottom: {
    property: "bottom",
    scale: "space",
    transform: positiveOrNegative
  },
  left: {
    property: "left",
    scale: "space",
    transform: positiveOrNegative
  }
};
/**
 * Types for position CSS properties
 */

var position = system(config$7);
var positionParser = createParser(config$7);

var config$8 = {
  boxShadow: {
    property: "boxShadow",
    scale: "shadows"
  },
  textShadow: {
    property: "textShadow",
    scale: "shadows"
  },
  shadow: {
    property: "boxShadow",
    scale: "shadows"
  }
};
/**
 * Types for box and text shadow properties
 */

var shadow = system(config$8);
var shadowParser = createParser(config$8);

var config$9 = {
  margin: {
    property: "margin",
    transform: positiveOrNegative,
    scale: "space"
  },
  m: {
    property: "margin",
    transform: positiveOrNegative,
    scale: "space"
  },
  marginTop: {
    property: "marginTop",
    transform: positiveOrNegative,
    scale: "space"
  },
  mt: {
    property: "marginTop",
    transform: positiveOrNegative,
    scale: "space"
  },
  marginRight: {
    property: "marginRight",
    transform: positiveOrNegative,
    scale: "space"
  },
  mr: {
    property: "marginRight",
    transform: positiveOrNegative,
    scale: "space"
  },
  marginBottom: {
    property: "marginBottom",
    transform: positiveOrNegative,
    scale: "space"
  },
  mb: {
    property: "marginBottom",
    transform: positiveOrNegative,
    scale: "space"
  },
  marginLeft: {
    property: "marginLeft",
    transform: positiveOrNegative,
    scale: "space"
  },
  ml: {
    property: "marginLeft",
    transform: positiveOrNegative,
    scale: "space"
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative,
    scale: "space"
  },
  mx: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative,
    scale: "space"
  },
  marginY: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative,
    scale: "space"
  },
  my: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative,
    scale: "space"
  },
  padding: {
    property: "padding",
    scale: "space"
  },
  p: {
    property: "padding",
    scale: "space"
  },
  paddingTop: {
    property: "paddingTop",
    scale: "space"
  },
  pt: {
    property: "paddingTop",
    scale: "space"
  },
  paddingRight: {
    property: "paddingRight",
    scale: "space"
  },
  pr: {
    property: "paddingRight",
    scale: "space"
  },
  paddingBottom: {
    property: "paddingBottom",
    scale: "space"
  },
  pb: {
    property: "paddingBottom",
    scale: "space"
  },
  paddingLeft: {
    property: "paddingLeft",
    scale: "space"
  },
  pl: {
    property: "paddingLeft",
    scale: "space"
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  px: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  },
  py: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  }
};
/**
 * Types for space related CSS properties
 */

/**
 * Converts shorthand or longhand margin and padding props to margin and padding CSS declarations
 *
 * - Numbers from 0-4 (or the length of theme.space) are converted to values on the spacing scale.
 * - Negative values can be used for negative margins.
 * - Numbers greater than the length of the theme.space array are converted to raw pixel values.
 * - String values are passed as raw CSS values.
 * - Array values are converted into responsive values.
 */
var space = system(config$9);
var spaceParser = createParser(config$9);

var config$a = {
  fontFamily: {
    property: "fontFamily",
    scale: "fonts"
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSizes"
  },
  fontWeight: {
    property: "fontWeight",
    scale: "fontWeights"
  },
  lineHeight: {
    property: "lineHeight",
    scale: "lineHeights"
  },
  letterSpacing: {
    property: "letterSpacing",
    scale: "letterSpacings"
  },
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: true,
  textDecor: {
    property: "textDecoration"
  }
};
/**
 * Types for typography related CSS properties
 */

var typography = system(config$a);
var typographyParser = createParser(config$a);

/**
 * The parser configuration for common outline properties
 */
var config$b = {
  outline: true,
  outlineOffset: true,
  outlineColor: {
    property: "outlineColor",
    scale: "colors"
  }
};
var outline = system(config$b);
var outlineParser = createParser(config$b);

var config$c = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: {
    property: "listStylePosition"
  },
  listStyleImage: true,
  listStyleImg: {
    property: "listStyleImage"
  }
};
var list = system(config$c);
var listParser = createParser(config$c);

var config$d = {
  transition: true,
  transitionDuration: {
    property: "transitionDuration",
    scale: "transition.duration"
  },
  transitionProperty: {
    property: "transitionProperty",
    scale: "transition.property"
  },
  transitionTimingFunction: {
    property: "transitionTimingFunction",
    scale: "transition.easing"
  }
};
var transition = system(config$d);
var transitionParser = createParser(config$d);

var config$e = {
  transform: true,
  transformOrigin: true
};
var transform$1 = system(config$e);
var transformParser = createParser(config$e);

var group = {
  hover: selector => selector + ":hover &, " + selector + "[data-hover] &",
  focus: selector => selector + ":focus &, " + selector + "[data-focus] &",
  active: selector => selector + ":active &, " + selector + "[data-active] &",
  disabled: selector => selector + ":disabled &, " + selector + "[data-disabled] &",
  invalid: selector => selector + ":invalid &, " + selector + "[data-invalid] &",
  checked: selector => selector + ":checked &, " + selector + "[data-checked] &",
  indeterminate: selector => selector + ":indeterminate &, " + selector + "[aria-checked=mixed] &, " + selector + "[data-indeterminate] &",
  readOnly: selector => selector + ":read-only &, " + selector + "[readonly] &, " + selector + "[data-read-only] &",
  expanded: selector => selector + ":read-only &, " + selector + "[aria-expanded=true] &, " + selector + "[data-expanded] &"
};

function toGroup(fn) {
  return merge$2(fn, "[role=group]", "[data-group]");
}

function merge$2(fn) {
  for (var _len = arguments.length, selectors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    selectors[_key - 1] = arguments[_key];
  }

  return selectors.map(fn).join(", ");
}

var disabled = selector => selector + ", " + selector + ":focus, " + selector + ":hover";

var disabledSelector = merge$2(disabled, "&[disabled]", "&[aria-disabled=true]", "&[data-disabled]");
var pseudoSelectors = {
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover: "&:hover, &[data-hover]",

  /**
   * Styles for CSS Selector `&:active`
   */
  _active: "&:active, &[data-active]",

  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus: "&:focus, &[data-focus]",

  /**
   * Styles for the highlighted state.
   */
  _highlighted: "&[data-highlighted]",

  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin: "&:focus-within",
  _focusVisible: "&:focus-visible",

  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled: disabledSelector,

  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",

  /**
   * Styles for CSS selector `&::before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before: "&::before",

  /**
   * Styles for CSS selector `&::after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _after={{content:`""` }}/>
   * ```
   */
  _after: "&::after",
  _empty: "&:empty",

  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded: "&[aria-expanded=true], &[data-expanded]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked: "&[aria-checked=true], &[data-checked]",

  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed: "&[aria-grabbed=true], &[data-grabbed]",

  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed: "&[aria-pressed=true], &[data-pressed]",

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid: "&[aria-invalid=true], &[data-invalid]",

  /**
   * Styles for the valid state
   * - CSS selector `&[data-valid], &[data-state=valid]`
   */
  _valid: "&[data-valid], &[data-state=valid]",

  /**
   * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
   * Useful for styling loading states
   */
  _loading: "&[data-loading], &[aria-busy=true]",

  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   *
   * - CSS selector `&[aria-selected=true]`
   */
  _selected: "&[aria-selected=true], &[data-selected]",

  /**
   * Styles for CSS Selector `[hidden=true]`
   */
  _hidden: "&[hidden], &[data-hidden]",

  /**
   * Styles for CSS Selector `&:-webkit-autofill`
   */
  _autofill: "&:-webkit-autofill",

  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even: "&:nth-of-type(even)",

  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd: "&:nth-of-type(odd)",

  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first: "&:first-of-type",

  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last: "&:last-of-type",

  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst: "&:not(:first-of-type)",

  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast: "&:not(:last-of-type)",

  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited: "&:visited",

  /**
   * Used to style the active link in a navigation
   * Styles for CSS Selector `&[aria-current=page]`
   */
  _activeLink: "&[aria-current=page]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",

  /**
   * Styles to apply when parent is hovered
   */
  _groupHover: toGroup(group.hover),

  /**
   * Styles to apply when parent is focused
   */
  _groupFocus: toGroup(group.focus),

  /**
   * Styles to apply when parent is active
   */
  _groupActive: toGroup(group.active),

  /**
   * Styles to apply when parent is disabled
   */
  _groupDisabled: toGroup(group.disabled),

  /**
   * Styles to apply when parent is invalid
   */
  _groupInvalid: toGroup(group.invalid),

  /**
   * Styles to apply when parent is checked
   */
  _groupChecked: toGroup(group.checked),

  /**
   * Styles for CSS Selector `&::placeholder`.
   */
  _placeholder: "&::placeholder",

  /**
   * Styles for CSS Selector `&:fullscreen`.
   */
  _fullScreen: "&:fullscreen",

  /**
   * Styles for CSS Selector `&::selection`
   */
  _selection: "&::selection"
};

var parser = compose(backgroundParser, borderParser, colorParser, flexboxParser, layoutParser, outlineParser, gridParser, othersParser, positionParser, shadowParser, spaceParser, typographyParser, transformParser, transitionParser, listParser);

var cache = {
  themeBreakpoints: [],
  breakpoints: [],
  breakpointValues: [],
  mediaQueries: []
};

/**
 *
 */
var calculateBreakpointAndMediaQueries = function calculateBreakpointAndMediaQueries(themeBreakpoints) {
  if (themeBreakpoints === void 0) {
    themeBreakpoints = [];
  }

  // caching here reduces execution time by factor 4-6x
  var isCached = cache.themeBreakpoints === themeBreakpoints;

  if (isCached) {
    return cache;
  }

  var {
    breakpoints,
    breakpointValues
  } = Object.entries(themeBreakpoints).filter((_ref) => {
    var [key] = _ref;
    return isCustomBreakpoint(key);
  }).reduce((carry, _ref2) => {
    var [breakpoint, value] = _ref2;
    carry.breakpoints.push(breakpoint);
    carry.breakpointValues.push(value);
    return carry;
  }, {
    breakpoints: [],
    breakpointValues: []
  });
  var mediaQueries = [null, ...breakpointValues.map(bp => "@media screen and (min-width: " + bp + ")").slice(1)];
  cache.themeBreakpoints = themeBreakpoints;
  cache.mediaQueries = mediaQueries;
  cache.breakpointValues = breakpointValues;
  cache.breakpoints = breakpoints;
  return {
    breakpoints,
    mediaQueries
  };
};

var responsive = styles => theme => {
  var computedStyles = {};
  var {
    breakpoints,
    mediaQueries
  } = calculateBreakpointAndMediaQueries(theme.breakpoints);

  for (var key in styles) {
    var value = runIfFn(styles[key], theme);

    if (value == null) {
      continue;
    }

    value = isResponsiveObjectLike(value, breakpoints) ? objectToArrayNotation(value, breakpoints) : value;

    if (!isArray(value)) {
      computedStyles[key] = value;
      continue;
    }

    var queries = value.slice(0, mediaQueries.length).length;

    for (var index = 0; index < queries; index += 1) {
      var media = mediaQueries[index];

      if (!media) {
        computedStyles[key] = value[index];
        continue;
      }

      computedStyles[media] = computedStyles[media] || {};

      if (value[index] == null) {
        continue;
      }

      computedStyles[media][key] = value[index];
    }
  }

  return computedStyles;
};

var css$1 = function css(args) {
  if (args === void 0) {
    args = {};
  }

  return function (props) {
    if (props === void 0) {
      props = {};
    }

    var theme = "theme" in props ? props.theme : props;
    var computedStyles = {};
    var styleObject = runIfFn(args, theme);
    var styles = responsive(styleObject)(theme);

    for (var k in styles) {
      var _config$transform;

      var x = styles[k];
      var val = runIfFn(x, theme);
      var key = k in pseudoSelectors ? pseudoSelectors[k] : k;
      var config = parser.config[key];

      if (key === "apply") {
        var apply = css(memoizedGet(theme, val))(theme);
        computedStyles = lodash_mergewith({}, computedStyles, apply);
        continue;
      }

      if (isObject(val)) {
        computedStyles[key] = css(val)(theme);
        continue;
      }

      var scale = memoizedGet(theme, config == null ? void 0 : config.scale, {});
      var value = (_config$transform = config == null ? void 0 : config.transform == null ? void 0 : config.transform(val, scale)) != null ? _config$transform : memoizedGet(scale, val, val);

      if (config == null ? void 0 : config.properties) {
        for (var property of config.properties) {
          computedStyles[property] = value;
        }

        continue;
      }

      if (config == null ? void 0 : config.property) {
        computedStyles[config.property] = value;
        continue;
      }

      computedStyles[key] = value;
    }

    return computedStyles;
  };
};

var systemProps = compose(background, border, color, flexbox, layout, outline, grid, others, position, shadow, space, typography, transform$1, list, transition);
var layoutSystem = compose(space, layout, flexbox, grid, position);

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;

// Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.
    var it;
    if (hasMap && (a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }

    if (hasSet && (a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      return true;
    }
    // END: Modifications

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    // END: fast-deep-equal

    // START: react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false;

    // custom handling for React/Preact
    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements

        continue;
      }

      // all other properties should be traversed as usual
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }
    // END: react-fast-compare

    // START: fast-deep-equal
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

var reactFastCompare = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (((error.message || '').match(/stack|recursion/i))) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};

var ThemeProvider = props => {
  var {
    children,
    theme
  } = props;
  var outerTheme = react.useContext(ThemeContext);
  var mergedTheme = lodash_mergewith({}, outerTheme, theme);
  return /*#__PURE__*/react.createElement(ThemeContext.Provider, {
    value: mergedTheme
  }, children);
};
var [StylesProvider, useStyles] = createContext$1({
  name: "StylesContext",
  errorMessage: "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "
});
/**
 * Applies styles defined in `theme.styles.global` globally
 * using emotion's `Global` component
 */

var GlobalStyle = () => {
  var {
    colorMode
  } = useColorMode();
  return /*#__PURE__*/react.createElement(Global, {
    styles: theme => {
      var styleObjectOrFn = memoizedGet(theme, "styles.global");
      var globalStyles = runIfFn(styleObjectOrFn, {
        theme,
        colorMode
      });
      if (!globalStyles) return undefined;
      var styles = css$1(globalStyles)(theme);
      return styles;
    }
  });
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = memoize$6(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

var testOmitPropsOnStringTag = index;

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme' && key !== 'innerRef';
};

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Noop = function Noop() {
  return null;
};

var createStyled = function createStyled(tag, options) {

  var identifierName;
  var shouldForwardProp;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
    shouldForwardProp = tag.__emotion_forwardProp && options.shouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && // $FlowFixMe
      options.shouldForwardProp(propName);
    } : options.shouldForwardProp;
  }

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {

      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {

        styles.push(args[i], args[0][i]);
      }
    } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class


    var Styled = withEmotionCache(function (props, context, ref) {
      return /*#__PURE__*/react.createElement(ThemeContext.Consumer, null, function (theme) {
        var finalTag = shouldUseAs && props.as || baseTag;
        var className = '';
        var classInterpolations = [];
        var mergedProps = props;

        if (props.theme == null) {
          mergedProps = {};

          for (var key in props) {
            mergedProps[key] = props[key];
          }

          mergedProps.theme = theme;
        }

        if (typeof props.className === 'string') {
          className = getRegisteredStyles(context.registered, classInterpolations, props.className);
        } else if (props.className != null) {
          className = props.className + " ";
        }

        var serialized = serializeStyles(styles.concat(classInterpolations), context.registered, mergedProps);
        var rules = insertStyles(context, serialized, typeof finalTag === 'string');
        className += context.key + "-" + serialized.name;

        if (targetClassName !== undefined) {
          className += " " + targetClassName;
        }

        var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
        var newProps = {};

        for (var _key in props) {
          if (shouldUseAs && _key === 'as') continue;

          if ( // $FlowFixMe
          finalShouldForwardProp(_key)) {
            newProps[_key] = props[_key];
          }
        }

        newProps.className = className;
        newProps.ref = ref || props.innerRef;

        var ele = /*#__PURE__*/react.createElement(finalTag, newProps);
        var possiblyStyleElement = /*#__PURE__*/react.createElement(Noop, null);


        return /*#__PURE__*/react.createElement(react.Fragment, null, possiblyStyleElement, ele);
      });
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && "production" !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        } // $FlowFixMe: coerce undefined to string


        return "." + targetClassName;
      }
    });

    Styled.withComponent = function (nextTag, nextOptions) {
      return createStyled(nextTag, nextOptions !== undefined ? _objectSpread({}, options || {}, {}, nextOptions) : options).apply(void 0, styles);
    };

    return Styled;
  };
};

var parts = ["container", "button", "panel"];
var baseStyleContainer = {
  borderTopWidth: "1px",
  borderColor: "inherit",
  _last: {
    borderBottomWidth: "1px"
  }
};
var baseStyleButton = {
  fontSize: "1rem",
  _focus: {
    boxShadow: "outline"
  },
  _hover: {
    bg: "blackAlpha.50"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  px: 4,
  py: 2
};
var baseStylePanel = {
  pt: 2,
  px: 4,
  pb: 5
};
var baseStyle = {
  container: baseStyleContainer,
  button: baseStyleButton,
  panel: baseStylePanel
};
var Accordion = {
  parts,
  baseStyle
};

var tinycolor = createCommonjsModule(function (module) {
// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size ;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if ( module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else {
    window.tinycolor = tinycolor;
}

})(Math);
});

/**
 * Get the color raw value from theme
 * @param theme - the theme object
 * @param color - the color path ("green.200")
 * @param fallback - the fallback color
 */

var getColor = (theme, color, fallback) => {
  var hex = memoizedGet(theme, "colors." + color, color);
  var isValid = tinycolor(hex).isValid();
  return isValid ? hex : fallback;
};
/**
 * Determines if the tone of given color is "light" or "dark"
 * @param color - the color in hex, rgb, or hsl
 */

var tone = color => theme => {
  var hex = getColor(theme, color);
  var isDark = tinycolor(hex).isDark();
  return isDark ? "dark" : "light";
};
/**
 * Determines if a color tone is "dark"
 * @param color - the color in hex, rgb, or hsl
 */

var isDark = color => theme => tone(color)(theme) === "dark";
/**
 * Make a color transparent
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add
 */

var transparentize = (color, opacity) => theme => {
  var raw = getColor(theme, color);
  return tinycolor(raw).setAlpha(opacity).toRgbString();
};
function generateStripe(size, color) {
  if (size === void 0) {
    size = "1rem";
  }

  if (color === void 0) {
    color = "rgba(255, 255, 255, 0.15)";
  }

  return {
    backgroundImage: "linear-gradient(\n    45deg,\n    " + color + " 25%,\n    transparent 25%,\n    transparent 50%,\n    " + color + " 50%,\n    " + color + " 75%,\n    transparent 75%,\n    transparent\n  )",
    backgroundSize: size + " " + size
  };
}
function randomColor(opts) {
  var fallback = tinycolor.random().toHexString();

  if (!opts || isEmptyObject(opts)) {
    return fallback;
  }

  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors);
  }

  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string);
  }

  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors);
  }

  return fallback;
}

function randomColorFromString(str) {
  var hash = 0;
  if (str.length === 0) return hash.toString();

  for (var i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  var color = "#";

  for (var j = 0; j < 3; j += 1) {
    var value = hash >> j * 8 & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }

  return color;
}

function randomColorFromList(str, list) {
  var index = 0;
  if (str.length === 0) return list[0];

  for (var i = 0; i < str.length; i += 1) {
    index = str.charCodeAt(i) + ((index << 5) - index);
    index = index & index;
  }

  index = (index % list.length + list.length) % list.length;
  return list[index];
}

function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function mode(light, dark) {
  return props => props.colorMode === "dark" ? dark : light;
}
function orient(options) {
  var {
    orientation,
    vertical,
    horizontal
  } = options;
  if (!orientation) return {};
  return orientation === "vertical" ? vertical : horizontal;
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var createBreakpoints = config => {
  var sorted = fromEntries(Object.entries(_extends({
    base: "0em"
  }, config)).sort((a, b) => parseInt(a[1], 10) > parseInt(b[1], 10) ? 1 : -1));
  return Object.assign(Object.values(sorted), sorted);
};

var parts$1 = ["container", "title", "icon"];
var baseStyle$1 = {
  container: {
    px: 4,
    py: 3
  },
  title: {
    fontWeight: "bold",
    lineHeight: 6,
    mr: 2
  },
  description: {
    lineHeight: 6
  },
  icon: {
    mr: 3,
    w: 5,
    h: 6
  }
};

function getBg(props) {
  var {
    theme,
    colorScheme: c
  } = props;
  var lightBg = getColor(theme, c + ".100", c);
  var darkBg = transparentize(c + ".200", 0.16)(theme);
  return mode(lightBg, darkBg)(props);
}

function variantSubtle(props) {
  var {
    colorScheme: c
  } = props;
  return {
    container: {
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
}

function variantLeftAccent(props) {
  var {
    colorScheme: c
  } = props;
  return {
    container: {
      pl: 3,
      borderLeft: "4px solid",
      borderColor: mode(c + ".500", c + ".200")(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
}

function variantTopAccent(props) {
  var {
    colorScheme: c
  } = props;
  return {
    container: {
      pt: 2,
      borderTop: "4px solid",
      borderColor: mode(c + ".500", c + ".200")(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
}

function variantSolid(props) {
  var {
    colorScheme: c
  } = props;
  return {
    container: {
      bg: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props)
    }
  };
}

var variants = {
  subtle: variantSubtle,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid
};
var defaultProps = {
  variant: "subtle"
};
var Alert = {
  parts: parts$1,
  baseStyle: baseStyle$1,
  variants,
  defaultProps
};

var spacing = {
  px: "1px",
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem"
};

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var largeSizes = {
  full: "100%",
  "3xs": "14rem",
  "2xs": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem"
};
var container = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
};

var sizes = _extends$1({}, spacing, largeSizes, {
  container
});

var parts$2 = ["container", "excessLabel", "badge", "label"];

function baseStyleBadge(props) {
  return {
    transform: "translate(25%, 25%)",
    borderRadius: "full",
    border: "0.2em solid",
    borderColor: mode("white", "gray.800")(props)
  };
}

function baseStyleExcessLabel(props) {
  return {
    bg: mode("gray.200", "whiteAlpha.400")(props)
  };
}

function baseStyleContainer$1(props) {
  var {
    name,
    theme
  } = props;
  var bg = name ? randomColor({
    string: name
  }) : "gray.400";
  var isBgDark = isDark(bg)(theme);
  var color = "white";
  if (!isBgDark) color = "gray.800";
  var borderColor = mode("white", "gray.800")(props);
  return {
    bg,
    color,
    borderColor,
    verticalAlign: "top"
  };
}

var baseStyle$2 = props => ({
  badge: baseStyleBadge(props),
  excessLabel: baseStyleExcessLabel(props),
  container: baseStyleContainer$1(props)
});

function getSize(size) {
  var themeSize = sizes[size];
  return {
    container: {
      width: size,
      height: size,
      fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)"
    },
    excessLabel: {
      width: size,
      height: size
    },
    label: {
      fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)",
      lineHeight: size !== "100%" ? themeSize != null ? themeSize : size : undefined
    }
  };
}

var sizes$1 = {
  "2xs": getSize("4"),
  xs: getSize("6"),
  sm: getSize("8"),
  md: getSize("12"),
  lg: getSize("16"),
  xl: getSize("24"),
  "2xl": getSize("32"),
  full: getSize("100%")
};
var defaultProps$1 = {
  size: "md"
};
var Avatar = {
  parts: parts$2,
  baseStyle: baseStyle$2,
  sizes: sizes$1,
  defaultProps: defaultProps$1
};

var baseStyle$3 = {
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "sm",
  fontWeight: "bold"
};

function variantSolid$1(props) {
  var {
    colorScheme: c,
    theme
  } = props;
  var dark = transparentize(c + ".500", 0.6)(theme);
  return {
    bg: mode(c + ".500", dark)(props),
    color: mode("white", "whiteAlpha.800")(props)
  };
}

function variantSubtle$1(props) {
  var {
    colorScheme: c,
    theme
  } = props;
  var darkBg = transparentize(c + ".200", 0.16)(theme);
  return {
    bg: mode(c + ".100", darkBg)(props),
    color: mode(c + ".800", c + ".200")(props)
  };
}

function variantOutline(props) {
  var {
    colorScheme: c,
    theme
  } = props;
  var darkColor = transparentize(c + ".200", 0.8)(theme);
  var lightColor = getColor(theme, c + ".500");
  var color = mode(lightColor, darkColor)(props);
  return {
    color,
    boxShadow: "inset 0 0 0px 1px " + color
  };
}

var variants$1 = {
  solid: variantSolid$1,
  subtle: variantSubtle$1,
  outline: variantOutline
};
var defaultProps$2 = {
  variant: "subtle",
  colorScheme: "gray"
};
var Badge = {
  baseStyle: baseStyle$3,
  variants: variants$1,
  defaultProps: defaultProps$2
};

var parts$3 = ["link", "separator"];
var baseStyleLink = {
  transition: "all 0.15s ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focus: {
    boxShadow: "outline"
  }
};
var baseStyle$4 = {
  link: baseStyleLink
};
var Breadcrumb = {
  parts: parts$3,
  baseStyle: baseStyle$4
};

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
var baseStyle$5 = {
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  _focus: {
    boxShadow: "outline"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  _hover: {
    _disabled: {
      bg: "initial"
    }
  }
};

function variantGhost(props) {
  var {
    colorScheme: c,
    theme
  } = props;

  if (c === "gray") {
    return {
      color: mode("inherit", "whiteAlpha.900")(props),
      _hover: {
        bg: mode("gray.100", "whiteAlpha.200")(props)
      },
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props)
      }
    };
  }

  var darkHoverBg = transparentize(c + ".200", 0.12)(theme);
  var darkActiveBg = transparentize(c + ".200", 0.24)(theme);
  return {
    color: mode(c + ".600", c + ".200")(props),
    bg: "transparent",
    _hover: {
      bg: mode(c + ".50", darkHoverBg)(props)
    },
    _active: {
      bg: mode(c + ".100", darkActiveBg)(props)
    }
  };
}

function variantOutline$1(props) {
  var {
    colorScheme: c
  } = props;
  var borderColor = mode("gray.200", "whiteAlpha.300")(props);
  return _extends$2({
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor"
  }, variantGhost(props));
}

/** Accessible color overrides for less accessible colors. */
var accessibleColorMap = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600"
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600"
  }
};

function variantSolid$2(props) {
  var {
    colorScheme: c
  } = props;

  if (c === "gray") {
    var _bg = mode("gray.100", "whiteAlpha.200")(props);

    return {
      bg: _bg,
      _hover: {
        bg: mode("gray.200", "whiteAlpha.300")(props),
        _disabled: {
          bg: _bg
        }
      },
      _active: {
        bg: mode("gray.300", "whiteAlpha.400")(props)
      }
    };
  }

  var {
    bg = c + ".500",
    color = "white",
    hoverBg = c + ".600",
    activeBg = c + ".700"
  } = accessibleColorMap[c] || {};
  var background = mode(bg, c + ".200")(props);
  return {
    bg: background,
    color: mode(color, "gray.800")(props),
    _hover: {
      bg: mode(hoverBg, c + ".300")(props),
      _disabled: {
        bg: background
      }
    },
    _active: {
      bg: mode(activeBg, c + ".400")(props)
    }
  };
}

function variantLink(props) {
  var {
    colorScheme: c
  } = props;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    color: mode(c + ".500", c + ".200")(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none"
      }
    },
    _active: {
      color: mode(c + ".700", c + ".500")(props)
    }
  };
}

var variantUnstyled = {
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: 0,
  p: 0
};
var variants$2 = {
  ghost: variantGhost,
  outline: variantOutline$1,
  solid: variantSolid$2,
  link: variantLink,
  unstyled: variantUnstyled
};
var sizes$2 = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: "lg",
    px: 6
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: "md",
    px: 4
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: "sm",
    px: 3
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: "xs",
    px: 2
  }
};
var defaultProps$3 = {
  variant: "solid",
  size: "md",
  colorScheme: "gray"
};
var Button = {
  baseStyle: baseStyle$5,
  variants: variants$2,
  sizes: sizes$2,
  defaultProps: defaultProps$3
};

var parts$4 = ["control", "label", "description", "icon"];

function baseStyleControl(props) {
  var {
    colorScheme: c
  } = props;
  return {
    w: "100%",
    transition: "box-shadow 250ms",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",
    _checked: {
      bg: mode(c + ".500", c + ".200")(props),
      borderColor: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props),
      _hover: {
        bg: mode(c + ".600", c + ".300")(props),
        borderColor: mode(c + ".600", c + ".300")(props)
      },
      _disabled: {
        borderColor: mode("gray.200", "transparent")(props),
        bg: mode("gray.200", "whiteAlpha.300")(props),
        color: mode("gray.500", "whiteAlpha.500")(props)
      }
    },
    _indeterminate: {
      bg: mode(c + ".500", c + ".200")(props),
      borderColor: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props)
    },
    _disabled: {
      bg: mode("gray.100", "whiteAlpha.100")(props),
      borderColor: mode("gray.100", "transparent")(props)
    },
    _focus: {
      boxShadow: "outline"
    },
    _invalid: {
      borderColor: mode("red.500", "red.300")(props)
    }
  };
}

var baseStyleLabel = {
  userSelect: "none",
  _disabled: {
    opacity: 0.4
  }
};

var baseStyle$6 = props => ({
  control: baseStyleControl(props),
  label: baseStyleLabel
});

var sizes$3 = {
  sm: {
    control: {
      h: 3,
      w: 3
    },
    label: {
      fontSize: "sm"
    },
    icon: {
      fontSize: "0.45rem"
    }
  },
  md: {
    control: {
      w: 4,
      h: 4
    },
    label: {
      fontSize: "md"
    },
    icon: {
      fontSize: "0.625rem"
    }
  },
  lg: {
    control: {
      w: 5,
      h: 5
    },
    label: {
      fontSize: "lg"
    },
    icon: {
      fontSize: "0.625rem"
    }
  }
};
var defaultProps$4 = {
  size: "md",
  colorScheme: "blue"
};
var Checkbox = {
  parts: parts$4,
  baseStyle: baseStyle$6,
  sizes: sizes$3,
  defaultProps: defaultProps$4
};

function baseStyle$7(props) {
  var hoverBg = mode("blackAlpha.100", "whiteAlpha.100")(props);
  var activeBg = mode("blackAlpha.200", "whiteAlpha.200")(props);
  return {
    borderRadius: "md",
    transition: "all 0.2s",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      boxShadow: "none"
    },
    _hover: {
      bg: hoverBg
    },
    _active: {
      bg: activeBg
    },
    _focus: {
      boxShadow: "outline"
    }
  };
}

var sizes$4 = {
  lg: {
    w: "40px",
    h: "40px",
    fontSize: "16px"
  },
  md: {
    w: "32px",
    h: "32px",
    fontSize: "12px"
  },
  sm: {
    w: "24px",
    h: "24px",
    fontSize: "10px"
  }
};
var defaultProps$5 = {
  size: "md"
};
var CloseButton = {
  baseStyle: baseStyle$7,
  sizes: sizes$4,
  defaultProps: defaultProps$5
};

var {
  variants: variants$3,
  defaultProps: defaultProps$6
} = Badge;
var baseStyle$8 = {
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm"
};
var Code = {
  baseStyle: baseStyle$8,
  variants: variants$3,
  defaultProps: defaultProps$6
};

var parts$5 = ["overlay", "dialogContainer", "dialog", "header", "body", "footer"];
var baseStyleOverlay = {
  bg: "blackAlpha.600",
  zIndex: "modal"
};

function baseStyleDialogContainer(props) {
  var {
    isCentered,
    scrollBehavior
  } = props;
  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto"
  };
}

function baseStyleDialog(props) {
  var {
    scrollBehavior
  } = props;
  return {
    borderRadius: "md",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    my: "3.75rem",
    zIndex: "modal",
    maxH: scrollBehavior === "inside" ? "calc(100vh - 7.5rem)" : undefined,
    boxShadow: mode("lg", "dark-lg")(props)
  };
}

var baseStyleHeader = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold"
};

function baseStyleBody(props) {
  var {
    scrollBehavior
  } = props;
  return {
    px: 6,
    py: 2,
    flex: 1,
    overflow: scrollBehavior === "inside" ? "auto" : undefined
  };
}

var baseStyleFooter = {
  px: 6,
  py: 4
};

var baseStyle$9 = props => ({
  overlay: baseStyleOverlay,
  dialogContainer: baseStyleDialogContainer(props),
  dialog: baseStyleDialog(props),
  header: baseStyleHeader,
  body: baseStyleBody(props),
  footer: baseStyleFooter
});
/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */


function getSize$1(value) {
  if (value === "full") {
    return {
      dialog: {
        maxW: "100vw",
        h: "100vh"
      }
    };
  }

  return {
    dialog: {
      maxW: value
    }
  };
}

var sizes$5 = {
  xs: getSize$1("xs"),
  sm: getSize$1("sm"),
  md: getSize$1("md"),
  lg: getSize$1("lg"),
  xl: getSize$1("xl"),
  "2xl": getSize$1("2xl"),
  "3xl": getSize$1("3xl"),
  "4xl": getSize$1("4xl"),
  "5xl": getSize$1("5xl"),
  "6xl": getSize$1("6xl"),
  full: getSize$1("full")
};
var defaultProps$7 = {
  size: "md"
};
var Modal = {
  parts: parts$5,
  baseStyle: baseStyle$9,
  sizes: sizes$5,
  defaultProps: defaultProps$7
};

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
var parts$6 = Modal.parts;
/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */

function getSize$2(value) {
  if (value === "full") {
    return {
      dialog: {
        maxW: "100vw",
        h: "100vh"
      }
    };
  }

  return {
    dialog: {
      maxW: value
    }
  };
}

var baseStyleOverlay$1 = {
  bg: "blackAlpha.600",
  zIndex: "overlay"
};
var baseStyleDialogContainer$1 = {
  display: "flex",
  zIndex: "modal",
  justifyContent: "center"
};

function baseStyleDialog$1(props) {
  var {
    isFullHeight
  } = props;
  return _extends$3({}, isFullHeight && {
    height: "100vh"
  }, {
    zIndex: "modal",
    maxH: "100vh",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    boxShadow: mode("lg", "dark-lg")(props)
  });
}

var baseStyleHeader$1 = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold"
};
var baseStyleBody$1 = {
  px: 6,
  py: 2,
  flex: 1,
  overflow: "auto"
};
var baseStyleFooter$1 = {
  px: 6,
  py: 4
};

var baseStyle$a = props => ({
  overlay: baseStyleOverlay$1,
  dialogContainer: baseStyleDialogContainer$1,
  dialog: baseStyleDialog$1(props),
  header: baseStyleHeader$1,
  body: baseStyleBody$1,
  footer: baseStyleFooter$1
});

var sizes$6 = {
  xs: getSize$2("xs"),
  sm: getSize$2("md"),
  md: getSize$2("lg"),
  lg: getSize$2("2xl"),
  xl: getSize$2("4xl"),
  full: getSize$2("full")
};
var defaultProps$8 = {
  size: "xs"
};
var Drawer = {
  parts: parts$6,
  baseStyle: baseStyle$a,
  sizes: sizes$6,
  defaultProps: defaultProps$8
};

var parts$7 = ["preview", "input"];
var baseStylePreview = {
  borderRadius: "md",
  py: "3px",
  transition: "all 0.2s"
};
var baseStyleInput = {
  borderRadius: "md",
  py: "3px",
  transition: "all 0.2s",
  width: "full",
  _focus: {
    boxShadow: "outline"
  },
  _placeholder: {
    opacity: 0.6
  }
};
var baseStyle$b = {
  preview: baseStylePreview,
  input: baseStyleInput
};
var Editable = {
  parts: parts$7,
  baseStyle: baseStyle$b
};

var parts$8 = ["errorText", "errorIcon", "requiredIndicator", "helperText"];

function baseStyleErrorText(props) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm"
  };
}

function baseStyleRequiredIndicator(props) {
  return {
    ml: 1,
    color: mode("red.500", "red.300")(props)
  };
}

function baseStyleHelperText(props) {
  return {
    mt: 2,
    color: mode("gray.500", "whiteAlpha.600")(props),
    lineHeight: "normal",
    fontSize: "sm"
  };
}

function baseStyleErrorIcon(props) {
  return {
    mr: "0.5em",
    color: mode("red.500", "red.300")(props)
  };
}

var baseStyle$c = props => ({
  errorText: baseStyleErrorText(props),
  requiredIndicator: baseStyleRequiredIndicator(props),
  helperText: baseStyleHelperText(props),
  errorIcon: baseStyleErrorIcon(props)
});

var Form = {
  parts: parts$8,
  baseStyle: baseStyle$c
};

var baseStyle$d = {
  fontSize: "md",
  mr: 3,
  mb: 2,
  fontWeight: "medium",
  transition: "all 0.2s",
  opacity: 1,
  _disabled: {
    opacity: 0.4
  }
};
var FormLabel = {
  baseStyle: baseStyle$d
};

var baseStyle$e = {
  fontFamily: "heading",
  fontWeight: "bold"
};
var sizes$7 = {
  "4xl": {
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1
  },
  "3xl": {
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1
  },
  "2xl": {
    fontSize: ["4xl", null, "5xl"],
    lineHeight: ["2.5rem", null, "1"]
  },
  xl: {
    fontSize: ["3xl", null, "4xl"],
    lineHeight: ["2.25rem", null, "2.5rem"]
  },
  lg: {
    fontSize: ["2xl", null, "3xl"],
    lineHeight: ["2rem", null, "2.25rem"]
  },
  md: {
    fontSize: "xl",
    lineHeight: "1.75rem"
  },
  sm: {
    fontSize: "md",
    lineHeight: "1.5rem"
  },
  xs: {
    fontSize: "sm",
    lineHeight: "1.25rem"
  }
};
var defaultProps$9 = {
  size: "xl"
};
var Heading = {
  baseStyle: baseStyle$e,
  sizes: sizes$7,
  defaultProps: defaultProps$9
};

var parts$9 = ["field", "addon"];
var baseStyle$f = {
  field: {
    width: "100%",
    outline: 0,
    position: "relative",
    appearance: "none",
    transition: "all 0.2s"
  }
};
var size = {
  lg: {
    fontSize: "lg",
    pl: 4,
    pr: 4,
    h: 12,
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    pl: 4,
    pr: 4,
    h: 10,
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    pl: 3,
    pr: 3,
    h: 8,
    borderRadius: "sm"
  }
};
var sizes$8 = {
  lg: {
    field: size.lg,
    addon: size.lg
  },
  md: {
    field: size.md,
    addon: size.md
  },
  sm: {
    field: size.sm,
    addon: size.sm
  }
};

function getDefaults(props) {
  var {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = props;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props)
  };
}

function variantOutline$2(props) {
  var {
    theme
  } = props;
  var {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = getDefaults(props);
  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: "0 0 0 1px " + getColor(theme, fc)
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: "0 0 0 1px " + getColor(theme, ec)
      }
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props)
    }
  };
}

function variantFilled(props) {
  var {
    theme
  } = props;
  var {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = getDefaults(props);
  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      _focus: {
        bg: "transparent",
        borderColor: getColor(theme, fc)
      },
      _invalid: {
        borderColor: getColor(theme, ec)
      }
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props)
    }
  };
}

function variantFlushed(props) {
  var {
    theme
  } = props;
  var {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = getDefaults(props);
  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: 0,
      pl: 0,
      pr: 0,
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _focus: {
        borderColor: getColor(theme, fc),
        boxShadow: "0px 1px 0px 0px " + getColor(theme, fc)
      },
      _invalid: {
        borderColor: getColor(theme, ec)
      }
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: 0,
      paddingX: 0,
      bg: "transparent"
    }
  };
}

var variantUnstyled$1 = {
  field: {
    bg: "transparent",
    pl: 0,
    pr: 0,
    height: "auto"
  },
  addon: {
    bg: "transparent",
    pl: 0,
    pr: 0,
    height: "auto"
  }
};
var variants$4 = {
  outline: variantOutline$2,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled$1
};
var defaultProps$a = {
  size: "md",
  variant: "outline"
};
var Input = {
  parts: parts$9,
  baseStyle: baseStyle$f,
  sizes: sizes$8,
  variants: variants$4,
  defaultProps: defaultProps$a
};

function baseStyle$g(props) {
  return {
    bg: mode("gray.100", "whiteAlpha")(props),
    borderRadius: "md",
    borderWidth: "1px",
    borderBottomWidth: "3px",
    fontSize: "0.8em",
    fontWeight: "bold",
    lineHeight: "normal",
    px: "0.4em",
    whiteSpace: "nowrap"
  };
}

var Kbd = {
  baseStyle: baseStyle$g
};

var baseStyle$h = {
  transition: "all 0.15s ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focus: {
    boxShadow: "outline"
  }
};
var Link = {
  baseStyle: baseStyle$h
};

var parts$a = ["item", "command", "list", "button", "groupTitle", "divider"];

function baseStyleList(props) {
  return {
    bg: mode("#fff", "gray.700")(props),
    boxShadow: mode("sm", "dark-lg")(props),
    color: "inherit",
    minW: "3xs",
    py: "2",
    zIndex: 1,
    borderRadius: "md",
    borderWidth: "1px"
  };
}

function baseStyleItem(props) {
  return {
    py: "0.4rem",
    px: "0.8rem",
    transition: "background 50ms ease-in 0s",
    _focus: {
      bg: mode("gray.100", "whiteAlpha.100")(props)
    },
    _active: {
      bg: mode("gray.200", "whiteAlpha.200")(props)
    },
    _expanded: {
      bg: mode("gray.100", "whiteAlpha.100")(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
}

var baseStyleGroupTitle = {
  mx: 4,
  my: 2,
  fontWeight: "semibold",
  fontSize: "sm"
};
var baseStyleCommand = {
  opacity: 0.6
};
var baseStyleDivider = {
  border: 0,
  borderBottom: "1px solid",
  borderColor: "inherit",
  my: "0.5rem",
  opacity: 0.6
};

var baseStyle$i = props => {
  return {
    list: baseStyleList(props),
    item: baseStyleItem(props),
    groupTitle: baseStyleGroupTitle,
    command: baseStyleCommand,
    divider: baseStyleDivider
  };
};

var Menu = {
  parts: parts$a,
  baseStyle: baseStyle$i
};

var _Input$baseStyle;
var parts$b = ["field", "stepper", "stepperGroup"];
var {
  variants: variants$5,
  defaultProps: defaultProps$b
} = Input;
var baseStyleField = (_Input$baseStyle = Input.baseStyle) == null ? void 0 : _Input$baseStyle.field;
var baseStyleStepperGroup = {
  width: "24px"
};

function baseStyleStepper(props) {
  return {
    borderLeft: "1px solid",
    borderColor: mode("inherit", "whiteAlpha.300")(props),
    color: mode("inherit", "whiteAlpha.800")(props),
    _active: {
      bg: mode("gray.200", "whiteAlpha.300")(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
}

var baseStyle$j = props => {
  return {
    field: baseStyleField,
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper(props)
  };
};

function getSize$3(size) {
  var _Input$sizes;

  var sizeStyle = (_Input$sizes = Input.sizes) == null ? void 0 : _Input$sizes[size];
  var radius = {
    lg: "md",
    md: "md",
    sm: "sm"
  };
  return {
    field: sizeStyle == null ? void 0 : sizeStyle.field,
    stepper: {
      fontSize: size === "lg" ? "14px" : "10px",
      _first: {
        borderTopRightRadius: radius[size]
      },
      _last: {
        borderBottomRightRadius: radius[size],
        mt: "-1px",
        borderTopWidth: 1
      }
    }
  };
}

var sizes$9 = {
  sm: getSize$3("sm"),
  md: getSize$3("md"),
  lg: getSize$3("lg")
};
var NumberInput = {
  parts: parts$b,
  baseStyle: baseStyle$j,
  sizes: sizes$9,
  variants: variants$5,
  defaultProps: defaultProps$b
};

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

var baseStyle$k = _extends$4({}, Input.baseStyle.field, {
  textAlign: "center"
});

var sizes$a = {
  lg: {
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm"
  }
};
var variants$6 = {
  outline: props => Input.variants.outline(props).field,
  flushed: props => Input.variants.flushed(props).field,
  filled: props => Input.variants.filled(props).field,
  unstyled: Input.variants.unstyled.field
};
var defaultProps$c = Input.defaultProps;
var PinInput = {
  baseStyle: baseStyle$k,
  sizes: sizes$a,
  variants: variants$6,
  defaultProps: defaultProps$c
};

var parts$c = ["popper", "content", "header", "body", "footer", "arrow"];
var baseStylePopper = {
  w: "100%",
  maxW: "xs",
  zIndex: 10
};

function baseStyleContent(props) {
  return {
    bg: mode("white", "gray.700")(props),
    border: "1px solid",
    borderColor: "inherit",
    borderRadius: "md",
    boxShadow: "sm",
    zIndex: "inherit",
    _focus: {
      outline: 0,
      boxShadow: "outline"
    }
  };
}

function baseStyleArrow(props) {
  return {
    bg: mode("white", "gray.700")(props)
  };
}

var baseStyleHeader$2 = {
  px: 3,
  py: 2,
  borderBottomWidth: "1px"
};
var baseStyleBody$2 = {
  px: 3,
  py: 2
};
var baseStyleFooter$2 = {
  px: 3,
  py: 2,
  borderTopWidth: "1px"
};

var baseStyle$l = props => {
  return {
    popper: baseStylePopper,
    content: baseStyleContent(props),
    header: baseStyleHeader$2,
    body: baseStyleBody$2,
    footer: baseStyleFooter$2,
    arrow: baseStyleArrow(props)
  };
};

var Popover = {
  parts: parts$c,
  baseStyle: baseStyle$l
};

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }
var parts$d = ["track", "filledTrack", "panel"];

function filledStyle(props) {
  var {
    colorScheme: c,
    theme: t,
    isIndeterminate,
    hasStripe
  } = props;
  var stripeStyle = mode(generateStripe(), generateStripe("1rem", "rgba(0,0,0,0.1)"))(props);
  var bgColor = mode(c + ".500", c + ".200")(props);
  var gradient = "linear-gradient(\n    to right,\n    transparent 0%,\n    " + getColor(t, bgColor) + " 50%,\n    transparent 100%\n  )";
  var addStripe = !isIndeterminate && hasStripe;
  return _extends$5({}, addStripe && stripeStyle, isIndeterminate ? {
    bgImage: gradient
  } : {
    bgColor
  });
}

var baseStyleLabel$1 = {
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white"
};

function baseStyleTrack(props) {
  return {
    bg: mode("gray.100", "whiteAlpha.300")(props)
  };
}

function baseStyleFilledTrack(props) {
  return _extends$5({
    transition: "all 0.3s"
  }, filledStyle(props));
}

var baseStyle$m = props => {
  return {
    label: baseStyleLabel$1,
    filledTrack: baseStyleFilledTrack(props),
    track: baseStyleTrack(props)
  };
};

var sizes$b = {
  xs: {
    track: {
      h: "0.25rem"
    }
  },
  sm: {
    track: {
      h: "0.5rem"
    }
  },
  md: {
    track: {
      h: "0.75rem"
    }
  },
  lg: {
    track: {
      h: "1rem"
    }
  }
};
var defaultProps$d = {
  size: "md",
  colorScheme: "blue"
};
var Progress = {
  parts: parts$d,
  sizes: sizes$b,
  baseStyle: baseStyle$m,
  defaultProps: defaultProps$d
};

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }
var parts$e = ["control", "label"];

function baseStyleControl$1(props) {
  var {
    control
  } = Checkbox.baseStyle(props);
  return _extends$6({}, control, {
    borderRadius: "full",
    _checked: _extends$6({}, control["_checked"], {
      _before: {
        content: "\"\"",
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor"
      }
    })
  });
}

var baseStyle$n = props => {
  return {
    label: Checkbox.baseStyle(props).label,
    control: baseStyleControl$1(props)
  };
};

var sizes$c = {
  md: {
    control: {
      w: 4,
      h: 4
    },
    label: {
      fontSize: "md"
    }
  },
  lg: {
    control: {
      w: 5,
      h: 5
    },
    label: {
      fontSize: "lg"
    }
  },
  sm: {
    control: {
      width: 3,
      height: 3
    },
    label: {
      fontSize: "sm"
    }
  }
};
var defaultProps$e = {
  size: "md",
  colorScheme: "blue"
};
var Radio = {
  parts: parts$e,
  baseStyle: baseStyle$n,
  sizes: sizes$c,
  defaultProps: defaultProps$e
};

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }
var {
  sizes: sizes$d,
  defaultProps: defaultProps$f,
  variants: variants$7
} = Input;
var parts$f = ["field", "icon"];

function baseStyleField$1(props) {
  return _extends$7({}, Input.baseStyle.field, {
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    "> option": {
      bg: mode("white", "gray.700")(props)
    }
  });
}

var baseStyleInput$1 = {
  color: "currentColor",
  fontSize: "1.25rem",
  _disabled: {
    opacity: 0.5
  }
};

var baseStyle$o = props => ({
  field: baseStyleField$1(props),
  icon: baseStyleInput$1
});

var Select = {
  parts: parts$f,
  baseStyle: baseStyle$o,
  sizes: sizes$d,
  variants: variants$7,
  defaultProps: defaultProps$f
};

function fade(startColor, endColor) {
  return keyframes({
    from: {
      borderColor: startColor,
      background: startColor
    },
    to: {
      borderColor: endColor,
      background: endColor
    }
  });
}

var baseStyle$p = props => {
  var defaultStartColor = mode("gray.100", "gray.800")(props);
  var defaultEndColor = mode("gray.400", "gray.600")(props);
  var {
    startColor = defaultStartColor,
    endColor = defaultEndColor,
    speed,
    theme
  } = props;
  var start = getColor(theme, startColor);
  var end = getColor(theme, endColor);
  return {
    opacity: 0.7,
    borderRadius: "2px",
    borderColor: start,
    background: end,
    animation: speed + "s linear infinite alternate " + fade(start, end)
  };
};

var Skeleton = {
  baseStyle: baseStyle$p
};

var baseStyle$q = props => {
  return {
    borderRadius: "md",
    fontWeight: "semibold",
    _focus: {
      boxShadow: "outline",
      padding: "1rem",
      position: "fixed",
      top: "1.5rem",
      left: "1.5rem",
      bg: mode("white", "gray.700")(props)
    }
  };
};

var SkipLink = {
  baseStyle: baseStyle$q
};

function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }
var parts$g = ["container", "thumb", "track", "filledTrack"];

function thumbOrientation(props) {
  return orient({
    orientation: props.orientation,
    vertical: {
      left: "50%",
      transform: "translateX(-50%)",
      _active: {
        transform: "translateX(-50%) scale(1.15)"
      }
    },
    horizontal: {
      top: "50%",
      transform: "translateY(-50%)",
      _active: {
        transform: "translateY(-50%) scale(1.15)"
      }
    }
  });
}

var baseStyleContainer$2 = props => {
  var {
    orientation
  } = props;
  return _extends$8({
    _disabled: {
      opacity: 0.6,
      cursor: "default",
      pointerEvents: "none"
    }
  }, orient({
    orientation,
    vertical: {
      h: "100%"
    },
    horizontal: {
      w: "100%"
    }
  }));
};

function baseStyleTrack$1(props) {
  return {
    borderRadius: "sm",
    bg: mode("gray.200", "whiteAlpha.200")(props),
    _disabled: {
      bg: mode("gray.300", "whiteAlpha.300")(props)
    }
  };
}

function baseStyleThumb(props) {
  return _extends$8({
    zIndex: 1,
    borderRadius: "full",
    bg: "white",
    boxShadow: "base",
    border: "1px solid",
    borderColor: "transparent",
    transition: "transform 0.2s",
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      bg: "gray.300"
    }
  }, thumbOrientation(props));
}

function baseStyleFilledTrack$1(props) {
  var {
    colorScheme: c
  } = props;
  return {
    bg: mode(c + ".500", c + ".200")(props)
  };
}

var baseStyle$r = props => ({
  container: baseStyleContainer$2(props),
  track: baseStyleTrack$1(props),
  thumb: baseStyleThumb(props),
  filledTrack: baseStyleFilledTrack$1(props)
});

function sizeLg(props) {
  return {
    thumb: {
      w: "16px",
      h: "16px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
}

function sizeMd(props) {
  return {
    thumb: {
      w: "14px",
      h: "14px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
}

function sizeSm(props) {
  return {
    thumb: {
      w: "10px",
      h: "10px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "2px"
      },
      vertical: {
        w: "2px"
      }
    })
  };
}

var sizes$e = {
  lg: sizeLg,
  md: sizeMd,
  sm: sizeSm
};
var defaultProps$g = {
  size: "md",
  colorScheme: "blue"
};
var Slider = {
  parts: parts$g,
  sizes: sizes$e,
  baseStyle: baseStyle$r,
  defaultProps: defaultProps$g
};

var sizes$f = {
  xs: {
    w: "0.75rem",
    h: "0.75rem"
  },
  sm: {
    w: "1rem",
    h: "1rem"
  },
  md: {
    w: "1.5rem",
    h: "1.5rem"
  },
  lg: {
    w: "2rem",
    h: "2rem"
  },
  xl: {
    w: "3rem",
    h: "3rem"
  }
};
var defaultProps$h = {
  size: "md"
};
var Spinner = {
  sizes: sizes$f,
  defaultProps: defaultProps$h
};

var parts$h = ["label", "number", "icon", "helpText"];
var baseStyleLabel$2 = {
  fontWeight: "medium"
};
var baseStyleHelpText = {
  opacity: 0.8,
  marginBottom: 2
};
var baseStyleNumber = {
  verticalAlign: "baseline",
  fontWeight: "semibold"
};
var baseStyleIcon = {
  mr: 1,
  w: "14px",
  h: "14px",
  verticalAlign: "middle"
};
var baseStyle$s = {
  label: baseStyleLabel$2,
  helpText: baseStyleHelpText,
  number: baseStyleNumber,
  icon: baseStyleIcon
};
var sizes$g = {
  md: {
    label: {
      fontSize: "sm"
    },
    helpText: {
      fontSize: "sm"
    },
    number: {
      fontSize: "2xl"
    }
  }
};
var defaultProps$i = {
  size: "md"
};
var Stat = {
  parts: parts$h,
  baseStyle: baseStyle$s,
  sizes: sizes$g,
  defaultProps: defaultProps$i
};

var parts$i = ["track", "thumb"];

function baseStyleTrack$2(props) {
  var {
    colorScheme: c
  } = props;
  return {
    borderRadius: "full",
    p: "2px",
    transition: "all 120ms",
    bg: mode("gray.300", "whiteAlpha.400")(props),
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    },
    _checked: {
      bg: mode(c + ".500", c + ".200")(props)
    }
  };
}

var baseStyleThumb$1 = {
  bg: "white",
  transition: "transform 250ms",
  borderRadius: "full",
  transform: "translateX(0)"
};

var baseStyle$t = props => ({
  track: baseStyleTrack$2(props),
  thumb: baseStyleThumb$1
});

var sizes$h = {
  sm: {
    track: {
      w: "1.375rem",
      h: "0.75rem"
    },
    thumb: {
      w: "0.75rem",
      h: "0.75rem",
      _checked: {
        transform: "translateX(0.625rem)"
      }
    }
  },
  md: {
    track: {
      w: "1.875rem",
      h: "1rem"
    },
    thumb: {
      w: "1rem",
      h: "1rem",
      _checked: {
        transform: "translateX(0.875rem)"
      }
    }
  },
  lg: {
    track: {
      w: "2.875rem",
      h: "1.5rem"
    },
    thumb: {
      w: "1.5rem",
      h: "1.5rem",
      _checked: {
        transform: "translateX(1.375rem)"
      }
    }
  }
};
var defaultProps$j = {
  size: "md",
  colorScheme: "blue"
};
var Switch = {
  parts: parts$i,
  baseStyle: baseStyle$t,
  sizes: sizes$h,
  defaultProps: defaultProps$j
};

var parts$j = ["tablist", "tab", "tabpanel", "indicator"];

function baseStyleTab(props) {
  var {
    isFitted
  } = props;
  return {
    flex: isFitted ? 1 : undefined,
    transition: "all 0.2s",
    _focus: {
      zIndex: 1,
      boxShadow: "outline"
    }
  };
}

function baseStyleTablist(props) {
  var {
    align = "start",
    orientation
  } = props;
  var alignments = {
    end: "flex-end",
    center: "center",
    start: "flex-start"
  };
  return {
    justifyContent: alignments[align],
    flexDirection: orientation === "vertical" ? "column" : "row"
  };
}

var baseStyleTabpanel = {
  p: 4
};

var baseStyle$u = props => {
  return {
    tab: baseStyleTab(props),
    tablist: baseStyleTablist(props),
    tabpanel: baseStyleTabpanel
  };
};

var sizes$i = {
  sm: {
    tab: {
      py: "0.25rem",
      px: "1rem",
      fontSize: "0.85rem"
    }
  },
  md: {
    tab: {
      fontSize: "1rem",
      py: "0.5rem",
      px: "1rem"
    }
  },
  lg: {
    tab: {
      fontSize: "1.15rem",
      py: "0.75rem",
      px: "1rem"
    }
  }
};

function variantLine(props) {
  var {
    colorScheme: c,
    orientation
  } = props;
  var borderProp = orientation === "vertical" ? "borderLeft" : "borderBottom";
  return {
    tablist: {
      [borderProp]: "2px solid",
      borderColor: "inherit"
    },
    tab: {
      [borderProp]: "2px solid",
      borderColor: "transparent",
      mb: "-2px",
      _selected: {
        color: mode(c + ".600", c + ".300")(props),
        borderColor: "currentColor"
      },
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props)
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      }
    }
  };
}

function variantEnclosed(props) {
  var {
    colorScheme: c
  } = props;
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      _selected: {
        color: mode(c + ".600", c + ".300")(props),
        borderColor: "inherit",
        borderBottomColor: mode("white", "gray.800")(props)
      }
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
}

function variantEnclosedColored(props) {
  var {
    colorScheme: c
  } = props;
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      bg: mode("gray.50", "whiteAlpha.50")(props),
      mb: "-1px",
      _notLast: {
        mr: "-1px"
      },
      _selected: {
        bg: mode("#fff", "gray.800")(props),
        color: mode(c + ".600", c + ".300")(props),
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent"
      }
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
}

function variantSoftRounded(props) {
  var {
    colorScheme: c,
    theme
  } = props;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(theme, c + ".700"),
        bg: getColor(theme, c + ".100")
      }
    }
  };
}

function variantSolidRounded(props) {
  var {
    colorScheme: c
  } = props;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: mode("gray.600", "inherit")(props),
      _selected: {
        color: mode("#fff", "gray.800")(props),
        bg: mode(c + ".600", c + ".300")(props)
      }
    }
  };
}

var variantUnstyled$2 = {};
var variants$8 = {
  line: variantLine,
  enclosed: variantEnclosed,
  "enclosed-colored": variantEnclosedColored,
  "soft-rounded": variantSoftRounded,
  "solid-rounded": variantSolidRounded,
  unstyled: variantUnstyled$2
};
var defaultProps$k = {
  size: "md",
  variant: "line",
  colorScheme: "blue"
};
var Tabs = {
  parts: parts$j,
  baseStyle: baseStyle$u,
  sizes: sizes$i,
  variants: variants$8,
  defaultProps: defaultProps$k
};

var parts$k = ["container", "label", "closeButton"];
var baseStyleContainer$3 = {
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  _focus: {
    boxShadow: "outline"
  }
};
var baseStyleLabel$3 = {
  lineHeight: 1.2
};
var baseStyleCloseButton = {
  fontSize: "18px",
  w: "1.25rem",
  h: "1.25rem",
  borderRadius: "sm",
  ml: "0.375rem",
  mr: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4
  },
  _focus: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)"
  },
  _hover: {
    opacity: 0.8
  },
  _active: {
    opacity: 1
  }
};
var baseStyle$v = {
  container: baseStyleContainer$3,
  label: baseStyleLabel$3,
  closeButton: baseStyleCloseButton
};
var sizes$j = {
  sm: {
    container: {
      minH: "1.25rem",
      minW: "1.25rem",
      fontSize: "xs",
      px: 1,
      borderRadius: "sm"
    }
  },
  md: {
    container: {
      minH: "1.5rem",
      minW: "1.5rem",
      fontSize: "sm",
      borderRadius: "md",
      px: 2
    }
  },
  lg: {
    container: {
      minH: 8,
      minW: 8,
      fontSize: "md",
      borderRadius: "md",
      px: 3
    }
  }
};
var variants$9 = {
  subtle: props => ({
    container: Badge.variants.subtle(props)
  }),
  solid: props => ({
    container: Badge.variants.solid(props)
  }),
  outline: props => ({
    container: Badge.variants.outline(props)
  })
};
var defaultProps$l = {
  size: "md",
  variant: "subtle",
  colorScheme: "gray"
};
var Tag = {
  parts: parts$k,
  variants: variants$9,
  baseStyle: baseStyle$v,
  sizes: sizes$j,
  defaultProps: defaultProps$l
};

function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }

var baseStyle$w = _extends$9({}, Input.baseStyle.field, {
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short"
});

var variants$a = {
  outline: props => Input.variants.outline(props).field,
  flushed: props => Input.variants.flushed(props).field,
  filled: props => Input.variants.filled(props).field,
  unstyled: Input.variants.unstyled.field
};
var sizes$k = {
  sm: Input.sizes.sm.field,
  md: Input.sizes.md.field,
  lg: Input.sizes.lg.field
};
var defaultProps$m = {
  size: "md",
  variant: "outline"
};
var Textarea = {
  baseStyle: baseStyle$w,
  sizes: sizes$k,
  variants: variants$a,
  defaultProps: defaultProps$m
};

function baseStyle$x(props) {
  return {
    px: "8px",
    py: "2px",
    bg: mode("gray.700", "gray.300")(props),
    color: mode("whiteAlpha.900", "gray.900")(props),
    borderRadius: "sm",
    fontWeight: "medium",
    pointerEvents: "none",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "320px",
    zIndex: "tooltip"
  };
}

var Tooltip = {
  baseStyle: baseStyle$x
};

var components = {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  CloseButton,
  Code,
  Drawer,
  Editable,
  Form,
  FormLabel,
  Heading,
  Input,
  Kbd,
  Link,
  Menu,
  Modal,
  NumberInput,
  PinInput,
  Popover,
  Progress,
  Radio,
  Select,
  Skeleton,
  SkipLink,
  Slider,
  Spinner,
  Stat,
  Switch,
  Tabs,
  Tag,
  Textarea,
  Tooltip
};

var borders = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid",
  "8px": "8px solid"
};

/**
 * Breakpoints for responsive design
 */

var breakpoints$1 = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em"
});

var colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  whiteAlpha: {
    50: "rgba(255, 255, 255, 0.04)",
    100: "rgba(255, 255, 255, 0.06)",
    200: "rgba(255, 255, 255, 0.08)",
    300: "rgba(255, 255, 255, 0.16)",
    400: "rgba(255, 255, 255, 0.24)",
    500: "rgba(255, 255, 255, 0.36)",
    600: "rgba(255, 255, 255, 0.48)",
    700: "rgba(255, 255, 255, 0.64)",
    800: "rgba(255, 255, 255, 0.80)",
    900: "rgba(255, 255, 255, 0.92)"
  },
  blackAlpha: {
    50: "rgba(0, 0, 0, 0.04)",
    100: "rgba(0, 0, 0, 0.06)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.16)",
    400: "rgba(0, 0, 0, 0.24)",
    500: "rgba(0, 0, 0, 0.36)",
    600: "rgba(0, 0, 0, 0.48)",
    700: "rgba(0, 0, 0, 0.64)",
    800: "rgba(0, 0, 0, 0.80)",
    900: "rgba(0, 0, 0, 0.92)"
  },
  gray: {
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923"
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B"
  },
  orange: {
    50: "#FFFAF0",
    100: "#FEEBC8",
    200: "#FBD38D",
    300: "#F6AD55",
    400: "#ED8936",
    500: "#DD6B20",
    600: "#C05621",
    700: "#9C4221",
    800: "#7B341E",
    900: "#652B19"
  },
  yellow: {
    50: "#FFFFF0",
    100: "#FEFCBF",
    200: "#FAF089",
    300: "#F6E05E",
    400: "#ECC94B",
    500: "#D69E2E",
    600: "#B7791F",
    700: "#975A16",
    800: "#744210",
    900: "#5F370E"
  },
  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532"
  },
  teal: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044"
  },
  blue: {
    50: "#ebf8ff",
    100: "#bee3f8",
    200: "#90cdf4",
    300: "#63b3ed",
    400: "#4299e1",
    500: "#3182ce",
    600: "#2b6cb0",
    700: "#2c5282",
    800: "#2a4365",
    900: "#1A365D"
  },
  cyan: {
    50: "#EDFDFD",
    100: "#C4F1F9",
    200: "#9DECF9",
    300: "#76E4F7",
    400: "#0BC5EA",
    500: "#00B5D8",
    600: "#00A3C4",
    700: "#0987A0",
    800: "#086F83",
    900: "#065666"
  },
  purple: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#9F7AEA",
    500: "#805AD5",
    600: "#6B46C1",
    700: "#553C9A",
    800: "#44337A",
    900: "#322659"
  },
  pink: {
    50: "#FFF5F7",
    100: "#FED7E2",
    200: "#FBB6CE",
    300: "#F687B3",
    400: "#ED64A6",
    500: "#D53F8C",
    600: "#B83280",
    700: "#97266D",
    800: "#702459",
    900: "#521B41"
  },
  linkedin: {
    50: "#E8F4F9",
    100: "#CFEDFB",
    200: "#9BDAF3",
    300: "#68C7EC",
    400: "#34B3E4",
    500: "#00A0DC",
    600: "#008CC9",
    700: "#0077B5",
    800: "#005E93",
    900: "#004471"
  },
  facebook: {
    50: "#E8F4F9",
    100: "#D9DEE9",
    200: "#B7C2DA",
    300: "#6482C0",
    400: "#4267B2",
    500: "#385898",
    600: "#314E89",
    700: "#29487D",
    800: "#223B67",
    900: "#1E355B"
  },
  messenger: {
    50: "#D0E6FF",
    100: "#B9DAFF",
    200: "#A2CDFF",
    300: "#7AB8FF",
    400: "#2E90FF",
    500: "#0078FF",
    600: "#0063D1",
    700: "#0052AC",
    800: "#003C7E",
    900: "#002C5C"
  },
  whatsapp: {
    50: "#E2F7F4",
    100: "#C3F0E9",
    200: "#A0E7DC",
    300: "#76DCCD",
    400: "#43CFBA",
    500: "#00BFA5",
    600: "#00AC92",
    700: "#009780",
    800: "#007D6A",
    900: "#005A4C"
  },
  twitter: {
    50: "#E5F4FD",
    100: "#C8E9FB",
    200: "#A8DCFA",
    300: "#83CDF7",
    400: "#57BBF5",
    500: "#1DA1F2",
    600: "#1A94DA",
    700: "#1681BF",
    800: "#136B9E",
    900: "#0D4D71"
  },
  telegram: {
    50: "#E3F2F9",
    100: "#C5E4F3",
    200: "#A2D4EC",
    300: "#7AC1E4",
    400: "#47A9DA",
    500: "#0088CC",
    600: "#007AB8",
    700: "#006BA1",
    800: "#005885",
    900: "#003F5E"
  }
};

var radii = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px"
};

var shadows = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  none: "none",
  "dark-lg": "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
};

var transitionProperty = {
  common: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  colors: "background-color, border-color, color, fill, stroke",
  dimensions: "width, height",
  position: "left, right, top, bottom",
  background: "background-color, background-image, background-position"
};
var transitionTimingFunction = {
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
var transitionDuration = {
  "ultra-fast": "50ms",
  faster: "100ms",
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "400ms",
  "ultra-slow": "500ms"
};
var transition$1 = {
  property: transitionProperty,
  easing: transitionTimingFunction,
  duration: transitionDuration
};

var typography$1 = {
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem"
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  fonts: {
    heading: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    body: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    mono: "SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace"
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem"
  }
};

var zIndices = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};

function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }

var theme = _extends$a({
  breakpoints: breakpoints$1,
  zIndices,
  radii,
  colors
}, typography$1, {
  sizes,
  shadows,
  space: spacing,
  borders,
  transition: transition$1
});

var styles = {
  global: props => ({
    body: {
      fontFamily: "body",
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("white", "gray.800")(props),
      transition: "background-color 0.2s",
      lineHeight: "base"
    },
    "*::placeholder": {
      color: mode("gray.400", "whiteAlpha.400")(props)
    },
    "*, *::before, &::after": {
      borderColor: mode("gray.200", "whiteAlpha.300")(props),
      wordWrap: "break-word"
    }
  })
};

function _extends$b() { _extends$b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }
/**
 * Color mode config
 */

var config$f = {
  useSystemColorMode: false,
  initialColorMode: "light"
};
var theme$1 = _extends$b({}, theme, {
  components,
  styles,
  config: config$f
});

/**
 * The global provider that must be added to make all Chakra components
 * work correctly
 */
var ChakraProvider = props => {
  var {
    children,
    colorModeManager,
    portalZIndex,
    resetCSS = true,
    theme = theme$1
  } = props;
  return /*#__PURE__*/react.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/react.createElement(ColorModeProvider, {
    colorModeManager: colorModeManager,
    options: theme.config
  }, resetCSS && /*#__PURE__*/react.createElement(CSSReset, null), /*#__PURE__*/react.createElement(GlobalStyle, null), portalZIndex ? /*#__PURE__*/react.createElement(PortalManager, {
    zIndex: portalZIndex
  }, children) : children));
};

// Number assertions
function isNumber$1(value) {
  return typeof value === "number";
}

function isArray$1(value) {
  return Array.isArray(value);
}

function isFunction$1(value) {
  return typeof value === "function";
} // Generic assertions

var isObject$1 = value => {
  var type = typeof value;
  return value != null && (type === "object" || type === "function") && !isArray$1(value);
};

function isString$1(value) {
  return Object.prototype.toString.call(value) === "[object String]";
} // Event assertions

function runIfFn$1(valueOrFn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return isFunction$1(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

function getLastItem$1(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
/**
 * since breakpoints are defined as custom properties on an array, you may
 * `Object.keys(theme.breakpoints)` to retrieve both regular numeric indices
 * and custom breakpoints as string.
 *
 * This function returns true given a custom array property.
 */

var isCustomBreakpoint$1 = maybeBreakpoint => Number.isNaN(parseInt(maybeBreakpoint, 10));

function omit(object, keys) {
  var result = {};
  Object.keys(object).forEach(key => {
    if (keys.includes(key)) return;
    result[key] = object[key];
  });
  return result;
}
/**
 * Get value from a deeply nested object using a string path.
 * Memoizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */

function get$2(obj, path, fallback, index) {
  var key = typeof path === "string" ? path.split(".") : [path];

  for (index = 0; index < key.length; index += 1) {
    if (!obj) {
      break;
    }

    obj = obj[key[index]];
  }

  return obj === undefined ? fallback : obj;
}

var memoize$1 = fn => {
  var cache = new WeakMap();

  var memoizedFn = (obj, path, fallback, index) => {
    if (!cache.has(obj)) {
      cache.set(obj, new Map());
    }

    var map = cache.get(obj);
    var key = typeof path === "string" ? path.split(".") : [path];

    if (map.has(key)) {
      return map.get(key);
    }

    var value = fn(obj, path, fallback, index);
    map.set(key, value);
    return value;
  };

  return memoizedFn;
};

var memoizedGet$1 = memoize$1(get$2);

/**
 * Returns the items of an object that meet the condition specified in a callback function.
 *
 * @param object the object to loop through
 * @param fn The filter function
 */
function objectFilter(object, fn) {
  var result = {};
  Object.keys(object).forEach(key => {
    var value = object[key];
    var shouldPass = fn(value, key, object);

    if (shouldPass) {
      result[key] = value;
    }
  });
  return result;
}
var objectKeys = obj => Object.keys(obj);

var breakpoints$2 = Object.freeze(["base", "sm", "md", "lg", "xl"]);
function objectToArrayNotation$1(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints$2;
  }

  var result = bps.map(br => {
    var _obj$br;

    return (_obj$br = obj[br]) != null ? _obj$br : null;
  });

  while (getLastItem$1(result) === null) {
    result.pop();
  }

  return result;
}
function isResponsiveObjectLike$1(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints$2;
  }

  var keys = Object.keys(obj);
  return keys.length > 0 && keys.every(key => bps.includes(key));
}

var config$g = {
  bg: {
    property: "background",
    scale: "colors"
  },
  bgColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  background: {
    property: "background",
    scale: "colors"
  },
  backgroundColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  bgImage: {
    property: "backgroundImage"
  },
  bgImg: {
    property: "backgroundImage"
  },
  bgBlendMode: {
    property: "backgroundBlendMode"
  },
  bgSize: {
    property: "backgroundSize"
  },
  bgPosition: {
    property: "backgroundPosition"
  },
  bgPos: {
    property: "backgroundPosition"
  },
  bgRepeat: {
    property: "backgroundRepeat"
  },
  bgAttachment: {
    property: "backgroundAttachment"
  }
};
var background$1 = system(config$g);
var backgroundParser$1 = createParser(config$g);

/**
 * The parser configuration for common border properties
 */
var config$h = {
  border: {
    property: "border",
    scale: "borders"
  },
  borderWidth: {
    property: "borderWidth",
    scale: "borderWidths"
  },
  borderStyle: {
    property: "borderStyle",
    scale: "borderStyles"
  },
  borderColor: {
    property: "borderColor",
    scale: "colors"
  },
  borderRadius: {
    property: "borderRadius",
    scale: "radii"
  },
  rounded: {
    property: "borderRadius",
    scale: "radii"
  },
  borderTop: {
    property: "borderTop",
    scale: "borders"
  },
  borderTopLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  roundedTopLeft: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  roundedTopRight: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  borderRight: {
    property: "borderRight",
    scale: "borders"
  },
  borderBottom: {
    property: "borderBottom",
    scale: "borders"
  },
  borderBottomLeftRadius: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  roundedBottomLeft: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  roundedBottomRight: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  borderLeft: {
    property: "borderLeft",
    scale: "borders"
  },
  borderX: {
    properties: ["borderLeft", "borderRight"],
    scale: "borders"
  },
  borderY: {
    properties: ["borderTop", "borderBottom"],
    scale: "borders"
  },
  borderTopWidth: {
    property: "borderTopWidth",
    scale: "borderWidths"
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors"
  },
  borderTopStyle: {
    property: "borderTopStyle",
    scale: "borderStyles"
  },
  borderBottomWidth: {
    property: "borderBottomWidth",
    scale: "borderWidths"
  },
  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors"
  },
  borderBottomStyle: {
    property: "borderBottomStyle",
    scale: "borderStyles"
  },
  borderLeftWidth: {
    property: "borderLeftWidth",
    scale: "borderWidths"
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors"
  },
  borderLeftStyle: {
    property: "borderLeftStyle",
    scale: "borderStyles"
  },
  borderRightWidth: {
    property: "borderRightWidth",
    scale: "borderWidths"
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors"
  },
  borderRightStyle: {
    property: "borderRightStyle",
    scale: "borderStyles"
  },
  borderTopRadius: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  roundedTop: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedBottom: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  roundedLeft: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedRight: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  }
};
/**
 * The prop types for border properties listed above
 */

var border$1 = system(config$h);
var borderParser$1 = createParser(config$h);

/**
 * The parser configuration for common border properties
 */
var config$i = {
  color: {
    property: "color",
    scale: "colors"
  },
  textColor: {
    property: "color",
    scale: "colors"
  },
  opacity: true,
  fill: {
    property: "fill",
    scale: "colors"
  },
  stroke: {
    property: "stroke",
    scale: "colors"
  }
};
var color$1 = system(config$i);
var colorParser$1 = createParser(config$i);

var config$j = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: {
    property: "flexBasis",
    scale: "sizes"
  },
  justifySelf: true,
  alignSelf: true,
  order: true,
  flexDir: {
    property: "flexDirection"
  }
};
/**
 * Types for flexbox related CSS properties
 */

var flexbox$1 = system(config$j);
var flexboxParser$1 = createParser(config$j);

var config$k = {
  gridGap: {
    property: "gridGap",
    scale: "space"
  },
  gridColumnGap: {
    property: "gridColumnGap",
    scale: "space"
  },
  gridRowGap: {
    property: "gridRowGap",
    scale: "space"
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
  placeItems: true
};
/**
 * Types for grid related CSS properties
 */

var grid$1 = system(config$k);
var gridParser$1 = createParser(config$k);

function transform$2(value, scale) {
  var defaultValue = !isNumber$1(value) || value > 1 ? value : value * 100 + "%";
  return memoizedGet$1(scale, value, defaultValue);
}

var config$l = {
  width: {
    property: "width",
    scale: "sizes",
    transform: transform$2
  },
  w: {
    property: "width",
    scale: "sizes",
    transform: transform$2
  },
  height: {
    property: "height",
    scale: "sizes"
  },
  h: {
    property: "height",
    scale: "sizes"
  },
  boxSize: {
    properties: ["width", "height"],
    scale: "sizes"
  },
  minWidth: {
    property: "minWidth",
    scale: "sizes"
  },
  minW: {
    property: "minWidth",
    scale: "sizes"
  },
  minHeight: {
    property: "minHeight",
    scale: "sizes"
  },
  minH: {
    property: "minHeight",
    scale: "sizes"
  },
  maxWidth: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxHeight: {
    property: "maxHeight",
    scale: "sizes"
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes"
  },
  d: {
    property: "display"
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true
};
/**
 * Types for layout related CSS properties
 */

var layout$1 = system(config$l);
var layoutParser$1 = createParser(config$l);

var config$m = {
  animation: true,
  appearance: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  objectFit: true,
  objectPosition: true,
  float: true,
  willChange: true
};
var others$1 = system(config$m);
var othersParser$1 = createParser(config$m);

var startsWith$1 = (string, target) => string.slice(0, 0 + target.length) === target;

function positiveOrNegative$1(value, scale) {
  if (!scale || value == null) return value;
  var result;
  var valueString = value.toString();

  if (startsWith$1(valueString, "-")) {
    var raw = scale[valueString.slice(1)];

    if (isString$1(raw)) {
      result = "-" + raw;
    } else if (isNumber$1(raw)) {
      result = raw * -1;
    } else {
      result = value;
    }
  } else {
    var _scale$value;

    result = (_scale$value = scale[value]) != null ? _scale$value : value;
  }

  var computedValue = result || value;
  var hasUnit = cssGetUnit(computedValue);

  if (!hasUnit && !Number.isNaN(Number(computedValue))) {
    computedValue = Number(computedValue);
  }

  return computedValue;
}

var config$n = {
  position: true,
  pos: {
    property: "position"
  },
  zIndex: {
    property: "zIndex",
    scale: "zIndices"
  },
  inset: {
    properties: ["left", "top", "bottom", "right"],
    scale: "space",
    transform: positiveOrNegative$1
  },
  insetX: {
    properties: ["left", "right"],
    scale: "space",
    transform: positiveOrNegative$1
  },
  insetY: {
    properties: ["top", "bottom"],
    scale: "space",
    transform: positiveOrNegative$1
  },
  top: {
    property: "top",
    scale: "space",
    transform: positiveOrNegative$1
  },
  right: {
    property: "right",
    scale: "space",
    transform: positiveOrNegative$1
  },
  bottom: {
    property: "bottom",
    scale: "space",
    transform: positiveOrNegative$1
  },
  left: {
    property: "left",
    scale: "space",
    transform: positiveOrNegative$1
  }
};
/**
 * Types for position CSS properties
 */

var position$1 = system(config$n);
var positionParser$1 = createParser(config$n);

var config$o = {
  boxShadow: {
    property: "boxShadow",
    scale: "shadows"
  },
  textShadow: {
    property: "textShadow",
    scale: "shadows"
  },
  shadow: {
    property: "boxShadow",
    scale: "shadows"
  }
};
/**
 * Types for box and text shadow properties
 */

var shadow$1 = system(config$o);
var shadowParser$1 = createParser(config$o);

var config$p = {
  margin: {
    property: "margin",
    transform: positiveOrNegative$1,
    scale: "space"
  },
  m: {
    property: "margin",
    transform: positiveOrNegative$1,
    scale: "space"
  },
  marginTop: {
    property: "marginTop",
    transform: positiveOrNegative$1,
    scale: "space"
  },
  mt: {
    property: "marginTop",
    transform: positiveOrNegative$1,
    scale: "space"
  },
  marginRight: {
    property: "marginRight",
    transform: positiveOrNegative$1,
    scale: "space"
  },
  mr: {
    property: "marginRight",
    transform: positiveOrNegative$1,
    scale: "space"
  },
  marginBottom: {
    property: "marginBottom",
    transform: positiveOrNegative$1,
    scale: "space"
  },
  mb: {
    property: "marginBottom",
    transform: positiveOrNegative$1,
    scale: "space"
  },
  marginLeft: {
    property: "marginLeft",
    transform: positiveOrNegative$1,
    scale: "space"
  },
  ml: {
    property: "marginLeft",
    transform: positiveOrNegative$1,
    scale: "space"
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative$1,
    scale: "space"
  },
  mx: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative$1,
    scale: "space"
  },
  marginY: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative$1,
    scale: "space"
  },
  my: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative$1,
    scale: "space"
  },
  padding: {
    property: "padding",
    scale: "space"
  },
  p: {
    property: "padding",
    scale: "space"
  },
  paddingTop: {
    property: "paddingTop",
    scale: "space"
  },
  pt: {
    property: "paddingTop",
    scale: "space"
  },
  paddingRight: {
    property: "paddingRight",
    scale: "space"
  },
  pr: {
    property: "paddingRight",
    scale: "space"
  },
  paddingBottom: {
    property: "paddingBottom",
    scale: "space"
  },
  pb: {
    property: "paddingBottom",
    scale: "space"
  },
  paddingLeft: {
    property: "paddingLeft",
    scale: "space"
  },
  pl: {
    property: "paddingLeft",
    scale: "space"
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  px: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  },
  py: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  }
};
/**
 * Types for space related CSS properties
 */

/**
 * Converts shorthand or longhand margin and padding props to margin and padding CSS declarations
 *
 * - Numbers from 0-4 (or the length of theme.space) are converted to values on the spacing scale.
 * - Negative values can be used for negative margins.
 * - Numbers greater than the length of the theme.space array are converted to raw pixel values.
 * - String values are passed as raw CSS values.
 * - Array values are converted into responsive values.
 */
var space$1 = system(config$p);
var spaceParser$1 = createParser(config$p);

var config$q = {
  fontFamily: {
    property: "fontFamily",
    scale: "fonts"
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSizes"
  },
  fontWeight: {
    property: "fontWeight",
    scale: "fontWeights"
  },
  lineHeight: {
    property: "lineHeight",
    scale: "lineHeights"
  },
  letterSpacing: {
    property: "letterSpacing",
    scale: "letterSpacings"
  },
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: true,
  textDecor: {
    property: "textDecoration"
  }
};
/**
 * Types for typography related CSS properties
 */

var typography$2 = system(config$q);
var typographyParser$1 = createParser(config$q);

/**
 * The parser configuration for common outline properties
 */
var config$r = {
  outline: true,
  outlineOffset: true,
  outlineColor: {
    property: "outlineColor",
    scale: "colors"
  }
};
var outline$1 = system(config$r);
var outlineParser$1 = createParser(config$r);

var config$s = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: {
    property: "listStylePosition"
  },
  listStyleImage: true,
  listStyleImg: {
    property: "listStyleImage"
  }
};
var list$1 = system(config$s);
var listParser$1 = createParser(config$s);

var config$t = {
  transition: true,
  transitionDuration: {
    property: "transitionDuration",
    scale: "transition.duration"
  },
  transitionProperty: {
    property: "transitionProperty",
    scale: "transition.property"
  },
  transitionTimingFunction: {
    property: "transitionTimingFunction",
    scale: "transition.easing"
  }
};
var transition$2 = system(config$t);
var transitionParser$1 = createParser(config$t);

var config$u = {
  transform: true,
  transformOrigin: true
};
var transform$3 = system(config$u);
var transformParser$1 = createParser(config$u);

var group$1 = {
  hover: selector => selector + ":hover &, " + selector + "[data-hover] &",
  focus: selector => selector + ":focus &, " + selector + "[data-focus] &",
  active: selector => selector + ":active &, " + selector + "[data-active] &",
  disabled: selector => selector + ":disabled &, " + selector + "[data-disabled] &",
  invalid: selector => selector + ":invalid &, " + selector + "[data-invalid] &",
  checked: selector => selector + ":checked &, " + selector + "[data-checked] &",
  indeterminate: selector => selector + ":indeterminate &, " + selector + "[aria-checked=mixed] &, " + selector + "[data-indeterminate] &",
  readOnly: selector => selector + ":read-only &, " + selector + "[readonly] &, " + selector + "[data-read-only] &",
  expanded: selector => selector + ":read-only &, " + selector + "[aria-expanded=true] &, " + selector + "[data-expanded] &"
};

function toGroup$1(fn) {
  return merge$3(fn, "[role=group]", "[data-group]");
}

function merge$3(fn) {
  for (var _len = arguments.length, selectors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    selectors[_key - 1] = arguments[_key];
  }

  return selectors.map(fn).join(", ");
}

var disabled$1 = selector => selector + ", " + selector + ":focus, " + selector + ":hover";

var disabledSelector$1 = merge$3(disabled$1, "&[disabled]", "&[aria-disabled=true]", "&[data-disabled]");
var pseudoSelectors$1 = {
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover: "&:hover, &[data-hover]",

  /**
   * Styles for CSS Selector `&:active`
   */
  _active: "&:active, &[data-active]",

  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus: "&:focus, &[data-focus]",

  /**
   * Styles for the highlighted state.
   */
  _highlighted: "&[data-highlighted]",

  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin: "&:focus-within",
  _focusVisible: "&:focus-visible",

  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled: disabledSelector$1,

  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",

  /**
   * Styles for CSS selector `&::before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before: "&::before",

  /**
   * Styles for CSS selector `&::after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _after={{content:`""` }}/>
   * ```
   */
  _after: "&::after",
  _empty: "&:empty",

  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded: "&[aria-expanded=true], &[data-expanded]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked: "&[aria-checked=true], &[data-checked]",

  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed: "&[aria-grabbed=true], &[data-grabbed]",

  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed: "&[aria-pressed=true], &[data-pressed]",

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid: "&[aria-invalid=true], &[data-invalid]",

  /**
   * Styles for the valid state
   * - CSS selector `&[data-valid], &[data-state=valid]`
   */
  _valid: "&[data-valid], &[data-state=valid]",

  /**
   * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
   * Useful for styling loading states
   */
  _loading: "&[data-loading], &[aria-busy=true]",

  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   *
   * - CSS selector `&[aria-selected=true]`
   */
  _selected: "&[aria-selected=true], &[data-selected]",

  /**
   * Styles for CSS Selector `[hidden=true]`
   */
  _hidden: "&[hidden], &[data-hidden]",

  /**
   * Styles for CSS Selector `&:-webkit-autofill`
   */
  _autofill: "&:-webkit-autofill",

  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even: "&:nth-of-type(even)",

  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd: "&:nth-of-type(odd)",

  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first: "&:first-of-type",

  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last: "&:last-of-type",

  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst: "&:not(:first-of-type)",

  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast: "&:not(:last-of-type)",

  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited: "&:visited",

  /**
   * Used to style the active link in a navigation
   * Styles for CSS Selector `&[aria-current=page]`
   */
  _activeLink: "&[aria-current=page]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",

  /**
   * Styles to apply when parent is hovered
   */
  _groupHover: toGroup$1(group$1.hover),

  /**
   * Styles to apply when parent is focused
   */
  _groupFocus: toGroup$1(group$1.focus),

  /**
   * Styles to apply when parent is active
   */
  _groupActive: toGroup$1(group$1.active),

  /**
   * Styles to apply when parent is disabled
   */
  _groupDisabled: toGroup$1(group$1.disabled),

  /**
   * Styles to apply when parent is invalid
   */
  _groupInvalid: toGroup$1(group$1.invalid),

  /**
   * Styles to apply when parent is checked
   */
  _groupChecked: toGroup$1(group$1.checked),

  /**
   * Styles for CSS Selector `&::placeholder`.
   */
  _placeholder: "&::placeholder",

  /**
   * Styles for CSS Selector `&:fullscreen`.
   */
  _fullScreen: "&:fullscreen",

  /**
   * Styles for CSS Selector `&::selection`
   */
  _selection: "&::selection"
};
var pseudoPropNames = objectKeys(pseudoSelectors$1);

var parser$1 = compose(backgroundParser$1, borderParser$1, colorParser$1, flexboxParser$1, layoutParser$1, outlineParser$1, gridParser$1, othersParser$1, positionParser$1, shadowParser$1, spaceParser$1, typographyParser$1, transformParser$1, transitionParser$1, listParser$1);

var cache$1 = {
  themeBreakpoints: [],
  breakpoints: [],
  breakpointValues: [],
  mediaQueries: []
};

/**
 *
 */
var calculateBreakpointAndMediaQueries$1 = function calculateBreakpointAndMediaQueries(themeBreakpoints) {
  if (themeBreakpoints === void 0) {
    themeBreakpoints = [];
  }

  // caching here reduces execution time by factor 4-6x
  var isCached = cache$1.themeBreakpoints === themeBreakpoints;

  if (isCached) {
    return cache$1;
  }

  var {
    breakpoints,
    breakpointValues
  } = Object.entries(themeBreakpoints).filter((_ref) => {
    var [key] = _ref;
    return isCustomBreakpoint$1(key);
  }).reduce((carry, _ref2) => {
    var [breakpoint, value] = _ref2;
    carry.breakpoints.push(breakpoint);
    carry.breakpointValues.push(value);
    return carry;
  }, {
    breakpoints: [],
    breakpointValues: []
  });
  var mediaQueries = [null, ...breakpointValues.map(bp => "@media screen and (min-width: " + bp + ")").slice(1)];
  cache$1.themeBreakpoints = themeBreakpoints;
  cache$1.mediaQueries = mediaQueries;
  cache$1.breakpointValues = breakpointValues;
  cache$1.breakpoints = breakpoints;
  return {
    breakpoints,
    mediaQueries
  };
};

var responsive$1 = styles => theme => {
  var computedStyles = {};
  var {
    breakpoints,
    mediaQueries
  } = calculateBreakpointAndMediaQueries$1(theme.breakpoints);

  for (var key in styles) {
    var value = runIfFn$1(styles[key], theme);

    if (value == null) {
      continue;
    }

    value = isResponsiveObjectLike$1(value, breakpoints) ? objectToArrayNotation$1(value, breakpoints) : value;

    if (!isArray$1(value)) {
      computedStyles[key] = value;
      continue;
    }

    var queries = value.slice(0, mediaQueries.length).length;

    for (var index = 0; index < queries; index += 1) {
      var media = mediaQueries[index];

      if (!media) {
        computedStyles[key] = value[index];
        continue;
      }

      computedStyles[media] = computedStyles[media] || {};

      if (value[index] == null) {
        continue;
      }

      computedStyles[media][key] = value[index];
    }
  }

  return computedStyles;
};

var css$2 = function css(args) {
  if (args === void 0) {
    args = {};
  }

  return function (props) {
    if (props === void 0) {
      props = {};
    }

    var theme = "theme" in props ? props.theme : props;
    var computedStyles = {};
    var styleObject = runIfFn$1(args, theme);
    var styles = responsive$1(styleObject)(theme);

    for (var k in styles) {
      var _config$transform;

      var x = styles[k];
      var val = runIfFn$1(x, theme);
      var key = k in pseudoSelectors$1 ? pseudoSelectors$1[k] : k;
      var config = parser$1.config[key];

      if (key === "apply") {
        var apply = css(memoizedGet$1(theme, val))(theme);
        computedStyles = lodash_mergewith({}, computedStyles, apply);
        continue;
      }

      if (isObject$1(val)) {
        computedStyles[key] = css(val)(theme);
        continue;
      }

      var scale = memoizedGet$1(theme, config == null ? void 0 : config.scale, {});
      var value = (_config$transform = config == null ? void 0 : config.transform == null ? void 0 : config.transform(val, scale)) != null ? _config$transform : memoizedGet$1(scale, val, val);

      if (config == null ? void 0 : config.properties) {
        for (var property of config.properties) {
          computedStyles[property] = value;
        }

        continue;
      }

      if (config == null ? void 0 : config.property) {
        computedStyles[config.property] = value;
        continue;
      }

      computedStyles[key] = value;
    }

    return computedStyles;
  };
};

var systemProps$1 = compose(background$1, border$1, color$1, flexbox$1, layout$1, outline$1, grid$1, others$1, position$1, shadow$1, space$1, typography$2, transform$3, list$1, transition$2);
var layoutSystem$1 = compose(space$1, layout$1, flexbox$1, grid$1, position$1);
var propNames = [...systemProps$1.propNames, ...pseudoPropNames];

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
var domElements = ["a", "b", "article", "aside", "blockquote", "button", "caption", "cite", "circle", "code", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "img", "input", "kbd", "label", "li", "mark", "nav", "ol", "p", "path", "pre", "q", "rect", "s", "svg", "section", "select", "strong", "small", "span", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "tr", "ul"];

var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

var newStyled = createStyled.bind();
tags.forEach(function (tagName) {
  newStyled[tagName] = newStyled(tagName);
});

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */

var allPropNames = new Set([...propNames, "textStyle", "layerStyle", "apply", "isTruncated", "noOfLines", "focusBorderColor", "errorBorderColor", "as", "__css", "css", "sx"]);
/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */

var validHTMLProps = new Set(["htmlWidth", "htmlHeight", "htmlSize"]);
var shouldForwardProp = prop => validHTMLProps.has(prop) || !allPropNames.has(prop);

function _extends$c() { _extends$c = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Convert propNames array to object to faster lookup perf
 */

var stylePropNames = propNames.reduce((keymirror, key) => {
  if (typeof key !== "object" && typeof key !== "function") keymirror[key] = key;
  return keymirror;
}, {});

/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */
var styleResolver = (_ref) => {
  var {
    baseStyle
  } = _ref;
  return props => {
    var {
      theme,
      layerStyle,
      textStyle,
      apply,
      noOfLines,
      isTruncated,
      css: cssProp,
      __css,
      sx
    } = props,
        rest = _objectWithoutPropertiesLoose(props, ["theme", "layerStyle", "textStyle", "apply", "noOfLines", "isTruncated", "css", "__css", "sx"]);

    var _layerStyle = memoizedGet$1(theme, "layerStyles." + layerStyle, {});

    var _textStyle = memoizedGet$1(theme, "textStyles." + textStyle, {}); // filter out props that aren't style props


    var styleProps = objectFilter(rest, (_, prop) => prop in stylePropNames);
    var truncateStyle = {};

    if (noOfLines != null) {
      truncateStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: noOfLines
      };
    } else if (isTruncated) {
      truncateStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      };
    }
    /**
     * The computed, theme-aware style object. The other of the properties
     * within `objectAssign` determines how styles are overriden.
     */


    var finalStyles = objectAssign({}, __css, baseStyle, {
      apply
    }, _layerStyle, _textStyle, truncateStyle, styleProps, sx); // Converts theme-aware style object to real css object

    var computedCSS = css$2(finalStyles)(props.theme); // Merge the computed css object with styles in css prop

    var cssObject = objectAssign(computedCSS, isFunction$1(cssProp) ? cssProp(theme) : cssProp);
    return cssObject;
  };
};
function styled(component, options) {
  var _ref2 = options != null ? options : {},
      {
    baseStyle
  } = _ref2,
      styledOptions = _objectWithoutPropertiesLoose(_ref2, ["baseStyle"]);

  var opts = _extends$c({}, styledOptions, {
    shouldForwardProp
  });

  var _styled = newStyled(component, opts);

  var interpolation = styleResolver({
    baseStyle
  });

  var StyledComponent = _styled(interpolation);

  return StyledComponent;
}
var chakra = styled;
domElements.forEach(tag => {
  // @ts-expect-error
  chakra[tag] = chakra(tag);
});

/**
 * All credit goes to Chance (Reach UI), and Haz (Reakit) for creating
 * the base type definitions upon which we improved on
 */
function forwardRef(component) {
  return /*#__PURE__*/react.forwardRef(component);
}

/**
 * React hook that loads an image in the browser,
 * and let's us know the `status` so we can show image
 * fallback if it's still `pending`
 *
 * @returns the status of the image loading progress
 *
 * @example
 *
 * ```jsx
 * function App(){
 *   const status = useImage({ src: "image.png" })
 *   return status === "loaded" ? <img src="image.png" /> : <Placeholder />
 * }
 * ```
 */
function useImage(props) {
  var {
    src,
    srcSet,
    onLoad,
    onError,
    crossOrigin,
    sizes,
    ignoreFallback
  } = props;
  var [status, setStatus] = react.useState("pending");
  react.useEffect(() => {
    setStatus(src ? "loading" : "pending");
  }, [src]);
  var imageRef = react.useRef();
  var load = react.useCallback(() => {
    if (!src) return;
    flush();
    var img = new Image();
    img.src = src;

    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }

    if (srcSet) {
      img.srcset = srcSet;
    }

    if (sizes) {
      img.sizes = sizes;
    }

    img.onload = event => {
      flush();
      setStatus("loaded");
      onLoad == null ? void 0 : onLoad(event);
    };

    img.onerror = error => {
      flush();
      setStatus("failed");
      onError == null ? void 0 : onError(error);
    };

    imageRef.current = img;
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError]);

  var flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  };

  useSafeLayoutEffect(() => {
    /**
     * If user opts out of the fallback/placeholder
     * logic, let's bail out.
     */
    if (ignoreFallback) return undefined;

    if (status === "loading") {
      load();
    }

    return () => {
      flush();
    };
  }, [status, load, ignoreFallback]);
  /**
   * If user opts out of the fallback/placeholder
   * logic, let's just return 'loaded'
   */

  return ignoreFallback ? "loaded" : status;
}

function _extends$d() { _extends$d = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var NativeImage = /*#__PURE__*/react.forwardRef(function NativeImage(props, ref) {
  var {
    htmlWidth,
    htmlHeight,
    alt
  } = props,
      rest = _objectWithoutPropertiesLoose$1(props, ["htmlWidth", "htmlHeight", "alt"]);

  return /*#__PURE__*/react.createElement("img", _extends$d({
    width: htmlWidth,
    height: htmlHeight,
    ref: ref,
    alt: alt
  }, rest));
});

/**
 * React component that renders an image with support
 * for fallbacks
 *
 * @see Docs https://chakra-ui.com/components/image
 */
var Image$1 = /*#__PURE__*/forwardRef(function Image(props, ref) {
  var {
    fallbackSrc,
    fallback,
    src,
    align,
    fit,
    loading,
    ignoreFallback,
    crossOrigin
  } = props,
      rest = _objectWithoutPropertiesLoose$1(props, ["fallbackSrc", "fallback", "src", "align", "fit", "loading", "ignoreFallback", "crossOrigin"]);
  /**
   * Defer to native `img` tag if `loading` prop is passed
   * @see https://github.com/chakra-ui/chakra-ui/issues/1027
   */


  var shouldIgnore = loading != null || ignoreFallback;
  var status = useImage(_extends$d({}, props, {
    ignoreFallback: shouldIgnore
  }));

  var shared = _extends$d({
    ref,
    objectFit: fit,
    objectPosition: align
  }, shouldIgnore ? rest : omit(rest, ["onError", "onLoad"]));

  if (status !== "loaded") {
    /**
     * If user passed a custom fallback component,
     * let's render it here.
     */
    if (fallback) return fallback;
    return /*#__PURE__*/react.createElement(chakra.img, _extends$d({
      as: NativeImage,
      className: "chakra-image__placeholder",
      src: fallbackSrc
    }, shared));
  }

  return /*#__PURE__*/react.createElement(chakra.img, _extends$d({
    as: NativeImage,
    src: src,
    crossOrigin: crossOrigin,
    loading: loading,
    className: "chakra-image"
  }, shared));
});

// Number assertions
function isNumber$2(value) {
  return typeof value === "number";
}

function isArray$2(value) {
  return Array.isArray(value);
}

function isFunction$2(value) {
  return typeof value === "function";
} // Generic assertions

var isObject$2 = value => {
  var type = typeof value;
  return value != null && (type === "object" || type === "function") && !isArray$2(value);
};

function isString$2(value) {
  return Object.prototype.toString.call(value) === "[object String]";
} // Event assertions

function runIfFn$2(valueOrFn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return isFunction$2(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

var win$2;
/**
 * Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
 * hits a memory leak, whereas aliasing it and calling "typeof win" does not.
 * Caching the window value at the file scope lets us minimize the impact.
 *
 * @see IE11 Memory Leak Issue https://github.com/microsoft/fluentui/pull/9010#issuecomment-490768427
 */

try {
  win$2 = window;
} catch (e) {
  /* no-op */
}
/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11.
 */


var getWindow$2 = node => {
  var _node$ownerDocument$d, _node$ownerDocument;

  return (_node$ownerDocument$d = node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) != null ? _node$ownerDocument$d : win$2;
};
/**
 * Check if we can use the DOM. Useful for SSR purposes
 */

function checkIsBrowser$2() {
  var win = getWindow$2();
  return Boolean(typeof win !== "undefined" && win.document && win.document.createElement);
}

var isBrowser$3 = checkIsBrowser$2();
var cx = function cx() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }

  return classNames.filter(Boolean).join(" ");
};

function getLastItem$2(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
/**
 * since breakpoints are defined as custom properties on an array, you may
 * `Object.keys(theme.breakpoints)` to retrieve both regular numeric indices
 * and custom breakpoints as string.
 *
 * This function returns true given a custom array property.
 */

var isCustomBreakpoint$2 = maybeBreakpoint => Number.isNaN(parseInt(maybeBreakpoint, 10));

function omit$1(object, keys) {
  var result = {};
  Object.keys(object).forEach(key => {
    if (keys.includes(key)) return;
    result[key] = object[key];
  });
  return result;
}
/**
 * Get value from a deeply nested object using a string path.
 * Memoizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */

function get$3(obj, path, fallback, index) {
  var key = typeof path === "string" ? path.split(".") : [path];

  for (index = 0; index < key.length; index += 1) {
    if (!obj) {
      break;
    }

    obj = obj[key[index]];
  }

  return obj === undefined ? fallback : obj;
}

var memoize$2 = fn => {
  var cache = new WeakMap();

  var memoizedFn = (obj, path, fallback, index) => {
    if (!cache.has(obj)) {
      cache.set(obj, new Map());
    }

    var map = cache.get(obj);
    var key = typeof path === "string" ? path.split(".") : [path];

    if (map.has(key)) {
      return map.get(key);
    }

    var value = fn(obj, path, fallback, index);
    map.set(key, value);
    return value;
  };

  return memoizedFn;
};

var memoizedGet$2 = memoize$2(get$3);

/**
 * Returns the items of an object that meet the condition specified in a callback function.
 *
 * @param object the object to loop through
 * @param fn The filter function
 */
function objectFilter$1(object, fn) {
  var result = {};
  Object.keys(object).forEach(key => {
    var value = object[key];
    var shouldPass = fn(value, key, object);

    if (shouldPass) {
      result[key] = value;
    }
  });
  return result;
}
var filterUndefined = object => objectFilter$1(object, val => val !== null && val !== undefined);
var objectKeys$1 = obj => Object.keys(obj);

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
function createContext$2(options) {
  if (options === void 0) {
    options = {};
  }

  var {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name
  } = options;
  var Context = /*#__PURE__*/react.createContext(undefined);
  Context.displayName = name;

  function useContext() {
    var context = react.useContext(Context);

    if (!context && strict) {
      throw new Error(errorMessage);
    }

    return context;
  }

  return [Context.Provider, useContext, Context];
}

var breakpoints$3 = Object.freeze(["base", "sm", "md", "lg", "xl"]);
function objectToArrayNotation$2(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints$3;
  }

  var result = bps.map(br => {
    var _obj$br;

    return (_obj$br = obj[br]) != null ? _obj$br : null;
  });

  while (getLastItem$2(result) === null) {
    result.pop();
  }

  return result;
}
function isResponsiveObjectLike$2(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints$3;
  }

  var keys = Object.keys(obj);
  return keys.length > 0 && keys.every(key => bps.includes(key));
}

var ColorModeContext$1 = /*#__PURE__*/react.createContext({});
/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */


var useColorMode$1 = () => {
  var context = react.useContext(ColorModeContext$1);

  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }

  return context;
};

var config$v = {
  bg: {
    property: "background",
    scale: "colors"
  },
  bgColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  background: {
    property: "background",
    scale: "colors"
  },
  backgroundColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  bgImage: {
    property: "backgroundImage"
  },
  bgImg: {
    property: "backgroundImage"
  },
  bgBlendMode: {
    property: "backgroundBlendMode"
  },
  bgSize: {
    property: "backgroundSize"
  },
  bgPosition: {
    property: "backgroundPosition"
  },
  bgPos: {
    property: "backgroundPosition"
  },
  bgRepeat: {
    property: "backgroundRepeat"
  },
  bgAttachment: {
    property: "backgroundAttachment"
  }
};
var background$2 = system(config$v);
var backgroundParser$2 = createParser(config$v);

/**
 * The parser configuration for common border properties
 */
var config$w = {
  border: {
    property: "border",
    scale: "borders"
  },
  borderWidth: {
    property: "borderWidth",
    scale: "borderWidths"
  },
  borderStyle: {
    property: "borderStyle",
    scale: "borderStyles"
  },
  borderColor: {
    property: "borderColor",
    scale: "colors"
  },
  borderRadius: {
    property: "borderRadius",
    scale: "radii"
  },
  rounded: {
    property: "borderRadius",
    scale: "radii"
  },
  borderTop: {
    property: "borderTop",
    scale: "borders"
  },
  borderTopLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  roundedTopLeft: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  roundedTopRight: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  borderRight: {
    property: "borderRight",
    scale: "borders"
  },
  borderBottom: {
    property: "borderBottom",
    scale: "borders"
  },
  borderBottomLeftRadius: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  roundedBottomLeft: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  roundedBottomRight: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  borderLeft: {
    property: "borderLeft",
    scale: "borders"
  },
  borderX: {
    properties: ["borderLeft", "borderRight"],
    scale: "borders"
  },
  borderY: {
    properties: ["borderTop", "borderBottom"],
    scale: "borders"
  },
  borderTopWidth: {
    property: "borderTopWidth",
    scale: "borderWidths"
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors"
  },
  borderTopStyle: {
    property: "borderTopStyle",
    scale: "borderStyles"
  },
  borderBottomWidth: {
    property: "borderBottomWidth",
    scale: "borderWidths"
  },
  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors"
  },
  borderBottomStyle: {
    property: "borderBottomStyle",
    scale: "borderStyles"
  },
  borderLeftWidth: {
    property: "borderLeftWidth",
    scale: "borderWidths"
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors"
  },
  borderLeftStyle: {
    property: "borderLeftStyle",
    scale: "borderStyles"
  },
  borderRightWidth: {
    property: "borderRightWidth",
    scale: "borderWidths"
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors"
  },
  borderRightStyle: {
    property: "borderRightStyle",
    scale: "borderStyles"
  },
  borderTopRadius: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  roundedTop: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedBottom: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  roundedLeft: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedRight: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  }
};
/**
 * The prop types for border properties listed above
 */

var border$2 = system(config$w);
var borderParser$2 = createParser(config$w);

/**
 * The parser configuration for common border properties
 */
var config$x = {
  color: {
    property: "color",
    scale: "colors"
  },
  textColor: {
    property: "color",
    scale: "colors"
  },
  opacity: true,
  fill: {
    property: "fill",
    scale: "colors"
  },
  stroke: {
    property: "stroke",
    scale: "colors"
  }
};
var color$2 = system(config$x);
var colorParser$2 = createParser(config$x);

var config$y = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: {
    property: "flexBasis",
    scale: "sizes"
  },
  justifySelf: true,
  alignSelf: true,
  order: true,
  flexDir: {
    property: "flexDirection"
  }
};
/**
 * Types for flexbox related CSS properties
 */

var flexbox$2 = system(config$y);
var flexboxParser$2 = createParser(config$y);

var config$z = {
  gridGap: {
    property: "gridGap",
    scale: "space"
  },
  gridColumnGap: {
    property: "gridColumnGap",
    scale: "space"
  },
  gridRowGap: {
    property: "gridRowGap",
    scale: "space"
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
  placeItems: true
};
/**
 * Types for grid related CSS properties
 */

var grid$2 = system(config$z);
var gridParser$2 = createParser(config$z);

function transform$4(value, scale) {
  var defaultValue = !isNumber$2(value) || value > 1 ? value : value * 100 + "%";
  return memoizedGet$2(scale, value, defaultValue);
}

var config$A = {
  width: {
    property: "width",
    scale: "sizes",
    transform: transform$4
  },
  w: {
    property: "width",
    scale: "sizes",
    transform: transform$4
  },
  height: {
    property: "height",
    scale: "sizes"
  },
  h: {
    property: "height",
    scale: "sizes"
  },
  boxSize: {
    properties: ["width", "height"],
    scale: "sizes"
  },
  minWidth: {
    property: "minWidth",
    scale: "sizes"
  },
  minW: {
    property: "minWidth",
    scale: "sizes"
  },
  minHeight: {
    property: "minHeight",
    scale: "sizes"
  },
  minH: {
    property: "minHeight",
    scale: "sizes"
  },
  maxWidth: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxHeight: {
    property: "maxHeight",
    scale: "sizes"
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes"
  },
  d: {
    property: "display"
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true
};
/**
 * Types for layout related CSS properties
 */

var layout$2 = system(config$A);
var layoutParser$2 = createParser(config$A);

var config$B = {
  animation: true,
  appearance: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  objectFit: true,
  objectPosition: true,
  float: true,
  willChange: true
};
var others$2 = system(config$B);
var othersParser$2 = createParser(config$B);

var startsWith$2 = (string, target) => string.slice(0, 0 + target.length) === target;

function positiveOrNegative$2(value, scale) {
  if (!scale || value == null) return value;
  var result;
  var valueString = value.toString();

  if (startsWith$2(valueString, "-")) {
    var raw = scale[valueString.slice(1)];

    if (isString$2(raw)) {
      result = "-" + raw;
    } else if (isNumber$2(raw)) {
      result = raw * -1;
    } else {
      result = value;
    }
  } else {
    var _scale$value;

    result = (_scale$value = scale[value]) != null ? _scale$value : value;
  }

  var computedValue = result || value;
  var hasUnit = cssGetUnit(computedValue);

  if (!hasUnit && !Number.isNaN(Number(computedValue))) {
    computedValue = Number(computedValue);
  }

  return computedValue;
}

var config$C = {
  position: true,
  pos: {
    property: "position"
  },
  zIndex: {
    property: "zIndex",
    scale: "zIndices"
  },
  inset: {
    properties: ["left", "top", "bottom", "right"],
    scale: "space",
    transform: positiveOrNegative$2
  },
  insetX: {
    properties: ["left", "right"],
    scale: "space",
    transform: positiveOrNegative$2
  },
  insetY: {
    properties: ["top", "bottom"],
    scale: "space",
    transform: positiveOrNegative$2
  },
  top: {
    property: "top",
    scale: "space",
    transform: positiveOrNegative$2
  },
  right: {
    property: "right",
    scale: "space",
    transform: positiveOrNegative$2
  },
  bottom: {
    property: "bottom",
    scale: "space",
    transform: positiveOrNegative$2
  },
  left: {
    property: "left",
    scale: "space",
    transform: positiveOrNegative$2
  }
};
/**
 * Types for position CSS properties
 */

var position$2 = system(config$C);
var positionParser$2 = createParser(config$C);

var config$D = {
  boxShadow: {
    property: "boxShadow",
    scale: "shadows"
  },
  textShadow: {
    property: "textShadow",
    scale: "shadows"
  },
  shadow: {
    property: "boxShadow",
    scale: "shadows"
  }
};
/**
 * Types for box and text shadow properties
 */

var shadow$2 = system(config$D);
var shadowParser$2 = createParser(config$D);

var config$E = {
  margin: {
    property: "margin",
    transform: positiveOrNegative$2,
    scale: "space"
  },
  m: {
    property: "margin",
    transform: positiveOrNegative$2,
    scale: "space"
  },
  marginTop: {
    property: "marginTop",
    transform: positiveOrNegative$2,
    scale: "space"
  },
  mt: {
    property: "marginTop",
    transform: positiveOrNegative$2,
    scale: "space"
  },
  marginRight: {
    property: "marginRight",
    transform: positiveOrNegative$2,
    scale: "space"
  },
  mr: {
    property: "marginRight",
    transform: positiveOrNegative$2,
    scale: "space"
  },
  marginBottom: {
    property: "marginBottom",
    transform: positiveOrNegative$2,
    scale: "space"
  },
  mb: {
    property: "marginBottom",
    transform: positiveOrNegative$2,
    scale: "space"
  },
  marginLeft: {
    property: "marginLeft",
    transform: positiveOrNegative$2,
    scale: "space"
  },
  ml: {
    property: "marginLeft",
    transform: positiveOrNegative$2,
    scale: "space"
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative$2,
    scale: "space"
  },
  mx: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative$2,
    scale: "space"
  },
  marginY: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative$2,
    scale: "space"
  },
  my: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative$2,
    scale: "space"
  },
  padding: {
    property: "padding",
    scale: "space"
  },
  p: {
    property: "padding",
    scale: "space"
  },
  paddingTop: {
    property: "paddingTop",
    scale: "space"
  },
  pt: {
    property: "paddingTop",
    scale: "space"
  },
  paddingRight: {
    property: "paddingRight",
    scale: "space"
  },
  pr: {
    property: "paddingRight",
    scale: "space"
  },
  paddingBottom: {
    property: "paddingBottom",
    scale: "space"
  },
  pb: {
    property: "paddingBottom",
    scale: "space"
  },
  paddingLeft: {
    property: "paddingLeft",
    scale: "space"
  },
  pl: {
    property: "paddingLeft",
    scale: "space"
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  px: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  },
  py: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  }
};
/**
 * Types for space related CSS properties
 */

/**
 * Converts shorthand or longhand margin and padding props to margin and padding CSS declarations
 *
 * - Numbers from 0-4 (or the length of theme.space) are converted to values on the spacing scale.
 * - Negative values can be used for negative margins.
 * - Numbers greater than the length of the theme.space array are converted to raw pixel values.
 * - String values are passed as raw CSS values.
 * - Array values are converted into responsive values.
 */
var space$2 = system(config$E);
var spaceParser$2 = createParser(config$E);

var config$F = {
  fontFamily: {
    property: "fontFamily",
    scale: "fonts"
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSizes"
  },
  fontWeight: {
    property: "fontWeight",
    scale: "fontWeights"
  },
  lineHeight: {
    property: "lineHeight",
    scale: "lineHeights"
  },
  letterSpacing: {
    property: "letterSpacing",
    scale: "letterSpacings"
  },
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: true,
  textDecor: {
    property: "textDecoration"
  }
};
/**
 * Types for typography related CSS properties
 */

var typography$3 = system(config$F);
var typographyParser$2 = createParser(config$F);

/**
 * The parser configuration for common outline properties
 */
var config$G = {
  outline: true,
  outlineOffset: true,
  outlineColor: {
    property: "outlineColor",
    scale: "colors"
  }
};
var outline$2 = system(config$G);
var outlineParser$2 = createParser(config$G);

var config$H = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: {
    property: "listStylePosition"
  },
  listStyleImage: true,
  listStyleImg: {
    property: "listStyleImage"
  }
};
var list$2 = system(config$H);
var listParser$2 = createParser(config$H);

var config$I = {
  transition: true,
  transitionDuration: {
    property: "transitionDuration",
    scale: "transition.duration"
  },
  transitionProperty: {
    property: "transitionProperty",
    scale: "transition.property"
  },
  transitionTimingFunction: {
    property: "transitionTimingFunction",
    scale: "transition.easing"
  }
};
var transition$3 = system(config$I);
var transitionParser$2 = createParser(config$I);

var config$J = {
  transform: true,
  transformOrigin: true
};
var transform$5 = system(config$J);
var transformParser$2 = createParser(config$J);

var group$2 = {
  hover: selector => selector + ":hover &, " + selector + "[data-hover] &",
  focus: selector => selector + ":focus &, " + selector + "[data-focus] &",
  active: selector => selector + ":active &, " + selector + "[data-active] &",
  disabled: selector => selector + ":disabled &, " + selector + "[data-disabled] &",
  invalid: selector => selector + ":invalid &, " + selector + "[data-invalid] &",
  checked: selector => selector + ":checked &, " + selector + "[data-checked] &",
  indeterminate: selector => selector + ":indeterminate &, " + selector + "[aria-checked=mixed] &, " + selector + "[data-indeterminate] &",
  readOnly: selector => selector + ":read-only &, " + selector + "[readonly] &, " + selector + "[data-read-only] &",
  expanded: selector => selector + ":read-only &, " + selector + "[aria-expanded=true] &, " + selector + "[data-expanded] &"
};

function toGroup$2(fn) {
  return merge$4(fn, "[role=group]", "[data-group]");
}

function merge$4(fn) {
  for (var _len = arguments.length, selectors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    selectors[_key - 1] = arguments[_key];
  }

  return selectors.map(fn).join(", ");
}

var disabled$2 = selector => selector + ", " + selector + ":focus, " + selector + ":hover";

var disabledSelector$2 = merge$4(disabled$2, "&[disabled]", "&[aria-disabled=true]", "&[data-disabled]");
var pseudoSelectors$2 = {
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover: "&:hover, &[data-hover]",

  /**
   * Styles for CSS Selector `&:active`
   */
  _active: "&:active, &[data-active]",

  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus: "&:focus, &[data-focus]",

  /**
   * Styles for the highlighted state.
   */
  _highlighted: "&[data-highlighted]",

  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin: "&:focus-within",
  _focusVisible: "&:focus-visible",

  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled: disabledSelector$2,

  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",

  /**
   * Styles for CSS selector `&::before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before: "&::before",

  /**
   * Styles for CSS selector `&::after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _after={{content:`""` }}/>
   * ```
   */
  _after: "&::after",
  _empty: "&:empty",

  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded: "&[aria-expanded=true], &[data-expanded]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked: "&[aria-checked=true], &[data-checked]",

  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed: "&[aria-grabbed=true], &[data-grabbed]",

  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed: "&[aria-pressed=true], &[data-pressed]",

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid: "&[aria-invalid=true], &[data-invalid]",

  /**
   * Styles for the valid state
   * - CSS selector `&[data-valid], &[data-state=valid]`
   */
  _valid: "&[data-valid], &[data-state=valid]",

  /**
   * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
   * Useful for styling loading states
   */
  _loading: "&[data-loading], &[aria-busy=true]",

  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   *
   * - CSS selector `&[aria-selected=true]`
   */
  _selected: "&[aria-selected=true], &[data-selected]",

  /**
   * Styles for CSS Selector `[hidden=true]`
   */
  _hidden: "&[hidden], &[data-hidden]",

  /**
   * Styles for CSS Selector `&:-webkit-autofill`
   */
  _autofill: "&:-webkit-autofill",

  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even: "&:nth-of-type(even)",

  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd: "&:nth-of-type(odd)",

  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first: "&:first-of-type",

  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last: "&:last-of-type",

  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst: "&:not(:first-of-type)",

  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast: "&:not(:last-of-type)",

  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited: "&:visited",

  /**
   * Used to style the active link in a navigation
   * Styles for CSS Selector `&[aria-current=page]`
   */
  _activeLink: "&[aria-current=page]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",

  /**
   * Styles to apply when parent is hovered
   */
  _groupHover: toGroup$2(group$2.hover),

  /**
   * Styles to apply when parent is focused
   */
  _groupFocus: toGroup$2(group$2.focus),

  /**
   * Styles to apply when parent is active
   */
  _groupActive: toGroup$2(group$2.active),

  /**
   * Styles to apply when parent is disabled
   */
  _groupDisabled: toGroup$2(group$2.disabled),

  /**
   * Styles to apply when parent is invalid
   */
  _groupInvalid: toGroup$2(group$2.invalid),

  /**
   * Styles to apply when parent is checked
   */
  _groupChecked: toGroup$2(group$2.checked),

  /**
   * Styles for CSS Selector `&::placeholder`.
   */
  _placeholder: "&::placeholder",

  /**
   * Styles for CSS Selector `&:fullscreen`.
   */
  _fullScreen: "&:fullscreen",

  /**
   * Styles for CSS Selector `&::selection`
   */
  _selection: "&::selection"
};
var pseudoPropNames$1 = objectKeys$1(pseudoSelectors$2);

var parser$2 = compose(backgroundParser$2, borderParser$2, colorParser$2, flexboxParser$2, layoutParser$2, outlineParser$2, gridParser$2, othersParser$2, positionParser$2, shadowParser$2, spaceParser$2, typographyParser$2, transformParser$2, transitionParser$2, listParser$2);

var cache$2 = {
  themeBreakpoints: [],
  breakpoints: [],
  breakpointValues: [],
  mediaQueries: []
};

/**
 *
 */
var calculateBreakpointAndMediaQueries$2 = function calculateBreakpointAndMediaQueries(themeBreakpoints) {
  if (themeBreakpoints === void 0) {
    themeBreakpoints = [];
  }

  // caching here reduces execution time by factor 4-6x
  var isCached = cache$2.themeBreakpoints === themeBreakpoints;

  if (isCached) {
    return cache$2;
  }

  var {
    breakpoints,
    breakpointValues
  } = Object.entries(themeBreakpoints).filter((_ref) => {
    var [key] = _ref;
    return isCustomBreakpoint$2(key);
  }).reduce((carry, _ref2) => {
    var [breakpoint, value] = _ref2;
    carry.breakpoints.push(breakpoint);
    carry.breakpointValues.push(value);
    return carry;
  }, {
    breakpoints: [],
    breakpointValues: []
  });
  var mediaQueries = [null, ...breakpointValues.map(bp => "@media screen and (min-width: " + bp + ")").slice(1)];
  cache$2.themeBreakpoints = themeBreakpoints;
  cache$2.mediaQueries = mediaQueries;
  cache$2.breakpointValues = breakpointValues;
  cache$2.breakpoints = breakpoints;
  return {
    breakpoints,
    mediaQueries
  };
};

var responsive$2 = styles => theme => {
  var computedStyles = {};
  var {
    breakpoints,
    mediaQueries
  } = calculateBreakpointAndMediaQueries$2(theme.breakpoints);

  for (var key in styles) {
    var value = runIfFn$2(styles[key], theme);

    if (value == null) {
      continue;
    }

    value = isResponsiveObjectLike$2(value, breakpoints) ? objectToArrayNotation$2(value, breakpoints) : value;

    if (!isArray$2(value)) {
      computedStyles[key] = value;
      continue;
    }

    var queries = value.slice(0, mediaQueries.length).length;

    for (var index = 0; index < queries; index += 1) {
      var media = mediaQueries[index];

      if (!media) {
        computedStyles[key] = value[index];
        continue;
      }

      computedStyles[media] = computedStyles[media] || {};

      if (value[index] == null) {
        continue;
      }

      computedStyles[media][key] = value[index];
    }
  }

  return computedStyles;
};

var css$3 = function css(args) {
  if (args === void 0) {
    args = {};
  }

  return function (props) {
    if (props === void 0) {
      props = {};
    }

    var theme = "theme" in props ? props.theme : props;
    var computedStyles = {};
    var styleObject = runIfFn$2(args, theme);
    var styles = responsive$2(styleObject)(theme);

    for (var k in styles) {
      var _config$transform;

      var x = styles[k];
      var val = runIfFn$2(x, theme);
      var key = k in pseudoSelectors$2 ? pseudoSelectors$2[k] : k;
      var config = parser$2.config[key];

      if (key === "apply") {
        var apply = css(memoizedGet$2(theme, val))(theme);
        computedStyles = lodash_mergewith({}, computedStyles, apply);
        continue;
      }

      if (isObject$2(val)) {
        computedStyles[key] = css(val)(theme);
        continue;
      }

      var scale = memoizedGet$2(theme, config == null ? void 0 : config.scale, {});
      var value = (_config$transform = config == null ? void 0 : config.transform == null ? void 0 : config.transform(val, scale)) != null ? _config$transform : memoizedGet$2(scale, val, val);

      if (config == null ? void 0 : config.properties) {
        for (var property of config.properties) {
          computedStyles[property] = value;
        }

        continue;
      }

      if (config == null ? void 0 : config.property) {
        computedStyles[config.property] = value;
        continue;
      }

      computedStyles[key] = value;
    }

    return computedStyles;
  };
};

var systemProps$2 = compose(background$2, border$2, color$2, flexbox$2, layout$2, outline$2, grid$2, others$2, position$2, shadow$2, space$2, typography$3, transform$5, list$2, transition$3);
var layoutSystem$2 = compose(space$2, layout$2, flexbox$2, grid$2, position$2);
var propNames$1 = [...systemProps$2.propNames, ...pseudoPropNames$1];

function useTheme() {
  var theme = react.useContext(ThemeContext);

  if (!theme) {
    throw Error("useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />`");
  }

  return theme;
}
var [StylesProvider$1, useStyles$1] = createContext$2({
  name: "StylesContext",
  errorMessage: "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "
});

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
var domElements$1 = ["a", "b", "article", "aside", "blockquote", "button", "caption", "cite", "circle", "code", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "img", "input", "kbd", "label", "li", "mark", "nav", "ol", "p", "path", "pre", "q", "rect", "s", "svg", "section", "select", "strong", "small", "span", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "tr", "ul"];
function omitThemingProps(props) {
  return omit$1(props, ["styleConfig", "size", "variant", "colorScheme"]);
}

function _extends$e() { _extends$e = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }
function useChakra() {
  var colorModeResult = useColorMode$1();
  var theme = useTheme();
  return _extends$e({}, colorModeResult, {
    theme
  });
}

var tags$1 = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

var newStyled$1 = createStyled.bind();
tags$1.forEach(function (tagName) {
  newStyled$1[tagName] = newStyled$1(tagName);
});

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */

var allPropNames$1 = new Set([...propNames$1, "textStyle", "layerStyle", "apply", "isTruncated", "noOfLines", "focusBorderColor", "errorBorderColor", "as", "__css", "css", "sx"]);
/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */

var validHTMLProps$1 = new Set(["htmlWidth", "htmlHeight", "htmlSize"]);
var shouldForwardProp$1 = prop => validHTMLProps$1.has(prop) || !allPropNames$1.has(prop);

function _extends$f() { _extends$f = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }

function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Convert propNames array to object to faster lookup perf
 */

var stylePropNames$1 = propNames$1.reduce((keymirror, key) => {
  if (typeof key !== "object" && typeof key !== "function") keymirror[key] = key;
  return keymirror;
}, {});

/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */
var styleResolver$1 = (_ref) => {
  var {
    baseStyle
  } = _ref;
  return props => {
    var {
      theme,
      layerStyle,
      textStyle,
      apply,
      noOfLines,
      isTruncated,
      css: cssProp,
      __css,
      sx
    } = props,
        rest = _objectWithoutPropertiesLoose$2(props, ["theme", "layerStyle", "textStyle", "apply", "noOfLines", "isTruncated", "css", "__css", "sx"]);

    var _layerStyle = memoizedGet$2(theme, "layerStyles." + layerStyle, {});

    var _textStyle = memoizedGet$2(theme, "textStyles." + textStyle, {}); // filter out props that aren't style props


    var styleProps = objectFilter$1(rest, (_, prop) => prop in stylePropNames$1);
    var truncateStyle = {};

    if (noOfLines != null) {
      truncateStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: noOfLines
      };
    } else if (isTruncated) {
      truncateStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      };
    }
    /**
     * The computed, theme-aware style object. The other of the properties
     * within `objectAssign` determines how styles are overriden.
     */


    var finalStyles = objectAssign({}, __css, baseStyle, {
      apply
    }, _layerStyle, _textStyle, truncateStyle, styleProps, sx); // Converts theme-aware style object to real css object

    var computedCSS = css$3(finalStyles)(props.theme); // Merge the computed css object with styles in css prop

    var cssObject = objectAssign(computedCSS, isFunction$2(cssProp) ? cssProp(theme) : cssProp);
    return cssObject;
  };
};
function styled$1(component, options) {
  var _ref2 = options != null ? options : {},
      {
    baseStyle
  } = _ref2,
      styledOptions = _objectWithoutPropertiesLoose$2(_ref2, ["baseStyle"]);

  var opts = _extends$f({}, styledOptions, {
    shouldForwardProp: shouldForwardProp$1
  });

  var _styled = newStyled$1(component, opts);

  var interpolation = styleResolver$1({
    baseStyle
  });

  var StyledComponent = _styled(interpolation);

  return StyledComponent;
}
var chakra$1 = styled$1;
domElements$1.forEach(tag => {
  // @ts-expect-error
  chakra$1[tag] = chakra$1(tag);
});

/**
 * All credit goes to Chance (Reach UI), and Haz (Reakit) for creating
 * the base type definitions upon which we improved on
 */
function forwardRef$1(component) {
  return /*#__PURE__*/react.forwardRef(component);
}

function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function useStyleConfig(themeKey, props, opts) {
  var _styleConfig$defaultP;

  var {
    styleConfig: styleConfigProp
  } = props,
      rest = _objectWithoutPropertiesLoose$3(props, ["styleConfig"]);

  var {
    theme,
    colorMode
  } = useChakra();
  var themeStyleConfig = memoizedGet$2(theme, "components." + themeKey);
  var styleConfig = styleConfigProp || themeStyleConfig;
  var mergedProps = lodash_mergewith({
    theme,
    colorMode
  }, (_styleConfig$defaultP = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _styleConfig$defaultP : {}, filterUndefined(omit$1(rest, ["children"])));
  /**
   * Store the computed styles in a `ref` to avoid unneeded re-computation
   */

  var stylesRef = react.useRef({});
  return react.useMemo(() => {
    if (styleConfig) {
      var _styleConfig$baseStyl, _styleConfig$variants, _styleConfig$variants2, _styleConfig$sizes$me, _styleConfig$sizes;

      var baseStyles = runIfFn$2((_styleConfig$baseStyl = styleConfig.baseStyle) != null ? _styleConfig$baseStyl : {}, mergedProps);
      var variants = runIfFn$2((_styleConfig$variants = (_styleConfig$variants2 = styleConfig.variants) == null ? void 0 : _styleConfig$variants2[mergedProps.variant]) != null ? _styleConfig$variants : {}, mergedProps);
      var sizes = runIfFn$2((_styleConfig$sizes$me = (_styleConfig$sizes = styleConfig.sizes) == null ? void 0 : _styleConfig$sizes[mergedProps.size]) != null ? _styleConfig$sizes$me : {}, mergedProps);
      var styles = lodash_mergewith({}, baseStyles, sizes, variants);

      if ((opts == null ? void 0 : opts.isMultiPart) && styleConfig.parts) {
        styleConfig.parts.forEach(part => {
          var _styles$part;

          styles[part] = (_styles$part = styles[part]) != null ? _styles$part : {};
        });
      }

      var isStyleEqual = reactFastCompare(stylesRef.current, styles);

      if (!isStyleEqual) {
        stylesRef.current = styles;
      }
    }

    return stylesRef.current;
  }, [styleConfig, mergedProps, opts == null ? void 0 : opts.isMultiPart]);
}

// Number assertions
function isNumber$3(value) {
  return typeof value === "number";
}

function isArray$3(value) {
  return Array.isArray(value);
}

function isFunction$3(value) {
  return typeof value === "function";
} // Generic assertions

var isObject$3 = value => {
  var type = typeof value;
  return value != null && (type === "object" || type === "function") && !isArray$3(value);
};

function isString$3(value) {
  return Object.prototype.toString.call(value) === "[object String]";
} // Event assertions

function runIfFn$3(valueOrFn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return isFunction$3(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

function getLastItem$3(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
/**
 * since breakpoints are defined as custom properties on an array, you may
 * `Object.keys(theme.breakpoints)` to retrieve both regular numeric indices
 * and custom breakpoints as string.
 *
 * This function returns true given a custom array property.
 */

var isCustomBreakpoint$3 = maybeBreakpoint => Number.isNaN(parseInt(maybeBreakpoint, 10));

/**
 * Get value from a deeply nested object using a string path.
 * Memoizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */

function get$4(obj, path, fallback, index) {
  var key = typeof path === "string" ? path.split(".") : [path];

  for (index = 0; index < key.length; index += 1) {
    if (!obj) {
      break;
    }

    obj = obj[key[index]];
  }

  return obj === undefined ? fallback : obj;
}

var memoize$3 = fn => {
  var cache = new WeakMap();

  var memoizedFn = (obj, path, fallback, index) => {
    if (!cache.has(obj)) {
      cache.set(obj, new Map());
    }

    var map = cache.get(obj);
    var key = typeof path === "string" ? path.split(".") : [path];

    if (map.has(key)) {
      return map.get(key);
    }

    var value = fn(obj, path, fallback, index);
    map.set(key, value);
    return value;
  };

  return memoizedFn;
};

var memoizedGet$3 = memoize$3(get$4);

/**
 * Returns the items of an object that meet the condition specified in a callback function.
 *
 * @param object the object to loop through
 * @param fn The filter function
 */
function objectFilter$2(object, fn) {
  var result = {};
  Object.keys(object).forEach(key => {
    var value = object[key];
    var shouldPass = fn(value, key, object);

    if (shouldPass) {
      result[key] = value;
    }
  });
  return result;
}
var objectKeys$2 = obj => Object.keys(obj);

var breakpoints$4 = Object.freeze(["base", "sm", "md", "lg", "xl"]);
function objectToArrayNotation$3(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints$4;
  }

  var result = bps.map(br => {
    var _obj$br;

    return (_obj$br = obj[br]) != null ? _obj$br : null;
  });

  while (getLastItem$3(result) === null) {
    result.pop();
  }

  return result;
}
function isResponsiveObjectLike$3(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints$4;
  }

  var keys = Object.keys(obj);
  return keys.length > 0 && keys.every(key => bps.includes(key));
}

var config$K = {
  bg: {
    property: "background",
    scale: "colors"
  },
  bgColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  background: {
    property: "background",
    scale: "colors"
  },
  backgroundColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  bgImage: {
    property: "backgroundImage"
  },
  bgImg: {
    property: "backgroundImage"
  },
  bgBlendMode: {
    property: "backgroundBlendMode"
  },
  bgSize: {
    property: "backgroundSize"
  },
  bgPosition: {
    property: "backgroundPosition"
  },
  bgPos: {
    property: "backgroundPosition"
  },
  bgRepeat: {
    property: "backgroundRepeat"
  },
  bgAttachment: {
    property: "backgroundAttachment"
  }
};
var background$3 = system(config$K);
var backgroundParser$3 = createParser(config$K);

/**
 * The parser configuration for common border properties
 */
var config$L = {
  border: {
    property: "border",
    scale: "borders"
  },
  borderWidth: {
    property: "borderWidth",
    scale: "borderWidths"
  },
  borderStyle: {
    property: "borderStyle",
    scale: "borderStyles"
  },
  borderColor: {
    property: "borderColor",
    scale: "colors"
  },
  borderRadius: {
    property: "borderRadius",
    scale: "radii"
  },
  rounded: {
    property: "borderRadius",
    scale: "radii"
  },
  borderTop: {
    property: "borderTop",
    scale: "borders"
  },
  borderTopLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  roundedTopLeft: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  roundedTopRight: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  borderRight: {
    property: "borderRight",
    scale: "borders"
  },
  borderBottom: {
    property: "borderBottom",
    scale: "borders"
  },
  borderBottomLeftRadius: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  roundedBottomLeft: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  roundedBottomRight: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  borderLeft: {
    property: "borderLeft",
    scale: "borders"
  },
  borderX: {
    properties: ["borderLeft", "borderRight"],
    scale: "borders"
  },
  borderY: {
    properties: ["borderTop", "borderBottom"],
    scale: "borders"
  },
  borderTopWidth: {
    property: "borderTopWidth",
    scale: "borderWidths"
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors"
  },
  borderTopStyle: {
    property: "borderTopStyle",
    scale: "borderStyles"
  },
  borderBottomWidth: {
    property: "borderBottomWidth",
    scale: "borderWidths"
  },
  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors"
  },
  borderBottomStyle: {
    property: "borderBottomStyle",
    scale: "borderStyles"
  },
  borderLeftWidth: {
    property: "borderLeftWidth",
    scale: "borderWidths"
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors"
  },
  borderLeftStyle: {
    property: "borderLeftStyle",
    scale: "borderStyles"
  },
  borderRightWidth: {
    property: "borderRightWidth",
    scale: "borderWidths"
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors"
  },
  borderRightStyle: {
    property: "borderRightStyle",
    scale: "borderStyles"
  },
  borderTopRadius: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  roundedTop: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedBottom: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  roundedLeft: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedRight: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  }
};
/**
 * The prop types for border properties listed above
 */

var border$3 = system(config$L);
var borderParser$3 = createParser(config$L);

/**
 * The parser configuration for common border properties
 */
var config$M = {
  color: {
    property: "color",
    scale: "colors"
  },
  textColor: {
    property: "color",
    scale: "colors"
  },
  opacity: true,
  fill: {
    property: "fill",
    scale: "colors"
  },
  stroke: {
    property: "stroke",
    scale: "colors"
  }
};
var color$3 = system(config$M);
var colorParser$3 = createParser(config$M);

var config$N = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: {
    property: "flexBasis",
    scale: "sizes"
  },
  justifySelf: true,
  alignSelf: true,
  order: true,
  flexDir: {
    property: "flexDirection"
  }
};
/**
 * Types for flexbox related CSS properties
 */

var flexbox$3 = system(config$N);
var flexboxParser$3 = createParser(config$N);

var config$O = {
  gridGap: {
    property: "gridGap",
    scale: "space"
  },
  gridColumnGap: {
    property: "gridColumnGap",
    scale: "space"
  },
  gridRowGap: {
    property: "gridRowGap",
    scale: "space"
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
  placeItems: true
};
/**
 * Types for grid related CSS properties
 */

var grid$3 = system(config$O);
var gridParser$3 = createParser(config$O);

function transform$6(value, scale) {
  var defaultValue = !isNumber$3(value) || value > 1 ? value : value * 100 + "%";
  return memoizedGet$3(scale, value, defaultValue);
}

var config$P = {
  width: {
    property: "width",
    scale: "sizes",
    transform: transform$6
  },
  w: {
    property: "width",
    scale: "sizes",
    transform: transform$6
  },
  height: {
    property: "height",
    scale: "sizes"
  },
  h: {
    property: "height",
    scale: "sizes"
  },
  boxSize: {
    properties: ["width", "height"],
    scale: "sizes"
  },
  minWidth: {
    property: "minWidth",
    scale: "sizes"
  },
  minW: {
    property: "minWidth",
    scale: "sizes"
  },
  minHeight: {
    property: "minHeight",
    scale: "sizes"
  },
  minH: {
    property: "minHeight",
    scale: "sizes"
  },
  maxWidth: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxHeight: {
    property: "maxHeight",
    scale: "sizes"
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes"
  },
  d: {
    property: "display"
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true
};
/**
 * Types for layout related CSS properties
 */

var layout$3 = system(config$P);
var layoutParser$3 = createParser(config$P);

var config$Q = {
  animation: true,
  appearance: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  objectFit: true,
  objectPosition: true,
  float: true,
  willChange: true
};
var others$3 = system(config$Q);
var othersParser$3 = createParser(config$Q);

var startsWith$3 = (string, target) => string.slice(0, 0 + target.length) === target;

function positiveOrNegative$3(value, scale) {
  if (!scale || value == null) return value;
  var result;
  var valueString = value.toString();

  if (startsWith$3(valueString, "-")) {
    var raw = scale[valueString.slice(1)];

    if (isString$3(raw)) {
      result = "-" + raw;
    } else if (isNumber$3(raw)) {
      result = raw * -1;
    } else {
      result = value;
    }
  } else {
    var _scale$value;

    result = (_scale$value = scale[value]) != null ? _scale$value : value;
  }

  var computedValue = result || value;
  var hasUnit = cssGetUnit(computedValue);

  if (!hasUnit && !Number.isNaN(Number(computedValue))) {
    computedValue = Number(computedValue);
  }

  return computedValue;
}

var config$R = {
  position: true,
  pos: {
    property: "position"
  },
  zIndex: {
    property: "zIndex",
    scale: "zIndices"
  },
  inset: {
    properties: ["left", "top", "bottom", "right"],
    scale: "space",
    transform: positiveOrNegative$3
  },
  insetX: {
    properties: ["left", "right"],
    scale: "space",
    transform: positiveOrNegative$3
  },
  insetY: {
    properties: ["top", "bottom"],
    scale: "space",
    transform: positiveOrNegative$3
  },
  top: {
    property: "top",
    scale: "space",
    transform: positiveOrNegative$3
  },
  right: {
    property: "right",
    scale: "space",
    transform: positiveOrNegative$3
  },
  bottom: {
    property: "bottom",
    scale: "space",
    transform: positiveOrNegative$3
  },
  left: {
    property: "left",
    scale: "space",
    transform: positiveOrNegative$3
  }
};
/**
 * Types for position CSS properties
 */

var position$3 = system(config$R);
var positionParser$3 = createParser(config$R);

var config$S = {
  boxShadow: {
    property: "boxShadow",
    scale: "shadows"
  },
  textShadow: {
    property: "textShadow",
    scale: "shadows"
  },
  shadow: {
    property: "boxShadow",
    scale: "shadows"
  }
};
/**
 * Types for box and text shadow properties
 */

var shadow$3 = system(config$S);
var shadowParser$3 = createParser(config$S);

var config$T = {
  margin: {
    property: "margin",
    transform: positiveOrNegative$3,
    scale: "space"
  },
  m: {
    property: "margin",
    transform: positiveOrNegative$3,
    scale: "space"
  },
  marginTop: {
    property: "marginTop",
    transform: positiveOrNegative$3,
    scale: "space"
  },
  mt: {
    property: "marginTop",
    transform: positiveOrNegative$3,
    scale: "space"
  },
  marginRight: {
    property: "marginRight",
    transform: positiveOrNegative$3,
    scale: "space"
  },
  mr: {
    property: "marginRight",
    transform: positiveOrNegative$3,
    scale: "space"
  },
  marginBottom: {
    property: "marginBottom",
    transform: positiveOrNegative$3,
    scale: "space"
  },
  mb: {
    property: "marginBottom",
    transform: positiveOrNegative$3,
    scale: "space"
  },
  marginLeft: {
    property: "marginLeft",
    transform: positiveOrNegative$3,
    scale: "space"
  },
  ml: {
    property: "marginLeft",
    transform: positiveOrNegative$3,
    scale: "space"
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative$3,
    scale: "space"
  },
  mx: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative$3,
    scale: "space"
  },
  marginY: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative$3,
    scale: "space"
  },
  my: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative$3,
    scale: "space"
  },
  padding: {
    property: "padding",
    scale: "space"
  },
  p: {
    property: "padding",
    scale: "space"
  },
  paddingTop: {
    property: "paddingTop",
    scale: "space"
  },
  pt: {
    property: "paddingTop",
    scale: "space"
  },
  paddingRight: {
    property: "paddingRight",
    scale: "space"
  },
  pr: {
    property: "paddingRight",
    scale: "space"
  },
  paddingBottom: {
    property: "paddingBottom",
    scale: "space"
  },
  pb: {
    property: "paddingBottom",
    scale: "space"
  },
  paddingLeft: {
    property: "paddingLeft",
    scale: "space"
  },
  pl: {
    property: "paddingLeft",
    scale: "space"
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  px: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  },
  py: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  }
};
/**
 * Types for space related CSS properties
 */

/**
 * Converts shorthand or longhand margin and padding props to margin and padding CSS declarations
 *
 * - Numbers from 0-4 (or the length of theme.space) are converted to values on the spacing scale.
 * - Negative values can be used for negative margins.
 * - Numbers greater than the length of the theme.space array are converted to raw pixel values.
 * - String values are passed as raw CSS values.
 * - Array values are converted into responsive values.
 */
var space$3 = system(config$T);
var spaceParser$3 = createParser(config$T);

var config$U = {
  fontFamily: {
    property: "fontFamily",
    scale: "fonts"
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSizes"
  },
  fontWeight: {
    property: "fontWeight",
    scale: "fontWeights"
  },
  lineHeight: {
    property: "lineHeight",
    scale: "lineHeights"
  },
  letterSpacing: {
    property: "letterSpacing",
    scale: "letterSpacings"
  },
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: true,
  textDecor: {
    property: "textDecoration"
  }
};
/**
 * Types for typography related CSS properties
 */

var typography$4 = system(config$U);
var typographyParser$3 = createParser(config$U);

/**
 * The parser configuration for common outline properties
 */
var config$V = {
  outline: true,
  outlineOffset: true,
  outlineColor: {
    property: "outlineColor",
    scale: "colors"
  }
};
var outline$3 = system(config$V);
var outlineParser$3 = createParser(config$V);

var config$W = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: {
    property: "listStylePosition"
  },
  listStyleImage: true,
  listStyleImg: {
    property: "listStyleImage"
  }
};
var list$3 = system(config$W);
var listParser$3 = createParser(config$W);

var config$X = {
  transition: true,
  transitionDuration: {
    property: "transitionDuration",
    scale: "transition.duration"
  },
  transitionProperty: {
    property: "transitionProperty",
    scale: "transition.property"
  },
  transitionTimingFunction: {
    property: "transitionTimingFunction",
    scale: "transition.easing"
  }
};
var transition$4 = system(config$X);
var transitionParser$3 = createParser(config$X);

var config$Y = {
  transform: true,
  transformOrigin: true
};
var transform$7 = system(config$Y);
var transformParser$3 = createParser(config$Y);

var group$3 = {
  hover: selector => selector + ":hover &, " + selector + "[data-hover] &",
  focus: selector => selector + ":focus &, " + selector + "[data-focus] &",
  active: selector => selector + ":active &, " + selector + "[data-active] &",
  disabled: selector => selector + ":disabled &, " + selector + "[data-disabled] &",
  invalid: selector => selector + ":invalid &, " + selector + "[data-invalid] &",
  checked: selector => selector + ":checked &, " + selector + "[data-checked] &",
  indeterminate: selector => selector + ":indeterminate &, " + selector + "[aria-checked=mixed] &, " + selector + "[data-indeterminate] &",
  readOnly: selector => selector + ":read-only &, " + selector + "[readonly] &, " + selector + "[data-read-only] &",
  expanded: selector => selector + ":read-only &, " + selector + "[aria-expanded=true] &, " + selector + "[data-expanded] &"
};

function toGroup$3(fn) {
  return merge$5(fn, "[role=group]", "[data-group]");
}

function merge$5(fn) {
  for (var _len = arguments.length, selectors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    selectors[_key - 1] = arguments[_key];
  }

  return selectors.map(fn).join(", ");
}

var disabled$3 = selector => selector + ", " + selector + ":focus, " + selector + ":hover";

var disabledSelector$3 = merge$5(disabled$3, "&[disabled]", "&[aria-disabled=true]", "&[data-disabled]");
var pseudoSelectors$3 = {
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover: "&:hover, &[data-hover]",

  /**
   * Styles for CSS Selector `&:active`
   */
  _active: "&:active, &[data-active]",

  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus: "&:focus, &[data-focus]",

  /**
   * Styles for the highlighted state.
   */
  _highlighted: "&[data-highlighted]",

  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin: "&:focus-within",
  _focusVisible: "&:focus-visible",

  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled: disabledSelector$3,

  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",

  /**
   * Styles for CSS selector `&::before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before: "&::before",

  /**
   * Styles for CSS selector `&::after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _after={{content:`""` }}/>
   * ```
   */
  _after: "&::after",
  _empty: "&:empty",

  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded: "&[aria-expanded=true], &[data-expanded]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked: "&[aria-checked=true], &[data-checked]",

  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed: "&[aria-grabbed=true], &[data-grabbed]",

  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed: "&[aria-pressed=true], &[data-pressed]",

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid: "&[aria-invalid=true], &[data-invalid]",

  /**
   * Styles for the valid state
   * - CSS selector `&[data-valid], &[data-state=valid]`
   */
  _valid: "&[data-valid], &[data-state=valid]",

  /**
   * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
   * Useful for styling loading states
   */
  _loading: "&[data-loading], &[aria-busy=true]",

  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   *
   * - CSS selector `&[aria-selected=true]`
   */
  _selected: "&[aria-selected=true], &[data-selected]",

  /**
   * Styles for CSS Selector `[hidden=true]`
   */
  _hidden: "&[hidden], &[data-hidden]",

  /**
   * Styles for CSS Selector `&:-webkit-autofill`
   */
  _autofill: "&:-webkit-autofill",

  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even: "&:nth-of-type(even)",

  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd: "&:nth-of-type(odd)",

  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first: "&:first-of-type",

  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last: "&:last-of-type",

  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst: "&:not(:first-of-type)",

  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast: "&:not(:last-of-type)",

  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited: "&:visited",

  /**
   * Used to style the active link in a navigation
   * Styles for CSS Selector `&[aria-current=page]`
   */
  _activeLink: "&[aria-current=page]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",

  /**
   * Styles to apply when parent is hovered
   */
  _groupHover: toGroup$3(group$3.hover),

  /**
   * Styles to apply when parent is focused
   */
  _groupFocus: toGroup$3(group$3.focus),

  /**
   * Styles to apply when parent is active
   */
  _groupActive: toGroup$3(group$3.active),

  /**
   * Styles to apply when parent is disabled
   */
  _groupDisabled: toGroup$3(group$3.disabled),

  /**
   * Styles to apply when parent is invalid
   */
  _groupInvalid: toGroup$3(group$3.invalid),

  /**
   * Styles to apply when parent is checked
   */
  _groupChecked: toGroup$3(group$3.checked),

  /**
   * Styles for CSS Selector `&::placeholder`.
   */
  _placeholder: "&::placeholder",

  /**
   * Styles for CSS Selector `&:fullscreen`.
   */
  _fullScreen: "&:fullscreen",

  /**
   * Styles for CSS Selector `&::selection`
   */
  _selection: "&::selection"
};
var pseudoPropNames$2 = objectKeys$2(pseudoSelectors$3);

var parser$3 = compose(backgroundParser$3, borderParser$3, colorParser$3, flexboxParser$3, layoutParser$3, outlineParser$3, gridParser$3, othersParser$3, positionParser$3, shadowParser$3, spaceParser$3, typographyParser$3, transformParser$3, transitionParser$3, listParser$3);

var cache$3 = {
  themeBreakpoints: [],
  breakpoints: [],
  breakpointValues: [],
  mediaQueries: []
};

/**
 *
 */
var calculateBreakpointAndMediaQueries$3 = function calculateBreakpointAndMediaQueries(themeBreakpoints) {
  if (themeBreakpoints === void 0) {
    themeBreakpoints = [];
  }

  // caching here reduces execution time by factor 4-6x
  var isCached = cache$3.themeBreakpoints === themeBreakpoints;

  if (isCached) {
    return cache$3;
  }

  var {
    breakpoints,
    breakpointValues
  } = Object.entries(themeBreakpoints).filter((_ref) => {
    var [key] = _ref;
    return isCustomBreakpoint$3(key);
  }).reduce((carry, _ref2) => {
    var [breakpoint, value] = _ref2;
    carry.breakpoints.push(breakpoint);
    carry.breakpointValues.push(value);
    return carry;
  }, {
    breakpoints: [],
    breakpointValues: []
  });
  var mediaQueries = [null, ...breakpointValues.map(bp => "@media screen and (min-width: " + bp + ")").slice(1)];
  cache$3.themeBreakpoints = themeBreakpoints;
  cache$3.mediaQueries = mediaQueries;
  cache$3.breakpointValues = breakpointValues;
  cache$3.breakpoints = breakpoints;
  return {
    breakpoints,
    mediaQueries
  };
};

var responsive$3 = styles => theme => {
  var computedStyles = {};
  var {
    breakpoints,
    mediaQueries
  } = calculateBreakpointAndMediaQueries$3(theme.breakpoints);

  for (var key in styles) {
    var value = runIfFn$3(styles[key], theme);

    if (value == null) {
      continue;
    }

    value = isResponsiveObjectLike$3(value, breakpoints) ? objectToArrayNotation$3(value, breakpoints) : value;

    if (!isArray$3(value)) {
      computedStyles[key] = value;
      continue;
    }

    var queries = value.slice(0, mediaQueries.length).length;

    for (var index = 0; index < queries; index += 1) {
      var media = mediaQueries[index];

      if (!media) {
        computedStyles[key] = value[index];
        continue;
      }

      computedStyles[media] = computedStyles[media] || {};

      if (value[index] == null) {
        continue;
      }

      computedStyles[media][key] = value[index];
    }
  }

  return computedStyles;
};

var css$4 = function css(args) {
  if (args === void 0) {
    args = {};
  }

  return function (props) {
    if (props === void 0) {
      props = {};
    }

    var theme = "theme" in props ? props.theme : props;
    var computedStyles = {};
    var styleObject = runIfFn$3(args, theme);
    var styles = responsive$3(styleObject)(theme);

    for (var k in styles) {
      var _config$transform;

      var x = styles[k];
      var val = runIfFn$3(x, theme);
      var key = k in pseudoSelectors$3 ? pseudoSelectors$3[k] : k;
      var config = parser$3.config[key];

      if (key === "apply") {
        var apply = css(memoizedGet$3(theme, val))(theme);
        computedStyles = lodash_mergewith({}, computedStyles, apply);
        continue;
      }

      if (isObject$3(val)) {
        computedStyles[key] = css(val)(theme);
        continue;
      }

      var scale = memoizedGet$3(theme, config == null ? void 0 : config.scale, {});
      var value = (_config$transform = config == null ? void 0 : config.transform == null ? void 0 : config.transform(val, scale)) != null ? _config$transform : memoizedGet$3(scale, val, val);

      if (config == null ? void 0 : config.properties) {
        for (var property of config.properties) {
          computedStyles[property] = value;
        }

        continue;
      }

      if (config == null ? void 0 : config.property) {
        computedStyles[config.property] = value;
        continue;
      }

      computedStyles[key] = value;
    }

    return computedStyles;
  };
};

var systemProps$3 = compose(background$3, border$3, color$3, flexbox$3, layout$3, outline$3, grid$3, others$3, position$3, shadow$3, space$3, typography$4, transform$7, list$3, transition$4);
var layoutSystem$3 = compose(space$3, layout$3, flexbox$3, grid$3, position$3);
var propNames$2 = [...systemProps$3.propNames, ...pseudoPropNames$2];

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
var domElements$2 = ["a", "b", "article", "aside", "blockquote", "button", "caption", "cite", "circle", "code", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "img", "input", "kbd", "label", "li", "mark", "nav", "ol", "p", "path", "pre", "q", "rect", "s", "svg", "section", "select", "strong", "small", "span", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "tr", "ul"];

var tags$2 = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

var newStyled$2 = createStyled.bind();
tags$2.forEach(function (tagName) {
  newStyled$2[tagName] = newStyled$2(tagName);
});

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */

var allPropNames$2 = new Set([...propNames$2, "textStyle", "layerStyle", "apply", "isTruncated", "noOfLines", "focusBorderColor", "errorBorderColor", "as", "__css", "css", "sx"]);
/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */

var validHTMLProps$2 = new Set(["htmlWidth", "htmlHeight", "htmlSize"]);
var shouldForwardProp$2 = prop => validHTMLProps$2.has(prop) || !allPropNames$2.has(prop);

function _extends$g() { _extends$g = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }

function _objectWithoutPropertiesLoose$4(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Convert propNames array to object to faster lookup perf
 */

var stylePropNames$2 = propNames$2.reduce((keymirror, key) => {
  if (typeof key !== "object" && typeof key !== "function") keymirror[key] = key;
  return keymirror;
}, {});

/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */
var styleResolver$2 = (_ref) => {
  var {
    baseStyle
  } = _ref;
  return props => {
    var {
      theme,
      layerStyle,
      textStyle,
      apply,
      noOfLines,
      isTruncated,
      css: cssProp,
      __css,
      sx
    } = props,
        rest = _objectWithoutPropertiesLoose$4(props, ["theme", "layerStyle", "textStyle", "apply", "noOfLines", "isTruncated", "css", "__css", "sx"]);

    var _layerStyle = memoizedGet$3(theme, "layerStyles." + layerStyle, {});

    var _textStyle = memoizedGet$3(theme, "textStyles." + textStyle, {}); // filter out props that aren't style props


    var styleProps = objectFilter$2(rest, (_, prop) => prop in stylePropNames$2);
    var truncateStyle = {};

    if (noOfLines != null) {
      truncateStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: noOfLines
      };
    } else if (isTruncated) {
      truncateStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      };
    }
    /**
     * The computed, theme-aware style object. The other of the properties
     * within `objectAssign` determines how styles are overriden.
     */


    var finalStyles = objectAssign({}, __css, baseStyle, {
      apply
    }, _layerStyle, _textStyle, truncateStyle, styleProps, sx); // Converts theme-aware style object to real css object

    var computedCSS = css$4(finalStyles)(props.theme); // Merge the computed css object with styles in css prop

    var cssObject = objectAssign(computedCSS, isFunction$3(cssProp) ? cssProp(theme) : cssProp);
    return cssObject;
  };
};
function styled$2(component, options) {
  var _ref2 = options != null ? options : {},
      {
    baseStyle
  } = _ref2,
      styledOptions = _objectWithoutPropertiesLoose$4(_ref2, ["baseStyle"]);

  var opts = _extends$g({}, styledOptions, {
    shouldForwardProp: shouldForwardProp$2
  });

  var _styled = newStyled$2(component, opts);

  var interpolation = styleResolver$2({
    baseStyle
  });

  var StyledComponent = _styled(interpolation);

  return StyledComponent;
}
var chakra$2 = styled$2;
domElements$2.forEach(tag => {
  // @ts-expect-error
  chakra$2[tag] = chakra$2(tag);
});

/**
 * Styles to visually hide an element
 * but make it accessible to screen-readers
 */
var visuallyHiddenStyle = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};
/**
 * Visually hidden component used to hide
 * elements on screen
 */

var VisuallyHidden = chakra$2("span", {
  baseStyle: visuallyHiddenStyle
});
/**
 * Visually hidden input component for designing
 * custom input components using the html `input`
 * as a proxy
 */


var VisuallyHiddenInput = chakra$2("input", {
  baseStyle: visuallyHiddenStyle
});

function _extends$h() { _extends$h = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$h.apply(this, arguments); }

function _objectWithoutPropertiesLoose$5(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var spin = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});

/**
 * Spinner is used to indicate the loading state of a page or a component,
 * It renders a `div` by default.
 *
 * @see Docs https://chakra-ui.com/components/spinner
 */
var Spinner$1 = /*#__PURE__*/forwardRef$1(function Spinner(props, ref) {
  var styles = useStyleConfig("Spinner", props);

  var _omitThemingProps = omitThemingProps(props),
      {
    label = "Loading...",
    thickness = "2px",
    speed = "0.45s",
    color,
    emptyColor = "transparent",
    className
  } = _omitThemingProps,
      rest = _objectWithoutPropertiesLoose$5(_omitThemingProps, ["label", "thickness", "speed", "color", "emptyColor", "className"]);

  var _className = cx("chakra-spinner", className);

  var spinnerStyles = _extends$h({
    display: "inline-block",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "99999px",
    borderWidth: thickness,
    borderBottomColor: emptyColor,
    borderLeftColor: emptyColor,
    color,
    animation: spin + " " + speed + " linear infinite"
  }, styles);

  return /*#__PURE__*/react.createElement(chakra$1.div, _extends$h({
    ref: ref,
    __css: spinnerStyles,
    className: _className
  }, rest), label && /*#__PURE__*/react.createElement(VisuallyHidden, null, label));
});

// Number assertions
function isNumber$4(value) {
  return typeof value === "number";
}

function isArray$4(value) {
  return Array.isArray(value);
}

function isFunction$4(value) {
  return typeof value === "function";
} // Generic assertions

var isObject$4 = value => {
  var type = typeof value;
  return value != null && (type === "object" || type === "function") && !isArray$4(value);
};

function isString$4(value) {
  return Object.prototype.toString.call(value) === "[object String]";
} // Event assertions

function runIfFn$4(valueOrFn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return isFunction$4(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

var win$3;
/**
 * Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
 * hits a memory leak, whereas aliasing it and calling "typeof win" does not.
 * Caching the window value at the file scope lets us minimize the impact.
 *
 * @see IE11 Memory Leak Issue https://github.com/microsoft/fluentui/pull/9010#issuecomment-490768427
 */

try {
  win$3 = window;
} catch (e) {
  /* no-op */
}
/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11.
 */


var getWindow$3 = node => {
  var _node$ownerDocument$d, _node$ownerDocument;

  return (_node$ownerDocument$d = node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) != null ? _node$ownerDocument$d : win$3;
};
/**
 * Check if we can use the DOM. Useful for SSR purposes
 */

function checkIsBrowser$3() {
  var win = getWindow$3();
  return Boolean(typeof win !== "undefined" && win.document && win.document.createElement);
}

var isBrowser$4 = checkIsBrowser$3();
var dataAttr = condition => condition ? "" : undefined;
var cx$1 = function cx() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }

  return classNames.filter(Boolean).join(" ");
};

function getLastItem$4(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
/**
 * since breakpoints are defined as custom properties on an array, you may
 * `Object.keys(theme.breakpoints)` to retrieve both regular numeric indices
 * and custom breakpoints as string.
 *
 * This function returns true given a custom array property.
 */

var isCustomBreakpoint$4 = maybeBreakpoint => Number.isNaN(parseInt(maybeBreakpoint, 10));

function omit$2(object, keys) {
  var result = {};
  Object.keys(object).forEach(key => {
    if (keys.includes(key)) return;
    result[key] = object[key];
  });
  return result;
}
/**
 * Get value from a deeply nested object using a string path.
 * Memoizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */

function get$5(obj, path, fallback, index) {
  var key = typeof path === "string" ? path.split(".") : [path];

  for (index = 0; index < key.length; index += 1) {
    if (!obj) {
      break;
    }

    obj = obj[key[index]];
  }

  return obj === undefined ? fallback : obj;
}

var memoize$4 = fn => {
  var cache = new WeakMap();

  var memoizedFn = (obj, path, fallback, index) => {
    if (!cache.has(obj)) {
      cache.set(obj, new Map());
    }

    var map = cache.get(obj);
    var key = typeof path === "string" ? path.split(".") : [path];

    if (map.has(key)) {
      return map.get(key);
    }

    var value = fn(obj, path, fallback, index);
    map.set(key, value);
    return value;
  };

  return memoizedFn;
};

var memoizedGet$4 = memoize$4(get$5);

/**
 * Returns the items of an object that meet the condition specified in a callback function.
 *
 * @param object the object to loop through
 * @param fn The filter function
 */
function objectFilter$3(object, fn) {
  var result = {};
  Object.keys(object).forEach(key => {
    var value = object[key];
    var shouldPass = fn(value, key, object);

    if (shouldPass) {
      result[key] = value;
    }
  });
  return result;
}
var filterUndefined$1 = object => objectFilter$3(object, val => val !== null && val !== undefined);
var objectKeys$3 = obj => Object.keys(obj);

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
function createContext$3(options) {
  if (options === void 0) {
    options = {};
  }

  var {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name
  } = options;
  var Context = /*#__PURE__*/react.createContext(undefined);
  Context.displayName = name;

  function useContext() {
    var context = react.useContext(Context);

    if (!context && strict) {
      throw new Error(errorMessage);
    }

    return context;
  }

  return [Context.Provider, useContext, Context];
}

var breakpoints$5 = Object.freeze(["base", "sm", "md", "lg", "xl"]);
function objectToArrayNotation$4(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints$5;
  }

  var result = bps.map(br => {
    var _obj$br;

    return (_obj$br = obj[br]) != null ? _obj$br : null;
  });

  while (getLastItem$4(result) === null) {
    result.pop();
  }

  return result;
}
function isResponsiveObjectLike$4(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints$5;
  }

  var keys = Object.keys(obj);
  return keys.length > 0 && keys.every(key => bps.includes(key));
}

var ColorModeContext$2 = /*#__PURE__*/react.createContext({});
/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */


var useColorMode$2 = () => {
  var context = react.useContext(ColorModeContext$2);

  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }

  return context;
};

var config$Z = {
  bg: {
    property: "background",
    scale: "colors"
  },
  bgColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  background: {
    property: "background",
    scale: "colors"
  },
  backgroundColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  bgImage: {
    property: "backgroundImage"
  },
  bgImg: {
    property: "backgroundImage"
  },
  bgBlendMode: {
    property: "backgroundBlendMode"
  },
  bgSize: {
    property: "backgroundSize"
  },
  bgPosition: {
    property: "backgroundPosition"
  },
  bgPos: {
    property: "backgroundPosition"
  },
  bgRepeat: {
    property: "backgroundRepeat"
  },
  bgAttachment: {
    property: "backgroundAttachment"
  }
};
var background$4 = system(config$Z);
var backgroundParser$4 = createParser(config$Z);

/**
 * The parser configuration for common border properties
 */
var config$_ = {
  border: {
    property: "border",
    scale: "borders"
  },
  borderWidth: {
    property: "borderWidth",
    scale: "borderWidths"
  },
  borderStyle: {
    property: "borderStyle",
    scale: "borderStyles"
  },
  borderColor: {
    property: "borderColor",
    scale: "colors"
  },
  borderRadius: {
    property: "borderRadius",
    scale: "radii"
  },
  rounded: {
    property: "borderRadius",
    scale: "radii"
  },
  borderTop: {
    property: "borderTop",
    scale: "borders"
  },
  borderTopLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  roundedTopLeft: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  roundedTopRight: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  borderRight: {
    property: "borderRight",
    scale: "borders"
  },
  borderBottom: {
    property: "borderBottom",
    scale: "borders"
  },
  borderBottomLeftRadius: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  roundedBottomLeft: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  roundedBottomRight: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  borderLeft: {
    property: "borderLeft",
    scale: "borders"
  },
  borderX: {
    properties: ["borderLeft", "borderRight"],
    scale: "borders"
  },
  borderY: {
    properties: ["borderTop", "borderBottom"],
    scale: "borders"
  },
  borderTopWidth: {
    property: "borderTopWidth",
    scale: "borderWidths"
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors"
  },
  borderTopStyle: {
    property: "borderTopStyle",
    scale: "borderStyles"
  },
  borderBottomWidth: {
    property: "borderBottomWidth",
    scale: "borderWidths"
  },
  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors"
  },
  borderBottomStyle: {
    property: "borderBottomStyle",
    scale: "borderStyles"
  },
  borderLeftWidth: {
    property: "borderLeftWidth",
    scale: "borderWidths"
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors"
  },
  borderLeftStyle: {
    property: "borderLeftStyle",
    scale: "borderStyles"
  },
  borderRightWidth: {
    property: "borderRightWidth",
    scale: "borderWidths"
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors"
  },
  borderRightStyle: {
    property: "borderRightStyle",
    scale: "borderStyles"
  },
  borderTopRadius: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  roundedTop: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedBottom: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  roundedLeft: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedRight: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  }
};
/**
 * The prop types for border properties listed above
 */

var border$4 = system(config$_);
var borderParser$4 = createParser(config$_);

/**
 * The parser configuration for common border properties
 */
var config$$ = {
  color: {
    property: "color",
    scale: "colors"
  },
  textColor: {
    property: "color",
    scale: "colors"
  },
  opacity: true,
  fill: {
    property: "fill",
    scale: "colors"
  },
  stroke: {
    property: "stroke",
    scale: "colors"
  }
};
var color$4 = system(config$$);
var colorParser$4 = createParser(config$$);

var config$10 = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: {
    property: "flexBasis",
    scale: "sizes"
  },
  justifySelf: true,
  alignSelf: true,
  order: true,
  flexDir: {
    property: "flexDirection"
  }
};
/**
 * Types for flexbox related CSS properties
 */

var flexbox$4 = system(config$10);
var flexboxParser$4 = createParser(config$10);

var config$11 = {
  gridGap: {
    property: "gridGap",
    scale: "space"
  },
  gridColumnGap: {
    property: "gridColumnGap",
    scale: "space"
  },
  gridRowGap: {
    property: "gridRowGap",
    scale: "space"
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
  placeItems: true
};
/**
 * Types for grid related CSS properties
 */

var grid$4 = system(config$11);
var gridParser$4 = createParser(config$11);

function transform$8(value, scale) {
  var defaultValue = !isNumber$4(value) || value > 1 ? value : value * 100 + "%";
  return memoizedGet$4(scale, value, defaultValue);
}

var config$12 = {
  width: {
    property: "width",
    scale: "sizes",
    transform: transform$8
  },
  w: {
    property: "width",
    scale: "sizes",
    transform: transform$8
  },
  height: {
    property: "height",
    scale: "sizes"
  },
  h: {
    property: "height",
    scale: "sizes"
  },
  boxSize: {
    properties: ["width", "height"],
    scale: "sizes"
  },
  minWidth: {
    property: "minWidth",
    scale: "sizes"
  },
  minW: {
    property: "minWidth",
    scale: "sizes"
  },
  minHeight: {
    property: "minHeight",
    scale: "sizes"
  },
  minH: {
    property: "minHeight",
    scale: "sizes"
  },
  maxWidth: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxHeight: {
    property: "maxHeight",
    scale: "sizes"
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes"
  },
  d: {
    property: "display"
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true
};
/**
 * Types for layout related CSS properties
 */

var layout$4 = system(config$12);
var layoutParser$4 = createParser(config$12);

var config$13 = {
  animation: true,
  appearance: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  objectFit: true,
  objectPosition: true,
  float: true,
  willChange: true
};
var others$4 = system(config$13);
var othersParser$4 = createParser(config$13);

var startsWith$4 = (string, target) => string.slice(0, 0 + target.length) === target;

function positiveOrNegative$4(value, scale) {
  if (!scale || value == null) return value;
  var result;
  var valueString = value.toString();

  if (startsWith$4(valueString, "-")) {
    var raw = scale[valueString.slice(1)];

    if (isString$4(raw)) {
      result = "-" + raw;
    } else if (isNumber$4(raw)) {
      result = raw * -1;
    } else {
      result = value;
    }
  } else {
    var _scale$value;

    result = (_scale$value = scale[value]) != null ? _scale$value : value;
  }

  var computedValue = result || value;
  var hasUnit = cssGetUnit(computedValue);

  if (!hasUnit && !Number.isNaN(Number(computedValue))) {
    computedValue = Number(computedValue);
  }

  return computedValue;
}

var config$14 = {
  position: true,
  pos: {
    property: "position"
  },
  zIndex: {
    property: "zIndex",
    scale: "zIndices"
  },
  inset: {
    properties: ["left", "top", "bottom", "right"],
    scale: "space",
    transform: positiveOrNegative$4
  },
  insetX: {
    properties: ["left", "right"],
    scale: "space",
    transform: positiveOrNegative$4
  },
  insetY: {
    properties: ["top", "bottom"],
    scale: "space",
    transform: positiveOrNegative$4
  },
  top: {
    property: "top",
    scale: "space",
    transform: positiveOrNegative$4
  },
  right: {
    property: "right",
    scale: "space",
    transform: positiveOrNegative$4
  },
  bottom: {
    property: "bottom",
    scale: "space",
    transform: positiveOrNegative$4
  },
  left: {
    property: "left",
    scale: "space",
    transform: positiveOrNegative$4
  }
};
/**
 * Types for position CSS properties
 */

var position$4 = system(config$14);
var positionParser$4 = createParser(config$14);

var config$15 = {
  boxShadow: {
    property: "boxShadow",
    scale: "shadows"
  },
  textShadow: {
    property: "textShadow",
    scale: "shadows"
  },
  shadow: {
    property: "boxShadow",
    scale: "shadows"
  }
};
/**
 * Types for box and text shadow properties
 */

var shadow$4 = system(config$15);
var shadowParser$4 = createParser(config$15);

var config$16 = {
  margin: {
    property: "margin",
    transform: positiveOrNegative$4,
    scale: "space"
  },
  m: {
    property: "margin",
    transform: positiveOrNegative$4,
    scale: "space"
  },
  marginTop: {
    property: "marginTop",
    transform: positiveOrNegative$4,
    scale: "space"
  },
  mt: {
    property: "marginTop",
    transform: positiveOrNegative$4,
    scale: "space"
  },
  marginRight: {
    property: "marginRight",
    transform: positiveOrNegative$4,
    scale: "space"
  },
  mr: {
    property: "marginRight",
    transform: positiveOrNegative$4,
    scale: "space"
  },
  marginBottom: {
    property: "marginBottom",
    transform: positiveOrNegative$4,
    scale: "space"
  },
  mb: {
    property: "marginBottom",
    transform: positiveOrNegative$4,
    scale: "space"
  },
  marginLeft: {
    property: "marginLeft",
    transform: positiveOrNegative$4,
    scale: "space"
  },
  ml: {
    property: "marginLeft",
    transform: positiveOrNegative$4,
    scale: "space"
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative$4,
    scale: "space"
  },
  mx: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative$4,
    scale: "space"
  },
  marginY: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative$4,
    scale: "space"
  },
  my: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative$4,
    scale: "space"
  },
  padding: {
    property: "padding",
    scale: "space"
  },
  p: {
    property: "padding",
    scale: "space"
  },
  paddingTop: {
    property: "paddingTop",
    scale: "space"
  },
  pt: {
    property: "paddingTop",
    scale: "space"
  },
  paddingRight: {
    property: "paddingRight",
    scale: "space"
  },
  pr: {
    property: "paddingRight",
    scale: "space"
  },
  paddingBottom: {
    property: "paddingBottom",
    scale: "space"
  },
  pb: {
    property: "paddingBottom",
    scale: "space"
  },
  paddingLeft: {
    property: "paddingLeft",
    scale: "space"
  },
  pl: {
    property: "paddingLeft",
    scale: "space"
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  px: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  },
  py: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  }
};
/**
 * Types for space related CSS properties
 */

/**
 * Converts shorthand or longhand margin and padding props to margin and padding CSS declarations
 *
 * - Numbers from 0-4 (or the length of theme.space) are converted to values on the spacing scale.
 * - Negative values can be used for negative margins.
 * - Numbers greater than the length of the theme.space array are converted to raw pixel values.
 * - String values are passed as raw CSS values.
 * - Array values are converted into responsive values.
 */
var space$4 = system(config$16);
var spaceParser$4 = createParser(config$16);

var config$17 = {
  fontFamily: {
    property: "fontFamily",
    scale: "fonts"
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSizes"
  },
  fontWeight: {
    property: "fontWeight",
    scale: "fontWeights"
  },
  lineHeight: {
    property: "lineHeight",
    scale: "lineHeights"
  },
  letterSpacing: {
    property: "letterSpacing",
    scale: "letterSpacings"
  },
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: true,
  textDecor: {
    property: "textDecoration"
  }
};
/**
 * Types for typography related CSS properties
 */

var typography$5 = system(config$17);
var typographyParser$4 = createParser(config$17);

/**
 * The parser configuration for common outline properties
 */
var config$18 = {
  outline: true,
  outlineOffset: true,
  outlineColor: {
    property: "outlineColor",
    scale: "colors"
  }
};
var outline$4 = system(config$18);
var outlineParser$4 = createParser(config$18);

var config$19 = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: {
    property: "listStylePosition"
  },
  listStyleImage: true,
  listStyleImg: {
    property: "listStyleImage"
  }
};
var list$4 = system(config$19);
var listParser$4 = createParser(config$19);

var config$1a = {
  transition: true,
  transitionDuration: {
    property: "transitionDuration",
    scale: "transition.duration"
  },
  transitionProperty: {
    property: "transitionProperty",
    scale: "transition.property"
  },
  transitionTimingFunction: {
    property: "transitionTimingFunction",
    scale: "transition.easing"
  }
};
var transition$5 = system(config$1a);
var transitionParser$4 = createParser(config$1a);

var config$1b = {
  transform: true,
  transformOrigin: true
};
var transform$9 = system(config$1b);
var transformParser$4 = createParser(config$1b);

var group$4 = {
  hover: selector => selector + ":hover &, " + selector + "[data-hover] &",
  focus: selector => selector + ":focus &, " + selector + "[data-focus] &",
  active: selector => selector + ":active &, " + selector + "[data-active] &",
  disabled: selector => selector + ":disabled &, " + selector + "[data-disabled] &",
  invalid: selector => selector + ":invalid &, " + selector + "[data-invalid] &",
  checked: selector => selector + ":checked &, " + selector + "[data-checked] &",
  indeterminate: selector => selector + ":indeterminate &, " + selector + "[aria-checked=mixed] &, " + selector + "[data-indeterminate] &",
  readOnly: selector => selector + ":read-only &, " + selector + "[readonly] &, " + selector + "[data-read-only] &",
  expanded: selector => selector + ":read-only &, " + selector + "[aria-expanded=true] &, " + selector + "[data-expanded] &"
};

function toGroup$4(fn) {
  return merge$6(fn, "[role=group]", "[data-group]");
}

function merge$6(fn) {
  for (var _len = arguments.length, selectors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    selectors[_key - 1] = arguments[_key];
  }

  return selectors.map(fn).join(", ");
}

var disabled$4 = selector => selector + ", " + selector + ":focus, " + selector + ":hover";

var disabledSelector$4 = merge$6(disabled$4, "&[disabled]", "&[aria-disabled=true]", "&[data-disabled]");
var pseudoSelectors$4 = {
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover: "&:hover, &[data-hover]",

  /**
   * Styles for CSS Selector `&:active`
   */
  _active: "&:active, &[data-active]",

  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus: "&:focus, &[data-focus]",

  /**
   * Styles for the highlighted state.
   */
  _highlighted: "&[data-highlighted]",

  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin: "&:focus-within",
  _focusVisible: "&:focus-visible",

  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled: disabledSelector$4,

  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",

  /**
   * Styles for CSS selector `&::before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before: "&::before",

  /**
   * Styles for CSS selector `&::after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _after={{content:`""` }}/>
   * ```
   */
  _after: "&::after",
  _empty: "&:empty",

  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded: "&[aria-expanded=true], &[data-expanded]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked: "&[aria-checked=true], &[data-checked]",

  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed: "&[aria-grabbed=true], &[data-grabbed]",

  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed: "&[aria-pressed=true], &[data-pressed]",

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid: "&[aria-invalid=true], &[data-invalid]",

  /**
   * Styles for the valid state
   * - CSS selector `&[data-valid], &[data-state=valid]`
   */
  _valid: "&[data-valid], &[data-state=valid]",

  /**
   * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
   * Useful for styling loading states
   */
  _loading: "&[data-loading], &[aria-busy=true]",

  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   *
   * - CSS selector `&[aria-selected=true]`
   */
  _selected: "&[aria-selected=true], &[data-selected]",

  /**
   * Styles for CSS Selector `[hidden=true]`
   */
  _hidden: "&[hidden], &[data-hidden]",

  /**
   * Styles for CSS Selector `&:-webkit-autofill`
   */
  _autofill: "&:-webkit-autofill",

  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even: "&:nth-of-type(even)",

  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd: "&:nth-of-type(odd)",

  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first: "&:first-of-type",

  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last: "&:last-of-type",

  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst: "&:not(:first-of-type)",

  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast: "&:not(:last-of-type)",

  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited: "&:visited",

  /**
   * Used to style the active link in a navigation
   * Styles for CSS Selector `&[aria-current=page]`
   */
  _activeLink: "&[aria-current=page]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",

  /**
   * Styles to apply when parent is hovered
   */
  _groupHover: toGroup$4(group$4.hover),

  /**
   * Styles to apply when parent is focused
   */
  _groupFocus: toGroup$4(group$4.focus),

  /**
   * Styles to apply when parent is active
   */
  _groupActive: toGroup$4(group$4.active),

  /**
   * Styles to apply when parent is disabled
   */
  _groupDisabled: toGroup$4(group$4.disabled),

  /**
   * Styles to apply when parent is invalid
   */
  _groupInvalid: toGroup$4(group$4.invalid),

  /**
   * Styles to apply when parent is checked
   */
  _groupChecked: toGroup$4(group$4.checked),

  /**
   * Styles for CSS Selector `&::placeholder`.
   */
  _placeholder: "&::placeholder",

  /**
   * Styles for CSS Selector `&:fullscreen`.
   */
  _fullScreen: "&:fullscreen",

  /**
   * Styles for CSS Selector `&::selection`
   */
  _selection: "&::selection"
};
var pseudoPropNames$3 = objectKeys$3(pseudoSelectors$4);

var parser$4 = compose(backgroundParser$4, borderParser$4, colorParser$4, flexboxParser$4, layoutParser$4, outlineParser$4, gridParser$4, othersParser$4, positionParser$4, shadowParser$4, spaceParser$4, typographyParser$4, transformParser$4, transitionParser$4, listParser$4);

var cache$4 = {
  themeBreakpoints: [],
  breakpoints: [],
  breakpointValues: [],
  mediaQueries: []
};

/**
 *
 */
var calculateBreakpointAndMediaQueries$4 = function calculateBreakpointAndMediaQueries(themeBreakpoints) {
  if (themeBreakpoints === void 0) {
    themeBreakpoints = [];
  }

  // caching here reduces execution time by factor 4-6x
  var isCached = cache$4.themeBreakpoints === themeBreakpoints;

  if (isCached) {
    return cache$4;
  }

  var {
    breakpoints,
    breakpointValues
  } = Object.entries(themeBreakpoints).filter((_ref) => {
    var [key] = _ref;
    return isCustomBreakpoint$4(key);
  }).reduce((carry, _ref2) => {
    var [breakpoint, value] = _ref2;
    carry.breakpoints.push(breakpoint);
    carry.breakpointValues.push(value);
    return carry;
  }, {
    breakpoints: [],
    breakpointValues: []
  });
  var mediaQueries = [null, ...breakpointValues.map(bp => "@media screen and (min-width: " + bp + ")").slice(1)];
  cache$4.themeBreakpoints = themeBreakpoints;
  cache$4.mediaQueries = mediaQueries;
  cache$4.breakpointValues = breakpointValues;
  cache$4.breakpoints = breakpoints;
  return {
    breakpoints,
    mediaQueries
  };
};

var responsive$4 = styles => theme => {
  var computedStyles = {};
  var {
    breakpoints,
    mediaQueries
  } = calculateBreakpointAndMediaQueries$4(theme.breakpoints);

  for (var key in styles) {
    var value = runIfFn$4(styles[key], theme);

    if (value == null) {
      continue;
    }

    value = isResponsiveObjectLike$4(value, breakpoints) ? objectToArrayNotation$4(value, breakpoints) : value;

    if (!isArray$4(value)) {
      computedStyles[key] = value;
      continue;
    }

    var queries = value.slice(0, mediaQueries.length).length;

    for (var index = 0; index < queries; index += 1) {
      var media = mediaQueries[index];

      if (!media) {
        computedStyles[key] = value[index];
        continue;
      }

      computedStyles[media] = computedStyles[media] || {};

      if (value[index] == null) {
        continue;
      }

      computedStyles[media][key] = value[index];
    }
  }

  return computedStyles;
};

var css$5 = function css(args) {
  if (args === void 0) {
    args = {};
  }

  return function (props) {
    if (props === void 0) {
      props = {};
    }

    var theme = "theme" in props ? props.theme : props;
    var computedStyles = {};
    var styleObject = runIfFn$4(args, theme);
    var styles = responsive$4(styleObject)(theme);

    for (var k in styles) {
      var _config$transform;

      var x = styles[k];
      var val = runIfFn$4(x, theme);
      var key = k in pseudoSelectors$4 ? pseudoSelectors$4[k] : k;
      var config = parser$4.config[key];

      if (key === "apply") {
        var apply = css(memoizedGet$4(theme, val))(theme);
        computedStyles = lodash_mergewith({}, computedStyles, apply);
        continue;
      }

      if (isObject$4(val)) {
        computedStyles[key] = css(val)(theme);
        continue;
      }

      var scale = memoizedGet$4(theme, config == null ? void 0 : config.scale, {});
      var value = (_config$transform = config == null ? void 0 : config.transform == null ? void 0 : config.transform(val, scale)) != null ? _config$transform : memoizedGet$4(scale, val, val);

      if (config == null ? void 0 : config.properties) {
        for (var property of config.properties) {
          computedStyles[property] = value;
        }

        continue;
      }

      if (config == null ? void 0 : config.property) {
        computedStyles[config.property] = value;
        continue;
      }

      computedStyles[key] = value;
    }

    return computedStyles;
  };
};

var systemProps$4 = compose(background$4, border$4, color$4, flexbox$4, layout$4, outline$4, grid$4, others$4, position$4, shadow$4, space$4, typography$5, transform$9, list$4, transition$5);
var layoutSystem$4 = compose(space$4, layout$4, flexbox$4, grid$4, position$4);
var propNames$3 = [...systemProps$4.propNames, ...pseudoPropNames$3];

function useTheme$1() {
  var theme = react.useContext(ThemeContext);

  if (!theme) {
    throw Error("useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />`");
  }

  return theme;
}
var [StylesProvider$2, useStyles$2] = createContext$3({
  name: "StylesContext",
  errorMessage: "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "
});

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
var domElements$3 = ["a", "b", "article", "aside", "blockquote", "button", "caption", "cite", "circle", "code", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "img", "input", "kbd", "label", "li", "mark", "nav", "ol", "p", "path", "pre", "q", "rect", "s", "svg", "section", "select", "strong", "small", "span", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "tr", "ul"];
function omitThemingProps$1(props) {
  return omit$2(props, ["styleConfig", "size", "variant", "colorScheme"]);
}

function _extends$i() { _extends$i = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$i.apply(this, arguments); }
function useChakra$1() {
  var colorModeResult = useColorMode$2();
  var theme = useTheme$1();
  return _extends$i({}, colorModeResult, {
    theme
  });
}

var tags$3 = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

var newStyled$3 = createStyled.bind();
tags$3.forEach(function (tagName) {
  newStyled$3[tagName] = newStyled$3(tagName);
});

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */

var allPropNames$3 = new Set([...propNames$3, "textStyle", "layerStyle", "apply", "isTruncated", "noOfLines", "focusBorderColor", "errorBorderColor", "as", "__css", "css", "sx"]);
/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */

var validHTMLProps$3 = new Set(["htmlWidth", "htmlHeight", "htmlSize"]);
var shouldForwardProp$3 = prop => validHTMLProps$3.has(prop) || !allPropNames$3.has(prop);

function _extends$j() { _extends$j = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$j.apply(this, arguments); }

function _objectWithoutPropertiesLoose$6(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Convert propNames array to object to faster lookup perf
 */

var stylePropNames$3 = propNames$3.reduce((keymirror, key) => {
  if (typeof key !== "object" && typeof key !== "function") keymirror[key] = key;
  return keymirror;
}, {});

/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */
var styleResolver$3 = (_ref) => {
  var {
    baseStyle
  } = _ref;
  return props => {
    var {
      theme,
      layerStyle,
      textStyle,
      apply,
      noOfLines,
      isTruncated,
      css: cssProp,
      __css,
      sx
    } = props,
        rest = _objectWithoutPropertiesLoose$6(props, ["theme", "layerStyle", "textStyle", "apply", "noOfLines", "isTruncated", "css", "__css", "sx"]);

    var _layerStyle = memoizedGet$4(theme, "layerStyles." + layerStyle, {});

    var _textStyle = memoizedGet$4(theme, "textStyles." + textStyle, {}); // filter out props that aren't style props


    var styleProps = objectFilter$3(rest, (_, prop) => prop in stylePropNames$3);
    var truncateStyle = {};

    if (noOfLines != null) {
      truncateStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: noOfLines
      };
    } else if (isTruncated) {
      truncateStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      };
    }
    /**
     * The computed, theme-aware style object. The other of the properties
     * within `objectAssign` determines how styles are overriden.
     */


    var finalStyles = objectAssign({}, __css, baseStyle, {
      apply
    }, _layerStyle, _textStyle, truncateStyle, styleProps, sx); // Converts theme-aware style object to real css object

    var computedCSS = css$5(finalStyles)(props.theme); // Merge the computed css object with styles in css prop

    var cssObject = objectAssign(computedCSS, isFunction$4(cssProp) ? cssProp(theme) : cssProp);
    return cssObject;
  };
};
function styled$3(component, options) {
  var _ref2 = options != null ? options : {},
      {
    baseStyle
  } = _ref2,
      styledOptions = _objectWithoutPropertiesLoose$6(_ref2, ["baseStyle"]);

  var opts = _extends$j({}, styledOptions, {
    shouldForwardProp: shouldForwardProp$3
  });

  var _styled = newStyled$3(component, opts);

  var interpolation = styleResolver$3({
    baseStyle
  });

  var StyledComponent = _styled(interpolation);

  return StyledComponent;
}
var chakra$3 = styled$3;
domElements$3.forEach(tag => {
  // @ts-expect-error
  chakra$3[tag] = chakra$3(tag);
});

/**
 * All credit goes to Chance (Reach UI), and Haz (Reakit) for creating
 * the base type definitions upon which we improved on
 */
function forwardRef$2(component) {
  return /*#__PURE__*/react.forwardRef(component);
}

function _objectWithoutPropertiesLoose$7(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function useStyleConfig$1(themeKey, props, opts) {
  var _styleConfig$defaultP;

  var {
    styleConfig: styleConfigProp
  } = props,
      rest = _objectWithoutPropertiesLoose$7(props, ["styleConfig"]);

  var {
    theme,
    colorMode
  } = useChakra$1();
  var themeStyleConfig = memoizedGet$4(theme, "components." + themeKey);
  var styleConfig = styleConfigProp || themeStyleConfig;
  var mergedProps = lodash_mergewith({
    theme,
    colorMode
  }, (_styleConfig$defaultP = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _styleConfig$defaultP : {}, filterUndefined$1(omit$2(rest, ["children"])));
  /**
   * Store the computed styles in a `ref` to avoid unneeded re-computation
   */

  var stylesRef = react.useRef({});
  return react.useMemo(() => {
    if (styleConfig) {
      var _styleConfig$baseStyl, _styleConfig$variants, _styleConfig$variants2, _styleConfig$sizes$me, _styleConfig$sizes;

      var baseStyles = runIfFn$4((_styleConfig$baseStyl = styleConfig.baseStyle) != null ? _styleConfig$baseStyl : {}, mergedProps);
      var variants = runIfFn$4((_styleConfig$variants = (_styleConfig$variants2 = styleConfig.variants) == null ? void 0 : _styleConfig$variants2[mergedProps.variant]) != null ? _styleConfig$variants : {}, mergedProps);
      var sizes = runIfFn$4((_styleConfig$sizes$me = (_styleConfig$sizes = styleConfig.sizes) == null ? void 0 : _styleConfig$sizes[mergedProps.size]) != null ? _styleConfig$sizes$me : {}, mergedProps);
      var styles = lodash_mergewith({}, baseStyles, sizes, variants);

      if ((opts == null ? void 0 : opts.isMultiPart) && styleConfig.parts) {
        styleConfig.parts.forEach(part => {
          var _styles$part;

          styles[part] = (_styles$part = styles[part]) != null ? _styles$part : {};
        });
      }

      var isStyleEqual = reactFastCompare(stylesRef.current, styles);

      if (!isStyleEqual) {
        stylesRef.current = styles;
      }
    }

    return stylesRef.current;
  }, [styleConfig, mergedProps, opts == null ? void 0 : opts.isMultiPart]);
}

var [ButtonGroupProvider, useButtonGroup] = createContext$3({
  strict: false,
  name: "ButtonGroupContext"
});

function _objectWithoutPropertiesLoose$8(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends$k() { _extends$k = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$k.apply(this, arguments); }
var Button$1 = /*#__PURE__*/forwardRef$2(function Button(props, ref) {
  var _styles$_focus;

  var group = useButtonGroup();
  var styles = useStyleConfig$1("Button", _extends$k({}, group, props));

  var _omitThemingProps = omitThemingProps$1(props),
      {
    isDisabled = group == null ? void 0 : group.isDisabled,
    isLoading,
    isActive,
    isFullWidth,
    children,
    leftIcon,
    rightIcon,
    loadingText,
    iconSpacing = "0.5rem",
    type = "button",
    spinner,
    className,
    as
  } = _omitThemingProps,
      rest = _objectWithoutPropertiesLoose$8(_omitThemingProps, ["isDisabled", "isLoading", "isActive", "isFullWidth", "children", "leftIcon", "rightIcon", "loadingText", "iconSpacing", "type", "spinner", "className", "as"]);
  /**
   * When button is used within ButtonGroup (i.e flushed with sibling buttons),
   * it's important to add a `zIndex` when it's focused to it doesn't look funky.
   *
   * So let's read the component styles and then add `zIndex` to it.
   */


  var _focus = lodash_mergewith({}, (_styles$_focus = styles == null ? void 0 : styles["_focus"]) != null ? _styles$_focus : {}, {
    zIndex: 1
  });

  var buttonStyles = _extends$k({
    display: "inline-flex",
    appearance: "none",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 250ms",
    userSelect: "none",
    position: "relative",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    outline: "none",
    width: isFullWidth ? "100%" : "auto"
  }, styles, !!group && {
    _focus
  });

  return /*#__PURE__*/react.createElement(chakra$3.button, _extends$k({
    disabled: isDisabled || isLoading,
    ref: ref,
    as: as,
    type: as ? undefined : type,
    "data-active": dataAttr(isActive),
    "data-loading": dataAttr(isLoading),
    __css: buttonStyles,
    className: cx$1("chakra-button", className)
  }, rest), leftIcon && !isLoading && /*#__PURE__*/react.createElement(ButtonIcon, {
    mr: iconSpacing
  }, leftIcon), isLoading && /*#__PURE__*/react.createElement(ButtonSpinner, {
    __css: {
      fontSize: "1em",
      lineHeight: "normal"
    },
    spacing: iconSpacing,
    label: loadingText
  }, spinner), isLoading ? loadingText || /*#__PURE__*/react.createElement(chakra$3.span, {
    opacity: 0
  }, children) : children, rightIcon && !isLoading && /*#__PURE__*/react.createElement(ButtonIcon, {
    ml: iconSpacing
  }, rightIcon));
});

var ButtonIcon = props => {
  var {
    children,
    className
  } = props,
      rest = _objectWithoutPropertiesLoose$8(props, ["children", "className"]);

  var _children = /*#__PURE__*/react.isValidElement(children) ? /*#__PURE__*/react.cloneElement(children, {
    "aria-hidden": true,
    focusable: false
  }) : children;

  var _className = cx$1("chakra-button__icon", className);

  return /*#__PURE__*/react.createElement(chakra$3.span, _extends$k({}, rest, {
    className: _className
  }), _children);
};

var ButtonSpinner = props => {
  var {
    label,
    spacing,
    children = /*#__PURE__*/react.createElement(Spinner$1, {
      color: "currentColor",
      width: "1em",
      height: "1em"
    }),
    className,
    __css
  } = props,
      rest = _objectWithoutPropertiesLoose$8(props, ["label", "spacing", "children", "className", "__css"]);

  var _className = cx$1("chakra-button__spinner", className);

  var spinnerStyles = _extends$k({
    display: "flex",
    alignItems: "center",
    position: label ? "relative" : "absolute",
    mr: label ? spacing : 0
  }, __css);

  return /*#__PURE__*/react.createElement(chakra$3.div, _extends$k({
    className: _className
  }, rest, {
    __css: spinnerStyles
  }), children);
};

// Number assertions
function isNumber$5(value) {
  return typeof value === "number";
}

function isArray$5(value) {
  return Array.isArray(value);
}

function isFunction$5(value) {
  return typeof value === "function";
} // Generic assertions

var isObject$5 = value => {
  var type = typeof value;
  return value != null && (type === "object" || type === "function") && !isArray$5(value);
};
var isNull = value => value == null; // String assertions

function isString$5(value) {
  return Object.prototype.toString.call(value) === "[object String]";
} // Event assertions

function runIfFn$5(valueOrFn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return isFunction$5(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

var win$4;
/**
 * Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
 * hits a memory leak, whereas aliasing it and calling "typeof win" does not.
 * Caching the window value at the file scope lets us minimize the impact.
 *
 * @see IE11 Memory Leak Issue https://github.com/microsoft/fluentui/pull/9010#issuecomment-490768427
 */

try {
  win$4 = window;
} catch (e) {
  /* no-op */
}
/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11.
 */


var getWindow$4 = node => {
  var _node$ownerDocument$d, _node$ownerDocument;

  return (_node$ownerDocument$d = node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) != null ? _node$ownerDocument$d : win$4;
};
/**
 * Check if we can use the DOM. Useful for SSR purposes
 */

function checkIsBrowser$4() {
  var win = getWindow$4();
  return Boolean(typeof win !== "undefined" && win.document && win.document.createElement);
}

var isBrowser$5 = checkIsBrowser$4();
var cx$2 = function cx() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }

  return classNames.filter(Boolean).join(" ");
};

function getLastItem$5(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
/**
 * since breakpoints are defined as custom properties on an array, you may
 * `Object.keys(theme.breakpoints)` to retrieve both regular numeric indices
 * and custom breakpoints as string.
 *
 * This function returns true given a custom array property.
 */

var isCustomBreakpoint$5 = maybeBreakpoint => Number.isNaN(parseInt(maybeBreakpoint, 10));

function omit$3(object, keys) {
  var result = {};
  Object.keys(object).forEach(key => {
    if (keys.includes(key)) return;
    result[key] = object[key];
  });
  return result;
}
/**
 * Get value from a deeply nested object using a string path.
 * Memoizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */

function get$6(obj, path, fallback, index) {
  var key = typeof path === "string" ? path.split(".") : [path];

  for (index = 0; index < key.length; index += 1) {
    if (!obj) {
      break;
    }

    obj = obj[key[index]];
  }

  return obj === undefined ? fallback : obj;
}

var memoize$5 = fn => {
  var cache = new WeakMap();

  var memoizedFn = (obj, path, fallback, index) => {
    if (!cache.has(obj)) {
      cache.set(obj, new Map());
    }

    var map = cache.get(obj);
    var key = typeof path === "string" ? path.split(".") : [path];

    if (map.has(key)) {
      return map.get(key);
    }

    var value = fn(obj, path, fallback, index);
    map.set(key, value);
    return value;
  };

  return memoizedFn;
};

var memoizedGet$5 = memoize$5(get$6);

/**
 * Returns the items of an object that meet the condition specified in a callback function.
 *
 * @param object the object to loop through
 * @param fn The filter function
 */
function objectFilter$4(object, fn) {
  var result = {};
  Object.keys(object).forEach(key => {
    var value = object[key];
    var shouldPass = fn(value, key, object);

    if (shouldPass) {
      result[key] = value;
    }
  });
  return result;
}
var filterUndefined$2 = object => objectFilter$4(object, val => val !== null && val !== undefined);
var objectKeys$4 = obj => Object.keys(obj);

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
function createContext$4(options) {
  if (options === void 0) {
    options = {};
  }

  var {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name
  } = options;
  var Context = /*#__PURE__*/react.createContext(undefined);
  Context.displayName = name;

  function useContext() {
    var context = react.useContext(Context);

    if (!context && strict) {
      throw new Error(errorMessage);
    }

    return context;
  }

  return [Context.Provider, useContext, Context];
}
/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */

function getValidChildren(children) {
  return react.Children.toArray(children).filter(child => /*#__PURE__*/react.isValidElement(child));
}

var breakpoints$6 = Object.freeze(["base", "sm", "md", "lg", "xl"]);
function mapResponsive(prop, mapper) {
  if (isArray$5(prop)) {
    return prop.map(item => {
      if (item === null) {
        return null;
      }

      return mapper(item);
    });
  }

  if (isObject$5(prop)) {
    return objectKeys$4(prop).reduce((result, key) => {
      result[key] = mapper(prop[key]);
      return result;
    }, {});
  }

  if (prop != null) {
    return mapper(prop);
  }

  return null;
}
function objectToArrayNotation$5(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints$6;
  }

  var result = bps.map(br => {
    var _obj$br;

    return (_obj$br = obj[br]) != null ? _obj$br : null;
  });

  while (getLastItem$5(result) === null) {
    result.pop();
  }

  return result;
}
function isResponsiveObjectLike$5(obj, bps) {
  if (bps === void 0) {
    bps = breakpoints$6;
  }

  var keys = Object.keys(obj);
  return keys.length > 0 && keys.every(key => bps.includes(key));
}

var ColorModeContext$3 = /*#__PURE__*/react.createContext({});
/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */


var useColorMode$3 = () => {
  var context = react.useContext(ColorModeContext$3);

  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }

  return context;
};

var config$1c = {
  bg: {
    property: "background",
    scale: "colors"
  },
  bgColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  background: {
    property: "background",
    scale: "colors"
  },
  backgroundColor: {
    property: "backgroundColor",
    scale: "colors"
  },
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  bgImage: {
    property: "backgroundImage"
  },
  bgImg: {
    property: "backgroundImage"
  },
  bgBlendMode: {
    property: "backgroundBlendMode"
  },
  bgSize: {
    property: "backgroundSize"
  },
  bgPosition: {
    property: "backgroundPosition"
  },
  bgPos: {
    property: "backgroundPosition"
  },
  bgRepeat: {
    property: "backgroundRepeat"
  },
  bgAttachment: {
    property: "backgroundAttachment"
  }
};
var background$5 = system(config$1c);
var backgroundParser$5 = createParser(config$1c);

/**
 * The parser configuration for common border properties
 */
var config$1d = {
  border: {
    property: "border",
    scale: "borders"
  },
  borderWidth: {
    property: "borderWidth",
    scale: "borderWidths"
  },
  borderStyle: {
    property: "borderStyle",
    scale: "borderStyles"
  },
  borderColor: {
    property: "borderColor",
    scale: "colors"
  },
  borderRadius: {
    property: "borderRadius",
    scale: "radii"
  },
  rounded: {
    property: "borderRadius",
    scale: "radii"
  },
  borderTop: {
    property: "borderTop",
    scale: "borders"
  },
  borderTopLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  roundedTopLeft: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  roundedTopRight: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  borderRight: {
    property: "borderRight",
    scale: "borders"
  },
  borderBottom: {
    property: "borderBottom",
    scale: "borders"
  },
  borderBottomLeftRadius: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  roundedBottomLeft: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  roundedBottomRight: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  borderLeft: {
    property: "borderLeft",
    scale: "borders"
  },
  borderX: {
    properties: ["borderLeft", "borderRight"],
    scale: "borders"
  },
  borderY: {
    properties: ["borderTop", "borderBottom"],
    scale: "borders"
  },
  borderTopWidth: {
    property: "borderTopWidth",
    scale: "borderWidths"
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors"
  },
  borderTopStyle: {
    property: "borderTopStyle",
    scale: "borderStyles"
  },
  borderBottomWidth: {
    property: "borderBottomWidth",
    scale: "borderWidths"
  },
  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors"
  },
  borderBottomStyle: {
    property: "borderBottomStyle",
    scale: "borderStyles"
  },
  borderLeftWidth: {
    property: "borderLeftWidth",
    scale: "borderWidths"
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors"
  },
  borderLeftStyle: {
    property: "borderLeftStyle",
    scale: "borderStyles"
  },
  borderRightWidth: {
    property: "borderRightWidth",
    scale: "borderWidths"
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors"
  },
  borderRightStyle: {
    property: "borderRightStyle",
    scale: "borderStyles"
  },
  borderTopRadius: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  roundedTop: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedBottom: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  roundedLeft: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedRight: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  }
};
/**
 * The prop types for border properties listed above
 */

var border$5 = system(config$1d);
var borderParser$5 = createParser(config$1d);

/**
 * The parser configuration for common border properties
 */
var config$1e = {
  color: {
    property: "color",
    scale: "colors"
  },
  textColor: {
    property: "color",
    scale: "colors"
  },
  opacity: true,
  fill: {
    property: "fill",
    scale: "colors"
  },
  stroke: {
    property: "stroke",
    scale: "colors"
  }
};
var color$5 = system(config$1e);
var colorParser$5 = createParser(config$1e);

var config$1f = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: {
    property: "flexBasis",
    scale: "sizes"
  },
  justifySelf: true,
  alignSelf: true,
  order: true,
  flexDir: {
    property: "flexDirection"
  }
};
/**
 * Types for flexbox related CSS properties
 */

var flexbox$5 = system(config$1f);
var flexboxParser$5 = createParser(config$1f);

var config$1g = {
  gridGap: {
    property: "gridGap",
    scale: "space"
  },
  gridColumnGap: {
    property: "gridColumnGap",
    scale: "space"
  },
  gridRowGap: {
    property: "gridRowGap",
    scale: "space"
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
  placeItems: true
};
/**
 * Types for grid related CSS properties
 */

var grid$5 = system(config$1g);
var gridParser$5 = createParser(config$1g);

function transform$a(value, scale) {
  var defaultValue = !isNumber$5(value) || value > 1 ? value : value * 100 + "%";
  return memoizedGet$5(scale, value, defaultValue);
}

var config$1h = {
  width: {
    property: "width",
    scale: "sizes",
    transform: transform$a
  },
  w: {
    property: "width",
    scale: "sizes",
    transform: transform$a
  },
  height: {
    property: "height",
    scale: "sizes"
  },
  h: {
    property: "height",
    scale: "sizes"
  },
  boxSize: {
    properties: ["width", "height"],
    scale: "sizes"
  },
  minWidth: {
    property: "minWidth",
    scale: "sizes"
  },
  minW: {
    property: "minWidth",
    scale: "sizes"
  },
  minHeight: {
    property: "minHeight",
    scale: "sizes"
  },
  minH: {
    property: "minHeight",
    scale: "sizes"
  },
  maxWidth: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxHeight: {
    property: "maxHeight",
    scale: "sizes"
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes"
  },
  d: {
    property: "display"
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true
};
/**
 * Types for layout related CSS properties
 */

var layout$5 = system(config$1h);
var layoutParser$5 = createParser(config$1h);

var config$1i = {
  animation: true,
  appearance: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  objectFit: true,
  objectPosition: true,
  float: true,
  willChange: true
};
var others$5 = system(config$1i);
var othersParser$5 = createParser(config$1i);

var startsWith$5 = (string, target) => string.slice(0, 0 + target.length) === target;

function positiveOrNegative$5(value, scale) {
  if (!scale || value == null) return value;
  var result;
  var valueString = value.toString();

  if (startsWith$5(valueString, "-")) {
    var raw = scale[valueString.slice(1)];

    if (isString$5(raw)) {
      result = "-" + raw;
    } else if (isNumber$5(raw)) {
      result = raw * -1;
    } else {
      result = value;
    }
  } else {
    var _scale$value;

    result = (_scale$value = scale[value]) != null ? _scale$value : value;
  }

  var computedValue = result || value;
  var hasUnit = cssGetUnit(computedValue);

  if (!hasUnit && !Number.isNaN(Number(computedValue))) {
    computedValue = Number(computedValue);
  }

  return computedValue;
}

var config$1j = {
  position: true,
  pos: {
    property: "position"
  },
  zIndex: {
    property: "zIndex",
    scale: "zIndices"
  },
  inset: {
    properties: ["left", "top", "bottom", "right"],
    scale: "space",
    transform: positiveOrNegative$5
  },
  insetX: {
    properties: ["left", "right"],
    scale: "space",
    transform: positiveOrNegative$5
  },
  insetY: {
    properties: ["top", "bottom"],
    scale: "space",
    transform: positiveOrNegative$5
  },
  top: {
    property: "top",
    scale: "space",
    transform: positiveOrNegative$5
  },
  right: {
    property: "right",
    scale: "space",
    transform: positiveOrNegative$5
  },
  bottom: {
    property: "bottom",
    scale: "space",
    transform: positiveOrNegative$5
  },
  left: {
    property: "left",
    scale: "space",
    transform: positiveOrNegative$5
  }
};
/**
 * Types for position CSS properties
 */

var position$5 = system(config$1j);
var positionParser$5 = createParser(config$1j);

var config$1k = {
  boxShadow: {
    property: "boxShadow",
    scale: "shadows"
  },
  textShadow: {
    property: "textShadow",
    scale: "shadows"
  },
  shadow: {
    property: "boxShadow",
    scale: "shadows"
  }
};
/**
 * Types for box and text shadow properties
 */

var shadow$5 = system(config$1k);
var shadowParser$5 = createParser(config$1k);

var config$1l = {
  margin: {
    property: "margin",
    transform: positiveOrNegative$5,
    scale: "space"
  },
  m: {
    property: "margin",
    transform: positiveOrNegative$5,
    scale: "space"
  },
  marginTop: {
    property: "marginTop",
    transform: positiveOrNegative$5,
    scale: "space"
  },
  mt: {
    property: "marginTop",
    transform: positiveOrNegative$5,
    scale: "space"
  },
  marginRight: {
    property: "marginRight",
    transform: positiveOrNegative$5,
    scale: "space"
  },
  mr: {
    property: "marginRight",
    transform: positiveOrNegative$5,
    scale: "space"
  },
  marginBottom: {
    property: "marginBottom",
    transform: positiveOrNegative$5,
    scale: "space"
  },
  mb: {
    property: "marginBottom",
    transform: positiveOrNegative$5,
    scale: "space"
  },
  marginLeft: {
    property: "marginLeft",
    transform: positiveOrNegative$5,
    scale: "space"
  },
  ml: {
    property: "marginLeft",
    transform: positiveOrNegative$5,
    scale: "space"
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative$5,
    scale: "space"
  },
  mx: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegative$5,
    scale: "space"
  },
  marginY: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative$5,
    scale: "space"
  },
  my: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegative$5,
    scale: "space"
  },
  padding: {
    property: "padding",
    scale: "space"
  },
  p: {
    property: "padding",
    scale: "space"
  },
  paddingTop: {
    property: "paddingTop",
    scale: "space"
  },
  pt: {
    property: "paddingTop",
    scale: "space"
  },
  paddingRight: {
    property: "paddingRight",
    scale: "space"
  },
  pr: {
    property: "paddingRight",
    scale: "space"
  },
  paddingBottom: {
    property: "paddingBottom",
    scale: "space"
  },
  pb: {
    property: "paddingBottom",
    scale: "space"
  },
  paddingLeft: {
    property: "paddingLeft",
    scale: "space"
  },
  pl: {
    property: "paddingLeft",
    scale: "space"
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  px: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  },
  py: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  }
};
/**
 * Types for space related CSS properties
 */

/**
 * Converts shorthand or longhand margin and padding props to margin and padding CSS declarations
 *
 * - Numbers from 0-4 (or the length of theme.space) are converted to values on the spacing scale.
 * - Negative values can be used for negative margins.
 * - Numbers greater than the length of the theme.space array are converted to raw pixel values.
 * - String values are passed as raw CSS values.
 * - Array values are converted into responsive values.
 */
var space$5 = system(config$1l);
var spaceParser$5 = createParser(config$1l);

var config$1m = {
  fontFamily: {
    property: "fontFamily",
    scale: "fonts"
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSizes"
  },
  fontWeight: {
    property: "fontWeight",
    scale: "fontWeights"
  },
  lineHeight: {
    property: "lineHeight",
    scale: "lineHeights"
  },
  letterSpacing: {
    property: "letterSpacing",
    scale: "letterSpacings"
  },
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: true,
  textDecor: {
    property: "textDecoration"
  }
};
/**
 * Types for typography related CSS properties
 */

var typography$6 = system(config$1m);
var typographyParser$5 = createParser(config$1m);

/**
 * The parser configuration for common outline properties
 */
var config$1n = {
  outline: true,
  outlineOffset: true,
  outlineColor: {
    property: "outlineColor",
    scale: "colors"
  }
};
var outline$5 = system(config$1n);
var outlineParser$5 = createParser(config$1n);

var config$1o = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: {
    property: "listStylePosition"
  },
  listStyleImage: true,
  listStyleImg: {
    property: "listStyleImage"
  }
};
var list$5 = system(config$1o);
var listParser$5 = createParser(config$1o);

var config$1p = {
  transition: true,
  transitionDuration: {
    property: "transitionDuration",
    scale: "transition.duration"
  },
  transitionProperty: {
    property: "transitionProperty",
    scale: "transition.property"
  },
  transitionTimingFunction: {
    property: "transitionTimingFunction",
    scale: "transition.easing"
  }
};
var transition$6 = system(config$1p);
var transitionParser$5 = createParser(config$1p);

var config$1q = {
  transform: true,
  transformOrigin: true
};
var transform$b = system(config$1q);
var transformParser$5 = createParser(config$1q);

var group$5 = {
  hover: selector => selector + ":hover &, " + selector + "[data-hover] &",
  focus: selector => selector + ":focus &, " + selector + "[data-focus] &",
  active: selector => selector + ":active &, " + selector + "[data-active] &",
  disabled: selector => selector + ":disabled &, " + selector + "[data-disabled] &",
  invalid: selector => selector + ":invalid &, " + selector + "[data-invalid] &",
  checked: selector => selector + ":checked &, " + selector + "[data-checked] &",
  indeterminate: selector => selector + ":indeterminate &, " + selector + "[aria-checked=mixed] &, " + selector + "[data-indeterminate] &",
  readOnly: selector => selector + ":read-only &, " + selector + "[readonly] &, " + selector + "[data-read-only] &",
  expanded: selector => selector + ":read-only &, " + selector + "[aria-expanded=true] &, " + selector + "[data-expanded] &"
};

function toGroup$5(fn) {
  return merge$7(fn, "[role=group]", "[data-group]");
}

function merge$7(fn) {
  for (var _len = arguments.length, selectors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    selectors[_key - 1] = arguments[_key];
  }

  return selectors.map(fn).join(", ");
}

var disabled$5 = selector => selector + ", " + selector + ":focus, " + selector + ":hover";

var disabledSelector$5 = merge$7(disabled$5, "&[disabled]", "&[aria-disabled=true]", "&[data-disabled]");
var pseudoSelectors$5 = {
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover: "&:hover, &[data-hover]",

  /**
   * Styles for CSS Selector `&:active`
   */
  _active: "&:active, &[data-active]",

  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus: "&:focus, &[data-focus]",

  /**
   * Styles for the highlighted state.
   */
  _highlighted: "&[data-highlighted]",

  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin: "&:focus-within",
  _focusVisible: "&:focus-visible",

  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&:disabled:focus`
   * - `&:disabled:hover`
   * - `&:focus[aria-disabled=true]`
   * - `&:hover[aria-disabled=true]`
   */
  _disabled: disabledSelector$5,

  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",

  /**
   * Styles for CSS selector `&::before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before: "&::before",

  /**
   * Styles for CSS selector `&::after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _after={{content:`""` }}/>
   * ```
   */
  _after: "&::after",
  _empty: "&:empty",

  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded: "&[aria-expanded=true], &[data-expanded]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked: "&[aria-checked=true], &[data-checked]",

  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed: "&[aria-grabbed=true], &[data-grabbed]",

  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed: "&[aria-pressed=true], &[data-pressed]",

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid: "&[aria-invalid=true], &[data-invalid]",

  /**
   * Styles for the valid state
   * - CSS selector `&[data-valid], &[data-state=valid]`
   */
  _valid: "&[data-valid], &[data-state=valid]",

  /**
   * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
   * Useful for styling loading states
   */
  _loading: "&[data-loading], &[aria-busy=true]",

  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   *
   * - CSS selector `&[aria-selected=true]`
   */
  _selected: "&[aria-selected=true], &[data-selected]",

  /**
   * Styles for CSS Selector `[hidden=true]`
   */
  _hidden: "&[hidden], &[data-hidden]",

  /**
   * Styles for CSS Selector `&:-webkit-autofill`
   */
  _autofill: "&:-webkit-autofill",

  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even: "&:nth-of-type(even)",

  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd: "&:nth-of-type(odd)",

  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first: "&:first-of-type",

  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last: "&:last-of-type",

  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst: "&:not(:first-of-type)",

  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast: "&:not(:last-of-type)",

  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited: "&:visited",

  /**
   * Used to style the active link in a navigation
   * Styles for CSS Selector `&[aria-current=page]`
   */
  _activeLink: "&[aria-current=page]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",

  /**
   * Styles to apply when parent is hovered
   */
  _groupHover: toGroup$5(group$5.hover),

  /**
   * Styles to apply when parent is focused
   */
  _groupFocus: toGroup$5(group$5.focus),

  /**
   * Styles to apply when parent is active
   */
  _groupActive: toGroup$5(group$5.active),

  /**
   * Styles to apply when parent is disabled
   */
  _groupDisabled: toGroup$5(group$5.disabled),

  /**
   * Styles to apply when parent is invalid
   */
  _groupInvalid: toGroup$5(group$5.invalid),

  /**
   * Styles to apply when parent is checked
   */
  _groupChecked: toGroup$5(group$5.checked),

  /**
   * Styles for CSS Selector `&::placeholder`.
   */
  _placeholder: "&::placeholder",

  /**
   * Styles for CSS Selector `&:fullscreen`.
   */
  _fullScreen: "&:fullscreen",

  /**
   * Styles for CSS Selector `&::selection`
   */
  _selection: "&::selection"
};
var pseudoPropNames$4 = objectKeys$4(pseudoSelectors$5);

var parser$5 = compose(backgroundParser$5, borderParser$5, colorParser$5, flexboxParser$5, layoutParser$5, outlineParser$5, gridParser$5, othersParser$5, positionParser$5, shadowParser$5, spaceParser$5, typographyParser$5, transformParser$5, transitionParser$5, listParser$5);

var cache$5 = {
  themeBreakpoints: [],
  breakpoints: [],
  breakpointValues: [],
  mediaQueries: []
};

/**
 *
 */
var calculateBreakpointAndMediaQueries$5 = function calculateBreakpointAndMediaQueries(themeBreakpoints) {
  if (themeBreakpoints === void 0) {
    themeBreakpoints = [];
  }

  // caching here reduces execution time by factor 4-6x
  var isCached = cache$5.themeBreakpoints === themeBreakpoints;

  if (isCached) {
    return cache$5;
  }

  var {
    breakpoints,
    breakpointValues
  } = Object.entries(themeBreakpoints).filter((_ref) => {
    var [key] = _ref;
    return isCustomBreakpoint$5(key);
  }).reduce((carry, _ref2) => {
    var [breakpoint, value] = _ref2;
    carry.breakpoints.push(breakpoint);
    carry.breakpointValues.push(value);
    return carry;
  }, {
    breakpoints: [],
    breakpointValues: []
  });
  var mediaQueries = [null, ...breakpointValues.map(bp => "@media screen and (min-width: " + bp + ")").slice(1)];
  cache$5.themeBreakpoints = themeBreakpoints;
  cache$5.mediaQueries = mediaQueries;
  cache$5.breakpointValues = breakpointValues;
  cache$5.breakpoints = breakpoints;
  return {
    breakpoints,
    mediaQueries
  };
};

var responsive$5 = styles => theme => {
  var computedStyles = {};
  var {
    breakpoints,
    mediaQueries
  } = calculateBreakpointAndMediaQueries$5(theme.breakpoints);

  for (var key in styles) {
    var value = runIfFn$5(styles[key], theme);

    if (value == null) {
      continue;
    }

    value = isResponsiveObjectLike$5(value, breakpoints) ? objectToArrayNotation$5(value, breakpoints) : value;

    if (!isArray$5(value)) {
      computedStyles[key] = value;
      continue;
    }

    var queries = value.slice(0, mediaQueries.length).length;

    for (var index = 0; index < queries; index += 1) {
      var media = mediaQueries[index];

      if (!media) {
        computedStyles[key] = value[index];
        continue;
      }

      computedStyles[media] = computedStyles[media] || {};

      if (value[index] == null) {
        continue;
      }

      computedStyles[media][key] = value[index];
    }
  }

  return computedStyles;
};

var css$6 = function css(args) {
  if (args === void 0) {
    args = {};
  }

  return function (props) {
    if (props === void 0) {
      props = {};
    }

    var theme = "theme" in props ? props.theme : props;
    var computedStyles = {};
    var styleObject = runIfFn$5(args, theme);
    var styles = responsive$5(styleObject)(theme);

    for (var k in styles) {
      var _config$transform;

      var x = styles[k];
      var val = runIfFn$5(x, theme);
      var key = k in pseudoSelectors$5 ? pseudoSelectors$5[k] : k;
      var config = parser$5.config[key];

      if (key === "apply") {
        var apply = css(memoizedGet$5(theme, val))(theme);
        computedStyles = lodash_mergewith({}, computedStyles, apply);
        continue;
      }

      if (isObject$5(val)) {
        computedStyles[key] = css(val)(theme);
        continue;
      }

      var scale = memoizedGet$5(theme, config == null ? void 0 : config.scale, {});
      var value = (_config$transform = config == null ? void 0 : config.transform == null ? void 0 : config.transform(val, scale)) != null ? _config$transform : memoizedGet$5(scale, val, val);

      if (config == null ? void 0 : config.properties) {
        for (var property of config.properties) {
          computedStyles[property] = value;
        }

        continue;
      }

      if (config == null ? void 0 : config.property) {
        computedStyles[config.property] = value;
        continue;
      }

      computedStyles[key] = value;
    }

    return computedStyles;
  };
};

var systemProps$5 = compose(background$5, border$5, color$5, flexbox$5, layout$5, outline$5, grid$5, others$5, position$5, shadow$5, space$5, typography$6, transform$b, list$5, transition$6);
var layoutSystem$5 = compose(space$5, layout$5, flexbox$5, grid$5, position$5);
var propNames$4 = [...systemProps$5.propNames, ...pseudoPropNames$4];

function useTheme$2() {
  var theme = react.useContext(ThemeContext);

  if (!theme) {
    throw Error("useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />`");
  }

  return theme;
}
var [StylesProvider$3, useStyles$3] = createContext$4({
  name: "StylesContext",
  errorMessage: "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "
});

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
var domElements$4 = ["a", "b", "article", "aside", "blockquote", "button", "caption", "cite", "circle", "code", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "img", "input", "kbd", "label", "li", "mark", "nav", "ol", "p", "path", "pre", "q", "rect", "s", "svg", "section", "select", "strong", "small", "span", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "tr", "ul"];
function omitThemingProps$2(props) {
  return omit$3(props, ["styleConfig", "size", "variant", "colorScheme"]);
}

function _extends$l() { _extends$l = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$l.apply(this, arguments); }
function useChakra$2() {
  var colorModeResult = useColorMode$3();
  var theme = useTheme$2();
  return _extends$l({}, colorModeResult, {
    theme
  });
}

var tags$4 = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

var newStyled$4 = createStyled.bind();
tags$4.forEach(function (tagName) {
  newStyled$4[tagName] = newStyled$4(tagName);
});

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */

var allPropNames$4 = new Set([...propNames$4, "textStyle", "layerStyle", "apply", "isTruncated", "noOfLines", "focusBorderColor", "errorBorderColor", "as", "__css", "css", "sx"]);
/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */

var validHTMLProps$4 = new Set(["htmlWidth", "htmlHeight", "htmlSize"]);
var shouldForwardProp$4 = prop => validHTMLProps$4.has(prop) || !allPropNames$4.has(prop);

function _extends$m() { _extends$m = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$m.apply(this, arguments); }

function _objectWithoutPropertiesLoose$9(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Convert propNames array to object to faster lookup perf
 */

var stylePropNames$4 = propNames$4.reduce((keymirror, key) => {
  if (typeof key !== "object" && typeof key !== "function") keymirror[key] = key;
  return keymirror;
}, {});

/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */
var styleResolver$4 = (_ref) => {
  var {
    baseStyle
  } = _ref;
  return props => {
    var {
      theme,
      layerStyle,
      textStyle,
      apply,
      noOfLines,
      isTruncated,
      css: cssProp,
      __css,
      sx
    } = props,
        rest = _objectWithoutPropertiesLoose$9(props, ["theme", "layerStyle", "textStyle", "apply", "noOfLines", "isTruncated", "css", "__css", "sx"]);

    var _layerStyle = memoizedGet$5(theme, "layerStyles." + layerStyle, {});

    var _textStyle = memoizedGet$5(theme, "textStyles." + textStyle, {}); // filter out props that aren't style props


    var styleProps = objectFilter$4(rest, (_, prop) => prop in stylePropNames$4);
    var truncateStyle = {};

    if (noOfLines != null) {
      truncateStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: noOfLines
      };
    } else if (isTruncated) {
      truncateStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      };
    }
    /**
     * The computed, theme-aware style object. The other of the properties
     * within `objectAssign` determines how styles are overriden.
     */


    var finalStyles = objectAssign({}, __css, baseStyle, {
      apply
    }, _layerStyle, _textStyle, truncateStyle, styleProps, sx); // Converts theme-aware style object to real css object

    var computedCSS = css$6(finalStyles)(props.theme); // Merge the computed css object with styles in css prop

    var cssObject = objectAssign(computedCSS, isFunction$5(cssProp) ? cssProp(theme) : cssProp);
    return cssObject;
  };
};
function styled$4(component, options) {
  var _ref2 = options != null ? options : {},
      {
    baseStyle
  } = _ref2,
      styledOptions = _objectWithoutPropertiesLoose$9(_ref2, ["baseStyle"]);

  var opts = _extends$m({}, styledOptions, {
    shouldForwardProp: shouldForwardProp$4
  });

  var _styled = newStyled$4(component, opts);

  var interpolation = styleResolver$4({
    baseStyle
  });

  var StyledComponent = _styled(interpolation);

  return StyledComponent;
}
var chakra$4 = styled$4;
domElements$4.forEach(tag => {
  // @ts-expect-error
  chakra$4[tag] = chakra$4(tag);
});

/**
 * All credit goes to Chance (Reach UI), and Haz (Reakit) for creating
 * the base type definitions upon which we improved on
 */
function forwardRef$3(component) {
  return /*#__PURE__*/react.forwardRef(component);
}

function _objectWithoutPropertiesLoose$a(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function useStyleConfig$2(themeKey, props, opts) {
  var _styleConfig$defaultP;

  var {
    styleConfig: styleConfigProp
  } = props,
      rest = _objectWithoutPropertiesLoose$a(props, ["styleConfig"]);

  var {
    theme,
    colorMode
  } = useChakra$2();
  var themeStyleConfig = memoizedGet$5(theme, "components." + themeKey);
  var styleConfig = styleConfigProp || themeStyleConfig;
  var mergedProps = lodash_mergewith({
    theme,
    colorMode
  }, (_styleConfig$defaultP = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _styleConfig$defaultP : {}, filterUndefined$2(omit$3(rest, ["children"])));
  /**
   * Store the computed styles in a `ref` to avoid unneeded re-computation
   */

  var stylesRef = react.useRef({});
  return react.useMemo(() => {
    if (styleConfig) {
      var _styleConfig$baseStyl, _styleConfig$variants, _styleConfig$variants2, _styleConfig$sizes$me, _styleConfig$sizes;

      var baseStyles = runIfFn$5((_styleConfig$baseStyl = styleConfig.baseStyle) != null ? _styleConfig$baseStyl : {}, mergedProps);
      var variants = runIfFn$5((_styleConfig$variants = (_styleConfig$variants2 = styleConfig.variants) == null ? void 0 : _styleConfig$variants2[mergedProps.variant]) != null ? _styleConfig$variants : {}, mergedProps);
      var sizes = runIfFn$5((_styleConfig$sizes$me = (_styleConfig$sizes = styleConfig.sizes) == null ? void 0 : _styleConfig$sizes[mergedProps.size]) != null ? _styleConfig$sizes$me : {}, mergedProps);
      var styles = lodash_mergewith({}, baseStyles, sizes, variants);

      if ((opts == null ? void 0 : opts.isMultiPart) && styleConfig.parts) {
        styleConfig.parts.forEach(part => {
          var _styles$part;

          styles[part] = (_styles$part = styles[part]) != null ? _styles$part : {};
        });
      }

      var isStyleEqual = reactFastCompare(stylesRef.current, styles);

      if (!isStyleEqual) {
        stylesRef.current = styles;
      }
    }

    return stylesRef.current;
  }, [styleConfig, mergedProps, opts == null ? void 0 : opts.isMultiPart]);
}

/**
 * Box is the most abstract component on top of which other chakra
 * components are built. It renders a `div` element by default.
 *
 * @see Docs https://chakra-ui.com/docs/layout/box
 */
var Box = chakra$4("div");

function _extends$n() { _extends$n = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$n.apply(this, arguments); }

function _objectWithoutPropertiesLoose$b(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * React component used to create flexbox layouts.
 *
 * It renders a `div` with `display: flex` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/components/flex
 */
var Flex = /*#__PURE__*/forwardRef$3(function Flex(props, ref) {
  var {
    direction,
    align,
    justify,
    wrap,
    basis,
    grow,
    shrink
  } = props,
      rest = _objectWithoutPropertiesLoose$b(props, ["direction", "align", "justify", "wrap", "basis", "grow", "shrink"]);

  var styles = {
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink
  };
  return /*#__PURE__*/react.createElement(chakra$4.div, _extends$n({
    ref: ref,
    __css: styles
  }, rest));
});

function _extends$o() { _extends$o = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$o.apply(this, arguments); }

function _objectWithoutPropertiesLoose$c(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * React component used to create grid layouts.
 *
 * It renders a `div` with `display: grid` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/components/grid
 */
var Grid = /*#__PURE__*/forwardRef$3(function Grid(props, ref) {
  var {
    area,
    templateAreas,
    gap,
    rowGap,
    columnGap,
    column,
    row,
    autoFlow,
    autoRows,
    templateRows,
    autoColumns,
    templateColumns
  } = props,
      rest = _objectWithoutPropertiesLoose$c(props, ["area", "templateAreas", "gap", "rowGap", "columnGap", "column", "row", "autoFlow", "autoRows", "templateRows", "autoColumns", "templateColumns"]);

  var styles = {
    display: "grid",
    gridArea: area,
    gridTemplateAreas: templateAreas,
    gridGap: gap,
    gridRowGap: rowGap,
    gridColumnGap: columnGap,
    gridAutoColumns: autoColumns,
    gridColumn: column,
    gridRow: row,
    gridAutoFlow: autoFlow,
    gridAutoRows: autoRows,
    gridTemplateRows: templateRows,
    gridTemplateColumns: templateColumns
  };
  return /*#__PURE__*/react.createElement(chakra$4.div, _extends$o({
    ref: ref,
    __css: styles
  }, rest));
});

function _extends$p() { _extends$p = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$p.apply(this, arguments); }

function _objectWithoutPropertiesLoose$d(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Heading$1 = /*#__PURE__*/forwardRef$3(function Heading(props, ref) {
  var styles = useStyleConfig$2("Heading", props);

  var _omitThemingProps = omitThemingProps$2(props),
      rest = _objectWithoutPropertiesLoose$d(_omitThemingProps, ["className"]);

  return /*#__PURE__*/react.createElement(chakra$4.h2, _extends$p({
    ref: ref,
    className: cx$2("chakra-heading", props.className)
  }, rest, {
    __css: styles
  }));
});

function _extends$q() { _extends$q = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$q.apply(this, arguments); }

function _objectWithoutPropertiesLoose$e(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Links are accessible elements used primarily for navigation.
 *
 * It integrates well with other routing libraries like
 * React Router, Reach Router and Next.js Link.
 *
 * @example
 *
 * ```jsx
 * <Link as={ReactRouterLink} to="/home">Home</Link>
 * ```
 *
 * @see Docs https://chakra-ui.com/components/link
 */
var Link$1 = /*#__PURE__*/forwardRef$3(function Link(props, ref) {
  var styles = useStyleConfig$2("Link", props);

  var _omitThemingProps = omitThemingProps$2(props),
      {
    className,
    isExternal
  } = _omitThemingProps,
      rest = _objectWithoutPropertiesLoose$e(_omitThemingProps, ["className", "isExternal"]);

  return /*#__PURE__*/react.createElement(chakra$4.a, _extends$q({
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noopener noreferrer" : undefined,
    ref: ref,
    className: cx$2("chakra-link", className)
  }, rest, {
    __css: styles
  }));
});

function _extends$r() { _extends$r = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$r.apply(this, arguments); }

function _objectWithoutPropertiesLoose$f(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * SimpleGrid
 *
 * React component make that providers a simpler interface, and
 * make its easy to create responsive grid layouts.
 *
 * @see Docs https://chakra-ui.com/components/simplegrid
 */
var SimpleGrid = /*#__PURE__*/forwardRef$3(function SimpleGrid(props, ref) {
  var {
    columns,
    spacingX,
    spacingY,
    spacing,
    minChildWidth
  } = props,
      rest = _objectWithoutPropertiesLoose$f(props, ["columns", "spacingX", "spacingY", "spacing", "minChildWidth"]);

  var templateColumns = minChildWidth ? widthToColumns(minChildWidth) : countToColumns(columns);
  return /*#__PURE__*/react.createElement(Grid, _extends$r({
    ref: ref,
    gap: spacing,
    columnGap: spacingX,
    rowGap: spacingY,
    templateColumns: templateColumns
  }, rest));
});

function toPx(n) {
  return isNumber$5(n) ? n + "px" : n;
}

function widthToColumns(width) {
  return mapResponsive(width, value => isNull(value) ? null : "repeat(auto-fit, minmax(" + toPx(value) + ", 1fr))");
}

function countToColumns(count) {
  return mapResponsive(count, value => isNull(value) ? null : "repeat(" + value + ", 1fr)");
}

function _objectWithoutPropertiesLoose$g(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends$s() { _extends$s = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$s.apply(this, arguments); }
var StackItem = props => /*#__PURE__*/react.createElement(chakra$4.div, _extends$s({
  className: "chakra-stack__item"
}, props, {
  __css: _extends$s({
    display: "inline-block",
    flex: "0 0 auto",
    minWidth: 0
  }, props["__css"])
}));

/**
 * Stacks help you easily create flexible and automatically distributed layouts
 *
 * You can stack elements in the horizontal or vertical direction,
 * and apply a space or/and divider between each element.
 *
 * It uses `display: flex` internally and renders a `div`.
 *
 * @see Docs https://chakra-ui.com/components/stack
 *
 */
var Stack = /*#__PURE__*/forwardRef$3(function Stack(props, ref) {
  var {
    isInline,
    direction,
    align,
    justify,
    spacing = "0.5rem",
    wrap,
    children,
    divider,
    className,
    shouldWrapChildren
  } = props,
      rest = _objectWithoutPropertiesLoose$g(props, ["isInline", "direction", "align", "justify", "spacing", "wrap", "children", "divider", "className", "shouldWrapChildren"]);

  var _direction = isInline ? "row" : direction != null ? direction : "column";
  /**
   * If we ever run into SSR issues with this, check this post to find a fix for it:
   * @see https://medium.com/@emmenko/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
   */


  var selector = "& > *:not(style) ~ *:not(style)";
  var directionStyles = {
    column: {
      mt: spacing,
      ml: 0
    },
    row: {
      ml: spacing,
      mt: 0
    },
    "column-reverse": {
      mb: spacing,
      mr: 0
    },
    "row-reverse": {
      mr: spacing,
      mb: 0
    }
  };
  var styles = {
    flexDirection: _direction,
    [selector]: mapResponsive(_direction, value => directionStyles[value])
  };
  var dividerStyles = mapResponsive(_direction, value => {
    if (value.includes("row")) {
      return {
        mx: spacing,
        my: 0,
        borderLeftWidth: "1px",
        borderBottomWidth: 0
      };
    }

    return {
      mx: 0,
      my: spacing,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    };
  });
  var hasDivider = !!divider;
  var shouldUseChildren = !shouldWrapChildren && !hasDivider;
  var validChildren = getValidChildren(children);
  var clones = shouldUseChildren ? validChildren : validChildren.map((child, index) => {
    var isLast = index + 1 === validChildren.length;

    var _child = shouldWrapChildren ? /*#__PURE__*/react.createElement(StackItem, {
      key: index
    }, child) : child;

    if (!hasDivider) return _child;
    var cloneDivider = isLast ? null : /*#__PURE__*/react.cloneElement(divider, {
      sx: _extends$s({
        "&": dividerStyles
      }, divider == null ? void 0 : divider.props.sx)
    });
    return /*#__PURE__*/react.createElement(react.Fragment, {
      key: index
    }, _child, cloneDivider);
  });

  var _className = cx$2("chakra-stack", className);

  return /*#__PURE__*/react.createElement(chakra$4.div, _extends$s({
    ref: ref,
    display: "flex",
    alignItems: align,
    justifyContent: justify,
    flexDirection: styles.flexDirection,
    flexWrap: wrap,
    className: _className,
    __css: hasDivider ? {} : {
      [selector]: styles[selector]
    }
  }, rest), clones);
});

function _extends$t() { _extends$t = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$t.apply(this, arguments); }

function _objectWithoutPropertiesLoose$h(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://chakra-ui.com/components/text
 */
var Text = /*#__PURE__*/forwardRef$3(function Text(props, ref) {
  var styles = useStyleConfig$2("Text", props);

  var _omitThemingProps = omitThemingProps$2(props),
      {
    align,
    decoration,
    casing
  } = _omitThemingProps,
      rest = _objectWithoutPropertiesLoose$h(_omitThemingProps, ["className", "align", "decoration", "casing"]);

  return /*#__PURE__*/react.createElement(chakra$4.p, _extends$t({
    ref: ref,
    className: cx$2("chakra-text", props.className),
    textAlign: align,
    textDecoration: decoration,
    textTransform: casing
  }, rest, {
    __css: styles
  }));
});

export { Box, Button$1 as Button, CSSReset, ChakraProvider, Flex, Grid, Heading$1 as Heading, Image$1 as Image, Link$1 as Link, SimpleGrid, Stack, Text };
