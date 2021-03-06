/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Character.js":
/*!**************************!*\
  !*** ./src/Character.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tools = __webpack_require__(/*! ./Tools */ "./src/Tools.js");

var Character = function () {
  function Character() {
    _classCallCheck(this, Character);

    this.name = null;
    this.type = null;
    this.race = null;
    this.level = null;
    this.class = null;
    this.stats = {
      str: null,
      dex: null,
      con: null,
      int: null,
      wis: null,
      chr: null
    };
    this.baseStats = {
      initative: null,
      speed: null,
      armourClass: null
    };
    this.baseHP = 0;
    this.maxHP = null;
    this.tempHP = 0;
    this.shown = false;
    this.colors = {
      "HP": function HP(hp) {
        if (hp >= 50) return "bg-success";
        if (hp >= 20) return "bg-warning";
        return "bg-danger";
      }
    };
  }

  _createClass(Character, [{
    key: "buildFromJson",
    value: function buildFromJson(json) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(json)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var k = _step.value;

          if (_typeof(json[k]) == "object") this[k] = Object.create(json[k]);else this[k] = json[k];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "abilityCheck",
    value: function abilityCheck(stat) {
      return this.modifiers[stat];
    }
  }, {
    key: "savingThrow",
    value: function savingThrow(stat) {
      return this.modifiers[stat];
    }
  }, {
    key: "giveTempHP",
    value: function giveTempHP(s) {
      if (s < 0) s = 0;
      this.tempHP = s;
      this.baseHP += this.tempHP;
    }
  }, {
    key: "clearState",
    value: function clearState() {
      this.tempHP = 0;
      if (this.baseHP > this.maxHP) this.baseHP = this.maxHP;
    }
  }, {
    key: "makeBaseStats",
    value: function makeBaseStats() {
      var baseStats = tools.makeFlexVDN("row", "space-around", "center");
      baseStats.setDim("calc(100% - 2rem)", "15%");
      baseStats.setMargin({ left: "1rem", right: "1rem" });
      baseStats.addChild(tools.makeIconVDN("shield", "AC"));
      return baseStats;
    }
  }, {
    key: "makeCharacterHeader",
    value: function makeCharacterHeader() {
      var container = tools.makeFlexVDN("column", "center", "center");
      container.setDim("100%", "25%");
      container.addText("h6", this.name, "", "1rem");
      var subtitle = "Level " + this.level + " " + this.race + " " + this.class;
      container.addText("p", subtitle, "lead", "0.8rem");
      return container;
    }
  }, {
    key: "makeCharacterStats",
    value: function makeCharacterStats(terminal) {
      var _this = this;

      var icons = tools.makeFlexVDN("row", "space-between", "center");
      icons.setDim("calc(100% - 2rem)", "26%");
      icons.setMargin({ top: "1%", bottom: "0%", left: "1rem", right: "1rem" });
      var stats = {
        "str": "sword",
        "dex": "run-fast",
        "con": "heart-half-full",
        "int": "atom",
        "wis": "earth",
        "chr": "forum"
      };
      Object.keys(stats).map(function (x) {
        var cs = _this.stats[x];
        var child = tools.makeIconVDN(stats[x], x + ": " + cs);
        child.bind("click", function () {
          return terminal.autoType(x + " check for [" + _this.name + "]");
        });
        icons.addChild(child);
      });
      var mods = tools.makeFlexVDN("row", "space-between", "center");
      mods.setDim("calc(100% - 2rem)", "26%");
      mods.setMargin({ top: "1%", left: "1rem", right: "1rem" });
      Object.keys(stats).map(function (x) {
        var modifier = _this.modifiers[x];
        var modText = null;
        if (modifier > 0) modText = tools.makeDivVDN().addText("p", "+" + modifier, "lead faint text-success", "0.7rem");else if (modifier < 0) modText = tools.makeDivVDN().addText("p", "" + modifier, "lead faint text-danger", "0.7rem");else modText = tools.makeDivVDN().addText("p", "" + modifier, "lead faint", "0.7rem");
        mods.addChild(modText);
      });
      var container = tools.makeFlexVDN("column", "center", "center");
      container.setMargin({ top: "2%", left: "1rem", right: "1rem" });
      container.addChild(icons);
      container.addChild(mods);
      container.style.borderTop = "solid #EBEBEB 2px";
      return container;
    }
  }, {
    key: "makeCharacterHP",
    value: function makeCharacterHP() {
      var p = this.HP.percentage;
      var color = this.colors.HP(p);
      var container = tools.makeDivVDN().setDim("calc(100% - 2rem)", "0.3rem");
      container.setMargin({ left: "1rem", right: "1rem" });
      var pbc = tools.makeDivVDN({ className: "progress" });
      pbc.setDim("100%", "100%");
      pbc.addChild(tools.makeDivVDN({ className: "progress-bar " + color }));
      pbc.children[0].style.width = p + "%";
      pbc.children[0].style.height = "100%";
      container.addChild(pbc);
      return container;
    }
  }, {
    key: "makeCharacterSubHeading",
    value: function makeCharacterSubHeading(t) {
      var container = tools.makeDivVDN();
      container.addText("p", t, "lead", "0.8rem");
      container.setMargin({ left: "1.5rem", top: "1rem", bottom: "0.4rem" });
      return container;
    }
  }, {
    key: "throwFull",
    value: function throwFull() {
      var container = tools.makeFlexVDN("column", "center", "center");
      container.setDim("100%", "100%");

      var subtitle = "Level " + this.level + " " + this.race + " " + this.class;

      var heading = tools.makeFlexVDN("row", "center", "center");
      heading.setDim("calc(100% - 2rem)", "4rem");
      heading.setMargin({ left: "1rem", right: "1rem", bottom: "1rem" });
      heading.addChild(tools.makeDivVDN());
      heading.first.innerText = this.name;
      heading.first.style["font-size"] = "2rem";
      heading.addText("p", subtitle, "lead", "1rem");
      container.addChild(heading);

      var stats = this.makeCharacterStats();
      stats.style.width = "calc(100% - 2rem)";
      stats.children[0].children.map(function (x) {
        x.children[0].style["font-size"] = "1.2rem";
      });
      stats.children[1].children.map(function (x) {
        x.children[0].style["font-size"] = "1rem";
      });
      stats.setMargin({ left: "1rem", right: "1rem" });
      stats.style.borderBottom = "#EBEBEB 2px solid";
      stats.children[1].style.marginBottom = "1%";

      container.addChild(stats);
      tools.throwModal(container);
    }
  }, {
    key: "makeCharacterActionbar",
    value: function makeCharacterActionbar() {
      var _this2 = this;

      var container = tools.makeFlexVDN("row", "flex-end", "center");
      container.setMargin({ left: "0.5rem", right: "0.5rem" });
      container.setDim("calc(100% - 1rem)", "1.5rem");
      var child = tools.makeIconVDN("arrow-expand", "expand");
      child.attributes["data-balloon-pos"] = "left";
      child.bind("click", function () {
        return _this2.throwFull();
      });
      container.addChild(child);
      return container;
    }
  }, {
    key: "render",
    value: function render(terminal) {
      var root = tools.VDN("div");
      root.addChild(this.makeCharacterActionbar());
      root.addChild(this.makeCharacterHeader());
      root.addChild(this.makeBaseStats());
      root.addChild(this.makeCharacterStats(terminal));
      root.addChild(this.makeCharacterSubHeading("HP"));
      root.addChild(this.makeCharacterHP());
      return root.render();
    }
  }, {
    key: "HP",
    set: function set(s) {
      if (s < 0) {
        this.baseHP = 0;
        return;
      }
      if (s > this.maxHP + this.tempHP) this.baseHP = this.maxHP + this.tempHP;else this.baseHP = s;
    },
    get: function get() {
      var p = Math.ceil(this.baseHP / (this.maxHP + this.tempHP) * 100);
      return {
        points: this.baseHP,
        percentage: p
      };
    }
  }, {
    key: "modifiers",
    get: function get() {
      return {
        str: Math.floor(this.stats.str / 2) - 5,
        dex: Math.floor(this.stats.dex / 2) - 5,
        con: Math.floor(this.stats.con / 2) - 5,
        int: Math.floor(this.stats.int / 2) - 5,
        wis: Math.floor(this.stats.wis / 2) - 5,
        chr: Math.floor(this.stats.chr / 2) - 5
      };
    }
  }]);

  return Character;
}();

