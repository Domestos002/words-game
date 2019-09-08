export default ({
  name: 'modal',
  data() {
    return {
      body: document.querySelector('body'),
    };
  },

  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    onRepeat() {
      this.$emit('repeat');
    },
    onEnd() {
      this.$emit('end');
    },
  },

  computed: {
    scrollbarWidth: () => {
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll';
      outer.style.msOverflowStyle = 'scrollbar';
      document.body.appendChild(outer);

      const inner = document.createElement('div');
      outer.appendChild(inner);

      const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
      outer.parentNode.removeChild(outer);

      return scrollbarWidth;
    },
  },

  watch: {
    showModal(val) {
      if (val) {
        this.body.classList.add('body--modal');
        this.body.style.paddingRight = `${this.scrollbarWidth}px`;
      } else {
        this.body.classList.remove('body--modal');
        this.body.style.paddingRight = '';
      }
    },
  },
});
