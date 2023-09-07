import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n/index.js'
import * as modLoader from './ModLoader.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App)

app.config.globalProperties.$router = router
app.config.globalProperties.$t = i18n.global.t
app.config.globalProperties.$modloader = modLoader

app.use(ElementPlus)
app.use(router)
app.use(i18n)
app.use(VueAxios, axios)
app.use(modLoader.init)
app.mount('#app')