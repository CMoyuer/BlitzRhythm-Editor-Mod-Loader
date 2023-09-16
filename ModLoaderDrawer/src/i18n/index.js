import {
	createI18n
} from 'vue-i18n'
import {
	getLocale
} from "../utils/utils.js"
import zh_CN from './zh_CN.js'
import en from './en.js'

const messages = {
	zh_CN,
	en
}

const i18n = createI18n({
	globalInjection: true,
	locale: getLocale(),
	messages
})
export default i18n