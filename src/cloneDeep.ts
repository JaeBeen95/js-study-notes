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

  const clonedObject = target.constructor !== Object ? new target.constructor() : {};

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
