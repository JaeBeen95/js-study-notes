import cloneDeep from "./cloneDeep";

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
