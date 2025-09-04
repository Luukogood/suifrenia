// Function to convert salt string to BigInt
export const stringToBigInt = (salt) => {
  // Convert the salt string to a byte array
  const encoder = new TextEncoder();
  const byteArray = encoder.encode(salt);

  // Convert the byte array to a BigInt
  let bigInt = BigInt(0);
  for (let i = 0; i < byteArray.length; i++) {
    bigInt = (bigInt << BigInt(8)) + BigInt(byteArray[i]);
  }

  return bigInt;
};
