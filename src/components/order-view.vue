<template>
	<div class="b-order">
		<h2 class="h2">Просмотр заказа</h2>
		<div class="b-order__container">
			<h2 class="h2 b-order__title">{{ data.title }}</h2>
			<div class="b-order__label-list">
				<div class="b-order__label-item" :class="{avance: data.avance}" v-if="data.avance">Аванс</div>
				<div class="b-order__label-item" v-for="feature in data.features">{{ feature }}</div>
			</div>
			<div class="b-order__table">
				<div class="b-order__col">
					<div class="b-order__row">Дедлайн</div>
					<div class="b-order__row">{{ date }}</div>
				</div>
				<div class="b-order__col">
					<div class="b-order__row">Город</div>
					<div class="b-order__row">{{ data.city }}</div>
				</div>
				<div class="b-order__col" v-if="data.payment">
					<div class="b-order__row">Вид оплаты</div>
					<div class="b-order__row">{{  data.payment  }}</div>
				</div>
				<div class="b-order__col" v-if="data.weight">
					<div class="b-order__row">Вес</div>
					<div class="b-order__row">{{ data.weight }} кг</div>
				</div>
			</div>
			<div class="b-order__desc" v-if="data.desc">
				<span>Описание заказа</span>
				<p class="b-order__desc-text">
					{{ isExpanded ? data.desc : truncated }}
				</p>
				<div v-if="isLong" class="b-order__show-more-btn" @click="toggle">
					{{ isExpanded ? 'Скрыть' : 'Читать дальше' }}
				</div>
			</div>
			<div class="b-order__btn">
				<Button
					:as="'a'"
					:to="`/order/${route.params.id}?edit=true`"
					:variant="'primary'"
					:type="'button'"
				>Редактировать</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Button from '@/components/ui/button.vue';
	import { type Order } from '@/types/Order';
	import { useRoute } from 'vue-router';
	import { computed, ref } from 'vue';

	const route = useRoute();
	const props = defineProps<{ data: Order }>();

	const isExpanded = ref(false);
	const truncated = computed(() => props.data.desc.slice(0, 200) + (isLong ? "..." : ""));
	const isLong = computed(() => props.data.desc.length > 200);

	const toggle = () => {
		isExpanded.value = !isExpanded.value;
	};

	const date = computed(() => {
		const date = new Date(props.data.deadline);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		return `${day}.${month}.${year}`;
	})
</script>
