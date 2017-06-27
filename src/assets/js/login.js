new Vue({
  el: document.querySelector('.page-login'),
  data: {
    user: {
      UserName: '',
      Password: ''
    },
    rememberMe: false
  },
  methods: {
    openLoginWindow(href) {
      let win = window.open(href, '', 'width=500,height=500,channelmode=yes');
      win.onclose = function () {
        window.location.reload();
      }
    },
    doUserLogin() {
      if (!this.user.UserName || !this.user.Password) {
        return AppTools.messageBox.toast('请输入账户密码');
      }
      AppTools.ajax.post('/login', this.user)
      .then(data => {
        window.location.href = '/' + window.location.search;
      });
    }
  },
});
