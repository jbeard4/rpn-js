if(typeof window !== 'undefined') global = window; debugger;
var __rpn = {};
__rpn._stack = [];
__rpn.temp = 0;
__rpn.push = function (val) {
  __rpn._stack.push(val);
};
__rpn.pop = function () {
  if (__rpn._stack.length > 0) {
    return __rpn._stack.pop();
  }
  else {
    throw new Error('can\'t pop from empty stack');
  }
};
__rpn.print = function (val, repeat) {
  while (repeat-- > 0) {
    console.log(val);
  }
};
__rpn.push(8);
__rpn.push('a');
global[__rpn.pop()] = __rpn.pop();
__rpn.push(3);
__rpn.push('b');
global[__rpn.pop()] = __rpn.pop();
__rpn.push(global.a);
__rpn.push(global.b);
__rpn.push(1);
__rpn.temp = __rpn.pop();
__rpn.push(__rpn.pop() - __rpn.temp);
__rpn.temp = __rpn.pop();
if (__rpn.temp === 0) throw new Error('divide by zero error');
__rpn.push(__rpn.pop() / __rpn.temp);
__rpn.push('c');
global[__rpn.pop()] = __rpn.pop();
__rpn.push(global.c);
__rpn.push(1);
__rpn.temp = __rpn.pop();
if (__rpn.temp <= 0) throw new Error('argument must be greater than 0');
if (Math.floor(__rpn.temp) != __rpn.temp) throw new Error('argument must be an integer');
__rpn.print(__rpn.pop(), __rpn.temp);

//# sourceMappingURL=simple-example.js.map