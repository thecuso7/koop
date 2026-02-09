<template>
	Главная страница
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';

	onMounted(() => {
		console.log(123);
	})
</script>
