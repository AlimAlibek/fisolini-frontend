<template>
    <div v-if="getAmountOfGoodsInTheCart">
        <CartList
            :products="getGoodsInTheCart"
        />
        <v-row
            no-gutters
        >
            <TheCheckout />
        </v-row>
    </div>
    <div v-else>
     <v-row
        no-gutters
        justify="center"
        class="font-weight-bold text-h5 pt-12"
     >
        Товаров нет
     </v-row>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CartList from '@/components/CartList.vue';
import TheCheckout from '@/components/TheCheckout.vue';

export default {
        components: {
        CartList,
        TheCheckout
    },

    computed: {
        ...mapGetters([
            'getGoodsInTheCart',
            'getAmountOfGoodsInTheCart'
        ]),
    }
}
</script>
