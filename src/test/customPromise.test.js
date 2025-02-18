import { CustomPromise } from "../customPromise";

describe("CustomPromise 테스트", () => {
  test("resolve 테스트", async () => {
    const result = await new CustomPromise((resolve) => {
      resolve("성공");
    });
    expect(result).toBe("성공");
  });

  test("reject 테스트", async () => {
    try {
      await new CustomPromise((_, reject) => {
        reject("실패");
      });
    } catch (error) {
      expect(error).toBe("실패");
    }
  });
});
