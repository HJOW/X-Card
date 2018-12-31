

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
var jqo: Object = { // TypeScript 내에서 jQuery 사용을 위해 임시로 사용, html 파일 내에서 jq 에 jQuery 객체를 넣게 됨
    hide: function () { return self; },
    show: function () { return self; },
    css: function (a: string, b: string) { return self; },
    html: function (a: string) { return self; },
    each: function (a: any) { },
    find: function (a: any) { return self; },
    attr: function (a: string, b: string = null) { return ""; },
    prop: function (a: string, b: boolean = false) { return ""; },
    removeAttr: function (a) { return self; },
    removeProp: function (a) { return self; },
    remove: function () { return self; },
    append: function (a: any) { return self; },
    removeClass: function (a: string) { return self; },
    addClass: function (a: string) { return self; },
    val: function (a: any) { return ""; },
    length: 0
};
var jq: Function = function (obj: Object) {
    return jqo;
};

class UtilityMethods {
    public parseBoolean(val: any): boolean {
        return hjow_parseBoolean(val);
    };
};

class Uniqueable extends UtilityMethods {
    private uniqueId: string = 'p' + Math.round(Math.random() * 999999999) + '' + Math.round(Math.random() * 999999999) + '' + Math.round(Math.random() * 999999999) + '' + Math.round(Math.random() * 999999999);
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
        var results: Object = hjow_emptyObject();
        for (var idx: number = 0; idx < this.entries.length; idx++) {
            hjow_putOnObject(results, this.entries[idx].key, this.entries[idx].value);
        }
        return JSON.stringify(results);
    };
    public fromJSON(str: string) {
        var results: Object = JSON.parse(str);
        var selfObj = this;
        hjow_iterateObject(results, function (propertyName: any, valueOfProperty: any) {
            selfObj.put(String(propertyName), String(valueOfProperty));
        });
    };
};

class XCardReplayAction {
    public date: Date = null;
    public actionPlayerIndex: number = 0;
    public payTargetPlayerIndex: number = -1; // -1 : get one card from deck
    public card: XCard = null;
    public toPlainObject() {
        return {
            date: this.date,
            actionPlayerIndex: this.actionPlayerIndex,
            payTargetPlayerIndex: this.payTargetPlayerIndex,
            card: this.card
        };
    }
};

class XCardReplay {
    public actions: XCardReplayAction[] = [];
    public players: XCardPlayer[] = []; // should be first states
    public gameMode: XCardGameMode = null;
};

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
    if (typeof (browserLocale) == 'undefined' || browserLocale == null) return null;
    if (hjow_selectedLocale != null) {
        for (var ldx = 0; ldx < hjow_languageSets.length; ldx++) {
            if (hjow_selectedLocale == hjow_languageSets[ldx].locale || hjow_selectedLocale == hjow_languageSets[ldx].localeAlt) {
                return hjow_languageSets[ldx];
            }
        }
    }

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
};

