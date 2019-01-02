

/*
This JS library is made by HJOW.
E-mail : hujinone22@naver.com

This library need following libraries : jQuery, jQuery UI, BigInteger.js, hjow_common.
This library is coded as TypeScript. If this file's extension is 'js', please find 'ts' original file.

jQuery : https://jquery.com/
jQuery UI : https://jqueryui.com/
BigInteger.js : https://www.npmjs.com/package/big-integer?activeTab=readme
*/
/*
Copyright 2018 HJOW (hujinone22@naver.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var jqo: any = { // TypeScript 내에서 jQuery 사용을 위해 임시로 사용, html 파일 내에서 jq 에 jQuery 객체를 넣게 됨
    warnJQuery: function () { hjow_alert("Need jQuery to run this. Please call 'jq = $;' first."); },
    hide: function () { this.warnJQuery(); return self; },
    show: function () { this.warnJQuery(); return self; },
    css: function (a: string, b: string) { this.warnJQuery(); return self; },
    html: function (a: string) { this.warnJQuery(); return self; },
    each: function (a: any) { this.warnJQuery(); },
    find: function (a: any) { this.warnJQuery(); return self; },
    attr: function (a: string, b: string = null) { this.warnJQuery(); return ""; },
    prop: function (a: string, b: boolean = false) { this.warnJQuery(); return ""; },
    removeAttr: function (a) { this.warnJQuery(); return self; },
    removeProp: function (a) { this.warnJQuery(); return self; },
    remove: function () { this.warnJQuery(); return self; },
    append: function (a: any) { this.warnJQuery(); return self; },
    removeClass: function (a: string) { this.warnJQuery(); return self; },
    addClass: function (a: string) { this.warnJQuery(); return self; },
    val: function (a: any) { this.warnJQuery(); return ""; },
    length: 0,
    width: function (a: any) { this.warnJQuery(); return 0; },
    height: function (a: any) { this.warnJQuery(); return 0; },
    is: function (a: string) { this.warnJQuery(); return false; },
    dialog: function () { this.warnJQuery(); return self; },
    isArray: function (a: any) { this.warnJQuery(); return Array.isArray(a); }
};
var jq: Function = function (obj: Object) {
    return jqo;
};

var hjow_onRefreshComponents = null;

class UtilityMethods {
    public parseBoolean(val: any): boolean {
        return hjow_parseBoolean(val);
    };
};

class Uniqueable extends UtilityMethods {
    protected uniqueId: string = 'p' + Math.round(Math.random() * 999999999) + '' + Math.round(Math.random() * 999999999) + '' + Math.round(Math.random() * 999999999) + '' + Math.round(Math.random() * 999999999);
    public getUniqueId(): string {
        return this.uniqueId;
    }
};

class PropertiesEntry {
    public key: string = "";
    public value: string = "";
};

class Properties extends Uniqueable {
    private entries: PropertiesEntry[] = [];
    public put(key: string, value: string) {
        if (value == null) {
            this.remove(key);
            return null;
        }

        var newEntry: PropertiesEntry = new PropertiesEntry();
        newEntry.key = key;
        newEntry.value = value;
        for (var idx: number = 0; idx < this.entries.length; idx++) {
            if (this.entries[idx].key == key) {
                this.entries[idx] = newEntry;
                return;
            }
        }
        this.entries.push(newEntry);
    };
    public set(key: any, value: any) {
        this.put(String(key), String(value));
    };
    public get(key: string) {
        for (var idx: number = 0; idx < this.entries.length; idx++) {
            if (this.entries[idx].key == key) {
                return this.entries[idx].value;
            }
        }
        return null;
    };
    public remove(key: string): string {
        var targetIdx: number = -1;
        var value: string = null;
        for (var idx: number = 0; idx < this.entries.length; idx++) {
            if (this.entries[idx].key == key) {
                targetIdx = idx;
                value = this.entries[idx].value;
                break;
            }
        }

        hjow_removeItemFromArray(this.entries, targetIdx);
        return value;
    };
    public keyList() : string[] {
        var results: string[] = [];
        for (var idx: number = 0; idx < this.entries.length; idx++) {
            results.push(this.entries[idx].key);
        }
        return results;
    };
    public clear() {
        this.entries = [];
    };
    public serialize(): string {
        var results: any = {};
        for (var idx: number = 0; idx < this.entries.length; idx++) {
            hjow_putOnObject(results, this.entries[idx].key, this.entries[idx].value);
        }
        return JSON.stringify(results);
    };
    public fromPlainObject(results: any) {
        var selfObj = this;
        hjow_iterateObject(results, function (propertyName: any, valueOfProperty: any) {
            selfObj.put(String(propertyName), String(valueOfProperty));
        });
    };
    public fromJSON(str: string) {
        var results: Object = JSON.parse(str);
        this.fromPlainObject(results);
    };
};

class TBigInt {
    protected bigIntObj: any = null;
    public constructor(obj: any) {
        if (obj instanceof TBigInt) {
            this.bigIntObj = hjow_bigint(obj.bigIntObj);
        } else {
            this.bigIntObj = hjow_bigint(obj);
        }
    }
    public add(otherObj: TBigInt): TBigInt {
        return new TBigInt(hjow_bigint_add(this.bigIntObj, otherObj.bigIntObj));
    }
    public subtract(otherObj: TBigInt): TBigInt {
        return new TBigInt(hjow_bigint_subtract(this.bigIntObj, otherObj.bigIntObj));
    }
    public multiply(otherObj: TBigInt): TBigInt {
        return new TBigInt(hjow_bigint_multiply(this.bigIntObj, otherObj.bigIntObj));
    }
    public compare(otherObj: TBigInt): number {
        return hjow_bigint_compare(this.bigIntObj, otherObj.bigIntObj);
    }
    public getNativeObject(): any {
        return this.bigIntObj;
    }
    public toString(): string {
        return this.bigIntObj.toString();
    }
}

class XCardReplayAction {
    public date: Date = null;
    public actionPlayerIndex: number = 0;
    public payTargetPlayerIndex: number = -1; // -1 : get one card from deck
    public card: XCard = null; // pay target
    public toPlainObject(): any {
        return {
            date: hjow_date_to_string(this.date),
            actionPlayerIndex: this.actionPlayerIndex,
            payTargetPlayerIndex: this.payTargetPlayerIndex,
            card: this.card
        };
    }
    public toPlainObjectDetail(engine: XCardGameEngine): any {
        if (engine == null) return null;
        if (!(engine instanceof XCardGameEngine)) return null;
        var results = this.toPlainObject();
        if(this.card != null) results.card = this.card.toPlainObjectDetail(engine);
        return results;
    }
};

class XCardReplay {
    public date: Date = new Date();
    public actions: XCardReplayAction[] = [];
    public players: XCardPlayer[] = []; // should be first states
    public deck: XCard[] = []; // should be first states
    public gameMode: string = null;
    public toPlainObjectDetail(engine: XCardGameEngine): any {
        if (engine == null) return null;
        if (!(engine instanceof XCardGameEngine)) return null;

        var actionPlains: any = [];
        for (var adx = 0; adx < this.actions.length; adx++) {
            actionPlains.push(this.actions[adx].toPlainObjectDetail(engine));
        }

        var playersPlains: any = [];
        for (var pdx = 0; pdx < this.players.length; pdx++) {
            playersPlains.push(this.players[pdx].toPlainObject(engine));
        }

        var deckPlains: any = [];
        for (var ddx = 0; ddx < this.deck.length; ddx++) {
            deckPlains.push(this.deck[ddx].toPlainObjectDetail(engine));
        }

        return {
            date: hjow_date_to_string(this.date),
            actions: actionPlains,
            players: playersPlains,
            deck: deckPlains,
            gameMode: this.gameMode
        };
    };
};

class XCardAIProcessAction extends XCardReplayAction {
    public calculatedAIPoint: TBigInt = null;
}

class LanguageSet {
    public locale: string = null;
    public localeAlt: string = null;
    public localeName: string = null;
    public stringTable: Properties = null;
    public translate(target: string): string {
        var results: string = this.stringTable.get(target);
        if (results == null) {
            hjow_log(target);
            return target;
        }   
        return results;
    }
};
var hjow_languageSets: LanguageSet[] = [];
var hjow_selectedLocale: string = null;
var hjow_langSelectFirst: boolean = true;
function hjow_getCurrentLanguageSet(): LanguageSet {
    var browserLocale = hjow_getLocaleInfo();
    
    if (hjow_selectedLocale != null) {
        for (var ldx = 0; ldx < hjow_languageSets.length; ldx++) {
            if (hjow_selectedLocale == hjow_languageSets[ldx].locale || hjow_selectedLocale == hjow_languageSets[ldx].localeAlt) {
                return hjow_languageSets[ldx];
            }
        }
    }

    if (typeof (browserLocale) == 'undefined' || browserLocale == null) return null;

    var currentLocale: any[] = browserLocale;
    if (currentLocale == null || currentLocale.length <= 0) return null;
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
        hjow_langSelectFirst = false; // 혹시나 모를 무한반복 방지
        return hjow_getCurrentLanguageSet();
    }
    
    return null;
};
function hjow_trans(target: string): string {
    var langSet: LanguageSet = hjow_getCurrentLanguageSet();
    if (langSet == null) {
        hjow_log(target);
        return target;
    }
    return langSet.translate(target);
};

class ModuleObject extends Uniqueable {
    protected name: string = "";
    protected desc: string = "";
    protected startDate: Date = null;
    protected properties: Properties = null;
    public constructor(name: string, desc: string) {
        super();
        this.name = name;
        this.desc = desc;
        this.startDate = new Date();
        this.properties = new Properties();
    };
    public getClassName(): string {
        return "ModuleObject";
    };
    public getName(): string {
        return this.name;
    };
    public getDescription(): string {
        return this.desc;
    };
    public detail(htmlForm: boolean): string {
        var results: string = this.name + "\n\n" + this.desc + "\n\n" + this.startDate;
        if (htmlForm) results = hjow_htmlForm(results);
        return results;
    };
    public setProperty(key: string, value: string) {
        this.properties.put(key, value);
    };
    public getProperty(key: string): string {
        return this.properties.get(key);
    };
    public clearProperties() {
        this.properties.clear();
    };
    public propertyKeys(): string[] {
        return this.properties.keyList();
    };
};

class IntervalTimer extends ModuleObject {
    private timerRef: number = 0;
    private alives: boolean = false;
    public constructor(name: string, desc: string, func: Function, timeGap: number = 1000) {
        super(name, desc);
        this.timerRef = setInterval(func, timeGap);
        this.alives = true;
    };
    public getClassName(): string {
        return "IntervalTimer";
    };
    public isAlive(): boolean {
        return this.alives;
    };
    public stop() {
        clearInterval(this.timerRef);
        this.alives = false;
    };
};

class ImportantTimer extends IntervalTimer {
    public constructor(name: string, desc: string, func: Function, timeGap: number = 1000) {
        super(name, desc, func, timeGap);
    }
    public getClassName(): string {
        return "ImportantTimer";
    };
};

class XCard extends Uniqueable {
    public no: number = 0;
    public op: string = '';
    public apply(beforeVal: TBigInt): TBigInt {
        if (this.op == '+' || this.op == '＋') return new TBigInt(beforeVal).add(new TBigInt(this.no));
        if (this.op == '-' || this.op == '－') return new TBigInt(beforeVal).subtract(new TBigInt(this.no));
        if (this.op == '*' || this.op == '×') return new TBigInt(beforeVal).multiply(new TBigInt(this.no));

        // if (this.op == '+' || this.op == '＋') return beforeVal + this.no;
        // if (this.op == '-' || this.op == '－') return beforeVal - this.no;
        // if (this.op == '*' || this.op == '×') return beforeVal * this.no;

        return beforeVal;
    }
    public clone(): XCard {
        var newOne:XCard = new XCard();
        newOne.no = this.no;
        newOne.op = this.op;
        return newOne;
    }
    public toString(): string {
        var result = this.op + " ";
        if (this.no < 0) result += '(' + this.no + ')';
        else result += this.no + '';
        return result;
    }
    public toPlainObject(): any {
        var result = {
            op: this.op,
            no: this.no,
            toString: function () {
                var resultStr = this.op + " ";
                if (this.no < 0) resultStr += '(' + this.no + ')';
                else resultStr += this.no + '';
                return resultStr;
            }
        };
        return result;
    }
    public toPlainObjectDetail(engine: XCardGameEngine): any {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;
        var result = this.toPlainObject();
        result.uniqueId = this.uniqueId;
        return result;
    }
    public setUniqueId(engine: XCardGameEngine, uniqueId: string) {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;
        this.uniqueId = uniqueId;
    }
};

class XCardPlayer extends Uniqueable {
    private name: string = "";
    protected inventory: XCard[] = [];
    protected applied: XCard[] = [];

    constructor(name: string) {
        super();
        this.name = name;
    };
    public getName(): string {
        return this.name;
    }
    public setInventory(cardList: XCard[], engine: XCardGameEngine) {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;
        this.inventory = cardList;
    };
    public setApplied(cardList: XCard[], engine: XCardGameEngine) {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;
        this.applied = cardList;
    };
    public lastAppliedCard(): XCard {
        if (this.applied.length == 0) return null;
        return this.applied[this.applied.length - 1];
    };
    public findInventoryCard(engine: XCardGameEngine, cardUniqId: string): XCard {
        if (engine == null) return null;
        if (!(engine instanceof XCardGameEngine)) return null;
        for (var idx = 0; idx < this.inventory.length; idx++) {
            if (this.inventory[idx].getUniqueId() == cardUniqId) {
                return this.inventory[idx];
            }
        }
        return null;
    };
    public listInventoryDirect(engine: XCardGameEngine): XCard[] {
        if (engine == null) return null;
        if (!(engine instanceof XCardGameEngine)) return null;
        var newList: XCard[] = [];
        for (var idx = 0; idx < this.inventory.length; idx++) {
            newList.push(this.inventory[idx]);
        }
        return newList;
    };
    public listInventory(): XCard[] {
        var newList: XCard[] = [];
        for (var idx = 0; idx < this.inventory.length; idx++) {
            newList.push(this.inventory[idx].clone());
        }
        return newList;
    };
    public listInventoryPlainObject(): any[] {
        var newList: any[] = [];
        for (var idx = 0; idx < this.inventory.length; idx++) {
            newList.push(this.inventory[idx].toPlainObject());
        }
        return newList;
    };
    public listAppliedDirect(engine: XCardGameEngine): XCard[] {
        if (engine == null) return null;
        if (!(engine instanceof XCardGameEngine)) return null;
        var newList: XCard[] = [];
        for (var idx = 0; idx < this.applied.length; idx++) {
            newList.push(this.applied[idx]);
        }
        return newList;
    };
    public listApplied(): XCard[] {
        var newList: XCard[] = [];
        for (var idx = 0; idx < this.applied.length; idx++) {
            newList.push(this.applied[idx].clone());
        }
        return newList;
    };
    public listAppliedPlainObject(): any[] {
        var newList: any[] = [];
        for (var idx = 0; idx < this.applied.length; idx++) {
            newList.push(this.applied[idx].toPlainObject());
        }
        return newList;
    };
    public listAppliedAsString(): string {
        var affects: string = "0";
        var lastOp: string = "+";
        for (var idx = 0; idx < this.applied.length; idx++) {
            var cardOne: XCard = this.applied[idx];
            var needSealBlacket: boolean = false;

            if (lastOp == '+' || lastOp == '＋' || lastOp == '-' || lastOp == '－') {
                if (!(cardOne.op == '+' || cardOne.op == '＋' || cardOne.op == '-' || cardOne.op == '－')) {
                    needSealBlacket = true;
                }
            } else {
                if (cardOne.op == '+' || cardOne.op == '＋' || cardOne.op == '-' || cardOne.op == '－') {
                    needSealBlacket = true;
                }
            }

            if (needSealBlacket) affects = "(" + affects + ")";

            affects += " " + cardOne.op + " ";
            if (cardOne.no < 0) affects += " (" + cardOne.no + ")";
            else affects += " " + cardOne.no;
            
            lastOp = cardOne.op;
        }
        return affects;
    };
    private removeCardOnInventory(card: XCard) {
        var ownerInvIdx = 0;
        for (var idx = 0; idx < this.inventory.length; idx++) {
            if (this.inventory[idx].getUniqueId() == card.getUniqueId()) {
                ownerInvIdx = idx;
                break;
            }
        }
        hjow_removeItemFromArray(this.inventory, ownerInvIdx);
    };
    public addOneOnInventory(card: XCard, engine: XCardGameEngine) { // 인벤토리에 카드 하나 추가 (덱에서 추가할 때 보통 사용)
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;
        this.inventory.push(card);
    };
    public getInventoryCardCount(): number {
        return this.inventory.length;
    };
    public resetCards() {
        this.inventory = [];
        this.applied = [];
    };
    public canPay(card: XCard, owner: XCardPlayer): string { // 본인/상대방이 이 플레이어의 슬롯에 카드를 두기 전 가능여부 확인, null 리턴이면 카드 두기가 가능, 뭔가 문자열이 리턴이 되면 해당 이유로 인해 카드 두기가 불가능한 것
        var lastCard: XCard = this.lastAppliedCard();
        if (card == null || owner == null) return hjow_trans("Please select your card first.");
        if (lastCard == null) return null; // 카드가 아직 아무것도 놓인 게 없으면 무조건 허용
        if (lastCard.no == 7 && owner.getUniqueId() != this.getUniqueId()) {
            return hjow_trans("7-Protected slot. Only the owner can pay here now.");
        }
        if (card.no == 1) return null;
        if (lastCard.no == card.no) return null;
        if (lastCard.op == card.op) return null;

        return hjow_replaceStr(hjow_trans("The number, or the operation symbol should equal to the card [[LASTCARD]]"), "[[LASTCARD]]", lastCard.toString());
    };
    public canPayByUniqId(cardUniqId: string, owner: XCardPlayer): string {
        var card: XCard = null;
        if (cardUniqId == null) return hjow_trans("Please select your card first.");
        for (var idx = 0; idx < owner.inventory.length; idx++) {
            if (owner.inventory[idx].getUniqueId() == cardUniqId) {
                card = owner.inventory[idx];
            }
        }
        return this.canPay(card, owner);
    };
    public pay(card: XCard, owner: XCardPlayer): string { // 본인/상대방이 이 플레이어의 슬롯에 카드를 둘 때 사용, null 리턴이면 카드 두기가 성공(처리됨), 뭔가 문자열이 리턴이 되면 해당 이유로 인해 카드 두기가 불가능(처리 안됨)
        var lastCard: XCard = this.lastAppliedCard();
        var err: string = this.canPay(card, owner);
        if (err != null) return err;

        this.applied.push(card);
        owner.removeCardOnInventory(card);

        return null;
    };
    public payByUniqId(cardUniqId: string, owner: XCardPlayer): string {
        var card: XCard = null;
        if (cardUniqId == null) return hjow_trans("Please select your card first.");
        for (var idx = 0; idx < owner.inventory.length; idx++) {
            if (owner.inventory[idx].getUniqueId() == cardUniqId) {
                card = owner.inventory[idx];
            }
        }
        return this.pay(card, owner);
    };
    
    public getCurrentPoint(gameMode: XCardGameMode): TBigInt {
        var results: TBigInt = new TBigInt(0);
        for (var idx = 0; idx < this.applied.length; idx++) {
            var cardOne = this.applied[idx];
            results = cardOne.apply(results);
        }

        return gameMode.processPoint(this, results);
    };
    public getCurrentPointIfPaid(gameMode: XCardGameMode, additionalCard: XCard): TBigInt {
        var results: TBigInt = new TBigInt(0);
        var simulatedApplied: XCard[] = [];
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
    public customMainHTML(): string {
        return null;
    };
    public customGameHTML(): string {
        return null;
    };
    public applyInputs(engine: XCardGameEngine, gameStarted: boolean, needHideScreen: boolean, showResult: boolean) {

    };
    public refreshMain() {

    };
    public refreshGame() {

    };
    public getPlayerTypeName(): string {
        return null;
    };
    public isUserControllable(): boolean { // 사용자가 컨트롤 가능
        return true;
    };
    public needToHideInventoryForSelf(): boolean { // AI가 아닌 경우, 자기 자신 차례일 때는 인벤토리가 보여야 함
        return false;
    };
    public actOnTurn(engine: XCardGameEngine, mode: XCardGameMode, deck: XCard[], players: XCardPlayer[]) {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;

    };
    public setName(name: string, engine: XCardGameEngine) {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;
        this.name = name;
    };
    protected setUniqueId(uniqueId: string) {
        this.uniqueId = uniqueId;
    };
    public toPlainObject(engine: XCardGameEngine): any {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;

        var invArr: any[] = [];
        for (var idx = 0; idx < this.inventory.length; idx++) {
            invArr.push(this.inventory[idx].toPlainObjectDetail(engine));
        }
        var appArr: any[] = [];
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
};

class XCardPlayerCreator extends Uniqueable {
    public getTypeName() {
        return null;
    }
    public create(name: string): XCardPlayer {
        return null;
    }
    public restoreFromPlainObject(obj: any, engine: XCardGameEngine): XCardPlayer {
        return null;
    }
    public restoreFromJSON(json: string, engine: XCardGameEngine): XCardPlayer {
        if (engine == null) return null;
        if (!(engine instanceof XCardGameEngine)) return null;
        return this.restoreFromPlainObject(JSON.parse(json), engine);
    }
};

class XCardUserPlayer extends XCardPlayer {
    public constructor(name: string) {
        super(name);
    };
    public getPlayerTypeName(): string {
        return "Player";
    };
    public toPlainObject(engine: XCardGameEngine): any {
        if (engine == null) return null;
        if (!(engine instanceof XCardGameEngine)) return null;

        var result = super.toPlainObject(engine);
        result.type = 'XCardUserPlayer';
        return result;
    };
    public setUniqueIdFromCreator(creator: XCardPlayerCreator, uniqueId: string) {
        if (creator == null) return;
        if (!(creator instanceof XCardUserPlayerCreator)) return;
        this.setUniqueId(uniqueId);
    };
};

class XCardUserPlayerCreator extends XCardPlayerCreator {
    public getTypeName() {
        return "Player";
    }
    public create(name: string): XCardPlayer {
        return new XCardUserPlayer(name);
    }
    public restoreFromPlainObject(obj: any, engine: XCardGameEngine): XCardPlayer {
        if (engine == null) return null;
        if (!(engine instanceof XCardGameEngine)) return null;
        if (obj.type != 'XCardUserPlayer') return null;
        var result: XCardUserPlayer = new XCardUserPlayer(obj.name);
        result.setUniqueIdFromCreator(this, obj.uniqueId);
        var invArr: XCard[] = [];
        for (var idx = 0; idx < obj.inventory; idx++) {
            var newCard: XCard = new XCard();
            newCard.no = obj.inventory[idx].no;
            newCard.op = obj.inventory[idx].op;
            newCard.setUniqueId(engine, obj.inventory[idx].uniqueId);
            invArr.push(newCard);
        }
        result.setInventory(invArr, engine);
        var appArr: XCard[] = [];
        for (var adx = 0; adx < obj.applied; adx++) {
            var newCard: XCard = new XCard();
            newCard.no = obj.applied[adx].no;
            newCard.op = obj.applied[adx].op;
            newCard.setUniqueId(engine, obj.applied[adx].uniqueId);
            appArr.push(newCard);
        }
        result.setApplied(appArr, engine);
        return result;
    }
};

class XCardAIPlayer extends XCardPlayer {
    protected difficulty: number = 0;
    protected customAIScript: string = null;
    public constructor(name: string) {
        super(name);
    }
    public getPlayerTypeName(): string {
        return "AI";
    };
    public isUserControllable(): boolean { // 사용자가 컨트롤 불가능
        return false;
    };
    public needToHideInventoryForSelf(): boolean { // AI인 경우, 자기 자신 차례일 때도 인벤토리가 보이면 안 됨
        return true;
    };
    public setDifficulty(diff: number, engine: XCardGameEngine) {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;
        this.difficulty = diff;
    };
    public setCustomAIScript(scripts: string, engine: XCardGameEngine) {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;
        this.customAIScript = scripts;
    };
    public actOnTurn(engine: XCardGameEngine, mode: XCardGameMode, deck: XCard[], players: XCardPlayer[]) {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;
        if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this))) return;

        // 플레이어에게 주어지는 시간 (남은 시간과 1초정도 다를 수 있음)
        var currentPlayerTime: number = mode.getEachPlayerTimeLimit(this, engine);
        var timeLimitStd: number = Math.ceil(currentPlayerTime / 5.0);
        if (timeLimitStd <= 2) timeLimitStd = 2;

        /////// AI 인공지능 처리 시작 ///////
        // 결과 변수 준비
        var needToGetFromDeck: boolean = true;
        var targetPlayerUniqId: string = null;
        var targetCardUniqId: string = null;

        // 최적의 수 계산
        var needDefaultCalc = true;

        /***********************************************
        // customAIScript 안에 들어갈 문자열 내용 샘플
        var aiProcessFunction = function(engine, deck, players, currentPlayerTime) { // deck 은 덱에 있는 카드 객체들의 배열, players 는 플레이어 객체들의 배열 (객체 안에서 필요한 데이터와 고유값에 액세스하면 됨), currentPlayerTime 는 플레이어의 제한 시간
            var getDeck = true;              // 덱에서 카드를 받아야 할 때 true 지정 (다른 플레이어에게 카드를 놓아야 할 때는 반드시 false 로 지정할 것)
            var targetPlayerUniqueId = null; // 카드를 다른 플레이어에게 놓아야 할 때, 대상 플레이어의 고유값 지정
            var targetCardUniqueId   = null; // 카드를 다른 플레이어에게 놓아야 할 때, 대상 카드의 고유값 지정

            // 이 곳에서 연산 작업 수행
            
            return {
                needToGetFromDeck: getDeck         // needToGetFromDeck 이름은 반드시 지켜야 호환됨
              , targetPlayer: targetPlayerUniqueId // targetPlayer 이름은 반드시 지켜야 호환됨
              , targetCard: targetCardUniqueId     // targetCard 이름은 반드시 지켜야 호환됨
            };
        };
        var returnObject = {
            aiProcess: aiProcessFunction // aiProcess 이름은 반드시 지켜야 호환됨
        };
        // eval 처리 결과로 리턴 처리를 위해 만들어둔 변수명을 적어 마무리
        returnObject
        ***********************************************/
        if (this.customAIScript != null && this.customAIScript != '') { // 커스텀 AI 스크립트 여부 확인해 처리
            var resultObj: any = eval(this.customAIScript);
            if (resultObj == null || typeof (resultObj) == 'undefined') {
                needDefaultCalc = true;
            } else if (resultObj.aiProcess == null || typeof (resultObj.aiProcess) == 'undefined') {
                needDefaultCalc = true;
            } else {
                resultObj = resultObj.aiProcess(engine, deck, players, currentPlayerTime);
                needToGetFromDeck = hjow_parseBoolean(resultObj.needToGetFromDeck);
                targetPlayerUniqId = String(resultObj.targetPlayer);
                targetCardUniqId = String(resultObj.targetCard);

                needDefaultCalc = false;
            }
        }

        if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this))) return; // 시간 제한이 지났는지 확인 (지났으면 연산 중단)

        if (needDefaultCalc) { // 기본 제공 인공지능 처리 로직
            // 사용 가능한 동작들을 다 배열에 넣어서 각각 수행 결과 이득 정도를 점수를 매겨 그중 높은 점수를 선택하도록 함 (난이도가 낮으면 랜덤하게 일정 확률로 덜 높은 점수의 동작을 선택하면 됨)
            var availableActions: XCardAIProcessAction[] = [];
            var oneAct: XCardAIProcessAction = null;

            var offensives: number = 1; // 공격 행동 비율점수
            var defendees: number = 1;  // 방어 행동 비율점수

            if (this.difficulty == 1) defendees = 2;
            if (this.difficulty == 0) defendees = 3; // 난이도에 따라 인공지능을 좀 더 방어적으로 행동하도록 함

            // 덱에서 카드를 받는 동작은 항상 사용가능 (단, 지금 다른 플레이어에 비해 불리한 상황이면서 덱에 남은 카드 수가 적으면, 점수를 낮게 책정함) --> 동작 수는 항상 1 이상
            oneAct = new XCardAIProcessAction();
            oneAct.card = null;
            oneAct.payTargetPlayerIndex = -1; // 덱에서 카드 받을 때는 -1
            oneAct.actionPlayerIndex = 0;
            oneAct.calculatedAIPoint = new TBigInt(0);
            var currentThisUserPoint = this.getCurrentPoint(mode);
            if (deck.length < Math.ceil(players.length / 2.0)) { // 덱에 있는 카드 수가 매우 적으면 (플레이어 많으면 기준치를 적정량 늘려야 함)
                for (var idx = 0; idx < players.length; idx++) {
                    if (players[idx].getUniqueId() == this.getUniqueId()) continue;
                    if (players[idx].getCurrentPoint(mode).compare(currentThisUserPoint) > 0) { // 다른 플레이어가 지금 이 플레이어보다 점수가 높음
                        oneAct.calculatedAIPoint = oneAct.calculatedAIPoint.subtract(players[idx].getCurrentPoint(mode).subtract(currentThisUserPoint)); // 다른 플레이어와 이 플레이어의 점수 차만큼 점수 제거
                    }
                    if (players[idx].getCurrentPoint(mode).compare(currentThisUserPoint) == 0) { // 다른 플레이어가 지금 이 플레이어와 점수가 동일
                        oneAct.calculatedAIPoint = oneAct.calculatedAIPoint.subtract(new TBigInt(1)); // 1점
                    }
                }
            }
            oneAct.calculatedAIPoint = oneAct.calculatedAIPoint.subtract(new TBigInt(offensives)); // 공격 행동 비율점수만큼 뺄셈
            availableActions.push(oneAct);

            if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this))) return; // 시간 제한이 지났는지 확인 (지났으면 연산 중단)

            // 다른 플레이어에게 카드를 줄 수 있는 모든 경우의 수 찾기
            for (var cdx = 0; cdx < this.inventory.length; cdx++) {
                var invCard: XCard = this.inventory[cdx];
                for (var pdx = 0; pdx < players.length; pdx++) {
                    var playerOne: XCardPlayer = players[pdx];
                    var errMsg: string = playerOne.canPay(invCard, this);
                    if (errMsg != null) continue; // 카드 내기가 불가능 - 사용 가능 동작에 등록하지 않음

                    // 사용 가능 동작임이 확인됨, 동작 점수 계산

                    var actionPoint: TBigInt = null;
                    var simulatedPoint: TBigInt = playerOne.getCurrentPointIfPaid(mode, invCard); // 이 대상 플레이어의 변화결과 점수
                    if (playerOne.getUniqueId() == this.getUniqueId()) {
                        actionPoint = simulatedPoint.multiply(new TBigInt(defendees));
                    } else {
                        actionPoint = simulatedPoint.multiply(new TBigInt(-1)).multiply(new TBigInt(offensives));
                    } // 이 시점에서 actionPoint 는 null 이 아님
                    for (var pdx2 = 0; pdx2 < players.length; pdx2++) {
                        var playerAnother: XCardPlayer = players[pdx2];
                        if (playerAnother.getUniqueId() == playerOne.getUniqueId()) continue; // 이미 계산한 플레이어는 점수 계산에서 제외

                        if (playerAnother.getUniqueId() == this.getUniqueId()) {
                            actionPoint = actionPoint.add(playerAnother.getCurrentPoint(mode));
                        } else {
                            actionPoint = actionPoint.subtract(playerAnother.getCurrentPoint(mode));
                        }
                    }

                    oneAct = new XCardAIProcessAction();
                    oneAct.card = invCard;
                    oneAct.payTargetPlayerIndex = pdx;
                    oneAct.actionPlayerIndex = 0;
                    for (var pdx3 = 0; pdx3 < players.length; pdx3++) { // 자기자신의 인덱스를 알아내기 위함
                        if (players[pdx3].getUniqueId() == this.getUniqueId()) {
                            oneAct.actionPlayerIndex = pdx3;
                            break;
                        }
                    }
                    oneAct.calculatedAIPoint = actionPoint;
                    availableActions.push(oneAct); // 동작에 추가

                    if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this))) return; // 시간 제한이 지났는지 확인 (지났으면 연산 중단)
                    if (engine.getLeftTime() < timeLimitStd) break; // 시간 제한이 지나지는 않았으나 얼마 안남았으면 반복처리 중단, 지금까지의 연산 결과만 반영
                }
                if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this))) return; // 시간 제한이 지났는지 확인 (지났으면 연산 중단)
                if (engine.getLeftTime() < timeLimitStd) break; // 시간 제한이 지나지는 않았으나 얼마 안남았으면 반복처리 중단, 지금까지의 연산 결과만 반영
            }

            // 동작들을 가지고 순서 매기기
            var orderedActions: XCardAIProcessAction[] = [];
            var maxPoints: TBigInt = new TBigInt("-99999999999999");
            var maxIdx: number = -1;
            var preventInfLoop: number = 0;
            while (availableActions.length >= 1) {
                if (availableActions.length == 1) {
                    orderedActions.push(availableActions[0]);
                    break;
                } else {
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

                if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this))) return; // 시간 제한이 지났는지 확인 (지났으면 연산 중단)

                preventInfLoop++;
                if (preventInfLoop >= 1000 * Math.max(availableActions.length, 1)) {
                    hjow_log("Infinite Loop Detected");
                    break;
                }
            }

            if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this))) return; // 시간 제한이 지났는지 확인 (지났으면 연산 중단)

            // 동작들 중 실제 수행할 동작 선택
            var selectedAct: XCardAIProcessAction = null;
            var randomNo: number = Math.round(Math.random() * 100.0);
            if (this.difficulty >= 3) { // 극한 (출력은 안함)
                selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
            } else if (this.difficulty == 2) { // 어려움
                if (randomNo >= 10) selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
                else if (orderedActions.length >= 2) selectedAct = orderedActions[1]; // 차선
                else selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
            } else if (this.difficulty == 1) { // 보통
                if (randomNo >= 50) selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
                else if (randomNo >= 10 && orderedActions.length >= 2) selectedAct = orderedActions[1]; // 차선
                else if (orderedActions.length >= 3) selectedAct = orderedActions[2]; // 차차선
                else selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
            } else { // 쉬움
                if (randomNo >= 65) selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
                else if (randomNo >= 30 && orderedActions.length >= 2) selectedAct = orderedActions[1]; // 차선
                else if (randomNo >= 10 && orderedActions.length >= 3) selectedAct = orderedActions[2]; // 차차선
                else if (randomNo >= 5  && orderedActions.length >= 4) selectedAct = orderedActions[3]; // 차차차선
                else selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
            }

            // 동작 처리
            if (selectedAct == null || selectedAct.payTargetPlayerIndex < 0) {
                needToGetFromDeck = true;
            } else {
                needToGetFromDeck = false;
                targetPlayerUniqId = players[selectedAct.payTargetPlayerIndex].getUniqueId();
                targetCardUniqId = selectedAct.card.getUniqueId();
            }
        }

        if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this))) return; // 시간 제한이 지났는지 확인 (지났으면 연산 중단)

        // 계산 결과 집행
        if (needToGetFromDeck || targetPlayerUniqId == null || targetCardUniqId == null || targetPlayerUniqId == '' || targetCardUniqId == '') {
            h.engine.events.game.btn_get_from_deck();
            return;
        }
        var errMsg = engine.payHere(targetPlayerUniqId, targetCardUniqId);
        if (errMsg != null) {
            h.engine.events.game.btn_get_from_deck();
            return;
        }
        
    };
    public customMainHTML(): string {
        var results: string = "";
        results += "<div class='div_player_ai_custom'>";
        results += "<div class='div_player_ai_custom_element'>";
        results += "<span class='label'>" + hjow_trans("Difficulty") + "</span> ";
        results += "<select class='sel_ai_difficulty'>";
        for (var idx = 0; idx <= 2; idx++) {
            var difficultyStr: string = "";
            if (idx <= 0) difficultyStr = hjow_trans("Easy");
            if (idx == 1) difficultyStr = hjow_trans("Normal");
            if (idx >= 2) difficultyStr = hjow_trans("Hard");
            results += "<option value='" + idx + "'>" + hjow_serializeXMLString(difficultyStr) + "</option>";
        }
        results += "</select>";
        results += "</div>";
        results += "<div class='div_player_ai_custom_element wide'>";
        results += "<textarea class='tx_ai_script advanceMode' placeholder=\"" + hjow_serializeString("// " + hjow_trans("paste custom AI script here if you want")) + "\"></textarea>";
        results += "</div>";
        return results;
    };
    public refreshMain() {
        var playerBlock = jq(".xcard_place .pbasic_" + this.getUniqueId());
        var textBlock = playerBlock.find('.tx_ai_script');
        textBlock.val('');
        if (this.customAIScript != null) textBlock.val(this.customAIScript);
    };
    public applyInputs(engine: XCardGameEngine, gameStarted: boolean, needHideScreen: boolean, showResult: boolean) {
        if (gameStarted) return;
        if (needHideScreen) return;
        if (showResult) return;
        var playerBlock = jq(".xcard_place .pbasic_" + this.getUniqueId());
        var diff = playerBlock.find('.sel_ai_difficulty').val();
        this.difficulty = parseInt(diff);

        var scriptInputs = String(playerBlock.find(".tx_ai_script").val());
        scriptInputs = scriptInputs.trim();
        if (scriptInputs != '') {
            this.customAIScript = scriptInputs;
        }
    };
    public toPlainObject(engine: XCardGameEngine): any {
        if (engine == null) return null;
        if (!(engine instanceof XCardGameEngine)) return null;

        var result = super.toPlainObject(engine);
        result.type = 'XCardAIPlayer';
        result.difficulty = this.difficulty;
        result.customAIScript = this.customAIScript;
        return result;
    };
    public setUniqueIdFromCreator(creator: XCardPlayerCreator, uniqueId: string) {
        if (creator == null) return;
        if (!(creator instanceof XCardAIPlayerCreator)) return;
        this.setUniqueId(uniqueId);
    };
};

