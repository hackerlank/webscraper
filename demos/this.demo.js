
function test() {
    console.log(this.x);
}

var o = {};

o.m = test;

o.x = 3;

test.apply(o);