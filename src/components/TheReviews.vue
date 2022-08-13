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
        :class="titleClass"
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
        reviewDialog: false
      }
    },

    computed: {
      ...mapGetters([
        'getSelectedGood'
      ]),

      reviews() {
        return this.getSelectedGood.product.reviews
      },

      largeWidth() {
        return this.$vuetify.breakpoint.width > 1479
      },
      middleWidth() {
        return this.$vuetify.breakpoint.width < 1480 && this.$vuetify.breakpoint.width > 1264
      },

      // avatarSize() {
      //   return this.largeWidth ? '100' : this.middleWidth ? '60' : '50'
      // },
      // titleClass() {
      //   return this.largeWidth ? 'text-h4' : this.middleWidth ? 'text-h6' : 'text-subtitle'
      // },
      // commentTitleClass() {
      //   return this.largeWidth ? 'text-h5 pt-5' : this.middleWidth ? 'text-subtitle pt-2' : 'text-subtitle-2 pt-1'
      // },
      // commentTextClass() {
      //   return this.largeWidth ? 'text-h6 pt-2' : this.middleWidth ? 'text-subtitle-2 pt-1' : 'text-body pt-0'
      // },
      // ratingSize() {
      //   return this.largeWidth ? '30' : this.middleWidth ? '19' : '17'
      // }
    }
 }
</script>

