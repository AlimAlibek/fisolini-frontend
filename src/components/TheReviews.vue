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
        <v-list-item
          v-for="review in reviews"
          :key="review.id"
          class="pa-0 mb-6"
          color="black"
        >
          <v-list-item-avatar
            :size="avatarSize"
          >
            <v-img src="https://images.wallpaperscraft.ru/image/single/snezhnyy_bars_sneg_ohota_vnimatelnost_chb_57947_240x320.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-row
              no-gutters
              justify="space-between"
              align="center"
              :class="commentTitleClass"
            >
              <span>
                Елена П.
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
              justify="space-between"
              align="end"
            >
              <v-img
                max-width="70"
                height="70"
                :src="review.image"
              />

              <span>
                {{review.datetime}}
              </span>

            </v-row>
          </v-list-item-content>
        </v-list-item>
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

import ReviewDialog from './ReviewDialog.vue'
 export default {
  components: { ReviewDialog },

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
      }
    }
 }
</script>

