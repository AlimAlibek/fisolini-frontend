<template>
    <v-list-item
      class="pa-0 mb-6"
      color="black"
      :class="review.product ? 'with-product pl-3 pr-3 pb-1' : ''"
    >
      <v-row
        no-gutters
        aria-orientation="column"
      >
        <v-col
          v-if="review.product"
          sm="4"
          md="3"
          lg="2"
          :cols="$vuetify.breakpoint.xs ? '12' : ''"
        >
          <ProductCard
              :product="review.product"
              :small="true"
              :horizontal="$vuetify.breakpoint.xs"
          />
        </v-col>

        <v-list-item-avatar
          v-else
          :size="avatarSize"
          :color="avatarColor"
        >
          <span
            class="white--text"
           :style="`font-size: ${avatarSize-10}px`"
          >
            {{avatar}}
          </span>

        </v-list-item-avatar>

        <v-col>
          <v-list-item-content>
            <v-row
              no-gutters
              justify="space-between"
              align="center"
              :class="commentTitleClass"
            >
              <span>
                {{review.full_name}}
              </span>
              <v-rating
                :value="review.score"
                color="amber"
                dense
                half-increments
                readonly
                :size="ratingSize"
              ></v-rating>

            </v-row>

            <v-list-item-title
              class="font-weight-medium"
              :class="commentTitleClass"
            >Комментарий:</v-list-item-title>

            <p
              class="font-weight-light"
              :class="commentTextClass"
            >
              {{review.text}}
            </p>

            <v-row
              no-gutters
              class="pt-2 pb-2"
              :justify="review.image ? 'space-between' : 'end'"
              align="end"
              :style="review.product && !smallWidth && !largeWidth
                ? 'height: 170px' : review.product && largeWidth
                ? 'height: 100px' : ''"
            >
              <v-img
                v-if="review.image"
                max-width="70"
                height="70"
                :src="review.image"
              />

              <span
                class="text-caption"
              >
                {{review.datetime.slice(0, 10)}}
              </span>

            </v-row>
          </v-list-item-content>
        </v-col>
      </v-row>
    </v-list-item>
</template>

<script>
import ProductCard from './ProductCard.vue'


export default {
  components: { ProductCard },
    props: {
        review: Object,
    },

    data() {
      return {
        colors: ["#0057FF","#05B8C3","#0FA086","#8F00FF","#BD00FF","#EB00FF","#FF00B8","#FF6B00","#FFC700"]
      }
    },

    computed: {
      largeWidth() {
        return this.$vuetify.breakpoint.width > 1479
      },
      middleWidth() {
        return this.$vuetify.breakpoint.width < 1480 && this.$vuetify.breakpoint.width > 1264
      },

      smallWidth() {
        return this.$vuetify.breakpoint.xs;
      },

      avatarSize() {
        return this.largeWidth ? '100' : this.middleWidth ? '60' : '50'
      },
      titleClass() {
        return this.largeWidth ? 'text-h4' : this.middleWidth ? 'text-h6' : 'text-subtitle'
      },
      commentTitleClass() {
        return this.largeWidth ? 'text-h5 pt-5' : this.middleWidth ? 'text-subtitle pt-2' : 'text-subtitle-2 pt-1'
      },
      commentTextClass() {
        return this.largeWidth ? 'text-h6 pt-2' : this.middleWidth ? 'text-subtitle-2 pt-1' : 'text-body pt-0'
      },
      ratingSize() {
        return this.largeWidth ? '30' : this.middleWidth ? '19' : '17'
      },

      avatar() {
        return this.review?.full_name?.slice(0, 1) || 'A'
      },
      avatarColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
      }
    }


}
</script>

<style scoped>
  .with-product {
    border: 1px solid #FED42B;
    border-radius: 10px;
  }
</style>
