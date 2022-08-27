<template>
 <v-container>
    <v-app-bar
      app
      clipped-left
      min-height="70"
    >
      <v-app-bar-nav-icon
        x-large
        color="#1FAFAA"
        @click.stop="navigation = !navigation"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-app-bar-title>
        <!-- <div class="mobile-location"  >
          <TheLocation />
        </div> -->
        <a v-bind:href="'/'" >
        <div class="main-logo">
          <a v-bind:href="'/'">
            <v-img
              :src="require('../assets/Fisolini_Logo.svg')"
              contain
            />
          </a>
        </div>
        </a>
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
      class="mb-2"
    >
     <v-row
      no-gutters
      justify="space-between"
      align="center"
     >
        <v-btn
          icon
          @click="scrollUp"
        >
          <v-icon
            large
            style="
              height: 42px; width: 42px; background: rgba(241, 241, 241, 0.8); border-radius: 100%;
            "
            color="black"
          >mdi-chevron-up</v-icon>
        </v-btn>
        <v-btn
          class="rounded-pill white--text"
          color="#1FAFAA"
          height="42"
          :min-width="filtersButtonWidth"
          @click="filters = true"
        >
          <v-row align="center">
            <v-col cols="3">
              <v-icon size="34" color="white">
                mdi-filter-outline
              </v-icon>
            </v-col>
            <v-col style="text-align: start" class="white--text text-subtitle">
              <div class="pb-1">
                Фильтры: {{numberOfAppliedFilters}}
              </div>
              <div>
                Товаров: {{getAmountOfGoods}}
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
          icon
          @click.stop="setCartFlag(true)"
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
      <template
        v-slot:append
      >
        <v-row
          class="pl-7 pr-5 pb-12 mb-12"
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
      v-model="isCartShown"
      class="rounded-t-xl"
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
    <v-bottom-sheet
      v-model="filters"
      class="rounded-t-xl"
    >
      <v-sheet
        class="rounded-t-xl"
        :height="bottomDrawerHeight"
      >
        <SwipeLine
          @swipeDown="filters = false"
        />

        <v-row
          no-gutters
          justify="space-between"
          align="center"
          class="pb-4"
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
                  @click="resetFilters"
                >
                  СБРОСИТЬ
                </v-btn>
              </div>
            </v-row>
          </v-col>

        </v-row>
        <TheFilters
          mobile
        />

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
          @click="toFilteredGoods"
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
                Товаров: {{getAmountOfFilteredGoods || getAmountOfGoods}}
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
  import {mapActions, mapGetters, mapMutations} from 'vuex';

  // import TheLocation from '@/components/TheLocation.vue';
  import TheNavigation from '@/components/TheNavigation.vue';
  import FeedbackInfo from '@/components/FeedbackInfo.vue';
  import TheAccount from '@/components/TheAccount.vue';
  import TheCart from '@/components/TheCart.vue';
  import SwipeLine from '@/components/SwipeLine.vue';
  import TheFilters from '@/components/TheFilters.vue';


  export default {
    components: {
      // TheLocation,
      TheNavigation,
      FeedbackInfo,
      TheAccount,
      TheCart,
      SwipeLine,
      TheFilters
    },
    data: () => ({
      navigation: false,
      signin: false,
      filters: false,
      pages: [
        {
              name: 'Главная',
              path: '/'
          },
          {
              name: 'Каталог',
              path: '/catalog'
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
              name: 'Контакты',
              path: '/contacts'
          },
          {
              name: 'Отзывы',
              path: '/reviews'
          },
      ],
    }),

    computed: {
      ...mapGetters([
        'getAmountOfGoodsInTheCart',
        'numberOfAppliedFilters',
        'getAmountOfGoods',
        'getAmountOfFilteredGoods',
        'isCartShown'
      ]),
      isHeaderScrolled() {
        return this.$vuetify.application.top < 60;
      },
      showFilters() {
        return this.$route.path === '/' || this.$route.path === '/catalog'
      },
      showCart() {
        return this.$route.path === '/' || this.$route.path === '/product' || this.$route.path === '/catalog'
      },
      bottomDrawerHeight() {
        return this.$vuetify.breakpoint.height - 100;
      },

      filtersButtonWidth() {
        let width = this.$vuetify.breakpoint.width - 160;
        return width > 300 ? 300 : width
      }
    },

    methods: {
      ...mapActions([
        'resetFilters'
      ]),
      ...mapMutations([
        'showFilteredGoods',
        'setCartFlag'
      ]),
      scrollUp() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },
      toFilteredGoods() {
        this.filters = false
        if (this.$route.name !== 'catalog') {
          this.$router.push('/catalog')
        }
      }
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
