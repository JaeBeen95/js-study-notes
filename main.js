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

  get greet() {
    return "Hello";
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

  if (target.constructor !== Object) {
    const clonedInstance = new target.constructor();

    const descriptors = Object.getOwnPropertyDescriptors(target);

    Object.keys(descriptors).forEach((key) => {
      const descriptor = descriptors[key];

      if (descriptor.get || descriptor.set) {
        Object.defineProperty(clonedInstance, key, descriptor);
      } else {
        clonedInstance[key] = cloneDeep(descriptor.value);
      }
    });

    return clonedInstance;
  }

  const clonedObject = {};
  const descriptors = Object.getOwnPropertyDescriptors(target);

  Object.keys(descriptors).forEach((key) => {
    const descriptor = descriptors[key];

    if (descriptor.get || descriptor.set) {
      Object.defineProperty(clonedObject, key, descriptor);
    } else {
      clonedObject[key] = cloneDeep(descriptor.value);
    }
  });

  return clonedObject;
}

console.log(cloneDeep(testObject));
