new Vue({
  el: document.querySelector('.page-apps'),
  data: {
    appList: [],
    appModal: {
      shown: false,
      header: 'Create new app'
    },
    selectedApp: {
      Id: 0,
      AppName: '',
      AppDescription: '',
      CallbackUrl: '',
      IsActive: true
    }
  },
  created() {
    this._loadAppList();
  },
  methods: {
    showAppModal(app) {
      if (app) { // Edit
        Object.keys(this.selectedApp).forEach(key => this.selectedApp[key] = app[key]);
        this.appModal.header = 'Update App Info';
        this.selectedApp.IsActive = app.AppStatus == 'Active';
      } else {
        this._resetAppModel();
      }
      this.appModal.shown = true;
    },

    confrimDeleteApp(app) {
      if (confirm('Sure to delete app?')) {
        axios.delete(`${AppConf.apiHost}/app/${app.Id}`)
          .then(() => {
            this._loadAppList();
          });
      }
    },

    saveApp() {
      if (this.selectedApp.Id === 0) { // 新增逻辑
        axios.post(`${AppConf.apiHost}/app`, this.selectedApp)
          .then(res => {
            this.appModal.shown = false;
            this._loadAppList();
          });
      } else {
        // 编辑逻辑
        axios.put(`${AppConf.apiHost}/app/${this.selectedApp.Id}`, this.selectedApp)
          .then(res => {
            this.appModal.shown = false;
            this._loadAppList();
          });
      }
    },

    _loadAppList() {
      axios.get(`${AppConf.apiHost}/app`)
        .then(res => {
          this.appList = res.data;
        });
    },

    _resetAppModel() {
      this.selectedApp = {
        Id: 0,
        AppName: '',
        AppDescription: '',
        CallbackUrl: '',
        IsActive: true
      };
    }
  }
});
