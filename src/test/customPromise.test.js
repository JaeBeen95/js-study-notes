import { CustomPromise } from "../customPromise";

describe("CustomPromise 테스트", () => {
  test("resolve 테스트", async () => {
    const result = await new CustomPromise((resolve) => {
      resolve("성공");
    });
    expect(result).toBe("성공");
  });
});
