

/*
This JS library is made by HJOW.
E-mail : hujinone22@naver.com

This library need following libraries : jQuery, jQuery UI, hjow_common.
This library is coded as TypeScript. If this file's extension is 'js', please find 'ts' original file.
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
var jqo: Object = {
    hide: function () { return self; },
    show: function () { return self; },
    css: function (a: string, b: string) { return self; },
    html: function (a: string) { return self; }
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
    public apply(beforeVal: number): number {
        if (this.op == '+') return beforeVal + this.no;
        if (this.op == '-') return beforeVal - this.no;
        if (this.op == '*' || this.op == '×') return beforeVal * this.no;
        if (this.op == '/' || this.op == '÷') return beforeVal / this.no;

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
        this.inventory = cardList;
    };
    public lastAppliedCard(): XCard {
        if (this.applied.length == 0) return null;
        return this.applied[this.applied.length - 1];
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
    public resetCards() {
        this.inventory = [];
        this.applied = [];
    };
    public canPay(card: XCard, owner: XCardPlayer): string { // 본인/상대방이 이 플레이어의 슬롯에 카드를 두기 전 가능여부 확인, null 리턴이면 카드 두기가 가능, 뭔가 문자열이 리턴이 되면 해당 이유로 인해 카드 두기가 불가능한 것
        var lastCard: XCard = this.lastAppliedCard();
        if (lastCard.no == 7 && owner.getUniqueId() != this.getUniqueId()) {
            return "7-Protected slot";
        }
        if (card.no == 1) return null;
        if (lastCard.no == card.no) return null;
        if (lastCard.op == card.op) return null;

        return "Different number and operation symbol.";
    };
    public pay(card: XCard, owner: XCardPlayer): string { // 본인/상대방이 이 플레이어의 슬롯에 카드를 둘 때 사용, null 리턴이면 카드 두기가 성공(처리됨), 뭔가 문자열이 리턴이 되면 해당 이유로 인해 카드 두기가 불가능(처리 안됨)
        var lastCard: XCard = this.lastAppliedCard();
        var err: string = this.canPay(card, owner);
        if (err != null) return err;

        this.applied.push(card);
        owner.removeCardOnInventory(card);

        return null;
    };
    public getCurrentPoint(): number {
        var results: number = 0;
        for (var idx = 0; idx < this.applied.length; idx++) {
            var cardOne = this.applied[idx];
            results = cardOne.apply(results);
        }
        return results;
    };
    public customMainHTML(): string {
        return null;
    };
    public getPlayerTypeName(): string {
        return null;
    };
};

class XCardUserPlayer extends XCardPlayer {
    public constructor(name: string) {
        super(name);
    }
    public getPlayerTypeName(): string {
        return "Player";
    };
};

class XCardAIPlayer extends XCardPlayer {
    public constructor(name: string) {
        super(name);
    }
    public getPlayerTypeName(): string {
        return "AI";
    };
};

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

    private gameStarted: boolean = false;
    private timers: IntervalTimer[] = [];
    private players: XCardPlayer[] = [];
    private deck: XCard[] = [];
    private turnPlayerIndex: number = 0;
    private needHideScreen: boolean = false;
    private showResult: boolean = false;

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

        this.players.push(new XCardUserPlayer(""));
        this.players.push(new XCardAIPlayer("AI " + this.players.length));
        this.players.push(new XCardAIPlayer("AI " + this.players.length));
        this.players.push(new XCardAIPlayer("AI " + this.players.length));

        this.gameModeList.push(new XCardGameDefaultMode());
    };
    initEngine() {
        this.load();
        if (this.properties == null) this.properties = new Properties();
        this.prepareFirstProp();
    };
    initDom() {
        var bodyHtml: string = "<div class='page page_main'></div>\n";
        bodyHtml += "<div class='page page_game'></div>\n";
        bodyHtml += "<div class='page page_hide'></div>\n";
        bodyHtml += "<div class='page page_result'></div>\n";
        jq('body').html(bodyHtml);

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
        this.spreadCards();
        this.gameStarted = true;
        this.refreshPage();
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
    public refreshPage(heavyRefresh: boolean = true) {
        if (heavyRefresh) {
            jq('.page_game').html(this.gamePageHTML());
            jq('.page_main').html(this.mainPageHTML());
            jq('.page_hide').html(this.hidePageHTML());
            jq('.page_result').html(this.resultPageHTML());
            this.prepareEvents();
        }
        if (this.needHideScreen) {
            jq('.page:not(.page_hide)').hide();
            jq('.page_hide').show();
        } else if (this.gameStarted) {
            jq('.page:not(.page_game)').hide();
            this.refreshGame();
            jq('.page_game').show();
        } else if (this.showResult) {
            jq('.page:not(.page_result)').hide();
            this.refreshResult();
            jq('.page_result').show();
        } else {
            jq('.page:not(.page_main)').hide();
            this.refreshMain();
            jq('.page_main').show();
        }
    };
    private refreshMain() {
        jq('.td_player_list').empty();
        var results = "";
        results += "<div class='full player_list_div'>" + "\n";
        results += "<table class='full player_list'>" + "\n";
        for (var idx: number = 0; idx < this.players.length; idx++) {
            var currentPlayer: XCardPlayer = this.players[idx];
            results += "   <tr class='tr_player' x-unique-id='" + currentPlayer.getUniqueId() + "'>" + "\n";
            results += "       <td class='td_player'>" + "\n";
            results += this.eachPlayerMainHTML(currentPlayer);
            results += "       </td>" + "\n";
            results += "   </tr>" + "\n";
        }
        results += "   <tr class='tr_player_empty'>" + "\n";
        results += "       <td class='td_player_empty td_player_control'>" + "\n";
        results += "          <button type='button' class='btn_add_player' onclick='h.engine.events.main.btn_add_player(); return false;'>Add</button>" + "\n";
        results += "          <button type='button' class='btn_remove_player'  onclick='h.engine.events.main.btn_remove_player(); return false;'>Remove Last</button>" + "\n";
        results += "       </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "   <tr class='tr_player_empty'>" + "\n";
        results += "      <td class='td_player_empty full'>" + "\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "</table>" + "\n";
        results += "</div>" + "\n";
        jq('.td_player_list').html(results);
        
        jq('.player_list_div').css('min-height', window.innerHeight - 200 + 'px');
        jq('.player_list_div').css('max-height', window.innerHeight - 100 + 'px');
    };
    private refreshGame() {

    };
    private refreshResult() {

    };
    private mainPageHTML(): string {
        var results: string = "";
        results += "<table class='full layout'>" + "\n";
        results += "  <tr>" + "\n";
        results += "     <td class='td_game_title'>" + "\n";
        results += "        <h2>X Card</h2>" + "\n";
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "  <tr>" + "\n";
        results += "     <td class='td_player_list'>" + "\n";
        
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "  <tr>" + "\n";
        results += "     <td class='td_game_start' style='height: 25px;'>" + "\n";
        results += "        <button type='button' class='btn_game_start' onclick='h.engine.events.main.btn_game_start(); return false;'>Game Start</button>" + "\n";
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "</table>" + "\n";
        return results;
    };

    private gamePageHTML(): string {
        var results: string = "";
        results += "<table class='full layout'>" + "\n";
        results += "" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    private hidePageHTML(): string {
        var results: string = "";
        results += "<table class='full layout'>" + "\n";
        results += "" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    private resultPageHTML(): string {
        var results: string = "";
        results += "<table class='full layout'>" + "\n";
        results += "   <tr>" + "\n";
        results += "      <td>" + "\n";
        results += "      </td>" + "\n";
        results += "   </tr>" + "\n";
        results += "</table>" + "\n";
        
        return results;
    };
    private eachPlayerMainHTML(player : XCardPlayer): string {
        var results: string = player.customMainHTML();
        if (results == null || results == "") {
            results = "";
            results += "<table class='full player_each'>" + "\n";
            results += "   <colgroup>" + "\n";
            results += "       <col style='width:100px;'/>" + "\n";
            results += "       <col />" + "\n";
            results += "   </colgroup>" + "\n";
            results += "   <tbody>" + "\n";
            results += "       <tr>" + "\n";
            results += "          <td style='width:100px;'>" + "\n";
            results += "              <span>" + "Name" + "</span>" + "\n";
            results += "          </td>" + "\n";
            results += "          <td>" + "\n";
            results += "             <input type='text' class='inp_pname' name='pname_" + player.getUniqueId() + "' value='" + hjow_serializeString(player.getName()) + "'/>" + "\n";
            results += "             <select class='inp_ptype' name='ptype_" + player.getUniqueId() + "'>" + "\n";

            var psel_Player = "";
            var psel_AI = "";
            if (player.getPlayerTypeName() == 'Player') {
                psel_Player = "selected='selected'";
                psel_AI = "";
            } else if (player.getPlayerTypeName() == 'AI') {
                psel_Player = "";
                psel_AI = "selected='selected'";
            }

            results += "                 <option value='Player' " + psel_Player + ">" + "Player" + "</option>" + "\n";
            results += "                 <option value='AI' " + psel_AI + ">" + "AI" + "</option>" + "\n";
            
            results += "             </select>" + "\n";
            results += "          </td>" + "\n";
            results += "       </tr>" + "\n";
            results += "   </tbody>" + "\n";
            results += "</table>" + "\n";
        }
        return results;
    };
    private prepareEvents() {
        var selfObj: XCardGameEngine = this;
        h.engine.events = {};
        h.engine.events.main = {};
        h.engine.events.main.btn_game_start = function () {
            selfObj.startGame();
        };
        h.engine.events.main.btn_add_player = function () {
            selfObj.players.push(new XCardAIPlayer("AI " + selfObj.players.length));
            selfObj.refreshPage(false);
        };
        h.engine.events.main.btn_remove_player = function () {
            if (selfObj.players.length == 0) return;
            selfObj.players[selfObj.players.length - 1].resetCards();
            hjow_removeItemFromArray(selfObj.players, selfObj.players.length - 1);
            selfObj.refreshPage(false);
        };
    };
};
