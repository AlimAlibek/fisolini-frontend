<template>
<div style="width: 100%">
  <v-divider></v-divider>
    <v-row
      no-gutters
      justify="space-between"
      class="pb-4 pt-2"
    >
      <span
        class="font-weight-bold"
      >
        ОТЗЫВЫ
      </span>
      <v-btn
        class="white--text rounded-xl"
        color="#1FAFAA"
        :large="largeWidth"
        :small="!largeWidth"
        @click="reviewDialog = true"
      >
        Оставить отзыв
      </v-btn>
    </v-row>
    <v-list
        v-if="reviews.length"
        three-line
    >
      <ReviewCard
        v-for="review in reviews"
        :key="review.id"
        :review="review"
      />
      <v-row
        v-if="!showAllReviews"
        no-gutters
        justify="end"
      >
        <v-btn
          class="pa-2"
          depressed
          color="white"
          @click="showAllReviews = true"

        >
          Показать все
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </v-row>
    </v-list>
    <v-row
      v-else
      no-gutters
      justify="center"
      class="pt-12 pb-12 mt-12 mb-12"
    >
      <h2>Отзывов к этому товару ещё нет</h2>
    </v-row>

    <ReviewDialog
      v-model="reviewDialog"
    />
</div>
</template>

<script>
import { mapGetters } from 'vuex'

import ReviewCard from '@/components/ReviewCard.vue'
import ReviewDialog from './ReviewDialog.vue'

 export default {
  components: {
    ReviewCard,
    ReviewDialog
  },

    data() {
      return {
        reviewDialog: false,
        showAllReviews: false,
      }
    },

    computed: {
      ...mapGetters([
        'getSelectedGood'
      ]),

      reviews() {
        return this.showAllReviews
          ? this.getSelectedGood.product.reviews
          : this.getSelectedGood.product.reviews.slice(0, 3);
      },

      largeWidth() {
        return this.$vuetify.breakpoint.width > 1479
      },
      middleWidth() {
        return this.$vuetify.breakpoint.width < 1480 && this.$vuetify.breakpoint.width > 1264
      },
    }
 }
</script>

