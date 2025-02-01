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
  user: new User("nin2348"),
  profile: {
    hobbies: ["노래", "운동"],
    info: {
      age: 30,
      city: "Seoul",
    },
  },
};

const testArray = [
  1,
  "문자열",
  [1, 2, 3],
  new User("nin2348"),
  {
    deep: {
      deeper: {
        deepest: "가장 깊은 값",
      },
    },
  },
];

function cloneDeep(target) {
  let clonedTarget = Array.isArray(target) ? [] : {};

  if (typeof target === "object" && target !== null) {
    for (let prop in target) {
      clonedTarget[prop] = cloneDeep(target[prop]);
    }
  } else {
    clonedTarget = target;
  }

  return clonedTarget;
}

