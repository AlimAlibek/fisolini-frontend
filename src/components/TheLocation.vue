<template>
    <v-dialog
      v-model="dialog"
      width="300"
    >
      <template v-slot:activator="{ on, attrs }">
        <span
            v-bind="attrs"
            v-on="on"
            class="location"
        >
            <v-icon color="cyan darken-1" >
                mdi-map-marker-outline
            </v-icon>
            <span
              style="max-width: 178px; white-space: nowrap;"
            >
                {{getLocation}}
            </span>
            <v-icon>
                mdi-chevron-down
            </v-icon>
        </span>
      </template>

      <v-card
        width="300"
        height="120"
      >
          <v-list>
            <v-list-item
              @click="selectLocation('Москва и МО')"
              link
            >
                Москва и МО
            </v-list-item>
            <v-list-item
              link
              @click="selectLocation('Санкт-Петербург и ЛО')"
            >
              Санкт-Петербург и ЛО
            </v-list-item>
          </v-list>
      </v-card>
    </v-dialog>
</template>
<script>
  import {mapMutations, mapGetters} from 'vuex';
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    computed: {
      ...mapGetters(['getLocation'])
    },
    methods: {
      ...mapMutations(['setLocation']),

      selectLocation(location) {
        this.setLocation(location);
        this.dialog = false
      }
    }
  }
</script>

<style scoped>
    .location {
        display: flex;
        font-weight: 700;
        font-size: 16px;
        align-items: center;
    }
</style>
