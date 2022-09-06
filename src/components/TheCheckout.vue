<template>
    <div>
        <v-row
            no-gutters
            class="pa-3 pb-1"
        >
            <div

               :class="`text-${dense ? 'subtitle font-weight-bold' : 'h6'}`"
            >
                Контактные данные
            </div>
        </v-row>
        <div
            class="fields pa-3"
        >
         <v-form
            ref="form"
            v-model="valid"
            lazy-validation
         >
            <v-text-field
              v-model="userName"
              label="Имя"
              required
              outlined
              color="black"
              hide-details
              :rules="nameRules"
              :dense="dense"

              class="pb-3"
            ></v-text-field>
            <InputPhoneNumber
              v-model="userPhoneNumber"
              :rules="phoneRules"
              :dense="dense"
            />
            <v-checkbox
                v-model="agree"
                class="ma-0 pa-0"
                :rules="[v => !!v || 'Обязательное поле']"
                label="Я прочитал и согласен с правилами покупки"
                color="#1FAFAA"
                required
                :class="`text-${dense ? 'caption' : 'body'}`"
            ></v-checkbox>
            <div
                class="gray--text pa-0 ma-0"
                :class="`text-${dense ? 'caption' : 'body'}`"
            >
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
                    @click="submit"
                >
                    Оформить {{Number(getTotalPrice).toLocaleString()}}&#8381;
                </v-btn>
            </v-row>
         </v-form>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

import InputPhoneNumber from '@/components/InputPhoneNumber.vue';

export default {
    components: {
        InputPhoneNumber,
    },
    state: () => ({
        getGoodsInTheCart: []}),
    data() {
        return {
            valid: true,

            agree: true,
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
    },
    getters: {
        getGoodsInTheCart: state => state.goodsInTheCart,
    },

    methods: {
        ...mapActions([
            'createOrder'
        ]),

        async submit() {
            await this.$refs.form.validate()
            if (!this.valid) {
                return;
            }

            var products = []         

            Object.values(this.$store.getters['getGoodsInTheCart']).forEach(good => { 
                var productsW = {}
                productsW["id"] ='' + good.stock.id;
                productsW["price"] = '' + good.stock.price;
                productsW["variant"] = '' + good.stock.size;
                productsW["quantity"] = '' + good.count;
                productsW["category"] = "";
                productsW["name"] = '' + good.good.id;
                products.push(productsW);
                console.log(good)
            })
            
             window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    "ecommerce": {
                        "currencyCode": "RUB",
                        "purchase": {
                            "_name": "purchase",
                            "products":products //тут нужно передать в массиве (id Товара, имя, цену и количество)
                        }
                    }
                });
            window.ym(88691177,'reachGoal','purcash', window.dataLayer)
            this.createOrder({
                name: this.userName,
                phone: this.userPhoneNumber
            })

        }
    }
}

</script>

<style scoped>
    .fields {
        max-width: 420px;
    }
</style>


