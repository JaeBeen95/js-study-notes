class CustomPromise {
  promiseState = "pending";
  promiseResult;

  constructor(executor) {
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.promiseState !== "pending") return;
    this.promiseResult = value;
    this.promiseState = "fulfilled";
  }

  reject(error) {
    if (this.promiseState !== "pending") return;
    this.promiseResult = error;
    this.promiseState = "rejected";
    throw new Error("Uncaught (in promise) " + error);
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      if (this.promiseState === "fulfilled") {
        const result = onFulfilled(this.promiseResult);
        resolve(result);
      }

      if (this.promiseState === "rejected") {
        const result = onRejected(this.promiseResult);
        reject(result);
      }
    });
  }

  catch() {}

  finally() {}
}
