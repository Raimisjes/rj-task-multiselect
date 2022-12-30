import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap'
import App from './App.vue'

import './assets/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
