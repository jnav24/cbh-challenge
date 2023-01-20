const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

const testHashValue = "test hash value";

jest.mock("crypto", () => ({
  createHash: jest.fn().mockReturnValue({
    update: jest
      .fn()
      .mockReturnValue({ digest: jest.fn().mockReturnValue(testHashValue) }),
  }),
}));

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  test("if partition key is shorter than max, return unhashed partition key", () => {
    const partitionKey = "I should be unhashed";
    const actual = deterministicPartitionKey({ partitionKey });
    expect(actual).toBe(partitionKey);
  });
  
  test("if partition key is longer than max, return hashed partition key", () => {
    const partitionKey =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    const actual = deterministicPartitionKey({ partitionKey });
    expect(actual).not.toBe(partitionKey);
    expect(actual).toBe(testHashValue);
  });
  
  test("partition key is not a string should return unhashed string", () => {
    const partitionKey = 56;
    const actual = deterministicPartitionKey({ partitionKey });
    expect(actual).toBe(partitionKey.toString());
  });
  
  test("no event passed should return default unhashed value", () => {
    const actual = deterministicPartitionKey();
    expect(actual).toBe("0");
  });
  
  test("empty event object passed should return hashed value of object", () => {
    const actual = deterministicPartitionKey({});
    expect(actual).not.toBe({});
    expect(actual).toBe(testHashValue);
  });
});
