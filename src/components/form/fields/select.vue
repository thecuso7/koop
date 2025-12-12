<template>
    <div class="f-select">
        <v-select :options="options" :class="{selected: model}" v-model="model" :multiple="multiple">
            <template #open-indicator="{ attributes }">
                <svg v-bind="attributes" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.49998 7C6.26699 7 6.03403 6.91597 5.8564 6.74825L0.266684 1.46804C-0.0888948 1.13215 -0.0888948 0.587565 0.266684 0.251814C0.62212 -0.0839379 1.19852 -0.0839379 1.55412 0.251814L6.49998 4.92404L11.4459 0.251977C11.8014 -0.0837747 12.3778 -0.0837747 12.7332 0.251977C13.0889 0.587728 13.0889 1.13231 12.7332 1.4682L7.14356 6.74842C6.96584 6.91616 6.73288 7 6.49998 7Z" fill="#ADADAD"/>
                </svg>
            </template>
        </v-select>
        <span class="f-select__title">{{ label }}</span>
    </div>
</template>


<script setup lang="ts">
    import 'vue-select/dist/vue-select.css';

    const props = defineProps<{
        label: string;
        required?: boolean,
        multiple?: boolean,
        options: string[]
    }>();

     const model = defineModel<string | string[]>();
</script>