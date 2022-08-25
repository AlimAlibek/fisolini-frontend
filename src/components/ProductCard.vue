<template>
<v-hover
  v-slot="{ hover }"
>
  <v-card
    :elevation="hover ? 10 : 0"
    class="mx-auto"
    :class="cardClass"
    :width="cardWidth"
    :height="cardHeight"
    link
    @click="toProduct"
  >
    <v-row
      no-gutters
    >
      <v-col
        :cols="horizontal ? '6' : '12'"
      >
        <v-carousel
          v-model="currentImage"
          :show-arrows="!small"
          :show-arrows-on-hover="!small"
          :height="horizontal ? cardHeight : cardWidth"
          hide-delimiters
        >
            <template v-slot:prev="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                :small="small"
              >
                <v-icon :large="!small">mdi-chevron-left</v-icon>
              </v-btn>
            </template>
            <template v-slot:next="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on.stop="on"
                :small="small"
              >
                <v-icon :large="!small">mdi-chevron-right</v-icon>
              </v-btn>
            </template>
          <v-carousel-item
            v-for="(item,i) in images"
            :key="i"
            :src="item.path"
          >
          </v-carousel-item>
        </v-carousel>
        <div
          class="delimiter"
        >
          <v-icon
            v-for="i in images.length"
            :key="i"
            large
            :color="(i-1) === currentImage ? 'green' : 'gray'"
            style="width: 15px"
            :style="small ? 'height: 10px' : 'height: 15px'"
          >
            mdi-circle-small
          </v-icon>
        </div>
      </v-col>
      <v-col
        :cols="horizontal ? '6' : '12'"
      >
        <v-card-title
          :class="titleClass"
        >
          <span class="pa-0 col-12 text-truncate">
            {{productTitle}}
          </span>
        </v-card-title>

        <v-card-subtitle
          :class="countryClass"
        >
          <div :style="small ? 'font-size: 10px;' : ''">
            {{country}}
          </div>
        </v-card-subtitle>

        <v-card-text
          class="pb-0"
          :class="cardTextClass"
        >
          <v-row
            align="center"
            class="mx-0"
          >
            <v-rating
              :value="rating"
              color="amber"
              dense
              half-increments
              readonly
              :size="small ? 13 : 20"
            ></v-rating>

            <div
              class="grey--text"
              :class="{'ms-4': !small, 'ms-1': small}"
            >
              <div
                :style="small ? 'font-size: 10px' : 'font-size: 14px'"
              >
                {{reviews}} отзывов
              </div>
            </div>
          </v-row>

          <v-card-subtitle
            class="pb-0 text-decoration-underline"
            :class="sizeClass"
          >
            <div :style="small ? 'font-size: 10px;' : ''">
              Размеры - {{sizes}}
            </div>
          </v-card-subtitle>
        </v-card-text>
        <v-card-title :class="titleClass">
          <span class="pa-0 col-12 text-truncate">
            {{price}} &#8381;
          </span>
        </v-card-title>
      </v-col>
    </v-row>
  </v-card>
</v-hover>
</template>

<script>

  export default {
    props: {
      small: Boolean,
      horizontal: Boolean,
      product: Object
    },

    data() {
      return {
        currentImage: 0
      }
    },

    computed: {

        productTitle() {
          return this.product.title
        },
        image() {
          return this.product.images[0]?.path || require('../assets/images/replace.png')
        },
        images() {
          const images = this.product.images;
          return  images?.length ? images : [{path: require('../assets/images/replace.png')}]
        },
        country() {
          return this.product.specifications[0]?.country_of_manufacture || '-'
        },
        rating() {
          return this.product.score
        },
        reviews() {
          let count_score = this.product.reviews?.length || 0
          return count_score
        },
        sizes() {
          return this.product.stocks.length;
        },
        price() {
          if (!this.product.stocks?.length) {
            return '-'
          }
          const prices = this.product.stocks.map(stock => stock.price).sort((a, b) => {
            return +a - +b
          })
          const min = prices[0];
          const max = prices[prices.length - 1];

          return !min ? '-' : max === min ? `${min}` : `от ${min} до ${max} `
        },

        cardClass() {
          return this.small ? 'my-2' : 'my-4'
        },

        cardWidth() {
          return this.horizontal ? this.$vuetify.breakpoint.width - 90 : this.small ? 160 : 350
        },

        cardHeight() {
          return this.horizontal ? ((this.$vuetify.breakpoint.width - 90) / 2) : this.small ? 257 : 527
        },

        titleClass() {
          return this.small ? "text-subtitle-2 pa-1" : "text-h5 font-weight-medium pt-2"
        },

        countryClass() {
          return this.small
            ? "text--primary font-weight-medium text-caption pa-1 "
            : "text--primary font-weight-medium"
        },

        sizeClass() {
          return this.small
            ? "text--primary font-weight-medium text-caption  pa-1 pl-0 "
            : "text--primary font-weight-medium pl-0"
        },

        cardTextClass() {
          return this.small ? 'pl-1 pr-2' : ''
        },

    },

    methods: {
      toProduct() {
        this.$router.push({
          path: 'product',
          query: {id: this.product.id}
        })
      }
    },
  }
</script>

<style scoped>
  .v-card {
    transition: all 0.2s;
  }
  .delimiter {
    width: 100%;
    height: 5px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
</style>
