export default ({
  name: 'result',

  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      data: [],
      sorted: {
        id: 'none',
        name: 'none',
        time: 'none',
      },
    };
  },

  watch: {
    visible() {
      this.data = JSON.parse(localStorage.getItem('used_data'));
      if(this.data) this.toggleSort('id');
    }
  },

  methods: {
    toggleSort: function(column) {
      this.sorted[column] = this.sorted[column] === 'up' ? 'down' : 'up';
      const reverse = this.sorted[column] === 'down';
      this.data.sort(this.sortBy(column, reverse, column === 'name' ? 'string' : 'num'));
    },
    back: function() {
      this.$emit('back');
    },
    sortBy: function(field, reverse, type) {
      if (type === 'string') {
        return (a, b) => ((a[field] > b[field]) ? 1 : -1);
      }
      return (a, b) => (reverse ? a[field] - b[field] : b[field] - a[field]);
    }
  },
});
