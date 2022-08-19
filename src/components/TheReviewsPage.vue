<template>
  <div>
    <v-snackbar
        v-if="getReviewsLoadingFlag"
        color="white"
        elevation="0"
        centered
        :timeout="-1"
        :value="true"
    >
        <v-progress-linear
          color="rgb(31 175 170)"
          indeterminate
          rounded
          height="4"
        ></v-progress-linear>
    </v-snackbar>
    <v-list
        v-else-if="getReviews.length"
        three-line
    >
        <ReviewCard
            v-for="review in getReviews"
            :key="review.id"
            :review="review"
        />
        <LazyLoader @lazyLoad="increaseCountOfShownReviews" />
    </v-list>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import ReviewCard from '@/components/ReviewCard.vue';
import LazyLoader from '@/components/LazyLoader.vue';

export default {
    components: {
        ReviewCard,
        LazyLoader
    },

    computed: {
        ...mapGetters([
            'getReviews',
            'getReviewsLoadingFlag'
        ])
    },

    methods: {
        ...mapActions(['loadReviews']),
        ...mapMutations(['increaseCountOfShownReviews'])
    },

    created() {
        this.loadReviews();
    }
}
</script>
