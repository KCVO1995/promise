import * as chai from 'chai';
import MyPromise from '../src/promise';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);
const assert = chai.assert;

describe('Promise', () => {
  it('是一个类', () => {
    assert.isFunction(MyPromise);
    assert.isObject(MyPromise.prototype);
  });
  it('new Promise() 必须接受一个函数, 否则报错', () => {
    assert.throw(() => {
      // @ts-ignore
      new MyPromise();
    });
  });
  it('new Promise(fn）会生成一个对象，对象又 then 方法', () => {
    const promise = new MyPromise(() => {
    });
    // @ts-ignore
    assert.isFunction(promise.then);
  });
  it('new Promise(fn) 中的 fn 立即执行', () => {
    const fn = sinon.fake();
    new MyPromise(fn);
    assert(fn.called);
  });
  it('new Promise(fn) 中的 fn 执行时接受 resolve 和 reject 两个函数', () => {
    new MyPromise((resolve, reject) => {
      assert.isFunction(reject);
      assert.isFunction(resolve);
    });
  });
  it('promise.then(success) 中的 success 会在 resolve 被调用的时候执行', done => {
    const success = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      resolve();
      assert.isFalse(success.called);
      setTimeout(() => {
        assert.isTrue(success.called);
        done();
      });
    });
    promise.then(success);
  });
  it('promise.then(null, fail) 中的 fail 会在 reject 被调用的时候执行', done => {
    const fail = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      reject();
      assert.isFalse(fail.called);
      setTimeout(() => {
        assert.isTrue(fail.called);
        done();
      });
    });
    promise.then(null, fail);
  });
  it('2.1.1', () => {
    const promise = new MyPromise(() => {})
    assert(promise.status === 'pending')
  })
  it('2.1.2', () => {
    const promise = new MyPromise((resolve) => {
      resolve()
      setTimeout(() => {
        assert(promise.status === 'fulfilled')
      })
    })
    promise.then(() => {}, () => {})
  })
  it('2.1.3', () => {
    const promise = new MyPromise((resolve, reject) => {
      reject()
      setTimeout(() => {
        assert(promise.status === 'rejected')
      })
    })
    promise.then(() => {}, () => {})
  })
  it('2.2.1 onFulfilled和onRejected都是可选的参数', () => {
    const promise = new MyPromise((resolve, reject) => {
      reject()
    })
    promise.then(false, null)
  })
  it('2.2.2 如果onFulfilled是函数', () => {

  })
});
