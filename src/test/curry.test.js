import curry from "../curry";

describe("curry 테스트", () => {
  const sum = (a, b, c) => a + b + c;
  const join = (a, b, c) => `${a}_${b}_${c}`;

  test("모든 인자를 한 번에 넘겨 호출 했을 때", () => {
    const curriedSum = curry(sum);
    const curriedJoin = curry(join);

    expect(curriedSum(1, 2, 3)).toBe(6);
    expect(curriedJoin(1, 2, 3)).toBe("1_2_3");
  });

  test("인자를 하나씩 전달했을 때", () => {
    const curriedSum = curry(sum);
    const curriedJoin = curry(join);

    expect(curriedSum(1)(2)(3)).toBe(6);
    expect(curriedJoin(1)(2)(3)).toBe("1_2_3");
  });

  test("여러 그룹으로 인자를 나누어 호출했을 때", () => {
    const curriedSum = curry(sum);
    const curriedJoin = curry(join);

    expect(curriedSum(1, 2)(3)).toBe(6);
    expect(curriedSum(1)(2, 3)).toBe(6);
    expect(curriedJoin(1, 2)(3)).toBe("1_2_3");
    expect(curriedJoin(1)(2, 3)).toBe("1_2_3");
  });

  test("인자가 추가적으로 있을 때", () => {
    const curriedSum = curry(sum);

    expect(curriedSum(1, 2, 3, 4)).toBe(6);
  });
});
