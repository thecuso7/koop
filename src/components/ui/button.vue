<template>
    <component
        :is="tag"
        :href="tag === 'a' ? href : null"
        :type="tag === 'button' ? type : null"
        class="btn"
        :class="[
            `btn--${variant}`,
            `btn--${size}`,
        ]"
        v-bind="tag === RouterLink ? { to: props.to } : {}"
        :disabled="disabled"
    >
        <slot></slot>
    </component>
</template>


<script setup lang="ts">
    import { computed } from 'vue';
    import { type ButtonProps } from '@/types/Buttons';
    import { RouterLink } from 'vue-router';

    const props = withDefaults(defineProps<ButtonProps>(), {
        variant: 'primary',
        size: 'large',
        href: null,
        to: null,
        as: 'button',
        type: 'button',
        disabled: false,
    });

    const tag = computed(() => {
        if (props.to) return RouterLink;
        if(props.href) return 'a';
        return props.as
    });
</script>