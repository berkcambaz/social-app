import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initI18nLanguage } from './util/i18n'

await initI18nLanguage();
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
