
/*
This JS library is made by HJOW.
E-mail : hujinone22@naver.com

This library need following libraries : jQuery, jQuery UI, BigInteger.js, hjow_common, xcard core.
This library is coded as TypeScript. If this file's extension is 'js', please find 'ts' original file.

jQuery : https://jquery.com/
jQuery UI : https://jqueryui.com/
BigInteger.js : https://www.npmjs.com/package/big-integer?activeTab=readme
*/
/*
Copyright 2019 HJOW (hujinone22@naver.com)

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
class XCardUserPlayEngine extends XCardGameEngine {
    protected userplayUsers: XCardUserplayUserPlayer[] = [];
    protected userplaySelectedIndex: number = 0;
    public constructor(plcArea: string = '.hjow_xcard_style_place', additionalRefreshFunction: Function = null, debugMode: boolean = false) {
        super(plcArea, additionalRefreshFunction, debugMode);
    };
    public getClassName(): string {
        return "XCardUserPlayEngine";
    };
    protected prepareFirstProp() {
        this.deck = [];
        this.players = [];

        var userplayCreator: XCardPlayerCreator = new XCardUserplayUserPlayerCreator();

        this.playerTypes = [];
        this.playerTypes.push(userplayCreator);
        this.playerTypes.push(new XCardUserplayAIPlayerCreator());

        var userplayPlayerJson: string = this.properties.get("userplay_player");
        if (userplayPlayerJson == null) {
            this.userplayUsers.push(new XCardUserplayUserPlayer(hjow_trans("User")));
            this.userplaySelectedIndex = 0;
        } else {
            var userplayPlayerObj: object = JSON.parse(userplayPlayerJson);
            var userplayPlayerArr: object[] = userplayPlayerObj['players'];
            if (userplayPlayerArr == null || typeof (userplayPlayerArr) == 'undefined') userplayPlayerArr = [];
            for (var idx = 0; idx < userplayPlayerArr.length; idx++) {
                var playerOne = (userplayCreator.restoreFromPlainObject(userplayPlayerArr[idx], this)) as XCardUserplayUserPlayer;
                if (playerOne == null) continue;
                this.userplayUsers.push(playerOne);
            }

            if (this.userplayUsers.length <= 0) {
                this.userplayUsers.push(new XCardUserplayUserPlayer(hjow_trans("User")));
                this.userplaySelectedIndex = 0;
            } else {
                var selectedNumObj = userplayPlayerObj['selected'];
                if (selectedNumObj == null || typeof (selectedNumObj) == 'undefined') selectedNumObj = 1;
                var selectedNum: number = parseInt(String(selectedNumObj));
                this.userplaySelectedIndex = selectedNum;
            }
        }

        this.players.push(this.userplayUsers[this.userplaySelectedIndex]);
        this.players.push(new XCardUserplayAIPlayer("AI " + this.players.length));
        this.players.push(new XCardUserplayAIPlayer("AI " + this.players.length));
        this.players.push(new XCardUserplayAIPlayer("AI " + this.players.length));

        this.gameModeList.push(new XCardGameDefaultMode());
        this.gameModeList.push(new XCardGameSpeedMode());

        var selfObj = this;
        if (hjow_xcard_addGameMode != null) {
            hjow_xcard_addGameMode = function (gameMode) {
                selfObj.gameModeList.push(gameMode);
                selfObj.refreshPage();
            };
            hjow_xcard_addPlayerType = function (playerType) {
                selfObj.playerTypes.push(playerType);
                selfObj.refreshPage();
            };
        }

        var useBrowserSelectOpt = this.getProperty('use_browser_select');
        var useBrowserInputOpt = this.getProperty('use_browser_input');
        var screenApplySpeed = this.getProperty('screen_apply_speed');
        if (useBrowserSelectOpt == null || typeof (useBrowserSelectOpt) == 'undefined' || useBrowserSelectOpt == '') {
            if (h.getPlatform() == 'android' || h.getPlatform() == 'windowsuniversal') {
                useBrowserSelectOpt = "false";
            } else {
                useBrowserSelectOpt = "true";
            }
            this.setProperty('use_browser_select', useBrowserSelectOpt);
        }

        if (useBrowserInputOpt == null || typeof (useBrowserInputOpt) == 'undefined' || useBrowserInputOpt == '') {
            if (h.getPlatform() == 'android') {
                useBrowserInputOpt = "false";
            } else {
                useBrowserInputOpt = "true";
            }
            this.setProperty('use_browser_input', useBrowserInputOpt);
        }

        if (screenApplySpeed == null || typeof (screenApplySpeed) == 'undefined' || screenApplySpeed == '') {
            screenApplySpeed = "300";
            if (hjow_parseBoolean(useBrowserSelectOpt)) screenApplySpeed = "100";
            this.setProperty('screen_apply_speed', screenApplySpeed);
        }
    };
    protected saveUserplayPlayer() {
        var userplayPlayerArr: object[] = [];
        for (var idx = 0; idx < this.userplayUsers.length; idx++) {
            userplayPlayerArr.push(this.userplayUsers[idx].toPlainObject(this));
        }
        var userplayPlayerObj = {};
        userplayPlayerObj['players'] = userplayPlayerArr;
        userplayPlayerObj['selected'] = this.userplaySelectedIndex;
        this.properties.set("userplay_player", JSON.stringify(userplayPlayerObj));
        this.save();
    };
    protected refreshMain() {
        var userplayUserArea: any = jq(this.placeArea).find('.sel_userplay_userlist');
        userplayUserArea.empty();
        for (var idx = 0; idx < this.userplayUsers.length; idx++) {
            if (idx == this.userplaySelectedIndex) {
                userplayUserArea.append("<option value='" + this.userplayUsers[idx].getUniqueId() + "' selected='selected'>" + this.userplayUsers[idx].getName() + "</option>");
            } else {
                userplayUserArea.append("<option value='" + this.userplayUsers[idx].getUniqueId() + "'>" + this.userplayUsers[idx].getName() + "</option>");
            }
        }

        jq(this.placeArea).find('.td_player_list').empty();
        var results = "";
        results += "<div class='full player_list_div element e137'>" + "\n";
        results += "<table class='full player_list element e138'>" + "\n";
        if (this.players.length <= 0) {
            results += "   <tr class='tr_player pbasic_none  element'>" + "\n";
            results += "       <td class='td_player_none element'>" + "\n";
            results += "          <span class='label element'>" + h.serializeXMLString(hjow_trans("Please add player to play.")) + "</span>" + "\n";
            results += "       </td>" + "\n";
            results += "   </tr>" + "\n";
        } else {
            for (var idx: number = 0; idx < this.players.length; idx++) {
                var currentPlayer: XCardPlayer = this.players[idx];
                results += "   <tr class='tr_player element pbasic_" + h.serializeString(currentPlayer.getUniqueId()) + "'>" + "\n";
                results += "       <td class='td_player element'>" + "\n";
                results += this.eachPlayerMainHTML(currentPlayer);
                results += "       </td>" + "\n";
                results += "   </tr>" + "\n";
            }
        }
        
        results += "   <tr class='tr_player_empty element e144'>" + "\n";
        results += "      <td class='td_player_empty element e145'>" + "\n";
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

        var heightVal: number = jq(this.placeArea).height() - 20;
        if (heightVal < 200) heightVal = 200;

        this.initTheme(1, false);

        jq(this.placeArea).find('.player_list_div').css('min-height', heightVal - 200 + 'px');
        jq(this.placeArea).find('.player_list_div').css('max-height', heightVal - 100 + 'px');

        var selGameMode = jq(this.placeArea).find('.sel_game_mode');
        selGameMode.find('option').remove();
        for (var mdx = 0; mdx < this.gameModeList.length; mdx++) {
            selGameMode.append(hjow_toStaticHTML("<option value='" + mdx + "'>" + h.serializeXMLString(hjow_trans(this.gameModeList[mdx].getName())) + "</option>"));
        }
        selGameMode.val(this.gameModeIndex);

        this.refreshMainGameMode(true);

        for (var idx: number = 0; idx < this.players.length; idx++) {
            this.players[idx].refreshMain(this);
        }
    };
    protected mainPageHTML(): string {
        var results: string = "";
        results += "<table class='element e001 full layout'>" + "\n";
        results += "  <tr class='element e002'>" + "\n";
        results += "     <td class='element e003 td_game_title'>" + "\n";
        results += "        <h2 class='element e004'>" + h.serializeXMLString(hjow_trans("X Card")) + "</h2>" + "\n";
        results += "     </td>" + "\n";
        results += "     <td class='element e003'>" + "\n";
        results += "        <select class='element sel_userplay_userlist'></select>" + "\n";
        results += "        <button type='button' class='element btn_add_userplay_player'>+</button>" + "\n";
        results += "        <button type='button' class='element btn_del_userplay_player'>-</button>" + "\n";
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "  <tr class='element e005'>" + "\n";
        results += "     <td class='element e006 td_player_list' colspan='2'>" + "\n";

        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "  <tr class='element e006'>" + "\n";
        results += "     <td class='element e007 td_game_below td_game_start'>" + "\n";
        results += "        <select class='element e008 sel_game_mode'></select>" + "\n";
        results += "        <button type='button' class='element e009 btn_game_start'>" + h.serializeXMLString(hjow_trans("Start Game")) + "</button>" + "\n";
        results += "        <div class='element e010 div_game_mode_desc'></div>" + "\n";
        results += "     </td>" + "\n";
        results += "     <td class='element e163 td_game_below td_game_ads' style='width: 250px;'>" + "\n";
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    protected eachPlayerMainHTML(player: XCardPlayer): string {
        var results: string = "";
        results += "<table class='full player_each element e089'>" + "\n";
        results += "   <colgroup>" + "\n";
        results += "       <col class='player_info_basic_label element e090'/>" + "\n";
        results += "       <col class='player_info_basic element e091'/>" + "\n";
        results += "       <col />" + "\n";
        results += "   </colgroup>" + "\n";
        results += "   <tbody>" + "\n";
        results += "       <tr class='element e092'>" + "\n";
        results += "          <td class='element e093 player_info_basic_label'>" + "\n";
        results += "              <span class='label element e094'>" + h.serializeXMLString(hjow_trans("Name")) + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td class='element e095 player_info_basic'>" + "\n";
        var playerNameFieldOpt: string = "";
        if (!player.isNameEditable()) playerNameFieldOpt = " disabled";
        results += "             <input type='text' class='element e096 inp_pname need_custom_keyboard" + playerNameFieldOpt + "' name='pname_" + h.serializeString(player.getUniqueId()) + "' value='" + h.serializeString(player.getName()) + "'" + playerNameFieldOpt + "/>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td rowspan='2' class='element e097'>" + "\n";
        var customHtml = player.customMainHTML();
        if (customHtml != null) results += customHtml;
        results += "          </td>" + "\n";
        results += "       </tr>" + "\n";
        results += "       <tr class='element e098'>" + "\n";
        results += "          <td class='player_info_basic_label element e099'>" + "\n";
        results += "              <span class='label element e100'>" + h.serializeXMLString(hjow_trans("Type")) + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "          <td class='player_info_basic element e101'>" + "\n";
        results += "             <span class='player_type element e102'>" + h.serializeXMLString(hjow_trans(player.getPlayerTypeName())) + "</span>" + "\n";
        results += "          </td>" + "\n";
        results += "       </tr>" + "\n";
        results += "   </tbody>" + "\n";
        results += "</table>" + "\n";
        return results;
    };

    protected applyInputs() {
        if (this.gameStarted) return;
        if (this.needHideScreen) return;
        if (this.showResult) return;
        if (jq(this.placeArea).find('.page_main').is(':empty')) return;

        var selectedUserVal = jq(this.getPlaceArea()).find(".sel_userplay_userlist").val();
        for (var idx = 0; idx < this.userplayUsers.length; idx++) {
            var player = this.userplayUsers[idx];
            if (player.getUniqueId() == selectedUserVal) {
                this.userplaySelectedIndex = idx;
            }
        }

        var selGameMode = jq(this.placeArea).find('.sel_game_mode');
        var selectedGameModeVal = selGameMode.val();
        if (selectedGameModeVal != null) { // 화면이 가려져 있으면 값을 못가져옴
            this.gameModeIndex = parseInt(selectedGameModeVal);
        }

        for (var idx = 0; idx < this.players.length; idx++) {
            var playerOne: XCardPlayer = this.players[idx];
            var playerBlock = jq(this.placeArea).find(".pbasic_" + h.serializeString(playerOne.getUniqueId()));
            if (playerBlock.length == 0) continue;
            playerOne.setName(playerBlock.find('.inp_pname').val(), this);
            playerOne.applyInputs(this, this.gameStarted, this.needHideScreen, this.showResult);
            if (playerOne instanceof XCardUserplayUserPlayer) {
                this.userplayUsers[this.userplaySelectedIndex] = playerOne;
            }
            this.saveUserplayPlayer();
        }
    };

    protected refreshEvents() {
        var selfObj = this;
        var selfAny: any = this.getSelfObject();
        var pageArea = jq(this.placeArea);

        this.removeButtonEvent(pageArea.find('button'));
        this.removeSelectEvent(pageArea.find('select'));

        this.reAllocateButtonEvent(pageArea.find('.btn_add_userplay_player'), function (compObj) {
            selfAny.events.main.btn_add_userplay_player();
        });

        this.reAllocateButtonEvent(pageArea.find('.btn_del_userplay_player'), function (compObj) {
            selfAny.events.main.btn_del_userplay_player();
        });

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

        this.reAllocateSelectEvent(pageArea.find('.sel_userplay_userlist'), function (compObj) {
            selfAny.events.main.sel_userplay_user_changed();
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
            selfAny.events.game.btn_pay_here(compObj.attr('data-unique-id'));
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
            h.log(eval(jq(selfObj.placeArea).find('.tx_console_run').val()));
            hjow_openLogDialog();
        });

        this.reAllocateButtonEvent(jq('.btn_exit'), function (compObj) {
            h.tryExit();
        });
    };
    protected prepareEvents() {
        var selfObj: XCardUserPlayEngine = this;
        var selfAny: any = this.getSelfObject(); // 이렇게 안하면 타입스크립트 제한사항 때문에 메소드 부여가 안 됨
        selfAny.events = {};
        selfAny.events.main = {};
        selfAny.events.main.btn_game_start = function () {
            selfObj.startGame();
        };
        selfAny.events.main.btn_add_userplay_player = function () {
            selfObj.userplayUsers.push(new XCardUserplayUserPlayer("NEW PLAYER"));
            selfObj.refreshPage();
        };
        selfAny.events.main.btn_del_userplay_player = function () {
            if (selfObj.userplayUsers.length <= 1) {
                h.alert(hjow_trans("Cannot delete a player."), hjow_trans('Information'));
                return;
            }

            hjow_removeItemFromArray(selfObj.userplayUsers, selfObj.userplaySelectedIndex);
            selfObj.userplaySelectedIndex = 1;
            selfObj.refreshPage();
        };
        selfAny.events.main.btn_add_player = function () {
            var typeOf: string = jq(selfObj.getPlaceArea()).find('.sel_player_type').val();
            var playerCreator: XCardPlayerCreator = null;
            for (var idx = 0; idx < selfObj.playerTypes.length; idx++) {
                if (selfObj.playerTypes[idx].getTypeName() == typeOf) {
                    playerCreator = selfObj.playerTypes[idx];
                    break;
                }
            }
            if (playerCreator == null) {
                h.alert(hjow_trans("Please select correct player type."), hjow_trans('Information'));
                return;
            }

            var newPlayer: XCardPlayer = playerCreator.create(playerCreator.getTypeName() + " " + selfObj.players.length);
            selfObj.players.push(newPlayer);
            selfObj.beforeSelectedPlayerType = playerCreator.getTypeName();
            selfObj.refreshPage(false);
        };
        selfAny.events.main.btn_remove_player = function () {
            if (selfObj.players.length == 0) return;
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
                h.alert(hjow_trans('On this platform, local storage saving is not working. Changes will be applied only this time.'));
            }

            selfObj.applySettings();
            if (selfObj.isDebugMode()) {
                selfObj.showSettings = false;
                selfObj.refreshPage();
            } else {
                selfAny.events.main.btn_go_main();
            }
            selfObj.applyProperties();
        };
        selfAny.events.main.sel_userplay_user_changed = function () {
            selfObj.applyInputs();
        };
        selfAny.events.main.sel_mode_changed = function () {
            selfObj.applyInputs();
            selfObj.refreshMainGameMode();
        };
        selfAny.events.game = {};
        selfAny.events.game.btn_get_from_deck = function () {
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
                    hjow_error(e);
                    selfObj.replay = null;
                }
            }

            h.log("TURN [" + player.getName() + "] : " + hjow_trans("Get one card from deck."));
            selfObj.nextTurn();
        };
        selfAny.events.game.btn_pay_here = function (playerUniqId: string) {
            var player: XCardPlayer = selfObj.players[selfObj.turnPlayerIndex]; // 현재 턴의 플레이어

            var playerInvenObj = jq(selfObj.getPlaceArea()).find(".pplace_" + h.serializeString(player.getUniqueId()) + " .inventory");
            var selectedCardVal = playerInvenObj.val(); // 배열
            if (selectedCardVal.length <= 0) {
                h.alert(hjow_trans("Please select your card first."), hjow_trans('Information'));
                return;
            }
            if (selectedCardVal.length > 1) {
                h.alert(hjow_trans("Cannot pay multiple cards."), hjow_trans('Information'));
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
};

class XCardUserplayUserPlayer extends XCardUserPlayer {
    protected credit: number = 100;

    public constructor(name: string) {
        super(name);
    };
    
    public getCredit(): number {
        if (this.credit < 100) {
            this.credit = 100;
        }
        return this.credit;
    };
    public setCredit(credit: number) {
        this.credit = credit;
    };
    public getClassName(): string {
        return "XCardUserPlayer";
    };
    public customMainHTML(): string {
        var results: string = "";
        results += "<span class='label element'>" + h.serializeXMLString(hjow_trans("Credit")) + "</span> : <span class='label element credit'>" + this.getCredit() + "</span>" + "\n";
        return results;
    };
    public toPlainObject(engine: XCardGameEngine): any {
        if (engine == null) return null;
        if (!(engine instanceof XCardGameEngine)) return null;

        var result = super.toPlainObject(engine);
        result.credit = this.getCredit();
        result.type = this.getClassName();
        return result;
    };
    public setUniqueIdFromCreator(creator: XCardPlayerCreator, uniqueId: string) {
        if (creator == null) return;
        if (!(creator instanceof XCardUserPlayerCreator)) return;
        this.setUniqueId(uniqueId);
    };
};

class XCardUserplayAIPlayer extends XCardPlayer {
    protected difficulty: number = 2;
    protected customAIScript: string = null;
    public constructor(name: string) {
        super(name);
    };
    public getClassName(): string {
        return "XCardUserplayAIPlayer";
    };
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
    public actOnTurn(engine: XCardGameEngine, mode: XCardGameMode, deck: XCard[], players: XCardPlayer[], turnNumber: number) {
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

            // 난이도에 따라 인공지능을 좀 더 방어적으로 행동하도록 함
            if (this.difficulty == 2) defendees = 2;
            if (this.difficulty == 1) defendees = 4;
            if (this.difficulty == 0) defendees = 8;

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

            var playerOrders = hjow_orderPlayerList(players, mode); // 점수 순위로 플레이어 순서 정렬한 배열 미리 준비 (점수가 너무 낮은 플레이어에게 공격하는 것을 방지하기 위함)
            var sumPoint: TBigInt = new TBigInt(0); // 전체 플레이어의 점수도 계산할 예정
            var selfOrder: number = -1; // 자기자신의 순위 계산
            for (var podx = 0; podx < playerOrders.length; podx++) {
                if (playerOrders[podx].getUniqueId() == this.getUniqueId()) {
                    selfOrder = podx;
                }
                sumPoint = sumPoint.add(playerOrders[podx].getCurrentPoint(mode));
            }

            var avgPoint: TBigInt = sumPoint.divide(new TBigInt(players.length)); // 평균 점수
            var bestPoint: TBigInt = playerOrders[0].getCurrentPoint(mode); // 1등의 현 점수
            var worstPoint: TBigInt = playerOrders[playerOrders.length - 1].getCurrentPoint(mode); // 꼴찌의 점수
            var variancePoint: TBigInt = bestPoint.subtract(worstPoint); // 1등과 꼴찌 점수 차이

            // 다른 플레이어에게 카드를 줄 수 있는 모든 경우의 수 찾기
            for (var cdx = 0; cdx < this.inventory.length; cdx++) {
                var invCard: XCard = this.inventory[cdx];
                for (var pdx = 0; pdx < players.length; pdx++) {
                    var playerOne: XCardPlayer = players[pdx];
                    var errMsg: string = playerOne.canPay(invCard, this);
                    if (errMsg != null) continue; // 카드 내기가 불가능 - 사용 가능 동작에 등록하지 않음

                    // 사용 가능 동작임이 확인됨, 동작 점수 계산

                    var playerOneOrder: number = -1; // 이 대상 플레이어의 순위 계산
                    for (var podx2 = 0; podx2 < playerOrders.length; podx2++) {
                        if (playerOrders[podx2].getUniqueId() == playerOne.getUniqueId()) {
                            playerOneOrder = podx2;
                            break;
                        }
                    }

                    var actionPoint: TBigInt = null;
                    var beforePoint: TBigInt = playerOne.getCurrentPoint(mode); // 이 대상 플레이어의 변화 전 점수
                    var simulatedPoint: TBigInt = playerOne.getCurrentPointIfPaid(mode, invCard); // 이 대상 플레이어의 변화결과 점수

                    if (playerOne.getUniqueId() == this.getUniqueId()) {
                        actionPoint = simulatedPoint.multiply(new TBigInt(defendees)); // 자기자신에게 카드를 놓음 - 방어 비율 적용
                    } else {
                        actionPoint = simulatedPoint.multiply(new TBigInt(-1)).multiply(new TBigInt(offensives)); // 상대방에게 카드를 놓음 - 공격 비율 적용

                        // 상대방 플레이어의 순위가 자신 대비 너무 낮은 경우 더 공격할 필요가 줄어듦 - 공격 확률 축소
                        if (beforePoint.compare(simulatedPoint) > 0) { // 카드를 두면 상대의 점수가 더 적어지는 경우에만 이 기능 적용 (공격이 아닌, 어쩔 수 없이 손해를 보더라도 두는 경우는 이 기능 적용 안 하기 위함)
                            var orderStd: number = Math.ceil(players.length / 2.0); // 순위 차이가 어느정도 나야 많이 나는 것으로 인식해야 할 지를 적당히 계산함
                            if (selfOrder < playerOneOrder && Math.abs(playerOneOrder - selfOrder) >= orderStd) { // 순위는 숫자가 낮을수록 좋음!! 위에서 계산한 기준치 적용

                                // bigInt 는 정수만 지원하므로 나눗셈을 하면 나머지 부분이 날아감 (소수점 내림), 그러므로, 먼저 2배를 하고 나눗셈을 한 후 2를 다시 나누면 반올림 효과 비슷하게 동작함
                                actionPoint = actionPoint.multiply(new TBigInt(2));
                                actionPoint = actionPoint.divide(new TBigInt(Math.round(Math.abs(playerOneOrder - selfOrder))).multiply(new TBigInt(10))); // 순위 차이 만큼 나눔, 순위 차이가 클 수록 나누는 수가 커짐
                                actionPoint = actionPoint.divide(new TBigInt(2));

                                // 점수 차가 너무 벌어져 있다면 이것으로도 부족하므로 추가 작업
                                if (avgPoint.compare(beforePoint) > 0) {
                                    var targetPlayerGapAvg: TBigInt = avgPoint.subtract(beforePoint); // 평균 점수에서 타겟 플레이어 점수를 뺌
                                    if (targetPlayerGapAvg.abs().compare(variancePoint.abs().divide(new TBigInt(4))) > 0) {
                                        actionPoint = actionPoint.subtract(new TBigInt(-999999999));
                                    }
                                }
                            }
                        }
                    }
                    // 이 시점에서 actionPoint 는 null 이 아님
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
                    hjow_error("Infinite Loop Detected");
                    break;
                }
            }

            if (engine.isActPlayerStopRequested() || (!engine.isThisTurn(this))) return; // 시간 제한이 지났는지 확인 (지났으면 연산 중단)

            // 동작들 중 실제 수행할 동작 선택
            var selectedAct: XCardAIProcessAction = null;
            var randomNo: number = Math.round(Math.random() * 100.0);
            if (this.difficulty >= 4) { // 미친 난이도
                selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
            } else if (this.difficulty == 3) { // 극한
                if (randomNo >= 10) selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
                else if (orderedActions.length >= 2) selectedAct = orderedActions[1]; // 차선
                else selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
            } else if (this.difficulty == 2) { // 어려움
                if (randomNo >= 50) selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
                else if (randomNo >= 10 && orderedActions.length >= 2) selectedAct = orderedActions[1]; // 차선
                else if (orderedActions.length >= 3) selectedAct = orderedActions[2]; // 차차선
                else selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
            } else if (this.difficulty == 1) { // 보통
                if (randomNo >= 65) selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
                else if (randomNo >= 30 && orderedActions.length >= 2) selectedAct = orderedActions[1]; // 차선
                else if (randomNo >= 10 && orderedActions.length >= 3) selectedAct = orderedActions[2]; // 차차선
                else if (randomNo >= 5 && orderedActions.length >= 4) selectedAct = orderedActions[3]; // 차차차선
                else selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
            } else { // 쉬움
                if (randomNo >= 70) selectedAct = orderedActions[0]; // 그냥 가장 좋은 선택을 함
                else if (randomNo >= 60 && orderedActions.length >= 2) selectedAct = orderedActions[1]; // 차선
                else if (randomNo >= 50 && orderedActions.length >= 3) selectedAct = orderedActions[2]; // 차차선
                else if (randomNo >= 20 && orderedActions.length >= 4) selectedAct = orderedActions[3]; // 차차차선
                else if (randomNo >= 5 && orderedActions.length >= 5) selectedAct = orderedActions[4]; // 차차차차선
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
            engine.getSelfObject().events.game.btn_get_from_deck();
            return;
        }
        var errMsg = engine.payHere(targetPlayerUniqId, targetCardUniqId);
        if (errMsg != null) {
            engine.getSelfObject().events.game.btn_get_from_deck();
            return;
        }

    };
    public customMainHTML(): string {
        var results: string = "";
        results += "<div class='div_player_ai_custom'>";
        results += "<div class='div_player_ai_custom_element'>";
        results += "<span class='label'>" + hjow_trans("Difficulty") + "</span> ";
        results += "<select class='sel_ai_difficulty'>";
        results += "<option value='2'>" + h.serializeXMLString(hjow_trans("Normal")) + "</option>";
        results += "</select>";
        results += "</div>";
        results += "<div class='div_player_ai_custom_element wide'>";
        results += "<textarea class='tx_ai_script advanceMode' placeholder=\"" + h.serializeString("// " + hjow_trans("paste custom AI script here if you want")) + "\"></textarea>";
        results += "</div>";
        return results;
    };
    public refreshMain(engine: XCardGameEngine) {
        var playerBlock = jq(engine.getPlaceArea()).find(".pbasic_" + this.getUniqueId());
        var textBlock = playerBlock.find('.tx_ai_script');
        textBlock.val('');
        if (this.customAIScript != null) textBlock.val(this.customAIScript);
    };
    public applyInputs(engine: XCardGameEngine, gameStarted: boolean, needHideScreen: boolean, showResult: boolean) {
        if (gameStarted) return;
        if (needHideScreen) return;
        if (showResult) return;

        var playerBlock = jq(engine.getPlaceArea()).find(".pbasic_" + this.getUniqueId());
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
        result.type = this.getClassName();
        result.difficulty = this.difficulty;
        result.customAIScript = this.customAIScript;
        return result;
    };
    public setUniqueIdFromCreator(creator: XCardPlayerCreator, uniqueId: string) {
        if (creator == null) return;
        if (!(creator instanceof XCardUserplayAIPlayerCreator)) return;
        this.setUniqueId(uniqueId);
    };
};

class XCardUserplayUserPlayerCreator extends XCardPlayerCreator {
    public getTypeName() {
        return "Player";
    };
    public create(name: string): XCardPlayer {
        return new XCardUserPlayer(name);
    };
    public getSupportPlayerClassName() {
        return "XCardUserplayUserPlayer";
    };
    public restoreFromPlainObject(obj: any, engine: XCardGameEngine): XCardPlayer {
        if (engine == null) return null;
        if (!(engine instanceof XCardUserPlayEngine)) return null;
        if (obj.type != this.getSupportPlayerClassName()) return null;
        var result: XCardUserplayUserPlayer = new XCardUserplayUserPlayer(obj.name);
        result.setUniqueIdFromCreator(this, obj.uniqueId);
        var invArr: XCard[] = [];
        for (var idx = 0; idx < obj.inventory.length; idx++) {
            var newCard: XCard = new XCard();
            newCard.no = obj.inventory[idx].no;
            newCard.op = obj.inventory[idx].op;
            newCard.setUniqueId(engine, obj.inventory[idx].uniqueId);
            invArr.push(newCard);
        }
        result.setInventory(invArr, engine);
        var appArr: XCard[] = [];
        for (var adx = 0; adx < obj.applied.length; adx++) {
            var newCard: XCard = new XCard();
            newCard.no = obj.applied[adx].no;
            newCard.op = obj.applied[adx].op;
            newCard.setUniqueId(engine, obj.applied[adx].uniqueId);
            appArr.push(newCard);
        }
        result.setApplied(appArr, engine);
        return result;
    };
};

class XCardUserplayAIPlayerCreator extends XCardPlayerCreator {
    public getTypeName() {
        return "AI";
    };
    public create(name: string): XCardPlayer {
        return new XCardUserplayAIPlayer(name);
    };
    public getSupportPlayerClassName() {
        return "XCardAIPlayer";
    };
    public restoreFromPlainObject(obj: any, engine: XCardGameEngine): XCardPlayer {
        if (engine == null) return null;
        if (!(engine instanceof XCardUserPlayEngine)) return null;
        if (obj.type != this.getSupportPlayerClassName()) return null;
        var result: XCardUserplayAIPlayer = new XCardUserplayAIPlayer(obj.name);
        result.setUniqueIdFromCreator(this, obj.uniqueId);
        var invArr: XCard[] = [];
        for (var idx = 0; idx < obj.inventory.length; idx++) {
            var newCard: XCard = new XCard();
            newCard.no = obj.inventory[idx].no;
            newCard.op = obj.inventory[idx].op;
            newCard.setUniqueId(engine, obj.inventory[idx].uniqueId);
            invArr.push(newCard);
        }
        result.setInventory(invArr, engine);
        var appArr: XCard[] = [];
        for (var adx = 0; adx < obj.applied.length; adx++) {
            var newCard: XCard = new XCard();
            newCard.no = obj.applied[adx].no;
            newCard.op = obj.applied[adx].op;
            newCard.setUniqueId(engine, obj.applied[adx].uniqueId);
            appArr.push(newCard);
        }
        result.setApplied(appArr, engine);
        result.setDifficulty(obj.difficulty, engine);
        result.setCustomAIScript(obj.customAIScript, engine);
        return result;
    };
};