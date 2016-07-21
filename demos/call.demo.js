/// <reference path="../include.d.ts" />

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

// console.log(add.call(sub, 4, 1));


// function Animal(){    
//     this.name = "Animal";    
//     this.showName = function(){    
//         console.log(this.name);    
//     }    
// }    

// function Cat(){    
//     this.name = "Cat";    
// }    

// var animal = new Animal();
// var cat = new Cat();

// animal.showName();
// animal.showName.call(cat); //animal的showName呼唤cat来执行它

// function Animal(name){      
//     this.name = name;      
//     this.showName = function(){      
//         console.log(this.name);      
//     }      
// }

// function Thing(ex) {
//     this.exist = ex;
//     this.sayExist = function() {
//         console.log(this.exist);
//     }
// }

// function Cat(name){    
//     Animal.call(this, name);   //Function Animal 呼唤 Cat(这里的this)来根据它的函数体来构造函数。
//     Thing.call(this, "Existing is Reasonable");
// }      

// var cat = new Cat('tommy');
// cat.showName();
// cat.sayExist();


// function fruits() {}

// fruits.prototype = {
//     color: "red",
//     say: function() {
//         console.log("My color is " + this.color);
//     }
// }

// var apple = new fruits;
// apple.say();    //My color is red
// //但是如果我们有一个对象banana= {color : "yellow"} ,我们不想对它重新定义 say 方法，那么我们可以通过 call 或 apply 用 apple 的 say 方法：

// var banana= {color : "yellow"};

// apple.say.call(banana);

// function log(msg)　{
//   console.log(msg);
// }
// log(1);    //1
// log(1,2);    //1

// //上面方法可以解决最基本的需求，但是当传入参数的个数是不确定的时候，上面的方法就失效了，这个时候就可以考虑使用
// // apply 或者 call，注意这里传入多少个参数是不确定的，所以使用apply是最好的，方法如下：
// function log() {
//     console.log.apply(console, arguments);
// }

// log(1,2); 

var bar = function () {
    console.log(this.x);
}
var foo = {
    x: 3
}
bar(); // undefined
var func = bar.bind(foo)();
// func(); // 3