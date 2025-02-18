import cloneDeep from "./cloneDeep";
import memoize from "./memoize";

// cloneDeep test

class User {
  username: string;

  constructor(username: string) {
    this.username = username;
  }

  sayHi(username: string): string {
    return `안녕하세요, ${username}입니다`;
  }
}

const testObject = {
  user: new User("nin2348"),
  profile: {
    hobbies: ["노래", "운동"],
    info: {
      age: 30,
      city: "Seoul",
    },
  },

  get greet() {
    return "Hello";
  },
};

console.log(testObject, cloneDeep(testObject));

// memoize test

const foo = { a: 1, b: 2 };
const func = memoize((value: any) => Object.values(value));

console.log(func(foo)); // [1, 2]
foo.a = 2;
console.log(func(foo)); // [1, 2]

func.cache.delete(foo);
console.log(func(foo)); // [2, 2]
