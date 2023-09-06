<script setup>
	// This starter template is using Vue 3 <script setup> SFCs
	// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
	import Header from './components/Header.vue'
	import ModList from './components/ModList.vue'
</script>

<template>
	<router-view></router-view>
</template>

<style>
	body,
	html,
	#app {
		height: 100%;
	}

	body {
		margin: 0;
		background-color: #eeeeee;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.el-header {
		background-color: #409EFF;
		color: white;
		height: auto !important;
		padding: 0 !important;
	}
</style>

<style scoped>
</style>