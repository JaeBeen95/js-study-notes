class CustomPromise {
  promiseState = "pending";
  promiseResult;

  constructor(executor) {
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(result) {
    if (this.promiseState !== "pending") return;
    this.promiseResult = result;
    this.promiseState = "fulfilled";
  }

  reject() {}

  then() {}

  catch() {}

  finally() {}
}

const promise = new Promise((resolve) => resolve(1));

console.log(
  new CustomPromise((resolve) => {
    resolve("1");
  }),
  promise
);
