
/*
This JS library is made by HJOW.
E-mail : hujinone22@naver.com

This library need jQuery, jQuery UI, BigInteger.js.

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
var hjow = {};
var h = hjow;

h.property = {};

h.property.screenWidth = 1024;
h.property.screenHeight = 768;

h.engine = [];

function hjow_replaceStr(originalStr, targetStr, replacementStr) {
    return String(originalStr).split(String(targetStr)).join(String(replacementStr));
};

h.replaceStr = hjow_replaceStr;

h.property.logFormat = '[%TODAY%] %LOG%';
h.logAppendee = null;

function hjow_rawLog(obj, showDetailOnBrowserConsole, showDetailOnComp) {
    if (typeof (console) == 'undefined') return;
    if (typeof (console.log) == 'undefined') return;
    var contents = String(h.property.logFormat);
    contents = h.replaceStr(contents, '%TODAY%', hjow_date_to_string(new Date()));
    contents = h.replaceStr(contents, '%LOG%', String(obj));
    if (showDetailOnBrowserConsole) {
        console.log(contents);
    } else {
        console.log(obj);
    }
    if (h.logAppendee != null && typeof (h.logAppendee) != 'undefined') {
        if (showDetailOnComp) $(h.logAppendee).append(contents);
        else $(h.logAppendee).append(String(obj));
        $(h.logAppendee).append("\n");
    }
};

function hjow_log(obj) {
    hjow_rawLog(obj, true, false);
};

h.log = hjow_log;

function hjow_error(e) {
    hjow_rawLog(obj, false, false);
};

h.showError = hjow_error;

function hjow_prepareDialogLog() {
    if ($('.div_hjow_dialog_console .tf_hjow_console').length <= 0) {
        var logDialogHTML = "<div class='div_hjow_dialog_console' title='Log'>";
        logDialogHTML += "<textarea class='tf_hjow_console' readonly='readonly'></textarea>";
        logDialogHTML += "</div>";
        $('body').append(hjow_toStaticHTML(logDialogHTML));
    }
    
    h.logAppendee = $('.div_hjow_dialog_console .tf_hjow_console');
};

h.prepareDialogLog = hjow_prepareDialogLog;

function hjow_openLogDialog() {
    if ($('.div_hjow_dialog_console').length <= 0) return;
    $('.div_hjow_dialog_console').dialog({
        width: 450,
        height: 300
    });
    $('.div_hjow_dialog_console').css('overflow', 'hidden');
};

h.openLogDialog = hjow_openLogDialog;

function hjow_deleteLogDialog() {
    if (h.logAppendee == null || typeof (h.logAppendee) == 'undefined') return;
    $(h.logAppendee).empty();
    try { $(h.logAppendee).val(""); } catch (e) { }
};

h.deleteLogDialog = hjow_deleteLogDialog;

h.alertFunction = null;

function hjow_alert(obj, title) {
    hjow_log(obj);
    if (h.alertFunction != null && typeof (h.alertFunction) != 'undefined') {
        h.alertFunction(obj, title);
        return;
    }
    alert(obj);
};

h.alert = hjow_alert;

function hjow_prepareDialogAlert() {
    if ($('.div_hjow_dialog_alert').length <= 0) {
        var logDialogHTML = "<div class='div_hjow_dialog_alert' style='display: none;' title='Alert'>";
        logDialogHTML += "</div>";
        $('body').append(hjow_toStaticHTML(logDialogHTML));
    }
    h.alertFunction = function (msg, title) {
        var dialogObj = $('.div_hjow_dialog_alert');
        if (title == null || (typeof (title) == 'undefined')) title = "Message";
        dialogObj.attr('title', String(title));
        dialogObj.text(String(msg));
        dialogObj.dialog();
    };
};

h.prepareDialogAlert = hjow_prepareDialogAlert;

h.property.debugMode = false;

function hjow_debugMode() {
    if (h.property.debugMode) {
        h.property.debugMode = false;
    } else {
        h.property.debugMode = true;
    }

    if (h.property.debugMode) {
        $('div').addClass('debugMode');
        $('td').addClass('debugMode');
    } else {
        $('div').removeClass('debugMode');
        $('td').removeClass('debugMode');
    }
};

h.debugMode = hjow_debugMode;

function hjow_prepareJQuery() {
    jqo = jQuery;
    jq = jQuery;
};

h.prepareJQuery = hjow_prepareJQuery;

function hjow_htmlForm(str) {
    var results = h.replaceStr(str, "<", "&lt;");
    results = h.replaceStr(results, ">", "&gt;");
    results = h.replaceStr(results, "\n", "<br/>");
    return results;
};

h.htmlForm = hjow_htmlForm;

function hjow_removeItemFromArray(arr, itemIndex) {
    arr.splice(itemIndex, 1);
};

h.removeItemFromArray = hjow_removeItemFromArray;

h.isLocalStorageOccurError = false;
function hjow_checkLocalStorageAvailable() {
    try {
        localStorage.setItem('localStorageTestMessage', 'success');
        return true;
    } catch (e) {
        h.isLocalStorageOccurError = true;
        return false;
    }
};
h.checkLocalStorageAvailable = hjow_checkLocalStorageAvailable;

function hjow_saveOnLocalStorage(key, val) {
    if (h.isLocalStorageOccurError) return;
    localStorage.setItem(key, val);
};

h.saveOnLocalStorage = hjow_saveOnLocalStorage;

function hjow_getOnLocalStorage(key) {
    if (h.isLocalStorageOccurError) return null;
    try {
        return localStorage.getItem(key);
    } catch (e) {
        hjow_error(e);
        return null;
    }
}

h.getOnLocalStorage = hjow_getOnLocalStorage;

function hjow_serializeString(str) {
    var results = String(str);
    results = h.replaceStr(results, '"', '\\' + '"');
    return results;
};

h.serializeString = hjow_serializeString;

function hjow_serializeXMLString(str) {
    var results = String(str);
    results = h.replaceStr(results, '<', '&lt;');
    results = h.replaceStr(results, '>', '&gt;');
    return results;
};

h.serializeXMLString = hjow_serializeXMLString;

function hjow_reverseSerializeString(str) {
    var results = String(str);
    results = h.replaceStr(results, '\\' + '"', '"');
    return results;
};

h.reverseSerializeString = hjow_reverseSerializeString;

function hjow_putOnObject(obj, key, val) {
    obj[key] = val;
};

h.putOnObject = hjow_putOnObject;

function hjow_getOnObject(obj, key) {
    return obj[key];
};

h.getOnObject = hjow_getOnObject;

function hjow_emptyObject() {
    return {};
};
h.emptyObject = hjow_emptyObject;

function hjow_iterateObject(obj, func) {
    $.each(obj, func);
};

h.iterateObject = hjow_iterateObject;

function hjow_parseBoolean(obj) {
    if (obj == null) return false;
    if (obj == true) return true;
    if (obj == false) return false;
    var str = String(obj);
    str = str.toLowerCase();
    if (str == 'y' || str == 'yes' || str == 't' || str == 'true') return true;
    if (str == 'n' || str == 'no' || str == 'f' || str == 'false') return false;
    throw "Cannot parse into boolean : " + obj;
};

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
        if (randomNo >= temp.length) continue;

        arr.push(temp[randomNo]);
        h.removeItemFromArray(temp, randomNo);
    }
    return arr;
}

h.ramdomizeArrayOrder = hjow_ramdomizeArrayOrder;

function hjow_setProgressValue(progressBarObj, valueAsFloat, text) {
    var progObj = $(progressBarObj);
    var progIn = progObj.find('.progress_in');

    if (typeof (valueAsFloat) == 'undefined') valueAsFloat = 0;
    if (valueAsFloat == null) valueAsFloat = 0;
    try {
        if (typeof (valueAsFloat) == 'string') valueAsFloat = parseFloat(valueAsFloat);
    } catch (e) {
        valueAsFloat = 0;
    }
    if (valueAsFloat < 0) valueAsFloat = 0;
    if (valueAsFloat >= 1) valueAsFloat = 1;
    
    var maxWidth = progObj.width() * 1.0;
    var calcWidth = Math.round(valueAsFloat * maxWidth);

    if (typeof (text) == 'undefined') text = "";
    if (progObj.find('.progress_text').length >= 1) progObj.find('.progress_text').text(text);
    else progIn.text(text);
    
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
        } else {
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
        } else {
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
        } else {
            return BigInt(a).subtract(BigInt(b));
        }
    }
    return bigInt(a).subtract(bigInt(b));
};

h.bigint_subtract = hjow_bigint_subtract;

function hjow_bigint_multiply(a, b) {
    if (typeof (bigInt) == 'undefined') {
        if (typeof (BigInt) == 'undefined') {
            return a * b;
        } else {
            return BigInt(a).multiply(BigInt(b));
        }
    }
    return bigInt(a).multiply(bigInt(b));
};

h.bigint_multiply = hjow_bigint_multiply;

function hjow_bigint_divide(a, b) {
    if (typeof (bigInt) == 'undefined') {
        if (typeof (BigInt) == 'undefined') {
            return a / b;
        } else {
            return BigInt(a).divide(BigInt(b));
        }
    }
    return bigInt(a).divide(bigInt(b));
};

h.bigint_divide = hjow_bigint_divide;

function hjow_bigint_abs(a) {
    if (typeof (bigInt) == 'undefined') {
        if (typeof (BigInt) == 'undefined') {
            return Math.abs(a);
        } else {
            return BigInt(a).abs();
        }
    }
    return bigInt(a).abs();
};

h.bigint_abs = hjow_bigint_abs;

function hjow_bigint_compare(a, b) {
    if (typeof (bigInt) == 'undefined') {
        if (typeof (BigInt) == 'undefined') {
            if (a == b) return 0;
            if (a > b) return 1;
            return -1;
        } else {
            return BigInt(a).compare(BigInt(b));
        }
    }
    return bigInt(a).compare(bigInt(b));
};

h.bigint_compare = hjow_bigint_compare;

function hjow_date_to_string(dateObj) {
    return dateObj.getFullYear() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getDate() + "." + dateObj.getHours() + "." + dateObj.getMinutes() + "." + dateObj.getSeconds();
};

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
};

h.string_to_date = hjow_string_to_date;

function hjow_isArray(a) {
    return $.isArray(a);
};

h.isArray = hjow_isArray;

function hjow_toStaticHTML(htmlStr) {
    try {
        if (typeof (toStaticHTML) != 'undefined' && toStaticHTML != null) return toStaticHTML(htmlStr);
        return htmlStr;
    } catch (e) {
        hjow_error(e);
        return htmlStr;
    }
};

h.toStaticHTML = hjow_toStaticHTML;

function hjow_workOnDocumentReady(actionFunc) {
    var flags = false;
    var newFunc = function () {
        if (flags) return;
        flags = true;
        if (!hjow_isSupportedBrowser()) {
            hjow_alert('This browser or platform is not supported.');
            return;
        }
        h.property.screenWidth = window.screenWidth;
        h.property.screenHeight = window.screenHeight;
        var actionFuncParam = null;
        try {
            jq = $;
            if (hjow_processSecurityProcess != null && typeof (hjow_processSecurityProcess) != 'undefined') {
                actionFuncParam = hjow_processSecurityProcess;
            }
        } catch (e) {
            try { console.log(e); } catch (e1) { }
        }
        if (actionFunc == null || typeof (actionFunc) == 'undefined') return;
        actionFunc(actionFuncParam);
    };
    $(document).ready(function () {
        var tempTimer = setTimeout(function () {
            newFunc();
            clearTimeout(tempTimer);
        }, 1000);
    });
    document.addEventListener('deviceready', newFunc, false);
};

h.workOnDocumentReady = hjow_workOnDocumentReady;

function hjow_workOnScreenSizeChanged(actionFunc) {
    $(window).on('resize', function () {
        if (actionFunc == null || typeof (actionFunc) == 'undefined') return;
        actionFunc();
    });
};

h.workOnScreenSizeChanged = hjow_workOnScreenSizeChanged;

function hjow_findEngine(uniqueId) {
    for (var idx = 0; idx < h.engine.length; idx++) {
        try {
            var engineOne = h.engine[idx]; // getUniqueId
            if (uniqueId == engineOne.getUniqueId()) return engineOne;
        } catch (e) {
            hjow_error(e);
        }
    }
    return null;
};

h.findEngine = hjow_findEngine;

function hjow_putEngine(engineObj) {
    if (hjow_findEngine(engineObj) != null) return;
    h.engine.push(engineObj);
}

h.putEngine = hjow_putEngine;

function hjow_replaceBr(str) {
    return hjow_replaceStr(str, "\n", "<br/>");
};

h.replaceBr = hjow_replaceBr;

function hjow_isSupportedBrowser() {
    if (!hjow_supportES5()) return false;
    if ("".trim == null || typeof ("".trim) == 'undefined') return false;
    if ($ == null || typeof ($) == 'undefined') return false;
    return true;
};

h.isSupportedBrowser = hjow_isSupportedBrowser;

function hjow_supportES6() {
    try {
        var testObj = 1;
        (testObj = 0) => testObj;
        return true;
    } catch (e) {
        return false;
    }
};

h.supportES6 = hjow_supportES6;

function hjow_supportES5() {
    if (Object.create == null || typeof (Object.create) == 'undefined') return false;
    return true;
};

h.supportES5 = hjow_supportES5;

function hjow_getDeviceInfo() {
    if (typeof (device) == 'undefined') return {
        platform: 'browser'
    };
    
    return device;
};

h.getDeviceInfo = hjow_getDeviceInfo;

function hjow_getPlatform() {
    var deviceObj = hjow_getDeviceInfo();
    return String(deviceObj.platform).toLowerCase(); // windows / android / ios
};

h.getPlatform = hjow_getPlatform;

function hjow_tryExit() {
    try { navigator.device.exitApp(); } catch (e) { }
    try { device.exitApp(); } catch (e) { }
    try { xcard_interface.exit(); } catch (e) { }
    try { window.close(); } catch (e) { }
};

h.tryExit = hjow_tryExit;

function hjow_select_init(selectObj) {
    var selObj = $(selectObj);
    var randomNo = selObj.attr('selalt');
    if (!(randomNo == null || typeof (randomNo) == 'undefined' || randomNo == '')) {
        var altObj = $('.selalter.div_' + randomNo);
        altObj.find('.selalter_option').off('click');
        altObj.remove();
        selObj.removeClass('sel_' + randomNo);
    }
    var parent = selObj.parent();
    randomNo = String(Math.round(Math.random() * 999999999));
    randomNo = randomNo + String(Math.round(Math.random() * 999999999));
    selObj.addClass('hidden');
    selObj.addClass('sel_' + randomNo);
    selObj.attr('selalt', randomNo);
    var newSelTags = "<div class='selalter div_" + randomNo + "' selalt='" + randomNo + "'></div>";
    parent.append(newSelTags);
    hjow_select_sync(selectObj);
};

h.select_init = hjow_select_init;

function hjow_select_sync(selectObj) {
    var jqObj = $(selectObj);
    var randomNo = jqObj.attr('selalt');
    var selObj = $('.sel_' + randomNo);
    var altObj = $('.div_' + randomNo);
    altObj.find('.selalter_option').off('click');
    altObj.find('.selalter_option').remove();
    var options = selObj.find('option');
    options.each(function () {
        var addiClass = '';
        var valueOf = $(this).attr('value');
        if (valueOf == selObj.val()) addiClass = addiClass + ' selected';
        if ($(this).is('.concealed')) addiClass = addiClass + ' concealed';
        if ($(this).is('.hidden')) addiClass = addiClass + ' hidden';
        altObj.append("<div class='selalter_option opt_" + randomNo + addiClass + "' value=\"" + hjow_serializeString(valueOf) + "\" onclick=\"hjow_select_onClick('" + randomNo + "', '" + hjow_serializeString(valueOf) + "', this); return false;\">" + hjow_serializeXMLString($(this).text()) + "</div>");
    });
};

h.select_sync = hjow_select_sync;

function hjow_select_onClick(randomNo, value, selAlterObj) {
    var selObj = $('.sel_' + randomNo);
    var altObj = $('.div_' + randomNo);
    selObj.val(value);
    var selAlters = altObj.find('.selalter_option');
    selAlters.removeClass('selected');
    $(selAlterObj).addClass('selected');
};

h.select_onClick = hjow_select_onClick;

function hjow_runAfter(actFunc, timemills) {
    var tempTimer = setTimeout(function () {
        actFunc();
        clearTimeout(tempTimer);
    }, timemills);
};

h.runAfter = hjow_runAfter;

function hjow_ajax(obj) {
    $.ajax(obj);
};

h.ajax = hjow_ajax;