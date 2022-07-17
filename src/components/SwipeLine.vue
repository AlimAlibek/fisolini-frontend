<template>
    <v-row
        no-gutters
        class="pa-6"
        justify="center"
        v-touch="{
          down: () => $emit('swipeDown')
        }"
        @mouseup="() => {
            !isMobile &&  $emit('swipeDown')
        }"
    >
        <div class="swipe-line"></div>
    </v-row>
</template>

<script>

    export default {
        computed: {
            isMobile() {
                return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
                    .test(navigator.userAgent))
            }
        }
    }

</script>

<style scoped>
  .swipe-line{
    width: 85px;
    height: 4px;
    background: #909090;
    border-radius: 10px;
  }
</style>