module.exports = Character;

/***/ }),

/***/ "./src/PlayersDash.js":
/*!****************************!*\
  !*** ./src/PlayersDash.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = __webpack_require__(/*! ./Character */ "./src/Character.js");
var tools = __webpack_require__(/*! ./Tools */ "./src/Tools.js");

var PlayersDash = function () {
  function PlayersDash(anchors, terminal) {
    _classCallCheck(this, PlayersDash);

    this.cards = anchors;
    this.characterList = [];
    this.terminal = terminal;
    this.colors = {
      "NPC": "var(--info)",
      "Player": "var(--success)",
      "Enemy": "var(--danger)"
    };
  }

  _createClass(PlayersDash, [{
    key: 'getCharacter',
    value: function getCharacter(n) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.characterList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var character = _step.value;

          if (character.name.toLowerCase().match(n)) return tools.watched(character, this.render);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: 'newCharacter',
    value: function newCharacter(c) {
      this.characterList.push(c);
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      // hide and clear
      this.cards.map(function (card) {
        card.style.display = "none";
        card.innerHTML = "";
      });

      // get characters
      var characterSet = this.characterList.filter(function (x) {
        return x.shown;
      });
      if (characterSet.length > this.cards.length) characterSet = characterSet.slice(0, this.cards.length);

      // build card from sub components
      this.cards.map(function (card, i) {
        if (i <= characterSet.length - 1) {
          card.style.borderTopColor = _this.colors[characterSet[i].type];
          card.appendChild(characterSet[i].render(_this.terminal));
        }
      });

      // display
      this.cards.map(function (x) {
        return x.style.display = "block";
      });
    }
  }]);

  return PlayersDash;
}();

