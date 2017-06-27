new Vue({
  el: document.querySelector('.page-login'),
  data: {
    rememberMe: false
  },
  methods: {
    openLoginWindow(href) {
      let win = window.open(href, '', 'width=500,height=500,channelmode=yes');
      win.onclose = function () {
        window.location.reload();
      }
    },
    doUserLogin(){

    }
  },
});
