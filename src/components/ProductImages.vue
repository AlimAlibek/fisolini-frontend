<template>
<div>
    <div
        v-if="!smallWidth"
        class="images"
    >
      <div>
        <v-tabs
            vertical
            show-arrows
            v-model="currentImageIndex"
            slider-color="#1FAFAA"
        >
            <v-tab
                v-for="image in images"
                :key="image.id"
                style="height: 170px; width: 170px"
            >
                <v-card
                    width="110"
                >
                    <v-img style="widht: 100%; height: auto" :src="image.path" />
                </v-card>
            </v-tab>
        </v-tabs>
      </div>
      <v-card
        height="770"
        max-width="800"
        img
      >
        <v-img
            :max-width="currentImageWidth"
            height="770"
            :src="currentImage.path"
        />
      </v-card>
    </div>
    <div v-else>
        <v-card
            :max-width="xSmallWidth ? '250' : '400'"
        >
            <v-carousel
                :show-arrows="false"
                :height="xSmallWidth ? '400' : '519'"
            >
                <v-carousel-item
                  v-for="(image, i) in images"
                  :key="i"
                  :src="image.path"
                ></v-carousel-item>
            </v-carousel>
        </v-card>
    </div>
</div>
</template>

<script>
    export default {
        props: {
            images: Array
        },
        data() {
            return {
                currentImageIndex: 0
            }
        },

        computed: {
            currentImage(){
                return this.images[this.currentImageIndex]
            },

            middleWidth() {
                return this.$vuetify.breakpoint.width < 1480;
            },
            smallWidth() {
                return this.$vuetify.breakpoint.width < 760;
            },
            xSmallWidth() {
                return this.$vuetify.breakpoint.width < 460;
            },

            currentImageWidth() {
                return this.$vuetify.breakpoint.width < 1480 && this.$vuetify.breakpoint.width > 1000
                    ? '810' : '550'
            }
        }
    }
</script>

<style scoped>
    .images {
        display: flex;
    }
    .images_select {
        margin-right: 6px;
    }
</style>

