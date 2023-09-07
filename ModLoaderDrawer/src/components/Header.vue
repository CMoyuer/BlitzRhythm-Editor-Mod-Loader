<template>
	<el-icon :size="21" @click="goBack" class="back" v-if="canBack">
		<ArrowLeft />
	</el-icon>
	<div class="title">{{title ?? $t('header.title')}}</div>
	<el-icon :size="21" @click="gotoSetup" class="setup">
		<SetUp />
	</el-icon>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	import {
		ArrowLeft,
		SetUp
	} from '@element-plus/icons-vue'
	import {
		useRouter,
		useRoute
	} from 'vue-router'

	defineProps({
		title: String
	})

	import * as global from "../global.js"

	const router = useRouter()
	const route = useRoute()
	const canBack = ref(false)

	onMounted(() => {
		canBack.value = route.name !== "mod_list"
	})

	function goBack() {
		if (route.name !== "mod_list")
			router.go(-1)
	}

	function gotoSetup() {
		if (route.name === "Settings") return
		router.push({
			path: "/settings"
		})
	}
</script>

<style scoped>
	.title {
		font-size: 1.1rem;
		text-align: center;
		padding: 12px;
	}

	.back {
		position: absolute;
		left: 14px;
		top: 14px;
	}

	.setup {
		cursor: pointer;
		position: absolute;
		right: 14px;
		top: 14px;
	}
</style>