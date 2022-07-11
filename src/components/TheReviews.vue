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
      >
        Оставить отзыв
      </v-btn>
    </v-row>
    <v-list
        three-line
    >
        <v-list-item
          v-for="i in 4"
          :key="i"
          class="pa-0"
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
                :value="4"
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
              Офигеть!! Это просто класс для огорода! С сорняками борется на ура!
            </p>
          </v-list-item-content>
        </v-list-item>
    </v-list>
</div>
</template>

<script>
 export default {

    computed: {
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

