import { List } from "../index.js";
import { expectEqual, expectError, expectRangeError, Test } from "./index.js";

new Test("List test with no type", () => {
  let list = new List();
  expectEqual(list.isEmpty(), true);
  list.push("A");
  list.push("B");
  list.push("C");
  list.push("D");
  list.push("E");
  list.push("F");
  //기본적인 동작은 Array와 같다
  expectEqual(list.length, 6);
  expectEqual(list.size(), 6);
  expectEqual(list[0], "A");
  expectEqual(list.at(1), "B");

  expectEqual(list.back(), "F");
  expectEqual(list.front(), "A");

  list.erase(1);
  expectEqual(list.length, 5);
  expectEqual(list.toString(), "A,C,D,E,F");

  list.insert(3, "K");
  expectEqual(list.length, 6);
  expectEqual(list.toString(), "A,C,D,K,E,F");

  expectRangeError(() => {
    list.erase(6); // out of range error 가 일어나야함
  });

  expectEqual(list.toString(), "A,C,D,K,E,F");
  list.insert(-1, "G");
  expectEqual(list.length, 7);
  expectEqual(list.toString(), "A,C,D,K,E,F,G");

  list.erase(-1);
  expectEqual(list.length, 6);
  expectEqual(list.toString(), "A,C,D,K,E,F");
});

new Test("List test with type", () => {
  let list = new List();
  list.generic(typeof "");
  list.push("A");
  expectEqual(list.length, 1);
  expectEqual(list[0], "A");
  expectEqual(list.at(0), "A");
  expectEqual(list.type, "string");
  expectEqual(list.typeCheck(0), false);
  expectEqual(list.typeCheck(""), true);
  expectError(() => list.push(1)); // 타입 에러 발생
});
