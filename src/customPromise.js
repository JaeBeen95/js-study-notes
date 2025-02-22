export class CustomPromise {
  promiseState = "pending";
  promiseResult;

  constructor(executor) {
    this.onFulfilledList = [];
    this.onRejectedList = [];

    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.promiseState !== "pending") return;

    this.promiseState = "fulfilled";
    this.promiseResult = value;

    if (this.onFulfilledList) {
      setTimeout(() => {
        this.onFulfilledList.forEach((callback) => callback(value));
      }, 0);
    }
  }

  reject(error) {
    if (this.promiseState !== "pending") return;

    this.promiseState = "rejected";
    this.promiseResult = error;

    if (this.onRejectedList) {
      setTimeout(() => {
        this.onRejectedList.forEach((callback) => callback(error));
      }, 0);
    }
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      // 이전 프로미스 인스턴스 상태가 fulfilled일 때,
      if (this.promiseState === "fulfilled") {
        setTimeout(() => {
          const result = onFulfilled(this.promiseResult);
          resolve(result);
        }, 0);
        return;
      }

      // 이전 프로미스 인스턴스가 상태가 fulfilled일 때,
      if (this.promiseState === "rejected" && onRejected) {
        setTimeout(() => {
          const result = onRejected(this.promiseResult);
          resolve(result);
        }, 0);
        return;
      }

      // 이전 프로미스 인스턴스가 상태가 pending일 때,
      this.onFulfilledList.push((value) => {
        const result = onFulfilled(value);
        resolve(result);
      });

      // then메서드의 두 번째 인자 유무에 따른 로직 분리
      if (onRejected) {
        this.onRejectedList.push((error) => {
          const result = onRejected(error);
          resolve(result);
        });
      } else {
        this.onRejectedList.push(reject);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally() {}
}
