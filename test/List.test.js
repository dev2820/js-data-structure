import { List } from "../index.js";
import {
  expectEqual,
  expectError,
  expectTypeError,
  expectRangeError,
  Test,
} from "./index.js";

/*
TODO:
- 여러 타입이 한 배열로 들어오면?
- 여러 타입이 parameter로 들어오면?
*/

new Test("List create test", () => {
  let list1 = new List();
  expectEqual(list1.length, 0);

  let list2 = new List(["A", "B", "C"]);
  expectEqual(list2.length, 1);

  let list3 = new List("A", "B", "C");
  expectEqual(list3.length, 3);
});

new Test("List reference test", () => {
  let list = new List("A", "B", "C", "D");
  expectEqual(list[0], "A");
  expectEqual(list.at(1), "B");
  expectEqual(list.back(), "D");
  expectEqual(list.front(), "A");
});

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

  expectEqual(list.erase(1).toString(), ["B"].toString());
  expectEqual(list.toString(), ["A", "C", "D"].toString());

  expectEqual(list.erase(-1).toString(), ["D"].toString());
  expectEqual(list.toString(), ["A", "C"].toString());

  expectError(() => list.erase(0.1));
  expectRangeError(() => {
    list.erase(6); // out of range error 가 일어나야함
  });
});

new Test("List insert test", () => {
  let list = new List();
  list.push("A");
  list.push("B");
  list.push("C");
  list.push("D");

  list.insert(3, "K");
  expectEqual(list.toString(), ["A", "B", "C", "K", "D"].toString());

  list.insert(-1, "G");
  expectEqual(list.toString(), ["A", "B", "C", "K", "D", "G"].toString());

  list.insert(3, "1", "2");
  expectEqual(
    list.toString(),
    ["A", "B", "C", "1", "2", "K", "D", "G"].toString()
  );
});

new Test("List type test", () => {
  let list = new List().setType(String);
  list.push("A", "B", "C", "D");
  expectEqual(list.type === String.name, true);
  expectEqual(list.type === Number.name, false);
  expectTypeError(() => list.push(1)); // 타입 에러 발생

  //unshift,splice,concat,fill 일땐 타입이 작동할까?
});
