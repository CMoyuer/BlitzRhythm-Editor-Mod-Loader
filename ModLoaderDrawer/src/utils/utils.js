export function getModInfo(res, key) {
	let language = localStorage.getItem("language") ?? "en"
	if (language !== "en" && res.info[key + "_i18n"] && res.info[key + "_i18n"][language]) {
		return res.info[key + "_i18n"][language]
	} else {
		return res.info[key]
	}
}