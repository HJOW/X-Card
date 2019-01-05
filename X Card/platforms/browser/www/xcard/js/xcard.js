var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var jqo = {
    warnJQuery: function () { hjow_alert("Need jQuery to run this. Please call 'jq = $;' first."); },
    hide: function () { this.warnJQuery(); return self; },
    show: function () { this.warnJQuery(); return self; },
    css: function (a, b) { this.warnJQuery(); return self; },
    html: function (a) { this.warnJQuery(); return self; },
    each: function (a) { this.warnJQuery(); },
    find: function (a) { this.warnJQuery(); return self; },
    attr: function (a, b) {
        if (b === void 0) { b = null; }
        this.warnJQuery();
        return "";
    },
    prop: function (a, b) {
        if (b === void 0) { b = false; }
        this.warnJQuery();
        return "";
    },
    removeAttr: function (a) { this.warnJQuery(); return self; },
    removeProp: function (a) { this.warnJQuery(); return self; },
    remove: function () { this.warnJQuery(); return self; },
    append: function (a) { this.warnJQuery(); return self; },
    removeClass: function (a) { this.warnJQuery(); return self; },
    addClass: function (a) { this.warnJQuery(); return self; },
    val: function (a) { this.warnJQuery(); return ""; },
    length: 0,
    width: function (a) { this.warnJQuery(); return 0; },
    height: function (a) { this.warnJQuery(); return 0; },
    is: function (a) { this.warnJQuery(); return false; },
    dialog: function () { this.warnJQuery(); return self; },
    isArray: function (a) { this.warnJQuery(); return Array.isArray(a); }
};
var jq = function (obj) {
    return jqo;
};
var hjow_onRefreshComponents = null;
var UtilityMethods = (function () {
    function UtilityMethods() {
    }
    UtilityMethods.prototype.parseBoolean = function (val) {
        return hjow_parseBoolean(val);
    };
    ;
    UtilityMethods.prototype.getSelfObject = function () {
        return this;
    };
    ;
    return UtilityMethods;
}());
;
var Uniqueable = (function (_super) {
    __extends(Uniqueable, _super);
    function Uniqueable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uniqueId = 'p' + Math.round(Math.random() * 999999999) + '' + Math.round(Math.random() * 999999999) + '' + Math.round(Math.random() * 999999999) + '' + Math.round(Math.random() * 999999999);
        return _this;
    }
    Uniqueable.prototype.getUniqueId = function () {
        return this.uniqueId;
    };
    return Uniqueable;
}(UtilityMethods));
;
var PropertiesEntry = (function (_super) {
    __extends(PropertiesEntry, _super);
    function PropertiesEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "";
        _this.value = "";
        return _this;
    }
    return PropertiesEntry;
}(UtilityMethods));
;
var Properties = (function (_super) {
    __extends(Properties, _super);
    function Properties() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entries = [];
        return _this;
    }
    Properties.prototype.put = function (key, value) {
        if (value == null) {
            this.remove(key);
            return null;
        }
        var newEntry = new PropertiesEntry();
        newEntry.key = key;
        newEntry.value = value;
        for (var idx = 0; idx < this.entries.length; idx++) {
            if (this.entries[idx].key == key) {
                this.entries[idx] = newEntry;
                return;
            }
        }
        this.entries.push(newEntry);
    };
    ;
    Properties.prototype.set = function (key, value) {
        this.put(String(key), String(value));
    };
    ;
    Properties.prototype.get = function (key) {
        for (var idx = 0; idx < this.entries.length; idx++) {
            if (this.entries[idx].key == key) {
                return this.entries[idx].value;
            }
        }
        return null;
    };
    ;
    Properties.prototype.remove = function (key) {
        var targetIdx = -1;
        var value = null;
        for (var idx = 0; idx < this.entries.length; idx++) {
            if (this.entries[idx].key == key) {
                targetIdx = idx;
                value = this.entries[idx].value;
                break;
            }
        }
        hjow_removeItemFromArray(this.entries, targetIdx);
        return value;
    };
    ;
    Properties.prototype.keyList = function () {
        var results = [];
        for (var idx = 0; idx < this.entries.length; idx++) {
            results.push(this.entries[idx].key);
        }
        return results;
    };
    ;
    Properties.prototype.clear = function () {
        this.entries = [];
    };
    ;
    Properties.prototype.serialize = function () {
        var results = {};
        for (var idx = 0; idx < this.entries.length; idx++) {
            hjow_putOnObject(results, this.entries[idx].key, this.entries[idx].value);
        }
        return JSON.stringify(results);
    };
    ;
    Properties.prototype.fromPlainObject = function (results) {
        var selfObj = this;
        hjow_iterateObject(results, function (propertyName, valueOfProperty) {
            selfObj.put(String(propertyName), String(valueOfProperty));
        });
    };
    ;
    Properties.prototype.fromJSON = function (str) {
        var results = JSON.parse(str);
        this.fromPlainObject(results);
    };
    ;
    return Properties;
}(Uniqueable));
;
var TBigInt = (function (_super) {
    __extends(TBigInt, _super);
    function TBigInt(obj) {
        var _this = _super.call(this) || this;
        _this.bigIntObj = null;
        if (obj instanceof TBigInt) {
            _this.bigIntObj = hjow_bigint(obj.bigIntObj);
        }
        else {
            _this.bigIntObj = hjow_bigint(obj);
        }
        return _this;
    }
    TBigInt.prototype.add = function (otherObj) {
        return new TBigInt(hjow_bigint_add(this.bigIntObj, otherObj.bigIntObj));
    };
    TBigInt.prototype.subtract = function (otherObj) {
        return new TBigInt(hjow_bigint_subtract(this.bigIntObj, otherObj.bigIntObj));
    };
    TBigInt.prototype.multiply = function (otherObj) {
        return new TBigInt(hjow_bigint_multiply(this.bigIntObj, otherObj.bigIntObj));
    };
    TBigInt.prototype.compare = function (otherObj) {
        return hjow_bigint_compare(this.bigIntObj, otherObj.bigIntObj);
    };
    TBigInt.prototype.divide = function (otherObj) {
        return new TBigInt(hjow_bigint_divide(this.bigIntObj, otherObj.bigIntObj));
    };
    TBigInt.prototype.abs = function () {
        return new TBigInt(hjow_bigint_abs(this.bigIntObj));
    };
    TBigInt.prototype.getNativeObject = function () {
        return this.bigIntObj;
    };
    TBigInt.prototype.toString = function () {
        return this.bigIntObj.toString();
    };
    return TBigInt;
}(UtilityMethods));
var XCardReplayAction = (function (_super) {
    __extends(XCardReplayAction, _super);
    function XCardReplayAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.date = null;
        _this.actionPlayerIndex = 0;
        _this.payTargetPlayerIndex = -1;
        _this.card = null;
        return _this;
    }
    XCardReplayAction.prototype.toPlainObject = function () {
        return {
            date: hjow_date_to_string(this.date),
            actionPlayerIndex: this.actionPlayerIndex,
            payTargetPlayerIndex: this.payTargetPlayerIndex,
            card: this.card
        };
    };
    XCardReplayAction.prototype.toPlainObjectDetail = function (engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        var results = this.toPlainObject();
        if (this.card != null)
            results.card = this.card.toPlainObjectDetail(engine);
        return results;
    };
    return XCardReplayAction;
}(UtilityMethods));
;
var XCardReplay = (function (_super) {
    __extends(XCardReplay, _super);
    function XCardReplay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.date = new Date();
        _this.actions = [];
        _this.players = [];
        _this.deck = [];
        _this.gameMode = null;
        _this.reason = null;
        return _this;
    }
    XCardReplay.prototype.toPlainObjectDetail = function (engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        var actionPlains = [];
        for (var adx = 0; adx < this.actions.length; adx++) {
            actionPlains.push(this.actions[adx].toPlainObjectDetail(engine));
        }
        var playersPlains = [];
        for (var pdx = 0; pdx < this.players.length; pdx++) {
            playersPlains.push(this.players[pdx].toPlainObject(engine));
        }
        var deckPlains = [];
        for (var ddx = 0; ddx < this.deck.length; ddx++) {
            deckPlains.push(this.deck[ddx].toPlainObjectDetail(engine));
        }
        return {
            date: hjow_date_to_string(this.date),
            actions: actionPlains,
            players: playersPlains,
            deck: deckPlains,
            gameMode: this.gameMode,
            reason: this.reason
        };
    };
    ;
    return XCardReplay;
}(UtilityMethods));
;
var XCardAIProcessAction = (function (_super) {
    __extends(XCardAIProcessAction, _super);
    function XCardAIProcessAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.calculatedAIPoint = null;
        return _this;
    }
    return XCardAIProcessAction;
}(XCardReplayAction));
var LanguageSet = (function (_super) {
    __extends(LanguageSet, _super);
    function LanguageSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.locale = null;
        _this.localeAlt = null;
        _this.localeName = null;
        _this.stringTable = null;
        return _this;
    }
    LanguageSet.prototype.translate = function (target) {
        var results = this.stringTable.get(target);
        if (results == null) {
            hjow_log(target);
            return target;
        }
        return results;
    };
    return LanguageSet;
}(UtilityMethods));
;
var hjow_languageSets = [];
var hjow_selectedLocale = null;
var hjow_langSelectFirst = true;
function hjow_getCurrentLanguageSet() {
    var browserLocale = hjow_getLocaleInfo();
    if (hjow_selectedLocale != null) {
        for (var ldx = 0; ldx < hjow_languageSets.length; ldx++) {
            if (hjow_selectedLocale == hjow_languageSets[ldx].locale || hjow_selectedLocale == hjow_languageSets[ldx].localeAlt) {
                return hjow_languageSets[ldx];
            }
        }
    }
    if (typeof (browserLocale) == 'undefined' || browserLocale == null)
        return null;
    var currentLocale = browserLocale;
    if (currentLocale == null || currentLocale.length <= 0)
        return null;
    for (var idx = 0; idx < currentLocale.length; idx++) {
        for (var ldx = 0; ldx < hjow_languageSets.length; ldx++) {
            if (currentLocale[idx] == hjow_languageSets[ldx].locale || currentLocale[idx] == hjow_languageSets[ldx].localeAlt) {
                hjow_selectedLocale = hjow_languageSets[ldx].locale;
                return hjow_languageSets[ldx];
            }
        }
    }
    if (hjow_langSelectFirst) {
        hjow_selectedLocale = "en";
        hjow_langSelectFirst = false;
        return hjow_getCurrentLanguageSet();
    }
    return null;
}
;
function hjow_trans(target) {
    var langSet = hjow_getCurrentLanguageSet();
    if (langSet == null) {
        hjow_log(target);
        return target;
    }
    return langSet.translate(target);
}
;
var ModuleObject = (function (_super) {
    __extends(ModuleObject, _super);
    function ModuleObject(name, desc) {
        var _this = _super.call(this) || this;
        _this.name = "";
        _this.desc = "";
        _this.startDate = null;
        _this.properties = null;
        _this.name = name;
        _this.desc = desc;
        _this.startDate = new Date();
        _this.properties = new Properties();
        return _this;
    }
    ;
    ModuleObject.prototype.getClassName = function () {
        return "ModuleObject";
    };
    ;
    ModuleObject.prototype.getName = function () {
        return this.name;
    };
    ;
    ModuleObject.prototype.getDescription = function () {
        return this.desc;
    };
    ;
    ModuleObject.prototype.detail = function (htmlForm) {
        var results = this.name + "\n\n" + this.desc + "\n\n" + this.startDate;
        if (htmlForm)
            results = hjow_htmlForm(results);
        return results;
    };
    ;
    ModuleObject.prototype.setProperty = function (key, value) {
        this.properties.put(key, value);
    };
    ;
    ModuleObject.prototype.getProperty = function (key) {
        return this.properties.get(key);
    };
    ;
    ModuleObject.prototype.clearProperties = function () {
        this.properties.clear();
    };
    ;
    ModuleObject.prototype.propertyKeys = function () {
        return this.properties.keyList();
    };
    ;
    return ModuleObject;
}(Uniqueable));
;
var IntervalTimer = (function (_super) {
    __extends(IntervalTimer, _super);
    function IntervalTimer(name, desc, func, timeGap) {
        if (timeGap === void 0) { timeGap = 1000; }
        var _this = _super.call(this, name, desc) || this;
        _this.timerRef = 0;
        _this.alives = false;
        _this.timerRef = setInterval(func, timeGap);
        _this.alives = true;
        return _this;
    }
    ;
    IntervalTimer.prototype.getClassName = function () {
        return "IntervalTimer";
    };
    ;
    IntervalTimer.prototype.isAlive = function () {
        return this.alives;
    };
    ;
    IntervalTimer.prototype.stop = function () {
        clearInterval(this.timerRef);
        this.alives = false;
    };
    ;
    return IntervalTimer;
}(ModuleObject));
;
var ImportantTimer = (function (_super) {
    __extends(ImportantTimer, _super);
    function ImportantTimer(name, desc, func, timeGap) {
        if (timeGap === void 0) { timeGap = 1000; }
        return _super.call(this, name, desc, func, timeGap) || this;
    }
    ImportantTimer.prototype.getClassName = function () {
        return "ImportantTimer";
    };
    ;
    return ImportantTimer;
}(IntervalTimer));
;
var XCard = (function (_super) {
    __extends(XCard, _super);
    function XCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.no = 0;
        _this.op = '';
        return _this;
    }
    XCard.prototype.apply = function (beforeVal) {
        if (this.op == '+' || this.op == '＋')
            return new TBigInt(beforeVal).add(new TBigInt(this.no));
        if (this.op == '-' || this.op == '－')
            return new TBigInt(beforeVal).subtract(new TBigInt(this.no));
        if (this.op == '*' || this.op == '×')
            return new TBigInt(beforeVal).multiply(new TBigInt(this.no));
        return beforeVal;
    };
    XCard.prototype.clone = function () {
        var newOne = new XCard();
        newOne.no = this.no;
        newOne.op = this.op;
        return newOne;
    };
    XCard.prototype.toString = function () {
        var result = this.op + " ";
        if (this.no < 0)
            result += '(' + this.no + ')';
        else
            result += this.no + '';
        return result;
    };
    XCard.prototype.toPlainObject = function () {
        var result = {
            op: this.op,
            no: this.no,
            toString: function () {
                var resultStr = this.op + " ";
                if (this.no < 0)
                    resultStr += '(' + this.no + ')';
                else
                    resultStr += this.no + '';
                return resultStr;
            }
        };
        return result;
    };
    XCard.prototype.toPlainObjectDetail = function (engine) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        var result = this.toPlainObject();
        result.uniqueId = this.uniqueId;
        return result;
    };
    XCard.prototype.setUniqueId = function (engine, uniqueId) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        this.uniqueId = uniqueId;
    };
    return XCard;
}(Uniqueable));
;
var XCardPlayer = (function (_super) {
    __extends(XCardPlayer, _super);
    function XCardPlayer(name) {
        var _this = _super.call(this) || this;
        _this.name = "";
        _this.inventory = [];
        _this.applied = [];
        _this.name = name;
        return _this;
    }
    ;
    XCardPlayer.prototype.getClassName = function () {
        return "XCardPlayer";
    };
    ;
    XCardPlayer.prototype.getName = function () {
        return this.name;
    };
    ;
    XCardPlayer.prototype.setInventory = function (cardList, engine) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        this.inventory = cardList;
    };
    ;
    XCardPlayer.prototype.setApplied = function (cardList, engine) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        this.applied = cardList;
    };
    ;
    XCardPlayer.prototype.lastAppliedCard = function () {
        if (this.applied.length == 0)
            return null;
        return this.applied[this.applied.length - 1];
    };
    ;
    XCardPlayer.prototype.findInventoryCard = function (engine, cardUniqId) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        for (var idx = 0; idx < this.inventory.length; idx++) {
            if (this.inventory[idx].getUniqueId() == cardUniqId) {
                return this.inventory[idx];
            }
        }
        return null;
    };
    ;
    XCardPlayer.prototype.listInventoryDirect = function (engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        var newList = [];
        for (var idx = 0; idx < this.inventory.length; idx++) {
            newList.push(this.inventory[idx]);
        }
        return newList;
    };
    ;
    XCardPlayer.prototype.listInventory = function () {
        var newList = [];
        for (var idx = 0; idx < this.inventory.length; idx++) {
            newList.push(this.inventory[idx].clone());
        }
        return newList;
    };
    ;
    XCardPlayer.prototype.listInventoryPlainObject = function () {
        var newList = [];
        for (var idx = 0; idx < this.inventory.length; idx++) {
            newList.push(this.inventory[idx].toPlainObject());
        }
        return newList;
    };
    ;
    XCardPlayer.prototype.listAppliedDirect = function (engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        var newList = [];
        for (var idx = 0; idx < this.applied.length; idx++) {
            newList.push(this.applied[idx]);
        }
        return newList;
    };
    ;
    XCardPlayer.prototype.listApplied = function () {
        var newList = [];
        for (var idx = 0; idx < this.applied.length; idx++) {
            newList.push(this.applied[idx].clone());
        }
        return newList;
    };
    ;
    XCardPlayer.prototype.listAppliedPlainObject = function () {
        var newList = [];
        for (var idx = 0; idx < this.applied.length; idx++) {
            newList.push(this.applied[idx].toPlainObject());
        }
        return newList;
    };
    ;
    XCardPlayer.prototype.listAppliedAsString = function () {
        var affects = "0";
        var lastOp = "+";
        for (var idx = 0; idx < this.applied.length; idx++) {
            var cardOne = this.applied[idx];
            var needSealBlacket = false;
            if (lastOp == '+' || lastOp == '＋' || lastOp == '-' || lastOp == '－') {
                if (!(cardOne.op == '+' || cardOne.op == '＋' || cardOne.op == '-' || cardOne.op == '－')) {
                    needSealBlacket = true;
                }
            }
            else {
                if (cardOne.op == '+' || cardOne.op == '＋' || cardOne.op == '-' || cardOne.op == '－') {
                    needSealBlacket = true;
                }
            }
            if (needSealBlacket)
                affects = "(" + affects + ")";
            affects += " " + cardOne.op + " ";
            if (cardOne.no < 0)
                affects += " (" + cardOne.no + ")";
            else
                affects += " " + cardOne.no;
            lastOp = cardOne.op;
        }
        return affects;
    };
    ;
    XCardPlayer.prototype.removeCardOnInventory = function (card) {
        var ownerInvIdx = 0;
        for (var idx = 0; idx < this.inventory.length; idx++) {
            if (this.inventory[idx].getUniqueId() == card.getUniqueId()) {
                ownerInvIdx = idx;
                break;
            }
        }
        hjow_removeItemFromArray(this.inventory, ownerInvIdx);
    };
    ;
    XCardPlayer.prototype.addOneOnInventory = function (card, engine) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        this.inventory.push(card);
    };
    ;
    XCardPlayer.prototype.getInventoryCardCount = function () {
        return this.inventory.length;
    };
    ;
    XCardPlayer.prototype.resetCards = function () {
        this.inventory = [];
        this.applied = [];
    };
    ;
    XCardPlayer.prototype.canPay = function (card, owner) {
        var lastCard = this.lastAppliedCard();
        if (card == null || owner == null)
            return hjow_trans("Please select your card first.");
        if (lastCard == null)
            return null;
        if (lastCard.no == 7 && owner.getUniqueId() != this.getUniqueId()) {
            return hjow_trans("7-Protected slot. Only the owner can pay here now.");
        }
        if (card.no == 1)
            return null;
        if (lastCard.no == card.no)
            return null;
        if (lastCard.op == card.op)
            return null;
        return hjow_replaceStr(hjow_trans("The number, or the operation symbol should equal to the card [[LASTCARD]]"), "[[LASTCARD]]", lastCard.toString());
    };
    ;
    XCardPlayer.prototype.canPayByUniqId = function (cardUniqId, owner) {
        var card = null;
        if (cardUniqId == null)
            return hjow_trans("Please select your card first.");
        for (var idx = 0; idx < owner.inventory.length; idx++) {
            if (owner.inventory[idx].getUniqueId() == cardUniqId) {
                card = owner.inventory[idx];
            }
        }
        return this.canPay(card, owner);
    };
    ;
    XCardPlayer.prototype.pay = function (card, owner) {
        var lastCard = this.lastAppliedCard();
        var err = this.canPay(card, owner);
        if (err != null)
            return err;
        this.applied.push(card);
        owner.removeCardOnInventory(card);
        return null;
    };
    ;
    XCardPlayer.prototype.payByUniqId = function (cardUniqId, owner) {
        var card = null;
        if (cardUniqId == null)
            return hjow_trans("Please select your card first.");
        for (var idx = 0; idx < owner.inventory.length; idx++) {
            if (owner.inventory[idx].getUniqueId() == cardUniqId) {
                card = owner.inventory[idx];
            }
        }
        return this.pay(card, owner);
    };
    ;
    XCardPlayer.prototype.getCurrentPoint = function (gameMode) {
        var results = new TBigInt(0);
        for (var idx = 0; idx < this.applied.length; idx++) {
            var cardOne = this.applied[idx];
            results = cardOne.apply(results);
        }
        return gameMode.processPoint(this, results);
    };
    ;
    XCardPlayer.prototype.getCurrentPointIfPaid = function (gameMode, additionalCard) {
        var results = new TBigInt(0);
        var simulatedApplied = [];
        for (var idx = 0; idx < this.applied.length; idx++) {
            simulatedApplied.push(this.applied[idx]);
        }
        simulatedApplied.push(additionalCard);
        for (var idx = 0; idx < simulatedApplied.length; idx++) {
            var cardOne = simulatedApplied[idx];
            results = cardOne.apply(results);
        }
        return gameMode.processPoint(this, results);
    };
    ;
    XCardPlayer.prototype.customMainHTML = function () {
        return null;
    };
    ;
    XCardPlayer.prototype.customGameHTML = function () {
        return null;
    };
    ;
    XCardPlayer.prototype.applyInputs = function (engine, gameStarted, needHideScreen, showResult) {
    };
    ;
    XCardPlayer.prototype.refreshMain = function (engine) {
    };
    ;
    XCardPlayer.prototype.refreshGame = function (engine) {
    };
    ;
    XCardPlayer.prototype.getPlayerTypeName = function () {
        return null;
    };
    ;
    XCardPlayer.prototype.isUserControllable = function () {
        return true;
    };
    ;
    XCardPlayer.prototype.needToHideInventoryForSelf = function () {
        return false;
    };
    ;
    XCardPlayer.prototype.actOnTurn = function (engine, mode, deck, players, turnNumber) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
    };
    ;
    XCardPlayer.prototype.setName = function (name, engine) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        if (!this.isNameEditable())
            return;
        this.name = name;
    };
    ;
    XCardPlayer.prototype.isNameEditable = function () {
        return true;
    };
    ;
    XCardPlayer.prototype.setUniqueId = function (uniqueId) {
        this.uniqueId = uniqueId;
    };
    ;
    XCardPlayer.prototype.setUniqueIdFromMode = function (mode, uniqueId) {
        if (mode == null)
            return;
        if (!(mode instanceof XCardGameMode))
            return;
        this.uniqueId = uniqueId;
    };
    ;
    XCardPlayer.prototype.toPlainObject = function (engine) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        var invArr = [];
        for (var idx = 0; idx < this.inventory.length; idx++) {
            invArr.push(this.inventory[idx].toPlainObjectDetail(engine));
        }
        var appArr = [];
        for (var adx = 0; adx < this.applied.length; adx++) {
            appArr.push(this.applied[adx].toPlainObjectDetail(engine));
        }
        return {
            type: "Undefined",
            name: this.name,
            inventory: invArr,
            applied: appArr,
            uniqueId: this.getUniqueId()
        };
    };
    ;
    return XCardPlayer;
}(Uniqueable));
;
var XCardPlayerCreator = (function (_super) {
    __extends(XCardPlayerCreator, _super);
    function XCardPlayerCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XCardPlayerCreator.prototype.getTypeName = function () {
        return null;
    };
    ;
    XCardPlayerCreator.prototype.getSupportPlayerClassName = function () {
        return null;
    };
    ;
    XCardPlayerCreator.prototype.create = function (name) {
        return null;
    };
    ;
    XCardPlayerCreator.prototype.restoreFromPlainObject = function (obj, engine) {
        return null;
    };
    ;
    XCardPlayerCreator.prototype.restoreFromJSON = function (json, engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        return this.restoreFromPlainObject(JSON.parse(json), engine);
    };
    ;
    XCardPlayerCreator.prototype.isUserSelect = function () {
        return true;
    };
    ;
    return XCardPlayerCreator;
}(Uniqueable));
;
var XCardUserPlayer = (function (_super) {
    __extends(XCardUserPlayer, _super);
    function XCardUserPlayer(name) {
        return _super.call(this, name) || this;
    }
    ;
    XCardUserPlayer.prototype.getClassName = function () {
        return "XCardUserPlayer";
    };
    ;
    XCardUserPlayer.prototype.getPlayerTypeName = function () {
        return "Player";
    };
    ;
    XCardUserPlayer.prototype.toPlainObject = function (engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        var result = _super.prototype.toPlainObject.call(this, engine);
        result.type = this.getClassName();
        return result;
    };
    ;
    XCardUserPlayer.prototype.setUniqueIdFromCreator = function (creator, uniqueId) {
        if (creator == null)
            return;
        if (!(creator instanceof XCardUserPlayerCreator))
            return;
        this.setUniqueId(uniqueId);
    };
    ;
    return XCardUserPlayer;
}(XCardPlayer));
;
var XCardUserPlayerCreator = (function (_super) {
    __extends(XCardUserPlayerCreator, _super);
    function XCardUserPlayerCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XCardUserPlayerCreator.prototype.getTypeName = function () {
        return "Player";
    };
    ;
    XCardUserPlayerCreator.prototype.create = function (name) {
        return new XCardUserPlayer(name);
    };
    ;
    XCardUserPlayerCreator.prototype.getSupportPlayerClassName = function () {
        return "XCardUserPlayer";
    };
    ;
    XCardUserPlayerCreator.prototype.restoreFromPlainObject = function (obj, engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        if (obj.type != this.getSupportPlayerClassName())
            return null;
        var result = new XCardUserPlayer(obj.name);
        result.setUniqueIdFromCreator(this, obj.uniqueId);
        var invArr = [];
        for (var idx = 0; idx < obj.inventory; idx++) {
            var newCard = new XCard();
            newCard.no = obj.inventory[idx].no;
            newCard.op = obj.inventory[idx].op;
            newCard.setUniqueId(engine, obj.inventory[idx].uniqueId);
            invArr.push(newCard);
        }
        result.setInventory(invArr, engine);
        var appArr = [];
        for (var adx = 0; adx < obj.applied; adx++) {
            var newCard = new XCard();
            newCard.no = obj.applied[adx].no;
            newCard.op = obj.applied[adx].op;
            newCard.setUniqueId(engine, obj.applied[adx].uniqueId);
            appArr.push(newCard);
        }
        result.setApplied(appArr, engine);
        return result;
    };
    ;
    return XCardUserPlayerCreator;
}(XCardPlayerCreator));
;
function hjow_orderPlayerList(players, gameMode) {
    var playerOrders = [];
    var temps = hjow_simpleCloneArray(players);
    var preventInfLoop = 0;
    while (temps.length > 0) {
        var maxVal = null;
        var maxIdx = -1;
        if (temps.length == 1) {
            playerOrders.push(temps[0]);
            temps = [];
            break;
        }
        else {
            for (var tdx2 = 0; tdx2 < temps.length; tdx2++) {
                var points = temps[tdx2].getCurrentPoint(gameMode);
                if (maxVal == null || new TBigInt(maxVal).compare(points) < 0) {
                    maxVal = String(points);
                    maxIdx = tdx2;
                }
            }
        }
        playerOrders.push(temps[maxIdx]);
        hjow_removeItemFromArray(temps, maxIdx);
        preventInfLoop++;
        if (preventInfLoop >= 1000 * Math.max(temps.length, 1)) {
            hjow_error("Infinite Loop Detected");
            break;
        }
    }
    return playerOrders;
}
;
var XCardAIPlayer = (function (_super) {
    __extends(XCardAIPlayer, _super);
    function XCardAIPlayer(name) {
        var _this = _super.call(this, name) || this;
        _this.difficulty = 0;
        _this.customAIScript = null;
        return _this;
    }
    ;
    XCardAIPlayer.prototype.getClassName = function () {
        return "XCardAIPlayer";
    };
    ;
    XCardAIPlayer.prototype.getPlayerTypeName = function () {
        return "AI";
    };
    ;
    XCardAIPlayer.prototype.isUserControllable = function () {
        return false;
    };
    ;
    XCardAIPlayer.prototype.needToHideInventoryForSelf = function () {
        return true;
    };
    ;
    XCardAIPlayer.prototype.setDifficulty = function (diff, engine) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        this.difficulty = diff;
    };
    ;
    XCardAIPlayer.prototype.setCustomAIScript = function (scripts, engine) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        this.customAIScript = scripts;
    };
    ;
    XCardAIPlayer.prototype.actOnTurn = function (engine, mode, deck, players, turnNumber) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this)))
            return;
        var currentPlayerTime = mode.getEachPlayerTimeLimit(this, engine);
        var timeLimitStd = Math.ceil(currentPlayerTime / 5.0);
        if (timeLimitStd <= 2)
            timeLimitStd = 2;
        var needToGetFromDeck = true;
        var targetPlayerUniqId = null;
        var targetCardUniqId = null;
        var needDefaultCalc = true;
        if (this.customAIScript != null && this.customAIScript != '') {
            var resultObj = eval(this.customAIScript);
            if (resultObj == null || typeof (resultObj) == 'undefined') {
                needDefaultCalc = true;
            }
            else if (resultObj.aiProcess == null || typeof (resultObj.aiProcess) == 'undefined') {
                needDefaultCalc = true;
            }
            else {
                resultObj = resultObj.aiProcess(engine, deck, players, currentPlayerTime);
                needToGetFromDeck = hjow_parseBoolean(resultObj.needToGetFromDeck);
                targetPlayerUniqId = String(resultObj.targetPlayer);
                targetCardUniqId = String(resultObj.targetCard);
                needDefaultCalc = false;
            }
        }
        if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this)))
            return;
        if (needDefaultCalc) {
            var availableActions = [];
            var oneAct = null;
            var offensives = 1;
            var defendees = 1;
            if (this.difficulty == 2)
                defendees = 2;
            if (this.difficulty == 1)
                defendees = 4;
            if (this.difficulty == 0)
                defendees = 8;
            oneAct = new XCardAIProcessAction();
            oneAct.card = null;
            oneAct.payTargetPlayerIndex = -1;
            oneAct.actionPlayerIndex = 0;
            oneAct.calculatedAIPoint = new TBigInt(0);
            var currentThisUserPoint = this.getCurrentPoint(mode);
            if (deck.length < Math.ceil(players.length / 2.0)) {
                for (var idx = 0; idx < players.length; idx++) {
                    if (players[idx].getUniqueId() == this.getUniqueId())
                        continue;
                    if (players[idx].getCurrentPoint(mode).compare(currentThisUserPoint) > 0) {
                        oneAct.calculatedAIPoint = oneAct.calculatedAIPoint.subtract(players[idx].getCurrentPoint(mode).subtract(currentThisUserPoint));
                    }
                    if (players[idx].getCurrentPoint(mode).compare(currentThisUserPoint) == 0) {
                        oneAct.calculatedAIPoint = oneAct.calculatedAIPoint.subtract(new TBigInt(1));
                    }
                }
            }
            oneAct.calculatedAIPoint = oneAct.calculatedAIPoint.subtract(new TBigInt(offensives));
            availableActions.push(oneAct);
            if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this)))
                return;
            var playerOrders = hjow_orderPlayerList(players, mode);
            var sumPoint = new TBigInt(0);
            var selfOrder = -1;
            for (var podx = 0; podx < playerOrders.length; podx++) {
                if (playerOrders[podx].getUniqueId() == this.getUniqueId()) {
                    selfOrder = podx;
                }
                sumPoint = sumPoint.add(playerOrders[podx].getCurrentPoint(mode));
            }
            var avgPoint = sumPoint.divide(new TBigInt(players.length));
            var bestPoint = playerOrders[0].getCurrentPoint(mode);
            var worstPoint = playerOrders[playerOrders.length - 1].getCurrentPoint(mode);
            var variancePoint = bestPoint.subtract(worstPoint);
            for (var cdx = 0; cdx < this.inventory.length; cdx++) {
                var invCard = this.inventory[cdx];
                for (var pdx = 0; pdx < players.length; pdx++) {
                    var playerOne = players[pdx];
                    var errMsg = playerOne.canPay(invCard, this);
                    if (errMsg != null)
                        continue;
                    var playerOneOrder = -1;
                    for (var podx2 = 0; podx2 < playerOrders.length; podx2++) {
                        if (playerOrders[podx2].getUniqueId() == playerOne.getUniqueId()) {
                            playerOneOrder = podx2;
                            break;
                        }
                    }
                    var actionPoint = null;
                    var beforePoint = playerOne.getCurrentPoint(mode);
                    var simulatedPoint = playerOne.getCurrentPointIfPaid(mode, invCard);
                    if (playerOne.getUniqueId() == this.getUniqueId()) {
                        actionPoint = simulatedPoint.multiply(new TBigInt(defendees));
                    }
                    else {
                        actionPoint = simulatedPoint.multiply(new TBigInt(-1)).multiply(new TBigInt(offensives));
                        if (beforePoint.compare(simulatedPoint) > 0) {
                            var orderStd = Math.ceil(players.length / 2.0);
                            if (selfOrder < playerOneOrder && Math.abs(playerOneOrder - selfOrder) >= orderStd) {
                                actionPoint = actionPoint.multiply(new TBigInt(2));
                                actionPoint = actionPoint.divide(new TBigInt(Math.round(Math.abs(playerOneOrder - selfOrder))).multiply(new TBigInt(10)));
                                actionPoint = actionPoint.divide(new TBigInt(2));
                                if (avgPoint.compare(beforePoint) > 0) {
                                    var targetPlayerGapAvg = avgPoint.subtract(beforePoint);
                                    if (targetPlayerGapAvg.abs().compare(variancePoint.abs().divide(new TBigInt(4))) > 0) {
                                        actionPoint = actionPoint.subtract(new TBigInt(-999999999));
                                    }
                                }
                            }
                        }
                    }
                    for (var pdx2 = 0; pdx2 < players.length; pdx2++) {
                        var playerAnother = players[pdx2];
                        if (playerAnother.getUniqueId() == playerOne.getUniqueId())
                            continue;
                        if (playerAnother.getUniqueId() == this.getUniqueId()) {
                            actionPoint = actionPoint.add(playerAnother.getCurrentPoint(mode));
                        }
                        else {
                            actionPoint = actionPoint.subtract(playerAnother.getCurrentPoint(mode));
                        }
                    }
                    oneAct = new XCardAIProcessAction();
                    oneAct.card = invCard;
                    oneAct.payTargetPlayerIndex = pdx;
                    oneAct.actionPlayerIndex = 0;
                    for (var pdx3 = 0; pdx3 < players.length; pdx3++) {
                        if (players[pdx3].getUniqueId() == this.getUniqueId()) {
                            oneAct.actionPlayerIndex = pdx3;
                            break;
                        }
                    }
                    oneAct.calculatedAIPoint = actionPoint;
                    availableActions.push(oneAct);
                    if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this)))
                        return;
                    if (engine.getLeftTime() < timeLimitStd)
                        break;
                }
                if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this)))
                    return;
                if (engine.getLeftTime() < timeLimitStd)
                    break;
            }
            var orderedActions = [];
            var maxPoints = new TBigInt("-99999999999999");
            var maxIdx = -1;
            var preventInfLoop = 0;
            while (availableActions.length >= 1) {
                if (availableActions.length == 1) {
                    orderedActions.push(availableActions[0]);
                    break;
                }
                else {
                    maxPoints = new TBigInt("-99999999999999");
                    maxIdx = -1;
                    for (var bdx = 0; bdx < availableActions.length; bdx++) {
                        var currentAction = availableActions[bdx];
                        if (maxPoints.compare(currentAction.calculatedAIPoint) < 0) {
                            maxPoints = currentAction.calculatedAIPoint;
                            maxIdx = bdx;
                        }
                    }
                    orderedActions.push(availableActions[maxIdx]);
                    hjow_removeItemFromArray(availableActions, maxIdx);
                }
                if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this)))
                    return;
                preventInfLoop++;
                if (preventInfLoop >= 1000 * Math.max(availableActions.length, 1)) {
                    hjow_error("Infinite Loop Detected");
                    break;
                }
            }
            if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this)))
                return;
            var selectedAct = null;
            var randomNo = Math.round(Math.random() * 100.0);
            if (this.difficulty >= 4) {
                selectedAct = orderedActions[0];
            }
            else if (this.difficulty == 3) {
                if (randomNo >= 10)
                    selectedAct = orderedActions[0];
                else if (orderedActions.length >= 2)
                    selectedAct = orderedActions[1];
                else
                    selectedAct = orderedActions[0];
            }
            else if (this.difficulty == 2) {
                if (randomNo >= 50)
                    selectedAct = orderedActions[0];
                else if (randomNo >= 10 && orderedActions.length >= 2)
                    selectedAct = orderedActions[1];
                else if (orderedActions.length >= 3)
                    selectedAct = orderedActions[2];
                else
                    selectedAct = orderedActions[0];
            }
            else if (this.difficulty == 1) {
                if (randomNo >= 65)
                    selectedAct = orderedActions[0];
                else if (randomNo >= 30 && orderedActions.length >= 2)
                    selectedAct = orderedActions[1];
                else if (randomNo >= 10 && orderedActions.length >= 3)
                    selectedAct = orderedActions[2];
                else if (randomNo >= 5 && orderedActions.length >= 4)
                    selectedAct = orderedActions[3];
                else
                    selectedAct = orderedActions[0];
            }
            else {
                if (randomNo >= 70)
                    selectedAct = orderedActions[0];
                else if (randomNo >= 60 && orderedActions.length >= 2)
                    selectedAct = orderedActions[1];
                else if (randomNo >= 50 && orderedActions.length >= 3)
                    selectedAct = orderedActions[2];
                else if (randomNo >= 20 && orderedActions.length >= 4)
                    selectedAct = orderedActions[3];
                else if (randomNo >= 5 && orderedActions.length >= 5)
                    selectedAct = orderedActions[4];
                else
                    selectedAct = orderedActions[0];
            }
            if (selectedAct == null || selectedAct.payTargetPlayerIndex < 0) {
                needToGetFromDeck = true;
            }
            else {
                needToGetFromDeck = false;
                targetPlayerUniqId = players[selectedAct.payTargetPlayerIndex].getUniqueId();
                targetCardUniqId = selectedAct.card.getUniqueId();
            }
        }
        if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this)))
            return;
        if (needToGetFromDeck || targetPlayerUniqId == null || targetCardUniqId == null || targetPlayerUniqId == '' || targetCardUniqId == '') {
            engine.getSelfObject().events.game.btn_get_from_deck();
            return;
        }
        var errMsg = engine.payHere(targetPlayerUniqId, targetCardUniqId);
        if (errMsg != null) {
            engine.getSelfObject().events.game.btn_get_from_deck();
            return;
        }
    };
    ;
    XCardAIPlayer.prototype.customMainHTML = function () {
        var results = "";
        results += "<div class='div_player_ai_custom'>";
        results += "<div class='div_player_ai_custom_element'>";
        results += "<span class='label'>" + hjow_trans("Difficulty") + "</span> ";
        results += "<select class='sel_ai_difficulty'>";
        for (var idx = 0; idx <= 4; idx++) {
            var difficultyStr = "";
            if (idx <= 0)
                difficultyStr = hjow_trans("Easy");
            if (idx == 1)
                difficultyStr = hjow_trans("Normal");
            if (idx == 2)
                difficultyStr = hjow_trans("Hard");
            if (idx == 3)
                difficultyStr = hjow_trans("Extreme");
            if (idx >= 4)
                difficultyStr = hjow_trans("Crazy");
            results += "<option value='" + idx + "'>" + hjow_serializeXMLString(difficultyStr) + "</option>";
        }
        results += "</select>";
        results += "</div>";
        results += "<div class='div_player_ai_custom_element wide'>";
        results += "<textarea class='tx_ai_script advanceMode' placeholder=\"" + hjow_serializeString("// " + hjow_trans("paste custom AI script here if you want")) + "\"></textarea>";
        results += "</div>";
        return results;
    };
    ;
    XCardAIPlayer.prototype.refreshMain = function (engine) {
        var playerBlock = jq(engine.getPlaceArea()).find(".pbasic_" + this.getUniqueId());
        var textBlock = playerBlock.find('.tx_ai_script');
        textBlock.val('');
        if (this.customAIScript != null)
            textBlock.val(this.customAIScript);
    };
    ;
    XCardAIPlayer.prototype.applyInputs = function (engine, gameStarted, needHideScreen, showResult) {
        if (gameStarted)
            return;
        if (needHideScreen)
            return;
        if (showResult)
            return;
        var playerBlock = jq(engine.getPlaceArea()).find(".pbasic_" + this.getUniqueId());
        var diff = playerBlock.find('.sel_ai_difficulty').val();
        this.difficulty = parseInt(diff);
        var scriptInputs = String(playerBlock.find(".tx_ai_script").val());
        scriptInputs = scriptInputs.trim();
        if (scriptInputs != '') {
            this.customAIScript = scriptInputs;
        }
    };
    ;
    XCardAIPlayer.prototype.toPlainObject = function (engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        var result = _super.prototype.toPlainObject.call(this, engine);
        result.type = this.getClassName();
        result.difficulty = this.difficulty;
        result.customAIScript = this.customAIScript;
        return result;
    };
    ;
    XCardAIPlayer.prototype.setUniqueIdFromCreator = function (creator, uniqueId) {
        if (creator == null)
            return;
        if (!(creator instanceof XCardAIPlayerCreator))
            return;
        this.setUniqueId(uniqueId);
    };
    ;
    return XCardAIPlayer;
}(XCardPlayer));
;
var XCardAIPlayerCreator = (function (_super) {
    __extends(XCardAIPlayerCreator, _super);
    function XCardAIPlayerCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XCardAIPlayerCreator.prototype.getTypeName = function () {
        return "AI";
    };
    ;
    XCardAIPlayerCreator.prototype.create = function (name) {
        return new XCardAIPlayer(name);
    };
    ;
    XCardAIPlayerCreator.prototype.getSupportPlayerClassName = function () {
        return "XCardUserPlayer";
    };
    ;
    XCardAIPlayerCreator.prototype.restoreFromPlainObject = function (obj, engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        if (obj.type != this.getSupportPlayerClassName())
            return null;
        var result = new XCardAIPlayer(obj.name);
        result.setUniqueIdFromCreator(this, obj.uniqueId);
        var invArr = [];
        for (var idx = 0; idx < obj.inventory; idx++) {
            var newCard = new XCard();
            newCard.no = obj.inventory[idx].no;
            newCard.op = obj.inventory[idx].op;
            invArr.push(newCard);
        }
        result.setInventory(invArr, engine);
        var appArr = [];
        for (var adx = 0; adx < obj.applied; adx++) {
            var newCard = new XCard();
            newCard.no = obj.applied[adx].no;
            newCard.op = obj.applied[adx].op;
            appArr.push(newCard);
        }
        result.setApplied(appArr, engine);
        result.setDifficulty(obj.difficulty, engine);
        result.setCustomAIScript(obj.customAIScript, engine);
        return result;
    };
    ;
    return XCardAIPlayerCreator;
}(XCardPlayerCreator));
;
var XCardTutorialPlayer = (function (_super) {
    __extends(XCardTutorialPlayer, _super);
    function XCardTutorialPlayer(name) {
        var _this = _super.call(this, name) || this;
        _this.difficulty = 9;
        return _this;
    }
    XCardTutorialPlayer.prototype.getPlayerTypeName = function () {
        return "Tutorial Assistant";
    };
    ;
    XCardTutorialPlayer.prototype.getClassName = function () {
        return "XCardTutorialPlayer";
    };
    ;
    XCardTutorialPlayer.prototype.actOnTurn = function (engine, mode, deck, players, turnNumber) {
    };
    ;
    XCardTutorialPlayer.prototype.toPlainObject = function (engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        var result = _super.prototype.toPlainObject.call(this, engine);
        result.type = this.getClassName();
        result.difficulty = 0;
        result.customAIScript = '';
        return result;
    };
    ;
    XCardTutorialPlayer.prototype.setUniqueIdFromCreator = function (creator, uniqueId) {
        if (creator == null)
            return;
        if (!(creator instanceof XCardTutorialPlayerCreator))
            return;
        this.setUniqueId(uniqueId);
    };
    ;
    XCardTutorialPlayer.prototype.customMainHTML = function () {
        return null;
    };
    ;
    XCardTutorialPlayer.prototype.refreshMain = function (engine) {
    };
    ;
    XCardTutorialPlayer.prototype.applyInputs = function (engine, gameStarted, needHideScreen, showResult) {
        this.difficulty = 9;
    };
    ;
    XCardTutorialPlayer.prototype.isNameEditable = function () {
        return false;
    };
    ;
    return XCardTutorialPlayer;
}(XCardAIPlayer));
;
var XCardTutorialPlayerCreator = (function (_super) {
    __extends(XCardTutorialPlayerCreator, _super);
    function XCardTutorialPlayerCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XCardTutorialPlayerCreator.prototype.getTypeName = function () {
        return "Tutorial Assistant";
    };
    ;
    XCardTutorialPlayerCreator.prototype.create = function (name) {
        return new XCardTutorialPlayer(name);
    };
    ;
    XCardTutorialPlayerCreator.prototype.getSupportPlayerClassName = function () {
        return "XCardTutorialPlayer";
    };
    ;
    XCardTutorialPlayerCreator.prototype.restoreFromPlainObject = function (obj, engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        if (obj.type != this.getSupportPlayerClassName())
            return null;
        var result = new XCardTutorialPlayer(obj.name);
        result.setUniqueIdFromCreator(this, obj.uniqueId);
        var invArr = [];
        for (var idx = 0; idx < obj.inventory; idx++) {
            var newCard = new XCard();
            newCard.no = obj.inventory[idx].no;
            newCard.op = obj.inventory[idx].op;
            invArr.push(newCard);
        }
        result.setInventory(invArr, engine);
        var appArr = [];
        for (var adx = 0; adx < obj.applied; adx++) {
            var newCard = new XCard();
            newCard.no = obj.applied[adx].no;
            newCard.op = obj.applied[adx].op;
            appArr.push(newCard);
        }
        result.setApplied(appArr, engine);
        result.setDifficulty(obj.difficulty, engine);
        result.setCustomAIScript(obj.customAIScript, engine);
        return result;
    };
    ;
    XCardTutorialPlayerCreator.prototype.isUserSelect = function () {
        return false;
    };
    ;
    return XCardTutorialPlayerCreator;
}(XCardAIPlayerCreator));
;
var XCardGameMode = (function (_super) {
    __extends(XCardGameMode, _super);
    function XCardGameMode() {
        var _this = _super.call(this, "X Card Game Mode", "X Card Game Undefined Mode") || this;
        _this.totals = [];
        return _this;
    }
    ;
    XCardGameMode.prototype.getClassName = function () {
        return "XCardGameMode";
    };
    ;
    XCardGameMode.prototype.isGameAvailable = function (engine, players) {
        return (players.length >= 2);
    };
    ;
    XCardGameMode.prototype.createPlayers = function (engine) {
        return null;
    };
    ;
    XCardGameMode.prototype.init = function (playerCount) {
        this.totals = [];
        var starts = this.getStartCardNumber();
        var ends = this.getEndCardNumber();
        for (var pdx = 0; pdx < playerCount; pdx++) {
            for (var idx = starts; idx <= ends; idx++) {
                for (var cdx = 0; cdx <= 2; cdx++) {
                    var newCard = new XCard();
                    if (cdx == 0)
                        newCard.op = '+';
                    if (cdx == 1)
                        newCard.op = '-';
                    if (cdx == 2)
                        newCard.op = '×';
                    newCard.no = idx;
                    this.totals.push(newCard);
                }
            }
        }
        hjow_ramdomizeArrayOrder(this.totals);
    };
    ;
    XCardGameMode.prototype.getStartCardNumber = function () {
        return -1;
    };
    ;
    XCardGameMode.prototype.getEndCardNumber = function () {
        return 10;
    };
    ;
    XCardGameMode.prototype.playerInvList = function (player) {
        var result = [];
        return result;
    };
    ;
    XCardGameMode.prototype.deckList = function () {
        var result = [];
        return result;
    };
    ;
    XCardGameMode.prototype.getEachPlayerTimeLimit = function (player, engine) {
        return 30;
    };
    ;
    XCardGameMode.prototype.getHideTime = function (player, engine) {
        if (player.isUserControllable())
            return 30;
        return 2;
    };
    ;
    XCardGameMode.prototype.needHide = function (player, engine) {
        if (player instanceof XCardAIPlayer)
            return false;
        return true;
    };
    ;
    XCardGameMode.prototype.startGame = function (engine, players, deckObj) {
        return true;
    };
    ;
    XCardGameMode.prototype.afterPrepareStartDefaultGame = function (engine, players, deckObj) {
    };
    ;
    XCardGameMode.prototype.beforeNextTurnWork = function (engine, players, deckObj, turnNumber) {
    };
    ;
    XCardGameMode.prototype.afterNextTurnWork = function (engine, players, deckObj, turnNumber) {
    };
    ;
    XCardGameMode.prototype.onFinishGame = function (engine, players, deckObj) {
    };
    ;
    XCardGameMode.prototype.afterResultPage = function (engine, players, deckObj) {
    };
    ;
    XCardGameMode.prototype.processPoint = function (player, beforeCalculated) {
        return beforeCalculated;
    };
    ;
    XCardGameMode.prototype.isReplayAllowed = function () {
        return true;
    };
    ;
    return XCardGameMode;
}(ModuleObject));
;
var XCardGameDefaultMode = (function (_super) {
    __extends(XCardGameDefaultMode, _super);
    function XCardGameDefaultMode() {
        var _this = _super.call(this) || this;
        _this.name = "Normal Mode";
        _this.desc = "Each player will get 10 cards at the game starts.";
        return _this;
    }
    ;
    XCardGameDefaultMode.prototype.getClassName = function () {
        return "XCardGameDefaultMode";
    };
    ;
    XCardGameDefaultMode.prototype.playerStartCardCount = function () {
        return 10;
    };
    ;
    XCardGameDefaultMode.prototype.playerInvList = function (player) {
        var result = [];
        var cardCnt = this.playerStartCardCount();
        for (var idx = 0; idx < cardCnt; idx++) {
            var cardOne = this.totals[0];
            hjow_removeItemFromArray(this.totals, 0);
            result.push(cardOne);
        }
        return result;
    };
    ;
    XCardGameDefaultMode.prototype.deckList = function () {
        return hjow_simpleCloneArray(this.totals);
    };
    ;
    return XCardGameDefaultMode;
}(XCardGameMode));
;
var XCardGameSpeedMode = (function (_super) {
    __extends(XCardGameSpeedMode, _super);
    function XCardGameSpeedMode() {
        var _this = _super.call(this) || this;
        _this.name = "Speed Mode";
        _this.desc = "Each player will get 7 cards at the game starts. The number of card will be -1 to 5.";
        return _this;
    }
    ;
    XCardGameSpeedMode.prototype.getClassName = function () {
        return "XCardGameSpeedMode";
    };
    ;
    XCardGameSpeedMode.prototype.playerStartCardCount = function () {
        return 7;
    };
    ;
    XCardGameSpeedMode.prototype.getEndCardNumber = function () {
        return 5;
    };
    ;
    XCardGameSpeedMode.prototype.getEachPlayerTimeLimit = function (player, engine) {
        return 20;
    };
    ;
    return XCardGameSpeedMode;
}(XCardGameDefaultMode));
;
var XCardGameMultiplylessMode = (function (_super) {
    __extends(XCardGameMultiplylessMode, _super);
    function XCardGameMultiplylessMode() {
        var _this = _super.call(this) || this;
        _this.name = "Multiplyless Mode";
        _this.desc = "There is no × card.";
        return _this;
    }
    ;
    XCardGameMultiplylessMode.prototype.init = function (playerCount) {
        this.totals = [];
        var starts = this.getStartCardNumber();
        var ends = this.getEndCardNumber();
        for (var pdx = 0; pdx < playerCount; pdx++) {
            for (var idx = starts; idx <= ends; idx++) {
                for (var cdx = 0; cdx <= 1; cdx++) {
                    var newCard = new XCard();
                    if (cdx == 0)
                        newCard.op = '+';
                    if (cdx == 1)
                        newCard.op = '-';
                    newCard.no = idx;
                    this.totals.push(newCard);
                }
            }
        }
        hjow_ramdomizeArrayOrder(this.totals);
    };
    ;
    XCardGameMultiplylessMode.prototype.getStartCardNumber = function () {
        return 0;
    };
    ;
    XCardGameMultiplylessMode.prototype.getClassName = function () {
        return "XCardGameMultiplylessMode";
    };
    ;
    return XCardGameMultiplylessMode;
}(XCardGameDefaultMode));
;
var XCardGameTutorial = (function (_super) {
    __extends(XCardGameTutorial, _super);
    function XCardGameTutorial() {
        var _this = _super.call(this) || this;
        _this.name = "Tutorial";
        _this.desc = "Try this first to learn about this game.";
        return _this;
    }
    ;
    XCardGameTutorial.prototype.getClassName = function () {
        return "XCardGameTutorial";
    };
    ;
    XCardGameTutorial.prototype.isGameAvailable = function (engine, players) {
        return true;
    };
    ;
    XCardGameTutorial.prototype.createPlayers = function (engine) {
        var results = [];
        var newCardHaves = [];
        var newCard = null;
        var newPlayer = new XCardUserPlayer(hjow_trans("Player"));
        newPlayer.setUniqueIdFromMode(this, "p0");
        results.push(newPlayer);
        newPlayer = new XCardTutorialPlayer(hjow_trans("AI") + " 1");
        newPlayer.setUniqueIdFromMode(this, "p1");
        results.push(newPlayer);
        newPlayer = new XCardTutorialPlayer(hjow_trans("AI") + " 2");
        newPlayer.setUniqueIdFromMode(this, "p2");
        results.push(newPlayer);
        return results;
    };
    ;
    XCardGameTutorial.prototype.init = function (playerCount) {
        this.totals = [];
    };
    ;
    XCardGameTutorial.prototype.getStartCardNumber = function () {
        return -1;
    };
    ;
    XCardGameTutorial.prototype.getEndCardNumber = function () {
        return 10;
    };
    ;
    XCardGameTutorial.prototype.playerInvList = function (player) {
        var result = [];
        var playerUniq = player.getUniqueId();
        if (playerUniq == 'p0') {
            var newCard = new XCard();
            newCard.op = '+';
            newCard.no = 3;
            result.push(newCard);
            newCard = new XCard();
            newCard.op = '-';
            newCard.no = 3;
            result.push(newCard);
        }
        return result;
    };
    ;
    XCardGameTutorial.prototype.deckList = function () {
        var result = [];
        return result;
    };
    ;
    XCardGameTutorial.prototype.getEachPlayerTimeLimit = function (player, engine) {
        return 120;
    };
    ;
    XCardGameTutorial.prototype.getHideTime = function (player, engine) {
        if (player.isUserControllable())
            return 30;
        return 2;
    };
    ;
    XCardGameTutorial.prototype.needHide = function (player, engine) {
        if (player instanceof XCardAIPlayer)
            return false;
        return true;
    };
    ;
    XCardGameTutorial.prototype.startGame = function (engine, players, deckObj) {
        return true;
    };
    ;
    XCardGameTutorial.prototype.afterPrepareStartDefaultGame = function (engine, players, deckObj) {
        engine.setTurnIndex(0, this);
        var newPlayer = null;
        var newCardHaves = [];
        var newCard = null;
        newPlayer = players[0];
        newCardHaves = [];
        newCard = new XCard();
        newCard.setUniqueId(engine, "pc01");
        newCard.no = 5;
        newCard.op = "＋";
        newCardHaves.push(newCard);
        newCard = new XCard();
        newCard.setUniqueId(engine, "pc02");
        newCard.no = 6;
        newCard.op = "－";
        newCardHaves.push(newCard);
        newCard = new XCard();
        newCard.setUniqueId(engine, "pc02");
        newCard.no = -1;
        newCard.op = "×";
        newCardHaves.push(newCard);
        newPlayer.setInventory(newCardHaves, engine);
        newPlayer = players[1];
        newCardHaves = [];
        newCard = new XCard();
        newCard.setUniqueId(engine, "pc01");
        newCard.no = 5;
        newCard.op = "×";
        newCardHaves.push(newCard);
        newCard = new XCard();
        newCard.setUniqueId(engine, "pc02");
        newCard.no = 3;
        newCard.op = "×";
        newCardHaves.push(newCard);
        newCard = new XCard();
        newCard.setUniqueId(engine, "pc02");
        newCard.no = 4;
        newCard.op = "×";
        newCardHaves.push(newCard);
        newPlayer.setInventory(newCardHaves, engine);
        newCardHaves = [];
        newCard = new XCard();
        newCard.no = 7;
        newCard.op = "×";
        newCardHaves.push(newCard);
        newPlayer.setApplied(newCardHaves, engine);
        newPlayer = players[2];
        newCardHaves = [];
        newCard = new XCard();
        newCard.setUniqueId(engine, "pc01");
        newCard.no = 5;
        newCard.op = "×";
        newCardHaves.push(newCard);
        newCard = new XCard();
        newCard.setUniqueId(engine, "pc02");
        newCard.no = 3;
        newCard.op = "×";
        newCardHaves.push(newCard);
        newCard = new XCard();
        newCard.setUniqueId(engine, "pc02");
        newCard.no = 4;
        newCard.op = "×";
        newCardHaves.push(newCard);
        newPlayer.setInventory(newCardHaves, engine);
        newCardHaves = [];
        newCard = new XCard();
        newCard.no = 6;
        newCard.op = "－";
        newCardHaves.push(newCard);
        newCard = new XCard();
        newCard.no = 7;
        newCard.op = "－";
        newCardHaves.push(newCard);
        newPlayer.setApplied(newCardHaves, engine);
        engine.setPauseTimeLimit(true, this);
    };
    ;
    XCardGameTutorial.prototype.beforeNextTurnWork = function (engine, players, deckObj, turnNumber) {
    };
    ;
    XCardGameTutorial.prototype.afterNextTurnWork = function (engine, players, deckObj, turnNumber) {
    };
    ;
    XCardGameTutorial.prototype.onFinishGame = function (engine, players, deckObj) {
    };
    ;
    XCardGameTutorial.prototype.processPoint = function (player, beforeCalculated) {
        return beforeCalculated;
    };
    ;
    XCardGameTutorial.prototype.isReplayAllowed = function () {
        return false;
    };
    ;
    return XCardGameTutorial;
}(XCardGameSpeedMode));
;
var XCardGameEngine = (function (_super) {
    __extends(XCardGameEngine, _super);
    function XCardGameEngine(plcArea, securityFunction, debugMode) {
        if (plcArea === void 0) { plcArea = '.hjow_xcard_style_place'; }
        if (securityFunction === void 0) { securityFunction = null; }
        if (debugMode === void 0) { debugMode = false; }
        var _this = _super.call(this, "X Card", "X Card Game Core Engine") || this;
        _this.version = "0.0.1";
        _this.placeArea = null;
        _this.gameModeList = [];
        _this.gameModeIndex = 0;
        _this.playerTypes = [];
        _this.gameStarted = false;
        _this.timers = [];
        _this.players = [];
        _this.deck = [];
        _this.turnPlayerIndex = 0;
        _this.turnPlayerTime = 0;
        _this.turnNumber = 0;
        _this.beforeTurnPlayerIndex = 0;
        _this.needHideScreen = false;
        _this.hideScreenTime = 0;
        _this.pauseTimeLimit = false;
        _this.showResult = false;
        _this.resultReason = null;
        _this.turnChanging = false;
        _this.actPlayerTurnRequest = false;
        _this.actPlayerTurnStopRequest = false;
        _this.replay = null;
        _this.showSettings = false;
        _this.debugMode = false;
        if (typeof (plcArea) != 'string') {
            hjow_error('The parameter should be a string which is jQuery-selector form.');
            return _this;
        }
        _this.placeArea = String(plcArea);
        hjow_prepareJQuery();
        jq(plcArea).addClass('hjow_xcard_style_place');
        _this.debugMode = debugMode;
        if (debugMode) {
            hjow_putEngine(_this);
            jq('body').css('overflow-y', 'scroll');
        }
        if (securityFunction != null)
            securityFunction(_this);
        return _this;
    }
    ;
    XCardGameEngine.prototype.getClassName = function () {
        return "XCardGameEngine";
    };
    ;
    XCardGameEngine.prototype.getVersion = function () {
        return this.version;
    };
    ;
    XCardGameEngine.prototype.init = function () {
        this.initEngine();
        this.initDom();
        this.applyPropertiesBefore();
        this.title();
        this.applyPropertiesAfter();
        this.initTheme(0, true);
    };
    ;
    XCardGameEngine.prototype.prepareFirstProp = function () {
        this.deck = [];
        this.players = [];
        this.playerTypes = [];
        this.playerTypes.push(new XCardUserPlayerCreator());
        this.playerTypes.push(new XCardAIPlayerCreator());
        this.playerTypes.push(new XCardTutorialPlayerCreator());
        this.players.push(new XCardUserPlayer(hjow_trans("User")));
        this.players.push(new XCardAIPlayer("AI " + this.players.length));
        this.players.push(new XCardAIPlayer("AI " + this.players.length));
        this.players.push(new XCardAIPlayer("AI " + this.players.length));
        this.gameModeList.push(new XCardGameDefaultMode());
        this.gameModeList.push(new XCardGameSpeedMode());
        this.gameModeList.push(new XCardGameMultiplylessMode());
    };
    ;
    XCardGameEngine.prototype.applyProperties = function () {
        this.applyPropertiesBefore();
        this.applyPropertiesAfter();
    };
    ;
    XCardGameEngine.prototype.applyPropertiesBefore = function () {
        var customLocale = this.getProperty("locale");
        if (customLocale != null && customLocale != '') {
            hjow_selectedLocale = customLocale;
        }
    };
    ;
    XCardGameEngine.prototype.applyPropertiesAfter = function () {
        var useAdvanceFeatOpt = this.getProperty("use_advanced_features");
        if (useAdvanceFeatOpt != null) {
            if (hjow_parseBoolean(useAdvanceFeatOpt))
                jq(this.placeArea).find('.advanceMode').show();
            else
                jq(this.placeArea).find('.advanceMode').hide();
        }
        else {
            jq(this.placeArea).find('.advanceMode').hide();
        }
    };
    ;
    XCardGameEngine.prototype.getPlaceArea = function () {
        return jq(this.placeArea);
    };
    ;
    XCardGameEngine.prototype.initEngine = function () {
        this.prepareLanguageSets();
        this.setProperty('localStorageAvailable', String(hjow_checkLocalStorageAvailable()));
        this.load();
        if (this.properties == null)
            this.properties = new Properties();
        this.prepareFirstProp();
    };
    ;
    XCardGameEngine.prototype.initDom = function () {
        jq(this.placeArea).addClass('hjow_xcard_style_place');
        var bodyHtml = "<div class='page page_main'></div>\n";
        bodyHtml += "<div class='page page_game'></div>\n";
        bodyHtml += "<div class='page page_hide'></div>\n";
        bodyHtml += "<div class='page page_result'></div>\n";
        bodyHtml += "<div class='page page_set'></div>\n";
        bodyHtml += "<div class='toolbar'></div>\n";
        jq(this.placeArea).html(hjow_toStaticHTML(bodyHtml));
        jq('body').append("<div class='hjow_xcard_how_to_play_dialog' style='width: 400px; height: 300px; display: none' title=\"" + hjow_serializeString(hjow_trans("How to play")) + "\"></div>");
        this.prepareHowToPlayDialog();
        var selfObj = this;
        hjow_prepareDialogLog();
        hjow_prepareDialogAlert();
        hjow_workOnScreenSizeChanged(function () {
            selfObj.refreshPage(false);
        });
        this.refreshPage();
    };
    ;
    XCardGameEngine.prototype.initTheme = function (themeType, atFirst) {
        if (themeType === void 0) { themeType = 0; }
        if (atFirst === void 0) { atFirst = false; }
        if (themeType == 0) {
            this.initTheme(1, atFirst);
            this.initTheme(2, atFirst);
            return;
        }
        var themeStr = this.getProperty('theme_' + themeType);
        if ((themeStr == null || themeStr == '') && atFirst) {
            themeStr = this.getDefaultTheme(themeType);
            this.setProperty('theme_' + themeType, themeStr);
        }
        if (themeStr == null)
            return;
        themeStr = themeStr.trim();
        if (themeStr == '')
            return;
        try {
            var themes = [];
            var parsedObj = JSON.parse(themeStr);
            if (hjow_isArray(parsedObj)) {
                for (var pdx = 0; pdx < parsedObj.length; pdx++) {
                    var theme = new Properties();
                    theme.fromPlainObject(parsedObj[pdx]);
                    themes.push(theme);
                }
            }
            else {
                var theme = new Properties();
                theme.fromJSON(themeStr);
                themes.push(theme);
            }
            for (var pdx = 0; pdx < themes.length; pdx++) {
                var theme = themes[pdx];
                var keys = theme.keyList();
                for (var idx = 0; idx < keys.length; idx++) {
                    var keyOne = keys[idx];
                    var value = theme.get(keyOne);
                    var jqSel = jq(keyOne);
                    if (jqSel.length >= 1) {
                        jqSel.each(function () {
                            jq(this).css('cssText', value);
                        });
                    }
                }
            }
        }
        catch (e) {
            hjow_error(e);
        }
    };
    ;
    XCardGameEngine.prototype.getSelectedGameMode = function () {
        return this.gameModeList[this.gameModeIndex];
    };
    ;
    XCardGameEngine.prototype.getPlayerNowTurn = function () {
        return this.players[this.turnPlayerIndex];
    };
    ;
    XCardGameEngine.prototype.isGameOn = function () {
        return this.gameStarted;
    };
    ;
    XCardGameEngine.prototype.clearAllPlayers = function () {
        for (var idx = 0; idx < this.players.length; idx++) {
            this.players[idx].resetCards();
        }
    };
    ;
    XCardGameEngine.prototype.setTurnIndex = function (turnPlayerIndex, mode) {
        if (mode == null)
            return;
        if (!(mode instanceof XCardGameMode))
            return;
        if (mode.getUniqueId() != this.getSelectedGameMode().getUniqueId())
            return;
        this.turnPlayerIndex = turnPlayerIndex;
    };
    ;
    XCardGameEngine.prototype.setTurnTime = function (turnPlayerTime, mode) {
        if (mode == null)
            return;
        if (!(mode instanceof XCardGameMode))
            return;
        if (mode.getUniqueId() != this.getSelectedGameMode().getUniqueId())
            return;
        this.turnPlayerTime = turnPlayerTime;
    };
    ;
    XCardGameEngine.prototype.title = function () {
        this.gameStarted = false;
        this.clearAllPlayers();
        this.refreshPage();
    };
    ;
    XCardGameEngine.prototype.startGame = function () {
        this.applyInputs();
        hjow_log(hjow_trans("The game is preparing to start."));
        var gameMode = this.getSelectedGameMode();
        hjow_log(hjow_trans("Mode") + " : " + hjow_trans(gameMode.getName()));
        hjow_log(hjow_trans(gameMode.getDescription()));
        var needDefaultAction = gameMode.startGame(this, this.players, this.deck);
        if (needDefaultAction) {
            this.spreadCards();
            hjow_log(hjow_trans("Cards is shuffled."));
            this.turnPlayerIndex = Math.round((Math.random() * this.players.length) + 0.01);
            if (this.turnPlayerIndex < 0)
                this.turnPlayerIndex = 0;
            if (this.turnPlayerIndex >= this.players.length - 1)
                this.turnPlayerIndex = this.players.length - 1;
            var turnPlayer = this.getPlayerNowTurn();
            this.turnPlayerTime = this.getSelectedGameMode().getEachPlayerTimeLimit(turnPlayer, this) + 1;
            var selfObj = this;
            var selfAny = this.getSelfObject();
            this.addTimerIfNotExistName("LimitTimer", "Restrict the player's time", function () {
                if (selfObj.turnChanging)
                    return;
                if (!selfObj.gameStarted)
                    return;
                if (selfObj.pauseTimeLimit)
                    return;
                if (selfObj.needHideScreen) {
                    selfObj.hideScreenTime -= 1;
                    var hideScreenMax = selfObj.gameModeList[selfObj.gameModeIndex].getHideTime(selfObj.players[selfObj.beforeTurnPlayerIndex], selfObj);
                    hjow_setProgressValue('.prog_hide_left_time', selfObj.hideScreenTime / (hideScreenMax * 1.0), selfObj.hideScreenTime + " " + "seconds left");
                    if (selfObj.hideScreenTime <= 0) {
                        selfObj.hideScreenTime = hideScreenMax;
                        selfObj.turnChanging = true;
                        selfAny.events.hide.reveal();
                    }
                }
                else {
                    var maxVal = selfObj.gameModeList[selfObj.gameModeIndex].getEachPlayerTimeLimit(selfObj.players[selfObj.turnPlayerIndex], selfObj);
                    if (maxVal <= 0)
                        maxVal = 1;
                    selfObj.turnPlayerTime -= 1;
                    hjow_setProgressValue('.prog_game_status_bar', selfObj.turnPlayerTime / (maxVal * 1.0), selfObj.turnPlayerTime + " " + "seconds left");
                    if (selfObj.turnPlayerTime <= 0) {
                        selfObj.turnPlayerTime = 999999;
                        selfObj.turnChanging = true;
                        selfAny.events.game.btn_get_from_deck();
                    }
                }
            }, 1000);
            this.addTimerIfNotExistName("AIProcessor", "AI Process", function () {
                if (!selfObj.actPlayerTurnRequest)
                    return;
                if (!selfObj.gameStarted)
                    return;
                if (selfObj.turnChanging)
                    return;
                if (selfObj.needHideScreen)
                    return;
                selfObj.actPlayerTurnRequest = false;
                selfObj.players[selfObj.turnPlayerIndex].actOnTurn(selfObj, selfObj.gameModeList[selfObj.gameModeIndex], selfObj.deck, selfObj.players, selfObj.turnNumber);
            }, 500);
        }
        hjow_log(hjow_replaceStr(hjow_trans("The first turn number is [[NUMBER]]"), "[[NUMBER]]", String(this.turnPlayerIndex)));
        this.showSettings = false;
        this.needHideScreen = false;
        this.showResult = false;
        this.turnChanging = false;
        this.gameStarted = true;
        this.turnNumber = 0;
        gameMode.afterPrepareStartDefaultGame(this, this.players, this.deck);
        if (gameMode.isReplayAllowed() && hjow_parseBoolean(this.getProperty("record_replay"))) {
            this.prepareRecordingReplay();
        }
        hjow_log(hjow_trans("Game is started."));
        if (this.isDebugMode())
            hjow_log(hjow_trans("Debug mode was activated."));
        hjow_log(hjow_replaceStr(hjow_trans("Your turn, [[PLAYER]]."), "[[PLAYER]]", this.getPlayerNowTurn().getName()));
        this.refreshPage();
        this.actPlayerTurnStopRequest = false;
        this.actPlayerTurnRequest = true;
    };
    ;
    XCardGameEngine.prototype.setPauseTimeLimit = function (pause, mode) {
        if (mode == null)
            return;
        if (!(mode instanceof XCardGameMode))
            return;
        if (this.getSelectedGameMode().getUniqueId() != mode.getUniqueId())
            return;
        this.pauseTimeLimit = pause;
    };
    ;
    XCardGameEngine.prototype.prepareRecordingReplay = function () {
        this.replay = new XCardReplay();
        this.replay.players = [];
        for (var pdx = 0; pdx < this.players.length; pdx++) {
            var plainObj = this.players[pdx].toPlainObject(this);
            var cloned = null;
            for (var pcdx = 0; pcdx < this.playerTypes.length; pcdx++) {
                var creator = this.playerTypes[pcdx];
                cloned = creator.restoreFromPlainObject(plainObj, this);
                if (cloned != null)
                    break;
            }
            if (cloned == null) {
                this.replay = null;
                hjow_log(hjow_trans("Some custom player setting is not supported for recording replay."));
                return;
            }
            this.replay.players.push(cloned);
        }
        this.replay.gameMode = this.getSelectedGameMode().getClassName();
        this.replay.deck = [];
        for (var cdx = 0; cdx < this.deck.length; cdx++) {
            var newCardObj = this.deck[cdx].toPlainObjectDetail(this);
            var newCard = new XCard();
            newCard.no = newCardObj.no;
            newCard.op = newCardObj.op;
            newCard.setUniqueId(this, newCardObj.uniqueId);
            this.replay.deck.push(newCard);
        }
    };
    ;
    XCardGameEngine.prototype.isActPlayerRequestAlive = function () {
        return this.actPlayerTurnRequest && (!this.actPlayerTurnStopRequest);
    };
    ;
    XCardGameEngine.prototype.isActPlayerStopRequested = function () {
        return this.actPlayerTurnStopRequest;
    };
    ;
    XCardGameEngine.prototype.isThisTurn = function (player) {
        if (this.getPlayerNowTurn().getUniqueId() == player.getUniqueId())
            return true;
        return false;
    };
    ;
    XCardGameEngine.prototype.getLeftTime = function () {
        return this.turnPlayerTime;
    };
    XCardGameEngine.prototype.isHided = function () {
        return this.needHideScreen;
    };
    ;
    XCardGameEngine.prototype.setDeck = function (cards, mode) {
        if (mode == null)
            return;
        if (!(mode instanceof XCardGameMode))
            return;
        if (this.getSelectedGameMode().getUniqueId() != mode.getUniqueId())
            return;
        this.deck = cards;
    };
    ;
    XCardGameEngine.prototype.addTimer = function (name, desc, func, timeGap) {
        if (timeGap === void 0) { timeGap = 1000; }
        var newTimer = new IntervalTimer(name, desc, func, timeGap);
        this.timers.push(newTimer);
    };
    ;
    XCardGameEngine.prototype.addTimerIfNotExistName = function (name, desc, func, timeGap) {
        if (timeGap === void 0) { timeGap = 1000; }
        for (var idx = 0; idx < this.timers.length; idx++) {
            if (this.timers[idx].getName() == name)
                return false;
        }
        this.addTimer(name, desc, func, timeGap);
        return true;
    };
    ;
    XCardGameEngine.prototype.stopAllTimer = function () {
        var curIdx = 0;
        var preventInfLoop = 0;
        while (curIdx < this.timers.length) {
            var timerOne = this.timers[curIdx];
            if (!(timerOne instanceof ImportantTimer)) {
                timerOne.stop();
                hjow_removeItemFromArray(this.timers, curIdx);
                curIdx = 0;
                continue;
            }
            curIdx++;
            preventInfLoop++;
            if (preventInfLoop >= 1000 * Math.max(this.timers.length, 1)) {
                hjow_error("Infinite Loop Detected");
                break;
            }
        }
    };
    ;
    XCardGameEngine.prototype.stopTimer = function (timerName) {
        for (var idx = 0; idx < this.timers.length; idx++) {
            var timerOne = this.timers[idx];
            if (timerOne.getName() == timerName) {
                timerOne.stop();
                hjow_removeItemFromArray(this.timers, idx);
                return true;
            }
        }
        return false;
    };
    ;
    XCardGameEngine.prototype.spreadCards = function () {
        var gameMode = this.getSelectedGameMode();
        gameMode.init(this.players.length);
        for (var idx = 0; idx < this.players.length; idx++) {
            var currentPlayer = this.players[idx];
            currentPlayer.resetCards();
            currentPlayer.setInventory(gameMode.playerInvList(currentPlayer), this);
        }
        this.deck = gameMode.deckList();
    };
    ;
    XCardGameEngine.prototype.save = function () {
        try {
            hjow_saveOnLocalStorage('XCard', this.properties.serialize());
        }
        catch (e) {
            hjow_alert(e, hjow_trans('Error'));
        }
    };
    ;
    XCardGameEngine.prototype.load = function () {
        var localStoreStr = hjow_getOnLocalStorage('XCard');
        if (localStoreStr == null) {
            this.save();
        }
        try {
            this.properties.fromJSON(localStoreStr);
        }
        catch (e) {
            hjow_error(e);
        }
    };
    ;
    XCardGameEngine.prototype.findPlayer = function (uniqueId) {
        for (var idx = 0; idx < this.players.length; idx++) {
            if (this.players[idx].getUniqueId() == uniqueId) {
                return this.players[idx];
            }
        }
        return null;
    };
    ;
    XCardGameEngine.prototype.nextTurn = function () {
        this.turnChanging = true;
        this.actPlayerTurnStopRequest = true;
        var gameMode = this.getSelectedGameMode();
        gameMode.beforeNextTurnWork(this, this.players, this.deck, this.turnNumber + 1);
        if (!this.gameStarted) {
            this.refreshPage(false);
            return;
        }
        this.turnNumber = this.turnNumber + 1;
        var finishGameReasonIfExists = this.checkFinishGameCondition();
        if (finishGameReasonIfExists != null) {
            this.resultReason = finishGameReasonIfExists;
            this.finishGame(true);
            return;
        }
        var beforePlayer = this.getPlayerNowTurn();
        if (this.getSelectedGameMode().needHide(beforePlayer, this)) {
            this.hideScreenTime = this.getSelectedGameMode().getHideTime(beforePlayer, this);
            this.needHideScreen = true;
        }
        this.beforeTurnPlayerIndex = this.turnPlayerIndex;
        this.turnPlayerIndex++;
        if (this.turnPlayerIndex >= this.players.length) {
            this.turnPlayerIndex = 0;
        }
        this.turnPlayerTime = this.getSelectedGameMode().getEachPlayerTimeLimit(this.getPlayerNowTurn(), this);
        if (!this.gameStarted) {
            this.refreshPage(false);
            return;
        }
        gameMode.afterNextTurnWork(this, this.players, this.deck, this.turnNumber);
        hjow_log(hjow_replaceStr(hjow_trans("Your turn, [[PLAYER]]."), "[[PLAYER]]", this.getPlayerNowTurn().getName()));
        this.actPlayerTurnStopRequest = false;
        this.actPlayerTurnRequest = true;
        this.turnChanging = false;
        this.showSettings = false;
        this.refreshPage(false);
    };
    ;
    XCardGameEngine.prototype.checkFinishGameCondition = function () {
        if (this.deck.length <= 0)
            return hjow_trans("The deck is empty.");
        for (var idx = 0; idx < this.players.length; idx++) {
            var player = this.players[idx];
            if (player.getInventoryCardCount() <= 0)
                return hjow_replaceStr(hjow_trans("The player [[PLAYER]] does not have any card."), "[[PLAYER]]", player.getName());
        }
        return null;
    };
    ;
    XCardGameEngine.prototype.finishGameFromMode = function (reason, mode) {
        if (mode == null)
            return;
        if (!(mode instanceof XCardGameMode))
            return;
        if (this.getSelectedGameMode().getUniqueId() != mode.getUniqueId())
            return;
        this.resultReason = reason;
        this.finishGame(true);
    };
    ;
    XCardGameEngine.prototype.finishGame = function (normalReason) {
        if (normalReason === void 0) { normalReason = false; }
        this.actPlayerTurnStopRequest = true;
        this.gameStarted = false;
        this.needHideScreen = false;
        this.showSettings = false;
        this.showResult = true;
        var gameMode = this.getSelectedGameMode();
        gameMode.onFinishGame(this, this.players, this.deck);
        hjow_log(hjow_trans("Game is finished."));
        if (this.isDebugMode())
            hjow_log(hjow_trans("Debug mode was activated."));
        this.refreshPage(false);
        gameMode.afterResultPage(this, this.players, this.deck);
        this.replay = null;
        this.resultReason = null;
    };
    ;
    XCardGameEngine.prototype.isDebugMode = function () {
        return this.debugMode;
    };
    ;
    XCardGameEngine.prototype.refreshPage = function (heavyRefresh) {
        if (heavyRefresh === void 0) { heavyRefresh = true; }
        this.applyInputs();
        if (heavyRefresh) {
            jq(this.placeArea).find('.page_game').html(hjow_toStaticHTML(this.gamePageHTML()));
            jq(this.placeArea).find('.page_main').html(hjow_toStaticHTML(this.mainPageHTML()));
            jq(this.placeArea).find('.page_hide').html(hjow_toStaticHTML(this.hidePageHTML()));
            jq(this.placeArea).find('.page_set').html(hjow_toStaticHTML(this.setPageHTML()));
            this.prepareEvents();
        }
        jq(this.placeArea).find('.toolbar').html(hjow_toStaticHTML(this.toolbarHTML()));
        if (this.needHideScreen) {
            jq(this.placeArea).find('.page:not(.page_hide)').hide();
            this.refreshGame();
            jq(this.placeArea).find('.page_hide').show();
        }
        else if (this.gameStarted) {
            jq(this.placeArea).find('.page:not(.page_game)').hide();
            this.refreshGame();
            jq(this.placeArea).find('.page_game').show();
        }
        else if (this.showResult) {
            jq(this.placeArea).find('.page:not(.page_result)').hide();
            jq(this.placeArea).find('.page_result').html(hjow_toStaticHTML(this.resultPageHTML()));
            this.refreshResult();
            jq(this.placeArea).find('.page_result').show();
        }
        else if (this.showSettings && (!this.debugMode)) {
            jq(this.placeArea).find('.page:not(.page_set)').hide();
            this.refreshSettingPage();
            jq(this.placeArea).find('.page_set').show();
        }
        else {
            jq(this.placeArea).find('.page:not(.page_main)').hide();
            this.refreshMain();
            jq(this.placeArea).find('.page_main').show();
        }
        if (this.showSettings && this.debugMode) {
            this.refreshSettingPage();
            jq(this.placeArea).find('.page_set').show();
        }
        if (hjow_onRefreshComponents != null && typeof (hjow_onRefreshComponents) != 'undefined') {
            hjow_onRefreshComponents();
        }
        this.initTheme(2, false);
        this.refreshEvents();
        if (this.showSettings && this.debugMode) {
            this.refreshSettingPage();
            jq(this.placeArea).find('.page_set').show();
        }
    };
    ;
    XCardGameEngine.prototype.refreshMain = function () {
        jq(this.placeArea).find('.td_player_list').empty();
        var results = "";
        results += "<div class='full player_list_div element e137'>" + "\n";
        results += "<table class='full player_list element e138'>" + "\n";
        if (this.players.length <= 0) {
            results += "   <tr class='tr_player pbasic_none  element'>" + "\n";
            results += "       <td class='td_player_none element'>" + "\n";
            results += "          <span class='label element'>" + hjow_serializeXMLString(hjow_trans("Please add player to play.")) + "</span>" + "\n";
            results += "       </td>" + "\n";
            results += "   </tr>" + "\n";
        }
        else {
            for (var idx = 0; idx < this.players.length; idx++) {
                var currentPlayer = this.players[idx];
                results += "   <tr class='tr_player element pbasic_" + hjow_serializeString(currentPlayer.getUniqueId()) + "'>" + "\n";
                results += "       <td class='td_player element'>" + "\n";
                results += this.eachPlayerMainHTML(currentPlayer);
                results += "       </td>" + "\n";
                results += "   </tr>" + "\n";
            }
        }
        results += "   <tr class='tr_player_empty element e139'>" + "\n";
        results += "       <td class='td_player_empty td_player_control element e140'>" + "\n";
        results += "          <select class='sel_player_type player_control element e141'>" + "\n";
        for (var tdx = 0; tdx < this.playerTypes.length; tdx++) {
            var playerType = this.playerTypes[tdx];
            if (playerType.isUserSelect()) {
                results += "          <option value='" + hjow_serializeString(playerType.getTypeName()) + "'>" + hjow_serializeXMLString(hjow_trans(playerType.getTypeName())) + "</option>" + "\n";
            }
        }
        results += "          </select>" + "\n";
        results += "          <button type='button' class='btn_add_player player_control element e142'>" + hjow_trans("Add") + "</button>" + "\n";
        results += "          <button type='button' class='btn_remove_player player_control element e143'>" + hjow_trans("Remove Last") + "</button>" + "\n";
        results += "       </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr class='tr_player_empty element e144'>" + "\n";
        results += "      <td class='td_player_empty full element e145'>" + "\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "</table>" + "\n";
        results += "</div>" + "\n";
        jq(this.placeArea).find('.td_player_list').html(hjow_toStaticHTML(results));
        if (this.players.length <= 0) {
            var removeBtn = jq(this.placeArea).find('.btn_remove_player');
            removeBtn.prop('disabled', true);
            removeBtn.attr('disabled', 'disabled');
            removeBtn.addClass('disabled');
        }
        var heightVal = jq(this.placeArea).height();
        if (heightVal < 200)
            heightVal = 200;
        this.initTheme(1, false);
        jq(this.placeArea).find('.player_list_div').css('min-height', heightVal - 200 + 'px');
        jq(this.placeArea).find('.player_list_div').css('max-height', heightVal - 100 + 'px');
        var selGameMode = jq(this.placeArea).find('.sel_game_mode');
        selGameMode.find('option').remove();
        for (var mdx = 0; mdx < this.gameModeList.length; mdx++) {
            selGameMode.append(hjow_toStaticHTML("<option value='" + mdx + "'>" + hjow_serializeXMLString(hjow_trans(this.gameModeList[mdx].getName())) + "</option>"));
        }
        selGameMode.val(this.gameModeIndex);
        this.refreshMainGameMode(true);
        for (var idx = 0; idx < this.players.length; idx++) {
            this.players[idx].refreshMain(this);
        }
    };
    ;
    XCardGameEngine.prototype.refreshMainGameMode = function (onRecursives) {
        if (onRecursives === void 0) { onRecursives = false; }
        var gameMode = this.getSelectedGameMode();
        jq(this.placeArea).find('.div_game_mode_desc').text(hjow_trans(gameMode.getDescription()));
        var modeDefinedPlayers = gameMode.createPlayers(this);
        if (modeDefinedPlayers != null) {
            if (!onRecursives) {
                for (var idx = 0; idx < this.players.length; idx++) {
                    for (var mdx = 0; mdx < modeDefinedPlayers.length; mdx++) {
                        if (this.players[idx].getUniqueId() == modeDefinedPlayers[mdx].getUniqueId()) {
                            modeDefinedPlayers[mdx].setName(this.players[idx].getName(), this);
                        }
                    }
                }
                this.players = modeDefinedPlayers;
                this.refreshMain();
                return;
            }
            jq(this.placeArea).find('.player_control').prop('disabled', true);
            jq(this.placeArea).find('.player_control').attr('disabled', 'disabled');
            jq(this.placeArea).find('.player_control').addClass('disabled');
            jq(this.placeArea).find('.player_control').hide();
        }
        else {
            jq(this.placeArea).find('.player_control').removeProp('disabled');
            jq(this.placeArea).find('.player_control').removeAttr('disabled');
            jq(this.placeArea).find('.player_control').removeClass('disabled');
            jq(this.placeArea).find('.player_control').show();
        }
        var gameStartAvail = gameMode.isGameAvailable(this, this.players);
        if (gameStartAvail) {
            jq(this.placeArea).find('.btn_game_start').removeProp('disabled');
            jq(this.placeArea).find('.btn_game_start').removeAttr('disabled');
            jq(this.placeArea).find('.btn_game_start').removeClass('disabled');
        }
        else {
            jq(this.placeArea).find('.btn_game_start').prop('disabled', true);
            jq(this.placeArea).find('.btn_game_start').attr('disabled', 'disabled');
            jq(this.placeArea).find('.btn_game_start').addClass('disabled');
        }
    };
    ;
    XCardGameEngine.prototype.refreshGame = function () {
        jq(this.placeArea).find('.table_player_arena_each').removeClass('current_turn');
        var currentPlayer = this.getPlayerNowTurn();
        if (currentPlayer.isUserControllable()) {
            jq(this.placeArea).find('.btn_user_control').removeProp('disabled');
            jq(this.placeArea).find('.btn_user_control').removeAttr('disabled');
            jq(this.placeArea).find('.btn_user_control').removeClass('disabled');
        }
        else {
            jq(this.placeArea).find('.btn_user_control').prop('disabled', true);
            jq(this.placeArea).find('.btn_user_control').attr('disabled', 'disabled');
            jq(this.placeArea).find('.btn_user_control').addClass('disabled');
        }
        jq(this.placeArea).find(".table_player_arena_each.pplace_" + hjow_serializeString(currentPlayer.getUniqueId()) + "").addClass('current_turn');
        jq(this.placeArea).find('.deck_lefts').text(this.deck.length);
        for (var pdx = 0; pdx < this.players.length; pdx++) {
            var playerOne = this.players[pdx];
            var thisTurn = (pdx == this.turnPlayerIndex);
            var placeObj = jq(this.placeArea).find(".pplace_" + hjow_serializeString(playerOne.getUniqueId()));
            placeObj.find(".player_inventory_card_count").text(playerOne.getInventoryCardCount());
            placeObj.find(".point_number").text(playerOne.getCurrentPoint(this.getSelectedGameMode()).toString());
            var invenSel = placeObj.find(".select_player_arena.inventory");
            var invenObjs = invenSel.find("option");
            var invenOptList = [];
            invenObjs.each(function () {
                var cardUniqueId = jq(this).attr('value');
                invenOptList.push(cardUniqueId);
            });
            var realInvenList = playerOne.listInventoryDirect(this);
            var needRemoveInv = [];
            var needAddInv = [];
            for (var idx = 0; idx < invenOptList.length; idx++) {
                var exists = false;
                for (var ridx = 0; ridx < realInvenList.length; ridx++) {
                    if (invenOptList[idx] == realInvenList[ridx].getUniqueId()) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    needRemoveInv.push(invenOptList[idx]);
                }
            }
            for (var ridx = 0; ridx < realInvenList.length; ridx++) {
                var exists = false;
                for (var idx = 0; idx < invenOptList.length; idx++) {
                    if (invenOptList[idx] == realInvenList[ridx].getUniqueId()) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    needAddInv.push(realInvenList[ridx]);
                }
            }
            for (var rdx = 0; rdx < needRemoveInv.length; rdx++) {
                var elemOne = needRemoveInv[rdx];
                invenSel.find("option[value='" + hjow_serializeString(elemOne) + "']").remove();
            }
            for (var rdx2 = 0; rdx2 < needAddInv.length; rdx2++) {
                var targetCard = needAddInv[rdx2];
                var newOptionHTML = "<option value='" + hjow_serializeString(targetCard.getUniqueId()) + "'>" + hjow_serializeXMLString(targetCard.toString()) + "</option>";
                invenSel.append(hjow_toStaticHTML(newOptionHTML));
            }
            invenObjs = invenSel.find("option:not('.concealed')");
            var concealedOpt = invenSel.find("option.concealed");
            if (concealedOpt.length == 0) {
                invenSel.append(hjow_toStaticHTML("<option value='' class='concealed'>[" + hjow_trans("Concealed") + "]</option>"));
                concealedOpt = invenSel.find("option.concealed");
            }
            if (thisTurn && (!(playerOne.needToHideInventoryForSelf()))) {
                invenObjs.show();
                concealedOpt.hide();
            }
            else {
                invenObjs.hide();
                concealedOpt.show();
            }
            var affectorSel = placeObj.find(".select_player_arena.affector");
            var affectorObjs = affectorSel.find("option");
            affectorObjs.removeProp('selected');
            affectorObjs.removeAttr('selected');
            var affectorOptList = [];
            affectorObjs.each(function () {
                var cardUniqueId = jq(this).attr('value');
                affectorOptList.push(cardUniqueId);
            });
            var realAffectorList = playerOne.listAppliedDirect(this);
            var needRemoveAff = [];
            var needAddAff = [];
            for (var idx2 = 0; idx2 < affectorOptList.length; idx2++) {
                var exists = false;
                for (var ridx = 0; ridx < realAffectorList.length; ridx++) {
                    if (affectorOptList[idx2] == realAffectorList[ridx].getUniqueId()) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    needRemoveAff.push(affectorOptList[idx2]);
                }
            }
            for (var ridx2 = 0; ridx2 < realAffectorList.length; ridx2++) {
                var exists = false;
                for (var idx = 0; idx < affectorOptList.length; idx++) {
                    if (affectorOptList[idx] == realAffectorList[ridx2].getUniqueId()) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    needAddAff.push(realAffectorList[ridx2]);
                }
            }
            for (var rdx3 = 0; rdx3 < needRemoveAff.length; rdx3++) {
                var elemOne = needRemoveAff[rdx3];
                affectorSel.find("option[value='" + hjow_serializeString(elemOne) + "']").remove();
            }
            for (var rdx4 = 0; rdx4 < needAddAff.length; rdx4++) {
                var targetCard = needAddAff[rdx4];
                var newOptionHTML = "<option value='" + hjow_serializeString(targetCard.getUniqueId()) + "'>" + hjow_serializeXMLString(targetCard.toString()) + "</option>";
                affectorSel.append(hjow_toStaticHTML(newOptionHTML));
            }
            affectorObjs = affectorSel.find("option");
            if (affectorObjs.length >= 1) {
                affectorSel.val(jq(affectorObjs[affectorObjs.length - 1]).attr('value'));
            }
        }
        this.initTheme(1, false);
        var heightVal = jq(this.placeArea).height();
        if (heightVal < 500)
            heightVal = 500;
        var widthVal = jq(this.placeArea).width();
        if (widthVal < 700)
            widthVal = 700;
        jq(this.placeArea).find('.player_arena_div').css('min-height', heightVal - 200 + 'px');
        jq(this.placeArea).find('.player_arena_div').css('max-height', heightVal - 100 + 'px');
        jq(this.placeArea).find('.player_arena_div').css('max-width', widthVal - 5 + 'px');
        jq(this.placeArea).find('.div_player_arena_each').css('min-height', heightVal - 210 + 'px');
        jq(this.placeArea).find('.div_player_arena_each').css('max-height', heightVal - 110 + 'px');
        jq(this.placeArea).find('.table_player_arena_each').css('min-height', heightVal - 220 + 'px');
        jq(this.placeArea).find('.table_player_arena_each').css('max-height', heightVal - 120 + 'px');
        jq(this.placeArea).find('.table_player_arena_each').each(function () {
            var heightLefts = jq(jq(this).find('.player_arena_one_line_layout')[0]).height() * 4;
            var thisHeight = jq(this).height();
            if (thisHeight < 200)
                thisHeight = heightVal - 220;
            var heightIn = thisHeight - heightLefts - 10;
            if (heightIn < 200)
                heightIn = 250;
            jq(this).find('select').height(heightIn - 10);
        });
        for (var idx = 0; idx < this.players.length; idx++) {
            this.players[idx].refreshGame(this);
        }
    };
    ;
    XCardGameEngine.prototype.refreshResult = function () {
        var gameMode = this.getSelectedGameMode();
        jq(this.placeArea).find('.replay_result').hide();
        var finResultLb = jq(this.placeArea).find('.lb_finish_result');
        finResultLb.text('');
        if (this.resultReason != null)
            finResultLb.text(this.resultReason);
        for (var idx = 0; idx < this.players.length; idx++) {
            var playerOne = this.players[idx];
            var playerBlock = jq(this.placeArea).find(".presult_" + hjow_serializeString(playerOne.getUniqueId()));
            playerBlock.find(".i_name").val(playerOne.getName());
            playerBlock.find(".i_type").val(playerOne.getPlayerTypeName());
            playerBlock.find(".i_point").val(playerOne.getCurrentPoint(gameMode).toString());
            playerBlock.find(".i_affects").val(playerOne.listAppliedAsString());
        }
        this.initTheme(1, false);
        if (this.replay != null) {
            var rsn = this.resultReason;
            this.replay.reason = (rsn == null ? "" : rsn);
            this.resultReplay();
        }
        else {
            jq(this.placeArea).find('.replay_json').val('');
            jq(this.placeArea).find('.btn_show_replay').hide();
        }
    };
    ;
    XCardGameEngine.prototype.refreshSettingPage = function () {
        var settingPage = jq(this.placeArea).find('.page_set');
        var recordReplayOpt = this.getProperty('record_replay');
        if (recordReplayOpt == null)
            recordReplayOpt = 'false';
        var recordReplayComp = settingPage.find('.chk_record_replay');
        if (hjow_parseBoolean(recordReplayOpt)) {
            recordReplayComp.attr('checked', 'checked');
            recordReplayComp.prop('checked', true);
        }
        else {
            recordReplayComp.removeAttr('checked');
            recordReplayComp.removeProp('checked');
        }
        var useAdvancedFeaturesOpt = this.getProperty('use_advanced_features');
        if (useAdvancedFeaturesOpt == null)
            useAdvancedFeaturesOpt = "false";
        var useAdvanComp = settingPage.find('.chk_set_use_advanced_features');
        if (hjow_parseBoolean(useAdvancedFeaturesOpt)) {
            useAdvanComp.attr('checked', 'checked');
            useAdvanComp.prop('checked', true);
        }
        else {
            useAdvanComp.removeAttr('checked');
            useAdvanComp.removeProp('checked');
        }
        var customLocaleOpt = this.getProperty('locale');
        if (customLocaleOpt == null || customLocaleOpt == '')
            customLocaleOpt = hjow_selectedLocale;
        if (hjow_selectedLocale == null || typeof (hjow_selectedLocale) == 'undefined') {
            var browserLocale = hjow_getLocaleInfo();
            if (!(typeof (browserLocale) == 'undefined' || browserLocale == null)) {
                var currentLocale = browserLocale;
                if (currentLocale == null || currentLocale.length <= 0)
                    return null;
                var needBreak = false;
                for (var idx = 0; idx < currentLocale.length; idx++) {
                    for (var ldx = 0; ldx < hjow_languageSets.length; ldx++) {
                        if (currentLocale[idx] == hjow_languageSets[ldx].locale || currentLocale[idx] == hjow_languageSets[ldx].localeAlt) {
                            customLocaleOpt = hjow_languageSets[ldx].locale;
                            needBreak = true;
                            break;
                        }
                    }
                    if (needBreak)
                        break;
                }
            }
        }
        settingPage.find('.sel_language').val(customLocaleOpt);
        this.initTheme(1, false);
        var heightIn = settingPage.height();
        settingPage.find('.setting_list').css('max-height', (heightIn - 150) + 'px');
        var themeScript = this.getProperty('theme_1');
        settingPage.find('.tx_theme_script_1').val('');
        if (themeScript != null && themeScript != '') {
            settingPage.find('.tx_theme_script_1').val(themeScript);
        }
        themeScript = this.getProperty('theme_2');
        settingPage.find('.tx_theme_script_2').val('');
        if (themeScript != null && themeScript != '') {
            settingPage.find('.tx_theme_script_2').val(themeScript);
        }
    };
    ;
    XCardGameEngine.prototype.resultReplay = function () {
        var results = this.replay.toPlainObjectDetail(this);
        jq(this.placeArea).find('.replay_json').val(JSON.stringify(results));
        jq(this.placeArea).find('.btn_show_replay').show();
    };
    ;
    XCardGameEngine.prototype.mainPageHTML = function () {
        var results = "";
        results += "<table class='element e001 full layout'>" + "\n";
        results += "  <tr class='element e002'>" + "\n";
        results += "     <td class='element e003 td_game_title'>" + "\n";
        results += "        <h2 class='element e004'>" + hjow_serializeXMLString(hjow_trans("X Card")) + "</h2>" + "\n";
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "  <tr class='element e005'>" + "\n";
        results += "     <td class='element e006 td_player_list'>" + "\n";
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "  <tr class='element e006'>" + "\n";
        results += "     <td class='element e007 td_game_start' style='height: 25px;'>" + "\n";
        results += "        <select class='element e008 sel_game_mode'></select>" + "\n";
        results += "        <button type='button' class='element e009 btn_game_start'>" + hjow_serializeXMLString(hjow_trans("Start Game")) + "</button>" + "\n";
        results += "        <div class='element e010 div_game_mode_desc'></div>" + "\n";
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    ;
    XCardGameEngine.prototype.setPageHTML = function () {
        var results = "";
        results += "<div class='element setting_list e011'>" + "\n";
        results += "<div class='element setting_element e012'>" + "\n";
        results += "   <p class='element e013'>" + "\n";
        results += "      <span class='element e014 label'>" + hjow_serializeXMLString(hjow_trans("Language")) + "</span>" + "\n";
        results += "      <select class='element e015 sel_language'>" + "\n";
        for (var ldx = 0; ldx < hjow_languageSets.length; ldx++) {
            var languageSetOne = hjow_languageSets[ldx];
            results += "<option value=\"" + hjow_serializeString(languageSetOne.locale) + "\">" + hjow_serializeString(languageSetOne.localeName) + "</option>" + "\n";
        }
        results += "      </select>" + "\n";
        results += "   </p>" + "\n";
        results += "</div>" + "\n";
        results += "<div class='element e016 setting_element'>" + "\n";
        results += "   <p class='element e017'>" + "\n";
        results += "      <input type='checkbox' class='element e018 chk_record_replay'/><span class='label'>" + hjow_serializeXMLString(hjow_trans("Record playing data")) + "</span>" + "\n";
        results += "   </p>" + "\n";
        results += "   <p class='element e019'>" + "\n";
        results += "      <pre class='element e020'>" + "\n";
        results += hjow_serializeXMLString(hjow_trans("Trying to record playing data includes all progress in the game.")) + "\n";
        results += "      </pre>" + "\n";
        results += "   </p>" + "\n";
        results += "</div>" + "\n";
        results += "<div class='element e021 setting_element'>" + "\n";
        results += "   <p class='element e022'>" + "\n";
        results += "      <input type='checkbox' class='element e023 chk_set_use_advanced_features'/><span class='label'>" + hjow_serializeXMLString(hjow_trans("Show advanced features")) + "</span>" + "\n";
        results += "   </p>" + "\n";
        results += "   <p class='element e023'>" + "\n";
        results += "      <pre class='element e024'>" + "\n";
        results += hjow_serializeXMLString(hjow_trans("Not recommended for beginners of using computer.")) + "\n";
        results += hjow_serializeXMLString(hjow_trans("If you use this features, you can use custom AI scripts.")) + "\n";
        results += hjow_serializeXMLString(hjow_trans("Please check your script for malware before using it.")) + "\n";
        results += "      </pre>" + "\n";
        results += "   </p>" + "\n";
        results += "</div>" + "\n";
        results += "<div class='element e025 setting_element'>" + "\n";
        results += "   <p class='element e026'>" + "\n";
        results += "      <span class='element e027 label'>" + hjow_serializeXMLString(hjow_trans("Theme Script")) + "</span>" + "\n";
        results += "   </p>" + "\n";
        results += "   <p class='element e028'>" + "\n";
        results += hjow_serializeXMLString(hjow_trans("You can paste the styling scripts here.")) + "\n";
        results += "   </p>" + "\n";
        results += "   <p class='element e029'>" + "\n";
        results += "      <textarea class='element e030 tx_theme_script tx_theme_script_1'></textarea>" + "\n";
        results += "   </p>" + "\n";
        results += "   <p class='element e031'>" + "\n";
        results += "      <textarea class='element e032 tx_theme_script tx_theme_script_2'></textarea>" + "\n";
        results += "   </p>" + "\n";
        results += "</div>" + "\n";
        results += "<div class='element setting_element scriptTest advanceMode'><input type='text' class='tx_console_run'/><button type='button' class='btn_console_run'>" + hjow_serializeXMLString(hjow_trans("Run")) + "</button></div>\n";
        results += "</div>" + "\n";
        results += "<div class='element e033 setting_element setting_buttons_bottom'>" + "\n";
        results += "   <p class='element e034'>" + "\n";
        results += "       <button type='button' class='element e035 btn_apply_setting'>" + hjow_serializeXMLString(hjow_trans("Apply")) + "</button>" + "\n";
        results += "       <span class='element label e148 lb_need_restart_to_apply'>" + hjow_serializeXMLString(hjow_trans("Some features will be applied after restart.")) + "</span>" + "\n";
        results += "   </p>" + "\n";
        results += "</div>" + "\n";
        return results;
    };
    ;
    XCardGameEngine.prototype.gamePageHTML = function () {
        var results = "";
        results += "<table class='element e036 full layout'>" + "\n";
        results += "   <tr class='element e037'>" + "\n";
        results += "       <td class='element e038 td_deck'>" + "\n";
        results += "           <span class='element e039 label'>" + hjow_serializeXMLString(hjow_trans("In deck,")) + " </span><span class='element e040 deck_lefts'>0</span><span class='element e041 label'>" + " " + hjow_serializeXMLString(hjow_trans("cards")) + "</span>" + "\n";
        results += "           <button type='button' class='element e042 btn_user_control btn_get_from_deck'>" + hjow_serializeXMLString(hjow_trans("Get one from deck")) + "</button>" + "\n";
        results += "       </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr class='element e043'>" + "\n";
        results += "       <td class='element e044 td_player_game_list min_height'>" + "\n";
        results += "          <div class='element e045 player_arena_div'>" + "\n";
        for (var idx = 0; idx < this.players.length; idx++) {
            var currentPlayer = this.players[idx];
            results += this.eachPlayerGameHTML(currentPlayer);
        }
        results += "          </div>" + "\n";
        results += "       </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr class='element e046'>" + "\n";
        results += "       <td class='element e047 td_game_status'>" + "\n";
        results += "           <span class='element e048 progress prog_game_status_bar'><span class='element e049 progress_in'>" + "</span><span class='element progress_text e147'></span></span>\n";
        results += "       </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    ;
    XCardGameEngine.prototype.hidePageHTML = function () {
        var results = "";
        results += "<table class='element e050 full layout'>" + "\n";
        results += "   <tr class='element e051'>" + "\n";
        results += "      <td class='element e052'>" + "\n";
        results += "          <button type='button' class='element e053 full btn_hide_reveal'>" + hjow_serializeXMLString(hjow_trans("Press this button to continue...")) + "</button>" + "\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr class='element e054'>" + "\n";
        results += "      <td class='element e055 td_game_status'>" + "\n";
        results += "           <span class='element e056 progress prog_hide_left_time'><span class='progress_in'>" + "</span></span>\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    ;
    XCardGameEngine.prototype.resultPageHTML = function () {
        var gameMode = this.getSelectedGameMode();
        var results = "";
        results += "<table class='element e057 full layout'>" + "\n";
        results += "   <tr class='element e058'>" + "\n";
        results += "      <td class='element e059'>" + "\n";
        results += "         <h3 class='element e060'>" + hjow_serializeXMLString(hjow_trans("Result")) + "</h3>" + "<br/>" + "\n";
        results += "         <span class='element label e149 finish_result'>" + hjow_trans("Reason") + " : </span><span class='element label e150 finish_result lb_finish_result'></span>" + "\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr class='element e061'>" + "\n";
        results += "      <td class='element e062'>" + "\n";
        var playerOrders = hjow_orderPlayerList(this.players, gameMode);
        var orderNo = 0;
        var lastPlayerPoint = null;
        for (var idx = 0; idx < playerOrders.length; idx++) {
            var playerOne = playerOrders[idx];
            var playerPoint = playerOne.getCurrentPoint(this.getSelectedGameMode());
            if (lastPlayerPoint == null || lastPlayerPoint.compare(playerPoint) > 0) {
                lastPlayerPoint = playerPoint;
                orderNo++;
            }
            var isLowest = "";
            if (idx == playerOrders.length - 1)
                isLowest = " order_player_last";
            results += "<table class='element e063 table_each_player_result presult_" + hjow_serializeString(playerOne.getUniqueId()) + " order_player_" + orderNo + isLowest + "'>";
            results += "   <tr class='element e064'>" + "\n";
            results += "      <td class='element e065 label'>" + "\n";
            results += "          <span class='element e066 label'>" + hjow_serializeXMLString(hjow_trans("Name")) + "</span>" + "\n";
            results += "      </td>" + "\n";
            results += "      <td class='element e067'>" + "\n";
            results += "          <input type='text' class='element e068 i_name' disabled='disabled'/>" + "\n";
            results += "      </td>" + "\n";
            results += "      <td class='element e069 label'>" + "\n";
            results += "          <span class='element e070 label'>" + hjow_serializeXMLString(hjow_trans("Type")) + "</span>" + "\n";
            results += "      </td>" + "\n";
            results += "      <td class='element e071'>" + "\n";
            results += "          <input type='text' class='element e072 i_type' disabled='disabled' value='" + hjow_serializeString(playerOne.getPlayerTypeName()) + "'/>" + "\n";
            results += "      </td>" + "\n";
            results += "   </tr>" + "\n";
            results += "   <tr class='element e073'>" + "\n";
            results += "      <td class='element e074 label'>" + "\n";
            results += "          <span class='element e075 label'>" + hjow_serializeXMLString(hjow_trans("Affects")) + "</span>" + "\n";
            results += "      </td>" + "\n";
            results += "      <td colspan='3' class='element e076'>" + "\n";
            results += "          <input type='text' class='element e077 i_affects' disabled='disabled'/>" + "\n";
            results += "      </td>" + "\n";
            results += "   </tr>" + "\n";
            results += "   <tr class='element e078'>" + "\n";
            results += "      <td class='element e079 label'>" + "\n";
            results += "          <span class='element e080 label'>" + hjow_serializeXMLString(hjow_trans("Point")) + "</span>" + "\n";
            results += "      </td>" + "\n";
            results += "      <td colspan='3' class='element e081'>" + "\n";
            results += "          <input type='text' class='element e082 i_point' disabled='disabled'/>" + "\n";
            results += "      </td>" + "\n";
            results += "   </tr>" + "\n";
            results += "</table>";
        }
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr class='element e083'>" + "\n";
        results += "      <td class='element e084'>" + "\n";
        results += "         <button type='button' class='element e085 btn_end'>" + hjow_serializeXMLString(hjow_trans("OK")) + "</button>" + "\n";
        results += "         <button type='button' class='element e086 btn_show_replay'>" + hjow_serializeXMLString(hjow_trans("See Record")) + "</button>" + "\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "</table>" + "\n";
        results += "<div class='replay_result element e087'><textarea class='replay_json element e088' readonly='readonly'></textarea></div>" + "\n";
        return results;
    };
    ;
    XCardGameEngine.prototype.eachPlayerMainHTML = function (player) {
        var results = "";
        results += "<table class='full player_each element e089'>" + "\n";
        results += "   <colgroup>" + "\n";
        results += "       <col class='player_info_basic_label element e090'/>" + "\n";
        results += "       <col class='player_info_basic element e091'/>" + "\n";
        results += "       <col />" + "\n";
        results += "   </colgroup>" + "\n";
        results += "   <tbody>" + "\n";
        results += "       <tr class='element e092'>" + "\n";
        results += "          <td class='element e093 player_info_basic_label'>" + "\n";
        results += "              <span class='label element e094'>" + hjow_serializeXMLString(hjow_trans("Name")) + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td class='element e095 player_info_basic'>" + "\n";
        var playerNameFieldOpt = "";
        if (!player.isNameEditable())
            playerNameFieldOpt = " disabled";
        results += "             <input type='text' class='element e096 inp_pname" + playerNameFieldOpt + "' name='pname_" + hjow_serializeString(player.getUniqueId()) + "' value='" + hjow_serializeString(player.getName()) + "'" + playerNameFieldOpt + "/>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td rowspan='2' class='element e097'>" + "\n";
        var customHtml = player.customMainHTML();
        if (customHtml != null)
            results += customHtml;
        results += "          </td>" + "\n";
        results += "       </tr>" + "\n";
        results += "       <tr class='element e098'>" + "\n";
        results += "          <td class='player_info_basic_label element e099'>" + "\n";
        results += "              <span class='label element e100'>" + hjow_serializeXMLString(hjow_trans("Type")) + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td class='player_info_basic element e101'>" + "\n";
        results += "             <span class='player_type element e102'>" + hjow_serializeXMLString(hjow_trans(player.getPlayerTypeName())) + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "       </tr>" + "\n";
        results += "   </tbody>" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    ;
    XCardGameEngine.prototype.eachPlayerGameHTML = function (player) {
        var results = player.customGameHTML();
        if (results == null || results == "") {
            results = "<div class='element e103 div_player_arena_each pdiv_" + hjow_serializeString(player.getUniqueId()) + "'>";
            results += "<table class='element e104 td_player player_place table_player_arena_each pplace_" + hjow_serializeString(player.getUniqueId()) + "'>" + "\n";
            results += "   <tr class='element e105 player_arena_one_line_layout'>";
            results += "      <td colspan='2' class='element e106 player_arena_one_line_layout'>";
            results += "         <span class='player_name element e107'>" + hjow_serializeXMLString(player.getName()) + "</span>";
            results += "      </td>";
            results += "   </tr>";
            results += "   <tr class='element e108 player_arena_one_line_layout'>";
            results += "      <td class='element e109 player_arena_one_line_layout'>";
            results += "          <span class='element e110 label'>" + hjow_trans("Inventory") + "</span>";
            results += "      </td>";
            results += "      <td class='element e111 player_arena_one_line_layout'>";
            results += "          <span class='element e112 label'>" + hjow_trans("Point Affectors") + "</span>";
            results += "      </td>";
            results += "   </tr>";
            results += "   <tr class='element e113'>";
            results += "      <td class='element e114 td_select_container'>";
            results += "         <select multiple class='element e115 select_player_arena inventory pinventory_" + hjow_serializeString(player.getUniqueId()) + "'>";
            results += "         </select>";
            results += "      </td>";
            results += "      <td class='element e116 td_select_container'>";
            results += "         <select multiple class='element e117 select_player_arena affector paffector_" + hjow_serializeString(player.getUniqueId()) + "'>";
            results += "         </select>";
            results += "      </td>";
            results += "   </tr>";
            results += "   <tr class='element e118 player_arena_one_line_layout'>";
            results += "      <td class='element e119 player_arena_one_line_layout'>";
            results += "          <span class='element e120 player_inventory_card_count'>0</span> <span class='label'>" + hjow_serializeXMLString(hjow_trans("Cards")) + "</span>";
            results += "      </td>";
            results += "      <td class='element e121 player_arena_one_line_layout'>";
            results += "          <button type='button' class='element e122 btn_user_control btn_pay_here' x-unique-id=\"" + hjow_serializeString(player.getUniqueId()) + "\">" + hjow_serializeXMLString(hjow_trans("Pay here")) + "</button>";
            results += "      </td>";
            results += "   </tr>";
            results += "   <tr class='element e123 player_arena_one_line_layout'>";
            results += "      <td colspan='2' class='element e124 player_arena_one_line_layout'>";
            results += "          <span class='element e125 point_number ppoint_" + hjow_serializeString(player.getUniqueId()) + "'>0</span> <span class='label element e126'>" + "Points" + "</span>";
            results += "      </td>";
            results += "   </tr>";
            results += "</table>" + "\n";
            results += "</div>";
        }
        return results;
    };
    ;
    XCardGameEngine.prototype.toolbarHTML = function () {
        var results = "";
        results += "<div class='element e127 toolbar_element left toolbar_buttons'>";
        if (this.gameStarted) {
            results += "<button type='button' class='element e128 btn_stop_game'>" + hjow_serializeXMLString(hjow_trans("Stop Game")) + "</button> ";
        }
        else if (this.showSettings) {
            results += "<button type='button' class='element e130 btn_go_main'>" + hjow_serializeXMLString(hjow_trans("Go back to main")) + "</button> ";
        }
        if (jq('.hjow_xcard_how_to_play_dialog').length >= 1) {
            results += "   <button type='button' class='element e146 btn_show_how_to'> " + hjow_serializeXMLString(hjow_trans("How to play")) + "</button>";
        }
        if ((!this.showSettings) && ((!(this.gameStarted || this.showResult || this.needHideScreen)) || this.isDebugMode())) {
            results += "<button type='button' class='element e129 btn_go_setting'>" + hjow_serializeXMLString(hjow_trans("Settings")) + "</button> ";
        }
        results += "   <button type='button' class='element e131 btn_show_log'> " + hjow_serializeXMLString(hjow_trans("Show Log")) + "</button>";
        results += "   <button type='button' class='element e132 btn_delete_log'>" + hjow_serializeXMLString(hjow_trans("Delete Log")) + "</button>";
        var platformInfo = hjow_getPlatform();
        if (!(platformInfo == 'ios' || platformInfo == 'browser'))
            results += "   <button type='button' class='element e132 btn_exit'>" + hjow_serializeXMLString(hjow_trans("Exit")) + "</button>";
        results += "</div>";
        results += "<div class='element e133 toolbar_element'>";
        results += "<span class='element e134 madeby'>Made by HJOW (hujinone22@naver.com)</span>";
        results += "</div>";
        results += "<div class='element e135 toolbar_element right'>";
        results += "<span class='element e136 version'>v" + this.version + "</span>";
        results += "</div>";
        return results;
    };
    ;
    XCardGameEngine.prototype.applyInputs = function () {
        if (this.gameStarted)
            return;
        if (this.needHideScreen)
            return;
        if (this.showResult)
            return;
        if (jq(this.placeArea).find('.page_main').is(':empty'))
            return;
        var selGameMode = jq(this.placeArea).find('.sel_game_mode');
        var selectedGameModeVal = selGameMode.val();
        if (selectedGameModeVal != null) {
            this.gameModeIndex = parseInt(selectedGameModeVal);
        }
        for (var idx = 0; idx < this.players.length; idx++) {
            var playerOne = this.players[idx];
            var playerBlock = jq(this.placeArea).find(".pbasic_" + hjow_serializeString(playerOne.getUniqueId()));
            if (playerBlock.length == 0)
                continue;
            playerOne.setName(playerBlock.find('.inp_pname').val(), this);
            playerOne.applyInputs(this, this.gameStarted, this.needHideScreen, this.showResult);
        }
    };
    ;
    XCardGameEngine.prototype.applySettings = function () {
        var settingPage = jq(this.placeArea).find(".page_set");
        var recordRepComp = settingPage.find('.chk_record_replay');
        if (recordRepComp.is(':checked')) {
            this.setProperty('record_replay', 'true');
        }
        else {
            this.setProperty('record_replay', 'false');
        }
        var useAdvComp = settingPage.find('.chk_set_use_advanced_features');
        if (useAdvComp.is(':checked')) {
            this.setProperty('use_advanced_features', 'true');
        }
        else {
            this.setProperty('use_advanced_features', 'false');
        }
        var localeSel = settingPage.find('.sel_language').val();
        if (!(localeSel == null || typeof (localeSel) == 'undefined')) {
            hjow_selectedLocale = localeSel;
            this.setProperty('locale', localeSel);
        }
        var themeScripts = settingPage.find('.tx_theme_script_1').val();
        if (themeScripts == null)
            themeScripts = '';
        try {
            if (themeScripts != '')
                JSON.parse(themeScripts);
        }
        catch (e) {
            hjow_alert(e, hjow_trans('Error'));
            themeScripts = '';
        }
        this.setProperty('theme_1', themeScripts);
        themeScripts = settingPage.find('.tx_theme_script_2').val();
        if (themeScripts == null)
            themeScripts = '';
        try {
            if (themeScripts != '')
                JSON.parse(themeScripts);
        }
        catch (e) {
            hjow_alert(e, hjow_trans('Error'));
            themeScripts = '';
        }
        this.setProperty('theme_2', themeScripts);
        try {
            this.save();
            this.applyProperties();
        }
        catch (e) {
            hjow_alert(e, hjow_trans('Error'));
        }
    };
    ;
    XCardGameEngine.prototype.payHere = function (targetPlayerUniqueId, cardUniqueId) {
        var player = this.getPlayerNowTurn();
        var targetPlayer = this.findPlayer(targetPlayerUniqueId);
        var errMsg = targetPlayer.canPayByUniqId(cardUniqueId, player);
        if (errMsg != null) {
            hjow_alert(errMsg, hjow_trans('Information'));
            return errMsg;
        }
        var targetCard = player.findInventoryCard(this, cardUniqueId);
        var targetPlayerIdx = -1;
        for (var pdx = 0; pdx < this.players.length; pdx++) {
            if (targetPlayer.getUniqueId() == this.players[pdx].getUniqueId()) {
                targetPlayerIdx = pdx;
                break;
            }
        }
        errMsg = targetPlayer.payByUniqId(cardUniqueId, player);
        if (errMsg != null) {
            hjow_alert(errMsg, hjow_trans('Information'));
            return errMsg;
        }
        if (this.replay != null) {
            try {
                var action = new XCardReplayAction();
                var plainObj = targetCard.toPlainObjectDetail(this);
                var cloned = new XCard();
                cloned.no = plainObj.no;
                cloned.op = plainObj.op;
                cloned.setUniqueId(this, plainObj.uniqueId);
                action.card = cloned;
                action.actionPlayerIndex = this.turnPlayerIndex;
                action.payTargetPlayerIndex = -1;
                action.date = new Date();
                this.replay.actions.push(action);
            }
            catch (e) {
                hjow_error(e);
                this.replay = null;
            }
        }
        hjow_log("TURN [" + player.getName() + "] : " + hjow_replaceStr(hjow_replaceStr(hjow_trans("Pay the card '[[CARD]]' to the player '[[PLAYER]]'."), "[[CARD]]", targetCard.toString()), "[[PLAYER]]", targetPlayer.getName()));
        this.nextTurn();
        return null;
    };
    ;
    XCardGameEngine.prototype.removeButtonEvent = function (btnObj) {
        var buttonOne = jq(btnObj);
        if (buttonOne.length >= 1) {
            try {
                buttonOne.removeAttr('onclick');
                buttonOne.off('click');
            }
            catch (e) { }
        }
    };
    ;
    XCardGameEngine.prototype.removeSelectEvent = function (selObj) {
        var selOne = jq(selObj);
        if (selOne.length >= 1) {
            try {
                selOne.removeAttr('onchange');
                selOne.off('change');
            }
            catch (e) { }
        }
    };
    ;
    XCardGameEngine.prototype.reAllocateButtonEvent = function (btnObj, actFunc) {
        var buttonOne = jq(btnObj);
        if (buttonOne.length >= 1) {
            this.removeButtonEvent(buttonOne);
            buttonOne.on('click', function () {
                actFunc(jq(this));
                return false;
            });
        }
        return buttonOne;
    };
    ;
    XCardGameEngine.prototype.reAllocateSelectEvent = function (selObj, actFunc) {
        var selOne = jq(selObj);
        if (selOne.length >= 1) {
            this.removeSelectEvent(selOne);
            selOne.on('change', function () {
                actFunc(jq(this));
                return false;
            });
        }
        return selOne;
    };
    ;
    XCardGameEngine.prototype.refreshEvents = function () {
        var selfObj = this;
        var selfAny = this.getSelfObject();
        var pageArea = jq(this.placeArea);
        this.removeButtonEvent(pageArea.find('button'));
        this.removeSelectEvent(pageArea.find('select'));
        this.reAllocateButtonEvent(pageArea.find('.btn_game_start'), function (compObj) {
            selfAny.events.main.btn_game_start();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_add_player'), function (compObj) {
            selfAny.events.main.btn_add_player();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_remove_player'), function (compObj) {
            selfAny.events.main.btn_remove_player();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_go_setting'), function (compObj) {
            selfAny.events.main.btn_go_settings();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_apply_setting'), function (compObj) {
            selfAny.events.main.btn_save_settings();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_show_log'), function (compObj) {
            hjow_openLogDialog();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_delete_log'), function (compObj) {
            hjow_deleteLogDialog();
        });
        this.reAllocateSelectEvent(pageArea.find('.sel_game_mode'), function (compObj) {
            selfAny.events.main.sel_mode_changed();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_get_from_deck'), function (compObj) {
            selfAny.events.game.btn_get_from_deck();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_go_main'), function (compObj) {
            selfAny.events.main.btn_go_main();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_hide_reveal'), function (compObj) {
            selfAny.events.hide.reveal();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_pay_here'), function (compObj) {
            selfAny.events.game.btn_pay_here(compObj.attr('x-unique-id'));
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_stop_game'), function (compObj) {
            selfAny.events.game.btn_game_stop();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_end'), function (compObj) {
            selfAny.events.result.title();
        });
        this.reAllocateButtonEvent(pageArea.find('.btn_show_replay'), function (compObj) {
            selfAny.events.result.show_replay();
        });
        this.reAllocateButtonEvent(jq('.btn_show_how_to'), function (compObj) {
            selfAny.showHowToPlayDialog();
        });
        this.reAllocateButtonEvent(jq('.btn_console_run'), function (compObj) {
            hjow_log(eval(jq(selfObj.placeArea).find('.tx_console_run').val()));
            hjow_openLogDialog();
        });
        this.reAllocateButtonEvent(jq('.btn_exit'), function (compObj) {
            hjow_tryExit();
        });
    };
    ;
    XCardGameEngine.prototype.prepareEvents = function () {
        var selfObj = this;
        var selfAny = this.getSelfObject();
        selfAny.events = {};
        selfAny.events.main = {};
        selfAny.events.main.btn_game_start = function () {
            selfObj.startGame();
        };
        selfAny.events.main.btn_add_player = function () {
            var typeOf = jq(selfObj.getPlaceArea()).find('.sel_player_type').val();
            var playerCreator = null;
            for (var idx = 0; idx < selfObj.playerTypes.length; idx++) {
                if (selfObj.playerTypes[idx].getTypeName() == typeOf) {
                    playerCreator = selfObj.playerTypes[idx];
                    break;
                }
            }
            if (playerCreator == null) {
                hjow_alert(hjow_trans("Please select correct player type."), hjow_trans('Information'));
                return;
            }
            var newPlayer = playerCreator.create(playerCreator.getTypeName() + " " + selfObj.players.length);
            selfObj.players.push(newPlayer);
            selfObj.refreshPage(false);
        };
        selfAny.events.main.btn_remove_player = function () {
            if (selfObj.players.length == 0)
                return;
            selfObj.players[selfObj.players.length - 1].resetCards();
            hjow_removeItemFromArray(selfObj.players, selfObj.players.length - 1);
            selfObj.refreshPage(false);
        };
        selfAny.events.main.btn_go_settings = function () {
            selfObj.showSettings = true;
            if (!selfObj.isDebugMode()) {
                selfObj.needHideScreen = false;
                selfObj.showResult = false;
            }
            selfObj.refreshPage();
        };
        selfAny.events.main.btn_go_main = function () {
            selfObj.showSettings = false;
            if (!selfObj.isDebugMode()) {
                selfObj.showResult = false;
                selfObj.needHideScreen = false;
                selfObj.gameStarted = false;
            }
            selfObj.refreshPage();
        };
        selfAny.events.main.btn_save_settings = function () {
            if (!hjow_parseBoolean(selfObj.getProperty('localStorageAvailable'))) {
                hjow_alert(hjow_trans('On this platform, local storage saving is not working. Changes will be applied only this time.'));
            }
            selfObj.applySettings();
            if (selfObj.isDebugMode()) {
                selfObj.showSettings = false;
                selfObj.refreshPage();
            }
            else {
                selfAny.events.main.btn_go_main();
            }
            selfObj.applyProperties();
        };
        selfAny.events.main.sel_mode_changed = function () {
            selfObj.applyInputs();
            selfObj.refreshMainGameMode();
        };
        selfAny.events.game = {};
        selfAny.events.game.btn_get_from_deck = function () {
            var player = selfObj.players[selfObj.turnPlayerIndex];
            var card = selfObj.deck[0];
            hjow_removeItemFromArray(selfObj.deck, 0);
            player.addOneOnInventory(card, selfObj);
            if (selfObj.replay != null) {
                try {
                    var action = new XCardReplayAction();
                    action.card = null;
                    action.actionPlayerIndex = selfObj.turnPlayerIndex;
                    action.payTargetPlayerIndex = -1;
                    action.date = new Date();
                    selfObj.replay.actions.push(action);
                }
                catch (e) {
                    hjow_error(e);
                    selfObj.replay = null;
                }
            }
            hjow_log("TURN [" + player.getName() + "] : " + hjow_trans("Get one card from deck."));
            selfObj.nextTurn();
        };
        selfAny.events.game.btn_pay_here = function (playerUniqId) {
            var player = selfObj.players[selfObj.turnPlayerIndex];
            var playerInvenObj = jq(selfObj.getPlaceArea()).find(".pplace_" + hjow_serializeString(player.getUniqueId()) + " .inventory");
            var selectedCardVal = playerInvenObj.val();
            if (selectedCardVal.length <= 0) {
                hjow_alert(hjow_trans("Please select your card first."), hjow_trans('Information'));
                return;
            }
            if (selectedCardVal.length > 1) {
                hjow_alert(hjow_trans("Cannot pay multiple cards."), hjow_trans('Information'));
                return;
            }
            selfObj.payHere(playerUniqId, selectedCardVal[0]);
        };
        selfAny.events.game.btn_game_stop = function () {
            selfObj.resultReason = hjow_trans('The user stop the game.');
            selfObj.finishGame(false);
        };
        selfAny.events.hide = {};
        selfAny.events.hide.reveal = function () {
            selfObj.showSettings = false;
            selfObj.needHideScreen = false;
            selfObj.turnChanging = false;
            selfObj.refreshPage(false);
        };
        selfAny.events.result = {};
        selfAny.events.result.title = function () {
            selfObj.showSettings = false;
            selfObj.needHideScreen = false;
            selfObj.gameStarted = false;
            selfObj.showResult = false;
            selfObj.clearAllPlayers();
            selfObj.refreshPage(true);
        };
        selfAny.events.result.show_replay = function () {
            jq(selfObj.getPlaceArea()).find('.btn_show_replay').hide();
            jq(selfObj.getPlaceArea()).find('.replay_result').show();
            jq(selfObj.getPlaceArea()).find('.replay_json').show();
        };
    };
    ;
    XCardGameEngine.prototype.getDefaultTheme = function (themeType) {
        var themeArr = [];
        var themeOne = {};
        return JSON.stringify(themeArr);
    };
    ;
    XCardGameEngine.prototype.makeThemeElementObject = function (selector, value) {
        var themeOne = {};
        themeOne[this.placeArea + ' ' + selector] = value;
        return themeOne;
    };
    ;
    XCardGameEngine.prototype.prepareHowToPlayDialog = function () {
        var dialogObj = jq('.hjow_xcard_how_to_play_dialog');
        var htmls = "";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("There must be at least two players, and there is no maximum limit, but it is recommended that four players play. Support play with simple AI computer.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("This game is a turn-based card game.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("The cards used in this game are represented by numbers between -1 and 10, and three symbols (＋－×); As such, there are 33 different types of cards in a set of cards.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("The game uses as many sets of cards as there are players. For example, if two people play the game, the game will be played with 66 cards.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("When the game starts, each player receives 10 cards after shuffling. Place the remaining cards invisible on the 'deck'.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("The player will not see the opponent's card.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("When you are on your turn, the player either takes a card from the deck, or You must place one card of your own card in place of another player. Cards placed are not available and must be placed for viewing by anyone.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("If there is already a card in the player's seat, no cards can be placed there. Only cards with the same number of symbols or symbols at the end can be 'placed'. However, a card with a number of 1 can be placed in a different number or symbol.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("If the number of the last card 'placed' is 7, only the owner of the place can place another card.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("If there is no card on deck, or someone who doesn't have any card, the game ends and scores should be calculated.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("The score is calculated as a mathematical operation of the cards 'placed' for the player. If there are no cards left, it is 0. Calculations are performed in order, regardless of operator.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("Player 'A' 's 'placed' cards : [＋5][－5][－6][－6][＋4][×4] Point calculation : (0 ＋ 5 － 5 － 6 － 6 ＋4) × 4 = －32")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_trans("The player with the highest score wins.")) + "\n";
        htmls += "</p>";
        htmls += "<p>";
        htmls += hjow_replaceBr(hjow_replaceStr(hjow_trans("Please visit [[URL]] to get more."), "[[URL]]", "<a href='https://github.com/HJOW/X-Card/blob/master/README.md' target='blank'>https://github.com/HJOW/X-Card/blob/master/README.md</a>")) + "\n";
        htmls += "</p>";
        dialogObj.html(htmls);
    };
    ;
    XCardGameEngine.prototype.showHowToPlayDialog = function () {
        var dialogObj = jq('.hjow_xcard_how_to_play_dialog');
        if (dialogObj.length <= 0)
            return;
        dialogObj.dialog({
            width: 780,
            height: 550
        });
    };
    ;
    XCardGameEngine.prototype.prepareLanguageSets = function () {
        var newLangSet = null;
        newLangSet = new LanguageSet();
        newLangSet.locale = "en";
        newLangSet.localeAlt = "en-US";
        newLangSet.localeName = "English";
        newLangSet.stringTable = new Properties();
        hjow_languageSets.push(newLangSet);
        newLangSet = new LanguageSet();
        newLangSet.locale = "ko";
        newLangSet.localeAlt = "ko-KR";
        newLangSet.localeName = "한글";
        newLangSet.stringTable = new Properties();
        newLangSet.stringTable.set("Language", "언어");
        newLangSet.stringTable.set("Settings", "설정");
        newLangSet.stringTable.set("Run", "실행");
        newLangSet.stringTable.set("Exit", "종료");
        newLangSet.stringTable.set("Go back to main", "메인으로 돌아가기");
        newLangSet.stringTable.set("Show Log", "로그 보기");
        newLangSet.stringTable.set("Delete Log", "로그 지우기");
        newLangSet.stringTable.set("Apply", "적용");
        newLangSet.stringTable.set("User", "사용자");
        newLangSet.stringTable.set("In deck,", "덱에는, ");
        newLangSet.stringTable.set("cards", "카드들이 있습니다.");
        newLangSet.stringTable.set("Get one from deck", "덱에서 카드 한 장 받기");
        newLangSet.stringTable.set("Inventory", "보유한 카드");
        newLangSet.stringTable.set("Point Affectors", "놓인 카드");
        newLangSet.stringTable.set("Cards", "카드");
        newLangSet.stringTable.set("Pay here", "카드 놓기");
        newLangSet.stringTable.set("X Card", "X Card");
        newLangSet.stringTable.set("Start Game", "게임 시작");
        newLangSet.stringTable.set("Stop Game", "게임 중단");
        newLangSet.stringTable.set("Press this button to continue...", "계속 진행하려면 이 버튼을 클릭해 주세요.");
        newLangSet.stringTable.set("Result", "결과");
        newLangSet.stringTable.set("Reason", "이유");
        newLangSet.stringTable.set("Name", "이름");
        newLangSet.stringTable.set("Type", "타입");
        newLangSet.stringTable.set("Affects", "점수 계산식");
        newLangSet.stringTable.set("Point", "점수");
        newLangSet.stringTable.set("OK", "확인");
        newLangSet.stringTable.set("Show Record", "기록 보기");
        newLangSet.stringTable.set("Easy", "쉬움");
        newLangSet.stringTable.set("Normal", "보통");
        newLangSet.stringTable.set("Hard", "어려움");
        newLangSet.stringTable.set("Extreme", "극한");
        newLangSet.stringTable.set("Crazy", "미친 난이도");
        newLangSet.stringTable.set("Player", "플레이어");
        newLangSet.stringTable.set("AI", "AI");
        newLangSet.stringTable.set("Add", "추가");
        newLangSet.stringTable.set("Remove Last", "마지막 플레이어 삭제");
        newLangSet.stringTable.set("Difficulty", "난이도");
        newLangSet.stringTable.set("Concealed", "숨겨짐");
        newLangSet.stringTable.set("Please select your card first.", "보유한 카드에서 카드를 하나 선택해 주세요.");
        newLangSet.stringTable.set("7-Protected slot. Only the owner can pay here now.", "7 로 보호된 곳입니다. 마지막으로 7 카드가 놓인 곳에는 그 곳의 주인만 카드를 놓을 수 있습니다.");
        newLangSet.stringTable.set("The number, or the operation symbol should equal to the card [[LASTCARD]]", "마지막으로 놓인 카드([[LASTCARD]])와 숫자, 혹은 기호가 동일한 카드만 놓을 수 있습니다.");
        newLangSet.stringTable.set("Cannot pay multiple cards.", "여러 장의 카드를 동시에 놓을 수 없습니다.");
        newLangSet.stringTable.set("Pay the card '[[CARD]]' to the player '[[PLAYER]]'.", "'[[CARD]]' 카드를 플레이어 '[[PLAYER]]' 에게 제출함");
        newLangSet.stringTable.set("Get one card from deck.", "덱에서 카드를 한 장 받음");
        newLangSet.stringTable.set("Normal Mode", "기본 모드");
        newLangSet.stringTable.set("Speed Mode", "스피드 모드");
        newLangSet.stringTable.set("Multiplyless Mode", "× 없는 모드");
        newLangSet.stringTable.set("Each player will get 10 cards at the game starts.", "각 플레이어는 게임 시작 시 10장의 카드를 가지고 시작합니다.");
        newLangSet.stringTable.set("Each player will get 7 cards at the game starts. The number of card will be -1 to 5.", "각 플레이어는 게임 시작 시 7장의 카드를 가지고 시작합니다. 카드 숫자는 -1 에서 5까지만 등장합니다.");
        newLangSet.stringTable.set("There is no × card.", "×카드가 등장하지 않습니다.");
        newLangSet.stringTable.set("paste custom AI script here if you want", "직접 AI 인공지능 처리 스크립트를 사용하려면 이 곳에 붙여 넣으세요.");
        newLangSet.stringTable.set("Record playing data", "플레이 기록하기");
        newLangSet.stringTable.set("Trying to record playing data includes all progress in the game.", "게임의 진행 과정을 모두 기록합니다. 결과 화면에서 이 데이터를 JSON 텍스트 형식으로 볼 수 있습니다.");
        newLangSet.stringTable.set("Show advanced features", "고급 기능 활성화");
        newLangSet.stringTable.set("Not recommended for beginners of using computer.", "컴퓨터 초보에게는 사용을 권장하지 않습니다.");
        newLangSet.stringTable.set("If you use this features, you can use custom AI scripts.", "이 기능을 사용하면 커스텀 AI 스크립트를 입력할 수 있게 됩니다.");
        newLangSet.stringTable.set("Please check your script for malware before using it.", "스크립트 사용 전 스크립트 내용에 악성코드가 있는지 꼭 확인해 주세요.");
        newLangSet.stringTable.set("Error", "오류");
        newLangSet.stringTable.set("Information", "안내");
        newLangSet.stringTable.set("Message", "메시지");
        newLangSet.stringTable.set("Tip", "팁");
        newLangSet.stringTable.set("Tutorial", "게임 배우기");
        newLangSet.stringTable.set("Tutorial Assistant", "튜토리얼 도우미");
        newLangSet.stringTable.set("Theme Script", "테마 스크립트");
        newLangSet.stringTable.set("You can paste the styling scripts here.", "이 곳에 테마 변경용 스크립트(JSON)를 입력할 수 있습니다.");
        newLangSet.stringTable.set("On this platform, local storage saving is not working. Changes will be applied only this time.", "이 플랫폼에서는 로컬 저장소 기능을 사용할 수 없습니다. 설정은 적용되지만 다음 번 실행 시 다시 초기화됩니다.");
        newLangSet.stringTable.set("Some custom player setting is not supported for recording replay.", "사용자 정의 플레이어 세팅으로 인해 리플레이 저장 기능이 동작하지 않습니다.");
        newLangSet.stringTable.set("The game is preparing to start.", "게임 시작을 준비하고 있습니다.");
        newLangSet.stringTable.set("Game is started.", "게임이 시작되었습니다.");
        newLangSet.stringTable.set("Mode", "모드");
        newLangSet.stringTable.set("Cards is shuffled.", "카드를 섞었습니다.");
        newLangSet.stringTable.set("The first turn number is [[NUMBER]]", "첫 번째로 시작할 플레이어의 번호는 [[NUMBER]] 입니다.");
        newLangSet.stringTable.set("Your turn, [[PLAYER]].", "[[PLAYER]] 의 차례입니다.");
        newLangSet.stringTable.set("Game is finished.", "게임이 끝났습니다.");
        newLangSet.stringTable.set("See Record", "기록 보기");
        newLangSet.stringTable.set("Debug mode was activated.", "디버그 모드 활성화됨");
        newLangSet.stringTable.set("Please add player to play.", "게임 시작 전 플레이어를 추가해 주세요.");
        newLangSet.stringTable.set("Please select correct player type.", "올바른 플레이어 타입을 선택해 주세요.");
        newLangSet.stringTable.set("Try this first to learn about this game.", "게임을 배우기 위해 이 모드를 처음 플레이해 보세요.");
        newLangSet.stringTable.set("How to play", "게임 방법");
        newLangSet.stringTable.set("Some features will be applied after restart.", "일부 기능은 재시작 후 적용됩니다.");
        newLangSet.stringTable.set("The user stop the game.", "사용자가 게임을 중단시켰습니다.");
        newLangSet.stringTable.set("The player [[PLAYER]] does not have any card.", "플레이어 '[[PLAYER]]' 이/가 보유한 카드가 없습니다.");
        newLangSet.stringTable.set("The deck is empty.", "덱에 카드가 없습니다.");
        newLangSet.stringTable.set("There must be at least two players, and there is no maximum limit, but it is recommended that four players play. Support play with simple AI computer.", "플레이어는 최소 2명 이상이어야 하고, 최대 제한은 없지만 4명이서 플레이하는 것을 권장합니다.\n인공지능 컴퓨터와의 플레이를 지원합니다.");
        newLangSet.stringTable.set("This game is a turn-based card game.", "이 게임은 턴제 카드 게임입니다.");
        newLangSet.stringTable.set("The cards used in this game are represented by numbers between -1 and 10, and three symbols (＋－×); As such, there are 33 different types of cards in a set of cards.", "이 게임에서 사용하는 카드는, -1 ~ 10 사이의 숫자와,\n＋－× 3가지 기호 중 각 하나씩이 그려져 있습니다.\n이와 같이, 카드 1세트에는 33가지 다른 종류의 카드가 있습니다.");
        newLangSet.stringTable.set("The game uses as many sets of cards as there are players. For example, if two people play the game, the game will be played with 66 cards.", "게임에서는 플레이어 수 만큼의 세트의 카드들을 사용합니다.\n예를 들어, 2명의 플레이어가 있다면 66장의 카드로 게임을 진행합니다.");
        newLangSet.stringTable.set("When the game starts, each player receives 10 cards after shuffling. Place the remaining cards invisible on the 'deck'.", "게임이 시작되면, 카드를 섞은 후 각 플레이어는 카드를 10장씩 받습니다.\n남은 카드는 '덱'에 보이지 않게 놓습니다.");
        newLangSet.stringTable.set("The player will not see the opponent's card.", "플레이어는 자신이 받은 카드를 상대방이 보이지 않도록 합니다.");
        newLangSet.stringTable.set("When you are on your turn, the player either takes a card from the deck, or You must place one card of your own card in place of another player. Cards placed are not available and must be placed for viewing by anyone.", "자신의 차례가 되면, 플레이어는 덱에서 카드를 한 장 받거나,\n또는 받은 자신의 카드 한 장을 다른 플레이어의 자리에 카드를 놓아야 합니다.\n자리에 놓인 카드는 게임이 끝날 때까지 누구도 사용이 불가능하며, 누구나 볼 수 있도록 놓아야 합니다.");
        newLangSet.stringTable.set("If there is already a card in the player's seat, no cards can be placed there. Only cards with the same number of symbols or symbols at the end can be 'placed'. However, a card with a number of 1 can be placed in a different number or symbol.", "플레이어의 자리에 이미 놓인 카드가 있다면, 그 곳에 아무 카드나 놓을 수 없습니다.\n마지막에 놓인 카드의 숫자, 혹은 기호가 동일한 카드만 놓을 수 있습니다.\n단, 숫자가 1인 카드는 예외적으로 숫자나 기호가 다른 자리에 놓을 수 있습니다.");
        newLangSet.stringTable.set("If the number of the last card 'placed' is 7, only the owner of the place can place another card.", "마지막에 놓인 카드의 숫자가 7인 자리에는 그 자리의 주인만 카드를 놓을 수 있습니다.");
        newLangSet.stringTable.set("If there is no card on deck, or someone who doesn't have any card, the game ends and scores should be calculated.", "덱에 카드가 한 장도 없거나, 받은 카드를 모두 소진한 플레이어가 1명이라도 있다면\n게임이 끝나고 점수를 계산합니다.");
        newLangSet.stringTable.set("The score is calculated as a mathematical operation of the cards 'placed' for the player. If there are no cards left, it is 0. Calculations are performed in order, regardless of operator.", "점수는 플레이어의 자리에 놓인 카드들을 순서대로 수학 연산하듯이 계산됩니다.\n계산할 때, 맨 앞에 숫자 0인 카드가 있다고 가정합니다.\n계산 순서는 연산자와 상관없이 순서대로 진행합니다.\n(곱셈이 섞여있어도 무조건 순서대로 계산)");
        newLangSet.stringTable.set("Player 'A' 's 'placed' cards : [＋5][－5][－6][－6][＋4][×4] Point calculation : (0 ＋ 5 － 5 － 6 － 6 ＋4) × 4 = －32", "플레이어 A의 자리에 [＋5][－5][－6][－6][＋4][×4] 가 순서대로 놓여 있으면\n점수 계산식은 (0 ＋ 5 － 5 － 6 － 6 ＋4) × 4 = －32");
        newLangSet.stringTable.set("The player with the highest score wins.", "점수가 가장 높은 플레이어가 승리합니다.");
        newLangSet.stringTable.set("Please visit [[URL]] to get more.", "[[URL]] 에 방문해 주세요.\n게임의 주요 소스코드가 공개되어 있습니다.");
        hjow_languageSets.push(newLangSet);
    };
    ;
    return XCardGameEngine;
}(ModuleObject));
;
//# sourceMappingURL=xcard.js.map