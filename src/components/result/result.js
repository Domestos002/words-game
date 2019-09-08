const sort_array_by = (field, reverse, type) => {
  if (type === 'string') {
    return (a, b) => ((a[field] > b[field]) ? 1 : -1);
  }
  return (a, b) => (reverse ? a[field] - b[field] : b[field] - a[field]);
};

export default ({
  name: 'result',

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

  mounted() {
    this.data = JSON.parse(localStorage.getItem('used_data'));
    this.toggleSort('name');
    this.toggleSort('time');
    this.toggleSort('id');
  },

  methods: {
    toggleSort(column) {
      this.sorted[column] = this.sorted[column] === 'up' ? 'down' : 'up';
      const reverse = this.sorted[column] === 'down';
      this.data.sort(sort_array_by(column, reverse, column === 'name' ? 'string' : 'num'));
    },
    back() {
      this.$emit('back');
    },
  },
});
