<template>
	<div class="b-products">
		<Tabs></Tabs>
		<List v-if="productList.length" :list="productList"></List>
	</div>
</template>

<script setup>
	import List from '@/components/demo/list.vue';
	import Tabs from '@/components/demo/tabs.vue';

	import { ref } from 'vue';

	const limit = 100;
	const productList = ref([]);

	const loadProducts = async () => {
		try {
			console.log('begin');
			const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=0`);
			const data = await response.json();
			console.log('end');
			productList.value = data.products;

			console.log(productList.value);
		} catch (error) {
			
		}
		
	};

	loadProducts();
</script>
