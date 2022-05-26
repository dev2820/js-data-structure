"use strict";

function typeCheck(data, type = null) {
  if (type === null) return true;
  return data.constructor.name === type;
}
export class GenerableArray extends Array {
  #type = null;
  get type() {
    return this.#type;
  }
  generic(type) {
    this.#type = type.name;
    return this;
  }
  #argsTypeCheck(args, callback) {
    try {
      for (let i = 0; i < args.length; i++) {
        if (!typeCheck(args[i], this.#type)) throw TypeError(args[i]);
      }
      return callback(...args);
    } catch (e) {
      if (e instanceof TypeError) {
        throw TypeError(
          `element ${e.message.name} ${
            e.message
          } in arguments doesn't match with type ${this.#type}`
        );
      }
    }
  }
  push(...args) {
    return this.#argsTypeCheck(args, (...args) => super.push(...args));
  }
  unshift(...args) {
    return this.#argsTypeCheck(args, (...args) => super.unshift(...args));
  }
  splice(index, deleteCount, ...args) {
    return this.#argsTypeCheck(args, (...args) =>
      super.splice(index, deleteCount, ...args)
    );
  }
  concat(...args) {
    return this.#argsTypeCheck(args.flat(), (...args) => super.concat(...args));
  }
  fill(fillValue, startIndex, endIndex) {
    if (!typeCheck(fillValue, this.#type))
      throw TypeError(
        `fill value ${fillValue} doesn't match with type ${this.#type}`
      );
    return super.fill(fillValue, startIndex, endIndex);
  }
}
export default {
  GenerableArray,
};
