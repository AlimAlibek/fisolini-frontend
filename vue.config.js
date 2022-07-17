module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  css: {
    loaderOptions: {
        sass: {
            additionalData: '@import "~@/assets/scss/variables.scss"'
        }
    }
  },

  devServer: {
    proxy: 'https://api.fisolini.ru/'
  },

}
