import './output.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth } from './db/firebase.js';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

let mounted = false;

auth.onAuthStateChanged((user) => {
 
  
  localStorage.setItem('loggedIn', user ? true : false);
  

  if (!mounted) {
    app.mount("#app");
    mounted = true;
  }
});