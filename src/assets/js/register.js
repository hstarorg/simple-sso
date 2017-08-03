new Vue({
  el: document.querySelector('.page-register'),
  data: {
    user: {
      UserName: '',
      Password: '',
      Password2: ''
    },
    rememberMe: false
  },
  methods: {
    doRegister() {
      if (!this.user.UserName || !this.user.Password) {
        return AppTools.messageBox.toast('请输入账户密码');
      }
      if (this.user.Password !== this.user.Password2) {
        return AppTools.messageBox.toast('两次密码输入不一致');
      }
      AppTools.ajax.post('/register', this.user)
        .then(data => {
          AppTools.messageBox.toast('注册成功，即将跳转到登录页', () => {
            window.location.href = '/login';
          });
        });
    }
  },
});
