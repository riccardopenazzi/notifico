// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

// Components
import { VCalendar } from 'vuetify/labs/VCalendar'

import { it } from 'vuetify/locale'
import { VDateInput } from 'vuetify/lib/labs/components.mjs'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  components: {
    VCalendar,
    VDateInput,
  },
  locale: {
    locale: 'it',
    fallback: 'it',
    messages: { it },
  },
})
