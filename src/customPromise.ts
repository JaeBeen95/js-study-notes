export class CustomPromise {
  constructor(executor: any) {
    executor(this.resolve, this.reject);
  }

  resolve() {}

  reject() {}

  then() {}

  catch() {}
}