class XCard extends Uniqueable {
    public no: number = 0;
    public op: string = '';
    public apply(beforeVal: any): any {
        if (this.op == '+' || this.op == '＋') return hjow_bigint_add(hjow_bigint(beforeVal), hjow_bigint(this.no));
        if (this.op == '-' || this.op == '－') return hjow_bigint_subtract(hjow_bigint(beforeVal), hjow_bigint(this.no));
        if (this.op == '*' || this.op == '×') return hjow_bigint_multiply(hjow_bigint(beforeVal), hjow_bigint(this.no));

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
};

class XCardPlayer extends Uniqueable {
    private name: string = "";
    private inventory: XCard[] = [];
    private applied: XCard[] = [];

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
    public lastAppliedCard(): XCard {
        if (this.applied.length == 0) return null;
        return this.applied[this.applied.length - 1];
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
    
    public getCurrentPoint(gameMode: XCardGameMode): any {
        var results: any = hjow_bigint(0);
        for (var idx = 0; idx < this.applied.length; idx++) {
            var cardOne = this.applied[idx];
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
    public getPlayerTypeName(): string {
        return null;
    };
    public isUserControllable(): boolean { // 사용자가 컨트롤 가능
        return true;
    };
    public needToHideInventoryForSelf(): boolean { // AI가 아닌 경우, 자기 자신 차례일 때는 인벤토리가 보여야 함
        return false;
    };
    public actOnTurn(engine: XCardGameEngine, deck: XCard[], players: XCardPlayer[]) {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;

    };
    public setName(name: string, engine: XCardGameEngine) {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;
        this.name = name;
    };
};

class XCardPlayerCreator {
    public getTypeName() {
        return null;
    }
    public create(name: string): XCardPlayer {
        return null;
    }
};

class XCardUserPlayer extends XCardPlayer {
    public constructor(name: string) {
        super(name);
    }
    public getPlayerTypeName(): string {
        return "Player";
    };
};

class XCardUserPlayerCreator extends XCardPlayerCreator {
    public getTypeName() {
        return "Player";
    }
    public create(name: string): XCardPlayer {
        return new XCardUserPlayer(name);
    }
};

class XCardAIPlayer extends XCardPlayer {
    private difficulty: number = 0;
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
    public actOnTurn(engine: XCardGameEngine, deck: XCard[], players: XCardPlayer[]) {
        if (engine == null) return;
        if (!(engine instanceof XCardGameEngine)) return;

        /////// AI 인공지능 처리 시작 ///////
        // 결과 변수 준비
        var needToGetFromDeck: boolean = true;
        var targetPlayer: XCardPlayer = null;
        var targetCard: XCard = null;

        // 최적의 수 계산
        needToGetFromDeck = true;



        // 계산 결과 집행
        if (needToGetFromDeck) {
            hjow_log("TURN ["+ this.getName() + "] : " + hjow_trans("Get one card from deck."));
            h.engine.events.game.btn_get_from_deck();
            return;
        }
        var errMsg = engine.payHere(targetPlayer.getUniqueId(), targetCard.getUniqueId());
        if (errMsg != null) {
            hjow_log("TURN ["+ this.getName() + "] : " + hjow_trans("Get one card from deck."));
            h.engine.events.game.btn_get_from_deck();
            return;
        }
    };
    public customMainHTML(): string {
        var results: string = "<span class='label'>" + hjow_trans("Difficulty") + "</span> ";
        results += "<select class='sel_ai_difficulty'>";
        for (var idx = 0; idx <= 2; idx++) {
            var difficultyStr: string = "";
            if (idx <= 0) difficultyStr = hjow_trans("Easy");
            if (idx == 1) difficultyStr = hjow_trans("Normal");
            if (idx >= 2) difficultyStr = hjow_trans("Hard");
            results += "<option value='" + idx + "'>" + hjow_serializeXMLString(difficultyStr) + "</option>";
        }
        results += "</select>";
        return results;
    };
    public applyInputs(engine: XCardGameEngine, gameStarted: boolean, needHideScreen: boolean, showResult: boolean) {
        if (gameStarted) return;
        if (needHideScreen) return;
        if (showResult) return;
        var playerBlock = jq(".pbasic_" + this.getUniqueId());
        var diff = playerBlock.find('.sel_ai_difficulty').val();
        this.difficulty = parseInt(diff);
    };
};

class XCardAIPlayerCreator extends XCardPlayerCreator {
    public getTypeName() {
        return "AI";
    }
    public create(name: string): XCardPlayer {
        return new XCardAIPlayer(name);
    }
}

class XCardGameMode extends ModuleObject {
    protected totals: XCard[] = [];
    public constructor() {
        super("X Card Game Mode", "X Card Game Undefined Mode");
    };
    public init(playerCount: number) {
        this.totals = [];
        for (var pdx = 0; pdx < playerCount; pdx++) {
            for (var idx: number = -1; idx <= 10; idx++) {
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
    }
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
        return true;
    }
    public startGame(engine: XCardGameEngine, players: XCardPlayer[], deckObj: XCard[]): boolean { // 게임 시작 시 동작 처리, true 리턴 시 작업 직후 기본 모드 게임 준비 및 시작 처리를 수행함, false 리턴 시 이 메소드 끝나고 바로 게임이 진행됨
        return true;
    }
    public afterPrepareStartDefaultGame(engine: XCardGameEngine, players: XCardPlayer[], deckObj: XCard[]) { // 기본 모드 게임 준비 및 시작 처리 끝난 직후 수행함. 기본 모드 준비 작업 수행 시에만 호출됨에 유의!

    }
    public beforeNextTurnWork(engine: XCardGameEngine, players: XCardPlayer[], deckObj: XCard[]) { // 다음 플레이어에게 차례 넘기는 작업 수행 직전 호출

    }

    public afterNextTurnWork(engine: XCardGameEngine, players: XCardPlayer[], deckObj: XCard[]) { // 다음 플레이어에게 차례 넘기는 작업 수행 직후 호출

    }
    public onFinishGame(engine: XCardGameEngine, players: XCardPlayer[], deckObj: XCard[]) { // 게임 끝나고 호출

    }
    public processPoint(player:XCardPlayer, beforeCalculated: any): any { // 점수 계산 직후 점수에 추가 연산 (리턴된 값이 계산 결과로 적용됨 ! any타입 매개변수 객체로는 bigInt 객체가 들어올 예정)
        return beforeCalculated;
    }
};

class XCardGameDefaultMode extends XCardGameMode {
    public constructor() {
        super();
        this.name = "Normal";
        this.desc = "X Card Game Normal Mode";
    };
    public playerInvList(): XCard[] {
        var result: XCard[] = [];
        for (var idx = 0; idx < 10; idx++) {
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

class XCardGameEngine extends ModuleObject {
    private gameModeList: XCardGameMode[] = [];
    private gameModeIndex: number = 0;

    private playerTypes: XCardPlayerCreator[] = [];

    private gameStarted: boolean = false;
    private timers: IntervalTimer[] = [];
    private players: XCardPlayer[] = [];
    private deck: XCard[] = [];
    private turnPlayerIndex: number = 0;
    private turnPlayerTime: number = 0;
    private beforeTurnPlayerIndex: number = 0;
    private needHideScreen: boolean = false;
    private hideScreenTime: number = 0;
    private showResult: boolean = false;
    private turnChanging: boolean = false;
    private actPlayerTurnRequest: boolean = false;

    public constructor() {
        super("X Card", "X Card Game Core Engine");
        hjow_prepareJQuery();
    };
    public init() {
        this.initEngine();
        this.initDom();
        this.title();
    };
    private prepareFirstProp() {
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
    };
    initEngine() {
        this.prepareLanguageSets();
        this.load();
        if (this.properties == null) this.properties = new Properties();
        this.prepareFirstProp();
    };
    initDom() {
        var bodyHtml: string = "<div class='page page_main'></div>\n";
        bodyHtml += "<div class='page page_game'></div>\n";
        bodyHtml += "<div class='page page_hide'></div>\n";
        bodyHtml += "<div class='page page_result'></div>\n";
        bodyHtml += "<div class='toolbar'></div>\n";
        jq('.xcard_place').html(bodyHtml);

        this.refreshPage();
    };
    private clearAllPlayers() {
        for (var idx = 0; idx < this.players.length; idx++) {
            this.players[idx].resetCards();
        }
    };
    public title() {
        this.gameStarted = false;
        this.stopAllTimer();
        this.clearAllPlayers();
        this.refreshPage();
    };
    public startGame() {
        this.applyInputs();

        // 게임 모드별 처리
        var gameMode: XCardGameMode = this.gameModeList[this.gameModeIndex];

        var needDefaultAction = gameMode.startGame(this, this.players, this.deck);
        if (needDefaultAction) { // 기본 모드 처리
            // 카드 분배
            this.spreadCards();

            // 처음 스타트하는 플레이어 지정
            this.turnPlayerIndex = Math.round((Math.random() * this.players.length) + 0.01);
            if (this.turnPlayerIndex < 0) this.turnPlayerIndex = 0;
            if (this.turnPlayerIndex >= this.players.length - 1) this.turnPlayerIndex = this.players.length - 1;

            var turnPlayer: XCardPlayer = this.players[this.turnPlayerIndex];

            // 제한 시간 세팅 (처음 시작하는 플레이어는 1초 혜택)
            this.turnPlayerTime = this.gameModeList[this.gameModeIndex].getEachPlayerTimeLimit(turnPlayer, this) + 1;

            // 시간 제한
            var selfObj = this;
            this.addTimer("LimitTimer", "Restrict the player's time", function () {
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
            this.addTimer("AIProcessor", "AI Process", function () {
                if (! selfObj.actPlayerTurnRequest) return;
                if (! selfObj.gameStarted) return;
                if (selfObj.turnChanging) return;
                if (selfObj.needHideScreen) return;

                selfObj.actPlayerTurnRequest = false;
                selfObj.players[selfObj.turnPlayerIndex].actOnTurn(selfObj, selfObj.deck, selfObj.players);
            }, 500);
        }
        
        this.needHideScreen = false;
        this.showResult = false;
        this.gameStarted = true;

        gameMode.afterPrepareStartDefaultGame(this, this.players, this.deck); // 기본 모드 작업 이후 추가 작업할 내용이 있으면 처리
        
        this.refreshPage();
        this.actPlayerTurnRequest = true;
    };
    public isHided(): boolean {
        return this.needHideScreen;
    };
    private addTimer(name: string, desc: string, func: Function, timeGap: number = 1000) {
        var newTimer: IntervalTimer = new IntervalTimer(name, desc, func, timeGap);
        this.timers.push(newTimer);
    };
    private stopAllTimer() {
        var curIdx: number = 0;
        while (curIdx < this.timers.length) {
            var timerOne: IntervalTimer = this.timers[curIdx];
            if (! (timerOne instanceof ImportantTimer)) {
                timerOne.stop();
                hjow_removeItemFromArray(this.timers, curIdx);
                curIdx = 0;
                continue;
            }
            curIdx++;
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
        hjow_saveOnLocalStorage('XCard', JSON.stringify(this.properties));
    };
    private load() {
        this.properties.fromJSON(JSON.parse(hjow_getOnLocalStorage('XCard')));
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

        var gameMode: XCardGameMode = this.gameModeList[this.gameModeIndex];
        gameMode.beforeNextTurnWork(this, this.players, this.deck);

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
        // this.players[this.turnPlayerIndex].actOnTurn(this, this.deck, this.players); // 이 시점에서 AI 처리하면 안됨

        gameMode.afterNextTurnWork(this, this.players, this.deck);
        this.actPlayerTurnRequest = true;
        this.turnChanging = false;
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
        this.stopTimer("LimitTimer");
        this.stopTimer("AIProcessor");
        this.gameStarted = false;
        this.needHideScreen = false;
        if (normalReason) {
            this.showResult = true;
        } else {
            this.showResult = false;
        }
        var gameMode: XCardGameMode = this.gameModeList[this.gameModeIndex];
        gameMode.onFinishGame(this, this.players, this.deck);
        this.refreshPage(false);
    };
    public refreshPage(heavyRefresh: boolean = true) {
        this.applyInputs();
        if (heavyRefresh) {
            jq('.xcard_place .page_game').html(this.gamePageHTML());
            jq('.xcard_place .page_main').html(this.mainPageHTML());
            jq('.xcard_place .page_hide').html(this.hidePageHTML());
            // jq('.page_result').html(this.resultPageHTML()); // 아래쪽에서 처리
            this.prepareEvents();
        }
        jq('.xcard_place .toolbar').html(this.toolbarHTML()); // 툴바는 항상 재로드
        if (this.needHideScreen) {
            jq('.xcard_place .page:not(.page_hide)').hide();
            this.refreshGame();
            jq('.xcard_place .page_hide').show();
        } else if (this.gameStarted) {
            jq('.xcard_place .page:not(.page_game)').hide();
            this.refreshGame();
            jq('.xcard_place .page_game').show();
        } else if (this.showResult) {
            jq('.xcard_place .page:not(.page_result)').hide();
            jq('.xcard_place .page_result').html(this.resultPageHTML());
            this.refreshResult();
            jq('.xcard_place .page_result').show();
        } else {
            jq('.xcard_place .page:not(.page_main)').hide();
            this.refreshMain();
            jq('.xcard_place .page_main').show();
        }
    };
    private refreshMain() {
        jq('.xcard_place .td_player_list').empty();
        var results = "";
        results += "<div class='full player_list_div'>" + "\n";
        results += "<table class='full player_list'>" + "\n";
        for (var idx: number = 0; idx < this.players.length; idx++) {
            var currentPlayer: XCardPlayer = this.players[idx];
            results += "   <tr class='tr_player pbasic_" + hjow_serializeString(currentPlayer.getUniqueId()) + "'>" + "\n";
            results += "       <td class='td_player td_player_arena_each'>" + "\n";
            results += this.eachPlayerMainHTML(currentPlayer);
            results += "       </td>" + "\n";
            results += "   </tr>" + "\n";
        }
        results += "   <tr class='tr_player_empty'>" + "\n";
        results += "       <td class='td_player_empty td_player_control'>" + "\n";
        results += "          <select class='sel_player_type'>" + "\n";
        for (var tdx = 0; tdx < this.playerTypes.length; tdx++) {
            var playerType: XCardPlayerCreator = this.playerTypes[tdx];
            results += "          <option value='" + hjow_serializeString(playerType.getTypeName()) + "'>" + hjow_serializeXMLString(playerType.getTypeName()) + "</option>" + "\n";
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
        jq('.xcard_place .td_player_list').html(results);

        var heightVal: number = window.innerHeight;
        if (heightVal < 400) heightVal = 400;
        
        jq('.xcard_place .player_list_div').css('min-height', heightVal - 200 + 'px');
        jq('.xcard_place .player_list_div').css('max-height', heightVal - 100 + 'px');
    };
    private refreshGame() {
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
            placeObj.find(".point_number").text(playerOne.getCurrentPoint(this.gameModeList[this.gameModeIndex]));

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
                invenSel.append(newOptionHTML);
            }

            invenObjs = invenSel.find("option:not('.concealed')");
            var concealedOpt = invenSel.find("option.concealed");
            if (concealedOpt.length == 0) {
                invenSel.append("<option value='' class='concealed'>[" + hjow_trans("Concealed") + "]</option>");
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
                affectorSel.append(newOptionHTML);
            }
        }

        var heightVal: number = window.innerHeight;
        if (heightVal < 400) heightVal = 400;

        var widthVal: number = window.innerWidth;
        if (widthVal < 400) widthVal = 400;

        jq('.xcard_place .player_arena_div').css('min-height', heightVal - 200 + 'px');
        jq('.xcard_place .player_arena_div').css('max-height', heightVal - 100 + 'px');
        jq('.xcard_place .player_arena_div').css('max-width', widthVal - 5 + 'px');
        
        jq('.xcard_place .td_select_container').each(function () {
            var heightIn: number = jq(this).height();
            if (heightIn < 300) heightIn = 300;
            jq(this).find('select').height(heightIn - 10);
        });
    };
    private refreshResult() {
        var gameMode: XCardGameMode = this.gameModeList[this.gameModeIndex];
        for (var idx = 0; idx < this.players.length; idx++) {
            var playerOne: XCardPlayer = this.players[idx];

            var playerBlock = jq(".xcard_place .presult_" + hjow_serializeString(playerOne.getUniqueId()));
            playerBlock.find(".i_name").val(playerOne.getName());
            playerBlock.find(".i_type").val(playerOne.getPlayerTypeName());
            playerBlock.find(".i_point").val(String(playerOne.getCurrentPoint(gameMode)));
            playerBlock.find(".i_affects").val(playerOne.listAppliedAsString());
        }
    };
    private mainPageHTML(): string {
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
        results += "        <button type='button' class='btn_game_start' onclick='h.engine.events.main.btn_game_start(); return false;'>" + hjow_serializeXMLString(hjow_trans("Start Game")) + "</button>" + "\n";
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "</table>" + "\n";
        return results;
    };

    private gamePageHTML(): string {
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
    private hidePageHTML(): string {
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
    private resultPageHTML(): string {
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
                    if (maxVal == null || hjow_bigint_compare(hjow_bigint(maxVal), points) < 0) {
                        maxVal = String(points);
                        maxIdx = tdx2;
                    }
                }
            }
            playerOrders.push(temps[maxIdx]);
            hjow_removeItemFromArray(temps, maxIdx);
        }

        for (var idx = 0; idx < playerOrders.length; idx++) {
            var playerOne: XCardPlayer = playerOrders[idx];
            results += "<table class='table_each_player_result presult_" + hjow_serializeString(playerOne.getUniqueId()) + " order_player_" + idx + "'>";
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
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "</table>" + "\n";
        
        return results;
    };
    private eachPlayerMainHTML(player : XCardPlayer): string {
        var results: string = "";
        results += "<table class='full player_each'>" + "\n";
        results += "   <colgroup>" + "\n";
        results += "       <col style='width:100px; min-width:70px;'/>" + "\n";
        results += "       <col style='width:300px; min-width:300px;'/>" + "\n";
        results += "       <col />" + "\n";
        results += "   </colgroup>" + "\n";
        results += "   <tbody>" + "\n";
        results += "       <tr>" + "\n";
        results += "          <td style='width:100px; min-width:70px;'>" + "\n";
        results += "              <span class='label'>" + hjow_serializeXMLString(hjow_trans("Name")) + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td style='width:300px; min-width:300px;'>" + "\n";
        results += "             <input type='text' class='inp_pname' name='pname_" + player.getUniqueId() + "' value='" + hjow_serializeString(player.getName()) + "'/>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td rowspan='2'>" + "\n";
        var customHtml = player.customMainHTML();
        if (customHtml != null) results += customHtml;
        results += "          </td>" + "\n";
        results += "       </tr>" + "\n";
        results += "       <tr>" + "\n";
        results += "          <td style='width:100px; min-width:70px;'>" + "\n";
        results += "              <span class='label'>" + hjow_serializeXMLString(hjow_trans("Type")) + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td style='width:300px; min-width:300px;'>" + "\n";
        results += "             <span class='player_type'>" + player.getPlayerTypeName() + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "       </tr>" + "\n";
        results += "   </tbody>" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    private eachPlayerGameHTML(player: XCardPlayer): string {
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
        if (! this.gameStarted) return "Made by HJOW (hujinone22@naver.com)";
        var results: string = "";
        results += "<button type='button' onclick=\"h.engine.events.game.btn_game_stop(); return false;\">" + hjow_serializeXMLString(hjow_trans("Stop Game")) + "</button>";
        return results;
    }
    private applyInputs() {
        if (this.gameStarted) return;
        if (this.needHideScreen) return;
        if (this.showResult) return;
        for (var idx = 0; idx < this.players.length; idx++) {
            var playerOne: XCardPlayer = this.players[idx];
            var playerBlock = jq(".xcard_place .pbasic_" + hjow_serializeString(playerOne.getUniqueId()));
            if (playerBlock.length == 0) continue;
            playerOne.setName(playerBlock.find('.inp_pname').val(), this);
            playerOne.applyInputs(this, this.gameStarted, this.needHideScreen, this.showResult);
        }
    };
    public payHere(targetPlayerUniqueId: string, cardUniqueId: string): string {
        var player: XCardPlayer = this.players[this.turnPlayerIndex]; // 현재 턴의 플레이어
        var targetPlayer: XCardPlayer = this.findPlayer(targetPlayerUniqueId); // 대상 플레이어
        
        var errMsg: string = targetPlayer.canPayByUniqId(cardUniqueId, player);
        if (errMsg != null) {
            hjow_alert(errMsg);
            return errMsg;
        }

        errMsg = targetPlayer.payByUniqId(cardUniqueId, player);
        if (errMsg != null) {
            hjow_alert(errMsg);
            return errMsg;
        }

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
                hjow_alert(hjow_trans("Please select correct player type."));
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
        h.engine.events.game = {};
        h.engine.events.game.btn_get_from_deck = function () {
            var player: XCardPlayer = selfObj.players[selfObj.turnPlayerIndex];
            var card: XCard = selfObj.deck[0];
            hjow_removeItemFromArray(selfObj.deck, 0);
            player.addOneOnInventory(card, selfObj);
            selfObj.nextTurn();
        };
        h.engine.events.game.btn_pay_here = function (playerUniqId: string) {
            var player: XCardPlayer = selfObj.players[selfObj.turnPlayerIndex]; // 현재 턴의 플레이어

            var playerInvenObj = jq(".xcard_place .pplace_" + hjow_serializeString(player.getUniqueId()) + " .inventory");
            var selectedCardVal = playerInvenObj.val(); // 배열
            if (selectedCardVal.length <= 0) {
                hjow_alert(hjow_trans("Please select your card first."));
                return;
            }
            if (selectedCardVal.length > 1) {
                hjow_alert(hjow_trans("Cannot pay multiple cards."));
                return;
            }

            selfObj.payHere(playerUniqId, selectedCardVal[0]);
        };
        h.engine.events.game.btn_game_stop = function () {
            selfObj.finishGame(false);
        };
        h.engine.events.hide = {};
        h.engine.events.hide.reveal = function () {
            selfObj.needHideScreen = false;
            selfObj.turnChanging = false;
            selfObj.refreshPage(false);
        };
        h.engine.events.result = {};
        h.engine.events.result.title = function () {
            selfObj.needHideScreen = false;
            selfObj.gameStarted = false;
            selfObj.showResult = false;
            selfObj.clearAllPlayers();
            selfObj.refreshPage(true);
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
        newLangSet.stringTable.set("Easy", "쉬움");
        newLangSet.stringTable.set("Normal", "보통");
        newLangSet.stringTable.set("Hard", "어려움");
        newLangSet.stringTable.set("Add", "추가");
        newLangSet.stringTable.set("Remove Last", "마지막 플레이어 삭제");
        newLangSet.stringTable.set("Difficulty", "난이도");
        newLangSet.stringTable.set("Concealed", "숨겨짐");
        newLangSet.stringTable.set("Please select your card first.", "보유한 카드에서 카드를 하나 선택해 주세요.");
        newLangSet.stringTable.set("7-Protected slot. Only the owner can pay here now.", "7 로 보호된 곳입니다. 마지막으로 7 카드가 놓인 곳에는 주인만 카드를 놓을 수 있습니다.");
        newLangSet.stringTable.set("The number, or the operation symbol should equal to the card [[LASTCARD]]", "마지막으로 놓인 카드([[LASTCARD]])와 숫자, 혹은 기호가 동일한 카드만 놓을 수 있습니다.");
        newLangSet.stringTable.set("Cannot pay multiple cards.", "여러 장의 카드를 동시에 놓을 수 없습니다.");
        hjow_languageSets.push(newLangSet);

        
    };
};
