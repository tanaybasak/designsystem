// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../logo.png":[["logo.de01bb0e.png","logo.png"],"logo.png"],"_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/modal.js":[function(require,module,exports) {
// This javascript function is for demonstation demonstration purpose of modal in landing page
// This function will not be part package created for design system 
var modal = function () {
  var DOMStrings = {
    modalContainer: 'hcl-modal-type',
    modalButton: 'hcl-btn-modal-type'
  };
  var classNames = {
    modalDisable: 'hcl-modal-hide'
  };

  showModal = function showModal(event) {
    var modalType = event.target.getAttribute("data-modal-type");
    document.getElementById("".concat(DOMStrings.modalContainer).concat(modalType)).classList.remove(classNames.modalDisable);
  };

  hideModal = function hideModal(event) {
    var modalType = event.target.closest("section[data-modal-type]").getAttribute("data-modal-type");
    document.getElementById("".concat(DOMStrings.modalContainer).concat(modalType)).classList.add(classNames.modalDisable);
  };

  var setupEventListeners = function setupEventListeners() {
    for (var type = 1; type <= 8; type++) {
      var elm = document.getElementById("hcl-btn-modal-type".concat(type));
      elm ? elm.addEventListener('click', showModal) : null;
      elm = document.getElementById("hcl-modal-close-type".concat(type));
      elm ? elm.addEventListener('click', hideModal) : null;
      elm = document.getElementById("hcl-modal-cancel-type".concat(type));
      elm ? elm.addEventListener('click', hideModal) : null;
    }

    ;
  };

  return {
    setUpHeplerEvent: function setUpHeplerEvent() {
      setupEventListeners();
    }
  };
}();

