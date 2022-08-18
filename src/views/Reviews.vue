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
    },
    metaInfo:{
    title: 'Отзывы',
    meta: [
      {
        name: 'description',
                 content: 'Fisolini.ru присутствует на Российском рынке с 2018 года и за это время получила хорушую оценку от своих клиентов, благодаря отзывом которые клиенты оставляют на нашем сайте, можно выбрать ковёр который идельно подходит под ваши требования',
      },
      {
        name: 'keywords',
        content: 'Ковры, fisolini, фисолини, компания фисолини, ковры fisolini.ru, ковры, ковры из Бельгии, ковры из Ирана, отзывы, отзывы fisolini'
      }
    ]
  },
  data(){
    return {
    }
  },
}
</script>
