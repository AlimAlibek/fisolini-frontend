<template>
    <v-virtual-scroll
        bench="3"
        :items="items"
        :min-height="smallWidth ? '320' : '450'"
        :max-height="smallWidth ? '470' : '600'"
        :item-height="smallWidth ? '150' : '200'"
    >
        <template v-slot:default="{ item }">
            <CartItem
                :key="item.good.id"
                :product="item"
            />
        </template>
    </v-virtual-scroll>
</template>

<script>
import CartItem from './CartItem.vue'
    export default {
  components: { CartItem },
        props: {
            products: Object
        },

        computed: {
            items() {
                return Object.values(this.products);
            },
            price() {
                return this.products
            },
            smallWidth() {
                return this.$vuetify.breakpoint.xs
            }
        }
    }
</script>
