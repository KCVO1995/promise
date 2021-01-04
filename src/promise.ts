class MyPromise {
  status = 'pending';
  callbacks = [];

  constructor(fn) {
    if (!(fn instanceof Function)) {
      throw new Error('必须接受函数');
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.status !== 'pending') return;
    this.status = 'fulfilled';
    setTimeout(() => {
      this.callbacks.forEach(callback => {
        if (callback[0] instanceof Function) callback[0].call(undefined, value);
      })
    });
  }

  reject(reason) {
    if (this.status !== 'pending') return;
    this.status = 'rejected';
    setTimeout(() => {
      this.callbacks.forEach(callback => {
        if (callback[1] instanceof Function) callback[1].call(undefined, reason);
      })
    });
  }

  then(success?, fail?) {
    const handle = [];
    if (success instanceof Function) handle[0] = success;
    if (fail instanceof Function) handle[1] = fail;
    this.callbacks.push(handle);
  }
}

export default MyPromise;
