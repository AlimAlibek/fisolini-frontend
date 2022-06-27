<template>
  <v-card
    class="mx-auto"
    :class="cardClass"
    :width="cardWidth"
    :height="cardHeight"
    :to="{
      path: 'product',
      query: {id: product.id}
    }"
  >
    <v-img
      :height="cardWidth"
      :src="image"
    ></v-img>

    <v-card-title
      :class="titleClass"
    >
      {{productTitle}}
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
    <v-card-title
      :class="titleClass">
      {{price}} &#8381;
    </v-card-title>
  </v-card>
</template>

<script>

  export default {
    props: {
      small: Boolean,
      product: Object
    },

    computed: {

        productTitle() {
            return this.small
              ? this.product.title.length > 17 ? this.product.title.slice(0, 17) + '...' : this.product.title
              : this.product.title.length > 23 ? this.product.title.slice(0, 23) + '...' : this.product.title
        },
        image() {
          return this.product.images[0]?.path
        },
        country() {
          return this.product.specifications[7].value
        },
        rating() {
          return this.product.score
        },
        reviews() {
          return this.product.count_score
        },
        sizes() {
          return this.product.stocks.length;
        },
        price() {
          let max = 0;
          let min = 10000000000;
          this.product.stocks.forEach(stock => {
            if (max < stock.price) max = stock.price;
            if (min > stock.price) min = stock.price;
          })
          return max === min ? `${min}` : `от ${min} до ${max} `
        },

        cardClass() {
          return this.small ? 'my-2' : 'my-4'
        },

        cardWidth() {
          return this.small ? 160 : 350
        },

        cardHeight() {
          return this.small ? 257 : 527
        },

        titleClass() {
          return this.small ? "text-subtitle-2 pa-1" : "text-h5 font-weight-medium pt-2"
        },

        countryClass() {
          return this.small
            ? "text--primary font-weight-medium text-caption  pa-1 "
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
    },
  }
</script>
