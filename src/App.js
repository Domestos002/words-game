import axios from 'axios';
import masonry from './components/masonry/masonry.vue';
import modal from './components/modal/modal.vue';
import result from './components/result/result.vue';
import { randomNum, sec2time, setInterval } from './helpers.js'

export default {
  name: 'app',
  data() {
    return {
      apiUrl: 'https://my-json-server.typicode.com/Domestos002/jsonDummy/words',
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
        this.$nextTick(() => { // запуск таймера
          this.time = 0;
          this.time = setInterval(() => this.time += 1, 1000);
        });
      });
    },

    toggleModal() {
      this.showModal = !this.showModal;
    },

    chooseWord({ name, id }) {
      console.log(name);
      const data = { name: name.toUpperCase().replace(/\s*\(.*?\)\s*/g, ''), id };
      if (!this.usedData) {
        return data;
      }

      const alreadyBeen = () => this.usedData.find(el => el.id === id); //если слово отгадано, запрос на новое
      return alreadyBeen() ? this.getWord() : data;
    },

    getWord() {
      return axios.get(`${this.apiUrl}/${randomNum(1, 11)}`, {
        crossDomain: true,
      }).then(response => this.chooseWord(response.data))
      .catch((error) => {
        console.log(error);
      });
    },
  },
};
