<template>
    <v-tabs
      v-model="currentTab"
      :height="height"
      style="width:490px"
      background-color="#ffffff00"
      slider-color="#000"
      color="#000"
      :vertical="mobile"
    >
      <v-tab
        v-for="page in tabs"
        :key="page.name"
      >
        <span
            :class="{
                'tab-title': true,
                'mobile': mobile
            }"
        >
          {{ page.name }}
        </span>
      </v-tab>
    </v-tabs>

</template>

<script>
    export default {
        props: {
            tabs: Array,
            mobile: Boolean
        },

        computed: {
            height() {
                return this.mobile ? "" : 25
            }
        },

        data() {
            return {
                currentTab: 0
            }
        },

        watch: {
            currentTab(value) {
                this.$router.push(this.tabs[value].path)
            }
        }
    }
</script>

<style scoped>
  .tab-title {
    text-transform: none;
    font-size: 16px;
    margin: -8px;
  }
  .mobile {
      width: 100%;
      text-align: start;
  }
</style>
