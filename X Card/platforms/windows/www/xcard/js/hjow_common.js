var hjow = {};
var h = hjow;
h.property = {};
h.property.screenWidth = 1024;
h.property.screenHeight = 768;
h.engine = [];
function hjow_replaceStr(originalStr, targetStr, replacementStr) {
    return String(originalStr).split(String(targetStr)).join(String(replacementStr));
}
;
h.replaceStr = hjow_replaceStr;
h.property.logFormat = '[%TODAY%] %LOG%';
h.logAppendee = null;
function hjow_rawLog(obj, showDetailOnBrowserConsole, showDetailOnComp) {
    if (typeof (console) == 'undefined')
        return;
    if (typeof (console.log) == 'undefined')
        return;
    var contents = String(h.property.logFormat);
    contents = h.replaceStr(contents, '%TODAY%', hjow_date_to_string(new Date()));
    contents = h.replaceStr(contents, '%LOG%', String(obj));
    if (showDetailOnBrowserConsole) {
        console.log(contents);
    }
    else {
        console.log(obj);
    }
    if (h.logAppendee != null && typeof (h.logAppendee) != 'undefined') {
        if (showDetailOnComp)
            $(h.logAppendee).append(contents);
        else
            $(h.logAppendee).append(String(obj));
        $(h.logAppendee).append("\n");
    }
}
;
function hjow_log(obj) {
    hjow_rawLog(obj, true, false);
}
;
h.log = hjow_log;
function hjow_error(e, alertErr) {
    hjow_rawLog(e, false, false);
    if (alertErr) {
        alert(e);
    }
}
;
h.showError = hjow_error;
function hjow_prepareDialogLog() {
    if ($('.div_hjow_dialog_console .tf_hjow_console').length <= 0) {
        var logDialogHTML = "<div class='div_hjow_dialog_console' title='Log'>";
        logDialogHTML += "<textarea class='tf_hjow_console' readonly='readonly'></textarea>";
        logDialogHTML += "</div>";
        $('body').append(hjow_toStaticHTML(logDialogHTML));
    }
    h.logAppendee = $('.div_hjow_dialog_console .tf_hjow_console');
}
;
h.prepareDialogLog = hjow_prepareDialogLog;
function hjow_openLogDialog() {
    if ($('.div_hjow_dialog_console').length <= 0)
        return;
    $('.div_hjow_dialog_console').dialog({
        width: 450,
        height: 300
    });
    $('.div_hjow_dialog_console').css('overflow', 'hidden');
}
;
h.openLogDialog = hjow_openLogDialog;
function hjow_deleteLogDialog() {
    if (h.logAppendee == null || typeof (h.logAppendee) == 'undefined')
        return;
    $(h.logAppendee).empty();
    try {
        $(h.logAppendee).val("");
    }
    catch (e) { }
}
;
h.deleteLogDialog = hjow_deleteLogDialog;
h.alertFunction = null;
function hjow_alert(obj, title) {
    hjow_log(obj);
    if (h.alertFunction != null && typeof (h.alertFunction) != 'undefined') {
        h.alertFunction(obj, title);
        return;
    }
    alert(obj);
}
;
h.alert = hjow_alert;
function hjow_prepareDialogAlert() {
    if ($('.div_hjow_dialog_alert').length <= 0) {
        var logDialogHTML = "<div class='div_hjow_dialog_alert' style='display: none;' title='Alert'>";
        logDialogHTML += "</div>";
        $('body').append(hjow_toStaticHTML(logDialogHTML));
    }
    h.alertFunction = function (msg, title) {
        var dialogObj = $('.div_hjow_dialog_alert');
        if (title == null || (typeof (title) == 'undefined'))
            title = "Message";
        dialogObj.attr('title', String(title));
        dialogObj.text(String(msg));
        dialogObj.dialog();
    };
}
;
h.prepareDialogAlert = hjow_prepareDialogAlert;
h.property.debugMode = false;
function hjow_debugMode() {
    if (h.property.debugMode) {
        h.property.debugMode = false;
    }
    else {
        h.property.debugMode = true;
    }
    if (h.property.debugMode) {
        $('div').addClass('debugMode');
        $('td').addClass('debugMode');
    }
    else {
        $('div').removeClass('debugMode');
        $('td').removeClass('debugMode');
    }
}
;
h.debugMode = hjow_debugMode;
function hjow_prepareJQuery() {
    jqo = jQuery;
    jq = jQuery;
}
;
h.prepareJQuery = hjow_prepareJQuery;
function hjow_htmlForm(str) {
    var results = h.replaceStr(str, "<", "&lt;");
    results = h.replaceStr(results, ">", "&gt;");
    results = h.replaceStr(results, "\n", "<br/>");
    return results;
}
;
h.htmlForm = hjow_htmlForm;
function hjow_removeItemFromArray(arr, itemIndex) {
    arr.splice(itemIndex, 1);
}
;
h.removeItemFromArray = hjow_removeItemFromArray;
h.isLocalStorageOccurError = false;
function hjow_checkLocalStorageAvailable() {
    try {
        localStorage.setItem('localStorageTestMessage', 'success');
        return true;
    }
    catch (e) {
        h.isLocalStorageOccurError = true;
        return false;
    }
}
;
h.checkLocalStorageAvailable = hjow_checkLocalStorageAvailable;
function hjow_saveOnLocalStorage(key, val) {
    if (h.isLocalStorageOccurError)
        return;
    localStorage.setItem(key, val);
}
;
h.saveOnLocalStorage = hjow_saveOnLocalStorage;
function hjow_getOnLocalStorage(key) {
    if (h.isLocalStorageOccurError)
        return null;
    try {
        return localStorage.getItem(key);
    }
    catch (e) {
        hjow_error(e);
        return null;
    }
}
h.getOnLocalStorage = hjow_getOnLocalStorage;
function hjow_serializeString(str) {
    var results = String(str);
    results = h.replaceStr(results, '"', '\\' + '"');
    return results;
}
;
h.serializeString = hjow_serializeString;
function hjow_serializeXMLString(str) {
    var results = String(str);
    results = h.replaceStr(results, '<', '&lt;');
    results = h.replaceStr(results, '>', '&gt;');
    return results;
}
;
h.serializeXMLString = hjow_serializeXMLString;
function hjow_reverseSerializeString(str) {
    var results = String(str);
    results = h.replaceStr(results, '\\' + '"', '"');
    return results;
}
;
h.reverseSerializeString = hjow_reverseSerializeString;
function hjow_putOnObject(obj, key, val) {
    obj[key] = val;
}
;
h.putOnObject = hjow_putOnObject;
function hjow_getOnObject(obj, key) {
    return obj[key];
}
;
h.getOnObject = hjow_getOnObject;
function hjow_emptyObject() {
    return {};
}
;
h.emptyObject = hjow_emptyObject;
function hjow_iterateObject(obj, func) {
    $.each(obj, func);
}
;
h.iterateObject = hjow_iterateObject;
function hjow_parseBoolean(obj) {
    if (obj == null)
        return false;
    if (obj == true)
        return true;
    if (obj == false)
        return false;
    var str = String(obj);
    str = str.toLowerCase();
    if (str == 'y' || str == 'yes' || str == 't' || str == 'true')
        return true;
    if (str == 'n' || str == 'no' || str == 'f' || str == 'false')
        return false;
    throw "Cannot parse into boolean : " + obj;
}
;
h.parseBoolean = hjow_parseBoolean;
function hjow_simpleCloneArray(arr) {
    var newArr = [];
    for (var idx = 0; idx < arr.length; idx++) {
        newArr.push(arr[idx]);
    }
    return newArr;
}
h.simpleCloneArray = hjow_simpleCloneArray;
function hjow_ramdomizeArrayOrder(arr) {
    var temp = h.simpleCloneArray(arr);
    arr.splice(0, arr.length);
    while (temp.length >= 1) {
        var randomNo = Math.round((Math.random() * temp.length) - 0.01);
        if (randomNo >= temp.length)
            continue;
        arr.push(temp[randomNo]);
        h.removeItemFromArray(temp, randomNo);
    }
    return arr;
}
h.ramdomizeArrayOrder = hjow_ramdomizeArrayOrder;
function hjow_setProgressValue(progressBarObj, valueAsFloat, text) {
    var progObj = $(progressBarObj);
    var progIn = progObj.find('.progress_in');
    if (typeof (valueAsFloat) == 'undefined')
        valueAsFloat = 0;
    if (valueAsFloat == null)
        valueAsFloat = 0;
    try {
        if (typeof (valueAsFloat) == 'string')
            valueAsFloat = parseFloat(valueAsFloat);
    }
    catch (e) {
        valueAsFloat = 0;
    }
    if (valueAsFloat < 0)
        valueAsFloat = 0;
    if (valueAsFloat >= 1)
        valueAsFloat = 1;
    var maxWidth = progObj.width() * 1.0;
    var calcWidth = Math.round(valueAsFloat * maxWidth);
    if (typeof (text) == 'undefined')
        text = "";
    if (progObj.find('.progress_text').length >= 1)
        progObj.find('.progress_text').text(text);
    else
        progIn.text(text);
    progIn.width(calcWidth);
}
h.setProgressValue = hjow_setProgressValue;
function hjow_accentElement(obj, seconds) {
    var targetObj = $(obj);
    targetObj.addClass('accents');
    var firsts = true;
    var timer = setTimeout(function () {
        if (firsts) {
            firsts = false;
            return;
        }
        targetObj.removeClass('accents');
        clearTimeout(timer);
    }, seconds * 1000);
}
h.accentElement = hjow_accentElement;
function hjow_getLocaleInfo() {
    var results = [];
    if (typeof (window.navigator.languages) == 'undefined') {
        results.push(window.navigator.language);
        return results;
    }
    return window.navigator.languages;
}
h.getLocaleInfo = hjow_getLocaleInfo;
function hjow_bigint(obj) {
    if (typeof (bigInt) == 'undefined') {
        if (typeof (BigInt) == 'undefined') {
            return obj;
        }
        else {
            return BigInt(obj);
        }
    }
    return bigInt(obj);
}
h.bigint = hjow_bigint;
function hjow_bigint_add(a, b) {
    if (typeof (bigInt) == 'undefined') {
        if (typeof (BigInt) == 'undefined') {
            return a + b;
        }
        else {
            return BigInt(a).add(BigInt(b));
        }
    }
    return bigInt(a).add(bigInt(b));
}
h.bigint_add = hjow_bigint_add;
function hjow_bigint_subtract(a, b) {
    if (typeof (bigInt) == 'undefined') {
        if (typeof (BigInt) == 'undefined') {
            return a - b;
        }
        else {
            return BigInt(a).subtract(BigInt(b));
        }
    }
    return bigInt(a).subtract(bigInt(b));
}
;
h.bigint_subtract = hjow_bigint_subtract;
function hjow_bigint_multiply(a, b) {
    if (typeof (bigInt) == 'undefined') {
        if (typeof (BigInt) == 'undefined') {
            return a * b;
        }
        else {
            return BigInt(a).multiply(BigInt(b));
        }
    }
    return bigInt(a).multiply(bigInt(b));
}
;
h.bigint_multiply = hjow_bigint_multiply;
function hjow_bigint_divide(a, b) {
    if (typeof (bigInt) == 'undefined') {
        if (typeof (BigInt) == 'undefined') {
            return a / b;
        }
        else {
            return BigInt(a).divide(BigInt(b));
        }
    }
    return bigInt(a).divide(bigInt(b));
}
;
h.bigint_divide = hjow_bigint_divide;
function hjow_bigint_abs(a) {
    if (typeof (bigInt) == 'undefined') {
        if (typeof (BigInt) == 'undefined') {
            return Math.abs(a);
        }
        else {
            return BigInt(a).abs();
        }
    }
    return bigInt(a).abs();
}
;
h.bigint_abs = hjow_bigint_abs;
function hjow_bigint_compare(a, b) {
    if (typeof (bigInt) == 'undefined') {
        if (typeof (BigInt) == 'undefined') {
            if (a == b)
                return 0;
            if (a > b)
                return 1;
            return -1;
        }
        else {
            return BigInt(a).compare(BigInt(b));
        }
    }
    return bigInt(a).compare(bigInt(b));
}
;
h.bigint_compare = hjow_bigint_compare;
function hjow_date_to_string(dateObj) {
    return dateObj.getFullYear() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getDate() + "." + dateObj.getHours() + "." + dateObj.getMinutes() + "." + dateObj.getSeconds();
}
;
h.date_to_string = hjow_date_to_string;
function hjow_string_to_date(dateStr) {
    var stringSplits = String(dateStr).split(".");
    var result = new Date();
    result.setFullYear(parseInt(stringSplits[0]));
    result.setMonth(parseInt(stringSplits[1]) - 1);
    result.setDate(parseInt(stringSplits[2]));
    result.setHours(parseInt(stringSplits[3]));
    result.setMinutes(parseInt(stringSplits[4]));
    result.setSeconds(parseInt(stringSplits[5]));
    return result;
}
;
h.string_to_date = hjow_string_to_date;
function hjow_isArray(a) {
    return $.isArray(a);
}
;
h.isArray = hjow_isArray;
function hjow_toStaticHTML(htmlStr) {
    try {
        if (typeof (toStaticHTML) != 'undefined' && toStaticHTML != null)
            return toStaticHTML(htmlStr);
        return htmlStr;
    }
    catch (e) {
        hjow_error(e);
        return htmlStr;
    }
}
;
h.toStaticHTML = hjow_toStaticHTML;
function hjow_workOnDocumentReady(actionFunc, delayNotDeviceReady) {
    if (delayNotDeviceReady == null || typeof (delayNotDeviceReady) == 'undefined')
        delayNotDeviceReady = 1000;
    if (typeof (delayNotDeviceReady) == 'string')
        delayNotDeviceReady = parseInt(delayNotDeviceReady);
    var flags = false;
    var newFunc = function () {
        if (flags)
            return;
        flags = true;
        if (!hjow_isSupportedBrowser()) {
            hjow_alert('This browser or platform is not supported.');
            return;
        }
        h.property.screenWidth = window.screenWidth;
        h.property.screenHeight = window.screenHeight;
        var actionFuncParam = function (engine) { };
        try {
            jq = $;
            if (hjow_processSecurityProcess != null && typeof (hjow_processSecurityProcess) != 'undefined') {
                actionFuncParam = hjow_processSecurityProcess;
            }
        }
        catch (e) {
            try {
                console.log(e);
            }
            catch (e1) { }
        }
        if (actionFunc == null || typeof (actionFunc) == 'undefined')
            return;
        actionFunc(actionFuncParam);
    };
    $(document).ready(function () {
        var tempTimer = setTimeout(function () {
            newFunc();
            clearTimeout(tempTimer);
        }, delayNotDeviceReady);
    });
    document.addEventListener('deviceready', newFunc, false);
}
;
h.workOnDocumentReady = hjow_workOnDocumentReady;
function hjow_workOnScreenSizeChanged(actionFunc) {
    $(window).on('resize', function () {
        if (actionFunc == null || typeof (actionFunc) == 'undefined')
            return;
        actionFunc();
    });
}
;
h.workOnScreenSizeChanged = hjow_workOnScreenSizeChanged;
function hjow_findEngine(uniqueId) {
    for (var idx = 0; idx < h.engine.length; idx++) {
        try {
            var engineOne = h.engine[idx];
            if (uniqueId == engineOne.getUniqueId())
                return engineOne;
        }
        catch (e) {
            hjow_error(e);
        }
    }
    return null;
}
;
h.findEngine = hjow_findEngine;
function hjow_putEngine(engineObj) {
    if (hjow_findEngine(engineObj) != null)
        return;
    h.engine.push(engineObj);
}
h.putEngine = hjow_putEngine;
function hjow_replaceBr(str) {
    return hjow_replaceStr(str, "\n", "<br/>");
}
;
h.replaceBr = hjow_replaceBr;
function hjow_isSupportedBrowser() {
    if (!hjow_supportES5())
        return false;
    if ("".trim == null || typeof ("".trim) == 'undefined')
        return false;
    if ($ == null || typeof ($) == 'undefined')
        return false;
    return true;
}
;
h.isSupportedBrowser = hjow_isSupportedBrowser;
function hjow_supportES6() {
    try {
        var testObj = 1;
        (function (testObj) {
            if (testObj === void 0) { testObj = 0; }
            return testObj;
        });
        return true;
    }
    catch (e) {
        return false;
    }
}
;
h.supportES6 = hjow_supportES6;
function hjow_supportES5() {
    if (Object.create == null || typeof (Object.create) == 'undefined')
        return false;
    return true;
}
;
h.supportES5 = hjow_supportES5;
var hjow_getDeviceInfo = function () {
    if (typeof (device) == 'undefined')
        return {
            platform: 'browser'
        };
    return device;
};
h.getDeviceInfo = hjow_getDeviceInfo;
function hjow_getPlatform() {
    var deviceObj = hjow_getDeviceInfo();
    return String(deviceObj.platform).toLowerCase();
}
;
h.getPlatform = hjow_getPlatform;
function hjow_tryExit() {
    try {
        navigator.device.exitApp();
    }
    catch (e) { }
    try {
        device.exitApp();
    }
    catch (e) { }
    try {
        xcard_interface.exit();
    }
    catch (e) { }
    try {
        window.close();
    }
    catch (e) { }
}
;
h.tryExit = hjow_tryExit;
function hjow_select_init(selectObj) {
    $(selectObj).each(function () {
        var selObj = $(this);
        var randomNo = selObj.attr('data-selalt');
        if (!(randomNo == null || typeof (randomNo) == 'undefined' || randomNo == '')) {
            var altObj = $('.selalter.div_' + randomNo);
            altObj.find('.selalter_option').off('click');
            altObj.remove();
            selObj.removeClass('sel_' + randomNo);
        }
        var parent = selObj.parent();
        randomNo = hjow_makeUniqueId('s', 2);
        selObj.addClass('hidden');
        selObj.addClass('sel_' + randomNo);
        selObj.attr('data-selalt', randomNo);
        var newSelTags = "<div class='selalter div_" + randomNo + "' data-selalt='" + randomNo + "'></div>";
        parent.append(newSelTags);
        hjow_select_sync(selectObj);
    });
}
;
h.select_init = hjow_select_init;
function hjow_select_sync(selectObj) {
    $(selectObj).each(function () {
        var jqObj = $(this);
        var randomNo = jqObj.attr('data-selalt');
        var selObj = $('.sel_' + randomNo);
        var altObj = $('.div_' + randomNo);
        altObj.find('.selalter_option').off('click');
        altObj.find('.selalter_option').remove();
        var options = selObj.find('option');
        options.each(function () {
            var addiClass = '';
            var valueOf = $(this).attr('value');
            if (valueOf == selObj.val())
                addiClass = addiClass + ' selected';
            if ($(this).is('.concealed'))
                addiClass = addiClass + ' concealed';
            if ($(this).is('.hidden'))
                addiClass = addiClass + ' hidden';
            altObj.append("<div class='selalter_option opt_" + randomNo + addiClass + "' data-value=\"" + hjow_serializeString(valueOf) + "\" onclick=\"hjow_select_onClick('" + randomNo + "', '" + hjow_serializeString(valueOf) + "', this); return false;\">" + hjow_serializeXMLString($(this).text()) + "</div>");
        });
    });
}
;
h.select_sync = hjow_select_sync;
function hjow_select_onClick(randomNo, value, selAlterObj) {
    var selObj = $('.sel_' + randomNo);
    var altObj = $('.div_' + randomNo);
    selObj.val(value);
    var selAlters = altObj.find('.selalter_option');
    selAlters.removeClass('selected');
    $(selAlterObj).addClass('selected');
}
;
h.select_onClick = hjow_select_onClick;
h.selectfunc = {
    init: h.select_init,
    sync: h.select_sync
};
function hjow_input_init(inpObj) {
    var virtualKeyboardDialogObj = $('div.hjow_virtual_keyboard_dialog');
    if (virtualKeyboardDialogObj.length <= 0) {
        $('body').append("<div class='hjow_virtual_keyboard_dialog hidden hjow_dialog_virtual' title='Keyboard' data-targetcomp-id='' data-locale='enb'></div>");
    }
    $(inpObj).each(function () {
        var inputObj = $(this);
        if (!(inputObj.is('input') || inputObj.is('textarea')))
            return;
        var randomNo = inputObj.attr('data-targetcomp-id');
        if (randomNo == null || typeof (randomNo) == 'undefined' || randomNo == '') {
            randomNo = hjow_makeUniqueId('i', 2);
            inputObj.attr('data-targetcomp-id', randomNo);
            inputObj.addClass('hjow_virtual_keyboard_target');
            inputObj.on('click', function () {
                hjow_input_onClick(this);
            });
        }
    });
}
;
h.input_init = hjow_input_init;
function hjow_input_getKeyboardHTML(locale, isMultiLine) {
    var result = '';
    result = result + "<table class='hjow_virtual_keyboard_table'>";
    result = result + "   <tr>";
    result = result + "      <td colspan='14'>";
    if (isMultiLine)
        result = result + "         <textarea class='hjow_virtual_keyboard_show' readonly></textarea>";
    else
        result = result + "         <input type='text' class='hjow_virtual_keyboard_show' readonly/>";
    result = result + "      </td>";
    result = result + "   </tr>";
    result = result + "<tr>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('`', '`') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('1', '1') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('2', '2') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('3', '3') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('4', '4') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('5', '5') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('6', '6') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('7', '7') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('8', '8') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('9', '9') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('0', '0') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('-', '-') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('=', '=') + "</td>";
    result = result + "   <td rowspan='2' class='key_1_2'>" + hjow_input_getKeyHTML('←', 'backspace') + "</td>";
    result = result + "</tr>";
    result = result + "<tr>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('~', '~') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('!', '!') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('@', '@') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('#', '#') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('$', '$') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('%', '%') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('^', '^') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('&', '&') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('*', '*') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('(', '(') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML(')', ')') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('_', '_') + "</td>";
    result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('+', '+') + "</td>";
    result = result + "</tr>";
    if (locale == 'enb') {
        result = result + "<tr>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('Tab', '\t') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('Q', 'Q') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('W', 'W') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('E', 'E') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('R', 'R') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('T', 'T') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('Y', 'Y') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('U', 'U') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('I', 'I') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('O', 'O') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('P', 'P') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('{', '{') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('}', '}') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('|', '|') + "</td>";
        result = result + "</tr>";
        result = result + "<tr>";
        result = result + "   <td rowspan='2' class='key_1_2'>" + hjow_input_getKeyHTML('CHG', 'changelanguage') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('A', 'A') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('S', 'S') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('D', 'D') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('F', 'F') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('G', 'G') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('H', 'H') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('J', 'J') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('K', 'K') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('L', 'L') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML(':', ':') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML("\"", "\"") + "</td>";
        if (isMultiLine)
            result = result + "   <td colspan='2' rowspan='2' class='key_2_2'>" + hjow_input_getKeyHTML('Enter', 'enter') + "</td>";
        else
            result = result + "   <td colspan='2' rowspan='2' class='key_2_2'></td>";
        result = result + "</tr>";
        result = result + "<tr>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('Z', 'Z') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('X', 'X') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('C', 'C') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('V', 'V') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('B', 'B') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('N', 'N') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('M', 'M') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML(hjow_serializeXMLString('<'), hjow_serializeXMLString('<')) + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML(hjow_serializeXMLString('>'), hjow_serializeXMLString('>')) + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('?', '?') + "</td>";
        result = result + "   <td></td>";
        result = result + "</tr>";
        result = result + "<tr>";
        result = result + "   <td colspan='14'>" + hjow_input_getKeyHTML('Space', ' ') + "</td>";
        result = result + "</tr>";
    }
    else if (locale == 'ens') {
        result = result + "<tr>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('Tab', '\t') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('q', 'q') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('w', 'w') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('e', 'e') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('r', 'r') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('t', 't') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('y', 'y') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('u', 'u') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('i', 'i') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('o', 'o') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('p', 'p') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('[', '[') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML(']', ']') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('\\', '\\') + "</td>";
        result = result + "</tr>";
        result = result + "<tr>";
        result = result + "   <td rowspan='2' class='key_1_2'>" + hjow_input_getKeyHTML('CHG', 'changelanguage') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('a', 'a') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('s', 's') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('d', 'd') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('f', 'f') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('g', 'g') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('h', 'h') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('j', 'j') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('k', 'k') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('l', 'l') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML(';', ';') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('\'', '\'') + "</td>";
        if (isMultiLine)
            result = result + "   <td colspan='2' rowspan='2' class='key_2_2'>" + hjow_input_getKeyHTML('Enter', 'enter') + "</td>";
        else
            result = result + "   <td colspan='2' rowspan='2' class='key_2_2'></td>";
        result = result + "</tr>";
        result = result + "<tr>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('z', 'z') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('x', 'x') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('c', 'c') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('v', 'v') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('b', 'b') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('n', 'n') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('m', 'm') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML(',', ',') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('.', '.') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('/', '/') + "</td>";
        result = result + "   <td></td>";
        result = result + "</tr>";
        result = result + "<tr>";
        result = result + "   <td colspan='14'>" + hjow_input_getKeyHTML('Space', ' ') + "</td>";
        result = result + "</tr>";
    }
    else if (locale == 'spc') {
        result = result + "<tr>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('Tab', '\t') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('§', '§') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('※', '※') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('☆', '☆') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('★', '★') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('○', '○') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('●', '●') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('◎', '◎') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('◇', '◇') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('◆', '◆') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('□', '□') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('■', '■') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('△', '△') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('▲', '▲') + "</td>";
        result = result + "</tr>";
        result = result + "<tr>";
        result = result + "   <td rowspan='2' class='key_1_2'>" + hjow_input_getKeyHTML('CHG', 'changelanguage') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('▽', '▽') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('▼', '▼') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('♤', '♤') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('♡', '♡') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('♧', '♧') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('♨', '♨') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('☏', '☏') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('☜', '☜') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('☞', '☞') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('♪', '♪') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('\'', '\'') + "</td>";
        if (isMultiLine)
            result = result + "   <td colspan='2' rowspan='2' class='key_2_2'>" + hjow_input_getKeyHTML('Enter', 'enter') + "</td>";
        else
            result = result + "   <td colspan='2' rowspan='2' class='key_2_2'></td>";
        result = result + "</tr>";
        result = result + "<tr>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('＋', '＋') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('－', '－') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('×', '×') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('÷', '÷') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('±', '±') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('≠', '≠') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('≤', '≤') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('≥', '≥') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('∞', '∞') + "</td>";
        result = result + "   <td class='key_1_1'>" + hjow_input_getKeyHTML('/', '/') + "</td>";
        result = result + "   <td></td>";
        result = result + "</tr>";
        result = result + "<tr>";
        result = result + "   <td colspan='14'>" + hjow_input_getKeyHTML('Space', ' ') + "</td>";
        result = result + "</tr>";
    }
    result = result + "</table>";
    return result;
}
;
h.input_getKeyboardHTML = hjow_input_getKeyboardHTML;
function hjow_input_getKeyHTML(keyDisp, keyVal) {
    return "<button type='button' class='hjow_virtual_keyboard_key' data-value='" + keyVal + "' onclick=\"hjow_input_onClickKey(this); return false;\">" + keyDisp + "</button>";
}
;
h.input_getKeyHTML = hjow_input_getKeyHTML;
function hjow_input_onClickKey(btnObj) {
    var buttonObj = $(btnObj);
    var value = buttonObj.attr('data-value');
    var randomNo = buttonObj.parents('div.hjow_virtual_keyboard_dialog').attr('data-targetcomp-id');
    var targetComp = null;
    $('.hjow_virtual_keyboard_target').each(function () {
        if (targetComp != null)
            return;
        var compOne = $(this);
        if (compOne.attr('data-targetcomp-id') == randomNo) {
            targetComp = compOne;
        }
    });
    if (targetComp == null)
        return;
    var beforeVal = targetComp.val();
    var inputVal = buttonObj.attr('data-value');
    var newVal = null;
    if (inputVal == hjow_serializeXMLString('<'))
        inputVal = '<';
    else if (inputVal == hjow_serializeXMLString('>'))
        inputVal = '>';
    if (inputVal == 'backspace') {
        newVal = beforeVal.substring(0, beforeVal.length - 1);
        targetComp.val(newVal);
        $('.hjow_virtual_keyboard_table .hjow_virtual_keyboard_show').val(newVal + '|');
    }
    else if (inputVal == 'enter') {
        newVal = beforeVal + '\n';
        targetComp.val(newVal);
        $('.hjow_virtual_keyboard_table .hjow_virtual_keyboard_show').val(newVal + '|');
    }
    else if (inputVal == 'changelanguage') {
        var virtualKeyboardDialogObj = $('div.hjow_virtual_keyboard_dialog');
        var locale = virtualKeyboardDialogObj.attr('data-locale');
        if (locale == 'enb')
            locale = 'ens';
        else if (locale == 'ens')
            locale = 'spc';
        else if (locale == 'spc')
            locale = 'enb';
        else
            locale = 'enb';
        virtualKeyboardDialogObj.attr('data-locale', locale);
        hjow_input_refreshKeyboardSet();
    }
    else {
        newVal = beforeVal + inputVal;
        targetComp.val(newVal);
        $('.hjow_virtual_keyboard_table .hjow_virtual_keyboard_show').val(newVal + '|');
    }
}
;
h.input_onClickKey = hjow_input_onClickKey;
function hjow_input_refreshKeyboardSet() {
    var virtualKeyboardDialogObj = $('div.hjow_virtual_keyboard_dialog');
    if (virtualKeyboardDialogObj.length <= 0) {
        $('body').append("<div class='hjow_virtual_keyboard_dialog hidden hjow_dialog_virtual' title='Keyboard' data-targetcomp-id='' data-locale='enb'></div>");
        virtualKeyboardDialogObj = $('div.hjow_virtual_keyboard_dialog');
    }
    var keyboardLocale = virtualKeyboardDialogObj.attr('data-locale');
    if (keyboardLocale == null || typeof (keyboardLocale) == 'undefined')
        keyboardLocale = 'enb';
    var isMultiLine = false;
    var randomNo = virtualKeyboardDialogObj.attr('data-targetcomp-id');
    var targetComp = null;
    if (randomNo != null && randomNo != '') {
        $('.hjow_virtual_keyboard_target').each(function () {
            var compOne = $(this);
            if (compOne.attr('data-targetcomp-id') == randomNo) {
                targetComp = compOne;
            }
        });
        if (targetComp != null) {
            if (targetComp.is('textarea'))
                isMultiLine = true;
        }
    }
    virtualKeyboardDialogObj.html(hjow_input_getKeyboardHTML(keyboardLocale, isMultiLine));
    if (targetComp != null) {
        virtualKeyboardDialogObj.find('.hjow_virtual_keyboard_show').val(targetComp.val() + '|');
    }
}
;
h.input_refreshKeyboardSet = hjow_input_refreshKeyboardSet;
function hjow_input_onClick(inpObj) {
    var inputObj = $(inpObj);
    var virtualKeyboardDialogObj = $('div.hjow_virtual_keyboard_dialog');
    if (virtualKeyboardDialogObj.length <= 0) {
        $('body').append("<div class='hjow_virtual_keyboard_dialog hidden hjow_dialog_virtual' title='Keyboard' data-targetcomp-id='' data-locale='enb'></div>");
        virtualKeyboardDialogObj = $('div.hjow_virtual_keyboard_dialog');
    }
    virtualKeyboardDialogObj.attr('data-targetcomp-id', inputObj.attr('data-targetcomp-id'));
    hjow_input_refreshKeyboardSet();
    virtualKeyboardDialogObj.find('.hjow_virtual_keyboard_show').val(inputObj.val() + '|');
    virtualKeyboardDialogObj.dialog({
        width: 560,
        height: 320,
        close: function () {
            try {
                window.focus();
            }
            catch (e) { }
        }
    });
}
;
h.input_onClick = hjow_input_onClick;
function hjow_input_close() {
    var virtualKeyboardDialogObj = $('div.hjow_virtual_keyboard_dialog');
    if (virtualKeyboardDialogObj.length <= 0)
        return;
    try {
        if (virtualKeyboardDialogObj.dialog('isOpen')) {
            virtualKeyboardDialogObj.dialog('close');
            window.focus();
        }
    }
    catch (e) { }
}
;
h.input_close = hjow_input_close;
h.inputfunc = {
    init: h.input_init,
    getKeyboardHTML: h.input_getKeyboardHTML,
    getKeyHTML: h.input_getKeyHTML,
    onClickKey: h.input_onClickKey,
    refreshKeyboardSet: h.input_refreshKeyboardSet,
    onClick: h.input_onClick,
    close: h.input_close
};
function hjow_browserPopup(url) {
    var browserPopupDialogObj = $('div.hjow_browser_popup_dialog');
    if (browserPopupDialogObj.length <= 0) {
        $('body').append("<div class='hjow_browser_popup_dialog hidden' title='Web'><iframe class='full'/></div>");
        browserPopupDialogObj = $('div.hjow_browser_popup_dialog');
    }
    browserPopupDialogObj.dialog({
        width: 600,
        height: 500
    });
    var iframeObj = browserPopupDialogObj.find('iframe');
    iframeObj.attr('src', url);
}
;
h.browserPopup = hjow_browserPopup;
function hjow_runAfter(actFunc, timemills) {
    var tempTimer = setTimeout(function () {
        actFunc();
        clearTimeout(tempTimer);
    }, timemills);
}
;
h.runAfter = hjow_runAfter;
function hjow_getURLParameters() {
    var urlBehind = window.location.search;
    urlBehind = urlBehind.substring(1);
    var paramBlocks = urlBehind.split('&');
    var paramObj = {};
    for (var idx = 0; idx < paramBlocks.length; idx++) {
        var paramBlockOne = paramBlocks[idx].split('=');
        var keyOf = paramBlockOne[0];
        var valueOf = paramBlockOne[1];
        paramObj[keyOf] = valueOf;
    }
    return paramObj;
}
;
h.getURLParameters = hjow_getURLParameters;
function hjow_getURLParameter(keyOf) {
    var params = hjow_getURLParameters();
    var values = null;
    $.each(params, function (k, v) {
        if (values != null)
            return;
        if (k == keyOf)
            values = v;
    });
    return values;
}
;
h.getURLParameter = hjow_getURLParameter;
h.uniqueIds = {};
h.uniqueIds.used = [];
function hjow_makeUniqueId(prefix, randomCount) {
    if (prefix == null || typeof (prefix) == 'undefined')
        prefix = '';
    if (randomCount == null || typeof (randomCount) == 'undefined')
        randomCount = 2;
    if (typeof (randomCount) == 'string')
        randomCount = parseInt(randomCount);
    var results = '';
    var notFinished = true;
    while (notFinished) {
        results = '';
        for (var idx = 0; idx < randomCount; idx++) {
            results = results + '' + Math.round(Math.random() * 999999999);
        }
        results = prefix + results;
        var notExists = true;
        for (var udx = 0; udx < h.uniqueIds.used.length; udx++) {
            if (results == h.uniqueIds.used[udx]) {
                notExists = false;
                break;
            }
        }
        if (notExists) {
            notFinished = false;
            break;
        }
    }
    h.uniqueIds.used.push(results);
    return results;
}
;
h.makeUniqueId = hjow_makeUniqueId;
h.uniqueIds.make = hjow_makeUniqueId;
h.temp = {};
h.temp.otp = null;
h.otp = {};
function hjow_otp_createBlock(params) {
    var otpObj = null;
    if (params != null && typeof (params) != 'string') {
        if (typeof (params) != 'undefined' && typeof (params.objectType) != 'undefined') {
            if (params.objectType == 'otp') {
                otpObj = params;
            }
        }
    }
    if (otpObj == null) {
        otpObj = {};
        if (params == null || typeof (params) == 'undefined')
            otpObj.name = 'temp';
        else
            otpObj.name = String(params);
        otpObj.uniqueId = hjow_makeUniqueId('otp', 2);
        otpObj.objectType = 'otp';
        var cards = [];
        for (var days = 0; days < 4; days++) {
            for (var hours = 0; hours < 4; hours++) {
                for (var minutes = 0; minutes < 60; minutes++) {
                    var cardObj = {};
                    cardObj.objectType = 'otp_card';
                    cardObj.uniqueId = hjow_makeUniqueId('otpc', 3);
                    cardObj.day = days;
                    cardObj.hour = hours;
                    cardObj.minute = minutes;
                    cardObj.values = [];
                    for (var val = 0; val < 4; val++) {
                        var randomNo = Math.floor(Math.random() * 9990.0);
                        cardObj.values.push(randomNo);
                    }
                    hjow_otp_prepare(cardObj);
                    cards.push(cardObj);
                }
            }
        }
        otpObj.cards = cards;
    }
    hjow_otp_prepare(otpObj);
    return otpObj;
}
;
h.otp.createBlock = hjow_otp_createBlock;
var hjow_otp_create = hjow_otp_createBlock;
function hjow_otp_createSet(params, counts) {
    var otpSet = null;
    if (params != null && typeof (params) != 'string') {
        if (typeof (params) != 'undefined' && typeof (params.objectType) != 'undefined') {
            if (params.objectType == 'otp_set') {
                otpSet = params;
            }
        }
    }
    if (otpSet == null) {
        otpSet = {};
        if (params == null || typeof (params) == 'undefined')
            otpSet.name = 'temp';
        else
            otpSet.name = String(params);
        otpSet.uniqueId = hjow_makeUniqueId('otps', 2);
        otpSet.objectType = 'otp_set';
        var otpObjs = [];
        var countNo = 16;
        if (counts != null && typeof (counts) != 'undefined') {
            countNo = parseInt(String(counts));
        }
        for (var idx = 0; idx < countNo; idx++) {
            var otpObj = hjow_otp_createBlock(otpSet.name + '_' + idx);
            otpObjs.push(otpObj);
        }
        otpSet.otps = otpObjs;
    }
    hjow_otp_prepare(otpSet);
    return otpSet;
}
;
h.otp.create = hjow_otp_createSet;
h.otp.createSet = hjow_otp_createSet;
function hjow_otp_prepare(otpObj) {
    if (typeof (otpObj) != 'string') {
        if (typeof (otpObj.objectType) != 'undefined') {
            if (otpObj.objectType == 'otp') {
                otpObj.toPlainObject = function () {
                    var newObj = {};
                    newObj.objectType = 'otp';
                    newObj.name = this.name;
                    newObj.uniqueId = this.uniqueId;
                    newObj.cards = this.cards;
                    newObj.prepared = false;
                    return newObj;
                };
                otpObj.getCard = function (date) {
                    if (date == null)
                        date = new Date();
                    if (typeof (date) == 'string')
                        date = hjow_string_to_date(date);
                    for (var idx = 0; idx < this.cards.length; idx++) {
                        var cardOne = this.cards[idx];
                        if ((date.getDate() % 4) == cardOne.day && (date.getHours() % 4) == cardOne.hour && date.getMinutes() == cardOne.minute) {
                            return cardOne;
                        }
                    }
                    ;
                    return null;
                };
                for (var cdx = 0; cdx < otpObj.cards.length; cdx++) {
                    var cardOne = otpObj.cards[cdx];
                    hjow_otp_prepare(cardOne);
                }
                otpObj.prepared = true;
            }
            else if (otpObj.objectType == 'otp_card') {
                otpObj.toPlainObject = function () {
                    var newObj = {};
                    newObj.objectType = 'otp_card';
                    newObj.day = this.day;
                    newObj.hour = this.hour;
                    newObj.minute = this.minute;
                    newObj.values = this.values;
                    newObj.prepared = false;
                    return newObj;
                };
                otpObj.getRandomIndex = function () {
                    return Math.floor(Math.random() * (this.values.length * 1.0));
                };
                otpObj.prepared = true;
            }
            else if (otpObj.objectType == 'otp_set') {
                otpObj.toPlainObject = function () {
                    var newObj = {};
                    newObj.objectType = 'otp_set';
                    newObj.name = this.name;
                    newObj.uniqueId = this.uniqueId;
                    newObj.otps = this.otps;
                    newObj.prepared = false;
                    return newObj;
                };
                otpObj.prepared = true;
            }
        }
    }
}
;
h.otp.prepare = hjow_otp_prepare;
function hjow_ajax(obj) {
    $.ajax(obj);
}
;
h.ajax = hjow_ajax;
//# sourceMappingURL=hjow_common.js.map