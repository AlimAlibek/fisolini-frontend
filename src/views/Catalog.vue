<template>
    <v-container>
        <TheCatalog />
    </v-container>
</template>

<script>
import TheCatalog from '@/components/TheCatalog.vue'

export default {
    components: {
        TheCatalog
    },
    metaInfo:{
    title: 'Каталог товаров',
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
