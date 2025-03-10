export class CustomPromise {
  constructor(executor) {
    this.promiseState = "pending";
    this.promiseResult;
    this.onFulfilledList = [];
    this.onRejectedList = [];

    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.promiseState !== "pending") return;

    this.promiseState = "fulfilled";
    this.promiseResult = value;

    if (this.onFulfilledList) {
      queueMicrotask(() => {
        this.onFulfilledList.forEach((callback) => callback(this.promiseResult));
      });
    }
  }

  reject(error) {
    if (this.promiseState !== "pending") return;

    this.promiseState = "rejected";
    this.promiseResult = error;

    if (this.onRejectedList) {
      queueMicrotask(() => {
        this.onRejectedList.forEach((callback) => callback(this.promiseResult));
      });
    }
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      // 이전 프로미스 인스턴스 상태가 fulfilled일 때,
      if (this.promiseState === "fulfilled") {
        queueMicrotask(() => {
          const result = onFulfilled(this.promiseResult);
          resolve(result);
        });
        return;
      }

      // 이전 프로미스 인스턴스가 상태가 rejected일 때,
      if (this.promiseState === "rejected" && onRejected) {
        queueMicrotask(() => {
          const result = onRejected(this.promiseResult);
          resolve(result);
        });
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

  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally();
        return value;
      },
      (error) => {
        onFinally();
        return new CustomPromise((_, reject) => reject(error));
      }
    );
  }
}
