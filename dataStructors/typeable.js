"use strict";

const TypeableMixin = (superclass) =>
  class extends superclass {
    #type = null;
    get type() {
      return this.#type;
    }
    set type(type) {
      this.#type = type.name;
    }
    setType(type) {
      this.#type = type.name;
      return this;
    }
    typeCheck(data) {
      if (this.#type === null) return true;
      return data.constructor.name === this.#type;
    }
    argsTypeCheck(args) {
      try {
        for (let i = 0; i < args.length; i++) {
          if (!this.typeCheck(args[i])) throw TypeError(args[i]);
        }
      } catch (e) {
        if (e instanceof TypeError) {
          throw TypeError(
            `element ${e.message.constructor.name} ${
              e.message
            } in arguments doesn't match with type ${this.#type}`
          );
        }
      }
    }
  };

export class TypeableArray extends TypeableMixin(Array) {
  push(...args) {
    this.argsTypeCheck(args);
    return super.push(...args);
  }
  unshift(...args) {
    this.argsTypeCheck(args);
    return super.unshift(...args);
  }
  splice(index, deleteCount, ...args) {
    this.argsTypeCheck(args);
    return super.splice(index, deleteCount, ...args);
  }
  concat(...args) {
    this.argsTypeCheck(args.flat());
    return super.concat(args.flat());
  }
  fill(fillValue, startIndex, endIndex) {
    if (!this.typeCheck(fillValue))
      throw TypeError(
        `fill value ${fillValue} doesn't match with type ${this.type}`
      );
    return super.fill(fillValue, startIndex, endIndex);
  }
}
export default {
  TypeableArray,
};
