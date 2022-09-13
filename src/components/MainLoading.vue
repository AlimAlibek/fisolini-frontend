<template>
    <v-overlay
        opacity="0.3"
        :value="isMainLoading"
        z-index="1000"
    >
      <v-sheet
        :width="$vuetify.breakpoint.width*0.7"
        height="7"
        light
        rounded
      >
        <v-progress-linear
          color="rgb(31 175 170)"
          indeterminate
          rounded
          height="7"
        ></v-progress-linear>
      </v-sheet>
    </v-overlay>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters(['isMainLoading'])
    }
}
</script>
