<template>
    <v-dialog
        v-if="currentOrder"
        :value="currentOrder"
        max-width="500"
    >
        <v-card
            :height="smallWidth ? 250 : 300"
        >
            <v-card-title class="text-h5 teal accent-1 justify-end">
              Заказ №{{currentOrder}}
            </v-card-title>
            <v-card-text
                class="text-h6 pa-10"
                :class="{'pt-5 pb-5 text-subtitle-1': smallWidth}"
            >
              Заказ №{{currentOrder}} оформлен.
              <br>
              Менеджер свяжется с вами после её обработки.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="confirmOrder"
              >
                Ок
              </v-btn>
            </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {

  computed: {
    ...mapGetters(['currentOrder']),

    smallWidth() {
      return this.$vuetify.breakpoint.width < 460
    }
  },
  methods: {
    ...mapMutations([
      'confirmOrder'
    ]),
  }

}
</script>
