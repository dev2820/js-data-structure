"use strict";

export class Generable {
  #type = null;

  generic(type) {
    this.#type = type;
  }
  typeCheck(data) {
    return typeof data === this.#type;
  }
}

export class GenerableArray extends Array {
  #type = null;
  get type() {
    return this.#type;
  }
  generic(type) {
    this.#type = type;
  }
  typeCheck(data) {
    if (this.type === null) return true;
    return typeof data === this.type;
  }
  push(data) {
    if (this.#type !== null && typeof data !== this.#type) {
      throw TypeError(`type ${typeof data} is not equal type ${this.#type}`);
    }
    super.push(data);
  }
  // unshift() - 타입 검사
  // concat() - 타입 검사
  // fill() - 타입 검사
  // splice() - 타입 검사
}
export default {
  Generable,
  GenerableArray,
};
