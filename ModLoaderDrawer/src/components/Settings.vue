<template>
	<el-container style="height: 100%;">
		<el-header>
			<Header :title="$t('settings.title')" />
		</el-header>
		<el-main>
			<el-scrollbar :native="true">
				<!-- <div class="item" @click="openAuthorGithub()">
					<div class="name">
						<el-text size="large">
							{{$t("settings.author")}}
						</el-text>
					</div>
					<div class="value">
						<el-text>
							{{$t("settings.authorName")}}
						</el-text>
					</div>
					<el-icon :size="21">
						<ArrowRight />
					</el-icon>
				</div> -->
				<div class="description">
					<div class="image_box">
						<el-image :src="iconSrc"></el-image>
					</div>
					<div class="info">
						<div class="name">
							<el-text size="large">
								{{$t("settings.scriptName")}}
							</el-text>
						</div>
						<div class="value">
							<el-text>
								{{$t("settings.scriptNameValue")}}
							</el-text>
						</div>
					</div>
					<div class="info">
						<div class="name">
							<el-text size="large">
								{{$t("settings.description")}}
							</el-text>
						</div>
						<div class="value">
							<el-text>
								{{$t("settings.descriptionValue")}}
							</el-text>
						</div>
					</div>
					<div class="info">
						<div class="name">
							<el-text size="large">
								{{$t("settings.author")}}
							</el-text>
						</div>
						<div class="value">
							<el-text>
								{{$t("settings.authorName")}}
							</el-text>
						</div>
					</div>
					<div class="info">
						<div class="name">
							<el-text size="large">
								{{$t("settings.bilibili")}}:
							</el-text>
						</div>
						<div class="value">
							<a target="_blank" href="https://space.bilibili.com/2562878">如梦Nya</a>
						</div>
					</div>
					<div class="info">
						<div class="name">
							<el-text size="large">
								{{$t("settings.repository")}}:
							</el-text>
						</div>
						<div class="value">
							<a target="_blank" href="https://github.com/CMoyuer/CipherEditorModLoader">Github</a>
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
		ArrowRight
	} from '@element-plus/icons-vue'
	import {
		ref,
		onMounted
	} from 'vue'

	import GlobalProperties from '../utils/globalProperties.js'
	const globalProperties = GlobalProperties()

	let iconSrc = ref(globalProperties.$t("url.icon"))

	onMounted(() => {

	})

	function openAuthorGithub() {
		window.open('https://github.com/CMoyuer')
	}

	function openGithub() {
		window.open('https://github.com/CMoyuer/CipherEditorModLoader')
	}
</script>

<style scoped>
	.el-main {
		padding: 0;
	}

	.item {
		display: flex;
		border-radius: 5px;
		margin-bottom: 5px;
		padding: 12px;
		background-color: white;
	}

	.item .name {
		flex: 1;
	}

	.item .value {
		padding-top: 1px;
	}

	.item .value .el-text {
		display: block;
	}

	.description {
		border-radius: 5px;
		margin-bottom: 5px;
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
	}

	.description a {
		font-size: var(--el-font-size-base);
	}
</style>