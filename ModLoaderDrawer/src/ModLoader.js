let modMap = {}

/** @type {function[]} */
let onModAddedCallback = []

function log(...arg) {
	let msg = "[ModLoader]"
	arg.forEach(obj => {
		if (typeof obj === "string")
			msg += obj
		else
			msg += JSON.stringify(obj)
		msg += " "
	})
	console.log(msg)
}

export function addMod(res) {
	if (modMap.hasOwnProperty(res.id))
		throw "The mod is loaded: " + res.id
	let configStr = localStorage.getItem("mod-" + res.id)
	let config = configStr ? JSON.parse(configStr) : {
		enabled: true,
		parameter: {}
	}
	if (res.parameter) {
		for (let i in res.parameter) {
			let par = res.parameter[i]
			if (config.parameter.hasOwnProperty(par.id) && config.parameter[par.id].type !== par.type)
				delete config.parameter[par.id]
			if (!config.parameter.hasOwnProperty(par.id)) {
				config.parameter[par.id] = {
					type: par.type,
					value: par.default,
					max: par.max,
					min: par.min
				}
			} else {
				config.parameter[par.id].max = par.max
				config.parameter[par.id].min = par.min
			}
		}
	}
	res.config = config
	modMap[res.id] = res
	callModAddedCallback(res)
	if (res.config.enabled) enabledMod(res)
}

export function enabledMod(res) {
	log("Mod enabled:", res.id)
	res._methods.enabled()
}

export function disabledMod(res) {
	log("Mod disabled:", res.id)
	res._methods.disabled()
}

export function getMod(id) {
	return modMap[id]
}

export function getMods() {
	return modMap
}

export function saveModConfig(res) {
	localStorage.setItem("mod-" + res.id, JSON.stringify(res.config))
}

export function changedParameter(pluginId, parameterId, value) {
	modMap[pluginId]._methods.parameterChanged(parameterId, value)
}

// ====================================================================
// ModAdded Callback

export function onModAdded(callback) {
	if (onModAddedCallback.indexOf(callback) >= 0) return
	onModAddedCallback.push(callback)
}

export function offModAdded(callback) {
	if (typeof callback !== "function") {
		onModAddedCallback = []
	} else {
		let index = onModAddedCallback.indexOf(callback)
		if (index >= 0)
			onModAddedCallback.splice(index, 1)
	}
}

function callModAddedCallback(res) {
	onModAddedCallback.forEach(callback => {
		callback(res)
	})
}

// ====================================================================
// Open

export let exportFunc = {
	addMod
}