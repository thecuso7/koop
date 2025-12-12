<template>
    <div class="f-input f-input--checkbox">
        <label class="f-input__wrap">
            <input v-model="value" type="checkbox" class="f-input__checkbox" :required="required">
            <span><slot></slot></span>
        </label>
    </div>
</template>


<script setup lang="ts">
    import { computed } from 'vue';
    
    const props = defineProps<{
        modelValue: string | boolean;
        required?: boolean
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string | boolean): void;
    }>();

    const value = computed({
        get: () => props.modelValue,
        set: (val) => emit('update:modelValue', val)
    });
</script>