import {
	createRouter,
	// createWebHashHistory,
	createMemoryHistory
} from 'vue-router'

import ModList from './components/ModList.vue'
import Settings from './components/Settings.vue'
import PluginSettings from './components/PluginSettings.vue'

// 定义路由
const routes = [{
	path: '/',
	name: 'home',
	redirect: '/mod_list'
}, {
	path: '/mod_list',
	name: 'mod_list',
	component: ModList
}, {
	path: '/settings',
	name: 'settings',
	component: Settings
}, {
	path: '/settings/:id',
	name: 'plugin_settings',
	component: PluginSettings
}]

// 创建路由器
const router = createRouter({
	history: createMemoryHistory(),
	// history: createWebHashHistory(),
	routes
})

export default router