module.exports = PlayersDash;

/***/ }),

/***/ "./src/Story.js":
/*!**********************!*\
  !*** ./src/Story.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tools = __webpack_require__(/*! ./Tools */ "./src/Tools.js");

var Story = function () {
  function Story(contentAnchor, titleAnchor, progressAnchor) {
    _classCallCheck(this, Story);

    this.contentAnchor = contentAnchor;
    this.titleAnchor = titleAnchor;
    this.progressAnchor = progressAnchor;
    this.currentChapter = null;
    this.characters = [];
    this.chapters = [];
    this.bootstrapColors = ["danger", "success", "warning", "info", "primary", "secondary"];
  }

  _createClass(Story, [{
    key: "loadFromJson",
    value: function loadFromJson(json) {
      this.chapters = json.chapters;
      this.currentChapter = json.currentChapter;
      this.characters = json.characters;
    }
  }, {
    key: "markdownify",
    value: function markdownify(ch) {
      var _this = this;

      var raw = this.chapters[ch].raw;
      raw = raw.replace(/_(.*?)_/gi, "<i>$1</i>").replace(/\*(.*?)\*/gi, "<b>$1</b>");
      raw = raw.replace(/\-\-\-+/gi, "<hr>");
      var jmpIcon = "<a data-balloon='Chapter $1' data-balloon-pos='up'><i class='mdi mdi-share chapter-link jmp-link' id='jmp-link-$1'></i><a><br>";
      raw = raw.replace(/\<(\d+)\>/gi, jmpIcon);
      raw = raw.replace(/\[([^\[\]]*)\]\s*\"(.*?)\"/gi, function (m, g1, g2, o, s) {
        var col = _this.characters[g1.toLowerCase()];
        if (_this.bootstrapColors.indexOf(col) == -1) return "<blockquote style=\"color: " + col + "; border-left-color: " + col + "\"><b>" + g1 + ":</b> " + g2 + "</blockquote>";
        return "<blockquote style=\"border-left-color: var(--" + col + ")\" class=\"text-" + col + "\"><b>" + g1 + ":</b> " + g2 + "</blockquote>";
      });
      raw = raw.replace(/\[([^\[\]]*)\]/gi, function (m, g, o, s) {
        var col = _this.characters[g.toLowerCase()];
        if (_this.bootstrapColors.indexOf(col) == -1) return "<span style=\"color: " + col + "\"><b>" + g + "</b></span>";
        return "<span class=\"text-" + col + "\"><b>" + g + "</b></span>";
      });
      return raw;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!this.contentAnchor || !this.titleAnchor || !this.progressAnchor) {
        console.log("Missing Anchors, Aborting render");
        return;
      }
      var chapter = this.chapters[this.currentChapter];
      var renderedContent = this.markdownify(this.currentChapter);
      this.contentAnchor.innerHTML = renderedContent;
      this.titleAnchor.innerText = this.currentChapter + 1 + ". " + chapter.title;
      var p = (this.currentChapter + 1) / this.chapters.length;
      p *= 100;
      p += "%";
      this.progressAnchor.style.width = p;
      // set up jump links
      var links = document.getElementsByClassName("jmp-link");
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var e = _step.value;

          e.addEventListener("click", function () {
            _this2.jump(parseInt(e.id.split("-")[2]) - 1);
          });
        };

        for (var _iterator = links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "next",
    value: function next() {
      if (this.currentChapter >= this.chapters.length - 1) return;
      this.currentChapter++;
      this.render();
    }
  }, {
    key: "prev",
    value: function prev() {
      if (this.currentChapter <= 0) return;
      this.currentChapter--;
      this.render();
    }
  }, {
    key: "jump",
    value: function jump(ch) {
      if (ch > this.chapters.length - 1) return;
      if (ch < 0) return;
      this.currentChapter = ch;
      this.render();
    }
  }]);

  return Story;
}();

