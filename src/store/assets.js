// import axios from "axios"

export const assets = {
    state: () => ({
        banners: []
    }),

    mutations: {
        setBanners(state, banners) {
            state.banners = banners
        }
    },

    actions: {

        loadBanners(ctx) {
            ctx.commit('setBanners', [
                'https://images.wallpaperscraft.ru/image/single/cvety_frukty_stol_gostinaya_kovr_80770_1920x1080.jpg',
                'https://images.wallpaperscraft.ru/image/single/komnata_kovr_stolik_divan_podushki_kartiny_knigi_okno_76963_1600x900.jpg',
                'https://images.wallpaperscraft.ru/image/single/stolik_knigi_divan_kovr_77029_1600x900.jpg',
                'https://images.wallpaperscraft.ru/image/single/derevyannyj_tekstura_bruski_119635_1920x1080.jpg',
                'https://images.wallpaperscraft.ru/image/single/kraska_holst_piatna_127260_1920x1080.jpg',
                'https://images.wallpaperscraft.ru/image/single/lava_tekstura_kamni_140277_1920x1080.jpg',
                'https://images.wallpaperscraft.ru/image/single/treugolnik_forma_temnyy_figurka_88540_1920x1080.jpg',
            ])
            // axios.get('catalog/banners')
            //     .then(res => {
            //         console.log('banners', res);
            //         ctx.commit('setBanners', res.data.data.banners)
            //     })
        }


    },

    getters: {
        getBanners(state) {
            return state.banners
        }
    }
}
