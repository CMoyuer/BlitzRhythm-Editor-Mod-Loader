export function getLocale() {
	let lang = localStorage.getItem("i18nextLng") ?? "en"
	if (/^zh-?/.test(lang)) lang = "zh"
	return lang
}

export function getModInfo(res, key) {
	let language = getLocale()
	if (language !== "en" && res.info[key + "_i18n"] && res.info[key + "_i18n"][language]) {
		return res.info[key + "_i18n"][language]
	} else {
		return res.info[key]
	}
}