module.exports = Story;

/***/ }),

/***/ "./src/Terminal.js":
/*!*************************!*\
  !*** ./src/Terminal.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tools = __webpack_require__(/*! ./Tools */ "./src/Tools.js");

var Terminal = function () {
  function Terminal(inputAnchor, outputAnchor) {
    var _this = this;

    _classCallCheck(this, Terminal);

    this.output = outputAnchor;
    this.input = inputAnchor;
    this.scrollPos = 0;
    this.playersDash = null;
    this.commands = [[/roll (\d+) d(\d+)/, this.rollDice], [/r (\d+) d(\d+)/, this.rollDice], [/clear/, this.clear], [/test (.*)/, this.testCommand], [/(\w+) check for \[([^\[\]]+)\]/, this.statCheck]];
    this.pos = null;
    this.history = [];
    this.input.addEventListener("keydown", function (event) {
      return _this.registerKeyDown(event);
    });
  }

  _createClass(Terminal, [{
    key: "registerKeyDown",
    value: function registerKeyDown(event) {
      var key = event.keyCode || event.charCode;
      // up/down
      if (key == 38 || key == 40) {
        if (this.history.length == 0) return;
        if (key == 38) {
          if (this.pos === null) this.pos = this.history.length - 1;else if (this.pos > 0) this.pos--;
        } else {
          if (this.pos === null) return;else if (this.pos < this.history.length - 1) this.pos++;else if (this.pos == this.history.length - 1) {
            this.pos = null;
            this.input.value = "";
            return;
          }
        }
        this.input.value = this.history[this.pos];
      } else {
        this.pos = null;
      }
      // enter
      if (key == 13) this.execute();
    }
  }, {
    key: "writeOutput",
    value: function writeOutput(t) {
      var result = document.createElement("p");
      result.className = "lead";
      result.style.fontSize = "1rem";
      result.style.margin = "0px";
      result.innerText = t;
      this.output.appendChild(result);
      this.scrollPos += result.clientHeight;
      this.output.scrollTop = this.scrollPos;
    }
  }, {
    key: "writeError",
    value: function writeError(t) {
      var result = document.createElement("p");
      result.className = "lead text-danger";
      result.style.fontSize = "1rem";
      result.style.margin = "0px";
      result.innerText = t;
      this.output.appendChild(result);
      this.scrollPos += result.clientHeight;
      this.output.scrollTop = this.scrollPos;
    }
  }, {
    key: "execute",
    value: function execute() {
      var cmd = this.input.value;
      this.history.push(cmd);
      cmd = cmd.toLowerCase().replace(/\s+/, " ");
      var l = this.commands.map(function (x) {
        return [x[0].exec(cmd), x[1]];
      }).filter(function (x) {
        return x[0];
      });
      var m = null;
      if (l.length > 0) m = l[0];else this.writeError("Unknown Command");
      if (m) m[1].bind(this)(m[0].slice(1));
      this.input.value = "";
    }
  }, {
    key: "autoType",
    value: function autoType(execString) {
      this.input.value = execString;
      this.execute();
    }
    // commands

  }, {
    key: "statCheck",
    value: function statCheck(args) {
      var stat = args[0];
      var player = args[1];
      var character = this.playersDash.getCharacter(player);
      if (!character) {
        this.writeError("Unknown Player '" + player + "'");
        return;
      }
      var base = tools.getRndInteger(1, 20);
      var abilityMod = character.abilityCheck(stat);
      var saveMod = character.savingThrow(stat);
      var abilityRoll = base + abilityMod;
      var saveRoll = base + saveMod;
      if (abilityMod >= 0) abilityMod = "+" + abilityMod;
      if (saveMod >= 0) saveMod = "+" + saveMod;
      this.writeOutput(player + " " + stat + " ability check:  " + abilityRoll + " (" + base + abilityMod + ")");
      this.writeOutput(player + " " + stat + " saving throw:  " + saveRoll + " (" + base + saveMod + ")");
    }
  }, {
    key: "clear",
    value: function clear() {
      this.output.innerHTML = "";
      this.scrollPos = 0;
    }
  }, {
    key: "rollDice",
    value: function rollDice(args) {
      var n = parseInt(args[0]);
      var d = parseInt(args[1]);
      var rolls = Array(n).fill(0).map(function (x) {
        return tools.getRndInteger(1, d);
      });
      if (n > 1) {
        this.writeOutput(tools.sum(rolls) + " (" + rolls.join("+") + ")");
        return;
      }
      this.writeOutput(tools.sum(rolls));
    }
  }, {
    key: "testCommand",
    value: function testCommand(args) {
      if (args[0] == "throw") {
        var modalVDN = tools.makeDivVDN();
        modalVDN.addText("h1", "LOL", "lead", "1rem");
        tools.throwModal(modalVDN);
      }
    }
  }]);

  return Terminal;
}();

