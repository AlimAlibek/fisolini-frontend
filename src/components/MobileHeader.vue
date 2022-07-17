<template>
 <v-container>
    <v-app-bar
      app
      clipped-left
      shrink-on-scroll
      min-height="70"
      :class="{'pt-2': isHeaderScrolled}"
    >
      <v-app-bar-nav-icon
        x-large
        color="#1FAFAA"
        @click.stop="navigation = !navigation"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-app-bar-title>
        <div class="mobile-location"  >
          <TheLocation />
        </div>
        <div class="main-logo">
          <a v-bind:href="'/'">
            <v-img
              :src="require('../assets/Fisolini_Logo.svg')"
              contain
            />
          </a>
        </div>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        x-large
        color="#1FAFAA"
        @click.stop="signin = !signin"
      >
        <v-img
          :src="require('../assets/icons/account.svg')"
        />
      </v-btn>
    </v-app-bar>

    <v-bottom-navigation
      fixed
      height="52"
      background-color="rgba(0, 0, 0, 0)"
      style="box-shadow: none;"
      :width="showFilters ? '' : '60'"
    >
     <v-row
      no-gutters
      :justify="showFilters ? 'space-between' : 'end'"
      align="center"

     >
        <v-btn
          v-if="showFilters"
          icon
          @click="filters = true"
        >
          <v-icon
            large
            style="
              height: 42px; width: 42px; background: rgba(241, 241, 241, 0.7); border-radius: 100%;
            "
            color="black"
          >mdi-chevron-up</v-icon>
        </v-btn>

        <v-btn
          v-if="showFilters"
          class="rounded-pill white--text"
          color="#1FAFAA"
          height="42"
        >
          <v-row align="center">
            <v-col cols="3">
              <v-icon size="34" color="white">
                mdi-filter-outline
              </v-icon>
            </v-col>
            <v-col style="text-align: start" class="white--text text-subtitle">
              <div class="pb-1">
                Фильтры: 0
              </div>
              <div>
                Товаров: 2357
              </div>
            </v-col>
          </v-row>
        </v-btn>

        <v-badge
          color="teal"
          :content="getAmountOfGoodsInTheCart"
          :value="getAmountOfGoodsInTheCart"
          overlap
          offset-x="33"
          offset-y="12"
        >
        <v-btn
          v-if="showCart"
          icon
          @click.stop="cart = !cart"
        >
          <v-img
            max-width="42"
            height="42"
            :src="require('../assets/icons/cart_gray.png')"
          />
        </v-btn>
        </v-badge>
     </v-row>
    </v-bottom-navigation>
    <v-navigation-drawer
      v-model="navigation"
      clipped
      fixed
      app
      width="290"
    >
      <v-row
        class="pa-5"
      >
        <v-btn
          icon
          large
          @click="navigation = false"
        >
          <v-icon large>mdi-arrow-left</v-icon>
        </v-btn>
      </v-row>

      <v-row
        class="pr-5 pl-5"
      >
        <TheNavigation
          :tabs="pages"
          mobile
        />
      </v-row>
      <template v-slot:append>
        <v-row
          class="pl-7 pr-5 pb-10"
        >
        <FeedbackInfo
          mobile
        />
        </v-row>
      </template>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="signin"
      clipped
      fixed
      app
      width="290"
      right
    >
      <v-row
        class="pa-5"
        justify="end"
      >
        <v-btn
          icon
          large
          @click="signin = false"
        >
          <v-icon large>mdi-arrow-right</v-icon>
        </v-btn>
      </v-row>

      <TheAccount mobile />

    </v-navigation-drawer>

    <v-bottom-sheet
      v-model="cart"
      class="rounded-t-xl"
    >
      <v-sheet
        class="rounded-t-xl"
        :height="bottomDrawerHeight"
      >
        <SwipeLine
          @swipeDown="cart=false"
        />

        <v-row
          no-gutters
          class="pl-4"
        >
          <div class="text-subtitle font-weight-bold">
            КОРЗИНА
          </div>
        </v-row>
          <TheCart />

      </v-sheet>
    </v-bottom-sheet>
    <v-bottom-sheet
      v-model="filters"
      class="rounded-t-xl"
    >
      <v-sheet
        class="rounded-t-xl"
        :height="bottomDrawerHeight"
      >
        <SwipeLine
          @swipeDown="filters=false"
        />

        <v-row
          no-gutters
          justify="space-between"
          align="center"
        >
          <v-col></v-col>
          <v-col>
            <v-row
              no-gutters
              justify="center"
            >
              <div class="text-subtitle font-weight-bold">
                Фильтры
              </div>
            </v-row>
          </v-col>

          <v-col>
            <v-row
              no-gutters
              justify="end"
              class="pr-3"
            >
              <div>
                <v-btn
                  depressed
                  color="white"
                  class="font-weight-bold"
                >
                  СБРОСИТЬ
                </v-btn>
              </div>
            </v-row>
          </v-col>

        </v-row>

      <v-bottom-navigation
        absolute
        style="box-shadow: none"
        height="50"
      >
        <v-row
          no-gutters
          justify="center"
        >
        <v-btn
          class="rounded-pill white--text"
          color="#1FAFAA"
          height="42"
        >
          <v-row align="center">
            <v-col cols="3">
              <v-icon size="34" color="white">
                mdi-filter-outline
              </v-icon>
            </v-col>
            <v-col style="text-align: start" class="white--text text-subtitle">
              <div class="pb-1">
                Просмотреть
              </div>
              <div>
                Товаров: 1256
              </div>
            </v-col>
          </v-row>
        </v-btn>
        </v-row>
      </v-bottom-navigation>
      </v-sheet>
    </v-bottom-sheet>
 </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  import TheLocation from '@/components/TheLocation.vue';
  import TheNavigation from '@/components/TheNavigation.vue';
  import FeedbackInfo from '@/components/FeedbackInfo.vue';
  import TheAccount from '@/components/TheAccount.vue';
  import TheCart from '@/components/TheCart.vue';
  import SwipeLine from '@/components/SwipeLine.vue';


  export default {
    components: {
      TheLocation,
      TheNavigation,
      FeedbackInfo,
      TheAccount,
      TheCart,
      SwipeLine
    },
    data: () => ({
      navigation: false,
      signin: false,
      cart: false,
      filters: false,
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
    }),

    computed: {
      ...mapGetters(['getAmountOfGoodsInTheCart']),
      isHeaderScrolled() {
        return this.$vuetify.application.top < 60;
      },
      showFilters() {
        return this.$route.path === '/'
      },
      showCart() {
        return this.$route.path === '/' || this.$route.path === '/product'
      },
      bottomDrawerHeight() {
        return this.$vuetify.breakpoint.height - 170;
      }
    },

    methods: {
    }
  }
</script>

<style scoped>
  .main-logo {
    width: 100%;
    max-width: 160px;
    height: 60px;
    padding-top: 10px;
  }
  .mobile-location {
    width: 100%;
    margin: 20px auto;
  }
  .swipe-line{
    width: 85px;
    height: 4px;
    background: #909090;
    border-radius: 10px;
  }
</style>
