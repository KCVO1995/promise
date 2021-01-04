class MyPromise {
  status = 'pending';

  constructor(fn) {
    if (!(fn instanceof Function)) {
      throw new Error('必须接受函数');
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  success = null;
  fail = null;

  resolve() {
    this.status = 'fulfilled';
    setTimeout(() => {
      if (this.success instanceof Function) this.success();
    });
  }

  reject() {
    this.status = 'rejected';
    setTimeout(() => {
      if (this.fail instanceof Function) this.fail();
    });
  }

  then(success?, fail?) {
    if (success instanceof Function) {
      this.success = success;
    }
    if (fail instanceof Function) {
      this.fail = fail;
    }
  }
}

export default MyPromise;
