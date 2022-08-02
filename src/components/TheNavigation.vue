<template>
    <v-tabs
      :value="currentTab"
      :height="height"
      style="width:490px"
      background-color="#ffffff00"
      slider-color="#000"
      color="#000"
      :vertical="mobile"
    >
      <v-tab
        v-for="(page, i) in tabs"
        :key="page.name"
        @click="toPage(i)"
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
                currentTab: null
            }
        },

        methods: {
          toPage(index) {
            this.currentTab = index;
            this.$router.push(this.tabs[index].path);
            window.scrollTo(0, top);
          }
        },

        // watch: {
        //     currentTab(value) {



        //     }
        // }
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
