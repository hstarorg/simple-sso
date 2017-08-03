new Vue({
  el: document.querySelector('.page-login'),
  data: {
    user: {
      UserName: '',
      Password: ''
    },
    rememberMe: false
  },
  created() {
    this._loadUserName();
  },
  methods: {
    _loadUserName() {
      let un = localStorage.getItem('un');
      if (un) {
        this.user.UserName = un;
        this.rememberMe = true;
      }
    },
    openLoginWindow(href) {
      let win = window.open(href, '', 'width=500,height=500,channelmode=yes');
      win.onclose = function () {
        window.location.reload();
      }
    },
    doUserLogin() {
      if (!this.user.UserName || !this.user.Password) {
        return AppTools.messageBox.toast('请输入账户/密码');
      }
      AppTools.ajax.post('/login', this.user)
        .then(data => {
          if (this.rememberMe) {
            localStorage.setItem('un', this.user.UserName);
          }
          window.location.href = '/' + window.location.search;
        });
    }
  },
});
