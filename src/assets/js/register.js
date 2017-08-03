new Vue({
  el: document.querySelector('.page-register'),
  data: {
    user: {
      UserName: '',
      Password: '',
      Password2: ''
    },
    rememberMe: false,
    canRegister: true,
  },
  methods: {
    doRegister() {
      if (!this.canRegister) {
        return;
      }
      if (!this.user.UserName || !this.user.Password) {
        return AppTools.messageBox.toast('请输入账户密码');
      }
      if (this.user.UserName.length < 4) {
        return AppTools.messageBox.toast('账户名至少4位');
      }
      if (this.user.Password !== this.user.Password2) {
        return AppTools.messageBox.toast('两次密码输入不一致');
      }
      this.canRegister = false;
      AppTools.ajax.post('/register', this.user)
        .then(data => {
          this.canRegister = true;
          AppTools.messageBox.toast('注册成功，即将跳转到登录页', {}, () => {
            window.location.href = '/login';
          });
        })
        .catch(() => {
          this.canRegister = true;
        });
    }
  },
});
