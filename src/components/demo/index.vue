<template>
	<div class="container">
		<div class="pb">
			<div class="b-tabs">
				<div class="b-tabs__item" @click="changeTab(tab.component)" v-for="tab in blocks">{{ tab.title }}</div>
			</div>
			<KeepAlive>
				<component :is="activeComponent"/>
			</KeepAlive>
		</div>
		<TextImage></TextImage>
		<div ref="anchor-animation">
			<Animation ref="animation-component" v-if="showAnimationBlock"></Animation>
		</div>
	</div>
	
</template>

<script setup>
	import { ref, reactive, useTemplateRef, defineAsyncComponent, shallowRef, markRaw } from 'vue';
	import Products from '@/components/demo/products.vue';
	import TextImage from '@/components/demo/text-image.vue';
	import DemoForm from '@/components/demo/demo-form.vue';
	import { useAnimationObserver } from '@/composables/useAnimationObserver';

	const Animation = defineAsyncComponent(() => import('@/components/demo/animation.vue'));

	const anchorAnimation = useTemplateRef('anchor-animation');
	const animationComponent = useTemplateRef('animation-component');
	const { showAnimationBlock } = useAnimationObserver(anchorAnimation, animationComponent);

	const activeComponent = shallowRef(Products);

	const blocks = ref([
        {
            id: 1,
            component: markRaw(Products),
			title: 'Продукты'
        },
        {
            id: 2, 
            component: markRaw(DemoForm),
			title: 'Форма'
        },
    ]);

    const changeTab = (component) => {
        activeComponent.value = component;
    }
</script>
