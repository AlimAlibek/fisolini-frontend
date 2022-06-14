<template>
 <v-container>
  <v-carousel
    cycle
    :height="bannerHeight"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in getBanners"
      :key="i"
      :src="slide"
    ></v-carousel-item>
  </v-carousel>
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

        bannerHeight() {
            return this.smallWidth ? 150
                : this.middleWidth ? 326 : 450
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
