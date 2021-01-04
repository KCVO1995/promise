class MyPromise {
  constructor(fn) {
    if (!(fn instanceof Function)) {
      throw new Error('必须接受函数');
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  success = null;
  fail = null;

  resolve() {
    setTimeout(() => this.success());
  }

  reject() {
    setTimeout(() => this.fail());
  }

  then(success, fail?) {
    this.success = success;
    this.fail = fail;
  }
}

export default MyPromise;
