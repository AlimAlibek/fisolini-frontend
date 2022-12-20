<template>
    <v-container fluid>
        <v-bottom-sheet
          v-if="mobileCart"
          :value="isCartShown"
          class="rounded-t-xl"
          @input="cartMenuChange"
        >
          <v-sheet
            class="rounded-t-xl"
            :height="bottomDrawerHeight"
          >
            <SwipeLine
              @swipeDown="setCartFlag(false)"
            />

            <v-row
              no-gutters
              class="pl-4"
            >
              <div class="text-subtitle font-weight-bold">
                КОРЗИНА
              </div>
            </v-row>
            <div
              style="overflow: auto"
              :style="`height: ${this.bottomDrawerHeight - 100}px`"
            >
              <TheCart />
            </div>
          </v-sheet>
        </v-bottom-sheet>

        <v-navigation-drawer
         v-else
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
    </v-container>
</template>

<script>
import TheCart from '@/components/TheCart.vue'
import SwipeLine from '@/components/SwipeLine.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
    components: {
        TheCart,
        SwipeLine
    },

    computed: {
        ...mapGetters(['isCartShown']),
        mobileCart() {
            return this.$vuetify.breakpoint.width < 1195
        },
        bottomDrawerHeight() {
        return this.$vuetify.breakpoint.height
      },
    },
    methods: {
        ...mapMutations(['setCartFlag']),

        cartMenuChange(boolean) {
            console.log('cartMenuChange', boolean)
            if (!boolean) {
              this.setCartFlag(boolean)
            }
        }
    }
}
</script>
