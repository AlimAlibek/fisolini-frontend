<template>
    <v-container>
        <h1><a v-bind:href="'/'" style="color: #000000 ;text-decoration: none;"> Главная / О компании</a></h1>
        <p> О компании fisolini.ru</p>
        <p>Fisolini.ru – это независимый тематический Интернет-ресурс, созданный московскими экспертами в коврах и декораторами интерьеров. Наша задача – как можно больше рассказать о ковре и его роли в интерьере. В блоге Вы найдёте статьи о современных трендах в дизайне интерьеров, прочитаете о том, как правильно подобрать ковер, поймете, как именно формируется стоимость ковра. Также у нас Вы можете ознакомиться с лучшими предложениями от наших партнеров, среди которых представлено более 40 салонов ковров. Представленный выбор ковров на нашем сайте является самым полным в России, что позволяет подобрать ковёр в любой интерьер.</p>
        <p>При выборе партнера мы руководствуемся его репутацией на рынке, надежностью, актуальностью ассортимента и адекватностью цен, уровнем и качеством сервиса. На протяжении сотрудничества мы постоянно контролируем качество товара и сервиса. На сайте, в разделе «Как выбрать ковер», Вы найдете полную информацию о коврах, интересные статьи и полезные рекомендации. Кроме того, на сайте доступны следующие опции:</p>
        <p>- осуществить покупку с доставкой на дом;</p>
        <p>- оформить заказ онлайн;</p>
        <p>- получить консультацию по телефону с декоратором или экспертом;</p>
        <p>- выслать фото Вашего интерьера для подбора оптимальных вариантов оформления;</p>
        <p>- заказать примерку на дом в подарок.</p>
        <p>Мы осуществляем доставку по Москве, Московской области, Санкт-Петербургу и Ленинградской области, гарантируем возврат денег. Рекомендованные нами химчистки предлагают специальный сервис для наших клиентов.</p>
        <p>Мы всегда на связи с Вами – наши специалисты проконсультируют Вас даже после покупки ковра. Также можем провести оценку Вашего изделия и сертифицировать его в Музее Востока.</p>
        <p>Наша команда – это группа опытных экспертов в коврах, искусствоведов, дизайнеров, журналистов и молодых интернет-маркетологов. Их способности направлены на то, чтобы выбор ковра стал для Вас простым, удобным и интересным процессом.
</p>
        <TheServices />

    </v-container>
</template>
<script>
import TheServices from '@/components/TheServices.vue'

export default {
  components: {
        TheServices,
  },
  metaInfo:{
    title: 'О компании fisolini.ru',
    meta: [
      {
        name: 'description',
        content: 'Fisolini.ru – это независимый тематический Интернет-ресурс, созданный московскими экспертами в коврах и декораторами интерьеров.',
      },
      {
        name: 'keywords',
        content: 'Ковры, fisolini, фисолини, компания фисолини, ковры fisolini.ru, ковры'
      }
    ]
  },
  data(){
    return {
    }
  },
}

</script>
