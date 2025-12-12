<template>
	<Header></Header>
	<div class="container pb">
		<router-view :key="$route.fullPath" />
	</div>
</template>

<script setup>
	import Header from './layout/Header.vue';
</script>
