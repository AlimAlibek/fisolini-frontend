<template>
    <v-list
        v-if="getReviews.length"
        three-line
    >
        <ReviewCard
            v-for="review in getReviews"
            :key="review.id"
            :review="review"
        />
    </v-list>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import ReviewCard from '@/components/ReviewCard.vue';

export default {
    components: {
        ReviewCard
    },

    computed: {
        ...mapGetters(['getReviews'])
    },

    methods: {
        ...mapActions(['loadReviews'])
    },

    created() {
        this.loadReviews();
    }
}
</script>
