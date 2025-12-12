<template>
	<OrderEditForm  v-if="isEditing && isDataExist" :key="'edit'" :data="Object.keys(draftValue).length ? draftValue : orderData"></OrderEditForm>
	<OrderView :data="orderData" :key="'show'" v-else></OrderView>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { useOrderStore } from '@/stores/order';

	import OrderEditForm from '@/components/form/order-edit-form.vue';
	import OrderView from '@/components/order-view.vue';

	const orderStore = useOrderStore();
	const route = useRoute();

	const orderData = ref(orderStore.getOrderById(route.params.id as string));

	const isEditing = computed(() => {
		return route.query.edit === 'true';
	});

	const draftValue = computed(() => orderStore.draft);

	const isDataExist = computed(() => {
		return Object.keys(orderData.value).length || Object.keys(draftValue.value).length;
	});

	onMounted(() => {
		console.log(123);
	})
</script>
