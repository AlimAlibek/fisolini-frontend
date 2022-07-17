<template>
    <div>
        <v-row
            no-gutters
            class="pa-3"
        >
            <div class="text-h6">
                Контактные данные
            </div>
        </v-row>
        <div
            class="fields pa-3"

        >
        <v-text-field
          v-model="userName"
          label="Имя"
          required
          outlined
          color="black"
          counter="20"
          :rules="nameRules"
          :dense="dense"
        ></v-text-field>
        <InputPhoneNumber
          v-model="userPhoneNumber"
          :rules="phoneRules"
          :dense="dense"
        />
        <v-checkbox
            class="ma-0 pa-0"
            v-model="checkbox"
            :rules="[v => !!v || 'Обязательное поле']"
            label="Я прочитал и согласен с правилами покупки"
            required
        ></v-checkbox>
        <div class="gray--text pa-0 ma-0">
            После оформления заказа, менеджер свяжется с Вами и уточнит детали доставки
        </div>
        <v-row
            no-gutters
            justify="center"
            :class="{'pt-1': dense, 'pt-3': !dense}"
        >
            <v-btn
                class="white--text rounded-xl"
                color="#1FAFAA"
                :large="!dense"
                :disabled="selectedStockIndex === null"
            >
                Оформить {{getTotalPrice}}&#8381;
            </v-btn>
        </v-row>

        </div>
        <!-- <AccountForm /> -->
    </div>
</template>

<script>
import {mapGetters} from 'vuex';


import InputPhoneNumber from '@/components/InputPhoneNumber.vue';

export default {
    components: {
        InputPhoneNumber,
        // AccountForm
    },
    data() {
        return {
            userName: '',
            userPhoneNumber: '',

            nameRules: [
              v => !!v || 'Введите имя',
              v => (v && v.length <= 20) || 'Не более 20 символов',
            ],
            phoneRules: [
                v => (v[0] === '8' && v.length === 17 || v.length === 18) || 'Введите корректный номер телефона'
            ],
        }

    },
    computed: {
        ...mapGetters(['getTotalPrice']),
        dense() {
            return this.$vuetify.breakpoint.width < 1200;
        }
    }
}

</script>

<style scoped>
    .fields {
        max-width: 420px;
    }
</style>


