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
                        <Checkbox
                            v-model="formState.avance"
                            :required="v$.avance?.validators.required"
                        >Аванс</Checkbox>
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
                        :variant="'primary'"
                        :type="'submit'"
                    >Сохранить</Button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, reactive } from 'vue';
    import FieldText from '@/components/form/fields/field-text.vue';
    import FieldDate from '@/components/form/fields/field-date.vue';
    import Checkbox from '@/components/form/fields/checkbox.vue';
    import Button from '@/components/ui/button.vue';
    import { useValidation } from '@/composables/useValidation';
    import { type Order } from '@/types/Order';

    const { validate } = useValidation();

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

    const submit = () => {
        if(validateAll()) {
            alert('Успешно!');
        }
    }
</script>