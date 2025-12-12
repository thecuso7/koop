<template>
    <div class="b-form-order">
        <h2 class="h2 center b-form-order__title">Разместить заказ</h2>
        <form class="b-form-order__form" @submit.prevent="submit" novalidate>
            <div class="b-form-order__wrapper">
                <div class="b-form-order__row">
                    <div class="b-form-order__field">
                        <FieldText
                            :label="'Название заказа'"
                            :type="'text'"
                            v-model="formState.title"
                            :required="v$.title.validators.required"
                            :placeholder="''"
                            :errors="v$.title.errors.map((e: any) => e.message)"
                        ></FieldText>
                    </div>
                    <div class="b-form-order__field">
                        <FieldText
                            :label="'Вес'"
                            :type="'number'"
                            v-model="formState.weight"
                            :required="v$.weight?.validators.required"
                            :placeholder="''"
                            :errors="v$.weight?.errors.map((e: any) => e.message)"
                        ></FieldText>
                    </div>
                </div>
                <div class="b-form-order__row">
                    <div class="b-form-order__field">
                        <FieldText
                            :label="'Город'"
                            :type="'text'"
                            v-model="formState.city"
                            :required="v$.city?.validators.required"
                            :placeholder="''"
                            :errors="v$.city?.errors.map((e: any) => e.message)"
                        ></FieldText>
                    </div>
                    <div class="b-form-order__field">
                        <FieldDate
                            :label="'Дедлайн'"
                            v-model="formState.deadline"
                            :required="v$.deadline?.validators.required"
                            :errors="v$.deadline?.errors.map((e: any) => e.message)"
                        ></FieldDate>
                    </div>
                </div>
                <div class="b-form-order__row">
                    <div class="b-form-order__field">
                        <Select
                            :label="'Вид оплаты'"
                            v-model="formState.payment"
                            :required="v$.payment?.validators.required"
                            :options="fieldsData.payments"
                            :errors="v$.payment?.errors.map((e: any) => e.message)"
                        ></Select>
                    </div>
                </div>
                <div class="b-form-order__row">
                    <div class="b-form-order__field">
                        <Checkbox
                            v-model="formState.avance"
                            :required="v$.avance?.validators.required"
                        >Аванс</Checkbox>
                    </div>
                </div>
                <div class="b-form-order__row">
                    <div class="b-form-order__field">
                        <Select
                            :label="'Особенности'"
                            v-model="formState.features"
                            :required="v$.features?.validators.required"
                            :options="fieldsData.features"
                            :multiple="true"
                            :errors="v$.features?.errors.map((e: any) => e.message)"
                        ></Select>
                    </div>
                </div>
                <div class="b-form-order__row">
                    <div class="b-form-order__field">
                        <FieldText
                            :label="'Описание заказа'"
                            :type="'textarea'"
                            v-model="formState.desc"
                            :required="v$.desc?.validators.required"
                            :maxLength="500"
                            :placeholder="''"
                            :errors="v$.desc?.errors.map((e: any) => e.message)"
                        ></FieldText>
                    </div>
                </div>
                <div class="b-form-order__buttons">
                    <Button
                        :as="'button'"
                        :variant="'secondary'"
                        :type="'button'"
                        @click="cancel"
                    >Отменить</Button>
                    <Button
                        :as="'button'"
                        :variant="'primary'"
                        :type="'submit'"
                    >Сохранить</Button>
                </div>
            </div>
        </form>
    </div>
</template>


<script setup lang="ts">
    import { onMounted, reactive, watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import FieldText from './fields/field-text.vue';
    import FieldDate from './fields/field-date.vue';
    import Checkbox from './fields/checkbox.vue';
    import Button from '../ui/button.vue';
    import Select from './fields/select.vue';
    import { useValidation } from '@/composables/useValidation';
    import { useOrderStore } from '@/stores/order';
    import { type Order } from '@/types/Order';

    const { validate } = useValidation();
    const props = defineProps(['data']);
    const { fieldsData, updateDraft, clearDraft, updateOrder } = useOrderStore();
    const router = useRouter();
    const route = useRoute();

    const orderId = route.params.id;
    const formState = reactive<Order>({
        title: '',
        city: '',
        deadline: '',
        weight: '',
        payment: '',
        features: [],
        desc: '',
        avance: false,
    });

    const rulesFields = {
        title: ['required'],
        city: ['required'],
        deadline: ['required'],
    };

    const { v$, validateAll } = validate(formState, rulesFields);

    watch(() => formState, (newValue, oldValue) => {
		updateDraft(formState);
	}, {deep: true});

    const submit = () => {
        if(validateAll()) {
            updateOrder(orderId as string, formState);
            router.push(`/order/${orderId}`);
        }
    }

    const cancel = () => {
        clearDraft();
        router.push(`/order/${orderId}`);
    }

    onMounted(() => {
        console.log(123213);
        Object.assign(formState, props.data);
    });
</script>