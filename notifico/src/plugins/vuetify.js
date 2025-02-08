// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

// Components
import { VCalendar } from 'vuetify/labs/VCalendar'

import { it } from 'vuetify/locale'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  components: {
    VCalendar,
  },
  locale: {
    locale: 'it',
    fallback: 'it',
    messages: { it },
  },
})
