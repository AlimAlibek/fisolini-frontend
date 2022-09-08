<template>
    <v-navigation-drawer
      :value="isCartShown"
      width="650"
      right
      fixed
      temporary
      @input="cartMenuChange"
    >
      <v-row
        class="pa-7"
        justify="space-between"
        align="center"
      >
        <h1>Корзина</h1>
      </v-row>
      <v-divider></v-divider>
      <TheCart />
    </v-navigation-drawer>
</template>

<script>
import TheCart from '@/components/TheCart.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
    components: {
        TheCart
    },

    computed: {
        ...mapGetters(['isCartShown'])
    },
    methods: {
        ...mapMutations(['setCartFlag']),

        cartMenuChange(boolean) {
            this.setCartFlag(boolean)
        }
    }
}
</script>
