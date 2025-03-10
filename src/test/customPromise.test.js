import { CustomPromise } from "../customPromise";

describe("CustomPromise 테스트", () => {
  test("resolve 테스트", () => {
    return new CustomPromise((resolve) => {
      setTimeout(() => {
        resolve("성공");
      }, 100);
    }).then((result) => {
      expect(result).toBe("성공");
    });
  });

  test("reject 테스트", () => {
    return new CustomPromise((_, reject) => {
      setTimeout(() => {
        reject("실패");
      }, 100);
    }).catch((error) => {
      expect(error).toBe("실패");
    });
  });

  test("then 체이닝 테스트", () => {
    return new CustomPromise((resolve) => {
      resolve(1);
    })
      .then((num) => num + 1)
      .then((num) => {
        expect(num).toBe(2);
      });
  });

  test("reject 후 catch 테스트", () => {
    return new CustomPromise((_, reject) => {
      reject("에러");
    })
      .then(() => {
        expect(true).toBe(false);
      })
      .catch((error) => {
        expect(error).toBe("에러");
      });
  });

  test("resolve 후 finally 테스트", () => {
    let finallyCalled = false;

    return new CustomPromise((resolve) => {
      resolve("성공");
    })
      .then((result) => {
        expect(result).toBe("성공");
      })
      .finally(() => {
        finallyCalled = true;
      })
      .then(() => {
        expect(finallyCalled).toBe(true);
      });
  });

  test("reject 후 finally 테스트", () => {
    let finallyCalled = false;

    return new CustomPromise((_, reject) => {
      reject("에러");
    })
      .catch((error) => {
        expect(error).toBe("에러");
      })
      .finally(() => {
        finallyCalled = true;
      })
      .then(() => {
        expect(finallyCalled).toBe(true);
      });
  });

  test("첫 번째 resolve 이후 두 번째 resolve 무시시", () => {
    let resolveCount = 0;

    return new CustomPromise((resolve) => {
      resolve("첫번째 결과");
      resolve("두번째 결과");
    }).then((result) => {
      resolveCount++;
      expect(result).toBe("첫번째 결과");
      expect(resolveCount).toBe(1);
    });
  });

  test("resolve 후의 reject 무시시", () => {
    return new CustomPromise((resolve, reject) => {
      resolve("완료");
      reject(new Error("에러"));
    }).then((result) => {
      expect(result).toBe("완료");
    });
  });
});
