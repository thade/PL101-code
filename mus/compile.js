// this is all you
var max = function (a,b) {
    if (a > b )
        return a;
    else return b;
};
letterPitch={ c: 0,
              d: 2,
              e: 5,
              f: 5,
              g: 7,
              a: 9,
              b: 11
};
var convertPitch = function (pitch) {
    return 12 + 12 * pitch[1] + letterPitch[pitch[0]];
};
var endTime = function (musExpr) {
    if (musExpr.tag === 'note' || musExpr.tag === 'rest')
        return musExpr.dur;
    else if (musExpr.tag === 'seq')
        return endTime(musExpr.left) + endTime(musExpr.right);
    else
        return max(endTime(musExpr.left), endTime(musExpr.right));
};
var compileT = function (expr, t) {
    if (expr.tag === 'note')
        return [ {tag: 'note',
                  pitch: convertPitch(expr.pitch),
                  dur: expr.dur,
                  start: t
                 } ];
    else if (expr.tag === 'rest')
    {
        return [ {tag:'rest', dur: expr.dur, start: t} ];
    }
    else if (expr.tag === 'seq')
    {
        l = compileT(expr.left,t);
        t1 = endTime(expr.left);
        return l.concat(compileT(expr.right,t1));
    }
    else
    {
        l = compileT(expr.left,t);
        return l.concat(compileT(expr.right,t));
    }
};
var compile = function (expr) { return compileT(expr,0); };

var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));
