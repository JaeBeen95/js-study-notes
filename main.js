class User {
  constructor(username) {
    this._username = username;
  }

  get username() {
    return this._username;
  }

  set username(value) {
    this._username = value;
  }

  sayHi() {
    return `안녕하세요, ${this._username}입니다`;
  }
}

const testObject = {
  user: new User("kim123"),
  profile: {
    hobbies: ["노래", "운동"],
    info: {
      age: 30,
      city: "Seoul",
    },
  },
};

function cloneDeep(target) {
  let clonedTarget = {};

  if (typeof target === "object" && target !== null) {
    for (let prop in target) {
      clonedTarget[prop] = cloneDeep(target[prop]);
    }
  } else {
    clonedTarget = target;
  }

  return clonedTarget;
}

console.log(cloneDeep(testObject));
