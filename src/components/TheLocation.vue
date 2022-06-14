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
            <span>
                Москва и МО
            </span>
            <v-icon>
                mdi-chevron-down
            </v-icon>
        </span>
      </template>

      <v-card
        width="300"
        height="200"
      >
          select location
      </v-card>
    </v-dialog>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
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
