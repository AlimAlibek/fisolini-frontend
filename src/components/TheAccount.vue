<template>

  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <div
        :class="{
          'account-image': true,
          'mobile': mobile
        }"
      >
        <v-img
          :src="require('../assets/icons/accountLarge.svg')"
        />
      </div>
    </v-row>

    <v-row
      justify="center"
      align="center"
      class="mt-10"
    >
      <AccountForm
        :mobile="mobile"
      />
    </v-row>
  </v-container>

</template>

<script>
import AccountForm from './AccountForm.vue'


  export default {
  components: { AccountForm },
    props: {
      mobile: Boolean
    }
  }
</script>

<style scoped>
  .account-image {
    display: inline-block;
    width: 170px;
    height: 170px;
  }

  .account-image.mobile {
    width: 100px;
    height: 100px;
  }
</style>
