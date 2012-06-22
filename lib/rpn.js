var jison = require("jison");
var sourceMap = require("source-map");
var lex = require("./rpn/lex").lex;
var bnf = require("./rpn/bnf").bnf;

var parser = new jison.Parser({
    lex: lex,
    bnf: bnf
});

parser.yy = require("./rpn/ast");

function getPrologue () {
    return new sourceMap.SourceNode(null, null, null, "")
        .add("var __rpn = {};\n")
        .add("__rpn._env = {};\n")
        .add("__rpn._stack = [];\n")

        .add("__rpn.push = function (val) {\n")
        .add("  __rpn._stack.push(val);\n")
        .add("};\n")

        .add("__rpn.pop = function () {\n")
        .add("  if (__rpn._stack.length > 0) {\n")
        .add("    return __rpn._stack.pop();\n")
        .add("  }\n")
        .add("  else {\n")
        .add("    throw new Error('can\\\'t pop from empty stack');\n")
        .add("  }\n")
        .add("};\n")

        .add("__rpn.print = function (val, repeat) {\n")
        .add("  while (repeat-- > 0)\n")
        .add("    console.log(val);\n")
        .add("};\n");
}

exports.compile = function (input, data) {
    var expressions = parser.parse(input);
    var prologue = getPrologue();

    var result = new sourceMap.SourceNode(null, null, null, prologue);
    result.add(expressions.map(function (exp) {
        return exp.compile(data);
    }));

    return result;
};

var fs = require("fs");
console.log(exports.compile(fs.readFileSync("/dev/stdin").toString(), {
    originalFile: "foobar.rpn"
}).toString());