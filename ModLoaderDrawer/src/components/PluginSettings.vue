<template>
	<el-container style="height: 100%;">
		<el-header>
			<Header :title="title || $t('plugin_settings.title')" />
		</el-header>
		<el-main>
			<el-scrollbar :native="true">
				<div class="description">
					<div class="image_box">
						<el-image :src="iconSrc"></el-image>
					</div>
					<div v-for="item, index in infoKeys">
						<div class="info" v-if="modInfo[item]">
							<div class="name">
								<el-text size="large">
									{{$t("plugin_settings." + item)}}
								</el-text>
							</div>
							<div class="value">
								<el-text v-if="!modInfo[item].startsWith('http')" truncated>
									{{modInfo[item]}}
								</el-text>
								<a v-else :href="modInfo[item]" target="_blank">{{modInfo[item]}}</a>
							</div>
						</div>
					</div>
				</div>
				<div class="classify_name">{{$t("plugin_settings.base")}}</div>
				<div class="enable_box">
					<div class="name">{{$t("plugin_settings.enable")}}</div>
					<el-switch v-model="modHandle.config.enabled"
						@change="switchModEnabeld(modHandle.config.enabled)" />
				</div>
				<div v-if="modMethodList.length > 0">
					<div class="classify_name">{{$t("plugin_settings.function")}}</div>
					<div v-for="item, index in modMethodList" @click="execFunc(item)"
						:class="modHandle.config.enabled ? 'func_enabled':'func_disabled'">
						<div class="item">
							<div class="name">
								<el-tooltip v-if="item.description" :content="item.description"
									placement="bottom-start">
									<el-text size="large">
										{{item.name}}
									</el-text>
								</el-tooltip>
								<el-text v-else size="large">
									{{item.name}}
								</el-text>
							</div>
							<el-icon :size="21">
								<ArrowRight />
							</el-icon>
						</div>
					</div>
				</div>
				<div v-if="modParameterList.length > 0">
					<div class="classify_name">{{$t("plugin_settings.parameter")}}</div>
					<div v-for="item, index in modParameterList">
						<div class="item">
							<div class="name">
								<el-tooltip v-if="item.description" :content="item.description"
									placement="bottom-start">
									<el-text size="large">
										{{item.name}}
									</el-text>
								</el-tooltip>
								<el-text v-else size="large">
									{{item.name}}
								</el-text>
							</div>
							<div class="value">
								<el-input
									v-if="['number','text'].indexOf(modHandle.config.parameter[item.id].type) >= 0"
									class="par_value" v-model="parameterMap[item.id].value"
									@change="changedParameter(item.id, $event)"
									:type="modHandle.config.parameter[item.id].type"></el-input>
							</div>
						</div>
					</div>
				</div>
			</el-scrollbar>
		</el-main>
	</el-container>
</template>

<script setup>
	import Header from './Header.vue'
	import {
		ref,
		onMounted
	} from 'vue'
	import * as utils from '../utils/utils.js'
	import {
		ArrowRight
	} from '@element-plus/icons-vue'
	import {
		useRouter,
		useRoute
	} from 'vue-router'
	const router = useRouter()
	const route = useRoute()

	import GlobalProperties from '../utils/globalProperties.js'
	const globalProperties = GlobalProperties()

	const infoKeys = ref(["name", "description", "author", "homepage"])
	const title = ref("")
	const iconSrc = ref(globalProperties.$t("url.icon"))
	const modInfo = ref({})
	const modHandle = ref({
		config: {
			enabled: true
		}
	})

	const modMethodList = ref([])
	const modParameterList = ref([])
	const parameterMap = ref({})

	onMounted(() => {
		let plugin_id = route.params.id
		let mod = globalProperties.$modloader.getMod(plugin_id)
		if (!mod) {
			router.replace({
				path: "/"
			})
			return
		}
		modHandle.value = mod
		iconSrc.value = utils.getModInfo(mod, "icon") || iconSrc.value
		console.log("Mod info", mod)
		let info = {}
		for (let i in infoKeys.value) {
			let key = infoKeys.value[i]
			info[key] = utils.getModInfo(mod, key)
		}
		if (!info.homepage) {
			info.homepage = utils.getModInfo(mod, "homepageURL") ||
				utils.getModInfo(mod, "website") || utils.getModInfo(mod, "source")
		}
		modInfo.value = info

		modMethodList.value = mod.methods || []
		modParameterList.value = mod.parameter || []
		parameterMap.value = JSON.parse(JSON.stringify(mod.config.parameter))
	})

	function switchModEnabeld(flag) {
		saveConfig()
		if (flag) {
			globalProperties.$modloader.enabledMod(modHandle.value)
		} else {
			globalProperties.$modloader.disabledMod(modHandle.value)
		}
	}

	function saveConfig() {
		globalProperties.$modloader.saveModConfig(modHandle.value)
	}

	function execFunc(method) {
		if (!modHandle.value.config.enabled) {
			alert(globalProperties.$t("plugin_settings.tipDisabled"))
			return
		}
		console.log("[ModLoader]Exec mod function: ", method)
		method.func()
	}

	function changedParameter(id, value) {
		let parInfo = modHandle.value.config.parameter[id]
		if (typeof value === "string" && value.length == 0) {
			parameterMap.value[id].value = parInfo.value
			return
		}
		if (parInfo.type === "number") {
			value = parseFloat(value)
			if (typeof parInfo.min === "number") value = Math.max(value, parInfo.min)
			if (typeof parInfo.max === "number") value = Math.min(value, parInfo.max)
		}
		if (typeof value === parInfo.type || (typeof value === "string" && parInfo.type === "text")) {
			parameterMap.value[id].value = parInfo.value = value
			saveConfig()
			globalProperties.$modloader.changedParameter(modHandle.value.id, id, value)
		} else {
			parameterMap.value[id].value = parInfo.value
		}
	}
</script>

<style scoped>
	.el-main {
		padding: 0;
	}

	.enable_box {
		padding: 6px 10px;
		background-color: white;
		display: flex;
		line-height: 32px;
	}

	.enable_box .name {
		width: auto;
		flex: 1;
	}

	.classify_name {
		padding: 5px 10px 5px 10px;
		color: gray;
	}

	.item {
		display: flex;
		margin-bottom: 1px;
		padding: 12px;
		background-color: white;
	}

	.item .name {
		flex: 1;
		margin: auto;
	}

	.item .value {
		padding-top: 1px;
	}

	.par_value {
		width: 100px;
		min-width: 100px;
		text-align: right;
	}

	.description {
		padding: 12px;
		background-color: white;
	}

	.description .image_box {
		width: 100%;
		text-align: center;
		margin-bottom: 15px;
	}

	.description .image_box .el-image {
		width: 60px;
		height: 60px;
		border-radius: 5px;
	}

	.description .info {
		display: flex;
		margin-bottom: 5px;
	}

	.description .info .name {
		flex: 1;
		padding-right: 15px;
		min-width: 90px;
	}

	.description .info .name .el-text {
		color: black !important;
	}

	.description .value {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.description a {
		font-size: var(--el-font-size-base);
	}

	.func_enabled {
		cursor: pointer;
	}

	.func_disabled .item {
		background-color: #f8f8f8;
		color: lightgray !important;
	}

	.func_disabled .item .el-text {
		color: lightgray !important;
	}
</style>