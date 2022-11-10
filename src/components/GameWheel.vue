<script lang="js">
import { Wheel } from "vue3-fortune-wheel";
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

const generateWheelItems = () => {
      let items = [];
      let gameTitles = [];
      try{
        gameTitles = JSON.parse(localStorage.getItem('games')).names;
      }catch{
        localStorage.setItem('games', JSON.stringify({
          "names": [
            "BlazeRush",
            "Soldat",
            "Flatout",
            "CS 1.6",
            "Unreal Tournament",
            "Quake 3",
            "Trackmania",
            "Call of Duty"
            ]
        }));
        JSON.parse(localStorage.getItem('games')).names;
      } 

      for (let index = 0; index < gameTitles.length; index++) {
        let bgColor = index % 2 == 0 ? "#04DFBF" : "#9807DF"

        let item = 
        {
          id: index,
          value: gameTitles[index],
          bgColor: bgColor,
          color: "#ffffff",
        }
        items.push(item)
      }

      return items;
}

export default {
  name: "GameWheel",
  components: {
    Wheel,
  },
  data() {
    let items = generateWheelItems();

    return {
      gift: 1,
      logo: {
        width: 190,
        height: 180,
        src:
          "/gif-lan.gif",
      },
      data: items,
      active: false,
      result: null,
      modalShown: false
    };
  },
  methods: {
    done(params) {
      this.result = params.value;
      jsConfetti.addConfetti({
        emojis: ['💩'],
        emojiSize: 80,
        confettiNumber: 50,
        confettiRadius: 8,
      })
      this.showModal();
      sessionStorage.setItem('prevResult', result);
    },
    spinTheWheel() {
      if(this.active == true){
        return;
      }
      else{
        this.active = true;
      }
      this.$refs.wheel.spin();
      this.playSound();
    },
    playSound(){
      let audio = new Audio('wheel-sound.mp3');
      audio.loop = false;
      audio.play(); 
    },
    randomResult() {
      let previousResult = sessionStorage.getItem('prevResult');
      let result = previousResult;

      while(result == previousResult){
        result = Math.ceil(Math.random() * (this.data.length - 1) + 1);
      }
      return result;
    },
    showModal(){
      this.modalShown = true;
    },
    closeModal(){
      window.location.reload();
    }
  }
};
</script>

<template>
  <div class="wheel_wrap">
    <h1>G4N Wheel of Fortune</h1>
    <Wheel
      :key="reload"
      ref="wheel"
      :gift="randomResult()"
      :data="data"
      @done="done"
      :imgParams="logo"
      @click="spinTheWheel"
      :animDuration=10000
    />
  </div>
  <Modal v-model="modalShown" :close="closeModal">
    <div class="modal">
      <p>{{this.result}}</p>
      <button @click="closeModal">Again</button>
    </div>
  </Modal>
</template>
 
<style scoped>
.wheel_wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
