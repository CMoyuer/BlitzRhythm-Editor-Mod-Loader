<template>
	<el-container style="height: 100%;">
		<el-header>
			<Header />
		</el-header>
		<el-main>
			<el-empty v-if="modList.length == 0" description="No mods added yet" />
			<el-scrollbar v-else :native="true">
				<div v-for="item,index in modList" class="item">
					<!-- <div class="index">{{index}}</div> -->
					<div @click="selectMod(item)" class="info_box" :class="item.config.enabled ? '' : 'info_disabled'">
						<el-image :src="item.info.icon"></el-image>
						<div class="info">
							<div>
								<el-text size="large" truncated>
									{{utils.getModInfo(item,"name")}}
								</el-text>
							</div>
							<div>
								<el-text size="small" truncated>
									{{utils.getModInfo(item,"description")}}
								</el-text>
							</div>
						</div>
					</div>
					<div class="enableSw">
						<el-switch v-model="item.config.enabled"
							@change="switchModEnabeld(item, item.config.enabled)" />
					</div>
				</div>
				<div class="tip">
					<el-text size="small">
						{{$t('modlist.loaded',{count: modList.length})}}
					</el-text>
				</div>
			</el-scrollbar>
		</el-main>
	</el-container>
</template>

<script setup>
	import Header from './Header.vue'
	import * as utils from '../utils/utils.js'
	import properties from '../utils/globalProperties.js'
	import {
		ref,
		watch,
		onMounted,
		onBeforeUnmount
	} from 'vue'

	import {
		useRouter,
		useRoute
	} from 'vue-router'
	const router = useRouter()
	const route = useRoute()

	const modList = ref([])

	let modloader = properties().$modloader

	onMounted(() => {
		let modMap = modloader.getMods()
		for (let id in modMap)
			modList.value.push(modMap[id])
		modloader.onModAdded(onModAdded)
	})

	onBeforeUnmount(() => {
		modloader.offModAdded(onModAdded)
	})

	function onModAdded(res) {
		modList.value.push(res)
	}

	function selectMod(item) {
		console.log(item)
		router.push({
			name: "plugin_settings",
			params: {
				id: item.id
			}
		})
	}

	function switchModEnabeld(item, flag) {
		if (flag)
			modloader.enabledMod(item)
		else
			modloader.disabledMod(item)
		modloader.saveModConfig(item)
	}
</script>

<style scoped>
	.el-main {
		padding: 0;
	}

	.el-scrollbar {
		height: calc(100% - 20px);
		width: calc(100% - 10px);
		margin: 10px 0 10px 10px;
	}

	.info_box {
		display: flex;
		flex: 1;
	}

	.item {
		display: flex;
		padding: 12px;
		background-color: white;
		border-radius: 5px;
		margin-bottom: 5px;
		margin-right: 10px;
	}

	.item .index {
		margin: auto 10px auto 0;
		min-width: 18px;
		text-align: center;
	}

	.item .el-image {
		width: 46px;
		height: 46px;
		border-radius: 5px;
	}

	.item .info {
		margin-left: 10px;
		margin-top: auto;
		margin-bottom: auto;
		position: relative;
		top: 0;
		bottom: 0;
		flex: 1;
		width: 50px;
	}

	.item .info_disabled {
		filter: grayscale(100%);
		-webkit-filter: grayscale(100%);
		-moz-filter: grayscale(100%);
		-ms-filter: grayscale(100%);
		-o-filter: grayscale(100%);
		-webkit-filter: grayscale(1);
	}

	.item .info_disabled .el-text {
		color: lightgray;
	}

	.item .enableSw {
		margin-left: 10px;
		margin-right: 6px;
		margin-top: auto;
		margin-bottom: auto;
		position: relative;
		top: 0;
		bottom: 0;
	}

	.tip {
		margin-top: 10px;
		margin-bottom: 10px;
		width: 100%;
		text-align: center;
	}

	.tip .el-text {
		color: gray;
	}
</style>