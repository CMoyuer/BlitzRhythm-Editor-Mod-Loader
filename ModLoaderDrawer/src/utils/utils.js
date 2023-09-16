export function getLocale() {
	let lang = localStorage.getItem("i18nextLng") ?? "en"
	if (lang == "zh") lang = "zh_CN"
	lang = lang.replace("-", "_")
	return lang
}

export function getModInfo(res, key) {
	let language = getLocale()
	if (res.info[key + "_i18n"]) {
		if (res.info[key + "_i18n"][language])
			return res.info[key + "_i18n"][language]

		language = language.split('-')[0]
		if (res.info[key + "_i18n"][language])
			return res.info[key + "_i18n"][language]
	}
	return res.info[key]
}