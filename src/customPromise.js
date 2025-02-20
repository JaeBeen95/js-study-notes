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
    this.promiseResult = value;
    this.promiseState = "fulfilled";

    this.onFulfilledList.forEach((callback) => callback(value));
  }

  reject(error) {
    if (this.promiseState !== "pending") return;
    this.promiseResult = error;
    this.promiseState = "rejected";

    setTimeout(() => {
      if (this.onRejectedList.length === 0) {
        throw error;
      }
    }, 0);

    this.onRejectedList.forEach((callback) => callback(error));
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      this.onFulfilledList.push((value) => {
        const result = onFulfilled(value);
        resolve(result);
      });

      this.onRejectedList.push((error) => {
        const result = onRejected(error);
        reject(result);
      });
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally() {}
}
