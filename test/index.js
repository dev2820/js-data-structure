export function expectEqual(a, b) {
  if (a !== b) {
    throw `${a} not equals ${b}`;
  }
}
export function expectError(callback) {
  try {
    callback();
  } catch (e) {
    return true;
  }
  throw `expected an Error, but it successed ${Error.stack}`;
}
export function expectRangeError(callback) {
  try {
    callback();
  } catch (e) {
    if (e instanceof RangeError) return true;
    throw `expected an RangeError, but it is ${e.constructor.name}`;
  }
  throw `expected an RangeError, but it successed ${Error.stack}`;
}
export function expectTypeError(callback) {
  try {
    callback();
  } catch (e) {
    if (e instanceof RangeError) return true;
    throw `expected an TypeError, but it is ${e.constructor.name}`;
  }
  throw `expected an TypeError, but it successed ${Error.stack}`;
}
export class Test {
  #testName = null;
  constructor(name, callback) {
    this.#testName = name;
    try {
      callback();
      console.log(`${this.#testName} is success`);
    } catch (e) {
      console.error(`${this.#testName} is failed, \n ${e}`);
    }
  }
}
