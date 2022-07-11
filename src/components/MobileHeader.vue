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
 </v-container>
</template>

<script>
  import TheLocation from '@/components/TheLocation.vue';
  import TheNavigation from '@/components/TheNavigation.vue';
  import FeedbackInfo from '@/components/FeedbackInfo.vue';
  import TheAccount from '@/components/TheAccount.vue';

  export default {
    components: {
      TheLocation,
      TheNavigation,
      FeedbackInfo,
      TheAccount
    },
    data: () => ({
      navigation: false,
      signin: false,
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
      isHeaderScrolled() {
        return this.$vuetify.application.top < 60;
      }
    },
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
</style>
