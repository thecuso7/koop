import { reactive } from 'vue';
import { ref, onMounted, onUnmounted, watch } from 'vue';
type ValidatorsList = Record<string, string[]>;
type ValidatorFn = (value: any) => boolean;

export const useValidation = () => {
    const builtInValidators: Record<string, ValidatorFn> = {
        required(value: any) {
            if (value === null || value === undefined) return false;
            if (typeof value === 'string' && value.trim() === '') return false;
            return true;
        }
    };

    const validate = (
        data: Record<string, any>,
        fieldValidators:Record<string, string[]> = {},
    ) => {
        const messages: Record<string, string> = {
            required: 'Поле обязательно для заполнения',
            email: 'Некорректный email',
            isValidPassword: 'Пароль не соответствует требованиям'
        };

        const v$ = reactive<Record<
            string,
            {
                validators: Record<string, boolean>;
                errors:  Object[];
            }
        >>({});

        for(const key in data) {
            v$[key] = {
                validators: {},
                errors: []
            };

            if(Object.keys(fieldValidators).length && fieldValidators?.[key]) {
                fieldValidators[key].forEach(validator => {
                    v$[key].validators[validator] = true;
                });
            }
        }

        const validateField = (key: string) => {
            const field = v$[key];

            if (!field) return true;

            let valid = true;

            for (const validatorName in field.validators) {
                const validatorFn = builtInValidators[validatorName];

                if (!validatorFn) continue;

                const result = validatorFn(data[key]);
                if(!result) {
                    field.errors.push({rule: validatorName, message: messages[validatorName]});
                    valid = false;
                }
            }

            return valid;
        };

        const validateAll = () => {
            let ok = true;

            for (const key in v$) {
                const fieldValid = validateField(key);
                if (!fieldValid) ok = false;
            }

            return ok;
        };

        for (const key in data) {
            watch(
                () => data[key],
                () => {
                    v$[key].errors = [];
                    validateField(key);
                }
            );
        }

        return { v$, validateAll };
    }

    return { validate };
}
