<template>
	123
	<div v-if="lists">
		<div>{{ lists.id }}</div>
		<div>{{ lists.type }}</div>
		<div>{{ lists.show }}</div>
	</div>

	<div>
		<div @click="testS(1)">1</div>
		<div></div>
	</div>
</template>

<script setup lang="ts">
import { type List, Filter } from '@/types/common';
import { reactive } from 'vue';

interface PropData {
	lists: List | undefined,
	filter: Filter | undefined
}

interface DirS {
	id: string,
	mass: Record<string, number>[]
}

const dirs = reactive<DirS>({
	id: '',
	mass: [
		{
			count: 1,
		},
		{
			count: 2,
		},
		{
			count: 3,
		}
	]
});


const result = dirs.mass.map<Record<string, number>>(item => {
	return { val: item.count * 2 };
})

console.log('122', result);

const props = defineProps<PropData>();

const testC = (test: number) => {
	console.log(test.toString());
}

const testS = <T>(test: T): T => {
	return test;
}

const res = testS(['1']);

console.log(res);
</script>
