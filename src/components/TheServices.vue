<template>
  <v-row
    no-gutters
    justify="center"
    class="pt-2"
  >
    <v-slide-group
      :hidden="smallWidth"
      :show-arrows="!smallWidth"
    >
      <v-slide-item
        v-for="(item, i) in servises"
        :key="i"
      >

        <v-card
          :color="item.color"
          :width="cardWidth"
          :height="cardHeight"
          :class="{
            'ml-2 mr-2': smallWidth,
            'ml-5 mr-5': !smallWidth
          }"
        >
         <v-row
          no-gutters
           align="center"
         >
           <v-col
            cols="4"
            sm="5"
            class="ma-0 pa-0"
            :class="{
              'pl-3': !smallWidth,
              'pl-': smallWidth
            }"
           >
              <v-img
                :src="item.image"
                :width="smallWidth ? item.image_size.width/2 : item.image_size.width"
                :height="smallWidth ? item.image_size.height/2 : item.image_size.height"
              />

           </v-col>
           <v-col
            class="ma-0 pa-0"
            :class="{
              'pt-3': smallWidth,
              'pt-6': !smallWidth,
              'pr-1': !smallWidth
            }"
            :style="textColStyle"
           >
             <div
                class="text-h6 mb-1 font-weight-bold"
                :class="{
                  'text-subtitle-2': smallWidth
                }"
                :style="titleStyle"
             >
                {{item.title}}
             </div>
             <div
                class="text-subtitle-1 font-weight-medium"
                :class="{
                  'text-caption': smallWidth
                }"
                :style="bodyTextStyle"
             >
                {{item.text}}
             </div>
           </v-col>
         </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      model: null,

      servises: [
          {
              title: 'Доставка и оплата',
              text: 'Доставка курьером на следующий день',
              image: require('../assets/icons/track.png'),
              image_size: {width: 129, height: 113},
              color: '#FFEED6'
          },
          {
              title: 'Гарантия и возврат',
              text: 'Подлинность и гарантия на любой товар 1 год',
              image: require('../assets/icons/guarantee.png'),
              image_size: {width: 113, height: 108},
              color: '#D9ECD2'
          },
          {
              title: 'Контакты',
              text: 'Ответим на любой вопрос с 9:00 до 22:00',
              image: require('../assets/icons/contacts.png'),
              image_size: {width: 114, height: 110},
              color: '#DBE5EF'
          },
          {
              title: 'Уникальные товары',
              text: 'Большой выбор уникальных ковров на любой вкус',
              image: require('../assets/icons/exclusive.png'),
              image_size: {width: 110, height: 84.75},
              color: '#EFD8D4'
          },
      ]
    }),

    computed: {
      smallWidth() {
        return this.$vuetify.breakpoint.xs
      },

      cardWidth() {
        return this.smallWidth ? 200 : 350
      },
      cardHeight() {
        return this.smallWidth ? 75 : 150
      },

      imageWidth(size) {
        return this.smallWidth ? size/2 : size
      },

      textColStyle() {
        return this.smallWidth ? 'height: 75px' : 'height: 150px'
      },

      titleStyle() {
        return this.smallWidth ? 'line-height: 14px' : ''
      },

      bodyTextStyle() {
        return this.smallWidth ? 'line-height: 12px;' : 'line-height: 24px;'
      }
    }
  }
</script>
