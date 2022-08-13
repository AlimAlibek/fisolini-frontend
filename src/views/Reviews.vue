<template>
    <v-container>
        <h1><a v-bind:href="'/'" style="color: #000000 ;text-decoration: none;"> Главная / Отзывы</a></h1>
        <TheReviewsPage />
    </v-container>
</template>

<script>
import TheReviewsPage from '../components/TheReviewsPage.vue'

export default {
    components: {
        TheReviewsPage
    }
}
</script>
