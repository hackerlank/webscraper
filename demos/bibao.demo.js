function f1() {
    var n = 999;
    nAdd = function () { n += 1 }
    function f2() {
        console.log(n);
    }

    return f2;
}

var result = f1();

result();

nAdd();

result();



　function outerFun() {
    var a = 0;
    function innerFun(b) {
        a++;
        console.log('innter fun ' + b);
        console.log(a);
    }
    return innerFun;
}
var innerFun = outerFun();
innerFun(111);