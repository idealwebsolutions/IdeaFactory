webpackJsonp([0],{

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(44)
/* script */
var __vue_script__ = __webpack_require__(47)
/* template */
var __vue_template__ = __webpack_require__(62)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/PinWall.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-64036998", Component.options)
  } else {
    hotAPI.reload("data-v-64036998", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 44:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(46)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 46:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FilterBar_vue__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FilterBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__FilterBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VisiblePins_vue__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VisiblePins_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__VisiblePins_vue__);
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      filter: 'all',
      offset: 0,
      pins: [],
      loading: false,
      disabled: false
    };
  },

  components: {
    'filter-bar': __WEBPACK_IMPORTED_MODULE_0__FilterBar_vue___default.a,
    'visible-pins': __WEBPACK_IMPORTED_MODULE_1__VisiblePins_vue___default.a
  },
  methods: {
    fetchPins: function fetchPins() {
      var self = this;
      //
      self.disabled = true;
      self.loading = true;
      //
      axios.get('/api/pins/' + self.offset + '/' + self.filter).then(function (response) {
        console.log(response.data.pins);
        self.pins = self.pins.concat(response.data.pins);
        //
        if (!response.data.pins.length) {
          self.disabled = true;
        } else {
          self.disabled = false;
          setTimeout(function () {
            self.loading = false;
          }, 5000);
        }
        // self.$parent.busy = false // should be until after images loaded
        self.offset += response.data.pins.length;
        console.log('offset: ' + self.offset);
      }).catch(console.error);
    },
    setActiveFilter: function setActiveFilter(filter) {
      switch (filter) {
        case 'Art':
          self.filter = 'category:art';
          break;
      }
      console.log('received ' + filter);
    }
  }
});

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(44)
/* script */
var __vue_script__ = __webpack_require__(49)
/* template */
var __vue_template__ = __webpack_require__(50)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/FilterBar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b7b6fd4", Component.options)
  } else {
    hotAPI.reload("data-v-0b7b6fd4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      categories: ['Animals/Pets', 'Art', 'Architecture', 'Gifts', 'Popular', 'Everything']
    };
  },

  methods: {
    handleFilterChange: function handleFilterChange(category) {
      this.$emit('filter', category);
    }
  }
});

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "nav",
    { staticClass: "navbar is-transparent is-mobile is-centered" },
    [
      _c("div", { staticClass: "navbar-menu navbar-center" }, [
        _c("div", { staticClass: "navbar-start" }),
        _vm._v(" "),
        _c("div", { staticClass: "navbar-center" }, [
          _c(
            "a",
            {
              staticClass: "navbar-item",
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  _vm.handleFilterChange("following")
                }
              }
            },
            [_vm._v("Following")]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "navbar-item has-dropdown is-hoverable" }, [
            _c("a", { staticClass: "navbar-link", attrs: { href: "#" } }, [
              _vm._v("Categories")
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "navbar-dropdown" },
              _vm._l(_vm.categories, function(category) {
                return _c(
                  "a",
                  {
                    staticClass: "navbar-item",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        _vm.handleFilterChange(category)
                      }
                    }
                  },
                  [_vm._v("\n            " + _vm._s(category) + "\n          ")]
                )
              })
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "navbar-end" })
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0b7b6fd4", module.exports)
  }
}

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(52)
}
var normalizeComponent = __webpack_require__(44)
/* script */
var __vue_script__ = __webpack_require__(54)
/* template */
var __vue_template__ = __webpack_require__(61)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-60dcc8a9"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/VisiblePins.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60dcc8a9", Component.options)
  } else {
    hotAPI.reload("data-v-60dcc8a9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(45)("2d943030", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60dcc8a9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VisiblePins.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60dcc8a9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VisiblePins.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(41)(false);
// imports


// module
exports.push([module.i, "\n.wall[data-v-60dcc8a9] {\n  -webkit-column-count: 4;\n          column-count: 4;\n  -webkit-column-gap: 1em;\n          column-gap: 1em;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: 'row wrap';\n          flex-flow: 'row wrap';\n}\n", ""]);

// exports


/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_infinite_scroll__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_infinite_scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_infinite_scroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Pin_vue__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Pin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Pin_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {};
  },

  props: {
    pins: {
      type: Array,
      required: true
    },
    disabled: Boolean
  },
  directives: { infiniteScroll: __WEBPACK_IMPORTED_MODULE_0_vue_infinite_scroll___default.a },
  methods: {
    getMorePins: function getMorePins() {
      this.$emit('pins');
    }
  },
  components: {
    'Pin': __WEBPACK_IMPORTED_MODULE_1__Pin_vue___default.a
  }
});

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.infiniteScroll = factory());
}(this, function () { 'use strict';

  var ctx = '@@InfiniteScroll';

  var throttle = function throttle(fn, delay) {
    var now, lastExec, timer, context, args; //eslint-disable-line

    var execute = function execute() {
      fn.apply(context, args);
      lastExec = now;
    };

    return function () {
      context = this;
      args = arguments;

      now = Date.now();

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      if (lastExec) {
        var diff = delay - (now - lastExec);
        if (diff < 0) {
          execute();
        } else {
          timer = setTimeout(function () {
            execute();
          }, diff);
        }
      } else {
        execute();
      }
    };
  };

  var getScrollTop = function getScrollTop(element) {
    if (element === window) {
      return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
    }

    return element.scrollTop;
  };

  var getComputedStyle = document.defaultView.getComputedStyle;

  var getScrollEventTarget = function getScrollEventTarget(element) {
    var currentNode = element;
    // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
      var overflowY = getComputedStyle(currentNode).overflowY;
      if (overflowY === 'scroll' || overflowY === 'auto') {
        return currentNode;
      }
      currentNode = currentNode.parentNode;
    }
    return window;
  };

  var getVisibleHeight = function getVisibleHeight(element) {
    if (element === window) {
      return document.documentElement.clientHeight;
    }

    return element.clientHeight;
  };

  var getElementTop = function getElementTop(element) {
    if (element === window) {
      return getScrollTop(window);
    }
    return element.getBoundingClientRect().top + getScrollTop(window);
  };

  var isAttached = function isAttached(element) {
    var currentNode = element.parentNode;
    while (currentNode) {
      if (currentNode.tagName === 'HTML') {
        return true;
      }
      if (currentNode.nodeType === 11) {
        return false;
      }
      currentNode = currentNode.parentNode;
    }
    return false;
  };

  var doBind = function doBind() {
    if (this.binded) return; // eslint-disable-line
    this.binded = true;

    var directive = this;
    var element = directive.el;

    var throttleDelayExpr = element.getAttribute('infinite-scroll-throttle-delay');
    var throttleDelay = 200;
    if (throttleDelayExpr) {
      throttleDelay = Number(directive.vm[throttleDelayExpr] || throttleDelayExpr);
      if (isNaN(throttleDelay) || throttleDelay < 0) {
        throttleDelay = 200;
      }
    }
    directive.throttleDelay = throttleDelay;

    directive.scrollEventTarget = getScrollEventTarget(element);
    directive.scrollListener = throttle(doCheck.bind(directive), directive.throttleDelay);
    directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

    this.vm.$on('hook:beforeDestroy', function () {
      directive.scrollEventTarget.removeEventListener('scroll', directive.scrollListener);
    });

    var disabledExpr = element.getAttribute('infinite-scroll-disabled');
    var disabled = false;

    if (disabledExpr) {
      this.vm.$watch(disabledExpr, function (value) {
        directive.disabled = value;
        if (!value && directive.immediateCheck) {
          doCheck.call(directive);
        }
      });
      disabled = Boolean(directive.vm[disabledExpr]);
    }
    directive.disabled = disabled;

    var distanceExpr = element.getAttribute('infinite-scroll-distance');
    var distance = 0;
    if (distanceExpr) {
      distance = Number(directive.vm[distanceExpr] || distanceExpr);
      if (isNaN(distance)) {
        distance = 0;
      }
    }
    directive.distance = distance;

    var immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check');
    var immediateCheck = true;
    if (immediateCheckExpr) {
      immediateCheck = Boolean(directive.vm[immediateCheckExpr]);
    }
    directive.immediateCheck = immediateCheck;

    if (immediateCheck) {
      doCheck.call(directive);
    }

    var eventName = element.getAttribute('infinite-scroll-listen-for-event');
    if (eventName) {
      directive.vm.$on(eventName, function () {
        doCheck.call(directive);
      });
    }
  };

  var doCheck = function doCheck(force) {
    var scrollEventTarget = this.scrollEventTarget;
    var element = this.el;
    var distance = this.distance;

    if (force !== true && this.disabled) return; //eslint-disable-line
    var viewportScrollTop = getScrollTop(scrollEventTarget);
    var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);

    var shouldTrigger = false;

    if (scrollEventTarget === element) {
      shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
    } else {
      var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;

      shouldTrigger = viewportBottom + distance >= elementBottom;
    }

    if (shouldTrigger && this.expression) {
      this.expression();
    }
  };

  var InfiniteScroll = {
    bind: function bind(el, binding, vnode) {
      el[ctx] = {
        el: el,
        vm: vnode.context,
        expression: binding.value
      };
      var args = arguments;
      el[ctx].vm.$on('hook:mounted', function () {
        el[ctx].vm.$nextTick(function () {
          if (isAttached(el)) {
            doBind.call(el[ctx], args);
          }

          el[ctx].bindTryCount = 0;

          var tryBind = function tryBind() {
            if (el[ctx].bindTryCount > 10) return; //eslint-disable-line
            el[ctx].bindTryCount++;
            if (isAttached(el)) {
              doBind.call(el[ctx], args);
            } else {
              setTimeout(tryBind, 50);
            }
          };

          tryBind();
        });
      });
    },
    unbind: function unbind(el) {
      if (el && el[ctx] && el[ctx].scrollEventTarget) el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener);
    }
  };

  var install = function install(Vue) {
    Vue.directive('InfiniteScroll', InfiniteScroll);
  };

  if (window.Vue) {
    window.infiniteScroll = InfiniteScroll;
    Vue.use(install); // eslint-disable-line
  }

  InfiniteScroll.install = install;

  return InfiniteScroll;

}));

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(57)
}
var normalizeComponent = __webpack_require__(44)
/* script */
var __vue_script__ = __webpack_require__(59)
/* template */
var __vue_template__ = __webpack_require__(60)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-666438a4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Pin.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-666438a4", Component.options)
  } else {
    hotAPI.reload("data-v-666438a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(45)("36c1d640", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-666438a4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Pin.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-666438a4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Pin.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(41)(false);
// imports


// module
exports.push([module.i, "\n.card[data-v-666438a4] {\n  margin: 0 0 1em;\n}\n", ""]);

// exports


/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  methods: {
    handleLoad: function handleLoad() {},
    handleFail: function handleFail() {}
  }
});

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("article", { staticClass: "card is-inline-block" }, [
    _c("div", { staticClass: "card-image" }, [
      _c("figure", { staticClass: "image" }, [
        _c("img", {
          attrs: {
            alt: _vm.title,
            src: _vm.content,
            fallback: "http://via.placeholder.com/200x150"
          }
        })
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "card-content" }, [
      _c("div", { staticClass: "content has-text-centered" }, [
        _c("p", { staticClass: "title is-spaced is-6" }, [
          _vm._v(_vm._s(_vm.title))
        ]),
        _vm._v(" "),
        _c("p", { staticClass: "subtitle is-7" }, [
          _vm._v("by " + _vm._s(_vm.author))
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-666438a4", module.exports)
  }
}

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c(
      "div",
      { staticClass: "wall" },
      _vm._l(_vm.pins, function(pin) {
        return _c("Pin", {
          key: pin.id,
          attrs: {
            title: pin.title,
            content: pin.content,
            author: pin.author,
            likes: pin.likes
          }
        })
      })
    ),
    _vm._v(" "),
    _c("div", {
      directives: [
        {
          name: "infinite-scroll",
          rawName: "v-infinite-scroll",
          value: _vm.getMorePins,
          expression: "getMorePins"
        }
      ],
      attrs: {
        "infinite-scroll-disabled": "disabled",
        "infinite-scroll-distance": "10"
      }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-60dcc8a9", module.exports)
  }
}

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container is-fluid" },
    [
      _c("b-loading", {
        attrs: {
          "is-full-page": false,
          active: _vm.loading,
          "can-cancel": false
        },
        on: {
          "update:active": function($event) {
            _vm.loading = $event
          }
        }
      }),
      _vm._v(" "),
      _c("filter-bar", {
        attrs: { filter: _vm.filter },
        on: { filter: _vm.setActiveFilter }
      }),
      _vm._v(" "),
      _c("visible-pins", {
        attrs: { disabled: _vm.disabled, pins: _vm.pins },
        on: { pins: _vm.fetchPins }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-64036998", module.exports)
  }
}

/***/ })

});