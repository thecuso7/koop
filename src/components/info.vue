<template>123
	<MemoTest :lists="list" :filter="filter"></MemoTest>
</template>

<script setup lang="ts">
import { type List, Filter } from '@/types/common';
import { ref } from 'vue';
import MemoTest from '@/components/memo-test.vue';

const list = ref<List>();
const filter = ref<Filter>();
</script>