modal.setUpHeplerEvent();
},{}],"js/tabs.js":[function(require,module,exports) {
(function () {
  var Tabs = {
    selectors: {
      tabs: 'hcl-tabs-nav',
      tabPanel: 'hcl-tabs-panel',
      disabledTabPanel: 'hcl-tabs-disabled',
      selectedTabPanel: 'active',
      activeTab: 'active'
    },
    tablist: [],
    init: function init() {
      var tabs = Array.from(document.querySelectorAll('nav[data-tabs]'));
      this.tablist = tabs;
      this.bindEventsForEachTab();
    },
    bindEventsForEachTab: function bindEventsForEachTab() {
      var me_ = this;
      this.tablist.forEach(function (item, index) {
        var tabs = Array.from(item.querySelectorAll('li[role=tab]'));

        for (var i = 0; i < tabs.length; i++) {
          tabs[i].addEventListener('click', me_.clickEventListener);
        }
      });
    },
    clickEventListener: function clickEventListener(event) {
      var currentTarget = event.currentTarget;
      var target = event.target;
      var isLi = currentTarget === target; // Li

      var tabID, element, parentIdx;

      if (isLi) {
        element = currentTarget;
        tabID = currentTarget.dataset.target;
      } else {
        element = target.parentElement;
        tabID = target.parentElement.dataset.target;
      }

      if (!element.classList.contains(Tabs.selectors.disabledTabPanel)) {
        for (var j = 0; j < Tabs.tablist.length; j++) {
          if (Tabs.tablist[j].contains(element)) {
            parentIdx = j;
            break;
          }
        }

        Tabs.findTabs(tabID, parentIdx);
      }
    },
    findTabs: function findTabs(tabID, pIdx) {
      var me_ = this;
      var children = me_.tablist[pIdx].children,
          tabChildren;

      for (var u = 0; u < children.length; u++) {
        // All Tab Loop
        if (children[u].classList.contains(Tabs.selectors.tabs)) {
          tabChildren = children[u].children;
          break;
        }
      }

      me_.toggleTab(tabID, tabChildren);
      me_.toggleTabPanel(me_.tablist[pIdx].nextElementSibling.children);
      document.getElementById("".concat(tabID)).classList.add(Tabs.selectors.activeTab);
    },
    toggleTab: function toggleTab(tId, tchildren) {
      if (tchildren) {
        for (var p = 0; p < tchildren.length; p++) {
          tchildren[p].classList.remove(Tabs.selectors.selectedTabPanel);
          var href = tchildren[p].dataset.target;

          if (href === tId) {
            tchildren[p].classList.add(Tabs.selectors.selectedTabPanel);
          }
        }
      }
    },
    toggleTabPanel: function toggleTabPanel(tabpanels) {
      if (tabpanels) {
        var len = tabpanels.length;

        for (var i = 0; i < len; i++) {
          tabpanels[i].classList.remove('active');
        }
      }
    }
  };
  Tabs.init();
})();
},{}],"js/content-switcher.js":[function(require,module,exports) {
(function () {
  var contentSwitcher = {
    selectors: {
      contentswitcher: 'hcl-content-switcher',
      contentswitcherBtn: 'hcl-content-switcher-btn',
      activeTab: 'active'
    },
    switchers: [],
    init: function init() {
      var contentSwitcher = Array.from(document.querySelectorAll('div[data-content-switcher]'));
      this.switchers = contentSwitcher;
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      var me_ = this;
      this.switchers.forEach(function (item, index) {
        var switchers = Array.from(item.querySelectorAll('button.hcl-content-switcher-btn'));

        for (var i = 0; i < switchers.length; i++) {
          switchers[i].addEventListener('click', me_.clickEventListener);
        }
      });
    },
    clickEventListener: function clickEventListener(ev) {
      var currentTarget = ev.currentTarget;
      var target = ev.target;
      var isBtn = currentTarget === target; // btn

      var btn, element, parentIdx;

      if (isBtn) {
        element = currentTarget;
        btn = currentTarget.getAttribute('data-target');
      } else {
        element = target.parentElement;
        btn = target.parentElement.getAttribute('data-target');
      }

      contentSwitcher.hideAllSwitcherPanels(element);
    },
    hideAllSwitcherPanels: function hideAllSwitcherPanels(element) {
      var buttons = Array.from(element.parentElement.querySelectorAll('button'));
      buttons.forEach(function (elem, idx) {
        elem.classList.remove('active');
        var panel = document.querySelector(elem.getAttribute('data-target'));
        panel.setAttribute('hidden', '');
        panel.setAttribute('aria-hidden', 'true');
      });
      element.classList.add('active');
      var panel = document.querySelector(element.getAttribute('data-target'));
      panel.removeAttribute('hidden');
      panel.setAttribute('aria-hidden', false);
    }
  };
  contentSwitcher.init();
})();
},{}],"js/dropdown.js":[function(require,module,exports) {
(function () {
  var DROPDOWN_SELECTOR = '.hcl-dropdown .hcl-dropdown-toggle';
  var DROPDOWN_ITEM_SELECTOR = '.hcl-dropdown .hcl-dropdown-item';
  var dropdownElements = document.querySelectorAll(DROPDOWN_SELECTOR);
  var dropdownItemElements = document.querySelectorAll(DROPDOWN_ITEM_SELECTOR);

  if (dropdownElements) {
    dropdownElements.forEach(function (item) {
      item.addEventListener('click', function (event) {
        var _nextElementSibling = event.currentTarget.nextElementSibling;

        if (/show/i.test(_nextElementSibling.className)) {
          _nextElementSibling.classList.remove('show');
        } else {
          _nextElementSibling.classList.add('show');
        }

        var parent = getClosest(event.currentTarget, '.hcl-dropdown');

        if (parent) {
          var parentElementClassName = parent.className;
          var position = getPosition(parentElementClassName);

          var _nextElementSibling$g = _nextElementSibling.getBoundingClientRect(),
              height = _nextElementSibling$g.height;

          if (position === 'top') {
            height = (height + 2) * -1;
          } else {
            height = 42;
          }

          _nextElementSibling.style.transform = 'translate3d(0, ' + height + 'px, 0)';
        }
      });
    });
  }

  if (dropdownItemElements) {
    dropdownItemElements.forEach(function (item) {
      item.addEventListener('click', function (event) {
        var _currentTarget = event.currentTarget;
        var _value = _currentTarget.dataset.value;

        var _label = _currentTarget.textContent.trim();

        var parent = getClosest(_currentTarget, '.hcl-dropdown-container');

        if (parent) {
          var _dropdownElement = parent.previousElementSibling;

          if (_dropdownElement) {
            _dropdownElement.setAttribute('data-value', _value);

            _dropdownElement.innerHTML = _label;
            parent.classList.remove('show');
            var previouslySelectedElement = parent.querySelector('.hcl-dropdown-item.hcl-dropdown-item-selected');

            if (previouslySelectedElement) {
              previouslySelectedElement.classList.remove('hcl-dropdown-item-selected');
            }

            _currentTarget.classList.add('hcl-dropdown-item-selected');
          }
        }
      });
    });
  }

  function getClosest(element, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;

        while (--i >= 0 && matches.item(i) !== this) {}

        return i > -1;
      };
    } // Get the closest matching element


    for (; element && element !== document; element = element.parentNode) {
      if (element.matches(selector)) return element;
    }

    return null;
  }

  function getPosition(_className) {
    switch (true) {
      case /droptop/i.test(_className):
        return 'top';

      case /dropright/i.test(_className):
        return 'right';

      case /dropbottom/i.test(_className):
        return 'bottom';

      case /dropleft/i.test(_className):
        return 'left';

      default:
        return 'bottom';
    }
  }
})();
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

require("../scss/main.scss");

require("./modal");

require("./tabs");

require("./content-switcher");

require("./dropdown");
},{"../scss/main.scss":"scss/main.scss","./modal":"js/modal.js","./tabs":"js/tabs.js","./content-switcher":"js/content-switcher.js","./dropdown":"js/dropdown.js"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54812" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.map