class XCardAIPlayerCreator extends XCardPlayerCreator {
    public getTypeName() {
        return "AI";
    };
    public create(name: string): XCardPlayer {
        return new XCardAIPlayer(name);
    };
    public restoreFromPlainObject(obj: any, engine: XCardGameEngine): XCardPlayer {
        if (engine == null) return null;
        if (!(engine instanceof XCardGameEngine)) return null;
        if (obj.type != 'XCardAIPlayer') return null;
        var result: XCardAIPlayer = new XCardAIPlayer(obj.name);
        result.setUniqueIdFromCreator(this, obj.uniqueId);
        var invArr: XCard[] = [];
        for (var idx = 0; idx < obj.inventory; idx++) {
            var newCard: XCard = new XCard();
            newCard.no = obj.inventory[idx].no;
            newCard.op = obj.inventory[idx].op;
            invArr.push(newCard);
        }
        result.setInventory(invArr, engine);
        var appArr: XCard[] = [];
        for (var adx = 0; adx < obj.applied; adx++) {
            var newCard: XCard = new XCard();
            newCard.no = obj.applied[adx].no;
            newCard.op = obj.applied[adx].op;
            appArr.push(newCard);
        }
        result.setApplied(appArr, engine);
        result.setDifficulty(obj.difficulty, engine);
        result.setCustomAIScript(obj.customAIScript, engine);
        return result;
    }
}

