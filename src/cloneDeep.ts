function cloneDeep<T>(target: T): T {
  if (typeof target !== "object" || target === null) {
    return target;
  }

  if (Array.isArray(target)) {
    const clonedArray = target.map((item) => cloneDeep(item)) as unknown as T;
    return clonedArray;
  }

  const clonedObject = Object.create(Object.getPrototypeOf(target)) as T;

  const descriptors = Object.getOwnPropertyDescriptors(target);

  (Object.keys(descriptors) as Array<keyof T>).forEach((key) => {
    const descriptor = descriptors[key];

    if (descriptor.get || descriptor.set) {
      Object.defineProperty(clonedObject, key, descriptor);
    } else {
      clonedObject[key] = cloneDeep(descriptor.value);
    }
  });

  return clonedObject;
}
