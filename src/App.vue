<template lang="pug">
  #app.site-wrapper
    masonry(
        :word="word"
        v-if="!endFlag"
        @isRight="isRight")
    result(v-if="endFlag" @back="back")
    modal(:showModal="showModal" @repeat="repeat" @end="end" @closeModal="toggleModal")
    .preloader(v-if="pending")
        .preloader__img
</template>

<style lang="sass" src="./components/base.sass"></style>

<script>
import axios from 'axios';
import masonry from './components/masonry/masonry.vue';
import modal from './components/modal/modal.vue';
import result from './components/result/result.vue';

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const sec2time = (timeInSeconds) => {
  const sec_num = parseInt(timeInSeconds, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = `0${hours}`; }
  if (minutes < 10) { minutes = `0${minutes}`; }
  if (seconds < 10) { seconds = `0${seconds}`; }
  return `${hours}:${minutes}:${seconds}`;
};

const setInterval = (f, time) => {
  setInterval.ids = setInterval.ids || {};
  setInterval.idCount = setInterval.idCount || 0;
  const that = this;
  const id = setInterval.idCount++;
  const l = arguments.length - 2;

  (function theFn() {
    const args = [].slice.call(arguments, 0, l);
    f.apply(this, args);
    setInterval.ids[id] = setTimeout.apply(this, [theFn, time].concat(args));
  }).apply(that, [].slice.call(arguments, 2, arguments.length));
  return id;
};

export default {
  name: 'app',
  data() {
    return {
      apiUrl: 'https://apidir.pfdo.ru/v1/directory-program-activities',
      word: '',
      id: null,
      showModal: false,
      usedData: [],
      pending: true,
      endFlag: false,
      time: 0,
    };
  },
  components: {
    masonry,
    modal,
    result,
  },
  mounted() {
    this.init();
  },
  methods: {
    isRight() {
      const newData = {
        word: this.word,
        id: this.id,
        time: sec2time(this.time),
        timeNum: this.time,
      };
      if (!this.usedData) {
        localStorage.setItem('used_data', JSON.stringify([newData]));
      } else {
        this.usedData.push(newData);
        localStorage.setItem('used_data', JSON.stringify(this.usedData));
      }
      this.toggleModal();
    },

    repeat() {
      this.endFlag = false;
      this.toggleModal();
      this.init();
    },

    back() {
      this.endFlag = false;
      this.init();
    },

    end() {
      this.toggleModal();
      this.endFlag = true;
    },

    init() {
      this.time = 0;
      this.pending = true;
      this.time = 0;
      this.usedData = JSON.parse(localStorage.getItem('used_data'));
      this.getWord().then((data) => {
        this.word = data.name;
        this.id = data.id;
        this.pending = false;
        this.$nextTick(() => {
          this.time = 0;
          this.time = setInterval(() => this.time += 1, 1000);
        });
      });
    },

    toggleModal() {
      this.showModal = !this.showModal;
    },

    chooseWord({ name, id }) {
      const data = { name: name.toUpperCase().replace(/\s*\(.*?\)\s*/g, ''), id };
      if (!this.usedData) {
        return data;
      }

      const alreadyBeen = () => this.usedData.find(el => el.id === id);
      return alreadyBeen() ? this.getWord() : data;
    },

    getWord() {
      return axios.get(`${this.apiUrl}/${randomNum(2, 1368)}`, {
        crossDomain: true,
      }).then(response => (response.data.result_code === 'LST01' ? this.getWord() : this.chooseWord(response.data.data)))
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>