class XCardGameMode extends ModuleObject {
    protected totals: XCard[] = [];
    public constructor() {
        super("X Card Game Mode", "X Card Game Undefined Mode");
    };
    public init(playerCount: number) {
        this.totals = [];
        var starts = this.getStartCardNumber();
        var ends = this.getEndCardNumber();
        for (var pdx = 0; pdx < playerCount; pdx++) {
            for (var idx: number = starts; idx <= ends; idx++) {
                for (var cdx = 0; cdx <= 2; cdx++) {
                    var newCard: XCard = new XCard();
                    if (cdx == 0) newCard.op = '+';
                    if (cdx == 1) newCard.op = '-';
                    if (cdx == 2) newCard.op = '×';
                    newCard.no = idx;
                    this.totals.push(newCard);
                }
            }
        }
        hjow_ramdomizeArrayOrder(this.totals);
    };
    public getClassName(): string {
        return "XCardGameMode";
    };
    public createPlayers(): XCardPlayer[] {
        return null; // null 을 넣으면 메인화면에서 플레이어 지정 가능, null이 아니면 플레이어 지정 불가능하고 여기서 리턴한 대로 플레이어가 설정되며 플레이어 이름만 변경 가능
    };
    public getStartCardNumber(): number {
        return -1;
    };
    public getEndCardNumber(): number {
        return 10;
    };
    public playerInvList(): XCard[] {
        var result: XCard[] = [];
        return result;
    }
    public deckList(): XCard[] {
        var result: XCard[] = [];
        return result;
    }
    public getEachPlayerTimeLimit(player: XCardPlayer, engine: XCardGameEngine): number {
        return 30;
    }
    public getHideTime(player: XCardPlayer, engine: XCardGameEngine): number {
        if (player.isUserControllable()) return 30;
        return 2;
    }
    public needHide(player: XCardPlayer, engine: XCardGameEngine): boolean {
        if (player instanceof XCardAIPlayer) return false;
        return true;
    }
    public startGame(engine: XCardGameEngine, players: XCardPlayer[], deckObj: XCard[]): boolean { // 게임 시작 시 동작 처리, true 리턴 시 작업 직후 기본 모드 게임 준비 및 시작 처리를 수행함, false 리턴 시 이 메소드 끝나고 바로 게임이 진행됨
        return true;
    }
    public afterPrepareStartDefaultGame(engine: XCardGameEngine, players: XCardPlayer[], deckObj: XCard[]) { // 기본 모드 게임 준비 및 시작 처리 끝난 직후 수행함. 기본 모드 준비 작업 수행 시에만 호출됨에 유의!

    }
    public beforeNextTurnWork(engine: XCardGameEngine, players: XCardPlayer[], deckObj: XCard[], turnNumber: number) { // 다음 플레이어에게 차례 넘기는 작업 수행 직전 호출

    }

