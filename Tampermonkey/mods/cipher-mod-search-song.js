// ==UserScript==
// @name        Cipher Extra Song Search
// @name:cn     闪韵灵境歌曲搜索扩展
// @namespace   cipher-editor-mod-extra-song-search
// @version     1.0
// @description 通过BeatSaver方便添加歌曲
// @description:cn 通过BeatSaver方便添加歌曲
// @author      如梦Nya
// @license     MIT
// @run-at      document-body
// @grant       unsafeWindow
// @match       https://cipher-editor-cn.picovr.com/*
// @match       https://cipher-editor-va.picovr.com/*
// @icon        https://cipher-editor-va.picovr.com/favicon.ico
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

const I18N = {
    en: { // English
        parameter: {
            search_page_sum: {
                name: "Search Page Count",
                description: "Number of pages searched from BeatSaver at one time",
            },
            search_timeout: {
                name: "Search Timeout",
                description: "Timeout for searching for songs",
            }
        },
        methods: {
            test: {
                name: "Test",
                description: "Just A Test",
            }
        }
    },
    cn: { // Chinese
        parameter: {
            search_page_sum: {
                name: "搜索页面数量",
                description: "每次从BeatSaver搜索歌曲的页数，页数越多速度越慢",
            },
            search_timeout: {
                name: "搜索超时",
                description: "搜索歌曲的超时时间",
            }
        },
        methods: {
            test: {
                name: "测试",
                description: "只是一个测试按钮",
            }
        }
    }
}

const PARAMETER = [
    {
        id: "search_page_sum",
        name: $t("parameter.search_page_sum.name"),
        description: $t("parameter.search_page_sum.description"),
        type: "number",
        default: 1,
        min: 1,
        max: 10
    },
    {
        id: "search_timeout",
        name: $t("parameter.search_timeout.name"),
        description: $t("parameter.search_timeout.description"),
        type: "number",
        default: 10 * 1000,
        min: 1000,
        max: 20 * 1000
    }
]

const METHODS = [
    {
        name: $t("methods.test.name"),
        description: $t("methods.test.description"),
        func: () => {
            log($t("methods.test.name"))
        }
    }, {
        name: $t("methods.test.name"),
        description: $t("methods.test.description"),
        func: () => {
            log($t("methods.test.name"))
            hideDrawer()
        }
    },
]

function onEnabled() {
    log("onEnabled")
}

function onDisabled() {
    log("onDisabled")
}

function onParameterValueChanged(id, val) {
    log("onParameterValueChanged", id, val)
    log("debug", $p(id))
}

(function () {
    'use strict'

})()
