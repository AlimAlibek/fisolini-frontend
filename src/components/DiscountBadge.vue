<template>
        <div class="discount-badge">
            <v-badge
              :value="discount"
              color=""
              :offset-x="small ? 65 : 80"
              :offset-y="small ? -40 : -65"
            >
              <div style="height: 0px"></div>
              <template v-slot:badge >
                <span
                  class="red accent-2 rounded-xl pl-2 pr-2"
                  :class="small ? 'text-body-2' : 'text-h6'"
                >
                  {{`-${discount}%`}}
                </span>
              </template>
            </v-badge>
          </div>
</template>

<script>
export default {
    props: {
        discount: Number,
        small: Boolean
    }
}
</script>

<style scoped>
  .discount-badge {
    position: absolute;
    height: 0px;
    width: 100%;
    text-align: end;
    transform: rotate(10deg);
  }
</style>

