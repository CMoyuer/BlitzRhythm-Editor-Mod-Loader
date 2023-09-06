// ==UserScript==
// @name        闪韵灵境谱面导入扩展
// @namespace   lib-cipher-mod-base
// @version     1.0.0
// @description 兼容其他格式的谱面数据导入
// @author      如梦Nya
// @license     MIT
// @match       *://*/*
// ==/UserScript==
const scriptInfo = window.GM_info.script
// const icon = window.GM_info.script.icon
// const scriptName = window.GM_info.script.name
const scriptNamespace = scriptInfo.namespace

function log(...data) {
    console.log("[" + scriptNamespace + "]", ...data)
}

/**
 * i18n
 * @param {string} key 
 */
function $t(key) {
    let language = localStorage.getItem("language") ?? "en"
    let keys = key.split('.')
    try {
        let val = I18N[language]
        keys.forEach(element => {
            val = val[element]
        })
        return val
    } catch (error) {
        console.warn("[" + scriptNamespace + "]I18N Key not found: " + key)
        return key
    }
}

/**
 * Get parameter value
 * @param {string} parameterId 
 */
function $p(parameterId) {
    try {
        let info = JSON.parse(localStorage.getItem("mod-" + scriptNamespace))
        return info.parameter[parameterId].value
    } catch (error) {
        return
    }
}

function showPluginSetupPage() {
    unsafeWindow.modloader.drawer.methods.show()
    // TODO
}

function hideDrawer() {
    unsafeWindow.modloader.drawer.methods.hide()
}

(function () {
    'use strict'

    let _methods = {
        enabled: () => {
            if (typeof (onEnabled) === "function")
                onEnabled()
        },
        disabled: () => {
            if (typeof (onDisabled) === "function")
                onDisabled()
        },
        parameterChanged: (id, val) => {
            if (typeof (onParameterValueChanged) === "function")
                onParameterValueChanged(id, val)
        }
    }

    let handle = setInterval(() => {
        if (!unsafeWindow.modloader) return
        unsafeWindow.modloader.addMod({
            id: scriptNamespace,
            info: scriptInfo,
            parameter: PARAMETER,
            methods: METHODS,
            _methods,
            window,
        })
        clearInterval(handle)
    }, 100)
})()