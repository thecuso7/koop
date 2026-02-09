
<template>
	<DynamicScroller
		:items="list"
		:min-item-size="50"
		class="scroller"
	>
		<template v-slot="{ item, index, active }">
			<DynamicScrollerItem
				:item="item"
				:active="active"
				:size-dependencies="[
					item.description,
				]"
				:data-index="index"
			>
				<div class="b-product-card">
					<div class="b-product-card__col">{{ item.id }}</div>
					
					<div class="b-product-card__col image">
						<img v-if="item.images.length" :src="item.images[0]" alt="">
						<img v-else :src="'default.png'" alt="">
					</div>
					<div class="b-product-card__col">{{ item.title }}</div>
					<div class="b-product-card__col">{{ item.description }}</div>
				</div>
			</DynamicScrollerItem>
		</template>
	</DynamicScroller>

</template>

<script setup>
	import { onMounted, onBeforeUnmount } from 'vue';
	import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';

	const props = defineProps({list: Array});

	onMounted(async()=>{
	});

	onBeforeUnmount(()=>{
	});
</script>

<style scoped>
.scroller {
  height: 600px;
  display: flex;
}
</style>