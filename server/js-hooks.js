!(function () {
  'use strict';
  var e = function (e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  };
  var t = function (e) {
    if (Array.isArray(e)) return e;
  };
  var r = function (e, t) {
    if ('undefined' != typeof Symbol && Symbol.iterator in Object(e)) {
      var r = [],
        n = !0,
        o = !1,
        a = void 0;
      try {
        for (
          var i, s = e[Symbol.iterator]();
          !(n = (i = s.next()).done) && (r.push(i.value), !t || r.length !== t);
          n = !0
        );
      } catch (e) {
        (o = !0), (a = e);
      } finally {
        try {
          n || null == s.return || s.return();
        } finally {
          if (o) throw a;
        }
      }
      return r;
    }
  };
  var n = function (e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  };
  var o = function (e, t) {
    if (e) {
      if ('string' == typeof e) return n(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      return (
        'Object' === r && e.constructor && (r = e.constructor.name),
        'Map' === r || 'Set' === r
          ? Array.from(r)
          : 'Arguments' === r ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          ? n(e, t)
          : void 0
      );
    }
  };
  var a = function () {
    throw new TypeError(
      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  };
  var i = function (e, n) {
    return t(e) || r(e, n) || o(e, n) || a();
  };
  var s = function (e) {
    if (Array.isArray(e)) return n(e);
  };
  var l = function (e) {
    if ('undefined' != typeof Symbol && Symbol.iterator in Object(e))
      return Array.from(e);
  };
  var c = function () {
    throw new TypeError(
      'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  };
  var u = function (e) {
    return s(e) || l(e) || o(e) || c();
  };
  var d = (function (e, t) {
    return (
      e(
        (t = {
          exports: {},
        }),
        t.exports
      ),
      t.exports
    );
  })(function (e) {
    function t(r) {
      return (
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? (e.exports = t =
              function (e) {
                return typeof e;
              })
          : (e.exports = t =
              function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              }),
        t(r)
      );
    }
    e.exports = t;
  });
  var f = function (e, t) {
    if (null == e) return {};
    var r,
      n,
      o = {},
      a = Object.keys(e);
    for (n = 0; n < a.length; n++)
      (r = a[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
    return o;
  };
  var h = function (e, t) {
      if (null == e) return {};
      var r,
        n,
        o = f(e, t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        for (n = 0; n < a.length; n++)
          (r = a[n]),
            t.indexOf(r) >= 0 ||
              (Object.prototype.propertyIsEnumerable.call(e, r) &&
                (o[r] = e[r]));
      }
      return o;
    },
    p = (function (e) {
      var t = Object.prototype,
        r = t.hasOwnProperty,
        n = 'function' == typeof Symbol ? Symbol : {},
        o = n.iterator || '@@iterator',
        a = n.asyncIterator || '@@asyncIterator',
        i = n.toStringTag || '@@toStringTag';

      function s(e, t, r, n) {
        var o = t && t.prototype instanceof u ? t : u,
          a = Object.create(o.prototype),
          i = new x(n || []);
        return (
          (a._invoke = (function (e, t, r) {
            var n = 'suspendedStart';
            return function (o, a) {
              if ('executing' === n)
                throw new Error('Generator is already running');
              if ('completed' === n) {
                if ('throw' === o) throw a;
                return k();
              }
              for (r.method = o, r.arg = a; ; ) {
                var i = r.delegate;
                if (i) {
                  var s = E(i, r);
                  if (s) {
                    if (s === c) continue;
                    return s;
                  }
                }
                if ('next' === r.method) r.sent = r._sent = r.arg;
                else if ('throw' === r.method) {
                  if ('suspendedStart' === n) throw ((n = 'completed'), r.arg);
                  r.dispatchException(r.arg);
                } else 'return' === r.method && r.abrupt('return', r.arg);
                n = 'executing';
                var u = l(e, t, r);
                if ('normal' === u.type) {
                  if (
                    ((n = r.done ? 'completed' : 'suspendedYield'), u.arg === c)
                  )
                    continue;
                  return {
                    value: u.arg,
                    done: r.done,
                  };
                }
                'throw' === u.type &&
                  ((n = 'completed'), (r.method = 'throw'), (r.arg = u.arg));
              }
            };
          })(e, r, i)),
          a
        );
      }

      function l(e, t, r) {
        try {
          return {
            type: 'normal',
            arg: e.call(t, r),
          };
        } catch (e) {
          return {
            type: 'throw',
            arg: e,
          };
        }
      }
      e.wrap = s;
      var c = {};

      function u() {}

      function f() {}

      function h() {}
      var p = {};
      p[o] = function () {
        return this;
      };
      var v = Object.getPrototypeOf,
        y = v && v(v(O([])));
      y && y !== t && r.call(y, o) && (p = y);
      var m = (h.prototype = u.prototype = Object.create(p));

      function b(e) {
        ['next', 'throw', 'return'].forEach(function (t) {
          e[t] = function (e) {
            return this._invoke(t, e);
          };
        });
      }

      function g(e, t) {
        var n;
        this._invoke = function (o, a) {
          function i() {
            return new t(function (n, i) {
              !(function n(o, a, i, s) {
                var c = l(e[o], e, a);
                if ('throw' !== c.type) {
                  var u = c.arg,
                    f = u.value;
                  return f && 'object' === d(f) && r.call(f, '__await')
                    ? t.resolve(f.__await).then(
                        function (e) {
                          n('next', e, i, s);
                        },
                        function (e) {
                          n('throw', e, i, s);
                        }
                      )
                    : t.resolve(f).then(
                        function (e) {
                          (u.value = e), i(u);
                        },
                        function (e) {
                          return n('throw', e, i, s);
                        }
                      );
                }
                s(c.arg);
              })(o, a, n, i);
            });
          }
          return (n = n ? n.then(i, i) : i());
        };
      }

      function E(e, t) {
        var r = e.iterator[t.method];
        if (void 0 === r) {
          if (((t.delegate = null), 'throw' === t.method)) {
            if (
              e.iterator.return &&
              ((t.method = 'return'),
              (t.arg = void 0),
              E(e, t),
              'throw' === t.method)
            )
              return c;
            (t.method = 'throw'),
              (t.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return c;
        }
        var n = l(r, e.iterator, t.arg);
        if ('throw' === n.type)
          return (t.method = 'throw'), (t.arg = n.arg), (t.delegate = null), c;
        var o = n.arg;
        return o
          ? o.done
            ? ((t[e.resultName] = o.value),
              (t.next = e.nextLoc),
              'return' !== t.method && ((t.method = 'next'), (t.arg = void 0)),
              (t.delegate = null),
              c)
            : o
          : ((t.method = 'throw'),
            (t.arg = new TypeError('iterator result is not an object')),
            (t.delegate = null),
            c);
      }

      function w(e) {
        var t = {
          tryLoc: e[0],
        };
        1 in e && (t.catchLoc = e[1]),
          2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
          this.tryEntries.push(t);
      }

      function L(e) {
        var t = e.completion || {};
        (t.type = 'normal'), delete t.arg, (e.completion = t);
      }

      function x(e) {
        (this.tryEntries = [
          {
            tryLoc: 'root',
          },
        ]),
          e.forEach(w, this),
          this.reset(!0);
      }

      function O(e) {
        if (e) {
          var t = e[o];
          if (t) return t.call(e);
          if ('function' == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var n = -1,
              a = function t() {
                for (; ++n < e.length; )
                  if (r.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                return (t.value = void 0), (t.done = !0), t;
              };
            return (a.next = a);
          }
        }
        return {
          next: k,
        };
      }

      function k() {
        return {
          value: void 0,
          done: !0,
        };
      }
      return (
        (f.prototype = m.constructor = h),
        (h.constructor = f),
        (h[i] = f.displayName = 'GeneratorFunction'),
        (e.isGeneratorFunction = function (e) {
          var t = 'function' == typeof e && e.constructor;
          return (
            !!t &&
            (t === f || 'GeneratorFunction' === (t.displayName || t.name))
          );
        }),
        (e.mark = function (e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, h)
              : ((e.__proto__ = h), i in e || (e[i] = 'GeneratorFunction')),
            (e.prototype = Object.create(m)),
            e
          );
        }),
        (e.awrap = function (e) {
          return {
            __await: e,
          };
        }),
        b(g.prototype),
        (g.prototype[a] = function () {
          return this;
        }),
        (e.AsyncIterator = g),
        (e.async = function (t, r, n, o, a) {
          void 0 === a && (a = Promise);
          var i = new g(s(t, r, n, o), a);
          return e.isGeneratorFunction(r)
            ? i
            : i.next().then(function (e) {
                return e.done ? e.value : i.next();
              });
        }),
        b(m),
        (m[i] = 'Generator'),
        (m[o] = function () {
          return this;
        }),
        (m.toString = function () {
          return '[object Generator]';
        }),
        (e.keys = function (e) {
          var t = [];
          for (var r in e) t.push(r);
          return (
            t.reverse(),
            function r() {
              for (; t.length; ) {
                var n = t.pop();
                if (n in e) return (r.value = n), (r.done = !1), r;
              }
              return (r.done = !0), r;
            }
          );
        }),
        (e.values = O),
        (x.prototype = {
          constructor: x,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = void 0),
              (this.done = !1),
              (this.delegate = null),
              (this.method = 'next'),
              (this.arg = void 0),
              this.tryEntries.forEach(L),
              !e)
            )
              for (var t in this)
                't' === t.charAt(0) &&
                  r.call(this, t) &&
                  !isNaN(+t.slice(1)) &&
                  (this[t] = void 0);
          },
          stop: function () {
            this.done = !0;
            var e = this.tryEntries[0].completion;
            if ('throw' === e.type) throw e.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var t = this;

            function n(r, n) {
              return (
                (i.type = 'throw'),
                (i.arg = e),
                (t.next = r),
                n && ((t.method = 'next'), (t.arg = void 0)),
                !!n
              );
            }
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
              var a = this.tryEntries[o],
                i = a.completion;
              if ('root' === a.tryLoc) return n('end');
              if (a.tryLoc <= this.prev) {
                var s = r.call(a, 'catchLoc'),
                  l = r.call(a, 'finallyLoc');
                if (s && l) {
                  if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                } else if (s) {
                  if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                } else {
                  if (!l)
                    throw new Error('try statement without catch or finally');
                  if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var o = this.tryEntries[n];
              if (
                o.tryLoc <= this.prev &&
                r.call(o, 'finallyLoc') &&
                this.prev < o.finallyLoc
              ) {
                var a = o;
                break;
              }
            }
            a &&
              ('break' === e || 'continue' === e) &&
              a.tryLoc <= t &&
              t <= a.finallyLoc &&
              (a = null);
            var i = a ? a.completion : {};
            return (
              (i.type = e),
              (i.arg = t),
              a
                ? ((this.method = 'next'), (this.next = a.finallyLoc), c)
                : this.complete(i)
            );
          },
          complete: function (e, t) {
            if ('throw' === e.type) throw e.arg;
            return (
              'break' === e.type || 'continue' === e.type
                ? (this.next = e.arg)
                : 'return' === e.type
                ? ((this.rval = this.arg = e.arg),
                  (this.method = 'return'),
                  (this.next = 'end'))
                : 'normal' === e.type && t && (this.next = t),
              c
            );
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];
              if (r.finallyLoc === e)
                return this.complete(r.completion, r.afterLoc), L(r), c;
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];
              if (r.tryLoc === e) {
                var n = r.completion;
                if ('throw' === n.type) {
                  var o = n.arg;
                  L(r);
                }
                return o;
              }
            }
            throw new Error('illegal catch attempt');
          },
          delegateYield: function (e, t, r) {
            return (
              (this.delegate = {
                iterator: O(e),
                resultName: t,
                nextLoc: r,
              }),
              'next' === this.method && (this.arg = void 0),
              c
            );
          },
        }),
        e
      );
    })(
      'object' === ('undefined' == typeof module ? 'undefined' : d(module))
        ? module.exports
        : {}
    );
  try {
    regeneratorRuntime = p;
  } catch (e) {
    Function('r', 'regeneratorRuntime = r')(p);
  }
  var v = Object.freeze({
    __proto__: null,
  });

  function y(e, t, r, n, o, a, i) {
    try {
      var s = e[a](i),
        l = s.value;
    } catch (e) {
      return void r(e);
    }
    s.done ? t(l) : Promise.resolve(l).then(n, o);
  }
  var m = function (e) {
    return function () {
      var t = this,
        r = arguments;
      return new Promise(function (n, o) {
        var a = e.apply(t, r);

        function i(e) {
          y(a, n, o, i, s, 'next', e);
        }

        function s(e) {
          y(a, n, o, i, s, 'throw', e);
        }
        i(void 0);
      });
    };
  };
  var b = function (e, t) {
    if (!(e instanceof t))
      throw new TypeError('Cannot call a class as a function');
  };

  function g(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  var E = function (e, t, r) {
    return t && g(e.prototype, t), r && g(e, r), e;
  };

  function w(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t &&
        (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        r.push.apply(r, n);
    }
    return r;
  }

  function L(t) {
    for (var r = 1; r < arguments.length; r++) {
      var n = null != arguments[r] ? arguments[r] : {};
      r % 2
        ? w(Object(n), !0).forEach(function (r) {
            e(t, r, n[r]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : w(Object(n)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
          });
    }
    return t;
  }
  !(function () {
    var e = new ((function () {
        function e(t) {
          b(this, e),
            (this.uniqueId = 1),
            (this.callbackCache = {}),
            (this.eventCallbackCache = {}),
            (this.win = t);
        }
        return (
          E(e, [
            {
              key: 'callNative',
              value: function (e, t, r, n) {
                var o = {
                  module: e || 'default',
                  method: t,
                  data: r,
                  callbackId: null,
                };
                if (n) {
                  var a =
                    'cb_' +
                    o.module +
                    '_' +
                    t +
                    '_' +
                    this.uniqueId++ +
                    '_' +
                    new Date().getTime();
                  (this.callbackCache[a] = n), (o.callbackId = a);
                }
                this.win.webkit.messageHandlers.XMJSBridgeMessage.postMessage(
                  o
                );
              },
            },
            {
              key: 'handleMessageFromNative',
              value: function (e) {
                var t = JSON.parse(e);
                if ('callback' === t.messageType) {
                  var r = this.callbackCache[t.callbackId];
                  return (
                    r &&
                      (r(t.data),
                      (this.callbackCache[t.callbackId] = null),
                      delete this.callbackCache[t.callbackId]),
                    !0
                  );
                }
                if ('event' === t.messageType) {
                  var n = this.eventCallbackCache[t.eventName];
                  return n && n(t.data), !0;
                }
                return !1;
              },
            },
            {
              key: 'call',
              value: function (e, t) {
                var r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : {},
                  n = arguments.length > 3 ? arguments[3] : void 0;
                this.callNative(e, t, r, n);
              },
            },
            {
              key: 'on',
              value: function (e, t) {
                this.eventCallbackCache[e] = t;
              },
            },
          ]),
          e
        );
      })())(window),
      t = function e(t) {
        b(this, e),
          (this.hookCookie = function () {
            try {
              var t =
                Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
                Object.getOwnPropertyDescriptor(
                  HTMLDocument.prototype,
                  'cookie'
                );
              t &&
                t.configurable &&
                Object.defineProperty(document, 'cookie', {
                  configurable: !0,
                  enumerable: !0,
                  get: function () {
                    return t.get.call(document);
                  },
                  set: function (r) {
                    t.set.call(document, r),
                      this.XMJSBridge.call(e.moduleName, 'setCookie', {
                        cookie: r,
                      });
                  },
                });
            } catch (e) {}
          }),
          (this.XMJSBridge = t);
      };
    t.moduleName = 'cookie';
    var r = (function () {
        function e() {
          b(this, e);
        }
        return (
          E(e, null, [
            {
              key: 'convertFormDataToJson',
              value: function (t, r) {
                var n;
                new Promise(
                  ((n = m(
                    v.mark(function r(n, o) {
                      var a,
                        i,
                        s,
                        l,
                        c,
                        u,
                        d,
                        f,
                        h,
                        p,
                        y,
                        m,
                        b,
                        g,
                        E,
                        w,
                        L,
                        x,
                        O;
                      return v.wrap(function (r) {
                        for (;;)
                          switch ((r.prev = r.next)) {
                            case 0:
                              if (((a = {}), (i = []), (s = []), !t._entries)) {
                                r.next = 28;
                                break;
                              }
                              l = 0;
                            case 5:
                              if (!(l < t._entries.length)) {
                                r.next = 26;
                                break;
                              }
                              if (
                                ((c = t._entries[l]),
                                (u = c[0]),
                                (d = c[1]),
                                (f = c.length > 2 ? c[2] : null),
                                (h = []).push(u),
                                !(d instanceof File || d instanceof Blob))
                              ) {
                                r.next = 21;
                                break;
                              }
                              return (r.next = 15), e.convertFileToJson(d);
                            case 15:
                              (p = r.sent),
                                f && (p.name = f),
                                h.push(p),
                                i.push(u),
                                (r.next = 22);
                              break;
                            case 21:
                              h.push(d);
                            case 22:
                              s.push(h);
                            case 23:
                              l++, (r.next = 5);
                              break;
                            case 26:
                              r.next = 56;
                              break;
                            case 28:
                              (y = t.entries()),
                                (m = Array.isArray(y)),
                                (b = 0),
                                (y = m ? y : y[Symbol.iterator]());
                            case 29:
                              if (!m) {
                                r.next = 35;
                                break;
                              }
                              if (!(b >= y.length)) {
                                r.next = 32;
                                break;
                              }
                              return r.abrupt('break', 56);
                            case 32:
                              (g = y[b++]), (r.next = 39);
                              break;
                            case 35:
                              if (!(b = y.next()).done) {
                                r.next = 38;
                                break;
                              }
                              return r.abrupt('break', 56);
                            case 38:
                              g = b.value;
                            case 39:
                              if (
                                ((w = (E = g)[0]),
                                (L = E[1]),
                                (x = []).push(w),
                                !(L instanceof File || L instanceof Blob))
                              ) {
                                r.next = 52;
                                break;
                              }
                              return (r.next = 47), e.convertFileToJson(L);
                            case 47:
                              (O = r.sent), x.push(O), i.push(w), (r.next = 53);
                              break;
                            case 52:
                              x.push(L);
                            case 53:
                              s.push(x);
                            case 54:
                              r.next = 29;
                              break;
                            case 56:
                              (a.fileKeys = i), (a.formData = s), n(a);
                            case 59:
                            case 'end':
                              return r.stop();
                          }
                      }, r);
                    })
                  )),
                  function (e, t) {
                    return n.apply(this, arguments);
                  })
                )
                  .then(function (e) {
                    r(e);
                  })
                  .catch(function (e) {});
              },
            },
            {
              key: 'convertFileToJson',
              value: function (e) {
                return new Promise(function (t, r) {
                  var n = new FileReader();
                  n.readAsDataURL(e),
                    (n.onload = function (r) {
                      var n = r.target.result,
                        o = {
                          name: e instanceof File ? e.name : '',
                          lastModified: e instanceof File ? e.lastModified : 0,
                          size: e.size,
                          type: e.type,
                          data: n,
                        };
                      t(o);
                    }),
                    (n.onerror = function () {
                      r(
                        Error(
                          '[formdata] the form failed to read the file data'
                        )
                      );
                    });
                });
              },
            },
            {
              key: 'ArrayBufferToBase64',
              value: function (e) {
                for (
                  var t = '', r = new Uint8Array(e), n = r.byteLength, o = 0;
                  o < n;
                  o++
                )
                  t += String.fromCharCode(r[o]);
                return window.btoa(t);
              },
            },
          ]),
          e
        );
      })(),
      n = function (e, t) {
        e && e(t);
      },
      o = function e(t) {
        b(this, e),
          (this.type = ''),
          (this.target = null),
          (this.currentTarget = null),
          (this.srcElement = null),
          (this.type = t);
      },
      a = function e() {
        b(this, e);
      };
    (a.moduleName = 'ajax'),
      (a.globalId = Math.floor(1e3 * Math.random())),
      (a.cache = []),
      (a.cacheXHRIfNeed = function (e) {
        e.hasOwnProperty('id') ||
          (Object.defineProperties(e, {
            id: {
              value: 0,
              writable: !0,
              enumerable: !0,
            },
            callbackProperties: {
              value: {},
              writable: !0,
              enumerable: !0,
            },
            isCached: {
              value: !1,
              writable: !0,
              enumerable: !0,
            },
          }),
          Object.defineProperties(e.callbackProperties, {
            readyState: {
              value: 0,
              writable: !0,
              enumerable: !0,
            },
            status: {
              value: 0,
              writable: !0,
              enumerable: !0,
            },
            statusText: {
              value: '',
              writable: !0,
              enumerable: !0,
            },
            responseText: {
              value: '',
              writable: !0,
              enumerable: !0,
            },
            headers: {
              value: {},
              writable: !0,
              enumerable: !0,
            },
            responseType: {
              value: '',
              writable: !0,
              enumerable: !0,
            },
          })),
          e.isCached ||
            ((e.id = a.globalId++), (a.cache[e.id] = e), (e.isCached = !0));
      }),
      (a.setProperties = function (e) {
        try {
          var t = JSON.parse(e);
          if (!t.id) return;
          var r = a.cache[t.id];
          if (r) {
            var i = t.normalProgressEvent,
              s = t.uploadProgressEvent,
              l = h(t, ['normalProgressEvent', 'uploadProgressEvent']),
              c = r.callbackProperties.readyState;
            if (((r.callbackProperties = l), l.readyState !== c)) {
              var u = Object.keys(r),
                d = u.indexOf('onreadystatechange'),
                f = u.indexOf('normalEventListenerreadystatechange'),
                p = new o('readystatechange');
              (p.target = r),
                (p.currentTarget = r),
                (p.srcElement = r),
                f < d &&
                  (n(r.normalEventListenerreadystatechange, p),
                  n(r.onreadystatechange, p)),
                d < f &&
                  (n(r.onreadystatechange, p),
                  n(r.normalEventListenerreadystatechange, p));
            }
            i &&
              (function (e, t) {
                var r = Object.keys(e);
                switch (
                  ((t.target = e),
                  (t.currentTarget = e),
                  (t.srcElement = e),
                  t.type)
                ) {
                  case 'loadstart':
                    var o = r.indexOf('onloadstart'),
                      a = r.indexOf('normalEventListenerloadstart');
                    a < o &&
                      (n(e.normalEventListenerloadstart, t),
                      n(e.onloadstart, t)),
                      o < a &&
                        (n(e.onloadstart, t),
                        n(e.normalEventListenerloadstart, t));
                    break;
                  case 'progress':
                    if (e.callbackProperties.readyState === e.LOADING) {
                      var i = r.indexOf('onprogress'),
                        s = r.indexOf('normalEventListenerprogress');
                      s < i &&
                        (n(e.normalEventListenerprogress, t),
                        n(e.onprogress, t)),
                        i < s &&
                          (n(e.onprogress, t),
                          n(e.normalEventListenerprogress, t));
                    }
                    break;
                  case 'load':
                    if (e.callbackProperties.readyState === e.DONE) {
                      var l = r.indexOf('onload'),
                        c = r.indexOf('normalEventListenerload');
                      c < l &&
                        (n(e.normalEventListenerload, t), n(e.onload, t)),
                        l < c &&
                          (n(e.onload, t), n(e.normalEventListenerload, t));
                    }
                    break;
                  case 'loadend':
                    if (e.callbackProperties.readyState === e.DONE) {
                      var u = r.indexOf('onloadend'),
                        d = r.indexOf('normalEventListenerloadend');
                      d < u &&
                        (n(e.normalEventListenerloadend, t), n(e.onloadend, t)),
                        u < d &&
                          (n(e.onloadend, t),
                          n(e.normalEventListenerloadend, t));
                    }
                    break;
                  case 'abort':
                    if (e.callbackProperties.readyState === e.DONE) {
                      var f = r.indexOf('onabort'),
                        h = r.indexOf('normalEventListenerabort');
                      h < f &&
                        (n(e.normalEventListenerabort, t), n(e.onabort, t)),
                        f < h &&
                          (n(e.onabort, t), n(e.normalEventListenerabort, t));
                    }
                    break;
                  case 'error':
                    if (e.callbackProperties.readyState === e.DONE) {
                      var p = r.indexOf('onerror'),
                        v = r.indexOf('normalEventListenererror');
                      v < p &&
                        (n(e.normalEventListenererror, t), n(e.onerror, t)),
                        p < v &&
                          (n(e.onerror, t), n(e.normalEventListenererror, t));
                    }
                    break;
                  case 'timeout':
                    if (e.callbackProperties.readyState === e.DONE) {
                      var y = r.indexOf('ontimeout'),
                        m = r.indexOf('normalEventListenertimeout');
                      m < y &&
                        (n(e.normalEventListenertimeout, t), n(e.ontimeout, t)),
                        y < m &&
                          (n(e.ontimeout, t),
                          n(e.normalEventListenertimeout, t));
                    }
                }
              })(r, i),
              s &&
                (function (e, t) {
                  var r = Object.keys(e.upload),
                    o = e.upload;
                  switch (
                    ((t.target = e),
                    (t.currentTarget = e),
                    (t.srcElement = e),
                    t.type)
                  ) {
                    case 'loadstart':
                      if (e.callbackProperties.readyState === e.OPENED) {
                        var a = r.indexOf('onloadstart'),
                          i = r.indexOf('uploadEventListenerloadstart');
                        i < a &&
                          (n(o.uploadEventListenerloadstart, t),
                          n(o.onloadstart, t)),
                          a < i &&
                            (n(o.onloadstart, t),
                            n(o.uploadEventListenerloadstart, t));
                      }
                      break;
                    case 'progress':
                      if (e.callbackProperties.readyState === e.OPENED) {
                        var s = r.indexOf('onprogress'),
                          l = r.indexOf('uploadEventListenerprogress');
                        l < s &&
                          (n(o.uploadEventListenerprogress, t),
                          n(o.onprogress, t)),
                          s < l &&
                            (n(o.onprogress, t),
                            n(o.uploadEventListenerprogress, t));
                      }
                      break;
                    case 'load':
                      if (e.callbackProperties.readyState === e.OPENED) {
                        var c = r.indexOf('onload'),
                          u = r.indexOf('uploadEventListenerload');
                        u < c &&
                          (n(o.uploadEventListenerload, t), n(o.onload, t)),
                          c < u &&
                            (n(o.onload, t), n(o.uploadEventListenerload, t));
                      }
                      break;
                    case 'loadend':
                      var d = r.indexOf('onloadend'),
                        f = r.indexOf('uploadEventListenerloadend');
                      f < d &&
                        (n(o.uploadEventListenerloadend, t), n(o.onloadend, t)),
                        d < f &&
                          (n(o.onloadend, t),
                          n(o.uploadEventListenerloadend, t));
                      break;
                    case 'abort':
                      if (e.callbackProperties.readyState === e.DONE) {
                        var h = r.indexOf('onabort'),
                          p = r.indexOf('uploadEventListenerabort');
                        p < h &&
                          (n(o.uploadEventListenerabort, t), n(o.onabort, t)),
                          h < p &&
                            (n(o.onabort, t), n(o.uploadEventListenerabort, t));
                      }
                      break;
                    case 'error':
                      if (e.callbackProperties.readyState === e.DONE) {
                        var v = r.indexOf('onerror'),
                          y = r.indexOf('normalEventListenererror');
                        y < v &&
                          (n(o.normalEventListenererror, t), n(o.onerror, t)),
                          v < y &&
                            (n(o.onerror, t), n(o.normalEventListenererror, t));
                      }
                      break;
                    case 'timeout':
                      if (e.callbackProperties.readyState === e.DONE) {
                        var m = r.indexOf('ontimeout'),
                          b = r.indexOf('normalEventListenertimeout');
                        b < m &&
                          (n(o.normalEventListenertimeout, t),
                          n(o.ontimeout, t)),
                          m < b &&
                            (n(o.ontimeout, t),
                            n(o.normalEventListenertimeout, t));
                      }
                  }
                })(r, s);
          }
        } catch (e) {
          console.error(e);
        }
      }),
      (a.deleteObject = function (e) {
        a.cache[e] && delete a.cache[e];
      });
    var s = null,
      l = function (e) {
        function t(t) {
          return function () {
            var r = this.hasOwnProperty(t + '_') ? this[t + '_'] : this.xhr[t],
              n = (e[t] || {}).getter;
            return (n && n(r, this)) || r;
          };
        }

        function r(t) {
          return function (r) {
            var n = this.xhr,
              o = this,
              a = e[t];
            if ('function' == typeof a)
              n[t] = function () {
                e[t](o) || r.apply(n, arguments);
              };
            else {
              var i = (a || {}).setter;
              r = (i && i(r, o)) || r;
              try {
                n[t] = r;
              } catch (e) {
                this[t + '_'] = r;
              }
            }
          };
        }

        function n(t) {
          return function () {
            var r = [].slice.call(arguments);
            return e[t]
              ? e[t].call(this, r, this.xhr)
              : this.xhr[t].apply(this.xhr, r);
          };
        }

        function o(t) {
          return function () {
            var r = [].slice.call(arguments);
            return e.upload[t]
              ? e.upload[t].call(this, r, this.xhr)
              : this.xhr.upload[t].apply(this.xhr, r);
          };
        }
        (s = s || window.XMLHttpRequest),
          (window.XMLHttpRequest = function () {
            var e = new s();
            for (var a in e)
              if ('upload' === a)
                for (var i in ((this[a] = {}), e[a])) {
                  var l = '';
                  try {
                    l = d(e[a][i]);
                  } catch (e) {}
                  'function' === l && (this[a][i] = o(i));
                }
              else {
                var c = '';
                try {
                  c = d(e[a]);
                } catch (e) {}
                'function' === c
                  ? (this[a] = n(a))
                  : Object.defineProperty(this, a, {
                      get: t(a),
                      set: r(a),
                      enumerable: !0,
                    });
              }
            this.xhr = e;
          });
      },
      c = function () {
        s && (window.XMLHttpRequest = s), (s = void 0);
      };
    var f = Object.freeze({
        __proto__: null,
        addEventListener: function (e, t) {
          if ((a.cacheXHRIfNeed(this), t && t.ignore))
            t.addEventListener.apply(t, u(e));
          else {
            var r = i(e, 2),
              n = r[0],
              o = r[1];
            'function' == typeof o &&
              ('loadstart' === n && (this.uploadEventListenerloadstart = o),
              'progress' === n && (this.uploadEventListenerprogress = o),
              'load' === n && (this.uploadEventListenerload = o),
              'loadend' === n && (this.uploadEventListenerloadend = o),
              'abort' === n && (this.uploadEventListenerabort = o),
              'error' === n && (this.uploadEventListenererror = o),
              'timeout' === n && (this.uploadEventListenertimeout = o));
          }
        },
      }),
      p = {
        getter: function (e, t) {
          return t.callbackProperties ? t.callbackProperties.readyState : '';
        },
      },
      y = {
        getter: function (e, t) {
          return t.callbackProperties ? t.callbackProperties.responseText : '';
        },
      },
      g = {
        getter: function (e, t) {
          return t.callbackProperties ? t.callbackProperties.responseText : '';
        },
      },
      w = {
        getter: function (e, t) {
          return t.callbackProperties ? t.callbackProperties.responseType : '';
        },
      },
      x = {
        getter: function (e, t) {
          return t.callbackProperties ? t.callbackProperties.status : '';
        },
      },
      O = {
        getter: function (e, t) {
          return t.callbackProperties ? t.callbackProperties.statusText : '';
        },
      },
      k = {
        setter: function (t, r) {
          r.ignore ||
            (r._store_ || (r._store_ = {}),
            (r._store_.timeout = {
              type: 'var',
              data: t,
            }),
            e.call(a.moduleName, 'timeout', {
              id: r.id,
              timeout: t,
            }));
        },
      };

    function _(e) {
      this.normalEventListenerreadystatechange &&
        (e.addEventListener(
          'readystatechange',
          this.normalEventListenerreadystatechange
        ),
        (this.normalEventListenerreadystatechange = null)),
        this.uploadEventListenerloadstart &&
          (e.upload.addEventListener(
            'loadstart',
            this.uploadEventListenerloadstart
          ),
          (this.uploadEventListenerloadstart = null)),
        this.uploadEventListenerprogress &&
          (e.upload.addEventListener(
            'progress',
            this.uploadEventListenerprogress
          ),
          (this.uploadEventListenerprogress = null)),
        this.uploadEventListenerload &&
          (e.upload.addEventListener('load', this.uploadEventListenerload),
          (this.uploadEventListenerload = null)),
        this.uploadEventListenerloadend &&
          (e.upload.addEventListener(
            'loadend',
            this.uploadEventListenerloadend
          ),
          (this.uploadEventListenerloadend = null)),
        this.uploadEventListenerabort &&
          (e.upload.addEventListener('abort', this.uploadEventListenerabort),
          (this.uploadEventListenerabort = null)),
        this.uploadEventListenererror &&
          (e.upload.addEventListener('error', this.uploadEventListenererror),
          (this.uploadEventListenererror = null)),
        this.uploadEventListenertimeout &&
          (e.upload.addEventListener(
            'timeout',
            this.uploadEventListenertimeout
          ),
          (this.uploadEventListenertimeout = null)),
        this.normalEventListenerloadstart &&
          (e.addEventListener('loadstart', this.normalEventListenerloadstart),
          (this.normalEventListenerloadstart = null)),
        this.normalEventListenerprogress &&
          (e.addEventListener('progress', this.normalEventListenerprogress),
          (this.normalEventListenerprogress = null)),
        this.normalEventListenerload &&
          (e.addEventListener('load', this.normalEventListenerload),
          (this.normalEventListenerload = null)),
        this.normalEventListenerloadend &&
          (e.addEventListener('loadend', this.normalEventListenerloadend),
          (this.normalEventListenerloadend = null)),
        this.normalEventListenerabort &&
          (e.addEventListener('abort', this.normalEventListenerabort),
          (this.normalEventListenerabort = null)),
        this.normalEventListenertimeout &&
          (e.addEventListener('timeout', this.normalEventListenertimeout),
          (this.normalEventListenertimeout = null)),
        this.normalEventListenererror &&
          (e.addEventListener('error', this.normalEventListenererror),
          (this.normalEventListenererror = null));
    }

    function P(e) {
      var t = e.type,
        r = e.data,
        n = e.xhr;
      'open' === t && 'get' === r.method.toLocaleLowerCase() && (n.ignore = !0);
    }

    function j(t, r) {
      var n = t[1];
      if (
        (/^\/\//.test(n) && (n = window.location.protocol + n),
        !/^http(s)?:/.test(n) && !/^\//.test(n))
      ) {
        var o = window.location.pathname;
        if (/\/$/.test(o)) n = o + n;
        else {
          var i = o.split('/');
          i.pop(), (n = i.join('/') + '/' + n);
        }
      }
      var s = t[0],
        l = t[2];
      return (
        P({
          type: 'open',
          data: {
            method: s,
          },
          xhr: r,
        }),
        a.cacheXHRIfNeed(this),
        r.ignore
          ? (_.call(this, r), r.open.apply(r, u(t)))
          : (r._store_ || (r._store_ = {}),
            (r._store_.open = {
              type: 'fun',
              data: t,
            }),
            e.call(a.moduleName, 'open', {
              id: this.id,
              method: s,
              url: n,
              scheme: window.location.protocol,
              host: window.location.hostname,
              port: window.location.port,
              href: window.location.href,
              referer: '' != document.referrer ? document.referrer : null,
              useragent: navigator.userAgent,
              async: l,
            })),
        !0
      );
    }

    function S() {
      return (S = m(
        v.mark(function t(r, n) {
          var o, i, s, l, c;
          return v.wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  for (2e4, o = n.byteLength, i = [], s = 0; s < o; s++)
                    (l = Math.floor(s / 2e4)),
                      i[l] || (i[l] = []),
                      i[l].push(n[s]);
                  return (
                    (c = 0),
                    (t.next = 7),
                    new Promise(function (t) {
                      e.call(
                        a.moduleName,
                        'addmultipart',
                        {
                          id: r,
                          start: 'start',
                        },
                        function () {
                          t();
                        }
                      );
                    })
                  );
                case 7:
                  if (!(c < i.length)) {
                    t.next = 13;
                    break;
                  }
                  return (
                    (t.next = 10),
                    new Promise(function (t) {
                      e.call(
                        a.moduleName,
                        'addmultipart',
                        {
                          id: r,
                          data: i[c],
                        },
                        function () {
                          t();
                        }
                      );
                    })
                  );
                case 10:
                  c++, (t.next = 7);
                  break;
                case 13:
                  return (
                    (t.next = 15),
                    new Promise(function (t) {
                      e.call(
                        a.moduleName,
                        'addmultipart',
                        {
                          id: r,
                          end: 'end',
                        },
                        function () {
                          t();
                        }
                      );
                    })
                  );
                case 15:
                case 'end':
                  return t.stop();
              }
          }, t);
        })
      )).apply(this, arguments);
    }

    function T(t, n) {
      var o = this;
      return (
        new Promise(function (e) {
          var a = t[0];
          P({
            type: 'send',
            data: a,
            xhr: n,
          }),
            n.ignore
              ? e()
              : a
              ? a instanceof File || a instanceof Blob
                ? r.convertFileToJson(a).then(function (t) {
                    e({
                      isBlob: !0,
                      data: t,
                    });
                  })
                : a instanceof ArrayBuffer || a instanceof Uint8Array
                ? (function (e, t) {
                    return S.apply(this, arguments);
                  })(o.id, a).then(function () {
                    e({
                      isByteData: !0,
                    });
                  })
                : a instanceof FormData
                ? r.convertFormDataToJson(a, function (t) {
                    e({
                      isFormData: !0,
                      data: t,
                    });
                  })
                : e({
                    data: a,
                  })
              : e();
        }).then(function () {
          var r =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (n.ignore) {
            e.call(a.moduleName, 'clear', {
              id: o.id,
            });
            try {
              if (n._store_)
                for (var i in n._store_) {
                  var s = n._store_[i];
                  'fun' === s.type && n[i].apply(n, u(s.data)),
                    'var' === s.type && (n[i] = s.data);
                }
              _.call(o, n), n.send.apply(n, u(t));
            } catch (e) {
              console.error('wkwebview ignore error');
            }
          } else
            e.call(
              a.moduleName,
              'send',
              L(
                {
                  id: o.id,
                },
                r
              ),
              function () {}
            );
        }),
        !0
      );
    }

    function A(t, r) {
      a.cacheXHRIfNeed(this);
      var n = t[0];
      return (
        r.ignore ||
          (r._store_ || (r._store_ = {}),
          (r._store_.overrideMimeType = {
            type: 'fun',
            data: t,
          }),
          e.call(a.moduleName, 'overrideMimeType', {
            id: this.id,
            mimetype: n,
          })),
        !0
      );
    }

    function N(t, r) {
      return (
        r.ignore
          ? r.abort.apply(r, u(t))
          : e.call(a.moduleName, 'abort', {
              id: this.id,
            }),
        !0
      );
    }

    function B(t, r) {
      var n = t[0],
        o = t[1];
      return (
        r.ignore
          ? r.setRequestHeader(n, o)
          : (r._store_ || (r._store_ = {}),
            (r._store_.setRequestHeader = {
              type: 'fun',
              data: t,
            }),
            e.call(a.moduleName, 'setRequestHeader', {
              id: this.id,
              headerName: n,
              headerValue: o,
            })),
        !0
      );
    }

    function D(e, t) {
      var r = '';
      for (var n in this.callbackProperties.headers)
        r += n + ': ' + this.callbackProperties.headers[n] + '\r\n';
      return r;
    }

    function C(e, t) {
      var r = '',
        n = e[0].toUpperCase();
      for (var o in this.callbackProperties.headers)
        n == o.toUpperCase() && (r = this.callbackProperties.headers[o]);
      return r;
    }

    function F(e, t) {
      if ((a.cacheXHRIfNeed(this), t && t.ignore))
        t.addEventListener.apply(t, u(e));
      else {
        var r = i(e, 2),
          n = r[0],
          o = r[1];
        'function' == typeof o &&
          ('readystatechange' === n &&
            (this.normalEventListenerreadystatechange = o),
          'loadstart' === n && (this.normalEventListenerloadstart = o),
          'progress' === n && (this.normalEventListenerprogress = o),
          'load' === n && (this.normalEventListenerload = o),
          'loadend' === n && (this.normalEventListenerloadend = o),
          'abort' === n && (this.normalEventListenerabort = o),
          'timeout' === n && (this.normalEventListenertimeout = o),
          'error' === n && (this.normalEventListenererror = o));
      }
    }
    var I = f;
    var R = a.setProperties,
      M = a.deleteObject,
      U = 'URLSearchParams' in self,
      H = 'Symbol' in self && 'iterator' in Symbol,
      X =
        'FileReader' in self &&
        'Blob' in self &&
        (function () {
          try {
            return new Blob(), !0;
          } catch (e) {
            return !1;
          }
        })(),
      q = 'FormData' in self,
      J = 'ArrayBuffer' in self;
    if (J)
      var G = [
          '[object Int8Array]',
          '[object Uint8Array]',
          '[object Uint8ClampedArray]',
          '[object Int16Array]',
          '[object Uint16Array]',
          '[object Int32Array]',
          '[object Uint32Array]',
          '[object Float32Array]',
          '[object Float64Array]',
        ],
        z =
          ArrayBuffer.isView ||
          function (e) {
            return e && G.indexOf(Object.prototype.toString.call(e)) > -1;
          };

    function K(e) {
      if (
        ('string' != typeof e && (e = String(e)),
        /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e) || '' === e)
      )
        throw new TypeError('Invalid character in header field name');
      return e.toLowerCase();
    }

    function $(e) {
      return 'string' != typeof e && (e = String(e)), e;
    }

    function V(e) {
      var t = {
        next: function () {
          var t = e.shift();
          return {
            done: void 0 === t,
            value: t,
          };
        },
      };
      return (
        H &&
          (t[Symbol.iterator] = function () {
            return t;
          }),
        t
      );
    }

    function W(e) {
      (this.map = {}),
        e instanceof W
          ? e.forEach(function (e, t) {
              this.append(t, e);
            }, this)
          : Array.isArray(e)
          ? e.forEach(function (e) {
              this.append(e[0], e[1]);
            }, this)
          : e &&
            Object.getOwnPropertyNames(e).forEach(function (t) {
              this.append(t, e[t]);
            }, this);
    }

    function Y(e) {
      if (e.bodyUsed) return Promise.reject(new TypeError('Already read'));
      e.bodyUsed = !0;
    }

    function Q(e) {
      return new Promise(function (t, r) {
        (e.onload = function () {
          t(e.result);
        }),
          (e.onerror = function () {
            r(e.error);
          });
      });
    }

    function Z(e) {
      var t = new FileReader(),
        r = Q(t);
      return t.readAsArrayBuffer(e), r;
    }

    function ee(e) {
      if (e.slice) return e.slice(0);
      var t = new Uint8Array(e.byteLength);
      return t.set(new Uint8Array(e)), t.buffer;
    }

    function te() {
      return (
        (this.bodyUsed = !1),
        (this._initBody = function (e) {
          var t;
          (this._bodyInit = e),
            e
              ? 'string' == typeof e
                ? (this._bodyText = e)
                : X && Blob.prototype.isPrototypeOf(e)
                ? (this._bodyBlob = e)
                : q && FormData.prototype.isPrototypeOf(e)
                ? (this._bodyFormData = e)
                : U && URLSearchParams.prototype.isPrototypeOf(e)
                ? (this._bodyText = e.toString())
                : J && X && (t = e) && DataView.prototype.isPrototypeOf(t)
                ? ((this._bodyArrayBuffer = ee(e.buffer)),
                  (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                : J && (ArrayBuffer.prototype.isPrototypeOf(e) || z(e))
                ? (this._bodyArrayBuffer = ee(e))
                : (this._bodyText = e = Object.prototype.toString.call(e))
              : (this._bodyText = ''),
            this.headers.get('content-type') ||
              ('string' == typeof e
                ? this.headers.set('content-type', 'text/plain;charset=UTF-8')
                : this._bodyBlob && this._bodyBlob.type
                ? this.headers.set('content-type', this._bodyBlob.type)
                : U &&
                  URLSearchParams.prototype.isPrototypeOf(e) &&
                  this.headers.set(
                    'content-type',
                    'application/x-www-form-urlencoded;charset=UTF-8'
                  ));
        }),
        X &&
          ((this.blob = function () {
            var e = Y(this);
            if (e) return e;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData)
              throw new Error('could not read FormData body as blob');
            return Promise.resolve(new Blob([this._bodyText]));
          }),
          (this.arrayBuffer = function () {
            return this._bodyArrayBuffer
              ? Y(this) || Promise.resolve(this._bodyArrayBuffer)
              : this.blob().then(Z);
          })),
        (this.text = function () {
          var e,
            t,
            r,
            n = Y(this);
          if (n) return n;
          if (this._bodyBlob)
            return (
              (e = this._bodyBlob),
              (t = new FileReader()),
              (r = Q(t)),
              t.readAsText(e),
              r
            );
          if (this._bodyArrayBuffer)
            return Promise.resolve(
              (function (e) {
                for (
                  var t = new Uint8Array(e), r = new Array(t.length), n = 0;
                  n < t.length;
                  n++
                )
                  r[n] = String.fromCharCode(t[n]);
                return r.join('');
              })(this._bodyArrayBuffer)
            );
          if (this._bodyFormData)
            throw new Error('could not read FormData body as text');
          return Promise.resolve(this._bodyText);
        }),
        q &&
          (this.formData = function () {
            return this.text().then(oe);
          }),
        (this.json = function () {
          return this.text().then(JSON.parse);
        }),
        this
      );
    }
    (W.prototype.append = function (e, t) {
      (e = K(e)), (t = $(t));
      var r = this.map[e];
      this.map[e] = r ? r + ', ' + t : t;
    }),
      (W.prototype.delete = function (e) {
        delete this.map[K(e)];
      }),
      (W.prototype.get = function (e) {
        return (e = K(e)), this.has(e) ? this.map[e] : null;
      }),
      (W.prototype.has = function (e) {
        return this.map.hasOwnProperty(K(e));
      }),
      (W.prototype.set = function (e, t) {
        this.map[K(e)] = $(t);
      }),
      (W.prototype.forEach = function (e, t) {
        for (var r in this.map)
          this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this);
      }),
      (W.prototype.keys = function () {
        var e = [];
        return (
          this.forEach(function (t, r) {
            e.push(r);
          }),
          V(e)
        );
      }),
      (W.prototype.values = function () {
        var e = [];
        return (
          this.forEach(function (t) {
            e.push(t);
          }),
          V(e)
        );
      }),
      (W.prototype.entries = function () {
        var e = [];
        return (
          this.forEach(function (t, r) {
            e.push([r, t]);
          }),
          V(e)
        );
      }),
      H && (W.prototype[Symbol.iterator] = W.prototype.entries);
    var re = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function ne(e, t) {
      var r,
        n,
        o = (t = t || {}).body;
      if (e instanceof ne) {
        if (e.bodyUsed) throw new TypeError('Already read');
        (this.url = e.url),
          (this.credentials = e.credentials),
          t.headers || (this.headers = new W(e.headers)),
          (this.method = e.method),
          (this.mode = e.mode),
          (this.signal = e.signal),
          o || null == e._bodyInit || ((o = e._bodyInit), (e.bodyUsed = !0));
      } else this.url = String(e);
      if (
        ((this.credentials =
          t.credentials || this.credentials || 'same-origin'),
        (!t.headers && this.headers) || (this.headers = new W(t.headers)),
        (this.method =
          ((r = t.method || this.method || 'GET'),
          (n = r.toUpperCase()),
          re.indexOf(n) > -1 ? n : r)),
        (this.mode = t.mode || this.mode || null),
        (this.signal = t.signal || this.signal),
        (this.referrer = null),
        ('GET' === this.method || 'HEAD' === this.method) && o)
      )
        throw new TypeError('Body not allowed for GET or HEAD requests');
      this._initBody(o);
    }

    function oe(e) {
      var t = new FormData();
      return (
        e
          .trim()
          .split('&')
          .forEach(function (e) {
            if (e) {
              var r = e.split('='),
                n = r.shift().replace(/\+/g, ' '),
                o = r.join('=').replace(/\+/g, ' ');
              t.append(decodeURIComponent(n), decodeURIComponent(o));
            }
          }),
        t
      );
    }

    function ae(e, t) {
      t || (t = {}),
        (this.type = 'default'),
        (this.status = void 0 === t.status ? 200 : t.status),
        (this.ok = this.status >= 200 && this.status < 300),
        (this.statusText = 'statusText' in t ? t.statusText : 'OK'),
        (this.headers = new W(t.headers)),
        (this.url = t.url || ''),
        this._initBody(e);
    }
    (ne.prototype.clone = function () {
      return new ne(this, {
        body: this._bodyInit,
      });
    }),
      te.call(ne.prototype),
      te.call(ae.prototype),
      (ae.prototype.clone = function () {
        return new ae(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new W(this.headers),
          url: this.url,
        });
      }),
      (ae.error = function () {
        var e = new ae(null, {
          status: 0,
          statusText: '',
        });
        return (e.type = 'error'), e;
      });
    var ie = [301, 302, 303, 307, 308];
    ae.redirect = function (e, t) {
      if (-1 === ie.indexOf(t)) throw new RangeError('Invalid status code');
      return new ae(null, {
        status: t,
        headers: {
          location: e,
        },
      });
    };
    var se = self.DOMException;
    try {
      new se();
    } catch (e) {
      ((se = function (e, t) {
        (this.message = e), (this.name = t);
        var r = Error(e);
        this.stack = r.stack;
      }).prototype = Object.create(Error.prototype)),
        (se.prototype.constructor = se);
    }

    function le(e, t) {
      return new Promise(function (r, n) {
        var o = new ne(e, t);
        if (o.signal && o.signal.aborted)
          return n(new se('Aborted', 'AbortError'));
        var a = new XMLHttpRequest();

        function i() {
          a.abort();
        }
        (a.onload = function () {
          var e,
            t,
            n = {
              status: a.status,
              statusText: a.statusText,
              headers:
                ((e = a.getAllResponseHeaders() || ''),
                (t = new W()),
                e
                  .replace(/\r?\n[\t ]+/g, ' ')
                  .split(/\r?\n/)
                  .forEach(function (e) {
                    var r = e.split(':'),
                      n = r.shift().trim();
                    if (n) {
                      var o = r.join(':').trim();
                      t.append(n, o);
                    }
                  }),
                t),
            };
          n.url =
            'responseURL' in a ? a.responseURL : n.headers.get('X-Request-URL');
          var o = 'response' in a ? a.response : a.responseText;
          r(new ae(o, n));
        }),
          (a.onerror = function () {
            n(new TypeError('Network request failed'));
          }),
          (a.ontimeout = function () {
            n(new TypeError('Network request failed'));
          }),
          (a.onabort = function () {
            n(new se('Aborted', 'AbortError'));
          }),
          a.open(o.method, o.url, !0),
          'include' === o.credentials
            ? (a.withCredentials = !0)
            : 'omit' === o.credentials && (a.withCredentials = !1),
          'responseType' in a && X && (a.responseType = 'blob'),
          o.headers.forEach(function (e, t) {
            a.setRequestHeader(t, e);
          }),
          o.signal &&
            (o.signal.addEventListener('abort', i),
            (a.onreadystatechange = function () {
              4 === a.readyState && o.signal.removeEventListener('abort', i);
            })),
          a.send(void 0 === o._bodyInit ? null : o._bodyInit);
      });
    }
    (le.polyfill = !0),
      (self.fetch = le),
      (self.Headers = W),
      (self.Request = ne),
      (self.Response = ae);
    !(function (r) {
      if (!r.XMJSBridgeConfig) {
        var n = r.FormData.prototype.append;
        if (
          (r.FormData.prototype.entries ||
            (r.FormData.prototype.append = function () {
              return (
                this._entries || (this._entries = []),
                this._entries.push(arguments),
                n.apply(this, arguments)
              );
            }),
          self !== top && r.parent.XMJSBridgeConfig)
        )
          r.XMLHttpRequest = r.parent.XMLHttpRequest;
        else {
          var o = new t(e);
          !(function (e) {
            var t = function (e) {
                if (
                  e &&
                  e.tagName &&
                  'form' === e.tagName.toLowerCase() &&
                  e.method &&
                  'post' === e.method.toLowerCase()
                ) {
                  for (
                    var t,
                      r,
                      n = [].slice.call(e.elements),
                      o = [],
                      a = 0,
                      i = n.length;
                    a < i;
                    ++a
                  ) {
                    var s = n[a];
                    s &&
                      s.tagName &&
                      'input' === s.tagName.toLowerCase() &&
                      ((t = s.name),
                      (r = s.value),
                      t &&
                        ('[object File]' === r.toString() && (r = r.name),
                        o.push(
                          encodeURIComponent(t) + '=' + encodeURIComponent(r)
                        )));
                  }
                  o = o.join('&');
                  var l = e.action || location.href,
                    c = l.indexOf('#');
                  c >= 0 && (l = l.substring(0, c));
                  var u = l.indexOf('?');
                  if (
                    ((l =
                      u >= 0
                        ? l + '&XMWKForm_POST_DATA=' + encodeURIComponent(o)
                        : l + '?XMWKForm_POST_DATA=' + encodeURIComponent(o)),
                    /^\/\//.test(l) && (l = window.location.protocol + l),
                    !/^http(s)?:/.test(l) && !/^\//.test(l))
                  ) {
                    var d = window.location.pathname;
                    if (/\/$/.test(d)) l = d + l;
                    else {
                      var f = d.split('/');
                      f.pop(), (l = f.join('/') + '/' + l);
                    }
                  }
                  e.action = l;
                }
              },
              r = HTMLFormElement.prototype.submit,
              n = e.onsubmit;
            (HTMLFormElement.prototype.submit = function () {
              t(this), r.call(this);
            }),
              (e.onsubmit = function (e) {
                t(e.srcElement), n && n.apply && n.apply(this, arguments);
              });
          })(r);
          var a = document.createEvent('Events');
          a.initEvent('XMJSBridgeReady'),
            document.dispatchEvent(a),
            (r.XMJSBridgeConfig = {
              enableAjaxHook: function (e) {
                e
                  ? l({
                      readyState: p,
                      status: x,
                      statusText: O,
                      responseText: g,
                      response: y,
                      responseType: w,
                      timeout: k,
                      open: j,
                      send: T,
                      overrideMimeType: A,
                      abort: N,
                      setRequestHeader: B,
                      getAllResponseHeaders: D,
                      getResponseHeader: C,
                      addEventListener: F,
                      upload: I,
                    })
                  : c();
              },
              enableCookieHook: function () {
                o.hookCookie();
              },
              setProperties: function () {
                for (
                  var t = arguments.length, r = new Array(t), n = 0;
                  n < t;
                  n++
                )
                  r[n] = arguments[n];
                e.handleMessageFromNative.apply(e, arguments) ||
                  R.apply(void 0, r);
              },
              deleteObject: M,
            });
          var i = {
            enumerable: !1,
            configurable: !1,
            writable: !1,
          };
          Object.defineProperty(r, 'XMJSBridgeConfig', i),
            Object.defineProperties(r.XMJSBridgeConfig, {
              enableAjaxHook: i,
              enableCookieHook: i,
              setProperties: i,
              deleteObject: i,
            });
        }
      }
    })(window);
  })();
})();
