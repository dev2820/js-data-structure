import { List } from "../index.js";
import {
  expectEqual,
  expectError,
  expectTypeError,
  expectRangeError,
  Test,
} from "./index.js";

new Test("List isEmpty test", () => {
  let list = new List();
  expectEqual(list.isEmpty(), true);
  list.push("A");
  expectEqual(list.isEmpty(), false);
});

new Test("List size test", () => {
  let list = new List();
  expectEqual(list.size(), 0);
  list.push("A");
  expectEqual(list.size(), 1);
});

new Test("List push test", () => {
  let list = new List();
  list.push("A");
  list.push(["B", "C"]);
  list.push("D", "E", "F");
  expectEqual(list.toString(), ["A", ["B", "C"], "D", "E", "F"].toString());
  expectEqual(list.length, 5);
});

new Test("List unshift test", () => {
  let list = new List();
  list.unshift("A");
  list.unshift(["B", "C"]);
  list.unshift("D", "E", "F");
  expectEqual(list.toString(), ["D", "E", "F", ["B", "C"], "A"].toString());
  expectEqual(list.length, 5);
});

new Test("List splice test", () => {
  let list = new List();
  list.push("A", "B", "C", "D", "E");
  expectEqual(list.splice(1, 0, "K").toString(), [].toString());
  expectEqual(list.toString(), ["A", "K", "B", "C", "D", "E"].toString());

  expectEqual(list.splice(1, 1, "G").toString(), ["K"].toString());
  expectEqual(list.toString(), ["A", "G", "B", "C", "D", "E"].toString());

  expectEqual(list.splice(6, 0, "1", "2", "3").toString(), [].toString());
  expectEqual(
    list.toString(),
    ["A", "G", "B", "C", "D", "E", "1", "2", "3"].toString()
  );

  expectEqual(list.splice(6, 3).toString(), ["1", "2", "3"].toString());
  expectEqual(list.toString(), ["A", "G", "B", "C", "D", "E"].toString());
});

new Test("List concat test", () => {
  //concat은 원본이 변하지 않는 함수(팩토리)
  let list = new List();
  list.push("A", "B", "C");
  expectEqual(
    list.concat("D", "E", "F").toString(),
    ["A", "B", "C", "D", "E", "F"].toString()
  );

  expectEqual(
    list.concat(["D", "E", "F"]).toString(),
    ["A", "B", "C", "D", "E", "F"].toString()
  );

  expectEqual(
    list.concat("D", ["E", "F"]).toString(),
    ["A", "B", "C", "D", "E", "F"].toString()
  );

  expectEqual(
    list.concat("D", ["E", ["F"]]).toString(),
    ["A", "B", "C", "D", "E", ["F"]].toString()
  );

  expectEqual(
    list.concat(["D"], ["E", ["F"]]).toString(),
    ["A", "B", "C", "D", "E", ["F"]].toString()
  );

  let stringList = new List().setType(String);
  stringList.push("A", "B", "C");
  expectTypeError(() => stringList.concat(["D"], ["E", ["F"]]).toString());
  //["F"]는 Array 타입이기 때문에 실패해야함
});

new Test("List fill test", () => {
  let list = new List();
  list.push("A", "B", "C", "D", "E", "F");
  expectEqual(
    list.fill("X", 2, 4).toString(),
    ["A", "B", "X", "X", "E", "F"].toString()
  );

  expectEqual(
    list.fill("Y", 3).toString(),
    ["A", "B", "X", "Y", "Y", "Y"].toString()
  );

  expectEqual(
    list.fill("Z").toString(),
    ["Z", "Z", "Z", "Z", "Z", "Z"].toString()
  );

  const typeList = new List(1, 2, 3).setType(Number);
  expectTypeError(() => typeList.fill("A"));
});

new Test("List erase test", () => {
  let list = new List();
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

new Test("List type test", () => {
  let list = new List().setType(String);
  list.push("A", "B", "C", "D");
  expectEqual(list.type === String.name, true);
  expectEqual(list.type === Number.name, false);
  expectTypeError(() => list.push(1)); // 타입 에러 발생

  //unshift,splice,concat,fill 일땐 타입이 작동할까?
});
