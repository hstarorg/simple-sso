new Vue({
  el: document.querySelector('.page-apps'),
  data: {
    appModalShown: false
  },
  methods: {
    showCreateAppModal() {
      this.appModalShown = true;
    }
  }
});