module.exports = Terminal;

/***/ }),

/***/ "./src/Tools.js":
/*!**********************!*\
  !*** ./src/Tools.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function watched(o, change) {
  var handler = {
    set: function set(obj, prop, value) {
      obj[prop] = value;
      change(obj);
    }
  };
  return new Proxy(o, handler);
}

function VDN(tagName) {
  return {
    style: {},
    root: {},
    attributes: {},
    children: [],
    events: {},
    tag: tagName,
    get first() {
      return this.children[0];
    },
    get second() {
      return this.children[1];
    },
    setDim: function setDim(w, h) {
      this.style.width = w;
      this.style.height = h;
      return this;
    },
    setMargin: function setMargin() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { left: "0rem", right: "0rem", top: "0rem", bottom: "0rem" },
          left = _ref.left,
          right = _ref.right,
          top = _ref.top,
          bottom = _ref.bottom;

      this.style.marginLeft = left;
      this.style.marginRight = right;
      this.style.marginTop = top;
      this.style.marginBottom = bottom;
      return this;
    },
    addChild: function addChild(c) {
      this.children.push(c);
      return this;
    },
    addText: function addText(tag, text, className, size) {
      var t = VDN(tag);
      t.root.innerHTML = text;
      t.style.fontSize = size;
      t.root.className = className;
      t.style.margin = "0px";
      this.addChild(t);
      return this;
    },
    bind: function bind(e, handler) {
      this.events[e] = handler;
    },
    render: function render() {
      var e = document.createElement(this.tag);
      for (var k in this.attributes) {
        e.setAttribute(k, this.attributes[k]);
      }for (var _k in this.style) {
        e.style[_k] = this.style[_k];
      }for (var _k2 in this.root) {
        e[_k2] = this.root[_k2];
      }var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          e.appendChild(child.render());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      for (var _k3 in this.events) {
        e.addEventListener(_k3, this.events[_k3]);
      }return e;
    }
  };
}

function makeDivVDN() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { className: "" },
      className = _ref2.className;

  var d = VDN("div");
  d.root.className = className;
  return d;
}

function makeFlexVDN(dir, jc, ai) {
  var div = VDN("div");
  div.style.display = "flex";
  div.style.flexDirection = dir;
  div.style.justifyContent = jc;
  div.style.alignItems = ai;
  return div;
}

function makeIconVDN(i, tt) {
  var a = VDN("a");
  a.attributes["data-balloon"] = tt;
  a.attributes["data-balloon-pos"] = "up";
  var icon = VDN("i");
  icon.root.className = "mdi mdi-" + i;
  icon.style.color = "#777";
  icon.style.fontSize = "0.9rem";
  a.addChild(icon);
  return a;
}

function getRndInteger(min, max) {
  max += 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

function sum(l) {
  return l.reduce(function (v, a) {
    return a + v;
  });
}

function closeModal() {
  var toDie = document.getElementById("thrownModal");
  toDie.style.display = "none";
  document.body.removeChild(toDie);
  document.getElementById("filter").style.display = "none";
}

function throwModal(m) {
  if (document.getElementById("thrownModal") === undefined) return;
  document.getElementById("filter").style.display = "block";
  var container = makeDivVDN({ className: "thrown-modal" });
  container.root.id = "thrownModal";
  var top = makeDivVDN({ className: "header" });
  var bottom = makeDivVDN({ className: "content" });
  var i = makeIconVDN("close", "close");
  i.bind("click", closeModal);
  i.root.className = "hoverable";
  i.children[0].style.fontSize = "1.2rem";
  i.attributes["data-balloon-pos"] = "left";
  top.addChild(i);
  bottom.addChild(m);
  container.addChild(top);
  container.addChild(bottom);
  container.style.padding = "1rem";
  document.body.appendChild(container.render());
}

module.exports = {
  VDN: VDN,
  makeDivVDN: makeDivVDN,
  makeFlexVDN: makeFlexVDN,
  makeIconVDN: makeIconVDN,
  watched: watched,
  sum: sum,
  getRndInteger: getRndInteger,
  throwModal: throwModal,
  closeModal: closeModal
};

/***/ }),

