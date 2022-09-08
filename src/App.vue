<template>
  <v-app>
    <TheHeader />
    <CartDrawer
      v-if="desktopCart"
    />

    <v-main :style="mainPadding">
      <router-view></router-view>
    </v-main>

    <TheFooter />
  </v-app>
</template>

<script>
import {mapActions} from 'vuex';

import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';
import CartDrawer from '@/components/CartDrawer';

export default {
  name: 'App',

  components: {
    TheHeader,
    TheFooter,
    CartDrawer
  },

        data() {
          return {
            authStage: 'register',

            currentPage: {},
            pages: [
                {
                    name: 'Каталог',
                    path: '/Catalog'
                },
                {
                    name: 'О компании',
                    path: '/about'
                },
                {
                    name: 'Доставка и оплата',
                    path: '/payment'
                },
                {
                    name: 'Отзывы',
                    path: '/reviews'
                },
            ],
          }
        },

        computed: {
          mainPadding() {
            return this.$vuetify.breakpoint.width < 1195 ? 'padding-top: 40px' : 'padding-top: 175px'
          },
          desktopCart() {
            return this.$vuetify.breakpoint.width > 1195
          }
        },

        methods: {
          ...mapActions(['checkLocalStorage'])
        },

        mounted() {
          this.checkLocalStorage();
        }
};
</script>

