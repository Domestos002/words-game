import { split, join } from 'lodash';

export default ({
  name: 'masonry',

  props: {
    word: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      shuffledLetters: [],
      dragInProcess: false,
      colorIndex: 0,
    };
  },

  mounted() {
    this.$dragging.$on('dragend', () => {
      if (this.word === this.dragResult) this.$emit('isRight'); // если слово совпадает с исходным - отсылает успешное событие
    });
  },

  computed: {
    dragResult() { // расчёт результата перетаскивания
      let words =  this.shuffledLetters.map(word => {
        return join(word.data.map(el => el.letter), '')
      });
      return join(words, ' ')
    },
  },

  watch: {
    word(word) {
      this.shuffledLetters = this.shuffleWord(word) // разбивает словосочетание на слова и пермешивает буквы
    },
  },

  methods: {
    getLetters: function(word) {
      const array = split(word, '');
      const shuffle = (arr) => {
        let j;
        let temp;
        for (let i = arr.length - 1; i > 0; i -= 1) {
          j = Math.floor(Math.random() * (i + 1));
          temp = arr[j];
          arr[j] = arr[i];
          arr[i] = temp;
        }
        return arr;
      };
      return shuffle(array);
    },
    shuffleWord: function(word) {
      const words = word.split(' ');
      return words.map((word, index) => {
        return {
          data: this.getLetters(word).map((el, index) => ({ letter: el, id: index })),
          id: index
        }
      });
    }
  },
});
