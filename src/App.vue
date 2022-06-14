<template>
  <v-app>
    <TheHeader />

    <v-main>
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
          screenWidth() {
            return (
              this.$vuetify.breakpoint.sm ? 'small'
              : this.$vuetify.breakpoint.md ? 'middle'
              : this.$vuetify.breakpoint.lg ? 'large'
              : this.$vuetify.breakpoint.xl ? 'x-large' : 'xs'
            )
          },
        }
};
</script>


<style scoped>
  .nav-tabs {
    display: flex;
  }
  .nav-tab {
    display: inline-block;
    margin-right: 20px;
    box-sizing: border-box;
    transition: all 0.7s;
  }
  .nav-tab:hover {
    border-bottom: 1px solid #1FAFAA;
    transition: all 1s;
  }

  .tab-title {
    text-transform: none;
    font-weight: 400;
    font-size: 16px;
    margin: -8px;
  }
</style>
