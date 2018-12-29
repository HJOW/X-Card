
/*
This JS library is made by HJOW.
E-mail : hujinone22@naver.com

This library need jQuery, jQuery UI.
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

function hjow_replaceStr(originalStr, targetStr, replacementStr) {
    return String(originalStr).split(String(targetStr)).join(String(replacementStr));
};

h.replaceStr = hjow_replaceStr;

h.property.logFormat = '[%TODAY%] %LOG%';

function hjow_log(obj) {
    var contents = String(h.property.logFormat);
    contents = h.replaceStr(contents, '%TODAY%', String(new Date()));
    contents = h.replaceStr(contents, '%LOG%', String(obj));
    console.log(contents);
};

h.log = hjow_log;

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

function hjow_saveOnLocalStorage(key, val) {
    localStorage.setItem(key, val);
};

h.saveOnLocalStorage = hjow_saveOnLocalStorage;

function hjow_getOnLocalStorage(key) {
    return localStorage.getItem(key);
}

h.getOnLocalStorage = hjow_getOnLocalStorage;

function hjow_serializeString(str) {
    var results = String(str);
    results = h.replaceStr(results, '"', '\\' + '"');
    return results;
};

h.serializeString = hjow_serializeString;

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