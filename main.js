function User(username) {
  this.username = username;
}

User.prototype.sayHi = function (username) {
  return `안녕하세요, ${username}입니다`;
};

const testObject = {
  user: new User("nin2348"),
  profile: {
    hobbies: ["노래", "운동"],
    info: {
      age: 30,
      city: "why",
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
  if (typeof target !== "object" || target === null) {
    return target;
  }

  if (Array.isArray(target)) {
    const clonedArray = [];
    target.forEach((item, index) => {
      clonedArray[index] = cloneDeep(item);
    });
    return clonedArray;
  }

  const clonedObject = {};
  Object.keys(target).forEach((key) => {
    clonedObject[key] = cloneDeep(target[key]);
  });
  return clonedObject;
}

console.log(testObject.user.constructor);