    public afterNextTurnWork(engine: XCardGameEngine, players: XCardPlayer[], deckObj: XCard[], turnNumber: number) { // 다음 플레이어에게 차례 넘기는 작업 수행 직후 호출

    }
    public onFinishGame(engine: XCardGameEngine, players: XCardPlayer[], deckObj: XCard[]) { // 게임 끝나고 호출

    }
    public processPoint(player: XCardPlayer, beforeCalculated: TBigInt): TBigInt { // 점수 계산 직후 점수에 추가 연산 (리턴된 값이 계산 결과로 적용됨 ! any타입 매개변수 객체로는 bigInt 객체가 들어올 예정)
        return beforeCalculated;
    }
};

class XCardGameDefaultMode extends XCardGameMode {
    public constructor() {
        super();
        this.name = "Normal Mode";
        this.desc = "Each player will get 10 cards at the game starts.";
    };
    public getClassName(): string {
        return "XCardGameDefaultMode";
    };
    protected playerStartCardCount(): number {
        return 10;
    };
    public playerInvList(): XCard[] {
        var result: XCard[] = [];
        var cardCnt = this.playerStartCardCount();
        for (var idx = 0; idx < cardCnt; idx++) {
            var cardOne: XCard = this.totals[0];
            hjow_removeItemFromArray(this.totals, 0);
            result.push(cardOne);
        }
        return result;
    };
    public deckList(): XCard[] {
        return hjow_simpleCloneArray(this.totals);
    };
};


class XCardGameSpeedMode extends XCardGameDefaultMode {
    public constructor() {
        super();
        this.name = "Speed Mode";
        this.desc = "Each player will get 7 cards at the game starts. The number of card will be -1 to 5.";
    };
    public getClassName(): string {
        return "XCardGameSpeedMode";
    };
    protected playerStartCardCount(): number {
        return 7;
    };
    public getEndCardNumber(): number {
        return 5;
    };
    public getEachPlayerTimeLimit(player: XCardPlayer, engine: XCardGameEngine): number {
        return 20;
    };
};

class XCardGameMultiplylessMode extends XCardGameDefaultMode {
    public constructor() {
        super();
        this.name = "Multiplyless Mode";
        this.desc = "There is no × card.";
    };
    public init(playerCount: number) {
        this.totals = [];
        var starts = this.getStartCardNumber();
        var ends = this.getEndCardNumber();
        for (var pdx = 0; pdx < playerCount; pdx++) {
            for (var idx: number = starts; idx <= ends; idx++) {
                for (var cdx = 0; cdx <= 1; cdx++) {
                    var newCard: XCard = new XCard();
                    if (cdx == 0) newCard.op = '+';
                    if (cdx == 1) newCard.op = '-';
                    newCard.no = idx;
                    this.totals.push(newCard);
                }
            }
        }
        hjow_ramdomizeArrayOrder(this.totals);
    };
    public getStartCardNumber(): number {
        return 0;
    };
    public getClassName(): string {
        return "XCardGameMultiplylessMode";
    };
};

class XCardGameEngine extends ModuleObject {
    private version: string = "0.0.1";

    private gameModeList: XCardGameMode[] = [];
    private gameModeIndex: number = 0;

    private playerTypes: XCardPlayerCreator[] = [];

    private gameStarted: boolean = false;
    private timers: IntervalTimer[] = [];
    private players: XCardPlayer[] = [];
    private deck: XCard[] = [];
    private turnPlayerIndex: number = 0;
    private turnPlayerTime: number = 0;
    private turnNumber: number = 0;
    private beforeTurnPlayerIndex: number = 0;
    private needHideScreen: boolean = false;
    private hideScreenTime: number = 0;
    private showResult: boolean = false;
    private turnChanging: boolean = false;
    private actPlayerTurnRequest: boolean = false;
    private actPlayerTurnStopRequest: boolean = false;
    private replay: XCardReplay = null;
    private showSettings: boolean = false;

