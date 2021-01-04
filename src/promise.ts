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

  resolve(value) {
    if (this.status !== 'pending') return
    this.status = 'fulfilled';
    setTimeout(() => {
      if (this.success instanceof Function) this.success(value);
    });
  }

  reject(reason) {
    if (this.status !== 'pending') return
    this.status = 'rejected';
    setTimeout(() => {
      if (this.fail instanceof Function) this.fail(reason);
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
