<template>
    <div>
        <CartList
            :products="getGoodsInTheCart"
        />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CartList from '@/components/CartList.vue';

export default {
        components: {
        CartList
    },

    computed: {
        ...mapGetters([
            'getGoodsInTheCart',
        ]),
    }
}
</script>
