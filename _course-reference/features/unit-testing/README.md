# Unit Testing Reference

Use this folder when the task asks for Jest, Vitest, Testing Library, or one meaningful unit test.

## Which File To Open

- `validation-helper-example.ts`: pure validation helper that is easy to test.
- `validation-test-example.test.ts`: simple validation unit tests.
- `pet.routes.test.ts`: route/API style test example.
- `setup.ts`: test environment setup.
- `jest.config.js`: Jest config example.

## Fast Test Choice

```text
Best quick test target -> validation helper
Good test target       -> calculation helper
Good test target       -> formatting helper
Harder under time      -> full form UI
```

## Fast Pattern

```ts
describe("functionName", () => {
  it("describes the expected rule", () => {
    const result = functionName(input);
    expect(result).toEqual(expectedOutput);
  });
});
```

