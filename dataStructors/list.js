"use strict";
import { TypeableArray } from "./typeable.js";
/* 
모든 List는 기본적으론 배열과 같습니다 (배열을 상속) 
다만 타입 검사를 통해 한가지 타입의 값만 저장할 수 있습니다.
*/

/*
선형 리스트
*/
export class List extends TypeableArray {
  front() {
    return this.length > 0 ? this[0] : null;
  }
  back() {
    return this.length > 0 ? this.at(-1) : null;
  }
  erase(index) {
    if (typeof index !== typeof 0) {
      throw TypeError(
        `erase method's parameter type is expected ${typeof 0},but parameter's type is ${typeof index}`
      );
    }
    if (index >= this.length)
      throw RangeError(`can't erase out of range index`);

    if (index < 0) index = index + this.length; // index가 음수이면 뒤에서 erase 하도록 명령
    this.splice(index, 1);
  }
  insert(index, value) {
    if (typeof index !== typeof 0) {
      throw TypeError(
        `insert method's first parameter type is expected ${typeof 0},but first parameter's type is ${typeof index}`
      );
    }
    if (super.typeCheck(value) === false) {
      throw TypeError(
        `insert method's second parameter type is expected ${typeof 0},but second parameter's type is ${typeof value}`
      );
    }
    if (index >= this.length)
      throw RangeError(`can't insert out of range index`);

    if (index < 0) index = index + this.length + 1; // index가 음수이면 뒤에서 insert 하도록 명령
    this.splice(index, 0, value);
  }
  size() {
    return this.length;
  }
  isEmpty() {
    return this.length === 0;
  }
}
/*
단일 연결 리스트
*/
export class SimpleLinkedList extends TypeableArray {}
/*
이중 연결 리스트
*/
export class LinkedList extends TypeableArray {}

export default {
  List,
  SimpleLinkedList,
  LinkedList,
};
