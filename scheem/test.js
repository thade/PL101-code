var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs'); // for loading files

// Read file contents
var data = fs.readFileSync('scheem.peg', 'utf-8');
// Show the PEG grammar file
console.log(data);
// Create my parser
var parse = PEG.buildParser(data).parse;
// Do tests
assert.deepEqual( parse("(a b c)"), ["a", "b", "c"] );
assert.deepEqual(parse("atom"), "atom",
    "parse atom");
assert.deepEqual(parse("+"), "+",
    "parse +");
assert.deepEqual(parse("(+ x 3)"), ["+", "x", "3"],
    "parse (+ x 3)");
assert.deepEqual(parse("(+ 1   (f x 3 y))"), 
    ["+", "1", ["f", "x", "3", "y"]],
    "parse (+ (1 (f x 3 y))");
assert.deepEqual( parse("'(a b c)"), ["quote", ["a", "b", "c"]] );