/***/ "./src/data/test_characters.json":
/*!***************************************!*\
  !*** ./src/data/test_characters.json ***!
  \***************************************/
/*! exports provided: 0, 1, 2, 3, default */
/***/ (function(module) {

module.exports = [{"name":"Garfield","type":"NPC","race":"kitty","level":1,"class":"bard","stats":{"str":13,"dex":13,"con":11,"int":6,"wis":10,"chr":16},"baseStats":{"initative":null,"speed":null,"armourClass":null},"baseHP":20,"maxHP":20,"tempHP":0,"shown":true},{"name":"Kinky McKinkerson","type":"Player","race":"human","level":69,"class":"bard","stats":{"str":13,"dex":13,"con":11,"int":6,"wis":10,"chr":16},"baseStats":{"initative":null,"speed":null,"armourClass":null},"baseHP":20,"maxHP":20,"tempHP":0,"shown":true},{"name":"Daniel ShopKeep III","type":"NPC","race":"wood elf","level":10,"class":"bard","stats":{"str":13,"dex":13,"con":11,"int":6,"wis":10,"chr":16},"baseStats":{"initative":null,"speed":null,"armourClass":null},"baseHP":20,"maxHP":20,"tempHP":0,"shown":true},{"name":"evil motherfucker","type":"Enemy","race":"orc","level":9,"class":"bard","stats":{"str":13,"dex":13,"con":11,"int":6,"wis":10,"chr":16},"baseStats":{"initative":null,"speed":null,"armourClass":null},"hp":10,"maxHP":20,"tempHP":0,"shown":false}];

/***/ }),

