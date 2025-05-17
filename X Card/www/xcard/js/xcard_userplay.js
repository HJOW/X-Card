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
var XCardUserPlayEngine = (function (_super) {
    __extends(XCardUserPlayEngine, _super);
    function XCardUserPlayEngine(plcArea, additionalRefreshFunction, debugMode) {
        if (plcArea === void 0) { plcArea = '.hjow_xcard_style_place'; }
        if (additionalRefreshFunction === void 0) { additionalRefreshFunction = null; }
        if (debugMode === void 0) { debugMode = false; }
        var _this = _super.call(this, plcArea, additionalRefreshFunction, debugMode) || this;
        _this.userplayUsers = [];
        _this.userplaySelectedIndex = 0;
        return _this;
    }
    ;
    XCardUserPlayEngine.prototype.getClassName = function () {
        return "XCardUserPlayEngine";
    };
    ;
    XCardUserPlayEngine.prototype.prepareFirstProp = function () {
        this.deck = [];
        this.players = [];
        var userplayCreator = new XCardUserplayUserPlayerCreator();
        this.playerTypes = [];
        this.playerTypes.push(userplayCreator);
        this.playerTypes.push(new XCardUserplayAIPlayerCreator());
        var userplayPlayerJson = this.properties.get("userplay_player");
        if (userplayPlayerJson == null) {
            this.userplayUsers.push(new XCardUserplayUserPlayer(hjow_trans("User")));
            this.userplaySelectedIndex = 0;
        }
        else {
            var userplayPlayerObj = JSON.parse(userplayPlayerJson);
            var userplayPlayerArr = userplayPlayerObj['players'];
            if (userplayPlayerArr == null || typeof (userplayPlayerArr) == 'undefined')
                userplayPlayerArr = [];
            for (var idx = 0; idx < userplayPlayerArr.length; idx++) {
                var playerOne = (userplayCreator.restoreFromPlainObject(userplayPlayerArr[idx], this));
                if (playerOne == null)
                    continue;
                this.userplayUsers.push(playerOne);
            }
            if (this.userplayUsers.length <= 0) {
                this.userplayUsers.push(new XCardUserplayUserPlayer(hjow_trans("User")));
                this.userplaySelectedIndex = 0;
            }
            else {
                var selectedNumObj = userplayPlayerObj['selected'];
                if (selectedNumObj == null || typeof (selectedNumObj) == 'undefined')
                    selectedNumObj = 1;
                var selectedNum = parseInt(String(selectedNumObj));
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
            if (hjow_getPlatform() == 'android' || hjow_getPlatform() == 'windowsuniversal') {
                useBrowserSelectOpt = "false";
            }
            else {
                useBrowserSelectOpt = "true";
            }
            this.setProperty('use_browser_select', useBrowserSelectOpt);
        }
        if (useBrowserInputOpt == null || typeof (useBrowserInputOpt) == 'undefined' || useBrowserInputOpt == '') {
            if (hjow_getPlatform() == 'android') {
                useBrowserInputOpt = "false";
            }
            else {
                useBrowserInputOpt = "true";
            }
            this.setProperty('use_browser_input', useBrowserInputOpt);
        }
        if (screenApplySpeed == null || typeof (screenApplySpeed) == 'undefined' || screenApplySpeed == '') {
            screenApplySpeed = "300";
            if (hjow_parseBoolean(useBrowserSelectOpt))
                screenApplySpeed = "100";
            this.setProperty('screen_apply_speed', screenApplySpeed);
        }
    };
    ;
    XCardUserPlayEngine.prototype.saveUserplayPlayer = function () {
        var userplayPlayerArr = [];
        for (var idx = 0; idx < this.userplayUsers.length; idx++) {
            userplayPlayerArr.push(this.userplayUsers[idx].toPlainObject(this));
        }
        var userplayPlayerObj = {};
        userplayPlayerObj['players'] = userplayPlayerArr;
        userplayPlayerObj['selected'] = this.userplaySelectedIndex;
        this.properties.set("userplay_player", JSON.stringify(userplayPlayerObj));
        this.save();
    };
    ;
    XCardUserPlayEngine.prototype.refreshMain = function () {
        var userplayUserArea = jq(this.placeArea).find('.sel_userplay_userlist');
        userplayUserArea.empty();
        for (var idx = 0; idx < this.userplayUsers.length; idx++) {
            if (idx == this.userplaySelectedIndex) {
                userplayUserArea.append("<option value='" + this.userplayUsers[idx].getUniqueId() + "' selected='selected'>" + this.userplayUsers[idx].getName() + "</option>");
            }
            else {
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
        var heightVal = jq(this.placeArea).height() - 20;
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
    XCardUserPlayEngine.prototype.mainPageHTML = function () {
        var results = "";
        results += "<table class='element e001 full layout'>" + "\n";
        results += "  <tr class='element e002'>" + "\n";
        results += "     <td class='element e003 td_game_title'>" + "\n";
        results += "        <h2 class='element e004'>" + hjow_serializeXMLString(hjow_trans("X Card")) + "</h2>" + "\n";
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
        results += "        <button type='button' class='element e009 btn_game_start'>" + hjow_serializeXMLString(hjow_trans("Start Game")) + "</button>" + "\n";
        results += "        <div class='element e010 div_game_mode_desc'></div>" + "\n";
        results += "     </td>" + "\n";
        results += "     <td class='element e163 td_game_below td_game_ads' style='width: 250px;'>" + "\n";
        results += "     </td>" + "\n";
        results += "  </tr>" + "\n";
        results += "</table>" + "\n";
        return results;
    };
    ;
    XCardUserPlayEngine.prototype.eachPlayerMainHTML = function (player) {
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
        results += "             <input type='text' class='element e096 inp_pname need_custom_keyboard" + playerNameFieldOpt + "' name='pname_" + hjow_serializeString(player.getUniqueId()) + "' value='" + hjow_serializeString(player.getName()) + "'" + playerNameFieldOpt + "/>" + "\n";
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
    XCardUserPlayEngine.prototype.applyInputs = function () {
        if (this.gameStarted)
            return;
        if (this.needHideScreen)
            return;
        if (this.showResult)
            return;
        if (jq(this.placeArea).find('.page_main').is(':empty'))
            return;
        var selectedUserVal = jq(this.getPlaceArea()).find(".sel_userplay_userlist").val();
        for (var idx = 0; idx < this.userplayUsers.length; idx++) {
            var player = this.userplayUsers[idx];
            if (player.getUniqueId() == selectedUserVal) {
                this.userplaySelectedIndex = idx;
            }
        }
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
            if (playerOne instanceof XCardUserplayUserPlayer) {
                this.userplayUsers[this.userplaySelectedIndex] = playerOne;
            }
            this.saveUserplayPlayer();
        }
    };
    ;
    XCardUserPlayEngine.prototype.refreshEvents = function () {
        var selfObj = this;
        var selfAny = this.getSelfObject();
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
            hjow_log(eval(jq(selfObj.placeArea).find('.tx_console_run').val()));
            hjow_openLogDialog();
        });
        this.reAllocateButtonEvent(jq('.btn_exit'), function (compObj) {
            hjow_tryExit();
        });
    };
    ;
    XCardUserPlayEngine.prototype.prepareEvents = function () {
        var selfObj = this;
        var selfAny = this.getSelfObject();
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
                hjow_alert(hjow_trans("Cannot delete a player."), hjow_trans('Information'));
                return;
            }
            hjow_removeItemFromArray(selfObj.userplayUsers, selfObj.userplaySelectedIndex);
            selfObj.userplaySelectedIndex = 1;
            selfObj.refreshPage();
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
            selfObj.beforeSelectedPlayerType = playerCreator.getTypeName();
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
        selfAny.events.main.sel_userplay_user_changed = function () {
            selfObj.applyInputs();
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
    return XCardUserPlayEngine;
}(XCardGameEngine));
;
var XCardUserplayUserPlayer = (function (_super) {
    __extends(XCardUserplayUserPlayer, _super);
    function XCardUserplayUserPlayer(name) {
        var _this = _super.call(this, name) || this;
        _this.credit = 100;
        return _this;
    }
    ;
    XCardUserplayUserPlayer.prototype.getCredit = function () {
        if (this.credit < 100) {
            this.credit = 100;
        }
        return this.credit;
    };
    ;
    XCardUserplayUserPlayer.prototype.setCredit = function (credit) {
        this.credit = credit;
    };
    ;
    XCardUserplayUserPlayer.prototype.getClassName = function () {
        return "XCardUserPlayer";
    };
    ;
    XCardUserplayUserPlayer.prototype.customMainHTML = function () {
        var results = "";
        results += "<span class='label element'>" + hjow_serializeXMLString(hjow_trans("Credit")) + "</span> : <span class='label element credit'>" + this.getCredit() + "</span>" + "\n";
        return results;
    };
    ;
    XCardUserplayUserPlayer.prototype.toPlainObject = function (engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardGameEngine))
            return null;
        var result = _super.prototype.toPlainObject.call(this, engine);
        result.credit = this.getCredit();
        result.type = this.getClassName();
        return result;
    };
    ;
    XCardUserplayUserPlayer.prototype.setUniqueIdFromCreator = function (creator, uniqueId) {
        if (creator == null)
            return;
        if (!(creator instanceof XCardUserPlayerCreator))
            return;
        this.setUniqueId(uniqueId);
    };
    ;
    return XCardUserplayUserPlayer;
}(XCardUserPlayer));
;
var XCardUserplayAIPlayer = (function (_super) {
    __extends(XCardUserplayAIPlayer, _super);
    function XCardUserplayAIPlayer(name) {
        var _this = _super.call(this, name) || this;
        _this.difficulty = 2;
        _this.customAIScript = null;
        return _this;
    }
    ;
    XCardUserplayAIPlayer.prototype.getClassName = function () {
        return "XCardUserplayAIPlayer";
    };
    ;
    XCardUserplayAIPlayer.prototype.getPlayerTypeName = function () {
        return "AI";
    };
    ;
    XCardUserplayAIPlayer.prototype.isUserControllable = function () {
        return false;
    };
    ;
    XCardUserplayAIPlayer.prototype.needToHideInventoryForSelf = function () {
        return true;
    };
    ;
    XCardUserplayAIPlayer.prototype.setDifficulty = function (diff, engine) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        this.difficulty = diff;
    };
    ;
    XCardUserplayAIPlayer.prototype.setCustomAIScript = function (scripts, engine) {
        if (engine == null)
            return;
        if (!(engine instanceof XCardGameEngine))
            return;
        this.customAIScript = scripts;
    };
    ;
    XCardUserplayAIPlayer.prototype.actOnTurn = function (engine, mode, deck, players, turnNumber) {
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
    XCardUserplayAIPlayer.prototype.customMainHTML = function () {
        var results = "";
        results += "<div class='div_player_ai_custom'>";
        results += "<div class='div_player_ai_custom_element'>";
        results += "<span class='label'>" + hjow_trans("Difficulty") + "</span> ";
        results += "<select class='sel_ai_difficulty'>";
        results += "<option value='2'>" + hjow_serializeXMLString(hjow_trans("Normal")) + "</option>";
        results += "</select>";
        results += "</div>";
        results += "<div class='div_player_ai_custom_element wide'>";
        results += "<textarea class='tx_ai_script advanceMode' placeholder=\"" + hjow_serializeString("// " + hjow_trans("paste custom AI script here if you want")) + "\"></textarea>";
        results += "</div>";
        return results;
    };
    ;
    XCardUserplayAIPlayer.prototype.refreshMain = function (engine) {
        var playerBlock = jq(engine.getPlaceArea()).find(".pbasic_" + this.getUniqueId());
        var textBlock = playerBlock.find('.tx_ai_script');
        textBlock.val('');
        if (this.customAIScript != null)
            textBlock.val(this.customAIScript);
    };
    ;
    XCardUserplayAIPlayer.prototype.applyInputs = function (engine, gameStarted, needHideScreen, showResult) {
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
    XCardUserplayAIPlayer.prototype.toPlainObject = function (engine) {
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
    XCardUserplayAIPlayer.prototype.setUniqueIdFromCreator = function (creator, uniqueId) {
        if (creator == null)
            return;
        if (!(creator instanceof XCardUserplayAIPlayerCreator))
            return;
        this.setUniqueId(uniqueId);
    };
    ;
    return XCardUserplayAIPlayer;
}(XCardPlayer));
;
var XCardUserplayUserPlayerCreator = (function (_super) {
    __extends(XCardUserplayUserPlayerCreator, _super);
    function XCardUserplayUserPlayerCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XCardUserplayUserPlayerCreator.prototype.getTypeName = function () {
        return "Player";
    };
    ;
    XCardUserplayUserPlayerCreator.prototype.create = function (name) {
        return new XCardUserPlayer(name);
    };
    ;
    XCardUserplayUserPlayerCreator.prototype.getSupportPlayerClassName = function () {
        return "XCardUserplayUserPlayer";
    };
    ;
    XCardUserplayUserPlayerCreator.prototype.restoreFromPlainObject = function (obj, engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardUserPlayEngine))
            return null;
        if (obj.type != this.getSupportPlayerClassName())
            return null;
        var result = new XCardUserplayUserPlayer(obj.name);
        result.setUniqueIdFromCreator(this, obj.uniqueId);
        var invArr = [];
        for (var idx = 0; idx < obj.inventory.length; idx++) {
            var newCard = new XCard();
            newCard.no = obj.inventory[idx].no;
            newCard.op = obj.inventory[idx].op;
            newCard.setUniqueId(engine, obj.inventory[idx].uniqueId);
            invArr.push(newCard);
        }
        result.setInventory(invArr, engine);
        var appArr = [];
        for (var adx = 0; adx < obj.applied.length; adx++) {
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
    return XCardUserplayUserPlayerCreator;
}(XCardPlayerCreator));
;
var XCardUserplayAIPlayerCreator = (function (_super) {
    __extends(XCardUserplayAIPlayerCreator, _super);
    function XCardUserplayAIPlayerCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XCardUserplayAIPlayerCreator.prototype.getTypeName = function () {
        return "AI";
    };
    ;
    XCardUserplayAIPlayerCreator.prototype.create = function (name) {
        return new XCardUserplayAIPlayer(name);
    };
    ;
    XCardUserplayAIPlayerCreator.prototype.getSupportPlayerClassName = function () {
        return "XCardAIPlayer";
    };
    ;
    XCardUserplayAIPlayerCreator.prototype.restoreFromPlainObject = function (obj, engine) {
        if (engine == null)
            return null;
        if (!(engine instanceof XCardUserPlayEngine))
            return null;
        if (obj.type != this.getSupportPlayerClassName())
            return null;
        var result = new XCardUserplayAIPlayer(obj.name);
        result.setUniqueIdFromCreator(this, obj.uniqueId);
        var invArr = [];
        for (var idx = 0; idx < obj.inventory.length; idx++) {
            var newCard = new XCard();
            newCard.no = obj.inventory[idx].no;
            newCard.op = obj.inventory[idx].op;
            newCard.setUniqueId(engine, obj.inventory[idx].uniqueId);
            invArr.push(newCard);
        }
        result.setInventory(invArr, engine);
        var appArr = [];
        for (var adx = 0; adx < obj.applied.length; adx++) {
            var newCard = new XCard();
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
    ;
    return XCardUserplayAIPlayerCreator;
}(XCardPlayerCreator));
;
//# sourceMappingURL=xcard_userplay.js.map