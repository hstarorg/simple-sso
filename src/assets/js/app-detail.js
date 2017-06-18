new Vue({
  el: document.querySelector('.page-app-detail'),
  data: {
    selectedApp: {}
  },
  created() {
    this._loadApp();
  },
  methods: {
    refreshSecret() {
      axios.post(`${AppConf.apiHost}/app/${serverData.appId}/refresh_secret`)
        .then(res => {
          this.selectedApp.AppSecret = res.data;
        });
    },
    _loadApp() {
      axios.get(`${AppConf.apiHost}/app/${serverData.appId}`)
        .then(res => {
          this.selectedApp = res.data;
        });
    }
  }
});