/***/ "./src/data/test_story.json":
/*!**********************************!*\
  !*** ./src/data/test_story.json ***!
  \**********************************/
/*! exports provided: currentChapter, characters, chapters, default */
/***/ (function(module) {

module.exports = {"currentChapter":0,"characters":{"brad":"danger","nina":"info","mario":"warning"},"chapters":[{"title":"The Beginning","raw":"it all started on a _dark and stormy night_, [brad] was in *love* with [nina].Not to mention that [brad] was a bit of a dickhead lets be honest---[brad]     \"woah! I love you!\"[nina]  \"no way hozay!\"---If the bard minds his own buisness go to chapter 2 <2> If the bard seduces cause of course he does, go to chapter 3 <3>"},{"title":"The Middle","raw":"[Nina] attacked [brad], using [mario] [mario]\"HIYAH!\""},{"title":"The End","raw":"You all die. Honestly what the _fuck_"}]};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var tools = __webpack_require__(/*! ./Tools */ "./src/Tools.js");
var Story = __webpack_require__(/*! ./Story */ "./src/Story.js");
var test_story = __webpack_require__(/*! ./data/test_story.json */ "./src/data/test_story.json");
var Terminal = __webpack_require__(/*! ./Terminal */ "./src/Terminal.js");
var PlayersDash = __webpack_require__(/*! ./PlayersDash */ "./src/PlayersDash.js");
var Character = __webpack_require__(/*! ./Character */ "./src/Character.js");
var characters = __webpack_require__(/*! ./data/test_characters.json */ "./src/data/test_characters.json");

// globals
var story = null;
var terminal = null;
var playersDash = null;

function storyDriver() {
  var content = document.getElementById("story-content");
  var title = document.getElementById("story-title");
  var progress = document.getElementById("story-progress");
  story = new Story(content, title, progress);
  story.loadFromJson(test_story);
  document.getElementById("chapter-next").addEventListener("click", function () {
    return story.next();
  });
  document.getElementById("chapter-previous").addEventListener("click", function () {
    return story.prev();
  });
  story.render();
}

function terminalDriver() {
  var input = document.getElementById("terminal-input");
  var output = document.getElementById("terminal-output");
  terminal = new Terminal(input, output);
}

function playersDashDriver() {
  var cards = ['character-left', 'character-middle', 'character-right'];
  cards = cards.map(function (x) {
    return document.getElementById(x);
  });
  // TODO: remove cross dependency (kinda ruins encapsulation)
  playersDash = new PlayersDash(cards, terminal);
  terminal.playersDash = playersDash;
  characters.map(function (x) {
    var c = new Character();
    c.buildFromJson(x);
    playersDash.newCharacter(c);
  });
}
// init
function init() {
  storyDriver();
  terminalDriver();
  playersDashDriver();
  var dev = true;

  // hot reloading
  if (dev) {
    var socket = io.connect('http://127.0.0.1:5000');
    socket.on('message', function () {
      console.log("TIME FOR A CHEEKY RELOAD LADS");
    });
  }
}

window.onload = init;

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map