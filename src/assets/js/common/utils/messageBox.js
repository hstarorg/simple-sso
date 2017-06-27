const defaults = {
  time: 2,
  positon: 'middle'
};

const toast = (message, options, done) => {
  let opt = Object.assign({}, defaults, options);
  let index = layer.msg({
    message,
    position: opt.position,
    iconClass: opt.iconClass || '',
    duration: -1
  });
  setTimeout(() => {
    layer.close(index);
    done && done.call(null, index);
  }, opt.time * 1000);
  return index;
};

let loadingIndex = -1;

export const messageBox = {
  toast(message, options, done) {
    return toast(message, options, done);
  },
  success(message, options, done) {
    return toast(message, Object.assign({ iconClass: 'ion-checkmark' }, options), done);
  },
  confirm(message, options, okCallback, cancelCallback) {

  },
  loading(isOpen) {
    if (!isOpen) {
      layer.close(loadingIndex);
      return loadingIndex = -1;
    }
    if (loadingIndex < 0) {
      loadingIndex = layer.load(2, {
        shade: [0.1, '#000'] //0.1透明度的白色背景
      });
    }
  }
};