    public constructor() {
        super("X Card", "X Card Game Core Engine");
        hjow_prepareJQuery();
    };
    public getClassName(): string {
        return "XCardGameEngine";
    };
    public init() {
        this.initEngine();
        this.initDom();
        this.applyPropertiesBefore();
        this.title(); // 화면이 한번 로딩됨
        this.applyPropertiesAfter();
        this.initTheme();
    };
    protected prepareFirstProp() {
        this.deck = [];
        this.players = [];

        this.playerTypes = [];
        this.playerTypes.push(new XCardUserPlayerCreator());
        this.playerTypes.push(new XCardAIPlayerCreator());

        this.players.push(new XCardUserPlayer(hjow_trans("User")));
        this.players.push(new XCardAIPlayer("AI " + this.players.length));
        this.players.push(new XCardAIPlayer("AI " + this.players.length));
        this.players.push(new XCardAIPlayer("AI " + this.players.length));

        this.gameModeList.push(new XCardGameDefaultMode());
        this.gameModeList.push(new XCardGameSpeedMode());
        this.gameModeList.push(new XCardGameMultiplylessMode());
    };
    protected applyProperties() {
        this.applyPropertiesBefore();
        this.applyPropertiesAfter();
    };
    protected applyPropertiesBefore() {
        var customLocale = this.getProperty("locale");
        if (customLocale != null && customLocale != '') {
            hjow_selectedLocale = customLocale;
        }
    };
    protected applyPropertiesAfter() {
        var useAdvanceFeatOpt = this.getProperty("use_advanced_features");
        if (useAdvanceFeatOpt != null) {
            if (hjow_parseBoolean(useAdvanceFeatOpt)) jq('.xcard_place .advanceMode').show();
            else jq('.xcard_place .advanceMode').hide();
        } else {
            jq('.xcard_place .advanceMode').hide();
        }
    };
    initEngine() {
        this.prepareLanguageSets();
        this.setProperty('localStorageAvailable', String(hjow_checkLocalStorageAvailable()));
        this.load();
        if (this.properties == null) this.properties = new Properties();
        this.prepareFirstProp();
    };
    initDom() {
        var bodyHtml: string = "<div class='page page_main'></div>\n";
        bodyHtml += "<div class='page page_game'></div>\n";
        bodyHtml += "<div class='page page_hide'></div>\n";
        bodyHtml += "<div class='page page_result'></div>\n";
        bodyHtml += "<div class='page page_set'></div>\n";
        bodyHtml += "<div class='toolbar'></div>\n";
        jq('.xcard_place').html(hjow_toStaticHTML(bodyHtml));

        hjow_prepareDialogLog();
        hjow_prepareDialogAlert();

        this.refreshPage();
    };
    initTheme() {
        var themeStr = this.getProperty("theme");
        if (themeStr == null) return;
        themeStr = themeStr.trim();
        if (themeStr == '') return;
        try {
            var themes: Properties[] = [];
            var parsedObj = JSON.parse(themeStr);
            if (hjow_isArray(parsedObj)) {
                for (var pdx = 0; pdx < parsedObj.length; pdx++) {
                    var theme: Properties = new Properties();
                    theme.fromPlainObject(parsedObj[pdx]);
                    themes.push(theme);
                }
            } else {
                var theme: Properties = new Properties();
                theme.fromJSON(themeStr);
                themes.push(theme);
            }

            for (var pdx = 0; pdx < themes.length; pdx++) {
                var theme: Properties = themes[pdx];
                var keys: string[] = theme.keyList();
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
        } catch (e) {
            hjow_log(e);
        }
    };
    private clearAllPlayers() {
        for (var idx = 0; idx < this.players.length; idx++) {
            this.players[idx].resetCards();
        }
    };
    public title() {
        this.gameStarted = false;
        // this.stopAllTimer(); // 타이머 종료 시 MS Edge 에서 게임 다시 시작 시 정상동작이 안됨
        this.clearAllPlayers();
        this.refreshPage();
    };
    public startGame() {
        this.applyInputs();

        hjow_log(hjow_trans("The game is preparing to start."));

        // 게임 모드별 처리
        var gameMode: XCardGameMode = this.gameModeList[this.gameModeIndex];

        hjow_log(hjow_trans("Mode") + " : " + hjow_trans(gameMode.getName()));
        hjow_log(hjow_trans(gameMode.getDescription()));

        var needDefaultAction = gameMode.startGame(this, this.players, this.deck);
        if (needDefaultAction) { // 기본 모드 처리
            // 카드 분배
            this.spreadCards();

            hjow_log(hjow_trans("Cards is shuffled."));

            // 처음 스타트하는 플레이어 지정
            this.turnPlayerIndex = Math.round((Math.random() * this.players.length) + 0.01);
            if (this.turnPlayerIndex < 0) this.turnPlayerIndex = 0;
            if (this.turnPlayerIndex >= this.players.length - 1) this.turnPlayerIndex = this.players.length - 1;

            var turnPlayer: XCardPlayer = this.players[this.turnPlayerIndex];
            
            // 제한 시간 세팅 (처음 시작하는 플레이어는 1초 혜택)
            this.turnPlayerTime = this.gameModeList[this.gameModeIndex].getEachPlayerTimeLimit(turnPlayer, this) + 1;

            // 시간 제한
            var selfObj = this;
            this.addTimerIfNotExistName("LimitTimer", "Restrict the player's time", function () {
                if (selfObj.turnChanging) return;
                if (! selfObj.gameStarted) return;
                if (selfObj.needHideScreen) {
                    selfObj.hideScreenTime -= 1;

                    var hideScreenMax: number = selfObj.gameModeList[selfObj.gameModeIndex].getHideTime(selfObj.players[selfObj.beforeTurnPlayerIndex], selfObj);
                    hjow_setProgressValue('.prog_hide_left_time', selfObj.hideScreenTime / (hideScreenMax * 1.0), selfObj.hideScreenTime + " " + "seconds left");

                    if (selfObj.hideScreenTime <= 0) {
                        selfObj.hideScreenTime = hideScreenMax;
                        selfObj.turnChanging = true;
                        h.engine.events.hide.reveal();
                    }
                } else {
                    var maxVal: number = selfObj.gameModeList[selfObj.gameModeIndex].getEachPlayerTimeLimit(selfObj.players[selfObj.turnPlayerIndex], selfObj);
                    if (maxVal <= 0) maxVal = 1;

                    selfObj.turnPlayerTime -= 1;
                    hjow_setProgressValue('.prog_game_status_bar', selfObj.turnPlayerTime / (maxVal * 1.0), selfObj.turnPlayerTime + " " + "seconds left");

                    if (selfObj.turnPlayerTime <= 0) {
                        selfObj.turnPlayerTime = 999999;
                        selfObj.turnChanging = true;
                        h.engine.events.game.btn_get_from_deck();
                    }
                }
            }, 1000);
            // AI 비동기 처리
            this.addTimerIfNotExistName("AIProcessor", "AI Process", function () {
                if (! selfObj.actPlayerTurnRequest) return;
                if (! selfObj.gameStarted) return;
                if (selfObj.turnChanging) return;
                if (selfObj.needHideScreen) return;

                selfObj.actPlayerTurnRequest = false;
                selfObj.players[selfObj.turnPlayerIndex].actOnTurn(selfObj, selfObj.gameModeList[selfObj.gameModeIndex], selfObj.deck, selfObj.players);
            }, 500);
        }

        hjow_log(hjow_replaceStr(hjow_trans("The first turn number is [[NUMBER]]"), "[[NUMBER]]", String(this.turnPlayerIndex)));
        
        this.showSettings = false;
        this.needHideScreen = false;
        this.showResult = false;
        this.turnChanging = false;
        this.gameStarted = true;
        this.turnNumber = 0;

        gameMode.afterPrepareStartDefaultGame(this, this.players, this.deck); // 기본 모드 작업 이후 추가 작업할 내용이 있으면 처리

        if (hjow_parseBoolean(this.getProperty("record_replay"))) {
            this.prepareRecordingReplay();
        }

        hjow_log(hjow_trans("Game is started."));
        hjow_log(hjow_replaceStr(hjow_trans("Your turn, [[PLAYER]]."), "[[PLAYER]]", this.players[this.turnPlayerIndex].getName()));
        
        this.refreshPage();
        this.actPlayerTurnStopRequest = false;
        this.actPlayerTurnRequest = true;
    };
    protected prepareRecordingReplay() {
        this.replay = new XCardReplay();
        this.replay.players = [];
        for (var pdx = 0; pdx < this.players.length; pdx++) {
            var plainObj: any = this.players[pdx].toPlainObject(this);
            var cloned: XCardPlayer = null;
            for (var pcdx = 0; pcdx < this.playerTypes.length; pcdx++) {
                var creator: XCardPlayerCreator = this.playerTypes[pcdx];
                cloned = creator.restoreFromPlainObject(plainObj, this);
                if (cloned != null) break;
            }
            if (cloned == null) {
                this.replay = null;
                hjow_log(hjow_trans("Some custom player setting is not supported for recording replay."));
                return;
            }
            this.replay.players.push(cloned);
        }
        this.replay.gameMode = this.gameModeList[this.gameModeIndex].getClassName();
        this.replay.deck = [];
        for (var cdx = 0; cdx < this.deck.length; cdx++) {
            var newCardObj = this.deck[cdx].toPlainObjectDetail(this);
            var newCard: XCard = new XCard();
            newCard.no = newCardObj.no;
            newCard.op = newCardObj.op;
            newCard.setUniqueId(this, newCardObj.uniqueId);
            this.replay.deck.push(newCard);
        }
    };
    public isActPlayerRequestAlive(): boolean {
        return this.actPlayerTurnRequest && (!this.actPlayerTurnStopRequest);
    };
    public isActPlayerStopRequested(): boolean {
        return this.actPlayerTurnStopRequest;
    };
    public isThisTurn(player: XCardPlayer): boolean {
        if (this.players[this.turnPlayerIndex].getUniqueId() == player.getUniqueId()) return true;
        return false;
    };
    public getLeftTime(): number {
        return this.turnPlayerTime;
    }
    public isHided(): boolean {
        return this.needHideScreen;
    };
    private addTimer(name: string, desc: string, func: Function, timeGap: number = 1000) {
        var newTimer: IntervalTimer = new IntervalTimer(name, desc, func, timeGap);
        this.timers.push(newTimer);
    };
    private addTimerIfNotExistName(name: string, desc: string, func: Function, timeGap: number = 1000): boolean {
        for (var idx = 0; idx < this.timers.length; idx++) {
            if (this.timers[idx].getName() == name) return false;
        }
        this.addTimer(name, desc, func, timeGap);
        return true;
    };
    private stopAllTimer() {
        var curIdx: number = 0;
        var preventInfLoop: number = 0;
        while (curIdx < this.timers.length) {
            var timerOne: IntervalTimer = this.timers[curIdx];
            if (! (timerOne instanceof ImportantTimer)) {
                timerOne.stop();
                hjow_removeItemFromArray(this.timers, curIdx);
                curIdx = 0;
                continue;
            }
            curIdx++;
            preventInfLoop++;
            if (preventInfLoop >= 1000 * Math.max(this.timers.length, 1)) {
                hjow_log("Infinite Loop Detected");
                break;
            }
        }
    };
    private stopTimer(timerName: string): boolean {
        for (var idx = 0; idx < this.timers.length; idx++) {
            var timerOne: IntervalTimer = this.timers[idx];
            if (timerOne.getName() == timerName) {
                timerOne.stop();
                hjow_removeItemFromArray(this.timers, idx);
                return true;
            }
        }
        return false;
    };
    private spreadCards() {
        var gameMode: XCardGameMode = this.gameModeList[this.gameModeIndex];
        gameMode.init(this.players.length);

        for (var idx = 0; idx < this.players.length; idx++) {
            var currentPlayer: XCardPlayer = this.players[idx];
            currentPlayer.resetCards();
            currentPlayer.setInventory(gameMode.playerInvList(), this);
        }

        this.deck = gameMode.deckList();
    };
    private save() {
        try {
            hjow_saveOnLocalStorage('XCard', this.properties.serialize());
        } catch (e) {
            hjow_alert(e, hjow_trans('Error'));
        }
    };
    private load() {
        var localStoreStr: string = hjow_getOnLocalStorage('XCard');
        if (localStoreStr == null) {
            this.save();
        }
        try {
            this.properties.fromJSON(localStoreStr);
        } catch (e) {
            hjow_log(e);
        }
    };
    private findPlayer(uniqueId: string): XCardPlayer {
        for (var idx = 0; idx < this.players.length; idx++) {
            if (this.players[idx].getUniqueId() == uniqueId) {
                return this.players[idx];
            }
        }
        return null;
    };
    private nextTurn() {
        this.turnChanging = true;
        this.actPlayerTurnStopRequest = true;

        var gameMode: XCardGameMode = this.gameModeList[this.gameModeIndex];
        gameMode.beforeNextTurnWork(this, this.players, this.deck, this.turnNumber + 1); // 값 수정 전이므로 수정후의 값을 만들어 보냄

        this.turnNumber = this.turnNumber + 1; // 턴 번호 증가

        if (this.checkFinishGameCondition()) {
            this.finishGame(true);
            return;
        }
        
        var beforePlayer: XCardPlayer = this.players[this.turnPlayerIndex];
        if (this.gameModeList[this.gameModeIndex].needHide(beforePlayer, this)) {
            this.hideScreenTime = this.gameModeList[this.gameModeIndex].getHideTime(beforePlayer, this);
            this.needHideScreen = true;
        }

        this.beforeTurnPlayerIndex = this.turnPlayerIndex;
        this.turnPlayerIndex++;
        if (this.turnPlayerIndex >= this.players.length) {
            this.turnPlayerIndex = 0;
        }
        this.turnPlayerTime = this.gameModeList[this.gameModeIndex].getEachPlayerTimeLimit(this.players[this.turnPlayerIndex], this);
        // this.players[this.turnPlayerIndex].actOnTurn(this, this.gameModeList[this.gameModeIndex], this.deck, this.players); // 이 시점에서 AI 처리하면 안됨

        gameMode.afterNextTurnWork(this, this.players, this.deck, this.turnNumber);

        hjow_log(hjow_replaceStr(hjow_trans("Your turn, [[PLAYER]]"), "[[PLAYER]]", this.players[this.turnPlayerIndex].getName()));

        this.actPlayerTurnStopRequest = false;
        this.actPlayerTurnRequest = true;
        this.turnChanging = false;
        this.showSettings = false;
        this.refreshPage(false);
    };
    private checkFinishGameCondition(): boolean {
        if (this.deck.length <= 0) return true;
        for (var idx = 0; idx < this.players.length; idx++) {
            var player: XCardPlayer = this.players[idx];
            if (player.getInventoryCardCount() <= 0) return true;
        }
        return false;
    };
    private finishGame(normalReason: boolean = false) {
        //this.stopTimer("LimitTimer"); // timer stop 시 다시 게임시작 후 MS Edge 브라우저에서 동작 안함
        //this.stopTimer("AIProcessor");
        this.actPlayerTurnStopRequest = true;
        this.gameStarted = false;
        this.needHideScreen = false;
        this.showSettings = false;
        if (normalReason) {
            this.showResult = true;
        } else {
            this.showResult = false;
        }
        var gameMode: XCardGameMode = this.gameModeList[this.gameModeIndex];
        gameMode.onFinishGame(this, this.players, this.deck);

        hjow_log(hjow_trans("Game is finished."));
        
        this.refreshPage(false);
        this.replay = null; // 화면 리프레시 이후에 리플레이 초기화 (결과 화면에서 리플레이 JSON 출력 후에 초기화하기 위함)
    };
    public refreshPage(heavyRefresh: boolean = true) {
        this.applyInputs();
        if (heavyRefresh) {
            jq('.xcard_place .page_game').html(hjow_toStaticHTML(this.gamePageHTML()));
            jq('.xcard_place .page_main').html(hjow_toStaticHTML(this.mainPageHTML()));
            jq('.xcard_place .page_hide').html(hjow_toStaticHTML(this.hidePageHTML()));
            jq('.xcard_place .page_set').html(hjow_toStaticHTML(this.setPageHTML()));
            // jq('.page_result').html(this.resultPageHTML()); // 아래쪽에서 처리
            this.prepareEvents();
        }
        jq('.xcard_place .toolbar').html(hjow_toStaticHTML(this.toolbarHTML())); // 툴바는 항상 재로드
        if (this.needHideScreen) {
            jq('.xcard_place .page:not(.page_hide)').hide();
            this.refreshGame();
            jq('.xcard_place .page_hide').show();
        } else if (this.showSettings) {
            jq('.xcard_place .page:not(.page_set)').hide();
            this.refreshSettingPage();
            jq('.xcard_place .page_set').show();
        } else if (this.gameStarted) {
            jq('.xcard_place .page:not(.page_game)').hide();
            this.refreshGame();
            jq('.xcard_place .page_game').show();
        } else if (this.showResult) {
            jq('.xcard_place .page:not(.page_result)').hide();
            jq('.xcard_place .page_result').html(hjow_toStaticHTML(this.resultPageHTML()));
            this.refreshResult();
            jq('.xcard_place .page_result').show();
        } else {
            jq('.xcard_place .page:not(.page_main)').hide();
            this.refreshMain();
            jq('.xcard_place .page_main').show();
        }
        if (hjow_onRefreshComponents != null && typeof (hjow_onRefreshComponents) != 'undefined') {
            hjow_onRefreshComponents();
        }
        this.initTheme();
    };
    private refreshMain() {
        jq('.xcard_place .td_player_list').empty();
        var results = "";
        results += "<div class='full player_list_div'>" + "\n";
        results += "<table class='full player_list'>" + "\n";
        for (var idx: number = 0; idx < this.players.length; idx++) {
            var currentPlayer: XCardPlayer = this.players[idx];
            results += "   <tr class='tr_player pbasic_" + hjow_serializeString(currentPlayer.getUniqueId()) + "'>" + "\n";
            results += "       <td class='td_player'>" + "\n";
            results += this.eachPlayerMainHTML(currentPlayer);
            results += "       </td>" + "\n";
            results += "   </tr>" + "\n";
        }
        results += "   <tr class='tr_player_empty'>" + "\n";
        results += "       <td class='td_player_empty td_player_control'>" + "\n";
        results += "          <select class='sel_player_type'>" + "\n";
        for (var tdx = 0; tdx < this.playerTypes.length; tdx++) {
            var playerType: XCardPlayerCreator = this.playerTypes[tdx];
            results += "          <option value='" + hjow_serializeString(playerType.getTypeName()) + "'>" + hjow_serializeXMLString(hjow_trans(playerType.getTypeName())) + "</option>" + "\n";
        }
        results += "          </select>" + "\n";
        results += "          <button type='button' class='btn_add_player' onclick='h.engine.events.main.btn_add_player(); return false;'>" + hjow_trans("Add") + "</button>" + "\n";
        results += "          <button type='button' class='btn_remove_player'  onclick='h.engine.events.main.btn_remove_player(); return false;'>" + hjow_trans("Remove Last") + "</button>" + "\n";
        results += "       </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr class='tr_player_empty'>" + "\n";
        results += "      <td class='td_player_empty full'>" + "\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "</table>" + "\n";
        results += "</div>" + "\n";
        jq('.xcard_place .td_player_list').html(hjow_toStaticHTML(results));

        var heightVal: number = jq('.xcard_place').height(); // window.innerHeight;
        if (heightVal < 200) heightVal = 200;
        
        jq('.xcard_place .player_list_div').css('min-height', heightVal - 200 + 'px');
        jq('.xcard_place .player_list_div').css('max-height', heightVal - 100 + 'px');

        var selGameMode = jq('.xcard_place .sel_game_mode');
        selGameMode.find('option').remove();
        for (var mdx = 0; mdx < this.gameModeList.length; mdx++) {
            selGameMode.append(hjow_toStaticHTML("<option value='" + mdx + "'>" + hjow_serializeXMLString(hjow_trans(this.gameModeList[mdx].getName())) + "</option>"));
        }
        selGameMode.val(this.gameModeIndex);
        this.refreshMainGameMode();

        for (var idx: number = 0; idx < this.players.length; idx++) {
            this.players[idx].refreshMain();
        }
    };
    protected refreshMainGameMode() {
        jq('.xcard_place .div_game_mode_desc').text(hjow_trans(this.gameModeList[this.gameModeIndex].getDescription()));
    };
    protected refreshGame() {
        jq('.xcard_place .table_player_arena_each').removeClass('current_turn');
        var currentPlayer: XCardPlayer = this.players[this.turnPlayerIndex];
        
        if (currentPlayer.isUserControllable()) {
            jq('.xcard_place .btn_user_control').removeProp('disabled');
            jq('.xcard_place .btn_user_control').removeAttr('disabled');
        } else {
            jq('.xcard_place .btn_user_control').prop('disabled', true);
            jq('.xcard_place .btn_user_control').attr('disabled', 'disabled');
        }

        jq(".xcard_place .table_player_arena_each.pplace_" + hjow_serializeString(currentPlayer.getUniqueId()) + "").addClass('current_turn');
        jq('.xcard_place .deck_lefts').text(this.deck.length);

        for (var pdx = 0; pdx < this.players.length; pdx++) {
            var playerOne: XCardPlayer = this.players[pdx];
            var thisTurn: boolean = (pdx == this.turnPlayerIndex);

            var placeObj = jq(".xcard_place .pplace_" + hjow_serializeString(playerOne.getUniqueId()));
            placeObj.find(".player_inventory_card_count").text(playerOne.getInventoryCardCount());
            placeObj.find(".point_number").text(playerOne.getCurrentPoint(this.gameModeList[this.gameModeIndex]).toString());

            // Inventory Synchronizing
            var invenSel = placeObj.find(".select_player_arena.inventory");
            var invenObjs = invenSel.find("option");
            
            var invenOptList: string[] = [];
            invenObjs.each(function () {
                var cardUniqueId = jq(this).attr('value');
                invenOptList.push(cardUniqueId);
            });
            var realInvenList: XCard[] = playerOne.listInventoryDirect(this);

            var needRemoveInv: string[] = [];
            var needAddInv: XCard[] = [];

            for (var idx = 0; idx < invenOptList.length; idx++) {
                var exists: boolean = false;
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
                var exists: boolean = false;
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
                var elemOne: string = needRemoveInv[rdx];
                invenSel.find("option[value='" + hjow_serializeString(elemOne) + "']").remove();
            }

            for (var rdx2 = 0; rdx2 < needAddInv.length; rdx2++) {
                var targetCard: XCard = needAddInv[rdx2];
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
            } else {
                invenObjs.hide();
                concealedOpt.show();
            }

            // Affector Synchronizing
            var affectorSel = placeObj.find(".select_player_arena.affector");
            var affectorObjs = affectorSel.find("option");

            affectorObjs.removeProp('selected');
            affectorObjs.removeAttr('selected');

            var affectorOptList: string[] = [];
            affectorObjs.each(function () {
                var cardUniqueId = jq(this).attr('value');
                affectorOptList.push(cardUniqueId);
            });
            var realAffectorList: XCard[] = playerOne.listAppliedDirect(this);

            var needRemoveAff: string[] = [];
            var needAddAff: XCard[] = [];

            for (var idx2 = 0; idx2 < affectorOptList.length; idx2++) {
                var exists: boolean = false;
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
                var exists: boolean = false;
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
                var elemOne: string = needRemoveAff[rdx3];
                affectorSel.find("option[value='" + hjow_serializeString(elemOne) + "']").remove();
            }

            for (var rdx4 = 0; rdx4 < needAddAff.length; rdx4++) {
                var targetCard: XCard = needAddAff[rdx4];
                var newOptionHTML = "<option value='" + hjow_serializeString(targetCard.getUniqueId()) + "'>" + hjow_serializeXMLString(targetCard.toString()) + "</option>";
                affectorSel.append(hjow_toStaticHTML(newOptionHTML));
            }

            affectorObjs = affectorSel.find("option");
            if (affectorObjs.length >= 1) {
                affectorSel.val(jq(affectorObjs[affectorObjs.length - 1]).attr('value'));
            }
        }

        var heightVal: number = jq('.xcard_place').height(); // window.innerHeight;
        if (heightVal < 500) heightVal = 500;

        var widthVal: number = jq('.xcard_place').width(); // window.innerWidth;
        if (widthVal < 700) widthVal = 700;

        jq('.xcard_place .player_arena_div').css('min-height', heightVal - 200 + 'px');
        jq('.xcard_place .player_arena_div').css('max-height', heightVal - 100 + 'px');
        jq('.xcard_place .player_arena_div').css('max-width', widthVal - 5 + 'px');

        jq('.xcard_place .div_player_arena_each').css('min-height', heightVal - 210 + 'px');
        jq('.xcard_place .div_player_arena_each').css('max-height', heightVal - 110 + 'px');

        jq('.xcard_place .table_player_arena_each').css('min-height', heightVal - 220 + 'px');
        jq('.xcard_place .table_player_arena_each').css('max-height', heightVal - 120 + 'px');

        jq('.xcard_place .table_player_arena_each').each(function () {
            var heightLefts: number = jq(jq(this).find('.player_arena_one_line_layout')[0]).height() * 4;
            var thisHeight: number = jq(this).height();
            if (thisHeight < 200) thisHeight = heightVal - 220;
            var heightIn: number = thisHeight - heightLefts - 10;
            if (heightIn < 200) heightIn = 250;
            jq(this).find('select').height(heightIn - 10);
        });

        for (var idx: number = 0; idx < this.players.length; idx++) {
            this.players[idx].refreshGame();
        }
    };
    private refreshResult() {
        var gameMode: XCardGameMode = this.gameModeList[this.gameModeIndex];
        jq('.xcard_place .replay_result').hide();
        for (var idx = 0; idx < this.players.length; idx++) {
            var playerOne: XCardPlayer = this.players[idx];

            var playerBlock = jq(".xcard_place .presult_" + hjow_serializeString(playerOne.getUniqueId()));
            playerBlock.find(".i_name").val(playerOne.getName());
            playerBlock.find(".i_type").val(playerOne.getPlayerTypeName());
            playerBlock.find(".i_point").val(playerOne.getCurrentPoint(gameMode).toString());
            playerBlock.find(".i_affects").val(playerOne.listAppliedAsString());
        }
        if (this.replay != null) {
            this.resultReplay();
        } else {
            jq('.xcard_place .replay_json').val('');
            jq('.xcard_place .btn_show_replay').hide();
        }
    };
    private refreshSettingPage() {
        var settingPage = jq('.xcard_place .page_set');

        var recordReplayOpt: string = this.getProperty('record_replay');
        if (recordReplayOpt == null) recordReplayOpt = 'false';

        var recordReplayComp = settingPage.find('.chk_record_replay');
        if (hjow_parseBoolean(recordReplayOpt)) {
            recordReplayComp.attr('checked', 'checked');
            recordReplayComp.prop('checked', true);
        } else {
            recordReplayComp.removeAttr('checked');
            recordReplayComp.removeProp('checked');
        }

        var useAdvancedFeaturesOpt: string = this.getProperty('use_advanced_features');
        if (useAdvancedFeaturesOpt == null) useAdvancedFeaturesOpt = "false";
        
        var useAdvanComp = settingPage.find('.chk_set_use_advanced_features');
        if (hjow_parseBoolean(useAdvancedFeaturesOpt)) {
            useAdvanComp.attr('checked', 'checked');
            useAdvanComp.prop('checked', true);
        } else {
            useAdvanComp.removeAttr('checked');
            useAdvanComp.removeProp('checked');
        }

        var customLocaleOpt = this.getProperty('locale');
        if (customLocaleOpt == null || customLocaleOpt == '') customLocaleOpt = hjow_selectedLocale;
        if (hjow_selectedLocale == null || typeof (hjow_selectedLocale) == 'undefined') {
            var browserLocale = hjow_getLocaleInfo();
            if (!(typeof (browserLocale) == 'undefined' || browserLocale == null)) {
                var currentLocale: any[] = browserLocale;
                if (currentLocale == null || currentLocale.length <= 0) return null;
                var needBreak: boolean = false;
                for (var idx = 0; idx < currentLocale.length; idx++) {
                    for (var ldx = 0; ldx < hjow_languageSets.length; ldx++) {
                        if (currentLocale[idx] == hjow_languageSets[ldx].locale || currentLocale[idx] == hjow_languageSets[ldx].localeAlt) {
                            customLocaleOpt = hjow_languageSets[ldx].locale;
                            needBreak = true;
                            break;
                        }
                    }
                    if (needBreak) break;
                }
            }
        }
        settingPage.find('.sel_language').val(customLocaleOpt);

        var heightIn: number = settingPage.height();
        settingPage.find('.setting_list').css('max-height', (heightIn - 100) + 'px');

        var themeScript = this.getProperty('theme');
        settingPage.find('.tx_theme_script').val('');
        if (themeScript != null && themeScript != '') {
            settingPage.find('.tx_theme_script').val(themeScript);
        }
    };
    private resultReplay() {
        var results = this.replay.toPlainObjectDetail(this);
        jq('.xcard_place .replay_json').val(JSON.stringify(results));
        jq('.xcard_place btn_show_replay').show();
    };
    protected mainPageHTML(): string {
        var results: string = "";
        results += "<table class='full layout'>" + "\n";
        results += "  <tr>" + "\n";
        results += "     <td class='td_game_title'>" + "\n";
        results += "        <h2>" + hjow_serializeXMLString(hjow_trans("X Card")) + "</h2>" + "\n";
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "  <tr>" + "\n";
        results += "     <td class='td_player_list'>" + "\n";
        
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "  <tr>" + "\n";
        results += "     <td class='td_game_start' style='height: 25px;'>" + "\n";
        results += "        <select class='sel_game_mode' onchange=\"h.engine.events.main.sel_mode_changed(); return false;\"></select>" + "\n";
        results += "        <button type='button' class='btn_game_start' onclick='h.engine.events.main.btn_game_start(); return false;'>" + hjow_serializeXMLString(hjow_trans("Start Game")) + "</button>" + "\n";
        results += "        <div class='div_game_mode_desc'></div>" + "\n";
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    protected setPageHTML(): string {
        var results: string = "";
        results += "<div class='setting_list'>" + "\n";
        results += "<div class='setting_element'>" + "\n";
        results += "   <p>" + "\n";
        results += "      <span class='label'>" + hjow_serializeXMLString(hjow_trans("Language")) + "</span>" + "\n";
        results += "      <select class='sel_language'>" + "\n";
        for (var ldx = 0; ldx < hjow_languageSets.length; ldx++) {
            var languageSetOne: LanguageSet = hjow_languageSets[ldx];
            results += "<option value=\"" + hjow_serializeString(languageSetOne.locale) + "\">" + hjow_serializeString(languageSetOne.localeName) + "</option>" + "\n";
        }
        results += "      </select>" + "\n";
        results += "   </p>" + "\n";
        results += "</div>" + "\n";
        results += "<div class='setting_element'>" + "\n";
        results += "   <p>" + "\n";
        results += "      <input type='checkbox' class='chk_record_replay'/><span class='label'>" + hjow_serializeXMLString(hjow_trans("Record playing data")) + "</span>" + "\n";
        results += "   </p>" + "\n";
        results += "   <p>" + "\n";
        results += "      <pre>" + "\n";
        results += hjow_serializeXMLString(hjow_trans("Trying to record playing data includes all progress in the game.")) + "\n";
        results += "      </pre>" + "\n";
        results += "   </p>" + "\n";
        results += "</div>" + "\n";
        results += "<div class='setting_element'>" + "\n";
        results += "   <p>" + "\n";
        results += "      <input type='checkbox' class='chk_set_use_advanced_features'/><span class='label'>" + hjow_serializeXMLString(hjow_trans("Show advanced features")) + "</span>" + "\n";
        results += "   </p>" + "\n";
        results += "   <p>" + "\n";
        results += "      <pre>" + "\n";
        results += hjow_serializeXMLString(hjow_trans("Not recommended for beginners of using computer.")) + "\n";
        results += hjow_serializeXMLString(hjow_trans("If you use this features, you can use custom AI scripts.")) + "\n";
        results += hjow_serializeXMLString(hjow_trans("Please check your script for malware before using it.")) + "\n";
        results += "      </pre>" + "\n";
        results += "   </p>" + "\n";
        results += "</div>" + "\n";
        results += "<div class='setting_element'>" + "\n";
        results += "   <p>" + "\n";
        results += "      <span class='label'>" + hjow_serializeXMLString(hjow_trans("Theme Script")) + "</span>" + "\n";
        results += "   </p>" + "\n";
        results += "   <p>" + "\n";
        results += hjow_serializeXMLString(hjow_trans("You can paste the styling scripts here.")) + "\n";
        results += "   </p>" + "\n";
        results += "   <p>" + "\n";
        results += "      <textarea class='tx_theme_script'></textarea>" + "\n";
        results += "   </p>" + "\n";
        results += "</div>" + "\n";
        results += "<div class='setting_element setting_buttons_bottom'>" + "\n";
        results += "   <p>" + "\n";
        results += "       <button type='button' onclick=\"h.engine.events.main.btn_save_settings(); return false;\">" + hjow_serializeXMLString(hjow_trans("Apply")) + "</button>" + "\n";
        results += "   </p>" + "\n";
        results += "</div>" + "\n";
        results += "</div>" + "\n";
        return results;
    };
    protected gamePageHTML(): string {
        var results: string = "";
        results += "<table class='full layout'>" + "\n";
        results += "   <tr>" + "\n";
        results += "       <td class='td_deck'>" + "\n";
        results += "           <span class='label'>" + hjow_serializeXMLString(hjow_trans("In deck,")) + " </span><span class='deck_lefts'>0</span><span class='label'>" + " " + hjow_serializeXMLString(hjow_trans("cards")) + "</span>" + "\n";
        results += "           <button type='button' class='btn_user_control btn_get_from_deck' onclick='h.engine.events.game.btn_get_from_deck(); return false;'>" + hjow_serializeXMLString(hjow_trans("Get one from deck")) + "</button>" + "\n";
        results += "       </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr>" + "\n";
        results += "       <td class='td_player_game_list min_height'>" + "\n";
        results += "          <div class='player_arena_div'>" + "\n";
        for (var idx = 0; idx < this.players.length; idx++) {
            var currentPlayer: XCardPlayer = this.players[idx];
            results += this.eachPlayerGameHTML(currentPlayer);
        }
        results += "          </div>" + "\n";
        results += "       </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr>" + "\n";
        results += "       <td class='td_game_status'>" + "\n";
        results += "           <span class='progress prog_game_status_bar'><span class='progress_in'>" + "</span></span>\n";
        results += "       </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    protected hidePageHTML(): string {
        var results: string = "";
        results += "<table class='full layout'>" + "\n";
        results += "   <tr>" + "\n";
        results += "      <td>" + "\n";
        results += "          <button type='button' class='full btn_hide_reveal' onclick='h.engine.events.hide.reveal(); return false;'>" + hjow_serializeXMLString(hjow_trans("Press this button to continue...")) + "</button>" + "\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr>" + "\n";
        results += "      <td class='td_game_status'>" + "\n";
        results += "           <span class='progress prog_hide_left_time'><span class='progress_in'>" + "</span></span>\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "</table>" + "\n";

        return results;
    };
    protected resultPageHTML(): string {
        var gameMode: XCardGameMode = this.gameModeList[this.gameModeIndex];
        var results: string = "";
        results += "<table class='full layout'>" + "\n";
        results += "   <tr>" + "\n";
        results += "      <td>" + "\n";
        results += "         <h3>" + hjow_serializeXMLString(hjow_trans("Result")) + "</h3>" + "\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr>" + "\n";
        results += "      <td>" + "\n"

        var playerOrders: XCardPlayer[] = [];
        var temps: XCardPlayer[] = [];

        for (var tdx = 0; tdx < this.players.length; tdx++) {
            temps.push(this.players[tdx]);
        }

        // 순위별로 플레이어 다시 정렬
        var preventInfLoop: number = 0;
        while (temps.length > 0) {
            var maxVal: string = null;
            var maxIdx: number = -1;
            if (temps.length == 1) {
                playerOrders.push(temps[0]);
                temps = [];
                break;
            } else {
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
                hjow_log("Infinite Loop Detected");
                break;
            }
        }

        var orderNo: number = 0;
        var lastPlayerPoint: TBigInt = null;
        for (var idx = 0; idx < playerOrders.length; idx++) {
            var playerOne: XCardPlayer = playerOrders[idx];
            var playerPoint: TBigInt = playerOne.getCurrentPoint(this.gameModeList[this.gameModeIndex]);
            if (lastPlayerPoint == null || lastPlayerPoint.compare(playerPoint) > 0) {
                lastPlayerPoint = playerPoint;
                orderNo++;
            }

            var isLowest = "";
            if (idx == playerOrders.length - 1) isLowest = " order_player_last";

            results += "<table class='table_each_player_result presult_" + hjow_serializeString(playerOne.getUniqueId()) + " order_player_" + orderNo + isLowest + "'>";
            results += "   <tr>" + "\n";
            results += "      <td class='label'>" + "\n";
            results += "          <span class='label'>" + hjow_serializeXMLString(hjow_trans("Name")) + "</span>" + "\n";
            results += "      </td>" + "\n";
            results += "      <td>" + "\n";
            results += "          <input type='text' class='i_name' disabled='disabled'/>" + "\n";
            results += "      </td>" + "\n";
            results += "      <td class='label'>" + "\n";
            results += "          <span class='label'>" + hjow_serializeXMLString(hjow_trans("Type")) + "</span>" + "\n";
            results += "      </td>" + "\n";
            results += "      <td>" + "\n";
            results += "          <input type='text' class='i_type' disabled='disabled' value='" + hjow_serializeString(playerOne.getPlayerTypeName()) + "'/>" + "\n";
            results += "      </td>" + "\n";
            results += "   </tr>" + "\n";
            results += "   <tr>" + "\n";
            results += "      <td class='label'>" + "\n";
            results += "          <span class='label'>" + hjow_serializeXMLString(hjow_trans("Affects")) + "</span>" + "\n";
            results += "      </td>" + "\n";
            results += "      <td colspan='3'>" + "\n";
            results += "          <input type='text' class='i_affects' disabled='disabled'/>" + "\n";
            results += "      </td>" + "\n";
            results += "   </tr>" + "\n";
            results += "   <tr>" + "\n";
            results += "      <td class='label'>" + "\n";
            results += "          <span class='label'>" + hjow_serializeXMLString(hjow_trans("Point")) + "</span>" + "\n";
            results += "      </td>" + "\n";
            results += "      <td colspan='3'>" + "\n";
            results += "          <input type='text' class='i_point' disabled='disabled'/>" + "\n";
            results += "      </td>" + "\n";
            results += "   </tr>" + "\n";
            results += "</table>";
        }

        results += "      </td>" + "\n"
        results += "   </tr>" + "\n";
        results += "   <tr>" + "\n";
        results += "      <td>" + "\n";
        results += "         <button type='button' class='btn_end' onclick=\"h.engine.events.result.title(); return false;\">" + hjow_serializeXMLString(hjow_trans("OK")) + "</button>" + "\n";
        results += "         <button type='button' class='btn_show_replay' onclick=\"h.engine.events.result.show_replay(); return false;\">" + hjow_serializeXMLString(hjow_trans("See Record")) + "</button>" + "\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "</table>" + "\n";
        results += "<div class='replay_result'><textarea class='replay_json' readonly='readonly'></textarea></div>" + "\n";
        
        return results;
    };
    protected eachPlayerMainHTML(player : XCardPlayer): string {
        var results: string = "";
        results += "<table class='full player_each'>" + "\n";
        results += "   <colgroup>" + "\n";
        results += "       <col class='player_info_basic_label'/>" + "\n";
        results += "       <col class='player_info_basic'/>" + "\n";
        results += "       <col />" + "\n";
        results += "   </colgroup>" + "\n";
        results += "   <tbody>" + "\n";
        results += "       <tr>" + "\n";
        results += "          <td class='player_info_basic_label'>" + "\n";
        results += "              <span class='label'>" + hjow_serializeXMLString(hjow_trans("Name")) + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td class='player_info_basic'>" + "\n";
        results += "             <input type='text' class='inp_pname' name='pname_" + player.getUniqueId() + "' value='" + hjow_serializeString(player.getName()) + "'/>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td rowspan='2'>" + "\n";
        var customHtml = player.customMainHTML();
        if (customHtml != null) results += customHtml;
        results += "          </td>" + "\n";
        results += "       </tr>" + "\n";
        results += "       <tr>" + "\n";
        results += "          <td class='player_info_basic_label'>" + "\n";
        results += "              <span class='label'>" + hjow_serializeXMLString(hjow_trans("Type")) + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td class='player_info_basic'>" + "\n";
        results += "             <span class='player_type'>" + player.getPlayerTypeName() + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "       </tr>" + "\n";
        results += "   </tbody>" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    protected eachPlayerGameHTML(player: XCardPlayer): string {
        var results: string = player.customGameHTML();
        if (results == null || results == "") {
            results = "<div class='div_player_arena_each pdiv_" + hjow_serializeString(player.getUniqueId()) + "'>";
            results += "<table class='td_player player_place table_player_arena_each pplace_" + hjow_serializeString(player.getUniqueId()) + "'>" + "\n";
            results += "   <tr class='player_arena_one_line_layout'>";
            results += "      <td colspan='2' class='player_arena_one_line_layout'>";
            results += "         <span class='player_name'>" + hjow_serializeXMLString(player.getName()) + "</span>";
            results += "      </td>";
            results += "   </tr>";
            results += "   <tr class='player_arena_one_line_layout'>";
            results += "      <td class='player_arena_one_line_layout'>";
            results += "          <span class='label'>" + hjow_trans("Inventory") + "</span>";
            results += "      </td>";
            results += "      <td class='player_arena_one_line_layout'>";
            results += "          <span class='label'>" + hjow_trans("Point Affectors") + "</span>";
            results += "      </td>";
            results += "   </tr>";
            results += "   <tr>";
            results += "      <td class='td_select_container'>";
            results += "         <select multiple class='select_player_arena inventory pinventory_" + hjow_serializeString(player.getUniqueId()) + "'>";

            results += "         </select>";
            results += "      </td>";
            results += "      <td class='td_select_container'>";
            results += "         <select multiple class='select_player_arena affector paffector_" + hjow_serializeString(player.getUniqueId()) + "'>";

            results += "         </select>";
            results += "      </td>";
            results += "   </tr>";
            results += "   <tr class='player_arena_one_line_layout'>";
            results += "      <td class='player_arena_one_line_layout'>";
            results += "          <span class='player_inventory_card_count'>0</span> <span class='label'>" + hjow_serializeXMLString(hjow_trans("Cards")) + "</span>";
            results += "      </td>";
            results += "      <td class='player_arena_one_line_layout'>";
            results += "          <button type='button' class='btn_user_control btn_pay_here' onclick='h.engine.events.game.btn_pay_here(\"" + hjow_serializeString(player.getUniqueId()) + "\"); return false;'>" + hjow_serializeXMLString(hjow_trans("Pay here")) + "</button>";
            results += "      </td>";
            results += "   </tr>";
            results += "   <tr class='player_arena_one_line_layout'>";
            results += "      <td colspan='2' class='player_arena_one_line_layout'>";
            results += "          <span class='point_number ppoint_" + hjow_serializeString(player.getUniqueId()) + "'>0</span> <span class='label'>" + "Points" + "</span>";
            results += "      </td>";
            results += "   </tr>";
            results += "</table>" + "\n";
            results += "</div>";
        }
        return results;
    };
    private toolbarHTML(): string {
        var results: string = "";
        results += "<div class='toolbar_element left toolbar_buttons'>";
        if (this.gameStarted) {
            results += "<button type='button' onclick=\"h.engine.events.game.btn_game_stop(); return false;\">" + hjow_serializeXMLString(hjow_trans("Stop Game")) + "</button> ";
        } else if (!(this.showResult || this.needHideScreen || this.showSettings)) {
            results += "<button type='button' onclick=\"h.engine.events.main.btn_go_settings(); return false;\">" + hjow_serializeXMLString(hjow_trans("Settings")) + "</button> ";
        } else if (this.showSettings) {
            results += "<button type='button' onclick=\"h.engine.events.main.btn_go_main(); return false;\">" + hjow_serializeXMLString(hjow_trans("Go back to main")) + "</button> ";
        }
        results += "   <button type='button' class='btn_show_log'   onclick='hjow_openLogDialog();   return false;'> " + hjow_serializeXMLString(hjow_trans("Show Log")) + "</button>";
        results += "   <button type='button' class='btn_delete_log' onclick='hjow_deleteLogDialog(); return false;'>" + hjow_serializeXMLString(hjow_trans("Delete Log")) + "</button>";
        results += "</div>";
        results += "<div class='toolbar_element'>";
        results += "<span class='madeby'>Made by HJOW (hujinone22@naver.com)</span>";
        results += "</div>";

        results += "<div class='toolbar_element right'>";
        results += "<span class='version'>v" + this.version + "</span>";
        results += "</div>";
        
        return results;
    }
    private applyInputs() {
        if (this.gameStarted) return;
        if (this.needHideScreen) return;
        if (this.showResult) return;
        if (jq('.xcard_place .page_main').is(':empty')) return;

        var selGameMode = jq('.xcard_place .sel_game_mode');
        var selectedGameModeVal = selGameMode.val();
        if (selectedGameModeVal != null) { // 화면이 가려져 있으면 값을 못가져옴
            this.gameModeIndex = parseInt(selectedGameModeVal);
        }

        for (var idx = 0; idx < this.players.length; idx++) {
            var playerOne: XCardPlayer = this.players[idx];
            var playerBlock = jq(".xcard_place .pbasic_" + hjow_serializeString(playerOne.getUniqueId()));
            if (playerBlock.length == 0) continue;
            playerOne.setName(playerBlock.find('.inp_pname').val(), this);
            playerOne.applyInputs(this, this.gameStarted, this.needHideScreen, this.showResult);
        }
    };
    private applySettings() {
        var settingPage = jq(".xcard_place .page_set");

        var recordRepComp = settingPage.find('.chk_record_replay');
        if (recordRepComp.is(':checked')) {
            this.setProperty('record_replay', 'true');
        } else {
            this.setProperty('record_replay', 'false');
        }

        var useAdvComp = settingPage.find('.chk_set_use_advanced_features');
        if (useAdvComp.is(':checked')) {
            this.setProperty('use_advanced_features', 'true');
        } else {
            this.setProperty('use_advanced_features', 'false');
        }

        var localeSel = settingPage.find('.sel_language').val();
        if (!(localeSel == null || typeof (localeSel) == 'undefined')) {
            hjow_selectedLocale = localeSel;
            this.setProperty('locale', localeSel);
        }

        var themeScripts = settingPage.find('.tx_theme_script').val();
        if (themeScripts == null) themeScripts = '';
        try {
            if (themeScripts != '') JSON.parse(themeScripts);
        } catch (e) {
            hjow_alert(e, hjow_trans('Error'));
            themeScripts = '';
        }
        this.setProperty('theme', themeScripts);
        
        try {
            this.save();
            this.applyProperties(); // 이 작업은 메인화면 돌아간 후에도 한번 더 수행해야 함
        } catch (e) {
            hjow_alert(e, hjow_trans('Error'));
        }
    };
    public payHere(targetPlayerUniqueId: string, cardUniqueId: string): string {
        var player: XCardPlayer = this.players[this.turnPlayerIndex]; // 현재 턴의 플레이어
        var targetPlayer: XCardPlayer = this.findPlayer(targetPlayerUniqueId); // 대상 플레이어
        
        var errMsg: string = targetPlayer.canPayByUniqId(cardUniqueId, player);
        if (errMsg != null) {
            hjow_alert(errMsg, hjow_trans('Information'));
            return errMsg;
        }

        var targetCard: XCard = player.findInventoryCard(this, cardUniqueId);
        var targetPlayerIdx: number = -1;
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
                var cloned: XCard = new XCard();
                cloned.no = plainObj.no;
                cloned.op = plainObj.op;
                cloned.setUniqueId(this, plainObj.uniqueId);
                action.card = cloned;
                action.actionPlayerIndex = this.turnPlayerIndex;
                action.payTargetPlayerIndex = -1;
                action.date = new Date();
                this.replay.actions.push(action);
            } catch (e) {
                hjow_log(e);
                this.replay = null;
            }
        }

        hjow_log("TURN [" + player.getName() + "] : " + hjow_replaceStr(hjow_replaceStr(hjow_trans("Pay the card '[[CARD]]' to the player '[[PLAYER]]'."), "[[CARD]]", targetCard.toString()), "[[PLAYER]]", targetPlayer.getName()));

        this.nextTurn();
        return null;
    }
    
    private prepareEvents() {
        var selfObj: XCardGameEngine = this;
        h.engine.events = {};
        h.engine.events.main = {};
        h.engine.events.main.btn_game_start = function () {
            selfObj.startGame();
        };
        h.engine.events.main.btn_add_player = function () {
            var typeOf: string = jq('.xcard_place .sel_player_type').val();
            var playerCreator: XCardPlayerCreator = null;
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

            var newPlayer: XCardPlayer = playerCreator.create(playerCreator.getTypeName() + " " + selfObj.players.length);
            selfObj.players.push(newPlayer);
            selfObj.refreshPage(false);
        };
        h.engine.events.main.btn_remove_player = function () {
            if (selfObj.players.length == 0) return;
            selfObj.players[selfObj.players.length - 1].resetCards();
            hjow_removeItemFromArray(selfObj.players, selfObj.players.length - 1);
            selfObj.refreshPage(false);
        };
        h.engine.events.main.btn_go_settings = function () {
            selfObj.showSettings = true;
            selfObj.needHideScreen = false;
            selfObj.showResult = false;
            selfObj.refreshPage();
        };
        h.engine.events.main.btn_go_main = function () {
            selfObj.showSettings = false;
            selfObj.showResult = false;
            selfObj.needHideScreen = false;
            selfObj.gameStarted = false;
            selfObj.refreshPage();
        };
        h.engine.events.main.btn_save_settings = function () {
            if (! hjow_parseBoolean(selfObj.getProperty('localStorageAvailable'))) {
                hjow_alert(hjow_trans('On this platform, local storage saving is not working. Changes will be applied only this time.'));
            }

            selfObj.applySettings();
            h.engine.events.main.btn_go_main();
            selfObj.applyProperties();
        };
        h.engine.events.main.sel_mode_changed = function () {
            selfObj.applyInputs();
            selfObj.refreshMainGameMode();
        };
        h.engine.events.game = {};
        h.engine.events.game.btn_get_from_deck = function () {
            var player: XCardPlayer = selfObj.players[selfObj.turnPlayerIndex];
            var card: XCard = selfObj.deck[0];
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
                } catch (e) {
                    hjow_log(e);
                    selfObj.replay = null;
                }
            }

            hjow_log("TURN [" + player.getName() + "] : " + hjow_trans("Get one card from deck."));
            selfObj.nextTurn();
        };
        h.engine.events.game.btn_pay_here = function (playerUniqId: string) {
            var player: XCardPlayer = selfObj.players[selfObj.turnPlayerIndex]; // 현재 턴의 플레이어

            var playerInvenObj = jq(".xcard_place .pplace_" + hjow_serializeString(player.getUniqueId()) + " .inventory");
            var selectedCardVal = playerInvenObj.val(); // 배열
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
        h.engine.events.game.btn_game_stop = function () {
            selfObj.finishGame(false);
        };
        h.engine.events.hide = {};
        h.engine.events.hide.reveal = function () {
            selfObj.showSettings = false;
            selfObj.needHideScreen = false;
            selfObj.turnChanging = false;
            selfObj.refreshPage(false);
        };
        h.engine.events.result = {};
        h.engine.events.result.title = function () {
            selfObj.showSettings = false;
            selfObj.needHideScreen = false;
            selfObj.gameStarted = false;
            selfObj.showResult = false;
            selfObj.clearAllPlayers();
            selfObj.refreshPage(true);
        };
        h.engine.events.result.show_replay = function () {
            jq('.xcard_place .btn_show_replay').hide();
            jq('.xcard_place .replay_result').show();
            jq('.xcard_place .replay_json').show();
        };
        h.engine.events.onResize = function () {
            selfObj.refreshPage(false);
        };
    };
    private prepareLanguageSets() {
        var newLangSet: LanguageSet = null;

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
        newLangSet.stringTable.set("Name", "이름");
        newLangSet.stringTable.set("Type", "타입");
        newLangSet.stringTable.set("Affects", "점수 계산식");
        newLangSet.stringTable.set("Point", "점수");
        newLangSet.stringTable.set("OK", "확인");
        newLangSet.stringTable.set("Show Record", "기록 보기");
        newLangSet.stringTable.set("Easy", "쉬움");
        newLangSet.stringTable.set("Normal", "보통");
        newLangSet.stringTable.set("Hard", "어려움");
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
        hjow_languageSets.push(newLangSet);

        
    };
};
