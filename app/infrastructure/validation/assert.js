function assert(value, message = 'Failed to assert that input is true') {
  if (!!(value) !== true) {
    throw new Error(message);
  }
}

export default assert;
