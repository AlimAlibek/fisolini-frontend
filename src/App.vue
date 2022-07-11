<template>
  <v-app>
    <TheHeader />

    <v-main :style="mainPadding">
      <router-view></router-view>
    </v-main>

    <TheFooter />
  </v-app>
</template>

<script>
import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';

export default {
  name: 'App',

  components: {
    TheHeader,
    TheFooter
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
            return this.$vuetify.breakpoint.width < 1195 ? 'padding-top: 90px' : 'padding-top: 175px'
          }
        }
};
</script>

