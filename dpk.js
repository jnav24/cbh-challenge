const crypto = require("crypto");

const createHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

const getValueFromEvent = (event) => {
  if (!event) {
    return null;
  }

  return event.partitionKey ?? createHash(JSON.stringify(event));
};

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  const candidate = getValueFromEvent(event) ?? TRIVIAL_PARTITION_KEY;

  if (typeof candidate !== "string") {
    return JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(candidate);
  }

  return candidate;
};
