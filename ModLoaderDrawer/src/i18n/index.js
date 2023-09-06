import {
	createI18n
} from 'vue-i18n'
import {getLocale} from "../utils/utils.js"
import zh from './zh.js'
import en from './en.js'

const messages = {
	zh,
	en
}

const i18n = createI18n({
	globalInjection: true,
	locale: getLocale(),
	messages
})
export default i18n