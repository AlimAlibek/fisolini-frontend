<template>
    <v-container>
        <TheSearch />
    </v-container>
</template>

<script>
import TheSearch from '@/components/TheSearch.vue'

export default {
    components: {
      TheSearch
    },
    metaInfo:{
    title: 'Поиск товаров',
    meta: [
      {
        name: 'description',
                 content: 'Fisolini.ru – имеет в своём распоряжении самый широкий ассортимент ковров на Российском рынке.',
      },
      {
        name: 'keywords',
        content: 'Ковры, fisolini, фисолини, компания фисолини, ковры fisolini.ru, ковры, ковры из Бельгии, ковры из Ирана'
      }
    ]
  },
  data(){
    return {
    }
  },
}

</script>
