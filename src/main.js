import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {VueConfetti} from 'vue-confetti';
import 'vue-universal-modal/dist/index.css';
import VueUniversalModal from 'vue-universal-modal';


const app = createApp(App);
app.use(VueConfetti);
app.use(VueUniversalModal, {
    teleportTarget: '#modals',
  });
app.mount('#app')
