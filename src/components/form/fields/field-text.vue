<template>
    <div class="f-input">
        <label class="f-input__wrap">
            <textarea
                v-if="isTextarea"
                v-model="model"
                v-bind="bindings"
                :class="{error: errors.length}"
            >
            </textarea>
            <template v-else>
                <input
                    v-model="model"
                    v-bind="bindings"
                    :class="{error: errors.length}"
                />
            </template>
            <span class="f-input__title">{{ label }}</span>
            <div class="f-input__limit" v-if="maxLength">{{ model?.length }}/{{ maxLength }}</div>
            <div class="f-input__error" v-if="errors.length">
                <img src="/src/assets/img/alert.svg" alt="">
                <span>{{ errors[0] }}</span>
            </div>
        </label>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps<{
        label: string,
        type?: 'text' | 'tel' | 'textarea' | 'email' | 'number',
        placeholder?: string,
        required?: boolean,
        errors: string[],
        maxLength?: number,
    }>();

    const model = defineModel<string>();

    const isTextarea = computed(() => {
        return props.type === 'textarea';
    });

    const bindings = computed(() => {
        return {
            type: props.type,
            class: `${
            isTextarea.value
                ? 'f-input__textarea'
                : 'f-input__input'
            }`,
            required: props.required,
            placeholder: props.placeholder,
            ...(props.maxLength ? { maxlength: props.maxLength } : {}),
            ...(props.type === 'number' ? { min: 0 } : {})
        }
    });
</script>