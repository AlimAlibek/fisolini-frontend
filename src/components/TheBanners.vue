<template>
 <v-container>
  <template v-if="bannerWidth<=960">
  <v-carousel
    cycle
    :interval="4000"
    :height=bannerHeight
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in getBanners"
      :key="i"
      :src="slide.image_mob"
    ></v-carousel-item>
  </v-carousel>
  </template>
  <template v-else>
    <v-carousel
      cycle
      :interval="4000"
      :height=bannerHeight
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(slide, i) in getBanners"
        :key="i"
        :src="slide.image_pc"
      ></v-carousel-item>
    </v-carousel>
    </template>
 </v-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    data () {
      return {}
    },

    computed: {
        ...mapGetters(['getBanners']),

        middleWidth() {
            return this.$vuetify.breakpoint.sm
        },
        smallWidth() {
            return this.$vuetify.breakpoint.xs
        },
        bannerWidth() {
                return this.$vuetify.breakpoint.width;
            },
        bannerHeight() {
            return this.bannerWidth <=960 ? this.bannerWidth*0.39
                :  (this.bannerWidth >960 && this.bannerWidth <=1700 ) ? this.bannerWidth*0.2
                :  (this.bannerWidth >1700 && this.bannerWidth <=1900 ) ? this.bannerWidth*0.18 : 450 
        }
    },

    methods: {
        ...mapActions(['loadBanners'])
    },

    mounted() {
        this.loadBanners();

        console.log(this.getBanners)
    }
  }
</script>
