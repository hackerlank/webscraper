/// <reference path="../include.d.ts" />

// var a = [1 , 2, 3];

// console.log(a.prototype);
// console.log(a.__proto__);

// function B(){};
// // B.prototype.nobibi = 1;

// console.log(B.prototype)
// console.log(B.__proto__.toString());


// var b = new B();

// console.log(b.prototype)
// console.log(b.__proto__);

// console.log(b.__proto__ === B.prototype)


Object.prototype.x = 2;

function A() {}
A.prototype.x = 1;

var a = new A();

// console.log(a.__proto__.x); //a的__proto__指向创建它的函数的prototype, 即A.prototype, 故输出1
// console.log(a.__proto__.__proto__.x) //a的__proto__指向创建它的函数的prototype, 即A.prototype(一个普通对象)；而A.prototype的__proto__又指向创建它的函数(Object)的prototype.故输出2
// console.log(a.__proto__.prototype.x);//a的__proto__指向创建它的函数的prototype, 即A.prototype(一个普通对象)，普通对象没有prototype属性，故报错
// console.log(a.__proto__.__proto__.__proto__); //a的__proto__指向创建它的函数的prototype, 即A.prototype(一个普通对象);而A.prototype的__proto__又指向创建它的函数(Object)的prototype;最终Object.prototyope.__proto__为null.
// console.log(a.x);


// console.log(A);


var animal = function(){};
  var dog = function(){};

  animal.price = 2000;
  dog.prototype = animal;
  //tidy的__proto__指向创建它的函数(dog)的prototype(dog.prototype),为animal， animal.price = 2000;
  var tidy = new dog();


  console.log(dog.price); //undefine
  console.log(tidy.price) ; //2000


// var F = function(){};
// Object.prototype.a = function(){};
// Function.prototype.b = function(){;};
// var f = new F();

// console.log(f.b);
// console.log(F.b.toString());