import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { getAuth } from 'firebase/auth'

getAuth().onAuthStateChanged((user)=>{
    if(user){
        window.logged = true
    }else{
        window.logged = false
    }
    createApp(App).use(store).use(router).mount('#app')
})

