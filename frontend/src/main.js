import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap"
import './assets/scss/custom.scss'
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import { dom } from '@fortawesome/fontawesome-svg-core'

dom.watch()

library.add(fas)
library.add(far)

createApp(App).use(store).use(router).mount('#app')
