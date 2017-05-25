new Vue({
  el: document.querySelector('.page-apps'),
  data: {
    editModal: {
      shown: false,
      header: 'Create new app'
    },
    appModalShown: false,
    appModel: {
      Id: 0,
      AppName: '',
      AppDescription: '',
      CallbackUrl: '',
      IsActive: true
    }
  },
  methods: {
    showCreateAppModal() {
      this._resetAppModel();
      this.editModal.shown = true;
    },

    showEditAppModal(app) {
      Object.keys(this.appModel).forEach(key => this.appModel[key] = app[key]);
      this.editModal.shown = true;
    },

    saveApp() {
      if (this.appModel.Id === 0) { // 新增逻辑

      } else {
        // 编辑逻辑
      }
    },

    _resetAppModel() {
      this.appModel = {
        Id: 0,
        AppName: '',
        AppDescription: '',
        CallbackUrl: '',
        IsActive: true
      };
    }
  }
});
