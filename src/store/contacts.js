export const contacts = {
    state: () => ({
      contacts: {
        whatsapp: {
            number: '8-996-418-37-76',
            href: 'https://wa.me/79964183776'
        },
        callNumber: {
            number: '8-495-15-15-705',
            href: 'tel:+74951515705'
        },
        telegram: {
            number: '8-996-418-37-76',
            href: 'https://t.me/trell_way'
        },
        email: {
            number: 'info@fisolini.ru',
            href: 'mailto:info@fisolini.ru'
        },
      }

    }),

    getters: {
        contacts: state => state.contacts
    }
}
