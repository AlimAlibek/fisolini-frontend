<template>
  <v-card
    class="mx-auto"
    :class="cardClass"
    :width="cardWidth"
    :height="cardHeight"
  >

    <v-img
      :height="cardWidth"
      :src="goodImage"
    ></v-img>

    <v-card-title
      :class="titleClass">
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
          :value="4.5"
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
      {{price}}
    </v-card-title>
  </v-card>
</template>


<script>
  import goodImage from '@/assets/images/good.png'

  export default {
    props: {
      small: Boolean
    },

    data: () => ({
      loading: false,
      selection: 1,

      title: 'Ковер Fisolini Tp-512312332423423423424',
      country: 'Турция',
      rating: 4.5,
      reviews: 5,
      sizes: 2,
      price: 'от 2 234 до 192 918 р'

    }),

    computed: {
        productTitle() {
            return this.small ?  this.title.length > 21 ? this.title.slice(0, 21) + '...' : this.title
              : this.title.length > 25 ? this.title.slice(0, 25) + '...' : this.title
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

        goodImage: () => goodImage
    },

    methods: {
    },
  }
</script>
