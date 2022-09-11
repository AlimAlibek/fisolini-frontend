<template>
    <v-snackbar
        :value="getError"
        right
        color="error"
        timeout="-1"
    >
      <v-row
        no-gutters
        justify="center"
        class="text-h6"
      >
        {{getError}}
      </v-row>
    </v-snackbar>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed: {
        ...mapGetters(['getError'])
    }
}
</script>
