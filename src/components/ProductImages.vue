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
                v-for="(image, i) in innerImages"
                :key="i"
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
            @click="fullSizeImage = true"
            style="cursor: pointer"
        />
      </v-card>
    </div>
    <div v-else>
        <v-card
            :max-width="400"
            :width="$vuetify.breakpoint.width - 50"
        >
            <v-carousel
                v-model="currentImageIndex"
                :show-arrows="false"
                :height="xSmallWidth ? '400' : '519'"
            >
                <v-carousel-item
                  v-for="(image, i) in innerImages"
                  :key="i"
                  :src="image.path"
                  @click="fullSizeImage = true"
                ></v-carousel-item>
            </v-carousel>
        </v-card>
    </div>
    <v-overlay
        :value="fullSizeImage"
        opacity="0.8"
        @click="fullSizeImage = false"
      >
        <v-carousel
            v-model="currentImageIndex"
            :height="fullSizeImageHeight"
            hide-delimiter-background
        >
            <v-carousel-item
                v-for="(image, i) in innerImages"
                :key="i"
            >
              <v-row
                class="fill-height"
                align="center"
              >
                <v-img
                    contain
                    :src="image.path"
                    :max-width="fullSizeImageMaxWidth"
                    :max-height="fullSizeImageHeight"
                    :width="fullSizeImageMaxWidth"
                />
              </v-row>
            </v-carousel-item>
        </v-carousel>
    </v-overlay>
</div>
</template>

<script>
    export default {
        props: {
            images: Array
        },
        data() {
            return {
                currentImageIndex: 0,
                fullSizeImage: false
            }
        },

        computed: {
            innerImages() {
                return this.images.length ? this.images : [{path: require('../assets/images/replace.png')}]
            },
            currentImage(){
                return this.innerImages[this.currentImageIndex]
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
            },

            fullSizeImageHeight() {
                return this.$vuetify.breakpoint.height - this.$vuetify.breakpoint.height*0.07
            },
            fullSizeImageMaxWidth() {
                return this.$vuetify.breakpoint.width*0.99
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

