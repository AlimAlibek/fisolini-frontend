<template>
    <v-col>
        <v-row
        class="pa-3">
            <v-btn
            :style="'position:absolute; right:20px'"
            icon
            @click.stop="$emit('swipeDown')"
            >
                <v-icon
                    large>
                    mdi-close-circle-outline
                </v-icon>
            </v-btn>
        </v-row>
        
        <v-row
        no-gutters
        class="pa-3"
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
    </v-col>
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
