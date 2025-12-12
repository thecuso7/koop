import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { type Order } from "@/types/Order";

export const useOrderStore = defineStore('order', () => {
    const savedOrders = localStorage.getItem('orders');
    const savedDrafts = localStorage.getItem('order-draft');
    const orders = ref(savedOrders ? JSON.parse(savedOrders) : []);
    const draft = ref(savedDrafts ? JSON.parse(savedDrafts) : {});
    const fieldsData = {
        payments: ['Наличные', 'Карта'],
        features: ['Дизайн', 'B2B', 'Разработка']
    };

    if(!orders.value.length) {
        orders.value = [
            {
                id: 1,
                title: 'Полное название заказа 1',
                weight: 200,
                city: 'Москва',
                deadline: '2025-12-12T17:48:00.000',
                payment: 'Наличные',
                avance: false,
                features: ['Дизайн', 'B2B', 'Разработка'],
                desc: 'Необходимо создать фирменный стиль компании — полностью новый или на основе существующих наработок, логотипа, цветовых предпочтений или корпоративных материалов. Стиль должен отражать позиционирование бренда и включать все необходимые элементы: логотип, цветовую палитру, типографику, паттерны и макеты основных носителей с учётом специфики отрасли.',
            },
            {
                id: 2,
                title: 'Полное название заказа 2',
                weight: 200,
                city: 'Москва 2',
                deadline: '2025-12-12T17:48:00.000',
                payment: 'Наличные',
                avance: true,
                features: '',
                desc: 'Необходимо создать фирменный стиль компании — полностью новый или на основе существующих наработок, логотипа, цветовых предпочтений или корпоративных материалов. Стиль должен отражать позиционирование бренда и включать все необходимые элементы: логотип, цветовую палитру, типографику, паттерны и макеты основных носителей с учётом специфики отрасли.',
            },
            {
                id: 3,
                title: 'Полное название заказа 3',
                weight: 200,
                city: 'Москва 3',
                deadline: '2025-12-12T17:48:00.000',
                payment: 'Наличные',
                avance: true,
                features: ['Дизайн', 'B2B', 'Разработка'],
                desc: 'Необходимо создать фирменный стиль компании — полностью новый или на основе существующих наработок, логотипа, цветовых предпочтений или корпоративных материалов. Стиль должен отражать позиционирование бренда и включать все необходимые элементы: логотип, цветовую палитру, типографику, паттерны и макеты основных носителей с учётом специфики отрасли.',
            }
        ];
    }

    let timeout: NodeJS.Timeout;

    const updateDraft = (data: Order) => {
        if(data) {   
            saveDraft(data);
        }
    };

    const saveDraft = (data: Order) => {
        draft.value = data;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            localStorage.setItem('order-draft', JSON.stringify(data));
        }, 1000);
    };

    const clearDraft = () => {
        draft.value = {};
        console.log(draft.value);
        localStorage.removeItem('order-draft');
    }

    const updateOrder = (id: string, data: Order) => {
        if(data) {
            const index = orders.value.findIndex((o: Order) => o.id == id);
            if (index === -1) {
                orders.value.push(data);
            } else {
                orders.value[index] = {
                    ...orders.value[index],
                    ...data
                };
            }

            save();
        }
    };

    const save = () => {
        localStorage.setItem('orders', JSON.stringify(orders.value));
        clearDraft();
    };

    const getOrderById = (id: string) => {
        return orders.value.find((o: Order) => o.id == id);
    };

    return {
        orders, draft, fieldsData, updateOrder, updateDraft, getOrderById, clearDraft
    };
});